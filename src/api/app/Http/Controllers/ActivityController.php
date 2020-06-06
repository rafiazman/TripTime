<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Events\DeleteTripActivity;
use App\Events\UpdateTripActivity;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\NoteCollection;
use App\Http\Resources\NoteResource;
use App\Http\Resources\UserResource;
use App\Note;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        //
    }

    /**
     * Displays all notes tied to this activity
     * @param Activity $activity
     * @return NoteCollection
     */
    public function showNotes(Activity $activity)
    {
        $notes = $activity->notes()->get();

        return new NoteCollection($notes);
    }

    /**
     * Adds a note to the given activity
     * @param Request $request
     * @param Activity $activity
     * @return \Illuminate\Http\JsonResponse
     */
    public function addNote(Request $request, Activity $activity)
    {
        $request->validate([
            'content' => 'string|required'
        ]);

        $note = Note::firstOrCreate([
            'user_id' => $request->user()->id,
            'pointer_id' => $activity->id,
            'pointer_type' => Activity::class
        ], [
            'body' => $request->input('content'),
            'user_id' => $request->user()->id,
            'pointer_id' => $activity->id,
            'pointer_type' => Activity::class
        ]);
        $note->body = $request->input('content');
        $note->save();

        $activity->notes()->save($note);

        broadcast(new UpdateTripActivity($activity));

        $vm = [
            'message' => "Successfully added note to \"$activity->name\"",
            'note' => new NoteResource($note)
        ];

        return response()->json($vm);
    }

    /**
     * Adds user as a participant of the given activity
     * @param Request $request
     * @param Activity $activity
     * @return \Illuminate\Http\JsonResponse
     */
    public function addUser(Request $request, Activity $activity)
    {
        $user = $request->user();

        if (!$activity->trip->hasParticipant($user))
            return response()->json([
                'message' => 'You are not a participant of this trip.'
            ], 401);

        $activity->users()->save($user);

        broadcast(new UpdateTripActivity($activity));

        return response()->json([
            'message' => "Successfully added \"$user->name\" to \"$activity->name\"",
            'activity' => new ActivityResource($activity)
        ]);
    }

    /**
     * Updates the currently logged in user's note tied to the given activity
     * @param Request $request
     * @param Activity $activity
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateNote(Request $request, Activity $activity)
    {
        $request->validate([
            'content' => 'string|required'
        ]);

        $user = $request->user();

        $note = Note::where([
            ['user_id', $user->id],
            ['pointer_type', Activity::class],
            ['pointer_id', $activity->id],
        ])->first();
        $note->body = $request->input('content');
        $note->save();

        broadcast(new UpdateTripActivity($activity));

        $vm = [
            'message' => "Successfully updated note for \"$activity->name\"",
            'note' => new NoteResource($note)
        ];

        return response()->json($vm);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function edit(Activity $activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Activity $activity)
    {
        $user = auth()->user();

        if (!$activity->trip->hasParticipant($user))
            return response()->json([
                'message' => 'You are not a participant of this trip.'
            ], 401);

        broadcast(new DeleteTripActivity($activity));

        $activity->delete();

        $vm = [
            'message' => 'Successfully deleted the activity.',
        ];

        return response()->json($vm);
    }
}
