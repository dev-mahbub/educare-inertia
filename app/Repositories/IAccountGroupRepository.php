<?php

namespace App\Repositories;

interface IAccountGroupRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function deleteSubCat($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getParentNameAndId();
    public function getSubNameAndId();
    public function getRegisterAll();
    public function getActiveNameAndId();
    public function getActiveNameAndIdLedgerGroup();
    public function getTrialBalanceReport(string $startDate = '', string $endDate = '', bool $isLedgerAmountSessionWise = false);
    public function getDefaultAccountGroupByTitle(string $title);
}
