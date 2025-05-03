<?php

namespace App\Repositories;

use App\Models\News;
use App\Enums\Status;
use App\Enums\OrderByType;
use App\Models\NewsClassroom;

class NewsRepository implements IRepository, INewsRepository
{
    public function getAll()
    {
        return News::all();
    }

    public function getById($id)
    {
        return News::findOrFail($id);
    }

    public function delete($id)
    {
        News::destroy($id);
    }

    public function create(array $arrayData)
    {
        return News::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return News::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return News::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return News::where('status', Status::ACTIVE);
    }

    public function getNewsById(int $id)
    {
        return News::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->with(['image', 'newsClassrooms'])
            ->first();
    }

    public function getFilteredNewsLists(string $newsStatus = "", string $orderByDate = "", string $audienceType = "", $schoolId = null)
    {
        $newsStatusMap = [
            'published' => true,
            'unpublished' => false,
        ];

        return News::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where(function ($query) use ($newsStatusMap, $newsStatus, $audienceType) {
                if (!empty($newsStatus)) {
                    $is_published = $newsStatusMap[strtolower($newsStatus)] ?? null;

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

    public function getStudentFilteredNewsLists(string $newsStatus = "", string $orderByDate = "", string $audienceType = "", $schoolId = null, int $classroomId,$academicYearId, string $newsType)
    {
        $newsStatusMap = [
            'published' => true,
            'unpublished' => false,
        ];

        return News::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId()) 
            ->whereHas('newsClassrooms', function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->where(function ($query) use ($newsStatusMap, $newsStatus, $audienceType, $newsType) {
                if (!empty($newsStatus)) {
                    $is_published = $newsStatusMap[strtolower($newsStatus)] ?? null;

                    $query->where('is_published', $is_published);
                }

                if (!empty($audienceType)) {
                    $query->where('audience_type', $audienceType);
                }

                if (!empty($newsType)) {
                    $query->where('news_type', $newsType);
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

    public function createNewsClassroom(array $arrayData)
    {
        return NewsClassroom::create($arrayData);
    }

    public function updateOrCreateNewsClassroom(array $attributesToCheck, array $valuesToUpdate)
    {
        return NewsClassroom::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function deleteNewsClassroomsByIds(int $newsId, array $classroomIds = [])
    {
        return NewsClassroom::where('school_id', getUserSchoolId())
            ->where('news_id', $newsId)
            ->whereIn('classroom_id', $classroomIds)
            ->delete();
    }
}
