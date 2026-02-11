<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Models\Equipe;
use App\Trait\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\auth\LoginUserRequest;
use App\Http\Requests\auth\RegisterUserRequest;


class AuthController extends Controller
{
    use ApiResponse;

    public function register(RegisterUserRequest $request)
    {
        $code_invitation_url = $request->query('code_invitation', null);

        $data = $request->validated();

        if (!$code_invitation_url && !isset($data["code_invitation"])) {
            return $this->error("Veuillez fournir un code d'invitation ou inscrivez-vous à partir de l'email que vous avez reçu");
        }

        $code_invitation = $code_invitation_url ?? $data['code_invitation'];
        $equipe = Equipe::where("code_invitation", $code_invitation)->first();

        if (!$equipe) {
            return  $this->error("Le code d'invitation fourni ou le lien d'invitation n'est pas valide", 404);
        }

        $user = User::create([
            "name" => $data['name'],
            "email" => $data['email'],
            "password" => $data['password'],
            "photo" => $data['photo'] ?? null,
            "equipe_id" => $equipe->id
        ]);

        return $this->success("Utilisateur crée", $user, 201);
    }

    public function login(LoginUserRequest $request)
    {
        $data = $request->validated();

        if (! Auth::attempt($data)) {
            return $this->error("Email ou mot de passe incorrect !", 401);
        } else {
            $user = Auth::user();
            $token = $user->createToken(config('auth.auth_secret_key'))->plainTextToken;

            return $this->success("Utilisateur authentifié", ["token" => $token, "user" => $user], 200);
        }
    }

    public function profil(Request $request)
    {
        $user = $request->user();
        return $this->success("Le profil de l'utilisateur trouvé", $user, 200);
    }
}
