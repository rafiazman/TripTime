<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTravelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travels', function (Blueprint $table) {
            $table->id();

            $table->string('mode');
            $table->text('description');
            $table->dateTime('start');
            $table->dateTime('end');

            $table->timestamps();

            // Foreign keys
            $table->unsignedBigInteger('trip_id');
            $table->string('from_coordinates');
            $table->string('to_coordinates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('travels');
    }
}
