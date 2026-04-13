<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $posts = Post::query()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate(12);

        return view('admin.posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('admin.posts.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatedData($request);
        $data['author_id'] = $request->user()?->id;

        Post::query()->create($data);

        return redirect()
            ->route('admin.posts.index')
            ->with('status', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): RedirectResponse
    {
        return redirect()->route('blog.show', $post->slug);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): View
    {
        return view('admin.posts.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $data = $this->validatedData($request, $post);

        $post->update($data);

        return redirect()
            ->route('admin.posts.index')
            ->with('status', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()
            ->route('admin.posts.index')
            ->with('status', 'Post deleted.');
    }

    private function validatedData(Request $request, ?Post $post = null): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'cover_image' => ['nullable', 'url', 'max:2048'],
            'content' => ['required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:320'],
        ]);

        $baseSlug = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['slug'] = $this->uniqueSlug($baseSlug, $post?->id);
        $validated['is_published'] = $request->boolean('is_published');

        if (! $validated['is_published']) {
            $validated['published_at'] = null;
        } elseif (empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        return $validated;
    }

    private function uniqueSlug(string $slug, ?int $ignorePostId = null): string
    {
        $base = trim($slug) !== '' ? Str::slug($slug) : 'post';
        $candidate = $base;
        $count = 1;

        while (
            Post::query()
                ->where('slug', $candidate)
                ->when($ignorePostId !== null, fn ($query) => $query->where('id', '!=', $ignorePostId))
                ->exists()
        ) {
            $candidate = $base.'-'.$count;
            $count++;
        }

        return $candidate;
    }
}
