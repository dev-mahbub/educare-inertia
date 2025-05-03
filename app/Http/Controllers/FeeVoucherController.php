<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\VoucherMode;
use App\Enums\PaymentStatus;
use App\Enums\VoucherStatus;
use Illuminate\Http\Request;
use App\Models\StudentFeeVoucher;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StudentFeeVoucherRequest;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\IStudentFeeVoucherAmountRepository;

class FeeVoucherController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private IStudentFeeVoucherAmountRepository $studentFeeVoucherAmountRepository,
        private IStudentRepository $studentRepository,
        private IFeeTypeRepository $feeTypeRepository,
    ) {
        $this->middleware('permission:view fees', ['only' => ['index']]);
        $this->middleware('permission:add fees', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit fees', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete fees', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        $voucherStatusArray = [];

        foreach (VoucherStatus::cases() as $status) {
            array_push($voucherStatusArray, ['title' => $status->value, 'value' => $status->value]);
        }

        $studentFeeVouchersData = [];
        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $studentId = $request->student_id ?? null;
            $startDate = $request->start_date ?? "";
            $endDate = $request->end_date ?? "";

            $admissionNo = $request->admission_no ?? null;

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

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }

            if (!empty($admissionNo) && empty($studentId) && $student == null) {
                $studentFeeVouchersData = [];
            } else if ($request?->filter_type == "filter_student") {
                $studentFeeVouchers = $this->studentFeeVoucherRepository->getActiveAll();
                $studentFeeVouchers->load(['student' => function ($query) {
                    $query->with(['classroom', 'promotedClassroom']);
                }, 'feeTypeAmounts.feeType', 'feeTypeAmounts.payment']);

                $studentFeeVouchers = $studentFeeVouchers->map(function ($feeVoucher) {
                    if ($feeVoucher?->student?->promotedClassroom != null) {
                        if (!empty($feeVoucher['student']['classroom'])) {
                            unset($feeVoucher['student']['classroom']);
                        }

                        $feeVoucher['student']['classroom_id'] = $feeVoucher?->student?->promotedClassroom?->id;
                        $feeVoucher['student']['classroom'] = $feeVoucher?->student?->promotedClassroom;
                    }

                    return $feeVoucher;
                });

                $studentFeeVouchersData = $this->formatStudentFeeVoucherData($studentFeeVouchers);
            } else {
                $studentId = $student?->id ?? null;

                $feeVouchers = $this->studentFeeVoucherRepository->getFilteredData($classroomId, $studentId, $startDate, $endDate);

                $feeVouchers->load(['student' => function ($query) {
                    $query->with(['classroom', 'promotedClassroom']);
                }, 'feeTypeAmounts.feeType', 'feeTypeAmounts.payment']);

                $feeVouchers = $feeVouchers->map(function ($feeVoucher) {
                    if ($feeVoucher?->student?->promotedClassroom != null) {
                        if (!empty($feeVoucher['student']['classroom'])) {
                            unset($feeVoucher['student']['classroom']);
                        }

                        $feeVoucher['student']['classroom_id'] = $feeVoucher?->student?->promotedClassroom?->id;
                        $feeVoucher['student']['classroom'] = $feeVoucher?->student?->promotedClassroom;
                    }

                    return $feeVoucher;
                });

                if ($request->voucher_status && $request->voucher_status != null) {
                    $feeVouchers = $feeVouchers->filter(function ($feeVoucher) use ($request) {
                        return $feeVoucher->feeTypeAmounts->filter(function ($feeTypeAmount) use ($request) {
                            if ($feeTypeAmount->payment != null) {
                                if ($feeTypeAmount->payment->payment_status == PaymentStatus::CANCELLED->value && $request->voucher_status === 'Due') {
                                    return true;
                                }

                                return $feeTypeAmount?->payment?->payment_status === $request->voucher_status;
                            } else {
                                return $request->voucher_status === 'Due';
                            }
                        })->isNotEmpty();
                    })->values();
                }

                $studentFeeVouchersData = $this->formatStudentFeeVoucherData($feeVouchers);
            }
        } else {
            $studentFeeVouchers = $this->studentFeeVoucherRepository->getActiveAll();
            $studentFeeVouchers->load(['student' => function ($query) {
                $query->with(['classroom', 'promotedClassroom']);
            }, 'feeTypeAmounts.feeType', 'feeTypeAmounts.payment']);

            $studentFeeVouchers = $studentFeeVouchers->map(function ($feeVoucher) {
                if ($feeVoucher?->student?->promotedClassroom != null) {
                    if (!empty($feeVoucher['student']['classroom'])) {
                        unset($feeVoucher['student']['classroom']);
                    }

                    $feeVoucher['student']['classroom_id'] = $feeVoucher?->student?->promotedClassroom?->id;
                    $feeVoucher['student']['classroom'] = $feeVoucher?->student?->promotedClassroom;
                }

                return $feeVoucher;
            });

            $studentFeeVouchersData = $this->formatStudentFeeVoucherData($studentFeeVouchers);
        }

        return Inertia::render('FeeVoucher/Show', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'studentFeeVouchers' => $studentFeeVouchersData,
            'voucherStatusArray' => $voucherStatusArray,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeTypes = $this->feeTypeRepository->getActiveAll()->map(function ($feeType) {
            return [
                'id' => $feeType->id,
                'title' => $feeType->fee_type,
            ];
        });

        $voucher_modes = [];

        foreach (VoucherMode::cases() as $mode) {
            array_push($voucher_modes, ['title' => $mode->value, 'value' => $mode->value]);
        }

        $students = [];
        $student = null;
        $studentFeeVouchers = [];

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

                $studentFeeVouchers = $this->getFeeVouchersByStudentId($student->id);
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
                        unset($student['classroom']);

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }
        }

        return Inertia::render('FeeVoucher/Create', [
            'classrooms' => $classrooms,
            'feeTypes' => $feeTypes,
            'voucher_modes' => $voucher_modes,
            'students' => $students,
            'student' => $student,
            'studentFeeVouchers' => $studentFeeVouchers,
        ]);
    }

    /**
     * save student fee voucher.
     */
    public function save(StudentFeeVoucherRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => !empty($input['student_id']) ? $input['student_id'] : null,
                'voucher_mode' => $input['voucher_mode'],
                'title' => $input['title'],
                'start_date' => !empty($input['start_date']) ? Carbon::parse($input['start_date'])->format('Y-m-d') : date('Y-m-d'),
                'end_date' => !empty($input['end_date']) ? Carbon::parse($input['end_date'])->format('Y-m-d') : date('Y-m-d'),
                'status' => Status::ACTIVE,
            );

            if ($input['voucher_mode'] == "Multiple") {
                $students = $this->studentRepository->getStudentsByClassroomId($input['classroom_id']);

                foreach ($students as $student) {
                    $dataArray['student_id'] = $student->id;

                    $this->createStudentFeeVoucher($dataArray, $input['fee_type_amounts'], $student->id);
                }
            } else {
                $this->createStudentFeeVoucher($dataArray, $input['fee_type_amounts'], $input['student_id']);
            }

            DB::commit();

            return redirect()->back()->with([
                'message' => 'Fee voucher created successfully'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }


    /**
     * edit student fee voucher form.
     */
    public function edit(StudentFeeVoucher $studentFeeVoucher): Response
    {
        $studentFeeVoucher->load(['student.promotedClassroom', 'feeTypeAmounts.payment']);

        $classrooms = $this->classroomRepository->getActiveAll();

        $feeTypes = $this->feeTypeRepository->getActiveAll()->map(function ($feeType) {
            return [
                'id' => $feeType->id,
                'title' => $feeType->fee_type,
            ];
        });

        $voucher_modes = [];

        foreach (VoucherMode::cases() as $mode) {
            array_push($voucher_modes, ['title' => $mode->value, 'value' => $mode->value]);
        }

        $feeVouchers = $this->getFeeVouchersByStudentId($studentFeeVoucher->student->id);

        if ($studentFeeVoucher?->student?->promotedClassroom != null) {
            if (!empty($studentFeeVoucher['student']['classroom'])) {
                unset($studentFeeVoucher['student']['classroom']);
            }

            $studentFeeVoucher['student']['classroom_id'] = $studentFeeVoucher?->student?->promotedClassroom?->id;
            $studentFeeVoucher['student']['classroom'] = $studentFeeVoucher?->student?->promotedClassroom;
        }

        $classroomId = $studentFeeVoucher?->student?->classroom_id;

        $students = [];

        if (!empty($classroomId)) {
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
        }

        if (count($students) > 0) {
            $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            }]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    unset($student['classroom']);

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $rollNo = $student?->classroomRoll?->roll_no ?? "";

                $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                return $student;
            });
        }

        return Inertia::render('FeeVoucher/Edit', [
            'studentFeeVoucher' => $studentFeeVoucher,
            'classrooms' => $classrooms,
            'feeTypes' => $feeTypes,
            'voucher_modes' => $voucher_modes,
            'feeVouchersByStudent' => $feeVouchers,
            'students' => $students,
        ]);
    }

    /**
     * Update student fee voucher.
     */
    public function update(StudentFeeVoucher $studentFeeVoucher, StudentFeeVoucherRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $studentFeeVoucher->load(['feeTypeAmounts.payment']);

            $canUpdate = true;

            $studentFeeVoucher->feeTypeAmounts->each(function ($feeTypeAmount) use (&$canUpdate) {
                if ($feeTypeAmount->payment != null && $feeTypeAmount->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    $canUpdate = false;
                }
            });

            if (!$canUpdate) {
                return redirect()->back()->with('error', 'Voucher is in use, this cannot be updated.');
            }

            $dataArray = array(
                'voucher_mode' => $input['voucher_mode'],
                'title' => $input['title'],
                'start_date' => !empty($input['start_date']) ? Carbon::parse($input['start_date'])->format('Y-m-d') : date('Y-m-d'),
                'end_date' => !empty($input['end_date']) ? Carbon::parse($input['end_date'])->format('Y-m-d') : date('Y-m-d'),
                'status' => Status::ACTIVE,
            );

            $this->studentFeeVoucherRepository->update($studentFeeVoucher->id, $dataArray);

            foreach ($input['fee_type_amounts'] as $amount) {
                $attributesToCheck = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'student_fee_voucher_id' => $studentFeeVoucher->id,
                    'student_id' => $input['student_id'],
                    'fee_type_id' => $amount['fee_type_id'],
                ];
                $valuesToUpdate = [
                    'amount' => $amount['amount'],
                    'status' => Status::ACTIVE,
                ];

                $this->studentFeeVoucherAmountRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            $feeTypeIdsToUpdate = collect($input['fee_type_amounts'])->pluck('fee_type_id')->toArray();

            $studentFeeVoucher->feeTypeAmounts()->whereNotIn('fee_type_id', $feeTypeIdsToUpdate)->delete();

            DB::commit();

            return redirect()->back()->with([
                'message' => 'Fee voucher updated successfully'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Delete student fee voucher.
     */
    public function destroy(StudentFeeVoucher $studentFeeVoucher): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $studentFeeVoucher->load(['feeTypeAmounts.payment']);

            $canDelete = true;

            $studentFeeVoucher->feeTypeAmounts->each(function ($feeTypeAmount) use (&$canDelete) {
                if ($feeTypeAmount->payment != null && $feeTypeAmount->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    $canDelete = false;
                }
            });

            if (!$canDelete) {
                return redirect()->back()->with('error', 'Voucher is in use, this cannot be deleted.');
            }

            $studentFeeVoucher->feeTypeAmounts()->delete();

            $studentFeeVoucher->delete();

            DB::commit();

            return redirect()->route('fee_voucher.create')->with([
                'message' => 'Fee Voucher deleted successfully'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }


    protected function getFeeVouchersByStudentId(int $studentId = null): array|object
    {
        $feeVouchers = [];

        if (!is_null($studentId)) {
            $feeVouchers = $this->studentFeeVoucherRepository->getActiveAllByStudentId($studentId);

            $feeVouchers->load(['student.classroom', 'feeTypeAmounts.feeType', 'feeTypeAmounts.payment']);
        }

        $formattedData = $this->formatStudentFeeVoucherData($feeVouchers);

        return $formattedData;
    }


    protected function formatStudentFeeVoucherData(array|object $studentFeeVoucherData = []): array|object
    {
        $formattedData = [];

        if ($studentFeeVoucherData != null) {
            foreach ($studentFeeVoucherData as $feeVoucher) {
                $newArray = [
                    'id' => $feeVoucher->id,
                    'voucher_mode' => $feeVoucher->voucher_mode,
                    'title' => $feeVoucher->title,
                    'start_date' => $feeVoucher->start_date,
                    'end_date' => $feeVoucher->end_date,
                    'student' => [
                        'id' => $feeVoucher->student->id,
                        'admission_no' => $feeVoucher->student->admission_no,
                        'classroom_id' => $feeVoucher->student->classroom_id,
                        'first_name' => $feeVoucher->student->first_name,
                        'middle_name' => $feeVoucher->student->middle_name,
                        'last_name' => $feeVoucher->student->last_name,
                        'classroom' => [
                            'id' => $feeVoucher->student->classroom->id,
                            'title' => $feeVoucher->student->classroom->title,
                        ]
                    ],
                ];

                $total_amount = 0;
                $total_paid = 0;
                $total_discount = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $newFeeTypeAmountArray = [];

                foreach ($feeVoucher->feeTypeAmounts as $feeTypeAmount) {
                    $fee_amount = $feeTypeAmount->amount;
                    $paid_amount = 0;
                    $discount_amount = 0;

                    $status = $feeTypeAmount?->payment?->payment_status;

                    if ($feeTypeAmount->payment != null) {
                        $paid_amount = $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $discount_amount = $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    }

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    if ((($fee_amount - $discount_amount) - $paid_amount) <= 0 && empty($feeTypeAmount['payment'])) {
                        $status = PaymentStatus::DUE->value;
                    } else if ((($fee_amount - $discount_amount) - $paid_amount) <= 0) {
                        $status = PaymentStatus::PAID->value;
                    } else if ((($fee_amount - $discount_amount) - $paid_amount) > 0 && !empty($feeTypeAmount['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    if ($status === PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status === PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }

                    $total_amount += $fee_amount;
                    $total_paid += $paid_amount;
                    $total_discount += $discount_amount;

                    $newFeeTypeAmountArray[] = [
                        'id' => $feeTypeAmount->id,
                        'student_fee_voucher_id' => $feeTypeAmount->student_fee_voucher_id,
                        'fee_type' => [
                            'id' => $feeTypeAmount->feeType->id,
                            'title' => $feeTypeAmount->feeType->fee_type,
                        ],
                        'amount' => $feeTypeAmount->amount,
                    ];
                }

                $total_due = $total_amount - $total_paid;

                // if ($total_due == 0) {
                //     $payment_status =  PaymentStatus::PAID->value;
                // } else if ($total_due > 0 && $total_due < $total_amount) {
                //     $payment_status =  PaymentStatus::PARTIAL->value;
                // } else {
                //     $payment_status = PaymentStatus::DUE->value;
                // }

                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                $newArray['total_amount'] = $total_amount;
                $newArray['total_paid'] = $total_paid;
                $newArray['total_due'] = $total_due;
                $newArray['payment_status'] = $payment_status;
                $newArray['fee_type_amounts'] = $newFeeTypeAmountArray;

                $formattedData[] = $newArray;
            }
        }

        return $formattedData;
    }


    protected function createStudentFeeVoucher(array $studentFeeVoucherData, array $studentFeeVoucherAmountData, int $studentId): void
    {
        $studentFeeVoucher = $this->studentFeeVoucherRepository->create($studentFeeVoucherData);

        foreach ($studentFeeVoucherAmountData as $amount) {
            $amountDataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => $studentId,
                'student_fee_voucher_id' => $studentFeeVoucher->id,
                'fee_type_id' => $amount['fee_type_id'],
                'amount' => $amount['amount'],
                'status' => Status::ACTIVE,
            );

            $this->studentFeeVoucherAmountRepository->create($amountDataArray);
        }
    }
}
