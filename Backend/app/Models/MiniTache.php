<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MiniTache extends Model
{
    /** @use HasFactory<\Database\Factories\MiniTacheFactory> */
    use HasFactory;

    protected $fillable = [
        'titre',
        'estAccompli',
        'tache_id'
    ];
}
