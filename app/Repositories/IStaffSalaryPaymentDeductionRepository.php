<?php

namespace App\Repositories;

interface IStaffSalaryPaymentDeductionRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function insert(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null, int $academicYearId = null);
    public function getRegisterAll();
}
