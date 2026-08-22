#!/usr/bin/env bash
#
# One-time server bootstrap for the Azure VM (PrimaryMachine, Ubuntu 24.04, B1ms).
#
# Installs and configures nginx, PHP 8.3-FPM, Node 22, MySQL 8, fail2ban and swap,
# creates the release directory layout, and installs the systemd unit for Next.js.
# Deployments themselves are done by the GitHub Actions workflows over SSH.
#
# Usage, from the repo checked out on the VM (or with the deploy/vm folder copied up):
#     sudo bash deploy/vm/bootstrap.sh
#
# Safe to re-run: every step is idempotent.
#
set -euo pipefail

############################  SETTINGS  ########################################
DEPLOY_USER="${DEPLOY_USER:-deploy}"
MYSQL_DB="${MYSQL_DB:-portfolioblog}"
MYSQL_USER="${MYSQL_USER:-portfolioblog}"
NODE_MAJOR="${NODE_MAJOR:-22}"
SWAP_MB="${SWAP_MB:-2048}"
# Public origin used for APP_URL and the browser-facing API URL. Change to your
# domain once DNS points here, then re-run the frontend workflow.
SITE_ORIGIN="${SITE_ORIGIN:-http://$(curl -s --max-time 5 ifconfig.me || echo localhost)}"
################################################################################

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $EUID -ne 0 ]]; then
  echo "Run with sudo: sudo bash deploy/vm/bootstrap.sh" >&2
  exit 1
fi

log() { echo -e "\n\033[1;36m==> $*\033[0m"; }

# ---------------------------------------------------------------- swap --------
# The Azure temp disk (/mnt) is fast local storage that is wiped on deallocate,
# which makes it the right home for swap and the wrong home for anything else.
# 2 GB of swap is what keeps MySQL + PHP-FPM + Node comfortable on a 2 GB box.
log "Configuring ${SWAP_MB} MB swap on the Azure resource disk"
if [[ -f /etc/waagent.conf ]]; then
  sed -i "s/^ResourceDisk.Format=.*/ResourceDisk.Format=y/" /etc/waagent.conf
  sed -i "s/^ResourceDisk.EnableSwap=.*/ResourceDisk.EnableSwap=y/" /etc/waagent.conf
  sed -i "s/^ResourceDisk.SwapSizeMB=.*/ResourceDisk.SwapSizeMB=${SWAP_MB}/" /etc/waagent.conf
  systemctl restart walinuxagent || systemctl restart waagent || true
else
  echo "waagent.conf not found - falling back to a swapfile on the OS disk"
  if [[ ! -f /swapfile ]]; then
    fallocate -l "${SWAP_MB}M" /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo "/swapfile none swap sw 0 0" >> /etc/fstab
  fi
fi

# ------------------------------------------------------------- packages -------
log "Installing base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq \
  nginx \
  mysql-server \
  php8.3-fpm php8.3-cli php8.3-mysql php8.3-mbstring php8.3-xml \
  php8.3-curl php8.3-zip php8.3-bcmath php8.3-intl \
  git unzip curl rsync fail2ban unattended-upgrades \
  certbot python3-certbot-nginx

log "Installing Node ${NODE_MAJOR} (NodeSource)"
if ! command -v node >/dev/null || [[ "$(node -v)" != v${NODE_MAJOR}.* ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y -qq nodejs
fi
node -v

# ---------------------------------------------------------------- users -------
log "Creating deploy user and directory layout"
if ! id -u "$DEPLOY_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi
usermod -aG www-data "$DEPLOY_USER"

install -d -m 0700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/${DEPLOY_USER}/.ssh"
touch "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chown "$DEPLOY_USER:$DEPLOY_USER" "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chmod 600 "/home/${DEPLOY_USER}/.ssh/authorized_keys"

for d in /var/www/next/releases /var/www/next/shared \
         /var/www/laravel/releases /var/www/laravel/shared; do
  install -d -o "$DEPLOY_USER" -g www-data -m 2775 "$d"
done

# Laravel keeps storage outside the release so it survives deploys.
for d in storage/app/public storage/app/private storage/framework/cache/data \
         storage/framework/sessions storage/framework/views storage/logs; do
  install -d -o www-data -g www-data -m 2775 "/var/www/laravel/shared/$d"
done

# The deploy user restarts services without a password, but only these exact ones.
cat > /etc/sudoers.d/90-deploy <<SUDOERS
${DEPLOY_USER} ALL=(root) NOPASSWD: /bin/systemctl restart nextjs, \\
  /bin/systemctl reload php8.3-fpm, \\
  /bin/systemctl reload nginx, \\
  /usr/sbin/nginx -t
SUDOERS
chmod 0440 /etc/sudoers.d/90-deploy
visudo -cf /etc/sudoers.d/90-deploy

# ---------------------------------------------------------------- mysql -------
log "Configuring MySQL for a 2 GB host"
cat > /etc/mysql/mysql.conf.d/99-small-host.cnf <<'MYCNF'
[mysqld]
# Defaults assume a far larger machine; these keep MySQL inside ~450 MB so that
# Node and PHP-FPM still fit alongside it on a B1ms.
innodb_buffer_pool_size = 256M
innodb_log_file_size    = 64M
max_connections         = 40
performance_schema      = OFF
table_open_cache        = 400
tmp_table_size          = 16M
max_heap_table_size     = 16M
bind-address            = 127.0.0.1
MYCNF
systemctl restart mysql

MYSQL_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | head -c 24)"
if mysql -e "SELECT 1 FROM mysql.user WHERE user='${MYSQL_USER}'" 2>/dev/null | grep -q 1; then
  echo "MySQL user ${MYSQL_USER} already exists - leaving its password untouched"
  MYSQL_PASSWORD="(unchanged - see /var/www/laravel/shared/.env)"
else
  mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON \`${MYSQL_DB}\`.* TO '${MYSQL_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL
fi

# ------------------------------------------------------------ app env ---------
log "Writing shared environment files"

if [[ ! -f /var/www/laravel/shared/.env ]]; then
  APP_KEY="base64:$(openssl rand -base64 32)"
  cat > /var/www/laravel/shared/.env <<LARAVELENV
APP_NAME="Kavindu Blog API"
APP_ENV=production
APP_KEY=${APP_KEY}
APP_DEBUG=false
APP_URL=${SITE_ORIGIN}

FRONTEND_URL=${SITE_ORIGIN}
CORS_ALLOWED_ORIGINS=${SITE_ORIGIN}

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=warning

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=${MYSQL_DB}
DB_USERNAME=${MYSQL_USER}
DB_PASSWORD=${MYSQL_PASSWORD}

SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

MAIL_MAILER=log
LARAVELENV
  chown "$DEPLOY_USER:www-data" /var/www/laravel/shared/.env
  chmod 640 /var/www/laravel/shared/.env
else
  echo "/var/www/laravel/shared/.env already exists - left as is"
fi

if [[ ! -f /var/www/next/shared/next.env ]]; then
  cat > /var/www/next/shared/next.env <<NEXTENV
NODE_ENV=production
PORT=3000
HOSTNAME=127.0.0.1
# Server-side fetches (sitemap, RSS) go straight back through nginx on loopback
# rather than out to the public address.
LARAVEL_API_URL=http://127.0.0.1/api
CONTACT_FORM_WEBHOOK_URL=
NEXTENV
  chown "$DEPLOY_USER:www-data" /var/www/next/shared/next.env
  chmod 640 /var/www/next/shared/next.env
fi

# ---------------------------------------------------------------- nginx -------
log "Installing nginx configuration"
install -d /etc/nginx/snippets
install -m 0644 "${SCRIPT_DIR}/nginx-proxy-snippet.conf" /etc/nginx/snippets/thekavindu-proxy.conf
install -m 0644 "${SCRIPT_DIR}/nginx-site.conf" /etc/nginx/sites-available/thekavindu
ln -sfn /etc/nginx/sites-available/thekavindu /etc/nginx/sites-enabled/thekavindu
rm -f /etc/nginx/sites-enabled/default

# php-fpm defaults to a dynamic pool sized for a bigger box.
cat > /etc/php/8.3/fpm/pool.d/z-small-host.conf <<'FPMCONF'
[www]
pm = ondemand
pm.max_children = 6
pm.process_idle_timeout = 20s
pm.max_requests = 500
FPMCONF

sed -i 's/^;\?cgi.fix_pathinfo=.*/cgi.fix_pathinfo=0/' /etc/php/8.3/fpm/php.ini
sed -i 's/^;\?expose_php =.*/expose_php = Off/' /etc/php/8.3/fpm/php.ini

systemctl restart php8.3-fpm

# nginx will not start until a Laravel release exists, because the docroot is
# missing. Create a placeholder so the box is serviceable before first deploy.
install -d -o "$DEPLOY_USER" -g www-data -m 2775 /var/www/laravel/releases/placeholder/public
if [[ ! -e /var/www/laravel/current ]]; then
  ln -sfn /var/www/laravel/releases/placeholder /var/www/laravel/current
fi

nginx -t
systemctl reload nginx

# -------------------------------------------------------------- systemd -------
log "Installing the Next.js systemd unit"
install -m 0644 "${SCRIPT_DIR}/nextjs.service" /etc/systemd/system/nextjs.service
systemctl daemon-reload
systemctl enable nextjs
# Not started yet: /var/www/next/current does not exist until the first deploy.

# -------------------------------------------------------------- hardening -----
log "Hardening SSH and enabling fail2ban"
cat > /etc/ssh/sshd_config.d/99-hardening.conf <<'SSHCONF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
SSHCONF
systemctl reload ssh || systemctl reload sshd || true

cat > /etc/fail2ban/jail.d/sshd.local <<'JAIL'
[sshd]
enabled  = true
maxretry = 5
findtime = 10m
bantime  = 1h
JAIL
systemctl enable --now fail2ban

systemctl enable --now unattended-upgrades

# ---------------------------------------------------------------- summary -----
cat <<SUMMARY

============================================================================
Bootstrap complete.

  Site origin      : ${SITE_ORIGIN}
  MySQL database   : ${MYSQL_DB}
  MySQL user       : ${MYSQL_USER}
  MySQL password   : ${MYSQL_PASSWORD}
                     (also written to /var/www/laravel/shared/.env)

  Next.js env      : /var/www/next/shared/next.env
  Laravel env      : /var/www/laravel/shared/.env

Next steps:
  1. Add the CI deploy public key to
       /home/${DEPLOY_USER}/.ssh/authorized_keys
  2. Push the 'azure-vm' and 'azure-vm-backend' branches to run the workflows.
  3. Once DNS points here:
       sudo certbot --nginx -d thekavindu.lk -d www.thekavindu.lk
     then update SITE_ORIGIN values in both env files and redeploy the frontend.

Useful checks:
  systemctl status nextjs
  journalctl -u nextjs -f
  tail -f /var/log/nginx/thekavindu.error.log
============================================================================
SUMMARY
