<?php

namespace App\Http\Controllers;

use App\UnitType;
use Illuminate\Http\Request;
use App\MedicalUnit;
use App\Http\Requests;

class MedicalUnitsController extends Controller
{
    public function index()
    {
        $units = MedicalUnit::with(['unitType', 'medics', 'medics.rating'])->get();
        return $units;
    }

    public function getTypes(){
        return UnitType::all();
    }

    public function show(MedicalUnit $unit)
    {
        return $unit;
    }

    public function store(Request $request)
    {
        $unit = MedicalUnit::create($request->all());
        return response()->json($unit, 201);
    }

    public function update(Request $request, MedicalUnit $unit)
    {
        $unit->update($request->all());
        return response()->json($unit, 200);
    }

    public function delete(MedicalUnit $unit)
    {
        $unit->delete();
        return response()->json(null, 204);
    }
}
