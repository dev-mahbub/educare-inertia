<?php

namespace App\Http\Controllers;

use App\Http\Requests\HostelRequest;
use App\Repositories\HostelRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IHostelInfraLevelRepository;
use App\Repositories\IHostelRepository;
use App\Repositories\IHostelStaffRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class HostelReportController extends Controller
{

    public function __construct(
        private IHostelRepository $hostelRepository,
        private IHostelInfraLevelRepository $IHostelInfraLevelRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IHostelStaffRepository $hostelStaffRepository,
    ) {
        $this->middleware('permission:view hostel', ['only' => ['hostelClassSummaryReport', 'hostelAllocationReport', 'hostelDeallocationReport', 'hostelStaffAllocationReport']]);
    }

    /**
     * hostelClassSummaryReport
     */
    public function hostelClassSummaryReport(Request $request): Response
    {

        $studentDetails = [];
        $classRoomsWithStudents = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            if (!empty($students)) {
                $students->load(['father', 'classroom', 'classroomRoll', 'hostelStudentAllocation.hostelInfraLabel.room.floor']);
                if (!empty($students)) {
                    foreach ($students as $student) {
                        $studentDetails[] = [
                            'admission_no' => $student?->admission_no,
                            'student_name' => getCocatenationTitle($student?->first_name, $student?->middle_name,  $student?->last_name),
                            'father_name' => getCocatenationTitle($student?->father?->first_name, $student?->father?->middle_name,  $student?->father?->last_name),
                            'father_phone' => $student?->father?->phone,
                            'is_allocated' => $student?->hostelStudentAllocation ? 'Yes' : 'No',
                            'location_path' => $student?->hostelStudentAllocation ? $student?->hostelStudentAllocation?->hostelInfraLabel?->room?->floor?->name . ' -> ' . $student?->hostelStudentAllocation?->hostelInfraLabel?->room?->name . ' -> ' . $student?->hostelStudentAllocation?->hostelInfraLabel?->name : 'Not Allocated',
                        ];
                    }
                }
            }
        }

        // classroom
        $classrooms = $this->classroomRepository->getActiveNameAndId()?->loadCount('students');
        if (!empty($classrooms)) {
            foreach($classrooms as $classRoom){
                if ($classRoom?->students_count > 0){
                    $classRoomsWithStudents[] = $classRoom;
                }
            }
        }

        // dd($classRoomsWithStudents);

        return Inertia::render('HostelReport/HostelClassSummaryReport', [
            'classroomData' => $classRoomsWithStudents,
            'studentDetails' => $studentDetails,
        ]);
    }

    /**
     * hostelAllocationReport
     */
    public function hostelAllocationReport(Request $request): Response
    {

        $studentDetails = [];
        $classroomNames = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
        } else {
            $students = $this->studentRepository->getStudentData();
        }

        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classroomNames = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        if (!empty($students)) {
            $students->load(['father', 'classroom', 'classroomRoll', 'hostelStudentAllocation.hostelInfraLabel.room.floor']);
            if (!empty($students)) {
                foreach ($students as $student) {
                    $studentDetails[] = [
                        'student_name' => getCocatenationTitle($student?->first_name, $student?->middle_name,  $student?->last_name),
                        'admission_no' => $student?->admission_no,
                        'father_name' => getCocatenationTitle($student?->father?->first_name, $student?->father?->middle_name,  $student?->father?->last_name),
                        'father_phone' => $student?->father?->phone,
                        'classroom_title' => $student?->classroom?->title,
                        'roll_no' => $student?->classroomRoll?->roll_no,
                        'joining_date_at' => $student?->hostelStudentAllocation?->joining_date_at,
                        'is_allocated' => $student?->hostelStudentAllocation ? 'Yes' : 'No',
                        'location_path' => $student?->hostelStudentAllocation ? $student?->hostelStudentAllocation?->hostelInfraLabel?->room?->floor?->name . ' -> ' . $student?->hostelStudentAllocation?->hostelInfraLabel?->room?->name . ' -> ' . $student?->hostelStudentAllocation?->hostelInfraLabel?->name : 'Not Allocated',
                    ];
                }
            }
        }

        return Inertia::render('HostelReport/HostelAllocationReport', [
            'studentDetails' => $studentDetails,
            'classroomNames' => $classroomNames,
        ]);
    }

    /**
     * hostelDeallocationReport
     */
    public function hostelDeallocationReport(Request $request): Response
    {
        $studentDetails = [];
        $classroomNames = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $deallocationStudents = $this->hostelRepository->getPreviousAllocationByClassroomId($classroomId);
        } else {
            $deallocationStudents = $this->hostelRepository->getPreviousAllocation();
        }

        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classroomNames = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        if (!empty($deallocationStudents)) {
            $deallocationStudents?->load(['student.classroomRoll', 'student.classroom', 'hostelInfraLabel.room.floor']);
            if (!empty($deallocationStudents)) {
                foreach ($deallocationStudents as $student) {
                    $studentDetails[] = [
                        'student_name' => getCocatenationTitle($student?->student?->first_name, $student?->student?->middle_name,  $student?->student?->last_name),
                        'admission_no' => $student?->student?->admission_no,
                        'classroom_title' => $student?->student?->classroom?->title,
                        'roll_no' => $student?->student?->classroomRoll?->roll_no,
                        'joining_date_at' => $student?->joining_date_at,
                        'deallocation_date_at' => $student?->deallocation_date_at,
                        'is_current' => $student?->is_current,
                        'location_path' => $student?->hostelInfraLabel ? $student?->hostelInfraLabel?->room?->floor?->name . ' -> ' . $student?->hostelInfraLabel?->room?->name . ' -> ' . $student?->hostelInfraLabel?->name : 'Not Allocated',
                        'note' => $student?->note,
                    ];
                }
            }
        }

        // dd($studentDetails);

        return Inertia::render('HostelReport/HostelDeallocationReport', [
            'classroomNames' => $classroomNames,
            'studentDetails' => $studentDetails,
        ]);
    }

    /**
     * hostelStaffAllocationReport
     */
    public function hostelStaffAllocationReport(Request $request): Response
    {
        $hostelStaffReportDetails = [];
        $hostelStaffReport = $this->hostelStaffRepository->getAllActiveHostelStaff();
        if (!empty($hostelStaffReport)) {
            $hostelStaffReport?->load(['hostelInfraLabel', 'staff']);
            foreach ($hostelStaffReport as $staff) {
                $hostelStaffReportDetails[] = [
                    'staff_name' =>  getCocatenationTitle($staff?->staff?->first_name, $staff?->staff?->middle_name, $staff?->staff?->last_name),
                    'hostel_staff_role' => $staff?->hostel_staff_role,
                    'staff_phone' => $staff?->staff?->phone,
                    'joining_date_at' => $staff?->joining_date_at,
                    'location_path' => ($staff?->hostelInfraLabel?->floor?->name ? $staff->hostelInfraLabel?->floor?->name . ' -> ' : '') . $staff->hostelInfraLabel?->name,
                ];
            }
        }
        return Inertia::render('HostelReport/HostelStaffAllocationReport', [
            'hostelStaffReport' => $hostelStaffReportDetails,
        ]);
    }
}
