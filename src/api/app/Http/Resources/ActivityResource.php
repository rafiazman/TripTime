<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $activityCoordinates = $this->location->coordinates;
        $lat = explode(', ', $activityCoordinates)[0];
        $lng = explode(', ', $activityCoordinates)[1];

        return [
            'id' => $this->id,
            'type' => $this->type,
            'start' => date(DATE_RFC3339, strtotime($this->start_time)),
            'end' => date(DATE_RFC3339, strtotime($this->end_time)),
            'name' => $this->name,
            'description' => $this->description,
            'updated' => date(DATE_RFC3339, strtotime($this->updated_at)),
            'address' => $this->location->address,
            'gps' => [
                'lat' => $lat,
                'lng' => $lng,
            ],
            'people' => UserResource::collection($this->users),
            'notes' => NoteResource::collection($this->notes)
        ];
    }
}
