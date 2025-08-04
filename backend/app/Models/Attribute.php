<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $table = 'attributes';
    protected $fillable = [
        'name',
        'status', // Nếu có cột này trong bảng
        // Thêm các trường khác nếu cần
    ];
    public function attributeValues()
    {
        return $this->hasMany(AttributeValue::class);
    }
}
