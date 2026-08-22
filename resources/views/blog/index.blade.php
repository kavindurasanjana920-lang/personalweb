@extends('layouts.blog')

@section('title', 'Blog')

@section('content')
    <div class="card">
        <h1 style="margin-top:0;">Blog Posts</h1>
        <p class="meta" style="margin-bottom:0;">Latest published posts from the Laravel backend.</p>
    </div>

    @forelse ($posts as $post)
        <article class="card">
            <h2 style="margin-top:0; margin-bottom:8px;">
                <a href="{{ route('blog.show', $post->slug) }}">{{ $post->title }}</a>
            </h2>
            <p class="meta">
                Published {{ optional($post->published_at)->format('M d, Y') ?? $post->created_at->format('M d, Y') }}
            </p>
            @if ($post->cover_image)
                <img src="{{ $post->cover_image }}" alt="{{ $post->title }}" class="cover">
            @endif
            <p style="margin-bottom:0;">
                {{ $post->excerpt ?: \Illuminate\Support\Str::limit(strip_tags($post->content), 180) }}
            </p>
        </article>
    @empty
        <div class="card">
            <p style="margin:0;">No published posts yet.</p>
        </div>
    @endforelse

    @if ($posts->hasPages())
        <div class="pagination">
            <div>
                @if ($posts->previousPageUrl())
                    <a href="{{ $posts->previousPageUrl() }}">&larr; Previous</a>
                @endif
            </div>
            <div>
                @if ($posts->nextPageUrl())
                    <a href="{{ $posts->nextPageUrl() }}">Next &rarr;</a>
                @endif
            </div>
        </div>
    @endif
@endsection
