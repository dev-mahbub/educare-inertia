<?php

namespace App\Repositories;

interface IReceiptRepository
{
    public function getAll();
    public function getById($id);
    public function getBySchoolId($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function createLedgerReceiptItem(array $arrayData);
    public function getLedgerReceiptBetweenDates($startDate, $endDate, $schoolId = null);
    public function getNextReceiptNo(int $schoolId = null, int $academicYearId = null);
    public function getReceiptsByBankLedgerId(int $bankLedgerId, bool $isLedgerAmountSessionWise = false);
    public function getActiveLedgerReceiptById(int $id);
    public function getCancelledLedgerReceiptById(int $id);
    public function getLedgerReceiptById(int $id);
    public function getCancelledReport(string $startDate = '', string $endDate = '');
    public function getFilteredLedgerReceiptItems(string $startDate = '', string $endDate = '', int $ledgerId = null);
    public function ledgerReceiptExists(int $schoolId = null, int $academicYearId = null);
    public function getCanceledLedgerReceipts(string $startDate = '', string $endDate = '', int $schoolId = null);
}
