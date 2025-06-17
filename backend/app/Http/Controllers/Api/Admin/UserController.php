<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // Lấy danh sách người dùng (có tìm kiếm và lọc)
    public function index(Request $request)
    {
        $query = User::query();

        // Tìm kiếm theo tên, email hoặc số điện thoại
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('phone', 'like', "%$search%");
            });
        }

        // Lọc theo loại tài khoản (role)
        if ($role = $request->input('role')) {
            $query->where('role', $role); // admin hoặc customer
        }

        // Phân trang 10 người dùng mỗi trang
        $users = $query->orderBy('id', 'asc')->paginate(10);

        return response()->json($users);
    }
    public function toggleStatus($id)
    {
        $user = User::findOrFail($id);
        $user->status = !$user->status; // Đảo trạng thái 1 <-> 0
        $user->save();

        return response()->json([
            'message' => 'Trạng thái người dùng đã được cập nhật.',
            'status' => $user->status
        ]);
    }

    public function toggleRole($id)
    {
        $user = User::findOrFail($id);

        // Nếu role là chuỗi
        if (in_array($user->role, ['admin', 'customer'])) {
            $user->role = $user->role === 'admin' ? 'customer' : 'admin';
        }

        // Nếu role là số
        if (in_array($user->role, [0, 1])) {
            $user->role = $user->role === 1 ? 0 : 1;
        }

        $user->save();

        return response()->json([
            'message' => 'Loại tài khoản đã được cập nhật.',
            'role' => $user->role
        ]);
    }

}

