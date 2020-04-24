<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
