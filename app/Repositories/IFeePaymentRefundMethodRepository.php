<?php

namespace App\Repositories;

interface IFeePaymentRefundMethodRepository
{
    public function getAll();
    public function getById($id);
    public function getBySchoolId($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getActiveFeeRefunds(string $refundMode = '', string $startDate = '', string $endDate = '');
    public function getCanceledFeeRefunds(string $startDate = '', string $endDate = '');
}
