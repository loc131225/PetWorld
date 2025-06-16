<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request): ?string
    {
        if (!$request->expectsJson()) {
            // API không redirect, trả về JSON hoặc null
            abort(401, 'Unauthenticated');
        }

        return null;
    }
}
