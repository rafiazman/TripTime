<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Http\Requests\CreateActivityRequest;
use App\Http\Requests\CreateTravelRequest;
use App\Http\Requests\CreateTripRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Http\Requests\UpdateTravelRequest;
use App\Http\Resources\ActivityCollection;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\TravelResource;
use App\Location;
use App\Travel;
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Trip $trip)
    {
        $vm = $this->getTripVm($trip);

        return response()->json($vm);
    }

    /**
     * Display all activities associated with the given Trip
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function showActivities(Trip $trip)
    {
        $activities = $trip->activities;

        $vm = ActivityResource::collection($activities);

        return response()->json($vm);
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

    public function addTravel(CreateTravelRequest $request, Trip $trip)
    {
        $fromLocation = new Location([
            'name' => $request->input('from.address'),
            'address' => $request->input('from.address'),
            'coordinates' => $request->input('from.lat') . ', ' . $request->input('from.lng')
        ]);
        $toLocation = new Location([
            'name' => $request->input('to.address'),
            'address' => $request->input('to.address'),
            'coordinates' => $request->input('to.lat') . ', ' . $request->input('to.lng')
        ]);
        $fromLocation->save();
        $toLocation->save();

        $travel = new Travel([
            'mode' => $request->input('mode'),
            'description' => $request->input('description'),
            'start' => date('Y-m-d H:i:s', strtotime($request->input('from.time'))),
            'end' => date('Y-m-d H:i:s', strtotime($request->input('to.time'))),
            'trip_id' => $trip->id,
            'from_coordinates' => $request->input('from.lat') . ', ' . $request->input('from.lng'),
            'to_coordinates' => $request->input('to.lat') . ', ' . $request->input('to.lng')
        ]);
        $travel->save();

        $tripVm = $this->getTripVm($trip);

        return response()->json([
            'message' => "Successfully added a new Travel to $trip->name",
            'trip' => $tripVm
        ]);
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
     * @param CreateActivityRequest $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function addActivity(CreateActivityRequest $request, Trip $trip)
    {
        $lat = $request->input('location.lat');
        $lng = $request->input('location.lng');

        $location = new Location([
            'name' => $request->input('location.address', 'Unknown Address'),
            'address' => $request->input('location.address', 'Unknown Address'),
            'coordinates' => "$lat, $lng"
        ]);
        $location->save();

        $activity = $location->activities()->create([
            'type' => $request->type,
            'name' => $request->name,
            'description' => $request->description,
            'start_time' => date('Y-m-d H:i:s', strtotime($request->start)),
            'end_time' => date('Y-m-d H:i:s', strtotime($request->end)),
            'trip_id' => $trip->id,
        ]);

        return response()->json([
            'message' => "Successfully added \"$activity->name\" to database.",
            'activity' => new ActivityResource($activity)
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
     * Edit an activity tied to the given Trip
     * @param Request $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateActivity(UpdateActivityRequest $request, Trip $trip)
    {
        $id = $request->input('id');
        $activity = Activity::findOrFail($id);

        if ($request->filled('type')) $activity->type = $request->input('type');
        if ($request->filled('name')) $activity->name = $request->input('name');
        if ($request->filled('description')) $activity->description = $request->input('description');
        if ($request->filled('start')) $activity->start_time = $request->input('start');
        if ($request->filled('end')) $activity->end_time = $request->input('end');
        $activity->save();

        if ($request->filled('location.lat')
            && $request->filled('location.lng'))
        {
            $lat = $request->input('location.lat');
            $lng = $request->input('location.lng');
            $coordinates =  $lat . ', ' . $lng;

            $location = Location::firstOrCreate(
                [
                    ['coordinates', '=', $coordinates]
                ],
                [
                    'name' => $activity->name,
                    'address' => $request->input('location.address',
                        'Unknown Address'),
                    'coordinates' => $coordinates,
                ]);
            $location->activities()->save($activity);
        }

        $vm = [
            'message' => "Successfully updated activity with id: $activity->id",
            'activity' => new ActivityResource($activity)
        ];

        return response()->json($vm);
    }

    /**
     * Edit a travel tied to the given Trip
     * @param UpdateTravelRequest $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTravel(UpdateTravelRequest $request, Trip $trip)
    {
        $id = $request->input('id');
        $travel = Travel::findOrFail($id);

        if ($request->filled('mode')) $travel->mode = $request->input('mode');
        if ($request->filled('description')) $travel->description = $request->input('description');
        if ($request->filled('from.time')) $travel->start = $request->input('from.time');
        if ($request->filled('to.time')) $travel->end = $request->input('to.time');
        $travel->save();

        if ($request->filled('from.lat')
            && $request->filled('from.lng'))
        {
            $coordinates = $request->input('from.lat') .
                ', ' . $request->input('from.lng');

            $location = Location::firstOrCreate(
                [
                    ['coordinates', '=', $coordinates]
                ],
                [
                    'name' => 'Travel From Location',
                    'address' => $request->input('from.address',
                        'Unknown Address'),
                    'coordinates' => $coordinates,
                ]);
            $location->travel_froms()->save($travel);
        }

        if ($request->filled('to.lat')
            && $request->filled('to.lng'))
        {
            $coordinates = $request->input('to.lat') .
                ', ' . $request->input('to.lng');

            $location = Location::firstOrCreate(
                [
                    ['coordinates', '=', $coordinates]
                ],
                [
                    'name' => 'Travel From Location',
                    'address' => $request->input('to.address',
                        'Unknown Address'),
                    'coordinates' => $coordinates,
                ]);
            $location->travel_tos()->save($travel);
        }

        $vm = [
            'message' => "Successfully updated travel with id: $travel->id",
            'travel' => new TravelResource($travel)
        ];

        return response()->json($vm);
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
