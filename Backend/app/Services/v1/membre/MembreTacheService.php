<?php

namespace App\Services\v1\membre;

use Illuminate\Support\Facades\Auth;

class MembreTacheService
{
    public function getTache(array|string|null $status)
    {
        $user = Auth::user();

        $query = $user->tachesAssignees();

        if ($status == "attente") {
            $query->where("progression", "=", 0);
        } elseif ($status == "progression") {
            $query->whereBetween("progression", [1, 99]);
        } elseif ($status == "terminee") {;
            $query->Where("progression", "=", 100);
        }

        return $query->latest()->get();
    }
}
