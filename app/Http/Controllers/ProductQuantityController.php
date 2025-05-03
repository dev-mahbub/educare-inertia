<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\ProductType;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IVendorRepository;
use App\Repositories\IProductRepository;
use App\Http\Requests\ProductQuantityRequest;
use App\Repositories\IProductQuantityRepository;

class ProductQuantityController extends Controller
{

    public function __construct(
        private IProductQuantityRepository $productQuantityRepository,
        private IProductRepository $productRepository,
        private IVendorRepository $vendorRepository
    ) {
        $this->middleware('permission:view product', ['only' => ['showProduction', 'showConsumption']]);
        $this->middleware('permission:add product', ['only' => ['saveProduction', 'saveConsumption']]);
        $this->middleware('permission:edit product', ['only' => ['editProduction', 'updateProduction', 'editConsumption', 'updateConsumption']]);
        $this->middleware('permission:delete product', ['only' => ['destroyProduction', 'destroyConsumption']]);
    }

    /**
     * Display production form and list
     */
    public function showProduction(): Response
    {
        $products = $this->productQuantityRepository->getActiveListForProduction();

        // product title
        $productTitleData = $this->productRepository->getActiveNameAndId();
        $productTitles = $productTitleData->map(fn($proTitle) => ['id' => $proTitle->id, 'title' => $proTitle->title])->all();

        // vendor title
        $vendorTitleData = $this->vendorRepository->getActiveTitleAndId();
        $vendorTitles = $vendorTitleData->map(fn($venTitle) => ['id' => $venTitle->id, 'title' => $venTitle->title])->all();

        return Inertia::render('Inventory/CreateProductProduction', [
            'products' => $products,
            'productTitles' => $productTitles,
            'vendorTitles' => $vendorTitles,
        ]);
    }

    /**
     * saveProduction
     */
    public function saveProduction(ProductQuantityRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'product_id' => intval($input['product_id']) ?? null,
            'vendor_id' => intval($input['vendor_id']) ?? null,
            'quantity' => intval($input['quantity']) ?? null,
            'description' => $input['description'] ?? null,
            'type' => ProductType::PRODUCTION,
            'date_at' => !empty($input['date_at']) ? \Carbon\Carbon::parse($input['date_at'])->format('Y-m-d') : date('Y-m-d'),
            'status' => Status::ACTIVE,
        );

        $product = $this->productQuantityRepository->create($dataArray);
        if (!$product) {
            return redirect()->route('product_production.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('product_production.list')->with('message', 'Production product created successfully.');
    }


    /**
     * Display edit production form and list
     */
    public function editProduction(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('product_production.list');
        }

        $product = $this->productQuantityRepository->getById($id);
        $products = $this->productQuantityRepository->getActiveListForProduction();

        // product title
        $productTitleData = $this->productRepository->getActiveNameAndId();
        $productTitles = $productTitleData->map(fn($proTitle) => ['id' => $proTitle->id, 'title' => $proTitle->title])->all();

        // vendor title
        $vendorTitleData = $this->vendorRepository->getActiveTitleAndId();
        $vendorTitles = $vendorTitleData->map(fn($venTitle) => ['id' => $venTitle->id, 'title' => $venTitle->title])->all();

        return Inertia::render('Inventory/EditProductProduction', [
            'product' => $product,
            'products' => $products,
            'productTitles' => $productTitles,
            'vendorTitles' => $vendorTitles,
        ]);
    }

    /**
     * updateProduction
     */
    public function updateProduction(ProductQuantityRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'product_id' => intval($input['product_id']) ?? null,
            'vendor_id' => intval($input['vendor_id']) ?? null,
            'quantity' => intval($input['quantity']) ?? null,
            'description' => $input['description'] ?? null,
            'date_at' => !empty($input['date_at']) ? \Carbon\Carbon::parse($input['date_at'])->format('Y-m-d') : date('Y-m-d'),
            'status' => Status::ACTIVE,
        );

        $product = $this->productQuantityRepository->update($id, $dataArray);
        if (!$product) {
            return redirect()->route('product_production.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('product_production.list')->with('message', 'Production product updated successfully.');
    }


    /**
     * destroySingle
     */
    public function destroyProduction(int $id): RedirectResponse
    {
        $product = $this->productQuantityRepository->getById($id);
        if (!$product) {
            return redirect()->route('product_production.list')->with('error', 'Something goes wrong.');
        }
        $this->productQuantityRepository->delete($id);
        return redirect()->route('product_production.list')->with('message', 'Product deleted successfully.');
    }



    /**
     * Display consumption form and list
     */
    public function showConsumption(): Response
    {
        $products = $this->productQuantityRepository->getActiveListForConsumption();

        // product title
        $productTitleData = $this->productRepository->getActiveNameAndId();
        $productTitles = $productTitleData->map(fn($proTitle) => ['id' => $proTitle->id, 'title' => $proTitle->title])->all();

        // vendor title
        $vendorTitleData = $this->vendorRepository->getActiveTitleAndId();
        $vendorTitles = $vendorTitleData->map(fn($venTitle) => ['id' => $venTitle->id, 'title' => $venTitle->title])->all();

        return Inertia::render('Inventory/CreateProductConsumption', [
            'products' => $products,
            'productTitles' => $productTitles,
            'vendorTitles' => $vendorTitles,
        ]);
    }

    /**
     * saveProduction
     */
    public function saveConsumption(ProductQuantityRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'product_id' => intval($input['product_id']) ?? null,
            'vendor_id' => intval($input['vendor_id']) ?? null,
            'quantity' => intval($input['quantity']) ?? null,
            'description' => $input['description'] ?? null,
            'type' => ProductType::CONSUMPTION,
            'date_at' => !empty($input['date_at']) ? \Carbon\Carbon::parse($input['date_at'])->format('Y-m-d') : date('Y-m-d'),
            'status' => Status::ACTIVE,
        );

        $product = $this->productQuantityRepository->create($dataArray);
        if (!$product) {
            return redirect()->route('product_consumption.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('product_consumption.list')->with('message', 'Consumption product created successfully.');
    }


    /**
     * Display edit production form and list
     */
    public function editConsumption(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('product_consumption.list');
        }

        $product = $this->productQuantityRepository->getById($id);
        $products = $this->productQuantityRepository->getActiveListForConsumption();

        // product title
        $productTitleData = $this->productRepository->getActiveNameAndId();
        $productTitles = $productTitleData->map(fn($proTitle) => ['id' => $proTitle->id, 'title' => $proTitle->title])->all();

        // vendor title
        $vendorTitleData = $this->vendorRepository->getActiveTitleAndId();
        $vendorTitles = $vendorTitleData->map(fn($venTitle) => ['id' => $venTitle->id, 'title' => $venTitle->title])->all();

        $productType = ProductType::cases();
        $productArrType = array();
        foreach ($productType as $proType) {
            array_push($productArrType, ['id' => $proType->value, 'title' => $proType->value]);
        }

        return Inertia::render('Inventory/EditProductConsumption', [
            'product' => $product,
            'products' => $products,
            'productTitles' => $productTitles,
            'vendorTitles' => $vendorTitles,
        ]);
    }

    /**
     * updateProduction
     */
    public function updateConsumption(ProductQuantityRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'product_id' => intval($input['product_id']) ?? null,
            'vendor_id' => intval($input['vendor_id']) ?? null,
            'quantity' => intval($input['quantity']) ?? null,
            'description' => $input['description'] ?? null,
            'date_at' => !empty($input['date_at']) ? \Carbon\Carbon::parse($input['date_at'])->format('Y-m-d') : date('Y-m-d'),
            'status' => Status::ACTIVE,
        );

        $product = $this->productQuantityRepository->update($id, $dataArray);
        if (!$product) {
            return redirect()->route('product_consumption.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('product_consumption.list')->with('message', 'Consumption product updated successfully.');
    }

    /**
     * destroySingle
     */
    public function destroyConsumption(int $id): RedirectResponse
    {
        $product = $this->productQuantityRepository->getById($id);
        if (!$product) {
            return redirect()->route('product_consumption.list')->with('error', 'Something goes wrong.');
        }
        $this->productQuantityRepository->delete($id);
        return redirect()->route('product_consumption.list')->with('message', 'Product deleted successfully.');
    }
}
