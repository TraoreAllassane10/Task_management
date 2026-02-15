<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    /** @use HasFactory<\Database\Factories\TacheFactory> */
    use HasFactory;

    protected $fillable = [
        "titre",
        "description",
        "difficulte",
        "date_debut",
        "date_fin",
        "equipe_id"
    ];

    protected $with = ['miniTaches', "utilisateursAssignes"];

    protected function scopeOwner(Builder $query, mixed $equipeId)
    {
        return $query->where("equipe_id", $equipeId);
    }

    public function miniTaches()
    {
        return $this->hasMany(MiniTache::class);
    }

    public function utilisateursAssignes()
    {
        return $this->belongsToMany(User::class, 'assignation');
    }
}
