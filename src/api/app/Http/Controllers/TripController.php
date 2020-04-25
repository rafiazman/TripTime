<?php

namespace App\Http\Controllers;

use App\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * Display a listing of all trips of the currently
     * logged in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $trips = $request->user()->trips();

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Trip  $trip
     * @return \Illuminate\Http\Response
     */
    public function show(Trip $trip)
    {
        //
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
}
