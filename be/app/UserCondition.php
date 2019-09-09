<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCondition extends Model
{
    public $timestamps = false;
    protected $fillable = ['idUser', 'idCondition'];

    public function condition()
    {
        return $this->belongsTo('App\MedicalCondition', 'idCondition');
    }
}
