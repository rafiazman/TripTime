<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'author' => new UserResource($this->user),
            'content' => $this->body,
            'updated' => date(DATE_RFC3339, strtotime($this->updated_at))
        ];
    }
}
