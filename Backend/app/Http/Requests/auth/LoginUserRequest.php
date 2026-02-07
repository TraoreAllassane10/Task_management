<?php

namespace App\Http\Requests\auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            "email" => "required|email",
            "password" => "required|string|min:6",
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => false,
            "message" => "Erreur de validation",
            "erreurs" => $validator->errors()
        ], 422));
    }

    public function messages(): array
    {
        return [
            "email.required" => "L'email est requis.",
            "email.email" => "L'email doit être une adresse valide.",
            "password.required" => "Le mot de passe est requis.",
            "password.string" => "Le mot de passe doit être une chaîne de caractères.",
            "password.min" => "Le mot de passe doit contenir au moins 6 caractères.",

        ];
    }
}
