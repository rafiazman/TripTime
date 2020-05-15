<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TravelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // TODO: Use Laravel Mutators for Date Casting
        return [
            'id' => $this->id,
            'start' => date(DATE_RFC3339, strtotime($this->start)),
            'end' => date(DATE_RFC3339, strtotime($this->end)),
            'mode' => $this->mode,
            'description' => $this->description,
            'from' => [
                'lat' => explode(', ', $this->from_coordinates)[0],
                'lng' => explode(', ', $this->from_coordinates)[1],
            ],
            'to' => [
                'lat' => explode(', ', $this->to_coordinates)[0],
                'lng' => explode(', ', $this->to_coordinates)[1],
            ],
            'people' => UserResource::collection($this->users),
            'notes' => NoteResource::collection($this->notes)
        ];
    }
}
