<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Note;
use Faker\Generator as Faker;

$factory->define(Note::class, function (Faker $faker) {
    $pointers = [
        \App\Activity::class,
        \App\Travel::class,
    ];

    $pointerType = $faker->randomElement($pointers);
    $pointer = factory($pointerType)->create();

    return [
        'body' => $faker->text,
        'user_id' => \App\User::all()->random()->id,
        'pointer_id' => $pointer->id,
        'pointer_type' => $pointerType,
    ];
});
