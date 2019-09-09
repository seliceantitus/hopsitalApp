<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rating_histories', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('idUser')->unsigned();
            $table->integer('idMedic')->unsigned();
            $table->integer('value');
            $table->dateTime('timestamp');
            $table->string('comment');
        });

        Schema::table('rating_histories', function($table){
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('rating_histories');
    }
}
