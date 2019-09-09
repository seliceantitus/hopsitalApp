<?php

use Faker\Generator as Faker;

function getRandomSpecialization() {
    $specialization = DB::table('specializations')->inRandomOrder()->first();
    return $specialization->id;
}

$factory->define(App\Medic::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'specialization' => getRandomSpecialization(),
        'graduation_year' => $faker->year,
        'image' => $faker->md5
    ];
});
