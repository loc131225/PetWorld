<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders'; // Tên bảng

    protected $fillable = [
        'user_id',
        'payment_id',
        'voucher_id',
        'status',
        'phone',
        'shipping_address',
        'note',
        'total_amount',
        'payment_status',
        'payment_date'
    ];

    protected $casts = [
        'payment_date' => 'datetime'
    ];

    // Khách hàng
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Voucher nếu có
    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'voucher_id');
    }

    // Phương thức thanh toán
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_id');
    }

    // Danh sách sản phẩm trong đơn
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}
