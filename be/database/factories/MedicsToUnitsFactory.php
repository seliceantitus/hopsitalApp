<?php

use Faker\Generator as Faker;

$medicsToUnitsIndex = 0;

function getMedicMTUF(){
    global $medicsToUnitsIndex;
    $medic = DB::table('medics')->skip($medicsToUnitsIndex)->first();
    $medicsToUnitsIndex++;
    return $medic->id;
}

function getUnit(){
    $unit = DB::table('medical_units')->inRandomOrder()->first();
    return $unit->id;
}

$factory->define(App\MedicsToUnits::class, function (Faker $faker) {
    return [
        'idUnit' => getUnit(),
        'idMedic' => getMedicMTUF()
    ];
});
