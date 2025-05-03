<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Helpers\Pdf;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\FeeTypeEnum;
use App\Enums\PaymentMode;
use App\Enums\LateFineType;
use App\Enums\RefundStatus;
use Illuminate\Support\Str;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Http\Requests\AssetRequest;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IVoucherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IFeeStructureRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StudentDueFollowUpRequest;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\IStudentDueFollowUpRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Repositories\IStudentFeeVoucherAmountRepository;

class FeeReportController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IStudentRepository $studentRepository,
        private IFeeRepository $feeRepository,
        private ICategoryRepository $categoryRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IFeePaymentRefundRepository $feePaymentRefundRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private ITransportRepository $transportRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private IStudentDueFollowUpRepository $studentDueFollowUpRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IVoucherRepository $voucherRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IStudentFeeVoucherAmountRepository $studentFeeVoucherAmountRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view fees', ['only' => [
            'dashboard',
            'dailyCollection',
            'headWiseDailyCollection',
            'installmentWiseDailyCollection',
            'headWiseDailySummary',
            'yearlyHeadWisePaidSummary',
            'dateWiseClassSummary',
            'completePaidReport',
            'onlineFeeTransaction',
            'yearlyHeadWiseDuesSummary',
            'outstandingDueSummary',
            'getTransportVoucherDueDataByClassroomIds',
            'processGeneralVouchersDueData',
            'completeOutstandingDues',
            'consolidatedDuesReport',
            'feeStudentFollowUp',
            'studentPayments',
            'studentHostelReport',
            'studentHeadWiseFeeReport',
            'groupWiseStudent',
            'studentFeeTypeWisePaidReport',
            'studentLedgerReport',
            'feeAgreement',
            'studentWalletReport',
            'classWiseSummary',
            'feeCancellationReport',
            'summaryReport',
            'dailyOnlineFeePayment',
            'specialFeeTypeReport',
            'guardianWiseDueReport',
            'studentDueReport',
            'studentDailyCollectionReport',
            'studentCompletePaidReport'
        ]]);
        $this->middleware('permission:add fees', ['only' => ['create', 'save', 'saveStudentDueFollowUp']]);
        $this->middleware('permission:edit fees', ['only' => [
            'edit',
            'update',
            'updateInstallmentWiseAmounts',
            'updateFeeTypeInstallmentWiseAmounts',
            'updateHeadWiseDueSummaryData',
            'updateStudentDueFollowUp'
        ]]);
        $this->middleware('permission:delete fees', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function dashboard(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/Dashboard', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display collection report.
     */
    public function dailyCollection(Request $request): Response
    {
        $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
        $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";
        $regFeeReceiptPageSize = getSiteSettingData('fee_reg_receipt_page_size') != null ? getSiteSettingData('fee_reg_receipt_page_size')->value : "Small";
        $regFeeReceiptCopy = getSiteSettingData('fee_reg_receipt_copy') != null ? getSiteSettingData('fee_reg_receipt_copy')->value : "Single";
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $paymentModes = $this->buildOptionsArray(PaymentMode::cases());
        $feeTypesEnum = $this->buildOptionsArray(FeeTypeEnum::cases());

        $dailyFeePaymentReportsData = [];
        $totalPaidByPaymentMode = [];
        $totalPaidByAdmin = [];

        if ($request->isMethod('POST')) {
            $registrationFeeTransformedData = [];

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

            if ($request->fee_type == FeeTypeEnum::REGISTRATION->value || empty($request->fee_type)) {
                // get registration fee payment reports
                $dailyRegistrationFeeReports = $this->feePaymentMethodRepository->getDailyRegistrationFeeReports(
                    $request->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request->payment_mode ?? "",
                    $request->class_name_id ?? null,
                    $request->classroom_id ?? null
                );

                // format registration fee payment report data
                $registrationFeeTransformedData = $dailyRegistrationFeeReports->map(function ($report) {
                    $newData = [
                        'id' => $report->enquiry_id,
                        // 'enquiry_id' => $report->enquiry_id,
                        'student_status' => 'New',
                        'student_name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                        'admission_no' => "",
                        'classroom_title' => $report?->enquiry?->className?->title,
                        'receipt_no' => $report?->receipt_no,
                        'total_amount' => (float) $report->total_amount ?? 0,
                        'total_discount_amount' => 0,
                        'total_payable_amount' => (float) $report->total_amount ?? 0,
                        'total_paid_amount' => (float) $report->total_amount ?? 0,
                        'total_due_amount' => 0,
                        'payment_mode' => $report->payment_mode,
                        'payment_note' => $report->payment_note,
                        'payment_date_time' => $report->created_at->format('d-m-Y H:i:s A'),
                        'created_by' => "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}",
                        'is_registration_fee' => true,
                        'is_cancelled' => false,
                        'fee_types' => ['Registration Fee']
                    ];

                    return collect($newData);
                });
            }

            $feeTransformedData = [];

            if ($request->fee_type == FeeTypeEnum::FEE->value || empty($request->fee_type)) {
                // get fee payment reports
                $dailyFeePaymentReports = $this->feePaymentMethodRepository->getDailyFeePaymentReports(
                    $request?->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request?->payment_mode ?? "",
                    $request?->class_name_id ?? null,
                    $request?->classroom_id ?? null,
                    $request?->cancelled_fee ?? false,
                    $request?->exclude_voucher_fee ?? false
                );

                // store payment fee types title
                $reportFeeTypes = [];

                if ($dailyFeePaymentReports->count() > 0) {
                    $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                        if ($report?->student?->promotedClassroom != null) {
                            if (!empty($report['student']['classroom'])) {
                                unset($report['student']['classroom']);
                            }

                            $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                            $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                            $report['student']['classroom'] = $report?->student?->promotedClassroom;
                        }

                        return $report;
                    });

                    $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                        if ($report->fee_payments->count() > 0) {
                            $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                                $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                            });
                        }
                    });
                }

                // format fee payment report data
                $feeTransformedData = $dailyFeePaymentReports->map(function ($report) use ($reportFeeTypes) {
                    $date = Carbon::parse($report->payment_date)->format('d-m-Y');
                    $time = $report->created_at->format('H:i:s A');

                    $newData = [
                        'id' => $report->id,
                        'student_status' => $report?->student?->student_status,
                        'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                        'admission_no' => $report?->student?->admission_no,
                        'classroom_title' => $report?->student?->classroom?->title,
                        'receipt_no' => $report->receipt_no,
                        'total_amount' =>  (float) $report->total_amount,
                        'total_discount_amount' =>  (float) $report->total_discount_amount,
                        'total_payable_amount' => (float) $report->total_payable_amount,
                        'total_paid_amount' => (float) $report->total_paid_amount,
                        'total_due_amount' =>  (float) $report->total_due_amount,
                        'payment_mode' =>  $report->payment_mode,
                        'payment_note' =>  $report->payment_note,
                        'payment_date_time' => "{$date} {$time}",
                        'created_by' => "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}",
                        'is_registration_fee' => false,
                        'is_cancelled' => $report->is_cancelled,
                        'fee_types' => array_unique($reportFeeTypes[$report->id])
                    ];

                    return collect($newData);
                });
            }

            // merge registration fee payment report and fee installment payment report
            $dailyFeePaymentReportsData = collect($feeTransformedData)->merge($registrationFeeTransformedData)->all();

            // filter report to take only payments that has discount
            if (!empty($request->concession) && $request->concession == true) {
                $dailyFeePaymentReportsData = collect($dailyFeePaymentReportsData)->filter(function ($report) {
                    return $report['total_discount_amount'] > 0;
                });
            }

            if (count($dailyFeePaymentReportsData) > 0) {
                // calculate total paid by payment mode
                foreach (collect($dailyFeePaymentReportsData)->groupBy('payment_mode') as $paymentMode =>  $reports) {
                    if (empty($totalPaidByPaymentMode[$paymentMode])) {
                        $totalPaidByPaymentMode[$paymentMode]['payment_mode'] = $paymentMode;
                        $totalPaidByPaymentMode[$paymentMode]['total_paid_amount'] = $reports->sum('total_paid_amount');
                    }
                }

                // calculate total paid by taken by
                foreach (collect($dailyFeePaymentReportsData)->groupBy('created_by') as $createdBy =>  $reports) {
                    if (empty($totalPaidByAdmin[$createdBy])) {
                        $totalPaidByAdmin[$createdBy]['created_by'] = $createdBy;
                        $totalPaidByAdmin[$createdBy]['total_paid_amount'] = $reports->sum('total_paid_amount');
                    }
                }
            }

            if (!empty($dailyFeePaymentReportsData)) {
                $dailyFeePaymentReportsData = collect($dailyFeePaymentReportsData)->sortBy('receipt_no');
            }
        }

        return Inertia::render('FeeReport/DailyCollection', [
            'feeTypesEnum' => $feeTypesEnum,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'paymentModes' => $paymentModes,
            'dailyFeePaymentReports' => $dailyFeePaymentReportsData,
            'totalPaidByPaymentMode' => $totalPaidByPaymentMode,
            'totalPaidByAdmin' => $totalPaidByAdmin,
            'feeReceiptPageSize' => $feeReceiptPageSize,
            'feeReceiptCopy' => $feeReceiptCopy,
            'regFeeReceiptPageSize' => $regFeeReceiptPageSize,
            'regFeeReceiptCopy' => $regFeeReceiptCopy,
        ]);
    }

    // Reusable function to build enum options array
    private function buildOptionsArray($cases)
    {
        $options = [];

        foreach ($cases as $case) {
            $options[] = ['id' => $case->value, 'title' => $case->value];
        }

        return $options;
    }

    /**
     * Display collection report.
     */
    public function headWiseDailyCollection(Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $paymentModes = $this->buildOptionsArray(PaymentMode::cases());
        $feeTypes = $this->feeTypeRepository->getActiveAll()->map(function ($feeType) {
            return [
                'id' => $feeType->id,
                'title' => $feeType->fee_type,
            ];
        });

        $studentFeeReportsData = [];
        $payment_fee_types = [];

        if ($request->isMethod('POST')) {
            $filterArgs = [
                'sort_by' => $request->sort_by,
                'voucher' => $request->voucher,
                'cancelled_fee' => $request->cancelled_fee,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'payment_mode' => $request->payment_mode,
                'fee_type_id' => $request->fee_type_id,
                'class_name_id' => $request->class_name_id,
            ];

            $studentFeeReports = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentReports(...$filterArgs);

            if ($studentFeeReports->count() > 0) {
                $studentFeeReports = $studentFeeReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    return $report;
                });

                $studentFeeReportsData = $studentFeeReports->groupBy('payment_date')
                    ->map(function ($groupedReports) use (&$payment_fee_types) {
                        $grand_total_amount = 0;
                        $grand_total_payable = 0;
                        $grand_total_paid = 0;
                        $grand_total_due = 0;
                        $grand_total_discount = 0;
                        $payment_fee_types_amount = [];

                        $groupedReports = $groupedReports->map(function ($report) use (
                            &$payment_fee_types,
                            &$payment_fee_types_amount,
                            &$grand_total_amount,
                            &$grand_total_payable,
                            &$grand_total_paid,
                            &$grand_total_due,
                            &$grand_total_discount
                        ) {
                            $total_amount = 0;
                            $total_payable = 0;
                            $total_paid = 0;
                            $total_due = 0;
                            $total_discount = 0;
                            $receipt_note = "";

                            if (count($report->fee_payments) > 0) {
                                $report->fee_payments->each(function ($feePayment) use (
                                    &$payment_fee_types,
                                    &$payment_fee_types_amount,
                                    &$total_amount,
                                    &$total_payable,
                                    &$total_paid,
                                    &$total_due,
                                    &$total_discount,
                                    &$receipt_note
                                ) {
                                    // calculate fee type paid amount for grand total
                                    if (isset($payment_fee_types[$feePayment->feeType->fee_type])) {
                                        $payment_fee_types[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                    } else {
                                        $payment_fee_types[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                    }

                                    // calculate fee type paid amount for each date group
                                    if (isset($payment_fee_types_amount[$feePayment->feeType->fee_type])) {
                                        $payment_fee_types_amount[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                    } else {
                                        $payment_fee_types_amount[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                    }

                                    // if ($feePayment->fee_payment_type == FeePaymentType::GENERALVOUCHER->value) {
                                    //     if (strlen($receipt_note) <= 0) {
                                    //         if ($feePayment->is_fee_due) {
                                    //             $receipt_note = "Payment with due voucher fee {$feePayment->fee->title}";
                                    //         } else {
                                    //             $receipt_note = "Payment with voucher fee {$feePayment->fee->title}";
                                    //         }
                                    //     } else {
                                    //         if (!strpos($receipt_note, $feePayment->fee->title)) {
                                    //             $receipt_note .=  ", {$feePayment->fee->title}";
                                    //         }
                                    //     }
                                    // } else if ($feePayment->fee_payment_type == FeePaymentType::TRANSPORTVOUCHER->value) {
                                    //     if (strlen($receipt_note) <= 0) {
                                    //         if ($feePayment->is_fee_due) {
                                    //             $receipt_note = "Payment with due transport fee {$feePayment->fee->title}";
                                    //         } else {
                                    //             $receipt_note = "Payment with transport fee {$feePayment->fee->title}";
                                    //         }
                                    //     } else {
                                    //         if (!strpos($receipt_note, $feePayment->fee->title)) {
                                    //             $receipt_note .=  ", {$feePayment->fee->title}";
                                    //         }
                                    //     }
                                    // } else {
                                    //     if (strlen($receipt_note) <= 0) {
                                    //         if ($feePayment->is_fee_due) {
                                    //             $receipt_note = "Payment against previous dues from {$feePayment->fee->title}";
                                    //         } else {
                                    //             $receipt_note = "Payment for {$feePayment->fee->title}";
                                    //         }
                                    //     } else {
                                    //         if (!strpos($receipt_note, $feePayment->fee->title)) {
                                    //             $receipt_note .=  ", {$feePayment->fee->title}";
                                    //         }
                                    //     }
                                    // }

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

                                    // Construct receipt note
                                    if (strlen($receipt_note) <= 0) {
                                        $receipt_note = "Payment {$payment_note} {$feePayment->fee->title}";
                                    } elseif (!strpos($receipt_note, $feePayment->fee->title)) {
                                        $receipt_note .= ", {$payment_note} {$feePayment->fee->title}";
                                    }

                                    $total_amount += (float) $feePayment->amount;
                                    $total_payable += (float) $feePayment->payable_amount;
                                    $total_paid += (float) $feePayment->paid_amount;
                                    $total_due += (float) $feePayment->due_amount;
                                    $total_discount += (float) $feePayment->discount_amount;
                                });
                            }

                            $report['receipt_note'] = $receipt_note;
                            $report['total_amount'] = $total_amount;
                            $report['total_payable'] = $total_payable;
                            $report['total_paid'] = $total_paid;
                            $report['total_due'] = $total_due;
                            $report['total_discount'] = $total_discount;

                            $grand_total_amount += $total_amount;
                            $grand_total_payable += $total_payable;
                            $grand_total_paid += $total_paid;
                            $grand_total_due += $total_due;
                            $grand_total_discount += $total_discount;

                            return $report;
                        });

                        return collect([
                            'reports' => $groupedReports,
                            'grand_total_amount' => $grand_total_amount,
                            'grand_total_payable' => $grand_total_payable,
                            'grand_total_paid' => $grand_total_paid,
                            'grand_total_due' => $grand_total_due,
                            'grand_total_discount' => $grand_total_discount,
                            'payment_fee_types' => $payment_fee_types_amount
                        ]);
                    })->toArray();
            }
        }

        return Inertia::render('FeeReport/HeadWiseDailyCollection', [
            'classNames' => $classNames,
            'paymentModes' => $paymentModes,
            'feeTypes' => $feeTypes,
            'studentFeeReports' => $studentFeeReportsData,
            'payment_fee_types' => $payment_fee_types,
        ]);
    }

    /**
     * Display collection report.
     */
    public function installmentWiseDailyCollection(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/InstallmentWiseDailyCollection', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display collection report.
     */
    public function headWiseDailySummary(Request $request): Response
    {
        $paymentModes = $this->buildOptionsArray(PaymentMode::cases());
        $dailyFeePaymentSummary = [];
        $payment_fee_types_summary = [];
        $payment_mode_types_summary = [];

        if ($request->isMethod('POST')) {
            $dailySummaryData = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentSummary($request->payment_mode, $request->start_date, $request->end_date);

            $dailyFeePaymentSummary = $dailySummaryData->groupBy('payment_date')
                ->map(function ($groupedReports) use (&$payment_fee_types_summary, &$payment_mode_types_summary) {
                    $grand_total_paid = 0;
                    $grand_total_discount = 0;
                    $payment_fee_types = [];
                    $payment_mode_types = [];

                    $groupedReports->each(function ($report) use (
                        &$payment_fee_types_summary,
                        &$payment_mode_types_summary,
                        &$payment_fee_types,
                        &$payment_mode_types,
                        &$grand_total_paid,
                        &$grand_total_discount
                    ) {
                        $total_paid = 0;
                        $total_discount = 0;

                        if (count($report->fee_payments) > 0) {
                            $report->fee_payments->each(function ($feePayment) use (
                                &$payment_fee_types_summary,
                                &$payment_mode_types_summary,
                                &$payment_fee_types,
                                &$payment_mode_types,
                                &$total_paid,
                                &$total_discount,
                                $report
                            ) {
                                // calculate fee type paid amount for grand total
                                if (isset($payment_fee_types_summary[$feePayment->feeType->fee_type])) {
                                    $payment_fee_types_summary[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $payment_fee_types_summary[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }

                                // calculate fee type paid amount for date wise total
                                if (isset($payment_fee_types[$feePayment->feeType->fee_type])) {
                                    $payment_fee_types[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $payment_fee_types[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }

                                // calculate payment mode paid amount for grand total
                                if (isset($payment_mode_types_summary[$report->payment_mode])) {
                                    $payment_mode_types_summary[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $payment_mode_types_summary[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }

                                // calculate payment mode paid amount for date wise total
                                if (isset($payment_mode_types[$report->payment_mode])) {
                                    $payment_mode_types[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $payment_mode_types[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }

                                $total_paid += (float) $feePayment->paid_amount;
                                $total_discount += (float) $feePayment->discount_amount;
                            });
                        }

                        $grand_total_paid += $total_paid;
                        $grand_total_discount += $total_discount;
                    });

                    return collect([
                        'total_paid' => $grand_total_paid,
                        'total_discount' => $grand_total_discount,
                        'payment_fee_types' => $payment_fee_types,
                        'payment_mode_types' => $payment_mode_types,
                        'payment_date' => Carbon::parse($groupedReports->first()->payment_date)->format('d-M-Y'),
                    ]);
                })->toArray();
        }

        return Inertia::render('FeeReport/HeadWiseDailySummary', [
            'paymentModes' => $paymentModes,
            'dailyFeePaymentSummary' => $dailyFeePaymentSummary,
            'payment_fee_types' => $payment_fee_types_summary,
            'payment_mode_types' => $payment_mode_types_summary,
        ]);
    }

    /**
     * Display yearly head wise paid report.
     */
    public function yearlyHeadWisePaidSummary(Request $request): Response
    {
        $paymentModes = $this->buildOptionsArray(PaymentMode::cases());
        $yearlyFeePaymentSummary = [];
        $month_wise_amounts = [];

        if ($request->isMethod('POST')) {
            $yearlySummaryData = $this->feePaymentMethodRepository->getHeadWiseYearlyFeePaymentSummary($request->payment_mode, $request->start_date, $request->end_date);

            $fee_type_month_wise_amounts = [];
            $fee_type_refund_amounts = [];

            $yearlySummaryData->each(function ($yearlySummary) use (
                &$month_wise_amounts,
                &$yearlyFeePaymentSummary,
                &$fee_type_month_wise_amounts,
                &$fee_type_refund_amounts,
            ) {
                foreach ($yearlySummary->fee_payments as $feePayment) {
                    // calculate month wise paid amount for grand total
                    $groupDate = Carbon::parse($yearlySummary->payment_date)->format('M-Y');

                    if (isset($month_wise_amounts[$groupDate])) {
                        $month_wise_amounts[$groupDate] += (float) $feePayment->paid_amount;
                    } else {
                        $month_wise_amounts[$groupDate] = (float) $feePayment->paid_amount;
                    }

                    // calculate  month wise paid amount for date wise total
                    if (isset($fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate])) {
                        $fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate] += (float) $feePayment->paid_amount;
                    } else {
                        $fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate] = (float) $feePayment->paid_amount;
                    }

                    $yearlyFeePaymentSummary[$feePayment->fee_type_id] = [
                        'fee_type_id' => $feePayment->fee_type_id,
                        'fee_type_title' => $feePayment->feeType->fee_type,
                    ];

                    // calculate total refund of each fee type
                    $refund_amount = $this->feePaymentRefundRepository->getPaymentFeeTypeTotalRefund($feePayment->student_id, $feePayment->fee_type_id) ?? 0;

                    if (isset($fee_type_refund_amounts[$feePayment->fee_type_id])) {
                        $fee_type_refund_amounts[$feePayment->fee_type_id] += $refund_amount;
                    } else {
                        $fee_type_refund_amounts[$feePayment->fee_type_id] = $refund_amount;
                    }
                }
            });

            foreach ($yearlyFeePaymentSummary as $feeTypeId => $yearlyFeePayment) {
                $total_paid = 0;

                foreach ($fee_type_month_wise_amounts[$feeTypeId] as $amount) {
                    $total_paid += $amount;
                }

                $yearlyFeePaymentSummary[$feeTypeId]['month_wise_amounts'] = $fee_type_month_wise_amounts[$feeTypeId];
                $yearlyFeePaymentSummary[$feeTypeId]['total_paid'] = $total_paid;
                $yearlyFeePaymentSummary[$feeTypeId]['total_refund'] = $fee_type_refund_amounts[$feeTypeId];
            }
        }

        return Inertia::render('FeeReport/YearlyHeadWisePaidSummary', [
            'paymentModes' => $paymentModes,
            'yearlyFeePaymentSummary' => $yearlyFeePaymentSummary,
            'month_wise_amounts' => $month_wise_amounts,
        ]);
    }

    /**
     * Display date wise report.
     */
    public function dateWiseClassSummary(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveIdTitle();
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeCollectionSummary = [];

        if ($request->isMethod('POST')) {
            if (
                !empty($request->filter_type) &&
                ($request->filter_type === "date_wise" && (!empty($request->start_date) && !empty($request->end_date))) ||
                ($request->filter_type === "installment_wise" && (!empty($request->from_fee_id) && !empty($request->to_fee_id)))
            ) {
                $feeCollectionSummaryData = $this->feePaymentMethodRepository->getDateAndInstallmentWiseFeePaymentSummary(
                    $request->filter_type,
                    $request->start_date,
                    $request->end_date,
                    $request->from_fee_id,
                    $request->to_fee_id
                );

                if ($feeCollectionSummaryData->count() > 0) {
                    $classWiseData = [];
                    $tempClassWiseData = [];
                    $installmentWiseData = [];
                    $tempInstallmentWiseData = [];

                    $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($report) {
                        if ($report->fee_payments->count() > 0) {
                            $report['fee_payments'] = $report->fee_payments->map(function ($payment) {
                                if ($payment?->student?->promotedClassroom != null) {
                                    $payment['student']['classroom_id'] = $payment?->student?->promotedClassroom?->id;
                                }

                                return $payment;
                            });
                        }

                        return $report;
                    });

                    foreach ($feeCollectionSummaryData as $summaryData) {
                        if (count($summaryData->fee_payments) > 0) {
                            foreach ($summaryData->fee_payments as $feePayment) {
                                if ($feePayment->fee_payment_type == FeePaymentType::FEEINSTALLMENT->value) {
                                    if (isset($tempInstallmentWiseData[$feePayment->fee_id])) {
                                        $tempInstallmentWiseData[$feePayment->fee_id] += (float) $feePayment->paid_amount ?? 0;
                                    } else {
                                        $tempInstallmentWiseData[$feePayment->fee_id] = (float) $feePayment->paid_amount ?? 0;
                                    }
                                }

                                if (isset($tempClassWiseData[$feePayment->student->classroom_id])) {
                                    $tempClassWiseData[$feePayment->student->classroom_id] += (float) $feePayment->paid_amount ?? 0;
                                } else {
                                    $tempClassWiseData[$feePayment->student->classroom_id] = (float) $feePayment->paid_amount ?? 0;
                                }
                            }
                        }
                    }

                    foreach ($classrooms as $classroom) {
                        $classWiseData[$classroom->title] = $tempClassWiseData[$classroom->id] ?? 0;
                    }

                    if ($request->filter_type === "installment_wise") {
                        $fees->filter(function ($fee) use ($request) {
                            return $fee->id >= $request->from_fee_id;
                        })->map(function ($fee) use (&$installmentWiseData, $tempInstallmentWiseData) {
                            $installmentWiseData[$fee->title] = $tempInstallmentWiseData[$fee->id] ?? 0;
                        });
                    } else {
                        $fees->filter(function ($fee) use ($tempInstallmentWiseData) {
                            return in_array($fee->id, array_keys($tempInstallmentWiseData));
                        })->map(function ($fee) use (&$installmentWiseData, $tempInstallmentWiseData) {
                            $installmentWiseData[$fee->title] = $tempInstallmentWiseData[$fee->id] ?? 0;
                        });
                    }

                    $feeCollectionSummary['class_wise_data'] = $classWiseData;
                    $feeCollectionSummary['installment_wise_data'] = $installmentWiseData;
                }
            }
        }

        return Inertia::render('FeeReport/DateWiseClassSummary', [
            'fees' => $fees,
            'feeCollectionSummary' => $feeCollectionSummary
        ]);
    }

    /**
     * Display complete paid  report.
     */
    public function completePaidReport(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveIdTitle();
        $classrooms = $this->classroomRepository->getActiveAll();
        $completePaidReport = [];

        if ($request->isMethod('POST')) {
            $studentIds = [];

            if (!empty($request->classroom_id)) {
                $studentIds = $this->studentRepository->getStudentsByClassroomId($request->classroom_id)
                    ->pluck('id')
                    ->toArray();
            }

            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                $completePaidReportData = $this->feePaymentRepository->getCompletePaidReports(
                    $request->classroom_id,
                    $studentIds,
                    $request->from_fee_id,
                    $request->to_fee_id
                );

                if (count($completePaidReportData) > 0) {
                    $completePaidReportData = $completePaidReportData->map(function ($report) {
                        if ($report?->student?->promotedClassroom != null) {
                            if (!empty($report['student']['classroom'])) {
                                unset($report['student']['classroom']);
                            }

                            $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                            $report['student']['classroom'] = $report?->student?->promotedClassroom;
                        }
                        return $report;
                    });

                    foreach ($completePaidReportData->groupBy('student_id') as $studentId =>  $studentReports) {
                        $student = $studentReports->first()?->student;
                        $classroomId = $student->classroom_id;

                        $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        }]);

                        foreach ($studentReports->groupBy('fee_id') as $feeId => $reports) {
                            $total_paid_amount = 0;
                            $isCompletePaid = true;

                            $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByFeeIdAndStudentId($studentId, $feeId);

                            if (count($feeInstallments) > 0) {
                                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeId);

                                $total_transport_fee = 0;
                                $total_late_fee = 0;

                                if (!$hasPayment) {
                                    $fee = $reports->first()->fee;

                                    // calculte transport fee if transport fee setting set to fee
                                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                            if ($currentAllocateTransport != null) {
                                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                            } else {
                                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                            }

                                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                                $studentId,
                                                $currentAllocateFeeId,
                                                $deallocateTransport?->fee_id
                                            );

                                            if (count($allocateTransportFees) > 0) {
                                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                                    if ($allocateTransportFee->id == $feeId) {
                                                        if ($transportFee != null) {
                                                            $existedTransportFee = $reports->where('fee_type_id', $transportFee->id)->first();

                                                            if ($existedTransportFee == null) {
                                                                $total_transport_fee += $transportFeeAmount;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // calculate late fee
                                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                                    if ($lateFee != null) {
                                        $existedLateFee = $reports->where('fee_type_id', $lateFee->id)->first();
                                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                            $late_fee_amount = 0;

                                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                            $lateFineStartDate = $fee->last_pay_date_at;
                                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

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

                                            $total_late_fee += $late_fee_amount;
                                        }
                                    }
                                }

                                foreach ($feeInstallments as $installment) {
                                    $semester = $installment?->smeseter ?? 1;
                                    $fee_amount = ((float) $installment?->amount ?? 0) * $semester;
                                    $payable_amount =  $fee_amount + $total_late_fee + $total_transport_fee;

                                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;

                                    $total_paid_amount += $paid_amount;

                                    if ($payable_amount != ($paid_amount + $discount_amount)) {
                                        $isCompletePaid = false;
                                        break;
                                    }
                                }
                            }

                            if ($isCompletePaid) {
                                $completePaidReport[$studentId]['student'] = $student->toArray();

                                if (!empty($completePaidReport[$studentId]['total_paid'])) {
                                    $completePaidReport[$studentId]['total_paid'] += $total_paid_amount;
                                } else {
                                    $completePaidReport[$studentId]['total_paid'] = $total_paid_amount;
                                }
                            }
                        }
                    }
                }
            }
        }

        return Inertia::render('FeeReport/CompletePaidReport', [
            'fees' => $fees,
            'classrooms' => $classrooms,
            'completePaidReport' => $completePaidReport
        ]);
    }

    /**
     * Display collection report.
     */
    public function onlineFeeTransaction(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/OnlineFeeTransaction', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display yearly head wise dues report.
     */
    public function yearlyHeadWiseDuesSummary(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveIdTitle();
        $headWiseDueSummary = [];
        $installmentWiseAmounts = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                // get transport fee setting
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                $feeInstallments = $this->classFeeStudentAmountRepository->getYearlyHeadWiseDueSummary($request->from_fee_id, $request->to_fee_id);

                $feeTypeInstallmentWiseAmounts = [];

                if (count($feeInstallments) > 0) {
                    $studentFeeDiscounts = [];

                    foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                        $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                        foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                            $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                            if (!$hasPayment) {
                                $fee = $groupedFeeInstallments->first()->fee;
                                // add transport fee in structure if transport fee setting set to fee
                                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                    $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                    $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                    $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                    if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                        if ($currentAllocateTransport != null) {
                                            $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                            $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                        } else {
                                            $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                            $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                        }

                                        $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                            $studentId,
                                            $currentAllocateFeeId,
                                            $deallocateTransport?->fee_id
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
                                                                'fee_payments' => collect([]),
                                                                'nullify_fee' => null,
                                                                'student' => $studentFeeInstallments->first()->student,
                                                            ]);

                                                            $feeInstallments->push($newTransportFee);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // to calculate fee installments due
                    foreach ($feeInstallments as $feeInstallment) {
                        // check if installment has nullify fee. if fee nullified then exclude the fee
                        if (empty($feeInstallment['nullify_fee'])) {
                            $fee_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                            $due_amount = $fee_amount;
                            $paid_amount = 0;
                            $discount_amount = 0;

                            // check if installment has payment. if has payment then update due amount
                            // if (!empty($feeInstallment['payment']) && $feeInstallment['payment']['payment_status'] != PaymentStatus::CANCELLED->value) {
                            if (!empty($feeInstallment['payment'])) {
                                $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                // $due_amount = (float) $feeInstallment['payment']['due_amount'] ?? 0;
                            } elseif (!empty($studentFeeDiscounts[$feeInstallment['student_id']])) {
                                foreach ($studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                                    if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                        if ($discount->is_discount_percentage) {
                                            $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                        } else {
                                            $discount_amount = (float) $discount->amount;
                                        }

                                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                        // $due_amount = $due_amount - $discount_amount;
                                    }
                                }
                            }

                            // calculate and update fee amount installment wise
                            $installmentWiseAmounts = $this->updateInstallmentWiseAmounts($installmentWiseAmounts, $feeInstallment['fee']['title'], $due_amount);

                            // calculate and update fee amount installment wise
                            $feeTypeInstallmentWiseAmounts = $this->updateFeeTypeInstallmentWiseAmounts($feeTypeInstallmentWiseAmounts, $feeInstallment['fee_type_id'], $feeInstallment['fee']['title'], $due_amount);

                            // update headWiseSummary data
                            $headWiseDueSummary = $this->updateHeadWiseDueSummaryData($headWiseDueSummary, $feeInstallment['fee_type_id'], $feeInstallment['feeType']['fee_type']);
                        }
                    }
                }

                // to calculate general voucher and transport voucher due
                if (!empty($request->include_voucher) && $request->include_voucher == true) {
                    // general vouchers
                    $generalVouchers = $this->studentFeeVoucherRepository->getHeadWiseDueFeeVouchers();

                    // if has any general voucher then calculate due and merge data with headWiseDueSummary
                    if (count($generalVouchers) > 0) {
                        foreach ($generalVouchers as $generalVoucher) {
                            foreach ($generalVoucher->feeTypeAmounts as $feeTypeAmount) {
                                $voucher_amount = (float) $feeTypeAmount->amount ?? 0;
                                $voucher_due_amount = $voucher_amount;
                                $voucher_discount_amount = 0;
                                $voucher_paid_amount = 0;

                                // check if voucher has payment. if has payment then update due amount
                                // if ($feeTypeAmount?->payment != null && $feeTypeAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                                if ($feeTypeAmount?->payment != null) {
                                    $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                    $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                    $voucher_due_amount = $voucher_amount - $voucher_discount_amount - $voucher_paid_amount;
                                    // $voucher_due_amount = (float) $feeTypeAmount?->payment?->due_amount ?? 0;
                                }

                                // calculate and update fee amount installment wise
                                $installmentWiseAmounts = $this->updateInstallmentWiseAmounts($installmentWiseAmounts, "Voucher", $voucher_due_amount);

                                // calculate and update fee amount installment wise
                                $feeTypeInstallmentWiseAmounts = $this->updateFeeTypeInstallmentWiseAmounts($feeTypeInstallmentWiseAmounts, $feeTypeAmount->fee_type_id, "Voucher", $voucher_due_amount);

                                // update headWiseSummary data
                                $headWiseDueSummary = $this->updateHeadWiseDueSummaryData($headWiseDueSummary, $feeTypeAmount->fee_type_id, $feeTypeAmount->feeType->fee_type);
                            }
                        }
                    }

                    // transport voucher

                    $students = $this->studentRepository->getActiveNameAndId();

                    if ($students->count() > 0) {
                        $students->load(['due_follow_ups', 'classroom', 'father']);

                        foreach ($students as $student) {
                            // get current allocation
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                            // get previous allocation
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                            // get deallocation
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                            $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                            $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                            $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                            $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                            $allocateTransportVouchers = [];

                            // if transport fee seetinf is voucher then get transport voucher
                            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                                $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $student->id,
                                    $currentAllocateVoucherId,
                                    $deallocateVoucherId
                                );
                            }

                            $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                                $student->id,
                                $previousAllocateTransportId,
                                $previousAllocationVoucherId,
                                $deallocateVoucherId,
                                $transportFeeStructureSetting?->value,
                                'voucher'
                            );

                            $transportFeeType = $this->feeTypeRepository->getTransportFeeType();

                            if (!empty($allocateTransport)) {
                                foreach ($allocateTransport as $allocate) {
                                    $fee_amount = (float) $allocate->amount;
                                    $discount_amount = 0;
                                    $paid_amount = 0;
                                    $due_amount = $fee_amount;

                                    if (
                                        // $allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value
                                        $allocate->payment != null
                                    ) {
                                        $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                        $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                        // $due_amount = (float) $allocate->payment->due_amount ?? 0;
                                    }

                                    // calculate and update fee amount installment wise
                                    $installmentWiseAmounts = $this->updateInstallmentWiseAmounts($installmentWiseAmounts, "Voucher", $due_amount);

                                    // calculate and update fee amount installment wise
                                    $feeTypeInstallmentWiseAmounts = $this->updateFeeTypeInstallmentWiseAmounts($feeTypeInstallmentWiseAmounts, $transportFeeType->id, "Voucher", $due_amount);

                                    // update headWiseSummary data
                                    $headWiseDueSummary = $this->updateHeadWiseDueSummaryData($headWiseDueSummary, $transportFeeType->id, $transportFeeType->fee_type);
                                }
                            }

                            if (
                                count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                            ) {
                                if ($currentAllocateTransport != null) {
                                    $fee_amount = (float) $currentAllocateTransport->amount;
                                } else {
                                    $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $due_amount = $fee_amount;

                                foreach ($allocateTransportVouchers as $voucher) {
                                    // calculate and update fee amount installment wise
                                    $installmentWiseAmounts = $this->updateInstallmentWiseAmounts($installmentWiseAmounts, "Voucher", $due_amount);

                                    // calculate and update fee amount installment wise
                                    $feeTypeInstallmentWiseAmounts = $this->updateFeeTypeInstallmentWiseAmounts($feeTypeInstallmentWiseAmounts, $transportFeeType->id, "Voucher", $due_amount);

                                    // update headWiseSummary data
                                    $headWiseDueSummary = $this->updateHeadWiseDueSummaryData($headWiseDueSummary, $transportFeeType->id, $transportFeeType->fee_type);
                                }
                            }
                        }
                    }
                }

                foreach ($headWiseDueSummary as $feeTypeId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($feeTypeInstallmentWiseAmounts[$feeTypeId] as $amount) {
                        $total_due += $amount;
                    }

                    $headWiseDueSummary[$feeTypeId]['installment_wise_amounts'] = $feeTypeInstallmentWiseAmounts[$feeTypeId];
                    $headWiseDueSummary[$feeTypeId]['total_due'] = $total_due;
                }
            }
        }

        return Inertia::render('FeeReport/YearlyHeadWiseDuesSummary', [
            'fees' => $fees,
            'headWiseDueSummary' => $headWiseDueSummary,
            'installmentWiseAmounts' => $installmentWiseAmounts,
        ]);
    }

    /*
    * helper function to update installment wise yearly due summary
    */
    private function updateInstallmentWiseAmounts($installmentWiseAmounts = [], string $title, float|int $dueAmount)
    {
        $installmentWiseAmounts[$title] = ($installmentWiseAmounts[$title] ?? 0) + $dueAmount;

        return $installmentWiseAmounts;
    }

    /*
    *  helper function to update fee type installment wise yearly due summary
    */
    private function updateFeeTypeInstallmentWiseAmounts($feeTypeInstallmentWiseAmounts = [], int $feeTypeId, string $title, float|int $dueAmount)
    {
        $feeTypeInstallmentWiseAmounts[$feeTypeId][$title] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$title] ?? 0) + $dueAmount;

        return $feeTypeInstallmentWiseAmounts;
    }

    /*
    * helper function to update headwise yearly due summary
    */
    private function updateHeadWiseDueSummaryData($headWiseDueSummary = [], int $feeTypeId, string $feeTypeTitle)
    {
        $headWiseDueSummary[$feeTypeId] = [
            'fee_type_id' => $feeTypeId,
            'fee_type_title' => $feeTypeTitle,
        ];

        return $headWiseDueSummary;
    }

    /**
     * Display outstanding dues report.
     */
    public function outstandingDueSummary(Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $feeCategories = $this->categoryRepository->getActiveFeeCategoryAll();
        $feeStructures = $this->feeStructureRepository->getActiveAll();
        $classDueReports = [];
        $student_status_array = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        if ($request->isMethod('POST')) {
            // validate form data
            $request->validate(
                [
                    'classroom_ids' => ['required', 'array'],
                    'from_fee_id' => ['required', 'integer'],
                    'to_fee_id' => ['required', 'integer'],
                ],
                [
                    'classroom_ids.required' => 'Please select any class.',
                    'from_fee_id.required' => 'Please select from installment.',
                    'to_fee_id.required' => 'Please select to installment.',
                ]
            );

            // get transport fee setting
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            // arguments for filter data
            $filter_arguments = [
                'classNameId' => !empty($request->class_name_id) ? $request->class_name_id : null,
                'classroomIds' => $request->classroom_ids,
                'studentStatus' => !empty($request->student_status) ? $request->student_status : "",
                'fromFeeId' => !empty($request->from_fee_id) ? $request->from_fee_id : "",
                'toFeeId' => !empty($request->to_fee_id) ? $request->to_fee_id : "",
                'feeCategoryId' => !empty($request->fee_category_id) ? $request->fee_category_id : "",
                'feeStructureId' => !empty($request->fee_structure_id) ? $request->fee_structure_id : ""
            ];

            $withoutDue = $request->without_due ?? false;

            //get filtered fee installments
            $feeInstallments = $this->classFeeStudentAmountRepository->getFilteredStudentsFees(...$filter_arguments);

            if (count($feeInstallments) > 0) {

                // $feeInstallments->load([
                //     'payment',
                //     'nullify_fee',
                //     'father',
                //     'classroom'
                // ]);

                $feeInstallments->loadMissing([
                    'payment',
                    'nullify_fee',
                    'father',
                    'classroom',
                    'student.promotedClassroom'
                ]);

                $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                    if ($feeInstallment?->student?->promotedClassroom != null) {
                        $feeInstallment['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                        $feeInstallment['classroom'] = $feeInstallment?->student?->promotedClassroom;
                    }

                    return $feeInstallment;
                });

                // calculate and format fee due report data
                $classDueReports = $feeInstallments->groupBy('classroom_id')->map(function ($classroomInstallments, $classroomId) use ($request, $transportFeeStructureSetting, $withoutDue) {
                    $classroomInstallments->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    }]);

                    $classTotalDue = 0;

                    $studentsData = $classroomInstallments->groupBy('student_id')->map(function ($studentInstallments) use (&$classTotalDue, $request, $transportFeeStructureSetting) {
                        $studentTotalDue = 0;
                        $studentTotalLateFee = 0;
                        $studentTotalTranspotFee = 0;

                        // calculate late fee and transport fee
                        foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeIntallmentsGroupedData) {
                            $studentId = $studentInstallments->first()->student_id;
                            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
                            $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                            if (!$hasPayment) {
                                $fee = $feeIntallmentsGroupedData->first()->fee;

                                // calculte transport fee if transport fee setting set to fee
                                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                    $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                    $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                    $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                    if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                        if ($currentAllocateTransport != null) {
                                            $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                            $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                        } else {
                                            $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                            $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                        }

                                        $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                            $studentId,
                                            $currentAllocateFeeId,
                                            $deallocateTransport?->fee_id
                                        );

                                        if (count($allocateTransportFees) > 0) {
                                            $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                            foreach ($allocateTransportFees as $allocateTransportFee) {
                                                if ($allocateTransportFee->id == $feeInstallmentId) {
                                                    if ($transportFee != null) {
                                                        $existedTransportFee = $feeIntallmentsGroupedData->where('fee_type_id', $transportFee->id)->first();

                                                        if ($existedTransportFee == null) {
                                                            if (count($studentFeeDiscounts) > 0) {
                                                                foreach ($studentFeeDiscounts as $discount) {
                                                                    if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                        if ($discount->is_discount_percentage) {
                                                                            $discount_amount = (float) ($discount->amount / 100) * $transportFeeAmount;
                                                                        } else {
                                                                            $discount_amount = (float) $discount->amount;
                                                                        }

                                                                        $transportFeeAmount = $transportFeeAmount - $discount_amount;
                                                                    }
                                                                }
                                                            }

                                                            $studentTotalTranspotFee += $transportFeeAmount;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                // calculate late fee
                                if (!empty($request->late_fee) && $request->late_fee == true) {
                                    // add late fee in structure if late fine is available
                                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                                    if ($lateFee != null) {
                                        $existedLateFee = $feeIntallmentsGroupedData->where('fee_type_id', $lateFee->id)->first();
                                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                            $late_fee_amount = 0;

                                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                            $lateFineStartDate = $fee->last_pay_date_at;
                                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

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

                                            if (count($studentFeeDiscounts) > 0) {
                                                foreach ($studentFeeDiscounts as $discount) {
                                                    if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                                        if ($discount->is_discount_percentage) {
                                                            $discount_amount = (float) ($discount->amount / 100) * $late_fee_amount;
                                                        } else {
                                                            $discount_amount = (float) $discount->amount;
                                                        }

                                                        $late_fee_amount = $late_fee_amount - $discount_amount;
                                                    }
                                                }
                                            }

                                            $studentTotalLateFee += $late_fee_amount;
                                        }
                                    }
                                }
                            }
                        }

                        $studentInstallments->each(function ($installment) use (&$studentTotalDue, $studentFeeDiscounts) {
                            $semester = $installment->semester ?? 1;
                            $fee_amount = (float) $installment->amount * $semester;
                            $due_amount = $fee_amount;
                            $discount_amount = 0;
                            $paid_amount = 0;

                            if ($installment->nullify_fee !== null) {
                                $due_amount = 0;
                                // } elseif ($installment->payment !== null && $installment?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                            } elseif ($installment->payment !== null && $installment?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                                $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                // $due_amount = (float) $installment->payment->due_amount;
                            } elseif (count($studentFeeDiscounts) > 0) {
                                foreach ($studentFeeDiscounts as $discount) {
                                    if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                        if ($discount->is_discount_percentage) {
                                            $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                        } else {
                                            $discount_amount = (float) $discount->amount;
                                        }

                                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                        // $due_amount = $fee_amount - $discount_amount;
                                    }
                                }
                            }

                            $studentTotalDue += $due_amount;
                        });

                        $classTotalDue += ($studentTotalDue + $studentTotalTranspotFee);
                        $studentinstallment = $studentInstallments->first();

                        $studentinstallment['student_roll_no'] = $studentinstallment['student']['classroomRoll']['roll_no'] ?? "";

                        // construct father name
                        $father_name = "";

                        if ($studentinstallment->father != null) {
                            $father_name = "{$studentinstallment?->father?->first_name} {$studentinstallment?->father?->middle_name} {$studentinstallment->father->last_name}";
                        }

                        // get student due follow ups
                        $due_follow_ups = $this->studentDueFollowUpRepository->getByStudentId($studentinstallment->student_id)->map(function ($followUp) {
                            $followUp['called_date'] = $followUp->created_at->format('d-M-Y');
                            $followUp['commitment_date'] = $followUp->commitment_date;
                            $followUp['formated_commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                            return $followUp;
                        })->toArray();

                        return [
                            'id' => $studentinstallment->student_id,
                            'admission_no' => $studentinstallment->student_admission_no,
                            'roll_no' => $studentinstallment->student_roll_no,
                            'name' => "{$studentinstallment?->student_first_name} {$studentinstallment?->student_middle_name} {$studentinstallment?->student_last_name}",
                            'father_name' => $father_name,
                            'sms_phone' => $studentinstallment?->father?->sms_phone ?? "",
                            'total_due_amount' => $studentTotalDue + $studentTotalLateFee + $studentTotalTranspotFee,
                            'due_follow_ups' => $due_follow_ups,
                        ];
                    })->filter(function ($studentData) use ($withoutDue) {
                        return $withoutDue == true ? true : $studentData['total_due_amount'] > 0;
                    })->toArray();

                    return [
                        'classroom' => [
                            'id' => $classroomId,
                            'title' => $classroomInstallments->first()?->classroom?->title,
                        ],
                        'total_due_amount' => $classTotalDue,
                        'students_data' => $studentsData,
                    ];
                })->filter(function ($report) {
                    return $report['total_due_amount'] > 0;
                })->toArray();
            }

            if (!empty($request->voucher) && $request->voucher == true) {
                // get transport voucher data and calculate due
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $classDueReports = $this->getTransportVoucherDueDataByClassroomIds(
                        $classDueReports,
                        $transportFeeStructureSetting,
                        $request->classroom_ids,
                        $request->student_status ?? "",
                        $request->student_active_status ?? ""
                    );
                }

                // get general voucher all due
                $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchersByClassroomIds(
                    $request->classroom_ids,
                    $request->student_status ?? "",
                    $request->student_active_status ?? ""
                );

                $classDueReports = $this->processGeneralVouchersDueData($classDueReports, $generalVouchers);
            }
        }

        return Inertia::render('FeeReport/OutstandingDueSummary', [
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'fees' => $fees,
            'feeCategories' => $feeCategories,
            'feeStructures' => $feeStructures,
            'student_status_array' => $student_status_array,
            'classDueReports' => $classDueReports,
        ]);
    }

    /*
    *   helper method to processs transport voucher due data for student outstanding due
    */
    private function getTransportVoucherDueDataByClassroomIds($classDueReports, $transportFeeStructureSetting, $classroomIds, $studentStatus = "", $studentActiveStatus = "")
    {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStudentStatus($classroomIds, $studentStatus, $studentActiveStatus);

        if (count($students) > 0) {
            // $students->load(['due_follow_ups', 'classroom', 'father', 'classroomRoll', 'promotedClassroom']);
            $students->load(['due_follow_ups', 'classroom', 'father', 'promotedClassroom']);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                $classroomId = $student?->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $total_due = 0;

                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount ?? 0;
                        $due_amount = $fee_amount;

                        if (
                            // $allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value
                            $allocate->payment != null
                        ) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            // $due_amount = (float) $allocate->payment->due_amount ?? 0;
                        }

                        $total_due += $due_amount;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $total_due += $fee_amount;
                    }
                }

                if ($total_due > 0) {
                    if (!isset($classDueReports[$student?->classroom?->id])) {
                        $classDueReports[$student?->classroom?->id] = [
                            'classroom' => [
                                'id' => $student?->classroom?->id,
                                'title' => $student?->classroom?->title,
                            ],
                            'total_due_amount' => 0,
                            'students_data' => [],
                        ];
                    }

                    if (isset($classDueReports[$student?->classroom?->id]['students_data'][$student->id])) {
                        $classDueReports[$student?->classroom?->id]['students_data'][$student->id]['total_due_amount'] += $total_due;
                    } else {
                        // format follow up date
                        $dueFollowUpsData = $student->due_follow_ups->map(function ($followUp) {
                            $followUp['called_date'] = $followUp->created_at->format('d-M-Y');
                            $followUp['commitment_date'] = $followUp->commitment_date;
                            $followUp['formated_commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                            return $followUp;
                        });

                        // construct father name
                        $father_name = "";

                        if ($student->father != null) {
                            $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";
                        }

                        // merge student data in reports
                        $classDueReports[$student?->classroom?->id]['students_data'][$student?->id] = [
                            'id' => $student?->id,
                            'admission_no' => $student?->admission_no,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                            'present_address' => $student?->present_address,
                            'father_name' => $father_name,
                            'sms_phone' => $student?->father?->sms_phone ?? "",
                            'classroom_title' => $student?->classroom?->title ?? "",
                            'total_due_amount' =>  $total_due,
                            'due_follow_ups' => $dueFollowUpsData,
                        ];
                    }

                    $classDueReports[$student?->classroom?->id]['total_due_amount'] += $total_due;
                }
            }
        }

        return $classDueReports;
    }

    /*
    *   helper method to processs general voucher due data for student outstanding due
    */
    private function processGeneralVouchersDueData($classDueReports, $vouchers)
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

                $voucher->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

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
                        // format follow up date
                        $dueFollowUpsData = $voucher->student->due_follow_ups->map(function ($followUp) {
                            $followUp['called_date'] = $followUp->created_at->format('d-M-Y');
                            $followUp['commitment_date'] = $followUp->commitment_date;
                            $followUp['formated_commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                            return $followUp;
                        });

                        // construct father name
                        $father_name = "";

                        if ($voucher->father != null) {
                            $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher->father->last_name}";
                        }

                        // merge student data in reports
                        $classDueReports[$voucher?->classroom?->id]['students_data'][$voucher->student_id] = [
                            'id' => $voucher->student?->id,
                            'admission_no' => $voucher?->student?->admission_no,
                            'roll_no' => $voucher?->student?->classroomRoll?->roll_no,
                            'name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                            'present_address' => $voucher?->student?->present_address,
                            'father_name' => $father_name,
                            'sms_phone' => $voucher?->father?->sms_phone ?? "",
                            'classroom_title' => $voucher?->classroom?->title ?? "",
                            'total_due_amount' =>  $due_amount,
                            'due_follow_ups' => $dueFollowUpsData,
                        ];
                    }

                    $classDueReports[$voucher?->classroom?->id]['total_due_amount'] += $due_amount;
                }
            }
        }

        return $classDueReports;
    }

    /**
     * Display dues report.
     */
    public function completeOutstandingDues(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $completeOutstandingDueReports = [];
        $student_status_array = [];
        $student_active_status_array = [];

        foreach (StudentStatus::cases() as $case) {
            if ($case == StudentStatus::NEW || $case == StudentStatus::PROMOTED) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_active_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        $employmentCategoryTypes = $this->categoryRepository->getEmploymentCategory();

        if ($request->isMethod('POST')) {
            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                // get transport fee setting
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                $feeInstallments = $this->classFeeStudentAmountRepository->getCompleteDueSummary(
                    $request->from_fee_id,
                    $request->to_fee_id,
                    $request->classroom_id ?? "",
                    $request->student_status ?? "",
                    $request->student_active_status ?? "",
                    $request->employment_category_id ?? null
                );

                if (count($feeInstallments) > 0) {
                    $feeInstallments->loadMissing([
                        'payment',
                        'nullify_fee',
                        'father',
                        'student.due_follow_ups'
                    ]);

                    $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                        if ($feeInstallment?->student?->promotedClassroom != null) {
                            if (!empty($feeInstallment['student']['classroom'])) {
                                unset($feeInstallment['student']['classroom']);
                            }

                            $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                            $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                        }

                        return $feeInstallment;
                    });

                    $completeOutstandingDueReports = $feeInstallments->groupBy('student_id')->map(function ($studentInstallments) use ($request, $transportFeeStructureSetting) {
                        // calculate student total due
                        $studentTotalDue = 0;
                        $studentTotalLateFee = 0;
                        $studentTotalTranspotFee = 0;

                        $student = $studentInstallments?->first()?->student;
                        $classroomId = $student?->classroom_id;

                        $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        }]);

                        // calculate late fee and transport fee
                        foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeIntallmentsGroupedData) {
                            $studentId = $studentInstallments->first()->student_id;
                            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
                            $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                            if (!$hasPayment) {
                                $fee = $feeIntallmentsGroupedData->first()->fee;

                                // calculte transport fee if transport fee setting set to fee
                                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                    $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                    $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                    $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                    if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                        if ($currentAllocateTransport != null) {
                                            $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                            $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                        } else {
                                            $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                            $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                        }

                                        $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                            $studentId,
                                            $currentAllocateFeeId,
                                            $deallocateTransport?->fee_id
                                        );

                                        if (count($allocateTransportFees) > 0) {
                                            $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                            foreach ($allocateTransportFees as $allocateTransportFee) {
                                                if ($allocateTransportFee->id == $feeInstallmentId) {
                                                    if ($transportFee != null) {
                                                        $existedTransportFee = $feeIntallmentsGroupedData->where('fee_type_id', $transportFee->id)->first();

                                                        if ($existedTransportFee == null) {
                                                            if (count($studentFeeDiscounts) > 0) {
                                                                foreach ($studentFeeDiscounts as $discount) {
                                                                    if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                        if ($discount->is_discount_percentage) {
                                                                            $discount_amount = (float) ($discount->amount / 100) * $transportFeeAmount;
                                                                        } else {
                                                                            $discount_amount = (float) $discount->amount;
                                                                        }

                                                                        $transportFeeAmount = $transportFeeAmount - $discount_amount;
                                                                    }
                                                                }
                                                            }

                                                            $studentTotalTranspotFee += $transportFeeAmount;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                // calculate late fee
                                if (!empty($request->late_fee) && $request->late_fee == true) {
                                    // add late fee in structure if late fine is available
                                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                                    if ($lateFee != null) {
                                        $existedLateFee = $feeIntallmentsGroupedData->where('fee_type_id', $lateFee->id)->first();
                                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                            $late_fee_amount = 0;

                                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                            $lateFineStartDate = $fee->last_pay_date_at;
                                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

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

                                            if (count($studentFeeDiscounts) > 0) {
                                                foreach ($studentFeeDiscounts as $discount) {
                                                    if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                                        if ($discount->is_discount_percentage) {
                                                            $discount_amount = (float) ($discount->amount / 100) * $late_fee_amount;
                                                        } else {
                                                            $discount_amount = (float) $discount->amount;
                                                        }

                                                        $late_fee_amount = $late_fee_amount - $discount_amount;
                                                    }
                                                }
                                            }

                                            $studentTotalLateFee += $late_fee_amount;
                                        }
                                    }
                                }
                            }
                        }

                        $studentInstallments->each(function ($installment) use (&$studentTotalDue, $studentFeeDiscounts) {
                            $semester = $installment->semester ?? 1;
                            $due_amount = ((float) $installment->amount ?? 0) * $semester;

                            if ($installment->nullify_fee !== null) {
                                $due_amount = 0;
                                // } elseif ($installment->payment !== null && $installment->payment->payment_status != PaymentStatus::CANCELLED->value) {
                            } elseif ($installment->payment !== null) {
                                $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $due_amount - $discount_amount - $paid_amount;
                                // $due_amount = (float) $installment->payment->due_amount;
                            } elseif (count($studentFeeDiscounts) > 0) {
                                foreach ($studentFeeDiscounts as $discount) {
                                    if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                        if ($discount->is_discount_percentage) {
                                            $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                        } else {
                                            $discount_amount = (float) $discount->amount;
                                        }

                                        $due_amount = $due_amount - $discount_amount;
                                    }
                                }
                            }

                            $studentTotalDue += $due_amount;
                        });

                        $studentinstallment = $studentInstallments->first();

                        // format follow up date
                        $dueFollowUpsData = $studentinstallment->student->due_follow_ups->map(function ($followUp) {
                            $followUp['called_date'] = $followUp->created_at->format('d-M-Y');
                            $followUp['commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                            return $followUp;
                        });

                        // construct father name
                        $father_name = "";

                        if ($studentinstallment->father != null) {
                            $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";
                        }

                        return [
                            'id' => $studentinstallment->student_id,
                            'admission_no' => $student?->admission_no,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                            'present_address' => $student?->present_address,
                            'father_name' => $father_name,
                            'sms_phone' => $student?->father?->sms_phone,
                            'classroom_title' => $student?->classroom?->title,
                            'total_due_amount' => $studentTotalDue + $studentTotalLateFee + $studentTotalTranspotFee,
                            'due_follow_ups' => $dueFollowUpsData,
                        ];
                    })->toArray();
                }

                if (!empty($request->voucher) && $request->voucher == true) {
                    // get transport voucher data and calculate due
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                        $completeOutstandingDueReports = $this->getAndProcessCompleteDueTransportVouchersData(
                            $completeOutstandingDueReports,
                            $transportFeeStructureSetting,
                            $request->classroom_id ?? null,
                            $request->student_status ?? "",
                            $request->student_active_status ?? "",
                            $request->employment_category_id ?? null
                        );
                    }

                    // get general voucher all due
                    $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchers(
                        $request->classroom_id ?? "",
                        $request->student_status ?? "",
                        $request->student_active_status ?? "",
                        $request->employment_category_id ?? null,
                    );

                    $generalVouchers = $generalVouchers->map(function ($voucher) {
                        if ($voucher?->student?->promotedClassroom != null) {
                            if (!empty($voucher['classroom'])) {
                                unset($voucher['classroom']);
                            }

                            $voucher['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                            $voucher['classroom'] = $voucher?->student?->promotedClassroom;
                        }

                        $classroomId = $voucher?->student?->classroom_id;

                        $voucher->student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        }]);

                        return $voucher;
                    });

                    // process general vouchers data
                    $completeOutstandingDueReports = $this->processCompleteDueGeneralVouchersData($completeOutstandingDueReports, $generalVouchers);
                }
            }
        }

        return Inertia::render('FeeReport/CompleteOutstandingDues', [
            'classrooms' => $classrooms,
            'fees' => $fees,
            'student_status_array' => $student_status_array,
            'student_active_status_array' => $student_active_status_array,
            'employmentCategoryTypes' => $employmentCategoryTypes,
            'completeOutstandingDueReports' => $completeOutstandingDueReports,
        ]);
    }

    /*
    *   helper method to processs transport voucher due data for student outstanding due
    */
    private function getAndProcessCompleteDueTransportVouchersData($completeOutstandingDueReports, $transportFeeStructureSetting, $classroomId = null, $studentStatus = "", $studentActiveStatus = "", $employmentCategoryId = null)
    {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndStudentStatus($classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId);

        if (count($students) > 0) {
            $students->load(['due_follow_ups', 'classroom', 'father', 'promotedClassroom']);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $student;
            });

            foreach ($students as $student) {
                $total_due = 0;

                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $due_amount = (float) $allocate->amount;

                        if (
                            // $allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value
                            $allocate->payment != null
                        ) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $due_amount - $discount_amount - $paid_amount;

                            // $due_amount = (float) $allocate->payment->due_amount ?? 0;
                        }

                        $total_due += $due_amount;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $total_due += $fee_amount;
                    }
                }

                if ($total_due > 0) {
                    if (isset($completeOutstandingDueReports[$student->id])) {
                        $completeOutstandingDueReports[$student->id]['total_due_amount'] += $total_due;
                    } else {
                        // format follow up date
                        $dueFollowUpsData = $student->due_follow_ups->map(function ($followUp) {
                            $followUp['called_date'] = $followUp->created_at->format('d-M-Y');
                            $followUp['commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                            return $followUp;
                        });

                        // construct father name
                        $father_name = "";

                        if ($student->father != null) {
                            $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";
                        }

                        // merge student data in reports
                        $completeOutstandingDueReports[$student?->id] = [
                            'id' => $student?->id,
                            'admission_no' => $student?->admission_no,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                            'present_address' => $student?->present_address,
                            'father_name' => $father_name,
                            'sms_phone' => $student?->father?->sms_phone ?? "",
                            'classroom_title' => $student?->classroom?->title ?? "",
                            'total_due_amount' =>  $total_due,
                            'due_follow_ups' => $dueFollowUpsData,
                        ];
                    }

                    $completeOutstandingDueReports[$student?->classroom?->id]['total_due_amount'] += $total_due;
                }
            }
        }

        return $completeOutstandingDueReports;
    }

    /*
    *   helper method to processs voucher due data
    */
    private function processCompleteDueGeneralVouchersData($completeOutstandingDueReports, $vouchers)
    {
        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                $due_amount = 0;

                foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                    $amount = (float) $voucherAmountData->amount;

                    // if ($voucherAmountData->payment !== null && $voucherAmountData->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($voucherAmountData->payment != null) {
                        $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $amount = $amount - $discount_amount - $paid_amount;

                        // $amount = (float) $voucherAmountData->payment->due_amount;
                    }

                    $due_amount += $amount;
                }

                // check if student daat already exists. if alreday exists then update due amount else add new student data
                if (isset($completeOutstandingDueReports[$voucher->student_id])) {
                    $completeOutstandingDueReports[$voucher->student_id]['total_due_amount'] += $due_amount;
                } else {
                    // format follow up date
                    $dueFollowUpsData = $voucher->student->due_follow_ups->map(function ($followUp) {
                        $followUp['called_date'] = $followUp->created_at->format('d-M-Y');
                        $followUp['commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                        return $followUp;
                    });

                    // construct father name
                    $father_name = "";

                    if ($voucher->father != null) {
                        $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher->father->last_name}";
                    }

                    // merge student data in reports
                    $completeOutstandingDueReports[$voucher->student_id] = [
                        'id' => $voucher->student?->id,
                        'admission_no' => $voucher->student?->admission_no,
                        'roll_no' => $voucher->student?->classroomRoll?->roll_no,
                        'name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                        'present_address' => $voucher?->student?->present_address,
                        'father_name' => $father_name,
                        'sms_phone' => $voucher?->father?->sms_phone ?? "",
                        'classroom_title' => $voucher?->classroom?->title ?? "",
                        'total_due_amount' =>  $due_amount,
                        'due_follow_ups' => $dueFollowUpsData,
                    ];
                }
            }
        }

        return $completeOutstandingDueReports;
    }

    /*
    * save student due follow up
    */
    public function saveStudentDueFollowUp(StudentDueFollowUpRequest $request)
    {
        $input = $request->validated();

        $due_amount = $input['due_amount'] ?? 0;

        if (empty($input['due_amount'])) {
            $due_amount = $this->getStudentTotalDueAmountByStudentId($input['student_id']);
        }

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'student_id' => !empty($input['student_id']) ? $input['student_id'] : null,
            'created_by' => auth()->user()->id,
            'due_amount' => $due_amount,
            'note' => !empty($input['note']) ? $input['note'] : "",
            'commitment_date' => !empty($input['commitment_date']) ? Carbon::parse($input['commitment_date'])->format('Y-m-d') : Carbon::now()->format('Y-m-d'),
            'call_picked' => !empty($input['call_picked']) ? $input['call_picked'] : false,
            'status' => Status::ACTIVE,
        ];

        $dueFollowUp = $this->studentDueFollowUpRepository->create($dataArray);

        if (!$dueFollowUp) {
            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }

        return redirect()->back()->with(['message' => 'FollowUp added successfully.']);
    }

    /*
    * update student due follow up
    */
    public function updateStudentDueFollowUp($id, StudentDueFollowUpRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'created_by' => auth()->user()->id,
            'note' => !empty($input['note']) ? $input['note'] : "",
            'commitment_date' => !empty($input['commitment_date']) ? Carbon::parse($input['commitment_date'])->format('Y-m-d') : Carbon::now()->format('Y-m-d'),
            'call_picked' => !empty($input['call_picked']) ? $input['call_picked'] : false,
        ];

        $dueFollowUp = $this->studentDueFollowUpRepository->update($id, $dataArray);

        if (!$dueFollowUp) {
            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }

        return redirect()->back()->with(['message' => 'FollowUp updated successfully.']);
    }

    /**
     * helper method to get student due amount
     * @param int $studentId
     *
     * @return float|int
     */
    protected function getStudentTotalDueAmountByStudentId(int $studentId)
    {
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId);

        $total_due = 0;

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                $total_due_amount = 0;

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                if (!$hasPayment) {
                    $fee = $feeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                            if ($currentAllocateTransport != null) {
                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                            } else {
                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                            }

                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                $studentId,
                                $currentAllocateFeeId,
                                $deallocateTransport?->fee_id
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                    if ($allocateTransportFee->id == $feeInstallmentId) {
                                        if ($transportFee != null) {
                                            $existedTransportFee = $feeInstallments->where('fee_type_id', $transportFee->id)->first();

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

                                                $feeInstallments->push($newTransportFee);
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
                        $existedLateFee = $feeInstallments->where('fee_type_id', $lateFee->id)->first();
                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

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

                            $feeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($feeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $paid_amount = 0;
                    $status = null;

                    if (!empty($feeInstallment['payment'])) {
                        $status = $feeInstallment?->payment?->payment_status;
                    }

                    // if (!empty($feeInstallment['fee_payments']) && $status != PaymentStatus::CANCELLED->value) {
                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                        $status = PaymentStatus::PAID->value;
                        // } elseif (!empty($feeInstallment['payment']) && $status != PaymentStatus::CANCELLED->value) {
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        // $due_amount = (float) $feeInstallment?->payment?->due_amount ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $payable_amount = $due_amount;
                            }
                        }

                        // $payable_amount = $fee_amount - $discount_amount;
                        // $due_amount = $payable_amount;
                    }

                    $total_due_amount += $due_amount;
                }

                $total_due += $total_due_amount;
            }
        }

        // // get transport voucher data and calculate due

        // $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
        // $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'voucher');
        // $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'voucher');
        // $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'voucher');

        // $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        // $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

        // $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        // $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

        // $allocateTransportVouchers = [];

        // if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
        //     $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
        //         $studentId,
        //         $currentAllocateVoucherId,
        //         $deallocateVoucherId
        //     );
        // }

        // $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
        //     $studentId,
        //     $previousAllocateTransportId,
        //     $previousAllocationVoucherId,
        //     $deallocateVoucherId,
        //     $transportFeeStructureSetting?->value
        // );

        // if (!empty($allocateTransport)) {
        //     foreach ($allocateTransport as $allocate) {
        //         $due_amount = (float) $allocate->amount;

        //         if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
        //             $due_amount = (float) $allocate->payment->due_amount ?? 0;
        //         }

        //         $total_due += $due_amount;
        //     }
        // }

        // if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
        //     if ($currentAllocateTransport != null) {
        //         $fee_amount = (float) $currentAllocateTransport->amount;
        //     } else {
        //         $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
        //     }

        //     foreach ($allocateTransportVouchers as $voucher) {
        //         $total_due += $fee_amount;
        //     }
        // }

        // // get general voucher all due
        // $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchersByStudentId($studentId);

        // // calculate vouchers due
        // $total_due += $this->calculateVoucherTotalDue($generalVouchers, 'general');

        return $total_due;
    }

    /**
     * Display consolidated dues report.
     */
    public function consolidatedDuesReport(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveAll();
        $feeCategories = $this->categoryRepository->getActiveFeeCategoryAll();
        $consolidatedDueReports = [];
        $student_status_array = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        if ($request->isMethod('POST')) {
            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                $studentFeeDiscounts = [];

                // arguments for filter data
                $filter_arguments = [
                    'studentStatus' => !empty($request->student_status) ? $request->student_status : "",
                    'fromFeeId' => !empty($request->from_fee_id) ? $request->from_fee_id : null,
                    'toFeeId' => !empty($request->to_fee_id) ? $request->to_fee_id : null,
                    'feeCategoryId' => !empty($request->fee_category_id) ? $request->fee_category_id : null,
                ];

                //get filtered fee installments
                $feeInstallments = $this->classFeeStudentAmountRepository->getConsolidatedDueReports(...$filter_arguments);

                if (count($feeInstallments) > 0) {
                    $feeInstallments->load([
                        'payment',
                        'fee_payments',
                        'nullify_fee',
                        'classroom',
                        'feeType',
                        'student' => function ($query) {
                            $query->with(['promotedClassroom']);
                        },
                    ]);

                    $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                        if ($feeInstallment?->student?->promotedClassroom != null) {
                            if (!empty($feeInstallment['classroom'])) {
                                unset($feeInstallment['classroom']);
                            }

                            $feeInstallment['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                            $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                            $feeInstallment['classroom'] = $feeInstallment?->student?->promotedClassroom;
                        }

                        return $feeInstallment;
                    });

                    // get transport fee if
                    foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                        $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                                if (!$hasPayment) {
                                    $fee = $groupedFeeInstallments->first()->fee;
                                    // add transport fee in structure if transport fee setting set to fee
                                    $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                    $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                    $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                    if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                        if ($currentAllocateTransport != null) {
                                            $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                            $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                        } else {
                                            $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                            $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                        }

                                        $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                            $studentId,
                                            $currentAllocateFeeId,
                                            $deallocateTransport?->fee_id
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
                                                                'classroom_id' => $studentFeeInstallments->first()?->student?->classroom_id,
                                                                'fee_id' => $feeInstallmentId,
                                                                'fee_type_id' =>  $transportFee->id,
                                                                'amount' =>  $transportFeeAmount,
                                                                'semester' => null,
                                                                'is_fee_special' => $transportFee->is_fee_special,
                                                                'is_extra_charge' => true,
                                                                'feeType' => $transportFee,
                                                                // 'fee' => $fee,
                                                                'payment' => null,
                                                                'fee_payments' => collect([]),
                                                                'nullify_fee' => null,
                                                                'student' => $studentFeeInstallments->first()->student,
                                                                'classroom' => $studentFeeInstallments->first()?->student?->classroom,
                                                            ]);

                                                            $feeInstallments->push($newTransportFee);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // calculate and format fee due report data
                    $consolidatedDueReports = $feeInstallments->groupBy('classroom_id')->map(function ($classroomInstallments, $classroomId) {
                        $classTotalPayable = 0;
                        $classTotalPaid = 0;
                        $classTotalDue = 0;

                        $feeTypesData = $classroomInstallments->groupBy('fee_type_id')->map(function ($feeTypeInstallments) use (&$classTotalPayable, &$classTotalPaid, &$classTotalDue) {
                            $feeTypeTotalPayable = 0;
                            $feeTypeTotalPaid = 0;
                            $feeTypeTotalDue = 0;

                            $feeTypeInstallments->each(function ($installment) use (&$feeTypeTotalPayable, &$feeTypeTotalPaid, &$feeTypeTotalDue) {
                                $semester = $installment['semester'] ?? 1;
                                $payable_amount = ((float) $installment['amount'] ?? 0) * $semester;
                                $due_amount = $payable_amount;
                                $paid_amount = 0;
                                $discount_amount = 0;

                                if ($installment['nullify_fee'] !== null) {
                                    $due_amount = 0;
                                    $paid_amount = $payable_amount;
                                    // } elseif ($installment['payment'] !== null && $installment['payment']['payment_status'] != PaymentStatus::CANCELLED->value) {
                                } elseif ($installment['payment'] !== null) {
                                    // $due_amount = (float) $installment?->payment?->due_amount ?? 0;
                                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                    $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                                    $payable_amount = $payable_amount - $discount_amount;
                                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }

                                            $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                                            $payable_amount =  $payable_amount - $discount_amount;
                                            // $due_amount = $payable_amount;
                                        }
                                    }
                                }

                                $feeTypeTotalPayable += $payable_amount;
                                $feeTypeTotalPaid += $paid_amount;
                                $feeTypeTotalDue += $due_amount;
                            });

                            $classTotalPayable += $feeTypeTotalPayable;
                            $classTotalPaid += $feeTypeTotalPaid;
                            $classTotalDue += $feeTypeTotalDue;

                            $feeTypeinstallment = $feeTypeInstallments[0];

                            return [
                                'fee_type_id' => $feeTypeinstallment['fee_type_id'],
                                'fee_type_title' => $feeTypeinstallment['feeType']['fee_type'],
                                'total_payable_amount' => $feeTypeTotalPayable,
                                'total_paid_amount' => $feeTypeTotalPaid,
                                'total_due_amount' => $feeTypeTotalDue,
                            ];
                        })->toArray();

                        $classroomTitle = $classroomInstallments[0]['classroom']['title'];

                        return [
                            'classroom' => [
                                'id' => $classroomId,
                                'title' => $classroomTitle,
                            ],
                            'total_payable_amount' => $classTotalPayable,
                            'total_paid_amount' => $classTotalPaid,
                            'total_due_amount' => $classTotalDue,
                            'fee_types_data' => $feeTypesData,
                        ];
                    })->filter(function ($report) {
                        return $report['total_due_amount'] > 0;
                    })->toArray();
                }

                if (!empty($request->voucher) && $request->voucher == true) {
                    // get all active general vouchers
                    $generalVouchers = $this->studentFeeVoucherRepository->getActiveAllFeeVouchers($request->student_status ?? "");

                    //format  general vouchers
                    if (count($generalVouchers) > 0) {
                        $generalVouchers = $generalVouchers->map(function ($voucher) {
                            if ($voucher?->student?->promotedClassroom != null) {
                                if (!empty($voucher['student']['classroom'])) {
                                    unset($voucher['student']['classroom']);
                                }

                                $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                                $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                            }

                            return $voucher;
                        });

                        foreach ($generalVouchers as $voucher) {
                            foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                                $voucher_payable_amount = (float) $feeTypeAmount->amount ?? 0;
                                $voucher_due_amount = $voucher_payable_amount;
                                $voucher_discount_amount = 0;
                                $voucher_paid_amount = 0;

                                // check if voucher has payment. if has payment then update due amount
                                // if ($feeTypeAmount->payment != null && $feeTypeAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                                if ($feeTypeAmount->payment != null) {
                                    // $voucher_due_amount = (float) $feeTypeAmount?->payment?->due_amount ?? 0;
                                    $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                                    $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                                    $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                                    $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                                }

                                if (empty($consolidatedDueReports[$voucher?->student?->classroom_id])) {
                                    $consolidatedDueReports[$voucher?->student?->classroom_id] = [
                                        'classroom' => [
                                            'id' => $voucher?->student?->classroom_id,
                                            'title' => $voucher?->student?->classroom?->title,
                                        ],
                                        'total_payable_amount' => $voucher_payable_amount,
                                        'total_paid_amount' => $voucher_paid_amount,
                                        'total_due_amount' => $voucher_due_amount,
                                    ];
                                } else {
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['total_payable_amount'] += $voucher_payable_amount;
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['total_paid_amount'] += $voucher_paid_amount;
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['total_due_amount'] += $voucher_due_amount;
                                }

                                if (
                                    empty($consolidatedDueReports[$voucher?->student?->classroom_id]['fee_types_data'][$feeTypeAmount->fee_type_id])
                                ) {
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['fee_types_data'][$feeTypeAmount->fee_type_id] = [
                                        'fee_type_id' => $feeTypeAmount->fee_type_id,
                                        'fee_type_title' => $feeTypeAmount?->feeType?->fee_type,
                                        'total_payable_amount' => $voucher_payable_amount,
                                        'total_paid_amount' => $voucher_paid_amount,
                                        'total_due_amount' => $voucher_due_amount,
                                    ];
                                } else {
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['fee_types_data'][$feeTypeAmount->fee_type_id]['total_payable_amount'] += $voucher_payable_amount;
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['fee_types_data'][$feeTypeAmount->fee_type_id]['total_paid_amount'] += $voucher_paid_amount;
                                    $consolidatedDueReports[$voucher?->student?->classroom_id]['fee_types_data'][$feeTypeAmount->fee_type_id]['total_due_amount'] += $voucher_due_amount;
                                }
                            }
                        }
                    }

                    // transport vouchers

                    // get all active students
                    $students = $this->studentRepository->getActiveNameAndId($request->student_status ?? "");

                    // get transport fee type
                    $transportFee = $this->feeTypeRepository->getTransportFeeType();

                    if ($transportFee != null && count($students) > 0) {
                        $students->loadMissing(['promotedClassroom']);

                        $students =  $students->map(function ($student) {
                            if ($student?->promotedClassroom != null) {
                                if (!empty($student['classroom'])) {
                                    unset($student['classroom']);
                                }

                                $student['classroom_id'] = $student?->promotedClassroom?->id;
                                $student['classroom'] = $student?->promotedClassroom;
                            }

                            return $student;
                        });

                        foreach ($students as $student) {
                            // get current allocate transport
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                            // get previous allocate transport
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                            // get deallocate transport
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                            $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                            $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                            $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                            $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                            $allocateTransportVouchers = [];

                            // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                                $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $student->id,
                                    $currentAllocateVoucherId,
                                    $deallocateVoucherId
                                );
                            }

                            // get allocated transport vouchers
                            $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                                $student->id,
                                $previousAllocateTransportId,
                                $previousAllocationVoucherId,
                                $deallocateVoucherId,
                                $transportFeeStructureSetting?->value,
                                'voucher'
                            );

                            if (!empty($allocateTransport)) {
                                foreach ($allocateTransport as $allocate) {
                                    $voucher_payable_amount = (float) $allocate->amount;
                                    $voucher_due_amount = $voucher_payable_amount;
                                    $voucher_discount_amount = 0;
                                    $voucher_paid_amount = 0;

                                    // if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                                    if ($allocate->payment != null) {
                                        $voucher_discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                                        $voucher_paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                        // $voucher_due_amount = (float) $allocate->payment->due_amount ?? 0;
                                        $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                                        $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                                    }

                                    if (empty($consolidatedDueReports[$student?->classroom_id])) {
                                        $consolidatedDueReports[$student?->classroom_id] = [
                                            'classroom' => [
                                                'id' => $student?->classroom_id,
                                                'title' => $student?->classroom?->title,
                                            ],
                                            'total_payable_amount' => $voucher_payable_amount,
                                            'total_paid_amount' => $voucher_paid_amount,
                                            'total_due_amount' => $voucher_due_amount,
                                        ];
                                    } else {
                                        $consolidatedDueReports[$student?->classroom_id]['total_payable_amount'] += $voucher_payable_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['total_paid_amount'] += $voucher_paid_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['total_due_amount'] += $voucher_due_amount;
                                    }

                                    if (
                                        empty($consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id])
                                    ) {
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id] = [
                                            'fee_type_id' => $transportFee->id,
                                            'fee_type_title' => $transportFee->fee_type,
                                            'total_payable_amount' => $voucher_payable_amount,
                                            'total_paid_amount' => $voucher_paid_amount,
                                            'total_due_amount' => $voucher_due_amount,
                                        ];
                                    } else {
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id]['total_payable_amount'] += $voucher_payable_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id]['total_paid_amount'] += $voucher_paid_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id]['total_due_amount'] += $voucher_due_amount;
                                    }
                                }
                            }

                            if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                                if ($currentAllocateTransport != null) {
                                    $voucher_payable_amount = (float) $currentAllocateTransport->amount;
                                } else {
                                    $voucher_payable_amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $voucher_due_amount = $voucher_payable_amount;
                                $voucher_paid_amount = 0;

                                foreach ($allocateTransportVouchers as $voucher) {
                                    if (empty($consolidatedDueReports[$student?->classroom_id])) {
                                        $consolidatedDueReports[$student?->classroom_id] = [
                                            'classroom' => [
                                                'id' => $student?->classroom_id,
                                                'title' => $student?->classroom?->title,
                                            ],
                                            'total_payable_amount' => $voucher_payable_amount,
                                            'total_paid_amount' => $voucher_paid_amount,
                                            'total_due_amount' => $voucher_due_amount,
                                        ];
                                    } else {
                                        $consolidatedDueReports[$student?->classroom_id]['total_payable_amount'] += $voucher_payable_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['total_paid_amount'] += $voucher_paid_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['total_due_amount'] += $voucher_due_amount;
                                    }

                                    if (
                                        empty($consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id])
                                    ) {
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id] = [
                                            'fee_type_id' => $transportFee->id,
                                            'fee_type_title' => $transportFee->fee_type,
                                            'total_payable_amount' => $voucher_payable_amount,
                                            'total_paid_amount' => $voucher_paid_amount,
                                            'total_due_amount' => $voucher_due_amount,
                                        ];
                                    } else {
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id]['total_payable_amount'] += $voucher_payable_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id]['total_paid_amount'] += $voucher_paid_amount;
                                        $consolidatedDueReports[$student?->classroom_id]['fee_types_data'][$transportFee->id]['total_due_amount'] += $voucher_due_amount;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return Inertia::render('FeeReport/ConsolidatedDuesReport', [
            'fees' => $fees,
            'feeCategories' => $feeCategories,
            'student_status_array' => $student_status_array,
            'consolidatedDueReports' => $consolidatedDueReports,
        ]);
    }

    /**
     * Display fee student followup report.
     */
    public function feeStudentFollowUp(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        $fromDate = Carbon::now()->format('Y-m-d');
        $toDate = Carbon::now()->format('Y-m-d');

        if ($request->isMethod('POST')) {
            if (!empty($request->from_date) && !empty($request->to_date)) {
                $fromDate = Carbon::parse($request->from_date)->format('Y-m-d');
                $toDate = Carbon::parse($request->to_date)->format('Y-m-d');
                $classroomId = $request->classroom_id ?? "";

                $followUpReports = $this->studentDueFollowUpRepository->filterStudentDueFollowUpReports($fromDate, $toDate, $classroomId);
            }
        } else {
            $followUpReports = $this->studentDueFollowUpRepository->filterStudentDueFollowUpReports($fromDate, $toDate);
        }

        if (count($followUpReports) > 0) {
            $followUpReports = $followUpReports->map(function ($followUp) {
                if ($followUp?->student?->promotedClassroom != null) {
                    if (!empty($followUp['student']['classroom'])) {
                        unset($followUp['student']['classroom']);
                    }

                    $followUp['student']['classroom_id'] = $followUp?->student?->promotedClassroom?->id;
                    $followUp['student']['classroom'] = $followUp?->student?->promotedClassroom;
                }

                $classroomId = $followUp?->student?->classroom_id;

                $followUp?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $followUp['activity_date'] = $followUp->created_at->format('d-M-Y');
                $followUp['commitment_date'] = $followUp->commitment_date;
                $followUp['formatted_commitment_date'] = Carbon::parse($followUp->commitment_date)->format('d-M-Y');

                return $followUp;
            });
        }

        return Inertia::render('FeeReport/FeeStudentFollowUp', [
            'classrooms' => $classrooms,
            'followUpReports' => $followUpReports,
        ]);
    }

    /**
     * Display student payment report.
     */
    public function studentPayments(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
        $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";

        $studentFeePaymentReports = [];
        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $paymentReports = [];
            $studentIds = [];

            $classroomId = $request?->classroom_id ?? null;

            if (!empty($request?->admission_no) && empty($request?->student_id)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($request->admission_no);
            }

            if (!empty($request?->student_id)) {
                $student = $this->studentRepository->getStudentById($request->student_id);
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

                if ($students->count() > 0) {
                    $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    }]);

                    $students = $students->map(function ($student) {

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }

                        $student['title'] = "{$student?->classroomRoll?->roll_no} - {$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                        return $student;
                    });

                    $studentIds = $students->pluck('id')->toArray();
                }
            }

            if ($request?->filter_type == "filter_report") {
                if ($student == null) {
                    if (count($studentIds) > 0) {
                        $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($studentIds);
                    }
                } else if ($student != null) {
                    $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($student->id);
                }
            }

            if (count($paymentReports) > 0) {
                $paymentReports->loadMissing(['student']);

                $studentFeePaymentReports = $paymentReports->map(function ($report) {
                    $receipt_note = "";
                    $total_amount = 0;
                    $total_discount = 0;
                    $total_payable = 0;
                    $total_paid = 0;
                    $total_due = 0;
                    $feeTypeAmountsArray = [];

                    if (count($report->fee_payments) > 0) {
                        $report->fee_payments->each(function ($feePayment) use (&$receipt_note, &$total_amount, &$total_discount, &$total_payable, &$total_paid, &$total_due, &$feeTypeAmountsArray) {
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

                            // Construct receipt note
                            if (strlen($receipt_note) <= 0) {
                                $receipt_note = "Payment {$payment_note} {$feePayment->fee->title}";
                            } elseif (!strpos($receipt_note, $feePayment?->fee?->title)) {
                                $receipt_note .= ", {$payment_note} {$feePayment?->fee?->title}";
                            }

                            $amount = (float) $feePayment->amount ?? 0;
                            $payable_amount = (float) $feePayment->payable_amount ?? 0;
                            $paid_amount = (float) $feePayment->paid_amount ?? 0;
                            $due_amount = (float) $feePayment->due_amount ?? 0;
                            $discount_amount = (float) $feePayment->discount_amount ?? 0;

                            $total_amount += $amount;
                            $total_payable += $payable_amount;
                            $total_paid += $paid_amount;
                            $total_due += $due_amount;
                            $total_discount += $discount_amount;

                            $fee_title = $feePayment?->fee?->title ?? "";

                            if ($feePayment?->fee_payment_type != FeePaymentType::FEEINSTALLMENT->value) {
                                $fee_title = "Voucher";
                            }

                            $feeTypeAmountsArray[] = [
                                'fee_type_title' => $feePayment?->feeType?->fee_type ?? "",
                                'fee_title' => $fee_title,
                                'amount' => $amount,
                                'discount_amount' => $discount_amount,
                                'payable_amount' => $payable_amount,
                                'paid_amount' => $paid_amount,
                                'due_amount' => $due_amount,
                            ];
                        });
                    }

                    return [
                        'id' => $report->id,
                        'student_id' => $report->student_id,
                        'student_admission_no' => $report?->student?->admission_no,
                        'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                        'title' => $receipt_note,
                        'total_amount' => $total_amount,
                        'total_discount' => $total_discount,
                        'total_payable' => $total_payable,
                        'total_paid' => $total_paid,
                        'total_due' => $total_due,
                        'payment_mode' => $report->payment_mode,
                        'payment_date' => Carbon::parse($report->payment_date)->format('d-M-Y'),
                        'receipt_no' => $report->receipt_no,
                        'is_cancelled' => $report->is_cancelled,
                        'fee_type_amounts' => $feeTypeAmountsArray,
                    ];
                })->toArray();
            }
        }

        return Inertia::render('FeeReport/StudentPayments', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'studentFeePaymentReports' => $studentFeePaymentReports,
            'feeReceiptPageSize' => $feeReceiptPageSize,
            'feeReceiptCopy' => $feeReceiptCopy,
        ]);
    }

    /**
     * Display student hostel report.
     */
    public function studentHostelReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/StudentHostelReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display student head wise fee report.
     */
    public function studentHeadWiseFeeReport(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $student_status_array = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        array_push($student_status_array, ['id' => 'Tc', 'title' => 'TC']);

        $studentHeadWiseReports = [];
        $payment_fee_types = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                $fromFeeId = !empty($request->from_fee_id) ? $request->from_fee_id : null;
                $toFeeId = !empty($request->to_fee_id) ? $request->to_fee_id : null;
                $classroomId = !empty($request->classroom_id) ? $request->classroom_id : null;
                $studentStatus = !empty($request->student_status) ? $request->student_status : "";

                // get transport fee setting
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                $feeInstallments = $this->classFeeStudentAmountRepository->getStudentHeadWiseFeeInstallments($fromFeeId, $toFeeId, $classroomId, $studentStatus);

                $grand_total_amount = 0;
                $grand_total_discount = 0;
                $grand_total_payable = 0;
                $grand_total_paid = 0;
                $grand_total_due = 0;

                $studentHeadWiseReports['reports'] = [];
                $studentHeadWiseReports['fee_type_amounts'] = [];
                $studentHeadWiseReports['total_amount'] = 0;
                $studentHeadWiseReports['total_discount'] = 0;
                $studentHeadWiseReports['total_payable'] = 0;
                $studentHeadWiseReports['total_paid'] = 0;
                $studentHeadWiseReports['total_due'] = 0;

                if (count($feeInstallments) > 0) {
                    $studentFeeDiscounts = [];

                    $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                        if ($feeInstallment?->student?->promotedClassroom != null) {
                            if (!empty($feeInstallment['student']['classroom'])) {
                                unset($feeInstallment['student']['classroom']);
                            }

                            $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                            $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                        }

                        return $feeInstallment;
                    });

                    foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                        $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                        foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                            $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                            if (!$hasPayment) {
                                $fee = $groupedFeeInstallments->first()->fee;

                                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                                // add transport fee in structure if transport fee setting set to fee
                                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                    $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                    $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                    $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                    if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                        if ($currentAllocateTransport != null) {
                                            $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                            $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                        } else {
                                            $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                            $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                        }

                                        $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                            $studentId,
                                            $currentAllocateFeeId,
                                            $deallocateTransport?->fee_id
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
                                                                'fee_payments' => [],
                                                                'nullify_fee' => null,
                                                            ]);

                                                            $feeInstallments->push($newTransportFee);
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

                                        $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                        // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                        $lateFineStartDate = $fee->last_pay_date_at;
                                        $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

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
                                            'fee_payments' => [],
                                            'nullify_fee' => null,
                                        ]);

                                        $feeInstallments->push($newLateFee);
                                    }
                                }
                            }
                        }
                    }

                    foreach ($feeInstallments->groupBy('student_id') as $studentId => $groupedInstallments) {
                        $total_amount = 0;
                        $total_payable = 0;
                        $total_paid = 0;
                        $total_due = 0;
                        $total_discount = 0;
                        $payment_fee_types_amount = [];

                        foreach ($groupedInstallments as $installment) {
                            $fee_amount = !empty($installment['semester']) ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount'];
                            $payable_amount = $fee_amount;
                            $due_amount = $fee_amount;
                            $paid_amount = 0;
                            $discount_amount = 0;

                            if (!empty($installment['nullify_fee'])) {
                                $due_amount = 0;
                                $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                                $payable_amount = $paid_amount;
                            } elseif (!empty($installment['payment']) && count($installment['fee_payments']) > 0) {
                                $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                                foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                                    if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                        if ($discount->is_discount_percentage) {
                                            $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                        } else {
                                            $discount_amount = (float) $discount->amount;
                                        }

                                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                    }
                                }
                            }

                            $payable_amount = $fee_amount - $discount_amount;

                            // if ($paid_amount > 0) {
                            // }
                            // calculate fee type paid amount for grand total
                            if (isset($payment_fee_types[$installment['feeType']['fee_type']])) {
                                $payment_fee_types[$installment['feeType']['fee_type']] += $paid_amount;
                            } else {
                                $payment_fee_types[$installment['feeType']['fee_type']] = $paid_amount;
                            }

                            // calculate fee type paid amount for each date group
                            if (isset($payment_fee_types_amount[$installment['feeType']['fee_type']])) {
                                $payment_fee_types_amount[$installment['feeType']['fee_type']] += $paid_amount;
                            } else {
                                $payment_fee_types_amount[$installment['feeType']['fee_type']] = $paid_amount;
                            }

                            $total_amount += $fee_amount;
                            $total_payable += $payable_amount;
                            $total_paid += $paid_amount;
                            $total_due += $due_amount;
                            $total_discount += $discount_amount;
                        }

                        $student = $groupedInstallments?->first()?->student;

                        if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                            $student['student_status'] = 'Tc';
                        } else {
                            $student['student_status'] = $student?->status;
                        }

                        $studentHeadWiseReports['reports'][$studentId] = [
                            'student' => $student?->toArray() ?? null,
                            'fee_type_amounts' => $payment_fee_types_amount,
                            'total_amount' => $total_amount,
                            'total_discount' => $total_discount,
                            'total_payable' => $total_payable,
                            'total_paid' => $total_paid,
                            'total_due' => $total_due,
                        ];

                        $grand_total_amount += $total_amount;
                        $grand_total_discount += $total_discount;
                        $grand_total_payable += $total_payable;
                        $grand_total_paid += $total_paid;
                        $grand_total_due += $total_due;
                    }

                    $studentHeadWiseReports['total_amount'] = $grand_total_amount;
                    $studentHeadWiseReports['total_discount'] = $grand_total_discount;
                    $studentHeadWiseReports['total_payable'] = $grand_total_payable;
                    $studentHeadWiseReports['total_paid'] = $grand_total_paid;
                    $studentHeadWiseReports['total_due'] = $grand_total_due;
                }

                if (!empty($request->voucher) && $request->voucher == true) {
                    // get transport voucher data and calculate due
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                        $this->getAndProcessStudentHeadWiseTransportVouchersData(
                            $studentHeadWiseReports,
                            $payment_fee_types,
                            $transportFeeStructureSetting,
                            $request->classroom_id ?? null,
                            $request->student_status ?? "",
                        );
                    }

                    // get general voucher all due
                    $generalVouchers = $this->studentFeeVoucherRepository->getStudentHeadWiseAllVouchers(
                        $request->classroom_id ?? null,
                        $request->student_status ?? "",
                    );

                    $generalVouchers = $generalVouchers->map(function ($voucher) {
                        if ($voucher?->student?->promotedClassroom != null) {
                            if (!empty($voucher['student']['classroom'])) {
                                unset($voucher['student']['classroom']);
                            }
                            $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                            $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                        }

                        return $voucher;
                    });

                    // process general vouchers data
                    $this->processStudentHeadWiseGeneralVouchersData($studentHeadWiseReports, $payment_fee_types, $generalVouchers);

                    $studentHeadWiseReports['hasVoucher'] = true;
                }

                $studentHeadWiseReports['fee_type_amounts'] = $payment_fee_types;
            }
        }

        // sort reports by classroom roll
        $this->sortStudentHeadWiseReportByClassroomRoll($studentHeadWiseReports);

        return Inertia::render('FeeReport/StudentHeadWiseFeeReport', [
            'fees' => $fees,
            'classrooms' => $classrooms,
            'student_status_array' => $student_status_array,
            'studentHeadWiseReports' => $studentHeadWiseReports
        ]);
    }

    /*
    *   helper method to processs voucher due data
    */
    protected function sortStudentHeadWiseReportByClassroomRoll(array &$studentHeadWiseReports)
    {
        if (!empty($studentHeadWiseReports['reports'])) {
            usort($studentHeadWiseReports['reports'], function ($a, $b) {
                $rollNoA = $a['student']['classroom_roll']['roll_no'] ?? null;
                $rollNoB = $b['student']['classroom_roll']['roll_no'] ?? null;

                if ($rollNoA == $rollNoB) {
                    return 0;
                }

                // If $rollNoA is null, move it to the end
                if ($rollNoA == null) {
                    return 1;
                }

                // If $rollNoB is null, move it to the end
                if ($rollNoB == null) {
                    return -1;
                }

                return ($rollNoA < $rollNoB) ? -1 : 1;
            });
        }
    }

    /*
    *   helper method to processs voucher due data
    */
    private function processStudentHeadWiseGeneralVouchersData(&$studentHeadWiseReports, &$payment_fee_types, $vouchers)
    {
        if (count($vouchers) > 0) {
            $grand_total_amount = 0;
            $grand_total_discount = 0;
            $grand_total_payable = 0;
            $grand_total_paid = 0;
            $grand_total_due = 0;

            foreach ($vouchers->groupBy('student_id') as $studentId => $groupedVouchers) {
                $total_amount = 0;
                $total_discount = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;

                foreach ($groupedVouchers as $voucher) {
                    if (count($voucher->feeTypeAmounts) > 0) {
                        foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                            $amount = (float) $voucherAmountData->amount ?? 0;
                            $discount_amount = 0;
                            $payable_amount = $amount;
                            $paid_amount = 0;
                            $due_amount = $amount;

                            if ($voucherAmountData?->payment != null) {
                                $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $amount - $discount_amount - $paid_amount;
                                $payable_amount = $amount - $discount_amount;
                            }

                            // if ($paid_amount > 0) {
                            // }
                            // calculate fee type paid amount for grand total
                            if (isset($payment_fee_types[$voucherAmountData->feeType->fee_type])) {
                                $payment_fee_types[$voucherAmountData->feeType->fee_type] += $paid_amount;
                            } else {
                                $payment_fee_types[$voucherAmountData->feeType->fee_type] = $paid_amount;
                            }

                            // check if student data already exists. if alreday exists then update fee type amounts
                            if (isset($studentHeadWiseReports['reports'][$studentId]['fee_type_amounts'][$voucherAmountData?->feeType?->fee_type])) {
                                $studentHeadWiseReports['reports'][$studentId]['fee_type_amounts'][$voucherAmountData?->feeType?->fee_type] += $paid_amount;
                            } else {
                                $studentHeadWiseReports['reports'][$studentId]['fee_type_amounts'][$voucherAmountData?->feeType?->fee_type] = $paid_amount;
                            }

                            if (!isset($studentHeadWiseReports['reports'][$studentId]['fee_type_amounts'])) {
                                $studentHeadWiseReports['reports'][$studentId]['fee_type_amounts'] = [];
                            }

                            $total_amount += $amount;
                            $total_discount += $discount_amount;
                            $total_payable += $payable_amount;
                            $total_paid += $paid_amount;
                            $total_due += $due_amount;
                        }

                        // update reports total amounts
                        $keysToUpdate = ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_due'];

                        foreach ($keysToUpdate as $key) {
                            if (isset($studentHeadWiseReports['reports'][$studentId][$key])) {
                                $studentHeadWiseReports['reports'][$studentId][$key] += $$key;
                            } else {
                                $studentHeadWiseReports['reports'][$studentId][$key] = $$key;
                            }
                        }

                        // check if student data already exists. if does not exists then update student data
                        if (!isset($studentHeadWiseReports['reports'][$studentId]['student'])) {
                            $student = $voucher?->student;

                            if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                                $student['student_status'] = 'Tc';
                            } else {
                                $student['student_status'] = $student?->status;
                            }

                            $studentHeadWiseReports['reports'][$studentId]['student'] = $student?->toArray();
                        }
                    }
                }

                $grand_total_amount += $total_amount;
                $grand_total_discount += $total_discount;
                $grand_total_payable += $total_payable;
                $grand_total_paid += $total_paid;
                $grand_total_due += $total_due;
            }

            // update reports total amounts
            $keysToUpdate = ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_due'];

            foreach ($keysToUpdate as $key) {
                if (isset($studentHeadWiseReports[$key])) {
                    $studentHeadWiseReports[$key] += ${'grand_' . $key};
                } else {
                    $studentHeadWiseReports[$key] = ${'grand_' . $key};
                }
            }
        }
    }

    /*
    *   helper method to processs transport voucher due data for student outstanding due
    */
    private function getAndProcessStudentHeadWiseTransportVouchersData(&$studentHeadWiseReports, &$payment_fee_types, $transportFeeStructureSetting, $classroomId = null, $studentStatus = "")
    {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndActiveStatus($classroomId, $studentStatus);

        if (count($students) > 0) {
            $students->loadMissing([
                'promotedClassroom',
                'studentTransferCertificate',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId());

                    if (!empty($classroomId)) {
                        $query->where('classroom_id', $classroomId);
                    }
                }
            ]);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                $transportFeeType = $this->feeTypeRepository->getTransportFeeType();

                $total_amount = 0;
                $total_discount = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount ?? 0;
                        $discount_amount = 0;
                        $payable_amount = $fee_amount;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        // if ($paid_amount > 0) {
                        // }
                        // calculate fee type paid amount for grand total
                        if (isset($payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'])) {
                            $payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'] += $paid_amount;
                        } else {
                            $payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'] = $paid_amount;
                        }

                        // check if student data already exists. if alreday exists then update fee type amounts
                        if (isset($studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'][$transportFeeType?->fee_type ?? 'Transport'])) {
                            $studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'][$transportFeeType?->fee_type ?? 'Transport'] += $paid_amount;
                        } else {
                            $studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'][$transportFeeType?->fee_type ?? 'Transport'] = $paid_amount;
                        }

                        if (!isset($studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'])) {
                            $studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'] = [];
                        }

                        $total_amount += $fee_amount;
                        $total_discount += $discount_amount;
                        $total_payable += $payable_amount;
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport?->amount ?? 0;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    if ($fee_amount > 0) {
                        $payable_amount = $fee_amount;
                        $due_amount = $fee_amount;

                        foreach ($allocateTransportVouchers as $voucher) {
                            $total_amount += $fee_amount;
                            $total_payable += $payable_amount;
                            $total_due += $due_amount;
                        }

                        if (!isset($studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'])) {
                            $studentHeadWiseReports['reports'][$student->id]['fee_type_amounts'] = [];
                        }
                    }
                }

                if ($total_amount > 0) {
                    // update reports total amounts
                    $keysToUpdate = ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_due'];

                    foreach ($keysToUpdate as $key) {
                        if (isset($studentHeadWiseReports['reports'][$student->id][$key])) {
                            $studentHeadWiseReports['reports'][$student->id][$key] += $$key;
                        } else {
                            $studentHeadWiseReports['reports'][$student->id][$key] = $$key;
                        }

                        if (isset($studentHeadWiseReports[$key])) {
                            $studentHeadWiseReports[$key] += $$key;
                        } else {
                            $studentHeadWiseReports[$key] = $$key;
                        }
                    }

                    if (!isset($studentHeadWiseReports['reports'][$student->id]['student'])) {
                        if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                            $student['student_status'] = 'Tc';
                        } else {
                            $student['student_status'] = $student?->status;
                        }

                        $studentHeadWiseReports['reports'][$student->id]['student'] = $student?->toArray();
                    }
                }
            }
        }
    }

    /**
     * Display group wise student report.
     */
    public function groupWiseStudent(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/GroupWiseStudent', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display student fee type wise paid report.
     */
    public function studentFeeTypeWisePaidReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/StudentFeeTypeWisePaidReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display student ledger report.
     */
    public function studentLedgerReport(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveIdTitle();

        $students = [];
        $activeStudents = [];
        $inactiveStudents = [];
        $tcStudents = [];
        $student = null;
        $student_status_array = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        array_push($student_status_array, ['id' => 'Tc', 'title' => 'TC']);

        if ($request->isMethod('POST')) {
            $classroomId = $request?->classroom_id;

            if (!empty($request?->admission_no)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($request->admission_no);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getActiveAndInActiveStudentsByClassroomId($classroomId);

                if ($students->count() > 0) {
                    $students->loadMissing(['studentTransferCertificate', 'promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    }]);

                    $students = $students->map(function ($student) {

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }

                        $rollNo = $student?->classroomRoll?->roll_no ?? "";

                        $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                        return $student;
                    });

                    $activeStudents = $students->filter(function ($student) {
                        return $student?->status == Status::ACTIVE;
                    });

                    $inactiveStudents = $students->filter(function ($student) {
                        return $student?->status == Status::INACTIVE  && $student?->studentTransferCertificate == null;
                    });

                    $tcStudents = $students->filter(function ($student) {
                        return $student?->status == Status::INACTIVE && $student?->studentTransferCertificate != null;
                    });
                }
            }
        }

        $groupedStudents = [
            'active' => [
                'student_type' => 'Active',
                'options' => $activeStudents
            ],
            'inactive' => [
                'student_type' => 'InActive',
                'options' => $inactiveStudents
            ],
            'tc' => [
                'student_type' => 'TC',
                'options' => $tcStudents
            ],
        ];

        return Inertia::render('FeeReport/StudentLedgerReport', [
            'classrooms' => $classrooms,
            'fees' => $fees,
            'students' => $groupedStudents,
            'student' => $student,
            'student_status_array' => $student_status_array,
        ]);
    }

    /**
     * Display student fee agreement.
     */
    public function feeAgreement(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        $students = [];
        $activeStudents = [];
        $inactiveStudents = [];
        $tcStudents = [];
        $student = null;
        $student_status_array = [];
        $guardian_array = [
            [
                'id' => 'guardian',
                'title' => 'guardian',
            ],
            [
                'id' => 'sibling',
                'title' => 'sibling',
            ],
            [
                'id' => 'student',
                'title' => 'student',
            ],
        ];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        array_push($student_status_array, ['id' => 'Tc', 'title' => 'TC']);

        if ($request->isMethod('POST')) {
            $classroomId = $request?->classroom_id;

            if (!empty($request?->admission_no)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($request->admission_no);
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

                if ($students->count() > 0) {
                    $students->loadMissing(['studentTransferCertificate', 'promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    }]);

                    $students = $students->map(function ($student) {

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }

                        $rollNo = $student?->classroomRoll?->roll_no ?? "";

                        $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                        return $student;
                    });

                    $activeStudents = $students->filter(function ($student) {
                        return $student?->status == Status::ACTIVE;
                    });

                    $inactiveStudents = $students->filter(function ($student) {
                        return $student?->status == Status::INACTIVE  && $student?->studentTransferCertificate == null;
                    });

                    $tcStudents = $students->filter(function ($student) {
                        return $student?->status == Status::INACTIVE && $student?->studentTransferCertificate != null;
                    });
                }
            }
        }

        $groupedStudents = [
            'active' => [
                'student_type' => 'Active',
                'options' => $activeStudents
            ],
            'inactive' => [
                'student_type' => 'InActive',
                'options' => $inactiveStudents
            ],
            'tc' => [
                'student_type' => 'TC',
                'options' => $tcStudents
            ],
        ];

        return Inertia::render('FeeReport/FeeAgreement', [
            'classrooms' => $classrooms,
            'students' => $groupedStudents,
            'student' => $student,
            'student_status_array' => $student_status_array,
            'guardian_array' => $guardian_array,
        ]);
    }

    /**
     * Display student.
     */
    public function studentWalletReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/StudentWalletReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }


    /**
     * Display fee class wise summary report.
     */
    public function classWiseSummary(): Response
    {
        $fees = $this->feeRepository->getActiveIdTitle();
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeCollectionSummary = [];
        $classWiseData = [];
        $installmentWiseData = [];

        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getClassAndInstallmentWiseFeePaymentSummary();

        if ($feeCollectionSummaryData->count() > 0) {
            $tempClassWiseData = [];
            $tempInstallmentWiseData = [];

            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($feeCollection) {
                $feeCollection->fee_payments->transform(function ($feePayment) {
                    if ($feePayment?->student?->promotedClassroom != null) {
                        $feePayment['student']['classroom_id'] = $feePayment?->student?->promotedClassroom?->id;
                    }

                    return $feePayment;
                });
                return $feeCollection;
            });

            foreach ($feeCollectionSummaryData as $summaryData) {
                foreach ($summaryData->fee_payments as $feePayment) {
                    if ($feePayment?->payment_status != PaymentStatus::CANCELLED->value) {
                        if ($feePayment->fee_payment_type == FeePaymentType::FEEINSTALLMENT->value) {
                            if (isset($tempInstallmentWiseData[$feePayment->fee_id])) {
                                $tempInstallmentWiseData[$feePayment->fee_id] += (float) $feePayment->paid_amount ?? 0;
                            } else {
                                $tempInstallmentWiseData[$feePayment->fee_id] = (float) $feePayment->paid_amount ?? 0;
                            }
                        }

                        if (isset($tempClassWiseData[$feePayment->student->classroom_id])) {
                            $tempClassWiseData[$feePayment->student->classroom_id] += (float) $feePayment->paid_amount ?? 0;
                        } else {
                            $tempClassWiseData[$feePayment->student->classroom_id] = (float) $feePayment->paid_amount ?? 0;
                        }
                    }
                }
            }

            foreach ($classrooms as $classroom) {
                $classWiseData[$classroom->title] = $tempClassWiseData[$classroom->id] ?? 0;
            }

            $fees->filter(function ($fee) use ($tempInstallmentWiseData) {
                return in_array($fee->id, array_keys($tempInstallmentWiseData));
            })->each(function ($fee) use (&$installmentWiseData, &$tempInstallmentWiseData) {
                $installmentWiseData[$fee->title] = $tempInstallmentWiseData[$fee->id] ?? 0;
            });
        }

        $feeCollectionSummary['class_wise_summary'] = $classWiseData;
        $feeCollectionSummary['installment_wise_summary'] = $installmentWiseData;

        return Inertia::render('FeeReport/ClassWiseSummary', [
            'feeCollectionSummary' => $feeCollectionSummary,
        ]);
    }

    /**
     * Display cancellation payment reports.
     */
    public function feeCancellationReport(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        $students = [];
        $student = null;
        $cancellationReports = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $studentId = $request->student_id ?? null;
            $admissionNo = $request->admission_no ?? "";

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
                $studentId = $student?->id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query)  use ($classroomId) {
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

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }

            if (empty($studentId) && !empty($admissionNo) && $student == null) {
                $cancellationReports = [];
            } else {
                $cancellationReports = $this->feePaymentMethodRepository->getCancellationReports($classroomId, $studentId);
            }

            if (count($cancellationReports) > 0) {
                $cancellationReports = $cancellationReports->map(function ($report) {
                    $total_amount = 0;

                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    if (count($report->fee_payments) > 0) {
                        foreach ($report->fee_payments as $payment) {
                            $total_amount += (float) $payment->paid_amount ?? 0;
                        }
                    }

                    $formatted_date = Carbon::parse($report->cancellation_date)->format('d M,Y');

                    unset($report['cancellation_date']);

                    $report['cancellation_date'] = $formatted_date;
                    $report['total_amount'] = $total_amount;

                    return $report;
                })->toArray();
            }
        }

        return Inertia::render('FeeReport/FeeCancellationReport', [
            'classrooms' => $classrooms,
            'students' => $students,
            'cancellationReports' => $cancellationReports,
            'student' => $student,
        ]);
    }

    /**
     * Display fee summary report.
     */
    public function summaryReport(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveIdTitle();
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeCategories = $this->categoryRepository->getActiveFeeCategoryAll();
        $feeSummaryReport = [];

        if ($request->isMethod('POST')) {
            $fromFeeId = $request->from_fee_id ?? null;
            $toFeeId = $request->to_fee_id ?? null;
            $feeCategoryId = $request->fee_category_id ?? null;
            $classroomId = $request->classroom_id ?? null;

            if (!empty($fromFeeId) && !empty($toFeeId)) {
                $feeInstallmentsData = [];
                $generalVouchersData = [];
                $transportVouchersData = [];

                // get fee types
                $feeTypes = $this->feeTypeRepository->getActiveAll();
                // get transport fee structure setting
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                // get fee installments data
                $feeInstallmentsData = $this->getFeeSummaryInstallmentsData($transportFeeStructureSetting, $fromFeeId, $toFeeId, $feeCategoryId, $classroomId);

                if (!empty($request->voucher) && $request->voucher == true) {
                    // get genral vouchers data
                    $generalVouchersData = $this->getFeeSummaryGeneralVouchersData($feeCategoryId, $classroomId);

                    // get transport vouchers data
                    $transportVouchersData = $this->getFeeSummaryTransportVouchersData($transportFeeStructureSetting, $feeCategoryId, $classroomId);
                }

                if (count($feeTypes) > 0) {
                    $feeTypes->loadMissing(['adjust_fee_payment_amounts', 'payment_refunds.refund_method']);

                    foreach ($feeTypes as $feeType) {
                        $total_amount = 0;
                        $total_discount = 0;
                        $total_payable = 0;
                        $total_paid = 0;
                        $total_due = 0;
                        $total_refund = 0;
                        $total_nullified = 0;
                        $total_adjusted = 0;

                        if (count($feeType->adjust_fee_payment_amounts) > 0) {
                            $total_adjusted = $feeType?->adjust_fee_payment_amounts?->sum('adjust_amount') ?? 0;
                        }

                        if (count($feeType->payment_refunds) > 0) {
                            foreach ($feeType->payment_refunds as $refund) {
                                if ($refund?->refund_method?->refund_status != RefundStatus::CANCELED->value) {
                                    $total_refund += $refund->refund_amount ?? 0;
                                }
                            }
                        }

                        if (!empty($feeInstallmentsData[$feeType->id])) {
                            $total_amount += $feeInstallmentsData[$feeType->id]['total_amount'] ?? 0;
                            $total_discount += $feeInstallmentsData[$feeType->id]['total_discount'] ?? 0;
                            $total_payable += $feeInstallmentsData[$feeType->id]['total_payable'] ?? 0;
                            $total_paid += $feeInstallmentsData[$feeType->id]['total_paid'] ?? 0;
                            $total_due += $feeInstallmentsData[$feeType->id]['total_due'] ?? 0;
                            $total_nullified += $feeInstallmentsData[$feeType->id]['total_nullified'] ?? 0;
                        }

                        if (!empty($generalVouchersData[$feeType->id])) {
                            $total_amount += $generalVouchersData[$feeType->id]['total_amount'] ?? 0;
                            $total_discount += $generalVouchersData[$feeType->id]['total_discount'] ?? 0;
                            $total_payable += $generalVouchersData[$feeType->id]['total_payable'] ?? 0;
                            $total_paid += $generalVouchersData[$feeType->id]['total_paid'] ?? 0;
                            $total_due += $generalVouchersData[$feeType->id]['total_due'] ?? 0;
                        }

                        if (!empty($transportVouchersData[$feeType->id])) {
                            $total_amount += $transportVouchersData[$feeType->id]['total_amount'] ?? 0;
                            $total_discount += $transportVouchersData[$feeType->id]['total_discount'] ?? 0;
                            $total_payable += $transportVouchersData[$feeType->id]['total_payable'] ?? 0;
                            $total_paid += $transportVouchersData[$feeType->id]['total_paid'] ?? 0;
                            $total_due += $transportVouchersData[$feeType->id]['total_due'] ?? 0;
                        }

                        $feeSummaryReport[$feeType->id] = [
                            'fee_type_id' => $feeType->id,
                            'fee_type_title' => $feeType->fee_type,
                            'total_amount' => $total_amount,
                            'total_discount' => $total_discount,
                            'total_payable' => $total_payable,
                            'total_paid' => $total_paid,
                            'total_due' => $total_due,
                            'total_refund' => $total_refund,
                            'total_nullified' => $total_nullified,
                            'total_adjusted' => $total_adjusted,
                        ];
                    }
                }
            }
        }

        return Inertia::render('FeeReport/SummaryReport', [
            'fees' => $fees,
            'classrooms' => $classrooms,
            'feeCategories' => $feeCategories,
            'feeSummaryReport' => $feeSummaryReport,
        ]);
    }

    /**
     * helper method to get fee summary general vouchers data
     */
    private function getFeeSummaryInstallmentsData($transportFeeStructureSetting, int $fromFeeId, int $toFeeId, int $feeCategoryId = null, int $classroomId = null)
    {
        $studentFeeDiscounts = [];
        $feeTypeAmountArray = [];

        $feeInstallments = $this->classFeeStudentAmountRepository->getStudentFeeInstallments($fromFeeId, $toFeeId, $feeCategoryId, $classroomId);

        if (count($feeInstallments) > 0) {
            // get transport fee and late fee if does not have any payment
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $amount = (float) $currentAllocateTransport?->amount ?? 0;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();
                                    $discount_amount = 0;

                                    if ($transportFee != null && (empty($feeCategoryId) || (!empty($feeCategoryId) && $transportFee?->category_id == $feeCategoryId))) {

                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (!empty($studentFeeDiscounts[$studentId])) {
                                                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $amount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    $payable_amount = $amount - $discount_amount;

                                                    $feeTypeAmountArray[$transportFee?->id]['total_amount'] = ($feeTypeAmountArray[$transportFee?->id]['total_amount'] ?? 0) + $amount;
                                                    $feeTypeAmountArray[$transportFee?->id]['total_discount'] = ($feeTypeAmountArray[$transportFee?->id]['total_discount'] ?? 0) + $discount_amount;
                                                    $feeTypeAmountArray[$transportFee?->id]['total_payable'] = ($feeTypeAmountArray[$transportFee?->id]['total_payable'] ?? 0) + $payable_amount;
                                                    $feeTypeAmountArray[$transportFee?->id]['total_due'] = ($feeTypeAmountArray[$transportFee?->id]['total_due'] ?? 0) + $payable_amount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        $lateFee = $this->feeTypeRepository->getLateFeeType();

                        if ($lateFee != null && (empty($feeCategoryId) || (!empty($feeCategoryId) && $lateFee?->category_id == $feeCategoryId))) {
                            $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();
                            $discount_amount = 0;

                            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                $amount = 0;

                                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                $lateFineStartDate = $fee->last_pay_date_at;
                                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                    $currentDate = date("Y-m-d");
                                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                    if ($lateFineType == LateFineType::DAILY->value) {
                                        $amount = (float) $lateFineAmount * $daysDifference;
                                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                        $weeksDifference = floor($daysDifference / 7);
                                        $amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                        // Extract year and month from the start date
                                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                        // Extract year and month from the current date
                                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                        // Calculate the difference in months
                                        $startMonths = ($startYear * 12) + $startMonth;
                                        $currentMonths = ($currentYear * 12) + $currentMonth;
                                        $monthsDifference = $currentMonths - $startMonths;

                                        $amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                    }
                                }

                                if (count($studentFeeDiscounts[$studentId]) > 0) {
                                    foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * $amount;
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }
                                        }
                                    }
                                }

                                $payable_amount = $amount - $discount_amount;

                                $feeTypeAmountArray[$lateFee?->id]['total_amount'] = ($feeTypeAmountArray[$lateFee?->id]['total_amount'] ?? 0) + $amount;
                                $feeTypeAmountArray[$lateFee?->id]['total_discount'] = ($feeTypeAmountArray[$lateFee?->id]['total_discount'] ?? 0) + $discount_amount;
                                $feeTypeAmountArray[$lateFee?->id]['total_payable'] = ($feeTypeAmountArray[$lateFee?->id]['total_payable'] ?? 0) + $payable_amount;
                                $feeTypeAmountArray[$lateFee?->id]['total_due'] = ($feeTypeAmountArray[$lateFee?->id]['total_due'] ?? 0) + $payable_amount;
                            }
                        }
                    }
                }
            }

            foreach ($feeInstallments as $installment) {
                $semester = $installment['semester'] ?? 1;
                $amount = ((float) $installment['amount'] ?? 0) * $semester;
                $payable_amount = $amount;
                $due_amount = $payable_amount;
                $paid_amount = 0;
                $discount_amount = 0;
                $nullified_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $nullified_amount = (float) $installment['nullify_fee']['nullified_amount'] ?? 0;
                    $paid_amount = $payable_amount;
                } elseif (!empty($installment['payment'])) {
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $due_amount =  $amount - $discount_amount - $paid_amount;
                    $payable_amount = $amount - $discount_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount =  $amount - $discount_amount - $paid_amount;
                            $payable_amount =  $amount - $discount_amount;
                        }
                    }
                }

                $feeTypeAmountArray[$installment?->fee_type_id]['total_amount'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_amount'] ?? 0) + $amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_discount'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_discount'] ?? 0) + $discount_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_payable'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_payable'] ?? 0) + $payable_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_paid'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_paid'] ?? 0) + $paid_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_due'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_due'] ?? 0) + $due_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_nullified'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_nullified'] ?? 0) + $nullified_amount;
            }
        }

        return $feeTypeAmountArray;
    }

    /**
     * helper method to get fee summary general vouchers data
     */
    private function getFeeSummaryGeneralVouchersData(int $feeCategoryId = null, int $classroomId = null)
    {
        $vouchersData = [];

        // get all active general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getFeeVouchersByClassroomIdAndFeeCategoryId($feeCategoryId, $classroomId);

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $amount = (float) $feeTypeAmount->amount ?? 0;
                    $payable_amount = $amount;
                    $due_amount = $payable_amount;
                    $discount_amount = 0;
                    $paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $due_amount = $amount - $discount_amount - $paid_amount;
                        $payable_amount = $amount - $discount_amount;
                    }

                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_amount'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_amount'] ?? 0) + $amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_discount'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_discount'] ?? 0) + $discount_amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_payable'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_payable'] ?? 0) + $payable_amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_paid'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_paid'] ?? 0) + $paid_amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_due'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_due'] ?? 0) + $due_amount;
                }
            }
        }

        return $vouchersData;
    }

    /**
     * helper method to get fee summary transport vouchers data
     */
    private function getFeeSummaryTransportVouchersData($transportFeeStructureSetting, int $feeCategoryId = null, int $classroomId = null)
    {
        $vouchersData = [];

        // get all active students
        if (!empty($classroomId)) {
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
        } else {
            $students = $this->studentRepository->getActiveNameAndId();
        }

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null  && (empty($feeCategoryId) || (!empty($feeCategoryId) && $transportFee?->category_id == $feeCategoryId)) && count($students) > 0) {
            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $amount = (float) $allocate->amount ?? 0;
                        $payable_amount = $amount;
                        $due_amount = $payable_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $due_amount = $amount - $discount_amount - $paid_amount;
                            $payable_amount = $amount - $discount_amount;
                        }

                        $vouchersData[$transportFee?->id]['total_amount'] = ($vouchersData[$transportFee?->id]['total_amount'] ?? 0) + $amount;
                        $vouchersData[$transportFee?->id]['total_discount'] = ($vouchersData[$transportFee?->id]['total_discount'] ?? 0) + $discount_amount;
                        $vouchersData[$transportFee?->id]['total_payable'] = ($vouchersData[$transportFee?->id]['total_payable'] ?? 0) + $payable_amount;
                        $vouchersData[$transportFee?->id]['total_paid'] = ($vouchersData[$transportFee?->id]['total_paid'] ?? 0) + $paid_amount;
                        $vouchersData[$transportFee?->id]['total_due'] = ($vouchersData[$transportFee?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $amount = (float) $currentAllocateTransport->amount ?? 0;
                    } else {
                        $amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $payable_amount = $amount;
                    $due_amount = $payable_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $vouchersData[$transportFee?->id]['total_amount'] = ($vouchersData[$transportFee?->id]['total_amount'] ?? 0) + $amount;
                        $vouchersData[$transportFee?->id]['total_payable'] = ($vouchersData[$transportFee?->id]['total_payable'] ?? 0) + $payable_amount;
                        $vouchersData[$transportFee?->id]['total_due'] = ($vouchersData[$transportFee?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }
            }
        }

        return $vouchersData;
    }

    /**
     * Display the schools.
     */
    public function dailyOnlineFeePayment(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeReport/DailyOnlineFeePayment', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display special fee type reports
     */
    public function specialFeeTypeReport(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $specialFeeTypes = $this->feeTypeRepository->getActiveFeeSpecialTypesAll()
            ->map(function ($feeType) {
                return [
                    'id' => $feeType->id,
                    'title' => $feeType->fee_type,
                ];
            });

        $specialFeeTypeReport = [];

        if ($request->isMethod('POST')) {
            $feeId = $request->fee_id ?? null;
            $feeTypeId = $request->fee_type_id ?? null;
            $classroomId = $request->classroom_id ?? null;

            $specialFeeTypeReportData = $this->classFeeStudentAmountRepository->getSpecialFeeTypeFeeInstallment($feeId, $feeTypeId, $classroomId);

            if (count($specialFeeTypeReportData) > 0) {
                $specialFeeTypeReportData = $specialFeeTypeReportData->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroomId = $report?->student?->classroom_id;

                    $report?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    }]);

                    return $report;
                });

                foreach ($specialFeeTypeReportData->groupBy('fee_type_id') as $feeTypeReports) {
                    foreach ($feeTypeReports->groupBy('student_id') as  $studentReports) {
                        $feeInstallment = $studentReports->sortByDesc('id')->first();

                        $amount = ($feeInstallment?->amount ?? 0) * ($feeInstallment?->semester ?? 1);
                        $student_name = "";

                        if ($feeInstallment?->student != null) {
                            $student_name = "{$feeInstallment?->student?->first_name} {$feeInstallment?->student?->middle_name} {$feeInstallment?->student?->last_name}";
                        }

                        $tempArray = [
                            'fee_type_title' => $feeInstallment?->feeType?->fee_type ?? "",
                            'student_name' => $student_name,
                            'admission_no' => $feeInstallment?->student?->admission_no ?? "",
                            'roll_no' => $feeInstallment?->student?->classroomRoll?->roll_no ?? "",
                            'classroom_title' => $feeInstallment?->student?->classroom?->title ?? "",
                            'amount' => $amount,
                        ];

                        $specialFeeTypeReport[] = $tempArray;
                    }
                }
            }
        }

        return Inertia::render('FeeReport/SpecialFeeTypeReport', [
            'classrooms' => $classrooms,
            'fees' => $fees,
            'specialFeeTypes' => $specialFeeTypes,
            'specialFeeTypeReport' => $specialFeeTypeReport
        ]);
    }

    /**
     * Display the schools.
     */
    public function guardianWiseDueReport(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $guardian_array = [
            [
                'id' => 'guardian',
                'title' => 'guardian',
            ],
            [
                'id' => 'sibling',
                'title' => 'sibling',
            ]
        ];

        $student_status_array = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        $payment_status_array = [];

        foreach (PaymentStatus::cases() as $case) {
            if (in_array($case, [PaymentStatus::PAID, PaymentStatus::DUE])) {
                array_push($payment_status_array, ['title' => $case->value, 'value' => $case->value]);
            }
        }

        $transport_routes = $this->transportRepository->getAllRoute()->map(function ($route) {
            return [
                'id' => $route->id,
                'title' => $route->name,
            ];
        });

        $guardianWiseReport = [];

        if ($request->isMethod('POST')) {
            $paymentStatus = $request->payment_status ?? "";
            $includeVoucher = $request->voucher ?? false;
            $studentStatus = $request->student_status ?? "";
            $transportRouteId = $request->transport_route ?? null;
            $classroomId = $request->classroom_id ?? null;
            $guardianType = $request->guardian_type ?? "";
            $fromFeeId = $request->from_fee_id ?? null;
            $toFeeId = $request->to_fee_id ?? null;

            if (!empty($fromFeeId) && !empty($toFeeId) && !empty($guardianType)) {
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                $feeInstallmentsData = $this->getGuardianWiseFeeInstallmentsData(
                    $transportFeeStructureSetting,
                    $guardianType,
                    $fromFeeId,
                    $toFeeId,
                    $paymentStatus,
                    $studentStatus,
                    $transportRouteId,
                    $classroomId,
                );

                $guardianWiseReport = $feeInstallmentsData;

                $generalVouchersData = [];
                $transportVouchersData = [];

                // get voucher reports
                if ($includeVoucher == true) {
                    // get genral vouchers data
                    $generalVouchersData = $this->getGuardianWiseGeneralVouchersData(
                        $transportFeeStructureSetting,
                        $guardianType,
                        $paymentStatus,
                        $studentStatus,
                        $transportRouteId,
                        $classroomId
                    );

                    // get transport vouchers data
                    $transportVouchersData = $this->getGuardianWiseTransportVouchersData(
                        $transportFeeStructureSetting,
                        $guardianType,
                        $paymentStatus,
                        $studentStatus,
                        $transportRouteId,
                        $classroomId
                    );
                }

                if (!empty($generalVouchersData)) {
                    $this->updateGuardianWiseReport($guardianWiseReport, $generalVouchersData);
                }

                if (!empty($transportVouchersData)) {
                    $this->updateGuardianWiseReport($guardianWiseReport, $transportVouchersData);
                }
            }
        }

        return Inertia::render('FeeReport/GuardianWiseDueReport', [
            'classrooms' => $classrooms,
            'fees' => $fees,
            'student_status_array' => $student_status_array,
            'guardian_array' => $guardian_array,
            'payment_status_array' => $payment_status_array,
            'transport_routes' => $transport_routes,
            'guardianWiseReport' => $guardianWiseReport,
        ]);
    }

    /**
     * helper method to update guardian wise report
     */
    private function updateGuardianWiseReport(array &$guardianWiseReport, array $vouchersData)
    {
        foreach ($vouchersData as $guardianId => $guardianData) {
            if (!isset($guardianWiseReport[$guardianId])) {
                $guardianWiseReport[$guardianId] = $guardianData;
            } else {
                foreach ($guardianData['student_data'] as $studentId => $studentData) {
                    if (!isset($guardianWiseReport[$guardianId]['student_data'][$studentId])) {
                        $guardianWiseReport[$guardianId]['student_data'][$studentId] = $studentData;
                    } else {
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['name'] = $studentData['name'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['admission_no'] = $studentData['admission_no'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['roll_no'] = $studentData['roll_no'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['classroom_title'] = $studentData['classroom_title'];

                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_amount'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_amount'] ?? 0) + $studentData['total_amount'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_discount'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_discount'] ?? 0) + $studentData['total_discount'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_payable'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_payable'] ?? 0) + $studentData['total_payable'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_paid'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_paid'] ?? 0) + $studentData['total_paid'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_due'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_due'] ?? 0) + $studentData['total_due'] ?? 0;
                    }
                }

                $guardianWiseReport[$guardianId]['total_amount'] = ($guardianWiseReport[$guardianId]['total_amount'] ?? 0) + $studentData['total_amount'] ?? 0;
                $guardianWiseReport[$guardianId]['total_discount'] = ($guardianWiseReport[$guardianId]['total_discount'] ?? 0) + $studentData['total_discount'] ?? 0;
                $guardianWiseReport[$guardianId]['total_payable'] = ($guardianWiseReport[$guardianId]['total_payable'] ?? 0) + $studentData['total_payable'] ?? 0;
                $guardianWiseReport[$guardianId]['total_paid'] = ($guardianWiseReport[$guardianId]['total_paid'] ?? 0) + $studentData['total_paid'] ?? 0;
                $guardianWiseReport[$guardianId]['total_due'] = ($guardianWiseReport[$guardianId]['total_due'] ?? 0) + $studentData['total_due'] ?? 0;
            }
        }
    }

    /**
     * helper method to get guardian wise fee installments data
     */
    private function getGuardianWiseFeeInstallmentsData(
        $transportFeeStructureSetting,
        string $guardianType,
        int $fromFeeId,
        int $toFeeId,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $feeInstallmentsData = [];
        $studentAmountArray = [];
        $studentFeeDiscounts = [];

        $feeInstallments = $this->classFeeStudentAmountRepository->getGuardianWiseStudentFeeInstallments(
            $transportFeeStructureSetting,
            $fromFeeId,
            $toFeeId,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        if (count($feeInstallments) > 0) {
            $feeInstallments->loadMissing(['student.due_follow_ups:id,student_id,created_by,due_amount,note,call_picked,commitment_date,created_at']);

            if ($guardianType == 'guardian') {
                $feeInstallments->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $feeInstallments->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['student']['classroom'])) {
                        unset($feeInstallment['student']['classroom']);
                    }

                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                $classroomId = $feeInstallment?->student?->classroom_id;

                $feeInstallment?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $feeInstallment;
            });

            // get transport fee and late fee if does not have any payment
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $amount = (float) $currentAllocateTransport?->amount ?? 0;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();
                                    $discount_amount = 0;

                                    if ($transportFee != null) {
                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (!empty($studentFeeDiscounts[$studentId])) {
                                                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $amount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    $payable_amount = $amount - $discount_amount;

                                                    $studentAmountArray[$studentId]['total_amount'] = ($studentAmountArray[$studentId]['total_amount'] ?? 0) + $amount;
                                                    $studentAmountArray[$studentId]['total_discount'] = ($studentAmountArray[$studentId]['total_discount'] ?? 0) + $discount_amount;
                                                    $studentAmountArray[$studentId]['total_payable'] = ($studentAmountArray[$studentId]['total_payable'] ?? 0) + $payable_amount;
                                                    $studentAmountArray[$studentId]['total_due'] = ($studentAmountArray[$studentId]['total_due'] ?? 0) + $payable_amount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        $lateFee = $this->feeTypeRepository->getLateFeeType();

                        if ($lateFee != null) {
                            $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();
                            $discount_amount = 0;

                            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                $amount = 0;

                                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                $lateFineStartDate = $fee->last_pay_date_at;
                                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                    $currentDate = date("Y-m-d");
                                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                    if ($lateFineType == LateFineType::DAILY->value) {
                                        $amount = (float) $lateFineAmount * $daysDifference;
                                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                        $weeksDifference = floor($daysDifference / 7);
                                        $amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                        // Extract year and month from the start date
                                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                        // Extract year and month from the current date
                                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                        // Calculate the difference in months
                                        $startMonths = ($startYear * 12) + $startMonth;
                                        $currentMonths = ($currentYear * 12) + $currentMonth;
                                        $monthsDifference = $currentMonths - $startMonths;

                                        $amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                    }
                                }

                                if (count($studentFeeDiscounts[$studentId]) > 0) {
                                    foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * $amount;
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }
                                        }
                                    }
                                }

                                $payable_amount = $amount - $discount_amount;

                                $studentAmountArray[$studentId]['total_amount'] = ($studentAmountArray[$studentId]['total_amount'] ?? 0) + $amount;
                                $studentAmountArray[$studentId]['total_discount'] = ($studentAmountArray[$studentId]['total_discount'] ?? 0) + $discount_amount;
                                $studentAmountArray[$studentId]['total_payable'] = ($studentAmountArray[$studentId]['total_payable'] ?? 0) + $payable_amount;
                                $studentAmountArray[$studentId]['total_due'] = ($studentAmountArray[$studentId]['total_due'] ?? 0) + $payable_amount;
                            }
                        }
                    }
                }
            }

            foreach ($feeInstallments as $installment) {
                $semester = $installment['semester'] ?? 1;
                $amount = ((float) $installment['amount'] ?? 0) * $semester;
                $payable_amount = $amount;
                $due_amount = $payable_amount;
                $paid_amount = 0;
                $discount_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $paid_amount = $payable_amount;
                } elseif (!empty($installment['payment'])) {
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $due_amount =  $amount - $discount_amount - $paid_amount;
                    $payable_amount = $amount - $discount_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount =  $amount - $discount_amount - $paid_amount;
                            $payable_amount =  $amount - $discount_amount;
                        }
                    }
                }

                $studentAmountArray[$installment?->student_id]['total_amount'] = ($studentAmountArray[$installment?->student_id]['total_amount'] ?? 0) + $amount;
                $studentAmountArray[$installment?->student_id]['total_discount'] = ($studentAmountArray[$installment?->student_id]['total_discount'] ?? 0) + $discount_amount;
                $studentAmountArray[$installment?->student_id]['total_payable'] = ($studentAmountArray[$installment?->student_id]['total_payable'] ?? 0) + $payable_amount;
                $studentAmountArray[$installment?->student_id]['total_paid'] = ($studentAmountArray[$installment?->student_id]['total_paid'] ?? 0) + $paid_amount;
                $studentAmountArray[$installment?->student_id]['total_due'] = ($studentAmountArray[$installment?->student_id]['total_due'] ?? 0) + $due_amount;

                $student_name = "";
                $father_name = "";
                $father_phone = "";
                $guardian_name = "";
                $guardian_phone = "";
                $follow_ups = [];

                if ($installment?->student != null) {
                    $student_name = "{$installment?->student?->first_name} {$installment?->student?->middle_name} {$installment?->student?->last_name}";
                }

                if ($installment?->student?->due_follow_ups != null) {
                    $follow_ups = $installment?->student?->due_follow_ups?->map(function ($followUp) {
                        $followUp['called_date'] = Carbon::parse($followUp?->created_at)->format('d-M-Y');
                        $followUp['commitment_date'] = Carbon::parse($followUp?->commitment_date)->format('d-M-Y');

                        return $followUp;
                    })?->toArray();
                }

                if ($installment?->father != null) {
                    $father_name = "{$installment?->father?->first_name} {$installment?->father?->middle_name} {$installment?->father?->last_name}";
                    $father_phone = $installment?->father?->phone ?? "";
                }

                if ($guardianType == 'guardian') {
                    $guardianId = $installment?->guardian?->user_id;

                    if ($installment?->guardian != null) {
                        $guardian_name = "{$installment?->guardian?->first_name} {$installment?->guardian?->middle_name} {$installment?->guardian?->last_name}";
                        $guardian_phone = $installment?->guardian?->phone ?? "";
                    }
                } else {
                    $guardianId = $installment?->father?->user_id;
                    $guardian_name = $father_name;
                    $guardian_phone = $father_phone;
                }

                $guardianData = [
                    'guardian_id' => $guardianId,
                    'guardian_name' => $guardian_name,
                    'guardian_phone' => $guardian_phone,
                ];

                $studentData = [
                    'id' => $installment?->student?->id ?? "",
                    'name' => $student_name,
                    'admission_no' => $installment?->student?->admission_no ?? "",
                    'roll_no' => $installment?->student?->classroomRoll?->roll_no ?? "",
                    'classroom_title' => $installment?->student?->classroom?->title ?? "",
                    'address' => $installment?->student?->present_address ?? "",
                    'father_name' => $father_name,
                    'father_phone' => $father_phone,
                    'follow_ups' =>  $follow_ups,
                ];

                if (!isset($feeInstallmentsData[$guardianId])) {
                    $feeInstallmentsData[$guardianId] = $guardianData;
                }

                if (!isset($feeInstallmentsData[$guardianId]['student_data'][$installment?->student_id])) {
                    $feeInstallmentsData[$guardianId]['student_data'][$installment?->student_id] = $studentData;
                }
            }

            if (!empty($feeInstallmentsData)) {
                foreach ($feeInstallmentsData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $feeInstallmentsData[$guardianId]['total_amount'] = ($feeInstallmentsData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_discount'] = ($feeInstallmentsData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_payable'] = ($feeInstallmentsData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_paid'] = ($feeInstallmentsData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_due'] = ($feeInstallmentsData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $feeInstallmentsData[$guardianId]['total_amount'] = 0;
                            $feeInstallmentsData[$guardianId]['total_discount'] = 0;
                            $feeInstallmentsData[$guardianId]['total_payable'] = 0;
                            $feeInstallmentsData[$guardianId]['total_paid'] = 0;
                            $feeInstallmentsData[$guardianId]['total_due'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $feeInstallmentsData;
    }

    /**
     * helper method to get guardian wise general vouchers data
     */
    private function getGuardianWiseGeneralVouchersData(
        $transportFeeStructureSetting,
        string $guardianType,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $vouchersData = [];
        $studentAmountArray = [];

        // get all active general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getGuardianWiseFeeVouchers(
            $transportFeeStructureSetting,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            $generalVouchers->loadMissing(['student.due_follow_ups:id,student_id,created_by,due_amount,note,call_picked,commitment_date,created_at']);

            if ($guardianType == 'guardian') {
                $generalVouchers->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $generalVouchers->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }

                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->student?->classroom_id;

                $voucher?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $voucher;
            });

            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $amount = (float) $feeTypeAmount->amount ?? 0;
                    $payable_amount = $amount;
                    $due_amount = $payable_amount;
                    $discount_amount = 0;
                    $paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $due_amount = $amount - $discount_amount - $paid_amount;
                        $payable_amount = $amount - $discount_amount;
                    }

                    $studentAmountArray[$voucher?->student_id]['total_amount'] = ($studentAmountArray[$voucher?->student_id]['total_amount'] ?? 0) + $amount;
                    $studentAmountArray[$voucher?->student_id]['total_discount'] = ($studentAmountArray[$voucher?->student_id]['total_discount'] ?? 0) + $discount_amount;
                    $studentAmountArray[$voucher?->student_id]['total_payable'] = ($studentAmountArray[$voucher?->student_id]['total_payable'] ?? 0) + $payable_amount;
                    $studentAmountArray[$voucher?->student_id]['total_paid'] = ($studentAmountArray[$voucher?->student_id]['total_paid'] ?? 0) + $paid_amount;
                    $studentAmountArray[$voucher?->student_id]['total_due'] = ($studentAmountArray[$voucher?->student_id]['total_due'] ?? 0) + $due_amount;

                    $student_name = "";
                    $father_name = "";
                    $father_phone = "";
                    $guardian_name = "";
                    $guardian_phone = "";
                    $follow_ups = [];

                    if ($voucher?->student != null) {
                        $student_name = "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}";
                    }

                    if ($voucher?->student?->due_follow_ups != null) {
                        $follow_ups = $voucher?->student?->due_follow_ups?->map(function ($followUp) {
                            $followUp['called_date'] = Carbon::parse($followUp?->created_at)->format('d-M-Y');
                            $followUp['commitment_date'] = Carbon::parse($followUp?->commitment_date)->format('d-M-Y');

                            return $followUp;
                        })?->toArray();
                    }

                    if ($voucher?->father != null) {
                        $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher?->father?->last_name}";
                        $father_phone = $voucher?->father?->phone ?? "";
                    }

                    if ($guardianType == 'guardian') {
                        $guardianId = $voucher?->guardian?->user_id;

                        if ($voucher?->guardian != null) {
                            $guardian_name = "{$voucher?->guardian?->first_name} {$voucher?->guardian?->middle_name} {$voucher?->guardian?->last_name}";
                            $guardian_phone = $voucher?->guardian?->phone ?? "";
                        }
                    } else {
                        $guardianId = $voucher?->father?->user_id;
                        $guardian_name = $father_name;
                        $guardian_phone = $father_phone;
                    }

                    $guardianData = [
                        'guardian_id' => $guardianId,
                        'guardian_name' => $guardian_name,
                        'guardian_phone' => $guardian_phone,
                    ];

                    $studentData = [
                        'id' => $voucher?->student?->id ?? "",
                        'name' => $student_name,
                        'admission_no' => $voucher?->student?->admission_no ?? "",
                        'roll_no' => $voucher?->student?->classroomRoll?->roll_no ?? "",
                        'classroom_title' => $voucher?->student?->classroom?->title ?? "",
                        'address' => $voucher?->student?->present_address ?? "",
                        'father_name' => $father_name,
                        'father_phone' => $father_phone,
                        'follow_ups' =>  $follow_ups,
                    ];

                    if (!isset($vouchersData[$guardianId])) {
                        $vouchersData[$guardianId] = $guardianData;
                    }

                    if (!isset($vouchersData[$guardianId]['student_data'][$voucher?->student_id])) {
                        $vouchersData[$guardianId]['student_data'][$voucher?->student_id] = $studentData;
                    }
                }
            }

            if (!empty($vouchersData)) {
                foreach ($vouchersData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $vouchersData[$guardianId]['total_amount'] = ($vouchersData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['total_discount'] = ($vouchersData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['total_payable'] = ($vouchersData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['total_paid'] = ($vouchersData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['total_due'] = ($vouchersData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $vouchersData[$guardianId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['total_due'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $vouchersData;
    }

    /**
     * helper method to get guardian wise transport vouchers data
     */
    private function getGuardianWiseTransportVouchersData(
        $transportFeeStructureSetting,
        string $guardianType,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $vouchersData = [];
        $studentAmountArray = [];

        // get all active students
        $students = $this->studentRepository->getGuardianWiseReportStudents(
            $transportFeeStructureSetting,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null && count($students) > 0) {
            $students->loadMissing(['due_follow_ups:id,student_id,created_by,due_amount,note,call_picked,commitment_date,created_at']);

            if ($guardianType == 'guardian') {
                $students->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $students->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student?->classroom_id;

                $student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $student;
            });

            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if (
                    $transportFeeStructureSetting != null &&
                    $transportFeeStructureSetting?->value == 'voucher' &&
                    (empty($paymentStatus) || (!empty($paymentStatus) && $paymentStatus == PaymentStatus::DUE->value))
                ) {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getGuardianWiseStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        if (
                            !empty($paymentStatus) &&
                            (
                                ($paymentStatus == PaymentStatus::DUE->value && $allocate->payment != null) ||
                                ($paymentStatus == PaymentStatus::PAID->value && $allocate->payment == null)
                            )
                        ) {
                            continue;
                        }

                        $amount = (float) $allocate->amount ?? 0;
                        $payable_amount = $amount;
                        $due_amount = $payable_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $due_amount = $amount - $discount_amount - $paid_amount;
                            $payable_amount = $amount - $discount_amount;
                        }

                        $studentAmountArray[$student?->id]['total_amount'] = ($studentAmountArray[$student?->id]['total_amount'] ?? 0) + $amount;
                        $studentAmountArray[$student?->id]['total_discount'] = ($studentAmountArray[$student?->id]['total_discount'] ?? 0) + $discount_amount;
                        $studentAmountArray[$student?->id]['total_payable'] = ($studentAmountArray[$student?->id]['total_payable'] ?? 0) + $payable_amount;
                        $studentAmountArray[$student?->id]['total_paid'] = ($studentAmountArray[$student?->id]['total_paid'] ?? 0) + $paid_amount;
                        $studentAmountArray[$student?->id]['total_due'] = ($studentAmountArray[$student?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $amount = (float) $currentAllocateTransport->amount ?? 0;
                    } else {
                        $amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $payable_amount = $amount;
                    $due_amount = $payable_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $studentAmountArray[$student?->id]['total_amount'] = ($studentAmountArray[$student?->id]['total_amount'] ?? 0) + $amount;
                        $studentAmountArray[$student?->id]['total_discount'] = ($studentAmountArray[$student?->id]['total_discount'] ?? 0) + 0;
                        $studentAmountArray[$student?->id]['total_payable'] = ($studentAmountArray[$student?->id]['total_payable'] ?? 0) + $payable_amount;
                        $studentAmountArray[$student?->id]['total_paid'] = ($studentAmountArray[$student?->id]['total_paid'] ?? 0) + 0;
                        $studentAmountArray[$student?->id]['total_due'] = ($studentAmountArray[$student?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (!empty($studentAmountArray)) {
                    $father_name = "";
                    $father_phone = "";
                    $guardian_name = "";
                    $guardian_phone = "";
                    $follow_ups = [];

                    $student_name = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                    if ($student?->due_follow_ups != null) {
                        $follow_ups = $student?->due_follow_ups?->map(function ($followUp) {
                            $followUp['called_date'] = Carbon::parse($followUp?->created_at)->format('d-M-Y');
                            $followUp['commitment_date'] = Carbon::parse($followUp?->commitment_date)->format('d-M-Y');

                            return $followUp;
                        })?->toArray();
                    }

                    if ($student?->father != null) {
                        $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                        $father_phone = $student?->father?->phone ?? "";
                    }

                    if ($guardianType == 'guardian') {
                        $guardianId = $student?->guardian?->user_id;

                        if ($student?->guardian != null) {
                            $guardian_name = "{$student?->guardian?->first_name} {$student?->guardian?->middle_name} {$student?->guardian?->last_name}";
                            $guardian_phone = $student?->guardian?->phone ?? "";
                        }
                    } else {
                        $guardianId = $student?->father?->user_id;
                        $guardian_name = $father_name;
                        $guardian_phone = $father_phone;
                    }

                    $guardianData = [
                        'guardian_id' => $guardianId,
                        'guardian_name' => $guardian_name,
                        'guardian_phone' => $guardian_phone,
                    ];

                    $studentData = [
                        'id' => $student?->id ?? "",
                        'name' => $student_name,
                        'admission_no' => $student?->admission_no ?? "",
                        'roll_no' => $student?->classroomRoll?->roll_no ?? "",
                        'classroom_title' => $student?->classroom?->title ?? "",
                        'address' => $student?->present_address ?? "",
                        'father_name' => $father_name,
                        'father_phone' => $father_phone,
                        'follow_ups' =>  $follow_ups,
                    ];

                    if (!isset($vouchersData[$guardianId])) {
                        $vouchersData[$guardianId] = $guardianData;
                    }

                    if (!isset($vouchersData[$guardianId]['student_data'][$student->id])) {
                        $vouchersData[$guardianId]['student_data'][$student->id] = $studentData;
                    }
                }
            }

            if (!empty($vouchersData)) {
                foreach ($vouchersData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $vouchersData[$guardianId]['total_amount'] = ($vouchersData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['total_discount'] = ($vouchersData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['total_payable'] = ($vouchersData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['total_paid'] = ($vouchersData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['total_due'] = ($vouchersData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $vouchersData[$guardianId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['total_due'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $vouchersData;
    }


    /*
    * student due report
    */
    public function studentDueReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $fees = $this->feeRepository->getActiveAll();
        $feeCategories = $this->categoryRepository->getActiveFeeCategoryAll();
        $studentDueReports = [
            'total_due_amount' => 0,
            'students_data' => []
        ];
        $student_status_array = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        if ($request->isMethod('POST')) {
            // validate form data
            $request->validate(
                [
                    'from_fee_id' => ['required', 'integer'],
                    'to_fee_id' => ['required', 'integer'],
                ],
                [
                    'from_fee_id.required' => 'Please select from installment.',
                    'to_fee_id.required' => 'Please select to installment.',
                ]
            );

            // arguments for filter data
            $classroomId = $classroom?->id;
            $fromFeeId = $request?->from_fee_id;
            $toFeeId = $request?->to_fee_id;
            $studentStatus = !empty($request->student_status) ? $request->student_status : "";
            $feeCategoryId = $request->fee_category_id;
            $academicYearId = $classroom?->academic_year_id;
            $includeLateFee = $request->late_fee ?? false;

            if (!empty($classroomId) && !empty($fromFeeId) && !empty($toFeeId)) {
                // get transport fee setting
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                // get fee installments data
                $studentDueReports = $this->getStudentDueReportFeeInstallmentsData(
                    $studentDueReports,
                    $transportFeeStructureSetting,
                    $classroomId,
                    $fromFeeId,
                    $toFeeId,
                    $studentStatus,
                    $feeCategoryId,
                    $academicYearId,
                    $includeLateFee
                );

                // transport and general voucher
                if (!empty($request->voucher) && $request->voucher == true) {
                    // get transport voucher data
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                        $studentDueReports = $this->getStudentDueReportTransportVoucherData(
                            $studentDueReports,
                            $transportFeeStructureSetting,
                            $classroomId,
                            $studentStatus,
                            $academicYearId
                        );
                    }

                    // get general vouchers data
                    $studentDueReports = $this->getStudentDueReportGeneralVoucherData(
                        $studentDueReports,
                        $classroomId,
                        $studentStatus,
                        $academicYearId
                    );
                }
            }
        }

        return Inertia::render('FeeReport/StudentDueReport', [
            'fees' => $fees,
            'feeCategories' => $feeCategories,
            'student_status_array' => $student_status_array,
            'studentDueReports' => $studentDueReports,
            'classroom' => $classroom,
        ]);
    }

    /*
    *   helper method to get student due report general voucher due data
    */
    protected function getStudentDueReportGeneralVoucherData(
        $studentDueReports,
        int $classroomId,
        string $studentStatus = "",
        int $academicYearId = null
    ) {
        $vouchers = $this->studentFeeVoucherRepository->getStudentDueReportVouchers(
            $classroomId,
            $studentStatus,
            $academicYearId
        );

        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['classroom'])) {
                        unset($voucher['classroom']);
                    }

                    $voucher['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->classroom?->id;

                $voucher->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $due_amount = 0;

                foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                    $amount = (float) $voucherAmountData->amount ?? 0;

                    if ($voucherAmountData->payment !== null) {
                        $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $amount = $amount - $discount_amount - $paid_amount;
                    }

                    $due_amount += $amount;
                }

                if ($due_amount > 0) {
                    if (isset($studentDueReports['students_data'][$voucher->student_id])) {
                        $studentDueReports['students_data'][$voucher->student_id]['total_due_amount'] += $due_amount;
                    } else {
                        // construct father name
                        $fatherName = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher->father->last_name}";

                        // merge student data in reports
                        $studentDueReports['students_data'][$voucher->student_id] = [
                            'id' => $voucher->student?->id,
                            'admission_no' => $voucher?->student?->admission_no,
                            'roll_no' => $voucher?->student?->classroomRoll?->roll_no,
                            'name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                            'father_name' => $fatherName,
                            'sms_phone' => $voucher?->father?->sms_phone ?? "",
                            'total_due_amount' =>  $due_amount,
                            'installment_total_due' => 0,
                            'fees_data' => [],
                        ];
                    }

                    $studentDueReports['total_due_amount'] = ($studentDueReports['total_due_amount'] ?? 0) + $due_amount;
                }
            }
        }

        return $studentDueReports;
    }

    /*
    *   helper method to get student due report transport voucher  data
    */
    protected function getStudentDueReportTransportVoucherData(
        $studentDueReports,
        $transportFeeStructureSetting,
        int $classroomId,
        string $studentStatus = "",
        int $academicYearId = null
    ) {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndStatus($classroomId, $studentStatus, $academicYearId);

        if (count($students) > 0) {
            $students->load(['classroom', 'father', 'promotedClassroom']);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                $classroomId = $student?->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $total_due = 0;

                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount ?? 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }

                        $total_due += $due_amount;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $total_due += $fee_amount;
                    }
                }

                if (isset($studentDueReports['students_data'][$student->id])) {
                    $studentDueReports['students_data'][$student->id]['total_due_amount'] += $total_due;
                } else {
                    // construct father name
                    $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";

                    // merge student data in reports
                    $studentDueReports['students_data'][$student?->id] = [
                        'id' => $student?->id,
                        'admission_no' => $student?->admission_no,
                        'roll_no' => $student?->classroomRoll?->roll_no,
                        'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                        'father_name' => $fatherName,
                        'sms_phone' => $student?->father?->sms_phone ?? "",
                        'total_due_amount' => $total_due,
                        'installment_total_due' => 0,
                        'fees_data' => [],
                    ];
                }

                $studentDueReports['total_due_amount'] = ($studentDueReports['total_due_amount'] ?? 0) + $total_due;
            }
        }

        return $studentDueReports;
    }

    /*
    *  helper method to get student due report fee installments data
    */
    protected function getStudentDueReportFeeInstallmentsData(
        array $studentDueReports = [],
        $transportFeeStructureSetting,
        int $classroomId,
        int $fromFeeId,
        int $toFeeId,
        string $studentStatus = "",
        int $feeCategoryId = null,
        int $academicYearId = null,
        bool $includeLateFee = false
    ) {
        //get filtered fee installments
        $feeInstallments = $this->classFeeStudentAmountRepository->getFilteredStudentDueReportFees(
            $classroomId,
            $fromFeeId,
            $toFeeId,
            $studentStatus,
            $feeCategoryId,
            $academicYearId
        );

        if (count($feeInstallments) > 0) {
            $feeInstallments->loadMissing([
                'payment',
                'nullify_fee',
                'father',
                'classroom',
                'student.promotedClassroom',
                'student.classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }
            ]);

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    $feeInstallment['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            // calculate and format fee due report data
            $totalDueAmount = 0;

            $studentsData = $this->getStudentDueReportStudentsData(
                $totalDueAmount,
                $transportFeeStructureSetting,
                $feeInstallments,
                $includeLateFee
            );

            if (count($studentsData) > 0) {
                foreach ($studentsData as $studentData) {
                    if (!isset($studentDueReports['students_data'][$studentData['id']])) {
                        $studentDueReports['students_data'][$studentData['id']] = $studentData;
                    }
                }
            }

            $studentDueReports['total_due_amount'] = ($studentDueReports['total_due_amount'] ?? 0) + $totalDueAmount;
        }

        return $studentDueReports;
    }

    /*
    *  helper method to get student due report students data
    */
    protected function getStudentDueReportStudentsData(
        &$totalDueAmount,
        $transportFeeStructureSetting,
        $feeInstallments,
        $includeLateFee = false,
    ) {
        $studentsData = [];

        if (count($feeInstallments) > 0) {
            $studentsData = $feeInstallments->groupBy('student_id')->map(function ($studentInstallments) use (&$totalDueAmount, $includeLateFee, $transportFeeStructureSetting) {
                $studentTotalDue = 0;
                $studentTotalLateFee = 0;
                $studentTotalTransportFee = 0;
                $studentFeeDiscounts = [];
                $studentFeesData = [];

                // calculate late fee and transport fee
                $this->calculateTransportFeeAndLateFee(
                    $studentTotalTransportFee,
                    $studentTotalLateFee,
                    $studentFeeDiscounts,
                    $studentFeesData,
                    $transportFeeStructureSetting,
                    $studentInstallments,
                    $includeLateFee
                );

                $this->formatStudentDueReportFeesData(
                    $studentTotalDue,
                    $studentFeesData,
                    $studentInstallments,
                    $studentFeeDiscounts
                );

                $totalDueAmount += ($studentTotalDue + $studentTotalTransportFee);
                $studentinstallment = $studentInstallments->first();

                $studentinstallment['student_roll_no'] = $studentinstallment['student']['classroomRoll']['roll_no'] ?? "";

                // construct father name
                $fatherName = "{$studentinstallment?->father?->first_name} {$studentinstallment?->father?->middle_name} {$studentinstallment->father->last_name}";

                return [
                    'id' => $studentinstallment->student_id,
                    'admission_no' => $studentinstallment->student_admission_no,
                    'roll_no' => $studentinstallment->student_roll_no,
                    'name' => "{$studentinstallment?->student_first_name} {$studentinstallment?->student_middle_name} {$studentinstallment?->student_last_name}",
                    'father_name' => $fatherName,
                    'sms_phone' => $studentinstallment?->father?->sms_phone ?? "",
                    'total_due_amount' => $studentTotalDue + $studentTotalLateFee + $studentTotalTransportFee,
                    'installment_total_due' => $studentTotalDue + $studentTotalLateFee + $studentTotalTransportFee,
                    'fees_data' => $studentFeesData,
                ];
            })->toArray();
        }

        return $studentsData;
    }

    /*
    *  helper method to format student due report fees data
    */
    protected function formatStudentDueReportFeesData(
        &$studentTotalDue,
        &$studentFeesData,
        $studentInstallments,
        $studentFeeDiscounts,
    ) {
        $studentInstallments->each(function ($installment) use (&$studentTotalDue, $studentFeeDiscounts, &$studentFeesData) {
            $semester = $installment->semester ?? 1;
            $fee_amount = (float) $installment->amount * $semester;
            $due_amount = $fee_amount;
            $discount_amount = 0;
            $paid_amount = 0;

            if ($installment->nullify_fee !== null) {
                $due_amount = 0;
            } elseif ($installment->payment !== null && $installment?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                $due_amount = $fee_amount - $discount_amount - $paid_amount;
            } elseif (count($studentFeeDiscounts) > 0) {
                foreach ($studentFeeDiscounts as $discount) {
                    if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                        if ($discount->is_discount_percentage) {
                            $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                        } else {
                            $discount_amount = (float) $discount->amount;
                        }

                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    }
                }
            }

            $studentTotalDue += $due_amount;

            $feeTypeData = [
                'fee_type_title' => $installment->feeType['fee_type'],
                'payable_amount' => $fee_amount - $discount_amount,
                'paid_amount' => $paid_amount,
                'due_amount' => $due_amount,
            ];

            if (!isset($studentFeesData[$installment['fee_id']])) {
                $studentFeesData[$installment['fee_id']] = [
                    'fee_title' => $installment->fee['title'],
                    'due_amount' => 0,
                    'fee_types_data' => []
                ];
            }

            $studentFeesData[$installment['fee_id']]['due_amount'] += $due_amount;
            $studentFeesData[$installment['fee_id']]['fee_types_data'][$installment['fee_type_id']] = $feeTypeData;
        });
    }

    /*
    *  helper method to calculate transport fee and late fee
    */
    protected function calculateTransportFeeAndLateFee(
        &$studentTotalTransportFee,
        &$studentTotalLateFee,
        &$studentFeeDiscounts,
        &$studentFeesData,
        $transportFeeStructureSetting,
        $studentInstallments,
        $includeLateFee = false
    ) {
        foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallmentsGroupedData) {
            $studentId = $studentInstallments->first()->student_id;
            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
            $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

            if (!$hasPayment) {
                $fee = $feeInstallmentsGroupedData->first()->fee;

                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                    $studentTotalTransportFee += $this->calculateTransportFee(
                        $studentId,
                        $feeInstallmentId,
                        $studentFeeDiscounts,
                        $feeInstallmentsGroupedData,
                        $fee,
                        $studentFeesData
                    );
                }

                if ($includeLateFee == true) {
                    $studentTotalLateFee += $this->calculateLateFee(
                        $feeInstallmentId,
                        $fee,
                        $studentFeeDiscounts,
                        $feeInstallmentsGroupedData,
                        $studentFeesData
                    );
                }
            }
        }
    }

    /*
    *  helper method to calculate transport fee
    */
    protected function calculateTransportFee(
        $studentId,
        $feeInstallmentId,
        $studentFeeDiscounts,
        $feeInstallmentsGroupedData,
        $fee,
        &$studentFeesData
    ) {
        $totalTransportFeeAmount = 0;

        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
            if ($currentAllocateTransport != null) {
                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
            } else {
                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $studentId,
                $currentAllocateFeeId,
                $deallocateTransport?->fee_id
            );

            if (count($allocateTransportFees) > 0) {
                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                foreach ($allocateTransportFees as $allocateTransportFee) {
                    if ($allocateTransportFee->id == $feeInstallmentId) {
                        if ($transportFee != null) {
                            $existedTransportFee = $feeInstallmentsGroupedData->where('fee_type_id', $transportFee->id)->first();

                            if ($existedTransportFee == null) {
                                if (count($studentFeeDiscounts) > 0) {
                                    foreach ($studentFeeDiscounts as $discount) {
                                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * $transportFeeAmount;
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }

                                            $transportFeeAmount = $transportFeeAmount - $discount_amount;
                                        }
                                    }
                                }

                                $feeTypeData = [
                                    'fee_type_title' => $transportFee->fee_type,
                                    'payable_amount' => $transportFeeAmount,
                                    'paid_amount' => 0,
                                    'due_amount' => $transportFeeAmount,
                                ];

                                if (!isset($studentFeesData[$feeInstallmentId])) {
                                    $studentFeesData[$feeInstallmentId] = [
                                        'fee_title' => $fee->title,
                                        'due_amount' => 0,
                                        'fee_types_data' => []
                                    ];
                                }

                                $studentFeesData[$feeInstallmentId]['due_amount'] += $transportFeeAmount;
                                $studentFeesData[$feeInstallmentId]['fee_types_data'][$transportFee->id] = $feeTypeData;

                                $totalTransportFeeAmount += $transportFeeAmount;
                            }
                        }
                    }
                }
            }
        }

        return $totalTransportFeeAmount;
    }


    /*
    *  helper method to calculate late fee
    */
    protected function calculateLateFee(
        $feeInstallmentId,
        $fee,
        $studentFeeDiscounts,
        $feeInstallmentsGroupedData,
        &$studentFeesData
    ) {
        $lateFeeAmount = 0;

        // add late fee in structure if late fine is available
        $lateFee = $this->feeTypeRepository->getLateFeeType();

        if ($lateFee != null) {
            $existedLateFee = $feeInstallmentsGroupedData->where('fee_type_id', $lateFee->id)->first();
            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                $lateFineStartDate = $fee->last_pay_date_at;
                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                    $currentDate = date("Y-m-d");
                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                    if ($lateFineType == LateFineType::DAILY->value) {
                        $lateFeeAmount = (float) $lateFineAmount * $daysDifference;
                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                        $weeksDifference = floor($daysDifference / 7);
                        $lateFeeAmount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                        // Extract year and month from the start date
                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                        // Extract year and month from the current date
                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                        // Calculate the difference in months
                        $startMonths = ($startYear * 12) + $startMonth;
                        $currentMonths = ($currentYear * 12) + $currentMonth;
                        $monthsDifference = $currentMonths - $startMonths;

                        $lateFeeAmount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                    }
                }

                if (count($studentFeeDiscounts) > 0) {
                    foreach ($studentFeeDiscounts as $discount) {
                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * $lateFeeAmount;
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $lateFeeAmount = $lateFeeAmount - $discount_amount;
                        }
                    }
                }

                $feeTypeData = [
                    'fee_type_title' => $lateFee->fee_type,
                    'payable_amount' => $lateFeeAmount,
                    'paid_amount' => 0,
                    'due_amount' => $lateFeeAmount,
                ];

                if (!isset($studentFeesData[$feeInstallmentId])) {
                    $studentFeesData[$feeInstallmentId] = [
                        'fee_title' => $fee->title,
                        'due_amount' => 0,
                        'fee_types_data' => []
                    ];
                }

                $studentFeesData[$feeInstallmentId]['due_amount'] += $lateFeeAmount;
                $studentFeesData[$feeInstallmentId]['fee_types_data'][$lateFee->id] = $feeTypeData;
            }
        }

        return $lateFeeAmount;
    }

    /*
    * student daily collection report
    */
    public function studentDailyCollectionReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $paymentModes = $this->buildOptionsArray(PaymentMode::cases());
        $dailyFeePaymentReportsData = [];
        $totalPaidByPaymentMode = [];
        $totalPaidByAdmin = [];

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

            $feeTransformedData = [];

            if (!empty($classroom->id)) {
                // get fee payment reports
                $dailyFeePaymentReports = $this->feePaymentMethodRepository->getStudentDailyCollectionReportData(
                    $classroom->id,
                    $request?->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request?->payment_mode ?? "",
                    $request?->cancelled_fee ?? false,
                    $request?->exclude_voucher_fee ?? false,
                    $classroom?->academic_year_id
                );

                // store payment fee types title
                $reportFeeTypes = [];

                if ($dailyFeePaymentReports->count() > 0) {
                    $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                        if ($report?->student?->promotedClassroom != null) {
                            if (!empty($report['student']['classroom'])) {
                                unset($report['student']['classroom']);
                            }

                            $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                            $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                            $report['student']['classroom'] = $report?->student?->promotedClassroom;
                        }

                        return $report;
                    });

                    $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                        if ($report->fee_payments->count() > 0) {
                            $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                                $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                            });
                        }
                    });
                }

                // format fee payment report data
                $feeTransformedData = $dailyFeePaymentReports->map(function ($report) use ($reportFeeTypes) {
                    $date = Carbon::parse($report->payment_date)->format('d-m-Y');
                    $time = $report->created_at->format('H:i:s A');

                    $newData = [
                        'id' => $report->id,
                        'student_status' => $report?->student?->student_status,
                        'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                        'admission_no' => $report?->student?->admission_no,
                        'classroom_title' => $report?->student?->classroom?->title,
                        'receipt_no' => $report->receipt_no,
                        'total_amount' =>  (float) $report->total_amount,
                        'total_discount_amount' =>  (float) $report->total_discount_amount,
                        'total_payable_amount' => (float) $report->total_payable_amount,
                        'total_paid_amount' => (float) $report->total_paid_amount,
                        'total_due_amount' =>  (float) $report->total_due_amount,
                        'payment_mode' =>  $report->payment_mode,
                        'payment_note' =>  $report->payment_note,
                        'payment_date_time' => "{$date} {$time}",
                        'created_by' => "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}",
                        'is_registration_fee' => false,
                        'is_cancelled' => $report->is_cancelled,
                        'fee_types' => array_unique($reportFeeTypes[$report->id])
                    ];

                    return collect($newData);
                });
            }

            // merge registration fee payment report and fee installment payment report
            $dailyFeePaymentReportsData = $feeTransformedData;

            // filter report to take only payments that has discount
            if (!empty($request->concession) && $request->concession == true) {
                $dailyFeePaymentReportsData = collect($dailyFeePaymentReportsData)->filter(function ($report) {
                    return $report['total_discount_amount'] > 0;
                });
            }

            if (count($dailyFeePaymentReportsData) > 0) {
                // calculate total paid by payment mode
                foreach (collect($dailyFeePaymentReportsData)->groupBy('payment_mode') as $paymentMode =>  $reports) {
                    if (empty($totalPaidByPaymentMode[$paymentMode])) {
                        $totalPaidByPaymentMode[$paymentMode]['payment_mode'] = $paymentMode;
                        $totalPaidByPaymentMode[$paymentMode]['total_paid_amount'] = $reports->sum('total_paid_amount');
                    }
                }

                // calculate total paid by taken by
                foreach (collect($dailyFeePaymentReportsData)->groupBy('created_by') as $createdBy =>  $reports) {
                    if (empty($totalPaidByAdmin[$createdBy])) {
                        $totalPaidByAdmin[$createdBy]['created_by'] = $createdBy;
                        $totalPaidByAdmin[$createdBy]['total_paid_amount'] = $reports->sum('total_paid_amount');
                    }
                }
            }

            if (!empty($dailyFeePaymentReportsData)) {
                $dailyFeePaymentReportsData = collect($dailyFeePaymentReportsData)->sortBy('receipt_no');
            }
        }

        return Inertia::render('FeeReport/StudentDailyCollectionReport', [
            'paymentModes' => $paymentModes,
            'dailyFeePaymentReports' => $dailyFeePaymentReportsData,
            'totalPaidByPaymentMode' => $totalPaidByPaymentMode,
            'totalPaidByAdmin' => $totalPaidByAdmin
        ]);
    }

    /*
    * student complete paid report
    */
    public function studentCompletePaidReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $fees = $this->feeRepository->getActiveIdTitle();
        $completePaidReport = [];

        if ($request->isMethod('POST')) {
            if (!empty($classroom->id)) {
                $schoolId = getUserSchoolId();
                $academicYearId = $classroom?->academic_year_id;

                $studentIds = $this->studentRepository->getStudentsByClassroomId($classroom->id, $schoolId, $academicYearId)
                    ->pluck('id')
                    ->toArray();

                if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                    $completePaidReportData = $this->feePaymentRepository->getStudentCompletePaidReportData(
                        $request->from_fee_id,
                        $request->to_fee_id,
                        $studentIds,
                        $academicYearId
                    );

                    if (count($completePaidReportData) > 0) {
                        $completePaidReportData = $completePaidReportData->map(function ($report) {
                            if ($report?->student?->promotedClassroom != null) {
                                if (!empty($report['student']['classroom'])) {
                                    unset($report['student']['classroom']);
                                }

                                $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                                $report['student']['classroom'] = $report?->student?->promotedClassroom;
                            }
                            return $report;
                        });

                        foreach ($completePaidReportData->groupBy('student_id') as $studentId =>  $studentReports) {
                            $student = $studentReports->first()?->student;
                            $classroomId = $student->classroom_id;

                            $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                                $query->where('classroom_id', $classroomId);
                            }]);

                            foreach ($studentReports->groupBy('fee_id') as $feeId => $reports) {
                                $total_paid_amount = 0;
                                $isCompletePaid = true;

                                $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByFeeIdAndStudentId($studentId, $feeId);

                                if (count($feeInstallments) > 0) {
                                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeId);

                                    $total_transport_fee = 0;
                                    $total_late_fee = 0;

                                    if (!$hasPayment) {
                                        $fee = $reports->first()->fee;

                                        // calculte transport fee if transport fee setting set to fee
                                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                            $total_transport_fee += $this->calculateStudentCompletePaidTransportFee($studentId, $reports);
                                        }

                                        // calculate late fee
                                        $total_late_fee += $this->calculateStudentCompletePaidLateFee($fee, $reports);
                                    }

                                    foreach ($feeInstallments as $installment) {
                                        $semester = $installment?->smeseter ?? 1;
                                        $fee_amount = ((float) $installment?->amount ?? 0) * $semester;
                                        $payable_amount =  $fee_amount + $total_late_fee + $total_transport_fee;

                                        $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                                        $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;

                                        $total_paid_amount += $paid_amount;

                                        if ($payable_amount != ($paid_amount + $discount_amount)) {
                                            $isCompletePaid = false;
                                            break;
                                        }
                                    }
                                }

                                if ($isCompletePaid) {
                                    $completePaidReport[$studentId]['student'] = $student->toArray();

                                    if (!empty($completePaidReport[$studentId]['total_paid'])) {
                                        $completePaidReport[$studentId]['total_paid'] += $total_paid_amount;
                                    } else {
                                        $completePaidReport[$studentId]['total_paid'] = $total_paid_amount;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return Inertia::render('FeeReport/StudentCompletePaidReport', [
            'fees' => $fees,
            'completePaidReport' => $completePaidReport
        ]);
    }

    /*
    *  helper method to calculate student complete paid transport fee
    */
    protected function calculateStudentCompletePaidTransportFee($studentId, $reports)
    {
        $totalTransportFeeAmount = 0;

        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
            if ($currentAllocateTransport != null) {
                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
            } else {
                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $studentId,
                $currentAllocateFeeId,
                $deallocateTransport?->fee_id
            );

            if (count($allocateTransportFees) > 0) {
                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                foreach ($allocateTransportFees as $allocateTransportFee) {
                    if ($allocateTransportFee->id == $feeId) {
                        if ($transportFee != null) {
                            $existedTransportFee = $reports->where('fee_type_id', $transportFee->id)->first();

                            if ($existedTransportFee == null) {
                                $totalTransportFeeAmount += $transportFeeAmount;
                            }
                        }
                    }
                }
            }
        }

        return $totalTransportFeeAmount;
    }


    /*
    *  helper method to calculate student complete paid late fee
    */
    protected function calculateStudentCompletePaidLateFee($fee, $reports)
    {
        $lateFeeAmount = 0;

        $lateFee = $this->feeTypeRepository->getLateFeeType();

        if ($lateFee != null) {
            $existedLateFee = $reports->where('fee_type_id', $lateFee->id)->first();

            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                $lateFineStartDate = $fee->last_pay_date_at;
                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                    $currentDate = date("Y-m-d");
                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                    if ($lateFineType == LateFineType::DAILY->value) {
                        $lateFeeAmount = (float) $lateFineAmount * $daysDifference;
                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                        $weeksDifference = floor($daysDifference / 7);
                        $lateFeeAmount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                        // Extract year and month from the start date
                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                        // Extract year and month from the current date
                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                        // Calculate the difference in months
                        $startMonths = ($startYear * 12) + $startMonth;
                        $currentMonths = ($currentYear * 12) + $currentMonth;
                        $monthsDifference = $currentMonths - $startMonths;

                        $lateFeeAmount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                    }
                }
            }
        }

        return $lateFeeAmount;
    }
}
