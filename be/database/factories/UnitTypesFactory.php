<?php

use Faker\Generator as Faker;

$factory->define(App\UnitType::class, function (Faker $faker) {
    return [
        'type' => $faker->streetSuffix
    ];
});
