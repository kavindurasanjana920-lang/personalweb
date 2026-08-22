# Deploying thekavindu to the Azure VM

Both apps run on one VM — `PrimaryMachine`, Standard_B1ms, Ubuntu 24.04, South India —
behind a single nginx that serves them from one origin:

```
                    ┌──────────────── PrimaryMachine (B1ms, 2 GB) ─────────────────┐
   Internet ──80/443──▶ nginx                                                      │
                    │    ├── /api/contact ──▶ Next.js  127.0.0.1:3000 (systemd)    │
                    │    ├── /api/      ────▶ PHP 8.3-FPM ──▶ Laravel              │
                    │    ├── /up       ─────▶ PHP 8.3-FPM ──▶ Laravel              │
                    │    └── /         ─────▶ Next.js  127.0.0.1:3000              │
                    │                                    │                         │
                    │                              MySQL 8 (127.0.0.1 only)        │
                    └──────────────────────────────────────────────────────────────┘
```

Serving both apps from one origin means **the browser never makes a cross-origin request**,
so CORS never applies. Laravel's routes already carry the `/api` prefix, so nginx passes the
URI through untouched — no rewriting.

GitHub Actions builds on the runner and ships over SSH. Port 22 stays closed to the world:
each deploy opens an NSG rule for the runner's IP and deletes it afterwards.

---

## Files

**Frontend repo**

| Path | Purpose |
|---|---|
| `deploy/vm/bootstrap.sh` | One-time server setup — run once with `sudo` on the VM |
| `deploy/vm/nginx-site.conf` | The single-origin site config |
| `deploy/vm/nginx-proxy-snippet.conf` | Shared proxy headers for the Node upstream |
| `deploy/vm/nextjs.service` | systemd unit for the standalone server |
| `deploy/vm/azure-oidc-setup.sh` | Entra app + federated credentials + CI SSH key |
| `.github/workflows/vm-frontend.yml` | Build → ship → cut over → smoke test |
| `src/lib/server-api-url.ts` | Server-side fetches use loopback, not the public host |

**Backend repo**

| Path | Purpose |
|---|---|
| `.github/workflows/vm-backend.yml` | Build → ship → migrate → cut over |
| `.env.vm.example` | Reference copy of the server's shared `.env` |
| `.gitignore` | Was empty — now excludes `vendor/`, `.env`, caches |
| `bootstrap/app.php` | `trustProxies(at: '*')` — Laravel sits behind nginx |

---

## Step 1 — Bootstrap the server

Copy the deploy folder up and run it. It is idempotent, so re-running is safe.

```bash
scp -i ~/.ssh/PrimaryMachine_key.pem -r deploy/vm azureuser@<vm-ip>:/tmp/vm
ssh -i ~/.ssh/PrimaryMachine_key.pem azureuser@<vm-ip>
sudo bash /tmp/vm/bootstrap.sh
```

It installs nginx, PHP 8.3-FPM, Node 22, MySQL 8, fail2ban and certbot; puts 2 GB of swap on
the Azure temp disk; tunes MySQL and PHP-FPM for a 2 GB host; creates the `deploy` user and the
release layout; and writes both environment files. **Save the MySQL password it prints** — it is
also stored in `/var/www/laravel/shared/.env`.

Directory layout it creates:

```
/var/www/next/       releases/<sha>/ , current -> …, shared/next.env
/var/www/laravel/    releases/<sha>/ , current -> …, shared/{.env,storage}
```

Laravel's `storage/` and `.env` live in `shared/` and are symlinked into each release, so
uploads, logs and sessions survive deploys.

## Step 2 — Wire up GitHub Actions

```bash
bash deploy/vm/azure-oidc-setup.sh
```

Creates the Entra app registration, three federated credentials, a Contributor role assignment
**scoped to the `Primary` resource group only**, and an ed25519 CI keypair. It prints the exact
secrets to add and the one-liner that authorises the CI key on the VM.

Repository secrets:

| Secret | Value |
|---|---|
| `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID` | printed by the script |
| `VM_SSH_PRIVATE_KEY` | full contents of `~/.ssh/thekavindu_ci` |
| `CONTACT_FORM_WEBHOOK_URL` | your Make.com hook URL |

No `NEXT_PUBLIC_LARAVEL_API_URL` variable is needed — it is baked in as the relative `/api`,
which keeps working after you add a domain and TLS.

## Step 3 — Deploy

```bash
# frontend
cd e:/personalweb-main/personalweb-main
git checkout -b azure-vm
git add .
git commit -m "chore: deploy to Azure VM"
git push -u origin azure-vm

# backend (not a git repo yet)
cd e:/personalweb-laravel-backend/personalweb-laravel-backend
git init
git remote add origin git@github.com:kavindurasanjana920-lang/personalweb.git
git checkout -b azure-vm-backend
git add .
git status      # confirm .env and vendor/ are NOT staged
git commit -m "chore: Laravel API on Azure VM"
git push -u origin azure-vm-backend
```

Deploy the **backend first** — until a Laravel release exists, `/api/*` returns 404 from the
placeholder docroot that `bootstrap.sh` puts in place.

Then create the admin account:

```bash
ssh -i ~/.ssh/PrimaryMachine_key.pem azureuser@<vm-ip>
cd /var/www/laravel/current
sudo -u deploy php artisan app:create-admin-user info@thekavindu.lk --name="Kavindu"
```

## Step 4 — Move the blog data across

```bash
mysqldump -u root -p --single-transaction --no-tablespaces portfolioblog > portfolioblog.sql
scp -i ~/.ssh/PrimaryMachine_key.pem portfolioblog.sql azureuser@<vm-ip>:/tmp/

ssh -i ~/.ssh/PrimaryMachine_key.pem azureuser@<vm-ip>
sudo mysql portfolioblog < /tmp/portfolioblog.sql && rm /tmp/portfolioblog.sql
```

MySQL is bound to `127.0.0.1`, so it is never reachable from outside the VM — the dump has to
travel over SSH rather than a direct connection.

## Step 5 — Domains and TLS

Two hostnames are served from the VM:

| Host | Serves | Status |
|---|---|---|
| `backend.thekavindu.lk` | Laravel at the root | **live, HTTPS** |
| `thekavindu.lk` / `www` | portfolio, with the API at `/api` | waiting on DNS |

DNS is on Cloudflare. `backend` is a DNS-only (grey cloud) A record to `172.198.161.39`, which
is what let certbot complete the HTTP-01 challenge. The apex and `www` are still proxied
(orange cloud) at Cloudflare's edge addresses and point at the old origin.

To move the apex across, set both records to `172.198.161.39` **DNS only**, then:

```bash
sudo certbot --nginx -d thekavindu.lk -d www.thekavindu.lk \
  --non-interactive --agree-tos -m info@thekavindu.lk --redirect
```

Keeping the orange cloud instead also works, but then Cloudflare terminates TLS at its edge and
the origin needs either a Cloudflare Origin Certificate or SSL mode set to Full — more moving
parts than the DNS-only route, and inconsistent with how `backend` is already set up.

Certbot edits the site config in place and installs a renewal timer (`certbot.timer`;
`certbot renew --dry-run` verifies it). Afterwards:

1. `APP_URL`, `FRONTEND_URL`, `CORS_ALLOWED_ORIGINS` in `/var/www/laravel/shared/.env`, then
   `php artisan config:cache` and reload php-fpm
2. `DATA.url` in [src/data/resume.tsx](src/data/resume.tsx#L30) is already `https://thekavindu.lk`
   — canonical URLs, OG tags, sitemap and RSS all derive from it

`NEXT_PUBLIC_LARAVEL_API_URL` and `LARAVEL_API_URL` need no change: one is relative, the other
points at loopback. That is the whole point of those two values — a domain change never
requires a rebuild.

---

## How a deploy works

Both workflows follow the same shape:

1. **Build on the runner** — `npm ci && npm run build` / `composer install --no-dev`. The VM
   never builds anything, which is what makes 2 GB of RAM sufficient.
2. **Open SSH** — sweep stale `gh-actions-*` NSG rules, then add one for the runner's IP at
   priority 100. A `concurrency` group serialises the two workflows so they never contend for it.
3. **Ship** — `rsync` into `releases/<sha>/`.
4. **Prepare** — Laravel links `.env` and `storage`, fixes group ownership for `www-data`,
   caches config and routes, and **runs migrations before the cut-over** so a failure leaves the
   previous release serving.
5. **Cut over** — swap the `current` symlink, restart `nextjs` / reload `php8.3-fpm`.
6. **Verify** — poll the app directly, then smoke-test through nginx from the runner. A failed
   check fails the workflow.
7. **Close SSH** — delete the NSG rule in an `if: always()` step, and keep the last 3 releases.

Rollback is a symlink swap:

```bash
ssh -i ~/.ssh/PrimaryMachine_key.pem azureuser@<vm-ip>
ls -1dt /var/www/next/releases/*/          # pick the previous sha
sudo -u deploy ln -sfn /var/www/next/releases/<sha> /var/www/next/current
sudo systemctl restart nextjs
```

---

## Operating the box

```bash
systemctl status nextjs php8.3-fpm nginx mysql
journalctl -u nextjs -f
tail -f /var/log/nginx/thekavindu.error.log
tail -f /var/www/laravel/shared/storage/logs/laravel.log
free -h          # confirm swap is active
```

**Memory budget on 2 GB** — MySQL ~450 MB (`innodb_buffer_pool_size=256M`), PHP-FPM ~150 MB
(`pm=ondemand`, max 6 children), Node capped at 768 MB by `MemoryMax`, OS ~200 MB, plus 2 GB of
swap on the temp disk. The `MemoryMax` cap is deliberate: without it a runaway render invites
the OOM killer, which would take MySQL down with it.

**Backups.** Nothing here is backed up by default. At minimum, a nightly dump:

```bash
sudo crontab -e
0 3 * * * mysqldump --single-transaction portfolioblog | gzip > /var/backups/blog-$(date +\%F).sql.gz
0 4 * * * find /var/backups -name 'blog-*.sql.gz' -mtime +14 -delete
```

For disk-level recovery, take periodic snapshots: `az snapshot create --source <diskId>`.

---

## Security notes

- **SSH is closed by default.** Keep the standing rule locked to your own address
  (`az network nsg rule update -g Primary --nsg-name PrimaryMachine-nsg --name SSH
  --source-address-prefixes "$(curl -s ifconfig.me)/32"`). The workflows open and close their
  own rule per deploy.
- `bootstrap.sh` disables password auth and root login, and enables fail2ban on sshd.
- The `deploy` user's sudo rights are limited to exactly four commands
  (`/etc/sudoers.d/90-deploy`) — it cannot get a root shell.
- MySQL listens on loopback only; there is no database port exposed to the internet.
- nginx returns 404 for any `.php` outside the Laravel entrypoint and denies all dotfiles.

Still outstanding from the old setup:

1. **`.env` is committed on the `laravel-backend` branch**, with a real `APP_KEY` and DB
   password. Treat both as compromised — `bootstrap.sh` generates fresh ones. `git rm --cached .env`.
2. **`vendor/` is committed** on that branch; CI now builds it. `git rm -r --cached vendor`.
3. **The contact form posts straight to the Make.com webhook from the browser**
   ([contact-form.tsx:42](src/components/section/contact-form.tsx#L42)), exposing the hook URL in
   the client bundle. That was a static-export workaround. The server route works here, so the
   form can post to `/api/contact/` instead — note the trailing slash, since `trailingSlash: true`
   makes a POST to `/api/contact` return a 308.

---

## Troubleshooting

**502 from nginx on `/`** — the Node service is down: `systemctl status nextjs`,
`journalctl -u nextjs -n 50`. Most likely the release symlink points at a directory with no
`server.js`.

**404 from `/api/posts`** — no Laravel release yet, or `current` still points at the placeholder:
`ls -l /var/www/laravel/current`.

**502 or blank on `/api/*`** — PHP-FPM socket path mismatch. The config expects
`/run/php/php8.3-fpm.sock`; confirm with `systemctl status php8.3-fpm`.

**Laravel 500, "Please provide a valid cache path" or permission errors** — the `storage`
symlink or group ownership did not survive. Re-run the fix-up:
`sudo chgrp -R www-data /var/www/laravel/current/ && sudo chmod -R g+w /var/www/laravel/current/bootstrap/cache`.

**Workflow hangs at the SSH step** — the NSG rule was created but the deploy key is not in
`/home/deploy/.ssh/authorized_keys`. The `azure-oidc-setup.sh` output has the exact command.

**Workflow fails at `az login`** — federated credential subject mismatch. The jobs declare
`environment: production`, so the subject must be
`repo:<owner>/<repo>:environment:production`. If GitHub Environments are unavailable on your
plan, delete the `environment:` line from both workflows and the branch-based credentials apply.

**A cancelled run left port 22 open** — the next deploy sweeps any `gh-actions-*` rule before
creating its own, or remove it by hand:
`az network nsg rule delete -g Primary --nsg-name PrimaryMachine-nsg -n gh-actions-<runid>`.

---

## Cost

| | ~$/mo |
|---|---|
| B1ms VM | 15.11 |
| Premium SSD (P4, image default size) | 5 |
| Static public IP | 4 |
| **Total** | **~24** |

Roughly four months on the $100 student credit, covering the frontend, the API and the database
on one machine. `az vm deallocate` stops compute billing when the VM is not needed; the disk and
IP keep charging.
