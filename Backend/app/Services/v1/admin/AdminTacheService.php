<?php

namespace App\Services\v1\admin;

use App\Dtos\CreateTacheDto;
use App\Models\Tache;
use App\Repositories\v1\admin\AdminTacheRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

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
        $user = Auth::user();

        // Recuperation de la liste des taches
        $taches = Cache::remember("taches_all", now()->addMinutes(5), function () use ($status) {
            return  $this->adminTacheRepository->all($status);
        });

        // Les statistiques
        $nombreTacheTrouvee = $taches->count();
        $nombreTacheEnAttente = Tache::owner($user->equipe_id)->where("progression", "=", 0)->count();
        $nombreTacheEnProgession = Tache::owner($user->equipe_id)->whereBetween("progression", [1, 99])->count();
        $nombreTacheTerminee = Tache::owner($user->equipe_id)->Where("progression", "=", 100)->count();

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
        $tache = Cache::remember("taches_" . $id, now()->addMinutes(5), function () use ($id) {
            return $this->adminTacheRepository->find($id);
        });

        return $tache;
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

        // assignation des utilisateurs à la tache crée
        $tache->utilisateursAssignes()->attach($data['users']);

        // Vider le cache
        Cache::forget('taches_all');

        return $tache;
    }

    public function updateTache(string $id, array $data)
    {
        $tache = $this->adminTacheRepository->find($id);

        if ($tache === null) {
            return $tache = null;
        }

        $tacheDto = new CreateTacheDto(
            $data['titre'],
            $data['description'],
            Carbon::createFromFormat("d/m/y", $data['date_debut']),
            Carbon::createFromFormat("d/m/y", $data['date_fin'])
        );

        // Mise à jour de la tache
        $tacheModifiee = $this->adminTacheRepository->update($id, [
            "titre" => $tacheDto->titre,
            "description" => $tacheDto->description,
            "date_debut" => $tacheDto->date_debut,
            "date_fin" => $tacheDto->date_fin,
            "equipe_id" => Auth::user()->equipe_id
        ]);

        // // synchronisation des utilisateurs assigné
        $tacheModifiee->utilisateursAssignes()->sync($data['users']);

        // Vider le cache
        Cache::forget('taches_all');

        return $tacheModifiee;
    }

    public function deleteTache(string $id)
    {
        $tache = $this->adminTacheRepository->find($id);

        if (!$tache) {
            return $tache = null;
        }

        $tacheSupprimee = $tache->delete($id);

        // Vider le cache
        Cache::forget('taches_all');

        return $tacheSupprimee;
    }

    public function checkinTache(string $tacheId, string $mintacheId)
    {
        $tache = Tache::find($tacheId);

        $mintache = $tache
            ->miniTaches()
            ->where("id", $mintacheId)
            ->first();

        $mintacheCheckin = $mintache->update([
            "estAccompli" => $mintache->estAccompli == 1 ? 0 : 1
        ]);

        if ($mintacheCheckin) {
            $totalMinitache = $tache->miniTaches()->count();
            $miniTacheTerminee = $tache->miniTaches()->where("estAccompli", 1)->count();

            $pourcentageDeProgression = $miniTacheTerminee > 0 ? (int) round(($miniTacheTerminee * 100) / $totalMinitache, 0) : 0;

            $tache->update([
                "progression" => $pourcentageDeProgression
            ]);
        }

        // Vider le cache
        Cache::forget('taches_all');

        return $mintacheCheckin;
    }
}
