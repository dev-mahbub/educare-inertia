<?php

namespace App\Repositories;

interface IExamRoasterRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getExamIDAndClassroomIds($examId, array $classroomIds);
    public function updateOrCreate($attributesToCheck, $valuesToUpdate);
    public function getExamIDAndClassroomWiseSubject($classroomIds);
    public function getFullMinMarkBySubjectId($subject_id, int $classroomId = null, $examId = null);
    public function apiFullMinMarkBySubjectId($subject_id, int $classroomId = null, $examId = null, $schoolId = null, $academicYearId = null);
}
