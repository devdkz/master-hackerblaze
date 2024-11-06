<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceModel extends Model
{
    protected $table = 'services';
    protected $fillable = [
        'name',
        'position',
        'image_url',
        'route_redirect',
        'blocked'
    ];
}
