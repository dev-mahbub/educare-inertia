<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Company;

class CompanyRepository implements IRepository, ICompanyRepository
{
    public function getAll()
    {
        return Company::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Company::findOrFail($id);
    }

    public function delete($id)
    {
        Company::destroy($id);
    }

    public function deleteSubCat($id)
    {
        return Company::where('parent_id', $id)->delete();
    }

    public function create(array $arrayData)
    {
        return Company::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Company::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return Company::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveList($search = '')
    {
        $query = Company::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId());
        if (!empty($search)) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('title', 'like', '%' . $search . '%')
                    ->orWhere('mobile', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%');
            });
        }
        return $query->latest()->get();
    }

    public function getRegisterAll()
    {
        return Company::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId()
    {
        return Company::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->latest()
            ->get();
    }
}
