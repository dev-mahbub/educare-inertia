<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use App\Repositories\IStaffRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ILearningMaterialRepository;

class TeacherCourseController extends Controller
{
    public function __construct(
        private ILearningMaterialRepository $learningMaterialRepository,
        private IStaffRepository $staffRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository
    ) {
        $this->middleware('permission:view academic', ['only' => ['index']]);
    }

    /*
    *   Display Courses
    */
    public function index(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;
        $subjectId = null;
        $classrooms = [];
        $subjects = [];
        $classroomLearningMaterials = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
        }

        if (!empty($classroomId) && !empty($subjectId)) {
            $classroomLearningMaterials = $this->learningMaterialRepository->getClassroomLearningMaterials($classroomId, $subjectId);
        }

        if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            }
        }

        $currentDate = Carbon::now()->format('d-M-Y');

        return Inertia::render('TeacherCourses/Show', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'classroomLearningMaterials' => $classroomLearningMaterials,
            'currentDate' => $currentDate
        ]);
    }
}
