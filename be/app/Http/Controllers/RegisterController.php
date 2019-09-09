<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request){
        $credentials = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
            'role' => 1,
            'image' => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTExLjUgNjUuNmMtMjQ2LjkgMC00NDcgMjAwLjEtNDQ3IDQ0N3MyMDAuMSA0NDcgNDQ3IDQ0NyA0NDctMjAwLjEgNDQ3LTQ0Ny0yMDAuMS00NDctNDQ3LTQ0N3ogbTI2MC4xIDY5MS4yYy0wLjcgOS4yLTguOSAxNi42LTE4LjEgMTYuNi0xMC4zIDAtMTguNS04LjUtMTguNS0xOC41LTEwLTExNC4yLTEwNS4zLTIwMy4zLTIyMS44LTIwMy4zUzMwMSA2NDAuNyAyOTEuNCA3NTQuOWMwIDEwLTguMSAxOC41LTE4LjUgMTguNS05LjIgMC0xNy40LTcuNC0xOC4xLTE2LjYtMC40LTIuNiAwLTQuMSAwLTUuOSA4LjktMTA1IDgwLjYtMTkxLjggMTc3LjgtMjIzLjNDMzkyIDUwMS40IDM2NSA0NTUuOSAzNjUgNDAzLjhjMC04MS43IDY2LjItMTQ3LjggMTQ4LjItMTQ3LjggODEuNyAwIDE0OC4yIDY2LjIgMTQ4LjIgMTQ3LjggMCA1Mi4xLTI3IDk3LjYtNjcuNiAxMjMuOEM2OTEgNTU5IDc2Mi43IDY0NS45IDc3MS42IDc1MC45YzAgMS44IDAuMyAzLjMgMCA1Ljl6IiBmaWxsPSIjODA4MDgwIiAvPjxwYXRoIGQ9Ik01MTMuMiAyOTIuOWMtNjEuNCAwLTExMS4zIDQ5LjUtMTExLjMgMTEwLjlzNDkuOSAxMTAuOSAxMTEuMyAxMTAuOSAxMTEuMy00OS41IDExMS4zLTExMC45LTQ5LjktMTEwLjktMTExLjMtMTEwLjl6IiBmaWxsPSIjODA4MDgwIiAvPjwvc3ZnPg=='
        ]);
        return response()->json($user, 201);
    }
}
