<?php

namespace App\Repositories;

interface IHostelFeeRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $conditionData, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getActiveAllNameId();

    // Fee type
    public function getAllHostelFeeType();
    public function getByHostelFeeTypeId($id);
    public function deleteHostelFeeType($id);
    public function createHostelFeeType(array $arrayData);
    public function updateOrCreateHostelFeeType(array $conditionData, array $arrayData);
    public function updateHostelFeeType($id, array $arrayData);
    public function getActiveAllHostelFeeType();

    // Hostel voucher
    public function getAllHostelVoucher();
    public function getActiveAllHostelVoucher();
    public function getActiveAllHostelVoucherNameId();
    public function getByHostelVoucherId($id);
    public function deleteHostelVoucher($id);
    public function createHostelVoucher(array $arrayData);
    public function updateOrCreateHostelVoucher(array $conditionData, array $arrayData);
    public function updateHostelVoucher($id, array $arrayData);
    public function getHostelVoucherLastId();

    // hostel voucher student
    public function getAllHostelVoucherStudent();
    public function getActiveAllHostelVoucherStudent();
    public function getActiveAllHostelVoucherStudentNameId();
    public function getByHostelVoucherStudentId($id);
    public function deleteHostelVoucherStudent($id);
    public function createHostelVoucherStudent(array $arrayData);
    public function updateOrCreateHostelVoucherStudent(array $conditionData, array $arrayData);
    public function updateHostelVoucherStudent($id, array $arrayData);
}
