<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\TripInvite
 *
 * @property int $id
 * @property string $uuid
 * @property int $trip_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Trip $trip
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite whereTripId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TripInvite whereUuid($value)
 * @mixin \Eloquent
 */
class TripInvite extends Model
{
    protected $fillable = [
        'uuid',
        'trip_id'
    ];

    /**
     * Gets the Trip associated with this invite
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }
}
