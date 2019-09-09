<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medic extends Model
{
    public $timestamps = false;

    public function rating()
    {
        return $this->hasOne('App\Rating', 'idMedic');
    }

    public function specialization()
    {
        return $this->hasOne('App\Specialization', 'id', 'specialization');
    }

    public function units(){
        return $this->hasManyThrough(
            'App\MedicalUnit',
            'App\MedicsToUnits',
            'idMedic',
            'id',
            'id',
            'idUnit'
        );
    }
}
