<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Danh sách sản phẩm có lọc
    public function index(Request $request)
    {
        $query = Product::with(['categories', 'productAttributes']);

        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        if ($request->date === 'newest') {
            $query->orderBy('created_at', 'desc');
        } elseif ($request->date === 'oldest') {
            $query->orderBy('created_at', 'asc');
        }

        // Bạn có thể thêm best_seller nếu trường này có trong bảng
        // if ($request->best_seller == 1) {
        //     $query->where('is_best_seller', 1);
        // }

        $products = $query->paginate(5);
        return response()->json($products);
    }

    // Tạo sản phẩm + gán danh mục + biến thể (product_attributes)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'second_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required|boolean',
            'category_ids' => 'nullable|array',
            'attributes' => 'nullable|array',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('products', $filename, 'public');
            $validated['image'] = $filename;
        }

        if ($request->hasFile('second_image')) {
            $filename2 = time() . '_' . $request->file('second_image')->getClientOriginalName();
            $request->file('second_image')->storeAs('products', $filename2, 'public');
            $validated['second_image'] = $filename2;
        }

        $product = Product::create($validated);
        $product->categories()->sync($request->category_ids ?? []);

        if ($request->has('attributes')) {
            foreach ($request->attributes as $attr) {
                $product->productAttributes()->create([
                    'price' => $attr['price'],
                    'sale_price' => $attr['sale_price'] ?? null,
                    'stock_quantity' => $attr['stock_quantity'] ?? 0,
                ]);
            }
        }

        return response()->json([
            'message' => 'Thêm sản phẩm thành công',
            'product' => $product->load('productAttributes')
        ], 201);
    }

    // Chi tiết sản phẩm
    public function show($id)
    {
        $product = Product::with(['categories', 'productAttributes'])->findOrFail($id);
        return response()->json($product);
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'slug' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'second_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'sometimes|required|boolean',
            'category_ids' => 'nullable|array',
            'attributes' => 'nullable|array',
            'remove_attributes' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete('products/' . $product->image);
            }
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('products', $filename, 'public');
            $validated['image'] = $filename;
        }

        if ($request->hasFile('second_image')) {
            if ($product->second_image) {
                Storage::disk('public')->delete('products/' . $product->second_image);
            }
            $filename2 = time() . '_' . $request->file('second_image')->getClientOriginalName();
            $request->file('second_image')->storeAs('products', $filename2, 'public');
            $validated['second_image'] = $filename2;
        }

        $product->update($validated);
        $product->categories()->sync($request->category_ids ?? []);

        // Xoá toàn bộ biến thể cũ nếu được yêu cầu
        if ($request->boolean('remove_attributes')) {
            $product->productAttributes()->delete();
        }

        // Thêm lại biến thể mới
        if ($request->has('attributes')) {
            foreach ($request->attributes as $attr) {
                $product->productAttributes()->create([
                    'price' => $attr['price'],
                    'sale_price' => $attr['sale_price'] ?? null,
                    'stock_quantity' => $attr['stock_quantity'] ?? 0,
                ]);
            }
        }

        return response()->json(['message' => 'Cập nhật sản phẩm thành công']);
    }

    // Xoá sản phẩm
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->categories()->detach();
        $product->productAttributes()->delete();
        $product->delete();

        return response()->json(['message' => 'Xoá sản phẩm thành công']);
    }
}
