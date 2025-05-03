<?php

namespace App\Repositories;

interface IProductRepository
{
    public function getById($id);
    public function getRegisterAll();
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function delete($id);
    public function getOpeningQytById($id);
    public function getActiveList($catId = '', $subCatId = '', $search = '', $type = '');
    public function getActiveNameAndId();
    public function getActiveNameStockForAllocation();
    public function updateProductAvailableStock(int $id, int $quantity, string $type = 'decrement');
    public function getProductById(int $id);
    public function getProductsByCategoryId(int $categoryId);
    public function getActiveAllForLocationAllocation();

    // product location allocation

    public function createProductLocationAllocation(array $arrayData);
    public function updateProductLocationAllocation(int $id, array $arrayData);
    public function deleteProductLocationAllocation(int $id);
    public function getProductLocationAllocationById(int $id);
    public function getProductLocationAllocationReport(string $status = '', int $productId = null, string $search = '', int $schoolId = null);
    public function getLocationWiseProductAllocationReport(int $infraLevelId, string $status = '', string $search = '', int $schoolId = null);
}
