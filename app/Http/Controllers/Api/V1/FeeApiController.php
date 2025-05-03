<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Enums\PaymentStatus;
use App\Enums\FeeTypeEnum;
use App\Enums\PaymentMode;
use App\Enums\FeePaymentType;
use App\Enums\LateFineType;
use App\Enums\StudentStatus;
use Carbon\Carbon;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IFeeRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IDiscountRepository;
use App\Repositories\SchoolSettingRepository;
use App\Models\SchoolSetting;
use App\Models\AcademicYear;
use App\Models\FeePayment;
use App\Models\ClassName;
use App\Models\Classroom;
use App\Models\Fee;
use App\Models\FeePaymentMethod;
use App\Models\FeeType;
use App\Models\Student;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IFeeStructureRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IStudentDueFollowUpRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\ITransportRepository;
use Illuminate\Http\Request;


class FeeApiController extends ControllerApi
{
    use \App\Http\Controllers\Api\V1\Traits\FeeAccessor;

    public function __construct(
        private IFeeTypeRepository $feeTypeRepository,
        private IFeeRepository $feeRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IDiscountRepository $discountRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IClassroomRepository $classroomRepository,
        private ICategoryRepository $categoryRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private ITransportRepository $transportRepository,
        private IStudentDueFollowUpRepository $studentDueFollowUpRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,




    ) {
        //
    }

    /**
     * @OA\Get(
     *    path="/fees/mis-report",
     *    operationId="misReport",
     *    tags={"Fee"},
     *    summary="Get mis report of fee",
     *    description="Get mis report of fee",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function misReport(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
        $academicYear = AcademicYear::find($setting?->academic_year_id);

        $currentMonth = getCurrentMonth();
        $currentAcademicYear = $academicYear?->academic_session;
        $currentDayTotalCollection = FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->whereHas('payment_method', function ($query) {
                $query->whereDate('payment_date', Carbon::now()->today()->format('Y-m-d'));
            })
            ->sum('paid_amount');

        $currentMonthTotalCollection = FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->whereHas('payment_method', function ($query) {
                $query->whereBetween('payment_date', getStartEndDateOfMonth());
            })
            ->sum('paid_amount');

        $currentAcademicYearTotalCollection = FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->sum('paid_amount');
        $totalDiscountAmount = $this->feePaymentRepository->getTotalDiscountAmount($request->schoolId, $setting?->academic_year_id);
        $monthWiseFeeCollection = [];
        $lastTenDaysFeeCollection = [];

        $monthWiseCollectionData = FeePayment::where('fee_payments.status', Status::ACTIVE)
            ->where('fee_payments.school_id', $request->schoolId)
            ->where('fee_payments.academic_year_id', $setting?->academic_year_id)
            ->where('fee_payments.payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->leftJoin('fee_payment_methods', 'fee_payments.fee_payment_method_id', '=', 'fee_payment_methods.id')
            ->select(
                'fee_payments.paid_amount',
                'fee_payment_methods.payment_date',
            )
            ->get();

        $startDate = Carbon::now()->subDays(9)->startOfDay()->format('Y-m-d');
        $endDate = Carbon::now()->endOfDay()->format('Y-m-d');

        $lastTenDaysFeeCollectionData = FeePayment::where('fee_payments.status', Status::ACTIVE)
            ->where('fee_payments.school_id', $request->schoolId)
            ->where('fee_payments.academic_year_id', $setting?->academic_year_id)
            ->where('fee_payments.payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->rightJoin('fee_payment_methods', function ($join) use ($startDate, $endDate) {
                $join->on('fee_payments.fee_payment_method_id', '=', 'fee_payment_methods.id')
                    ->whereBetween('fee_payment_methods.payment_date', [$startDate, $endDate]);
            })
            ->select(
                'fee_payments.paid_amount',
                'fee_payment_methods.payment_date',
            )
            ->get();;

        foreach ($monthWiseCollectionData as $feeCollection) {
            $month = Carbon::parse($feeCollection->payment_date)->format('F');
            $monthWiseFeeCollection[$month] = ($monthWiseFeeCollection[$month] ?? 0) + (float) $feeCollection->paid_amount;
        }

        foreach ($lastTenDaysFeeCollectionData as $feeCollection) {
            $date = Carbon::parse($feeCollection->payment_date)->format('d-M');
            $lastTenDaysFeeCollection[$date] = ($lastTenDaysFeeCollection[$date] ?? 0) + (float) $feeCollection->paid_amount;
        }

        return response()->json([
            'success' => true,
            'currentMonth' => $currentMonth,
            'currentAcademicYear' => $currentAcademicYear,
            'currentDayTotalCollection' => (float) $currentDayTotalCollection,
            'currentMonthTotalCollection' => (float) $currentMonthTotalCollection,
            'currentAcademicYearTotalCollection' => (float) $currentAcademicYearTotalCollection,
            'totalDiscountAmount' => (float) $totalDiscountAmount,
            'monthWiseFeeCollection' => $monthWiseFeeCollection,
            'lastTenDaysFeeCollection' => $lastTenDaysFeeCollection,
        ], 200);
    }


    /**
     * @OA\Get(
     *    path="/fees/daily-collection/student-wise",
     *    operationId="studentWiseDailyCollection",
     *    tags={"Fee"},
     *    summary="Student Wise Daily Collection",
     *    description="Student Wise Daily Collection",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    /**
     * Display collection report.
     */
    public function studentWiseDailyCollection(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->startDate) && !empty($request->endDate)) {

            $dailyFeePaymentReportsData = [];
            $totalPaidByPaymentMode = [];
            $totalPaidByAdmin = [];
            $registrationFeeTransformedData = [];
            $startDate = Carbon::parse($request->startDate)->timezone(getSchoolTimeZone())->toDateString();
            $endDate = Carbon::parse($request->endDate)->timezone(getSchoolTimeZone())->toDateString();
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);

            if ($request->feeType == FeeTypeEnum::REGISTRATION->value || empty($request->feeType)) {
                // get registration fee payment reports
                $dailyRegistrationFeeReports = $this->feePaymentMethodRepository->getDailyRegistrationFeeReports(
                    $request->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request->payment_mode ?? "",
                    $request->class_name_id ?? null,
                    $request->classroom_id ?? null,
                    $request->schoolId,
                    $academicYearId
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
                    $request?->exclude_voucher_fee ?? false,
                    $request->schoolId,
                    $academicYearId
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

            return response()->json([
                'success' => true,
                'data' => !empty($dailyFeePaymentReportsData) ? $dailyFeePaymentReportsData : [],
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }
    public function studentWiseDailyCollection_old(Request $request)
    {
        // $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
        // $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";
        // $regFeeReceiptPageSize = getSiteSettingData('fee_reg_receipt_page_size') != null ? getSiteSettingData('fee_reg_receipt_page_size')->value : "Small";
        // $regFeeReceiptCopy = getSiteSettingData('fee_reg_receipt_copy') != null ? getSiteSettingData('fee_reg_receipt_copy')->value : "Single";
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();


        $classNames = ClassName::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->latest()
            ->get();
        $classrooms = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->orderBy('display_order', 'ASC')
            ->get();
        $paymentModes = $this->apiBuildOptionsArray(PaymentMode::cases());
        $feeTypesEnum = $this->apiBuildOptionsArray(FeeTypeEnum::cases());

        $dailyFeePaymentReportsData = [];
        $totalPaidByPaymentMode = [];
        $totalPaidByAdmin = [];

        if (isset($request->startDate) && isset($request->endDate)) {
            $registrationFeeTransformedData = [];

            $startDate = $request->startDate;
            $endDate = $request->endDate;

            if ($request->feeType == FeeTypeEnum::REGISTRATION->value || empty($request->feeType)) {
                // get registration fee payment reports
                $dailyRegistrationFeeReports = $this->dailyRegistrationFeeReports(
                    $request->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request->payment_mode ?? "",
                    $request->class_name_id ?? null,
                    $request->classroom_id ?? null,
                    $request->schoolId,
                    $setting?->academic_year_id
                );

                // format registration fee payment report data
                $registrationFeeTransformedData = $dailyRegistrationFeeReports->map(function ($report) {
                    $newData = [
                        'id' => $report->id,
                        'student_status' => 'New',
                        'student_name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                        'admission_no' => "",
                        'classroom_title' => $report?->enquiry?->className?->title,
                        'receipt_no' => "",
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

            if ($request->feeType == FeeTypeEnum::FEE->value || empty($request->feeType)) {
                // get fee payment reports
                $dailyFeePaymentReports = $this->dailyFeePaymentReports(
                    $request?->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request?->payment_mode ?? "",
                    $request?->class_name_id ?? null,
                    $request?->classroom_id ?? null,
                    $request?->cancelled_fee ?? false,
                    $request?->exclude_voucher_fee ?? false,
                    $request->schoolId,
                    $setting?->academic_year_id
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

        return response()->json([
            'success' => true,
            // 'feeTypesEnum' => $feeTypesEnum,
            // 'classNames' => $classNames,
            // 'classrooms' => $classrooms,
            //  'paymentModes' => $paymentModes,
            'data' => !empty($dailyFeePaymentReportsData) ? $dailyFeePaymentReportsData : null,
            // 'totalPaidByPaymentMode' => $totalPaidByPaymentMode,
            //  'totalPaidByAdmin' => $totalPaidByAdmin,
            // 'feeReceiptPageSize' => $feeReceiptPageSize,
            // 'feeReceiptCopy' => $feeReceiptCopy,
            // 'regFeeReceiptPageSize' => $regFeeReceiptPageSize,
            // 'regFeeReceiptCopy' => $regFeeReceiptCopy,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/fees/monthly-collection/student-wise",
     *    operationId="studentWiseMonthlyCollection",
     *    tags={"Fee"},
     *    summary="Student Wise Monthly Collection",
     *    description="Student Wise Monthly Collection",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function studentWiseMonthlyCollection(Request $request)
    {
        // $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
        // $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";
        // $regFeeReceiptPageSize = getSiteSettingData('fee_reg_receipt_page_size') != null ? getSiteSettingData('fee_reg_receipt_page_size')->value : "Small";
        // $regFeeReceiptCopy = getSiteSettingData('fee_reg_receipt_copy') != null ? getSiteSettingData('fee_reg_receipt_copy')->value : "Single";
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();


        $classNames = ClassName::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->latest()
            ->get();
        $classrooms = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->orderBy('display_order', 'ASC')
            ->get();
        $paymentModes = $this->apiBuildOptionsArray(PaymentMode::cases());
        $feeTypesEnum = $this->apiBuildOptionsArray(FeeTypeEnum::cases());

        $dailyFeePaymentReportsData = [];
        $totalPaidByPaymentMode = [];
        $totalPaidByAdmin = [];

        if (isset($request->month)) {
            $registrationFeeTransformedData = [];

            $startDateRaw = new Carbon('first day of ' . $request->month);
            $startDate = $startDateRaw->toDateTimeString();
            $endDateRaw = new Carbon('last day of ' . $request->month);
            $endDate = $endDateRaw->toDateString() . ' 11:59:59';

            if ($request->feeType == FeeTypeEnum::REGISTRATION->value || empty($request->feeType)) {
                // get registration fee payment reports
                $dailyRegistrationFeeReports = $this->feePaymentMethodRepository->getDailyRegistrationFeeReports(
                    $request->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request->payment_mode ?? "",
                    $request->class_name_id ?? null,
                    $request->classroom_id ?? null,
                    $request->schoolId,
                    $setting?->academic_year_id
                );

                // format registration fee payment report data
                $registrationFeeTransformedData = $dailyRegistrationFeeReports->map(function ($report) {
                    $newData = [
                        'id' => $report->id,
                        'student_status' => 'New',
                        'student_name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                        'admission_no' => "",
                        'classroom_title' => $report?->enquiry?->className?->title,
                        'receipt_no' => "",
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

            if ($request->feeType == FeeTypeEnum::FEE->value || empty($request->feeType)) {
                // get fee payment reports
                $dailyFeePaymentReports = $this->feePaymentMethodRepository->getDailyFeePaymentReports(
                    $request?->current_session ?? false,
                    $startDate,
                    $endDate,
                    $request?->payment_mode ?? "",
                    $request?->class_name_id ?? null,
                    $request?->classroom_id ?? null,
                    $request?->cancelled_fee ?? false,
                    $request?->exclude_voucher_fee ?? false,
                    $request->schoolId,
                    $setting?->academic_year_id
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

        return response()->json([
            'success' => true,
            //  'feeTypesEnum' => $feeTypesEnum,
            //   'classNames' => $classNames,
            //   'classrooms' => $classrooms,
            //   'paymentModes' => $paymentModes,
            'data' => !empty($dailyFeePaymentReportsData) ? $dailyFeePaymentReportsData : null,
            // 'totalPaidByPaymentMode' => $totalPaidByPaymentMode,
            //  'totalPaidByAdmin' => $totalPaidByAdmin,
            // 'feeReceiptPageSize' => $feeReceiptPageSize,
            // 'feeReceiptCopy' => $feeReceiptCopy,
            // 'regFeeReceiptPageSize' => $regFeeReceiptPageSize,
            // 'regFeeReceiptCopy' => $regFeeReceiptCopy,
        ], 200);
    }



    /**
     * @OA\Get(
     *    path="/fees/daily-collection/head-wise",
     *    operationId="headWiseDailyCollection",
     *    tags={"Fee"},
     *    summary="Head Wise Daily Collection",
     *    description="Head Wise Daily Collection",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function headWiseDailyCollection(Request $request)
    {

        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $classNames = ClassName::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->latest()
            ->get();

        $paymentModes = $this->apiBuildOptionsArray(PaymentMode::cases());

        $feeTypes = FeeType::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->get()->map(function ($feeType) {
                return [
                    'id' => $feeType->id,
                    'title' => $feeType->fee_type,
                ];
            });

        $studentFeeReportsData = [];
        $payment_fee_types = [];
        $payment_fee_methods = [];

        if (isset($request->startDate) && isset($request->endDate)) {
            $filterArgs = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $setting?->academic_year_id,
                'sort_by' => $request->sort_by,
                'voucher' => $request->voucher,
                'cancelled_fee' => $request->cancelled_fee,
                'start_date' => $request->startDate,
                'end_date' => $request->endDate,
                'payment_mode' => $request->payment_mode,
            ];

            $studentFeeReports = $this->apiHeadWiseDailyFeePaymentReports(...$filterArgs);

            if ($studentFeeReports->count() > 0) {

                $studentFeeReportsData = $studentFeeReports->groupBy('payment_date')
                    ->map(function ($groupedReports) use (&$payment_fee_types, &$payment_fee_methods) {
                        $grand_total_amount = 0;
                        $grand_total_payable = 0;
                        $grand_total_paid = 0;
                        $grand_total_due = 0;
                        $grand_total_discount = 0;
                        $payment_fee_types_amount = [];

                        $groupedReports = $groupedReports->map(function ($report) use (
                            &$payment_fee_types,
                            &$payment_fee_methods,
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

                            if (isset($payment_fee_methods[$report->payment_mode])) {
                                $payment_fee_methods[$report->payment_mode] += $total_paid;
                            } else {
                                $payment_fee_methods[$report->payment_mode] = $total_paid;
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
                            // 'reports' => $groupedReports,
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

        return response()->json([
            'success' => true,
            'data' => [
                'payment_fee_types' => !empty($payment_fee_types) ? $payment_fee_types : null,
                'payment_fee_methods' => !empty($payment_fee_methods) ? $payment_fee_methods : null,
            ]
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/fees/summary/class-wise",
     *    operationId="classWiseSummary",
     *    tags={"Fee"},
     *    summary="Head Wise Daily Collection",
     *    description="Head Wise Daily Collection",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function classWiseSummary(Request $request)
    {
        if (!empty($request->schoolId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $fees = Fee::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->where('academic_year_id', $setting?->academic_year_id)
                ->select('id', 'title')
                ->orderBy('id', 'asc')
                ->get();

            $classrooms = Classroom::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->where('academic_year_id', $setting?->academic_year_id)
                ->orderBy('display_order', 'ASC')
                ->get();

            $feeCollectionSummary = [];

            if (
                !empty($request->filterType) &&
                ($request->filterType === "date_wise" && (!empty($request->startDate) && !empty($request->endDate))) ||
                ($request->filterType === "installment_wise" && (!empty($request->from_fee_id) && !empty($request->to_fee_id)))
            ) {
                $feeCollectionSummaryData = $this->apiDateAndInstallmentWiseFeePaymentSummary(
                    $request->schoolId,
                    $setting?->academic_year_id,
                    $request->filterType,
                    $request->startDate,
                    $request->endDate,
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
                                if ($payment?->student?->promotedClassroomRaw != null) {
                                    $payment['student']['classroom_id'] = $payment?->student?->promotedClassroomRaw?->id;
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

                    if ($request->filterType === "installment_wise") {
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

            return response()->json([
                'success' => true,
                'data' => [
                    'fees' => !empty($fees) ? $fees : null,
                    'feeCollectionSummary' => !empty($feeCollectionSummary) ? $feeCollectionSummary : null
                ]
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/fees/due/class-wise-report",
     *    operationId="classWiseDueReport",
     *    tags={"Fee"},
     *    summary="Class Wise Due Report",
     *    description="Class Wise Due Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function classWiseDueReport(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $academicYearId = $setting?->academic_year_id;

        // $classNames = $this->classroomRepository->getActiveClassNameAll($request->schoolId, $setting?->academic_year_id);
        // $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
        // $fees = $this->feeRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
        // $feeCategories = $this->categoryRepository->getActiveFeeCategoryAll($request->schoolId);
        // $feeStructures = $this->feeStructureRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
        $classDueReports = [];
        // $student_status_array = [];

        // foreach (Status::cases() as $case) {
        //     if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
        //         array_push($student_status_array, ['id' => $case->value, 'title' => $case->value]);
        //     }
        // }

        if (!empty($request->classroomIds)) {

            // get transport fee setting
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure', $request->schoolId, $setting?->academic_year_id);

            // arguments for filter data
            $filter_arguments = [
                'classNameId' => !empty($request->class_name_id) ? $request->class_name_id : null,
                'classroomIds' => json_decode($request->classroomIds),
                'studentStatus' => !empty($request->student_status) ? $request->student_status : "",
                'fromFeeId' => !empty($request->fromFeeId) ? $request->fromFeeId : "",
                'toFeeId' => !empty($request->toFeeId) ? $request->toFeeId : "",
                'feeCategoryId' => !empty($request->fee_category_id) ? $request->fee_category_id : "",
                'feeStructureId' => !empty($request->fee_structure_id) ? $request->fee_structure_id : "",
                'schoolId' => !empty($request->schoolId) ? $request->schoolId : "",
                'academicYearId' => !empty($setting?->academic_year_id) ? $setting?->academic_year_id : "",
            ];

            //get filtered fee installments
            $feeInstallments = $this->apiFilteredStudentsFees(...$filter_arguments);

            if (count($feeInstallments) > 0) {
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

                // calculate and format fee due report data ->groupBy('classroom_id')
                $classDueReports = $feeInstallments->groupBy('classroom_id')->map(function ($classroomInstallments, $classroomId) use ($request, $academicYearId, $transportFeeStructureSetting) {
                    // old
                    // $classroomInstallments->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                    //     $query->where('classroom_id', $classroomId);
                    // }]);

                    // new
                    $classroomInstallments->loadMissing([
                        'student.classroomRollRaw' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        },
                        'student.studentImageRaw'
                    ]);

                    $classTotalDue = 0;

                    // return value here
                    $studentsData = $classroomInstallments->groupBy('student_id')->map(function ($studentInstallments) use (&$classTotalDue, $request, $academicYearId, $transportFeeStructureSetting) {
                        $studentTotalDue = 0;
                        $studentTotalLateFee = 0;
                        $studentTotalTranspotFee = 0;

                        // calculate late fee and transport fee
                        foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeIntallmentsGroupedData) {
                            $studentId = $studentInstallments->first()->student_id;
                            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId, $request->schoolId, $academicYearId);
                            $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId, $request->schoolId, $academicYearId);

                            if (!$hasPayment) {
                                $fee = $feeIntallmentsGroupedData->first()->fee;

                                // calculte transport fee if transport fee setting set to fee
                                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                    $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee', $request->schoolId, $academicYearId);
                                    $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee', $request->schoolId, $academicYearId);
                                    $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee', $request->schoolId, $academicYearId);

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
                                            $deallocateTransport?->fee_id,
                                            $request->schoolId,
                                            $academicYearId
                                        );

                                        if (count($allocateTransportFees) > 0) {
                                            $transportFee = $this->feeTypeRepository->getTransportFeeType($request->schoolId);

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
                                    $lateFee = $this->feeTypeRepository->getLateFeeType($request->schoolId);

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

                        // old
                        // $studentinstallment['student_roll_no'] = $studentinstallment['student']['classroomRoll']['roll_no'] ?? "";

                        // new
                        $studentinstallment['student_roll_no'] = $studentinstallment['student']['classroomRollRaw']['roll_no'] ?? "";

                        // construct father name
                        $father_name = "";

                        if ($studentinstallment->father != null) {
                            $father_name = "{$studentinstallment?->father?->first_name} {$studentinstallment?->father?->middle_name} {$studentinstallment->father->last_name}";
                        }

                        return [
                            'id' => $studentinstallment->student_id,
                            'admission_no' => $studentinstallment->student_admission_no,
                            'roll_no' => $studentinstallment->student_roll_no,
                            'name' => "{$studentinstallment?->student_first_name} {$studentinstallment?->student_middle_name} {$studentinstallment?->student_last_name}",
                            'father_name' => $father_name,
                            'sms_phone' => $studentinstallment?->father?->sms_phone ?? "",
                            'total_due_amount' => $studentTotalDue + $studentTotalLateFee + $studentTotalTranspotFee,
                            'student_image' => $studentinstallment['student']['studentImage']['path'] ?? ""
                        ];
                    })->toArray();

                    return [
                        'classroom' => [
                            'id' => $classroomId,
                            'title' => $classroomInstallments->first()?->classroom?->title,
                        ],
                        'total_due_amount' => $classTotalDue,
                        'students_data' => array_values($studentsData),
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
                    $request->student_active_status ?? "",
                    $request->schoolId,
                    $academicYearId
                );

                $classDueReports = $this->apiProcessGeneralVouchersDueData($classDueReports, $generalVouchers);
            }
        }

        return response()->json([
            'success' => true,
            // 'classNames' => $classNames,
            // 'classrooms' => $classrooms,
            //  'fees' => $fees,
            //  'feeCategories' => $feeCategories,
            // 'feeStructures' => $feeStructures,
            //  'student_status_array' => $student_status_array,
            'data' => !empty($classDueReports) ? array_values($classDueReports) : null,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/fees/dinstallments-fees",
     *    operationId="installmentFees",
     *    tags={"Fee"},
     *    summary="Head Wise Daily Collection",
     *    description="Head Wise Daily Collection",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function installmentFees(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $fees = Fee::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->where('academic_year_id', $setting?->academic_year_id)
            ->select('id', 'title')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'fees' => $fees,
        ], 200);
    }


    /**
     * @OA\Get(
     *    path="/fees/due/student-wise-report",
     *    operationId="studentWiseDueReport",
     *    tags={"Fee"},
     *    summary="Student Wise Due Report",
     *    description="Student Wise Due Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function studentWiseDueReport(Request $request)
    {
        if (!empty($request->schoolId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $feeCollectionSummary = null;

            if (!empty($request->studentId) && (!empty($request->fromFeeId) && !empty($request->toFeeId))) {
                $installmentWiseFeeData = $this->getInstallmentWiseStudentFeeSummary(
                    $request->studentId,
                    $request->fromFeeId,
                    $request->toFeeId,
                    $request->schoolId,
                    $setting?->academic_year_id
                );

                if (!empty($installmentWiseFeeData)) {
                    ksort($installmentWiseFeeData);

                    $feeCollectionSummary = array_values($installmentWiseFeeData);
                }
            }

            return response()->json([
                'success' => true,
                //  'fees' => $fees,
                'data' => ($feeCollectionSummary != null) ?  $feeCollectionSummary : null
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/fees/auth-student/due-installments",
     *    operationId="studentWiseDueReport",
     *    tags={"Fee"},
     *    summary="Student Wise Due Report",
     *    description="Student Wise Due Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function studentDueInstallment(Request $request)
    {
        if (!empty($request->schoolId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $fromFeeId = $this->getFeeInstallation('Admission', $request->schoolId, $setting?->academic_year_id);
            $toFeeId = $this->getFeeInstallation('March', $request->schoolId, $setting?->academic_year_id);
            $feeCollectionSummary = null;

            if (!empty($request->studentId) && (!empty($fromFeeId?->id) && !empty($toFeeId?->id))) {
                $installmentWiseFeeData = $this->getInstallmentWiseStudentFeeSummary(
                    $request->studentId,
                    $fromFeeId?->id,
                    $toFeeId?->id,
                    $request->schoolId,
                    $setting?->academic_year_id
                );

                // dd($installmentWiseFeeData);

                if (!empty($installmentWiseFeeData)) {
                    ksort($installmentWiseFeeData);
                    $feeCollectionSummary = array_values($installmentWiseFeeData);
                }
            }

            $feeCollections = collect($feeCollectionSummary)->map(function ($fee) {
                if (isset($fee['due_amount']) && $fee['due_amount'] != 0) {
                    return $fee;
                }
            });

            $feeCollections = array_filter($feeCollections->toArray());

            return response()->json([
                'success' => true,
                'fees' => ['fromFeeId' => $fromFeeId, 'toFeeId' => $toFeeId],
                'data' => ($feeCollections != null) ?  array_values($feeCollections) : []
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/fees/auth-student/paid-installments",
     *    operationId="studentWiseDueReport",
     *    tags={"Fee"},
     *    summary="Student Wise Due Report",
     *    description="Student Wise Due Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function studentPaidInstallment(Request $request)
    {
        if (!empty($request->schoolId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $fromFeeId = $this->getFeeInstallation('Admission', $request->schoolId, $setting?->academic_year_id);
            $toFeeId = $this->getFeeInstallation('March', $request->schoolId, $setting?->academic_year_id);
            $feeCollectionSummary = null;

            if (!empty($request->studentId) && (!empty($fromFeeId?->id) && !empty($toFeeId?->id))) {
                $installmentWiseFeeData = $this->getInstallmentWiseStudentFeeSummary(
                    $request->studentId,
                    $fromFeeId?->id,
                    $toFeeId?->id,
                    $request->schoolId,
                    $setting?->academic_year_id
                );

                if (!empty($installmentWiseFeeData)) {
                    ksort($installmentWiseFeeData);
                    $feeCollectionSummary = array_values($installmentWiseFeeData);
                }
            }

            $feeCollections = collect($feeCollectionSummary)->map(function ($fee) {
                if (isset($fee['due_amount']) && $fee['due_amount'] == 0) {
                    return $fee;
                }
            });

            $feeCollections = array_filter($feeCollections->toArray());

            return response()->json([
                'success' => true,
                'fees' => ['fromFeeId' => $fromFeeId, 'toFeeId' => $toFeeId],
                'data' => ($feeCollections != null) ?  array_values($feeCollections) : []
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    public function studentWiseDueReport_old(Request $request)
    {
        if (!empty($request->schoolId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $fees = $this->feeRepository->getActiveIdTitle($request->schoolId, $setting?->academic_year_id);
            $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
            $feeCollectionSummary = null;

            if ($request->studentId) {
                if (
                    !empty($request->filterType) &&
                    ($request->filterType === "date_wise" && (!empty($request->start_date) && !empty($request->end_date))) ||
                    ($request->filterType === "installment_wise" && (!empty($request->fromFeeId) && !empty($request->toFeeId)))
                ) {
                    $feeCollectionSummaryData = $this->apiDateAndInstallmentWiseFeePaymentDueSummary(
                        $request->filterType,
                        $request->start_date,
                        $request->end_date,
                        $request->fromFeeId,
                        $request->toFeeId,
                        $request->schoolId,
                        $setting?->academic_year_id,
                        $request->studentId
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

                        // $feeCollectionSummary['class_wise_data'] = $classWiseData;
                        // $feeCollectionSummary['installment_wise_data'] = $installmentWiseData;
                        $feeCollectionSummary = $installmentWiseData;
                    }
                }
            }

            return response()->json([
                'success' => true,
                //  'fees' => $fees,
                'data' => ($feeCollectionSummary != null) ?  [$feeCollectionSummary] : null
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /*
    *   get installment wise student fee summary
    */
    protected function getInstallmentWiseStudentFeeSummary($studentId, $fromFeeId, $toFeeId, $schoolId, $academicYearId)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->getStudentFeeDiscounts($studentId, $fromFeeId, $toFeeId, $schoolId, $academicYearId);
        $feeInstallments = $this->getStudentFeeInstallments($studentId, $fromFeeId, $toFeeId, $schoolId, $academicYearId);

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId, $schoolId, $academicYearId);
                $lastPayment = $this->classFeeStudentAmountRepository->lastFeePayment($studentId, $feeInstallmentId, $schoolId, $academicYearId);

                if (!$hasPayment) {
                    $fee = $groupedFeeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure', $schoolId, $academicYearId);

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee', $schoolId, $academicYearId);
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee', $schoolId, $academicYearId);
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee', $schoolId, $academicYearId);

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
                                $schoolId,
                                $academicYearId
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType($schoolId);

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
                                                    'feeType' => $transportFee,
                                                    'fee' => $fee,
                                                    'payment' => null,
                                                    'nullify_fee' => null,
                                                ]);

                                                $groupedFeeInstallments->push($newTransportFee);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // add late fee in structure if late fine is available
                    $lateFee = $this->feeTypeRepository->getLateFeeType($schoolId);

                    if ($lateFee != null) {
                        $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();

                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type", $schoolId, $academicYearId)?->value;
                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount", $schoolId, $academicYearId)?->value;

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

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $due_amount = $fee_amount;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            }
                        }
                    }

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;

                    if (!isset($feeInstallmentsData[$feeInstallmentId])) {
                        $feeInstallmentsData[$feeInstallmentId]['id'] = $feeInstallmentId;
                        $feeInstallmentsData[$feeInstallmentId]['title'] = $feeInstallment['fee']['title'];
                    }
                }

                $feeInstallmentsData[$feeInstallmentId]['payable_amount'] = $total_fee_amount - $total_discount_amount;
                $feeInstallmentsData[$feeInstallmentId]['paid_amount'] = $total_paid_amount;
                $feeInstallmentsData[$feeInstallmentId]['due_amount'] = $total_due_amount;
                $feeInstallmentsData[$feeInstallmentId]['paid_date'] = $lastPayment?->payment_method?->payment_date;
            }
        }

        return $feeInstallmentsData;
    }


    // Reusable function to build enum options array
    private function apiBuildOptionsArray($cases)
    {
        $options = [];

        foreach ($cases as $case) {
            $options[] = ['id' => $case->value, 'title' => $case->value];
        }

        return $options;
    }

    public function apiHeadWiseDailyFeePaymentReports(
        $school_id = 1,
        $academic_year_id = 1,
        $sort_by = "",
        $voucher = false,
        $cancelled_fee = false,
        $start_date = "",
        $end_date = "",
        $payment_mode = "",
    ) {
        $orderBy = [
            'receipt_no' => 'receipt_no',
            'receipt_date' => 'payment_date',
        ];

        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', $school_id)
            ->where('academic_year_id', $academic_year_id)
            ->when(!empty($start_date), function ($query) use ($start_date) {
                $query->whereDate('payment_date', '>=', Carbon::parse($start_date)->format('Y-m-d'));
            })
            ->when(!empty($end_date), function ($query) use ($end_date) {
                $query->whereDate('payment_date', '<=', Carbon::parse($end_date)->format('Y-m-d'));
            })
            ->when(!empty($payment_mode), function ($query) use ($payment_mode) {
                $query->where('payment_mode', $payment_mode);
            })

            ->when($cancelled_fee == false, function ($query) {
                $query->where('is_cancelled', false);
            })
            ->whereHas('fee_payments', function ($query) use ($voucher) {
                if ($voucher == false) {
                    $query->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT);
                }
                $query->where('is_adjusted_fee', false);
            })
            ->with(['fee_payments' => function ($query) use ($voucher) {
                $query->when($voucher == false, function ($query) {
                    $query->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT);
                });
            }])
            ->when(!empty($sort_by), function ($query) use ($sort_by, $orderBy) {
                $query->orderBy($orderBy[$sort_by], 'asc');
            })
            ->get();
    }

    public function apiStudentIdsByClassNameId($id, $school_id, $academic_year_id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $school_id)
            ->whereHas('classroomPromotedStudents', function ($query) use ($id, $academic_year_id) {
                $query->where('classroom_students.academic_year_id', $academic_year_id)
                    ->whereHas('classroom', function ($query) use ($id) {
                        $query->where('classrooms.class_name_id', $id);
                    });
            })
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }

    public function apiDateAndInstallmentWiseFeePaymentSummary($school_id, $academic_year_id, $filter_type, $start_date = "", $end_date = "", $from_fee_id = null, $to_fee_id = null)
    {
        return FeePaymentMethod::where('status', Status::ACTIVE)
            ->where('school_id', $school_id)
            ->where('academic_year_id', $academic_year_id)
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
            ->with(['fee_payments' => function ($query) use ($academic_year_id) {
                $query->with(['student' => function ($query) use ($academic_year_id) {
                    $query->select(
                        'id',
                        'classroom_id'
                    )->with(['promotedClassroomRaw' => function ($query) use ($academic_year_id) {
                        $query->where('classroom_students.academic_year_id', $academic_year_id);
                    },]);
                }]);
            }])
            ->get();
    }

    protected function getFeeInstallation($feeInstallation, $schoolId, $academicYearId)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('title', 'LIKE', '%' . $feeInstallation . '%')
            ->select('id', 'title')
            ->orderBy('id', 'asc')
            ->first();
    }
}
