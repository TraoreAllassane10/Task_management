<?php

namespace App\Http\Requests\auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|min:6",
            "photo" => "nullable|image|mimes:jpg,jpeg,png,webp",
            "code_invitation" => "nullable|string"
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
            "name.required" => "Le nom est requis.",
            "name.string" => "Le nom doit être une chaîne de caractères.",
            "email.required" => "L'email est requis.",
            "email.email" => "L'email doit être une adresse valide.",
            "email.unique" => "Cet email est déjà utilisé.",
            "password.required" => "Le mot de passe est requis.",
            "password.string" => "Le mot de passe doit être une chaîne de caractères.",
            "password.min" => "Le mot de passe doit contenir au moins 6 caractères.",
            "photo.image" => "Le fichier doit être une image.",
            "photo.mimes" => "L'image doit être au format jpg, jpeg, png ou webp.",
            "code_invitation.string" => "Le code d'invitation doit être une chaîne de caractères."
        ];
    }
}
