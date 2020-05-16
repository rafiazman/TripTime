<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Message;
use App\Trip;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, Trip $trip)
    {
        $user = $request->user();

        if (!$trip->hasParticipant($user)) return response()->json([
            'message' => 'You are not a participant of this trip.'
        ], 401);

        $messages = Message::where('trip_id', $trip->id)->get();

        $vm = MessageResource::collection($messages);

        return response()->json($vm);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Request $request
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request, Trip $trip)
    {
        $message = Message::create([
            'body' => $request->input('content'),
            'user_id' => auth()->id(),
            'trip_id' => $trip->id
        ]);

        $vm = new MessageResource($message);

        return response()->json($vm);
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
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
