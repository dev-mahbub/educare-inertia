<?php

namespace App\Repositories;

use App\Enums\HomeworkStatus;
use App\Enums\Status;
use App\Models\Classwork;
use App\Models\ClassworkClassroom;
use App\Models\ClassworkStudent;
use App\Models\ClassworkStudentAssessmentComment;

class ClassworkRepository implements IRepository, IClassworkRepository
{
    public function getAll()
    {
        return Classwork::all()->latest()->get();
    }

    public function getById($id)
    {
        return Classwork::where('id', $id)
            ->with('subject', 'className', 'organizeFolder', 'classrooms')
            ->first();
    }

    public function delete($id)
    {
        try {
            return Classwork::destroy($id);
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function create(array $arrayData)
    {
        return Classwork::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Classwork::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return Classwork::with('subject', 'className', 'classrooms')
            ->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
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
        return Classwork::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
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
                'class_subject_id',
                'school_id',
                'assigned_to_class',
                'allow_submission',
                'created_at',
                'updated_at'
            )
            ->latest()
            ->get();
    }

    public function getActiveAllBySearch($schoolId = null, $academicYearId = null, $classNameId = null, $classSubjectId = null, $isAssigned = 1)
    {
        return Classwork::with(['subject', 'organizeFolder', 'classrooms', 'className', 'user' => function ($query) {
                $query->select('id', 'first_name', 'last_name', 'middle_name', 'phone', 'email', 'username');
            }])
            ->where('status', Status::ACTIVE)
            ->where('assigned_to_class', $isAssigned)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->when(!empty($classSubjectId), function ($query) use ($classSubjectId) {
                $query->where('class_subject_id', $classSubjectId);
            })
            ->get();
    }

    public function getRegisterAll()
    {
        return Classwork::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function createClassworkClassroom(array $arrayData)
    {
        return ClassworkClassroom::create($arrayData);
    }

    public function updateClassworkClassroom($id, array $arrayData)
    {
        return ClassworkClassroom::whereId($id)->update($arrayData);
    }

    public function geClassroomFromClassNameId($schoolId = null, $academicYearId = null, $classworkId)
    {
        return ClassworkClassroom::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classwork_id', $classworkId)
            ->get();
    }

    public function deleteClassworkClassroom($id)
    {
        ClassworkClassroom::destroy($id);
    }

    //get-StudentCounts
    public function getClassworkStudentCounts($classworkId)
    {
        $newClassworkCount = ClassworkStudent::whereIn('classwork_status', [HomeworkStatus::NEW->value, HomeworkStatus::SUBMITTED->value])
            ->where('classwork_id', $classworkId)
            ->count();

        $inprogressClassworkCount = ClassworkStudent::where('classwork_status', HomeworkStatus::INPROGRESS->value)
            ->where('classwork_id', $classworkId)
            ->count();

        $reworkClassworkCount = ClassworkStudent::where('classwork_status', HomeworkStatus::REWORK->value)
            ->where('classwork_id', $classworkId)
            ->count();

        $completeClassworkCount = ClassworkStudent::where('classwork_status', HomeworkStatus::COMPLETED->value)
            ->where('classwork_id', $classworkId)
            ->count();

        return [
            'newClassworkCount' => $newClassworkCount,
            'inprogressClassworkCount' => $inprogressClassworkCount,
            'reworkClassworkCount' => $reworkClassworkCount,
            'completeClassworkCount' => $completeClassworkCount,
        ];
    }

    
    public function getClassworkStudentActiveAll($classworkId)
    {
        return ClassworkStudent::with('classwork', 'user:id,first_name,middle_name,last_name,email,phone,role')
            ->where('classwork_id', $classworkId)
            ->get();
    }

    public function getClassworkFromStudentId($classworkId, $studentId)
    {
        return ClassworkStudent::where('student_id', $studentId)
            ->where('classwork_id', $classworkId)
            ->first();
    }

    public function createClassworkStudent(array $arrayData)
    {
        return ClassworkStudent::create($arrayData);
    }

    public function updateClassworkStudent($id, array $arrayData)
    {
        return ClassworkStudent::whereId($id)->update($arrayData);
    }

    public function getClassworkStudentFromClassNameId($schoolId = null, $academicYearId = null, $classworkId)
    {
        return ClassworkStudent::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classwork_id', $classworkId)
            ->get();
    }

    public function deleteClassworkStudent($id)
    {
        ClassworkStudent::destroy($id);
    }

    public function getClassworkStudentAssessmentComments($schoolId = null, $academicYearId = null, $classworkId, $studentId)
    {
        return ClassworkStudentAssessmentComment::where('classwork_id', $classworkId)
            ->where('student_id', $studentId)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->get();
    }
    
    public function getClassworksByClassroomId($classroomId)
    {
        return ClassworkClassroom::where('classroom_id', $classroomId)
            ->with(['classwork' => function ($query) {
                $query->select('id', 'title', 'class_name_id', 'description', 'start_date_at', 'end_date_at', 
                    'assigned_to_class', 'allow_submission', 'class_file', 'class_file_url', 'class_doc_file', 
                    'class_camera_file', 'class_subject_id', 'user_id')
                    ->with('subject:id,title')
                    ->where('status', Status::ACTIVE);
            }])
            ->select(
                'classwork_id',
                'classroom_id',
                'academic_year_id'
            )
            ->get();
    }

    public function getClassworksByClassroomIdWithFilters($classroomId, $classNameId = null, $classSubjectId = null, $schoolId = null)
    {
        // return ClassworkClassroom::where('classroom_id', $classroomId)
        //     ->with(['classwork' => function ($query) use ($classNameId, $classSubjectId ,$schoolId) { 
        //         $query->select('id', 'title', 'class_name_id', 'description', 'start_date_at', 'end_date_at', 
        //             'assigned_to_class', 'allow_submission', 'class_file', 'class_file_url', 'class_doc_file', 
        //             'class_camera_file', 'class_subject_id', 'user_id')
        //             ->with(['subject:id,title', 'classrooms' => function($query) {
        //                 $query->select('classrooms.id', 'title');
        //             }, 'user:id,first_name,middle_name,last_name,email,phone,role'])
        //             ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
        //             ->where('status', Status::ACTIVE)
        //             ->when(!empty($classNameId), function ($query) use ($classNameId) {
        //                 $query->where('class_name_id', $classNameId);
        //             })
        //             ->when(!empty($classSubjectId), function ($query) use ($classSubjectId) {
        //                 $query->where('class_subject_id', $classSubjectId);
        //             });
        //     }])
        //     ->select(
        //         'classwork_id',
        //         'classroom_id',
        //         'academic_year_id'
        //     )
        //     ->get();
         
        $results = ClassworkClassroom::where('classroom_id', $classroomId)
        ->with(['classwork' => function ($query) use ($classNameId, $classSubjectId, $schoolId) {
            $query->select('id', 'title', 'class_name_id', 'description', 'start_date_at', 'end_date_at', 
                          'assigned_to_class', 'allow_submission', 'class_file', 'class_file_url', 
                          'class_doc_file', 'class_camera_file', 'class_subject_id', 'user_id')
                ->with(['subject:id,title', 'classrooms' => function($query) {
                    $query->select('classrooms.id', 'title');
                }, 'user:id,first_name,middle_name,last_name,email,phone,role'])
                ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
                ->where('status', Status::ACTIVE)
                ->when(!empty($classNameId), function ($query) use ($classNameId) {
                    $query->where('class_name_id', $classNameId);
                })
                ->when(!empty($classSubjectId), function ($query) use ($classSubjectId) {
                    $query->where('class_subject_id', $classSubjectId);
                });
        }])
        ->select('classwork_id', 'classroom_id', 'academic_year_id')
        ->get();

        $filtered = $results->filter(function ($item) {
            return !is_null($item->classwork);
        });

        return $filtered->isEmpty() ? collect([]) : $filtered->values();
    }

    public function createClassworkActivityComment(array $arrayData)
    {
        return ClassworkStudentAssessmentComment::create($arrayData);
    }
    
    public function getActivityCommentById($id)
    {
        return ClassworkStudentAssessmentComment::findOrFail($id);
    }

    public function createClassworkStudentActivityComment(array $arrayData)
    {
        return ClassworkStudentAssessmentComment::create($arrayData);
    }
}
