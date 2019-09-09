<?php

namespace App\Http\Controllers;

use App\Medic;
use Illuminate\Support\Facades\DB;
use App\RatingHistory;
use App\Specialization;
use Illuminate\Http\Request;

//$dogs = Dog::whereHas('owners', function($q) use($ownerIds) {
//    $q->whereIn('id', $ownerIds);
//})->get();

class MedicController extends Controller
{
    public function index()
    {
        $medics = Medic::with(['rating', 'specialization', 'units'])->get();
        return $medics;
    }

    public function show(Medic $medic)
    {
        return $medic;
    }

    public function getSpecializations()
    {
        return Specialization::all();
    }

    public function getComments(Request $request)
    {
        return RatingHistory::where('idMedic', $request->input('idMedic'))->get();
    }

    public function postComment(Request $request)
    {
        $pastRatings = RatingHistory::where('idMedic', $request->input('idMedic'))->get();
        $rating = RatingHistory::create($request->all());
        $ratingSum = 0;
        foreach ($pastRatings as $r) {
            $ratingSum += $r->value;
        }
        $newRating = ($ratingSum + $rating->value) / (count($pastRatings) + 1);
        DB::table('ratings')
            ->where('idMedic', $request->input('idMedic'))
            ->update(['average' => number_format($newRating, 1)]);
        return response()->json([], 201);
    }

    public function store(Request $request)
    {
        $unit = Medic::create($request->all());
        return response()->json($unit, 201);
    }

    public function update(Request $request, Medic $medic)
    {
        $medic->update($request->all());
        return response()->json($medic, 200);
    }

    public function delete(Medic $medic)
    {
        $medic->delete();
        return response()->json(null, 204);
    }
}
