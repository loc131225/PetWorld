<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    protected $table = 'product_attributes';

    protected $fillable = [
        'product_id',
        'stock_quantity',
        'price',
        'sale_price',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }


    public function attributeValues()
    {
    return $this->hasMany(AttributeValue::class)->with('attribute');
    }

    public function ratings()
{
    return $this->hasMany(Rating::class, 'product_attribute_id');
}
}
