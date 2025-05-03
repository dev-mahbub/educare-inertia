<?php

namespace App\Repositories;

interface IBackDateStaffRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate);
    public function getActiveAll(int $schoolId = null, int $academicYearId = null);
    public function getRegisterAll();
    public function getBackDateStaffById(int $id, int $schoolId = null, int $academicYearId = null);
    public function getBackDateStaffByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function deleteByStaffIds(array $staffIds, int $schoolId = null, int $academicYearId = null);
}
