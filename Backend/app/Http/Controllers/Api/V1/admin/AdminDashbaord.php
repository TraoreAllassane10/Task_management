<?php

namespace App\Http\Controllers\Api\V1\admin;

use App\Enums\DifficulteEnum;
use App\Http\Controllers\Controller;
use App\Models\Tache;
use App\Trait\ApiResponse;
use Exception;
use Illuminate\Support\Facades\Auth;

class AdminDashbaord extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $user = Auth::user();

            $totalTache = Tache::owner($user->equipe_id)->count();
            $nombreTacheEnAttente = Tache::owner($user->equipe_id)->where("progression", "=", 0)->count();
            $nombreTacheEnProgession = Tache::owner($user->equipe_id)->whereBetween("progression", [1, 99])->count();
            $nombreTacheTerminee = Tache::owner($user->equipe_id)->Where("progression", "=", 100)->count();

            $nombreTacheFacile = Tache::owner($user->equipe_id)->where('difficulte', DifficulteEnum::FACILE->value)->count();
            $nombreTacheNormale = Tache::owner($user->equipe_id)->where('difficulte', DifficulteEnum::NORMAL->value)->count();
            $nombreTacheDifficile = Tache::owner($user->equipe_id)->where('difficulte', DifficulteEnum::DIFFICILE->value)->count();

            // ChartData
            $progessionChartData = [
                [
                    "name" => "En attente",
                    "value" => $nombreTacheEnAttente
                ],
                [
                    "name" => "En progression",
                    "value" => $nombreTacheEnProgession
                ],
                [
                    "name" => "Terminée",
                    "value" => $nombreTacheTerminee
                ]
            ];

            $difficulteChartData = [
                [
                    "name" => "Facile",
                    "value" => $nombreTacheFacile
                ],
                [
                    "name" => "Normale",
                    "value" => $nombreTacheNormale
                ],
                [
                    "name" => "Difficile",
                    "value" => $nombreTacheDifficile
                ]
            ];


            // Les taches recentes
            $tache_recentes = Tache::owner($user->equipe_id)->latest()->limit(5)->get();

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
            return $this->error(
                "Une erreur interne est survenue.",
                500
            );
        }
    }
}
