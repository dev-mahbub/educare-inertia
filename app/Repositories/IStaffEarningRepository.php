<?php

namespace App\Repositories;

interface IStaffEarningRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null);
    public function getRegisterAll();
    public function getStaffEarningById(int $id, int $schoolId = null);
    public function getStaffEarningByStaffId(int $staffId, int $schoolId = null);
    public function getStaffEarningsForBulkProcess(int $paymentMonthId = null, int $staffCategoryId = null, int $staffSubCategoryId = null, int $schoolId = null);
    public function getActiveStaffEarningsForImport(int $schoolId = null);
    public function updateByStaffId(int $staffId, array $arrayData, int $schoolId = null);
}
