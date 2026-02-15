<?php

namespace App\Http\Controllers\Api\V1\admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Trait\ApiResponse;

class AdminMenmbreController extends Controller
{   
    use ApiResponse;

    public function index()
    {
        $membres = User::where("role", UserRole::MEMBRE->value)->get();

        return $this->success("Liste des membres", $membres);
    }
}
