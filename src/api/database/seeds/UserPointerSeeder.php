<?php

use Illuminate\Database\Seeder;

class UserPointerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $pointers = [
            \App\Activity::class,
            \App\Travel::class,
        ];

        \App\User::all()->each(function ($user) use ($pointers, $faker) {

            $pointerType = $faker->randomElement($pointers);
            $pointer = $pointerType::all()->random();

            $user->activities()->attach(
                $pointer->id
            );
        });
    }
}
