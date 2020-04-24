<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Trip
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $start_date
 * @property string $end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Trip whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Trip extends Model
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function users() {
        return $this->belongsToMany(User::class, 'user_trip');
    }

    public function lastCheckedBy(User $user)
    {
        return $this->belongsToMany(User::class, 'user_trip')
            ->where('user_id', $user->id)
            ->value('last_checked_trip');
    }
}
