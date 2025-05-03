<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Product;
use App\Models\ProductLocationAllocation;
use App\Models\ProductSalePrice;

class ProductRepository implements IRepository, IProductRepository
{
    public function getAll()
    {
        return Product::all()->latest()->get();
    }

    public function getById($id)
    {
        return Product::findOrFail($id);
    }

    public function delete($id)
    {
        Product::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Product::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Product::whereId($id)
            ->update($arrayData);
    }

    public function getActiveById($id)
    {
        return Product::where('products.id', $id)
            ->with('purchasedBy')
            ->leftJoin('categories as main_category', 'main_category.id', '=', 'products.category_id')
            ->leftJoin('categories as sub_category', 'sub_category.id', '=', 'products.sub_category_id')
            ->select(
                'products.*',
                'main_category.title as category_title',
                'sub_category.title as sub_category_title'
            )
            ->first();
    }

    public function getActiveAll()
    {
        return Product::where('products.status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Product::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveList($catId = '', $subCatId = '', $search = '', $type = '')
    {
        $query = Product::query()
            ->where('products.school_id', getUserSchoolId())
            ->where('products.status', Status::ACTIVE)
            ->leftJoin('categories as main_category', 'main_category.id', '=', 'products.category_id')
            ->leftJoin('categories as sub_category', 'sub_category.id', '=', 'products.sub_category_id')
            ->select(
                'products.*',
                'main_category.title as category_title',
                'sub_category.title as sub_category_title'
            );

        if (!empty($catId)) {
            $query->where('main_category.id', '=', $catId);
        }

        if (!empty($subCatId)) {
            $query->where('sub_category.id', '=', $subCatId);
        }

        if (!empty($type)) {
            $query->where('products.type', '=', $type);
        }

        if (!empty($search)) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('products.title', 'like', '%' . $search . '%')
                    ->orWhere('products.opening_stock', 'like', '%' . $search . '%')
                    ->orWhere('products.rate_per_product', 'like', '%' . $search . '%')
                    ->orWhere('products.gst_tax', 'like', '%' . $search . '%')
                    ->orWhere('products.amount', 'like', '%' . $search . '%')
                    ->orWhere('products.product_code', 'like', '%' . $search . '%')
                    ->orWhere('products.product_size', 'like', '%' . $search . '%');
            });
        }

        $query->with(['productSalePrice']);

        return $query->latest()->get();
    }

    public function getOpeningQytById($id)
    {
        return Product::where('id', '=', $id)
            ->select('id', 'is_opening_stock', 'opening_stock')
            ->first();
    }

    public function getActiveNameAndId()
    {
        return Product::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveNameStockForAllocation()
    {
        return Product::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select(
                'id',
                'title',
                'opening_stock',
                'available_stock',
                'product_size',
                'type',
                'product_code'
            )
            ->latest()
            ->get();
    }

    public function updateProductAvailableStock(int $id, int $quantity, string $type = 'decrement')
    {
        $product = Product::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();

        return $product->$type('available_stock', $type == 'decrement' ? min($product->available_stock, $quantity) : $quantity);
    }

    public function updateProductAvailableStock_old(int $id, int $quantity, string $type = 'decrement')
    {
        return Product::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->$type('available_stock', $quantity);
    }

    public function getProductById(int $id)
    {
        return Product::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'opening_stock',
                'available_stock'
            )
            ->first();
    }

    public function getProductsByCategoryId(int $categoryId)
    {
        return Product::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('category_id', $categoryId)
            ->select(
                'id',
                'title',
                'opening_stock',
                'available_stock'
            )
            ->get();
    }

    public function getActiveAllForLocationAllocation()
    {
        return Product::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->with(['productLocationAllocations' => function ($query) {
                $query->where('status', Status::ACTIVE)
                    ->with(['infraLevel:id,name']);
            }])
            ->select(
                'id',
                'title',
                'opening_stock',
                'available_stock',
                'product_size',
                'product_code'
            )
            ->latest()
            ->get();
    }

    // sale price
    public function getSalePriceById($id)
    {
        return ProductSalePrice::findOrFail($id);
    }

    public function createProductSalePrice(array $arrayData)
    {
        return ProductSalePrice::create($arrayData);
    }

    public function getSalePriceByProductId($productId)
    {
        return ProductSalePrice::where('status', Status::ACTIVE)
            ->with('appliedBy')
            ->where('school_id', getUserSchoolId())
            ->where('product_id', '=', $productId)
            ->latest()
            ->get();
    }

    public function updateSalePriceProduct($id, array $arrayData)
    {
        return ProductSalePrice::whereId($id)
            ->update($arrayData);
    }

    public function deleteSalePrice(int $id)
    {
        ProductSalePrice::destroy($id);
    }

    // product location allocation

    public function createProductLocationAllocation(array $arrayData)
    {
        return ProductLocationAllocation::create($arrayData);
    }

    public function updateProductLocationAllocation(int $id, array $arrayData)
    {
        return ProductLocationAllocation::where('id', $id)
            ->update($arrayData);
    }

    public function deleteProductLocationAllocation(int $id)
    {
        return ProductLocationAllocation::destroy($id);
    }

    public function getProductLocationAllocationById(int $id)
    {
        return ProductLocationAllocation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    public function getProductLocationAllocationReport(
        string $status = '',
        int $productId = null,
        string $search = '',
        int $schoolId = null
    ) {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return ProductLocationAllocation::where('school_id', $schoolId)
            ->where(function ($query) use ($status, $productId) {
                if (!empty($status)) {
                    $query->where('status', $status);
                }

                if (!empty($productId)) {
                    $query->where('product_id', $productId);
                }
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->whereHas('infraLevel', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    });
                }
            })
            ->with([
                'product' => function ($query) {
                    $query->with(['category:id,title'])
                        ->select(
                            'id',
                            'title',
                            'category_id',
                            'product_code'
                        );
                },
                'infraLevel:id,name',
                'createdBy:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'product_id',
                'infra_level_id',
                'status',
                'created_by',
                'allocate_date'
            )
            ->get();
    }


    public function getLocationWiseProductAllocationReport(
        int $infraLevelId,
        string $status = '',
        string $search = '',
        int $schoolId = null
    ) {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return ProductLocationAllocation::where('school_id', $schoolId)
            ->where('infra_level_id', $infraLevelId)
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    $query->where('status', $status);
                }
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->whereHas('product', function ($query) use ($search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    });
                }
            })
            ->with([
                'product' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                        'product_code'
                    );
                },
                'infraLevel:id,name',
                'createdBy:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'product_id',
                'infra_level_id',
                'status',
                'created_by',
                'allocate_date'
            )
            ->get();
    }
}
