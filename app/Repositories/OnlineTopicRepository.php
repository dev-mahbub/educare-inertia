<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\OnlineTopic;
use App\Models\Classroom;

class OnlineTopicRepository implements IRepository, IOnlineTopicRepository
{
    public function getAll()
    {
        return OnlineTopic::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return OnlineTopic::findOrFail($id);
    }

    public function delete($id)
    {
        OnlineTopic::destroy($id);
    }

    public function create(array $arrayData)
    {
        return OnlineTopic::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return OnlineTopic::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return OnlineTopic::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->withCount(['virtualQuestions', 'learningMaterials'])
            ->get();
    }

    public function getOnlineDiscussionsByClassroomIdAndSubjectId(int $classroomId, int $subjectId)
    {
        $classroom = Classroom::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $classroomId)
            ->select('class_name_id')
            ->first();

        $classNameId = $classroom?->class_name_id;

        return OnlineTopic::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id',  $classNameId)
            ->where('subject_id', $subjectId)
            ->select(
                'id',
                'title'
            )
            ->get();
    }

    public function getOnlineDiscussionsByClassNameIdAndSubjectId($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineTopic::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->select(
                'id',
                'title'
            )
            ->get();
    }
}
