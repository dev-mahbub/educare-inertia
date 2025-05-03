<?php

namespace App\Repositories;

interface IAllocationRepository
{
    // Staff Product Allocation
    public function createStaffProductAllocation(array $arrayData);
    public function getAllocationForReport($search, $startDate, $endDate);
    public function updateProductAllocation($id, array $arrayData);
    public function getActiveAllAllocationProductIdByStaffId($staffId);
    public function getActiveAllocationStaffNameId();
    public function createStaffProductItemAllocation(array $arrayData);
    public function getActiveAllAllocationProductItem();
    public function getActiveAllAllocationProductForSummary();
    public function getActiveAllAllocationProductItemByStaffId(int $staffId);
    public function getActiveReturnAllocationProductItemsByStaffIdAndProductId(int $staffId, int $productId);
    public function getActiveAllReturnAllocationProductForSummary();
    public function getAllocationProductIdById(int $id, int $schoolId = null);
}
