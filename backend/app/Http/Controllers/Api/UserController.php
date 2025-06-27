<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;

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
}
