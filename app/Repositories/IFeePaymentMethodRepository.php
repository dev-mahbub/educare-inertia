<?php

namespace App\Repositories;

interface IFeePaymentMethodRepository
{
    // public function getRegisterAll();
    public function getPaymentsByPaymentMode(string $paymentMode, bool $isLedgerAmountSessionWise = false);
    public function getPaymentsByPaymentModeAndPaymentDate(string $paymentMode, string $startDate = '', string $endDate = '', bool $isLedgerAmountSessionWise = false);
    public function getCashBookReportData(string $paymentMode, string $paymentDate = '', bool $isLedgerAmountSessionWise = false);
    public function getPreviousDayCashBookReportData(string $paymentMode, string $paymentDate = '', bool $isLedgerAmountSessionWise = false);
    public function getFeePaymentsForAccountReceiptReport(string $search = '', string $paymentMode = '', string $startDate = '', string $endDate = '');
    public function getRegistrationFeesForReceiptReport(string $search = '', string $paymentMode = '', string $startDate = '', string $endDate = '');
    public function getCanceledFeePaymentsForAccountReceiptReport(string $startDate = '', string $endDate = '', int $schoolId = null);
    public function getCanceledRegistrationFeesForReceiptReport(string $startDate = '', string $endDate = '', int $schoolId = null);
}
