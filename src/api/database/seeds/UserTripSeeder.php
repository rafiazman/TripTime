<?php

use Illuminate\Database\Seeder;

class UserTripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all the users and attach between 2 and 3 random trips to each user
        $trips = \App\Trip::all();

        \App\User::all()->each(function ($user) use ($trips) {
            $user->trips()->attach(
                $trips->random(rand(2, 3))->pluck('id')->toArray(),
                [
                    'last_checked_trip' => now(),
                    'last_checked_chat' => now()
                ]
            );
        });
    }
}
