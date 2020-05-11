<?php

namespace Tests\Feature\Http\Controllers;

use App\Location;
use App\Note;
use App\Travel;
use App\Trip;
use App\User;
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
        $location = factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        $travel = factory(Travel::class)->create();
        $user->activities()->attach($travel);

        $response = $this->actingAs($user)
            ->json('post', "/api/travel/$travel->id/notes", [
                'content' => 'Test note contents here'
            ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => "Successfully added note to \"$travel->name\"",
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
        $location = factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
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
}
