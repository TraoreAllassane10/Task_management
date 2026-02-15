<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role !== UserRole::ADMIN->value) {
            return response()->json([
                "success" => false,
                "message" => "Vous n'êtes pas authorisé à accéder à cette ressource"
            ], 403);
        }

        return $next($request);
    }
}
