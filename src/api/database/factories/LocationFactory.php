<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Location;
use Faker\Generator as Faker;

$factory->define(Location::class, function (Faker $faker) {
    return [
        'name' => $faker->streetName,
        'address' => $faker->address,
        'coordinates' => $faker->unique()->latitude(-36.84000, -36.86667) . ', ' . $faker->unique()->longitude(174.75567, 174.78967),
    ];
});
