<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomDiscussion;

class ClassroomDiscussionRepository implements IRepository, IClassroomDiscussionRepository
{
    public function getAll()
    {
        return ClassroomDiscussion::all()->latest()->get();
    }

    public function getById($id)
    {
        return ClassroomDiscussion::findOrFail($id);
    }

    public function delete($id)
    {
        ClassroomDiscussion::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomDiscussion::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomDiscussion::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomDiscussion::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getRegisterAll()
    {
        return ClassroomDiscussion::where('status', Status::ACTIVE)->latest()->get();
    }


    public function getClassroomDiscussionsByClassroomIdAndSubjectId(int $classroomId, int $subjectId)
    {
        return ClassroomDiscussion::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->where('subject_id', $subjectId)
            ->with(['user' => function ($query) {
                $query->select(
                    'id',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'role'
                );
            }])
            ->select(
                'id',
                'user_id',
                'title',
                'description',
                'created_at'
            )
            ->get();
    }
}
