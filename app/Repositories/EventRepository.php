<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Event;
use App\Models\EventStaff;
use App\Models\AcademicYear;
use App\Models\EventActivity;
use App\Models\EventDocument;

class EventRepository implements IRepository, IEventRepository
{
    public function getAll()
    {
        return Event::all();
    }

    public function getById($id)
    {
        return Event::with('image')
            ->where('id', $id)
            ->first();
    }

    public function delete($id)
    {
        Event::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Event::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Event::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Event::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['image'])
            ->select(
                'id',
                'title',
                'event_type',
                'event_level',
                'location',
                'description',
                'created_by',
                'start_datetime',
                'end_datetime',
                'start_time',
                'is_published',
                'created_at',
            )
            ->get();
    }

    public function getFilteredEvents(
        string $eventStatus = "",
        string $eventType = "",
        string $startDate = "",
        string $endDate = "",
        int $academicYearId = null,
        int $schoolId = null,
    ) {
        $eventStatusMap = [
            'published' => true,
            'unpublished' => false,
        ];

        return Event::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where(function ($query) use ($eventStatusMap, $eventStatus, $eventType, $startDate, $endDate, $academicYearId) {
                if (!empty($eventStatus)) {
                    $eventStatus = $eventStatusMap[strtolower($eventStatus)] ?? null;
                    $query->where('is_published', $eventStatus);
                }

                if (!empty($eventType)) {
                    $query->where('event_type', $eventType);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_datetime', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_datetime', '<=', $endDate);
                }

                if (!empty($academicYearId)) {
                    $query->where('academic_year_id', $academicYearId);
                }
            })
            ->with(['image'])
            ->select(
                'id',
                'title',
                'event_budget',
                'event_type',
                'event_level',
                'location',
                'teaser',
                'description',
                'created_by',
                'start_datetime',
                'end_datetime',
                'start_time',
                'is_published',
                'status',
                'created_at',
            )
            ->get();
    }

    public function getPublishedEvents(string $startDate = "", string $endDate = "", int $schoolId = null)
    {
        return Event::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_published', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate) && !empty($endDate)) {
                    $query->whereBetween('start_datetime', [$startDate, $endDate])
                        ->orWhereBetween('end_datetime', [$startDate, $endDate])
                        ->orWhere(function ($query) use ($startDate, $endDate) {
                            $query->where('start_datetime', '<=', $startDate)
                                ->where('end_datetime', '>=', $endDate);
                        });
                } elseif (!empty($startDate)) {
                    $query->where('start_datetime', '>=', $startDate)
                        ->orWhere('end_datetime', '>=', $startDate);
                } elseif (!empty($endDate)) {
                    $query->where('start_datetime', '<=', $endDate)
                        ->orWhere('end_datetime', '<=', $endDate);
                }
                // if (!empty($startDate)) {
                //     $query->whereDate('start_datetime', '>=', $startDate);
                // }

                // if (!empty($endDate)) {
                //     $query->whereDate('end_datetime', '<=', $endDate);
                // }
            })
            ->select(
                'id',
                'title',
                'start_datetime',
                'end_datetime',
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return Event::where('status', Status::ACTIVE);
    }

    public function getEventById(int $id, $schoolId = null)
    {
        return Event::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->with(['image'])
            ->first();
    }

    public function getEventActivityById(int $id, int $eventId = null)
    {
        return EventActivity::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->when(!empty($eventId), function ($query) use ($eventId) {
                $query->where('event_id', $eventId);
            })
            ->first();
    }

    public function createEventActivity(array $arrayData)
    {
        return EventActivity::create($arrayData);
    }

    public function updateEventActivity(int $id, array $arrayData)
    {
        return EventActivity::where('id', $id)->update($arrayData);
    }

    public function updateOrCreateEventStaff(array $attributesToCheck, array $valuesToUpdate)
    {
        return EventStaff::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function deleteEventStaffByIds(int $eventId, array $ids = [])
    {
        return EventStaff::where('school_id', getUserSchoolId())
            ->where('event_id', $eventId)
            ->whereIn('staff_id', $ids)
            ->delete();
    }

    public function createEventDocument(array $arrayData)
    {
        return EventDocument::create($arrayData);
    }

    public function getEventDocumentById(int $id, int $eventId = null)
    {
        return EventDocument::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->when(!empty($eventId), function ($query) use ($eventId) {
                $query->where('event_id', $eventId);
            })
            ->first();
    }
}
