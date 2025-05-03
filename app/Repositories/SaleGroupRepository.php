<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SaleGroup;
use App\Models\SaleGroupProduct;

class SaleGroupRepository implements IRepository, ISaleGroupRepository
{
    public function getAll()
    {
        return SaleGroup::all()->latest()->get();
    }

    public function getById($id)
    {
        return SaleGroup::findOrFail($id);
    }

    public function delete($id)
    {
        return SaleGroup::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SaleGroup::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SaleGroup::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll($schoolId = null)
    {
        return SaleGroup::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->with(['saleGroupProducts'])
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return SaleGroup::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getActiveNameAndId()
    {
        return SaleGroup::where('status', Status::ACTIVE)->select('id', 'title')->latest()->get();
    }

    // sale group product
    public function createProduct(array $arrayData)
    {
        return SaleGroupProduct::create($arrayData);
    }

    // update associated products
    public function updateSaleGroupProduct($productId, array $arrayData)
    {
        return SaleGroupProduct::whereId($productId)
            ->update($arrayData);
    }

    // get associated products fron sale group
    public function getSaleGroupProductIds($saleGroupId)
    {
        return SaleGroupProduct::where('sale_group_id', $saleGroupId)
            ->where('school_id', getUserSchoolId())
            ->pluck('id')
            ->toArray();
    }

    public function deleteSaleGroupProduct($id)
    {
        return SaleGroupProduct::destroy($id);
    }

    public function getProductBySaleGroupId($id)
    {
        return SaleGroupProduct::where('sale_group_products.sale_group_id', '=', $id)
            ->leftJoin('products', 'sale_group_products.product_id', '=', 'products.id')
            ->select(
                'sale_group_products.*',
                'products.id as product_id',
                'products.title as product_title',
            )
            ->latest()
            ->get();
    }

    public function deleteProduct($id)
    {
        SaleGroupProduct::destroy($id);
    }
}
