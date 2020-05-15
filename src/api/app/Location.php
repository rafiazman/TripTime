<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Location
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $coordinates
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location whereCoordinates($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Location whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activities
 * @property-read int|null $activities_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Travel[] $travel_froms
 * @property-read int|null $travel_froms_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Travel[] $travel_tos
 * @property-read int|null $travel_tos_count
 */
class Location extends Model
{
    protected $primaryKey = 'coordinates';
    public $incrementing = false;
    protected $fillable = [
        'name',
        'address',
        'coordinates'
    ];

    public function activities()
    {
        return $this->hasMany(Activity::class, 'location_coordinates');
    }

    public function travel_froms()
    {
        return $this->hasMany(Travel::class, 'from_coordinates');
    }

    public function travel_tos()
    {
        return $this->hasMany(Travel::class, 'to_coordinates');
    }

    public function travels()
    {
        return $this->travel_froms()->union($this->travel_tos()->toBase());
    }
}
