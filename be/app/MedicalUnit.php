<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MedicalUnit extends Model
{
    public $timestamps = false;
    protected $fillable = ['name', 'type', 'location', 'logo'];

    public function unitType(){
        return $this->hasOne('App\UnitType', 'id', 'type');
    }

    public function medics(){
        return $this->hasManyThrough(
            'App\Medic',
            'App\MedicsToUnits',
            'idUnit',
            'id',
            'id',
            'idMedic'
        );
    }
}
