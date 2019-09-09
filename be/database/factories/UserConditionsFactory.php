<?php

use Faker\Generator as Faker;

function getUserUCF(){
    $user = DB::table('users')->inRandomOrder()->first();
    return $user->id;
}

function getConditionUCF(){
    $condition = DB::table('medical_conditions')->inRandomOrder()->first();
    return $condition->id;
}

$factory->define(App\UserCondition::class, function (Faker $faker) {
    return [
        'idUser' => getUserUCF(),
        'idCondition' => getConditionUCF()
    ];
});
