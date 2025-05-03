<?php

namespace App\Repositories;

use App\Enums\CompanyType;
use App\Enums\Status;
use App\Enums\DriverType;
use App\Models\Driver;
use App\Models\DriverLogBook;

class DriverRepository implements IRepository, IDriverRepository
{
    public function getAll()
    {
        return Driver::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return Driver::findOrFail($id);
    }

    public function delete($id)
    {
        Driver::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Driver::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Driver::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null)
    {
        return Driver::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->get();
    }

    public function getActiveVehicleStaffsByIds(array $ids, $schoolId = null)
    {
        return Driver::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereIn('id', $ids)
            ->select(
                'id',
                'first_name',
                'last_name',
                'contact',
                'type'
            )
            ->get();
    }

    public function getDriverAll()
    {
        return Driver::where('school_id', getUserSchoolId())
            ->with(['vehicleStaffImage'])
            ->get();
    }

    public function getActiveDriverAll()
    {
        return Driver::where('status', Status::ACTIVE)
            ->where('type', DriverType::DRIVER)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveConductorAll()
    {
        return Driver::where('status', Status::ACTIVE)
            ->where('type', DriverType::CONDUCTOR)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getDriverById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Driver::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('type', DriverType::DRIVER)
            ->where('id', $id)
            ->select(
                'id',
                'first_name',
                'last_name',
                'contact',
                'type'
            )
            ->first();
    }

    // DriverLogBook
    public function getAllDriverLogBook()
    {
        return DriverLogBook::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getByDriverLogBookId($id)
    {
        return DriverLogBook::findOrFail($id);
    }

    public function deleteDriverLogBook($id)
    {
        DriverLogBook::destroy($id);
    }

    public function createDriverLogBook(array $arrayData)
    {
        return DriverLogBook::create($arrayData);
    }

    public function updateDriverLogBook($id, array $arrayData)
    {
        return DriverLogBook::whereId($id)->update($arrayData);
    }

    public function getActiveAllDriverLogBook()
    {
        return DriverLogBook::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getDriverLogBookReport($vehicleId, $startDate, $endDate)
    {
        $query = DriverLogBook::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId());

        $query->where(function ($q) use ($vehicleId, $startDate, $endDate) {
            if (!empty($vehicleId)) {
                $q->where('vehicle_id', '=', $vehicleId);
            }
            if (!empty($startDate) && !empty($endDate)) {
                $q->whereBetween('date_at', [$startDate, $endDate]);
            } elseif (!empty($startDate)) {
                $q->where('date_at', '>=', $startDate);
            } elseif (!empty($endDate)) {
                $q->where('date_at', '<=', $endDate);
            }
        });

        return $query->get();
    }
}
