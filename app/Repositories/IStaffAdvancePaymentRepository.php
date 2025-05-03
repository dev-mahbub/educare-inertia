<?php

namespace App\Repositories;

interface IStaffAdvancePaymentRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null, int $academicYearId = null);
    public function getRegisterAll();
    public function getActiveStaffAdvancePaymentsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function getActiveStaffAdvancePayments(int $staffId = null, int $paymentMonthId = null, int $schoolId = null, int $academicYearId = null);
    public function getStaffAdvancePaymentById(int $id, int $schoolId = null, int $academicYearId = null);
    public function getNextReceiptNo(int $schoolId =  null);
    public function getStaffAdvancePaymentsForPaymentReport(int $ledgerId = null, string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null);
    public function getCanceledStaffAdvancePayments(string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null);
    public function getFilteredStaffAdvancePayments(array $paymentMonthIds = [], string $staffType = '', int $schoolId = null, int $academicYearId = null);
}
