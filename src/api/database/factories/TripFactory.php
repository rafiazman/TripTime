<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Trip;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Trip::class, function (Faker $faker) {
    $startDate = Carbon::createFromTimestamp(
        $faker->dateTimeBetween('-2 months', 'now')->getTimestamp()
    );

    $duration = $faker->numberBetween(0, 14);

    $endDate = Carbon::createFromFormat('Y-m-d H:i:s', $startDate)->addDays($duration);

    return [
        'name' => 'Trip to ' . $faker->country,
        'description' => 'My upcoming journey across the ditch down under',
        'start_date' => $startDate,
        'end_date' => $endDate,
    ];
});
