<?php

namespace App\Repositories;

interface IExamRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getActiveExam();
    public function getActiveExamForWithClassroomId();
    public function getExamtitle();
    public function getRegisterAll();
    public function getMarkFromExamId($classroomId, $examId, $schoolId = null, $academicYearId = null);
    public function getExamsByClassroomId(int $classroomId);
    public function getExamsForEventCalendar(string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null);

    //academic exam remark
    public function getRemarkById($id);
    public function deleteRemark($id);
    public function createRemark(array $arrayData);
    public function updateRemark($id, array $arrayData);
    public function getActiveAllRemark();
    public function getActiveRemarks();

    //academic term wise exam
    public function getTermById($id);
    public function deleteTerm($id);
    public function createTerm(array $arrayData);
    public function updateTerm($id, array $arrayData);
    public function getActiveAllTerm();
    public function updateOrCreate($attributesToCheck, $valuesToUpdate);
    public function RemarksUpdateOrcreate($attributesToCheck, $attributesValueUpdate);
    public function getActiveClassroom();
    public function getActiveClassNames();
    public function getActiveExamsByExamIds($ids);

    // classroom exam
    public function getClassroomIdsByExamId($examId);
    public function getExamIdsByClassroomIds($classroomIds);
}
