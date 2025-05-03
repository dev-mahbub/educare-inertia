<?php

namespace App\Repositories;

interface IAccountRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getMonthWiseSaleLedgerReportData();
    public function getMonthWiseLedgerPaymentReportData();
    public function getMonthWisePurchaseReportData();
    public function getMonthWiseSaleLedgerReturnReportData();

    // party account
    public function getActivePartyAccountNameAndId();
}
