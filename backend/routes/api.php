<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Auth
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

// Module chính
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\FavoriteProductController;
use App\Http\Controllers\Api\ContactController;

// Admin
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\PostController as AdminPostController;
use App\Http\Controllers\Api\Admin\RatingController as AdminRatingController;
use App\Http\Controllers\Api\Admin\StatisticsController as AdminStatisticsController;
use App\Http\Controllers\Api\Admin\VoucherController as AdminVoucherController;

// Public routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('/categoriesTree', 'index');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products/home-dogs', 'dogProducts');
    Route::get('/products/home-cats', 'catProducts');
    Route::get('/products/home-best-sellers', 'bestSellingProducts');
    Route::get('/product/{slug}', 'show');
    Route::get('/category/{slug}/products', 'productsByCategory');
    Route::get('/search', 'search');
});

Route::controller(PostController::class)->group(function () {
    Route::get('/home-news', 'homeNews');
    Route::get('/posts', 'index');
    Route::get('/posts/{id}', 'show');
});

Route::controller(VoucherController::class)->group(function () {
    Route::get('/vouchers/lastest', 'lastestVouchers');
    Route::get('/vouchers/petworldvoucher', 'getPetworldVoucher');
});

Route::controller(ContactController::class)->group(function () {
    Route::post('/contact', 'submit')->name('contact.submit');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::get('/users/{id}', 'show');
    Route::patch('/users/{id}', 'update');
    Route::post('/users/{id}/change-password', 'changePassword');
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', fn(Request $request) => tap($request->user()->currentAccessToken()->delete(), function () {
        return response()->json(['status' => true, 'message' => 'Đăng xuất thành công']);
    }));

    Route::controller(FavoriteProductController::class)->group(function () {
        Route::get('/favorites', 'list');
        Route::post('/favorites', 'add');
        Route::delete('/favorite/remove', 'remove');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::post('/checkout', 'checkout');
        Route::get('/my-orders', 'myOrders');
        Route::get('/order/{id}', 'orderDetail');
    });
});

// Admin routes
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {

    // Quản lý sản phẩm - cần permission: manage_products
    Route::middleware('permission:manage_products')->prefix('products')->group(function () {
        Route::get('/', [AdminProductController::class, 'index']);
        Route::post('/', [AdminProductController::class, 'store']);
        Route::get('/{id}', [AdminProductController::class, 'show']);
        Route::post('/{id}', [AdminProductController::class, 'update']);
        Route::delete('/{id}', [AdminProductController::class, 'destroy']);
    });

    // Quản lý danh mục - cần permission: manage_products
    Route::middleware('permission:manage_products')->prefix('categories')->group(function () {
        Route::get('/', [AdminCategoryController::class, 'index']);
        Route::post('/', [AdminCategoryController::class, 'store']);
        Route::get('/{id}', [AdminCategoryController::class, 'show']);
        Route::post('/{id}', [AdminCategoryController::class, 'update']);
        Route::delete('/{id}', [AdminCategoryController::class, 'destroy']);
    });

    // Quản lý người dùng - cần permission: manage_users
    Route::middleware('permission:manage_users')->prefix('users')->group(function () {
        Route::get('/', [AdminUserController::class, 'index']);
        Route::post('/{id}/toggle-status', [AdminUserController::class, 'toggleStatus']);
        Route::post('/{id}/toggle-role', [AdminUserController::class, 'toggleRole']);
    });

    // Quản lý đơn hàng - cần permission: view_orders
    Route::middleware('permission:view_orders')->prefix('orders')->group(function () {
        Route::get('/', [AdminOrderController::class, 'index']);
        Route::get('/{id}', [AdminOrderController::class, 'show']);
        Route::post('/{id}/update-status', [AdminOrderController::class, 'updateStatus']);
        Route::post('/{id}/update-payment', [AdminOrderController::class, 'updatePayment']);
    });

     // Quản lý bài viết - cần permission: manage_posts
    Route::middleware('permission:manage_posts')->prefix('posts')->group(function () {
        Route::get('/', [AdminPostController::class, 'index']);
        Route::post('/', [AdminPostController::class, 'store']);
        Route::get('/{id}', [AdminPostController::class, 'show']);
        Route::post('/{id}', [AdminPostController::class, 'update']);
        Route::delete('/{id}', [AdminPostController::class, 'destroy']);
    });

    Route::controller(AdminRatingController::class)->prefix('ratings')->group(function () {
        Route::get('/', 'index')->name('admin.ratings.index');
        Route::delete('/{id}', 'destroy')->name('admin.ratings.destroy');
    });

    Route::get('/statistics', [AdminStatisticsController::class, 'dashboard']);

    Route::controller(AdminVoucherController::class)->prefix('vouchers')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::post('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });
});
