<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\AcademicSyllabus;
use App\Repositories\IAcademicSyllabusRepository;

class AcademicSyllabusRepository implements IRepository, IAcademicSyllabusRepository
{
    public function getAll()
    {
        return AcademicSyllabus::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->all();
    }

    public function getById($id)
    {
        return AcademicSyllabus::findOrFail($id);
    }

    public function delete($id)
    {
        return AcademicSyllabus::destroy($id);
    }

    public function create(array $arrayData)
    {
        return AcademicSyllabus::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return AcademicSyllabus::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return AcademicSyllabus::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getSyllabusBySearch($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null)
    {
        return AcademicSyllabus::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->get();
    }

    public function getRegisterAll()
    {
        return AcademicSyllabus::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }
}
