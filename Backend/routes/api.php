<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\V1\admin\AdminTacheController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    // Profil utilisateur
    Route::get('/user/profil', [AuthController::class, 'profil']);

    // Routes V1
    Route::prefix('v1')->group(function () {
        // Gestion des taches par ADMIN
        Route::prefix('admin')->group(function () {
            Route::controller(AdminTacheController::class)->group(function () {
                Route::get('/taches', 'index');
                Route::get('/taches/{tache}', 'show');
                Route::post('/taches', "store");
                Route::put('/taches/{tache}', "update");
                Route::delete('/taches/{tache}', 'destroy');
            });
        });
    });
});
