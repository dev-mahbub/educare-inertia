<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentNote;
use App\Repositories\IStudentNoteRepository;

class StudentNoteRepository implements IRepository, IStudentNoteRepository
{
    public function getAll()
    {
        return StudentNote::all();
    }

    public function getById($id)
    {
        return StudentNote::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return StudentNote::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        StudentNote::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentNote::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentNote::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentNote::where('status', Status::ACTIVE)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return StudentNote::where('status', Status::ACTIVE);
    }
}
