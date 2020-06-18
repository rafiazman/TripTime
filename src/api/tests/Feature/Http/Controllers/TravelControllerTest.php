<?php

namespace Tests\Feature\Http\Controllers;

use App\Location;
use App\Note;
use App\Travel;
use App\Trip;
use App\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TravelControllerTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function gets_all_notes_tied_to_a_travel()
    {
        $user = factory(User::class)->create();
        factory(Trip::class)->create();
        factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        factory(Location::class)->create([
            'coordinates' => '100.23, 20.37'
        ]);
        $travel = factory(Travel::class)->create();
        $user->activities()->attach($travel);
        $note = new Note([
            'body' => 'Test body',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);
        $note->save();

        $response = $this->actingAs($user)
            ->json('get', "/api/travel/$travel->id/notes");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'author' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatarPath' => $user->avatar_url,
            ],
            'content' => $note->body,
            'updated' => date(DATE_RFC3339, strtotime($note->updated_at))
        ]);
    }

    /** @test */
    public function creates_notes_tied_to_a_travel()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        factory(Location::class)->create([
            'coordinates' => '100.23, 20.37'
        ]);
        $travel = factory(Travel::class)->create();
        $user->activities()->attach($travel);

        $response = $this->actingAs($user)
            ->json('post', "/api/travel/$travel->id/notes", [
                'content' => 'Test note contents here'
            ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => "Successfully added note.",
            'note' => [
                'author' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatarPath' => $user->avatar_url,
                ],
                'content' => 'Test note contents here',
                'updated' => date(DATE_RFC3339, strtotime(now()->toDateTimeString()))
            ]
        ]);
        $this->assertDatabaseHas('notes', [
            'body' => 'Test note contents here',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);
    }

    /** @test */
    public function updates_existing_user_added_note_tied_to_an_activity()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        factory(Location::class)->create([
            'coordinates' => '100.23, 20.37'
        ]);
        $travel = factory(Travel::class)->create();
        $user->travels()->attach($travel);
        $note = new Note([
            'body' => 'Test body',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);
        $note->save();

        $response = $this->actingAs($user)
            ->json('patch', "/api/travel/$travel->id/notes", [
                'content' => 'My new note content'
            ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'author' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatarPath' => $user->avatar_url,
            ],
            'content' => 'My new note content',
            'updated' => date(DATE_RFC3339, strtotime($note->updated_at))
        ]);
        $this->assertDatabaseHas('notes', [
            'body' => 'My new note content',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);
    }

    /** @test */
    public function updated_notes_have_updated_timestamp_changed()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        factory(Location::class)->create([
            'coordinates' => '100.23, 20.37'
        ]);
        $travel = factory(Travel::class)->create();
        $user->travels()->attach($travel);
        $note = new Note([
            'body' => 'Test body',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);
        $note->created_at = Carbon::now(); // Create using set datetime earlier
        $note->updated_at = Carbon::now(); // Create using set datetime earlier
        $note->save();

        // Check that the created note is really in the past
        $this->assertDatabaseHas('notes', [
            'body' => 'Test body',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class,
            'created_at' => '2020-01-01 00:00:00',
            'updated_at' => '2020-01-01 00:00:00',
        ]);

        // Clear mocked date and set it to a future date
        Carbon::setTestNow(Carbon::create(2020, 1, 2));

        $response = $this->actingAs($user)
            ->json('patch', "/api/travel/$travel->id/notes", [
                'content' => 'My new note content'
            ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'author' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatarPath' => $user->avatar_url,
            ],
            'content' => 'My new note content',
            'updated' => date(DATE_RFC3339, strtotime(now()))
        ]);
        $this->assertDatabaseHas('notes', [
            'body' => 'My new note content',
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class,
            'created_at' => '2020-01-01 00:00:00',
            'updated_at' => Carbon::now()
        ]);
    }

    /** @test */
    public function addUser__returns_error_if_user_not_logged_in()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        factory(Location::class)->create([
            'coordinates' => '100.23, 20.37'
        ]);
        $travel = factory(Travel::class)->create();
        $trip->users()->attach($user);

        $response = $this->json('post', "/api/travel/$travel->id/join");

        $response->assertStatus(401);
    }

    /** @test */
    public function addUser__returns_error_if_user_not_trip_participant()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        factory(Location::class)->create([
            'coordinates' => '100.23, 20.37'
        ]);
        $travel = factory(Travel::class)->create();

        $response = $this->json('post', "/api/travel/$travel->id/join");

        $response->assertStatus(401);
        $this->assertDatabaseMissing('user_pointer', [
            'user_id' => $user->id,
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);
    }
}
