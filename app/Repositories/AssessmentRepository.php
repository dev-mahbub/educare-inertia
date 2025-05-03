<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Assessment;
use App\Models\AssessmentClassroom;
use App\Models\StudentAssessment;
use App\Models\StudentAssessmentComment;

class AssessmentRepository implements IRepository, IAssessmentRepository
{
    public function getAll()
    {
        return Assessment::all()->latest()->get();
    }

    public function getById($id)
    {
        return Assessment::with('classrooms','subject','user')->findOrFail($id);
    }

    public function delete($id)
    {
        Assessment::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Assessment::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Assessment::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Assessment::where('status', Status::ACTIVE)
            ->with([
                'subject:id,title',
                'className:id,title',
                'classrooms'
                ])
            ->select(
                'id',
                'title',
                'description',
                'start_date_at',
                'end_date_at',
                'status',
                'class_name_id',
                'subject_id',
                'school_id',
                'assigned_to_class',
                'allow_submission',
                'created_at',
                'updated_at'
            )
            ->latest()
            ->get();
    }

    public function getFilteredActiveAll(
        int $class_name_id = null, 
        int $subject_id = null,
        string $startDate = '', 
        string $endDate = '', 
        int $schoolId = null
    ) {
        return Assessment::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where(function ($query) use ($class_name_id, $subject_id, $startDate, $endDate) {
                if (!empty($class_name_id)) {
                    $query->where('class_name_id', $class_name_id);
                }

                if (!empty($subject_id)) {
                    $query->where('subject_id', $subject_id);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_date_at', '<=', $endDate);
                }
            })
            ->with([
                'subject:id,title',
                'className:id,title',
                'classrooms'
                ])
            ->select(
                'id',
                'title',
                'description',
                'start_date_at',
                'end_date_at',
                'status',
                'class_name_id',
                'subject_id',
                'school_id',
                'assigned_to_class',
                'allow_submission',
                'created_at',
                'updated_at'
            )
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Assessment::where('status', Status::ACTIVE)->latest()->get();
    }

    public function geClassroomFromClassNameId($schoolId = null, $academicYearId = null, $assessmentId)
    {
        return AssessmentClassroom::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('assessment_id', $assessmentId)
            ->get();
    }

    public function deleteAssessmentClassroom($id)
    {
        AssessmentClassroom::destroy($id);
    }

    public function createAssessmentClassroom(array $arrayData)
    {
        return AssessmentClassroom::create($arrayData);
    }

    public function getActiveClassroomsFromAssessmentId($assessmentId)
    {
        return AssessmentClassroom::where('assessment_id', $assessmentId)->get();
    }

    public function createAssessmentActivityMark(array $attributesToCheck, array $valuesToUpdate)
    {
        return StudentAssessment::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function createAssessmentActivityComment(array $arrayData)
    {
        return StudentAssessmentComment::create($arrayData);
    }

    public function getStudentAssessmentComments($assessmentId, $studentId, $schoolId = null, $academicYearId = null)
    {
        return StudentAssessmentComment::with('file')->where('assessment_id', $assessmentId)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->get();
    }

    public function getCommentById($id)
    {
        return StudentAssessmentComment::findOrFail($id);
    }

    public function getAssessmentByClassroomId($classroomId)
    {
        return AssessmentClassroom::where('classroom_id', $classroomId)
            ->with(['assessment' => function ($query) {
                $query->select('id', 'title', 'class_name_id', 'description', 'end_date_at', 'type', 
                    'assigned_to_class', 'allow_submission', 'ass_file', 'user_id', 'subject_id')
                    ->with('subject:id,title')
                    ->where('status', Status::ACTIVE);
            }])
            ->select(
                'assessment_id',
                'classroom_id',
                'academic_year_id'
            )
            ->get();
    }

    public function getAssessmentFromStudentId($assessmentId, $studentId)
    {
        return StudentAssessment::where('student_id', $studentId)
            ->where('assessment_id', $assessmentId)
            ->first();
    }

    public function getAssessmentsByClassroomIdWithFilters($classroomId, $classNameId = null, $classSubjectId = null, $schoolId = null)
    {
        $results = AssessmentClassroom::where('classroom_id', $classroomId)
            ->with(['assessment' => function ($query) use ($classNameId, $classSubjectId, $schoolId) {
                $query->select('id', 'title', 'class_name_id', 'description', 'start_date_at', 'end_date_at', 'type', 
                    'assigned_to_class', 'allow_submission', 'ass_file', 'user_id', 'subject_id')
                    ->with(['subject:id,title', 'classrooms' => function($query) {
                        $query->select('classrooms.id', 'title');
                    }, 'user:id,first_name,middle_name,last_name,email,phone,role'])
                    ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
                    ->where('status', Status::ACTIVE)
                    ->when(!empty($classNameId), function ($query) use ($classNameId) {
                        $query->where('class_name_id', $classNameId);
                    })
                    ->when(!empty($classSubjectId), function ($query) use ($classSubjectId) {
                        $query->where('subject_id', $classSubjectId);
                    });
            }])
            ->select(
                'assessment_id',
                'classroom_id',
                'academic_year_id'
            )
            ->get();

        // Filter out entries where assessment is null
        $filtered = $results->filter(function ($item) {
            return !is_null($item->assessment);
        });

        // Return empty collection if no valid results, otherwise return filtered results
        return $filtered->isEmpty() ? collect([]) : $filtered->values();
    }

}
