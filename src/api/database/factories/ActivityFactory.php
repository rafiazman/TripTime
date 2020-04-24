<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Activity;
use Faker\Generator as Faker;

$factory->define(Activity::class, function (Faker $faker) {
    $locationCoords = \App\Location::pluck('coordinates')->toArray();
    $trips = \App\Trip::pluck('id')->toArray();

    return [
        'type' => $faker->randomElement([
            'outdoors',
            'eating',
            'scenery',
            'gathering',
            'music',
            'gamble',
            'play',
            'fantasy',
            'landmark',
            'art',
            'animal'
        ]),
        'name' => 'Test Activity ' . $faker->randomNumber(2),
        'description' => 'This is a randomly generated activity for testing purposes.',
        'start_time' => $faker->unique()->dateTimeBetween('-7 days', '+7 days'),
        'end_time' => $faker->unique()->dateTimeBetween('-7 days', '+7 days'),

        'trip_id' => $faker->randomElement($trips),
        'location_coordinates' => $faker->randomElement($locationCoords),
    ];
});
