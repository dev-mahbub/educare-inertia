<?php

namespace App\Repositories;

interface IGuardianRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getByStudentId($id);
    public function getParentByStudentId($id);
    public function getParentByIncomeRange($range);
    public function getStudentFatherInfo();
    public function getSiblingByFatherInfo($fatherName, $fatherEmail, $fatherPhone);
    public function getGuardianData();
    public function getPossibleSiblingByPhone($classroomId, $searchValue);
    public function createEnquiryGuardian(array $arrayData);
    public function updateEnquiryGuardian($id, array $arrayData);
}
