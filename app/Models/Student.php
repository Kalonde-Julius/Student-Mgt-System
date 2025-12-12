<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
     use HasFactory;

    // Table name (optional if it matches plural of model)
    protected $table = 'students';

    // Mass assignable attributes
    protected $fillable = [
        'name',
        'email',
        'age',
        'dob',
        'gender',
        'score',
        'image',
    ];

    // Relationship to User model
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
