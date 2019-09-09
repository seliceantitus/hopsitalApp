<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MedicalCondition extends Model
{
    public $timestamps = false;
    protected $fillable = ['condition', 'description'];
}
