<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\ProductAttribute;
use App\Models\AttributeValue;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('categories');

        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'category_id' => 'required|integer',
            'price' => 'required|numeric',
            'price_sale' => 'nullable|numeric',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
            'attributes' => 'nullable|array',
        ]);

        DB::beginTransaction();
        try {
            $product = Product::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'quantity' => $request->quantity,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'price_sale' => $request->price_sale,
                'status' => $request->status,
            ]);

            // Save product attributes (biến thể)
            if ($request->has('attributes')) {
                foreach ($request->attributes as $attributeSet) {
                    // Tạo bản ghi product_attributes
                    $productAttribute = ProductAttribute::create([
                        'product_id' => $product->id,
                    ]);

                    foreach ($attributeSet['values'] as $attrValue) {
                        AttributeValue::create([
                            'attribute_id' => $attributeSet['attribute_id'],
                            'product_attribute_id' => $productAttribute->id,
                            'value' => $attrValue,
                            'status' => 1,
                        ]);
                    }
                }
            }

            // Upload ảnh sản phẩm chính
            if ($request->hasFile('image')) {
                $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('products', $filename, 'public');
                $product->image = 'products/' . $filename;
            }
            
            if ($request->hasFile('second_image')) {
                $secondFilename = time() . '_' . $request->file('second_image')->getClientOriginalName();
                $request->file('second_image')->storeAs('products', $secondFilename, 'public');
                $product->second_image = 'products/' . $secondFilename;
            }

            DB::commit();
            return response()->json(['message' => 'Thêm sản phẩm thành công'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi khi thêm sản phẩm', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $product = Product::with(['images', 'attributes.attribute', 'categories'])->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'category_id' => 'required|integer',
            'price' => 'required|numeric',
            'price_sale' => 'nullable|numeric',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
            'attributes' => 'nullable|array',
        ]);
    
        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);
    
            $product->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'quantity' => $request->quantity,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'price_sale' => $request->price_sale,
                'status' => $request->status,
            ]);
    
            // Xóa các biến thể cũ
            $oldProductAttributes = $product->attributes; // quan hệ hasMany ProductAttribute
            foreach ($oldProductAttributes as $productAttr) {
                // Xóa tất cả attribute_values của biến thể
                AttributeValue::where('product_attribute_id', $productAttr->id)->delete();
                $productAttr->delete();
            }
    
            // Thêm lại các biến thể mới
            if ($request->has('attributes')) {
                foreach ($request->attributes as $attributeSet) {
                    $productAttribute = ProductAttribute::create([
                        'product_id' => $product->id,
                    ]);
    
                    foreach ($attributeSet['values'] as $attrValue) {
                        AttributeValue::create([
                            'attribute_id' => $attributeSet['attribute_id'],
                            'product_attribute_id' => $productAttribute->id,
                            'value' => $attrValue,
                            'status' => 1,
                        ]);
                    }
                }
            }
    
            // Cập nhật lại ảnh nếu có upload mới
            if ($request->hasFile('image')) {
                $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('products', $filename, 'public');
                $product->image = 'products/' . $filename;
            }
            
            if ($request->hasFile('second_image')) {
                $secondFilename = time() . '_' . $request->file('second_image')->getClientOriginalName();
                $request->file('second_image')->storeAs('products', $secondFilename, 'public');
                $product->second_image = 'products/' . $secondFilename;
            }

            DB::commit();
            return response()->json(['message' => 'Cập nhật sản phẩm thành công']);
    
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi khi cập nhật sản phẩm', 'error' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Đã xóa sản phẩm']);
    }
}
