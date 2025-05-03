<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffProductAllocation;
use App\Models\StaffProductItemAllocation;
use App\Models\StaffProductItemReturnAllocation;
use App\Models\StaffProductReturnAllocation;

class AllocationRepository implements IAllocationRepository
{
    // Staff Product Allocation
    public function createStaffProductAllocation(array $arrayData)
    {
        return StaffProductAllocation::create($arrayData);
    }

    public function getAllocationForReport($search, $startDate, $endDate)
    {
        $query = StaffProductAllocation::query();

        $query->with([
            'createdBy:id,first_name,middle_name,last_name',
            'productItems.product:id,title'
        ])->where('staff_product_allocations.status', '=', Status::ACTIVE)
            ->leftJoin('staff', 'staff_product_allocations.staff_id', '=', 'staff.id')
            ->select(
                'staff_product_allocations.*',
                'staff.first_name as staff_first_name',
                'staff.middle_name as staff_middle_name',
                'staff.last_name as staff_last_name'
            );

        $query->where(function ($q) use ($search, $startDate, $endDate) {
            if (!empty($search)) {
                $q->where(function ($q) use ($search) {
                    $q->where('staff.first_name', 'like', '%' . $search . '%')
                        ->orWhere('staff.middle_name', 'like', '%' . $search . '%')
                        ->orWhere('staff.last_name', 'like', '%' . $search . '%');
                });
            }

            if (!empty($startDate)) {
                $q->whereDate('staff_product_allocations.date_at', '>=', $startDate);
            }

            if (!empty($endDate)) {
                $q->whereDate('staff_product_allocations.date_at', '<=', $endDate);
            }
        });

        return $query->get();
    }

    public function updateProductAllocation($id, array $arrayData)
    {
        return StaffProductAllocation::whereId($id)
            ->update($arrayData);
    }

    public function getAllocationProductIdById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffProductAllocation::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->first();
    }

    public function getActiveAllAllocationProductIdByStaffId($staffId)
    {
        return StaffProductAllocation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('staff_id', $staffId)
            ->select('id')
            ->first();
    }

    public function getActiveAllocationStaffNameId()
    {
        $result = StaffProductAllocation::where('staff_product_allocations.status', Status::ACTIVE)
            ->where('staff_product_allocations.school_id', getUserSchoolId())
            ->join('staff', 'staff_product_allocations.staff_id', '=', 'staff.id')
            ->select('staff.id', 'staff.first_name', 'staff.middle_name', 'staff.last_name')
            ->get()
            ->toArray();
        $uniqueResult = array_map("unserialize", array_unique(array_map("serialize", $result)));
        foreach ($uniqueResult as &$item) {
            $item['title'] = $item['first_name'] . ' ' . $item['middle_name'] . ' ' . $item['last_name'];
            unset($item['first_name']);
            unset($item['middle_name']);
            unset($item['last_name']);
        }
        return $uniqueResult;
    }

    // Staff Product item Allocation
    public function createStaffProductItemAllocation(array $arrayData)
    {
        return StaffProductItemAllocation::create($arrayData);
    }

    public function getActiveAllAllocationProductItem()
    {
        return StaffProductItemAllocation::where('staff_product_item_allocations.status', Status::ACTIVE)
            ->where('staff_product_item_allocations.school_id', getUserSchoolId())
            ->leftJoin('staff_product_allocations', 'staff_product_item_allocations.staff_product_allocation_id', '=', 'staff_product_allocations.id')
            ->leftJoin('products', 'staff_product_item_allocations.product_id', '=', 'products.id')
            ->select('staff_product_item_allocations.*', 'products.title as product_title')
            ->get();
    }

    public function getActiveAllAllocationProductForSummary()
    {
        return StaffProductItemAllocation::where('staff_product_item_allocations.status', Status::ACTIVE)
            ->where('staff_product_item_allocations.school_id', getUserSchoolId())
            ->where('staff_product_allocations.status', Status::ACTIVE)
            ->join('staff_product_allocations', 'staff_product_item_allocations.staff_product_allocation_id', '=', 'staff_product_allocations.id')
            ->leftJoin('products', 'staff_product_item_allocations.product_id', '=', 'products.id')
            ->leftJoin('staff', 'staff_product_allocations.staff_id', '=', 'staff.id')
            ->leftJoin('users', 'staff_product_allocations.created_by', '=', 'users.id')
            ->select(
                'staff_product_item_allocations.id',
                'staff_product_item_allocations.product_id',
                'staff_product_item_allocations.allocate_quantity',
                'staff_product_allocations.date_at',
                'staff_product_allocations.description',
                'products.title as product_title',
                'staff.id as staff_id',
                'staff.first_name as staff_first_name',
                'staff.middle_name as staff_middle_name',
                'staff.last_name as staff_last_name',
                'users.first_name as user_first_name',
                'users.middle_name as user_middle_name',
                'users.last_name as user_last_name'
            )
            ->orderBy('staff_product_allocations.date_at', 'desc')
            ->get();
    }

    public function getActiveAllAllocationProductItemByStaffId(int $staffId)
    {
        return StaffProductItemAllocation::where('staff_product_item_allocations.status', Status::ACTIVE)
            ->where('staff_product_item_allocations.school_id', getUserSchoolId())
            ->where('staff_product_allocations.staff_id', '=', $staffId)
            ->where('staff_product_allocations.status', '=', Status::ACTIVE)
            ->join('staff_product_allocations', 'staff_product_item_allocations.staff_product_allocation_id', '=', 'staff_product_allocations.id')
            ->leftJoin('products', 'staff_product_item_allocations.product_id', '=', 'products.id')
            ->select(
                'staff_product_item_allocations.id',
                'staff_product_item_allocations.product_id',
                'staff_product_item_allocations.allocate_quantity',
                'products.title as product_title'
            )
            ->get();
    }


    // Staff Product return Allocation
    public function createProductReturnAllocation(array $arrayData)
    {
        return StaffProductReturnAllocation::create($arrayData);
    }

    public function getAllocationReturnForReport($search, $startDate, $endDate)
    {
        $query = StaffProductReturnAllocation::query();

        $query->with(['productReturnItems.product:id,title'])
            ->where('staff_product_return_allocations.status', '=', Status::ACTIVE)
            ->leftJoin('staff', 'staff_product_return_allocations.staff_id', '=', 'staff.id')
            ->select(
                'staff_product_return_allocations.*',
                'staff.first_name as staff_first_name',
                'staff.middle_name as staff_middle_name',
                'staff.last_name as staff_last_name'
            );

        $query->where(function ($q) use ($search, $startDate, $endDate) {
            if (!empty($search)) {
                $q->where(function ($q) use ($search) {
                    $q->where('staff.first_name', 'like', '%' . $search . '%')
                        ->orWhere('staff.middle_name', 'like', '%' . $search . '%')
                        ->orWhere('staff.last_name', 'like', '%' . $search . '%');
                });
            }

            if (!empty($startDate)) {
                $q->whereDate('staff_product_return_allocations.return_date_at', '>=', $startDate);
            }

            if (!empty($endDate)) {
                $q->whereDate('staff_product_return_allocations.return_date_at', '<=', $endDate);
            }
        });

        return $query->get();
    }

    public function createProductReturnItemAllocation(array $arrayData)
    {
        return StaffProductItemReturnAllocation::create($arrayData);
    }

    public function getActiveReturnAllocationProductItemsByStaffIdAndProductId(int $staffId, int $productId)
    {
        return StaffProductItemReturnAllocation::where('staff_product_item_return_allocations.status', Status::ACTIVE)
            ->where('staff_product_item_return_allocations.school_id', getUserSchoolId())
            ->where('staff_product_item_return_allocations.product_id', $productId)
            ->where('staff_product_return_allocations.staff_id', '=', $staffId)
            ->where('staff_product_return_allocations.status', '=', Status::ACTIVE)
            ->join('staff_product_return_allocations', 'staff_product_item_return_allocations.staff_product_return_allocation_id', '=', 'staff_product_return_allocations.id')
            ->select(
                'staff_product_item_return_allocations.id',
                'staff_product_item_return_allocations.product_id',
                'staff_product_item_return_allocations.return_quantity'
            )
            ->get();
    }

    public function getActiveAllReturnAllocationProductForSummary()
    {
        return StaffProductItemReturnAllocation::where('staff_product_item_return_allocations.status', Status::ACTIVE)
            ->where('staff_product_item_return_allocations.school_id', getUserSchoolId())
            ->where('staff_product_return_allocations.status', Status::ACTIVE)
            ->join('staff_product_return_allocations', 'staff_product_item_return_allocations.staff_product_return_allocation_id', '=', 'staff_product_return_allocations.id')
            ->leftJoin('products', 'staff_product_item_return_allocations.product_id', '=', 'products.id')
            ->leftJoin('staff', 'staff_product_return_allocations.staff_id', '=', 'staff.id')
            ->leftJoin('users', 'staff_product_return_allocations.created_by', '=', 'users.id')
            ->select(
                'staff_product_item_return_allocations.id',
                'staff_product_item_return_allocations.product_id',
                'staff_product_item_return_allocations.return_quantity',
                'staff_product_return_allocations.return_date_at',
                'staff_product_return_allocations.description',
                'products.title as product_title',
                'staff.id as staff_id',
                'staff.first_name as staff_first_name',
                'staff.middle_name as staff_middle_name',
                'staff.last_name as staff_last_name',
                'users.first_name as user_first_name',
                'users.middle_name as user_middle_name',
                'users.last_name as user_last_name'
            )
            ->orderBy('staff_product_return_allocations.return_date_at', 'desc')
            ->get();
    }
}
