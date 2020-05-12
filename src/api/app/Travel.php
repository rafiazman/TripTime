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
 * @property int $id
 * @property string $mode
 * @property string $description
 * @property string $start
 * @property string $end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $trip_id
 * @property string $from_coordinates
 * @property string $to_coordinates
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereFromCoordinates($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereToCoordinates($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereTripId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Travel whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property-read int|null $users_count
 */
class Travel extends Model
{
    protected $guarded = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'start',
        'end'
    ];

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

    /**
     * Gets the users who are joining this travel
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function users()
    {
        return $this->morphToMany(User::class, 'pointer', 'user_pointer');
    }
}
