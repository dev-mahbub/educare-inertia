<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Repositories\IUserRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\ITransportRepository;
use App\Services\StudentService;

class DashboardController extends Controller
{
    private $_upload;
    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IStudentRepository $studentRepository,
        private ITransportRepository $transportRepository,
        private IStaffRepository $staffRepository,
        private IGuardianRepository $guardianRepository,
        private IUserRepository $userRepository,
        private StudentService  $studentService
    ) {
        $this->_upload = new UploadFileController();
    }

    /**
     * Display dashboard.
     */
    public function index(Request $request): Response
    {
        $studentCounts = $this->studentRepository->getStudentCounts();
        $staffCounts = $this->staffRepository->getMisReportCounts();
        $transportCounts = $this->transportRepository->getMisReportCounts();
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        if (in_array('Parent', $userRoles)) {
            $students = $this->studentService->getParentStudents($userRoles);
        }

        return Inertia::render('Dashboard', [
            'studentCounts' => $studentCounts,
            'staffCounts' => $staffCounts,
            'transportCounts' => $transportCounts,
            'students' => $students,
            'studentId' => $studentId,
        ]);
    }

    public function index_old(Request $request): Response
    {
        $studentCounts = $this->studentRepository->getStudentCounts();
        $staffCounts = $this->staffRepository->getMisReportCounts();
        $transportCounts = $this->transportRepository->getMisReportCounts();

        // for parent start
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();

        if (in_array('Parent', $userRoles)) {
            $students = $this->studentRepository->getStudentsByParentUserId(auth()->user()->id);

            if (count($students) > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->latestClassroomStudent?->classroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->latestClassroomStudent?->classroom?->id;
                        $student['classroom'] = $student?->latestClassroomStudent?->classroom;
                    }

                    $classroomId = $student?->classroom_id;

                    $student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId)
                                ->select(
                                    'id',
                                    'student_id',
                                    'roll_no',
                                );
                        },
                    ]);

                    $student['title'] = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }
        }
        // for parent end
        return Inertia::render('Dashboard', [
            'studentCounts' => $studentCounts,
            'staffCounts' => $staffCounts,
            'transportCounts' => $transportCounts,
            'students' => $students,
            'studentId' => $studentId,
        ]);
    }
}
