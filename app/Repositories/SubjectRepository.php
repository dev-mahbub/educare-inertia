<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Subject;
use App\Models\Classroom;
use App\Models\SubjectGroup;
use App\Models\ELearningSubject;

class SubjectRepository implements IRepository, ISubjectRepository
{
    public function getAll()
    {
        return Subject::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return Subject::findOrFail($id);
    }

    public function delete($id)
    {
        return Subject::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Subject::create($arrayData);
    }

    public function updateOrCreate(array $checkedArray, array $arrayData)
    {
        return Subject::updateOrCreate($checkedArray, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Subject::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null)
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->get();
    }

    public function getActiveNameAndId()
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->get();
    }

    public function getActiveAllArray()
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get()
            ->pluck('title', 'id')
            ->toArray();
    }

    public function getRegisterAll()
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getSubjectById(int $id, $schoolId = null)
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'is_co_scholastic'
            )
            ->first();
    }

    // e-learning subject
    public function getAllELearningSubject()
    {
        return ELearningSubject::get();
    }

    public function getByIdELearningSubject($id)
    {
        return ELearningSubject::findOrFail($id);
    }

    public function deleteELearningSubject($id)
    {
        ELearningSubject::destroy($id);
    }

    public function createELearningSubject(array $arrayData)
    {
        return ELearningSubject::create($arrayData);
    }

    public function updateOrCreateELearningSubject(array $checkedArray, array $arrayData)
    {
        return ELearningSubject::updateOrCreate($checkedArray, $arrayData);
    }

    public function updateELearningSubject($id, array $arrayData)
    {
        return ELearningSubject::whereId($id)->update($arrayData);
    }

    public function getActiveAllELearningSubject()
    {
        return ELearningSubject::where('status', Status::ACTIVE)
            ->get();
    }

    public function getActiveELearningSubjectNameAndId()
    {
        return ELearningSubject::where('status', Status::ACTIVE)
            ->select('id', 'title')
            ->get();
    }

    // subject group
    public function getAllSubjectGroup()
    {
        return SubjectGroup::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getSubjectGroupById($id)
    {
        return SubjectGroup::findOrFail($id);
    }

    public function deleteSubjectGroup($id)
    {
        return SubjectGroup::destroy($id);
    }

    public function createSubjectGroup(array $arrayData)
    {
        return SubjectGroup::create($arrayData);
    }

    public function updateOrCreateSubjectGroup(array $checkedArray, array $arrayData)
    {
        return SubjectGroup::updateOrCreate($checkedArray, $arrayData);
    }

    public function updateSubjectGroup($id, array $arrayData)
    {
        return SubjectGroup::whereId($id)->update($arrayData);
    }

    public function getActiveAllSubjectGroup()
    {
        return SubjectGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveSubjectGroupNameAndId()
    {
        return SubjectGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'name as title')
            ->get();
    }

    public function getTeacherSubjectsByTeacherIdAndClassNameId(int $teacherId, int $classNameId, $schoolId = null, $academicYearId = null)
    {
        $classroomIds = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_teacher_id', $teacherId)
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();

        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('classroomSubjects', function ($query) use ($teacherId, $classroomIds) {
                $query->whereIn('classroom_id', $classroomIds)
                    ->whereJsonContains('teachers_data', ['teacher_id' => $teacherId]);
            })
            ->select('id', 'title',)
            ->get();
    }

    public function getSubjectsByClassNameId(int $classNameId, $schoolId = null, $academicYearId = null)
    {
        $classroomIds = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();

        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomSubjects', function ($query) use ($classroomIds) {
                $query->whereIn('classroom_id', $classroomIds);
            })
            ->select('id', 'title',)
            ->get();
    }

    public function getTeacherSubjectsByTeacherIdAndClassroomId(int $teacherId, int $classroomId, $schoolId = null)
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('classroomSubjects', function ($query) use ($teacherId, $classroomId) {
                $query->where('classroom_id', $classroomId)
                    ->whereJsonContains('teachers_data', ['teacher_id' => $teacherId]);
            })
            ->select('id', 'title')
            ->get();
    }

    public function getSubjectsByClassroomId(int $classroomId, $schoolId = null)
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('classroomSubjects', function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->select('id', 'title')
            ->get();
    }

    public function getTeacherSubjectsByTeacherId(int $teacherId)
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomSubjects', function ($query) use ($teacherId) {
                $query->whereJsonContains('teachers_data', ['teacher_id' => $teacherId]);
            })
            ->select('id', 'title')
            ->get();
    }
}
