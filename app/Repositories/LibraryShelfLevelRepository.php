<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\LibrarySelfLevel;

class LibraryShelfLevelRepository implements IRepository, ILibraryShelfLevelRepository
{
    public function getAll()
    {
        return LibrarySelfLevel::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return LibrarySelfLevel::findOrFail($id);
    }

    public function delete($id)
    {
        LibrarySelfLevel::destroy($id);
    }

    public function create(array $arrayData)
    {
        return LibrarySelfLevel::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return LibrarySelfLevel::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return LibrarySelfLevel::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAllData()
    {
        return LibrarySelfLevel::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }
}
