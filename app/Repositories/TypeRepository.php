<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Enums\TypeEnum;
use App\Models\School;
use App\Models\Type;

class TypeRepository implements IRepository, ITypeRepository
{
    public function getAll()
    {
        return Type::where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Type::findOrFail($id);
    }

    public function delete($id)
    {
        Type::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Type::create($arrayData);
    }

    public function updateOrCreate(array $checkArr, array $arrayData)
    {
        return Type::updateOrCreate($checkArr, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Type::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return Type::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveAllBookType()
    {
        return Type::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', TypeEnum::BOOK->value)
            ->latest()
            ->get();
    }

    public function getActiveAllBookTypeNameId()
    {
        return Type::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('type', TypeEnum::BOOK->value)
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveNameAndId()
    {
        return Type::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveAllVoucherType(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Type::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->where('type', TypeEnum::VOUCHER->value)
            ->get();
    }

    public function getTypeByTitle(string $title, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Type::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', $schoolId);
            })
            ->where('title', $title)
            ->first();
    }
}
