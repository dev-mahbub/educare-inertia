<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\LateFineType;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Enums\FeeInstallmentType;
use App\Repositories\IFeeRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ISchoolRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassFeeStudentAmountRepository;

class FeeOnlinePaymentController extends Controller
{
    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IStudentRepository $studentRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IFeePaymentRefundRepository $feePaymentRefundRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IFeeRepository $feeRepository,
        private ITransportRepository $transportRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
    ) {
        // $this->middleware('permission:view fees', ['only' => [
        //     'index',
        // ]]);
        // $this->middleware('permission:add fees', ['only' => [

        // ]]);
        // $this->middleware('permission:edit fees', ['only' => [

        // ]]);
        // $this->middleware('permission:delete fees', ['only' => [

        // ]]);
    }

    /**
     * Online Payment
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // school data
        $school = $this->schoolRepository->getById(getUserSchoolId());

        if ($this->isUserAuthorized()) {
            return redirect()->route('fee_online_payment.student_fee');
        }

        // meta data
        $metaData = [
            'title' => getSiteSettingDataByTypeAndKey('Presence', 'payment_title')?->value ?? '',
            'description' => getSiteSettingDataByTypeAndKey('Presence', 'payment_description')?->value ?? '',
            'keywords' => getSiteSettingDataByTypeAndKey('Presence', 'payment_keyword')?->value ?? ''
        ];

        return Inertia::render('Fee/OnlinePayment', [
            'school' => $school,
            'metaData' => $metaData
        ]);
    }

    /**
     * Student Fee Online Payment
     */
    public function studentFeeOnlinePayment(Request $request): Response|RedirectResponse
    {
        $student = null;

        if ($request->isMethod('GET')) {
            if (!$this->isUserAuthorized()) {
                die();
            }

            // student data
            $student = $this->studentRepository->getStudentByUserId(auth()->user()->id);
        } else {
            // validate form data
            $input = $request->validate(
                [
                    'admission_no'  => ['required', 'string'],
                    'father_phone'  => ['required', 'string']
                ],
                [
                    'admission_no.required'  => 'required',
                    'father_phone.required'  => 'required'
                ]
            );

            // student data
            $student = $this->studentRepository->getStudentByAdmissionNoAndFatherPhone($input['admission_no'], $input['father_phone']);
        }

        if ($student == null) {
            return redirect()->back()->with('error', "Admission number does not exist!");
        }

        $academicYearId = $student->academic_year_id;

        $student->load(['promotedClassroomRaw' => function ($query) use ($academicYearId) {
            $query->where('classroom_students.academic_year_id', $academicYearId);
            $query->whereNull('classroom_students.academic_year_id_from')
                ->whereNull('classroom_students.classroom_id_from')
                ->whereNull('classroom_students.promoted_date_at')
                ->select(
                    'classrooms.id',
                    'classrooms.title'
                );
        }]);

        if ($student?->promotedClassroomRaw != null) {
            if (!empty($student['classroom'])) {
                unset($student['classroom']);
            }

            $student['classroom'] = $student->promotedClassroomRaw;
            $student['classroom_id'] = $student->promotedClassroomRaw?->id;

            unset($student['promotedClassroomRaw']);
        }

        // school data
        $school = $this->schoolRepository->getById(getUserSchoolId());

        // student fee installments
        $studentFeeInstallments = $this->getFeeInstallmentsByStudentId($student->id, $academicYearId);

        // student fee vouchers
        $studentFeeVouchers = $this->getFeeVouchersByStudentId($student->id, $academicYearId);

        // student fee payment reports
        $studentFeePaymentReports = $this->getStudentFeePaymentReports($student->id, $academicYearId);

        return Inertia::render('Fee/StudentOnlinePayment', [
            'student' => $student,
            'school' => $school,
            'studentFeeInstallments' => $studentFeeInstallments,
            'studentFeeVouchers' => $studentFeeVouchers,
            'studentFeePaymentReports' => $studentFeePaymentReports,
        ]);
    }

    /**
     * Check if the user is authenticated and authorized.
     */
    private function isUserAuthorized()
    {
        if (!auth()->check()) {
            return false;
        }

        $user = auth()->user();

        return in_array($user->role, [UserRole::SITE_PARENT->value, UserRole::SITE_STUDENT]);
    }

    /*
    *   get student fee installments
    */
    protected function getFeeInstallmentsByStudentId(int $studentId, int $academicYearId = null)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId, null, $academicYearId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId, null, $academicYearId);

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;
                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;
                $feeTypeAmountDataArray = [];
                $hasTransportFee = false;

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId, null, $academicYearId);

                if (!$hasPayment) {
                    $fee = $groupedFeeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure', null, $academicYearId);

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee', null, $academicYearId);
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee', null, $academicYearId);
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee', null, $academicYearId);

                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                            if ($currentAllocateTransport != null) {
                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                $transportFeeAmount = (float) $currentAllocateTransport?->amount ?? 0;
                            } else {
                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                            }

                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                $studentId,
                                $currentAllocateFeeId,
                                $deallocateTransport?->fee_id,
                                null,
                                $academicYearId
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                    if ($allocateTransportFee->id == $feeInstallmentId) {
                                        if ($transportFee != null) {
                                            $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                            if ($existedTransportFee == null) {
                                                $newTransportFee = collect([
                                                    'id' => null,
                                                    'student_id' => $studentId,
                                                    'fee_id' => $feeInstallmentId,
                                                    'fee_type_id' =>  $transportFee->id,
                                                    'amount' =>  $transportFeeAmount,
                                                    'semester' => null,
                                                    'is_fee_special' => $transportFee->is_fee_special,
                                                    'is_extra_charge' => true,
                                                    'feeType' => $transportFee,
                                                    'fee' => $fee,
                                                    'payment' => null,
                                                    'nullify_fee' => null,
                                                ]);

                                                $groupedFeeInstallments->push($newTransportFee);

                                                $hasTransportFee = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // add late fee in structure if late fine is available
                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                    if ($lateFee != null) {
                        $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();

                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type", null, $academicYearId)?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount", null, $academicYearId)?->value;

                            if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                $currentDate = date("Y-m-d");
                                $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                if ($lateFineType == LateFineType::DAILY->value) {
                                    $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                    $weeksDifference = floor($daysDifference / 7);
                                    $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                    // Extract year and month from the start date
                                    list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                    // Extract year and month from the current date
                                    list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                    // Calculate the difference in months
                                    $startMonths = ($startYear * 12) + $startMonth;
                                    $currentMonths = ($currentYear * 12) + $currentMonth;
                                    $monthsDifference = $currentMonths - $startMonths;

                                    $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                }
                            }

                            $newLateFee = collect([
                                'id' => null,
                                'student_id' => $studentId,
                                'fee_id' => $feeInstallmentId,
                                'fee_type_id' =>  $lateFee->id,
                                'amount' => $late_fee_amount,
                                'semester' => null,
                                'is_fee_special' => $lateFee->is_fee_special,
                                'is_extra_charge' => true,
                                'feeType' => $lateFee,
                                'fee' => $fee,
                                'payment' => null,
                                'nullify_fee' => null,
                            ]);

                            $groupedFeeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($groupedFeeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $total_fee_amount += $fee_amount;
                    $paid_amount = 0;
                    $status = PaymentStatus::DUE->value;

                    if (!empty($feeInstallment['payment'])) {
                        $status = $feeInstallment?->payment?->payment_status;
                    }

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;
                    $discount_id = null;
                    $hasDiscount = false;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                        $status = PaymentStatus::PAID->value;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;

                        if ($discount_amount > 0) {
                            $hasDiscount = true;
                        }
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $discount_id = $discount?->discount_id;
                                $payable_amount = $fee_amount;
                            }
                        }
                    }

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;

                    $is_extra_charge = $feeInstallment['feeType']['installment_type'] == FeeInstallmentType::EXTRACHARGE->value;

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    if ($due_amount <= 0 && empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::DUE->value;
                    } else if ($due_amount <= 0) {
                        $status = PaymentStatus::PAID->value;
                    } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    $feeTypeAmountDataArray[] = [
                        'id' => $feeInstallment['id'],
                        'discount_id' => $discount_id,
                        'fee_id' => $feeInstallment['fee_id'],
                        'fee_type_id' => $feeInstallment['fee_type_id'],
                        'fee_type_title' => $feeInstallment['feeType']['fee_type'],
                        'fee_installment_type' => $feeInstallment['feeType']['installment_type'],
                        'amount' => $fee_amount,
                        'payable_amount' => $payable_amount,
                        'paid_amount' => $paid_amount,
                        'due_amount' => $due_amount,
                        'discount_amount' => $discount_amount,
                        'semester' => (int) $feeInstallment['semester'],
                        'is_fee_special' => $feeInstallment['is_fee_special'],
                        'is_extra_charge' =>  $is_extra_charge,
                        'has_discount' => $hasDiscount,
                        'fee_payment_type' => FeePaymentType::FEEINSTALLMENT->value,
                        'payment_status' => $status,
                    ];

                    if (!isset($feeInstallmentsData[$feeInstallmentId]['fee'])) {
                        $feeInstallmentsData[$feeInstallmentId]['fee'] = [
                            'id' => $feeInstallment['fee_id'],
                            'title' => $feeInstallment['fee']['title'],
                        ];
                    }

                    // count payment status for each fee type
                    if ($status === PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status === PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }
                }

                $total_payable_amount = $total_fee_amount - $total_discount_amount;

                // set payment status for fee installment
                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                $feeInstallmentsData[$feeInstallmentId]['has_transport_fee'] = $hasTransportFee;
                $feeInstallmentsData[$feeInstallmentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_payable_amount'] = $total_payable_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData[$feeInstallmentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
                $feeInstallmentsData[$feeInstallmentId]['fee_payment_type'] = FeePaymentType::FEEINSTALLMENT->value;
                $feeInstallmentsData[$feeInstallmentId]['payment_status'] = $payment_status;
            }
        }

        // sort by key in ascending order
        ksort($feeInstallmentsData);

        return !empty($feeInstallmentsData) ? array_values($feeInstallmentsData) : [];
    }

    /*
    *   get student general vouchers
    */
    protected function getFeeVouchersByStudentId(int $studentId, int $academicYearId = null)
    {
        $feeVouchersData = [];

        $feeVouchers = $this->studentFeeVoucherRepository->getFeeVouchersByStudentId($studentId, null, $academicYearId);

        if (count($feeVouchers) > 0) {
            $feeVouchers = $feeVouchers->map(function ($voucher) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;
                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = $voucher->feeTypeAmounts->map(function ($feeTypeAmount) use (
                    &$total_fee_amount,
                    &$total_paid_amount,
                    &$total_due_amount,
                    &$total_discount_amount,
                    &$paid_status_count,
                    &$partial_status_count,
                    &$due_status_count,
                ) {
                    $total_fee_amount += $feeTypeAmount->amount;
                    $fee_amount = (float) $feeTypeAmount->amount;
                    $payable_amount = $fee_amount;
                    $paid_amount = 0;
                    $due_amount = $fee_amount;
                    $discount_amount = 0;
                    $hasDiscount = false;
                    $status = $feeTypeAmount?->payment?->payment_status;

                    if ($feeTypeAmount->payment != null) {
                        $paid_amount = (float) $feeTypeAmount->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;
                        $discount_amount = (float) $feeTypeAmount->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;

                        if ($discount_amount > 0) {
                            $hasDiscount = true;
                        }
                    }

                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    if ($due_amount <= 0 && empty($feeTypeAmount['payment'])) {
                        $status = PaymentStatus::DUE->value;
                    } else if ($due_amount <= 0) {
                        $status = PaymentStatus::PAID->value;
                    } else if ($due_amount > 0 && !empty($feeTypeAmount['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    if ($status === PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status === PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }

                    return [
                        'id' => $feeTypeAmount->id,
                        'discount_id' => null,
                        'fee_id' => $feeTypeAmount->student_fee_voucher_id,
                        'fee_type_id' => $feeTypeAmount->fee_type_id,
                        'fee_type_title' => $feeTypeAmount->feeType->fee_type,
                        'amount' => $fee_amount,
                        'payable_amount' => $payable_amount,
                        'paid_amount' => $paid_amount,
                        'due_amount' => $due_amount,
                        'discount_amount' => $discount_amount,
                        'semester' => 0,
                        'is_fee_special' => 0,
                        'has_discount' => $hasDiscount,
                        'fee_payment_type' => FeePaymentType::GENERALVOUCHER->value,
                        'payment_status' => $status ?? PaymentStatus::DUE->value,
                    ];
                })->toArray();

                $total_payable_amount = $total_fee_amount - $total_discount_amount;

                $voucherArray = [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                ];

                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                return [
                    'total_fee_amount' => $total_fee_amount,
                    'total_payable_amount' => $total_payable_amount,
                    'total_paid_amount' => $total_paid_amount,
                    'total_due_amount' => $total_due_amount,
                    'total_discount_amount' => $total_discount_amount,
                    'fee_type_amounts' => $feeTypeAmountDataArray,
                    'fee' => $voucherArray,
                    'fee_payment_type' => FeePaymentType::GENERALVOUCHER->value,
                    'payment_status' => $payment_status,
                ];
            })->toArray();

            $feeVouchersData = $feeVouchers;
        }

        return $feeVouchersData;
    }

    /*
    * get student fee payment reports
    */
    protected function getStudentFeePaymentReports(int $studentId, int $academicYearId)
    {
        $paymentReportsData = [];

        $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($studentId, null, $academicYearId);

        $paymentReportsData = $paymentReports?->map(function ($report) {
            $receipt_note = "";
            $total_amount = 0;
            $total_discount = 0;
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;

            // fee payments
            $feePayments = $report?->fee_payments?->map(function ($feePayment) use (&$receipt_note, &$total_amount, &$total_discount, &$total_payable, &$total_paid, &$total_due) {
                // Determine the payment note based on the fee payment type and due status
                $payment_note = '';

                switch ($feePayment->fee_payment_type) {
                    case FeePaymentType::GENERALVOUCHER->value:
                        $payment_note = $feePayment->is_fee_due ? 'due voucher fee' : 'with voucher fee';
                        break;
                    case FeePaymentType::TRANSPORTVOUCHER->value:
                        $payment_note = $feePayment->is_fee_due ? 'due transport fee' : 'with transport fee';
                        break;
                    default:
                        $payment_note = $feePayment->is_fee_due ? 'against previous dues from' : 'for';
                        break;
                }

                $feeTitle = $feePayment->fee->title;

                // Construct receipt note
                if (strlen($receipt_note) <= 0) {
                    $receipt_note = "Payment {$payment_note} {$feeTitle}";
                } elseif (!strpos($receipt_note, $feeTitle)) {
                    $receipt_note .= ", {$payment_note} {$feeTitle}";
                }

                $amount = (float) $feePayment->amount;
                $discount_amount = (float) $feePayment->discount_amount;
                $payable_amount = (float) $feePayment->payable_amount;
                $paid_amount = (float) $feePayment->paid_amount;
                $due_amount = (float) $feePayment->due_amount;

                $total_amount += $amount;
                $total_payable += $discount_amount;
                $total_paid += $payable_amount;
                $total_due += $paid_amount;
                $total_discount += $due_amount;

                return [
                    'fee_title' => $feeTitle,
                    'fee_type_title' => $feePayment->feeType->fee_type,
                    'amount' => $amount,
                    'discount_amount' => $discount_amount,
                    'payable_amount' => $payable_amount,
                    'paid_amount' => $paid_amount,
                    'due_amount' => $due_amount,
                ];
            });

            return [
                'title' => $receipt_note,
                'total_amount' => $total_amount,
                'total_discount' => $total_discount,
                'total_payable' => $total_payable,
                'total_paid' => $total_paid,
                'total_due' => $total_due,
                'payment_mode' => $report->payment_mode,
                'payment_date' => Carbon::parse($report->payment_date)->format('d M, Y'),
                'receipt_no' => $report->receipt_no,
                'is_cancelled' => $report->is_cancelled,
                'fee_payments' => $feePayments
            ];
        })->toArray();

        return $paymentReportsData;
    }
}
