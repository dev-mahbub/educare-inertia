<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\OrganizeFolder;
use Illuminate\Database\Eloquent\Model;

class OrganizeFolderRepository implements IRepository, IOrganizeFolderRepository
{
    public function getAll()
    {
        return OrganizeFolder::all();
    }

    public function getById($id)
    {
        return OrganizeFolder::findOrFail($id);
    }

    public function getMorphClasswork($id)
    {
        return OrganizeFolder::where('folderable_id', $id)
            ->where('folderable_type', \App\Models\Classwork::class)
            ->first();
    }

    public function getMorphHomework($id)
    {
        return OrganizeFolder::where('folderable_id', $id)
            ->where('folderable_type', \App\Models\Homework::class)
            ->first();
    }

    public function delete($id)
    {
        OrganizeFolder::destroy($id);
    }

    public function create(array $arrayData)
    {
        return OrganizeFolder::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return OrganizeFolder::whereId($id)->update($arrayData);
    }

    public function updateOrCreate(array $arrayMatch, array $arrayData)
    {
        return OrganizeFolder::updateOrCreate($arrayMatch, $arrayData);
    }

    public function morphHomeworkUpdate(array $arrayData, $id)
    {
        return OrganizeFolder::where('folderable_id', $id)
            ->where('folderable_type', \App\Models\Homework::class)
            ->update($arrayData);
    }

    public function morphClassworkUpdate(array $arrayData, $id)
    {
        return OrganizeFolder::where('folderable_id', $id)
            ->where('folderable_type', \App\Models\Classwork::class)
            ->update($arrayData);
    }

    public function morphHomeworkFolderAll($schoolId = null)
    {
        return OrganizeFolder::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('folderable_type', \App\Models\Homework::class)
            ->get();
    }

    public function morphClassworkFolderAll($schoolId = null)
    {
        return OrganizeFolder::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('folderable_type', \App\Models\Classwork::class)
            ->get();
    }

    public function getActiveAll()
    {
        return OrganizeFolder::all();
    }

    public function getRegisterAll()
    {
        return OrganizeFolder::all();
    }
}
