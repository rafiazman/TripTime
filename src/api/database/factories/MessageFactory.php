<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Message;
use Faker\Generator as Faker;

$factory->define(Message::class, function (Faker $faker) {
    return [
        'body' => $faker->sentence,
        'user_id' => \App\User::all()->random()->id,
        'trip_id' => \App\Trip::all()->random()->id,
    ];
});
