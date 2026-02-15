<?php

namespace App\Repositories\v1\admin;

use App\Models\Tache;
use Illuminate\Support\Facades\Auth;

class AdminTacheRepository
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function all(mixed $status)
    {
        $query = Tache::query()->owner($this->user->equipe_id);

        if ($status == "attente") {
            $query->where("progression", "=", 0);
        } elseif ($status == "progression") {
            $query->whereBetween("progression", [1, 99]);
        } elseif ($status == "terminee") {;
            $query->Where("progression", "=", 100);
        }

        return $query->latest()->get();
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
