<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Travel extends Model
{
    /**
     * Gets the trip of this travel path
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    /**
     * Gets the location of the origin
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function from()
    {
        return $this->belongsTo(Location::class, 'from_coordinates');
    }

    /**
     * Gets the location of the destination
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function to()
    {
        return $this->belongsTo(Location::class, 'to_coordinates');
    }

    /**
     * Gets the notes associated with this travel path
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function notes()
    {
        return $this->morphMany(Note::class, 'pointer');
    }
}
