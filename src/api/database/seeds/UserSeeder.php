<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class)->create(
            [
                'email' => 'test@test.com',
                'name' => 'Test User',
                'password' => bcrypt('testtest'),
                'avatar_url' => 'http://via.placeholder.com/150x150'
            ]
        );

        factory(\App\User::class, 4)->create();
    }
}
