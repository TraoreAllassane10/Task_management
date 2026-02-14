<?php

namespace App\Repositories\v1\admin;

use App\Models\Tache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminTacheRepository
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function all(mixed $status)
    {
        switch ($status) {
            case "en attente":
                return Tache::owner($this->user->equipe_id)
                    ->where("progression", "=", 0)
                    ->latest()
                    ->get();

            case "en progession":
                return Tache::owner($this->user->equipe_id)
                    ->where("progression", ">", 0)
                    ->Where("progression", "<", 100)
                    ->latest()
                    ->get();

            case "terminee":
                Log::info("Ok");
                return Tache::owner($this->user->equipe_id)
                    ->Where("progression", "=", 100)
                    ->latest()
                    ->get();

            default:
                return Tache::owner($this->user->equipe_id)->latest()->get();
        }
    }

    public function find(string $id)
    {
        return Tache::owner($this->user->equipe_id)->find($id);
    }

    public function create(array $data)
    {
        return Tache::create($data);
    }

    public function update(string $id, array $data)
    {
        $tache = $this->find($id);
        return $tache->update($data);
    }

    public function delete(string $id)
    {
        $tache = $this->find($id);
        return $tache->delete();
    }
}
