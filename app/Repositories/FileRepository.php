<?php

namespace App\Repositories;

use App\Models\File;
use App\Enums\Status;

class FileRepository implements IRepository, IFileRepository
{
    public function getAll()
    {
        return File::all();
    }

    public function getById($id)
    {
        return File::findOrFail($id);
    }

    public function delete($id)
    {
        File::destroy($id);
    }

    public function create(array $arrayData)
    {
        return File::create($arrayData);
    }

    public function morphCreate(array $arrayData)
    {
        return File::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return File::whereId($id)->update($arrayData);
    }

    public function updateTwo(int $id, string $name, string $model, array $arrayData)
    {
        return File::where('name', $name)
            ->where('school_id', getUserSchoolId())
            ->where('imageable_id', $id)
            ->where('imageable_type', $model)
            ->update($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return File::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll()
    {
        return File::where('status', Status::ACTIVE)
            ->get();
    }

    public function getFileById(int $id)
    {
        return File::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->first();
    }
}
