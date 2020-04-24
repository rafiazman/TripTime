<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
