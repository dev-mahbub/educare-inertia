<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Section;
use App\Models\Subject;
use App\Models\ClassName;
use App\Models\Classroom;
use App\Models\ClassSubject;
use App\Models\StudentSubject;
use App\Enums\ClassSubjectType;
use App\Models\ClassroomSubject;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;

class ClassroomSubjectRepository implements IRepository, IClassroomSubjectRepository
{
    public function getAll()
    {
        return ClassroomSubject::all()->latest()->get();
    }

    public function getById($id)
    {
        return ClassroomSubject::findOrFail($id);
    }

    public function delete($id)
    {
        return ClassroomSubject::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomSubject::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomSubject::whereId($id)->update($arrayData);
    }

    public function updateClassroomSubject(int $classroomId, array $arrayData)
    {
        return ClassroomSubject::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->leftJoin('subjects', 'subjects.id', '=', 'classroom_subjects.subject_id')
            ->leftJoin('academic_grades', 'academic_grades.id', '=', 'classroom_subjects.academic_grade_id')
            ->select(
                'subjects.title as subject_title',
                'academic_grades.scale_name as grade_scale',
                'classroom_subjects.*',
            )
            ->get();
    }

    public function updateOrCreateClassroomSubject(array $checkArray, array $dataArray)
    {
        return ClassroomSubject::updateOrCreate($checkArray, $dataArray);
    }

    public function getSubjectsFromClassId($classId, $schoolId = null)
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.classroom_id', $classId)
            ->orderBy("classroom_subjects.display_order", "ASC")
            ->leftJoin('classrooms', 'classrooms.id', '=', 'classroom_subjects.classroom_id')
            ->leftJoin('subjects', 'subjects.id', '=', 'classroom_subjects.subject_id')
            ->select(
                'subjects.title',
                'classroom_subjects.subject_id',
                'classroom_subjects.academic_grade_id',
                'classroom_subjects.classroom_id',
                'classroom_subjects.is_marking',
                'classroom_subjects.teachers_data',
                'classroom_subjects.type',
                'classroom_subjects.grade_scale',
                'classroom_subjects.is_marking',
                'classroom_subjects.display_order',
            )
            ->get();
    }

    public function getClassroomSubjectsByClassroomId($classroomId, $schoolId = null, $academicYearId = null)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->orderBy('display_order', "ASC")
            ->with(
                [
                    'academic_grade' => function ($query) {
                        $query->select('id', 'scale_name');
                    }
                ]
            )
            ->select(
                'classroom_subjects.id',
                'classroom_subjects.subject_id',
                'classroom_subjects.academic_grade_id',
                'classroom_subjects.type',
                'classroom_subjects.title',
                'classroom_subjects.is_marking',
                'classroom_subjects.display_order',
                'classroom_subjects.teachers_data',
            )
            ->get();
    }

    public function getOptionalSubjectsByClassroomId($classroomId, $schoolId = null, $academicYearId = null)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->where('type', ClassSubjectType::OPTIONAL->value)
            ->select(
                'classroom_subjects.id',
                'classroom_subjects.subject_id',
                'classroom_subjects.type',
                'classroom_subjects.title',
                'classroom_subjects.is_marking',
                'classroom_subjects.display_order',
            )
            ->get();
    }

    public function getSearchSubjectsFromId($classId = null, $subjectId = null)
    {
        $subQuery = DB::table('students')
            ->select(DB::raw('count(id)'))
            ->whereRaw('classroom_id = classrooms.id');

        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->with('students')
            ->with('guardians')
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->orderBy("classroom_subjects.display_order", "ASC")
            ->leftJoin('classrooms', 'classrooms.id', '=', 'classroom_subjects.classroom_id')
            ->leftJoin('subjects', 'subjects.id', '=', 'classroom_subjects.subject_id')
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->where(function ($query) use ($classId, $subjectId) {
                if ($classId != NULL)
                    $query->where('classrooms.class_name_id', $classId);
                if ($subjectId != NULL)
                    $query->where('classroom_subjects.subject_id', $subjectId);
            })
            ->select(
                'classrooms.id',
                'classrooms.title',
                'classrooms.class_monitor_id',
                DB::raw("(" . $subQuery->toSql() . ") as studentCount"),
                'students.id as as_student_id',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'staff.id as as_teacher_id',
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name'
            )
            ->orderBy('classrooms.title', 'ASC')
            ->get();
    }

    public function getAssignSubjects()
    {
        return ClassSubject::where('class_subjects.status', Status::ACTIVE)
            ->where('class_subjects.school_id', getUserSchoolId())
            ->where('class_names.academic_year_id', getAcademicYearId())
            ->join('class_names', 'class_names.id', '=', 'class_subjects.class_name_id')
            ->join('subjects', 'subjects.id', '=', 'class_subjects.subject_id')
            ->orderBy("subjects.title", "ASC")
            ->select(
                'subjects.title',
                'subjects.id',
                'class_subjects.class_name_id'
            )
            ->get();
    }

    public function getAssignSubjectsOld()
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classrooms.academic_year_id', getAcademicYearId())
            ->orderBy("subjects.title", "ASC")
            ->join('classrooms', 'classrooms.id', '=', 'classroom_subjects.classroom_id')
            ->join('subjects', 'subjects.id', '=', 'classroom_subjects.subject_id')
            ->select(
                'subjects.title',
                'subjects.id',
                'classroom_subjects.classroom_id'
            )
            ->get();
    }

    public function getClassroomSubjectIdTitle($schoolId = null, $academicYearId = null)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->select(
                'id',
                'subject_id',
                'classroom_id',
                'title',
            )
            ->get();
    }

    public function getClassroomOptionalSubjectIdTitle()
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('type', ClassSubjectType::OPTIONAL->value)
            ->select(
                'id',
                'subject_id',
                'classroom_id',
                'title',
            )
            ->get();
    }

    public function getStudentSubjectByClassroomIdStudentId($classroom_id, $student_id)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroom_id)
            ->where('type', ClassSubjectType::OPTIONAL->value)
            // ->with(['student_subject' => function ($query) use ($classroom_id, $student_id) {
            //     $query->where('classroom_id', $classroom_id)
            //         ->where('student_id', $student_id);
            // }])
            ->select(
                'id',
                'subject_id',
                'classroom_id',
                'title',
            )
            ->get();
    }

    public function getStudentSubjectByClassroomId($classroom_id, $schoolId = null, $academicYearId = null)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classroom_id', $classroom_id)
            ->where('type', ClassSubjectType::OPTIONAL->value)
            // ->with(['student_subject' => function ($query) use ($classroom_id) {
            //     $query->where('classroom_id', $classroom_id);
            // }])
            ->select(
                'id',
                'subject_id',
                'classroom_id',
                'title',
            )
            ->get();
    }

    // class name subject
    public function getAllClassSubject()
    {
        return ClassSubject::all()->latest()->get();
    }

    public function getClassSubjectById($id)
    {
        return ClassSubject::findOrFail($id);
    }

    public function deleteClassSubject($id)
    {
        return ClassSubject::destroy($id);
    }

    public function createClassSubject(array $arrayData)
    {
        return ClassSubject::create($arrayData);
    }

    public function updateClassSubject($id, array $arrayData)
    {
        return ClassSubject::whereId($id)->update($arrayData);
    }

    public function getActiveAllClassSubject()
    {
        return ClassSubject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllClassSubjectByClassId($classNameId, $schoolId = null, $academicYearId = null)
    {
        return ClassSubject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->with(
                [
                    'grade' => function ($query) {
                        $query->select('id', 'scale_name');
                    },
                    'subject_group' => function ($query) {
                        $query->select('id', 'name');
                    }
                ]
            )->orderBy('display_order')
            ->get();
    }

    public function updateOrCreateClassSubject(array $checkArray, array $dataArray)
    {
        return ClassSubject::updateOrCreate($checkArray, $dataArray);
    }


    public function getByClassroomIdAndExamId(int $classroomId, int $examId)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->whereHas('examDate', function ($query) use ($examId) {
                $query->where('exam_id', $examId)
                    ->whereNotNull('date_at');
            })
            ->with([
                'subject' => function ($query) {
                    $query->select(
                        'id',
                        'title'
                    );
                },
                'examDate' => function ($query) use ($examId) {
                    $query->where('exam_id', $examId)
                        ->select(
                            'id',
                            'exam_id',
                            'classroom_subject_id',
                            'start_time_at',
                            'end_time_at',
                            'date_at',
                        );
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'title'
            )
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getByClassroomId(int $classroomId)
    {
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('classroom_id', $classroomId)
            ->with([
                'subject' => function ($query) {
                    $query->select(
                        'id',
                        'title'
                    );
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'type',
                'title'
            )
            ->get();
    }

    public function getClassroomSubjectsByClassNameId($classNameId)
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.academic_year_id', getAcademicYearId())
            ->leftjoin('classrooms', 'classrooms.id', '=', 'classroom_subjects.classroom_id')
            ->where(function ($query) use ($classNameId) {
                if (!empty($classNameId)) {
                    $query->where('classrooms.class_name_id', $classNameId);
                }
            })
            ->with(
                [
                    'academic_grade' => function ($query) {
                        $query->select('academic_grades.id', 'academic_grades.scale_name');
                    },
                    'subject_group' => function ($query) {
                        $query->select('subject_groups.id', 'subject_groups.name');
                    }
                ]
            )
            ->select(
                'classroom_subjects.id',
                'classroom_subjects.subject_id',
                'classroom_subjects.classroom_id',
                'classroom_subjects.academic_grade_id',
                'classroom_subjects.parent_subject_id',
                'classroom_subjects.title',
                'classroom_subjects.display_order',
                'classroom_subjects.is_marking',
                'classroom_subjects.type',
            )
            ->orderBy('classroom_subjects.display_order')
            ->get();
    }

    public function getClassroonSubjectByClassNameIdAndSubjectId(int $classNameId, int $subjectId)
    {
        $classroomIds = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();

        return ClassroomSubject::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('classroom_id', $classroomIds)
            ->where('subject_id', $subjectId)
            ->with(['examDate'])
            ->get();
    }

    public function getMarkingClassroomSubjects(array $classroomIds, int $subjectId)
    {
        return ClassroomSubject::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('classroom_id', $classroomIds)
            ->where('subject_id', $subjectId)
            ->where('is_marking', true)
            ->get();
    }

    public function deleteClassroonSubjectByClassNameIdAndSubjectId(int $classNameId, int $subjectId)
    {
        $classroomIds = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();

        return ClassroomSubject::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('classroom_id', $classroomIds)
            ->where('subject_id', $subjectId)
            ->delete();
    }

    public function getClassroomSubjectsByTeacherId(int $teacherId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomSubject::where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereJsonContains('teachers_data', ['teacher_id' => $teacherId])
            ->with([
                'classroom:id,title',
                'subject:id,title',
            ])
            ->select(
                'id',
                'classroom_id',
                'subject_id'
            )
            ->get();
    }

    public function getTeacherByClassroomId(int $classroomId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomSubject::where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('classroom_id', $classroomId)
            ->with([
                'subject:id,title',
            ])
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'teachers_data'
            )
            ->get();
    }
}
