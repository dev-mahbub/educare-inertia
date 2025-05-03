<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Student;
use App\Enums\PaymentStatus;
use App\Enums\StructureType;
use App\Enums\StudentStatus;
use App\Models\ClassFeeStructure;
use App\Models\ClassFeeStudentAmount;
use App\Models\ClassFeeStructureAmount;
use App\Models\ClassFeeStructureClassName;
use App\Repositories\IFeeStructureRepository;

class FeeStructureRepository implements IRepository, IFeeStructureRepository
{
    public function getAll()
    {
        return ClassFeeStructure::all();
    }

    public function getById($id)
    {
        return ClassFeeStructure::findOrFail($id);
    }


    public function delete($id)
    {
        ClassFeeStructure::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassFeeStructure::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassFeeStructure::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->get();
    }

    public function getRegisterAll()
    {
        return ClassFeeStructure::where('status', Status::ACTIVE);
    }


    public function createFeeStructureAmount(array $arrayData)
    {
        return ClassFeeStructureAmount::create($arrayData);
    }


    public function createFeeStructureStudentAmount(array $arrayData)
    {
        return ClassFeeStudentAmount::create($arrayData);
    }

    public function createFeeStructureClassName(array $arrayData)
    {
        return ClassFeeStructureClassName::create($arrayData);
    }


    public function updateFeeStructureAmount($fee_structure_id, $category_id, array $arrayData)
    {
        // return ClassFeeStructureAmount::updateOrCreate(
        //     [
        //         'class_fee_structure_id' => $fee_structure_id,
        //         'category_id' => $category_id,
        //     ],
        //     [
        //         'fee_type_id' =>  $arrayData['fee_type_id'],
        //         'amount' => $arrayData['amount'],
        //         'semester' => $arrayData['semester'],
        //     ]
        // );
    }


    public function deleteFeeStructureClassNamesByFeeStructureId(int $id)
    {
        return ClassFeeStructureClassName::where('class_fee_structure_id', $id)->delete();
    }


    public function updateOrCreateFeeStructureClassName(array $attributesToCheck, array $valuesToUpdate)
    {
        return ClassFeeStructureClassName::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function updateOrCreateFeeStructureAmount(array $attributesToCheck, array $valuesToUpdate)
    {
        return ClassFeeStructureAmount::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function updateOrCreateFeeStructureStudentAmount(array $attributesToCheck, array $valuesToUpdate)
    {
        return ClassFeeStudentAmount::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getFeeStructureByStudentId(int $id = null)
    {
        $studentFeeStructure = [];

        if ($id != null) {
            $studentFeeStructure = ClassFeeStudentAmount::where('class_fee_student_amounts.school_id', getUserSchoolId())
                ->where('class_fee_student_amounts.academic_year_id', getAcademicYearId())
                ->where('class_fee_student_amounts.student_id', $id)
                ->with(['fee', 'feeType', 'payment' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                }, 'nullify_fee'])
                ->leftJoin('student_fee_discounts', function ($join) {
                    $join->on('student_fee_discounts.student_id', '=', 'class_fee_student_amounts.student_id')
                        ->on('student_fee_discounts.fee_id', '=', 'class_fee_student_amounts.fee_id')
                        ->on('student_fee_discounts.fee_type_id', '=', 'class_fee_student_amounts.fee_type_id');
                })
                ->select(
                    'class_fee_student_amounts.*',
                    'student_fee_discounts.amount as discount_amount',
                    'student_fee_discounts.is_discount_percentage'
                )
                ->get();
        }

        return $studentFeeStructure;
    }



    public function getstudentsWithFeeStructure(int $classroomId, int $emplymentCatId = null)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when(!empty($emplymentCatId), function ($query) use ($emplymentCatId) {
                $query->where('employment_cat_id', $emplymentCatId);
            })
            ->where(function ($query) {
                $query->whereHas('classroom_fee_student_amounts', function ($query) {
                    // $query->where('class_fee_student_amounts.academic_year_id', getAcademicYearId());
                })->orWhereDoesntHave('classroom_fee_student_amounts');
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with([
                'classroom:id,title',
                'father:id,student_id,first_name,middle_name,last_name,sms_phone',
                'feeStructure' => function ($query) {
                    $query->where('class_fee_structures.academic_year_id', getAcademicYearId());
                },
                'employment_category:id,category_type,sub_category_type,title',
                'classroomRoll:id,student_id,roll_no'
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'class_name_id',
                'employment_cat_id',
                'first_name',
                'middle_name',
                'last_name',
                'phone',
            )
            ->get();
    }

    public function getFeeStructures(string $boardingType = null)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($boardingType), function ($query) use ($boardingType) {
                $query->where('structure_type', $boardingType);
            })
            ->with(['classNames', 'class_fee_structure_amounts.fee'])
            ->get();
    }

    public function getSessionWiseById(int $id)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->first();
    }


    public function deleteClassFeeStructureAmounts(int $classFeeStructureId, array $ids)
    {
        ClassFeeStructureAmount::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_fee_structure_id', $classFeeStructureId)
            ->whereNotIn('id', $ids)
            ->delete();
    }


    public function checkFeeStructureExists()
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->exists();
    }

    public function getByIdAndClassNameId(int $id, int $classNameId)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->whereHas('classNames', function ($query) use ($classNameId) {
                $query->where('class_names.id', $classNameId);
            })
            ->with(['class_fee_structure_amounts' => function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            }])
            ->first();
    }

    public function getByIdAndClassNameIdAndAcademicYearId(int $id, int $classNameId, int $academicYearId)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->whereHas('classNames', function ($query) use ($classNameId) {
                $query->where('class_names.id', $classNameId);
            })
            ->with(['class_fee_structure_amounts' => function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            }])
            ->first();
    }


    public function getByClassNameId(int $classNameId)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('classNames', function ($query) use ($classNameId) {
                $query->where('class_names.id', $classNameId);
            })
            ->with(['class_fee_structure_amounts' => function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            }])
            ->first();
    }


    public function getFeeStructuresByClassNameId(int $classNameId)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('classNames', function ($query) use ($classNameId) {
                $query->where('class_names.id', $classNameId);
            })
            ->with(['class_fee_structure_amounts' => function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId)
                    ->with(['fee:id,title']);
            }])
            ->select('id', 'title')
            ->get();
    }

    public function getByClassNameIdAndAcademicYearId(int $classNameId, int $academicYearId)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->whereHas('classNames', function ($query) use ($classNameId) {
                $query->where('class_names.id', $classNameId);
            })
            ->with(['class_fee_structure_amounts' => function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            }])
            ->first();
    }


    public function getNewStudentAmountsByFeeStructureIdAndFeeIds(int $feeStructureId, array $feeIds = [])
    {
        return ClassFeeStructureAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_fee_structure_id', $feeStructureId)
            ->where('student_status', StudentStatus::NEW->value)
            ->whereIn('fee_id', $feeIds)
            ->get();
    }

    public function getOldStudentAmountsByFeeStructureIdAndFeeIds(int $feeStructureId, array $feeIds = [])
    {
        return ClassFeeStructureAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_fee_structure_id', $feeStructureId)
            ->whereIn('student_status', [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])
            ->whereIn('fee_id', $feeIds)
            ->get();
    }


    public function getSessionWiseFeeStructureById($id)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->findOrFail($id);
    }


    public function getClassFeeStructureAmountsByFeeStructureIdAndFeeIds(int $feeStructureId, array $feeIds)
    {
        return ClassFeeStructureAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_fee_structure_id', $feeStructureId)
            ->whereIn('fee_id', $feeIds)
            ->get();
    }


    public function getFeeStructureByClassNameId($classNameId)
    {
        return ClassFeeStructure::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('classNames', function ($query) use ($classNameId) {
                $query->where('class_names.id', $classNameId);
            })
            ->first();
    }
}
