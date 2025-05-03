<?php

namespace App\Repositories;

interface ISaleRepository
{
    public function crateSaleLedger(array $arrayData);
    public function createSaleLedgerProduct(array $arrayData);
    public function getActiveSaleLedgerById(int $id);
    public function getSaleLedgerNextInvoiceNo();
    public function getSaleLedgerNextReceiptNo(int $schoolId = null, int $academicYearId = null);
    public function getNextReceiptNo();
    public function getSaleLedgerByInvoiceNo(int $invoiceNo, string $saelTypeFor = "");
    public function getActiveAllForReturnReport($search, $startDate, $endDate);
    public function updateSaleLedgerReturn(int $id, array $arrayData);
    public function getSaleLedgerReturnById(int $id);
    public function getFilteredSaleReturns(string $startDate = '', string $endDate = '');
    public function getFilteredLedgerSales(string $startDate = '', string $endDate = '');
    public function getActiveAllForReport($search, $startDate, $endDate, $ledgerId);
    public function getActiveAllForSaleSummary();
    public function getActiveAllTransactionSale($productId, $startDate, $endDate);
    public function getActiveAllLedgerSummery(int $productId = null, string $partyType = '');
    public function getConsolidatedSaleReport(string $startDate = '', string $endDate = '');
    public function getStudentSaleLedgers(int $studentId, int $schoolId = null);
    public function getTeacherSaleLedgers(int $staffId, int $schoolId = null);
    public function saleLedgerExists(int $schoolId = null, int $academicYearId = null);

    // sale ledger payment
    public function createSaleLedgerPayment(array $arrayData);
    public function updateSaleLedgerPayment(int $id, array $arrayData);
    public function getLastSaleLedgerPaymentId(int $saleLedgerId = null, int $schoolId = null, int $academicYearId = null);
    public function getActiveSaleLedgerPaymentById(int $id);
    public function getActiveSaleLedgerPayments($search, $ledgerId, $startDate, $endDate);
    public function getCanceledSaleLedgerPayments(string $startDate = '', string $endDate = '', int $schoolId = null);
}
