<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Note
 *
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $pointer
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note query()
 * @mixin \Eloquent
 */
class Note extends Model
{
    /**
     * Gets the owning pointer of this note
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function pointer()
    {
        return $this->morphTo();
    }

    /**
     * Gets the author of this note
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
