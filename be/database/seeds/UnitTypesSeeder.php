<?php

use Illuminate\Database\Seeder;

class UnitTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\UnitType::class, 5)->create();
    }
}
