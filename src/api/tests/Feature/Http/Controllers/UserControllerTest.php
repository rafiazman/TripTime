<?php

namespace Tests\Feature\Http\Controllers;

use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function checks_for_an_existing_user()
    {
        $user = factory(User::class)->create();

        $response = $this->json('head', "/api/user/email/$user->email");

        $response->assertStatus(200);
    }

    /** @test */
    public function checks_for_a_nonexisting_user()
    {
        $response = $this->json('head', "/api/user/email/nonexistinguser@domain.com");

        $response->assertStatus(404);
    }

    /** @test */
    public function checks_for_a_taken_username()
    {
        $user = factory(User::class)->create();

        $response = $this->json('head', "/api/user/name/$user->name");

        $response->assertStatus(200);
    }

    /** @test */
    public function checks_for_a_free_username()
    {
        $response = $this->json('head', "/api/user/name/John Key");

        $response->assertStatus(404);
    }

    /** @test */
    public function is_able_to_register_a_user()
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
        ]);
    }

    /** @test */
    public function rejects_registration_attempt_with_different_confirmed_password()
    {
        $response = $this->json('post', "/api/register", [
            'email' => 'newuser@user.com',
            'name' => 'New User',
            'password' => 'newUserPassword',
            'password_confirmation' => 'obviouslyDifferentHere',
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('users', [
            'email' => 'newuser@user.com',
            'name' => 'New User',
        ]);
    }

    /** @test */
    public function rejects_registration_attempt_with_invalid_email()
    {
        $response = $this->json('post', "/api/register", [
            'email' => 'newuser',
            'name' => 'New User',
            'password' => 'newUserPassword',
            'password_confirmation' => 'newUserPassword',
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('users', [
            'email' => 'newuser@user.com',
            'name' => 'New User',
        ]);
    }

    /** @test */
    public function rejects_registration_attempt_with_missing_request_body_fields()
    {
        $response = $this->json('post', "/api/register", [
            'name' => 'New User',
            'password' => 'newUserPassword',
            'password_confirmation' => 'newUserPassword',
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('users', [
            'email' => 'newuser@user.com',
            'name' => 'New User',
        ]);
    }
}
