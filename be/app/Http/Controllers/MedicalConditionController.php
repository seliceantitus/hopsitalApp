<?php

namespace App\Http\Controllers;

use App\UserCondition;
use Illuminate\Http\Request;
use App\MedicalCondition;
use App\Http\Requests;

class MedicalConditionController extends Controller
{
    public function index()
    {
        return MedicalCondition::all();
    }

    public function show(MedicalCondition $condition)
    {
        return $condition;
    }

    public function showForUser($id){
        return UserCondition::where('idUser', $id)->with('condition')->get();
    }

    public function updateUserConditions(Request $request, UserCondition $conditions){
        $conditions->update($request->all());
        return response()->json($conditions, 200);
    }

    public function store(Request $request)
    {
        $condition = MedicalCondition::create($request->all());
        return response()->json($condition, 201);
    }

    public function storeUserCondition(Request $request){
        $condition = UserCondition::create($request->all());
        $toReturn = UserCondition::where('id', $condition->id)->with('condition')->get();
        return response()->json($toReturn, 201);
    }

    public function deleteUserCondition(Request $request){
        $idUser = $request->input('idUser');
        $idCond = $request->input('idCondition');
        $userCond = UserCondition::where([
            ['idUser', $idUser],
            ['idCondition', $idCond]
            ])->delete();
        return response()->json('', 204);
    }

    public function update(Request $request, MedicalCondition $condition)
    {
        $condition->update($request->all());
        return response()->json($condition, 200);
    }

    public function delete(MedicalCondition $condition)
    {
        $condition->delete();
        return response()->json(null, 204);
    }
}
