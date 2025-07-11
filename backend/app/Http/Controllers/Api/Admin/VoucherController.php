<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Voucher;

class VoucherController extends Controller
{
    public function index(){
        $vouchers = Voucher::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách voucher',
            'data'=> $vouchers
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => '|required|string|max:255',
            'code' => '|required|string|max:50|unique:vouchers,code',
            'discount_type' => 'required|in:percent,amount',
            'discount_value' => 'required|numeric|min:0',
            'min_order_value' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'quantity' => 'required|integer|min:1',
        ]);

        $voucher = Voucher::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Tạo voucher thành công',
            'data' => $voucher
        ]);
    }

    public function show($id){
        $voucher = Voucher::find($id);

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

    public function update(Request $request, $id){
        $voucher = Voucher::find($id);

        if(!$voucher){
            return response()->json([
                'status' => false,
                'message' => 'Voucher không tồn tại',
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => "required|string|max:50|unique:vouchers,code,$id",
            'discount_type' => 'required|in:percent,amount',
            'discount_value' => 'required|numeric|min:0',
            'min_order_value' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'quantity' => 'required|integer|min:1',
        ]);

        $voucher->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật voucher thành công',
            'data' => $voucher
        ]);
    }

    public function destroy($id){
        $voucher = Voucher::find($id);

        if(!$voucher){
            return response()->json([
                'status' => false,
                'message' => 'Voucher không tồn tại',
            ], 404);
        }

        $voucher->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa voucher thành công'
        ]);
    }
}
