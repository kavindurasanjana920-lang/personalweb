@extends('layouts.admin')

@section('title', 'Admin Login')

@section('content')
    <div class="card" style="max-width:460px; margin:0 auto;">
        <h1 style="margin-top:0;">Admin Login</h1>
        <p style="color:#475569;">Sign in to manage blog posts.</p>

        <form method="POST" action="{{ route('admin.login.submit') }}" class="grid">
            @csrf
            <div>
                <label for="email">Email</label>
                <input id="email" name="email" type="email" class="input" value="{{ old('email') }}" required autofocus>
            </div>

            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" class="input" required>
            </div>

            <label style="display:flex; align-items:center; gap:8px;">
                <input type="checkbox" name="remember" value="1" @checked(old('remember'))>
                Remember me
            </label>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
@endsection
