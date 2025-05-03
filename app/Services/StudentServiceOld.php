<?php

namespace App\Services;

use App\Models\Student;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class StudentService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get students for parent based on authentication and academic year
     */
    public function getParentStudents(array $userRoles, ?array $relations = []): Collection
    {
        if (!in_array('Parent', $userRoles)) {
            return collect([]);
        }

        $schoolId = getUserSchoolId();
        $academicYearId = getAcademicYearId();
        $guardian = $this->userRepository->getById(Auth::id());

        $defaultRelations = [
            'promotedClassroomRaw' => function ($query) use ($academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->select(
                        'classrooms.class_name_id',
                        'classrooms.id',
                        'classrooms.title',
                    );
            },
            'classroomRollRaw' => function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId)
                    ->select(
                        'id',
                        'student_id',
                        'roll_no',
                    );
            },
            'studentImageRaw' => function ($query) use ($schoolId) {
                $query->where('school_id', $schoolId);
            }
        ];

        $mergedRelations = array_merge($defaultRelations, $relations);

        return Student::where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId);
            })
            ->whereHas('father', function ($query) use ($guardian) {
                $query->where('first_name', $guardian?->first_name)
                    ->where('email', $guardian?->email)
                    ->where('phone', $guardian?->phone);
            })
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id'
            )
            ->with($mergedRelations)
            ->get();
    }

    /**
     * Enhance student data with classroom and personal information
     */
    public function enhanceStudentData($student): object
    {
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

        $student['title'] = trim(implode(" ", [
            $student->first_name ?? "",
            $student->middle_name ?? "",
            $student->last_name ?? ""
        ]));

        return $student;
    }

    /**
     * Load additional classroom roll information for a student
     */
    public function loadClassroomRoll($student): object
    {
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

        return $student;
    }
}