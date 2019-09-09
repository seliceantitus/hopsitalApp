<?php

use Illuminate\Database\Seeder;

class RatingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param $index
     * @return void
     */

    public function run()
    {
        factory(App\Rating::class, 10)->create();
    }
}
