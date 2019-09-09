<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UnitType extends Model
{
    public $timestamps = false;

    public function medicalUnit(){
        return $this->belongsTo('App\MedicalUnit');
    }
}
