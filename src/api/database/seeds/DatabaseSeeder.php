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
         $this->call([
             UserSeeder::class,
             TripSeeder::class,
             UserTripSeeder::class,
             LocationSeeder::class,
             ActivitySeeder::class,
             TravelSeeder::class,
             NoteSeeder::class,
             MessageSeeder::class,
             UserPointerSeeder::class,
         ]);
    }
}
