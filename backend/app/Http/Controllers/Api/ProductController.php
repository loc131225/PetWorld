<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('attributes.attributeValues');

        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        return response()->json($query->paginate(10));
    }

    public function show($id)
    {
        $product = Product::with('attributes.attributeValues')->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // Lưu ảnh nếu có
            if ($request->hasFile('image')) {
                $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('products', $filename, 'public');
            } else {
                $filename = null;
            }

            // Tạo sản phẩm
            $product = Product::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'image' => $filename,
                'status' => $request->status,
            ]);

            // Tạo biến thể sản phẩm
            foreach ($request->product_attributes as $pa) {
                $productAttr = ProductAttribute::create([
                    'product_id' => $product->id,
                    'price' => $pa['price'],
                    'quantity' => $pa['quantity'],
                    'status' => $pa['status'],
                ]);

                foreach ($pa['attributes'] as $attr) {
                    AttributeValue::create([
                        'product_attribute_id' => $productAttr->id,
                        'attribute_id' => $attr['attribute_id'],
                        'value' => $attr['value'],
                        'status' => 1,
                    ]);
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

            // Cập nhật ảnh nếu có ảnh mới
            if ($request->hasFile('image')) {
                // Xóa ảnh cũ nếu có
                if ($product->image) {
                    Storage::disk('public')->delete('products/' . $product->image);
                }

                $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('products', $filename, 'public');
            } else {
                $filename = $product->image;
            }

            // Cập nhật thông tin sản phẩm
            $product->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'image' => $filename,
                'status' => $request->status,
            ]);

            // Xóa các biến thể và attribute value cũ
            $product->attributes()->each(function ($pa) {
                $pa->attributeValues()->delete();
                $pa->delete();
            });

            // Tạo lại các biến thể mới
            foreach ($request->product_attributes as $pa) {
                $productAttr = ProductAttribute::create([
                    'product_id' => $product->id,
                    'price' => $pa['price'],
                    'quantity' => $pa['quantity'],
                    'status' => $pa['status'],
                ]);

                foreach ($pa['attributes'] as $attr) {
                    AttributeValue::create([
                        'product_attribute_id' => $productAttr->id,
                        'attribute_id' => $attr['attribute_id'],
                        'value' => $attr['value'],
                        'status' => 1,
                    ]);
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

        $product->attributes()->each(function ($pa) {
            $pa->attributeValues()->delete();
            $pa->delete();
        });

        if ($product->image) {
            Storage::disk('public')->delete('products/' . $product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Đã xóa sản phẩm']);
    }
}

