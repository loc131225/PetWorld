<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categoriesTree = Category::whereNull('parent_id')
            ->where('status', 1)
            ->with(['children' => function ($query) {
                $query->where('status', 1)->take(6);
            }])
            ->get()
            ->map(function ($parent) {
                return [
                    'id' => $parent->id,
                    'name' => $parent->name,
                    'image' => $parent->image,
                    'children' => $parent->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'name' => $child->name,
                            'image' => $child->image,
                        ];
                    }),
                ];
            });

        return response()->json($categoriesTree);
    }
}
