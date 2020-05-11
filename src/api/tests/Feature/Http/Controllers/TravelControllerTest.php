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
}
