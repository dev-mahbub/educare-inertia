<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Bank;

class BankRepository implements IRepository, IBankRepository
{
    public function getAll()
    {
        return Bank::where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Bank::findOrFail($id);
    }

    public function delete($id)
    {
        Bank::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Bank::create($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return Bank::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function update($id, array $arrayData)
    {
        return Bank::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Bank::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getRegisterAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Bank::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return Bank::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId());
            })
            ->select('id', 'name')
            ->latest()
            ->get();
    }


    public function getBankByName($name, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Bank::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->where('name', $name)
            ->select('id', 'name')
            ->first();
    }
}
