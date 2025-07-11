<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    protected $table = 'vouchers';

    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'discount_type',
        'discount_value',
        'min_order_value',
        'start_date',
        'end_date',
        'quantity',
        'status'
    ];

    protected $dates = [
        'start_date',
        'end_date',
        'deleted_at'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'voucher_id');
    }
}
