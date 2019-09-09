<?php

use Illuminate\Database\Seeder;

class UserConditionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\UserCondition::class, 7)->create();
    }
}
