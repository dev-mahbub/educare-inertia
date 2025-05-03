<?php

namespace App\Repositories;

use DB;
use Carbon\Carbon;
use App\Enums\Status;
use App\Models\Student;
use App\Models\Classroom;
use App\Enums\PaymentMode;
use App\Models\EnquiryFee;
use App\Models\SiteSetting;
use App\Enums\PaymentStatus;
use App\Enums\FeePaymentType;
use App\Models\RegistrationFee;
use App\Models\FeePaymentMethod;
use App\Repositories\IFeePaymentMethodRepository;

class FeePaymentMethodRepository implements IRepository, IFeePaymentMethodRepository
{
    public function getAll()
    {
        return FeePaymentMethod::all();
    }

    public function getById($id)
    {
        return FeePaymentMethod::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return FeePaymentMethod::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        FeePaymentMethod::destroy($id);
    }

    public function create(array $arrayData)
    {
        return FeePaymentMethod::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return FeePaymentMethod::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE);
    }

    public function getStudentIdsByClassroomId($id, $academicYearId = null, $schoolId = null)
    {
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($id, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $id);
            })
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }

    public function getStudentIdsByClassNameId($id, $schoolId = null, $academicYearId = null)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($id, $academicYearId) {
                $query->where('classroom_students.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
                    ->whereHas('classroom', function ($query) use ($id) {
                        $query->where('classrooms.class_name_id', $id);
                    });
            })
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }


    public function getClassroomIdsByClassNameId($id)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', $id)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }


    public function getHeadWiseDailyFeePaymentReports(
        $sort_by = "",
        $voucher = false,
        $cancelled_fee = false,
        $start_date = "",
        $end_date = "",
        $payment_mode = "",
        $fee_type_id = "",
        $class_name_id = "",
    ) {
        $studentIds = [];

        if (!empty($class_name_id) && empty($classroom_id)) {
            $studentIds = $this->getStudentIdsByClassNameId($class_name_id);
        }

        $orderBy = [
            'receipt_no' => 'receipt_no',
            'receipt_date' => 'payment_date',
        ];

        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($start_date), function ($query) use ($start_date) {
                $query->whereDate('payment_date', '>=', Carbon::parse($start_date)->format('Y-m-d'));
            })
            ->when(!empty($end_date), function ($query) use ($end_date) {
                $query->whereDate('payment_date', '<=', Carbon::parse($end_date)->format('Y-m-d'));
            })
            ->when(!empty($payment_mode), function ($query) use ($payment_mode) {
                $query->where('payment_mode', $payment_mode);
            })
            ->when(!empty($class_name_id), function ($query) use ($studentIds) {
                $query->whereIn('student_id', $studentIds);
            })
            ->when($cancelled_fee == false, function ($query) {
                $query->where('is_cancelled', false);
            })
            ->whereHas('fee_payments', function ($query) use ($fee_type_id, $voucher) {
                if (!empty($fee_type_id)) {
                    $query->where('fee_type_id', $fee_type_id);
                }

                if ($voucher == false) {
                    $query->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT);
                }

                $query->where('is_adjusted_fee', false);
            })
            ->with(['fee_payments' => function ($query) use ($fee_type_id, $voucher) {
                $query->when(!empty($fee_type_id), function ($query) use ($fee_type_id) {
                    $query->where('fee_type_id', $fee_type_id)
                        ->with(['feeType']);
                })->when($voucher == false, function ($query) {
                    $query->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT);
                });
            }, 'createdBy' => function ($query) {
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
                    'students.admission_no',
                    'students.first_name',
                    'students.middle_name',
                    'students.last_name',
                    'students.classroom_id',
                    'students.boarding_type',
                    'students.gender',
                    'students.employment_cat_id',
                    'students.student_status'
                )->with([
                    'classroom:id,title',
                    'promotedClassroom',
                    'father'
                ]);
            }])
            ->when(!empty($sort_by), function ($query) use ($sort_by, $orderBy) {
                $query->orderBy($orderBy[$sort_by], 'asc');
            })
            ->get();
    }



    public function getHeadWiseDailyFeePaymentSummary($payment_mode = "", $start_date = "", $end_date = "")
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($start_date), function ($query) use ($start_date) {
                $query->whereDate('payment_date', '>=', Carbon::parse($start_date)->format('Y-m-d'));
            })
            ->when(!empty($end_date), function ($query) use ($end_date) {
                $query->whereDate('payment_date', '<=', Carbon::parse($end_date)->format('Y-m-d'));
            })
            ->when(!empty($payment_mode), function ($query) use ($payment_mode) {
                $query->where('payment_mode', $payment_mode);
            })
            ->where('is_cancelled', false)
            ->with(['fee_payments' => function ($query) {
                $query->with(['feeType']);
            }])
            ->orderBy('payment_date', 'asc')
            ->get();
    }


    public function getDateAndInstallmentWiseFeePaymentSummary($filter_type, $start_date = "", $end_date = "", $from_fee_id = null, $to_fee_id = null)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when($filter_type === "date_wise" && !empty($start_date) && !empty($end_date), function ($query) use ($start_date, $end_date) {
                $query->whereBetween('payment_date', [Carbon::parse($start_date)->format('Y-m-d'), Carbon::parse($end_date)->format('Y-m-d')]);
            })
            ->when($filter_type === "installment_wise" && !empty($from_fee_id) && !empty($to_fee_id), function ($query) use ($from_fee_id, $to_fee_id) {
                $query->whereHas('fee_payments', function ($query) use ($from_fee_id, $to_fee_id) {
                    $query->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT)
                        ->whereBetween('fee_id', [$from_fee_id, $to_fee_id]);
                });
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


    public function getClassAndInstallmentWiseFeePaymentSummary()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_cancelled', false)
            ->with(['fee_payments' => function ($query) {
                $query->with(['student' => function ($query) {
                    $query->with(['promotedClassroom'])
                        ->select('id', 'classroom_id');
                }]);
            }])
            ->get();
    }


    public function getHeadWiseYearlyFeePaymentSummary(
        $payment_mode = "",
        $start_date = "",
        $end_date = "",
    ) {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($start_date), function ($query) use ($start_date) {
                $query->whereDate('payment_date', '>=', Carbon::parse($start_date)->format('Y-m-d'));
            })
            ->when(!empty($end_date), function ($query) use ($end_date) {
                $query->whereDate('payment_date', '<=', Carbon::parse($end_date)->format('Y-m-d'));
            })
            ->when(!empty($payment_mode), function ($query) use ($payment_mode) {
                $query->where('payment_mode', $payment_mode);
            })
            ->where('is_cancelled', false)
            ->with(['fee_payments' => function ($query) {
                $query->with(['feeType']);
            }])
            ->orderBy('payment_date', 'asc')
            ->get();
    }


    public function getDailyFeePaymentReports(
        $currentSession = false,
        $startDate = "",
        $endDate = "",
        $paymentMode = "",
        $class_name_id = null,
        $classroom_id = null,
        $cancelled_fee = false,
        $exclude_voucher_fee = false,
        $schoolId = null,
        $academicYearId = null
    ) {
        $studentIds = [];

        if (!empty($class_name_id) && empty($classroom_id)) {
            $studentIds = $this->getStudentIdsByClassNameId($class_name_id, $schoolId, $academicYearId);
        } elseif (!empty($classroom_id)) {
            $studentIds = $this->getStudentIdsByClassroomId($classroom_id, $academicYearId, $schoolId);
        }

        return FeePaymentMethod::where('fee_payment_methods.status', Status::ACTIVE)
            ->where('fee_payment_methods.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when($currentSession, function ($query) use ($academicYearId) {
                $query->where('fee_payment_methods.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('fee_payment_methods.payment_date', '>=', $startDate);
                // $query->whereDate('fee_payment_methods.created_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('fee_payment_methods.payment_date', '<=', $endDate);
                // $query->whereDate('fee_payment_methods.created_at', '<=', $endDate);
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
            ->rightJoin('fee_payments', function ($join) use ($currentSession, $exclude_voucher_fee, $schoolId, $academicYearId) {
                $join->on('fee_payments.fee_payment_method_id', '=', 'fee_payment_methods.id')
                    ->where('fee_payments.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
                    ->where('fee_payments.is_adjusted_fee', false);

                if ($currentSession) {
                    $join->where('fee_payments.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
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

    public function getStudentDailyCollectionReportData(
        int $classroomId,
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        bool $cancelled_fee = false,
        bool $exclude_voucher_fee = false,
        int $academicYearId = null,
    ) {
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $studentIds = $this->getStudentIdsByClassroomId($classroomId, $academicYearId);

        return FeePaymentMethod::where('fee_payment_methods.status', Status::ACTIVE)
            ->where('fee_payment_methods.school_id', getUserSchoolId())
            ->when($currentSession, function ($query) {
                $query->where('fee_payment_methods.academic_year_id', getAcademicYearId());
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
            ->when(!empty($studentIds), function ($query) use ($studentIds) {
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


    public function getDailyRegistrationFeeReports(
        $currentSession = false,
        $startDate = "",
        $endDate = "",
        $paymentMode = "",
        $class_name_id = null,
        $classroom_id = null,
        $schoolId = null,
        $academicYearId = null
    ) {
        // $classroomIds = [];

        // if (!empty($class_name_id) && empty($classroom_id)) {
        //     $classroomIds = $this->getClassroomIdsByClassNameId($class_name_id);
        // } elseif (!empty($classroom_id)) {
        //     $classroomIds[] = $classroom_id;
        // }

        return EnquiryFee::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when($currentSession == true, function ($query) use ($academicYearId) {
                $query->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
            })
            ->when(!empty($paymentMode), function ($query) use ($paymentMode) {
                $query->where('payment_mode', $paymentMode);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('created_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('created_at', '<=', $endDate);
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
                'receipt_no',
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


    public function getStudentPaymentReports(array|int $studentId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($studentId), function ($query) use ($studentId) {
                if (is_array($studentId)) {
                    $query->whereIn('student_id', $studentId);
                } else if (is_integer($studentId)) {
                    $query->where('student_id', $studentId);
                }
            })
            ->whereHas('fee_payments')
            ->with(['fee_payments' => function ($query) {
                $query->with(['feeType']);
            }])
            ->orderBy('receipt_no', 'desc')
            ->get();
    }


    public function getFilteredChequeReports(
        $reportType,
        $fromDate = "",
        $toDate = "",
        $classroomId = null,
        $chequeNo = null,
        $admissionNo = "",
        $studentName = "",
    ) {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_mode', PaymentMode::CHEQUE)
            ->where(function ($query) use ($reportType) {
                if ($reportType = "cheque_cleared") {
                    $query->where('is_bounced_cheque', false);
                }

                if ($reportType == 'cheque_bounce') {
                    $query->where('is_bounced_cheque', true);
                }

                if ($reportType == 'cheque_date') {
                    $query->where('is_bounced_cheque', false)
                        ->where('is_cancelled', false);
                }

                if ($reportType == 'cheque_clearance') {
                    $query->where('is_bounced_cheque', false)
                        ->where('is_cancelled', false)
                        ->where('is_cleared_cheque', true);
                }
            })
            ->when(!empty($chequeNo), function ($query) use ($chequeNo) {
                $query->where('cheque_no', $chequeNo);
            })
            ->when(!empty($admissionNo) || !empty($classroomId), function ($query) use ($admissionNo, $classroomId) {
                $query->whereHas('student', function ($query) use ($admissionNo, $classroomId) {
                    if (!empty($admissionNo)) {
                        $query->where('admission_no', $admissionNo);
                    }

                    if (!empty($classroomId)) {
                        $query->where('classroom_id', $classroomId);
                    }
                });
            })
            ->when(!empty($studentName), function ($query) use ($studentName) {
                $query->whereHas('student', function ($query) use ($studentName) {
                    $query->where('first_name', 'like', '%' . $studentName . '%')
                        ->orWhere('middle_name', 'like', '%' . $studentName . '%')
                        ->orWhere('last_name', 'like', '%' . $studentName . '%');
                });
            })
            ->when(!empty($fromDate), function ($query) use ($fromDate) {
                $query->whereDate('payment_date', '>=', $fromDate);
            })
            ->when(!empty($toDate), function ($query) use ($toDate) {
                $query->whereDate('payment_date', '<=', $toDate);
            })
            ->with(['bank:id,name', 'student' => function ($query) use ($reportType) {
                $query->select(
                    'students.id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                );

                if ($reportType == 'cheque_date') {
                    $query->with(['father:id,student_id,first_name,middle_name,last_name,phone,sms_phone,guardian_type', 'classroom:id,title']);
                } else {
                    $query->with(['classroom:id,title']);
                }
            }])
            ->select(
                'id',
                'payment_date',
                'cheque_date',
                'cheque_no',
                'cheque_amount',
                'bank_id',
                'receipt_no',
                'is_cancelled',
                'is_bounced_cheque',
                'cheque_clearance_date',
                'cheque_clearance_note'
            )
            ->orderBy('payment_date', 'asc')
            ->get();
    }


    public function getChequeReports()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_mode', PaymentMode::CHEQUE)
            ->where('is_bounced_cheque', false)
            ->with(['bank:id,name', 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                )->with(['classroom:id,title']);
            }])
            ->select(
                'id',
                'payment_date',
                'cheque_date',
                'cheque_no',
                'cheque_amount',
                'bank_id',
                'receipt_no',
                'is_cancelled',
                'is_bounced_cheque',
                'cheque_clearance_date',
                'cheque_clearance_note'
            )
            ->orderBy('payment_date', 'asc')
            ->get();
    }


    public function getChequeDateReports()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_mode', PaymentMode::CHEQUE)
            ->where('is_bounced_cheque', false)
            ->where('is_cancelled', false)
            ->with(['bank:id,name', 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                )->with(['father:id,student_id,first_name,middle_name,last_name,phone,sms_phone,guardian_type', 'classroom:id,title']);
            }])
            ->select(
                'id',
                'payment_date',
                'cheque_date',
                'cheque_no',
                'cheque_amount',
                'bank_id',
                'receipt_no',
                'is_cancelled',
                'is_bounced_cheque'
            )
            ->orderBy('cheque_date', 'asc')
            ->get();
    }


    public function getChequeClearanceReports()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_mode', PaymentMode::CHEQUE)
            ->where('is_bounced_cheque', false)
            ->where('is_cleared_cheque', true)
            ->with(['bank:id,name', 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                )->with(['classroom:id,title']);
            }])
            ->select(
                'id',
                'cheque_date',
                'cheque_no',
                'cheque_amount',
                'bank_id',
                'receipt_no',
                'is_cancelled',
                'is_bounced_cheque',
                'is_cleared_cheque',
                'cheque_clearance_date',
                'cheque_clearance_note'
            )
            ->orderBy('receipt_no', 'asc')
            ->get();
    }


    public function getBouncedChequeReports()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_mode', PaymentMode::CHEQUE)
            ->where('is_bounced_cheque', true)
            ->with(['bank:id,name', 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                )->with(['classroom:id,title']);
            }])
            ->select(
                'id',
                'payment_date',
                'cheque_date',
                'cheque_no',
                'cheque_amount',
                'bank_id',
                'receipt_no',
                'is_cancelled',
                'is_bounced_cheque',
                'cheque_penalty',
            )
            ->orderBy('payment_date', 'asc')
            ->get();
    }


    public function getPaymentByIdAndStudentId(int $id, int $studentId)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->where('student_id', $studentId)
            ->with('fee_payments.feeType')
            ->first();
    }

    public function getFeePaymentMethodById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return FeePaymentMethod::where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->with('fee_payments.feeType')
            ->first();
    }


    public function getNextFeeReceiptNumber(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $feeReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId)
                ->where('type', 'Fee')
                ->where('key_name', 'fee_receipt_number_session_wise_seed_no')
                ->first();


            if ($feeReceiptSeed != null) {
                $nextReceiptNo = $feeReceiptSeed?->value + 1;
            } else {
                $feeReceiptSeed = setSiteSettingData('Fee', 'fee_receipt_number_session_wise_seed_no', 1);
                $nextReceiptNo = $feeReceiptSeed?->value ?? 1;
            }
        } else {
            $lastPayment = FeePaymentMethod::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                // ->where('academic_year_id', getAcademicYearId())
                ->select('id', 'receipt_no')
                ->orderBy('receipt_no', 'desc')
                ->first();

            if ($lastPayment != null) {
                $nextReceiptNo = $lastPayment?->receipt_no + 1;
            } else {
                $nextReceiptNo = 1;
            }
        }

        return $nextReceiptNo;

        // $lastPayment = FeePaymentMethod::where('status', Status::ACTIVE)
        //     ->where('school_id', getUserSchoolId())
        //     ->where('academic_year_id', getAcademicYearId())
        //     ->select('id', 'receipt_no')
        //     ->orderBy('receipt_no', 'desc')
        //     ->first();

        // if ($lastPayment != null) {
        //     return $lastPayment?->receipt_no + 1;
        // }

        // return null;
    }

    public function getNextRegistrationFeeReceiptNumber($schoolId = null)
    {
        $receiptNumberSetting = getSiteSettingData('fee_is_registration_seed_no_enabled');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $feeReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
                // ->where('academic_year_id', getAcademicYearId())
                ->where('type', 'Fee')
                ->where('key_name', 'fee_registration_seed_no')
                ->first();

            if ($feeReceiptSeed != null) {
                $nextReceiptNo = $feeReceiptSeed?->value + 1;
            } else {
                $feeReceiptSeed = setSiteSettingData('Fee', 'fee_registration_seed_no', 1);
                $nextReceiptNo = $feeReceiptSeed?->value ?? 1;
            }
        } else {
            $lastPayment = EnquiryFee::where('status', Status::ACTIVE)
                ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
                // ->where('academic_year_id', getAcademicYearId())
                ->select('id', 'receipt_no')
                ->orderBy('receipt_no', 'desc')
                ->first();

            if ($lastPayment != null) {
                $nextReceiptNo = $lastPayment?->receipt_no + 1;
            } else {
                $nextReceiptNo = 1;
            }
        }

        return $nextReceiptNo;
    }


    public function getCurrentFeeReceiptNumber()
    {
        $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $feeReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->where('academic_year_id', getAcademicYearId())
                ->where('type', 'Fee')
                ->where('key_name', 'fee_receipt_number_session_wise_seed_no')
                ->first();


            if ($feeReceiptSeed != null) {
                $currentReceiptNo = $feeReceiptSeed?->value ?? 1;
            } else {
                $feeReceiptSeed = setSiteSettingData('Fee', 'fee_receipt_number_session_wise_seed_no', 1);
                $currentReceiptNo = $feeReceiptSeed?->value ?? 1;
            }
        } else {
            $lastPayment = FeePaymentMethod::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                // ->where('academic_year_id', getAcademicYearId())
                ->select('id', 'receipt_no')
                ->orderBy('receipt_no', 'desc')
                ->first();

            $currentReceiptNo = $lastPayment?->receipt_no;
        }

        return $currentReceiptNo;
    }

    public function getFeePaymentReportById(int $id)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select(
                'id',
                'student_id',
                'payment_mode',
                'payment_date',
                'receipt_no',
                'school_receipt_no',
                'payment_note',
                'is_cancelled',
                'created_by',
                'created_at',
            )
            ->with(['createdBy:id,first_name,middle_name,last_name', 'fee_payments.feeType', 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'students.admission_no',
                    'students.srn_no',
                    'students.class_name_id',
                    'students.classroom_id',
                    'students.first_name',
                    'students.middle_name',
                    'students.last_name',
                )->with([
                    'classroom:id,title',
                    'promotedClassroom:classrooms.id,classrooms.title',
                    'father:id,student_id,first_name,middle_name,last_name'
                ]);
            }])
            ->firstOrFail();
    }


    public function getRegistrationFeePaymentReportById(int $id)
    {
        return EnquiryFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'enquiry_id',
                'academic_fee as fee_amount',
                'payment_mode',
                'payment_note',
                'created_at',
                'created_by',
            )
            ->with(['enquiry' => function ($query) {
                $query->select(
                    'id',
                    'academic_year_id',
                    'classroom_id',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'registration_no'
                )
                    ->with([
                        'className:id,title',
                        'guardian:id,enquiry_id,father_first_name,father_middle_name,father_last_name',
                        'academicYear:id,academic_session'
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
            ->first();
    }

    public function getRegistrationFeesForReceiptReport(string $search = '', string $paymentMode = '', string $startDate = '', string $endDate = '', $schoolId = null)
    {
        return EnquiryFee::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($paymentMode), function ($query) use ($paymentMode) {
                $query->where('payment_mode', $paymentMode);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('payment_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('payment_date', '<=', $endDate);
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('receipt_no', 'like', '%' . $search . '%');
                }
            })
            ->select(
                'id',
                'enquiry_id',
                'academic_fee as fee_amount',
                'payment_mode',
                'payment_date',
                'receipt_no'
            )
            ->with([
                'enquiry' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'registration_no'
                    );
                }
            ])
            ->get();
    }

    public function getCanceledRegistrationFeesForReceiptReport(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        return EnquiryFee::where('status', [Status::INACTIVE, Status::DELETED])
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('payment_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('payment_date', '<=', $endDate);
            })
            ->select(
                'id',
                'enquiry_id',
                'academic_fee as fee_amount',
                'payment_mode',
                'payment_date',
                'receipt_no',
            )
            ->with([
                'enquiry' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'registration_no'
                    );
                }
            ])
            ->get();
    }

    public function getLastPaymentReportId()
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('created_by', auth()->user()->id)
            ->where('is_cancelled', false)
            ->latest('id')
            ->select('id')
            ->first();
    }


    public function getByPaymentMethodId(int $id)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->firstOrFail();
    }


    public function getCancellationReports($classroomId = null, $studentId = null)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_cancelled', true)
            ->whereHas('student', function ($query) use ($classroomId, $studentId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $studentId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                    if (!empty($studentId)) {
                        $query->where('classroom_students.student_id', $studentId);
                    }
                });
            })
            ->with(['fee_payments', 'cancelledBy:id,first_name,middle_name,last_name', 'student' => function ($query) {
                $query->select(
                    'students.id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                )->with(['classroom:id,title', 'promotedClassroom']);
            }])
            ->select(
                'id',
                'payment_mode',
                'receipt_no',
                'is_cancelled',
                'cancellation_date',
                'cancel_reason',
                'cancelled_by',
            )
            ->orderBy('payment_date', 'asc')
            ->get();
    }

    public function getPaymentsByPaymentMode(string $paymentMode, bool $isLedgerAmountSessionWise = false)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when($isLedgerAmountSessionWise == true, function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->where('payment_mode', $paymentMode)
            ->where('is_cancelled', false)
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED)
                    ->select(
                        'id',
                        'fee_payment_method_id',
                        'paid_amount'
                    );
            }])
            ->select('id', 'payment_mode')
            ->get();
    }

    public function getPaymentsByPaymentModeAndPaymentDate(string $paymentMode, string $startDate = '', string $endDate = '', bool $isLedgerAmountSessionWise = false)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('payment_mode', $paymentMode)
            ->where('is_cancelled', false)
            ->when($isLedgerAmountSessionWise == true, function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('payment_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('payment_date', '<=', $endDate);
            })
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED)
                    ->select(
                        'id',
                        'fee_payment_method_id',
                        'paid_amount'
                    );
            }])
            ->select('id', 'payment_mode')
            ->get();
    }

    public function getCashBookReportData(string $paymentMode, string $paymentDate = '', bool $isLedgerAmountSessionWise = false)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('payment_mode', $paymentMode)
            ->where('is_cancelled', false)
            ->when($isLedgerAmountSessionWise == true, function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->when(!empty($paymentDate), function ($query) use ($paymentDate) {
                $query->whereDate('payment_date', $paymentDate);
            })
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED)
                    ->select(
                        'id',
                        'fee_payment_method_id',
                        'paid_amount'
                    );
            }])
            ->select('id', 'payment_mode')
            ->get();
    }

    public function getPreviousDayCashBookReportData(string $paymentMode, string $paymentDate = '', bool $isLedgerAmountSessionWise = false)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('payment_mode', $paymentMode)
            ->where('is_cancelled', false)
            ->when($isLedgerAmountSessionWise == true, function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->when(!empty($paymentDate), function ($query) use ($paymentDate) {
                $query->whereDate('payment_date', '<', $paymentDate);
            })
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED)
                    ->select(
                        'id',
                        'fee_payment_method_id',
                        'paid_amount'
                    );
            }])
            ->select('id', 'payment_mode')
            ->get();
    }

    public function getFeePaymentsForAccountReceiptReport(string $search = '', string $paymentMode = '', string $startDate = '', string $endDate = '', $schoolId = null)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_cancelled', false)
            ->when(!empty($paymentMode), function ($query) use ($paymentMode) {
                $query->where('payment_mode', $paymentMode);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('payment_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('payment_date', '<=', $endDate);
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('receipt_no', 'like', '%' . $search . '%');
                }
            })
            ->with([
                'fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED)
                        ->with(['feeType:id,fee_type'])
                        ->select(
                            'id',
                            'fee_payment_method_id',
                            'paid_amount',
                            'fee_id',
                            'student_fee_voucher_id',
                            'voucher_id',
                            'fee_type_id'
                        );
                },
                'student:students.id,students.first_name,students.middle_name,students.last_name'
            ])
            ->select(
                'id',
                'receipt_no',
                'payment_date',
                'payment_mode',
                'student_id',
                'payment_note',
                'school_receipt_no'
            )
            ->get();
    }

    public function getCanceledFeePaymentsForAccountReceiptReport(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_cancelled', true)
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('payment_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('payment_date', '<=', $endDate);
            })
            ->with([
                'fee_payments' => function ($query) {
                    $query->where('payment_status', PaymentStatus::CANCELLED)
                        ->with(['feeType:id,fee_type'])
                        ->select(
                            'id',
                            'fee_payment_method_id',
                            'paid_amount',
                            'fee_id',
                            'student_fee_voucher_id',
                            'voucher_id',
                            'fee_type_id'
                        );
                },
                'student:students.id,students.first_name,students.middle_name,students.last_name'
            ])
            ->select(
                'id',
                'receipt_no',
                'payment_date',
                'payment_mode',
                'student_id',
                'payment_note',
                'school_receipt_no'
            )
            ->get();
    }
}
