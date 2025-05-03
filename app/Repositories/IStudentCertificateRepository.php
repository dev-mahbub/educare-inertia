<?php

namespace App\Repositories;

interface IStudentCertificateRepository
{
    public function getAll();
    public function getActiveAll();
    public function getActiveAllBonafideCharacter();
    public function getActiveAllBonafideCharacterSearch($searchValue);
    public function getById($id);
    public function getClassroomWithStudentCertificate();
    public function getByStudentIdClassroomId($studentId,  $classroomId);
    public function checkDraft($studentId,  $classroomId);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);

    // get generated tc list
    public function getGeneratedTc($searchValue, $academicYearId, $status, $classroomId);
    public function getTcSummary();
    public function getTcByClassroomId($classroomId);
    public function getCertificateByClassroomId($classroomId);
}
