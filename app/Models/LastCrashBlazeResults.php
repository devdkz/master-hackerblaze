<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LastCrashBlazeResults extends Model
{
    protected $table = 'last_results_crash_blaze';

    protected $fillable = ['crash_point','id_blaze'];
}
