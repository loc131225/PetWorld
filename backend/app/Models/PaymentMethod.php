<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $table = 'payment_methods';

    protected $fillable = [
        'name',
        'status'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'payment_id');
    }
}
