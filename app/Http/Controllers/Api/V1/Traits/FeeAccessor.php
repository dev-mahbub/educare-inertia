<?php

namespace App\Http\Controllers\Api\V1\Traits;

use Carbon\Carbon;
use App\Models\Fee;
use App\Enums\Status;
use App\Models\FeeType;
use App\Models\Student;
use App\Models\Category;
use App\Models\Classroom;
use App\Models\EnquiryFee;
use App\Models\FeePayment;
use App\Models\SiteSetting;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use App\Enums\FeePaymentType;
use App\Models\RegistrationFee;
use App\Models\FeePaymentMethod;
use App\Enums\FeeInstallmentType;
use App\Models\AllocateTransport;
use App\Models\StudentFeeVoucher;
use App\Models\StudentFeeDiscount;
use Illuminate\Support\Facades\DB;
use App\Models\DeallocateTransport;
use App\Models\ClassFeeStudentAmount;

trait FeeAccessor
{
    public function classroomActiveAll($schoolId, $academicYearId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function feeActiveAll($schoolId, $academicYearId)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->orderBy('installment_no', 'asc')
            ->get();
    }

    public function categoryEmploymentAll($schoolId)
    {
        return Category::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('category_type', 'Employment')
            ->latest()
            ->get();
    }

    public function siteSettingByTypeAndKey($type, $key, $schoolId, $academicYearId)
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('type', $type)
            ->where('key_name', $key)
            ->first();
    }

    public function feeCompleteDueSummary(
        $fromFeeId,
        $toFeeId,
        $classroomId = "",
        $studentStatus = "",
        $studentActiveStatus = "",
        $employmentCategoryId = null,
        $schoolId,
        $academicYearId
    ) {
        return ClassFeeStudentAmount::where('class_fee_student_amounts.status', Status::ACTIVE)
            ->where('class_fee_student_amounts.school_id', $schoolId)
            ->where('class_fee_student_amounts.academic_year_id', $academicYearId)
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereBetween('class_fee_student_amounts.fee_id', [$fromFeeId, $toFeeId]);
            })
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID);
            })
            ->whereHas('student', function ($query) use ($schoolId, $classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($schoolId, $classroomId) {
                    $query->where('classroom_students.academic_year_id', $schoolId);
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

    public function feeStudentFeeDiscountsByStudentId($studentId, $schoolId, $academicYearId)
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->get();
    }

    public function checkClassFeePaymentAmount($studentId, $feeId, $schoolId, $academicYearId)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->exists();
    }

    public function studentCurrentAllocateTransport($studentId, $allocationType = "", $schoolId, $academicYearId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where('is_current', true)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->whereDoesntHave('voucher.deallocate_transport', function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->first();
    }

    public function studentPreviousAllocateTransport($studentId, $allocationType = "", $schoolId, $academicYearId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where('is_current', false)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->latest('id')
            ->first();
    }

    public function studentDeallocateTransport($studentId, $allocationType = "", $schoolId, $academicYearId)
    {
        return DeallocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->latest('id')
            ->first();
    }

    public function feeAllBetweenCurrentAllocateAndDeallocate($studentId, $currentAllocateVoucherId, $deallocateVoucherId, $schoolId, $academicYearId)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($currentAllocateVoucherId), function ($query) use ($currentAllocateVoucherId) {
                $query->where('id', '>=', $currentAllocateVoucherId);
            })
            ->when(!empty($currentAllocateVoucherId) && !empty($deallocateVoucherId), function ($query) use ($deallocateVoucherId) {
                $query->where('id', '<', $deallocateVoucherId);
            })
            ->orderBy('id', 'asc')
            ->get();
    }

    public function transportFeeType($schoolId)
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('is_transport_fee', true)
            ->first();
    }

    public function lateFeeType($schoolId)
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('installment_type', FeeInstallmentType::EXTRACHARGE->value)
            ->where('is_late_fee', true)
            ->first();
    }

    public function allDueVouchers($classroomId = null, $studentStatus = "", $studentActiveStatus = "", $employmentCategoryId = null, $schoolId, $academicYearId)
    {
        return StudentFeeVoucher::where('student_fee_vouchers.status', Status::ACTIVE)
            ->where('student_fee_vouchers.school_id', $schoolId)
            ->where('student_fee_vouchers.academic_year_id', $academicYearId)
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->whereHas('student', function ($query) use ($academicYearId, $classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId) {
                $query->where(function ($query) use ($academicYearId, $classroomId) {
                    $query->where(function ($query) use ($academicYearId, $classroomId) {
                        $query->whereHas('classroomPromotedStudents', function ($query) use ($academicYearId, $classroomId) {
                            $query->where('classroom_students.academic_year_id', $academicYearId)
                                ->where('classroom_students.classroom_id', $classroomId);
                        });
                    });
                })->when(!empty($studentStatus), function ($query) use ($studentStatus) {
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
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }, 'father', 'mother',  'classroom', 'student' => function ($query) {
                $query->with(['due_follow_ups', 'promotedClassroom', 'employment_category'])
                    ->select(
                        'id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'present_address',
                        'classroom_id',
                        'employment_cat_id'
                    );
            }])
            ->get();
    }

    public function dailyRegistrationFeeReports(
        $currentSession = false,
        $startDate = "",
        $endDate = "",
        $paymentMode = "",
        $class_name_id = null,
        $classroom_id = null,
        $schoolId,
        $academicYearId
    ) {
        // $classroomIds = [];

        // if (!empty($class_name_id) && empty($classroom_id)) {
        //     $classroomIds = $this->getClassroomIdsByClassNameId($class_name_id);
        // } elseif (!empty($classroom_id)) {
        //     $classroomIds[] = $classroom_id;
        // }

        return EnquiryFee::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->when($currentSession == true, function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId);
            })
            ->when(!empty($paymentMode), function ($query) use ($paymentMode) {
                $query->where('payment_mode', $paymentMode);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('created_at', '>=', Carbon::parse($startDate)->format('Y-m-d H:i:s'));
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('created_at', '<=', Carbon::parse($endDate)->format('Y-m-d H:i:s'));
            })
            ->when(!empty($class_name_id), function ($query) use ($class_name_id) {
                $query->whereHas('enquiry', function ($query) use ($class_name_id) {
                    $query->where('class_name_id', $class_name_id);
                });
            })
            // ->when(!empty($class_name_id) || !empty($classroom_id), function ($query) use ($classroomIds) {
            //     $query->whereHas('enquiry', function ($query) use ($classroomIds) {
            //         $query->whereIn('classroom_id', $classroomIds);
            //     });
            // })
            ->select(
                'id',
                'enquiry_id',
                'academic_fee as total_amount',
                'payment_mode',
                'payment_note',
                'created_at',
                'created_by',
                'academic_year_id',
            )
            ->with(['enquiry' => function ($query) {
                $query->with([
                    'className:id,title',
                ]);
            }, 'createdBy' => function ($query) {
                $query->select(
                    'users.id',
                    'users.first_name',
                    'users.middle_name',
                    'users.last_name',
                    'users.role',
                );
            }])
            ->get();
    }

    public function dailyFeePaymentReports(
        $currentSession = false,
        $startDate = "",
        $endDate = "",
        $paymentMode = "",
        $class_name_id = null,
        $classroom_id = null,
        $cancelled_fee = false,
        $exclude_voucher_fee = false,
        $schoolId,
        $academicYearId
    ) {
        $studentIds = [];

        if (!empty($class_name_id) && empty($classroom_id)) {
            $studentIds = $this->studentIdsByClassNameId($class_name_id, $schoolId, $academicYearId);
        } elseif (!empty($classroom_id)) {
            $studentIds = $this->studentIdsByClassroomId($classroom_id, $schoolId, $academicYearId);
        }

        return FeePaymentMethod::where('fee_payment_methods.status', Status::ACTIVE)
            ->where('fee_payment_methods.school_id', $schoolId)
            ->when($currentSession, function ($query) use ($academicYearId) {
                $query->where('fee_payment_methods.academic_year_id', $academicYearId);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('fee_payment_methods.payment_date', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('fee_payment_methods.payment_date', '<=', Carbon::parse($endDate)->format('Y-m-d'));
            })
            ->when(!empty($paymentMode), function ($query) use ($paymentMode) {
                $query->where('fee_payment_methods.payment_mode', $paymentMode);
            })
            ->when(!empty($class_name_id) || !empty($classroom_id), function ($query) use ($studentIds) {
                $query->whereIn('fee_payment_methods.student_id', $studentIds);
            })
            ->when($cancelled_fee == false, function ($query) {
                $query->where('is_cancelled', false);
            })
            ->rightJoin('fee_payments', function ($join) use ($currentSession, $exclude_voucher_fee) {
                $join->on('fee_payments.fee_payment_method_id', '=', 'fee_payment_methods.id')
                    ->where('fee_payments.school_id', getUserSchoolId())
                    ->where('fee_payments.is_adjusted_fee', false);

                if ($currentSession) {
                    $join->where('fee_payments.academic_year_id', getAcademicYearId());
                }

                if ($exclude_voucher_fee) {
                    $join->where('fee_payments.fee_payment_type', FeePaymentType::FEEINSTALLMENT);
                }
            })
            ->groupBy('fee_payment_methods.id')
            ->select(
                'fee_payment_methods.id',
                'fee_payment_methods.payment_mode',
                'fee_payment_methods.payment_note',
                'fee_payment_methods.payment_date',
                'fee_payment_methods.receipt_no',
                'fee_payment_methods.school_receipt_no',
                'fee_payment_methods.transaction_id',
                'fee_payment_methods.is_cancelled',
                'fee_payment_methods.created_at',
                'fee_payment_methods.created_by',
                'fee_payment_methods.academic_year_id',
                DB::raw('SUM(fee_payments.amount) as total_amount'),
                DB::raw('SUM(fee_payments.payable_amount) as total_payable_amount'),
                DB::raw('SUM(fee_payments.paid_amount) as total_paid_amount'),
                DB::raw('SUM(fee_payments.due_amount) as total_due_amount'),
                DB::raw('SUM(fee_payments.discount_amount) as total_discount_amount')
            )
            ->with(['fee_payments.feeType', 'createdBy' => function ($query) {
                $query->select(
                    'users.id',
                    'users.first_name',
                    'users.middle_name',
                    'users.last_name',
                    'users.role',
                );
            }, 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'students.academic_year_id',
                    'students.employment_cat_id',
                    'students.admission_no',
                    'students.first_name',
                    'students.middle_name',
                    'students.last_name',
                    'students.classroom_id',
                    'students.student_status',
                    'students.present_address',
                    'students.boarding_type',
                    'students.phone'
                )->with([
                    'classroom:id,title',
                    'promotedClassroom',
                ]);
            }])
            ->orderBy('receipt_no', 'asc')
            ->get();
    }

    public function studentIdsByClassNameId($id, $schoolId, $academicYearId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($id, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->whereHas('classroom', function ($query) use ($id) {
                        $query->where('classrooms.class_name_id', $id);
                    });
            })
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }

    public function studentIdsByClassroomId($id, $schoolId, $academicYearId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($id, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $id);
            })
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }


    public function apiFilteredStudentsFees(
        $classNameId,
        array $classroomIds,
        $studentStatus,
        $fromFeeId,
        $toFeeId,
        $feeCategoryId,
        $feeStructureId,
        $schoolId = null,
        $academicYearId = null,
    ) {
        $students = $this->apiStudentsByClassroomIds($classroomIds, $schoolId, $academicYearId);
        $studentIds = [];
        if ($students->count() > 0) {
            $studentIds = $students->pluck('id')->toArray();
        }

        return ClassFeeStudentAmount::where('class_fee_student_amounts.status', Status::ACTIVE)
            ->where('class_fee_student_amounts.school_id', $schoolId)
            ->where('class_fee_student_amounts.academic_year_id', $academicYearId)
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
                    ->whereIn('classroom_id', $classroomIds)
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

    public function apiStudentsByClassroomIds($classroomIds, $schoolId, $academicYearId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->get();
    }


    /*
    *   helper method to processs general voucher due data for student outstanding due
    */
    public function apiProcessGeneralVouchersDueData($classDueReports, $vouchers)
    {
        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['classroom'])) {
                        unset($voucher['classroom']);
                    }

                    $voucher['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->classroom?->id;

                // old
                // $voucher->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                //     $query->where('classroom_id', $classroomId);
                // }]);

                // new
                $voucher->loadMissing([
                    'student.classroomRollRaw' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    },
                    'student.studentImageRaw'
                ]);

                $due_amount = 0;

                foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                    $amount = (float) $voucherAmountData->amount ?? 0;

                    // if ($voucherAmountData->payment !== null && $voucherAmountData->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($voucherAmountData->payment !== null) {
                        $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $amount = $amount - $discount_amount - $paid_amount;
                        // $amount = (float) $voucherAmountData?->payment?->due_amount ?? 0;
                    }

                    $due_amount += $amount;
                }

                if ($due_amount > 0) {
                    if (!isset($classDueReports[$voucher?->classroom?->id])) {
                        $classDueReports[$voucher?->classroom?->id] = [
                            'classroom' => [
                                'id' => $voucher->first()?->classroom?->id,
                                'title' => $voucher->first()?->classroom?->title,
                            ],
                            'total_due_amount' => 0,
                            'students_data' => [],
                        ];
                    }

                    if (isset($classDueReports[$voucher?->classroom?->id]['students_data'][$voucher->student_id])) {
                        $classDueReports[$voucher?->classroom?->id]['students_data'][$voucher->student_id]['total_due_amount'] += $due_amount;
                    } else {
                        // construct father name
                        $father_name = "";

                        if ($voucher->father != null) {
                            $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher->father->last_name}";
                        }

                        // merge student data in reports
                        $classDueReports[$voucher?->classroom?->id]['students_data'][$voucher->student_id] = [
                            'id' => $voucher->student?->id,
                            'admission_no' => $voucher?->student?->admission_no,
                            // 'roll_no' => $voucher?->student?->classroomRoll?->roll_no,
                            'roll_no' => $voucher?->student?->classroomRollRaw?->roll_no,
                            'name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                            'present_address' => $voucher?->student?->present_address,
                            'father_name' => $father_name,
                            'sms_phone' => $voucher?->father?->sms_phone ?? "",
                            'classroom_title' => $voucher?->classroom?->title ?? "",
                            'total_due_amount' =>  $due_amount,
                            'student_image' => $studentinstallment?->student?->studentImage?->path ?? ""
                        ];
                    }

                    $classDueReports[$voucher?->classroom?->id]['total_due_amount'] += $due_amount;
                }
            }
        }

        return $classDueReports;
    }

    public function apiDateAndInstallmentWiseFeePaymentDueSummary($filter_type, $start_date = "", $end_date = "", $from_fee_id = null, $to_fee_id = null, $schoolId = null, $academicYearId = null, $studentId = null)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->when($filter_type === "date_wise" && !empty($start_date) && !empty($end_date), function ($query) use ($start_date, $end_date) {
                $query->whereBetween('payment_date', [Carbon::parse($start_date)->format('Y-m-d'), Carbon::parse($end_date)->format('Y-m-d')]);
            })
            ->when($filter_type === "installment_wise" && !empty($from_fee_id) && !empty($to_fee_id), function ($query) use ($from_fee_id, $to_fee_id) {
                $query->whereHas('fee_payments', function ($query) use ($from_fee_id, $to_fee_id) {
                    $query->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT)
                        ->whereBetween('fee_id', [$from_fee_id, $to_fee_id]);
                });
            })
            ->when(!empty($studentId), function ($query) use ($studentId) {
                // $query->where('student_id', $studentId);
            })
            ->where('is_cancelled', false)
            ->with(['fee_payments' => function ($query) {
                $query->with(['student' => function ($query) {
                    $query->select(
                        'id',
                        'classroom_id'
                    )->with(['promotedClassroom']);
                }]);
            }])
            ->get();
    }

    public function getStudentFeeDiscounts($studentId, $fromFeeId = null, $toFeeId = null, $schoolId = null, $academicYearId = null)
    {
        return StudentFeeDiscount::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where(function ($query) use ($fromFeeId, $toFeeId) {
                if (!empty($fromFeeId) && !empty($toFeeId)) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                }
            })
            ->get();
    }

    public function getStudentFeeInstallments($studentId, $fromFeeId = null, $toFeeId = null, $schoolId = null, $academicYearId = null)
    {
        return ClassFeeStudentAmount::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->where(function ($query) use ($fromFeeId, $toFeeId) {
                if (!empty($fromFeeId) && !empty($toFeeId)) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                }
            })
            ->with([
                'fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                },
                'payment',
                'feeType',
                'fee',
                'nullify_fee'
            ])
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
}
