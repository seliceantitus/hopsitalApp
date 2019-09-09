<?php

use Faker\Generator as Faker;

function getMedicRHF(){
    $medic = DB::table('medics')->inRandomOrder()->first();
    return $medic->id;
}

function getUserRHF(){
    $user = DB::table('users')->inRandomOrder()->first();
    return $user->id;
}

$factory->define(App\RatingHistory::class, function (Faker $faker) {
    return [
        'idUser' => getUserRHF(),
        'idMedic' => getMedicRHF(),
        'value' => $faker->numberBetween(1,5),
        'timestamp' => $faker->dateTime,
        'comment' => $faker->text(125)
    ];
});
