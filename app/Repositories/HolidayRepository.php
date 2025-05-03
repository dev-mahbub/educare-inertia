<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Holiday;
use App\Enums\HolidayType;

class HolidayRepository implements IRepository, IHolidayRepository
{
    public function getAll()
    {
        return Holiday::all()->latest()->get();
    }

    public function getById($id)
    {
        return Holiday::findOrFail($id);
    }

    public function delete($id)
    {
        Holiday::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Holiday::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Holiday::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null)
    {
        return Holiday::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Holiday::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getHolidaysForCalendar(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        return Holiday::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate) && !empty($endDate)) {
                    $query->whereBetween('start_date_at', [$startDate, $endDate])
                        ->orWhereBetween('end_date_at', [$startDate, $endDate])
                        ->orWhere(function ($query) use ($startDate, $endDate) {
                            $query->where('start_date_at', '<=', $startDate)
                                ->where('end_date_at', '>=', $endDate);
                        });
                } elseif (!empty($startDate)) {
                    $query->where('start_date_at', '>=', $startDate)
                        ->orWhere('end_date_at', '>=', $startDate);
                } elseif (!empty($endDate)) {
                    $query->where('start_date_at', '<=', $endDate)
                        ->orWhere('end_date_at', '<=', $endDate);
                }

                // if (!empty($startDate)) {
                //     $query->whereDate('start_date_at', '>=', $startDate);
                // }

                // if (!empty($endDate)) {
                //     $query->whereDate('end_date_at', '<=', $endDate);
                // }
            })
            ->select(
                'id',
                'name',
                'start_date_at',
                'end_date_at',
            )
            ->get();
    }

    public function getHolidaysForStudentCalendar(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        return Holiday::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereIn('holiday_type', [HolidayType::STUDENT_ONLY, HolidayType::STUDENT_TEACHER])
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate) && !empty($endDate)) {
                    $query->whereBetween('start_date_at', [$startDate, $endDate])
                        ->orWhereBetween('end_date_at', [$startDate, $endDate])
                        ->orWhere(function ($query) use ($startDate, $endDate) {
                            $query->where('start_date_at', '<=', $startDate)
                                ->where('end_date_at', '>=', $endDate);
                        });
                } elseif (!empty($startDate)) {
                    $query->where('start_date_at', '>=', $startDate)
                        ->orWhere('end_date_at', '>=', $startDate);
                } elseif (!empty($endDate)) {
                    $query->where('start_date_at', '<=', $endDate)
                        ->orWhere('end_date_at', '<=', $endDate);
                }

                // if (!empty($startDate)) {
                //     $query->whereDate('start_date_at', '>=', $startDate);
                // }

                // if (!empty($endDate)) {
                //     $query->whereDate('end_date_at', '<=', $endDate);
                // }
            })
            ->select(
                'id',
                'name',
                'start_date_at',
                'end_date_at',
                'holiday_type',
            )
            ->get();
    }

    public function getStudentActiveAll($schoolId = null)
    {
        return Holiday::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereIn('holiday_type', [HolidayType::STUDENT_ONLY, HolidayType::STUDENT_TEACHER])
            ->latest()
            ->get();
    }
}
