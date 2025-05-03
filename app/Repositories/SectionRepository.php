<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Section;

class SectionRepository implements IRepository, ISectionRepository
{
    public function getAll()
    {
        return Section::all();
    }

    public function getById($id)
    {
        return Section::findOrFail($id);
    }

    public function delete($id)
    {
        return Section::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Section::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Section::whereId($id)->update($arrayData);
    }

    public function updateByClassNameId($id, array $arrayData)
    {
        return Section::where('class_name_id', $id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Section::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getRegisterAll()
    {
        return Section::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    // Delete sections from class id
    public function deleteFromClassId($class_id)
    {
        Section::where('class_name_id', $class_id)->delete();
    }

    public function getSectionsByClassId(int $class_id)
    {
        return Section::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->where('academic_year_id', getAcademicYearId())
                ->where('class_name_id', $class_id)
                ->get();
    }

    public function existSectionsByClassId(int $class_id)
    {
        return Section::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->where('academic_year_id', getAcademicYearId())
                ->where('class_name_id', $class_id)
                ->count();
    }
}
