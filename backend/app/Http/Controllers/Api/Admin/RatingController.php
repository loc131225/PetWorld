<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rating;
use Carbon\Carbon;

class RatingController extends Controller
{
    // Lấy danh sách bình luận (API)
    public function index(Request $request)
    {
        $query = Rating::query()->with('user');

        if ($request->filled('keyword')) {
            $query->where('comment', 'like', '%' . $request->keyword . '%');
        }

        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', Carbon::parse($request->date_from));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', Carbon::parse($request->date_to));
        }

        $ratings = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'data' => $ratings,
            'message' => 'Danh sách đánh giá',
            'status' => true
        ]);
    }

    // Xóa bình luận (API)
    public function destroy($id)
    {
        $rating = Rating::findOrFail($id);
        $rating->delete();

        return response()->json([
            'message' => 'Xóa bình luận thành công.',
            'status' => true
        ]);
    }
}
