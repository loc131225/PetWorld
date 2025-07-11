<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Lấy toàn bộ user
    public function index()
    {
        $users = User::all();
        return response()->json([
            'status' => true,
            'data' => $users
        ]);
    }

    // Lấy 1 user theo ID
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $user
        ]);
    }
    public function update(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ], 404);
    }

    // Validate field gửi lên (field nào có thì validate, không bắt buộc đầy đủ)
    $validated = $request->validate([
        'name' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255|unique:users,email,' . $id,
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
        'status' => 'nullable|boolean',
        'avatar' => 'nullable|string|max:255',
        'role_id' => 'nullable|integer'
    ]);

    // Update field nào gửi lên
    $user->update($validated);

    return response()->json([
        'status' => true,
        'message' => 'User updated successfully',
        'data' => $user
    ]);
}

public function changePassword(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ], 404);
    }

    // Validate input
    $request->validate([
        'current_password' => 'required|string',
        'new_password' => 'required|string|min:6|confirmed', // phải gửi thêm new_password_confirmation
    ]);

    // Kiểm tra mật khẩu hiện tại
    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json([
            'status' => false,
            'message' => 'Mật khẩu hiện tại không đúng'
        ], 400);
    }

    // Cập nhật mật khẩu mới
    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json([
        'status' => true,
        'message' => 'Đổi mật khẩu thành công'
    ]);
}
}
