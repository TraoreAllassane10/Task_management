<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\V1\admin\AdminDashbaord;
use App\Http\Controllers\Api\V1\admin\AdminMenmbreController;
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
        Route::middleware("admin")->prefix('admin')->group(function () {

            // Dashboard Admin
            Route::get('/dashboard', [AdminDashbaord::class, "index"]);

            // gestion des taches
            Route::controller(AdminTacheController::class)->group(function () {
                Route::get('/taches', 'index');
                Route::get('/taches/{tache}', 'show');
                Route::post('/taches', "store");
                Route::put('/taches/{tache}', "update");
                Route::delete('/taches/{tache}', 'destroy');
            });

            Route::controller(AdminMenmbreController::class)->group(function() {
                Route::get('/equipe', 'index');
            });
        });
    });
});
