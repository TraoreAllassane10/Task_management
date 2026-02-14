<?php

namespace App\Http\Requests\admin;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateTacheRequest extends FormRequest
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
            "titre" => ["required", "string", "min:5"],
            "description" => ["required", "string", "min:5"],
            "date_debut" => ["required", "string"],
            "date_fin" => ["required", "string", "after_or_equal:date_debut"],
            "minitaches" => ["required", "array"]
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => false,
            "message" => "Erreur de validation",
            "erreur" => $validator->errors()
        ], 422));
    }

    public function messages(): array
    {
        return [
            // Titre
            "titre.required" => "Le titre est obligatoire.",
            "titre.string" => "Le titre doit être une chaîne de caractères valide.",
            "titre.min" => "Le titre doit contenir au moins 5 caractères.",

            // Description
            "description.required" => "La description est obligatoire.",
            "description.string" => "La description doit être une chaîne de caractères valide.",
            "description.min" => "La description doit contenir au moins 5 caractères.",

            // Date début
            "date_debut.required" => "La date de début est obligatoire.",
            "date_debut.string" => "La date de début doit être une valeur valide.",

            // Date fin
            "date_fin.required" => "La date de fin est obligatoire.",
            "date_fin.string" => "La date de fin doit être une valeur valide.",
            "date_fin.after_or_equal" => "La date de fin doit être postérieure ou égale à la date de début.",

            // Mini tâches
            "minitaches.required" => "Les mini tâches sont obligatoires.",
            "minitaches.array" => "Les mini tâches doivent être envoyées sous forme de tableau.",
        ];
    }
}
