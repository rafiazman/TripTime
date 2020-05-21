<?php


/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('messages.trip.{tripId}', function ($user, $tripId) {
    $trip = \App\Trip::find((int) $tripId);
    return $trip->hasParticipant($user);
});

Broadcast::channel('trip.{tripId}.markers', function ($user, $tripId) {
    $trip = \App\Trip::find((int) $tripId);
    return $trip->hasParticipant($user);
});
