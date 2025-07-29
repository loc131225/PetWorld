<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rating;
use Carbon\Carbon;

class RatingController extends Controller
{
    // Danh sách bình luận
    public function index(Request $request)
    {
        $query = Rating::query()->with('user');

        // Tìm kiếm theo từ khóa
        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where('comment', 'like', "%{$keyword}%");
        }

        // Lọc theo số sao
        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        // Lọc theo ngày
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', Carbon::parse($request->date_from));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', Carbon::parse($request->date_to));
        }

        $ratings = $query->orderBy('created_at', 'desc')->paginate(10);

        return view('admin.ratings.index', compact('ratings'));
    }

    // Xóa bình luận
    public function destroy($id)
    {
        $rating = Rating::findOrFail($id);
        $rating->delete();

        return redirect()->back()->with('success', 'Xóa bình luận thành công.');
    }
}
