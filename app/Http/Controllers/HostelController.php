<?php

namespace App\Http\Controllers;

use App\Enums\HostelStaffType;
use App\Enums\Status;
use App\Http\Requests\HostelFeeRequest;
use App\Http\Requests\HostelRequest;
use App\Http\Requests\HostelVoucherRequest;
use App\Http\Requests\StudentGatePassRequest;
use App\Repositories\IClassroomRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IGatePassRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IHostelFeeRepository;
use App\Repositories\IHostelInfraLevelRepository;
use App\Repositories\IHostelRepository;
use App\Repositories\IHostelRoomRepository;
use App\Repositories\IHostelStaffRepository;
use App\Repositories\ImageRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class HostelController extends Controller
{
    private $_upload;
    public function __construct(
        private IHostelRepository $hostelRepository,
        private IHostelInfraLevelRepository $hostelInfraLevelRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private IHostelStaffRepository $hostelStaffRepository,
        private IHostelRoomRepository $hostelRoomRepository,
        private IGuardianRepository $guardianRepository,
        private IGatePassRepository $gatePassRepository,
        private ImageRepository $imageRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IHostelFeeRepository $hostelFeeRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view hostel', ['only' => ['hostelFeeGroup', 'hostelVoucher', 'hostelGatePass', 'gatePassClassWise']]);
        $this->middleware('permission:add hostel', ['only' => ['setupHostel', 'allocationFunc', 'allocationSave', 'hostelStaffSave', 
            'deallocation', 'deallocationSave', 'hostelFeeGroupSave', 'hostelVoucherSave', 'assignHostelFee', 
            'assignHostelFeeSave', 'hostelGatePassSave'
        ]]);
        $this->middleware('permission:edit hostel', ['only' => ['hostelFeeGroupUpdate', 'hostelFeeGroupEdit']]);
        $this->middleware('permission:delete hostel', ['only' => ['infraLabelDestroy', 'hostelStaffDestroy', 'hostelFeeGroupDestroy', 'hostelVoucherDestroy']]);
    }

    /**
     * setupHostel
     */
    public function setupHostel(Request $request): Response
    {
        $infraLavelIdString = !empty($_GET['ids']) ? trim($_GET['ids']) : '';
        $is_open = !empty($_GET['is_open']) ? intval($_GET['is_open']) : 0;
        $currentLavelId = !empty($_GET['current']) ? trim($_GET['current']) : '';
        $infraLavelIds = !empty($infraLavelIdString) ? explode(',', $_GET['ids']) : [];
        $infraLavelIdString = !empty($infraLavelIds) ? @implode(',', array_unique($infraLavelIds)) : '';
        array_push($infraLavelIds, $currentLavelId);
        $type = !empty($_GET['type']) ? $_GET['type'] : 'Lavel';

        if ($request->isMethod('post')) {

            $id = $request->input('id') ?? '';
            $parentId = $request->input('parent_id') ?? Null;
            $name = $request->input('name') ?? '';

            if (!empty($id)) {
                $dataArray = array(
                    'name' => $name,
                    'room_type' => $request->input('room_type') ?? null,
                    'description' => $request->input('description') ?? '',
                );
                $this->hostelInfraLevelRepository->update($id, $dataArray);
            } else {
                if (!empty($name)) {
                    $dataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'parent_id' => $parentId,
                        'name' => $name,
                        'infra_level_type' => $request->input('infra_level_type') ?? 'Lavel',
                        'room_type' => $request->input('room_type') ?? null,
                        'description' => $request->input('description') ?? '',
                        'status' => Status::ACTIVE,
                    );
                    $this->hostelInfraLevelRepository->create($dataArray);
                }
            }
        }

        $infraLevelData = $this->hostelInfraLevelRepository->getActiveAll()?->load('roomType');
        $infraLevels = array();
        $childLevels = array();
        $editLavels = array();
        if (!empty($infraLevelData)) {
            foreach ($infraLevelData as $lkey => $level) {
                if ($level->parent_id == NUll) {
                    array_push($infraLevels, [
                        "id" => $level->id,
                        "name" => $level->name,
                        "infra_level_type" => $level->infra_level_type,
                    ]);
                } else {
                    $editLavels[$level->id] = [
                        "id" => $level->id,
                        "name" => $level->name,
                        "infra_level_type" => $level->infra_level_type,
                    ];
                    $childLevels[$level->parent_id][] = [
                        "id" => $level?->id,
                        "name" => $level?->name,
                        "infra_level_type" => $level?->infra_level_type,
                        "room_type" => $level?->roomType?->title,
                        "room_type_id" => $level?->roomType?->id,
                        "description" => $level?->description
                    ];
                }
            }
        }

        // HostelStaffType
        $hostelStaffType = HostelStaffType::cases();
        $hostelStaffArr = array();
        foreach ($hostelStaffType as $staffType) {
            array_push($hostelStaffArr, ['id' => $staffType->value, 'title' => $staffType->value]);
        }

        // teacher
        $teachers =  $this->staffRepository->getActiveTeacherName();
        $teacherData = $teachers->map(fn ($teacher) => [
            'id' => $teacher->id,
            'title' => getCocatenationTitle($teacher->first_name, $teacher->middle_name, $teacher->last_name),
        ])->all();

        // roomType data
        $roomTypes =  $this->hostelRoomRepository->getActiveAll();
        $roomTypeData = $roomTypes->map(fn ($roomType) => [
            'id' => $roomType->id,
            'title' => $roomType->title,
        ])->all();

        // get hostel staff
        $hostelStaffDetails = [];
        if (!empty($currentLavelId)) {
            $hostelStaffDetails = $this->hostelStaffRepository->getAllActiveHostelStaffByHostelInfraId($currentLavelId);
        }

        return Inertia::render('Hostel/SetupHostel', [
            'infraLevels' => $infraLevels,
            'childLevels' => $childLevels,
            'infraLavelIds' => $infraLavelIds,
            'infraLavelIdString' => $infraLavelIdString,
            'currentLavelId' => $currentLavelId,
            'is_open' => $is_open,
            'type' => $type,
            'hostelStaffArr' => $hostelStaffArr,
            'teacherData' => $teacherData,
            'hostelStaffDetails' => $hostelStaffDetails,
            'roomTypeData' => $roomTypeData,
        ]);
    }

    /**
     * infraLabelDestroy
     */
    public function infraLabelDestroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->hostelInfraLevelRepository->delete($id);
            DB::commit();
            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('infra_level.create_list')->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * hostelStaffDestroy
     */
    public function hostelStaffDestroy(int $id): RedirectResponse
    {
        $hostelStaff = $this->hostelStaffRepository->getById($id);
        if (!$hostelStaff) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        $this->hostelStaffRepository->delete($id);
        return redirect()->back()->with(
            [
                'message' => 'Hostel staff deleted successfully.',
                'is_hostel_deleted' => true,
            ]
        );
    }

    /**
     * allocation
     */
    public function allocationFunc(): Response
    {
        $infraLavelIdString = !empty($_GET['ids']) ? trim($_GET['ids']) : '';
        $is_open = !empty($_GET['is_open']) ? intval($_GET['is_open']) : 0;
        $currentLavelId = !empty($_GET['current']) ? trim($_GET['current']) : '';
        $infraLavelIds = !empty($infraLavelIdString) ? explode(',', $_GET['ids']) : [];
        $infraLavelIdString = !empty($infraLavelIds) ? @implode(',', array_unique($infraLavelIds)) : '';
        array_push($infraLavelIds, $currentLavelId);
        $type = !empty($_GET['type']) ? $_GET['type'] : 'Lavel';

        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        // student
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                $student['classroom_id'] = $student?->promotedClassroom?->id;
            }

            return  [
                'id' => $student->id,
                'classroom_id' => $student->classroom_id,
                'title' => ($student?->classroomRoll?->roll_no ?? "") . ' - ' . $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name,
                'admission_no' => $student->admission_no,
                'classroom_roll' => $student?->classroomRoll,
            ];
        })->all();

        $infraLevelData = $this->hostelInfraLevelRepository->getActiveAll();

        $infraLevels = array();
        $childLevels = array();
        $editLavels = array();
        if (!empty($infraLevelData)) {
            foreach ($infraLevelData as $lkey => $level) {
                if ($level->parent_id == NUll) {
                    array_push($infraLevels, [
                        "id" => $level->id,
                        "name" => $level->name,
                        "infra_level_type" => $level->infra_level_type,
                    ]);
                } else {
                    $availableBeds = 0;
                    if (!empty($currentLavelId)) {
                        $allBeds = $this->hostelInfraLevelRepository->getCountBedsById($currentLavelId);
                        $assignBeds = $this->hostelRepository->getCountByHostelRoomId($currentLavelId);
                        $availableBeds = $allBeds - $assignBeds;
                    }

                    // Calculate available beds

                    $editLavels[$level->id] = [
                        "id" => $level->id,
                        "name" => $level->name,
                        "infra_level_type" => $level->infra_level_type,
                        "available_beds" => $availableBeds,
                    ];
                    $childLevels[$level->parent_id][] = [
                        "id" => $level->id,
                        "name" => $level->name,
                        "infra_level_type" => $level->infra_level_type,
                        "room_type" => $level->room_type,
                        "description" => $level->description,
                        "available_beds" => $availableBeds,
                    ];
                }
            }
        }

        // student bed details
        $studentBedDetails = [];

        if (!empty($currentLavelId)) {
            $room = $this->hostelInfraLevelRepository->getById($currentLavelId);

            if (!empty($room)) {
                $roomTypeTitle = $room?->roomType?->title;
                $beds = $room?->beds;

                foreach ($beds as $bed) {
                    $studentAllocate = $this->hostelRepository->getByHostelInfraLevelId($bed['id']);

                    if (!empty($studentAllocate)) {
                        $studentAllocateData = $studentAllocate?->load('student.classroom', 'student.father', 'student.promotedClassroom');

                        if ($studentAllocateData?->student?->promotedClassroom != null) {
                            if (!empty($studentAllocateData['student']['classroom'])) {
                                unset($studentAllocateData['student']['classroom']);
                            }

                            $studentAllocateData['student']['classroom_id'] = $studentAllocateData?->student?->promotedClassroom?->id;
                            $studentAllocateData['student']['classroom'] = $studentAllocateData?->student?->promotedClassroom;
                        }

                        $studentBedDetails[] = [
                            'id' => $bed?->id,
                            'is_have_student' => true,
                            'bed_no' => $bed?->name,
                            'student_name' => getCocatenationTitle($studentAllocateData?->student?->first_name, $studentAllocateData?->student?->middle_name, $studentAllocateData?->student?->last_name),
                            'classroom_title' => $studentAllocateData?->student?->classroom?->title,
                            'father_name' => getCocatenationTitle($studentAllocateData?->student?->father?->first_name, $studentAllocateData?->student?->father?->middle_name, $studentAllocateData?->student?->father?->last_name),
                            'father_mobile' => $studentAllocateData?->student?->father?->phone,
                            'room_type' => $roomTypeTitle,
                        ];
                    } else {
                        $studentBedDetails[] = [
                            'id' => $bed?->id,
                            'is_have_student' => false,
                            'bed_no' => $bed?->name,
                            'student_name' => '',
                            'classroom_title' => '',
                            'father_name' => '',
                            'father_mobile' => '',
                            'room_type' => $roomTypeTitle,
                        ];
                    }
                }
            }
        }

        return Inertia::render('Hostel/Allocation', [
            'classrooms' => $classrooms,
            'students' => $students,
            'infraLevels' => $infraLevels,
            'childLevels' => $childLevels,
            'infraLavelIds' => $infraLavelIds,
            'infraLavelIdString' => $infraLavelIdString,
            'currentLavelId' => $currentLavelId,
            'is_open' => $is_open,
            'type' => $type,
            'studentBedDetails' => $studentBedDetails,
        ]);
    }

    public function allocationSave(Request $request): RedirectResponse
    {
        $input = $request->validate(
            [
                'school_id' => ['nullable', 'integer'],
                'student_id' => ['required', 'integer'],
                'classroom_id' => ['required', 'integer'],
                'admission_no' => ['required'],
                'room_id' => ['nullable'],
                'hostel_infra_level_id' => ['required'],
                'joining_date_at' => ['nullable'],
                'status' => ['nullable'],
                'infraLavelIds' => ['nullable'],
                'currentLavelId' => ['nullable'],
                'is_open' => ['nullable'],
                'type' => ['nullable'],
                'infraLavelIdString' => ['nullable'],
            ],
            [
                'student_id.required' => 'This field is required.',
                'student_id.integer' => 'This field is required.',
                'classroom_id.required' => 'This field is required.',
                'classroom_id.integer' => 'This field is required.',
                'hostel_infra_level_id.integer' => 'This field is required.',
                'hostel_infra_level_id.required' => 'This field is required.',
                'admission_no.required' => 'This field is required.',
            ]
        );

        $conditionData = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'student_id' => $input['student_id'],
            'classroom_id' => $input['classroom_id'],
            'is_current' => true,
        );

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'student_id' => $input['student_id'] ?? null,
            'classroom_id' => $input['classroom_id'] ?? null,
            'hostel_infra_level_id' => $input['hostel_infra_level_id'] ?? null,
            'room_id' => $input['room_id'] ?? null,
            'is_current' => true,
            'joining_date_at' => !empty($input['joining_date_at']) ? \Carbon\Carbon::parse($input['joining_date_at'])->format('Y-m-d') : null,
            'status' => Status::ACTIVE,
        );
        $this->hostelRepository->updateOrCreate($conditionData, $dataArray);
        return redirect()->back()->with('message', 'Assign successfully.');
    }

    public function hostelStaffSave(Request $request)
    {
        $hostel_infra_level_id = $request->input('hostel_infra_level_id');
        $selectedTeachers = $request->input('selected_teachers');

        if (!empty($hostel_infra_level_id) && !empty($selectedTeachers)) {
            // dd($selectedTeachers);
            $conditionData = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'hostel_infra_level_id' => $hostel_infra_level_id,
            ];
            foreach ($selectedTeachers as $teacher) {
                $conditionData['staff_id'] = $teacher['staff_id'];
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'hostel_infra_level_id' => $hostel_infra_level_id,
                    'staff_id' => $teacher['staff_id'] ?? null,
                    'note' => $teacher['note'] ?? null,
                    'hostel_staff_role' => $teacher['hostel_staff_role'] ?? null,
                    'joining_date_at' => !empty($teacher['joining_date_at']) ? \Carbon\Carbon::parse($teacher['joining_date_at'])->format('Y-m-d') : null,
                    'status' => Status::ACTIVE,
                ];
                $this->hostelStaffRepository->updateOrCreate($conditionData, $dataArray);
            }
            return redirect()->back()->with('message', 'Staff Assign successfully.');
        } else {
            return redirect()->back()->with('error', 'Something error');
        }
    }

    /**
     * deallocation
     */
    public function deallocation(Request $request): Response
    {

        $studentId = '';
        $classroomId = '';
        $currentAllocationDataDetails = [];
        $prevAllocationDataDetails = [];
        if ($request->isMethod('post')) {
            // dd($request);
            $studentId = $request->input('student_id');
            $classroomId = $request->input('classroom_id');

            if (!empty($studentId)) {
                // current allocation data
                $currentAllocation = $this->hostelRepository->getCurrentAllocationByStudentId($studentId);
                // dd($currentAllocation);
                if (!empty($currentAllocation)) {
                    $roomData = $this->hostelInfraLevelRepository->getById($currentAllocation->hostel_infra_level_id);
                    $currentAllocationData = $roomData->load(['room.floor', 'room.roomType']);
                    $currentAllocationDataDetails = [
                        'location_path' => $currentAllocationData?->room?->floor?->name . ' -> ' . $currentAllocationData?->room?->name . ' -> ' . $currentAllocationData?->name,
                        'room_type' => $currentAllocationData?->room?->roomType?->title,
                        'is_current_data' => true,
                    ];
                }

                // previous allocation data
                $previousAllocations = $this->hostelRepository->getPreviousAllocationByStudentId($studentId);
                if (!empty($previousAllocations)) {
                    foreach ($previousAllocations as $preAllocation) {
                        $prevRoomData = $this->hostelInfraLevelRepository->getById($preAllocation->hostel_infra_level_id);
                        $prevAllocationData = $prevRoomData->load(['room.floor.floor', 'room.roomType']);
                        $prevAllocationDataDetails[] =  [
                            'location_path' => $prevAllocationData?->room?->floor?->name . ' -> ' . $prevAllocationData?->room?->name . ' -> ' . $prevAllocationData?->name,
                            'room_type' => $prevAllocationData?->room?->roomType?->title,
                            'joining_date_at' => $preAllocation?->joining_date_at,
                        ];
                    }
                }
                // dd($currentAllocationDataDetails, $prevAllocationDataDetails);
            }
        }

        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        // student
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(fn ($student) => [
            'id' => $student->id,
            'classroom_id' => $student->classroom_id,
            'title' => $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name . ' - ' . $student->boarding_type,
            'admission_no' => $student->admission_no,
        ])->all();

        return Inertia::render('Hostel/Deallocation', [
            'classrooms' => $classrooms,
            'students' => $students,
            'currentAllocationData' => $currentAllocationDataDetails,
            'prevAllocationData' => $prevAllocationDataDetails,
            'studentId' => $studentId,
            'classroomId' => $classroomId,
        ]);
    }

    /**
     * deallocationSave
     */
    public function deallocationSave(Request $request)
    {
        $classroomId = $request->input('classroom_id');
        $studentId = $request->input('student_id');
        if (!empty($classroomId) && !empty($studentId)) {
            $currentAllocationStudent = $this->hostelRepository->getCurrentAllocationByStudentId($studentId);
            if (!empty($currentAllocationStudent)) {
                $deallocated = $this->hostelRepository->update(
                    $currentAllocationStudent->id,
                    [
                        'is_current' => false,
                        'deallocation_date_at' => !empty($request->input('deallocation_date_at')) ? \Carbon\Carbon::parse($request->input('deallocation_date_at'))->format('Y-m-d') : null,
                        'note' => $request->input('write_note'),
                    ]
                );
                if (!empty($deallocated)) {
                    return redirect()->back()->with('message', 'Deallocated successfully');
                }
            }
        }
    }

    /**
     * Display the hostel Fee Group.
     */
    public function hostelFeeGroup(Request $request): Response
    {
        $feeTypes = $this->feeTypeRepository->getActiveIdName();
        $feeTypeData = $feeTypes->map(fn ($feeType) => [
            'id' => $feeType?->id,
            'title' => $feeType?->display_name,
        ])->all();

        $hostelFees = $this->hostelFeeRepository->getActiveAll();

        return Inertia::render('Hostel/HostelFeeGroup', [
            'feeTypeData' => $feeTypeData,
            'hostelFees' => $hostelFees,
        ]);
    }

    /**
     * hostelFeeGroupSave
     */
    public function hostelFeeGroupSave(HostelFeeRequest $request)
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? null,
            'description' => $input['description'] ?? null,
            'total' => $input['total'] ?? null,
            'status' => Status::ACTIVE,
        );
        $hostelFee = $this->hostelFeeRepository->create($dataArray);
        if (!empty($hostelFee['id'])) {
            if (!empty($input['hostel_fee_types'])) {
                foreach ($input['hostel_fee_types'] as $fee) {
                    $conditionData = [
                        'school_id' => getUserSchoolId(),
                        'hostel_fee_id' => $hostelFee['id'],
                        'fee_type_id' => $fee['fee_type_id'],
                    ];
                    $feeTypeArr =  [
                        'school_id' => getUserSchoolId(),
                        'hostel_fee_id' => $hostelFee['id'],
                        'fee_type_id' => $fee['fee_type_id'],
                        'amount' => $fee['amount'],
                        'status' => Status::ACTIVE,
                    ];
                    $this->hostelFeeRepository->updateOrCreateHostelFeeType($conditionData, $feeTypeArr);
                }
                return redirect()->route('hostel.fee_group')->with('message', 'Save successfully');
            }
        } else {
            return redirect()->route('hostel.fee_group')->with('error', 'Something goes to wrong');
        }
    }

    /**
     * hostelFeeGroupUpdate
     */
    public function hostelFeeGroupUpdate(HostelFeeRequest $request, $id)
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? null,
            'description' => $input['description'] ?? null,
            'total' => $input['total'] ?? null,
            'status' => Status::ACTIVE,
        );
        $this->hostelFeeRepository->update($id, $dataArray);
        if (!empty($input['hostel_fee_types'])) {
            foreach ($input['hostel_fee_types'] as $fee) {
                $conditionData = [
                    'school_id' => getUserSchoolId(),
                    'hostel_fee_id' => $id,
                    'fee_type_id' => $fee['fee_type_id'],
                ];
                $feeTypeArr =  [
                    'school_id' => getUserSchoolId(),
                    'hostel_fee_id' => $id,
                    'fee_type_id' => $fee['fee_type_id'],
                    'amount' => $fee['amount'],
                    'status' => Status::ACTIVE,
                ];
                $this->hostelFeeRepository->updateOrCreateHostelFeeType($conditionData, $feeTypeArr);
            }
        }
        return redirect()->route('hostel.fee_group')->with('message', 'Update successfully');
    }

    /**
     * hostelFeeGroupEdit.
     */
    public function hostelFeeGroupEdit(Request $request)
    {
        $id = $request->input('id');
        if (!empty($id)) {
            $feeTypes = $this->feeTypeRepository->getActiveIdName();
            $feeTypeData = $feeTypes->map(fn ($feeType) => [
                'id' => $feeType?->id,
                'title' => $feeType?->display_name,
            ])->all();

            $hostelFees = $this->hostelFeeRepository->getActiveAll();

            $hostelFee = $this->hostelFeeRepository->getById($id);
            if (!empty($hostelFee)) {
                $hostelFee?->load(['hostelFeeTypes']);
            }

            return Inertia::render('Hostel/EditHostelFeeGroup', [
                'feeTypeData' => $feeTypeData,
                'hostelFees' => $hostelFees,
                'hostelFee' => $hostelFee,
            ]);
        } else {
            return redirect()->route('hostel.fee_group');
        }
    }

    /**
     * hostelFeeGroupDestroy
     */
    public function hostelFeeGroupDestroy(int $id): RedirectResponse
    {
        $hostelFee = $this->hostelFeeRepository->getById($id);
        if (!empty($hostelFee)) {
            if (!empty($hostelFee?->hostelFeeTypes)) {
                foreach ($hostelFee?->hostelFeeTypes as $hostelFeeType) {
                    $this->hostelFeeRepository->deleteHostelFeeType($hostelFeeType->id);
                }
            }
            $this->hostelFeeRepository->delete($id);
            return redirect()->route('hostel.fee_group')->with('message', 'Deleted successfully.');
        } else {
            return redirect()->route('hostel.fee_group')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * hostelVoucher
     */
    public function hostelVoucher(Request $request): Response
    {
        $siteSettingHostel = getSiteSettingDataByType('Hostel');

        // next get pass number
        $lastNumber = $this->hostelFeeRepository->getHostelVoucherLastId();
        $installmentNo = $lastNumber + 1;

        // get hostel voucher
        $hostelVoucher = $this->hostelFeeRepository->getActiveAllHostelVoucher();

        return Inertia::render('Hostel/HostelVoucher', [
            // 'hostels' => $hostels,
            'hostelVoucherSetting' => !empty($siteSettingHostel['Hostel']) ? $siteSettingHostel['Hostel'] : [],
            'installmentNo' => $installmentNo,
            'hostelVoucher' => $hostelVoucher,
        ]);
    }

    /**
     * hostelVoucherSave
     */
    public function hostelVoucherSave(Request $request): RedirectResponse
    {
        $input = $request->validate(
            [
                'id' => ['nullable', 'integer'],
                'school_id' => ['nullable', 'integer'],
                'academic_year_id' => ['nullable', 'integer'],
                'title' => ['required', 'string'],
                'start_date_at' => ['required', 'date'],
                'end_date_at' => ['required', 'date'],
                'description' => ['nullable', 'string'],
                'status' => ['nullable', 'string'],
            ]
        );
        $conditionData = array(
            'id' => $input['id'] ?? null,
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId()
        );
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? null,
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : null,
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        );
        $this->hostelFeeRepository->updateOrCreateHostelVoucher($conditionData, $dataArray);
        return redirect()->back()->with('message', 'Save successfully.');
    }

    /**
     * hostelVoucherDestroy
     */
    public function hostelVoucherDestroy(int $id): RedirectResponse
    {
        $hostelFee = $this->hostelFeeRepository->getByHostelVoucherId($id);
        if (!empty($hostelFee)) {
            $this->hostelFeeRepository->deleteHostelVoucher($id);
            return redirect()->route('hostel.voucher')->with('message', 'Deleted successfully.');
        } else {
            return redirect()->route('hostel.voucher')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the assign Hostel Fee.
     */
    public function assignHostelFee(Request $request): Response
    {

        // class name
        $classNameData = $this->classroomRepository->getActiveClassNameAll();
        $classNames = $classNameData->map(fn ($className) => [
            'id' => $className->id,
            'title' => $className->title
        ])->all();

        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => [
            'id' => $classroom->id,
            'title' => $classroom->title,
            'class_name_id' => $classroom->class_name_id
        ])->all();

        // hostel fee
        $hostelFees = $this->hostelFeeRepository->getActiveAllNameId();
        $hostelFeeData = $hostelFees->map(fn ($hostelFee) => [
            'id' => $hostelFee->id,
            'title' => $hostelFee->title
        ])->all();

        // hotel voucher
        $hostelVoucherData = $this->hostelFeeRepository->getActiveAllHostelVoucherNameId();

        // students
        $studentData = $this->studentRepository->getStudentData();
        if (!empty($studentData)) {
            $studentData?->load([
                'classroom' => function ($query) {
                    $query->select('id', 'title');
                }
            ]);
        }

        return Inertia::render('Hostel/AssignHostelFee', [
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'hostelFeeData' => $hostelFeeData,
            'hostelVoucherData' => $hostelVoucherData,
            'studentData' => $studentData,
        ]);
    }

    /**
     * assignHostelFeeSave
     */
    public function assignHostelFeeSave(HostelVoucherRequest $request)
    {

        $input = $request->validated();

        $conditionData = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'hostel_fee_id' => $input['hostel_fee_id'] ?? null,
        ];

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'hostel_fee_id' => $input['hostel_fee_id'] ?? null,
            'is_voucher' => true,
            'is_student' => true,
            'status' => Status::ACTIVE->value,
        );

        $selectedVouchers = $input['selected_vouchers'];
        $selectedStudents = $input['selected_students'];

        if (!empty($selectedVouchers)) {
            foreach ($selectedVouchers as $voucherId) {
                $conditionData['hostel_voucher_id'] = $voucherId['voucher_id'];
                $dataArray['hostel_voucher_id'] = $voucherId['voucher_id'];
                if (!empty($selectedStudents)) {
                    foreach ($selectedStudents as $studentId) {
                        $conditionData['student_id'] = $studentId['student_id'];
                        $dataArray['student_id'] = $studentId['student_id'];
                        $this->hostelFeeRepository->updateOrCreateHostelVoucherStudent($conditionData, $dataArray);
                    }
                }
            }
            return redirect()->route('hostel.assign_fee')->with('message', 'Save successfully');
        }
    }


    /**
     * hostelGatePass
     */
    public function hostelGatePass(Request $request): Response
    {
        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        // student
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(fn ($student) => [
            'id' => $student->id,
            'classroom_id' => $student->classroom_id,
            'title' => $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name,
            'phone' => $student->phone,
            'email' => $student->email,
        ])->all();

        // guardianData
        $guardianData = $this->guardianRepository->getGuardianData();

        // get pass data
        $studentGatePass =  $this->gatePassRepository->getActiveAll();
        if (!empty($studentGatePass)) {
            $studentGatePass?->load(
                [
                    'student' => function ($query) {
                        $query->select('id', 'first_name', 'middle_name', 'last_name');
                    },
                    'classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'visitorImage'
                ]
            );
        }

        // next get pass number
        $lastNumber = $this->gatePassRepository->getLastId();
        $gateNextNo =  $lastNumber + 1;

        return Inertia::render('Hostel/HostelGatePass', [
            'classrooms' => $classrooms,
            'students' => $students,
            'guardianData' => $guardianData,
            'studentGatePass' => $studentGatePass,
            'gateNextNo' => $gateNextNo,
        ]);
    }

    /**
     * save
     */
    public function hostelGatePassSave(StudentGatePassRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'student_id' => $input['student_id'] ?? null,
            'relation_type' => $input['relation_type'] ?? null,
            'visiting_person' => $input['visiting_person'] ?? null,
            'phone' => $input['phone'] ?? null,
            'email' => $input['email'] ?? null,
            'in_date_at' => !empty($input['in_date_at']) ? \Carbon\Carbon::parse($input['in_date_at'])->format('Y-m-d') : null,
            'out_date_at' => !empty($input['out_date_at']) ? \Carbon\Carbon::parse($input['out_date_at'])->format('Y-m-d') : null,
            'in_time_at' =>  !empty($input['in_time_at']) ? \Carbon\Carbon::parse($input['in_time_at'])->format('H:i:s') : null,
            'out_time_at' =>  !empty($input['out_time_at']) ? \Carbon\Carbon::parse($input['out_time_at'])->format('H:i:s') : null,
            'reason_gate_pass' => $input['reason_gate_pass'] ?? null,
            'status' => Status::ACTIVE,
        );
        $studentGatePass = $this->gatePassRepository->create($dataArray);

        if (!empty($studentGatePass['id'])) {

            if (!empty($request->file('visitor_photo'))) {
                $image_url = $this->_upload->uploadImage($request, 'visitor_photo', 'gate_pass_visitor_photo');
            } else {
                $image_url = 'no image';
            }

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\StudentGatePass::class,
                'imageable_id' => $studentGatePass['id'],
                'name' => 'visitor_photo',
                'path' => $image_url,
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->morphCreate($dataImage, $studentGatePass['id']);
        }

        if (!$studentGatePass) {
            return redirect()->route('hostel.gate_pass')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('hostel.gate_pass')->with('message', 'Generate gate pass successfully.');
    }

    /**
     * gatePassClassWise
     */
    public function gatePassClassWise(Request $request): Response
    {
        $classroomId = '';
        $gatePass = [];
        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $gatePass = $this->gatePassRepository->getGatePassByClassroomId($classroomId);
            if (!empty($gatePass)) {
                $gatePass?->load(
                    [
                        'student' => function ($query) {
                            $query->select('id', 'first_name', 'middle_name', 'last_name');
                        },
                        'classroom' => function ($query) {
                            $query->select('id', 'title');
                        },
                    ]
                );
            }
        }

        // classroom
        $classroomWithGatePass =  [];
        $classrooms = $this->classroomRepository->getActiveNameAndId()?->loadCount('studentGatePass');
        if (!empty($classrooms)) {
            foreach ($classrooms as $classRoom) {
                if ($classRoom?->student_gate_pass_count > 0) {
                    $classroomWithGatePass[] = $classRoom;
                }
            }
        }
        return Inertia::render('Hostel/GatePassClassWise', [
            'classroomData' => $classroomWithGatePass,
            'gatePass' => $gatePass,
        ]);
    }

}
