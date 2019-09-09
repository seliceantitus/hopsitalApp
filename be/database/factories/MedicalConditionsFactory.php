<?php

use Faker\Generator as Faker;

$factory->define(App\MedicalCondition::class, function (Faker $faker) {
    return [
        'condition' => $faker->colorName,
        'description' => $faker->text(255)
    ];
});
