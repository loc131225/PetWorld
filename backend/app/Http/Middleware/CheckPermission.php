<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request; // ✅ Rất quan trọng
use Illuminate\Support\Facades\DB;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $permission
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $permission)
    {
        $user = $request->user(); // ✅ Không lỗi nếu import đúng lớp

        if (!$user || !$user->role_id) {
            return response()->json(['message' => 'Không có quyền truy cập'], 403);
        }

        $permissionId = DB::table('permissions')
            ->where('name', $permission)
            ->value('id');

        $hasPermission = DB::table('role_has_permissions')
            ->where('role_id', $user->role_id)
            ->where('permission_id', $permissionId)
            ->exists();

        if (!$hasPermission) {
            return response()->json(['message' => 'Bạn không có quyền thực hiện hành động này'], 403);
        }

        return $next($request);
    }
}
