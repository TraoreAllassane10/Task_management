<?php

namespace App\Dtos;

use Carbon\Carbon;

class CreateTacheDto
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $titre,
        public readonly string $description,
        public readonly Carbon $date_debut,
        public readonly Carbon $date_fin
    ) {}
}
