<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'product_attribute_id',
        'product_name',
        'price',
        'quantity',
        'total',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function productAttribute(){
        return $this->belongsTo(ProductAttribute::class, 'product_attribute_id');
    }

    public function product()
    {
        return $this->hasOneThrough(
            Product::class,
            ProductAttribute::class,
            'id', // FK ProductAttribute
            'id', // FK Product
            'product_attribute_id', // Local
            'product_id' // Intermediate
        );
    }
}
