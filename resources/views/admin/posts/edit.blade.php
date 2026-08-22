@extends('layouts.admin')

@section('title', 'Edit Post')

@section('content')
    <div class="card">
        <h1 style="margin-top:0;">Edit Post</h1>
        <form method="POST" action="{{ route('admin.posts.update', $post) }}">
            @csrf
            @method('PUT')
            @include('admin.posts._form', ['submitLabel' => 'Update Post', 'post' => $post])
        </form>
    </div>
@endsection
