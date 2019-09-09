<?php

use Faker\Generator as Faker;

$ratingsIndex = 0;

function getMedicRF(){
    global $ratingsIndex;
    $medic = DB::table('medics')->skip($ratingsIndex)->first();
    $ratingsIndex++;
    return $medic->id;
}

$factory->define(App\Rating::class, function (Faker $faker) {
    return [
        'average' => $faker->randomFloat(1, 1, 5),
        'idMedic' => getMedicRF()
    ];
});
