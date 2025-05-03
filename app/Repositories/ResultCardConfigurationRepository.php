<?php

namespace App\Repositories;

use App\Models\ResultCardConfiguration;
use App\Enums\Status;

class ResultCardConfigurationRepository implements IRepository, IResultCardConfigurationRepository
{
    public function getAll()
    {
        return ResultCardConfiguration::all();
    }

    public function getById($id)
    {
        return ResultCardConfiguration::findOrFail($id);
    }

    public function delete($id)
    {
        return ResultCardConfiguration::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ResultCardConfiguration::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ResultCardConfiguration::whereId($id)->update($arrayData);
    }


    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return ResultCardConfiguration::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll()
    {
        return ResultCardConfiguration::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select(
                'id',
                'exam_id',
                'board_id',
                'rule_type',
                'title',
                'attendance_type',
            )
            ->get();
    }


    public function getConfigurationById(int $id)
    {
        return ResultCardConfiguration::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select(
                'id',
                'board_id',
                'exam_id',
                'rule_type',
                'title',
                'attendance_type',
            )
            ->first();
    }


    public function getConfigurationByClassNameId(int $classNameId)
    {
        return ResultCardConfiguration::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('configurationClassNames', function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->select(
                'id',
                'board_id',
                'exam_id',
                'rule_type',
                'title',
                'attendance_type',
            )
            ->with(['examGroups'])
            ->first();
    }
}
