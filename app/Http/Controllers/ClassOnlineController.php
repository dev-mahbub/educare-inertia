<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\ClassroomRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\OnlineClassRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\OnlineAttendanceRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomAttendanceRepository;

class ClassOnlineController extends Controller
{

    public function __construct(
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IStaffRepository $staffRepository,
        private IStudentRepository $studentRepository,
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
    ) {
        $this->middleware('permission:view online class', ['only' => ['index', 'showToday', 'onlineClassAttendance']]);
        $this->middleware('permission:add online class', ['only' => ['create', 'save', 'assignClassTeacher', 
            'saveClassTeacher', 'saveOnlineClassAttendance']
        ]);
        $this->middleware('permission:edit online class', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete online class', ['only' => ['destroy']]);
    }

    /**
     * Display Online Class.
     */
    public function index(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $academicYearId = null;
        $classroomId = null;
        $subjectId = null;
        $startDate = "";
        $endDate = "";
        $classrooms = [];
        $subjects = [];
        $online_classes = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";

            if (!empty($classroomId)) {
                $classroom = $this->classroomRepository->getClassroomById($classroomId);
                $academicYearId = $classroom?->academic_year_id;
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            }

            if (!empty($classroomId) && !empty($subjectId)) {
                $online_classes = $this->classroomRepository->getOnlineClasses($classroomId, $subjectId, $startDate, $endDate, null, $academicYearId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId) && !empty($teacherId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }

            if (!empty($classroomId) && !empty($subjectId)) {
                $online_classes = $this->classroomRepository->getOnlineClasses($classroomId, $subjectId, $startDate, $endDate, $userId, $academicYearId);
            }
        }

        if (count($online_classes) > 0) {
            $online_classes = $online_classes->map(function ($onlineClass) {
                $onlineClass['repeatable_days'] = !empty($onlineClass->repeatable_days) ? implode(',', json_decode($onlineClass->repeatable_days)) : null;

                return $onlineClass;
            });
        }

        return Inertia::render('ClassOnline/Show', [
            'online_classes' => $online_classes,
            'classrooms' => $classrooms,
            'subjects' => $subjects
        ]);
    }

    /**
     * Display Today Online Class.
     */
    public function showToday(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $academicYearId = null;
        $classroomId = null;
        $subjectId = null;
        $classrooms = [];
        $subjects = [];
        $today_online_class = [];
        $currentDate = Carbon::now()->format('Y-m-d H:i:s');

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;

            if (!empty($classroomId)) {
                $classroom = $this->classroomRepository->getClassroomById($classroomId);
                $academicYearId = $classroom?->academic_year_id;
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            }

            if (!empty($classroomId) && !empty($subjectId)) {
                $today_online_class = $this->classroomRepository->getTodayOnlineClasses($classroomId, $subjectId, null, $academicYearId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId) && !empty($teacherId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }

            if (!empty($classroomId) && !empty($subjectId)) {
                $today_online_class = $this->classroomRepository->getTodayOnlineClasses($classroomId, $subjectId, $userId, $academicYearId);
            }
        }

        if (count($today_online_class) > 0) {
            $today_online_class = $today_online_class->map(function ($onlineClass) {
                $onlineClass['repeatable_days'] = !empty($onlineClass->repeatable_days) ? implode(',', json_decode($onlineClass->repeatable_days)) : null;

                return $onlineClass;
            });
        }

        return Inertia::render('ClassOnline/ShowToday', [
            'today_online_class' => $today_online_class,
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'currentDate' => $currentDate
        ]);
    }


    /**
     * schedule class.
     */
    public function create(Request $request): Response
    {
        $dayTitles = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        $classrooms = [];
        $subjects = [];

        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value]) && !empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId) && !empty($classroomId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        return Inertia::render('ClassOnline/CreateOnline', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'dayTitles' => $dayTitles,
        ]);
    }

    /**
     * save schedule class
     */
    public function save(OnlineClassRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $classroom = $this->classroomRepository->getClassroomById($input['classroom_id']);

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' =>  $classroom?->academic_year_id ?? getAcademicYearId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'user_id' => auth()->user()->id,
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
            'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
            'live_class_url' => $input['live_class_url'] ?? '',
            'notes' => $input['notes'] ?? null,
            'repeat_date' => !empty($input['repeat_date']) ?  Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['repeat_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'repeatable_days' => !empty($input['repeat_date']) && !empty($input['repeatable_days']) ? json_encode($input['repeatable_days']) : null,
            'status' => Status::ACTIVE,
        ];

        $onlineClass = $this->classroomRepository->createOnlineClass($dataArray);

        if (!$onlineClass) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }

        return redirect()->route('online_class.list')->with('message', 'Class scheduled successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function assignClassTeacher(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('ClassOnline/AssignClassTeacher', [
            'classrooms' => $classrooms,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function saveClassTeacher(ClassroomRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : 0,
            'board_id' => !empty($input['board_id']) ? intval($input['board_id']) : 0,
            'country_id' => !empty($input['country_id']) ? intval($input['country_id']) : 0,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : 0,
            'timezone_id' => !empty($input['timezone_id']) ? intval($input['timezone_id']) : 0,
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'status' => Status::ACTIVE,
        );

       // $school = $this->classroomRepository->create();

        return Redirect::route('classroom.list');
    }

    /**
     * Edit Online Class.
     */
    public function edit(int $id, Request $request)
    {
        $dayTitles = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        $classrooms = [];
        $subjects = [];
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $online_class = null;

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $online_class = $this->classroomRepository->getOnlineClassById($id);
        } else if ($role == UserRole::SITE_TEACHER->value) {
            $online_class = $this->classroomRepository->getOnlineClassById($id, $userId);
        }

        abort_if(empty($online_class), 404);

        $online_class['repeatable_days'] = !empty($online_class->repeatable_days) ? json_decode($online_class->repeatable_days) : [];

        $classroomId = $online_class?->classroom_id;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value]) && !empty($classroomId)) {
            $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId) && !empty($classroomId)) {
            $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        return Inertia::render('ClassOnline/EditOnline', [
            'online_class' => $online_class,
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'dayTitles' => $dayTitles,
        ]);
    }

    /**
     * Update Online Class
     */
    public function update(OnlineClassRequest $request, int $id): RedirectResponse
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $onlineClass = null;

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $onlineClass = $this->classroomRepository->getOnlineClassById($id);
        } else if ($role == UserRole::SITE_TEACHER->value) {
            $onlineClass = $this->classroomRepository->getOnlineClassById($id, $userId);
        }

        abort_if(empty($onlineClass), 404);

        $input = $request->validated();

        $dataArray = [
            'classroom_id' => $input['classroom_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
            'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
            'live_class_url' => $input['live_class_url'] ?? '',
            'notes' => $input['notes'] ?? null,
        ];

        $updateOnlineClass = $this->classroomRepository->updateOnlineClass($id, $dataArray);

        if (!$updateOnlineClass) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }

        return redirect()->route('online_class.list')->with('message', 'Class schedule updated successfully.');
    }

    /**
     * Delete Online Class.
     */
    public function destroy($id): RedirectResponse
    {
        $deleteOnlineClass = $this->classroomRepository->deleteOnlineClass($id);

        if (!$deleteOnlineClass) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Online class deleted successfully.');
    }

    /*
    * Online Class Attendance
    */
    public function onlineClassAttendance(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classrooms = [];
        $subjects = [];
        $studentAttendances = [];
        $classroomId = null;
        $subjectId = null;
        $attendanceDate = "";
        $currentDate = Carbon::now()->format('d-M-Y');

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $attendanceDate = !empty($request->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";

            if (!empty($classroomId) && !empty($subjectId) && !empty($attendanceDate)) {
                $classroom = $this->classroomRepository->getClassroomById($classroomId);
                $academicYearId = $classroom?->academic_year_id;

                $students = $this->studentRepository->getStudentsForOnlineAttendance($classroomId, $academicYearId);
                $onlineAttendance = $this->classroomAttendanceRepository->getOnlineAttendance($classroomId, $subjectId, $attendanceDate, $academicYearId);
                $attendances = !empty($onlineAttendance?->students) ? json_decode($onlineAttendance->students) : [];

                if (count($students) > 0) {
                    $students = $students->sortBy(function ($student) {
                        return $student?->classroomRoll?->roll_no;
                    });

                    foreach ($students as $student) {
                        $tempArr = [
                            'student_id' => $student?->id,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'first_name' => $student?->first_name,
                            'middle_name' => $student?->middle_name,
                            'last_name' => $student?->last_name,
                            'attendance_status' => "",
                        ];

                        if (count($attendances) > 0) {
                            foreach ($attendances as $attendance) {
                                if (!empty($attendance->student_id) && $attendance->student_id == $student?->id) {
                                    $tempArr['attendance_status'] = $attendance->attendance_status ?? "";
                                }
                            }
                        }

                        $studentAttendances[] = $tempArr;
                    }
                }
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }
        }

        return Inertia::render('ClassOnlineAttendance/Show', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'studentAttendances' => $studentAttendances,
            'currentDate' => $currentDate
        ]);
    }

    /*
    *  save online class attendance
    */
    public function saveOnlineClassAttendance(OnlineAttendanceRequest $request)
    {
        $input = $request->validated();

        $classroom = $this->classroomRepository->getClassroomById($input['classroom_id']);
        $academicYearId = $classroom?->academic_year_id;

        $attributesToCheck = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => $academicYearId,
            'classroom_id' => $input['classroom_id'],
            'subject_id' => $input['subject_id'],
            'attendance_date' => !empty($input['attendance_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : "",
        ];

        $valuesToUpdate = [
            'created_by' => auth()->user()->id,
            'students' => !empty($input['students']) ? json_encode($input['students']) : null,
            'status' => Status::ACTIVE
        ];

        $onlineAttendance = $this->classroomAttendanceRepository->updateOrCreateOnlineAttendance($attributesToCheck, $valuesToUpdate);

        if ($onlineAttendance) {
            return redirect()->back()->with('message', 'Attendance taken successfully');
        }

        return redirect()->back()->with('error', 'Something goes wrong');
    }
}
