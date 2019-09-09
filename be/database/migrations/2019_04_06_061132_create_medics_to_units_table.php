<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMedicsToUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medics_to_units', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('idUnit')->unsigned();
            $table->integer('idMedic')->unsigned();
        });

        Schema::table('medics_to_units', function ($table){
            $table->foreign('idUnit')->references('id')->on('medical_units')->onDelete('cascade');
            $table->foreign('idMedic')->references('id')->on('medics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medics_to_units');
    }
}
