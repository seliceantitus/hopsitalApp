<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function showByID($id){
        return Role::where('id', $id)->first();
    }
}
