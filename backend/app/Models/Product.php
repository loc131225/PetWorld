<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name', 'slug', 'description', 'price', 'sale_price',
        'stock_quantity', 'image', 'second_image', 'status'
    ];

    public function categories(){
        return $this->belongsToMany(Category::class, 'product_categories', 'product_id', 'category_id');
    }

    public function productProduct_category()
    {
        return $this->hasMany(Product_category::class);
    }

    public function orderItems(){
        return $this->hasMany(OrderItem::class, 'product_id', 'product_attribute_id');
    }

    public function ratings(){
        return $this->hasMany(Rating::class);
    }

    public function attributes(){
        return $this->hasMany(ProductAttribute::class);
    }

    public function favoriteProducts()
    {
        return $this->hasMany(FavoriteProduct::class);
    }
}
