<?php

namespace App\Http\Controllers\Api\V1\membre;

use App\Enums\DifficulteEnum;
use App\Http\Controllers\Controller;
use App\Trait\ApiResponse;
use Exception;
use Illuminate\Support\Facades\Auth;

class MembreDashboardController extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $user = Auth::user();

            $totalTache = $user->tachesAssignees()->count();
            $nombreTacheEnAttente = $user->tachesAssignees()->where("progression", "=", 0)->count();
            $nombreTacheEnProgession = $user->tachesAssignees()->whereBetween("progression", [1, 99])->count();
            $nombreTacheTerminee = $user->tachesAssignees()->Where("progression", "=", 100)->count();

            $nombreTacheFacile = $user->tachesAssignees()->where('difficulte', DifficulteEnum::FACILE->value)->count();
            $nombreTacheNormale = $user->tachesAssignees()->where('difficulte', DifficulteEnum::NORMAL->value)->count();
            $nombreTacheDifficile = $user->tachesAssignees()->where('difficulte', DifficulteEnum::DIFFICILE->value)->count();

            // ChartData
            $progessionChartData = [
                "attente" => $nombreTacheEnAttente,
                "progression" => $nombreTacheEnProgession,
                "terminee" => $nombreTacheTerminee
            ];

            $difficulteChartData = [
                "facile" => $nombreTacheFacile,
                "normale" => $nombreTacheNormale,
                "difficile" => $nombreTacheDifficile
            ];

            // Les taches recentes
            $tache_recentes = $user->tachesAssignees()->latest()->limit(5)->get();

            return $this->success("Les données de la dashboard", [
                "overview" => [
                    "total" => $totalTache,
                    "attente" => $nombreTacheEnAttente,
                    "progression" => $nombreTacheEnProgession,
                    "terminee" => $nombreTacheTerminee
                ],
                "progressionChartData" => $progessionChartData,
                "difficulteChartData" => $difficulteChartData,
                "tache_recentes" => $tache_recentes
            ]);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }
}
