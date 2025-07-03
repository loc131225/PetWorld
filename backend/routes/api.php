<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\OrderController;
use App\Http\Controllers\Api\Admin\RatingController;
use App\Http\Controllers\Api\Admin\StatisticsController;


Route::get('/categoriesTree', [CategoryController::class, 'index']);
Route::get('/products/home-dogs', [ProductController::class, 'dogProducts']);
Route::get('/products/home-cats', [ProductController::class, 'catProducts']);
Route::get('/products/home-best-sellers', [ProductController::class, 'bestSellingProducts']);
Route::get('/home-news', [PostController::class, 'homeNews']);
Route::get('/vouchers/lastest', [VoucherController::class, 'lastestVouchers']);
Route::get('/vouchers/petworldvoucher', [VoucherController::class, 'getPetworldVoucher']);
//tìm kiếm
Route::get('/search', [ProductController::class, 'search']);
// thông tin ng dùng
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::patch('/users/{id}', [UserController::class, 'update']);

//Chi tiết sản phẩm
Route::get('/products/{slug}', [ProductController::class, 'show']);

// Người dùng
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Bảo vệ các route cần xác thực
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request){
        return $request->user();
    });

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất thành công',
        ]);
    });
});

// Thanh toán
Route::middleware('auth:sanctum')->post('/checkout', [OrderController::class, 'checkout']);

// Liên hệ
Route::get('/contact', [ContactController::class, 'showForm'])->name('contact.form');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

//Admin
Route::prefix('admin/products')->group(function () {
    Route::get('/', [AdminProductController::class, 'index']);
    Route::post('/', [AdminProductController::class, 'store']);
    Route::get('/{id}', [AdminProductController::class, 'show']);
    Route::post('/{id}', [AdminProductController::class, 'update']);
    Route::delete('/{id}', [AdminProductController::class, 'destroy']);
});

Route::prefix('admin/categories')->group(function () {
    Route::get('/', [AdminCategoryController::class, 'index']);
    Route::post('/', [AdminCategoryController::class, 'store']);
    Route::get('/{id}', [AdminCategoryController::class, 'show']);
    Route::post('/{id}', [AdminCategoryController::class, 'update']);
    Route::delete('/{id}', [AdminCategoryController::class, 'destroy']);
});

Route::prefix('admin/users')->group(function () {
    Route::get('/', [AdminUserController::class, 'index']);
    Route::post('/{id}/toggle-status', [AdminUserController::class, 'toggleStatus']);
    Route::post('/{id}/toggle-role', [AdminUserController::class, 'toggleRole']);
});

Route::prefix('admin/orders')->group(function () {
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{id}', [OrderController::class, 'show']);
    Route::post('/{id}/update-status', [OrderController::class, 'updateStatus']);
    Route::post('/{id}/update-payment', [OrderController::class, 'updatePayment']);
});

Route::prefix('admin/ratings')->name('admin.')->group(function() {
    Route::get('/', [RatingController::class, 'index'])->name('ratings.index');
    Route::delete('/{id}', [RatingController::class, 'destroy'])->name('ratings.destroy');
});

Route::prefix('admin')->name('admin.')->group(function() {
    Route::get('/statistics', [StatisticsController::class, 'dashboard'])->name('admin.dashboard');
});

