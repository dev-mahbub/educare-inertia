<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\AcademicRemark;
use App\Models\Mark;
use App\Repositories\IExamMarkRepository;

class ExamMarkRepository implements IRepository, IExamMarkRepository
{
    public function getAll()
    {
        return Mark::all();
    }

    public function getById($id)
    {
        return Mark::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return Mark::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        Mark::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Mark::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Mark::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Mark::where('status', Status::ACTIVE)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return Mark::where('status', Status::ACTIVE);
    }
}
