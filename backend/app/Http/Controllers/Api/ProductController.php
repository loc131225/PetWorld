<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //1. Sản phẩm thuộc danh mục chó
    public function dogProducts(){
        $categoryId = Category::where('name', 'like', 'Dành cho chó')->value('id');
        if (!$categoryId) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy danh mục chó',
                'data' => []
            ]);
        }

        $products = Product::whereHas('categories', function ($query) use ($categoryId){
            $query->where('categories.id', $categoryId);
        })->latest()->take(4)->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm thuộc danh mục chó',
            'data' => $products
        ]);
    }

    //2. Sản phẩm thuộc danh mục mèo
    public function catProducts(){
        $categoryId = Category::where('name', 'like', 'Dành cho mèo')->value('id');

        if (!$categoryId) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy danh mục mèo',
                'data' => []
            ]);
        }

        $products = Product::whereHas('categories', function ($query) use ($categoryId){
            $query->where('categories.id', $categoryId);
        })->latest()->take(4)->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm thuộc danh mục mèo',
            'data' => $products
        ]);
    }

    //3. Sản phẩm bán chạy nhất
    public function bestSellingProducts(){
        $products = DB::table('products')
            ->where('products.status', 1)
            ->join('product_attributes', 'products.id', '=', 'product_attributes.product_id')
            ->join('order_items', 'product_attributes.id', '=', 'order_items.product_attribute_id')
            ->select('products.id', 'products.name', 'products.slug', 'products.price', 'products.sale_price', 'products.image', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->groupBy('products.id', 'products.name', 'products.slug', 'products.price', 'products.sale_price', 'products.image')
            ->orderByDesc('total_sold')
            ->limit(4)
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm bán chạy nhất',
            'data' => $products
        ]);
    }

    //4. Chi tiết sản phẩm
    public function show($slug){
        $product = Product::where('slug', $slug)
            ->with([
                'attributes.attributeValues',
                'ratings.user',
                'categories.products'
            ])->first();

        if(!$product){
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại',
            ], 404);
        }

        // Lấy danh sách sản phẩm cùng danh mục
        $relatedProducts = Product::whereHas('categories', function ($query) use ($product){
            return $query->whereIn('categories.id', $product->categories->pluck('id'));
        })
            ->where('id', '!=', $product->id) // Loại trừ sản phẩm hiện tại
            ->latest()
            ->take(4)
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Chi tiết sản phẩm',
            'data' => [
                'product' => $product,
                'related_products' => $relatedProducts
            ]
        ]);
    }
//tìm kiếm
     public function search(Request $request)
{
    $query = $request->input('q');

    if (!$query) {
        return response()->json([
            'status' => 'error',
            'message' => 'Vui lòng nhập từ khóa tìm kiếm'
        ], 400);
    }

    $products = Product::where('name', 'LIKE', '%' . $query . '%')
        ->orWhere('description', 'LIKE', '%' . $query . '%')
        ->get();

    return response()->json([
        'status' => 'success',
        'products' => $products,
    ]);
}
}
