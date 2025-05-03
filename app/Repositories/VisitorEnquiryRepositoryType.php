<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\VisitorEnquiryType;

class VisitorEnquiryRepositoryType implements IRepository, IVisitorEnquiryRepositoryType
{
    public function getAll()
    {
        return VisitorEnquiryType::all();
    }

    public function getById($id)
    {
        return VisitorEnquiryType::findOrFail($id);
    }

    public function delete($id)
    {
        VisitorEnquiryType::destroy($id);
    }

    public function create(array $arrayData)
    {
        return VisitorEnquiryType::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return VisitorEnquiryType::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return VisitorEnquiryType::where('status', Status::ACTIVE)
            ->orderBy('title', 'asc')
            ->get();
    }

    public function getRegisterAll()
    {
        return VisitorEnquiryType::where('status', Status::ACTIVE);
    }
}