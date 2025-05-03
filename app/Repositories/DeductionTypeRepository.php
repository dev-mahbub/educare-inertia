<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\DeductionType;

class DeductionTypeRepository implements IRepository, IDeductionTypeRepository
{
    public function getAll()
    {
        return DeductionType::all();
    }

    public function getById($id)
    {
        return DeductionType::findOrFail($id);
    }

    public function delete($id)
    {
        return DeductionType::destroy($id);
    }

    public function create(array $arrayData)
    {
        return DeductionType::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return DeductionType::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DeductionType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->select(
                'id',
                'title',
                'description',
                'is_pf',
                'is_esi',
                'apply_absent_deduction',
                'is_system_default'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return DeductionType::where('status', Status::ACTIVE);
    }

    public function getDeductionTypeById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DeductionType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'description',
                'is_pf',
                'is_esi',
                'apply_absent_deduction',
                'is_system_default'
            )
            ->first();
    }

    public function getDeductionTypesByIds(array $ids, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DeductionType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->whereIn('id', $ids)
            ->select(
                'id',
                'title',
                'description',
                'is_system_default'
            )
            ->get();
    }

    public function getFilteredDeductionTypes(array $typesToExclude = [], int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DeductionType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->when(!empty($typesToExclude), function ($query) use ($typesToExclude) {
                $query->whereNotIn('title', $typesToExclude);
            })
            ->select(
                'id',
                'title',
                'description',
                'is_system_default'
            )
            ->get();
    }

    public function getDeductionTypeByTitle(string $title, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DeductionType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->where('title', $title)
            ->select(
                'id',
                'title',
                'description',
                'is_system_default'
            )
            ->first();
    }
}
