<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Travel
 *
 * @property-read \App\Location $from
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[] $notes
 * @property-read int|null $notes_count
 * @property-read \App\Location $to
 * @property-read \App\Trip $trip
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel query()
 * @mixin \Eloquent
 */
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
