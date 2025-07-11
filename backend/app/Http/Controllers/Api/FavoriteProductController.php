<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FavoriteProduct;
use App\Models\Product;

class FavoriteProductController extends Controller
{
    public function add(Request $request){
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Người dùng chưa đăng nhập'
            ], 401);
        }

        $userId = $user->id;
        $productId = $request->product_id;

        // Kiểm tra sản phẩm đã được yêu thích chưa
        $exists = FavoriteProduct::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm đã có trong danh sách yêu thích'
            ]);
        }

        FavoriteProduct::create([
            'user_id' => $userId,
            'product_id' => $productId
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Đã thêm sản phẩm vào danh sách yêu thích'
        ]);
    }

    public function remove(Request $request){
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $userId = $request->user()->id;
        $productId = $request->product_id;

        $favorite = FavoriteProduct::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if (!$favorite) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không có trong danh sách yêu thích'
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'status' => true,
            'message' => 'Đã xóa sản phẩm khỏi danh sách yêu thích'
        ]);
    }

    public function list(Request $request){
        $userId = $request->user()->id;

        // Lấy danh sách sản phẩm yêu thích của người dùng
        $favorites = FavoriteProduct::with('user', 'product')
            ->where('user_id', $userId)
            ->latest()
            ->get();

        if($favorites->isEmpty()){
            return response()->json([
                'status' => false,
                'message' => 'Danh sách yêu thích trống',
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm yêu thích',
            'data' => $favorites->pluck('product')
        ]);
    }
}
