<?php

namespace App\Services\v1\membre;

use App\Models\Tache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

        return $mintacheCheckin;
    }
}
