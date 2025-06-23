<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    protected $table = 'product_attributes';
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function attributeValues(){
        return $this->hasMany(AttributeValue::class, 'product_attribute_id');
    }
}
