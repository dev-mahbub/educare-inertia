<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\AcademicYear;

class AcademicYearRepository implements IRepository, IAcademicYearRepository
{
    public function getAll()
    {
        return AcademicYear::all()->latest()->get();
    }

    public function getById($id)
    {
        return AcademicYear::findOrFail($id);
    }

    public function delete($id)
    {
        AcademicYear::destroy($id);
    }

    public function create(array $arrayData)
    {
        return AcademicYear::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return AcademicYear::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveAcademicYearAndId()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'academic_session')->latest()->get();
    }

    public function getAcademicYearById(int $academicYearId)
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $academicYearId)
            ->select('id', 'academic_session')
            ->first();
    }


    public function getPreviousAcademicYears()
    {
        // new code
        $currentAcademicYear = $this->getCurrentAcademicYear();

        $startDate = $currentAcademicYear?->start_date_at;

        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', '!=', getAcademicYearId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('start_date_at', '<', $startDate);
            })
            ->orderBy('display_order', 'asc')
            ->select('academic_session as title', 'id')
            ->get();

        // old code
        // return AcademicYear::where('status', Status::ACTIVE)
        //     ->where('school_id', getUserSchoolId())
        //     ->where('id', '<', getAcademicYearId())
        //     ->orderBy('id', 'asc')
        //     ->select('academic_session as title', 'id')
        //     ->get();
    }

    public function getCurrentAcademicYear()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', getAcademicYearId())
            ->first();
    }

    public function getAcademicYearExceptCurrent()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereNotIn('id', [getAcademicYearId()])
            ->latest()
            ->get();
    }

    public function getCurrentYear()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', getAcademicYearId())
            ->first();
    }
}
