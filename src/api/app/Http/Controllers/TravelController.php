<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteCollection;
use App\Http\Resources\NoteResource;
use App\Note;
use App\Travel;
use Illuminate\Http\Request;

class TravelController extends Controller
{
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
     * @param  \App\Travel  $travel
     * @return \Illuminate\Http\Response
     */
    public function show(Travel $travel)
    {
        //
    }

    /**
     * Displays all Notes tied to this Travel
     * @param Travel $travel
     * @return NoteCollection
     */
    public function showNotes(Travel $travel)
    {
        $notes = $travel->notes()->get();

        return new NoteCollection($notes);
    }

    /**
     * Adds a Note to the given Travel
     * @param Request $request
     * @param Travel $travel
     * @return \Illuminate\Http\JsonResponse
     */
    public function addNote(Request $request, Travel $travel)
    {
        $request->validate([
            'content' => 'string|required'
        ]);

        $note = new Note([
            'body' => $request->input('content'),
            'user_id' => $request->user()->id
        ]);

        $travel->notes()->save($note);

        $vm = [
            'message' => "Successfully added note to \"$travel->name\"",
            'note' => new NoteResource($note)
        ];

        return response()->json($vm);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Travel  $travel
     * @return \Illuminate\Http\Response
     */
    public function edit(Travel $travel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Travel  $travel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Travel $travel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Travel  $travel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Travel $travel)
    {
        //
    }
}
