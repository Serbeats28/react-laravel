<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentModel extends Model
{

    protected $table = 'student_table';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'student_number',
        'email',
        'first_name',
        'last_name',
        'contact_number',
        'avatar',
        'create_at'
    ];
    use HasFactory;
}
