<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = ['name', 'image', 'description', 'status'];

    public function categoryProduct_category()
    {
        return $this->hasMany(Product_category::class);
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_categories', 'category_id', 'product_id');
    }
    
    public function children(){
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parent(){
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
