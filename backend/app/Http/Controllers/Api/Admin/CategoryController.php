<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // Lấy danh sách danh mục (kèm tìm kiếm, lọc)
    public function index(Request $request)
    {
        $query = Category::query();

        // Tìm kiếm theo tên
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%$search%");
        }

        // Lọc theo trạng thái
        if (!is_null($request->status)) {
            $query->where('status', $request->status);
        }

        // Sắp xếp theo ngày tạo
        if ($sort = $request->input('sort')) {
            $query->orderBy('created_at', $sort);
        }

        $categories = $query->withCount('products')->paginate(5);

        return response()->json($categories);
    }

    // Thêm danh mục
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|string|max:255',
            'parent_id'   => 'nullable|exists:categories,id',
            'status'      => 'required|in:0,1',
            'slug'        => 'nullable|string|max:255'
        ]);

        $category = Category::create([
            'name'        => $request->name,
            'description' => $request->description,
            'image'       => $request->image,
            'parent_id'   => $request->parent_id,
            'status'      => $request->status,
        ]);

        return response()->json(['message' => 'Thêm danh mục thành công', 'data' => $category], 201);
    }

    // Xem chi tiết 1 danh mục
    public function show($id)
    {
        $category = Category::with('parent')->findOrFail($id);
        return response()->json($category);
    }

    // Cập nhật danh mục
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|string|max:255',
            'parent_id'   => 'nullable|exists:categories,id|not_in:' . $id,
            'status'      => 'required|in:0,1',
        ]);

        $category->update([
            'name'        => $request->name,
            'description' => $request->description,
            'image'       => $request->image,
            'parent_id'   => $request->parent_id,
            'status'      => $request->status,
        ]);

        return response()->json(['message' => 'Cập nhật danh mục thành công', 'data' => $category]);
    }

    // Xóa danh mục (soft delete)
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        // Xoá các liên kết trong bảng trung gian trước
        $category->products()->detach();

        // Sau đó xoá danh mục
        $category->delete();

        return response()->json(['message' => 'Xóa danh mục thành công']);
    }
}
