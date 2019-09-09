<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        if (Auth::attempt($credentials)){
            $userInstance = (new UserController())->showByUsername($request->input('email'));
            $role = (new RoleController())->showByID($userInstance->role);
            return response()->json(
                [
                    'id' => Auth::id(),
                    'email' => $userInstance->email,
                    'role' => $role,
                    'image' => $userInstance->image
                ],
                200);
        } else {
            return response()->json('', 401);
        }
    }
}
