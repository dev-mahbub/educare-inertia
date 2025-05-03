<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentGatePass;

class GatePassRepository implements IRepository, IGatePassRepository
{
    public function getAll()
    {
        return StudentGatePass::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }
    public function getById($id)
    {
        return StudentGatePass::findOrFail($id);
    }

    public function delete($id)
    {
        return StudentGatePass::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentGatePass::create($arrayData);
    }

    public function updateOrCreate(array $conditionData, array $arrayData)
    {
        return StudentGatePass::updateOrCreate($conditionData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentGatePass::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentGatePass::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getGatePassByClassroomId($classroomId)
    {
        return StudentGatePass::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->get();
    }

    public function getLastId()
    {
        $lastId = StudentGatePass::latest()->first('id');
        if (!empty($lastId)) {
            return $lastId?->id;
        } else {
            return 0;
        }
    }

    public function getActiveAllWithSearch($search = null)
    {
        return StudentGatePass::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) use ($search) {
                $query->where('relation_type', 'like', '%' . $search . '%')
                    ->orWhere('visiting_person', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            })
            ->latest()
            ->get();
    }
}
