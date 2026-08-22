@extends('layouts.admin')

@section('title', 'Create Post')

@section('content')
    <div class="card">
        <h1 style="margin-top:0;">Create Post</h1>
        <form method="POST" action="{{ route('admin.posts.store') }}">
            @csrf
            @include('admin.posts._form', ['submitLabel' => 'Create Post'])
        </form>
    </div>
@endsection
