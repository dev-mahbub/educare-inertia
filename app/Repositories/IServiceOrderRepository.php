<?php

namespace App\Repositories;

interface IServiceOrderRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getServiceOrderById(int $id, int $schoolId = null);
    public function getActiveServiceOrdersByType(string $type, int $schoolId = null);
    public function getNextSubscriptionNo(int $schoolId = null);

    // school sms
    public function getSchoolSms(int $schoolId = null);
    public function createSchoolSms(array $arrayData);
    public function updateSchoolSmsQuantity(int $quantity, string $operation = 'increment', int $schoolId = null);
}
