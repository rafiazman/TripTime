<?php

namespace Tests\Feature\Http\Controllers;

use App\Message;
use App\Trip;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MessageControllerTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    /** @test */
    public function index__gets_all_messages_from_db_for_a_trip() {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $messages = factory(Message::class, 20)->create();
        $trip->users()->save($user);

        $response = $this->actingAs($user)
            ->json('get', "/api/trip/$trip->id/messages");

        $response->assertStatus(200);
        $response->assertJsonCount(20);
    }

    /** @test */
    public function index__return_error_if_user_is_not_trip_participant() {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        $messages = factory(Message::class, 20)->create();
        $user2 = factory(User::class)->create();

        $response = $this->actingAs($user2)
            ->json('get', "/api/trip/$trip->id/messages");

        $response->assertStatus(401);
    }

    /** @test */
    public function index__return_error_if_user_is_not_logged_in() {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        $messages = factory(Message::class, 20)->create();

        $response = $this->json('get', "/api/trip/$trip->id/messages");

        $response->assertStatus(401);
    }

    /** @test */
    public function create__creates_message_with_currently_logged_in_user() {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);

        $response = $this->actingAs($user)
            ->json('post', "/api/trip/$trip->id/messages", [
                'content' => 'test message'
            ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => 1,
            'content' => 'test message',
            'author' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatarPath' => $user->avatar_url
            ]
        ]);
        $this->assertDatabaseHas('messages', [
            'body' => 'test message',
            'user_id' => $user->id,
            'trip_id' => $trip->id
        ]);
    }

    /** @test */
    public function create__return_error_if_user_is_not_trip_participant() {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();

        $response = $this->actingAs($user)
            ->json('post', "/api/trip/$trip->id/messages", [
                'content' => 'test message'
            ]);

        $response->assertStatus(401);
        $this->assertDatabaseMissing('messages', [
            'body' => 'test message',
            'user_id' => $user->id,
            'trip_id' => $trip->id
        ]);
    }

    /** @test */
    public function create__return_error_if_user_is_not_logged_in() {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);

        $response = $this->json('post', "/api/trip/$trip->id/messages", [
                'content' => 'test message'
            ]);

        $response->assertStatus(401);
        $this->assertDatabaseMissing('messages', [
            'body' => 'test message',
            'user_id' => $user->id,
            'trip_id' => $trip->id
        ]);
    }
}
