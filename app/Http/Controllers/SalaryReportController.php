<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\TeachingType;
use App\Enums\PublishStatus;
use Illuminate\Http\Request;
use App\Repositories\IStaffRepository;
use App\Repositories\ISalaryRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\IPaymentMonthRepository;
use App\Repositories\IStaffEarningRepository;
use App\Repositories\IDeductionTypeRepository;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStaffAdvancePaymentRepository;

class SalaryReportController extends Controller
{

    public function __construct(
        private ISalaryRepository $salaryRepository,
        private IStaffRepository $staffRepository,
        private ITeacherRepository $teacherRepository,
        private IPaymentMonthRepository $paymentMonthRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private IEarningTypeRepository $earningTypeRepository,
        private IDeductionTypeRepository $deductionTypeRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
        private IStaffEarningRepository $staffEarningRepository,
    ) {
        $this->middleware('permission:view salary', ['only' => [
            'bankStatement',
            'yearlyStatement',
            'cancelledReport',
            'epfReport',
            'epfWageReport',
            'esiReport',
            'advancePaymentReport',
            'basicSalaryReport',
            'paymentReport',
            'bulkProcessSalary',
            'publishSalary',
            'printSalarySlip',
            'advancePayment'
        ]]);
    }

    /**
     * Display Bank Statement.
     */
    public function bankStatement(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        $staffSalaryPayments = [];

        if ($request->isMethod("POST")) {
            $paymentMonthId = $request->payment_month_id ?? null;

            if (!empty($paymentMonthId)) {
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryBankStatementReport($paymentMonthId);
            }
        }

        return Inertia::render('SalaryReport/BankStatement', [
            'paymentMonths' => $paymentMonths,
            'staffSalaryPayments' => $staffSalaryPayments
        ]);
    }

    /**
     * Yearly Bank Statement.
     */
    public function yearlyStatement(Request $request): Response
    {
        // staffs
        $staffs = $this->getStaffData();

        $staffSalaryPayments = [];

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;

            if (!empty($staffId)) {
                // staff salary payments
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryYearlyStatementReport($staffId);

                if (count($staffSalaryPayments) > 0) {
                    $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) {
                        $staffSalaryPayment['payment_date'] = !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '';

                        return $staffSalaryPayment;
                    });
                }
            }
        }

        return Inertia::render('SalaryReport/YearlyStatement', [
            'staffs' => $staffs,
            'staffSalaryPayments' => $staffSalaryPayments
        ]);
    }

    /**
     * Cancelled Salary Report.
     */
    public function cancelledReport(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        // staffs
        $staffs = $this->getStaffData();

        $staffId = null;
        $paymentMonthId = null;

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;
            $paymentMonthId = $request->payment_month_id ?? null;
        }

        // cancelled salary payments
        $cancelledStaffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryCancelledReport($staffId, $paymentMonthId);

        if (count($cancelledStaffSalaryPayments) > 0) {
            $cancelledStaffSalaryPayments = $cancelledStaffSalaryPayments->map(function ($staffSalaryPayment) {
                $staffSalaryPayment['payment_date'] = !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '';

                return $staffSalaryPayment;
            });
        }

        return Inertia::render('SalaryReport/CancelledReport', [
            'paymentMonths' => $paymentMonths,
            'staffs' => $staffs,
            'cancelledStaffSalaryPayments' => $cancelledStaffSalaryPayments
        ]);
    }

    /**
     * EPF Report
     */
    public function epfReport(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        // earning types
        $earningTypes = $this->earningTypeRepository->getActiveAll();

        $staffSalaryPayments = [];

        if ($request->isMethod('POST')) {
            $paymentMonthId = $request->payment_month_id ?? null;
            $earningTypeIds = $request->earning_type_ids ?? [];
            $pf = (int) $request->pf ?? 0;

            if (!empty($paymentMonthId) && count($earningTypeIds) > 0) {
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEpfReport($paymentMonthId, $earningTypeIds);

                if (count($staffSalaryPayments) > 0) {
                    $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) use ($pf) {
                        $totalEarning = 0;

                        if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                            foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                                $totalEarning += (int) $earning->amount ?? 0;
                            }
                        }

                        $pfAmount = ($pf / 100) * $totalEarning;

                        $staffSalaryPayment['total_earning'] = $totalEarning;
                        $staffSalaryPayment['pf_amount'] = (float) number_format($pfAmount, 2, '.', '');

                        return $staffSalaryPayment;
                    });
                }
            }
        }

        return Inertia::render('SalaryReport/EpfReport', [
            'paymentMonths' => $paymentMonths,
            'earningTypes' => $earningTypes,
            'staffSalaryPayments' => $staffSalaryPayments
        ]);
    }

    /**
     * EPF wage report.
     */
    public function epfWageReport(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        $staffSalaryPayments = [];

        if ($request->isMethod('POST')) {
            $paymentMonthId = $request->payment_month_id ?? null;

            if (!empty($paymentMonthId)) {
                // staff salary payments
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEpfWageReport($paymentMonthId);

                if (count($staffSalaryPayments) > 0) {
                    $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) {
                        $grossSalary = $staffSalaryPayment?->staffSalaryPaymentEarnings?->sum('amount');
                        $pf = 12;
                        $pfAmount = $grossSalary > 0 ? ($pf / 100) * $grossSalary : 0;

                        return [
                            'employee_id' => $staffSalaryPayment?->staff?->employee_id,
                            'staff_name' => $staffSalaryPayment?->staff?->first_name . ' ' . $staffSalaryPayment?->staff?->middle_name . ' ' . $staffSalaryPayment?->staff?->last_name,
                            'uan' => $staffSalaryPayment?->staff?->uan,
                            'gross_salary' => $grossSalary,
                            'pf_amount' => $pfAmount,
                        ];
                    })->toArray();
                }
            }
        }

        return Inertia::render('SalaryReport/EpfWageReport', [
            'paymentMonths' => $paymentMonths,
            'staffSalaryPayments' => $staffSalaryPayments
        ]);
    }

    /**
     * ESI Report
     */
    public function esiReport(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        // earning types
        $earningTypes = $this->earningTypeRepository->getActiveAll();

        $staffSalaryPayments = [];

        if ($request->isMethod('POST')) {
            $paymentMonthId = $request->payment_month_id ?? null;
            $earningTypeIds = $request->earning_type_ids ?? [];
            $employeesValue = (int) $request->employees_value ?? 0;
            $employersValue = (int) $request->employers_value ?? 0;
            $income = (int) $request->income ?? 0;

            if (!empty($paymentMonthId) && count($earningTypeIds) > 0) {
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEsiReport($paymentMonthId, $earningTypeIds);

                if (count($staffSalaryPayments) > 0) {
                    $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) use ($employeesValue, $employersValue) {
                        $grossSalary = 0;

                        if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                            foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                                $grossSalary += (int) $earning->amount ?? 0;
                            }
                        }

                        $employeesAmount = ($employeesValue / 100) * $grossSalary;
                        $employersAmount = ($employersValue / 100) * $grossSalary;

                        $staffSalaryPayment['gross_salary'] = $grossSalary;
                        $staffSalaryPayment['employees_amount'] = (float) number_format($employeesAmount, 2, '.', '');
                        $staffSalaryPayment['employers_amount'] = (float) number_format($employersAmount, 2, '.', '');
                        $staffSalaryPayment['total_amount'] = $employeesAmount + $employersAmount;

                        return $staffSalaryPayment;
                    });
                }
            }
        }

        return Inertia::render('SalaryReport/EsiReport', [
            'paymentMonths' => $paymentMonths,
            'earningTypes' => $earningTypes,
            'staffSalaryPayments' => $staffSalaryPayments
        ]);
    }

    /**
     * Display the teacher Earning.
     */
    public function advancePaymentReport(Request $request): Response
    {
        // staffs
        $staffs = $this->getStaffData();

        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        $staffId = null;
        $paymentMonthId = null;

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;
            $paymentMonthId = $request->payment_month_id ?? null;
        }

        // staff advance payments
        $staffAdvancePayments = $this->staffAdvancePaymentRepository->getActiveStaffAdvancePayments($staffId, $paymentMonthId);

        if (count($staffAdvancePayments) > 0) {
            $staffAdvancePayments->transform(function ($staffAdvancePayment) {
                $staffAdvancePayment['payment_date'] = !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '';

                return $staffAdvancePayment;
            });
        }

        return Inertia::render('SalaryReport/AdvancePaymentReport', [
            'staffs' => $staffs,
            'paymentMonths' => $paymentMonths,
            'staffAdvancePayments' => $staffAdvancePayments
        ]);
    }


    /**
     * Display the teacher Earning.
     */
    public function basicSalaryReport(): Response
    {
        // staff earnings
        $staffEarnings = $this->staffEarningRepository->getActiveAll();

        if (count($staffEarnings) > 0) {
            // earning types
            $earningTypes = $this->earningTypeRepository->getActiveAll();
            $groupedEarningTypes = $earningTypes?->keyBy('id')?->toArray();

            // deduction types
            $deductionTypes = $this->deductionTypeRepository->getActiveAll();
            $groupedDeductionTypes = $deductionTypes?->keyBy('id')?->toArray();

            $staffEarnings->transform(function ($staffEarning) use ($groupedEarningTypes, $groupedDeductionTypes) {
                // earnings
                $earningsData = $staffEarning?->earnings != null ? json_decode($staffEarning?->earnings, true) : [];
                $earnings = [];
                $earningAmount = 0;

                if (count($earningsData) > 0) {
                    foreach ($earningsData as $earning) {
                        $earningTypeId = $earning['earning_type_id'] ?? null;
                        $amount = $earning['amount'] ?? 0;

                        $earnings[] = [
                            'title' => $groupedEarningTypes[$earningTypeId]['title'] ?? '',
                            'amount' => $amount
                        ];

                        $earningAmount += $amount;
                    }
                }

                // deductions
                $deductionsData = $staffEarning?->deductions != null ? json_decode($staffEarning?->deductions, true) : [];
                $deductions = [];
                $deductionAmount = 0;

                if (count($deductionsData) > 0) {
                    foreach ($deductionsData as $deduction) {
                        $deductionTypeId = $deduction['deduction_type_id'] ?? null;
                        $amount = $deduction['amount'] ?? 0;

                        $deductions[] = [
                            'title' => $groupedDeductionTypes[$deductionTypeId]['title'] ?? '',
                            'amount' => $amount
                        ];

                        $deductionAmount += $amount;
                    }
                }

                $staffEarning['earnings'] = $earnings;
                $staffEarning['deductions'] = $deductions;
                $staffEarning['earning_amount'] = $earningAmount;
                $staffEarning['deduction_amount'] = $deductionAmount;
                $staffEarning['updated_on'] = !empty($staffEarning->updated_at) ? Carbon::parse($staffEarning->updated_at)->format('l, d F Y') : '';

                return $staffEarning;
            });
        }

        return Inertia::render('SalaryReport/BasicSalaryReport', [
            'staffEarnings' => $staffEarnings
        ]);
    }

    /**
     * Display the teacher salary payment.
     */
    public function paymentReport(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        // staff types
        $staffTypes = buildEnumOptionsArray(TeachingType::cases());

        // publish status
        $statusArr = buildEnumOptionsArray(PublishStatus::cases());

        $salaryPaymentData = [];
        $advancePaymentData = [];

        if ($request->isMethod('POST')) {
            $staffType = $request->staff_type ?? "";
            $status = $request->status ?? "";
            // $paymentMonthId = $request->payment_month_id ?? null;
            $paymentMonthIds = $request->payment_month_ids ?? [];

            if (!empty($paymentMonthIds)) {
                // earning types
                $earningTypes = $this->earningTypeRepository->getActiveAll();
                $groupedEarningTypes = $earningTypes?->keyBy('id')?->toArray();

                // deduction types
                $deductionTypes = $this->deductionTypeRepository->getActiveAll();
                $groupedDeductionTypes = $deductionTypes?->keyBy('id')?->toArray();

                // staff salary payments
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredStaffSalaryPayments($paymentMonthIds, $status, $staffType);

                if (count($staffSalaryPayments) > 0) {
                    foreach ($staffSalaryPayments as $staffSalaryPayment) {
                        $staffId = $staffSalaryPayment?->staff_id;

                        if (!isset($salaryPaymentData[$staffId])) {
                            $salaryPaymentData[$staffId] = [
                                'id' => $staffId,
                                'employee_id' => $staffSalaryPayment?->staff?->employee_id,
                                'staff_name' => trim(implode(' ', [$staffSalaryPayment?->staff?->first_name, $staffSalaryPayment?->staff?->middle_name, $staffSalaryPayment?->staff?->last_name])),
                                'uan' => $staffSalaryPayment?->staff?->uan,
                                'earnings' => [],
                                'deductions' => [],
                                'earning_amount' => 0,
                                'deduction_amount' => 0,
                                'paid_amount' => 0,
                            ];
                        }

                        $salaryPaymentData[$staffId]['paid_amount'] += $staffSalaryPayment->paid_amount ?? 0;

                        // earnings
                        if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                            foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                                $earningTypeId = $earning->earning_type_id ?? null;
                                $amount = $earning->amount ?? 0;

                                if (!isset($salaryPaymentData[$staffId]['earnings'][$earningTypeId])) {
                                    $salaryPaymentData[$staffId]['earnings'][$earningTypeId] = [
                                        'title' => $groupedEarningTypes[$earningTypeId]['title'] ?? '',
                                        'amount' => 0
                                    ];
                                }

                                $salaryPaymentData[$staffId]['earnings'][$earningTypeId]['amount'] += $amount;
                                $salaryPaymentData[$staffId]['earning_amount'] += $amount;
                            }
                        }

                        // deductions
                        if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0) {
                            foreach ($staffSalaryPayment->staffSalaryPaymentDeductions as $deduction) {
                                $deductionTypeId = $deduction->deduction_type_id ?? null;
                                $amount = $deduction->amount ?? 0;

                                if (!isset($salaryPaymentData[$staffId]['deductions'][$deductionTypeId])) {
                                    $salaryPaymentData[$staffId]['deductions'][$deductionTypeId] = [
                                        'title' => $groupedDeductionTypes[$deductionTypeId]['title'] ?? '',
                                        'amount' => 0
                                    ];
                                }

                                $salaryPaymentData[$staffId]['deductions'][$deductionTypeId]['amount'] += $amount;
                                $salaryPaymentData[$staffId]['deduction_amount'] += $amount;
                            }
                        }
                    }
                }

                if (empty($status) || $status != PublishStatus::NOT_PUBLISHED->value) {
                    // staff advance payments
                    $staffAdvancePayments = $this->staffAdvancePaymentRepository->getFilteredStaffAdvancePayments($paymentMonthIds, $staffType);

                    if (count($staffAdvancePayments) > 0) {
                        // earning type
                        $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                        // earnings
                        $earningTypeId = $earningType->id ?? null;
                        $earningTypeTitle = $earningType->title ?? '';

                        foreach ($staffAdvancePayments as $staffAdvancePayment) {
                            $staffId = $staffAdvancePayment?->staff_id;

                            if (!isset($advancePaymentData[$staffId])) {
                                $advancePaymentData[$staffId] = [
                                    'id' => $staffId,
                                    'employee_id' => $staffAdvancePayment?->staff?->employee_id,
                                    'staff_name' => trim(implode(' ', [$staffAdvancePayment?->staff?->first_name, $staffAdvancePayment?->staff?->middle_name, $staffAdvancePayment?->staff?->last_name])),
                                    'uan' => $staffAdvancePayment?->staff?->uan,
                                    'earnings' => [],
                                    'deductions' => [],
                                    'earning_amount' => 0,
                                    'deduction_amount' => 0,
                                    'paid_amount' => 0,
                                ];
                            }

                            $amount = $staffAdvancePayment->paid_amount ?? 0;

                            if (!isset($advancePaymentData[$staffId]['earnings'][$earningTypeId])) {
                                $advancePaymentData[$staffId]['earnings'][$earningTypeId] = [
                                    'title' => $earningTypeTitle,
                                    'amount' => 0
                                ];
                            }

                            $advancePaymentData[$staffId]['earnings'][$earningTypeId]['amount'] += $amount;
                            $advancePaymentData[$staffId]['earning_amount'] += $amount;
                            $advancePaymentData[$staffId]['paid_amount'] += $amount;
                        }
                    }
                }
            }
        }

        // merge salary payment and advance payment data
        $salaryPaymentReport = array_merge($salaryPaymentData, $advancePaymentData);

        if (!empty($salaryPaymentReport)) {
            usort($salaryPaymentReport, function ($a, $b) {
                return $a['id'] > $b['id'];
            });
        }

        return Inertia::render('SalaryReport/PaymentReport', [
            'paymentMonths' => $paymentMonths,
            'staffTypes' => $staffTypes,
            'statusArr' => $statusArr,
            'salaryPaymentReport' => $salaryPaymentReport,
        ]);
    }

    /**
     * Display the teacher Earning.
     */
    public function bulkProcessSalary(Request $request): Response
    {
        $salaries = $this->salaryRepository->getActiveAll();
        $staffs = $this->staffRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();

        return Inertia::render('SalaryReport/BulkProcessSalary', [
            'salaries' => $salaries,
            'staffs' => $staffs,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Display the teacher Earning.
     */
    public function publishSalary(Request $request): Response
    {
        $salaries = $this->salaryRepository->getActiveAll();
        $staffs = $this->staffRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();

        return Inertia::render('SalaryReport/PublishSalary', [
            'salaries' => $salaries,
            'staffs' => $staffs,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Display the teacher Earning.
     */
    public function printSalarySlip(Request $request): Response
    {
        $salaries = $this->salaryRepository->getActiveAll();
        $staffs = $this->staffRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();

        return Inertia::render('SalaryReport/PrintSalarySlip', [
            'salaries' => $salaries,
            'staffs' => $staffs,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Display the teacher Earning.
     */
    public function advancePayment(Request $request): Response
    {
        $salaries = $this->salaryRepository->getActiveAll();
        $staffs = $this->staffRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();

        return Inertia::render('SalaryReport/AdvancePayment', [
            'salaries' => $salaries,
            'staffs' => $staffs,
            'teachers' => $teachers,
        ]);
    }

    /*
    * Helper mehtod to get staff data
    */
    private function getStaffData()
    {
        $staffs = $this->staffRepository->getActiveStaffData();

        if (count($staffs) > 0) {
            $staffs = $staffs->map(function ($staff) {
                $staff['title'] = "{$staff->first_name} {$staff->middle_name} {$staff->last_name}";

                return $staff;
            });
        }

        return $staffs;
    }
}
