<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Lấy danh sách sản phẩm kèm lọc tìm kiếm, danh mục, ngày tạo và best seller
    public function index(Request $request)
    {
        $query = Product::with('categories');

        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('name', $request->category); // hoặc category_id nếu frontend gửi id
            });
        }

        if ($request->date === 'newest') {
            $query->orderBy('created_at', 'desc');
        } elseif ($request->date === 'oldest') {
            $query->orderBy('created_at', 'asc');
        }

        if ($request->best_seller == 1) {
            $query->where('is_best_seller', 1);
        }

        $products = $query->paginate(5);

        return response()->json($products);
    }

    // Tạo mới sản phẩm và gán danh mục + thuộc tính
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'sale_price' => 'nullable|numeric',
            'stock_quantity' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'second_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required|boolean',
            'category_ids' => 'array|nullable',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('second_image')) {
            $validated['second_image'] = $request->file('second_image')->store('products', 'public');
        }

        $product = Product::create($validated);
        $product->categories()->sync($request->category_ids ?? []);

        if ($request->has('attributes')) {
            foreach ($request->attributes as $attr) {
                $productAttr = $product->productAttributes()->create();
                foreach ($attr['values'] as $value) {
                    $productAttr->attributeValues()->create([
                        'attribute_id' => $attr['attribute_id'],
                        'value' => $value,
                        'status' => 1,
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Thêm sản phẩm thành công', 'product' => $product], 201);
    }

    // Lấy chi tiết sản phẩm kèm danh mục và thuộc tính
    public function show($id)
    {
        $product = Product::with(['categories', 'productAttributes.attributeValues'])->findOrFail($id);
        return response()->json($product);
    }

    // Cập nhật sản phẩm, danh mục và thuộc tính
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'slug' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'sale_price' => 'nullable|numeric',
            'stock_quantity' => 'sometimes|required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'second_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'sometimes|required|boolean',
            'category_ids' => 'array|nullable',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('second_image')) {
            if ($product->second_image) {
                Storage::disk('public')->delete($product->second_image);
            }
            $validated['second_image'] = $request->file('second_image')->store('products', 'public');
        }

        $product->update($validated);
        $product->categories()->sync($request->category_ids ?? []);

       // Xoá thuộc tính cũ nếu request có cờ remove
        if ($request->boolean('remove_attributes')) {
            foreach ($product->productAttributes as $productAttribute) {
                $productAttribute->attributeValues()->delete();
                $productAttribute->delete();
            }
        }

        // Thêm thuộc tính mới nếu request có attributes
        if ($request->has('attributes')) {
            foreach ($request->attributes as $attr) {
                $productAttr = $product->productAttributes()->create();
                foreach ($attr['values'] as $value) {
                    $productAttr->attributeValues()->create([
                        'attribute_id' => $attr['attribute_id'],
                        'value' => $value,
                        'status' => 1,
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Cập nhật sản phẩm thành công']);
    }

    // Xoá sản phẩm + liên kết danh mục và thuộc tính nếu có
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->categories()->detach();

        // Xoá thuộc tính và value
        foreach ($product->productAttributes as $productAttribute) {
            $productAttribute->attributeValues()->delete();
            $productAttribute->delete();
        }

        $product->delete();

        return response()->json(['message' => 'Xoá sản phẩm thành công']);
    }
}
