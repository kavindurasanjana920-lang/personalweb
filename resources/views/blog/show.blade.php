@extends('layouts.blog')

@section('title', $post->meta_title ?: $post->title)

@section('content')
    <article class="card">
        <p style="margin:0 0 8px;"><a href="{{ route('blog.index') }}">&larr; Back to Blog</a></p>
        <h1 style="margin:0 0 8px;">{{ $post->title }}</h1>
        <p class="meta" style="margin-top:0;">
            Published {{ optional($post->published_at)->format('M d, Y H:i') ?? $post->created_at->format('M d, Y H:i') }}
        </p>

        @if ($post->cover_image)
            <img src="{{ $post->cover_image }}" alt="{{ $post->title }}" class="cover">
        @endif

        @if ($post->excerpt)
            <p style="font-size:18px; color:#334155;"><em>{{ $post->excerpt }}</em></p>
        @endif

        <div style="line-height:1.7; white-space:normal;">
            {!! nl2br(e($post->content)) !!}
        </div>
    </article>
@endsection
