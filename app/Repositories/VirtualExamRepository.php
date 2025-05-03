<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Enums\Status;
use App\Models\VirtualExam;
use App\Enums\PublishStatus;
use App\Models\VirtualAsset;
use App\Enums\VirtualExamMode;
use App\Models\VirtualQuestion;
use Illuminate\Support\Facades\DB;
use App\Models\VirtualQuestionBank;
use App\Enums\VirtualExamStatusType;
use App\Models\VirtualExamStudentAttemptes;


class VirtualExamRepository implements IRepository, IVirtualExamRepository
{
    public function getAll()
    {
        return VirtualExam::all();
    }

    public function getById($id)
    {
        return VirtualExam::findOrFail($id);
    }

    public function delete($id)
    {
        return VirtualExam::destroy($id);
    }

    public function create(array $arrayData)
    {
        return VirtualExam::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return VirtualExam::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return VirtualExam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return VirtualExam::where('status', Status::ACTIVE);
    }

    public function getTodayExams($schoolId = null, $startDate = null, $classId = null, $subjectId = null)
    {
        return VirtualExam::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('start_date_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            })
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:users.id,users.first_name,users.middle_name,users.last_name'
            ])
            ->get();
    }

    public function getExamsList($schoolId = null, $startDate = null, $endDate = null, $classId = null, $subjectId = null)
    {
        return VirtualExam::where('status', Status::ACTIVE)
            ->where('is_schedule_exam', 0)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('start_date_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('end_date_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
            })
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:users.id,users.first_name,users.middle_name,users.last_name'
            ])
            ->get();
    }

    public function getScheduleExams($schoolId = null, $startDate = null, $endDate = null, $classId = null, $subjectId = null, $examMode = null)
    {
        return VirtualExam::where('status', Status::ACTIVE)
            ->where('is_schedule_exam', 1)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('start_date_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('end_date_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
            })
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($examMode), function ($query) use ($examMode) {
                $query->where('exam_mode', $examMode);
            })
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:users.id,users.first_name,users.middle_name,users.last_name'
            ])
            ->get();
    }

    public function getVirtualExamById(int $id, int $schoolId = null)
    {
        return VirtualExam::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->with([
                'className:id,title',
                'subject:id,title'
            ])
            ->select(
                'id',
                'title',
                'exam_code',
                'exam_mode',
                'start_date_at',
                'end_date_at',
                'start_time_at',
                'end_time_at',
                'duration_hour',
                'duration_minute',
                'instruction_hour',
                'instruction_minute',
                'instruction_details',
                'total_mark',
                'pass_mark',
                'display_order',
                'is_schedule_exam',
                'is_shuffle_question',
                'live_link',
                'status',
                'class_name_id',
                'subject_id',
                'questions',
                'classrooms',
                'is_published'
            )
            ->first();
    }

    public function getFilteredVirtualExams(
        int $classNameId = null,
        int $subjectId = null,
        string $examMode = '',
        string $startDate = '',
        string $endDate = '',
        int $schoolId = null,
        string $examStatus = '',
        int $userId = null
    ) {
        return VirtualExam::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where(function ($query) use ($classNameId, $subjectId, $examMode, $startDate, $endDate, $examStatus, $userId) {
                if (!empty($classNameId)) {
                    $query->where('class_name_id', $classNameId);
                }

                if (!empty($subjectId)) {
                    $query->where('subject_id', $subjectId);
                }

                if (!empty($examMode)) {
                    $query->where('exam_mode', $examMode);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_date_at', '<=', $endDate);
                }

                if (!empty($examStatus)) {
                    if ($examStatus == VirtualExamStatusType::TODAYS_EXAM->value) {
                        $query->whereDate('start_date_at', Carbon::now()->format('Y-m-d'));
                    } else if ($examStatus == VirtualExamStatusType::ATTEMPTED_EXAM->value) {
                        $query->whereHas('studentAttempts', function($q) use($userId) {
                            $q->where('student_id', $userId);
                        });
                    } else if ($examStatus == VirtualExamStatusType::UNATTEMPTED_EXAM->value) {
                        $query->whereDoesntHave('studentAttempts', function($q) use($userId) {
                            $q->where('student_id', $userId); 
                        });
                    }
                }

            })
            ->with([
                'createdBy:id,first_name,middle_name,last_name',
                'subject:id,title',
                'className:id,title',
            ])
            ->select(
                'id',
                'created_by',
                'title',
                'exam_code',
                'exam_mode',
                'start_date_at',
                'end_date_at',
                'start_time_at',
                'end_time_at',
                'duration_hour',
                'duration_minute',
                'instruction_hour',
                'instruction_minute',
                'instruction_details',
                'total_mark',
                'pass_mark',
                'display_order',
                'is_schedule_exam',
                'is_shuffle_question',
                'live_link',
                'status',
                'class_name_id',
                'subject_id',
                'questions',
                'classrooms',
                'is_published'
            )
            ->get();
    }

    public function getVirtualExamSummaryData(string $startDate, string $endDate, int $schoolId = null)
    {
        return VirtualExam::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereDate('start_date_at', '>=', $startDate)
            ->whereDate('end_date_at', '<=', $endDate)
            ->where('is_published', true)
            ->with([
                'subject:id,title',
                'className:id,title'
            ])
            ->select(
                'id',
                'title',
                'exam_code',
                'start_date_at',
                'start_time_at',
                'class_name_id',
                'subject_id',
                'classrooms'
            )
            ->get();
    }

    public function getVirtualAssetById($id)
    {
        return VirtualAsset::findOrFail($id);
    }

    public function deleteVirtualAsset($id)
    {
        return VirtualAsset::destroy($id);
    }

    public function createVirtualAsset(array $arrayData)
    {
        return VirtualAsset::create($arrayData);
    }

    public function updateVirtualAsset($id, array $arrayData)
    {
        return VirtualAsset::whereId($id)->update($arrayData);
    }

    public function getFilteredVirtualAssets(
        int $classNameId = null,
        int $subjectId = null,
        int $topicId = null,
        string $assetType = '',
        bool $isPublished = null,
        int $schoolId = null
    ) {
        return VirtualAsset::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($topicId), function ($query) use ($topicId) {
                $query->where('online_topic_id', $topicId);
            })
            ->when(!empty($assetType), function ($query) use ($assetType) {
                $query->where('asset_type', $assetType);
            })
            ->when(!is_null($isPublished), function ($query) use ($isPublished) {
                $query->where('is_publish', $isPublished);
            })
            ->with([
                'className:id,title',
                'subject:id,title',
                'onlineTopic:id,title',
                'image',
                'user'
            ])
            ->select(
                'id',
                'title',
                'class_name_id',
                'subject_id',
                'online_topic_id',
                'created_by',
                'asset_type',
                'is_publish',
                'video_link',
                'description'
            )
            ->get();
    }

    public function createVirtualQuestion(array $arrayData)
    {
        return VirtualQuestion::create($arrayData);
    }

    public function updateVirtualQuestion(int $id, array $arrayData)
    {
        return VirtualQuestion::where('id', $id)->update($arrayData);
    }

    public function updateBulkVirtualQuestionStatus(array $arrayData, int $classNameId, int $subjectId = null, int $schoolId = null)
    {
        return VirtualQuestion::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('class_name_id', $classNameId)
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->update($arrayData);
    }

    public function deleteVirtualQuestion(int $id)
    {
        return VirtualQuestion::destroy($id);
    } 

    public function getFilteredVirtualSharedQuestions(
        int $classNameId = null,
        int $subjectId = null,
        int $onlineTopicId = null,
        int $virtualAssetId = null,
        string $questionType = '',
        string $difficultyLevel = '',
        string $language = '',
        string $publishStatus = '',
        string $status = '',
        int $schoolId = null,
        int $userId = null
    ) {
        return VirtualQuestion::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereNot('created_by', $userId)
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($onlineTopicId), function ($query) use ($onlineTopicId) {
                $query->where('online_topic_id', $onlineTopicId);
            })
            ->when(!empty($virtualAssetId), function ($query) use ($virtualAssetId) {
                $query->where('virtual_asset_id', $virtualAssetId);
            })
            ->when(!empty($questionType), function ($query) use ($questionType) {
                $query->where('question_type', $questionType);
            })
            ->when(!empty($difficultyLevel), function ($query) use ($difficultyLevel) {
                $query->where('difficulty_level', $difficultyLevel);
            })
            ->when(!empty($language), function ($query) use ($language) {
                $query->where('language', $language);
            })
            ->when(!empty($status), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when(!empty($publishStatus), function ($query) use ($publishStatus) {
                if ($publishStatus == PublishStatus::PUBLISHED->value) {
                    $query->where('is_published', true);
                } else if ($publishStatus == PublishStatus::NOT_PUBLISHED->value) {
                    $query->where('is_published', false);
                }
            })
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:id,first_name,middle_name,last_name',
            ])
            ->select(
                'id',
                'created_by',
                'class_name_id',
                'subject_id',
                'virtual_asset_id',
                'online_topic_id',
                'question',
                'question_type',
                'answer_options',
                'language',
                'difficulty_level',
                'mark',
                'is_published',
                'status',
                'share_with',
                'created_at'
            )
            ->get();
    }

    public function getFilteredVirtualQuestions(
        int $classNameId = null,
        int $subjectId = null,
        int $onlineTopicId = null,
        int $virtualAssetId = null,
        string $questionType = '',
        string $difficultyLevel = '',
        string $language = '',
        string $publishStatus = '',
        string $status = '',
        int $schoolId = null,
        int $userId = null
    ) {
        return VirtualQuestion::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($userId), function ($query) use ($userId) {
                $query->where('created_by', $userId);
            })
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->when(!empty($onlineTopicId), function ($query) use ($onlineTopicId) {
                $query->where('online_topic_id', $onlineTopicId);
            })
            ->when(!empty($virtualAssetId), function ($query) use ($virtualAssetId) {
                $query->where('virtual_asset_id', $virtualAssetId);
            })
            ->when(!empty($questionType), function ($query) use ($questionType) {
                $query->where('question_type', $questionType);
            })
            ->when(!empty($difficultyLevel), function ($query) use ($difficultyLevel) {
                $query->where('difficulty_level', $difficultyLevel);
            })
            ->when(!empty($language), function ($query) use ($language) {
                $query->where('language', $language);
            })
            ->when(!empty($status), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when(!empty($publishStatus), function ($query) use ($publishStatus) {
                if ($publishStatus == PublishStatus::PUBLISHED->value) {
                    $query->where('is_published', true);
                } else if ($publishStatus == PublishStatus::NOT_PUBLISHED->value) {
                    $query->where('is_published', false);
                }
            })
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:id,first_name,middle_name,last_name',
                'updatedBy:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'created_by',
                'class_name_id',
                'subject_id',
                'virtual_asset_id',
                'online_topic_id',
                'question',
                'question_type',
                'answer_options',
                'answer_explanation',
                'language',
                'difficulty_level',
                'mark',
                'is_published',
                'status',
                'share_with',
                'created_at'
            )
            ->get();
    }

    public function getVirtualQuestionById(int $id, int $schoolId = null)
    {
        return VirtualQuestion::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:id,first_name,middle_name,last_name',
                'updatedBy:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'virtual_asset_id',
                'online_topic_id',
                'created_by',
                'updated_by',
                'question',
                'answer_options',
                'question_type',
                'answer_explanation',
                'answer_explanation',
                'language',
                'difficulty_level',
                'mark',
                'is_published',
                'status',
                'created_at',
                'updated_at',
                'share_with'
            )
            ->first();
    }

    public function getVirtualQuestionsByIds(array $ids, int $schoolId = null)
    {
        return VirtualQuestion::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->wherein('id', $ids)
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:id,first_name,middle_name,last_name',
                'updatedBy:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'virtual_asset_id',
                'online_topic_id',
                'created_by',
                'updated_by',
                'question',
                'answer_options',
                'question_type',
                'answer_explanation',
                'language',
                'difficulty_level',
                'mark',
                'is_published',
                'status',
                'created_at',
                'updated_at',
                'share_with'
            )
            ->get();
    }

    public function getVirtualQuestions(int $schoolId = null)
    {
        return VirtualQuestion::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_published', true)
            ->where('is_active', true)
            ->with([
                'className:id,title',
                'subject:id,title',
                'createdBy:id,first_name,middle_name,last_name',
                'updatedBy:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'virtual_asset_id',
                'online_topic_id',
                'created_by',
                'updated_by',
                'question',
                'answer_options',
                'question_type',
                'answer_explanation',
                'language',
                'difficulty_level',
                'mark',
                'is_published',
                'status',
                'created_at',
                'updated_at',
                'share_with'
            )
            ->get();
    }

    public function getVirtualQuestionBanks(int $schoolId = null, $search = null)
    {
        return VirtualQuestionBank::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($search), function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->where('status', Status::ACTIVE)
            ->select(
                'id',
                'title',
                'description',
                'status',
                'questions'
            )
            ->get();
    }

    public function getVirtualQuestionBankById(int $id, int $schoolId = null)
    {
        return VirtualQuestionBank::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->where('status', Status::ACTIVE)
            ->select(
                'id',
                'title',
                'description',
                'status',
                'questions'
            )
            ->first();
    }

    public function createVirtualQuestionBank(array $arrayData)
    {
        return VirtualQuestionBank::create($arrayData);
    }

    public function updateVirtualQuestionBank(int $id, array $arrayData)
    {
        return VirtualQuestionBank::where('id', $id)->update($arrayData);
    }

    public function deleteVirtualQuestionBank(int $id)
    {
        return VirtualQuestionBank::destroy($id);
    }

    public function createOrUpdateVirtualExamAttemptData(array $arrayData)
    {
        return VirtualExamStudentAttemptes::updateOrCreate(
            [
                'virtual_exam_id' => $arrayData['virtual_exam_id'],
                'student_id' => $arrayData['student_id']
            ],
            $arrayData
        );
    }

    public function getAttemptCount($examId, $studentId)
    {
        return VirtualExamStudentAttemptes::where('virtual_exam_id', $examId)
            ->where('student_id', $studentId)
            ->count();
    }
}
