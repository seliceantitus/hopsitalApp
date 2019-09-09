<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{
    public $timestamps = false;

    public function medic(){
        return $this->belongsTo('App\Medic');
    }
}
