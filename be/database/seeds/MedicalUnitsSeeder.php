<?php

use App\UnitType;
use Illuminate\Database\Seeder;

class MedicalUnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\MedicalUnit::class, 10)->create();
    }
}
