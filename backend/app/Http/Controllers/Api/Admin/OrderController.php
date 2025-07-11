<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    // Lấy danh sách đơn hàng
    public function index(Request $request)
    {
        $query = Order::with('user');

        // Tìm kiếm theo mã đơn, tên KH, SĐT
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('id', $search)
                  ->orWhere('phone', 'like', "%$search%")
                  ->orWhereHas('user', function($q2) use ($search) {
                      $q2->where('name', 'like', "%$search%");
                  });
            });
        }

        // Lọc theo trạng thái đơn hàng
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        // Lọc theo trạng thái thanh toán
        if ($payment = $request->input('payment')) {
            $query->where('payment_status', $payment);
        }

        // Phân trang
        $orders = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($orders);
    }

    // Lấy chi tiết đơn hàng
    public function show($id)
    {
        $order = Order::with([
            'orderItems.product',
            'user',
            'voucher',
            'paymentMethod'
        ])->findOrFail($id);

        return response()->json($order);
    }

    // Đổi trạng thái đơn hàng
    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->status = $request->input('status'); // e.g., 'pending', 'processing', 'done', 'cancel'
        $order->save();

        return response()->json(['message' => 'Cập nhật trạng thái đơn hàng thành công.', 'status' => $order->status]);
    }

    // Đổi trạng thái thanh toán
    public function updatePayment(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->payment_status = $request->input('payment_status'); // e.g., 'unpaid', 'paid', 'refund'
        $order->save();

        return response()->json(['message' => 'Cập nhật trạng thái thanh toán thành công.', 'payment_status' => $order->payment_status]);
    }
}
