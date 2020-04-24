<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Trip;
use Faker\Generator as Faker;

$factory->define(Trip::class, function (Faker $faker) {
    return [
        'name' => 'Around ' . $faker->country,
        'description' => 'My upcoming journey across the ditch down under',
        'start_date' => $faker->dateTime(),
        'end_date' => $faker->dateTimeBetween('now', '+7 days'),
    ];
});
