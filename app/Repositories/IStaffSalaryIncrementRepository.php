<?php

namespace App\Repositories;

interface IStaffSalaryIncrementRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null);
    public function getRegisterAll();
    public function getStaffSalaryIncrementById(int $id, int $schoolId = null);
    public function getStaffSalaryIncrementsByStaffId(int $staffId, int $schoolId = null);
    public function getStaffSalaryIncrementByStaffIdAndIncrementDate(int $staffId, string $startDate, string $endDate, int $schoolId = null);
}
