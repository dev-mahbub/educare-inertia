<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\NullifyFee;
use App\Enums\RefundStatus;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Models\AdjustFeePayment;
use Illuminate\Support\Facades\DB;
use App\Enums\FeeRefundPaymentMode;
use App\Http\Requests\AssetRequest;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\IBankRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Models\FeePaymentRefundMethod;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Http\Requests\AdjustFeeRequest;
use App\Repositories\SubjectRepository;
use App\Http\Requests\NullifyFeeRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\INullifyFeeRepository;
use App\Repositories\IFeeStructureRepository;
use App\Http\Requests\FeePaymentRefundRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IAdjustFeePaymentRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Http\Requests\CancelFeePaymentRefundRequest;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Repositories\IFeePaymentRefundMethodRepository;

class FeeRefundController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IStudentRepository $studentRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
        private IFeePaymentRefundRepository $feePaymentRefundRepository,
        private IBankRepository $bankRepository,
        private IAdjustFeePaymentRepository $adjustFeePaymentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private INullifyFeeRepository $nullifyFeeRepository,
        private IFeeRepository $feeRepository,
    ) {
        $this->middleware('permission:view fees', ['only' => ['refundReport', 'refundCancelReport', 'adjsutFeeReport', 'feeNullify', 'feeNullifyReport']]);
        $this->middleware('permission:add fees', ['only' => ['refundFee', 'save', 'adjustFee', 'saveAdjustFee', 'saveFeeNullify']]);
        $this->middleware('permission:edit fees', ['only' => ['cancelFeePaymentRefund']]);
        $this->middleware('permission:delete fees', ['only' => ['deleteAdjsutFee']]);
    }

    /**
     * Display the schools.
     */
    public function refundFee(Request $request): Response
    {
        $feeRefundPaymentModes = [];

        foreach (FeeRefundPaymentMode::cases() as $mode) {
            array_push($feeRefundPaymentModes, ['id' => $mode->value, 'title' => $mode->value]);
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        $banks = $this->bankRepository->getActiveNameAndId()->map(function ($bank) {
            return [
                'id' => $bank->id,
                'title' => $bank->name,
            ];
        });

        $students = [];
        $student = null;
        $studentFeeInstallments = [];
        $studentFeePaymentRefunds = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $admissionNo = $request->admission_no ?? null;
            $studentId = $request->student_id ?? null;

            if (!empty($admissionNo)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if (!empty($studentId)) {
                $student = $this->studentRepository->getStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    return [
                        'id' => $student->id,
                        'admission_no' => $student->admission_no,
                        'title' => $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? ""),
                        'classroom_id' => $student->classroom_id,
                        'roll_no' => $rollNo,
                        'class_name_id' => $student?->promotedClassroom?->class_name_id,
                        'boarding_type' => $student->boarding_type,
                    ];
                });
            }

            if ($student?->id != null) {
                $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($student->id);

                $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($student->id);

                foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                    $total_fee_amount = 0;
                    $total_paid_amount = 0;
                    $total_due_amount = 0;
                    $total_discount_amount = 0;

                    $paid_status_count = 0;
                    $partial_status_count = 0;
                    $due_status_count = 0;

                    foreach ($feeInstallments as $feeInstallment) {
                        $fee_amount = ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);
                        $due_amount = $fee_amount;
                        $paid_amount = 0;
                        $discount_amount = 0;

                        // if ($feeInstallment?->payment != null && $feeInstallment?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                        if ($feeInstallment?->payment != null) {
                            // $total_paid_amount += (float) $feeInstallment?->payment?->paid_amount ?? 0;
                            // $total_due_amount += (float) $feeInstallment?->payment?->due_amount ?? 0;
                            // $total_discount_amount += (float) $feeInstallment?->payment?->discount_amount ?? 0;
                            $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        } elseif ($studentFeeDiscounts->count() > 0) {
                            foreach ($studentFeeDiscounts as $discount) {
                                if ($discount->fee_id === $feeInstallment->fee_id && $discount->fee_type_id === $feeInstallment->fee_type_id) {
                                    if ($discount->is_discount_percentage) {
                                        $total_discount_amount += (float) ($discount->amount / 100) * ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);
                                    } else {
                                        // $total_discount_amount += (float) $discount->amount;
                                        $discount_amount += (float) $discount->amount;
                                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                    }
                                }
                            }
                        }

                        $total_fee_amount += $fee_amount;
                        $total_paid_amount += $paid_amount;
                        $total_due_amount += $due_amount;
                        $total_discount_amount += $discount_amount;

                        if (!isset($studentFeeInstallments[$feeInstallmentId]['fee'])) {
                            $studentFeeInstallments[$feeInstallmentId]['fee'] = [
                                'id' => $feeInstallment->fee_id,
                                'title' => $feeInstallment->fee->title,
                            ];
                        }

                        $status = $feeInstallment?->payment?->payment_status;

                        if ($status == PaymentStatus::CANCELLED->value) {
                            $status = PaymentStatus::DUE->value;
                        }

                        // old
                        // if ($due_amount <= 0) {
                        //     $status = PaymentStatus::PAID->value;
                        // } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                        //     $status = PaymentStatus::PARTIAL->value;
                        // }

                        // new
                        if ($due_amount <= 0 && empty($feeInstallment['payment'])) {
                            $status = PaymentStatus::DUE->value;
                        } else if ($due_amount <= 0) {
                            $status = PaymentStatus::PAID->value;
                        } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                            $status = PaymentStatus::PARTIAL->value;
                        }

                        if ($status == PaymentStatus::PAID->value) {
                            $paid_status_count++;
                        } else if ($status == PaymentStatus::PARTIAL->value) {
                            $partial_status_count++;
                        } else {
                            $due_status_count++;
                        }

                        if ($feeInstallment->payment != null && $feeInstallment?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                            $studentFeePaymentRefunds[$feeInstallment->fee_type_id] = [
                                'fee_type_id' => $feeInstallment->payment->fee_type_id,

                                'fee_type_title' => $feeInstallment->feeType->fee_type,

                                'total_paid' => ($studentFeePaymentRefunds[$feeInstallment->fee_type_id]['total_paid'] ?? 0) + $feeInstallment->payment->paid_amount,

                                'total_refund' => (float) $feeInstallment->feeType->payment_refunds()
                                    ->where('student_id', $request->student_id)
                                    ->whereHas('refund_method', function ($query) {
                                        $query->where('refund_status', RefundStatus::APPROVED);
                                    })
                                    ->sum('refund_amount'),
                            ];
                        }
                    }

                    if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                        $payment_status =  PaymentStatus::PAID;
                    } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                        $payment_status = PaymentStatus::PARTIAL;
                    } else {
                        $payment_status = PaymentStatus::DUE;
                    }

                    $studentFeeInstallments[$feeInstallmentId]['total_payable_amount'] = $total_fee_amount - $total_discount_amount;
                    $studentFeeInstallments[$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                    $studentFeeInstallments[$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                    $studentFeeInstallments[$feeInstallmentId]['payment_status'] = $payment_status;
                }

                if (!empty($studentFeePaymentRefunds)) {
                    $studentFeePaymentRefunds = array_filter($studentFeePaymentRefunds, function ($refund) {
                        return $refund['total_paid'] > 0;
                    });
                }
            }
        }

        return Inertia::render('FeeRefund/RefundFee', [
            'classrooms' => $classrooms,
            'banks' => $banks,
            'students' => $students,
            'student' => $student,
            'studentFeeInstallments' => $studentFeeInstallments,
            'feeRefundPaymentModes' => $feeRefundPaymentModes,
            'studentFeePaymentRefunds' => $studentFeePaymentRefunds,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(FeePaymentRefundRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => !empty($input['school_id']) ? $input['school_id'] : getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'],
                'created_by' => auth()->user()->id,
                'refund_mode' => !empty($input['refund_mode']) ? $input['refund_mode'] : "",
                'refund_date' => !empty($input['refund_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['refund_date'])->timezone(getSchoolTimeZone())->toDateString() : "",
                // 'refund_date' => !empty($input['refund_date']) ? Carbon::parse($input['refund_date'])->format('Y-m-d') : "",
                'refund_note' => !empty($input['refund_note']) ? $input['refund_note'] : "",
                'cheque_no' => !empty($input['cheque_no']) ? $input['cheque_no'] : null,
                'cheque_date' => !empty($input['cheque_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['cheque_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                // 'cheque_date' => !empty($input['cheque_date']) ? Carbon::parse($input['cheque_date'])->format('Y-m-d') : null,
                'cheque_amount' => !empty($input['cheque_amount']) ? $input['cheque_amount'] : null,
                'bank_id' => !empty($input['bank_id']) ? $input['bank_id'] : null,
                'branch' => !empty($input['branch']) ? $input['branch'] : "",
                'refund_status' => RefundStatus::APPROVED,
                'status' => Status::ACTIVE,
            );

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('fee_is_refund_seed_no_enabled');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                $nextFeeReceiptNumber = $this->feePaymentRefundMethodRepository->getNextFeeReceiptNumber();

                if ($nextFeeReceiptNumber == null) {
                    $nextFeeReceiptNumber = getSiteSettingData('fee_refund_seed_no')?->value ?? 1;
                }

                $dataArray['receipt_no'] = (int) $nextFeeReceiptNumber;
            }

            // create fee payment refund method
            $refundPaymentMethod = $this->feePaymentRefundMethodRepository->create($dataArray);

            // create fee payment refund
            foreach ($input['fee_payment_refund_array'] as $refundData) {
                $refundDataArray = [
                    'school_id' => !empty($input['school_id']) ? $input['school_id'] : getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'student_id' => $input['student_id'],
                    'fee_type_id' => $refundData['fee_type_id'],
                    'fee_payment_refund_method_id' => $refundPaymentMethod->id,
                    'refund_amount' => $refundData['refund_amount'],
                    'status' => Status::ACTIVE,
                ];

                $this->feePaymentRefundRepository->create($refundDataArray);
            }

            // create fee payment refund activities
            $refundPaymentMethod->activities()->create([
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id,
                'activitiesable_id' => $refundPaymentMethod->id,
                'activitiesable_type' => $refundPaymentMethod->getMorphClass(),
            ]);

            DB::commit();

            return redirect()->back()->with(['message' => 'Refund successfull.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong.']);
        }
    }

    /**
     * Display fee refund report.
     */
    public function refundReport(): Response
    {
        $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getFeeRefundAmountsByRefundStatus(RefundStatus::APPROVED);

        if (count($feePaymentRefunds) > 0) {
            $feePaymentRefunds = $feePaymentRefunds->map(function ($refund) {
                if ($refund?->student?->promotedClassroom != null) {
                    if (!empty($refund['student']['classroom'])) {
                        unset($refund['student']['classroom']);
                    }

                    $refund['student']['classroom_id'] = $refund?->student?->promotedClassroom?->id;
                    $refund['student']['classroom'] = $refund?->student?->promotedClassroom;
                }

                $refund['refund_date'] = !empty($refund['refund_date']) ? Carbon::parse($refund['refund_date'])->format('d-M-Y') : '';
                // $refund['refund_date'] = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $refund['refund_date'])->timezone(getSchoolTimeZone())->toDateString();
                // $refund['refund_date'] = Carbon::parse($refund['refund_date'])->format('d-M-Y');

                return $refund;
            });
        }

        return Inertia::render('FeeRefund/RefundReport', [
            'feePaymentRefunds' => $feePaymentRefunds,
        ]);
    }


    /**
     * cancel fee payment refund.
     */
    public function cancelFeePaymentRefund(CancelFeePaymentRefundRequest $request, FeePaymentRefundMethod $feePaymentRefundMethod)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $feePaymentRefundMethod->update([
                'created_by' => auth()->user()->id,
                'cancel_date' => Carbon::now()->format('Y-m-d'),
                'cancellation_reason' => $input['cancellation_reason'],
                'refund_status' => RefundStatus::CANCELED,
            ]);

            $feePaymentRefundMethod->activities()->create([
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id,
                'activitiesable_id' => $feePaymentRefundMethod->id,
                'activitiesable_type' => $feePaymentRefundMethod->getMorphClass(),
            ]);

            DB::commit();

            return redirect()->back()->with(['message' => 'Refund cancelled successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong.']);
        }
    }

    /**
     * Display cancel refund report.
     */
    public function refundCancelReport(): Response
    {
        $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getFeeRefundAmountsByRefundStatus(RefundStatus::CANCELED);

        if (count($feePaymentRefunds) > 0) {
            $feePaymentRefunds->load(['cancelled_by.user']);

            $feePaymentRefunds = $feePaymentRefunds->map(function ($refund) {
                if ($refund?->student?->promotedClassroom != null) {
                    if (!empty($refund['student']['classroom'])) {
                        unset($refund['student']['classroom']);
                    }

                    $refund['student']['classroom_id'] = $refund?->student?->promotedClassroom?->id;
                    $refund['student']['classroom'] = $refund?->student?->promotedClassroom;
                }

                $refund['refund_date'] = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $refund['refund_date'])->timezone(getSchoolTimeZone())->toDateString();
                $refund['cancel_date'] = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $refund['cancel_date'])->timezone(getSchoolTimeZone())->toDateString();
                // $refund['refund_date'] = Carbon::parse($refund['refund_date'])->format('d-M-Y');
                // $refund['cancel_date'] = Carbon::parse($refund['cancel_date'])->format('d-M-Y');

                return $refund;
            });
        }

        return Inertia::render('FeeRefund/RefundCancelReport', [
            'feePaymentRefunds' => $feePaymentRefunds,
        ]);
    }


    /**
     * adjust fee
     */
    public function adjustFee(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        $students = [];
        $student = null;
        $studentFeeInstallments = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $admissionNo = $request->admission_no ?? null;
            $studentId = $request->student_id ?? null;

            if (!empty($admissionNo)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if (!empty($studentId)) {
                $student = $this->studentRepository->getStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    return [
                        'id' => $student->id,
                        'admission_no' => $student->admission_no,
                        'title' => $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? ""),
                        'classroom_id' => $student->classroom_id,
                        'roll_no' => $rollNo,
                        'class_name_id' => $student?->promotedClassroom?->class_name_id
                    ];
                });
            }

            if ($student?->id != null) {
                $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($student->id);

                $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($student->id);

                foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                    $total_fee_amount = 0;
                    $total_paid_amount = 0;
                    $total_discount_amount = 0;

                    $paid_status_count = 0;
                    $partial_status_count = 0;
                    $due_status_count = 0;

                    foreach ($feeInstallments as $feeInstallment) {
                        $fee_amount = ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);
                        $due_amount = $fee_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($feeInstallment?->payment != null) {
                            $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount');
                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        } elseif ($studentFeeDiscounts->count() > 0) {
                            foreach ($studentFeeDiscounts as $discount) {
                                if ($discount->fee_id === $feeInstallment->fee_id && $discount->fee_type_id === $feeInstallment->fee_type_id) {
                                    if ($discount->is_discount_percentage) {
                                        $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);

                                        $total_discount_amount += $discount_amount;
                                    } else {
                                        $discount_amount = (float) $discount->amount;
                                    }

                                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                }
                            }
                        }

                        $total_fee_amount += $fee_amount;
                        $total_paid_amount += $paid_amount;
                        $total_discount_amount += $discount_amount;

                        if (!isset($studentFeeInstallments[$feeInstallmentId]['fee'])) {
                            $studentFeeInstallments[$feeInstallmentId]['fee'] = [
                                'id' => $feeInstallment->fee_id,
                                'title' => $feeInstallment->fee->title,
                            ];
                        }

                        $status = $feeInstallment?->payment?->payment_status;

                        if ($status == PaymentStatus::CANCELLED->value) {
                            $status = PaymentStatus::DUE->value;
                        }

                        // old
                        // if ($due_amount <= 0) {
                        //     $status = PaymentStatus::PAID->value;
                        // } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                        //     $status = PaymentStatus::PARTIAL->value;
                        // }

                        // new
                        if ($due_amount <= 0 && empty($feeInstallment['payment'])) {
                            $status = PaymentStatus::DUE->value;
                        } else if ($due_amount <= 0) {
                            $status = PaymentStatus::PAID->value;
                        } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                            $status = PaymentStatus::PARTIAL->value;
                        }

                        $payable_amount = $fee_amount - $paid_amount - $discount_amount;

                        if ($status == PaymentStatus::PAID->value) {
                            $payable_amount = $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('payable_amount') ?? 0;
                        }

                        $studentFeeInstallments[$feeInstallmentId]['fee_type_amounts'][] = [
                            'fee_type_id' => $feeInstallment->fee_type_id,
                            'fee_type_title' => $feeInstallment->feeType->fee_type,
                            'is_fee_special' => $feeInstallment->feeType->is_fee_special,
                            'payable_amount' => $payable_amount,
                            'paid_amount' => $paid_amount,
                            'payment_status' => $status ?? PaymentStatus::DUE,
                        ];

                        if ($status === PaymentStatus::PAID->value) {
                            $paid_status_count++;
                        } else if ($status === PaymentStatus::PARTIAL->value) {
                            $partial_status_count++;
                        } else {
                            $due_status_count++;
                        }
                    }

                    if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                        $payment_status =  PaymentStatus::PAID;
                    } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                        $payment_status = PaymentStatus::PARTIAL;
                    } else {
                        $payment_status = PaymentStatus::DUE;
                    }

                    $studentFeeInstallments[$feeInstallmentId]['total_payable_amount'] = $total_fee_amount - $total_paid_amount - $total_discount_amount;
                    $studentFeeInstallments[$feeInstallmentId]['payment_status'] = $payment_status;
                }
            }
        }

        return Inertia::render('FeeRefund/AdjustFee', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'studentFeeInstallments' => $studentFeeInstallments,
        ]);
    }

    /**
     * save student adjust fee
     */
    public function saveAdjustFee(AdjustFeeRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'],
                'from_fee_id' => $input['from_fee_id'],
                'to_fee_id' => $input['to_fee_id'],
                'adjust_date' => !empty($input['adjust_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('adjust_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'adjust_note' => $input['adjust_note'],
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            ];

            // create adjust fee payment
            $adjustFeePayment = $this->adjustFeePaymentRepository->create($dataArray);

            $paymentMethodDataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => $input['student_id'],
                'created_by' => auth()->user()->id,
                'payment_date' => !empty($input['adjust_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('adjust_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                // 'fee_payment_type' => FeePaymentType::FEEINSTALLMENT,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            ];

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextFeeReceiptNumber();

                if ($nextFeeReceiptNumber == null) {
                    $nextFeeReceiptNumber = getSiteSettingData('fee_receipt_number_session_wise_seed_no')?->value ?? 1;
                }

                $paymentMethodDataArray['receipt_no'] = (int) $nextFeeReceiptNumber;
            }

            // create fee payment method
            $feePaymentMethod = $this->feePaymentMethodRepository->create($paymentMethodDataArray);

            // get student discounts
            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($input['student_id']);

            foreach ($input['adjust_amount_array'] as $adjustAmount) {
                $classFeeStudentAmount = $this->classFeeStudentAmountRepository->getStudentAmount($input['student_id'], $input['to_fee_id'], $adjustAmount['fee_type_id']);

                if ($classFeeStudentAmount == null) {
                    return redirect()->back()->with(['error' => 'Fee cannot be adjusted because some fee types do not exists.']);
                }

                $fee_amount = $classFeeStudentAmount->semester != null ? (float) $classFeeStudentAmount->amount * $classFeeStudentAmount->semester : (float) $classFeeStudentAmount->amount;
                $discount_amount = 0;
                $paid_amount = 0;
                $due_amount = $fee_amount;

                if ($classFeeStudentAmount?->payment != null) {
                    $discount_amount = (float) $classFeeStudentAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $paid_amount = (float) $classFeeStudentAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount');
                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                }

                // if ($classFeeStudentAmount?->payment?->payment_status == PaymentStatus::PAID->value) {
                //     return redirect()->back()->with(['error' => 'Fee cannot be adjusted because some of the selected fee types have already been paid.']);
                // }

                if ($due_amount <= 0) {
                    return redirect()->back()->with(['error' => 'Fee cannot be adjusted because some of the selected fee types have already been paid.']);
                }

                $amountDataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'student_id' => $input['student_id'],
                    'adjust_fee_payment_id' => $adjustFeePayment->id,
                    'fee_type_id' => $adjustAmount['fee_type_id'],
                    'adjust_amount' => $adjustAmount['adjust_amount'],
                    'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
                ];

                $this->adjustFeePaymentRepository->createAdjustFeePaymentAmount($amountDataArray);

                $fee_amount = $classFeeStudentAmount?->payment?->due_amount ?? $classFeeStudentAmount->semester != null ? (float) $classFeeStudentAmount->amount * $classFeeStudentAmount->semester : (float) $classFeeStudentAmount->amount;

                $discount_amount = 0;
                $payable_amount = $fee_amount;
                $discount_id = null;

                if ($classFeeStudentAmount?->payment != null) {
                    $fee_amount = $classFeeStudentAmount?->payment?->due_amount;
                    $payable_amount = $classFeeStudentAmount?->payment?->due_amount;
                } elseif ($studentFeeDiscounts->count() > 0) {
                    foreach ($studentFeeDiscounts as $discount) {
                        if ($discount->fee_id === $classFeeStudentAmount->fee_id && $discount->fee_type_id === $classFeeStudentAmount->fee_type_id) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($classFeeStudentAmount->semester != null ? (float) $classFeeStudentAmount->amount * $classFeeStudentAmount->semester : (float) $classFeeStudentAmount->amount);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $discount_id = $discount->id;
                        }
                    }
                }

                $due_amount = ($payable_amount - $discount_amount) - $adjustAmount['adjust_amount'];

                if ($due_amount == 0) {
                    $payment_status =  PaymentStatus::PAID;
                } else if ($due_amount > 0 && $due_amount < $payable_amount) {
                    $payment_status =  PaymentStatus::PARTIAL;
                } else {
                    $payment_status = PaymentStatus::DUE;
                }

                $dataArray = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'fee_paymentable_type' => $classFeeStudentAmount->getMorphClass(),
                    'fee_paymentable_id' => $classFeeStudentAmount->id,
                    'student_id' => $input['student_id'],
                    'discount_id' => $discount_id,
                    'fee_payment_method_id' => $feePaymentMethod->id,
                    'adjust_fee_payment_id' => $adjustFeePayment->id,
                    'fee_id' => $classFeeStudentAmount['fee_id'],
                    'fee_type_id' => $classFeeStudentAmount['fee_type_id'],
                    'amount' => $fee_amount,
                    'payable_amount' => $payable_amount - $discount_amount,
                    'paid_amount' => $adjustAmount['adjust_amount'],
                    'due_amount' => $due_amount,
                    'discount_amount' => $discount_amount,
                    'is_fee_due' => $classFeeStudentAmount?->payment?->payment_status === PaymentStatus::PARTIAL->value,
                    'is_adjusted_fee' => true,
                    'fee_payment_type' => FeePaymentType::FEEINSTALLMENT,
                    'payment_status' => $payment_status,
                    'status' => Status::ACTIVE,
                );

                $this->feePaymentRepository->create($dataArray);
            }

            $adjustFeePayment->activities()->create([
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id,
                'activitiesable_id' => $adjustFeePayment->id,
                'activitiesable_type' => $adjustFeePayment->getMorphClass(),
            ]);

            DB::commit();

            return redirect()->back()->with(['message' => 'Fee adjusted successfully.']);
        } catch (\Throwable $th) {
            Db::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    /**
     * Display adjust fee reports.
     */
    public function adjsutFeeReport(): Response
    {
        $adjustFeePayments = $this->adjustFeePaymentRepository->getActiveAll();

        $adjustFeePayments->load(['adjust_fee_payment_amounts.feeType', 'from_fee', 'to_fee', 'student' => function ($query) {
            $query->with(['classroom', 'promotedClassroom']);
        }]);

        $adjustFeePayments = $adjustFeePayments->map(function ($report) {
            if ($report?->student?->promotedClassroom != null) {
                if (!empty($report['student']['classroom'])) {
                    unset($report['student']['classroom']);
                }

                $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                $report['student']['classroom'] = $report?->student?->promotedClassroom;
            }

            return $report;
        });

        return Inertia::render('FeeRefund/AdjsutFeeReport', [
            'adjustFeePayments' => $adjustFeePayments,
        ]);
    }


    /*
    *  delete adjust fee
    */
    public function deleteAdjsutFee(AdjustFeePayment $adjustFeePayment)
    {
        DB::beginTransaction();

        try {
            $paymentMethodId = $adjustFeePayment->fee_payments->first()->fee_payment_method_id;

            $adjustFeePayment->fee_payments()->delete();

            $this->feePaymentMethodRepository->delete($paymentMethodId);

            $adjustFeePayment->adjust_fee_payment_amounts()->delete();

            $adjustFeePayment->delete();

            DB::commit();

            return redirect()->back()->with(['message' => 'Adjust fee deleted successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /**
     * nullify student fee
     */
    public function feeNullify(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        $students = [];
        $student = null;
        $studentFeeStructureData = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $admissionNo = $request->admission_no ?? null;
            $studentId = $request->student_id ?? null;

            if (!empty($admissionNo) && empty($studentId)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if (!empty($studentId)) {
                $student = $this->studentRepository->getStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;

                // get and format student fee structure
                $studentFeeStructure = $this->feeStructureRepository->getFeeStructureByStudentId($student?->id);

                $fees = $this->feeRepository->getActiveAll()->filter(function ($fee) use ($student) {
                    if ($student->student_status === StudentStatus::NEW->value) {
                        return $fee->is_admission_install == false;
                    }

                    return true;
                });

                foreach ($fees as $fee) {
                    if (count($studentFeeStructure) > 0) {
                        foreach ($studentFeeStructure->groupBy('fee_id') as $feeId => $feeAmountData) {
                            if ($fee->id === $feeId) {
                                $studentFeeStructureData[$fee->id]['fee'] = [
                                    'id' => $feeAmountData->first()->fee->id,
                                    'title' => $feeAmountData->first()->fee->title,
                                ];

                                $total_amount = 0;
                                $total_payable = 0;
                                $total_paid = 0;
                                $total_due = 0;

                                $paid_status_count = 0;
                                $partial_status_count = 0;
                                $due_status_count = 0;

                                foreach ($feeAmountData as $feeAmount) {
                                    if ($feeAmount?->payment != null) {
                                        $discount_amount = (float) $feeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                                    } else {
                                        if ($feeAmount->is_discount_percentage) {
                                            $discount_amount = (float) ($feeAmount->discount_amount / 100) *  (float) $feeAmount->amount;
                                        } else {
                                            $discount_amount = (float) $feeAmount->discount_amount;
                                        }
                                    }

                                    $fee_amount = $feeAmount->semester != null ? (float) $feeAmount->amount * $feeAmount->semester : (float) $feeAmount->amount;
                                    $total_amount += $fee_amount;
                                    $paid_amount = $feeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                                    $total_paid += $paid_amount;
                                    $discount_amount = $discount_amount > (float) $fee_amount ? (float) $fee_amount : (float) $discount_amount;
                                    $payable_amount = $fee_amount - $discount_amount;
                                    $total_payable += $payable_amount;

                                    if ($feeAmount->nullify_fee != null) {
                                        $due_amount = 0;
                                        $status = PaymentStatus::PAID->value;
                                        $paid_status_count++;
                                    } else {
                                        // $due_amount = (float) $feeAmount?->payment?->due_amount ?? 0;

                                        if ($feeAmount->payment != null) {
                                            // $due_amount = (float) $feeAmount->payment->due_amount ?? 0;
                                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                        } else {
                                            $due_amount = $fee_amount;
                                        }

                                        $status = $feeAmount?->payment?->payment_status;

                                        if (
                                            $status === PaymentStatus::CANCELLED->value
                                        ) {
                                            $status = PaymentStatus::DUE->value;
                                        }

                                        // old
                                        // if ($due_amount <= 0) {
                                        //     $status = PaymentStatus::PAID->value;
                                        // } else if ($due_amount > 0 && !empty($feeAmount['payment'])) {
                                        //     $status = PaymentStatus::PARTIAL->value;
                                        // }

                                        //new
                                        if ($due_amount <= 0 && empty($feeAmount['payment'])) {
                                            $status = PaymentStatus::DUE->value;
                                        } else if ($due_amount <= 0) {
                                            $status = PaymentStatus::PAID->value;
                                        } else if ($due_amount > 0 && !empty($feeAmount['payment'])) {
                                            $status = PaymentStatus::PARTIAL->value;
                                        }

                                        if ($status === PaymentStatus::PAID->value) {
                                            $paid_status_count++;
                                        } else if ($status === PaymentStatus::PARTIAL->value) {
                                            $partial_status_count++;
                                        } else {
                                            $due_status_count++;
                                        }
                                    }

                                    $total_due += $due_amount;

                                    $newFeeAmountData = [
                                        'id' => $feeAmount->id,
                                        'class_fee_structure_id' => $feeAmount->class_fee_structure_id,
                                        'class_name_id' => $feeAmount->class_name_id,
                                        'student_id' => $feeAmount->student_id,
                                        'fee_id' => $feeAmount->fee_id,
                                        'fee_type_id' => $feeAmount->fee_type_id,
                                        'fee_type_title' => $feeAmount->feeType->fee_type,
                                        'semester' => $feeAmount->semester,
                                        'amount' => $fee_amount,
                                        'payable_amount' => $payable_amount,
                                        'paid_amount' =>  $paid_amount,
                                        'due_amount' => $due_amount,
                                        'discount_amount' => $discount_amount,
                                        'is_discount_percentage' => $feeAmount->is_discount_percentage,
                                        'is_fee_special' => $feeAmount->is_fee_special,
                                        'payment_status' => $status ?? PaymentStatus::DUE->value,
                                    ];

                                    $studentFeeStructureData[$fee->id]['fee_type_amounts'][] = $newFeeAmountData;
                                }

                                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                                    $payment_status =  PaymentStatus::PAID->value;
                                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                                    $payment_status = PaymentStatus::PARTIAL->value;
                                } else {
                                    $payment_status = PaymentStatus::DUE->value;
                                }

                                $studentFeeStructureData[$fee->id]['total_amount'] = $total_amount;
                                $studentFeeStructureData[$fee->id]['total_payable'] = $total_payable;
                                $studentFeeStructureData[$fee->id]['total_paid'] = $total_paid;
                                $studentFeeStructureData[$fee->id]['total_due'] = $total_due;
                                $studentFeeStructureData[$fee->id]['payment_status'] = $payment_status;
                            }

                            if (!isset($studentFeeStructureData[$fee->id])) {
                                $studentFeeStructureData[$fee->id] = [
                                    'fee' => [
                                        'id' => $fee->id,
                                        'title' => $fee->title,
                                    ],
                                    'fee_type_amounts' => [],
                                    'total_amount' => 0,
                                    'total_payable' => 0,
                                    'total_paid' => 0,
                                    'total_due' => 0,
                                    'payment_status' => PaymentStatus::DUE->value,
                                ];
                            }
                        }
                    } else {
                        foreach ($fees as $fee) {
                            $studentFeeStructureData[$fee->id] = [
                                'fee' => [
                                    'id' => $fee->id,
                                    'title' => $fee->title,
                                ],
                                'fee_type_amounts' => [],
                                'total_amount' => 0,
                                'total_payable' => 0,
                                'total_paid' => 0,
                                'total_due' => 0,
                                'payment_status' => PaymentStatus::DUE->value,
                            ];
                        }
                    }
                }
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    return [
                        'id' => $student->id,
                        'admission_no' => $student->admission_no,
                        'title' => $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? ""),
                        'classroom_id' => $student->classroom_id,
                        'roll_no' => $rollNo,
                        'class_name_id' => $student?->promotedClassroom?->class_name_id
                    ];
                });
            }
        }

        return Inertia::render('FeeRefund/FeeNullify', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'studentFeeStructure' => $studentFeeStructureData,
        ]);
    }


    /*
    * save fee nullify
    */
    public function saveFeeNullify(NullifyFeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $studentFeeInstallments = $this->classFeeStudentAmountRepository->getFeeStructureByStudentIdAndFeeIds($input['student_id'], $input['fee_ids']);

            if ($studentFeeInstallments->count() > 0) {
                $dataArray = [
                    'school_id' =>  getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'student_id' => $input['student_id'],
                    'nullify_date' => Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['nullify_date'])->timezone(getSchoolTimeZone())->toDateString(),
                    // 'nullify_date' => Carbon::parse($input['nullify_date'])->format('Y-m-d'),
                    'nullify_reason' => $input['nullify_reason'],
                    'status' => Status::ACTIVE,
                ];

                $nullifyFee = $this->nullifyFeeRepository->create($dataArray);

                foreach ($studentFeeInstallments as $feeInstallment) {
                    if (
                        ($feeInstallment->payment == null ||
                            ($feeInstallment->payment != null && $feeInstallment->payment->payment_status != PaymentStatus::PAID->value)
                        ) &&
                        $feeInstallment->nullify_fee == null
                    ) {
                        $fee_amount = $feeInstallment->semester != null ? (float)($feeInstallment?->amount ?? 0) * $feeInstallment->semester : (float) $feeInstallment?->amount ?? 0;

                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        if ($feeInstallment->payment == null) {
                            $payable_amount = $fee_amount;
                        } else {
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        $nullified_amount = $payable_amount - $paid_amount;

                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'created_by' => auth()->user()->id,
                            'class_fee_student_amount_id' => $feeInstallment->id,
                            'nullify_fee_id' => $nullifyFee->id,
                            'student_id' => $input['student_id'],
                            'fee_id' => $feeInstallment->fee_id,
                            'fee_type_id' => $feeInstallment->fee_type_id,
                            'fee_amount' => $fee_amount,
                            'payable_amount' => $payable_amount,
                            'paid_amount' =>  $paid_amount,
                            'nullified_amount' => $nullified_amount,
                            'status' => Status::ACTIVE,
                        ];

                        $this->nullifyFeeRepository->createNullifyFeeAmount($dataArray);

                        if ($feeInstallment->payment != null) {
                            $feeInstallment->update([
                                'amount' => $paid_amount + $discount_amount,
                                'semester' => null,
                            ]);
                        } else {
                            $feeInstallment->delete();
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Fee nullified successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /**
     * Display nullify fee reports.
     */
    public function feeNullifyReport(): Response
    {
        $nullifyFeeReports = $this->nullifyFeeRepository->getActiveAll();

        $nullifyFeeReports->map(function ($report) {
            $total_payable = 0;
            $total_paid = 0;
            $total_nullified = 0;

            $newData = [];

            if ($report?->student?->promotedClassroom != null) {
                if (!empty($report['student']['classroom'])) {
                    unset($report['student']['classroom']);
                }

                $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                $report['student']['classroom'] = $report?->student?->promotedClassroom;
            }

            $report->nullify_fee_amounts->each(function ($feeAmountData) use (&$total_payable, &$total_paid, &$total_nullified, &$newData) {
                $total_payable += (float) $feeAmountData->payable_amount;
                $total_paid += (float) $feeAmountData->paid_amount;
                $total_nullified += (float) $feeAmountData->nullified_amount;

                if (!isset($newData[$feeAmountData->fee_type_id])) {
                    $newData[$feeAmountData->fee_type_id] = [
                        'id' => $feeAmountData->fee_type_id,
                        'fee_type_title' => $feeAmountData?->feeType?->fee_type,
                        'payable_amount' => $feeAmountData->payable_amount,
                        'nullified_amount' => $feeAmountData->nullified_amount,
                        'paid_amount' => $feeAmountData->paid_amount,
                    ];
                } else {
                    $newData[$feeAmountData->fee_type_id] = [
                        'id' => $feeAmountData->fee_type_id,
                        'fee_type_title' => $feeAmountData?->feeType?->fee_type,
                        'payable_amount' => $newData[$feeAmountData->fee_type_id]['payable_amount'] + $feeAmountData->payable_amount,
                        'nullified_amount' => $newData[$feeAmountData->fee_type_id]['nullified_amount'] + $feeAmountData->nullified_amount,
                        'paid_amount' => $newData[$feeAmountData->fee_type_id]['paid_amount'] + $feeAmountData->paid_amount,
                    ];
                }
            });

            if ($report?->student?->promotedClassroom != null) {
                if (!empty($report['student']['classroom'])) {
                    unset($report['student']['classroom']);
                }

                $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                $report['student']['classroom'] = $report?->student?->promotedClassroom;
            }

            $report->setRelation('nullify_fee_amounts', $newData);
            $report['nullify_fee_amounts'] = $newData;
            $report['total_payable'] = $total_payable;
            $report['total_paid'] = $total_paid;
            $report['total_nullified'] = $total_nullified;

            return $report;
        });

        return Inertia::render('FeeRefund/FeeNullifyReport', [
            'nullifyFeeReports' => $nullifyFeeReports,
        ]);
    }
}
