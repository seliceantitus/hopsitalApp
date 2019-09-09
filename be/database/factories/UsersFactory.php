<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

function getRole(){
    $role = DB::table('roles')->inRandomOrder()->first();
    return $role->id;
}

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->freeEmail,
        'role' => getRole(),
        'password' => Hash::make("1234"),
        'image' => $faker->md5
    ];
});
