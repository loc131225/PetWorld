<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\ProductAttribute;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class StatisticalController extends Controller
{
    public function dashboard(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->subDays(30));
        $endDate = $request->input('end_date', Carbon::now());

        // Tổng doanh thu
        $totalRevenue = Order::whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'done')
            ->sum('total_amount');

        // Tổng đơn hàng
        $totalOrders = Order::whereBetween('created_at', [$startDate, $endDate])->count();

        // Giá trị đơn hàng trung bình
        $avgOrderValue = $totalOrders ? round($totalRevenue / $totalOrders) : 0;

        // Khách hàng mới
        $newCustomers = User::whereBetween('created_at', [$startDate, $endDate])->count();

        // Tỷ lệ khách hàng quay lại
        $returningCustomerRate = $this->getReturningCustomerRate($startDate, $endDate);

        // Đơn hàng theo trạng thái
        $ordersStatus = [
            'completed' => Order::where('status', 'done')->count(),
            'pending' => Order::where('status', 'pending')->count(),
            'cancelled' => Order::where('status', 'cancel')->count(),
        ];

        // Sản phẩm bán chạy
        $topProducts = OrderItem::select('product_name')
            ->selectRaw('SUM(quantity) as total_sold')
            ->groupBy('product_name')
            ->orderByDesc('total_sold')
            ->take(3)
            ->get();

        // Sản phẩm tồn kho thấp
        $lowStockProducts = ProductAttribute::where('stock_quantity', '<', 10)
            ->select('product_id', 'stock_quantity')
            ->with('product:id,name')
            ->get();

        // Sản phẩm không bán được
        $unsoldProducts = Product::whereDoesntHave('attributes.orderItems')->get(['id', 'name']);

        // Top khách hàng
        $topCustomers = Order::select('user_id')
            ->selectRaw('COUNT(*) as order_count, SUM(total_amount) as total_spent')
            ->groupBy('user_id')
            ->orderByDesc('total_spent')
            ->take(3)
            ->with('user:id,name')
            ->get();

        return response()->json([
            'revenue' => [
                'total' => $totalRevenue,
                'orders' => $totalOrders,
                'avg_order_value' => $avgOrderValue,
            ],
            'customers' => [
                'new' => $newCustomers,
                'returning_rate' => $returningCustomerRate,
            ],
            'orders_status' => $ordersStatus,
            'top_products' => $topProducts,
            'low_stock_products' => $lowStockProducts,
            'unsold_products' => $unsoldProducts,
            'top_customers' => $topCustomers,
        ]);
    }

    private function getReturningCustomerRate($start, $end)
    {
        $allCustomers = Order::whereBetween('created_at', [$start, $end])->pluck('user_id')->unique();
        $returning = Order::where('status', 'done')
            ->whereIn('user_id', $allCustomers)
            ->groupBy('user_id')
            ->havingRaw('COUNT(*) > 1')
            ->count();

        return $allCustomers->count() > 0
            ? round(($returning / $allCustomers->count()) * 100, 2)
            : 0;
    }
}
