<?php

namespace App\Services\v1\admin;

use App\Dtos\CreateTacheDto;
use App\Models\Tache;
use App\Repositories\v1\admin\AdminTacheRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class AdminTacheService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected AdminTacheRepository $adminTacheRepository
    ) {}

    public function getTaches(array|string|null $status)
    {

        $taches = $this->adminTacheRepository->all($status);
        $nombreTacheTrouvee = $taches->count();

        $nombreTacheEnAttente = Tache::where("progression", "=", 0)->count();
        $nombreTacheEnProgession = Tache::whereBetween("progression", [1, 99])->count();
        $nombreTacheTerminee = Tache::Where("progression", "=", 100)->count();

        return [
            "total" => $nombreTacheTrouvee,
            "taches" => $taches,
            "meta" => [
                "attente" => $nombreTacheEnAttente,
                "progession" => $nombreTacheEnProgession,
                "terminee" => $nombreTacheTerminee
            ]
        ];
    }

    public function getTache(string $id)
    {
        return $this->adminTacheRepository->find($id);
    }

    public function createTache(array $data)
    {
        $tacheDto = new CreateTacheDto(
            $data['titre'],
            $data['description'],
            Carbon::createFromFormat("d/m/y", $data['date_debut']),
            Carbon::createFromFormat("d/m/y", $data['date_fin'])
        );

        // Creation de la tache
        $tache = $this->adminTacheRepository->create([
            "titre" => $tacheDto->titre,
            "description" => $tacheDto->description,
            "date_debut" => $tacheDto->date_debut,
            "date_fin" => $tacheDto->date_fin,
            "equipe_id" => Auth::user()->equipe_id
        ]);

        // Creation des minitaches associé à la tache principale
        foreach ($data["minitaches"] as $minitache) {
            $tache->miniTaches()->create(
                [
                    "titre" => $minitache
                ]
            );
        }

        return $tache;
    }

    public function updateTache(string $id, array $data)
    {
        return $this->adminTacheRepository->update($id, $data);
    }

    public function deleteTache(string $id)
    {
        $tache = $this->adminTacheRepository->find($id);

        if (!$tache) {
            return $tache = null;
        }

        return $tache->delete($id);
    }
}
