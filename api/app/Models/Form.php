<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    protected $fillable =
        [
            'area',
            'program',
            'names',
            'last_names',
            'email',
            'phone',
            'country',
            'state',
            'city',
            'comments',
            'privacy_policy',
        ];
}
