<?php

namespace App\Http\Controllers;

use App\Http\Resources\TripResource;
use App\Trip;
use App\TripInvite;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class TripInviteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Gets all the invite links associated with the given Trip
     * @param Request $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, Trip $trip)
    {
        $user = $request->user();
        $isValidUser = $trip->users()->where('user_id', $user->id)->exists();

        if (!$isValidUser) return response()->json([
            'message' => 'You are not a participant of this trip.'
        ], 401);

        $invites = TripInvite::whereTripId($trip->id)->get();
        $uuids = $invites->map(function ($invite) {
            return $invite->uuid;
        });
        $vm = [
            'uuids' => $uuids
        ];

        return response()->json($vm);
    }

    /**
     * Create a join URL to invite other users to join the trip
     * @param Request $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function createInvitationLink(Request $request, Trip $trip)
    {
        $user = $request->user();
        $isValidUser = $trip->users()->where('user_id', $user->id)->exists();

        if (!$isValidUser) return response()->json([
            'message' => 'You are not a participant of this trip.'
        ], 401);

        $invite = new TripInvite([
            'uuid' => Uuid::uuid4()->toString(),
            'trip_id' => $trip->id
        ]);
        $invite->save();

        return response()->json([
            'uuid' => $invite->uuid
        ]);
    }

    /**
     * Joins the currently logged in user to a trip based on the UUID given in the url
     * @param Request $request
     * @param $uuid
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function joinByInvitationLink(Request $request, $uuid)
    {
        $user = $request->user();

        try {
            $invite = TripInvite::whereUuid($uuid)->firstOrFail();
        }
        catch (ModelNotFoundException $ex) {
            return response()->json([
                'message' => 'Invalid invitation URL'
            ], 404);
        }

        $trip = $invite->trip;
        if ($trip->users()->where('users.id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You are already a participant of this trip.'
            ], 401);
        }

        $trip->users()->save($user, [
            'last_checked_trip' => now(),
            'last_checked_chat' => now()
        ]);
        $invite->delete();

        $vm = [
            'message' => 'Successfully joined the trip via invitation',
            'trip' => new TripResource($trip)
        ];

        return response()->json($vm);
    }
}
