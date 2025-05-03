<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\EarningType;

class EarningTypeRepository implements IRepository, IEarningTypeRepository
{
    public function getAll()
    {
        return EarningType::all();
    }

    public function getById($id)
    {
        return EarningType::findOrFail($id);
    }

    public function delete($id)
    {
        return EarningType::destroy($id);
    }

    public function create(array $arrayData)
    {
        return EarningType::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return EarningType::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return EarningType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->select(
                'id',
                'title',
                'description',
                'is_system_default'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return EarningType::where('status', Status::ACTIVE);
    }

    public function getEarningTypeById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return EarningType::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'description',
                'is_system_default'
            )
            ->first();
    }

    public function getEarningTypesByIds(array $ids, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return EarningType::where('status', Status::ACTIVE)
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

    public function getFilteredEarningTypes(array $typesToExclude = [], int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return EarningType::where('status', Status::ACTIVE)
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

    public function getEarningTypeByTitle(string $title, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return EarningType::where('status', Status::ACTIVE)
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

    public function getDefaultEarningTypeByTitle(string $title, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return EarningType::where('status', Status::ACTIVE)
            ->whereNull('school_id')
            ->where('is_system_default', true)
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
