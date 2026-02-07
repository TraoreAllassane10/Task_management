<?php

use App\Enums\DifficulteEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('taches', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->mediumText('description');
            $table->enum('difficulte', DifficulteEnum::cases())->default(DifficulteEnum::NORMAL->value);
            $table->date('date_debut');
            $table->date('date_fin');

            $table->foreignId('equipe_id')->constrained();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taches');
    }
};
