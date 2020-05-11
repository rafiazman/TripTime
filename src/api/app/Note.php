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
 * @property int $id
 * @property string $body
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_id
 * @property int $pointer_id
 * @property string $pointer_type
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note wherePointerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note wherePointerType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Note whereUserId($value)
 */
class Note extends Model
{
    protected $guarded = [];

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
