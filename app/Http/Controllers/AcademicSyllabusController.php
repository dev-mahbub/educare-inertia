<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\StudentService;
use Illuminate\Support\Facades\DB;
use App\Repositories\IFileRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IImageRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IAssessmentRepository;
use App\Repositories\ISchoolShiftRepository;
use App\Http\Requests\AcademicSyllabusRequest;
use App\Repositories\IAcademicSyllabusRepository;
use App\Repositories\IClassroomSubjectRepository;

class AcademicSyllabusController extends Controller
{

    private $_upload;

    public function __construct(
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IAcademicSyllabusRepository $academicSyllabusRepository,
        private IAssessmentRepository $assessmentRepository,
        private ISchoolShiftRepository $schoolShiftRepository,
        private IStudentRepository $studentRepository,
        private IImageRepository $imageRepository,
        private IFileRepository $fileRepository,
        private StudentService  $studentService

    ) {
        $this->_upload = new UploadFileController();

        $this->middleware('permission:view academic syllabus', ['only' => ['index', 'show']]);
        $this->middleware('permission:add academic syllabus', ['only' => ['create', 'store', 'saveAcademicGradeItem', 'markSave']]);
        $this->middleware('permission:edit academic syllabus', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete academic syllabus', ['only' => ['destroy', 'deleteAcademicGradeItem']]);
    }

    /**
     * index.
     */
    public function index(Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $subjects = $this->classroomSubjectRepository->getAssignSubjects();
        $academicSyllabuses = $this->academicSyllabusRepository->getActiveAll();

        $academicSyllabuses->load(['className', 'subject', 'file']);

        return Inertia::render('AcademicSyllabus/AcademicSyllabus', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'academicSyllabuses' => $academicSyllabuses,
        ]);
    }

    public function index_Old(Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $subjects = $this->classroomSubjectRepository->getAssignSubjects();
        $academicSyllabuses = $this->academicSyllabusRepository->getActiveAll();

        $academicSyllabuses->load(['className', 'subject', 'image']);

        return Inertia::render('AcademicSyllabus/AcademicSyllabus', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'academicSyllabuses' => $academicSyllabuses,
        ]);
    }

    /**
     * save.
     */
    public function save(AcademicSyllabusRequest $request): RedirectResponse
    {
        $input = $request->validated();

        try {
            DB::beginTransaction();

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'],
                'subject_id' => $input['subject_id'],
                'title' => $input['title'],
                'status' => Status::ACTIVE->value,
            );

            $academicSyllabus = $this->academicSyllabusRepository->create($dataArray);

            if (!empty($academicSyllabus['id']) && !empty($request->file('file'))) {
                $file_url = $this->_upload->uploadSingleFile($request, 'file', 'academic_syllabus');

                $dataFile = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'fileable_type' => \App\Models\AcademicSyllabus::class,
                    'fileable_id' => $academicSyllabus['id'],
                    'name' => $file_url['name'],
                    'file_name' => $file_url['file_name'],
                    'path' => !empty($file_url['path']) ? $file_url['path'] : null,
                );

                $this->fileRepository->morphCreate($dataFile);
            }

            DB::commit();

            return redirect()->route('academic_syllabus.list')->with('message', 'Save successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->route('academic_syllabus.list')->with('errors', 'Save failed.');
        }
    }

    public function save_Old(AcademicSyllabusRequest $request): RedirectResponse
    {
        $input = $request->validated();
        try {
            DB::beginTransaction();
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'],
                'subject_id' => $input['subject_id'],
                'title' => $input['title'],
                'status' => Status::ACTIVE->value,
            );
            $academicSyllabus = $this->academicSyllabusRepository->create($dataArray);
            if (!empty($academicSyllabus['id']) && !empty($request->file('image'))) {
                $image_url = $this->_upload->uploadImage($request, 'image', 'academic_syllabus_image');
                $file_name = $request->file('image')->getClientOriginalName();

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\AcademicSyllabus::class,
                    'imageable_id' => $academicSyllabus['id'],
                    'name' => $file_name,
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );
                $this->imageRepository->morphCreate($dataImage, $academicSyllabus['id']);
            }
            DB::commit();
            return redirect()->route('academic_syllabus.list')->with('message', 'Save successfully.');
        } catch (\Throwable $th) {
            DB::rollback();
            return redirect()->route('academic_syllabus.list')->with('errors', 'Save failed.');
        }
    }

    /**
     * edit.
     */
    public function edit(int $id, Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $subjects = $this->classroomSubjectRepository->getAssignSubjects();
        $academicSyllabuses = $this->academicSyllabusRepository->getActiveAll();

        $academicSyllabus = $this->academicSyllabusRepository->getById($id);
        $academicSyllabuses->load(['className', 'subject', 'file']);
        $academicSyllabus->load(['file']);

        return Inertia::render('AcademicSyllabus/EditAcademicSyllabus', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'academicSyllabuses' => $academicSyllabuses,
            'academicSyllabus' => $academicSyllabus,
        ]);
    }

    public function edit_Old(int $id, Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $subjects = $this->classroomSubjectRepository->getAssignSubjects();
        $academicSyllabuses = $this->academicSyllabusRepository->getActiveAll();

        $academicSyllabus = $this->academicSyllabusRepository->getById($id);
        $academicSyllabuses->load(['className', 'subject', 'image']);
        $academicSyllabus->load(['image']);

        return Inertia::render('AcademicSyllabus/EditAcademicSyllabus', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'academicSyllabuses' => $academicSyllabuses,
            'academicSyllabus' => $academicSyllabus,
        ]);
    }

    /**
     * update.
     */
    public function update(AcademicSyllabusRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $academicSyllabus = $this->academicSyllabusRepository->getById($id);
        $academicSyllabus->load(['file']);

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'class_name_id' => $input['class_name_id'],
                'subject_id' => $input['subject_id'],
                'title' => $input['title'],
                'status' => Status::ACTIVE,
            );

            $this->academicSyllabusRepository->update($academicSyllabus->id, $dataArray);

            if ($request->hasFile('file')) {
                $file_url = $this->_upload->uploadSingleFile($request, 'file', 'academic_syllabus');

                $dataFile = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'fileable_type' => \App\Models\AcademicSyllabus::class,
                    'fileable_id' => $academicSyllabus->id,
                    'name' => $file_url['name'],
                    'file_name' => $file_url['file_name'],
                    'path' => !empty($file_url['path']) ? $file_url['path'] : null,
                );

                if ($academicSyllabus->file != null) {
                    $this->fileRepository->update($academicSyllabus->file->id, $dataFile);
                } else {
                    $this->fileRepository->morphCreate($dataFile);
                }
            }

            DB::commit();

            return redirect()->route('academic_syllabus.list')->with('message', 'Update syllabus successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->route('academic_syllabus.list')->with('errors', 'Failed to update.');
        }
    }

    public function update_Old(AcademicSyllabusRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $academicSyllabus = $this->academicSyllabusRepository->getById($id);
        $academicSyllabus->load(['image']);

        try {

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'class_name_id' => $input['class_name_id'],
                'subject_id' => $input['subject_id'],
                'title' => $input['title'],
                'status' => Status::ACTIVE,
            );

            $this->academicSyllabusRepository->update($academicSyllabus->id, $dataArray);

            if ($request->hasFile('image')) {
                $image_url = $this->_upload->uploadImage($request, 'image', 'academic_syllabus_image');
                $file_name = $request->file('image')->getClientOriginalName();

                $dataImage = [
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\AcademicSyllabus::class,
                    'imageable_id' => $academicSyllabus->id,
                    'name' => $file_name,
                    'path' => !empty($image_url) ? $image_url : null,
                    'status' => Status::ACTIVE,
                ];

                if ($academicSyllabus->image != null) {
                    $image = $this->imageRepository->update($academicSyllabus->image->id, $dataImage);
                } else {
                    $this->imageRepository->morphCreate($dataImage, $academicSyllabus->id);
                }
            }

            return redirect()->route('academic_syllabus.list')->with('message', 'Update syllabus successfully.');
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
            return redirect()->route('academic_syllabus.list')->with('errors', 'Failed to update.');
        }
    }

    /**
     * destroy.
     */
    public function destroy($id): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $academicSyllabus = $this->academicSyllabusRepository->getById($id);
            $academicSyllabus->load(['file']);

            if ($academicSyllabus->file != null) {
                $academicSyllabus->file->delete();
            }

            $this->academicSyllabusRepository->delete($id);

            DB::commit();

            return redirect()->route('academic_syllabus.list')->with('message', 'Deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->route('academic_syllabus.list')->with('error', 'Something goes wrong');
        }
    }

    /**
     * Student View Syllabus.
    */

    public function studentViewSyllabus(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $academicSyllabuses = collect([]);

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        // Get syllabuses for selected student or first student
        $student = null;
        if (!empty($studentId)) {
            $student = $this->studentService->getEnhancedStudentById($studentId);
        } elseif ($students->isNotEmpty()) {
            $student = $students->first();
        }

        if ($student?->promotedClassroom?->class_name_id) {
            $academicSyllabuses = $this->academicSyllabusRepository->getSyllabusBySearch(
                $student->promotedClassroom->class_name_id,
                null,
                null,
                null
            );
            $academicSyllabuses->load(['className', 'subject', 'file']);
        }

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        return Inertia::render('AcademicSyllabus/StudentViewSyllabus', [
            'students' => $students,
            'studentId' => $studentId,
            'schoolShifts' => $schoolShifts,
            'academicSyllabuses' => $academicSyllabuses,
        ]);
    }

    public function studentViewSyllabus_old(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        $academicSyllabuses = [];

        if (in_array('Parent', $userRoles)) {
            $students = $this->studentRepository->getStudentsByParentUserId(auth()->user()->id); 
            
            if (count($students) > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->latestClassroomStudent?->classroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->class_name_id;
                            $student['classTitle'] = $student?->promotedClassroom?->title;
                        }

                        $student['classroom_id'] = $student?->latestClassroomStudent?->class_name_id;
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

        if (count($students) > 0 && empty($studentId)) {
            $firstStudent = $students->first();
            
            if ($firstStudent?->promotedClassroom != null) {
                $academicSyllabuses = $this->academicSyllabusRepository->getSyllabusBySearch(
                    $firstStudent->promotedClassroom->class_name_id, 
                    null, 
                    null, 
                    null
                );
                $academicSyllabuses->load(['className', 'subject', 'file']);
            }
        }

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }
        
        if (!empty($studentId)) {
            $selectedStudent = $this->studentRepository->getStudentById($studentId);
            $student = $selectedStudent;
            if ($selectedStudent?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->class_name_id;
                $student['classroom'] = $student?->promotedClassroom;
            }
            
           if(!empty($student?->promotedClassroom?->class_name_id)){
                $academicSyllabuses = $this->academicSyllabusRepository->getSyllabusBySearch($student?->promotedClassroom?->class_name_id, null, null, null);
                $academicSyllabuses->load(['className', 'subject', 'file']);
            }
        };

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        return Inertia::render('AcademicSyllabus/StudentViewSyllabus', [
            'students' => $students,
            'studentId' => $studentId,
            'schoolShifts' => $schoolShifts,
            'academicSyllabuses' => $academicSyllabuses,
        ]);
    }
}
