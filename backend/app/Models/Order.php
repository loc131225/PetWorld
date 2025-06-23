<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'payment_id',
        'voucher_id',
        'status',
        'shipping_address',
        'phone',
        'name',
        'total_amount',
        'note',
        'payment_status',
    ];
}
