<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function lastestVouchers(){
        $vouchers = Voucher::orderByDesc('created_at')
            ->take(4)
            ->get(['id', 'name', 'code', 'discount_type', 'discount_value', 'min_order_value', 'start_date', 'end_date']);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách voucher mới nhất',
            'data' => $vouchers
        ]);
    }

    public function getPetworldVoucher(){
        $voucher = Voucher::where('code', 'PETWORLD')->first();

        if(!$voucher){
            return response()->json([
                'status' => false,
                'message' => 'Voucher không tồn tại',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $voucher
        ]);
    }
}
