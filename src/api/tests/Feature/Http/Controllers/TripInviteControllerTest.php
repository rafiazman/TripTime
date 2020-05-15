<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Controllers\TripInviteController;
use App\Trip;
use App\TripInvite;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TripInviteControllerTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    /**
     * @test
     * @see TripInviteController::index()
     */
    public function index__rejects_users_who_are_not_logged_in()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);

        $response = $this->json('get', "/api/trip/$trip->id/invites");

        $response->assertStatus(401);
    }

    /**
     * @test
     * @see TripInviteController::index()
     */
    public function index__rejects_users_who_are_not_trip_members()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        // Create new, unrelated user
        $newUser = factory(User::class)->create();

        $response = $this->actingAs($newUser)
            ->json('get', "/api/trip/$trip->id/invites");

        $response->assertStatus(401);
    }

    /**
     * @test
     * @see TripInviteController::index()
     */
    public function index__displays_trip_invites_to_trip_members()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        $tripInvite = new TripInvite([
            'uuid' => 'test-uuid-here',
            'trip_id' => $trip->id
        ]);
        $tripInvite->save();

        $response = $this->actingAs($user)
            ->json('get', "/api/trip/$trip->id/invites");

        $response->assertStatus(200);
        $response->assertJson([
            'uuids' => ['test-uuid-here']
        ]);
    }

    /**
     * @test
     * @see TripInviteController::createInvitationLink()
     */
    public function createInvitationLink__rejects_users_who_are_not_logged_in()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        // Create new, unrelated user
        $newUser = factory(User::class)->create();

        $response = $this->json('post', "/api/trip/$trip->id/invite");

        $response->assertStatus(401);
    }

    /**
     * @test
     * @see TripInviteController::createInvitationLink()
     */
    public function createInvitationLink__rejects_users_who_are_not_trip_members()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        // Create new, unrelated user
        $newUser = factory(User::class)->create();

        $response = $this->actingAs($newUser)
            ->json('post', "/api/trip/$trip->id/invite");

        $response->assertStatus(401);
    }

    /**
     * @test
     * @see TripInviteController::createInvitationLink()
     */
    public function createInvitationLink__creates_invitation_uuid_for_trip_members()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);

        $response = $this->actingAs($user)
            ->json('post', "/api/trip/$trip->id/invite");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'uuid'
        ]);
    }

    /**
     * @test
     * @see TripInviteController::joinByInvitationLink()
     */
    public function joinByInvitationLink__rejects_users_who_are_not_logged_in()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        $tripInvite = new TripInvite([
            'uuid' => 'test-uuid-here',
            'trip_id' => $trip->id
        ]);
        $tripInvite->save();

        $response = $this->json('post', "/api/join/test-uuid-here");

        $response->assertStatus(401);
    }

    /**
     * @test
     * @see TripInviteController::joinByInvitationLink()
     */
    public function joinByInvitationLink__rejects_users_who_are_already_trip_members()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        $tripInvite = new TripInvite([
            'uuid' => 'test-uuid-here',
            'trip_id' => $trip->id
        ]);
        $tripInvite->save();

        $response = $this->actingAs($user)
            ->json('post', "/api/join/test-uuid-here");

        $response->assertStatus(401);
    }

    /**
     * @test
     * @see TripInviteController::joinByInvitationLink()
     */
    public function joinByInvitationLink__adds_users_who_are_not_trip_members_to_trip()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $trip->users()->save($user);
        $tripInvite = new TripInvite([
            'uuid' => 'test-uuid-here',
            'trip_id' => $trip->id
        ]);
        $tripInvite->save();
        // Create new, unrelated user
        $newUser = factory(User::class)->create();

        $response = $this->actingAs($newUser)
            ->json('post', "/api/join/test-uuid-here");

        $response->assertStatus(200);
        $this->assertDatabaseHas('user_trip', [
            'user_id' => $newUser->id,
            'trip_id' => $trip->id
        ]);
        $this->assertDatabaseMissing('trip_invites', [
            'uuid' => 'test-uuid-here',
        ]);
    }
}
