<?php

use Faker\Generator as Faker;

function getRandomUnitType() {
    $unit = DB::table('unit_types')->inRandomOrder()->first();
    return $unit->id;
}

$factory->define(App\MedicalUnit::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'type' => getRandomUnitType(),
        'location' => $faker->address,
        'logo' => $faker->md5
    ];
});
