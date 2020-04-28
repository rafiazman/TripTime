<?php

namespace Tests\Feature\Http\Controllers;

use App\Trip;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => $trip->name,
                'description' => $trip->description,
                'participants' => $users->map(function ($user) {
                    return [
                        'avatarPath' => $user->avatar_url,
                        'email' => $user->email,
                        'id' => $user->id,
                        'name' => $user->name,
                    ];
                }),
                'start' => $tomorrow->toDateTimeString(),
                'end' => $weekAfter->toDateTimeString(),
            ]);
    }
}
