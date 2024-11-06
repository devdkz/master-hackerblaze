<?php

namespace App\Http\Controllers;

use App\Models\LastDoubleBlazeResults;
use Illuminate\Http\Request;

class DoubleResultsController extends Controller
{
    public function getResults($results){
        $last = LastDoubleBlazeResults::orderBy("id", "desc")
        ->take($results)
        ->get();
        return response()->json([
            'results' => $last
        ]);
    }
}
