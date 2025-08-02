<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['productAttributes.attributeValues', 'categories']);

        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        return response()->json($query->paginate(10));
    }

    public function show($id)
    {
        $product = Product::with(['productAttributes.attributeValues', 'categories'])->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // Lưu ảnh chính
            $filename = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('products', $filename, 'public');
            }

            // Lưu ảnh phụ
            if ($request->hasFile('second_image')) {
                $secondImage = $request->file('second_image');
                $secondImageName = time() . '_second_' . $secondImage->getClientOriginalName();
                $secondImage->storeAs('products', $secondImageName, 'public');
            } else {
                $secondImageName = null;
            }

            // Xử lý slug không trùng
            $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($request->name);
            $slug = $baseSlug;
            $i = 1;
            while (Product::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $i++;
            }

            // Tạo sản phẩm
            $product = Product::create([
                'name' => $request->name,
                'slug' => $slug,
                'description' => $request->description,
                'image' => $filename,
                'second_image' => $secondImageName,
                'status' => $request->status,
            ]);

            // Gắn danh mục
            if ($request->filled('categories')) {
                $categoryIds = $request->input('categories');

                // Nếu là chuỗi (VD: "1,2,3") thì explode
                if (is_string($categoryIds)) {
                    $categoryIds = explode(',', $categoryIds);
                }

                // Nếu là object có mảng bên trong
                if (is_array($categoryIds)) {
                    $categoryIds = array_map(function ($cat) {
                        return is_array($cat) ? ($cat['id'] ?? null) : $cat;
                    }, $categoryIds);
                }

                // Gắn vào bảng trung gian
                $product->categories()->sync(array_filter($categoryIds));
            }

            // Tạo biến thể
            if ($request->has('product_attributes') && is_array($request->product_attributes)) {
                foreach ($request->product_attributes as $pa) {
                    $productAttr = ProductAttribute::create([
                        'product_id' => $product->id,
                        'price' => $pa['price'],
                        'sale_price' => $pa['sale_price'],
                        'stock_quantity' => $pa['stock_quantity'],
                        'status' => $pa['status'] ?? 1,
                    ]);

                    if (isset($pa['attributes']) && is_array($pa['attributes'])) {
                        foreach ($pa['attributes'] as $attr) {
                            AttributeValue::create([
                                'product_attribute_id' => $productAttr->id,
                                'attribute_id' => $attr['attribute_id'],
                                'value' => $attr['value'],
                                'status' => 1,
                            ]);
                        }
                    }
                }
            }

            DB::commit();
            return response()->json(['message' => 'Thêm sản phẩm thành công']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $product = Product::findOrFail($id);

            // Cập nhật ảnh chính
            if ($request->hasFile('image')) {
                if ($product->image) {
                    Storage::disk('public')->delete('products/' . $product->image);
                }
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('products', $filename, 'public');
            } else {
                $filename = $product->image;
            }

            // Cập nhật ảnh phụ
            if ($request->hasFile('second_image')) {
                if ($product->second_image) {
                    Storage::disk('public')->delete('products/' . $product->second_image);
                }
                $secondImage = $request->file('second_image');
                $secondImageName = time() . '_second_' . $secondImage->getClientOriginalName();
                $secondImage->storeAs('products', $secondImageName, 'public');
            } else {
                $secondImageName = $product->second_image;
            }

            // Xử lý slug cập nhật
            $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($request->name);
            $slug = $baseSlug;
            $i = 1;
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = $baseSlug . '-' . $i++;
            }

            // Cập nhật sản phẩm
            $product->update([
                'name' => $request->name,
                'slug' => $slug,
                'description' => $request->description,
                'image' => $filename,
                'second_image' => $secondImageName,
                'status' => $request->status,
            ]);

            // Cập nhật danh mục
            if ($request->filled('categories')) {
                $categoryIds = $request->input('categories');

                // Nếu là chuỗi (VD: "1,2,3") thì explode
                if (is_string($categoryIds)) {
                    $categoryIds = explode(',', $categoryIds);
                }

                // Nếu là object có mảng bên trong
                if (is_array($categoryIds)) {
                    $categoryIds = array_map(function ($cat) {
                        return is_array($cat) ? ($cat['id'] ?? null) : $cat;
                    }, $categoryIds);
                }

                // Gắn vào bảng trung gian
                $product->categories()->sync(array_filter($categoryIds));
            }


            // Xóa cũ - tạo mới
            $product->attributes()->each(function ($pa) {
                $pa->attributeValues()->delete();
                $pa->delete();
            });

            if ($request->has('product_attributes') && is_array($request->product_attributes)) {
                foreach ($request->product_attributes as $pa) {
                    $productAttr = ProductAttribute::create([
                        'product_id' => $product->id,
                        'price' => $pa['price'],
                        'sale_price' => $pa['sale_price'],
                        'stock_quantity' => $pa['stock_quantity'],
                        'status' => $pa['status'] ?? 1,
                    ]);

                    if (isset($pa['attributes']) && is_array($pa['attributes'])) {
                        foreach ($pa['attributes'] as $attr) {
                            AttributeValue::create([
                                'product_attribute_id' => $productAttr->id,
                                'attribute_id' => $attr['attribute_id'],
                                'value' => $attr['value'],
                                'status' => 1,
                            ]);
                        }
                    }
                }
            }

            DB::commit();
            return response()->json(['message' => 'Cập nhật sản phẩm thành công']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Xóa biến thể và attribute_values
        $product->attributes()->each(function ($pa) {
            $pa->attributeValues()->delete();
            $pa->delete();
        });

        // Xóa hình ảnh
        if ($product->image) {
            Storage::disk('public')->delete('products/' . $product->image);
        }
        if ($product->second_image) {
            Storage::disk('public')->delete('products/' . $product->second_image);
        }

        // Xóa liên kết danh mục
        $product->categories()->detach();

        // Xóa sản phẩm
        $product->delete();

        return response()->json(['message' => 'Đã xóa sản phẩm thành công']);
    }
}
