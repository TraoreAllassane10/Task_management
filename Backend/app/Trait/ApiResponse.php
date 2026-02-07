<?php

namespace App\Trait;

trait ApiResponse
{
    public function success(string $message, mixed $data, int $code = 200)
    {
        return response()->json([
            "success" => true,
            "message" => $message,
            "data" => $data
        ], $code);
    }

    public function error(string $message, int $code = 400)
    {
        return response()->json([
            "success" => false,
            "message" => $message,
        ], $code);
    }

    public function notFound(string $message)
    {
        return response()->json([
            "success" => false,
            "message" => $message,
        ], 404);
    }
}
