<?php

namespace App\Services;

use App\Models\Student;
use App\Repositories\{UserRepository, StudentRepository};
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class StudentService
{
    protected $userRepository;
    protected $studentRepository;

    public function __construct(
        UserRepository $userRepository,
        StudentRepository $studentRepository
    ) {
        $this->userRepository = $userRepository;
        $this->studentRepository = $studentRepository;
    }

    /**
     * Get students for parent based on authentication and academic year
     */
    public function getParentStudents(array $userRoles): Collection
    {
        if (!in_array('Parent', $userRoles)) {
            return collect([]);
        }

        $schoolId = getUserSchoolId();
        $academicYearId = getAcademicYearId();
        $guardian = $this->userRepository->getById(Auth::id());

        return Student::where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($academicYearId) {
                $sSubQuery->where(function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);
                });
            })
            ->whereHas('father', function ($sQquery) use ($guardian) {
                $sQquery->where('first_name', $guardian?->first_name)
                    ->where('email', $guardian?->email)
                    ->where('phone', $guardian?->phone);
            })
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
                'birth_date_at',
                'admission_date_at'
            )
            ->with([
                'promotedClassroomRaw' => function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->select(
                            'classrooms.class_name_id',
                            'classrooms.id',
                            'classrooms.title',
                        );
                },
                'studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId);
                },
                'student_category' => function ($query) {
                    $query->select(
                        'id',
                        'student_id',
                        'category_id',
                    )->with(['category:categories.id,categories.title']);
                },
                'student_house' => function ($query) {
                    $query->select(
                        'id',
                        'student_id',
                        'house_id',
                    )->with(['house:houses.id,houses.name']);
                },
                'classroomRollRaw' => function ($query) use ($academicYearId) {
                    $query->where('academic_year_id', $academicYearId)
                        ->select(
                            'id',
                            'student_id',
                            'roll_no',
                        );
                },
                'religion_name',
                'studentImage',
                'student_father_profile_image',
                'student_mother_profile_image',
                'student_guardian_profile_image',
                'classroom:id,title',
                'latestClassroomStudent.classroom:classrooms.id,classrooms.title',
            ])
            ->get();
    }

    /**
     * Get enhanced student by ID
     */
    public function getEnhancedStudentById(?string $studentId): ?object
    {
        if (empty($studentId)) {
            return null;
        }

        $student = $this->studentRepository->getStudentById($studentId);
        if ($student) {
            return $this->enhanceStudentData($student);
        }
        
        return null;
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
                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classTitle'] = $student?->promotedClassroom?->title;
            }

            $student['classroom_id'] = $student?->latestClassroomStudent?->classroom?->id;
            $student['classroom'] = $student?->latestClassroomStudent?->classroom;
        }

        $student['title'] = trim(implode(" ", [
            $student->first_name ?? "",
            $student->middle_name ?? "",
            $student->last_name ?? ""
        ]));

        return $student;
    }
}