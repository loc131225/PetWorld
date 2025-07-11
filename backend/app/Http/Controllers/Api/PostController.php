<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function homeNews(){
        $news = Post::where('status', 1)
            ->orderByDesc('created_at')
            ->limit(3)
            ->get(['id', 'title', 'thumbnail' , 'content' , 'created_at']);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách tin tức mới nhất',
            'data' => $news
        ]);
    }

    public function index()
    {
        $posts = Post::with(['user', 'category'])
                     ->where('status', 1)
                     ->orderBy('created_at', 'desc')
                     ->get();

        return response()->json($posts);
    }

    // Lấy chi tiết 1 bài viết theo ID
    public function show($id)
    {
        $post = Post::with(['user', 'category'])->findOrFail($id);
        return response()->json($post);
    }
}
