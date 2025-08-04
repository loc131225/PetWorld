<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    protected $table = 'attribute_values';
    protected $fillable = [
        'product_attribute_id',
        'attribute_id',
        'value',
        'status',
    ];
    public function productAttribute()
    {
        return $this->belongsTo(ProductAttribute::class);
    }

    public function attribute()
    {
    return $this->belongsTo(Attribute::class, 'attribute_id');
    }
}
