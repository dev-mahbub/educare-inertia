<?php

namespace App\Repositories;

interface ILedgerRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getActiveList($accountId = '', $search = '');
    public function getActiveNameAndId();
    public function getLedgersByAccountGroupTitle(string $title);
    public function getLedgersByAccountGroupTitles(array $titles);
    public function getLedgerByLedgerId(int $id);
    public function getLedgerReportData(int $id, string $startDate = "", string $endDate = "");
    public function getLedgersByAccountGroupId(int $accountGroupId);
    public function getCashBookReportData(string $date, bool $isLedgerAmountSessionWise = false);
    public function getPreviousDayCashBookReportData(string $date, bool $isLedgerAmountSessionWise = false);
    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate);
    public function getLedgerByLedgerTitle(string $title);
}
