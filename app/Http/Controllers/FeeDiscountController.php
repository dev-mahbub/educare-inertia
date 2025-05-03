<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\Discount;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use App\Models\StudentFeeDiscount;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\DiscountRequest;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IDiscountRepository;
use App\Http\Requests\BulkDiscountRequest;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StudentFeeDiscountRequest;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Http\Requests\UpdateStudentFeeDiscountRequest;
use App\Repositories\IDiscountFeeTypeAmountRepository;

class FeeDiscountController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IDiscountRepository $discountRepository,
        private IDiscountFeeTypeAmountRepository $discountFeeTypeAmountRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IFeeRepository $feeRepository,
        private IStudentRepository $studentRepository,
    ) {
        $this->middleware('permission:view fees', ['only' => ['discount', 'studentDiscount', 'discountFeeReport', 'discountFeePaidReport', 'discountFeeExpectedReport']]);
        $this->middleware('permission:add fees', ['only' => ['create', 'save', 'saveStudentDiscount', 'bulkDiscount', 'saveBulkDiscount']]);
        $this->middleware('permission:edit fees', ['only' => ['edit', 'update', 'updateStudentFeeDiscount']]);
        $this->middleware('permission:delete fees', ['only' => ['destroy', 'deleteStudentFeeDiscount', 'deleteFeeDiscount']]);
    }

    /**
     * Display the discounts.
     */
    public function discount(): Response
    {
        $feeTypes = $this->feeTypeRepository->getActiveAll();
        $discounts = $this->discountRepository->getActiveAll();

        return Inertia::render('FeeDiscount/Discount', [
            'feeTypes' => $feeTypes,
            'discounts' => $discounts,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Asset/Create', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
            'status' => session('status'),
        ]);
    }

    /**
     * save discount.
     */
    public function save(DiscountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'created_by' => auth()->user()->id,
                'title' => $input['title'],
                'description' => !empty($input['description']) ? $input['description'] : "",
                'is_discount_percentage' => $input['is_discount_percentage'],
                'status' => Status::ACTIVE,
            );


            $discount = $this->discountRepository->create($dataArray);

            foreach ($input['fee_type_amount_array'] as $fee_type_amount) {
                $feeTypeAmountArray = array(
                    'school_id' => getUserSchoolId(),
                    'discount_id' => $discount->id,
                    'fee_type_id' => $fee_type_amount['fee_type_id'],
                    'amount' => $fee_type_amount['amount'],
                );

                $this->discountFeeTypeAmountRepository->create($feeTypeAmountArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Discount created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * edit discount
     */
    public function edit(Discount $discount): Response
    {

        $feeTypes = $this->feeTypeRepository->getActiveAll();
        $discounts = $this->discountRepository->getActiveAll();

        $discount->load(['discountFeeTypeAmounts']);

        return Inertia::render('FeeDiscount/Edit', [
            'feeTypes' => $feeTypes,
            'discounts' => $discounts,
            'discount' => $discount,
        ]);
    }

    /**
     * Update discount.
     */
    public function update(Discount $discount, DiscountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'created_by' => auth()->user()->id,
                'title' => $input['title'],
                'description' => !empty($input['description']) ? $input['description'] : "",
                'is_discount_percentage' => $input['is_discount_percentage'],
                'status' => $input['status'] ?? Status::ACTIVE,
            );

            $discount->update($dataArray);

            foreach ($input['fee_type_amount_array'] as $fee_type_amount) {
                $attributesToCheck = [
                    'school_id' => getUserSchoolId(),
                    'discount_id' => $discount->id,
                    'fee_type_id' => $fee_type_amount['fee_type_id'],
                ];

                $valuesToUpdate = [
                    'amount' => $fee_type_amount['amount'],
                    'created_by' => auth()->user()->id,
                ];

                $this->discountFeeTypeAmountRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->route('fee_discount.discount')->with('message', 'Discount updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Delete discount.
     */
    public function destroy(Discount $discount): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $discount->discountFeeTypeAmounts()->delete();

            $discount->delete();

            DB::commit();

            return redirect()->route('fee_discount.discount')->with([
                'message' => 'Discount deleted successfully',
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }


    /**
     * Display student discounts.
     */
    public function studentDiscount(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeTypes = $this->feeTypeRepository->getActiveAll();
        $discounts = $this->discountRepository->getActiveAll();
        $discounts->load(['discountFeeTypeAmounts']);
        $studentUnpaidFees = [];
        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $admissionNo = $request->admission_no ?? null;

            if (!empty($admissionNo)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
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
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $student['title'] = "{$student?->classroomRoll?->roll_no} - {$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                    return $student;
                });

                $students->each(function ($student) use (&$studentUnpaidFees) {
                    $unpaidFees = $this->feeRepository->getUnpaidByStudentId($student->id);

                    if (count($unpaidFees) > 0) {
                        $studentUnpaidFees[$student->id] = $unpaidFees;
                    }
                });
            }
        }

        return Inertia::render('FeeDiscount/StudentDiscount', [
            'classrooms' => $classrooms,
            'discounts' => $discounts,
            'feeTypes' => $feeTypes,
            'students' => $students,
            'studentUnpaidFees' => $studentUnpaidFees,
            'student' => $student
        ]);
    }


    /*
    * save student discount
    */
    public function saveStudentDiscount(StudentFeeDiscountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $student = $this->studentRepository->getById($input['student_id']);

            if ($student->discount() != null) {
                $student->student_fee_discounts()->delete();
            }

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => $input['student_id'],
            ];

            $valuesToUpdate = [
                'created_by' => auth()->user()->id,
                'discount_id' => $input['discount_id'],
                'is_discount_percentage' => $input['is_discount_percentage'] ?? false,
                'status' => Status::ACTIVE,
            ];

            foreach ($input['fee_ids'] as $feeId) {
                $attributesToCheck['fee_id'] = $feeId;

                foreach ($input['fee_type_amount_array'] as $fee_type_amount) {
                    $attributesToCheck['fee_type_id'] = $fee_type_amount['fee_type_id'];
                    $valuesToUpdate['amount'] = $fee_type_amount['amount'];

                    $studentDiscount = $this->studentFeeDiscountRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);

                    $studentDiscount->activities()->create([
                        'school_id' => getUserSchoolId(),
                        'user_id' => auth()->user()->id,
                        'activitiesable_id' => $studentDiscount->id,
                        'activitiesable_type' => $studentDiscount->getMorphClass(),
                    ]);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Student discount added successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }


    /**
     * Display student bulk discount
     */
    public function bulkDiscount(Request $request): Response
    {
        $feeTypes = $this->feeTypeRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $discounts = $this->discountRepository->getActiveAll();
        $discounts->load(['discountFeeTypeAmounts']);

        $students = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
                $students->load(['discount']);
            }

            if (count($students) > 0) {
                $students->loadMissing(['discount', 'promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $student['title'] = "{$student?->classroomRoll?->roll_no} - {$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                    return $student;
                });
            }
        }

        return Inertia::render('FeeDiscount/BulkDiscount', [
            'classrooms' => $classrooms,
            'discounts' => $discounts,
            'feeTypes' => $feeTypes,
            'fees' => $fees,
            'students' => $students,
        ]);
    }

    /*
    * save bulk discount to students
    */
    public function saveBulkDiscount(BulkDiscountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ];

            $valuesToUpdate = [
                'created_by' => auth()->user()->id,
                'discount_id' => $input['discount_id'] ?? null,
                'is_discount_percentage' => $input['is_discount_percentage'] ?? false,
                'status' => Status::ACTIVE,
            ];

            foreach ($input['student_ids'] as $studentId) {
                $student = $this->studentRepository->getById($studentId);

                if ($student->discount() != null) {
                    $student->student_fee_discounts()->delete();
                }

                $attributesToCheck['student_id'] = $studentId;

                $unpaidFeeIds = $this->feeRepository->getUnpaidByStudentId($studentId)->pluck('id')->toArray();

                foreach ($input['fee_ids'] as $feeId) {
                    if (in_array($feeId, $unpaidFeeIds)) {
                        $attributesToCheck['fee_id'] = $feeId;

                        foreach ($input['fee_type_amount_array'] as $fee_type_amount) {
                            $attributesToCheck['fee_type_id'] = $fee_type_amount['fee_type_id'];
                            $valuesToUpdate['amount'] = $fee_type_amount['amount'];

                            $studentDiscount = $this->studentFeeDiscountRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);

                            $studentDiscount->activities()->create([
                                'school_id' => getUserSchoolId(),
                                'user_id' => auth()->user()->id,
                                'activitiesable_id' => $studentDiscount->id,
                                'activitiesable_type' => $studentDiscount->getMorphClass(),
                            ]);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Student discount added successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /*
    *  update student fee discount
    */

    public function updateStudentFeeDiscount(UpdateStudentFeeDiscountRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => $input['student_id'],
                'fee_id' => $input['fee_id'],
                'discount_id' => $input['discount_id'],
            ];

            $valuesToUpdate = [
                'created_by' => auth()->user()->id,
                'is_discount_percentage' => $input['is_discount_percentage'],
                'status' => Status::ACTIVE,
            ];

            foreach ($input['fee_type_amount_array'] as $fee_type_amount) {
                $attributesToCheck['fee_type_id'] = $fee_type_amount['fee_type_id'];
                $valuesToUpdate['amount'] = $fee_type_amount['amount'];

                $studentDiscount = $this->studentFeeDiscountRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);

                $studentDiscount->activities()->create([
                    'school_id' => getUserSchoolId(),
                    'user_id' => auth()->user()->id,
                    'activitiesable_id' => $studentDiscount->id,
                    'activitiesable_type' => $studentDiscount->getMorphClass(),
                ]);
            }

            $feeTypeIdsToUpdate = collect($input['fee_type_amount_array'])->pluck('fee_type_id')->toArray();

            $this->studentFeeDiscountRepository->deleteStudentFeeDiscounts($input['student_id'], $input['discount_id'], $input['fee_id'], $feeTypeIdsToUpdate);

            // StudentFeeDiscount::where('school_id', getUserSchoolId())
            //     ->where('student_id', $input['student_id'])
            //     ->where('discount_id', $input['discount_id'])
            //     ->where('fee_id', $input['fee_id'])
            //     ->whereNotIn('fee_type_id', $feeTypeIdsToUpdate)
            //     ->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Student discount added successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /*
    *  delete student fee discount
    */
    public function deleteStudentFeeDiscount(int $discountId, int $studentId)
    {
        $deleteStatus = $this->studentFeeDiscountRepository->deleteStudentFeeDiscount($discountId, $studentId);

        if (!$deleteStatus) {
            return redirect()->route('fee_discount.report')->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'Student fee discount deleted successfully');
    }


    /*
    *  delete fee discount
    */
    public function deleteFeeDiscount(int $discountId, int $studentId, int $feeId)
    {
        $deleteStatus = $this->studentFeeDiscountRepository->deleteFeeDiscount($discountId, $studentId, $feeId);

        if (!$deleteStatus) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'Fee discount deleted successfully');
    }

    /**
     * Display the schools.
     */
    public function discountFeeReport(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $discounts = $this->discountRepository->getActiveAll();
        $discounts->load(['discountFeeTypeAmounts']);
        $fees = $this->feeRepository->getActiveAll();
        $fees->load(['payments']);
        $feeTypes = $this->feeTypeRepository->getActiveAll();

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $discountId = $request->discount_id ?? null;

            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountActiveAll($classroomId, $discountId);
        } else {
            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountActiveAll();
        }

        $studentFeeDiscountsData = [];

        if (count($studentFeeDiscounts) > 0) {
            $studentFeeDiscounts = $studentFeeDiscounts->map(function ($studentDiscount) {
                if ($studentDiscount?->student?->promotedClassroom != null) {
                    if (!empty($studentDiscount['student']['classroom'])) {
                        unset($studentDiscount['student']['classroom']);
                    }

                    $studentDiscount['student']['classroom_id'] = $studentDiscount?->student?->promotedClassroom?->id;
                    $studentDiscount['student']['classroom'] = $studentDiscount?->student?->promotedClassroom;
                }

                return $studentDiscount;
            })->groupBy(['discount_id', 'student_id']);

            foreach ($studentFeeDiscounts as $discountId => $discountDataArray) {
                foreach ($discountDataArray as $studentId => $discountData) {
                    $student = $discountData->first()?->student;

                    if ($student != null) {
                        $classroomId = $student->classroom_id;

                        $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        }]);
                    }

                    $dataArray = [
                        'student' => $student->toArray(),
                        'discount' => $discountData[0]->discount ? $discountData[0]->discount->toArray() : null,
                        'created_by' =>  $discountData[0]->activities->count() > 0 ? $discountData[0]->activities[0]->user->toArray() : null,
                        'fees' => [],
                    ];

                    foreach ($discountData as $data) {
                        $feeId = $data['fee_id'];

                        if (!isset($dataArray['fees'][$feeId])) {
                            $dataArray['fees'][$feeId] = [
                                'fee_type_amounts' => [],
                                'fee' => $data['fee'],
                            ];
                        }

                        $feeTypeAmountArray = [
                            'id' => $data['id'],
                            'school_id' => $data['school_id'],
                            'student_id' => $data['student_id'],
                            'discount_id' => $data['discount_id'],
                            'fee_type_id' => $data['fee_type_id'],
                            'fee_id' => $data['fee_id'],
                            'amount' => $data['amount'],
                            'is_discount_percentage' => $data['is_discount_percentage'],
                            'status' => $data['status'],
                            'fee_type' => $data['feeType'],
                        ];

                        $dataArray['fees'][$feeId]['fee_type_amounts'][] = $feeTypeAmountArray;
                    }

                    $feeArray = [
                        'fee_type_amounts' => null,
                        'fee' => null,
                    ];

                    foreach ($fees as $fee) {
                        if (!isset($dataArray['fees'][$fee['id']])) {
                            $feeArray['fee'] = $fee->makeHidden(['payments']);
                            $dataArray['fees'][$fee['id']] = $feeArray;
                        }

                        if (!isset($dataArray['fees'][$fee['id']]['is_paid'])) {
                            $dataArray['fees'][$fee['id']]['is_paid'] = $fee->payments->where('student_id', $studentId)->first() != null ? true : false;
                        }
                    }

                    ksort($dataArray['fees']);

                    $studentFeeDiscountsData[] = $dataArray;
                }
            }
        }

        return Inertia::render('FeeDiscount/DiscountFeeReport', [
            'classrooms' => $classrooms,
            'discounts' => $discounts,
            'studentFeeDiscounts' => $studentFeeDiscountsData,
            'feeTypes' => $feeTypes,
        ]);
    }


    /**
     * Display student paid discount fee report
     */
    public function discountFeePaidReport(Request $request): Response
    {
        $discounts = $this->discountRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $discountPaidReport = [];

        if ($request->isMethod('POST')) {
            $discountId = $request->discount_id ?? null;
            $fromFeeId = $request->from_fee_id ?? null;
            $toFeeId = $request->to_fee_id ?? null;

            if (!empty($fromFeeId) && !empty($toFeeId)) {
                $studentFeeDiscounts = $this->studentFeeDiscountRepository->getPaidStudentFeeDiscountsData($fromFeeId, $toFeeId, $discountId);

                if (count($studentFeeDiscounts) > 0) {
                    $studentFeeDiscounts = $studentFeeDiscounts->map(function ($studentDiscount) {
                        if ($studentDiscount?->student?->promotedClassroom != null) {
                            if (!empty($studentDiscount['student']['classroom'])) {
                                unset($studentDiscount['student']['classroom']);
                            }

                            $studentDiscount['student']['classroom_id'] = $studentDiscount?->student?->promotedClassroom?->id;
                            $studentDiscount['student']['classroom'] = $studentDiscount?->student?->promotedClassroom;
                        }

                        return $studentDiscount;
                    });

                    $transformedData = [];

                    foreach ($studentFeeDiscounts->groupBy('discount_id') as $discountId => $group) {
                        $studentsData = $group->groupBy('student_id')->map(function ($groupedItem) {
                            $student = $groupedItem?->first()?->student;

                            if ($student != null) {
                                $classroomId = $student->classroom_id;

                                $student->load(['classroomRoll' => function ($query) use ($classroomId) {
                                    $query->where('classroom_id', $classroomId);
                                }]);
                            }

                            $studentData = [
                                'student' => $student?->toArray(),
                                'total_fee_discount' => $groupedItem?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0,
                            ];

                            if ($studentData['total_fee_discount'] > 0) {
                                return $studentData;
                            }
                        });

                        $total_discount = 0;

                        $transformedData[$discountId] = [
                            'discount' => $group?->first()?->discount?->toArray(),
                        ];

                        foreach ($studentsData as $student) {
                            if ($student != null) {
                                $total_discount += $student['total_fee_discount'];

                                $transformedData[$discountId]['data'][$student['student']['id']] = [
                                    'student' => $student['student'],
                                    'total_fee_discount' => $student['total_fee_discount'],
                                ];
                            }
                        }

                        $transformedData[$discountId]['total_discount'] = $total_discount;
                    }

                    if (!empty($transformedData)) {
                        $discountPaidReport = array_filter($transformedData, function ($item) {
                            return $item['total_discount'] > 0;
                        });
                    }
                }
            }
        }

        return Inertia::render('FeeDiscount/DiscountFeePaidReport', [
            'discounts' => $discounts,
            'fees' => $fees,
            'discountPaidReport' => $discountPaidReport,
        ]);
    }

    /**
     * Display expected fee discount reports .
     */
    public function discountFeeExpectedReport(Request $request): Response
    {
        $discounts = $this->discountRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $expectedStudentFeeDiscountReport = [];

        if ($request->isMethod('POST')) {
            $discountId = $request->discount_id ?? null;
            $fromFeeId = $request->from_fee_id ?? null;
            $toFeeId = $request->to_fee_id ?? null;
            $search = $request->search ?? "";

            if (!empty($fromFeeId) && !empty($toFeeId)) {
                $studentFeeDiscounts = $this->studentFeeDiscountRepository->getExpectedStudentFeeDiscountsData($fromFeeId, $toFeeId, $discountId, $search);

                $transformedData = [];

                if (count($studentFeeDiscounts) > 0) {
                    $studentFeeDiscounts = $studentFeeDiscounts->map(function ($studentDiscount) {
                        if ($studentDiscount?->student?->promotedClassroom != null) {
                            if (!empty($studentDiscount['student']['classroom'])) {
                                unset($studentDiscount['student']['classroom']);
                            }

                            $studentDiscount['student']['classroom_id'] = $studentDiscount?->student?->promotedClassroom?->id;
                            $studentDiscount['student']['classroom'] = $studentDiscount?->student?->promotedClassroom;
                        }

                        return $studentDiscount;
                    });

                    foreach ($studentFeeDiscounts->groupBy(['discount_id']) as $discountId => $group) {
                        $studentsData = $group->groupBy('student_id')->map(function ($groupedItem) {
                            $student = $groupedItem?->first()?->student;

                            if ($student != null) {
                                $classroomId = $student->classroom_id;

                                $student->load(['classroomRoll' => function ($query) use ($classroomId) {
                                    $query->where('classroom_id', $classroomId);
                                }]);
                            }

                            $studentData = [
                                'student' => $student,
                                'total_fee_discount' => 0
                            ];

                            $amountsDataArray = [];
                            $total_fee_discount = 0;
                            $total_fee_amount = 0;

                            foreach ($groupedItem as $item) {
                                foreach ($item->student->classroom_structures_fees as $amountItem) {
                                    if (
                                        $item->fee_type_id === $amountItem->fee_type_id &&
                                        $item->fee_id === $amountItem->fee_id &&
                                        $item->student->class_name_id === $amountItem->class_name_id
                                    ) {
                                        $amountItem['discount_amount'] = $item->amount;
                                        $amountItem['is_discount_percentage'] = $item->is_discount_percentage;

                                        $amountsDataArray[$item->id] = $amountItem;
                                    }
                                }

                                foreach ($item->student->classroom_fee_student_amounts as $amountItem) {
                                    if (
                                        $item->fee_type_id === $amountItem->fee_type_id &&
                                        $item->fee_id === $amountItem->fee_id &&
                                        $item->student->id === $amountItem->student_id
                                    ) {
                                        $amountItem['discount_amount'] = $item->amount;
                                        $amountItem['is_discount_percentage'] = $item->is_discount_percentage;

                                        $amountsDataArray[$item->id] = $amountItem;
                                    }
                                }

                                // old code
                                // if (isset($amountsDataArray[$item->id])) {
                                //     $total_fee_discount += (float) $item->amount ?? 0;
                                // }
                            }


                            foreach ($amountsDataArray as $item) {
                                $total_fee_amount += (float) $item['amount'] ?? 0 * ($item['semester'] ?? 1);
                                if ($item['is_discount_percentage'] == true) {
                                    $discount_amount = (float) ($item['discount_amount'] / 100) * (float) $item['amount'] ?? 0;

                                    $total_fee_discount += $discount_amount;
                                } else {
                                    $total_fee_discount += (float) $item['discount_amount'] ?? 0;
                                }
                            }

                            if ($total_fee_amount > $total_fee_discount) {
                                $studentData['total_fee_discount'] = $total_fee_discount;
                            } else if ($total_fee_amount <= $total_fee_discount) {
                                $studentData['total_fee_discount'] = $total_fee_amount;
                            }

                            if ($studentData['total_fee_discount'] > 0) {
                                return $studentData;
                            }
                        });

                        $total_discount = 0;

                        $transformedData[$discountId] = [
                            'discount' => $group->first()->discount,
                        ];

                        foreach ($studentsData as $student) {
                            if ($student != null) {
                                $total_discount += $student['total_fee_discount'] ?? 0;

                                $transformedData[$discountId]['data'][$student['student']['id']] = [
                                    'student' => $student['student'],
                                    'total_fee_discount' => $student['total_fee_discount'] ?? 0,
                                ];
                            }
                        }

                        $transformedData[$discountId]['total_discount'] = $total_discount;
                    }

                    if (!empty($transformedData)) {
                        $expectedStudentFeeDiscountReport = array_filter($transformedData, function ($item) {
                            return $item['total_discount'] > 0;
                        });
                    }
                }
            }
        }

        return Inertia::render('FeeDiscount/DiscountFeeExpectedReport', [
            'discounts' => $discounts,
            'fees' => $fees,
            'expectedStudentFeeDiscountReport' => $expectedStudentFeeDiscountReport,
        ]);
    }
}
