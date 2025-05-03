<?php

namespace App\Repositories;

interface IPaymentMonthRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null, int $academicYearId = null);
    public function getRegisterAll();
    public function getPaymentMonthById(int $id, int $schoolId = null, int $academicYearId = null);
    public function getPaymentMonthsByIds(array $ids, int $schoolId = null, int $academicYearId = null);
}
