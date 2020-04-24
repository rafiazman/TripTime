<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Travel extends Model
{
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function from()
    {
        return $this->belongsTo(Location::class, 'from_coordinates');
    }

    public function to()
    {
        return $this->belongsTo(Location::class, 'to_coordinates');
    }
}
