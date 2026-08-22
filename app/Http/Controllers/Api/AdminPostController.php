<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AdminPostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = min(max((int) $request->query('per_page', 20), 1), 100);

        $posts = Post::query()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate($perPage);

        return response()->json([
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request);
        $data['author_id'] = $request->user()?->id;

        $post = Post::query()->create($data);

        return response()->json([
            'data' => $post,
            'message' => 'Post created successfully.',
        ], Response::HTTP_CREATED);
    }

    public function show(Post $post): JsonResponse
    {
        return response()->json(['data' => $post]);
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        $data = $this->validatedData($request, $post);

        $post->update($data);

        return response()->json([
            'data' => $post->fresh(),
            'message' => 'Post updated successfully.',
        ]);
    }

    public function destroy(Post $post): JsonResponse
    {
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.',
        ]);
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
