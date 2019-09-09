<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UnitTypesSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(MedicalConditionSeeder::class);
        $this->call(SpecializationsSeeder::class);

        $this->call(MedicsSeeder::class);
        $this->call(MedicalUnitsSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(RatingHistoriesSeeder::class);
        $this->call(UserConditionsSeeder::class);
        $this->call(MedicsToUnitsSeeder::class);
        $this->call(RatingsSeeder::class);
    }
}
