<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Activity;
use App\Note;
use App\Travel;
use App\User;
use Faker\Generator as Faker;

$factory->define(Note::class, function (Faker $faker) {
    $pointers = [
        Activity::class,
        Travel::class,
    ];

    $pointerType = $faker->randomElement($pointers);
    $pointerTypeCount = $pointerType::all()->count();

    // If it doesnt exist, randomly choose between Activity and Travel
    // until found one that already exists in DB
    $attempts = 0;
    while ($pointerTypeCount < 1) {
        if ($attempts == 500) throw new Exception('Could not find Travel or Activity within DB after 500 attempts');

        $pointerType = $faker->randomElement($pointers);
        $pointerTypeCount = $pointerType::all()->count();

        $attempts++;
    }

    $pointerIds = $pointerType::pluck('id')->toArray();

    return [
        'body' => $faker->text,
        'user_id' => User::all()->random()->id,
        'pointer_id' => $faker->unique()->randomElement($pointerIds),
        'pointer_type' => $pointerType,
    ];
});

