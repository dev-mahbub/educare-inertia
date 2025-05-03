<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Notice;
use App\Models\NoticeClassroom;
use App\Enums\OrderByType;

class NoticeRepository implements IRepository, INoticeRepository
{
    public function getAll()
    {
        return Notice::all();
    }

    public function getById($id)
    {
        return Notice::findOrFail($id);
    }

    public function delete($id)
    {
        Notice::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Notice::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Notice::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Notice::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return Notice::where('status', Status::ACTIVE);
    }

    public function getNoticeById(int $id)
    {
        return Notice::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->with(['image', 'noticeClassrooms'])
            ->first();
    }

    public function getFilteredNoticeLists(string $noticeStatus = "", string $orderByDate = "", string $audienceType = "", $schoolId = null)
    {
        $noticeStatusMap = [
            'published' => true,
            'unpublished' => false,
        ];

        return Notice::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where(function ($query) use ($noticeStatusMap, $noticeStatus, $audienceType) {
                if (!empty($noticeStatus)) {
                    $is_published = $noticeStatusMap[strtolower($noticeStatus)] ?? null;

                    $query->where('is_published', $is_published);
                }

                if (!empty($audienceType)) {
                    $query->where('audience_type', $audienceType);
                }
            })
            ->when(!empty($orderByDate), function ($query) use ($orderByDate) {
                if ($orderByDate == OrderByType::CREATED_DATE->value) {
                    $query->orderBy('created_at', 'asc');
                }

                if ($orderByDate == OrderByType::PUBLISHED_DATE->value) {
                    $query->orderBy('start_date', 'asc');
                }
            })
            ->with(['image', 'createdBy'])
            ->get();
    }

    public function getStudentFilteredNoticeLists(string $noticeStatus = "", string $orderByDate = "", string $audienceType = "", $schoolId = null, int $classroomId,$academicYearId, string $noticeType)
    {
        $newsStatusMap = [
            'published' => true,
            'unpublished' => false,
        ];

        return Notice::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId()) 
            ->whereHas('noticeClassrooms', function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->where(function ($query) use ($newsStatusMap, $noticeStatus, $audienceType, $noticeType) {
                if (!empty($noticeStatus)) {
                    $is_published = $noticeStatusMap[strtolower($noticeStatus)] ?? null;

                    $query->where('is_published', $is_published);
                }

                if (!empty($audienceType)) {
                    $query->where('audience_type', $audienceType);
                }

                if (!empty($noticeType)) {
                    $query->where('notice_type', $noticeType);
                }
            })
            ->when(!empty($orderByDate), function ($query) use ($orderByDate) {
                if ($orderByDate == OrderByType::CREATED_DATE->value) {
                    $query->orderBy('created_at', 'asc');
                }

                if ($orderByDate == OrderByType::PUBLISHED_DATE->value) {
                    $query->orderBy('start_date', 'asc');
                }
            })
            ->with(['image', 'createdBy'])
            ->get();
    }

    public function createNoticeClassroom(array $arrayData)
    {
        return NoticeClassroom::create($arrayData);
    }

    public function updateOrCreateNoticeClassroom(array $attributesToCheck, array $valuesToUpdate)
    {
        return NoticeClassroom::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function deleteNoticeClassroomsByIds(int $noticeId, array $classroomIds = [])
    {
        return NoticeClassroom::where('school_id', getUserSchoolId())
            ->where('notice_id', $noticeId)
            ->whereIn('classroom_id', $classroomIds)
            ->delete();
    }
}
