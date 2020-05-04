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

            for ($i = 0; $i < rand(0, 4); $i++) {
                // Choose a random Travel/Activity from DB
                $pointerType = $faker->randomElement($pointers);
                $pointer = $pointerType::all()->random();

                DB::table('user_pointer')->insert([
                    'user_id' => $user->id,
                    'pointer_id' => $pointer->id,
                    'pointer_type' => $pointerType
                ]);
            }
        });
    }
}
