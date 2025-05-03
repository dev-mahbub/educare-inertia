<?php

namespace App\Models;

use App\Models\ClassFeeStructureAmount;
use Illuminate\Database\Eloquent\Model;
use App\Models\ClassFeeStructureClassName;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassFeeStructure extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'title',
        'description',
        'structure_type',
        'status',
    ];


    public function classNames()
    {
        return $this->hasManyThrough(ClassName::class, ClassFeeStructureClassName::class, 'class_fee_structure_id', 'id', 'id', 'class_name_id');
    }


    public function class_fee_structure_amounts()
    {
        return $this->hasMany(ClassFeeStructureAmount::class);
    }


    public function class_fee_student_amounts()
    {
        return $this->hasMany(ClassFeeStudentAmount::class);
    }


    public function fee_payments()
    {
        return $this->hasManyThrough(
            FeePayment::class,
            ClassFeeStudentAmount::class,
            'class_fee_structure_id',
            'fee_paymentable_id',
            'id',
            'id'
        );

        // return $this->hasManyThrough(FeePayment::class, ClassFeeStudentAmount::class, 'class_fee_structure_id', 'id', 'fee_paymentable_id', 'id');
    }
}
