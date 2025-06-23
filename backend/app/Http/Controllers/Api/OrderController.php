<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request){
        $validated = $request->validate([
            'payment_id' => 'required|exists:payment_methods,id',
            'shipping_address' => 'required|string',
            'phone' => 'required|string|max:20',
            'name' => 'required|string|max:255',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'note' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_attribute_id' => 'required|exists:product_attributes,id',
            'items.*.product_name' => 'required|string',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // Xử lý thanh toán và tạo đơn hàng

        try{
            DB::beginTransaction();

            //Tính tổng
            $total = collect($validated['items'])->sum(function($item){
                return $item['price'] * $item['quantity'];
            });

            //Tạo đơn hàng
            $order = Order::create([
                'user_id' => $request->user()->id,
                'payment_id' => $validated['payment_id'],
                'voucher_id' => $validated['voucher_id'] ?? null,
                'status' => 'pending',
                'shipping_address' => $validated['shipping_address'],
                'phone' => $validated['phone'],
                'name' => $validated['name'],
                'total_amount' => $total,
                'note' => $validated['note'] ?? null,
                'payment_status' => 'unpaid',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            foreach($validated['items'] as $item){
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_attribute_id' => $item['product_attribute_id'], // <-- Sửa chỗ này
                    'product_name' => $item['product_name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'total' => $item['price'] * $item['quantity'],
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Đặt hàng thành công',
                'order_id' => $order->id
            ]);
        } catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Đặt hàng thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
