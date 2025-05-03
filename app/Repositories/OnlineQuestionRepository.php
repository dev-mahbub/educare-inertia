<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\OnlineQuestion;
use App\Models\OnlineQuestionDiscussion;
use Illuminate\Support\Facades\Auth;

class OnlineQuestionRepository implements IRepository, IOnlineQuestionRepository
{
    public function getAll()
    {
        return OnlineQuestion::all()->latest()->get();
    }

    public function getById($id)
    {
        return OnlineQuestion::findOrFail($id);
    }

    public function delete($id)
    {
        return OnlineQuestion::destroy($id);
    }

    public function create(array $arrayData)
    {
        return OnlineQuestion::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return OnlineQuestion::whereId($id)->update($arrayData);
    }

    public function getActiveAll($classId = null, $subjectId = null, $topicId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineQuestion::where('status', Status::ACTIVE)
            ->withCount('discussions')
            ->with(['className', 'onlineTopic', 'subject'])
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            //->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($topicId), function ($query) use ($topicId) {
                $query->where('online_topic_id', $topicId);
            })
            ->get();
        
    }

    public function myActiveAll($userId = null, $classId = null, $subjectId = null, $topicId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineQuestion::where('status', Status::ACTIVE)
            ->withCount('discussions')
            ->with(['className', 'onlineTopic', 'subject'])
            ->where('user_id', ($userId != null) ? $userId : Auth::user()->id)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            //->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($topicId), function ($query) use ($topicId) {
                $query->where('online_topic_id', $topicId);
            })
            ->get();
        
    }

    public function resolvedActiveAll($classId = null, $subjectId = null, $topicId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineQuestion::where('status', Status::ACTIVE)
            ->withCount('discussions')
            ->with(['className', 'onlineTopic', 'subject'])
            ->where('question_status', 'Resolved')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            //->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($topicId), function ($query) use ($topicId) {
                $query->where('online_topic_id', $topicId);
            })
            ->get();
        
    }

    public function newActiveAll($classId = null, $subjectId = null, $topicId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineQuestion::where('status', Status::ACTIVE)
            ->withCount('discussions')
            ->with(['className', 'onlineTopic', 'subject'])
            ->where('question_status', 'New')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            //->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($topicId), function ($query) use ($topicId) {
                $query->where('online_topic_id', $topicId);
            })
            ->get();
    }

    public function unansweredActiveAll($classId = null, $subjectId = null, $topicId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineQuestion::where('status', Status::ACTIVE)
            ->withCount('discussions')
            ->with(['className', 'onlineTopic', 'subject'])
            ->where('question_status', 'New')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            //->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($topicId), function ($query) use ($topicId) {
                $query->where('online_topic_id', $topicId);
            })
            ->get();
    }

    public function getRegisterAll()
    {
        return OnlineQuestion::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getDiscussionById($id)
    {
        return OnlineQuestionDiscussion::findOrFail($id);
    }

    public function deleteDiscussion($id)
    {
        return OnlineQuestionDiscussion::destroy($id);
    }

    public function createDiscussion(array $arrayData)
    {
        return OnlineQuestionDiscussion::create($arrayData);
    }

    public function updateDiscussion($id, array $arrayData)
    {
        return OnlineQuestionDiscussion::whereId($id)->update($arrayData);
    }

    public function getDiscussionActiveAll($type = null, $onlineQuestionId = null, $userId = null, $schoolId = null, $academicYearId = null)
    {
        return OnlineQuestionDiscussion::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            //->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($onlineQuestionId), function ($query) use ($onlineQuestionId) {
                $query->where('online_question_id', $onlineQuestionId);
            })
            ->when(!empty($userId), function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->when(!empty($type), function ($query) use ($type) {
                $query->where('type', $type);
            })
            ->get();
        
    }

}
