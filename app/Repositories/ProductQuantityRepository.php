<?php

namespace App\Repositories;

use App\Enums\ProductType;
use App\Enums\Status;
use App\Models\Product;
use App\Models\ProductQuantity;

class ProductQuantityRepository implements IRepository, IProductQuantityRepository
{
    public function getAll()
    {
        return ProductQuantity::all()->latest()->get();
    }

    public function getById($id)
    {
        return ProductQuantity::findOrFail($id);
    }

    public function delete($id)
    {
        ProductQuantity::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ProductQuantity::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ProductQuantity::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return ProductQuantity::where('products.status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return ProductQuantity::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function getActiveListForProduction()
    {
        $query = ProductQuantity::query()
            ->where('product_quantities.status', Status::ACTIVE)
            ->where('product_quantities.type', ProductType::PRODUCTION)
            ->leftJoin('products', 'products.id', '=', 'product_quantities.product_id')
            ->select(
                'product_quantities.*',
                'products.title as product_title',
            );
        return $query->latest()->get();
    }

    public function getActiveListForConsumption()
    {
        $query = ProductQuantity::query()
            ->where('product_quantities.status', Status::ACTIVE)
            ->where('product_quantities.type', ProductType::CONSUMPTION)
            ->leftJoin('products', 'products.id', '=', 'product_quantities.product_id')
            ->select(
                'product_quantities.*',
                'products.title as product_title',
            );
        return $query->latest()->get();
    }

    public function getOpeningQytById($id)
    {
        return ProductQuantity::where('id', '=', $id)
            ->select('id', 'opening_stock')
            ->first();
    }

    public function getActiveNameAndId()
    {
        return ProductQuantity::where('status', Status::ACTIVE)
            ->select('id', 'title')
            ->latest()
            ->get();
    }
}
