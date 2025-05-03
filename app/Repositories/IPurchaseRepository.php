<?php

namespace App\Repositories;

interface IPurchaseRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getFilteredPurchases(string $startDate = '', string $endDate = '');
    public function getNextReceiptNo(int $schoolId = null, int $academicYearId = null);
    public function getActivePurchaseById(int $id);
    public function getPurchaseById(int $id);
    public function getActiveAllForReport($partyAccountId, $startDate, $endDate);
    public function getActiveAllForPurchaseSummary();
    public function purchaseExists(int $schoolId = null, int $academicYearId = null);

    // Purchase product
    public function createProduct(array $arrayData);
    public function getActiveAllTransactionPurchase($productId, $startDate, $endDate);
}
