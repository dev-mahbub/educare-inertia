<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\DayType;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use App\Enums\SalaryIncrementType;
use Illuminate\Support\Facades\DB;
use App\Enums\SalaryIncrementStatus;
use App\Http\Requests\SalaryRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IBankRepository;
use App\Repositories\StaffRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\PayScaleRequest;
use App\Repositories\ILeaveRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\SalaryRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\ISalaryRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\EarningTypeRequest;
use App\Repositories\ICategoryRepository;
use App\Repositories\IPayScaleRepository;
use App\Http\Requests\PaymentMonthRequest;
use App\Http\Requests\StaffEarningRequest;
use App\Http\Requests\DeductionTypeRequest;
use App\Repositories\IBankAccountRepository;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IPaymentMonthRepository;
use App\Repositories\IStaffEarningRepository;
use App\Repositories\IDeductionTypeRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\BulkProcessSalaryRequest;
use App\Http\Requests\StaffSalaryPaymentRequest;
use App\Repositories\IStaffAttendanceRepository;
use App\Http\Requests\StaffAdvancePaymentRequest;
use App\Http\Requests\StaffSalaryIncrementRequest;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStaffAdvancePaymentRepository;
use App\Repositories\IStaffSalaryIncrementRepository;
use App\Http\Requests\CancelStaffSalaryPaymentRequest;
use App\Http\Requests\CancelStaffAdvancePaymentRequest;
use App\Http\Requests\PublishStaffSalaryPaymentRequest;
use App\Repositories\IStaffSalaryPaymentEarningRepository;
use App\Repositories\IStaffSalaryPaymentDeductionRepository;

class SalaryController extends Controller
{

    public function __construct(
        private ISalaryRepository $salaryRepository,
        private IStaffRepository $staffRepository,
        private ITeacherRepository $teacherRepository,
        private IPaymentMonthRepository $paymentMonthRepository,
        private IEarningTypeRepository $earningTypeRepository,
        private IDeductionTypeRepository $deductionTypeRepository,
        private IPayScaleRepository $payScaleRepository,
        private IStaffEarningRepository $staffEarningRepository,
        private IStaffSalaryIncrementRepository $staffSalaryIncrementRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private ILedgerRepository $ledgerRepository,
        private IBankRepository $bankRepository,
        private IStaffSalaryPaymentEarningRepository $staffSalaryPaymentEarningRepository,
        private IStaffSalaryPaymentDeductionRepository $staffSalaryPaymentDeductionRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
        private ILeaveRepository $leaveRepository,
        private IStaffAttendanceRepository $staffAttendanceRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IBankAccountRepository $bankAccountRepository,
        private ICategoryRepository $categoryRepository,
    ) {
        $this->middleware('permission:view salary', ['only' => [
            'paymentMonth',
            'earning',
            'deduction',
            'payScale',
            'teacherEarning',
            'getPaymentMonthsData',
            'getStaffSalaryIncrementData',
            'getStaffEarningData'
        ]]);
        $this->middleware('permission:add salary', ['only' => [
            'savePaymentMonth',
            'saveEarningType',
            'saveDeductionType',
            'savePayScale',
            'saveTeacherEarning',
            'importStaffEarnings',
            'incrementStaffSalary',
            'saveStaffSalaryIncrement',
            'approveStaffSalaryIncrement',
            'cancelStaffSalaryIncrement',
            'settingSalary',
            'processSalary',
            'saveProcessSalary',
            'cancelSalaryPayment',
            'bulkProcessSalary',
            'publishSalary',
            'savePublishSalary',
            'printSalarySlip',
            'advancePayment',
            'saveAdvancePayment',
            'cancelAdvancePayment'
        ]]);
        $this->middleware('permission:edit salary', ['only' => ['updatePaymentMonth', 'updateEarningType', 'updateDeductionType', 'updatePayScale']]);
        $this->middleware('permission:delete salary', ['only' => ['deletePaymentMonth', 'deleteEarningType', 'deleteDeductionType', 'deletePayScale']]);
    }

    /**
     * Display the payment Month.
     */
    public function paymentMonth(): Response
    {
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        return Inertia::render('Salary/PaymentMonth', [
            'paymentMonths' => $paymentMonths
        ]);
    }

    /**
     * save payment month.
     */
    public function savePaymentMonth(PaymentMonthRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? '',
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'status' => Status::ACTIVE
        ];

        $paymentMonth = $this->paymentMonthRepository->create($dataArray);

        if (!$paymentMonth) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Payment month created successfully');
    }

    /**
     * update payment month.
     */
    public function updatePaymentMonth(int $id, PaymentMonthRequest $request): RedirectResponse
    {
        $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($id);

        abort_if($paymentMonth == null, 404);

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? '',
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d')
        ];

        $updatePaymentMonth = $this->paymentMonthRepository->update($id, $dataArray);

        if (!$updatePaymentMonth) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Payment month updated successfully');
    }

    /**
     * delete payment month.
     */
    public function deletePaymentMonth(int $id): RedirectResponse
    {
        $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($id);

        abort_if($paymentMonth == null, 404);

        $this->paymentMonthRepository->delete($id);

        return redirect()->back()->with('message', 'Payment month deleted successfully');
    }

    /**
     * Display the earning.
     */
    public function earning(): Response
    {
        $earningTypes = $this->earningTypeRepository->getActiveAll();

        return Inertia::render('Salary/Earning', [
            'earningTypes' => $earningTypes
        ]);
    }

    /**
     * save earning type
     */
    public function saveEarningType(EarningTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? null,
            'is_system_default' => false,
            'status' => Status::ACTIVE
        ];

        $earningType = $this->earningTypeRepository->create($dataArray);

        if (!$earningType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Earning type created successfully');
    }

    /**
     * update earning type
     */
    public function updateEarningType(int $id, EarningTypeRequest $request): RedirectResponse
    {
        $earningType = $this->earningTypeRepository->getEarningTypeById($id);

        abort_if($earningType == null, 404);

        if ($earningType->is_system_default) {
            return redirect()->back()->with('error', 'System default earning type cannot be updated!');
        }

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? null,
        ];

        $updateEarningType = $this->earningTypeRepository->update($id, $dataArray);

        if (!$updateEarningType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Earning type updated successfully');
    }

    /**
     * delete earning type
     */
    public function deleteEarningType(int $id): RedirectResponse
    {
        $earningType = $this->earningTypeRepository->getEarningTypeById($id);

        abort_if($earningType == null, 404);

        if ($earningType->is_system_default) {
            return redirect()->back()->with('error', 'System default earning type cannot be deleted!');
        }

        $this->earningTypeRepository->delete($id);

        return redirect()->back()->with('message', 'Earning type deleted successfully');
    }

    /**
     * Display Deduction Type.
     */
    public function deduction(): Response
    {
        $deductionTypes = $this->deductionTypeRepository->getActiveAll();

        return Inertia::render('Salary/Deduction', [
            'deductionTypes' => $deductionTypes
        ]);
    }

    /**
     * save deduction type
     */
    public function saveDeductionType(DeductionTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? null,
            'is_pf' => $input['is_pf'] ?? false,
            'is_esi' => $input['is_esi'] ?? false,
            'apply_absent_deduction' => $input['apply_absent_deduction'] ?? false,
            'is_system_default' => false,
            'status' => Status::ACTIVE
        ];

        $deductionType = $this->deductionTypeRepository->create($dataArray);

        if (!$deductionType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Deduction type created successfully');
    }

    /**
     * update deduction type
     */
    public function updateDeductionType(int $id, DeductionTypeRequest $request): RedirectResponse
    {
        $deductionType = $this->deductionTypeRepository->getDeductionTypeById($id);

        abort_if($deductionType == null, 404);

        if ($deductionType->is_system_default) {
            return redirect()->back()->with('error', 'System default deduction type cannot be updated!');
        }

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? null,
            'is_pf' => $input['is_pf'] ?? false,
            'is_esi' => $input['is_esi'] ?? false,
            'apply_absent_deduction' => $input['apply_absent_deduction'] ?? false,
        ];

        $updateDeductionType = $this->deductionTypeRepository->update($id, $dataArray);

        if (!$updateDeductionType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Deduction type updated successfully');
    }

    /**
     * delete deduction type
     */
    public function deleteDeductionType(int $id): RedirectResponse
    {
        $deductionType = $this->deductionTypeRepository->getDeductionTypeById($id);

        abort_if($deductionType == null, 404);
        if ($deductionType->is_system_default) {
            return redirect()->back()->with('error', 'System default deduction type cannot be deleted!');
        }

        $this->deductionTypeRepository->delete($id);

        return redirect()->back()->with('message', 'Deduction type deleted successfully');
    }

    /**
     * Display the Pay Scale.
     */
    public function payScale(): Response
    {
        $earningTypesToExclude = [
            'Bonus',
            'Previous Due',
            'Advance Payment',
            'Extra Duty'
        ];

        $deductionTypesToExclude = [
            'Due',
            'Advance Payment Deduction',
            'Absent Deduction'
        ];

        $earningTypes = $this->earningTypeRepository->getFilteredEarningTypes($earningTypesToExclude);
        $deductionTypes = $this->deductionTypeRepository->getFilteredDeductionTypes($deductionTypesToExclude);
        $payScales = $this->payScaleRepository->getActiveAll();

        if (count($payScales) > 0) {
            $payScales->transform(function ($payScale) {
                $payScale['earnings'] = !empty($payScale->earnings) ? json_decode($payScale->earnings) : [];
                $payScale['deductions'] = !empty($payScale->deductions) ? json_decode($payScale->deductions) : [];

                return $payScale;
            });
        }

        return Inertia::render('Salary/PayScale', [
            'earningTypes' => $earningTypes,
            'deductionTypes' => $deductionTypes,
            'payScales' => $payScales,
        ]);
    }

    public function payScale_old(): Response
    {
        $earningTypes = $this->earningTypeRepository->getActiveAll();
        $deductionTypes = $this->deductionTypeRepository->getActiveAll();
        $payScales = $this->payScaleRepository->getActiveAll();

        if (count($payScales) > 0) {
            $payScales->transform(function ($payScale) {
                $payScale['earnings'] = !empty($payScale->earnings) ? json_decode($payScale->earnings) : [];
                $payScale['deductions'] = !empty($payScale->deductions) ? json_decode($payScale->deductions) : [];

                return $payScale;
            });
        }

        return Inertia::render('Salary/PayScale', [
            'earningTypes' => $earningTypes,
            'deductionTypes' => $deductionTypes,
            'payScales' => $payScales,
        ]);
    }

    /*
    * Save Pay Scale
    */
    public function savePayScale(PayScaleRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? null,
            'basic_pay' => $input['basic_pay'] ?? 0,
            'grade_pay' => $input['grade_pay'] ?? 0,
            'net_salary' => $input['net_salary'] ?? 0,
            'earnings' => !empty($input['earnings']) ? json_encode($input['earnings']) : null,
            'deductions' => !empty($input['deductions']) ? json_encode($input['deductions']) : null,
            'status' => Status::ACTIVE
        ];

        $payScale = $this->payScaleRepository->create($dataArray);

        if (!$payScale) {
            return redirect()->back()->with('error', 'Somehting goes wrong');
        }

        return redirect()->back()->with('message', 'Pay scale added successfully');
    }

    /*
    * Update Pay Scale
    */
    public function updatePayScale(int $id, PayScaleRequest $request): RedirectResponse
    {
        $payScale = $this->payScaleRepository->getPayScaleById($id);

        abort_if($payScale == null, 404);

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? null,
            'basic_pay' => $input['basic_pay'] ?? 0,
            'grade_pay' => $input['grade_pay'] ?? 0,
            'net_salary' => $input['net_salary'] ?? 0,
            'earnings' => !empty($input['earnings']) ? json_encode($input['earnings']) : null,
            'deductions' => !empty($input['deductions']) ? json_encode($input['deductions']) : null
        ];

        $updatePayScale = $this->payScaleRepository->update($id, $dataArray);

        if (!$updatePayScale) {
            return redirect()->back()->with('error', 'Somehting goes wrong');
        }

        return redirect()->back()->with('message', 'Pay scale updated successfully');
    }

    /*
    * Delete Pay Scale
    */
    public function deletePayScale(int $id): RedirectResponse
    {
        $payScale = $this->payScaleRepository->getPayScaleById($id);

        abort_if($payScale == null, 404);

        $this->payScaleRepository->delete($id);

        return redirect()->back()->with('message', 'Pay scale deleted successfully');
    }

    /**
     * Display the teacher Earning.
     */
    public function teacherEarning(Request $request): Response
    {
        $staffs = $this->getStaffData();

        $earningTypesToExclude = [
            'Bonus',
            'Previous Due',
            'Advance Payment',
            'Extra Duty'
        ];

        $deductionTypesToExclude = [
            'Advance Payment Deduction',
            'Absent Deduction'
        ];

        $earningTypes = $this->earningTypeRepository->getFilteredEarningTypes($earningTypesToExclude);
        $deductionTypes = $this->deductionTypeRepository->getFilteredDeductionTypes($deductionTypesToExclude);

        $payScales = $this->payScaleRepository->getActiveAll();

        if (count($payScales) > 0) {
            $payScales->transform(function ($payScale) {
                $payScale['earnings'] = !empty($payScale->earnings) ? json_decode($payScale->earnings) : [];
                $payScale['deductions'] = !empty($payScale->deductions) ? json_decode($payScale->deductions) : [];

                return $payScale;
            });
        }

        $staff = null;
        $staffEarning = null;

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;
            $employeeId = $request->employee_id ?? null;

            if (!empty($employeeId)) {
                $staff = $staffs?->filter(function ($staff) use ($employeeId) {
                    return $staff?->employee_id == $employeeId;
                })?->first();

                $staffId = $staff?->id;
            }

            if (!empty($staffId)) {
                $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($staffId);

                if ($staffEarning != null) {
                    $staffEarning['earnings'] = !empty($staffEarning->earnings) ? json_decode($staffEarning->earnings) : [];
                    $staffEarning['deductions'] = !empty($staffEarning->deductions) ? json_decode($staffEarning->deductions) : [];
                }

                if ($staff == null) {
                    $staff = $staffs?->filter(function ($staff) use ($staffId) {
                        return $staff?->id == $staffId;
                    })?->first();
                }
            }
        }

        return Inertia::render('Salary/TeacherEarning', [
            'staffs' => $staffs,
            'payScales' => $payScales,
            'staffEarning' => $staffEarning,
            'earningTypes' => $earningTypes,
            'deductionTypes' => $deductionTypes,
            'staff' => $staff
        ]);
    }

    public function teacherEarning_old(Request $request): Response
    {
        $staffs = $this->getStaffData();

        $earningTypes = $this->earningTypeRepository->getActiveAll();
        $deductionTypes = $this->deductionTypeRepository->getActiveAll();
        $payScales = $this->payScaleRepository->getActiveAll();

        if (count($payScales) > 0) {
            $payScales->transform(function ($payScale) {
                $payScale['earnings'] = !empty($payScale->earnings) ? json_decode($payScale->earnings) : [];
                $payScale['deductions'] = !empty($payScale->deductions) ? json_decode($payScale->deductions) : [];

                return $payScale;
            });
        }

        $staff = null;
        $staffEarning = null;

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;
            $employeeId = $request->employee_id ?? null;

            if (!empty($employeeId)) {
                $staff = $staffs?->filter(function ($staff) use ($employeeId) {
                    return $staff?->employee_id == $employeeId;
                })?->first();

                $staffId = $staff?->id;
            }

            if (!empty($staffId)) {
                $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($staffId);

                if ($staffEarning != null) {
                    $staffEarning['earnings'] = !empty($staffEarning->earnings) ? json_decode($staffEarning->earnings) : [];
                    $staffEarning['deductions'] = !empty($staffEarning->deductions) ? json_decode($staffEarning->deductions) : [];
                }

                if ($staff == null) {
                    $staff = $staffs?->filter(function ($staff) use ($staffId) {
                        return $staff?->id == $staffId;
                    })?->first();
                }
            }
        }

        return Inertia::render('Salary/TeacherEarning', [
            'staffs' => $staffs,
            'payScales' => $payScales,
            'staffEarning' => $staffEarning,
            'earningTypes' => $earningTypes,
            'deductionTypes' => $deductionTypes,
            'staff' => $staff
        ]);
    }

    /*
    * Save Teacher Earning
    */
    public function saveTeacherEarning(StaffEarningRequest $request)
    {
        $input = $request->validated();

        $attributesToCheck = [
            'school_id' => getUserSchoolId(),
            'staff_id' => $input['staff_id'] ?? null
        ];

        $valuesToUpdate = [
            'pay_scale_id' => $input['pay_scale_id'] ?? null,
            'basic_pay' => $input['basic_pay'] ?? 0,
            'grade_pay' => $input['grade_pay'] ?? 0,
            'net_salary' => $input['net_salary'] ?? 0,
            'earnings' => !empty($input['earnings']) ? json_encode($input['earnings']) : null,
            'deductions' => !empty($input['deductions']) ? json_encode($input['deductions']) : null,
            'status' => Status::ACTIVE
        ];

        $staffEarning = $this->staffEarningRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);

        if (!$staffEarning) {
            return redirect()->back()->with('error', 'Somehting goes wrong');
        }

        return redirect()->back()->with('message', 'Staff Earning added successfully');
    }

    /**
     * Import Staff Earning.
     */
    public function importStaffEarnings(): Response
    {
        return Inertia::render('Salary/ImportStaffEarnings', []);
    }

    /**
     * Staff Salary Increment
     */
    public function incrementStaffSalary(Request $request): Response
    {
        $incrementTypes = buildEnumOptionsArray(SalaryIncrementType::cases());

        $staffs = $this->getStaffData();

        $staff = null;
        $staffEarning = null;
        $staffSalaryIncrements = [];

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;

            if (!empty($staffId)) {
                $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($staffId);
                $staffSalaryIncrements = $this->staffSalaryIncrementRepository->getStaffSalaryIncrementsByStaffId($staffId);

                if (count($staffSalaryIncrements) > 0) {
                    $staffSalaryIncrements->transform(function ($staffSalaryIncrement) {
                        $prevBasicAmount = 0;
                        $incrementAmount = 0;
                        $currBasicAmount = 0;

                        $earnings = !empty($staffSalaryIncrement->earnings) ? json_decode($staffSalaryIncrement->earnings) : [];

                        if (!empty($earnings)) {
                            $earningTypeIds = array_column($earnings, 'earning_type_id');

                            $earningTypes = $this->earningTypeRepository->getEarningTypesByIds($earningTypeIds)
                                ->keyBy('id')
                                ->toArray();

                            $earnings = collect($earnings)->map(function ($earning) use ($earningTypes, &$prevBasicAmount, &$incrementAmount, &$currBasicAmount) {
                                $prevBasicAmount += $earning->amount ?? 0;
                                $incrementAmount += $earning->increment_amount ?? 0;
                                $currBasicAmount += $earning->total_amount ?? 0;

                                $earning->earning_type_title = $earningTypes[$earning?->earning_type_id]['title'] ?? '';

                                return $earning;
                            })->toArray();
                        }

                        $staffSalaryIncrement['increment_date'] = !empty($staffSalaryIncrement->increment_date) ? Carbon::parse($staffSalaryIncrement->increment_date)->format('d-M-Y') : '';
                        $staffSalaryIncrement['earnings'] = $earnings;
                        $staffSalaryIncrement['previous_basic_amount'] = $prevBasicAmount;
                        $staffSalaryIncrement['increment_amount'] = $incrementAmount;
                        $staffSalaryIncrement['current_basic_amount'] = $currBasicAmount;

                        return $staffSalaryIncrement;
                    });
                }

                if ($staffEarning != null) {
                    $earnings = !empty($staffEarning->earnings) ? json_decode($staffEarning->earnings) : [];

                    if (!empty($earnings)) {
                        $earningTypeIds = array_column($earnings, 'earning_type_id');

                        $earningTypes = $this->earningTypeRepository->getEarningTypesByIds($earningTypeIds)
                            ->keyBy('id')
                            ->toArray();

                        $earnings = collect($earnings)->map(function ($earning) use ($earningTypes) {
                            $earning->earning_type_title = $earningTypes[$earning?->earning_type_id]['title'] ?? '';

                            return $earning;
                        })->toArray();
                    }

                    $staffEarning['earnings'] = $earnings;
                }

                $staff = $staffs?->filter(function ($staff) use ($staffId) {
                    return $staff?->id == $staffId;
                })?->first();
            }
        }

        return Inertia::render('Salary/IncrementStaffSalary', [
            'staffs' => $staffs,
            'staffEarning' => $staffEarning,
            'staff' => $staff,
            'incrementTypes' => $incrementTypes,
            'staffSalaryIncrements' => $staffSalaryIncrements
        ]);
    }

    /*
    * Save Staff Salary Increment
    */
    public function saveStaffSalaryIncrement(StaffSalaryIncrementRequest $request)
    {
        $input = $request->validated();

        $earnings = null;

        if (!empty($input['earnings'])) {
            $earnings = collect($input['earnings'])->filter(function ($earning) {
                return !empty($earning['increment_type']) && !empty($earning['increment_value']);
            })->toArray();
        }

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'staff_id' => $input['staff_id'] ?? null,
            'basic_amount' => $input['basic_amount'] ?? 0,
            'earnings' => !empty($earnings) ? json_encode($earnings) : null,
            'increment_date' => !empty($input['increment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['increment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'increment_note' => $input['increment_note'] ?? null,
            'increment_status' => SalaryIncrementStatus::PENDING,
            'status' => Status::ACTIVE
        ];

        $staffSalaryIncrement = $this->staffSalaryIncrementRepository->create($dataArray);

        if (!$staffSalaryIncrement) {
            return redirect()->back()->with('error', 'Somehting goes wrong');
        }

        return redirect()->back()->with('message', 'Salary increment added successfully');
    }

    /*
    * Approve Staff Salary Increment
    */
    public function approveStaffSalaryIncrement(int $id, Request $request)
    {
        $staffSalaryIncrement = $this->staffSalaryIncrementRepository->getStaffSalaryIncrementById($id);

        abort_if($staffSalaryIncrement == null, 404);

        $input = $request->all();

        $dataArray = [
            'approval_note' => $input['approval_note'] ?? null,
            'increment_status' => SalaryIncrementStatus::APPROVED
        ];

        $approveStaffSalaryIncrement = $this->staffSalaryIncrementRepository->update($id, $dataArray);

        if (!$approveStaffSalaryIncrement) {
            return redirect()->back()->with('error', 'Somehting goes wrong');
        }

        return redirect()->back()->with('message', 'Salary increment approved successfully');
    }

    /*
    * Cancel Staff Salary Increment
    */
    public function cancelStaffSalaryIncrement(int $id, Request $request)
    {
        $staffSalaryIncrement = $this->staffSalaryIncrementRepository->getStaffSalaryIncrementById($id);

        abort_if($staffSalaryIncrement == null, 404);

        $input = $request->all();

        $dataArray = [
            'cancel_reason' => $input['cancel_reason'] ?? null,
            'increment_status' => SalaryIncrementStatus::CANCELED
        ];

        $cancelStaffSalaryIncrement = $this->staffSalaryIncrementRepository->update($id, $dataArray);

        if (!$cancelStaffSalaryIncrement) {
            return redirect()->back()->with('error', 'Somehting goes wrong');
        }

        return redirect()->back()->with('message', 'Salary increment canceled successfully');
    }

    /**
     * Account Salary Settings
     */
    public function settingSalary(): Response
    {
        // account settings
        $siteSettingAccount = getSiteSettingDataByType('Account');

        return Inertia::render('Salary/SettingSalary', [
            'siteSettings' => !empty($siteSettingAccount['Account']) ? $siteSettingAccount['Account'] : [],
        ]);
    }

    /**
     * process salary
     */
    public function processSalary(Request $request): Response
    {
        $paymentMonths = [];
        $staff = null;
        $staffEarning = null;
        $staffSalaryIncrement = null;
        $staffSalaryPayments = [];
        $staffLeaves = [];
        $staffAttendanceSummary = [];
        $staffExtraDuties = [];
        $totalAdvanceAmount = 0;
        $totalAdvanceDeductedAmount = 0;
        $totalPaidDueAmount = 0;
        $totalDueAmount = 0;
        $totalLeaves = 0;
        $totalAbsent = 0;
        $totalExtraDuty = 0;
        $previousExtraDutyCount = 0;
        $previousAbsentDeductedCount = 0;

        // salary setting
        $leaveDeductionOnGrossPaySetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_leave_deduction_on_gross_pay');
        $isLeaveDeductionOnGrossPay = $leaveDeductionOnGrossPaySetting?->value == 'Yes' ? true : false;

        // staffs
        $staffs = $this->getStaffData();

        // payment modes
        $paymentModes = $this->getPaymentModes();

        // banks
        $banks = $this->getBankData();

        // day types
        $dayTypes = buildEnumOptionsArray(DayType::cases());

        // bank accounts
        $bankAccounts = $this->bankAccountRepository->getActiveAll()->map(function ($bankAccount) {
            $bankAccount['id'] = $bankAccount['id'];
            $bankAccount['title'] = $bankAccount['account_name'];

            return $bankAccount;
        });

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;
            $paymentMonthId = $request->payment_month_id ?? null;

            $employeeId = $request->employee_id ?? null;

            if (!empty($employeeId)) {
                // selected staff
                $staff = $staffs?->filter(function ($staff) use ($employeeId) {
                    return $staff?->employee_id == $employeeId;
                })?->first();

                $staffId = $staff?->id;
            }

            if (!empty($staffId)) {
                if ($staff == null) {
                    // selected staff
                    $staff = $staffs?->filter(function ($staff) use ($staffId) {
                        return $staff->id == $staffId;
                    })?->first();
                }

                // payment months
                $paymentMonths = $this->getPaymentMonthsData($staffId);

                if (!empty($paymentMonthId)) {
                    // selected payment month
                    $paymentMonth = $paymentMonths?->filter(function ($paymentMonth) use ($paymentMonthId) {
                        return $paymentMonth->id == $paymentMonthId;
                    })?->first();

                    if ($paymentMonth != null) {
                        $startDate = $paymentMonth->start_date;
                        $endDate = $paymentMonth->end_date;

                        // staff salary increment
                        $staffSalaryIncrement = $this->getStaffSalaryIncrementData($staffId, $startDate, $endDate);

                        // staff earning
                        $staffEarning = $this->getStaffEarningData($staffId);

                        // staff attendances
                        $staffAttendances = $this->staffAttendanceRepository->getStaffAttendancesByStaffId($staffId);

                        // staff extra duties
                        $staffExtraDutiesData = $this->staffSalaryPaymentRepository->getActiveStaffExtraDutiesByStaffId($staffId);

                        // staff absent deductions
                        $staffAbsentDeductions = $this->staffSalaryPaymentRepository->getActiveStaffAbsentDeductionsByStaffId($staffId);

                        foreach ($paymentMonths as $paymentMonth) {
                            if (!isset($staffAttendanceSummary[$paymentMonth->id])) {
                                $staffAttendanceSummary[$paymentMonth->id] = [
                                    'payment_month_id' => $paymentMonth->id,
                                    'payment_month_title' => $paymentMonth->title,
                                    'attendances' => [],
                                    'is_selected' => true,
                                    'is_disabled' => $paymentMonthId != $paymentMonth->id
                                ];
                            }

                            $start_date = $paymentMonth->start_date;
                            $end_date = $paymentMonth->end_date;
                            $period = CarbonPeriod::create($start_date, $end_date);

                            foreach ($period as $date) {
                                $attendanceType = '';
                                $dayType = DayType::FULL_DAY->value;
                                $dateTimestamp = $date->timestamp;

                                if (count($staffAttendances) > 0) {
                                    $attendance = $staffAttendances?->filter(function ($attendance) use ($dateTimestamp) {
                                        $attendanceTimestamp = !empty($attendance->attendance_date_at) ? Carbon::parse($attendance->attendance_date_at)->timestamp : 0;

                                        return $attendanceTimestamp == $dateTimestamp;
                                    })?->first();

                                    if ($attendance != null && !empty($attendance->staffs)) {
                                        $attendanceData = collect(json_decode($attendance->staffs))->filter(function ($staffData) use ($staffId) {
                                            return $staffData->staff_id == $staffId;
                                        })->first();

                                        $attendanceType = $attendanceData->attendance_status ?? '';

                                        if ($attendanceData?->is_halfday == true) {
                                            $dayType =  DayType::HALF_DAY->value;
                                        }

                                        if ($attendanceData?->is_absent == true) {
                                            $totalAbsent += 1;
                                        }

                                        if (($attendanceData?->is_extra_duty ?? false) == true) {
                                            if (!isset($staffExtraDuties[$paymentMonth->id])) {
                                                $staffExtraDuties[$paymentMonth->id] = [
                                                    'payment_month_id' => $paymentMonth->id,
                                                    'payment_month_title' => $paymentMonth->title,
                                                    'attendances' => [],
                                                ];
                                            }

                                            // check if extra duty is already paid
                                            $staffExtraDuty = $staffExtraDutiesData?->filter(function ($staffExtraDuty) use ($dateTimestamp) {
                                                $attendanceTimestamp =  !empty($staffExtraDuty->attendance_date) ? Carbon::parse($staffExtraDuty->attendance_date)->timestamp : 0;

                                                return $attendanceTimestamp == $dateTimestamp;
                                            })->first();

                                            $isSelected = false;
                                            $isDisabled = false;

                                            if ($staffExtraDuty != null) {
                                                $isSelected = true;
                                                $isDisabled = true;

                                                $previousExtraDutyCount += $staffExtraDuty?->is_halfday ? 0.5 : 1;
                                            }

                                            $staffExtraDuties[$paymentMonth->id]['attendances'][] = [
                                                // 'date_timestamp' => $dateTimestamp,
                                                'attendance_date' => $date,
                                                'attendance_formatted_date' => $date->format('d-M-Y'),
                                                'attendance_day' => $date->format('l'),
                                                'day_type' => $dayType,
                                                'is_halfday' => $attendanceData?->is_halfday,
                                                'is_selected' => $isSelected,
                                                'is_disabled' => $isDisabled
                                            ];

                                            $totalExtraDuty += $attendanceData?->is_halfday ? 0.5 : 1;
                                        }
                                    }
                                }

                                // check if absent already deducted
                                $staffAbsentDeduction = $staffAbsentDeductions?->filter(function ($staffAbsentDeduction) use ($dateTimestamp) {
                                    $attendanceTimestamp = !empty($staffAbsentDeduction->attendance_date) ? Carbon::parse($staffAbsentDeduction->attendance_date)->timestamp : 0;

                                    return $attendanceTimestamp == $dateTimestamp;
                                })?->first();

                                if ($staffAbsentDeduction == null) {
                                    $staffAttendanceSummary[$paymentMonth->id]['is_selected'] = false;
                                    $staffAttendanceSummary[$paymentMonth->id]['is_disabled'] = $paymentMonthId != $paymentMonth->id;
                                } else {
                                    $previousAbsentDeductedCount += $staffAbsentDeduction?->day_type == DayType::HALF_DAY->value ? 0.5 : 1;
                                    $dayType = $staffAbsentDeduction?->day_type;
                                }

                                $staffAttendanceSummary[$paymentMonth->id]['attendances'][] = [
                                    // 'date_timestamp' => $dateTimestamp,
                                    'attendance_date' => $date,
                                    'attendance_formatted_date' => $date->format('d-M-Y'),
                                    'attendance_day' => $date->format('l'),
                                    'school_holiday' => '',
                                    'attendance_type' => $attendanceType,
                                    'day_type' => $dayType,
                                    'is_selected' => $staffAbsentDeduction != null,
                                    'is_disabled' => $paymentMonthId != $paymentMonth->id || $staffAbsentDeduction != null
                                ];
                            }
                        }

                        $staffExtraDuties = !empty($staffExtraDuties) ? array_values($staffExtraDuties) : [];
                        $staffAttendanceSummary = !empty($staffAttendanceSummary) ? array_values($staffAttendanceSummary) : [];

                        // staff leaves
                        $staffLeaves = $this->getStaffLeaveData($staffId, $totalLeaves);

                        //staff advance payments
                        $staffAdvancePayments = $this->staffAdvancePaymentRepository->getActiveStaffAdvancePaymentsByStaffId($staffId);

                        if (count($staffAdvancePayments) > 0) {
                            $totalAdvanceAmount = $staffAdvancePayments->sum('paid_amount') ?? 0;
                            $totalAdvanceDeductedAmount = $staffAdvancePayments->sum('deducted_amount') ?? 0;
                        }
                    }
                }

                // staff salary payments
                $staffSalaryPayments = $this->getStaffSalaryPaymentData($staffId);

                if (count($staffSalaryPayments) > 0) {
                    $totalPaidDueAmount = $staffSalaryPayments->sum('paid_due_amount') ?? 0;
                    $totalDueAmount = $staffSalaryPayments->sum('due_amount') ?? 0;
                }
            }
        }

        return Inertia::render('Salary/ProcessSalary', [
            'staffs' => $staffs,
            'paymentMonths' => $paymentMonths,
            'staff' => $staff,
            'staffEarning' => $staffEarning,
            'staffSalaryIncrement' => $staffSalaryIncrement,
            'staffSalaryPayments' => $staffSalaryPayments,
            'totalAdvanceAmount' => $totalAdvanceAmount,
            'totalAdvanceDeductedAmount' => $totalAdvanceDeductedAmount,
            'totalPaidDueAmount' => $totalPaidDueAmount,
            'totalDueAmount' => $totalDueAmount,
            'paymentModes' => $paymentModes,
            'banks' => $banks,
            'bankAccounts' => $bankAccounts,
            'totalLeaves' => $totalLeaves,
            'staffLeaves' => $staffLeaves,
            'dayTypes' => $dayTypes,
            'staffAttendanceSummary' => $staffAttendanceSummary,
            'totalAbsent' => $totalAbsent,
            'isLeaveDeductionOnGrossPay' => $isLeaveDeductionOnGrossPay,
            'staffExtraDuties' => $staffExtraDuties,
            'totalExtraDuty' => $totalExtraDuty,
            'previousExtraDutyCount' => $previousExtraDutyCount,
            'previousAbsentDeductedCount' => $previousAbsentDeductedCount,
        ]);
    }

    /*
    * helper method to get payment months data
    */
    public function getPaymentMonthsData(int $staffId)
    {
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        if (count($paymentMonths) > 0) {
            $paymentMonths->loadCount(['staffSalaryPayments' => function ($query) use ($staffId) {
                $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId())
                    ->where('staff_id', $staffId)
                    ->where('is_canceled', false);
            }]);

            $paymentMonths = $paymentMonths->map(function ($paymentMonth) {
                $paymentMonth['disabled'] = $paymentMonth?->staff_salary_payments_count > 0;

                return $paymentMonth;
            });
        }

        return $paymentMonths;
    }

    /*
    * helper method to get staff salary increment data
    */
    public function getStaffSalaryIncrementData(int $staffId, string $startDate, string $endDate)
    {
        $staffSalaryIncrement = $this->staffSalaryIncrementRepository->getStaffSalaryIncrementByStaffIdAndIncrementDate($staffId, $startDate, $endDate);

        if ($staffSalaryIncrement != null) {
            $staffSalaryIncrement['earnings'] = !empty($staffSalaryIncrement->earnings) ? json_decode($staffSalaryIncrement->earnings) : [];
        }

        return $staffSalaryIncrement;
    }

    /*
    * helper method to get staff earning data
    */
    public function getStaffEarningData(int $staffId)
    {
        $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($staffId);

        if ($staffEarning != null) {
            $earnings = !empty($staffEarning->earnings) ? json_decode($staffEarning->earnings) : [];
            $deductions = !empty($staffEarning->deductions) ? json_decode($staffEarning->deductions) : [];

            // earnings
            if (!empty($earnings)) {
                $earningTypeIds = array_column($earnings, 'earning_type_id');

                $earningTypes = $this->earningTypeRepository->getEarningTypesByIds($earningTypeIds)
                    ->keyBy('id')
                    ->toArray();

                $earnings = collect($earnings)->map(function ($earning) use ($earningTypes, &$prevBasicAmount, &$incrementAmount, &$currBasicAmount) {
                    $prevBasicAmount += $earning->amount ?? 0;
                    $incrementAmount += $earning->increment_amount ?? 0;
                    $currBasicAmount += $earning->total_amount ?? 0;

                    $earning->earning_type_title = $earningTypes[$earning?->earning_type_id]['title'] ?? '';

                    return $earning;
                })->toArray();
            }

            // dedcutions
            if (!empty($deductions)) {
                $deductionTypeIds = array_column($deductions, 'deduction_type_id');

                $deductionTypes = $this->deductionTypeRepository->getDeductionTypesByIds($deductionTypeIds)
                    ->keyBy('id')
                    ->toArray();

                $deductions = collect($deductions)->map(function ($deduction) use ($deductionTypes, &$prevBasicAmount, &$incrementAmount, &$currBasicAmount) {
                    $prevBasicAmount += $deduction->amount ?? 0;
                    $incrementAmount += $deduction->increment_amount ?? 0;
                    $currBasicAmount += $deduction->total_amount ?? 0;

                    $deduction->deduction_type_title = $deductionTypes[$deduction?->deduction_type_id]['title'] ?? '';

                    return $deduction;
                })->toArray();
            }

            $staffEarning['earnings'] = $earnings;
            $staffEarning['deductions'] = $deductions;
        }

        return $staffEarning;
    }

    /*
    * helper method to get staff salary payment data
    */
    private function getStaffSalaryPaymentData(int $staffId)
    {
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getActiveStaffSalaryPaymentsByStaffId($staffId);

        if (count($staffSalaryPayments) > 0) {
            $staffSalaryPayments?->transform(function ($staffSalaryPayment) {
                $staffSalaryPayment['payment_date'] = !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '';

                return $staffSalaryPayment;
            });
        }

        return $staffSalaryPayments;
    }

    /*
    * helper method to get staff leave data
    */
    private function getStaffLeaveData(int $staffId, int &$totalLeaves)
    {
        $staffLeaves = [];

        // staff leave allocations
        $staffLeaveAllocations = $this->leaveRepository->getStaffLeaveAllocationsByStaffId($staffId);

        if (count($staffLeaveAllocations) > 0) {
            $totalLeaves = $staffLeaveAllocations->sum('days');

            // staff leaves
            $leaveTypeIds = $staffLeaveAllocations->pluck('leave_type_id')->toArray();

            $leaves = $this->leaveRepository->getApprovedLeavesByStaffIdAndLeaveTypeIds($staffId, $leaveTypeIds);

            foreach ($staffLeaveAllocations as $staffLeaveAllocation) {
                $leaveTypeId = $staffLeaveAllocation->leave_type_id;

                if (!isset($staffLeaves[$leaveTypeId])) {
                    $staffLeaves[$leaveTypeId] = [
                        'leave_type_id' => $leaveTypeId,
                        'leave_type_title' => $staffLeaveAllocation?->leaveType?->title,
                        'available_days' => $staffLeaveAllocation->days ?? 0,
                        'consumed_days' => $staffLeaveAllocation->consumed_days ?? 0,
                        'leaves' => [],
                    ];
                }

                if (count($leaves) > 0) {
                    $leaves = $leaves->filter(function ($leave) use ($leaveTypeId) {
                        return $leave->leave_type_id == $leaveTypeId;
                    });

                    foreach ($leaves as $leave) {
                        $staffLeaves[$leaveTypeId]['leaves'][] = [
                            'acronym' => $staffLeaveAllocation?->leaveType?->acronym,
                            'no_of_days' => $leave->no_of_days ?? 0,
                            'start_date' => !empty($leave->start_date_at) ? Carbon::parse($leave->start_date_at)->format('d-M-Y') : '',
                            'end_date' => !empty($leave->end_date_at) ? Carbon::parse($leave->end_date_at)->format('d-M-Y') : '',
                        ];
                    }
                }
            }
        }

        return $staffLeaves = !empty($staffLeaves) ? array_values($staffLeaves) : [];
    }

    /*
    * Save Process Salary
    */
    public function saveProcessSalary(StaffSalaryPaymentRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($input['payment_mode']);
            $paymentDate = !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

            // next receipt no
            $nextReceiptNo = $this->staffSalaryPaymentRepository->getNextReceiptNo();

            // staff salary payment
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'staff_id' => $input['staff_id'] ?? null,
                'payment_month_id' => $input['payment_month_id'] ?? null,
                'ledger_id' => $ledger?->id,
                'payment_date' => $paymentDate,
                'payment_note' => $input['payment_note'] ?? null,
                'total_earning_amount' => $input['total_earning_amount'] ?? 0,
                'total_deduction_amount' => $input['total_deduction_amount'] ?? 0,
                'advance_deducted_amount' => $input['advance_deducted_amount'] ?? 0,
                'paid_due_amount' => $input['paid_due_amount'] ?? 0,
                'bonus_amount' => $input['bonus_amount'] ?? 0,
                'advance_amount' => $input['advance_amount'] ?? 0,
                'payable_amount' => $input['payable_amount'] ?? 0,
                'paid_amount' => $input['paid_amount'] ?? 0,
                'due_amount' => $input['due_amount'] ?? 0,
                'extra_duty_amount' => $input['extra_duty_amount'] ?? null,
                'absent_deduction_amount' => $input['absent_deduction_amount'] ?? null,
                'total_leave' => $input['total_leave'] ?? 0,
                'leave_balance' => $input['leave_balance'] ?? 0,
                'total_absent' => $input['total_absent'] ?? 0,
                'total_extra_duty' => $input['total_extra_duty'] ?? 0,
                'total_paid_extra_duty' => $input['total_paid_extra_duty'] ?? 0,
                'total_previous_extra_duty' => $input['total_previous_extra_duty'] ?? 0,
                'total_deducted_absent' => $input['total_deducted_absent'] ?? 0,
                'total_previous_absent_deduction' => $input['total_previous_absent_deduction'] ?? 0,
                'cheque_no' => $input['cheque_no'] ?? null,
                'cheque_date' => $input['cheque_date'] ?? null,
                'bank_id' => $input['bank_id'] ?? null,
                'branch' => $input['branch'] ?? null,
                'bank_account_id' => $input['bank_account_id'] ?? null,
                'status' => Status::ACTIVE,
                'receipt_no' => $nextReceiptNo,
                'basic_pay' => $input['basic_pay'] ?? 0,
                'grade_pay' => $input['grade_pay'] ?? 0
            ];

            $staffSalaryPayment = $this->staffSalaryPaymentRepository->create($dataArray);

            $earningsDataArray = [];
            $deductionsDataArray = [];

            // staff salary payment earnings
            if (!empty($input['earnings'])) {
                $staffEarningsData = [];
                $basicPay = 0;

                foreach ($input['earnings'] as $earning) {
                    $amount = $earning['amount'] ?? 0;

                    $earningsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'earning_type_id' => $earning['earning_type_id'] ?? null,
                        'amount' => $amount,
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];

                    $staffEarningsData[] = [
                        'amount' => $amount,
                        'expression' => $earning['is_editable'] == true ? $amount : $earning['expression'],
                        'description' => $earning['description'],
                        'earning_type_id' => $earning['earning_type_id']
                    ];

                    if ($earning['earning_type_title'] == 'Basic') {
                        $basicPay = $amount;
                    }
                }

                // staff earning
                $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($input['staff_id']);

                $staffEarningDataArray = [
                    'basic_pay' => $basicPay - ($staffEarning->grade_pay ?? 0),
                    'earnings' => !empty($staffEarningsData) ? json_encode($staffEarningsData) : null,
                ];

                $this->staffEarningRepository->update($staffEarning->id, $staffEarningDataArray);
            }

            // staff salary payment deductions
            if (!empty($input['deductions'])) {
                foreach ($input['deductions'] as $deduction) {
                    $deductionsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'deduction_type_id' => $deduction['deduction_type_id'] ?? null,
                        'amount' => $deduction['amount'] ?? 0,
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }
            }

            // staff bonus earning
            if ($input['bonus_amount'] > 0) {
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Bonus');

                if ($earningType != null) {
                    $earningsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'earning_type_id' => $earningType->id,
                        'amount' => $input['bonus_amount'],
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }
            }

            // staff previous due earning
            if ($input['paid_due_amount'] > 0) {
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Previous Due');

                if ($earningType != null) {
                    $earningsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'earning_type_id' => $earningType->id,
                        'amount' => $input['paid_due_amount'],
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }
            }

            // staff advance payment
            if ($input['advance_amount'] > 0 || $input['advance_deducted_amount']) {
                // next receipt no
                $nextAdvanceReceiptNo = $this->staffAdvancePaymentRepository->getNextReceiptNo();

                $advancePaymentDataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'staff_id' => $input['staff_id'] ?? null,
                    'staff_salary_payment_id' => $staffSalaryPayment->id,
                    'payment_month_id' => $input['payment_month_id'] ?? null,
                    'ledger_id' => $ledger?->id,
                    'payment_date' => $paymentDate,
                    'payment_note' => $input['payment_note'] ?? null,
                    'paid_amount' => $input['advance_amount'] ?? null,
                    'deducted_amount' => $input['advance_deducted_amount'] ?? null,
                    'cheque_no' => $input['cheque_no'] ?? null,
                    'cheque_date' => $input['cheque_date'] ?? null,
                    'bank_id' => $input['bank_id'] ?? null,
                    'branch' => $input['branch'] ?? null,
                    'by_salary' => true,
                    'status' => Status::ACTIVE,
                    'receipt_no' => $nextAdvanceReceiptNo
                ];

                $this->staffAdvancePaymentRepository->create($advancePaymentDataArray);

                // staff advance earning
                if ($input['advance_amount'] > 0) {
                    $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                    if ($earningType != null) {
                        $earningsDataArray[] = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'staff_salary_payment_id' => $staffSalaryPayment->id,
                            'earning_type_id' => $earningType->id,
                            'amount' => $input['advance_amount'],
                            'status' => Status::ACTIVE,
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                    }
                }

                // staff advance payment deduction
                if ($input['advance_deducted_amount'] > 0) {
                    $deductionType = $this->deductionTypeRepository->getDeductionTypeByTitle('Advance Payment Deduction');

                    if ($deductionType != null) {
                        $deductionsDataArray[] = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'staff_salary_payment_id' => $staffSalaryPayment->id,
                            'earning_type_id' => $deductionType->id,
                            'amount' => $input['advance_deducted_amount'],
                            'status' => Status::ACTIVE,
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                    }
                }
            }

            // staff extra duty
            if (!empty($input['extra_duties'])) {
                $extraDutyDataArray = [];

                foreach ($input['extra_duties'] as $extraDuty) {
                    $extraDutyDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_id' => $input['staff_id'] ?? null,
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'attendance_date' => !empty($extraDuty['attendance_date']) ? Carbon::parse($extraDuty['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                        'is_halfday' => $extraDuty['is_halfday'] ?? false,
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }

                $this->staffSalaryPaymentRepository->insertStaffExtraDuty($extraDutyDataArray);
            }

            // staff absent deduction
            if (!empty($input['absent_deductions'])) {
                $absentDeductionDataArray = [];

                foreach ($input['absent_deductions'] as $absentDeduction) {
                    $absentDeductionDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_id' => $input['staff_id'] ?? null,
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'payment_month_id' => $absentDeduction['payment_month_id'] ?? null,
                        'attendance_date' => !empty($absentDeduction['attendance_date']) ? Carbon::parse($absentDeduction['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                        'deduction_message' => $absentDeduction['deduction_message'] ?? null,
                        'day_type' => $absentDeduction['day_type'] ?? DayType::FULL_DAY->value,
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }

                $this->staffSalaryPaymentRepository->insertStaffAbsentDeduction($absentDeductionDataArray);
            }

            // staff extra duty earning
            if ($input['extra_duty_amount'] > 0) {
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Extra Duty');

                if ($earningType != null) {
                    $earningsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'earning_type_id' => $earningType->id,
                        'amount' => $input['extra_duty_amount'],
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }
            }

            // staff absent deduction
            if ($input['absent_deduction_amount'] > 0) {
                $deductionType = $this->deductionTypeRepository->getDeductionTypeByTitle('Absent Deduction');

                if ($deductionType != null) {
                    $deductionsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'earning_type_id' => $deductionType->id,
                        'amount' => $input['absent_deduction_amount'],
                        'status' => Status::ACTIVE,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }
            }

            // staff salary payment earnings
            if (!empty($earningsDataArray)) {
                $this->staffSalaryPaymentEarningRepository->insert($earningsDataArray);
            }

            // staff salary payment deductions
            if (!empty($deductionsDataArray)) {
                $this->staffSalaryPaymentDeductionRepository->insert($deductionsDataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Payment taken successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    public function saveProcessSalary_old(StaffSalaryPaymentRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($input['payment_mode']);
            $paymentDate = !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

            // staff salary payment
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'staff_id' => $input['staff_id'] ?? null,
                'payment_month_id' => $input['payment_month_id'] ?? null,
                'ledger_id' => $ledger?->id,
                'payment_date' => $paymentDate,
                'payment_note' => $input['payment_note'] ?? null,
                'total_earning_amount' => $input['total_earning_amount'] ?? 0,
                'total_deduction_amount' => $input['total_deduction_amount'] ?? 0,
                'advance_deducted_amount' => $input['advance_deducted_amount'] ?? 0,
                'paid_due_amount' => $input['paid_due_amount'] ?? 0,
                'bonus_amount' => $input['bonus_amount'] ?? 0,
                'advance_amount' => $input['advance_amount'] ?? 0,
                'payable_amount' => $input['payable_amount'] ?? 0,
                'paid_amount' => $input['paid_amount'] ?? 0,
                'due_amount' => $input['due_amount'] ?? 0,
                'extra_duty_amount' => $input['extra_duty_amount'] ?? null,
                'absent_deduction_amount' => $input['absent_deduction_amount'] ?? null,
                'total_leave' => $input['total_leave'] ?? 0,
                'leave_balance' => $input['leave_balance'] ?? 0,
                'total_absent' => $input['total_absent'] ?? 0,
                'total_extra_duty' => $input['total_extra_duty'] ?? 0,
                'total_paid_extra_duty' => $input['total_paid_extra_duty'] ?? 0,
                'total_previous_extra_duty' => $input['total_previous_extra_duty'] ?? 0,
                'total_deducted_absent' => $input['total_deducted_absent'] ?? 0,
                'total_previous_absent_deduction' => $input['total_previous_absent_deduction'] ?? 0,
                'cheque_no' => $input['cheque_no'] ?? null,
                'cheque_date' => $input['cheque_date'] ?? null,
                'bank_id' => $input['bank_id'] ?? null,
                'branch' => $input['branch'] ?? null,
                'bank_account_id' => $input['bank_account_id'] ?? null,
                'status' => Status::ACTIVE
            ];

            $staffSalaryPayment = $this->staffSalaryPaymentRepository->create($dataArray);

            // staff salary payment earnings
            if (!empty($input['earnings'])) {
                $earningsDataArray = [];
                $staffEarningsData = [];
                $basicPay = 0;

                foreach ($input['earnings'] as $earning) {
                    $amount = $earning['amount'] ?? 0;

                    $earningsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'earning_type_id' => $earning['earning_type_id'] ?? null,
                        'amount' => $amount,
                        'status' => Status::ACTIVE
                    ];

                    $staffEarningsData[] = [
                        'amount' => $amount,
                        'expression' => $earning['is_editable'] == true ? $amount : $earning['expression'],
                        'description' => $earning['description'],
                        'earning_type_id' => $earning['earning_type_id']
                    ];

                    if ($earning['earning_type_title'] == 'Basic') {
                        $basicPay = $amount;
                    }
                }

                $this->staffSalaryPaymentEarningRepository->insert($earningsDataArray);

                // staff earning
                $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($input['staff_id']);

                $staffEarningDataArray = [
                    'basic_pay' => $basicPay - ($staffEarning->grade_pay ?? 0),
                    'earnings' => !empty($staffEarningsData) ? json_encode($staffEarningsData) : null,
                ];

                $this->staffEarningRepository->update($staffEarning->id, $staffEarningDataArray);
            }

            // staff salary payment deductions
            if (!empty($input['deductions'])) {
                $deductionsDataArray = [];

                foreach ($input['deductions'] as $deduction) {
                    $deductionsDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'deduction_type_id' => $deduction['deduction_type_id'] ?? null,
                        'amount' => $deduction['amount'] ?? 0,
                        'status' => Status::ACTIVE
                    ];
                }

                $this->staffSalaryPaymentDeductionRepository->insert($deductionsDataArray);
            }

            // staff advance payment
            if ($input['advance_amount'] > 0 || $input['advance_deducted_amount']) {
                $advancePaymentDataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'staff_id' => $input['staff_id'] ?? null,
                    'staff_salary_payment_id' => $staffSalaryPayment->id,
                    'payment_month_id' => $input['payment_month_id'] ?? null,
                    'ledger_id' => $ledger?->id,
                    'payment_date' => $paymentDate,
                    'payment_note' => $input['payment_note'] ?? null,
                    'paid_amount' => $input['advance_amount'] ?? null,
                    'deducted_amount' => $input['advance_deducted_amount'] ?? null,
                    'cheque_no' => $input['cheque_no'] ?? null,
                    'cheque_date' => $input['cheque_date'] ?? null,
                    'bank_id' => $input['bank_id'] ?? null,
                    'branch' => $input['branch'] ?? null,
                    'by_salary' => true,
                    'status' => Status::ACTIVE
                ];

                $this->staffAdvancePaymentRepository->create($advancePaymentDataArray);
            }

            // staff extra duty
            if (!empty($input['extra_duties'])) {
                $extraDutyDataArray = [];

                foreach ($input['extra_duties'] as $extraDuty) {
                    $extraDutyDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_id' => $input['staff_id'] ?? null,
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'attendance_date' => !empty($extraDuty['attendance_date']) ? Carbon::parse($extraDuty['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                        'is_halfday' => $extraDuty['is_halfday'] ?? false,
                        'status' => Status::ACTIVE
                    ];
                }

                $this->staffSalaryPaymentRepository->insertStaffExtraDuty($extraDutyDataArray);
            }

            // staff absent deduction
            if (!empty($input['absent_deductions'])) {
                $absentDeductionDataArray = [];

                foreach ($input['absent_deductions'] as $absentDeduction) {
                    $absentDeductionDataArray[] = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_id' => $input['staff_id'] ?? null,
                        'staff_salary_payment_id' => $staffSalaryPayment->id,
                        'payment_month_id' => $absentDeduction['payment_month_id'] ?? null,
                        'attendance_date' => !empty($absentDeduction['attendance_date']) ? Carbon::parse($absentDeduction['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                        'deduction_message' => $absentDeduction['deduction_message'] ?? null,
                        'day_type' => $absentDeduction['day_type'] ?? DayType::FULL_DAY->value,
                        'status' => Status::ACTIVE
                    ];
                }

                $this->staffSalaryPaymentRepository->insertStaffAbsentDeduction($absentDeductionDataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Payment taken successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /*
    * cancel salary payment
    */
    public function cancelSalaryPayment(int $id, CancelStaffSalaryPaymentRequest $request)
    {
        $staffSalaryPayment = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentById($id);

        abort_if($staffSalaryPayment == null, 404);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = [
                'is_canceled' => true,
                'cancel_reason' => $input['cancel_reason'] ?? null
            ];

            $this->staffSalaryPaymentRepository->update($id, $dataArray);

            $staffSalaryPayment->staffAdvancePayment()->update(['is_canceled' => true]);

            DB::commit();

            return redirect()->back()->with('message', 'Payment canceled successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Bulk Process Salary
     */
    public function bulkProcessSalary(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        // payment modes
        $paymentModes = $this->getPaymentModes();

        // banks
        $banks = $this->getBankData();

        // bank accounts
        $bankAccounts = $this->bankAccountRepository->getActiveAll()->map(function ($bankAccount) {
            $bankAccount['id'] = $bankAccount['id'];
            $bankAccount['title'] = $bankAccount['account_name'];

            return $bankAccount;
        });

        // staff categories
        $staffCategories = $this->categoryRepository->getStaffParentCategories();

        $staffEarnings = [];

        if ($request->isMethod('POST')) {
            $paymentMonthId = $request->payment_month_id ?? null;
            $staffCategoryId = $request->staff_category_id ?? null;
            $staffSubCategoryId = $request->staff_sub_category_id ?? null;

            if (!empty($paymentMonthId)) {
                // staff earnings
                $staffEarnings = $this->staffEarningRepository->getStaffEarningsForBulkProcess($paymentMonthId, $staffCategoryId, $staffSubCategoryId);

                if (count($staffEarnings) > 0) {
                    $staffEarnings = $staffEarnings->map(function ($staffEarning) use ($paymentMonths) {
                        $staffId = $staffEarning?->staff_id;
                        $earningAmount = 0;
                        $deductionAmount = 0;
                        $staffExtraDuties = [];
                        $totalAbsent = 0;
                        $totalExtraDuty = 0;
                        $previousExtraDutyCount = 0;
                        $previousAbsentDeductedCount = 0;

                        // earnings
                        $earnings = [];

                        if (!empty($staffEarning->earnings)) {
                            $earningTypeIds = array_column(json_decode($staffEarning->earnings), 'earning_type_id');

                            $earningTypes = $this->earningTypeRepository->getEarningTypesByIds($earningTypeIds)
                                ->keyBy('id')
                                ->toArray();

                            foreach (json_decode($staffEarning->earnings, true) as $earning) {
                                $amount = $earning['amount'] ?? 0;
                                $earningTypeId = $earning['earning_type_id'] ?? null;

                                $earnings[] = [
                                    'earning_type_id' => $earningTypeId,
                                    'earning_type_title' => $earningTypes[$earningTypeId]['title'] ?? '',
                                    'amount' => $amount,
                                    'expression' => $earning['expression'] ?? null,
                                    'description' => $earning['description'] ?? null
                                ];

                                $earningAmount += $amount;
                            }
                        }

                        // deductions
                        $deductions = [];

                        if (!empty($staffEarning->deductions)) {
                            $deductionTypeIds = array_column(json_decode($staffEarning->deductions), 'deduction_type_id');

                            $deductionTypes = $this->deductionTypeRepository->getDeductionTypesByIds($deductionTypeIds)
                                ->keyBy('id')
                                ->toArray();

                            foreach (json_decode($staffEarning->deductions, true) as $deduction) {
                                $amount = $deduction['amount'] ?? 0;
                                $deductionTypeId = $deduction['deduction_type_id'] ?? null;

                                $deductions[] = [
                                    'deduction_type_id' => $deductionTypeId,
                                    'deduction_type_title' => $deductionTypes[$deductionTypeId]['title'] ?? '',
                                    'amount' => $amount,
                                    'expression' => $deduction['expression'] ?? null,
                                    'description' => $deduction['description'] ?? null
                                ];

                                $deductionAmount += $amount;
                            }
                        }

                        // staff attendances
                        $staffAttendances = $this->staffAttendanceRepository->getStaffAttendancesByStaffId($staffId);

                        // staff extra duties
                        $staffExtraDutiesData = $this->staffSalaryPaymentRepository->getActiveStaffExtraDutiesByStaffId($staffId);

                        // staff absent deductions
                        $staffAbsentDeductions = $this->staffSalaryPaymentRepository->getActiveStaffAbsentDeductionsByStaffId($staffId);

                        foreach ($paymentMonths as $paymentMonth) {
                            $start_date = $paymentMonth->start_date;
                            $end_date = $paymentMonth->end_date;
                            $period = CarbonPeriod::create($start_date, $end_date);

                            foreach ($period as $date) {
                                $dayType = DayType::FULL_DAY->value;
                                $dateTimestamp = $date->timestamp;

                                if (count($staffAttendances) > 0) {
                                    $attendance = $staffAttendances?->filter(function ($attendance) use ($dateTimestamp) {
                                        $attendanceTimestamp = !empty($attendance->attendance_date_at) ? Carbon::parse($attendance->attendance_date_at)->timestamp : 0;

                                        return $attendanceTimestamp == $dateTimestamp;
                                    })?->first();

                                    if ($attendance != null && !empty($attendance->staffs)) {
                                        $attendanceData = collect(json_decode($attendance->staffs))->filter(function ($staffData) use ($staffId) {
                                            return $staffData->staff_id == $staffId;
                                        })->first();

                                        if ($attendanceData?->is_halfday == true) {
                                            $dayType =  DayType::HALF_DAY->value;
                                        }

                                        if ($attendanceData?->is_absent == true) {
                                            $totalAbsent += 1;
                                        }

                                        if (($attendanceData?->is_extra_duty ?? false) == true) {
                                            if (!isset($staffExtraDuties[$paymentMonth->id])) {
                                                $staffExtraDuties[$paymentMonth->id] = [
                                                    'payment_month_id' => $paymentMonth->id,
                                                    'payment_month_title' => $paymentMonth->title,
                                                    'attendances' => [],
                                                ];
                                            }

                                            // check if extra duty is already paid
                                            $staffExtraDuty = $staffExtraDutiesData?->filter(function ($staffExtraDuty) use ($dateTimestamp) {
                                                $attendanceTimestamp =  !empty($staffExtraDuty->attendance_date) ? Carbon::parse($staffExtraDuty->attendance_date)->timestamp : 0;

                                                return $attendanceTimestamp == $dateTimestamp;
                                            })->first();

                                            $isSelected = false;
                                            $isDisabled = false;

                                            if ($staffExtraDuty != null) {
                                                $isSelected = true;
                                                $isDisabled = true;

                                                $previousExtraDutyCount += $staffExtraDuty?->is_halfday ? 0.5 : 1;
                                            }

                                            $staffExtraDuties[$paymentMonth->id]['attendances'][] = [
                                                // 'date_timestamp' => $dateTimestamp,
                                                'attendance_date' => $date,
                                                'attendance_formatted_date' => $date->format('d-M-Y'),
                                                'attendance_day' => $date->format('l'),
                                                'day_type' => $dayType,
                                                'is_halfday' => $attendanceData?->is_halfday,
                                                'is_selected' => $isSelected,
                                                'is_disabled' => $isDisabled
                                            ];

                                            $totalExtraDuty += $attendanceData?->is_halfday ? 0.5 : 1;
                                        }
                                    }
                                }

                                // check if absent already deducted
                                $staffAbsentDeduction = $staffAbsentDeductions?->filter(function ($staffAbsentDeduction) use ($dateTimestamp) {
                                    $attendanceTimestamp = !empty($staffAbsentDeduction->attendance_date) ? Carbon::parse($staffAbsentDeduction->attendance_date)->timestamp : 0;

                                    return $attendanceTimestamp == $dateTimestamp;
                                })?->first();

                                if ($staffAbsentDeduction != null) {
                                    $previousAbsentDeductedCount += $staffAbsentDeduction?->day_type == DayType::HALF_DAY->value ? 0.5 : 1;
                                }
                            }
                        }

                        $staffExtraDuties = !empty($staffExtraDuties) ? array_values($staffExtraDuties) : [];

                        // staff leave allocations
                        $staffLeaveAllocations = $this->leaveRepository->getStaffLeaveAllocationsByStaffId($staffId);
                        $totalLeave = $staffLeaveAllocations?->sum('days');

                        $staffEarning['earnings'] = $earnings;
                        $staffEarning['deductions'] = $deductions;
                        $staffEarning['earning_amount'] = $earningAmount;
                        $staffEarning['deduction_amount'] = $deductionAmount;
                        $staffEarning['is_paid'] = $staffEarning?->staff?->staff_salary_payments_count > 0;
                        $staffEarning['extra_duties'] = $staffExtraDuties;
                        $staffEarning['total_leave'] = $totalLeave;
                        $staffEarning['total_absent'] = $totalAbsent;
                        $staffEarning['total_extra_duty'] = $totalExtraDuty;
                        $staffEarning['total_previous_extra_duty'] = $previousExtraDutyCount;
                        $staffEarning['total_previous_absent_deduction'] = $previousAbsentDeductedCount;

                        return $staffEarning;
                    });
                }
            }
        }

        return Inertia::render('Salary/BulkProcessSalary', [
            'paymentMonths' => $paymentMonths,
            'staffEarnings' => $staffEarnings,
            'paymentModes' => $paymentModes,
            'banks' => $banks,
            'bankAccounts' => $bankAccounts,
            'staffCategories' => $staffCategories
        ]);
    }


    /**
     * Save Bulk Process Salary
     *
     */
    public function saveBulkProcessSalary(BulkProcessSalaryRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($input['payment_mode']);
            $paymentDate = !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

            // next receipt no
            $nextReceiptNo = $this->staffSalaryPaymentRepository->getNextReceiptNo();

            foreach ($input['staff_earnings'] as $staffData) {
                // staff salary payment
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'staff_id' => $staffData['staff_id'] ?? null,
                    'payment_month_id' => $input['payment_month_id'] ?? null,
                    'ledger_id' =>  $ledger?->id,
                    'payment_date' => $paymentDate,
                    'payment_note' => $input['payment_note'] ?? null,
                    'cheque_no' => $input['cheque_no'] ?? null,
                    'cheque_date' => $input['cheque_date'] ?? null,
                    'bank_id' => $input['bank_id'] ?? null,
                    'branch' => $input['branch'] ?? null,
                    'bank_account_id' => $input['bank_account_id'] ?? null,
                    'total_earning_amount' => $staffData['total_earning_amount'] ?? 0,
                    'total_deduction_amount' => $staffData['total_deduction_amount'] ?? 0,
                    'advance_deducted_amount' => $staffData['advance_deducted_amount'] ?? 0,
                    'paid_due_amount' => $staffData['paid_due_amount'] ?? 0,
                    'bonus_amount' => $staffData['bonus_amount'] ?? 0,
                    'advance_amount' => $staffData['advance_amount'] ?? 0,
                    'payable_amount' => $staffData['payable_amount'] ?? 0,
                    'paid_amount' => $staffData['paid_amount'] ?? 0,
                    'due_amount' => $staffData['due_amount'] ?? 0,
                    'extra_duty_amount' => $staffData['extra_duty_amount'] ?? null,
                    'absent_deduction_amount' => $staffData['absent_deduction_amount'] ?? null,
                    'total_leave' => $staffData['total_leave'] ?? 0,
                    'leave_balance' => $staffData['leave_balance'] ?? 0,
                    'total_absent' => $staffData['total_absent'] ?? 0,
                    'total_extra_duty' => $staffData['total_extra_duty'] ?? 0,
                    'total_paid_extra_duty' => $staffData['total_paid_extra_duty'] ?? 0,
                    'total_previous_extra_duty' => $staffData['total_previous_extra_duty'] ?? 0,
                    'total_deducted_absent' => $staffData['total_deducted_absent'] ?? 0,
                    'total_previous_absent_deduction' => $staffData['total_previous_absent_deduction'] ?? 0,
                    'receipt_no' => $nextReceiptNo,
                    'status' => Status::ACTIVE,
                    'basic_pay' => $staffData['basic_pay'] ?? 0,
                    'grade_pay' => $staffData['grade_pay'] ?? 0
                ];

                $staffSalaryPayment = $this->staffSalaryPaymentRepository->create($dataArray);

                $earningsDataArray = [];
                $deductionsDataArray = [];

                // staff salary payment earnings
                if (!empty($staffData['earnings'])) {
                    $staffEarningsData = [];
                    $basicPay = 0;

                    foreach ($staffData['earnings'] as $earning) {
                        $amount = $earning['amount'] ?? 0;

                        $earningsDataArray[] = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'staff_salary_payment_id' => $staffSalaryPayment->id,
                            'earning_type_id' => $earning['earning_type_id'] ?? null,
                            'amount' => $amount,
                            'status' => Status::ACTIVE,
                            'created_at' => now(),
                            'updated_at' => now()
                        ];

                        $staffEarningsData[] = [
                            'amount' => $amount,
                            'expression' => $earning['expression'],
                            'description' => $earning['description'],
                            'earning_type_id' => $earning['earning_type_id']
                        ];

                        if ($earning['earning_type_title'] == 'Basic') {
                            $basicPay = $amount;
                        }
                    }

                    // staff earning
                    $staffEarning = $this->staffEarningRepository->getStaffEarningByStaffId($staffData['staff_id']);

                    $staffEarningDataArray = [
                        'basic_pay' => $basicPay - ($staffEarning->grade_pay ?? 0),
                        'earnings' => !empty($staffEarningsData) ? json_encode($staffEarningsData) : null,
                    ];

                    $this->staffEarningRepository->update($staffEarning->id, $staffEarningDataArray);
                }

                // staff salary payment deductions
                if (!empty($staffData['deductions'])) {
                    foreach ($staffData['deductions'] as $deduction) {
                        $deductionsDataArray[] = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'staff_salary_payment_id' => $staffSalaryPayment->id,
                            'deduction_type_id' => $deduction['deduction_type_id'] ?? null,
                            'amount' => $deduction['amount'] ?? 0,
                            'status' => Status::ACTIVE,
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                    }
                }

                // staff extra duty
                if (!empty($staffData['extra_duties'])) {
                    $extraDutyDataArray = [];

                    foreach ($staffData['extra_duties'] as $extraDuty) {
                        $extraDutyDataArray[] = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'staff_id' => $staffData['staff_id'] ?? null,
                            'staff_salary_payment_id' => $staffSalaryPayment->id,
                            'attendance_date' => !empty($extraDuty['attendance_date']) ? Carbon::parse($extraDuty['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                            'is_halfday' => $extraDuty['is_halfday'] ?? false,
                            'status' => Status::ACTIVE,
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                    }

                    $this->staffSalaryPaymentRepository->insertStaffExtraDuty($extraDutyDataArray);
                }

                // staff extra duty earning
                if ($staffData['extra_duty_amount'] > 0) {
                    $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Extra Duty');

                    if ($earningType != null) {
                        $earningsDataArray[] = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'staff_salary_payment_id' => $staffSalaryPayment->id,
                            'earning_type_id' => $earningType->id,
                            'amount' => $staffData['extra_duty_amount'],
                            'status' => Status::ACTIVE,
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                    }
                }

                // staff salary payment earnings
                if (!empty($earningsDataArray)) {
                    $this->staffSalaryPaymentEarningRepository->insert($earningsDataArray);
                }

                // staff salary payment deductions
                if (!empty($deductionsDataArray)) {
                    $this->staffSalaryPaymentDeductionRepository->insert($deductionsDataArray);
                }

                $nextReceiptNo++;
            }

            DB::commit();

            return redirect()->back()->with('message', 'Payment taken successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Display the teacher Earning.
     */
    public function publishSalary(Request $request): Response
    {
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();
        $staffSalaryPayments = [];
        $paymentMonthId = null;

        if ($request->isMethod('POST')) {
            $paymentMonthId = $request->payment_month_id ?? null;
        }

        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getUnpublishedStaffSalaryPayments($paymentMonthId);

        if (count($staffSalaryPayments) > 0) {
            $staffSalaryPayments->transform(function ($staffSalaryPayment) {
                $staffSalaryPayment['staff']['date_of_birth'] = !empty($staffSalaryPayment->staff->birth_date_at) ? Carbon::parse($staffSalaryPayment->staff->birth_date_at)->format('d-M-Y') : '';

                $staffSalaryPayment['staff']['date_of_join'] = !empty($staffSalaryPayment->staff->join_date_at) ? Carbon::parse($staffSalaryPayment->staff->join_date_at)->format('d-M-Y') : '';

                return $staffSalaryPayment;
            });
        }

        return Inertia::render('Salary/PublishSalary', [
            'paymentMonths' => $paymentMonths,
            'staffSalaryPayments' => $staffSalaryPayments
        ]);
    }

    /*
    * save publish salary
    */
    public function savePublishSalary(PublishStaffSalaryPaymentRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'is_published' => true
        ];

        $updateStaffSalaryPayments = $this->staffSalaryPaymentRepository->updateMany($input['staff_salary_payment_ids'], $dataArray);

        if ($updateStaffSalaryPayments) {
            return redirect()->back()->with('message', 'Payment published successfully');
        }

        return redirect()->back()->with('error', 'Something goes wrong!');
    }

    /**
     * Display the teacher Earning.
     */
    public function printSalarySlip(Request $request): Response
    {
        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        return Inertia::render('Salary/PrintSalarySlip', [
            'paymentMonths' => $paymentMonths
        ]);
    }

    /**
     * Display the teacher Earning.
     */
    public function advancePayment(Request $request): Response
    {
        // staffs
        $staffs = $this->getStaffData();

        // payment modes
        $paymentModes = $this->getPaymentModes();

        // banks
        $banks = $this->getBankData();

        // payment months
        $paymentMonths = $this->paymentMonthRepository->getActiveAll();

        $staffAdvancePayments = [];

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;

            if (!empty($staffId)) {
                $staffAdvancePayments = $this->staffAdvancePaymentRepository->getActiveStaffAdvancePaymentsByStaffId($staffId);

                if (count($staffAdvancePayments) > 0) {
                    $staffAdvancePayments->transform(function ($staffAdvancePayment) {
                        $staffAdvancePayment['payment_date'] = !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '';

                        return $staffAdvancePayment;
                    });
                }
            }
        }

        return Inertia::render('Salary/AdvancePayment', [
            'staffs' => $staffs,
            'paymentModes' => $paymentModes,
            'banks' => $banks,
            'paymentMonths' => $paymentMonths,
            'staffAdvancePayments' => $staffAdvancePayments,
        ]);
    }

    /*
    * save adavance payment
    */
    public function saveAdvancePayment(StaffAdvancePaymentRequest $request)
    {
        $input = $request->validated();

        $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($input['payment_mode']);

        $paymentDate = !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

        // next receipt no
        $nextAdvanceReceiptNo = $this->staffAdvancePaymentRepository->getNextReceiptNo();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'staff_id' => $input['staff_id'] ?? null,
            'payment_month_id' => $input['payment_month_id'] ?? null,
            'ledger_id' => $ledger?->id,
            'payment_date' => $paymentDate,
            'payment_note' => $input['payment_note'] ?? null,
            'paid_amount' => $input['amount'] ?? 0,
            'cheque_no' => $input['cheque_no'] ?? null,
            'cheque_date' => $input['cheque_date'] ?? null,
            'bank_id' => $input['bank_id'] ?? null,
            'branch' => $input['branch'] ?? null,
            'by_salary' => false,
            'status' => Status::ACTIVE,
            'receipt_no' => $nextAdvanceReceiptNo
        ];

        $staffAdvancePayment = $this->staffAdvancePaymentRepository->create($dataArray);

        if ($staffAdvancePayment) {
            return redirect()->back()->with('message', 'Advance payment taken successfully');
        }

        return redirect()->back()->with('error', 'Something goes wrong!');
    }

    /*
    * cancel advance payment
    */
    public function cancelAdvancePayment(int $id, CancelStaffAdvancePaymentRequest $request)
    {
        $staffAdvancePayment = $this->staffAdvancePaymentRepository->getStaffAdvancePaymentById($id);

        abort_if($staffAdvancePayment == null, 404);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = [
                'is_canceled' => true,
                'cancel_reason' => $input['cancel_reason'] ?? null
            ];

            $this->staffAdvancePaymentRepository->update($id, $dataArray);

            DB::commit();

            return redirect()->back()->with('message', 'Payment canceled successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /*
    * Helper mehtod to get payment modes
    */
    private function getPaymentModes()
    {
        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->title,
                    'title' => $ledger->title
                ];
            })->toArray();

        return $paymentModes;
    }

    /*
    * Helper mehtod to get bank data
    */
    private function getBankData()
    {
        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            $bank['id'] = $bank['id'];
            $bank['title'] = $bank['name'];

            return $bank;
        });

        return $banks;
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

    /**
     * Create default earning and deductions
     *
     */
    public function createDefaultEarningAndDeduction()
    {
        DB::beginTransaction();

        try {
            // earning types
            $earnings = [
                'Basic',
                'Transport',
                'Bonus',
                'Previous Due',
                'Advance Payment',
                'Extra Duty'
            ];

            foreach ($earnings as $earning) {
                $attributesToCheck = [
                    'school_id' => null,
                    'title' => $earning
                ];

                $valuesToUpdate = [
                    'description' => null,
                    'is_system_default' => true,
                    'status' => Status::ACTIVE
                ];

                \App\Models\EarningType::updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            // deduction types
            $deductions = [
                'Transport',
                'Leave Deduction',
                'Due',
                'Advance Payment Deduction',
                'Absent Deduction'
            ];

            foreach ($deductions as $deduction) {
                $attributesToCheck = [
                    'school_id' => null,
                    'title' => $deduction
                ];

                $valuesToUpdate = [
                    'description' => null,
                    'is_system_default' => true,
                    'status' => Status::ACTIVE
                ];

                \App\Models\DeductionType::updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Created successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }
}
