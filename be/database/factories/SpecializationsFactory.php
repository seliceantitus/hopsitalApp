<?php

use Faker\Generator as Faker;

$factory->define(App\Specialization::class, function (Faker $faker) {
    return [
        'specialization' => $faker->jobTitle
    ];
});
