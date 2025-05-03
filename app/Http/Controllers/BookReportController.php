<?php

namespace App\Http\Controllers;

use App\Repositories\IBookRepository;
use App\Repositories\IAuthorRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookReportController extends Controller
{

    public function __construct(
        private IBookRepository $bookRepository,
        private IAuthorRepository $authorRepository,
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view library', ['only' => ['teacherIssuedBookReport', 'teacherWiseBookReport', 'teacherBookTransactionReport', 'teacherDueBookReport', 
            'studentIssuedBookReport', 'studentWiseBookReport', 'studentBookTransactionReport', 'studentDueBookReport',
            'studentBookWiseReport', 'studentLateFineReport'
        ]]);
    }

    /**
     * teacher issued book report
     */
    public function teacherIssuedBookReport(Request $request): Response
    {
        $staff_id = null;
        if ($request->isMethod('post')) {
            $staff_id = $request->input('staff_id') ?? null;
        }
        $teacherIssuesBook = $this->bookRepository->getActiveAllTeacherIssuesBookByStaffId($staff_id);

        // teacher name
        $teachers = $this->staffRepository->getActiveTeacherNameId();
        $teacherData = $teachers->map(
            fn ($teacher) =>
            [
                'id' => $teacher->id,
                'title' => getCocatenationTitle($teacher->first_name, $teacher->middle_name, $teacher->last_name),
            ]
        )->all();

        return Inertia::render('BookReport/TeacherIssuedBookReport', [
            'teacherIssuesBook' => $teacherIssuesBook,
            'teacherData' => $teacherData,
        ]);
    }

    /**
     * teacher Wise book report
     */
    public function teacherWiseBookReport(Request $request): Response
    {
        $staff_id = null;
        $teacherBookReport = [];

        if ($request->isMethod('post')) {
            $staff_id = $request->input('staff_id') ?? null;
            $teacherBookReport = $this->bookRepository->getActionAllTeacherWiseBookReport($staff_id);
            // dd($teacherBookReport);
        }

        // teacher name
        $teachers = $this->staffRepository->getActiveTeacherNameId();
        $teacherData = $teachers->map(
            fn ($teacher) =>
            [
                'id' => $teacher->id,
                'title' => getCocatenationTitle($teacher->first_name, $teacher->middle_name, $teacher->last_name),
            ]
        )->all();

        return Inertia::render('BookReport/TeacherWiseBookReport', [
            'teacherBookReport' => $teacherBookReport,
            'teacherData' => $teacherData,
        ]);
    }

    /**
     * teacher book transaction report
     */
    public function teacherBookTransactionReport(Request $request): Response
    {
        $start_date_at = null;
        $end_date_at = null;

        if ($request->isMethod('post')) {
            $start_date_at = !empty($request->input('start_date_at')) ? \Carbon\Carbon::parse($request->input('start_date_at'))->format('Y-m-d') : null;
            $end_date_at = !empty($request->input('end_date_at')) ? \Carbon\Carbon::parse($request->input('end_date_at'))->format('Y-m-d') : null;
        }

        $teacherIssuesBook = $this->bookRepository->getActiveAllTeacherIssuesBook($start_date_at, $end_date_at);
        $teacherReturnBook = $this->bookRepository->getAllActiveTeacherReturnBook($start_date_at, $end_date_at);

        return Inertia::render('BookReport/TeacherBookTransactionReport', [
            'teacherIssuesBook' => $teacherIssuesBook,
            'teacherReturnBook' => $teacherReturnBook,
        ]);
    }

    /**
     * Display the schools.
     */
    public function teacherDueBookReport(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('BookReport/TeacherDueBookReport', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }


    /**
     * student issues book
     */
    public function studentIssuedBookReport(Request $request): Response
    {
        $classroom_id = null;
        $student_id = null;
        if ($request->isMethod('post')) {
            $classroom_id = $request->input('classroom_id') ?? null;
            $student_id = $request->input('student_id') ?? null;
        }

        $studentIssusBooks = $this->bookRepository->getActiveAllForReport($classroom_id, $student_id);

        // class room
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // student name
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(
            fn ($student) =>
            [
                'id' => $student->id,
                'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                'classroom_id' => $student->classroom_id,
            ]
        )->all();

        return Inertia::render('BookReport/StudentIssuedBookReport', [
            'studentIssusBooks' => $studentIssusBooks,
            'classrooms' => $classrooms,
            'students' => $students,
        ]);
    }

    /**
     * student wise book report
     */
    public function studentWiseBookReport(Request $request): Response
    {
        $classroom_id = null;
        $student_id = null;
        $studentIssusBooks = [];

        if ($request->isMethod('post')) {
            $classroom_id = $request->input('classroom_id') ?? null;
            $student_id = $request->input('student_id') ?? null;
            $studentIssusBooks = $this->bookRepository->getActiveAllForReportStudentWise($classroom_id, $student_id);
            // dd($studentIssusBooks);
        }

        // class room
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // student name
        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(
            fn ($student) =>
            [
                'id' => $student->id,
                'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                'classroom_id' => $student->classroom_id,
            ]
        )->all();

        return Inertia::render('BookReport/StudentWiseBookReport', [
            'studentIssusBooks' => $studentIssusBooks,
            'classrooms' => $classrooms,
            'students' => $students,
        ]);
    }

    /**
     * student book transaction report
     */
    public function studentBookTransactionReport(Request $request): Response
    {
        $start_date_at =  null;
        $end_date_at =  null;

        if ($request->isMethod('post')) {
            $start_date_at = !empty($request->input('start_date_at')) ? \Carbon\Carbon::parse($request->input('start_date_at'))->format('Y-m-d') : null;
            $end_date_at = !empty($request->input('end_date_at')) ? \Carbon\Carbon::parse($request->input('end_date_at'))->format('Y-m-d') : null;
        }

        $studentIssuesBooks =  $this->bookRepository->getAllActiveStudentIssueBook($start_date_at, $end_date_at);
        $studentReturnBooks =  $this->bookRepository->getAllActiveStudentReturnBook($start_date_at, $end_date_at);

        // dd($studentIssuesBooks, $studentReturnBooks);

        return Inertia::render('BookReport/StudentBookTransactionReport', [
            'studentIssuesBooks' => $studentIssuesBooks,
            'studentReturnBooks' => $studentReturnBooks,
        ]);
    }

    /**
     * Display the schools.
     */
    public function studentDueBookReport(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('BookReport/StudentDueBookReport', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }

    /**
     * student book wise report
     */
    public function studentBookWiseReport(Request $request): Response
    {
        $studentBooks = [];
        if ($request->isMethod('post')) {
            $book_acc_no = $request->input('book_acc_no');
            $studentBooks = $this->bookRepository->getActiveAllBookIssueByAccNo($book_acc_no);
        }

        return Inertia::render('BookReport/StudentBookWiseReport', [
            'studentBooks' => $studentBooks,
        ]);
    }

    /**
     * Display the schools.
     */
    public function studentLateFineReport(Request $request): Response
    {
        $books = $this->bookRepository->getActiveAll();
        $authors = $this->authorRepository->getActiveAll();

        return Inertia::render('BookReport/StudentLateFineReport', [
            'books' => $books,
            'authors' => $authors,
        ]);
    }
}
