<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\FeePayment;
use App\Models\StudentFeeDiscount;
use Illuminate\Support\Facades\DB;

class StudentFeeDiscountRepository implements IRepository, IStudentFeeDiscountRepository
{
    public function getAll()
    {
        return StudentFeeDiscount::all();
    }

    public function getById($id)
    {
        return StudentFeeDiscount::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return StudentFeeDiscount::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        StudentFeeDiscount::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentFeeDiscount::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentFeeDiscount::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE);
    }


    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return StudentFeeDiscount::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }


    public function getStudentFeeDiscountActiveAll($classroomId = null, $discountId = null)
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('discount', function ($query) use ($discountId) {
                if (!empty($discountId)) {
                    $query->where('id', $discountId);
                }
            })
            ->whereHas('student', function ($query) use ($classroomId) {
                if (!empty($classroomId)) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                }
            })
            ->with(['activities.user', 'discount', 'student' => function ($query) {
                $query->with(['classroom', 'promotedClassroom']);
            }, 'fee', 'feeType'])
            ->get();
    }


    public function deleteStudentFeeDiscount(int $discountId, int $studentId)
    {
        return StudentFeeDiscount::where('school_id', getUserSchoolId())
            ->where('discount_id', $discountId)
            ->where('student_id', $studentId)
            ->delete();
    }


    public function deleteFeeDiscount(int $discountId, int $studentId, int $feeId)
    {
        return StudentFeeDiscount::where('school_id', getUserSchoolId())
            ->where('discount_id', $discountId)
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->delete();
    }


    public function getPaidStudentFeeDiscountsData($fromFeeId = null, $toFeeId = null, $discountId = null)
    {
        // return StudentFeeDiscount::where('status', Status::ACTIVE)
        //     ->where('school_id', getUserSchoolId())
        //     ->when(isset($inputArray['discount_id']) && !is_null($inputArray['discount_id']), function ($query) use ($inputArray) {
        //         $query->where('discount_id', $inputArray['discount_id']);
        //     })
        //     ->when(
        //         (isset($inputArray['from_fee_id']) && !is_null($inputArray['from_fee_id'])) &&
        //             (isset($inputArray['to_fee_id']) && !is_null($inputArray['to_fee_id'])),
        //         function ($query) use ($inputArray) {
        //             $query->whereBetween('fee_id', [$inputArray['from_fee_id'], $inputArray['to_fee_id']]);
        //         }
        //     )
        //     ->whereHas('payment')
        //     ->with(['discount', 'student' => function ($query) {
        //         $query->with(['father', 'mother', 'classroom']);
        //     }])
        //     ->select('student_fee_discounts.*', DB::raw('(SELECT SUM(fee_payments.discount) FROM fee_payments WHERE student_fee_discounts.id = fee_payments.student_fee_discount_id) AS total_fee_discount'))
        //     ->get()
        //     ->groupBy(['discount_id']);

        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($discountId), function ($query) use ($discountId) {
                $query->where('discount_id', $discountId);
            })
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
            })
            ->with(['discount', 'student' => function ($query) {
                $query->select(
                    'id',
                    'admission_no',
                    'classroom_id',
                    'class_name_id',
                    'first_name',
                    'middle_name',
                    'last_name',
                )->with([
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                    'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                    'classroom:id,title',
                    'promotedClassroom',
                    'classroomRoll:id,student_id,roll_no',
                ]);
            }])
            ->get();
    }


    public function getExpectedStudentFeeDiscountsData($fromFeeId = null, $toFeeId = null, $discountId = null, $search = "")
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($discountId), function ($query) use ($discountId) {
                $query->where('discount_id', $discountId);
            })
            ->when(
                !empty($fromFeeId) && !empty($toFeeId),
                function ($query) use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                }
            )
            ->when(!empty($search), function ($query) use ($search) {
                $query->whereHas('student', function ($query) use ($search) {
                    $query->where('admission_no', 'like', '%' . $search . '%')
                        ->orWhereRaw("CONCAT_WS(' ', first_name, middle_name, last_name) LIKE ?", ['%' . $search . '%'])
                        ->orWhereHas('classroom', function ($query) use ($search) {
                            $query->where('title', 'like', '%' . $search . '%');
                        })
                        ->orWhereHas('classroomRoll', function ($query) use ($search) {
                            $query->where('roll_no', 'like', '%' . $search . '%');
                        })
                        ->orWhereHas('father', function ($query) use ($search) {
                            $query->whereRaw("CONCAT_WS(' ', first_name, middle_name, last_name) LIKE ?", ['%' . $search . '%']);
                        })
                        ->orWhereHas('mother', function ($query) use ($search) {
                            $query->whereRaw("CONCAT_WS(' ', first_name, middle_name, last_name) LIKE ?", ['%' . $search . '%']);
                        })
                        ->orWhereHas('discount', function ($query) use ($search) {
                            $query->where('title', 'like', '%' . $search . '%');
                        });
                });
            })
            // ->whereDoesntHave('payment')
            ->with(['discount', 'student' => function ($query) {
                $query->select(
                    'id',
                    'admission_no',
                    'classroom_id',
                    'class_name_id',
                    'first_name',
                    'middle_name',
                    'last_name',
                )->with([
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                    'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                    'classroom:id,title',
                    'promotedClassroom',
                    'classroomRoll:id,student_id,roll_no',
                    'classroom_fee_student_amounts',
                    'classroom_structures_fees'
                ]);
            }])
            ->get();
    }


    public function getStudentFeeDiscountsByStudentId(int $id, $schoolId = null, $academicYearId = null)
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $id)
            ->get();
    }

    public function getStudentFeeDiscountsByStudentIds(array $studentIds)
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('student_id', $studentIds)
            ->get();
    }



    public function deleteStudentFeeDiscounts($studentId, $discountId, $feeId, array $feeTypeIdsNotToDelete)
    {
        StudentFeeDiscount::where('school_id', getUserSchoolId())
            ->where('student_id', $studentId)
            ->where('discount_id', $discountId)
            ->where('fee_id', $feeId)
            ->whereNotIn('fee_type_id', $feeTypeIdsNotToDelete)
            ->delete();
    }
}
