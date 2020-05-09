<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GeneralTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function db_entities_get_added_with_timezone_zulu_by_default()
    {
        $response = $this->json('post', "/api/register", [
            'email' => 'newuser@user.com',
            'name' => 'New User',
            'password' => 'newUserPassword',
            'password_confirmation' => 'newUserPassword',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@user.com',
            'name' => 'New User',
            'created_at' => now(new \DateTimeZone('Zulu'))
        ]);
    }
}
