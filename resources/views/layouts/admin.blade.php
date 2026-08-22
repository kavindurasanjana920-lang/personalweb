<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin Panel')</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
        a { color: #1d4ed8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .container { max-width: 980px; margin: 0 auto; padding: 20px; }
        .topbar { background: #111827; color: #fff; }
        .topbar a { color: #fff; }
        .topbar .container { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
        .status { background: #dcfce7; border: 1px solid #86efac; color: #166534; border-radius: 10px; padding: 10px 12px; margin-bottom: 12px; }
        .errors { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; border-radius: 10px; padding: 10px 12px; margin-bottom: 12px; }
        .btn { display: inline-block; border: 0; border-radius: 8px; padding: 10px 14px; cursor: pointer; font-weight: 600; }
        .btn-primary { background: #1d4ed8; color: #fff; }
        .btn-danger { background: #b91c1c; color: #fff; }
        .btn-muted { background: #e2e8f0; color: #0f172a; }
        .input, .textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; font: inherit; box-sizing: border-box; }
        .textarea { min-height: 220px; }
        .grid { display: grid; gap: 14px; }
        .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { border-bottom: 1px solid #e2e8f0; padding: 10px; text-align: left; vertical-align: top; }
        .pill { display: inline-block; border-radius: 999px; padding: 4px 10px; font-size: 12px; }
        .pill-ok { background: #dcfce7; color: #166534; }
        .pill-draft { background: #e2e8f0; color: #334155; }
    </style>
</head>
<body>
<header class="topbar">
    <div class="container">
        <strong>Laravel Blog Admin</strong>
        <nav>
            <a href="{{ route('blog.index') }}">View Blog</a>
            @auth
                &nbsp;|&nbsp;
                <a href="{{ route('admin.posts.index') }}">Posts</a>
                &nbsp;|&nbsp;
                <form method="POST" action="{{ route('admin.logout') }}" style="display:inline;">
                    @csrf
                    <button type="submit" style="background:none;border:0;color:#fff;cursor:pointer;padding:0;font:inherit;">Logout</button>
                </form>
            @endauth
        </nav>
    </div>
</header>

<main class="container">
    @if (session('status'))
        <div class="status">{{ session('status') }}</div>
    @endif

    @if ($errors->any())
        <div class="errors">
            <ul style="margin:0; padding-left:18px;">
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
