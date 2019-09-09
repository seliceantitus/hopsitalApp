<?php

use Illuminate\Database\Seeder;

class MedicsToUnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\MedicsToUnits::class, 10)->create();
    }
}
