<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\School;

class SalaryRepository implements IRepository, ISalaryRepository
{
    public function getAll()
    {
        return School::all();
    }

    public function getById($id)
    {
        return School::findOrFail($id);
    }

    public function delete($id)
    {
        School::destroy($id);
    }

    public function create(array $arrayData)
    {
        return School::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return School::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return School::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return School::where('status', Status::ACTIVE);
    }
}