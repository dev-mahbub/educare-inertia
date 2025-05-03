<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\HostelType;
use Illuminate\Http\Request;
use App\Services\StudentService;
use App\Repositories\HostelRepository;
use App\Repositories\IStudentRepository;
use App\Http\Requests\StudentHostelRequest;

class StudentHostelController extends Controller
{

    public function __construct(
        private HostelRepository $hostelRepository,
        private IStudentRepository $studentRepository,
        private StudentService  $studentService
    ) {}

    /**
     * Show Hostel create Page
     */
    public function index(Request $request)
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $hostelRequests = [];

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $hostelRequests = $this->hostelRepository->getHostelRequestByStudentId($studentId);
            }
        }

        $hostelRequests = $this->hostelRepository->getHostelRequestByStudentId($studentId);

        return Inertia::render('Student/HostelRequestList', [
            'students' => $students,
            'studentId' => $studentId,
            'hostelRequests' => $hostelRequests,
        ]);
    }

    public function createRequest(Request $request)
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);

        $hostelTypes = buildEnumOptionsArray(HostelType::cases());
        return Inertia::render('Student/HostelRequestCreate', [
            'students' => $students,
            'studentId' => $studentId,
            'hostelTypes' => $hostelTypes,
        ]);
    }

    public function storeRequest(StudentHostelRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'student_id' => $input['student_id'] ?? "",
            'hostel_type' => $input['hostel_type'] ?? "",
            'note' => $input['note'] ?? '',
            'applied_date' => !empty($input['applied_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['applied_date'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d')
        );

        $hostelRequest = $this->hostelRepository->createStudentHostel($dataArray);
        return redirect()->route('student_hostel.list')->with('message', 'Hostel Request Submited Successfully');
    }
}
