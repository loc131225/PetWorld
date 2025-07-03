<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Http;

class StatisticsController extends Controller
{
    public function dashboard()
    {
        // Tổng doanh thu
        $totalRevenue = Order::where('status', 'done')
            ->sum('total_amount');

        // Tổng đơn hàng hoàn thành
        $totalCompletedOrders = Order::where('status', 'done')->count();

        // Tổng người dùng
        $totalUsers = User::count();

        // Tổng sản phẩm còn tồn kho
        $totalStockedProducts = Product::where('stock_quantity', '>', 0)->count();

        // Doanh thu theo tháng trong năm hiện tại
        $monthlyRevenue = Order::selectRaw('MONTH(payment_date) as month, SUM(total_amount) as revenue')
            ->whereYear('payment_date', now()->year)
            ->where('status', 'done')
            ->groupBy('month')
            ->pluck('revenue', 'month');

        // Số lượng người dùng mới theo tháng
        $newUsers = User::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->pluck('total', 'month');

        // Đơn hàng trong 7 ngày gần nhất
        $recentOrders = Order::with('user')
            ->whereDate('created_at', '>=', now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->get();

        // Thống kê sản phẩm theo danh mục
        $categoryStats = Category::withCount('products')->get();

        // Thời tiết
        $weather = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'q' => 'Ho Chi Minh,VN',
            'appid' => config('services.weather.api_key'),
            'units' => 'metric',
        ])->json();

        return response()->json([
            'totalRevenue'          => $totalRevenue,
            'totalCompletedOrders'  => $totalCompletedOrders,
            'totalUsers'            => $totalUsers,
            'totalStockedProducts'  => $totalStockedProducts,
            'monthlyRevenue'        => $monthlyRevenue,
            'newUsers'              => $newUsers,
            'recentOrders'          => $recentOrders,
            'categoryStats'         => $categoryStats,
            'weather'            => $weather, 
        ]);
    }
}
