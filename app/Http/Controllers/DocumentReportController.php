<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use App\Enums\DocumentAudienceType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Enums\StudentDocumentCategory;
use App\Http\Requests\DocumentRequest;
use App\Repositories\IStaffRepository;
use App\Repositories\DocumentRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IDocumentRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class DocumentReportController extends Controller
{

    public function __construct(
        private IDocumentRepository $documentRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view document', ['only' => ['studentClassWiseReport', 'studentWiseReport']]);
    }

    /**
     * Display the Student Class Wise Report.
     */
    public function studentClassWiseReport(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;

        $studentDocumentReports = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $documentCategoryId = $request->document_category_id ?? null;

            if (!empty($classroomId) && !empty($documentCategoryId)) {
                $students = $this->studentRepository->getStudentDocumentReports($classroomId, $documentCategoryId);

                if (count($students) > 0) {
                    $documentSubmitted = $students->filter(function ($student) {
                        return $student?->studentDocuments?->count() > 0;
                    })->toArray();

                    $documentNotSubmitted = $students->filter(function ($student) {
                        return $student?->studentDocuments?->count() == 0;
                    })->toArray();

                    $studentDocumentReports['document_submitted'] = !empty($documentSubmitted) ? array_values($documentSubmitted) : [];
                    $studentDocumentReports['document_not_submitted'] = !empty($documentNotSubmitted) ? array_values($documentNotSubmitted) : [];
                }
            }
        }

        if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();
        }

        // student document categories
        $studentDocumentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::STUDENT->value);

        return Inertia::render('DocumentReport/StudentClassWiseReport', [
            'classrooms' => $classrooms,
            'studentDocumentCategories' => $studentDocumentCategories,
            'studentDocumentReports' => $studentDocumentReports,
        ]);
    }

    /**
     * Display the Student Wise Report.
     */
    public function studentWiseReport(Request $request): Response
    {
        $documents = $this->documentRepository->getActiveAll();

        return Inertia::render('DocumentReport/StudentWiseReport', [
            'documents' => $documents,
        ]);
    }
}
