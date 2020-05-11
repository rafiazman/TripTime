<?php

namespace Tests\Feature\Http\Controllers;

use App\Activity;
use App\Location;
use App\Note;
use App\Trip;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ActivityControllerTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function gets_all_notes_tied_to_an_activity()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $location = factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        $activity = factory(Activity::class)->create();
        $user->activities()->attach($activity);
        $note = new Note([
            'body' => 'Test body',
            'user_id' => $user->id,
            'pointer_id' => $activity->id,
            'pointer_type' => Activity::class
        ]);
        $note->save();

        $response = $this->actingAs($user)
            ->json('get', "/api/activity/$activity->id/notes");

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
