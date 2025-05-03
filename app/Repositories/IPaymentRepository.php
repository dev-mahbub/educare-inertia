<?php

namespace App\Repositories;

interface IPaymentRepository
{
    public function getAll();
    public function getById($id);
    public function getBySchoolId($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    // public function getActiveList(string $search = '', string $paymentMode = '', string $startDate = '', string $endDate = '');
    public function getActiveList(string $search = '', int $bankLedgerId = null, string $startDate = '', string $endDate = '');
    public function getRegisterAll();
    public function createLedgerPaymentItem(array $arrayData);
    public function getLedgerPaymentBetweenDates($startDate, $endDate, $schoolId = null);
    public function getLedgerPaymentNextReceiptNo(int $schoolId = null, int $academicYearId = null);
    public function getPaymentsByPaymentMode(string $paymentMode);
    public function getPaymentsByBankLedgerId(int $bankLedgerId, bool $isLedgerAmountSessionWise = false);
    public function getActiveLedgerPaymentById(int $id);
    public function getCancelledLedgerPaymentById(int $id);
    public function getLedgerPaymentById(int $id);
    public function getCancelledReport(string $startDate = '', string $endDate = '');
    public function getFilteredLedgerPaymentItems(string $startDate = '', string $endDate = '', int $ledgerId = null);
    public function ledgerPaymentExists(int $schoolId = null, int $academicYearId = null);
    public function getCanceledLedgerPayments(string $startDate = '', string $endDate = '', int $schoolId = null);
}
