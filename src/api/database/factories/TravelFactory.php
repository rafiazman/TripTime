<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Travel;
use Faker\Generator as Faker;

$factory->define(Travel::class, function (Faker $faker) {
    $locationCoords = \App\Location::pluck('coordinates')->toArray();
    $trips = \App\Trip::pluck('id')->toArray();

    return [
        'mode' => $faker->randomElement([
            'bus',
            'car',
            'train',
            'flight',
            'bicycle',
        ]),
        'description' => 'This is a randomly generated activity for testing purposes.',
        'start' => $faker->unique()->dateTimeBetween('-7 days', '+7 days'),
        'end' => $faker->unique()->dateTimeBetween('-7 days', '+7 days'),

        'trip_id' => $faker->randomElement($trips),
        'from_coordinates' => $faker->unique()->randomElement($locationCoords),
        'to_coordinates' => $faker->unique()->randomElement($locationCoords),
    ];
});
