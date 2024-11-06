<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LastDoubleBlazeResults extends Model
{
    protected $table = 'last_results_double_blaze';

    protected $fillable = ['color','roll','room_id','id_blaze'];
}
