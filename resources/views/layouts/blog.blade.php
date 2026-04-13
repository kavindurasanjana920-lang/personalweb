<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Blog')</title>
    <style>
        :root { color-scheme: light dark; }
        body { font-family: Arial, sans-serif; margin: 0; background: #f5f7fb; color: #0f172a; }
        a { color: #1d4ed8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .container { max-width: 920px; margin: 0 auto; padding: 20px; }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
        .topbar { background: #0f172a; color: #fff; }
        .topbar a { color: #fff; }
        .topbar .container { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .meta { color: #475569; font-size: 14px; }
        .status { background: #dcfce7; border: 1px solid #86efac; color: #166534; border-radius: 10px; padding: 10px 12px; margin-bottom: 12px; }
        .errors { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; border-radius: 10px; padding: 10px 12px; margin-bottom: 12px; }
        .pagination { display: flex; justify-content: space-between; margin-top: 20px; }
        img.cover { width: 100%; border-radius: 10px; margin-top: 10px; border: 1px solid #e2e8f0; }
    </style>
</head>
<body>
<header class="topbar">
    <div class="container">
        <a href="{{ route('blog.index') }}"><strong>Laravel Blog</strong></a>
        <nav>
            <a href="{{ route('blog.index') }}">Blog Home</a>
            &nbsp;|&nbsp;
            <a href="{{ route('admin.login') }}">Admin Login</a>
        </nav>
    </div>
</header>

<main class="container">
    @if (session('status'))
        <div class="status">{{ session('status') }}</div>
    @endif

    @if ($errors->any())
        <div class="errors">
            <ul style="margin: 0; padding-left: 18px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @yield('content')
</main>
</body>
</html>
