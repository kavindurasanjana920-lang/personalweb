@php
    $publishedAtValue = old('published_at');
    if ($publishedAtValue === null && isset($post) && $post->published_at) {
        $publishedAtValue = $post->published_at->format('Y-m-d\\TH:i');
    }
@endphp

<div class="grid">
    <div>
        <label for="title">Title</label>
        <input id="title" name="title" class="input" required value="{{ old('title', $post->title ?? '') }}">
    </div>

    <div>
        <label for="slug">Slug (optional)</label>
        <input id="slug" name="slug" class="input" placeholder="auto-generated-from-title" value="{{ old('slug', $post->slug ?? '') }}">
    </div>

    <div>
        <label for="excerpt">Excerpt (optional)</label>
        <textarea id="excerpt" name="excerpt" class="input" rows="3">{{ old('excerpt', $post->excerpt ?? '') }}</textarea>
    </div>

    <div>
        <label for="cover_image">Cover Image URL (optional)</label>
        <input id="cover_image" name="cover_image" type="url" class="input" placeholder="https://..." value="{{ old('cover_image', $post->cover_image ?? '') }}">
    </div>

    <div>
        <label for="content">Content</label>
        <textarea id="content" name="content" class="textarea" required>{{ old('content', $post->content ?? '') }}</textarea>
    </div>

    <div class="grid grid-2">
        <div>
            <label for="meta_title">Meta Title (optional)</label>
            <input id="meta_title" name="meta_title" class="input" value="{{ old('meta_title', $post->meta_title ?? '') }}">
        </div>

        <div>
            <label for="meta_description">Meta Description (optional)</label>
            <input id="meta_description" name="meta_description" class="input" value="{{ old('meta_description', $post->meta_description ?? '') }}">
        </div>
    </div>

    <div class="grid grid-2">
        <label style="display:flex; align-items:center; gap:8px; margin-top:28px;">
            <input type="checkbox" name="is_published" value="1" @checked(old('is_published', $post->is_published ?? false))>
            Published
        </label>

        <div>
            <label for="published_at">Published At (optional)</label>
            <input id="published_at" type="datetime-local" name="published_at" class="input" value="{{ $publishedAtValue }}">
        </div>
    </div>

    <div style="display:flex; gap:10px;">
        <button type="submit" class="btn btn-primary">{{ $submitLabel }}</button>
        <a href="{{ route('admin.posts.index') }}" class="btn btn-muted">Cancel</a>
    </div>
</div>
