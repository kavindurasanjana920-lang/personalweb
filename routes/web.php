<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Laravel Blog API',
        'status' => 'ok',
        'public_posts_endpoint' => '/api/posts',
    ]);
});
