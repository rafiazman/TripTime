<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Http\Resources\MessageResource;
use App\Message;
use App\Trip;
use Carbon\Carbon;
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

        $lastChecked = \DB::table('user_trip')->where([
            ['user_id', $user->id],
            ['trip_id', $trip->id]
        ])->value('last_checked_chat');

        \DB::table('user_trip')->where([
            ['user_id', $user->id],
            ['trip_id', $trip->id]
        ])->update(['last_checked_chat' => now()]);

        if ($lastChecked == null)
        {
            $messages = Message::where('trip_id', $trip->id)->get();
            $vm = [
                'unread' => 0,
                'messages' => MessageResource::collection($messages)
            ];
        }
        else
        {
            $lastCheckedDate = Carbon::parse($lastChecked);
            $unreadCount = Message::where('trip_id', $trip->id)
                ->where('created_at', '>=', $lastCheckedDate->toDateTimeString())
                ->count();
            $messages = Message::where('trip_id', $trip->id)->get();

            $vm = [
                'unread' => $unreadCount,
                'messages' => MessageResource::collection($messages)
            ];
        }

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
        $user = $request->user();
        if (!$trip->hasParticipant($user)) return response()->json([
            'message' => 'You are not a participant of this trip.'
        ], 401);

        $message = Message::create([
            'body' => $request->input('content'),
            'user_id' => auth()->id(),
            'trip_id' => $trip->id
        ]);

        // Broadcast to all listeners (trip participants)
        broadcast(new NewMessage($message));

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
