<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RatingHistory extends Model
{
    public $timestamps = false;
    protected $fillable = ['idUser', 'idMedic', 'value', 'timestamp', 'comment', 'hidden'];
}
