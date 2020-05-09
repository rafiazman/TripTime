<?php

namespace Tests\Feature\Http\Controllers;

use App\Activity;
use App\Location;
use App\Note;
use App\Travel;
use App\Trip;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class TripControllerTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function gets_list_of_all_trips()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $user->trips()->attach($trip, [
            'last_checked_trip' => now(),
            'last_checked_chat' => now()
        ]);

        $response = $this->actingAs($user)->json('get', '/api/trips');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true
            ]);
    }

    /** @test */
    public function gets_list_of_past_trips()
    {
        $yesterday = now()->addDays(-1);
        $weekBefore = now()->addDays(-7);
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create([
            'start_date' => $weekBefore,
            'end_date' => $yesterday
        ]);
        $user->trips()->attach($trip, [
            'last_checked_trip' => now(),
            'last_checked_chat' => now()
        ]);

        $response = $this->actingAs($user)->json('get', '/api/trips/past');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true
            ]);
    }

    /** @test */
    public function gets_list_of_current_trips()
    {
        $tomorrow = now()->addDays(1);
        $weekBefore = now()->addDays(-7);

        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create([
            'start_date' => $weekBefore,
            'end_date' => $tomorrow
        ]);
        $user->trips()->attach($trip, [
            'last_checked_trip' => now(),
            'last_checked_chat' => now()
        ]);

        $response = $this->actingAs($user)->json('get', '/api/trips/current');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true
            ]);
    }

    /** @test */
    public function gets_list_of_future_trips()
    {
        $tomorrow = now()->addDays(1);
        $weekAfter = now()->addDays(7);

        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create([
            'start_date' => $tomorrow,
            'end_date' => $weekAfter
        ]);
        $user->trips()->attach($trip, [
            'last_checked_trip' => now(),
            'last_checked_chat' => now()
        ]);

        $response = $this->actingAs($user)->json('get', '/api/trips/future');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true
            ]);
    }

    /** @test */
    public function gets_specific_trip_detail()
    {
        $tomorrow = now()->addDays(1);
        $weekAfter = now()->addDays(7);

        $users = factory(User::class, 3)->create();
        $trip = factory(Trip::class)->create([
            'start_date' => $tomorrow,
            'end_date' => $weekAfter
        ]);
        // Make all three created users join the trip
        $users->each(function ($user) use ($trip) {
            $user->trips()->attach($trip, [
                'last_checked_trip' => now(),
                'last_checked_chat' => now()
            ]);
        });

        $response = $this->actingAs($users->random())->json('get', "/api/trip/$trip->id");

        $response->assertStatus(200);

        $this->assertEquals($trip->name, $response['name']);
        $this->assertEquals($trip->description, $response['description']);
        $this->assertEquals($tomorrow->toDateTimeString(), $response['start']);
        $this->assertEquals($weekAfter->toDateTimeString(), $response['end']);
        $users->each(function ($user) use ($response) {
            $response->assertJsonFragment([
                'avatarPath' => $user->avatar_url,
                'email' => $user->email,
                'id' => $user->id,
                'name' => $user->name,
            ]);
        });
    }

    /** @test */
    public function gets_activities_tied_to_a_trip()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $location = factory(Location::class)->create([
            'coordinates' => '100.22, 20.36'
        ]);
        $activity = factory(Activity::class)->create();
        $user->activities()->attach($activity);
        // Force create Note tied to an Activity instead of a Travel
        $note = factory(Note::class)->create([
            'pointer_id' => $activity->id,
            'pointer_type' => Activity::class
        ]);

        $response = $this->actingAs($user)->json('get', "/api/trip/$trip->id/activities");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $activity->id,
                'type' => $activity->type,
                'start' => $activity->start_time->format('Y-m-d H:i:s'),
                'end' => $activity->end_time->format('Y-m-d H:i:s'),
                'name' => $activity->name,
                'description' => $activity->description,
                'updated' => $activity->updated_at,
                'address' => $location->address,
                'gps' => [
                    'lat' => '100.22',
                    'lng' => '20.36',
                ],
                'people' => [
                    [
                        'id' => $user->id,
                        'name' => $user->name,
                        'avatarPath' => $user->avatar_url
                    ]
                ],
                'notes' => [
                    [
                        'id' => $note->id,
                        'author' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'avatarPath' => $user->avatar_url
                        ],
                        'content' => $note->body,
                        'updated' => $note->updated_at
                    ]
                ]
            ]);
    }

    /** @test */
    public function gets_travels_tied_to_a_trip()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();
        $locations = factory(Location::class, 2)->create();
        $travel = factory(Travel::class)->create();
        $user->travels()->attach($travel);
        // Force create Note tied to a Travel
        $note = factory(Note::class)->create([
            'pointer_id' => $travel->id,
            'pointer_type' => Travel::class
        ]);

        $response = $this->actingAs($user)->json('get', "/api/trip/$trip->id/travels");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $travel->id,
                'start' => $travel->start->format('Y-m-d H:i:s'),
                'end' => $travel->end->format('Y-m-d H:i:s'),
                'mode' => $travel->mode,
                'description' => $travel->description,
                'from' => [
                    'lat' => explode(', ', $travel->from->coordinates)[0],
                    'lng' => explode(', ', $travel->from->coordinates)[1],
                ],
                'to' => [
                    'lat' => explode(', ', $travel->to->coordinates)[0],
                    'lng' => explode(', ', $travel->to->coordinates)[1],
                ],
                'people' => [
                    [
                        'id' => $user->id,
                        'name' => $user->name,
                        'avatarPath' => $user->avatar_url
                    ]
                ],
                'notes' => [
                    [
                        'id' => $note->id,
                        'author' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'avatarPath' => $user->avatar_url
                        ],
                        'content' => $note->body,
                        'updated' => $note->updated_at
                    ]
                ]
            ]);
    }


    public function joins_currently_logged_in_user_to_a_trip()
    {
        $user = factory(User::class)->create();
        $trip = factory(Trip::class)->create();

        $response = $this->actingAs($user)->json('post', "/api/trip/$trip->id/users");

        $response->assertStatus(200);

        $this->assertEquals($trip->name, $response['name']);
        $this->assertEquals($trip->description, $response['description']);
        $this->assertEquals($trip->start_date, $response['start']);
        $this->assertEquals($trip->end_date, $response['end']);

        $response->assertJsonFragment([
            'avatarPath' => $user->avatar_url,
            'email' => $user->email,
            'id' => $user->id,
            'name' => $user->name,
        ]);
    }

    /** @test */
    public function creates_a_new_trip_unsuccessfully_when_start_date_is_before_today()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->json('post', '/api/trips', [
            'name' => 'New Trip',
            'description' => 'A new trip created for test purposes',
            'start' => now()->addDays(-1)->toDateString(),
            'end' => now()->toDateString()
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('trips', [
            'name' => 'New Trip',
            'description' => 'A new trip created for test purposes'
        ]);
    }

    /** @test */
    public function creates_a_new_trip_unsuccessfully_when_end_date_is_before_start_date()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->json('post', '/api/trips', [
            'name' => 'New Trip',
            'description' => 'A new trip created for test purposes',
            'start' => now()->toDateString(),
            'end' => now()->addDays(-5)->toDateString()
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('trips', [
            'name' => 'New Trip',
            'description' => 'A new trip created for test purposes'
        ]);
    }

    /** @test */
    public function creates_a_new_trip_with_valid_data()
    {
        $user = factory(User::class)->create();
        $startDate = now()->toDateString();
        $endDate = now()->addDays(1)->toDateString();

        $response = $this->actingAs($user)->json('post', '/api/trips', [
            'name' => 'New Trip',
            'description' => 'A new trip created for test purposes',
            'start' => $startDate,
            'end' => $endDate
        ]);

        $response->assertStatus(200);
        $this->assertEquals('Trip successfully created.', $response['message']);
        $this->assertEquals('New Trip', $response['trip']['name']);
        $this->assertEquals('A new trip created for test purposes', $response['trip']['description']);
        $this->assertEquals("$startDate 00:00:00", $response['trip']['start']);
        $this->assertEquals("$endDate 00:00:00", $response['trip']['end']);
        $this->assertEquals($user->id, $response['trip']['participants'][0]['id']);
        $this->assertDatabaseHas('trips', [
            'name' => 'New Trip',
            'description' => 'A new trip created for test purposes'
        ]);
    }
}
