<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\JobPost;

class JobRepository implements IRepository, IJobRepository
{
    public function getAll()
    {
        return JobPost::latest()->get();
    }

    public function getById($id)
    {
        return JobPost::findOrFail($id);
    }

    public function delete($id)
    {
        JobPost::destroy($id);
    }

    public function create(array $arrayData)
    {
        return JobPost::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return JobPost::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return JobPost::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getRegisterAll()
    {
        return JobPost::where('status', Status::ACTIVE)->latest()->get();
    }
}
