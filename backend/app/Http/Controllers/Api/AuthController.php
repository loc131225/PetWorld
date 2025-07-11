<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //Đăng ký
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone ?? null,
            'avatar' => $request->avatar ?? null,
            'address' => $request->address ?? null,
            'status' => $request->status ?? 1, // Mặc định là 1 (hoạt động)
            'role_id' => 3, // Mặc định là người dùng (role_id = 3)
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message'=> 'Đăng ký thành công',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'avatar' => $user->avatar,
                'address' => $user->address,
                'status' => $user->status,
                'role_id' => $user->role_id
            ]
        ]);
    }

    //Đăng nhập
    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if(!Auth::attempt($credentials)){
            return response()->json([
                'status' => false,
                'message' => 'Thông tin đăng nhập không chính xác'
            ], 401);
        }

        $user = Auth::user();
        $roleName = DB::table('roles')->where('id', $user->role_id)->value('name');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công',
            'token' => $token,
            'role_name' => $roleName,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'avatar' => $user->avatar,
                'address' => $user->address,
                'status' => $user->status,
                'role_id' => $user->role_id
            ]
        ]);
    }
}
