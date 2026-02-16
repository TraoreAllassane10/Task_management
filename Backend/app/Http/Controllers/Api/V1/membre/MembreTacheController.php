<?php

namespace App\Http\Controllers\Api\V1\membre;

use App\Http\Controllers\Controller;
use App\Services\v1\membre\MembreTacheService;
use App\Trait\ApiResponse;
use Illuminate\Http\Request;

class MembreTacheController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected MembreTacheService $membreTacheService
    )
    {}
    public function index(Request $request) {

        $status = $request->query('status', '');

        $taches = $this->membreTacheService->getTache($status);

        return $this->success('Liste de mes taches', $taches, 200);
    }

    public function checkin(string $tache, string $mintache)
    {
        $mintacheCheckin = $this->membreTacheService->checkinTache($tache, $mintache);

        return $this->success('Tache mis à jour', $mintacheCheckin);
    }
}
