<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTripRequest;
use App\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        // TODO: Incorporate Laravel Resources to transform Model to JSON
    }

    /**
     * Display a listing of all trips of the currently
     * logged in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $trips = $request->user()->trips()->get();

        $vm = $trips->map(function($trip) {
            return [
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true,
            ];
        });

        return response()->json($vm);
    }

    /**
     * Display a listing of all current trips of the
     * currently logged in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function currentTrips(Request $request)
    {
        $trips = $request->user()->trips()
            ->where([
                ['start_date', '<=', now()],
                ['end_date', '>=', now()],
            ])
            ->get()
            ->values();

        $vm = $trips->map(function($trip) {
            return [
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true,
            ];
        });

        return response()->json($vm);
    }

    /**
     * Display a listing of all past trips of the
     * currently logged in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function pastTrips(Request $request)
    {
        $trips = $request->user()->trips()
            ->where('end_date', '<', now())
            ->get()
            ->values();

        $vm = $trips->map(function($trip) {
            return [
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true,
            ];
        });

        return response()->json($vm);
    }

    /**
     * Display a listing of all future trips of the
     * currently logged in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function futureTrips(Request $request)
    {
        $trips = $request->user()->trips()
            ->where([
                ['start_date', '>', now()],
            ])
            ->get()
            ->values();

        $vm = $trips->map(function($trip) {
            return [
                'id' => $trip->id,
                'name' => $trip->name,
                'updated' => true,
            ];
        });

        return response()->json($vm);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateTripRequest $request
     * @return void
     */
    public function store(CreateTripRequest $request)
    {
        $startDateTime = \date('Y-m-d H:i:s', strtotime($request->start));
        $endDateTime = \date('Y-m-d H:i:s', strtotime($request->end));

        $user = $request->user();
        $trip = new Trip([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $startDateTime,
            'end_date' => $endDateTime
        ]);
        $trip->save();
        $trip->users()->save($user, [
            'last_checked_trip' => now(),
            'last_checked_chat' => now(),
        ]);

        $tripVm = $this->getTripVm($trip);
        $tripVm['id'] = $trip->id;

        $vm = [
            'message' => 'Trip successfully created.',
            'trip' => $tripVm
        ];

        return response()->json($vm);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Trip  $trip
     * @return \Illuminate\Http\Response
     */
    public function show(Trip $trip)
    {
        $vm = $this->getTripVm($trip);

        return response()->json($vm);
    }

    /**
     * Display all activities associated with the given Trip
     * @param Trip $trip
     * @return \App\Activity[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Support\Collection
     */
    public function showActivities(Trip $trip)
    {
        $activities = $trip->activities;

        $vmActivities = $activities->map(function ($activity) {
            $location = $activity->location;

            $fullCoordinates = $location->coordinates;
            $coordinates = explode(', ', $fullCoordinates);
            $lat = $coordinates[0];
            $lng = $coordinates[1];

            return [
                'id' => $activity->id,
                'type' => $activity->type,
                'start' => $activity->start_time,
                'end' => $activity->end_time,
                'name' => $activity->name,
                'description' => $activity->description,
                'updated' => $activity->updated_at,
                'address' => $location->address,
                'gps' => [
                    'lat' => $lat,
                    'lng' => $lng,
                ],
                'people' => $activity->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'avatarPath' => $user->avatar_url,
                    ];
                }),
                'notes' => $activity->notes->map(function ($note) {
                    return [
                        'id' => $note->id,
                        'author' => [
                            'id' => $note->user->id,
                            'name' => $note->user->name,
                            'avatarPath' => $note->user->avatar_url,
                        ],
                        'content' => $note->body,
                        'updated' => $note->updated_at
                    ];
                }),
            ];
        });

        return $vmActivities;
    }

    /**
     * Display all travels associated with the given Trip
     * @param Trip $trip
     * @return \App\Travel[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Support\Collection
     */
    public function showTravels(Trip $trip)
    {
        $travels = $trip->travels;

        $vmActivities = $travels->map(function ($travel) {
            $fromLocation = $travel->from;
            $fromCoords = explode(', ', $fromLocation->coordinates);
            $fromLat = $fromCoords[0];
            $fromLng = $fromCoords[1];

            $toLocation = $travel->to;
            $toCoords = explode(', ', $toLocation->coordinates);
            $toLat = $toCoords[0];
            $toLng = $toCoords[1];

            return [
                'id' => $travel->id,
                'start' => $travel->start,
                'end' => $travel->end,
                'mode' => $travel->mode,
                'description' => $travel->description,
                'from' => [
                    'lat' => $fromLat,
                    'lng' => $fromLng,
                ],
                'to' => [
                    'lat' => $toLat,
                    'lng' => $toLng,
                ],
                'people' => $travel->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'avatarPath' => $user->avatar_url,
                    ];
                }),
                'notes' => $travel->notes->map(function ($note) {
                    return [
                        'id' => $note->id,
                        'author' => [
                            'id' => $note->user->id,
                            'name' => $note->user->name,
                            'avatarPath' => $note->user->avatar_url,
                        ],
                        'content' => $note->body,
                        'updated' => $note->updated_at
                    ];
                }),
            ];
        });

        return $vmActivities;
    }

    /**
     * Adds the currently logged in user as a participant to the given Trip
     * @param Request $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function addUser(Request $request, Trip $trip)
    {
        $user = $request->user();
        $trip->users()->save($user);

        $tripVm = $this->getTripVm($trip);

        return response()->json([
            'message' => "Successfully added $user->email to $trip->name",
            'trip' => $tripVm
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Trip  $trip
     * @return \Illuminate\Http\Response
     */
    public function edit(Trip $trip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Trip  $trip
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Trip $trip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Trip  $trip
     * @return \Illuminate\Http\Response
     */
    public function destroy(Trip $trip)
    {
        //
    }

    /**
     * Gets the Trip JSON ViewModel from a given Trip
     * @param Trip $trip
     * @return array
     */
    private function getTripVm(Trip $trip) {
        $participants = $trip->users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatarPath' => $user->avatar_url,
            ];
        });
        $participants = $participants->sortBy('id');

        return [
            'name' => $trip->name,
            'description' => $trip->description,
            'participants' => $participants,
            'start' => $trip->start_date,
            'end' => $trip->end_date
        ];
    }
}
