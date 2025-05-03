<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use App\Http\Requests\StaffProductAllocationCancelRequest;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\IProductRepository;
use App\Repositories\ISaleGroupRepository;
use App\Repositories\IAllocationRepository;
use App\Http\Requests\StaffProductAllocationRequest;
use App\Http\Requests\StaffProductReturnAllocationRequest;

class AllocationController extends Controller
{

    public function __construct(
        private ISaleGroupRepository $saleGroupRepository,
        private IStaffRepository $staffRepository,
        private IProductRepository $productRepository,
        private IAllocationRepository $allocationRepository,
    ) {
        $this->middleware('permission:view inventory allocation', ['only' => [
            'productStaffAllocation',
            'allocationSummary',
            'allocationReport',
            'allocationReport',
            'getAllocationProductByStaffId',
            'productReturn',
            'productReturnReport'
        ]]);
        $this->middleware('permission:add inventory allocation', ['only' => [
            'productStaffAllocationSave',
            'allocationProductCancel',
            'allocationProductReturnSave'
        ]]);
    }

    public function productStaffAllocation(Request $request)
    {
        $productData = $this->productRepository->getActiveNameStockForAllocation();
        // $products = $productData->map(fn($product) => ['id' => $product->id, 'label' => $product->title, 'available_quantity' => $product->opening_stock])->all();
        $products = $productData->map(function ($product) {
            $title = '';

            if (!empty($product->product_code)) {
                $title .= "{$product->product_code} - ";
            }

            if (!empty($product->title)) {
                $title .= "{$product->title} - ";
            }

            if (!empty($product->product_size)) {
                $title .= $product->product_size;
            }

            if (!empty($product->type)) {
                $title .= " ({$product->type})";
            }

            return [
                'id' => $product->id,
                'label' => $title,
                'available_quantity' => $product->available_stock
            ];
        })->all();

        // staff
        // $staffData = $this->staffRepository->getActiveNameId();
        $staffData = $this->staffRepository->getActiveTeacherName();
        $staffNames = $staffData->map(fn($staff) => ['id' => $staff->id, 'label' => $staff->first_name . ' ' . $staff->middle_name . ' ' . $staff->last_name])->all();

        return Inertia::render('Inventory/Allocation', [
            'staffNames' => $staffNames,
            'products' => $products
        ]);
    }

    public function productStaffAllocationSave(StaffProductAllocationRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'staff_id' => intval($input['staff_id']) ?? null,
                'date_at' => !empty($input['date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            );

            $staffProductAllocation = $this->allocationRepository->createStaffProductAllocation($dataArray);

            if (!empty($input['items'])) {
                foreach ($input['items'] as $pData) {
                    $pDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'staff_product_allocation_id' => $staffProductAllocation->id,
                        'product_id' => intval($pData['product_id']) ?? null,
                        'available_quantity' => $pData['available_quantity'] ?? null,
                        'allocate_quantity' => $pData['allocate_quantity'] ?? null,
                        'description' => $pData['description'] ?? null,
                        'status' => Status::ACTIVE,
                    );

                    $this->allocationRepository->createStaffProductItemAllocation($pDataArray);

                    // update product stock
                    $this->productRepository->updateProductAvailableStock($pData['product_id'], $pData['allocate_quantity'] ?? 1, 'decrement');
                }
            }

            DB::commit();

            return redirect()->route('product_staff_allocation.create')->with('message', 'Product create successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('product_staff_allocation.create')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * allocationSummary
     */
    public function allocationSummary(): Response
    {
        $allocationSummary = [];

        // allocation products
        $allocationProducts = $this->allocationRepository->getActiveAllAllocationProductForSummary();

        if (count($allocationProducts) > 0) {
            foreach ($allocationProducts as $allocationProduct) {
                $staffId = $allocationProduct->staff_id;
                $productId = $allocationProduct->product_id;
                $key = "{$staffId}_{$productId}";

                if (!isset($allocationSummary[$key])) {
                    $staffName = "{$allocationProduct->staff_first_name} {$allocationProduct->staff_middle_name} {$allocationProduct->staff_last_name}";

                    $allocationSummary[$key] = [
                        'staff_name' => $staffName,
                        'product_title' => $allocationProduct->product_title,
                        'allocated_quantity' => 0,
                        'allocation_product_report' => [],
                        'return_allocation_product_report' => []
                    ];
                }

                $allocationSummary[$key]['allocated_quantity'] = ($allocationSummary[$key]['allocated_quantity'] ?? 0) + ($allocationProduct->allocate_quantity ?? 0);

                $allocationSummary[$key]['allocation_product_report'][] = [
                    'allocate_date' => !empty($allocationProduct->date_at) ? Carbon::parse($allocationProduct->date_at)->format('d-M-Y') : '',
                    'allocate_quantity' => $allocationProduct->allocate_quantity,
                    'description' => $allocationProduct->description,
                    'allocated_by' => "{$allocationProduct->user_first_name} {$allocationProduct->user_middle_name} {$allocationProduct->user_last_name}"
                ];
            }
        }

        // return allocation products
        $returnAllocationProducts = $this->allocationRepository->getActiveAllReturnAllocationProductForSummary();

        if (count($returnAllocationProducts) > 0) {
            foreach ($returnAllocationProducts as $returnAllocationProduct) {
                $staffId = $returnAllocationProduct->staff_id;
                $productId = $returnAllocationProduct->product_id;
                $key = "{$staffId}_{$productId}";

                $allocationSummary[$key]['allocated_quantity'] = ($allocationSummary[$key]['allocated_quantity'] ?? 0) - ($returnAllocationProduct->return_quantity ?? 0);

                $allocationSummary[$key]['return_allocation_product_report'][] = [
                    'return_date' => !empty($returnAllocationProduct->return_date_at) ? Carbon::parse($returnAllocationProduct->return_date_at)->format('d-M-Y') : '',
                    'return_quantity' => $returnAllocationProduct->return_quantity,
                    'description' => $returnAllocationProduct->description,
                    'received_by' => "{$returnAllocationProduct->user_first_name} {$returnAllocationProduct->user_middle_name} {$returnAllocationProduct->user_last_name}"
                ];
            }
        }

        $allocationSummary = !empty($allocationSummary) ? array_values($allocationSummary) : [];

        return Inertia::render('Inventory/AllocationSummary', [
            'allocationSummary' => $allocationSummary
        ]);
    }

    /**
     * allocationReport
     */
    public function allocationReport(Request $request): Response
    {
        $search =  '';
        $startDate = '';
        $endDate = '';

        if ($request->isMethod('post')) {
            $search = $request->input('search_value') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        $allocationProductReports = $this->allocationRepository->getAllocationForReport($search, $startDate, $endDate);

        return Inertia::render('Inventory/AllocationReport', [
            'allocationProductReports' => $allocationProductReports,
        ]);
    }

    /**
     * allocationProductCancel
     */
    public function allocationProductCancel(int $id, StaffProductAllocationCancelRequest $request): RedirectResponse
    {
        $allocationProduct = $this->allocationRepository->getAllocationProductIdById($id);

        abort_if(empty($allocationProduct), 404);

        $allocationProduct?->loadMissing(['productItems']);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'reason_data' => $input['cancel_reason'] ?? null,
                'status' => Status::INACTIVE,
            );

            $this->allocationRepository->updateProductAllocation($id, $dataArray);

            // update product available stock
            if ($allocationProduct?->productItems?->count() > 0) {
                foreach ($allocationProduct->productItems as $productItem) {
                    $this->productRepository->updateProductAvailableStock($productItem?->product_id, $productItem?->allocate_quantity, 'increment');
                }
            }

            DB::commit();

            return redirect()->route('allocation_report.list')->with('message', 'Product cancel successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('allocation_report.list')->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * getAllocationProductByStaffId
     */
    public function getAllocationProductByStaffId(Request $request)
    {
        $staffId = $request->input('id');
        $allocationProducts = $this->allocationRepository->getActiveAllAllocationProductItemByStaffId($staffId);
        return redirect()->back()->with([
            'customData' => $allocationProducts,
        ]);
    }

    /**
     * productReturn
     */
    public function productReturn(Request $request): Response
    {
        $allocationStaffs = $this->allocationRepository->getActiveAllocationStaffNameId();
        $allocationProducts = [];

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;

            if (!empty($staffId)) {
                $staffProductItemAllocations = $this->allocationRepository->getActiveAllAllocationProductItemByStaffId($staffId);

                if (count($staffProductItemAllocations) > 0) {
                    foreach ($staffProductItemAllocations as $staffProductItemAllocation) {
                        $productId = $staffProductItemAllocation->product_id;

                        if (!isset($allocationProducts[$productId])) {
                            // get return allocation and calculate return quantity
                            $staffProductItemReturnAllocations = $this->allocationRepository->getActiveReturnAllocationProductItemsByStaffIdAndProductId($staffId, $productId);

                            $totalReturnedQuantity = 0;

                            if (count($staffProductItemReturnAllocations) > 0) {
                                foreach ($staffProductItemReturnAllocations as $staffProductItemReturnAllocation) {
                                    $totalReturnedQuantity += $staffProductItemReturnAllocation->return_quantity ?? 0;
                                }
                            }

                            $allocationProducts[$productId] = [
                                'product_id' => $productId,
                                'product_title' => $staffProductItemAllocation->product_title,
                                'total_allocated_quantity' => 0,
                                'total_returned_quantity' => $totalReturnedQuantity
                            ];
                        }

                        $allocationProducts[$productId]['total_allocated_quantity'] = ($allocationProducts[$productId]['total_allocated_quantity'] ?? 0) + ($staffProductItemAllocation->allocate_quantity ?? 0);
                    }

                    $allocationProducts = !empty($allocationProducts) ? array_values($allocationProducts) : [];
                }
            }
        }

        return Inertia::render('Inventory/ProductReturn', [
            'allocationStaffs' => $allocationStaffs,
            'allocationProducts' => $allocationProducts
        ]);
    }


    /**
     * allocationProductReturnQty
     */
    public function allocationProductReturnSave(StaffProductReturnAllocationRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'staff_id' => intval($input['staff_id']) ?? null,
                'return_date_at' => !empty($input['return_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('return_date_at'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            );

            $staffProductReturnAllocation = $this->allocationRepository->createProductReturnAllocation($dataArray);

            $filterProduct = array_filter($input['items'], function ($item) {
                // return !($item["allocation_id"] === null && $item["return_quantity"] === null);
                return $item["return_quantity"] > 0;
            });

            foreach ($filterProduct as $pData) {
                $pDataArray = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'staff_product_return_allocation_id' => $staffProductReturnAllocation->id,
                    // 'staff_product_allocation_id' => intval($pData['allocation_id']) ?? null,
                    'product_id' => intval($pData['product_id']) ?? null,
                    'return_quantity' => $pData['return_quantity'] ?? null,
                    // 'description' => $pData['description'] ?? null,
                    'status' => Status::ACTIVE,
                );

                $this->allocationRepository->createProductReturnItemAllocation($pDataArray);

                // update product stock
                $this->productRepository->updateProductAvailableStock($pData['product_id'], $pData['return_quantity'] ?? 1, 'increment');
            }

            DB::commit();

            return redirect()->route('product_return.list')->with('message', 'Product return successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('product_return.list')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * productReturnReport
     */
    public function productReturnReport(Request $request): Response
    {
        $search =  '';
        $startDate = '';
        $endDate = '';

        if ($request->isMethod('post')) {
            $search = $request->input('search_value') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        $allocationReturnProducts = $this->allocationRepository->getAllocationReturnForReport($search, $startDate, $endDate);

        return Inertia::render('Inventory/ProductReturnReport', [
            'allocationReturnProducts' => $allocationReturnProducts
        ]);
    }
}
