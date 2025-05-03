<?php

namespace App\Repositories;

use App\Enums\HomeworkStatus;
use App\Enums\Status;
use App\Models\Homework;
use App\Models\HomeworkClassroom;
use App\Models\HomeworkStudent;
use App\Models\HomeworkStudentAssessmentComment;

class HomeworkRepository implements IRepository, IHomeworkRepository
{
    public function getAll()
    {
        return Homework::all()->latest()->get();
    }

    public function getById($id)
    {
        return Homework::with('user')->where('id', $id)
            ->with('subject', 'className', 'organizeFolder','classrooms')
            ->first();
    }

    public function delete($id)
    {
        try {
            return Homework::destroy($id);
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function create(array $arrayData)
    {
        return Homework::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Homework::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return Homework::with('subject', 'className', 'classrooms')
            ->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getActiveAllBySearch($schoolId = null, $academicYearId = null, $classNameId = null, $classSubjectId = null, $isAssigned = 1)
    {
        return Homework::with(['subject', 'organizeFolder', 'organizeFolder.folderClassName', 'classrooms', 'className', 'user' => function ($query) {
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
        return Homework::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function createClassworkClassroom(array $arrayData)
    {
        return HomeworkClassroom::create($arrayData);
    }

    public function updateClassworkClassroom($id, array $arrayData)
    {
        return HomeworkClassroom::whereId($id)->update($arrayData);
    }

    public function geClassroomFromClassNameId($schoolId = null, $academicYearId = null, $homeworkId)
    {
        return HomeworkClassroom::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('homework_id', $homeworkId)
            ->get();
    }

    public function deleteClassworkClassroom($id)
    {
        HomeworkClassroom::destroy($id);
    }

    //get-StudentCounts
    public function getHomeworkStudentCounts($homeworkId)
    {
        $newHomeworkCount = HomeworkStudent::whereIn('homework_status', [HomeworkStatus::NEW->value, HomeworkStatus::SUBMITTED->value])
            ->where('homework_id', $homeworkId)
            ->count();

        $inprogressHomeworkCount = HomeworkStudent::where('homework_status', HomeworkStatus::INPROGRESS->value)
            ->where('homework_id', $homeworkId)
            ->count();

        $reworkHomeworkCount = HomeworkStudent::where('homework_status', HomeworkStatus::REWORK->value)
            ->where('homework_id', $homeworkId)
            ->count();

        $completeHomeworkCount = HomeworkStudent::where('homework_status', HomeworkStatus::COMPLETED->value)
            ->where('homework_id', $homeworkId)
            ->count();

        return [
            'newHomeworkCount' => $newHomeworkCount,
            'inprogressHomeworkCount' => $inprogressHomeworkCount,
            'reworkHomeworkCount' => $reworkHomeworkCount,
            'completeHomeworkCount' => $completeHomeworkCount,
        ];
    }

    
    public function getHomeworkStudentActiveAll($homeworkId)
    {
        return HomeworkStudent::with('homework', 'user:id,first_name,middle_name,last_name,email,phone,role')
            ->where('homework_id', $homeworkId)
            ->get();
    }

    public function getHomeworkFromStudentId($homeworkId, $studentId)
    {
        return HomeworkStudent::where('student_id', $studentId)
            ->where('homework_id', $homeworkId)
            ->first();
    }

    public function createHomeworkStudent(array $arrayData)
    {
        return HomeworkStudent::create($arrayData);
    }

    public function updateHomeworkStudent($id, array $arrayData)
    {
        return HomeworkStudent::whereId($id)->update($arrayData);
    }

    public function getHomeworkStudentFromClassNameId($schoolId = null, $academicYearId = null, $homeworkId)
    {
        return HomeworkStudent::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('homework_id', $homeworkId)
            ->get();
    }

    public function deleteHomeworkStudent($id)
    {
        HomeworkStudent::destroy($id);
    }
    
    public function createAssessmentActivityComment(array $arrayData)
    {
        return HomeworkStudentAssessmentComment::create($arrayData);
    }
    
    public function getHomeworkStudentAssessmentComments($schoolId = null, $academicYearId = null, $homeworkId, $studentId)
    {
        return HomeworkStudentAssessmentComment::where('homework_id', $homeworkId)
            ->where('student_id', $studentId)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->get();
    }

    public function getHomeworksByClassroomId($classroomId)
    {
        return HomeworkClassroom::where('classroom_id', $classroomId)
            ->with(['homework' => function ($query) {
                $query->select('id', 'title', 'class_name_id', 'description', 'start_date_at', 'end_date_at', 'type', 
                    'assigned_to_class', 'allow_submission', 'home_file', 'home_file_url', 'home_doc_file', 
                    'home_camera_file', 'class_subject_id', 'user_id')
                    ->with('subject:id,title')
                    ->where('status', Status::ACTIVE);
            }])
            ->select(
                'homework_id',
                'classroom_id',
                'academic_year_id'
            )
            ->get();
    }

    public function getHomeworksByClassroomIdWithFilters($classroomId, $classNameId = null, $classSubjectId = null, $schoolId = null)
    {
        return HomeworkClassroom::where('classroom_id', $classroomId)
            ->with(['homework' => function ($query) use ($classNameId, $classSubjectId, $schoolId) {
                $query->select('id', 'title', 'class_name_id', 'description', 'start_date_at', 'end_date_at', 'type', 
                    'assigned_to_class', 'allow_submission', 'home_file', 'home_file_url', 'home_doc_file', 
                    'home_camera_file', 'class_subject_id', 'user_id')
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
            ->select(
                'homework_id',
                'classroom_id',
                'academic_year_id'
            )
            ->get();
    }
    
    public function getActivityCommentById($id)
    {
        return HomeworkStudentAssessmentComment::findOrFail($id);
    }

    
    public function getHomeworkActivityCommentFromStudentId($homeworkId, $studentId)
    {
        return HomeworkStudentAssessmentComment::where('student_id', $studentId)
            ->where('homework_id', $homeworkId)
            ->first();
    }

    public function createHomeworkStudentActivityComment(array $arrayData)
    {
        return HomeworkStudentAssessmentComment::create($arrayData);
    }

    public function updateHomeworkStudentActivityComment($id, array $arrayData)
    {
        return HomeworkStudentAssessmentComment::whereId($id)->update($arrayData);
    }
}
