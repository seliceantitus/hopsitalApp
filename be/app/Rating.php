<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    public $timestamps = false;
    protected $fillable = ['idMedic', 'average'];
    public function medic(){
        return $this->belongsTo('App\Medic');
    }
}
