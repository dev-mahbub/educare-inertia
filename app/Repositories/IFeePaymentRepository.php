<?php

namespace App\Repositories;

interface IFeePaymentRepository
{
    // public function getRegisterAll();
    public function getFilteredFeePayments(string $startDate = '', string $endDate = '');
    public function getCurrentMonthTotalCollectionForAccountReport();
    public function getMonthWiseCollectionForAccountReport();
}
