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
            ->get(['id', 'title', 'thumbnail' , 'created_at']);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách tin tức mới nhất',
            'data' => $news
        ]);
    }
}
