<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Student;
use App\Models\Classroom;
use App\Models\FeePayment;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use App\Models\NullifyFeeAmount;
use App\Models\ClassFeeStudentAmount;
use App\Repositories\IClassFeeStudentAmountRepository;

class ClassFeeStudentAmountRepository implements IRepository, IClassFeeStudentAmountRepository
{
    public function getAll()
    {
        return ClassFeeStudentAmount::all();
    }

    public function getById($id)
    {
        return ClassFeeStudentAmount::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return ClassFeeStudentAmount::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        ClassFeeStudentAmount::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassFeeStudentAmount::create($arrayData);
    }

    public function updateOrCreate($attributeToCheck, $attributeToCreate)
    {
        return ClassFeeStudentAmount::updateOrCreate($attributeToCheck, $attributeToCreate);
    }

    public function update($id, array $arrayData)
    {
        return ClassFeeStudentAmount::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE);
    }


    public function getFeeInstallmentsByStudentId(int $id = null, int $schoolId = null, int $academicYearId = null)
    {
        $feeInstallments = [];

        if (!is_null($id)) {
            $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
            $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

            $feeInstallments = ClassFeeStudentAmount::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId)
                ->where('student_id', $id)
                ->with(['fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                }, 'payment' => function ($query) {
                    // $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                }, 'feeType', 'fee', 'nullify_fee'])
                ->select(
                    'id',
                    'class_fee_structure_id',
                    'student_id',
                    'class_name_id',
                    'fee_id',
                    'fee_type_id',
                    'amount',
                    'semester',
                    'is_admission_installment',
                    'is_fee_special',
                    'is_previous_due'
                )
                ->get();

            // $feeInstallments = ClassFeeStudentAmount::where('status', Status::ACTIVE)
            //     ->where('school_id', getUserSchoolId())
            //     ->where('academic_year_id', getAcademicYearId())
            //     ->where('student_id', $id)
            //     ->with(['fee_payments', 'payment', 'feeType', 'fee', 'nullify_fee'])
            //     ->get();
        }

        return $feeInstallments;
    }


    public function getFeeInstallmentsByStudentIds(array $studentIds = [])
    {
        $feeInstallments = [];

        if (!empty($studentIds)) {
            $feeInstallments = ClassFeeStudentAmount::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->where('academic_year_id', getAcademicYearId())
                ->whereIn('student_id', $studentIds)
                ->with(['fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                }, 'payment', 'feeType', 'fee', 'nullify_fee'])
                ->select(
                    'id',
                    'class_fee_structure_id',
                    'student_id',
                    'class_name_id',
                    'fee_id',
                    'fee_type_id',
                    'amount',
                    'semester',
                    'is_admission_installment',
                    'is_fee_special',
                    'is_previous_due'
                )
                ->get();
        }

        return $feeInstallments;
    }


    public function getFeeInstallmentsByStudentIdsAndFeeId(array $studentIds, int $feeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('fee_id', $feeId)
            ->whereIn('student_id', $studentIds)
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
            }, 'payment', 'feeType', 'fee', 'nullify_fee'])
            ->get();
    }


    public function getStudentAmount($studentId, $feeId, $feeTypeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->where('fee_type_id', $feeTypeId)
            ->with(['payment'])
            ->first();
    }

    public function getFeeStructureByStudentIdAndFeeIds(int $studentId, array $feeIds)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $studentId)
            ->whereIn('fee_id', $feeIds)
            ->with(['payment' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
            }, 'nullify_fee'])
            ->get();
    }


    public function getFeeInstallmentsByFeeIdAndStudentId(int $studentId, $feeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
            }])
            ->get();
    }


    public function getStudentSpecialFeeTypeAmounts($studentId, $feeTypeId, $classNameId, $feeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_name_id',  $classNameId);
            })
            ->when(!empty($feeId), function ($query) use ($feeId) {
                $query->where('fee_id', $feeId);
            })
            ->where('fee_type_id', $feeTypeId)
            ->with(['payment'])
            ->get();
    }



    public function getPreviousSessionFeeDues(int $academicYearId, array $studentIds)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where(function ($query) use ($studentIds) {
                foreach ($studentIds as $classNameId => $studentId) {
                    $query->orWhere(function ($subQuery) use ($studentId, $classNameId) {
                        $subQuery->whereIn('student_id', $studentId)
                            ->where('class_name_id', $classNameId);
                    });
                }
            })
            ->where(function ($query) {
                $query->whereDoesntHave('nullify_fee')
                    ->whereDoesntHave('payment')
                    ->orWhereHas('payment', function ($query) {
                        $query->where('payment_status', PaymentStatus::PARTIAL->value)
                            ->orWhere('payment_status', PaymentStatus::CANCELLED->value);
                    });
            })
            ->with(['payment', 'nullify_fee'])
            ->get();
    }

    public function getPreviousSessionFeeDues_old(int $academicYearId, array $studentIds, array $previousClassNameIds)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->whereIn('student_id', $studentIds)
            ->whereIn('class_name_id', $previousClassNameIds)
            ->where(function ($query) {
                $query->whereDoesntHave('nullify_fee')
                    ->whereDoesntHave('payment')
                    ->orWhereHas('payment', function ($query) {
                        $query->where('payment_status', PaymentStatus::PARTIAL->value)
                            ->orWhere('payment_status', PaymentStatus::CANCELLED->value);
                    });
            })
            ->with(['payment', 'nullify_fee'])
            ->get();
    }

    public function checkPreviousFeeDue(int $academicYearId, int $studentId, int $feeTypeId, int $feeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where('fee_type_id', $feeTypeId)
            ->where('fee_id', $feeId)
            ->exists();
    }

    public function checkPreviousFeeDue_old(int $academicYearId, int $studentId, int $feeTypeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where('fee_type_id', $feeTypeId)
            ->exists();
    }


    public function getStudentFeeinstallmentsAmounts(int $academicYearId, int $studentId, int $fromFeeId, int $toFeeId, array $feeTypeIds)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->whereIn('fee_type_id', $feeTypeIds)
            ->with(['fee_payments', 'payment', 'feeType'])
            ->get();
    }

    public function getStudentsByClassroomIds(array $classroomIds)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->get();
    }

    public function getStudentsByClassroomId(int $classroomId, int $academicYearId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->get();
    }


    public function getFilteredStudentsFees(
        $classNameId,
        array $classroomIds,
        $studentStatus,
        $fromFeeId,
        $toFeeId,
        $feeCategoryId,
        $feeStructureId
    ) {
        $students = $this->getStudentsByClassroomIds($classroomIds);

        if ($students->count() > 0) {
            $studentIds = $students->pluck('id')->toArray();
        }

        return ClassFeeStudentAmount::where('class_fee_student_amounts.status', Status::ACTIVE)
            ->where('class_fee_student_amounts.school_id', getUserSchoolId())
            ->where('class_fee_student_amounts.academic_year_id', getAcademicYearId())
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_fee_student_amounts.class_name_id', $classNameId);
            })
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('class_fee_student_amounts.fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->when(!empty($feeStructureId), function ($query) use ($feeStructureId) {
                $query->where('class_fee_structure_id', $feeStructureId);
            })
            ->rightJoin('students', function ($join) use ($classroomIds, $studentStatus, $studentIds) {
                $join->on('students.id', '=', 'class_fee_student_amounts.student_id')
                    // ->whereIn('classroom_id', $classroomIds)
                    ->whereIn('students.id', $studentIds)
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        $query->where('students.status', $studentStatus);
                    });
            })
            // ->leftJoin('classroom_rolls', 'classroom_rolls.student_id', 'class_fee_student_amounts.student_id')
            ->select(
                'class_fee_student_amounts.*',
                // 'students.id as student_id',
                'students.admission_no as student_admission_no',
                'students.srn_no as student_srn_no',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'students.classroom_id as classroom_id',
                // 'classroom_rolls.roll_no as student_roll_no',
            )
            ->get();
    }

    public function getFilteredStudentDueReportFees(
        int $classroomId,
        int $fromFeeId,
        int $toFeeId,
        string $studentStatus = "",
        int $feeCategoryId = null,
        int $academicYearId = null
    ) {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        $students = $this->getStudentsByClassroomId($classroomId, $academicYearId);

        if ($students->count() > 0) {
            $studentIds = $students->pluck('id')->toArray();
        }

        return ClassFeeStudentAmount::where('class_fee_student_amounts.status', Status::ACTIVE)
            ->where('class_fee_student_amounts.school_id', getUserSchoolId())
            ->where('class_fee_student_amounts.academic_year_id', getAcademicYearId())
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('class_fee_student_amounts.fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->rightJoin('students', function ($join) use ($studentStatus, $studentIds) {
                $join->on('students.id', '=', 'class_fee_student_amounts.student_id')
                    ->whereIn('students.id', $studentIds)
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        $query->where('students.status', $studentStatus);
                    });
            })
            ->select(
                'class_fee_student_amounts.*',
                'students.admission_no as student_admission_no',
                'students.srn_no as student_srn_no',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'students.classroom_id as classroom_id',
            )
            ->get();
    }


    public function getConsolidatedDueReports(
        $studentStatus = "",
        $fromFeeId = null,
        $toFeeId = null,
        $feeCategoryId = null,
    ) {
        return ClassFeeStudentAmount::where('class_fee_student_amounts.status', Status::ACTIVE)
            ->where('class_fee_student_amounts.school_id', getUserSchoolId())
            ->where('class_fee_student_amounts.academic_year_id', getAcademicYearId())
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('class_fee_student_amounts.fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->rightJoin('students', function ($join) use ($studentStatus) {
                $join->on('students.id', '=', 'class_fee_student_amounts.student_id')
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        $query->where('students.status', $studentStatus);
                    });
            })
            ->select(
                'class_fee_student_amounts.*',
                'students.id as student_id',
                'students.admission_no as student_admission_no',
                'students.srn_no as student_srn_no',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'students.classroom_id as classroom_id',
            )
            ->get();
    }

    public function getConsolidatedDueReportsByClassroom(
        $classroomId,
        $studentStatus = "",
        $fromFeeId = null,
        $toFeeId = null,
        $feeCategoryId = null,
    ) {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->whereHas('student', function ($query) use ($studentStatus, $classroomId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                });
                $query->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                    $query->where('students.status', $studentStatus);
                });
            })
            ->get();
    }


    public function checkFeePayment($studentId, $feeId, $schoolId = null, $academicYearId = null)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->exists();
    }

    public function lastFeePayment($studentId, $feeId, $schoolId = null, $academicYearId = null)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->orderBy('id', 'DESC')
            ->first();
    }

    public function getStudentFeeAmountById(int $id)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->with(['classFeeStructure'])
            ->first();
    }

    public function getFeePaymentByStudentIdsANdFeeId($studentIds = [], $feeId)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('student_id', $studentIds)
            ->where('fee_id', $feeId)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->get();
    }

    public function checkFeeNullify($studentId, $feeId)
    {
        return NullifyFeeAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->exists();
    }


    public function deleteClassFeeStudentAmounts(int $classFeeStructureId, array $ids)
    {
        return ClassFeeStudentAmount::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_fee_structure_id', $classFeeStructureId)
            ->whereNotIn('id', $ids)
            ->where(function ($query) {
                $query->whereDoesntHave('payment')
                    ->orWhereHas('payment', function ($query) {
                        $query->where('payment_status', PaymentStatus::CANCELLED);
                    });
            })
            ->delete();

        // old code
        // return ClassFeeStudentAmount::where('school_id', getUserSchoolId())
        //     ->where('academic_year_id', getAcademicYearId())
        //     ->where('class_fee_structure_id', $classFeeStructureId)
        //     ->whereNotIn('id', $ids)
        //     ->delete();
    }


    public function deleteClassFeeStudentAmountsByStudentIdAndFeeId(int $studentId, int $feeId, array $ids)
    {
        return ClassFeeStudentAmount::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->whereNotIn('id', $ids)
            ->where(function ($query) {
                $query->whereDoesntHave('payment')
                    ->orWhereHas('payment', function ($query) {
                        $query->where('payment_status', PaymentStatus::CANCELLED->value);
                    });
            })
            ->delete();
    }
    public function deleteStudentFeeAmountsByFeeIdsAndStudent(array $feeIds, int $studentId, int $classNameId)
    {
        return ClassFeeStudentAmount::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('class_name_id', $classNameId)
            ->whereIn('fee_id', $feeIds)
            ->where(function ($query) {
                $query->whereDoesntHave('payment')
                    ->orWhereHas('payment', function ($query) {
                        $query->where('payment_status', PaymentStatus::CANCELLED->value);
                    });
            })
            ->delete();
    }


    public function getYearlyHeadWiseDueSummary($fromFeeId, $toFeeId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->whereDoesntHave('nullify_fee')
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID->value);
            })
            ->with(['feeType', 'fee', 'payment', 'fee_payments'])
            ->get();
    }


    public function getStudentLedgerReport($classroomId, $fromFeeId, $toFeeId, $studentId = null, $studentStatus = "")
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->whereHas('student', function ($query) use ($classroomId, $studentId, $studentStatus) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $studentId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                    if (!empty($studentId)) {
                        $query->where('classroom_students.student_id', $studentId);
                    }
                });

                if (!empty($studentStatus)) {
                    if ($studentStatus == "Tc") {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', $studentStatus);
                    }
                }
            })
            ->with(['feeType', 'fee', 'payment', 'fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
            }, 'student' => function ($query) use ($classroomId) {
                $query->select(
                    'id',
                    'classroom_id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name'
                )->with([
                    'father:id,student_id,first_name,middle_name,last_name',
                    'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId)
                            ->select(
                                'id',
                                'student_id',
                                'roll_no',
                                'classroom_id',
                            );
                    },
                    'classroom:id,title',
                    'promotedClassroom',
                ]);
            }])
            ->get();
    }


    public function getCompleteDueSummary(
        $fromFeeId,
        $toFeeId,
        $classroomId = "",
        $studentStatus = "",
        $studentActiveStatus = "",
        $employmentCategoryId = null,
    ) {
        return ClassFeeStudentAmount::where('class_fee_student_amounts.status', Status::ACTIVE)
            ->where('class_fee_student_amounts.school_id', getUserSchoolId())
            ->where('class_fee_student_amounts.academic_year_id', getAcademicYearId())
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('class_fee_student_amounts.fee_id', [$fromFeeId, $toFeeId]);
            })
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID);
            })
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                    if (!empty($classroomId)) {
                        $query->where('classroom_students.classroom_id', $classroomId);
                    }
                });

                $query->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                    if ($studentStatus == StudentStatus::PROMOTED) {
                        $query->whereNot('students.student_status', StudentStatus::NEW);
                    } else {
                        $query->where('students.student_status', $studentStatus);
                    }
                })->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                    $query->where('students.status', $studentActiveStatus);
                })->when(!empty($employmentCategoryId), function ($query) use ($employmentCategoryId) {
                    $query->where('students.employment_cat_id', $employmentCategoryId);
                });
            })
            ->with(['student' => function ($query) {
                $query->with(['classroom', 'promotedClassroom', 'employment_category'])
                    ->select(
                        'id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'present_address',
                        'classroom_id',
                        'employment_cat_id',
                    );
            }])
            ->get();
    }


    public function getInstallmentWiseDueReports(
        $classroomId,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId =  null,
        $feeStructureId = null,
        $academicYearId = null
    ) {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->when(!empty($feeStructureId), function ($query) use ($feeStructureId) {
                $query->where('class_fee_structure_id', $feeStructureId);
            })
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus, $academicYearId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->where('classroom_students.classroom_id', $classroomId);
                });
                $query->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                    $query->where('status', $studentStatus);
                });
            })
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID->value);
            })
            ->with([
                'fee_payments',
                'payment',
                'student' => function ($query) use ($classroomId) {
                    $query->select(
                        'id',
                        'classroom_id',
                        'employment_cat_id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'present_address',
                        'present_city'
                    )->with([
                        'father:id,student_id,first_name,middle_name,last_name,phone',
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId)
                                ->select(
                                    'id',
                                    'classroom_id',
                                    'student_id',
                                    'roll_no'
                                );
                        },
                        'classroom:id,title',
                        'promotedClassroom',
                        'employment_category:id,title'
                    ]);
                }
            ])
            ->get();
    }


    public function getStudentDueReports(
        $classroomId,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId =  null,
        $feeStructureId = null
    ) {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->when(!empty($feeStructureId), function ($query) use ($feeStructureId) {
                $query->where('class_fee_structure_id', $feeStructureId);
            })
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                });

                $query->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                    $query->where('status', $studentStatus);
                });
            })
            ->with(['fee_payments', 'payment', 'student' => function ($query) use ($classroomId) {
                $query->select('id', 'classroom_id', 'employment_cat_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'present_address', 'present_city')
                    ->with([
                        'father:id,student_id,first_name,middle_name,last_name,phone',
                        // 'classroomRoll:id,student_id,roll_no',
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId)
                                ->select(
                                    'id',
                                    'classroom_id',
                                    'student_id',
                                    'roll_no'
                                );
                        },
                        'classroom:id,title',
                        'employment_category:id,title'
                    ]);
            }])
            ->get();
    }


    public function getInstallmentWiseDueReportsByStudent(
        $studentId,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId =  null,
        $feeStructureId = null
    ) {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
            })
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->when(!empty($feeStructureId), function ($query) use ($feeStructureId) {
                $query->where('class_fee_structure_id', $feeStructureId);
            })
            ->whereHas('student', function ($query) use ($studentId, $studentStatus) {
                $query->where('id', $studentId)
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        $query->where('status', $studentStatus);
                    });
            })
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID->value);
            })
            ->with(['student' => function ($query) {
                $query->select('id', 'classroom_id', 'employment_cat_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'present_address', 'present_city')
                    ->with([
                        'father:id,student_id,first_name,middle_name,last_name,phone',
                        // 'classroomRoll:id,student_id,roll_no',
                        'classroom:id,title',
                        'promotedClassroom',
                        'employment_category:id,title'
                    ]);
            }])
            ->get();
    }


    public function getStudentFeeAmountsByStructureId($feeStructureId)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_fee_structure_id', $feeStructureId)
            ->with(['payment'])
            ->get();
    }



    public function getStudentHeadWiseFeeInstallments(
        $from_fee_id = null,
        $to_fee_id = null,
        $classroomId = null,
        $studentStatus = "",
    ) {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($from_fee_id), function ($query) use ($from_fee_id) {
                $query->where('fee_id', '>=', $from_fee_id);
            })
            ->when(!empty($to_fee_id), function ($query) use ($to_fee_id) {
                $query->where('fee_id', '<=', $to_fee_id);
            })
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus) {
                if (!empty($classroomId)) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                }

                if (!empty($studentStatus)) {
                    if ($studentStatus == "Tc") {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', $studentStatus);
                    }
                }
            })
            ->with(['nullify_fee', 'payment', 'fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
            }, 'feeType', 'student' => function ($query) use ($classroomId) {
                $query->select(
                    'students.id',
                    'students.admission_no',
                    'students.first_name',
                    'students.middle_name',
                    'students.last_name',
                    'students.classroom_id',
                    'students.status'
                )->with([
                    'classroom:id,title',
                    'promotedClassroom',
                    'studentTransferCertificate:id,student_id,is_draft,is_generated',
                    'father:id,student_id,first_name,middle_name,last_name,phone',
                    'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('academic_year_id', getAcademicYearId());

                        if (!empty($classroomId)) {
                            $query->where('classroom_id', $classroomId);
                        }
                    }
                ]);
            }])
            ->get();
    }



    public function getStudentFeeInstallments(int $fromFeeId, int $toFeeId, $feeCategoryId = null, $classroomId = null)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->when(!empty($feeCategoryId), function ($query) use ($feeCategoryId) {
                $query->whereHas('feeType', function ($query) use ($feeCategoryId) {
                    $query->where('category_id', $feeCategoryId);
                });
            })
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->whereHas('student', function ($query) use ($classroomId) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                });
            })
            ->with(['nullify_fee', 'payment', 'fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
            }])
            ->get();
    }


    public function getGuardianWiseStudentFeeInstallments(
        $transportFeeStructureSetting,
        int $fromFeeId,
        int $toFeeId,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->when(!empty($paymentStatus), function ($query) use ($paymentStatus) {
                if ($paymentStatus == PaymentStatus::PAID->value) {
                    $query->whereHas('fee_payments', function ($query) {
                        $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                    });
                }

                if ($paymentStatus == PaymentStatus::DUE->value) {
                    $query->whereDoesntHave('nullify_fee')
                        ->whereDoesntHave('payment');
                }
            })
            ->whereHas('student', function ($query) use ($studentStatus, $transportRouteId, $classroomId, $transportFeeStructureSetting) {
                if (!empty($studentStatus)) {
                    $query->where('status', $studentStatus)
                        ->whereDoesntHave('studentTransferCertificate');
                }

                if (!empty($classroomId)) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                }

                if (!empty($transportRouteId)) {
                    $allocation_type = $transportFeeStructureSetting?->value ?? 'fee';

                    if ($allocation_type == 'fee') {
                        $query->whereHas('fee_allocate_transport', function ($query) use ($transportRouteId) {
                            $query->where('transport_route_id', $transportRouteId);
                        });
                    }

                    if ($allocation_type == 'voucher') {
                        $query->whereHas('voucher_allocate_transport', function ($query) use ($transportRouteId) {
                            $query->where('transport_route_id', $transportRouteId);
                        });
                    }
                }
            })
            ->select(
                'id',
                'student_id',
                'fee_id',
                'fee_type_id',
                'amount',
                'semester',
            )
            ->with([
                'student' => function ($query) {
                    $query->select(
                        'students.id',
                        'students.admission_no',
                        'students.classroom_id',
                        'students.first_name',
                        'students.middle_name',
                        'students.last_name',
                        'students.present_address'
                    )->with([
                        'classroom:id,title',
                        'promotedClassroom',
                    ]);
                },
                'nullify_fee',
                'payment',
                'fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                }
            ])
            ->get();
    }


    public function getSpecialFeeTypeFeeInstallment(int $feeId = null, int $feeTypeId = null, int $classroomId = null)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_fee_special', true)
            ->where(function ($query) use ($feeId, $feeTypeId, $classroomId) {
                if (!empty($feeId)) {
                    $query->where('fee_id', $feeId);
                }

                if (!empty($feeTypeId)) {
                    $query->where('fee_type_id', $feeTypeId);
                }

                if (!empty($classroomId)) {
                    $query->whereHas('student', function ($query) use ($classroomId) {
                        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                            $query->where('classroom_students.academic_year_id', getAcademicYearId())
                                ->where('classroom_students.classroom_id', $classroomId);
                        });
                    });
                }
            })
            ->select(
                'id',
                'student_id',
                'amount',
                'semester',
                'fee_type_id',
            )
            ->with(['feeType:id,fee_type', 'student' => function ($query) {
                $query->select(
                    'id',
                    'admission_no',
                    'classroom_id',
                    'first_name',
                    'middle_name',
                    'last_name',
                )->with([
                    'classroom:id,title',
                    'promotedClassroom'
                ]);
            }])
            ->orderBy('fee_type_id', 'asc')
            ->get();
    }
}
