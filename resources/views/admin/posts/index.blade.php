@extends('layouts.admin')

@section('title', 'Manage Posts')

@section('content')
    <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:12px;">
            <div>
                <h1 style="margin:0;">Posts</h1>
                <p style="color:#475569; margin:4px 0 0;">Create and manage blog posts.</p>
            </div>
            <a href="{{ route('admin.posts.create') }}" class="btn btn-primary">+ New Post</a>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Published At</th>
                    <th style="width:180px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($posts as $post)
                    <tr>
                        <td>
                            <strong>{{ $post->title }}</strong>
                            <div style="font-size:13px; color:#64748b;">/{{ $post->slug }}</div>
                        </td>
                        <td>
                            @if ($post->is_published)
                                <span class="pill pill-ok">Published</span>
                            @else
                                <span class="pill pill-draft">Draft</span>
                            @endif
                        </td>
                        <td>{{ optional($post->published_at)->format('Y-m-d H:i') ?: '-' }}</td>
                        <td>
                            <a href="{{ route('admin.posts.edit', $post) }}" class="btn btn-muted" style="padding:6px 10px;">Edit</a>
                            <form method="POST" action="{{ route('admin.posts.destroy', $post) }}" style="display:inline;" onsubmit="return confirm('Delete this post?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" style="padding:6px 10px;">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">No posts yet.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        @if ($posts->hasPages())
            <div style="display:flex; justify-content:space-between; margin-top:16px;">
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
    </div>
@endsection
