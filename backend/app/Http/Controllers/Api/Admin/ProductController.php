<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
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
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $query = Product::with(['attributes.attributeValues', 'categories']);

        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        $products = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'last_page' => $products->lastPage(),
            ]
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['attributes.attributeValues', 'categories'])->findOrFail($id);
        return response()->json($product);
    }

    public function showById($id)
    {
        $product = Product::with(['categories', 'attributes.attributeValues'])->findOrFail($id);
        $all_attributes = Attribute::where('status', true)->select('id', 'name')->get();

        return response()->json([
            'product' => $product,
            'all_attributes' => $all_attributes
        ]);
    }

    public function store(Request $request)
{
    DB::beginTransaction();

    try {
        $filename = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('products', $filename, 'public');
        }

        $secondImageName = null;
        if ($request->hasFile('second_image')) {
            $secondImage = $request->file('second_image');
            $secondImageName = time() . '_second_' . $secondImage->getClientOriginalName();
            $secondImage->storeAs('products', $secondImageName, 'public');
        }

        // Tạo slug duy nhất
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
            'status' => $request->status ?? 1,
        ]);

        // Gắn danh mục (categories)
        $categoryIds = $request->input('categories');
        if (is_string($categoryIds)) {
            $categoryIds = json_decode($categoryIds, true);
        }
        if (is_array($categoryIds)) {
            $categoryIds = array_map(fn($cat) => is_array($cat) ? ($cat['id'] ?? null) : $cat, $categoryIds);
            $product->categories()->sync(array_filter($categoryIds));
        }

        // Gắn các thuộc tính biến thể (product_attributes)
        $productAttributes = $request->input('product_attributes');
        if (is_string($productAttributes)) {
            $productAttributes = json_decode($productAttributes, true);
        }

        if (is_array($productAttributes)) {
            foreach ($productAttributes as $pa) {
                $productAttr = ProductAttribute::create([
                    'product_id' => $product->id,
                    'price' => $pa['price'],
                    'sale_price' => $pa['sale_price'],
                    'stock_quantity' => $pa['stock_quantity'],
                    'status' => $pa['status'] ?? 1,
                ]);

                // Lưu giá trị thuộc tính
                if (!empty($pa['attributes']) && is_array($pa['attributes'])) {
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

            $baseSlug = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($request->name);
            $slug = $baseSlug;
            $i = 1;
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = $baseSlug . '-' . $i++;
            }

            $product->update([
                'name' => $request->name,
                'slug' => $slug,
                'description' => $request->description,
                'image' => $filename,
                'second_image' => $secondImageName,
                'status' => $request->status,
            ]);
            $categoryIds = $request->input('categories');
            if (is_string($categoryIds)) {
                $categoryIds = json_decode($categoryIds, true);
            }
            if (is_object($categoryIds)) {
                $categoryIds = [ $categoryIds ];
            }
            if (is_array($categoryIds)) {
                $categoryIds = array_map(fn($cat) => is_array($cat) ? ($cat['id'] ?? null) : $cat, $categoryIds);
                $product->categories()->sync(array_filter($categoryIds));
            }

            $product->attributes()->each(function ($pa) {
                $pa->attributeValues()->delete();
                $pa->delete();
            });

            $productAttributes = is_string($request->product_attributes)
                ? json_decode($request->product_attributes, true)
                : $request->product_attributes;

            if (is_array($productAttributes)) {
                foreach ($productAttributes as $pa) {
                    $productAttr = ProductAttribute::create([
                        'product_id' => $product->id,
                        'price' => $pa['price'],
                        'sale_price' => $pa['sale_price'],
                        'stock_quantity' => $pa['stock_quantity'],
                        'status' => $pa['status'] ?? 1,
                    ]);

                    if (!empty($pa['attributes']) && is_array($pa['attributes'])) {
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

        $product->attributes()->each(function ($pa) {
            $pa->attributeValues()->delete();
            $pa->delete();
        });

        if ($product->image) {
            Storage::disk('public')->delete('products/' . $product->image);
        }
        if ($product->second_image) {
            Storage::disk('public')->delete('products/' . $product->second_image);
        }

        $product->categories()->detach();
        $product->delete();

        return response()->json(['message' => 'Đã xóa sản phẩm thành công']);
    }
}
