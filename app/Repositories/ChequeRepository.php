<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Cheque;

class ChequeRepository implements IRepository, IChequeRepository
{
    public function getAll()
    {
        return Cheque::all();
    }

    public function getById($id)
    {
        return Cheque::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return Cheque::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        Cheque::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Cheque::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Cheque::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Cheque::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('id', 'ASC')
            ->get();
    }

    public function getActiveAllByStatus($chequeStatus = '')
    {
        return Cheque::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('cheque_status', $chequeStatus)
            ->orderBy('id', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return Cheque::where('status', Status::ACTIVE);
    }

    public function getActiveAllByClassroomId(int $classroomId = null)
    {
        return Cheque::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function getFilteredData(int $classroomId = null, int $studentId = null)
    {
        return Cheque::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->when(!empty($studentId), function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->orderBy('id', 'ASC')
            ->get();
    }

    public function getCurrentSessionWiseById(int $id)
    {
        return Cheque::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->firstOrFail();
    }
}
