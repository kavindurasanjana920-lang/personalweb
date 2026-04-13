<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

## Laravel API Backend + Next Frontend (Web Hosting Ready)

This repository includes a Laravel API app at [laravel-blog](laravel-blog) and a static Next.js frontend.

### Architecture

- Next.js app (root project): public blog UI + admin UI (`/admin/login`, `/admin/posts`).
- Laravel app ([laravel-blog](laravel-blog)): auth + blog CRUD API (Sanctum token auth).

### Laravel API Quick Start

1. Open backend folder:

   ```bash
   cd laravel-blog
   ```

2. Configure environment:

   - Copy `.env.example` to `.env`
   - Set MySQL credentials in `.env`
   - Set CORS allowed frontend origins in `.env`:

   ```bash
   CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
   ```

3. Run migrations:

   ```bash
   php artisan migrate
   ```

4. Create first admin user:

   ```bash
   php artisan app:create-admin-user admin@example.com --name="Admin"
   ```

5. Run backend locally:

   ```bash
   php artisan serve
   ```

### Next.js Environment

Set these in the root Next.js app environment:

```bash
NEXT_PUBLIC_BLOG_URL=/blog/
NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000/api
```

### API Endpoints

- `GET /api/posts`
- `GET /api/posts/{slug}`
- `POST /api/admin/login`
- `GET /api/admin/me` (Bearer token)
- `POST /api/admin/logout` (Bearer token)
- `GET /api/admin/posts` (Bearer token + admin)
- `POST /api/admin/posts` (Bearer token + admin)
- `PUT /api/admin/posts/{id}` (Bearer token + admin)
- `DELETE /api/admin/posts/{id}` (Bearer token + admin)

### Shared Hosting Rewrite

For static hosting, pretty blog URLs like `/blog/my-post` are handled by rewriting to the static blog shell page (`/blog/index.html`).
The project root [.htaccess](.htaccess) already includes this rule.

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
