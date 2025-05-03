<?php

namespace App\Repositories;

interface IVirtualExamRepository
{
    public function getTodayExams($schoolId = null, $startDate = null);
    public function getExamsList($schoolId = null, $startDate = null, $endDate = null);
    public function getScheduleExams($schoolId = null, $startDate = null, $endDate = null);
    public function getVirtualExamById(int $id, int $schoolId = null);
    public function getFilteredVirtualExams(
        int $classNameId = null,
        int $subjectId = null,
        string $examMode = '',
        string $startDate = '',
        string $endDate = '',
        int $schoolId = null,
        string $examStatus = '',
        int $userId = null,
    );
    public function getVirtualExamSummaryData(string $startDate, string $endDate, int $schoolId = null);
    public function createVirtualAsset(array $arrayData);
    public function updateVirtualAsset($id, array $arrayData);
    public function getFilteredVirtualAssets(
        int $classNameId = null,
        int $subjectId = null,
        int $topicId = null,
        string $assetType = '',
        bool $isPublished = null,
        int $schoolId = null
    );
    public function createVirtualQuestion(array $arrayData);
    public function updateVirtualQuestion(int $id, array $arrayData);
    public function updateBulkVirtualQuestionStatus(array $arrayData, int $classNameId, int $subjectId = null, int $schoolId = null);
    public function deleteVirtualQuestion(int $id);
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
        int $userId = null,
    );
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
        int $userId = null,
    );
    public function getVirtualAssetById($id);
    public function deleteVirtualAsset($id);
    public function getVirtualQuestions(int $schoolId = null);
    public function getVirtualQuestionById(int $id, int $schoolId = null);
    public function getVirtualQuestionsByIds(array $ids, int $schoolId = null);
    public function getVirtualQuestionBankById(int $id, int $schoolId = null);
    public function getVirtualQuestionBanks(int $schoolId = null, $search = null);
    public function createVirtualQuestionBank(array $arrayData);
    public function updateVirtualQuestionBank(int $id, array $arrayData);
    public function deleteVirtualQuestionBank(int $id);
    public function createOrUpdateVirtualExamAttemptData(array $arrayData);
    public function getAttemptCount($examId, $studentId);
}
