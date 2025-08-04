<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Product extends Model
    {
        protected $table = 'products';

        protected $fillable = [
            'name', 'slug', 'description',
            'image', 'second_image', 'status'
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

        public function ratings()
        {
            return $this->hasManyThrough(
                \App\Models\Rating::class,             // model đích
                \App\Models\ProductAttribute::class,   // model trung gian
                'product_id',                          // FK ở bảng product_attributes trỏ tới product
                'product_attribute_id',                // FK ở bảng ratings trỏ tới product_attribute
                'id',                                  // PK ở bảng products
                'id'                                   // PK ở bảng product_attributes
            );
        }


        public function attributes()
        {
            return $this->hasMany(ProductAttribute::class, 'product_id', 'id');
        }

        public function favoriteProducts()
        {
            return $this->hasMany(FavoriteProduct::class);
        }
    }
