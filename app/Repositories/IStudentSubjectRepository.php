<?php

namespace App\Repositories;

interface IStudentSubjectRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate($checkArrayData, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function updateByClassroomIdStudentIdSubjectId($classroomId, $studentId, $subjectId, array $arrayData);
    public function getByClassroomIdStudentIdSubjectId($classroomId, $studentId, $subjectId);
    public function deleteByStudentId(int $studentId);
}
