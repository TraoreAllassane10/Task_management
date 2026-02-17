<?php

namespace App\Http\Controllers\Api\V1\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\CreateTacheRequest;
use App\Http\Requests\admin\UpdateTacheRequest;
use App\Services\v1\admin\AdminTacheService;
use App\Trait\ApiResponse;
use Exception;
use Illuminate\Http\Request;

class AdminTacheController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected AdminTacheService $adminTacheService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $status = $request->query('status', "");

            $data = $this->adminTacheService->getTaches($status);

            return $this->success("Liste de mes taches", $data, 200);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTacheRequest $request)
    {
        try {
            $data = $request->validated();

            $tache = $this->adminTacheService->createTache($data);

            return $this->success("Tache crée avec succès", $tache, 200);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $tache = $this->adminTacheService->getTache($id);

            if (!$tache) {
                return $this->notFound("Tache intouvablr");
            }

            return $this->success("Une tache trouvée", $tache, 200);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTacheRequest $request, string $id)
    {
        try {
            $data = $request->validated();

            $tache = $this->adminTacheService->updateTache($id, $data);

            if ($tache === null) {

                return $this->notFound('Tache introuvable');
            }

            return $this->success("Tache modifiée avec succès", $tache, 200);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $tache = $this->adminTacheService->deleteTache($id);

            if (!$tache) {
                return $this->notFound('Tache introuvable');
            }

            return $this->success("Tache supprimée avec succès", $tache, 200);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function checkin(string $tache, string $mintache)
    {
        try {
            $mintacheCheckin = $this->adminTacheService->checkinTache($tache, $mintache);

            return $this->success('Tache mis à jour', $mintacheCheckin);
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }
}
