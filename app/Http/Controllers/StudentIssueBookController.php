<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\StudentService;
use App\Repositories\IBookRepository;
use App\Repositories\IStudentRepository;

class StudentIssueBookController extends Controller
{
    public function __construct(
        private IBookRepository $bookRepository,
        private IStudentRepository $studentRepository,
        private StudentService  $studentService
    )
    {
        // $this->middleware('permission:view issue book', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        $ebookList = $this->bookRepository->getActiveAllEBook();
        if (!empty($ebookList)) {
            $ebookList->load(
                [
                    'bookCategory' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'document', 'file'
                ]
            );
        }

        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $issuedBookLists = collect([]);

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $issuedBookLists = $this->bookRepository->getIssuedBookListByStudentAndClassRoomId($studentId, $selectedStudent->promotedClassroom->id);
            }
        }
        
        return Inertia::render('StudentIssueBook/Index', [
            'ebookList' => $ebookList,
            'issuedBookLists' => $issuedBookLists,
            'students' => $students,
            'studentId' => $studentId,
        ]);
    }
}
