<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Page;

class PageRepository implements IRepository, IPageRepository
{
    public function getAll()
    {
        return Page::all()->latest()->get();
    }

    public function getById($id)
    {
        return Page::findOrFail($id);
    }

    public function delete($id)
    {
        Page::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Page::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Page::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Page::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return Page::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getPageByType($type = 'About Us', $schoolId = null)
    {
        return Page::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('page_type', $type)->first();
    }

    
}