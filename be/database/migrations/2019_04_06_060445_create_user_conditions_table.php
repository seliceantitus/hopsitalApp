<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserConditionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_conditions', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('idUser')->unsigned();
            $table->integer('idCondition')->unsigned();
        });

        Schema::table('user_conditions', function($table){
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idCondition')->references('id')->on('medical_conditions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_conditions');
    }
}
