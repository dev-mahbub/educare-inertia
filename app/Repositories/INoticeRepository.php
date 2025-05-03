<?php

namespace App\Repositories;

interface INoticeRepository
{
    public function getAll();

    public function getById($id);

    public function delete($id);

    public function create(array $arrayData);

    public function update($id, array $arrayData);

    public function getActiveAll();

    public function getRegisterAll();

    public function getNoticeById(int $id);

    public function getFilteredNoticeLists(string $noticeStatus = "", string $orderByDate = "", string $audienceType = "");

    public function createNoticeClassroom(array $arrayData);

    public function updateOrCreateNoticeClassroom(array $attributesToCheck, array $valuesToUpdate);

    public function deleteNoticeClassroomsByIds(int $noticeId, array $classroomIds = []);

    public function getStudentFilteredNoticeLists(string $noticeStatus = "", string $orderByDate = "", string $audienceType = "", $schoolId = null, int $classroomId,$academicYearId, string $noticeType);
}
