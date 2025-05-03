<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\AudienceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Enums\DocumentAudienceType;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IFileRepository;
use Illuminate\Http\RedirectResponse;
use App\Enums\StudentDocumentCategory;
use App\Enums\TeacherDocumentCategory;
use App\Http\Requests\DocumentRequest;
use App\Repositories\IStaffRepository;
use App\Repositories\IDriverRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\DocumentRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IDocumentRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Controllers\UploadFileController;
use App\Http\Requests\DocumentCategoryRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class DocumentController extends Controller
{
    private $_upload;

    public function __construct(
        private IDocumentRepository $documentRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
        private IClassroomRepository $classroomRepository,
        private IFileRepository $fileRepository,
        private IDriverRepository $driverRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view document', ['only' => [
            'dashboard',
            'schoolDocuments',
            'driverDocuments',
            'teacherDocuments',
            'downloadDocumentFile'
        ]]);
        $this->middleware('permission:add document', ['only' => ['create', 'save']]);
    }

    /**
     * Display the Dashboard.
     */
    public function dashboard(): Response
    {
        // student document categories
        $studentDocumentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::STUDENT->value);

        // student document summary
        $studentDocumentSummary = $this->getStudentDocumentSummary($studentDocumentCategories);

        // teacher document summary
        $teacherDocumentSummary = $this->getTeacherDocumentSummary();

        // driver document summary
        $driverDocumentSummary = $this->getDriverDocumentSummary();

        // school document summary
        $schoolDocumentSummary = $this->getSchoolDocumentSummary();

        return Inertia::render('Document/Dashboard', [
            'teacherDocumentSummary' => $teacherDocumentSummary,
            'studentDocumentSummary' => $studentDocumentSummary,
            'studentDocumentCategories' => $studentDocumentCategories,
            'driverDocumentSummary' => $driverDocumentSummary,
            'schoolDocumentSummary' => $schoolDocumentSummary
        ]);
    }

    /**
     * Teacher Document Summary.
     */
    protected function getTeacherDocumentSummary(): array
    {
        $teacherDocumentSummary = [];

        // teacher document categories
        $teacherDocumentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::TEACHER->value);

        // teacher documents
        $teacherDocuments = $this->documentRepository->getTeacherDocumentSummaryReport();

        foreach ($teacherDocumentCategories as $category) {
            $categoryId = $category?->id;

            if (!isset($teacherDocumentSummary[$categoryId])) {
                $teacherDocumentSummary[$categoryId] = [
                    'document_category' => $category->title,
                    'total_count' => 0,
                ];
            }

            if (count($teacherDocuments) > 0) {
                foreach ($teacherDocuments as $document) {
                    if ($document->document_category_id == $categoryId) {
                        $teacherDocumentSummary[$categoryId]['total_count'] = ($teacherDocumentSummary[$categoryId]['total_count'] ?? 0) + 1;
                    }
                }
            }
        }

        return !empty($teacherDocumentSummary) ? array_values($teacherDocumentSummary) : [];
    }

    /**
     * Driver Document Summary.
     */
    protected function getDriverDocumentSummary(): array
    {
        $driverDocumentSummary = [];

        // driver document categories
        $driverDocumentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::DRIVER->value);

        // driver documents
        $driverDocuments = $this->documentRepository->getDriverDocumentSummaryReport();

        foreach ($driverDocumentCategories as $category) {
            $categoryId = $category?->id;

            if (!isset($driverDocumentSummary[$categoryId])) {
                $driverDocumentSummary[$categoryId] = [
                    'document_category' => $category->title,
                    'total_count' => 0,
                ];
            }

            if (count($driverDocuments) > 0) {
                foreach ($driverDocuments as $document) {
                    if ($document->document_category_id == $categoryId) {
                        $driverDocumentSummary[$categoryId]['total_count'] = ($driverDocumentSummary[$categoryId]['total_count'] ?? 0) + 1;
                    }
                }
            }
        }

        return !empty($driverDocumentSummary) ? array_values($driverDocumentSummary) : [];
    }

    /**
     * School Document Summary.
     */
    protected function getSchoolDocumentSummary(): array
    {
        $schoolDocumentSummary = [];

        // school document categories
        $schoolDocumentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::SCHOOL->value);

        // school documents
        $schoolDocuments = $this->documentRepository->getSchoolDocumentSummaryReport();

        foreach ($schoolDocumentCategories as $category) {
            $categoryId = $category?->id;

            if (!isset($schoolDocumentSummary[$categoryId])) {
                $schoolDocumentSummary[$categoryId] = [
                    'document_category' => $category->title,
                    'total_count' => 0,
                ];
            }

            if (count($schoolDocuments) > 0) {
                foreach ($schoolDocuments as $document) {
                    if ($document->document_category_id == $categoryId) {
                        $schoolDocumentSummary[$categoryId]['total_count'] = ($schoolDocumentSummary[$categoryId]['total_count'] ?? 0) + 1;
                    }
                }
            }
        }

        return !empty($schoolDocumentSummary) ? array_values($schoolDocumentSummary) : [];
    }

    /**
     * Student Document Summary.
     */
    protected function getStudentDocumentSummary(object $studentDocumentCategories): array
    {
        $studentDocumentSummary = [];

        // student document categories
        $studentDocuments = $this->documentRepository->getStudentDocumentSummaryReport();

        foreach ($studentDocumentCategories as $category) {
            $categoryId = $category?->id;

            if (count($studentDocuments) > 0) {
                foreach ($studentDocuments as $document) {
                    $classroom = $document?->student?->promotedClassroom != null ? $document?->student?->promotedClassroom : $document?->student?->classroom;
                    $classroomId = $classroom?->id;

                    if ($classroomId != null) {
                        if (!isset($studentDocumentSummary[$classroomId])) {
                            $studentDocumentSummary[$classroomId] = [
                                'classroom_title' => $classroom?->title,
                                'category_wise_summary' => [],
                            ];
                        }

                        if (!isset($studentDocumentSummary[$classroomId]['category_wise_summary'][$categoryId])) {
                            $studentDocumentSummary[$classroomId]['category_wise_summary'][$categoryId] = [
                                'document_category' => $category['title'],
                                'total_count' => 0,
                            ];
                        }

                        if ($document->document_category_id == $categoryId) {
                            $studentDocumentSummary[$classroomId]['category_wise_summary'][$categoryId]['total_count'] = ($studentDocumentSummary[$classroomId]['category_wise_summary'][$categoryId]['total_count'] ?? 0) + 1;
                        }
                    }
                }
            }
        }

        if (count($studentDocumentSummary) > 0) {
            $studentDocumentSummary = array_map(function ($data) {
                $data['category_wise_summary'] = !empty($data['category_wise_summary']) ? array_values($data['category_wise_summary']) : [];

                return $data;
            }, $studentDocumentSummary);

            $studentDocumentSummary = array_values($studentDocumentSummary);
        }

        return $studentDocumentSummary;
    }

    /**
     * Document Category.
     */
    public function documentCategory(Request $request): Response
    {
        // audience types
        $audienceTypes = buildEnumOptionsArray(DocumentAudienceType::cases());

        // document categories
        $documentCategories = $this->documentRepository->getActiveDocumentCategoryAll();

        return Inertia::render('Document/DocumentCateogry', [
            'audienceTypes' => $audienceTypes,
            'documentCategories' => $documentCategories,
        ]);
    }

    /**
     * Save Document Category.
     */
    public function saveDocumentCategory(DocumentCategoryRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'type' => $input['type'] ?? '',
            'description' => $input['description'] ?? null,
            'is_published' => $input['is_published'] ?? false,
            'status' => Status::ACTIVE
        ];

        $documentCategory = $this->documentRepository->createDocumentCategory($dataArray);

        if (!$documentCategory) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'Document category added successfully!');
    }

    /**
     * Update Document Category.
     */
    public function updateDocumentCategory(DocumentCategoryRequest $request, int $id): RedirectResponse
    {
        $documentCategory = $this->documentRepository->getDocumentCategoryById($id);

        abort_if(empty($documentCategory), 404);

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? '',
            'type' => $input['type'] ?? '',
            'description' => $input['description'] ?? null,
            'is_published' => $input['is_published'] ?? false,
        ];

        $updateDocumentCategory = $this->documentRepository->updateDocumentCategory($id, $dataArray);

        if (!$updateDocumentCategory) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'Document category updated successfully!');
    }

    /**
     * Delete Document Category.
     */
    public function deleteDocumentCategory(int $id): RedirectResponse
    {
        $documentCategory = $this->documentRepository->getDocumentCategoryById($id);

        abort_if(empty($documentCategory), 404);

        $deleteDocumentCategory = $this->documentRepository->deleteDocumentCategory($id);

        if (!$deleteDocumentCategory) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'Document category deleted successfully!');
    }

    /**
     * School Documents.
     */
    public function schoolDocuments(Request $request): Response
    {
        $documentCategoryId = null;

        if ($request->isMethod('POST')) {
            $documentCategoryId = $request->document_category_id ?? null;
        }

        // school documents
        $schoolDocuments = $this->documentRepository->getFilteredSchoolDocuments($documentCategoryId, false);

        if (count($schoolDocuments) > 0) {
            $schoolDocuments = $schoolDocuments->map(function ($document) {
                $document['issued_date'] = !empty($document->issued_date) ? Carbon::parse($document->issued_date)->format('d-M-Y') : "";
                $document['uploaded_date'] = !empty($document->created_at) ? Carbon::parse($document->created_at)->format('d-M-Y') : "";
                $document['audience_type'] = DocumentAudienceType::SCHOOL->value;

                return $document;
            });
        }

        // document categories
        $documentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::SCHOOL->value);

        return Inertia::render('Document/SchoolDocuments', [
            'schoolDocuments' => $schoolDocuments,
            'documentCategories' => $documentCategories
        ]);
    }

    /**
     * Delete School Document.
     */
    public function deleteSchoolDocument(int $id): RedirectResponse
    {
        $schoolDocument = $this->documentRepository->getSchoolDocumentById($id);

        abort_if(empty($schoolDocument), 404);

        DB::beginTransaction();

        try {
            $deleteDocument = $this->documentRepository->deleteSchoolDocument($id);

            $filePath = "";

            if ($schoolDocument?->file != null) {
                $file = $schoolDocument->file;
                $path = !empty($file->path) ? explode('/', $file->path) : [];
                $fileName = end($path);
                $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $schoolDocument?->created_by . "/" . $fileName;

                $schoolDocument->file->delete();
            }

            $deleteDocument = $this->documentRepository->deleteSchoolDocument($id);

            if ($deleteDocument && $filePath != "" && Storage::disk('s3')->exists($filePath)) {
                Storage::disk('s3')->delete($filePath);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Document deleted successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Driver Documents.
     */
    public function driverDocuments(Request $request): Response
    {
        $driverId = null;
        $documentCategoryId = null;

        if ($request->isMethod('POST')) {
            $driverId = $request->driver_id ?? null;
            $documentCategoryId = $request->document_category_id ?? null;
        }

        // driver documents
        $driverDocuments = $this->documentRepository->getFilteredDriverDocuments($driverId, $documentCategoryId, false);

        if (count($driverDocuments) > 0) {
            $driverDocuments = $driverDocuments->map(function ($document) {
                $document['issued_date'] = !empty($document->issued_date) ? Carbon::parse($document->issued_date)->format('d-M-Y') : "";
                $document['uploaded_date'] = !empty($document->created_at) ? Carbon::parse($document->created_at)->format('d-M-Y') : "";

                return $document;
            });
        }

        // drivers
        $drivers = $this->driverRepository->getActiveDriverAll()
            ->map(function ($driver) {
                return [
                    'id' => $driver->id,
                    'title' => "{$driver?->first_name} {$driver?->last_name}"
                ];
            });

        // document categories
        $documentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::DRIVER->value);

        return Inertia::render('Document/DriverDocuments', [
            'driverDocuments' => $driverDocuments,
            'drivers' => $drivers,
            'documentCategories' => $documentCategories
        ]);
    }

    /**
     * Display the teacher Documents.
     */
    public function teacherDocuments(Request $request): Response
    {
        // document categories
        $teacherDocumentCategories = $this->documentRepository->getDocumentCategoriesByType(DocumentAudienceType::TEACHER->value);

        // teachers
        $teachers = $this->staffRepository->getActiveTeacherName()
            ->map(function ($teacher) {
                return [
                    'id' => $teacher->id,
                    'title' => "{$teacher?->first_name} {$teacher?->middle_name} {$teacher?->last_name}"
                ];
            });

        $teacherId = null;
        $documentCategoryId = null;

        if ($request->isMethod('POST')) {
            $teacherId = $request->teacher_id ?? null;
            $documentCategoryId = $request->document_category_id ?? null;
        }

        // teacher documents
        $documents = $this->documentRepository->getTeacherDocuments($teacherId, $documentCategoryId);

        if (count($documents) > 0) {
            $documents = $documents->map(function ($document) {
                $document['issued_date'] = !empty($document->issued_date) ? Carbon::parse($document->issued_date)->format('d-M-Y') : "";
                $document['uploaded_date'] = !empty($document->created_at) ? Carbon::parse($document->created_at)->format('d-M-Y') : "";

                return $document;
            });
        }

        return Inertia::render('Document/TeacherDocuments', [
            'teachers' => $teachers,
            'teacherDocumentCategories' => $teacherDocumentCategories,
            'documents' => $documents,
        ]);
    }

    /**
     * Upload Document
     */
    public function create(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $students = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $status = $request->student_status ?? "";

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomIdAndActiveStatus($classroomId, $status)
                    ->map(function ($student) {
                        return [
                            'id' => $student->id,
                            'title' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}"
                        ];
                    });
            }
        }

        // teachers
        $teachers = $this->staffRepository->getActiveTeacherName()
            ->map(function ($teacher) {
                return [
                    'id' => $teacher->id,
                    'title' => "{$teacher?->first_name} {$teacher?->middle_name} {$teacher?->last_name}"
                ];
            });

        // drivers
        $drivers = $this->driverRepository->getActiveDriverAll()
            ->map(function ($driver) {
                return [
                    'id' => $driver->id,
                    'title' => "{$driver?->first_name} {$driver?->last_name}"
                ];
            });

        if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();
        }

        // user types
        $userTypes = buildEnumOptionsArray(DocumentAudienceType::cases());

        // // student document categories
        // $studentDocumentCategories = buildEnumOptionsArray(StudentDocumentCategory::cases());

        // // teacher document categories
        // $teacherDocumentCategories = buildEnumOptionsArray(TeacherDocumentCategory::cases());

        // document categories
        $documentCategories = $this->documentRepository->getActiveDocumentCategoryAll();

        // $status
        $statusArray = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($statusArray, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        array_push($statusArray, ['id' => 'Tc', 'title' => 'Tc']);

        return Inertia::render('Document/Create', [
            'userTypes' => $userTypes,
            'teachers' => $teachers,
            'classrooms' => $classrooms,
            'students' => $students,
            'statusArray' => $statusArray,
            // 'studentDocumentCategories' => $studentDocumentCategories,
            // 'teacherDocumentCategories' => $teacherDocumentCategories,
            'documentCategories' => $documentCategories,
            'drivers' => $drivers
        ]);
    }

    /**
     * Save Documents
     */
    public function save(DocumentRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // upload student document
            if ($input['audience_type'] == 'Student' && !empty($input['documents'])) {
                $this->createStudentDocument($input, $request);
            }

            // upload staff document
            if ($input['audience_type'] == 'Teacher' && !empty($input['documents'])) {
                $this->createTeacherDocument($input, $request);
            }

            // upload school document
            if ($input['audience_type'] == 'School' && !empty($input['documents'])) {
                $this->createSchoolDocument($input, $request);
            }

            // upload driver document
            if ($input['audience_type'] == 'Driver' && !empty($input['documents'])) {
                $this->createDriverDocument($input, $request);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Document added successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Create Student Document
     *
     */
    protected function createStudentDocument(array $input, Request $request)
    {
        $student = $this->studentRepository->getStudentById($input['student_id']);

        foreach ($input['documents'] as $index => $document) {
            // $documentName = $input['with_document'] == true && !empty($document['file']) ? $student?->first_name . "_" . ($document['document_category'] ?? '') : 'No Document Attached';

            // document name
            $documentName = "No Document Attached";

            if ($input['with_document'] == true && !empty($document['file'])) {
                $documentCategory = $this->documentRepository->getDocumentCategoryById($document['document_category_id']);
                $documentName = $student?->first_name . "_" . $documentCategory->title ?? '';
            }

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => $input['student_id'] ?? null,
                'issued_by' => $document['issued_by'] ?? null,
                'created_by' => auth()->user()->id,
                'document_category' => $document['document_category'] ?? '',
                'document_category_id' => $document['document_category_id'] ?? null,
                'document_name' => $documentName,
                'document_no' => $document['document_no'] ?? null,
                'generated_for' => $document['generated_for'] ?? null,
                'notes' => $document['notes'] ?? null,
                'issued_date' => !empty($document['issued_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $document['issued_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'is_with_document' => $input['is_with_document'] ?? false,
                'status' => Status::ACTIVE,
            ];

            $studentDocument = $this->documentRepository->createStudentDocument($dataArray);

            // upload file
            if ($input['with_document'] == true && !empty($document['file'])) {
                $this->uploadDocumentFile($request, $index, $studentDocument->getMorphClass(), $studentDocument->id, 'student');
            }
        }
    }

    /**
     * Create Teacher Document
     *
     */
    protected function createTeacherDocument(array $input, Request $request)
    {
        $staffId = $input['teacher_id'];
        $staff = $this->staffRepository->getStaffById($staffId);

        foreach ($input['documents'] as $index => $document) {
            // $documentName = $input['with_document'] == true && !empty($document['file']) ? $staff?->first_name . "_" . ($document['document_category'] ?? '') : 'No Document Attached';

            // document name
            $documentName = "No Document Attached";

            if ($input['with_document'] == true && !empty($document['file'])) {
                $documentCategory = $this->documentRepository->getDocumentCategoryById($document['document_category_id']);
                $documentName = $staff?->first_name . "_" . $documentCategory->title ?? '';
            }

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'staff_id' => $staffId ?? null,
                'issued_by' => $document['issued_by'] ?? null,
                'created_by' => auth()->user()->id,
                'audience_type' => $input['audience_type'] ?? null,
                'document_category' => $document['document_category'] ?? '',
                'document_category_id' => $document['document_category_id'] ?? null,
                'document_name' => $documentName,
                'document_no' => $document['document_no'] ?? null,
                'generated_for' => $document['generated_for'] ?? null,
                'notes' => $document['notes'] ?? null,
                'issued_date' => !empty($document['issued_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $document['issued_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'is_with_document' => $input['is_with_document'] ?? false,
                'status' => Status::ACTIVE,
            ];

            $staffDocument = $this->documentRepository->createStaffDocument($dataArray);

            // upload file
            if ($input['with_document'] == true && !empty($document['file'])) {
                $this->uploadDocumentFile($request, $index, $staffDocument->getMorphClass(), $staffDocument->id, 'staff');
            }
        }
    }

    /**
     * Create School Document
     *
     */
    protected function createSchoolDocument(array $input, Request $request)
    {
        foreach ($input['documents'] as $index => $document) {
            // document name
            $documentName = "No Document Attached";

            if ($input['with_document'] == true && !empty($document['file'])) {
                $documentCategory = $this->documentRepository->getDocumentCategoryById($document['document_category_id']);
                $documentName = $documentCategory->title ?? '';
            }

            // create school document
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'issued_by' => $document['issued_by'] ?? null,
                'created_by' => auth()->user()->id,
                'document_category_id' => $document['document_category_id'] ?? null,
                'document_name' => $documentName,
                'document_no' => $document['document_no'] ?? null,
                'generated_for' => $document['generated_for'] ?? null,
                'notes' => $document['notes'] ?? null,
                'issued_date' => !empty($document['issued_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $document['issued_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'is_with_document' => $input['is_with_document'] ?? false,
                'status' => Status::ACTIVE,
            ];

            $schoolDocument = $this->documentRepository->createSchoolDocument($dataArray);

            // upload file
            if ($input['with_document'] == true && !empty($document['file'])) {
                $this->uploadDocumentFile($request, $index, $schoolDocument->getMorphClass(), $schoolDocument->id, 'school');
            }
        }
    }

    /**
     * Create Driver Document
     *
     */
    protected function createDriverDocument(array $input, Request $request)
    {
        $driverId = $input['driver_id'];
        $driver = $this->driverRepository->getDriverById($driverId);

        foreach ($input['documents'] as $index => $document) {
            // document name
            $documentName = "No Document Attached";

            if ($input['with_document'] == true && !empty($document['file'])) {
                $documentCategory = $this->documentRepository->getDocumentCategoryById($document['document_category_id']);
                $documentName = $driver?->first_name . "_" . $documentCategory->title ?? '';
            }

            // create driver document
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'driver_id' => $driverId ?? null,
                'issued_by' => $document['issued_by'] ?? null,
                'created_by' => auth()->user()->id,
                'document_category_id' => $document['document_category_id'] ?? null,
                'document_name' => $documentName,
                'document_no' => $document['document_no'] ?? null,
                'generated_for' => $document['generated_for'] ?? null,
                'notes' => $document['notes'] ?? null,
                'issued_date' => !empty($document['issued_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $document['issued_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'is_with_document' => $input['is_with_document'] ?? false,
                'status' => Status::ACTIVE,
            ];

            $driverDocument = $this->documentRepository->createDriverDocument($dataArray);

            // upload file
            if ($input['with_document'] == true && !empty($document['file'])) {
                $this->uploadDocumentFile($request, $index, $driverDocument->getMorphClass(), $driverDocument->id, 'driver');
            }
        }
    }

    /**
     * Upload Document File
     *
     */
    protected function uploadDocumentFile($request, $index, $fileableType, $fileableId, $type)
    {
        $uploadedFile = $this->_upload->uploadDocumentFile($request, $index, 'file', $type);

        if (!empty($uploadedFile)) {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'fileable_type' => $fileableType,
                'fileable_id' => $fileableId,
                'name' => $uploadedFile['name'] ?? null,
                'file_name' => $uploadedFile['file_name'] ?? null,
                'path' => $uploadedFile['path'] ?? "",
                'status' => Status::ACTIVE,
            ];

            $this->fileRepository->morphCreate($dataArray);
        }
    }

    /*
    *   download document file
    */
    public function downloadDocumentFile(int $id)
    {
        try {
            $file = $this->fileRepository->getFileById($id);

            abort_if(empty($file), 404);

            $path = !empty($file->path) ? explode('/', $file->path) : [];
            $fileName = end($path);
            $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file?->fileable?->created_by . "/" . $fileName;

            $disk = Storage::disk('s3');
            $stream = $disk->readStream($filePath);

            return response()->stream(function () use ($stream) {
                fpassthru($stream);
            }, 200, [
                'Content-Type' => $disk->mimeType($filePath),
                'Content-Length' => $disk->size($filePath),
                'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"',
            ]);
        } catch (\Throwable $th) {
            return redirect()->to(URL::previous())->with('error', 'Something goes wrong.');
        }
    }
}
