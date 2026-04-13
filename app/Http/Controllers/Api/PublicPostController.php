<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicPostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = min(max((int) $request->query('per_page', 10), 1), 50);

        $posts = Post::query()
            ->published()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate($perPage);

        $items = collect($posts->items())->map(function (Post $post): array {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'cover_image' => $post->cover_image,
                'published_at' => optional($post->published_at)?->toISOString(),
                'created_at' => optional($post->created_at)?->toISOString(),
            ];
        })->values();

        return response()->json([
            'data' => $items,
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $post = Post::query()
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'cover_image' => $post->cover_image,
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
                'published_at' => optional($post->published_at)?->toISOString(),
                'created_at' => optional($post->created_at)?->toISOString(),
            ],
        ]);
    }
}
