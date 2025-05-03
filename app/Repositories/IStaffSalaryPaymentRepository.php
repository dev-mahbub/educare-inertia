<?php

namespace App\Repositories;

interface IStaffSalaryPaymentRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function updateMany(array $ids, array $arrayData);
    public function getActiveAll(int $schoolId = null, int $academicYearId = null);
    public function getRegisterAll();
    public function getStaffSalaryPaymentById(int $id, int $schoolId = null, int $academicYearId = null);
    public function getActiveStaffSalaryPaymentsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function getUnpublishedStaffSalaryPayments(int $paymentMonthId = null, int $schoolId = null, int $academicYearId = null);
    public function getPublishedStaffSalaryPaymentsByPaymentMonthId(int $paymentMonthId, int $schoolId = null, int $academicYearId = null);
    public function getStaffSalaryBankStatementReport(int $paymentMonthId, int $schoolId = null, int $academicYearId = null);
    public function getStaffSalaryYearlyStatementReport(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function getStaffSalaryCancelledReport(int $staffId = null, int $paymentMonthId = null, int $schoolId = null, int $academicYearId = null);
    public function getStaffSalaryPaymentsForEpfReport(int $paymentMonthId, array $earningTypeIds, int $schoolId = null, int $academicYearId = null);
    public function getStaffSalaryPaymentsForEsiReport(int $paymentMonthId, array $earningTypeIds, int $schoolId = null, int $academicYearId = null);
    public function getStaffSalaryPaymentsForEpfWageReport(int $paymentMonthId, int $schoolId = null, int $academicYearId = null);
    public function getFilteredPublishedStaffSalaryPayments(int $ledgerId = null, string $startDate = '', string $endDate = '', bool $isCanceled = false, int $schoolId = null, int $academicYearId = null);
    public function getNextReceiptNo(int $schoolId =  null);
    public function getFilteredStaffSalaryPayments(array $paymentMonthIds = [], string $status = '', string $staffType = '', int $schoolId = null, int $academicYearId = null);
    public function getPublishedStaffSalaryPaymentsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);

    // staff extra duties
    public function getActiveStaffExtraDutiesByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function insertStaffExtraDuty(array $arrayData);

    // staff absent deductions
    public function getActiveStaffAbsentDeductionsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null);
    public function insertStaffAbsentDeduction(array $arrayData);
}
