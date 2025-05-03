<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Library;
use App\Models\LibraryVendor;

class LibraryRepository implements IRepository, ILibraryRepository
{
    public function getAll()
    {
        return Library::all();
    }

    public function getById($id)
    {
        return Library::findOrFail($id);
    }

    public function delete($id)
    {
        Library::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Library::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Library::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Library::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return Library::where('status', Status::ACTIVE);
    }

    public function saveData($arrayData)
    {
        return Library::create($arrayData);
    }

    public function getActiveLibraries()
    {
        return Library::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->whereNull('parent_id')
            ->with(['childLibraries'])
            ->get();
    }

    public function findDataForShelf($id)
    {
        return Library::findOrFail($id);
    }

    public function updateDataForShelf($id, $arrayData)
    {
        return Library::where('id', $id)->update($arrayData);
    }


    // LibraryVendor
    public function getAllLibraryVendor()
    {
        return LibraryVendor::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAllLibraryVendor()
    {
        return LibraryVendor::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAllLibraryVendorName()
    {
        return LibraryVendor::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'vendor_name')
            ->get();
    }

    public function getByIdLibraryVendor($id)
    {
        return LibraryVendor::findOrFail($id);
    }

    public function deleteLibraryVendor($id)
    {
        LibraryVendor::destroy($id);
    }

    public function createLibraryVendor(array $arrayData)
    {
        return LibraryVendor::create($arrayData);
    }

    public function updateOrCreateLibraryVendor(array $checkData, array $arrayData)
    {
        return LibraryVendor::updateOrCreate($checkData, $arrayData);
    }

    public function updateLibraryVendor($id, array $arrayData)
    {
        return LibraryVendor::whereId($id)->update($arrayData);
    }
}
