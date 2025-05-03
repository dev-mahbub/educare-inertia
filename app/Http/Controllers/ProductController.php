<?php

namespace App\Http\Controllers;

use App\Enums\PaymentMode;
use App\Enums\ProductType;
use App\Enums\Status;
use App\Enums\UomType;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\SalePriceRequest;
use App\Http\Requests\StaffProductAllocationRequest;
use App\Http\Requests\StudentSaleLedgerRequest;
use App\Http\Requests\TeacherSaleLedgerRequest;
use App\Models\ProductSalePrice;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\IProductRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\IUomRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{

    public function __construct(
        private ITeacherRepository $teacherRepository,
        private ICategoryRepository $categoryRepository,
        private IProductRepository $productRepository,
        private IUomRepository $uomRepository,
        private ILedgerRepository $ledgerRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository
    ) {
        $this->middleware('permission:view product', ['only' => [
            'openingStock',
            'getSubProductCat',
            'studentSale',
            'getProductById',
            'teacherSale',
            'productReportList'
        ]]);
        $this->middleware('permission:add product', ['only' => [
            'createSingle',
            'saveSingle',
            'createMultiple',
            'saveMulti',
            'openingStockSave',
            'saveStudentSaleLedger',
            'saveTeacherSaleLedger',
            'saleSetPrice',
            'saleSetPriceSave'
        ]]);
        $this->middleware('permission:edit product', ['only' => ['editSingle', 'updateSingle', 'setSalePriceUpdate', 'setCostPriceUpdate']]);
        $this->middleware('permission:delete product', ['only' => ['destroySingle', 'salePriceDelete']]);
    }

    /**
     * Display product form and list
     */
    public function createSingle(Request $request): Response
    {
        $products = $this->productRepository->getActiveList('', '', '', '');

        // product category
        $proSubCats = [];
        $proCatData = $this->categoryRepository->getProductCategoryNameAndId();
        $proCats = $proCatData->map(fn($proCat) => ['id' => $proCat->id, 'title' => $proCat->title])->all();
        if ($request->isMethod('POST')) {
            if (!empty($request->category_id)) {
                $proSubCats = $this->categoryRepository->getProductSubCategoryNameAndId(getUserSchoolId(), $request->category_id);
            }
        }
        // uom
        $uomData = $this->uomRepository->getActiveNameAndId();
        $uomTitles = $uomData->map(fn($uom) => ['id' => $uom->id, 'title' => $uom->title])->all();


        $productType = ProductType::cases();
        $productArrType = array();
        foreach ($productType as $proType) {
            array_push($productArrType, ['id' => $proType->value, 'title' => $proType->value]);
        }

        return Inertia::render('Inventory/CreateSingleProduct', [
            'products' => $products,
            'proCats' => $proCats,
            'uomTitles' => $uomTitles,
            'productArrType' => $productArrType,
            'proSubCats' => $proSubCats,
        ]);
    }

    /**
     * saveSingle product
     */
    public function saveSingle(ProductRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'category_id' => intval($input['category_id']) ?? null,
            'sub_category_id' => intval($input['sub_category_id']) ?? null,
            'uom_id' => intval($input['uom_id']) ?? null,
            'title' => $input['title'] ?? null,
            'description' => $input['description'] ?? null,
            'type' => $input['type'] ?? null,
            'opening_stock' => intval($input['opening_stock']) ?? null,
            'available_stock' => intval($input['opening_stock']) ?? null,
            'rate_per_product' => intval($input['rate_per_product']) ?? null,
            'gst_tax' => intval($input['gst_tax']) ?? null,
            'product_code' => $input['product_code'] ?? null,
            'product_size' => $input['product_size'] ?? null,
            'status' => Status::ACTIVE,
            'purchased_by' => Auth::user()->id
        );

        $product = $this->productRepository->create($dataArray);
        if (!$product) {
            return redirect()->route('create_single_product.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('create_single_product.list')->with('message', 'Product created successfully.');
    }


    /**
     * editSingle
     */
    public function editSingle(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('create_single_product.list');
        }

        $product = $this->productRepository->getById($id);
        $products = $this->productRepository->getActiveList('', '', '', '');

        // product category
        $proCatData = $this->categoryRepository->getProductCategoryNameAndId();
        $proCats = $proCatData->map(fn($proCat) => ['id' => $proCat->id, 'title' => $proCat->title])->all();

        // product usb category
        if ($request->isMethod('POST')) {
            if (!empty($request->category_id)) {
                $proSubCatsData = $this->categoryRepository->getProductSubCategoryNameAndId(getUserSchoolId(), $request->category_id);
                $proSubCats = $proSubCatsData->map(fn($proSubCat) => ['id' => $proSubCat->id, 'title' => $proSubCat->title])->all();
            }
        } else {
            $proSubCatData = $this->categoryRepository->getSubCatById($product->category_id);
            $proSubCats = $proSubCatData->map(fn($proSubCat) => ['id' => $proSubCat->id, 'title' => $proSubCat->title])->all();
        }
        // uom
        $uomData = $this->uomRepository->getActiveNameAndId();
        $uomTitles = $uomData->map(fn($uom) => ['id' => $uom->id, 'title' => $uom->title])->all();

        $productType = ProductType::cases();
        $productArrType = array();
        foreach ($productType as $proType) {
            array_push($productArrType, ['id' => $proType->value, 'title' => $proType->value]);
        }

        return Inertia::render('Inventory/EditSingleProduct', [
            'product' => $product,
            'products' => $products,
            'proCats' => $proCats,
            'proSubCats' => !empty($proSubCats) ? $proSubCats : [],
            'uomTitles' => $uomTitles,
            'productArrType' => $productArrType,
        ]);
    }

    /**
     * updateSingle
     */
    public function updateSingle(ProductRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'category_id' => intval($input['category_id']) ?? null,
            'sub_category_id' => intval($input['sub_category_id']) ?? null,
            'uom_id' => intval($input['uom_id']) ?? null,
            'title' => $input['title'] ?? null,
            'description' => $input['description'] ?? null,
            'type' => $input['type'] ?? null,
            'opening_stock' => intval($input['opening_stock']) ?? null,
            'rate_per_product' => intval($input['rate_per_product']) ?? null,
            'gst_tax' => intval($input['gst_tax']) ?? null,
            'product_code' => $input['product_code'] ?? null,
            'product_size' => $input['product_size'] ?? null,
            'status' => Status::ACTIVE,
        );

        $product = $this->productRepository->update($id, $dataArray);
        if (!$product) {
            return redirect()->route('create_single_product.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('create_single_product.list')->with('message', 'Product updated successfully.');
    }


    /**
     * Display product multiple
     */
    public function createMultiple(Request $request): Response
    {
        $products = $this->productRepository->getActiveList('', '', '', '');

        // Category
        $proCatData = $this->categoryRepository->getProductCategoryNameAndId();
        $proCats = $proCatData->map(fn($proCat) => ['id' => $proCat->id, 'title' => $proCat->title])->all();

        // product usb category
        $proSubCats = [];
        if ($request->isMethod('POST')) {
            if (!empty($request->category_id)) {
                $proSubCatsData = $this->categoryRepository->getProductSubCategoryNameAndId(getUserSchoolId(), $request->category_id);
                $proSubCats = $proSubCatsData->map(fn($proSubCat) => ['id' => $proSubCat->id, 'title' => $proSubCat->title])->all();
            }
        }

        // uom
        $uomData = $this->uomRepository->getActiveNameAndId();
        $uomTitles = $uomData->map(fn($uom) => ['id' => $uom->id, 'title' => $uom->title])->all();

        $productType = ProductType::cases();
        $productArrType = array();
        foreach ($productType as $proType) {
            array_push($productArrType, ['id' => $proType->value, 'title' => $proType->value]);
        }

        return Inertia::render('Inventory/CreateMultiProduct', [
            'products' => $products,
            'proCats' => $proCats,
            'uomTitles' => $uomTitles,
            'productArrType' => $productArrType,
            'proSubCats' => $proSubCats,
        ]);
    }

    /**
     * saveMulti product
     */
    public function saveMulti(Request $request): RedirectResponse
    {

        $data = $request->all();
        if (empty($data['category_id']) || !is_numeric($data['category_id'])) {
            return redirect()->back()->with('error', 'Please fill out required field.');
        }
        $productsData = $data['products'];
        foreach ($productsData as $input) {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'category_id' => intval($data['category_id']) ?? null,
                'sub_category_id' => intval($data['sub_category_id']) ?? null,
                'uom_id' => intval($input['uom_id']) ?? null,
                'title' => $input['title'] ?? null,
                'description' => $input['description'] ?? null,
                'type' => $input['type'] ?? null,
                'opening_stock' => intval($input['opening_stock']) ?? null,
                'available_stock' => intval($input['opening_stock']) ?? null,
                'rate_per_product' => intval($input['rate_per_product']) ?? null,
                'gst_tax' => intval($input['gst_tax']) ?? null,
                'product_code' => $input['product_code'] ?? null,
                'product_size' => $input['product_size'] ?? null,
                'status' => Status::ACTIVE,
                'purchased_by' => Auth::user()->id,
            );
            $this->productRepository->create($dataArray);
        }
        return redirect()->route('create_single_product.list')->with('message', 'Product created successfully.');
    }

    /**
     * openStock
     */
    public function openingStock(Request $request)
    {
        // filter data
        $catId = !empty($_GET['cat_id']) ? $_GET['cat_id'] : '';
        $subCatId = !empty($_GET['sub_cat_id']) ? $_GET['sub_cat_id'] : '';
        $search = !empty($_GET['search']) ? $_GET['search'] : '';

        $products = $this->productRepository->getActiveList($catId, $subCatId, $search);

        // category
        $proCatData = $this->categoryRepository->getProductCategoryNameAndId();
        $proCats = $proCatData->map(fn($proCat) => ['id' => $proCat->id, 'title' => $proCat->title])->all();

        // sub category
        $subProCats = [];
        if (!empty($catId)) {
            $subProCatData = $this->categoryRepository->getProductSubCategoryNameAndId(getUserSchoolId(), $catId);
            $subProCats = $subProCatData->map(fn($proSubCat) => ['id' => $proSubCat->id, 'title' => $proSubCat->title])->all();
        }

        // Type
        $uomType = UomType::cases();
        $uomArrType = array();
        foreach ($uomType as $uom) {
            array_push($uomArrType, ['id' => $uom->value, 'title' => $uom->value]);
        }

        $productType = ProductType::cases();
        $productArrType = array();
        foreach ($productType as $proType) {
            array_push($productArrType, ['id' => $proType->value, 'title' => $proType->value]);
        }

        return Inertia::render('Inventory/OpeningStockProduct', [
            'products' => $products,
            'proCats' => $proCats,
            'subProCats' => $subProCats,
            'catId' => $catId,
            'subCatId' => $subCatId,
            'search' => $search,
        ]);
    }

    /**
     * openingStockSave
     * */
    public function openingStockSave(Request $request)
    {
        $input = $request->all();
        $prevOpenQyt = $this->productRepository->getOpeningQytById($input['id']);

        if ($prevOpenQyt->is_opening_stock === 1) {
            $opening_stock = true;
        } else {
            if (!empty($prevOpenQyt)) {
                if ($prevOpenQyt->opening_stock === intval($input['opening_stock'])) {
                    $opening_stock = false;
                } else {
                    $opening_stock = true;
                }
            }
        }

        $dataArray = [
            'is_opening_stock' => $opening_stock,
            'opening_stock' => intval($input['opening_stock']) ?? null,
            'rate_per_product' => intval($input['rate_per_product']) ?? null,
            'amount' => intval($input['amount']) ?? null,
        ];

        if ($prevOpenQyt->is_opening_stock == false) {
            $dataArray['available_stock'] = intval($input['opening_stock']) ?? null;
        }

        $product = $this->productRepository->update($input['id'], $dataArray);
        if (!$product) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Product updated successfully.');
    }


    /**
     * destroySingle
     */
    public function destroySingle(int $id): RedirectResponse
    {
        $product = $this->productRepository->getById($id);
        if (!$product) {
            return redirect()->route('create_single_product.list')->with('error', 'Something goes wrong.');
        }
        $this->productRepository->delete($id);
        return redirect()->route('create_single_product.list')->with('message', 'Product deleted successfully.');
    }

    /**
     * getSubProductCat
     */
    public function getSubProductCat(Request $request)
    {
        $parentId = $request->input('id');
        if (!empty($parentId) && is_numeric($parentId)) {
            $subCatData = $this->categoryRepository->getSubCatNameAndIdById($parentId);
            $proCats = $subCatData->map(fn($subCat) => ['id' => $subCat->id, 'title' => $subCat->title])->all();
            return redirect()->back()->with([
                'customData' => $proCats
            ]);
        }
    }

    /**
     * studentSale
     */
    public function studentSale(Request $request)
    {
        // ledger titles
        $ledgerData = $this->ledgerRepository->getActiveNameAndId();
        $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();

        // classroom titles
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classroomTitles = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // product titles
        $productData = $this->productRepository->getActiveAll();
        $productTitles = $productData->map(fn($product) => ['id' => $product->id, 'title' => $product->title])->all();

        // payment type
        $paymentType = PaymentMode::cases();
        $paymentArrType = array();
        foreach ($paymentType as $payType) {
            array_push($paymentArrType, ['id' => $payType->value, 'title' => $payType->value]);
        }

        return Inertia::render('Inventory/StudentSaleProduct', [
            'ledgerTitles' => $ledgerTitles,
            'classroomTitles' => $classroomTitles,
            'productTitles' => $productTitles,
            'paymentArrType' => $paymentArrType,
            'products' => $productData,
        ]);
    }


    /**
     * getProductById
     */
    public function getProductById(Request $request)
    {
        $productId = $request->input('id');
        if (!empty($productId) && is_numeric($productId)) {
            $productData = $this->productRepository->getById($productId);
            return redirect()->back()->with([
                'customData3' => $productData
            ]);
        }
    }

    /**
     * saveStudentSaleLedger
     */
    public function saveStudentSaleLedger(StudentSaleLedgerRequest $request)
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'student_id' => intval($input['student_id']) ?? null,
            'ledger_id' => intval($input['ledger_id']) ?? null,
            'classroom_id' => intval($input['classroom_id']) ?? null,
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'transaction_date' => !empty($input['transaction_date']) ? \Carbon\Carbon::parse($input['transaction_date'])->format('Y-m-d') : date('Y-m-d'),
            'admission_no' => $input['admission_no'] ?? null,
            'father_name' => $input['father_name'] ?? null,
            'father_phone' => $input['father_phone'] ?? null,
            'sub_total' => $input['item_total'] ?? null,
            'total_discount' => $input['item_discount_value_total'] ?? null,
            'total_tax' => $input['item_tax_amount_total'] ?? null,
            'total' => $input['item_total_amount_total'] ?? null,
            'is_print_receipt' => $input['is_print_receipt'] ?? null,
            'paid_type' => $input['paid_type'] ?? null,
            'payment_type' => $input['payment_type'] ?? null,
            'transaction_no' => $input['transaction_no'] ?? null,
            'transaction_desc' => $input['transaction_desc'] ?? null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        );

        $studentLedger = $this->productRepository->createStudentLedger($dataArray);

        if (!empty($studentLedger->id)) {
            $productsArray = $input['products'];
            $filteredProducts = array_filter($productsArray, function ($product) {
                return $product['product_id'] !== null;
            });
            foreach ($filteredProducts as $pData) {
                $pDataArray = array(
                    'school_id' => getUserSchoolId(),
                    'product_id' => intval($pData['product_id']) ?? null,
                    'student_sale_ledger_id' => $studentLedger->id,
                    'quantity' => $pData['quantity'] ?? null,
                    'rate' => $pData['rate'] ?? null,
                    'discount_value' => $pData['item_discount_value'] ?? null,
                    'tax_amount' => $pData['item_tax_amount'] ?? null,
                    'total_amount' => $pData['item_total_amount'] ?? null,
                    'status' => Status::ACTIVE,
                );
                $this->productRepository->createStudentLedgerProduct($pDataArray);
            }
            return redirect()->route('student_sale.create')->with('message', 'Product sale successfully.');
        }
        return redirect()->route('student_sale.create')->with('error', 'Something goes wrong.');
    }



    /**
     * studentSale
     */
    public function teacherSale(Request $request)
    {
        // ledger titles
        $ledgerData = $this->ledgerRepository->getActiveNameAndId();
        $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();

        // teachers
        $teacherData = $this->staffRepository->getActiveListForTeacherSale();
        $teacherNames = $teacherData->map(fn($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->last_name])->all();

        // product titles
        $productData = $this->productRepository->getActiveAll();
        $productTitles = $productData->map(fn($product) => ['id' => $product->id, 'title' => $product->title])->all();

        // payment type
        $paymentType = PaymentMode::cases();
        $paymentArrType = array();
        foreach ($paymentType as $payType) {
            array_push($paymentArrType, ['id' => $payType->value, 'title' => $payType->value]);
        }

        return Inertia::render('Inventory/TeacherSaleProduct', [
            'ledgerTitles' => $ledgerTitles,
            'productTitles' => $productTitles,
            'paymentArrType' => $paymentArrType,
            'products' => $productData,
            'teachers' => $teacherData,
            'teacherNames' => $teacherNames,
        ]);
    }

    /**
     * saveTeacherSaleLedger
     */
    public function saveTeacherSaleLedger(TeacherSaleLedgerRequest $request)
    {

        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'staff_id' => intval($input['teacher_id']) ?? null,
            'ledger_id' => intval($input['ledger_id']) ?? null,
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'transaction_date' => !empty($input['transaction_date']) ? \Carbon\Carbon::parse($input['transaction_date'])->format('Y-m-d') : date('Y-m-d'),
            'email' => $input['email'] ?? null,
            'address' => $input['address'] ?? null,
            'phone' => $input['phone'] ?? null,
            'sub_total' => $input['item_total'] ?? null,
            'total_discount' => $input['item_discount_value_total'] ?? null,
            'total_tax' => $input['item_tax_amount_total'] ?? null,
            'total' => $input['item_total_amount_total'] ?? null,
            'is_print_receipt' => $input['is_print_receipt'] ?? null,
            'paid_type' => $input['paid_type'] ?? null,
            'payment_type' => $input['payment_type'] ?? null,
            'transaction_no' => $input['transaction_no'] ?? null,
            'transaction_desc' => $input['transaction_desc'] ?? null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        );

        $teacherLedger = $this->productRepository->createTeacherLedger($dataArray);

        if (!empty($teacherLedger->id)) {
            $productsArray = $input['products'];
            $filteredProducts = array_filter($productsArray, function ($product) {
                return $product['product_id'] !== null;
            });
            foreach ($filteredProducts as $pData) {
                $pDataArray = array(
                    'school_id' => getUserSchoolId(),
                    'product_id' => intval($pData['product_id']) ?? null,
                    'teacher_sale_ledger_id' => $teacherLedger->id,
                    'quantity' => $pData['quantity'] ?? null,
                    'rate' => $pData['rate'] ?? null,
                    'discount_value' => $pData['item_discount_value'] ?? null,
                    'tax_amount' => $pData['item_tax_amount'] ?? null,
                    'total_amount' => $pData['item_total_amount'] ?? null,
                    'status' => Status::ACTIVE,
                );
                $this->productRepository->createTeacherLedgerProduct($pDataArray);
            }
            return redirect()->route('teacher_sale.create')->with('message', 'Product sale successfully.');
        }
        return redirect()->route('teacher_sale.create')->with('error', 'Something goes wrong.');
    }

    public function productReportList(Request $request)
    {
        // filter data
        $type =  '';
        $catId =  '';
        $subCatId = '';
        $search = '';

        if ($request->isMethod('post')) {
            $type = $request->input('type') ?? '';
            $catId = $request->input('category_id') ?? '';
            $subCatId = $request->input('sub_category_id') ?? '';
            $search = $request->input('search_query') ?? '';
        }

        $products = $this->productRepository->getActiveList($catId, $subCatId, $search, $type);

        // category
        $proCatData = $this->categoryRepository->getProductCategoryNameAndId();
        $proCats = $proCatData->map(fn($proCat) => ['id' => $proCat->id, 'title' => $proCat->title])->all();

        // sub category
        $subProCatData = $this->categoryRepository->getProductSubCategoryNameAndId();
        $subProCats = $subProCatData->map(fn($subProCat) => ['id' => $subProCat->id, 'title' => $subProCat->title, 'parent_id' => $subProCat->parent_id])->all();

        // Type
        $uomType = UomType::cases();
        $uomArrType = array();
        foreach ($uomType as $uom) {
            array_push($uomArrType, ['id' => $uom->value, 'title' => $uom->value]);
        }

        $productType = ProductType::cases();
        $productArrType = array();
        foreach ($productType as $proType) {
            array_push($productArrType, ['id' => $proType->value, 'title' => $proType->value]);
        }

        return Inertia::render('Inventory/ProductReport', [
            'proCats' => $proCats,
            'subProCats' => $subProCats,
            'productArrType' => $productArrType,
            'products' => $products,
        ]);
    }


    /**
     * saleSetPrice
     */
    public function saleSetPrice(Request $request)
    {
        $product = [];
        $salePriceProduct = [];
        $productId = '';

        if ($request->isMethod('post')) {
            $productId = $request->input('product_id') ?? '';
        }

        $product = $this->productRepository->getActiveById($productId);
        $salePriceProduct = $this->productRepository->getSalePriceByProductId($productId);

        // product names
        $productData = $this->productRepository->getActiveNameAndId();
        $productNames = $productData->map(fn($product) => ['id' => $product->id, 'label' => $product->title])->all();

        return Inertia::render('Inventory/SetSalePrice', [
            'productNames' => $productNames,
            'product' => $product,
            'salePriceProduct' => $salePriceProduct,
        ]);
    }

    /**
     * saleSetPriceSave
     */
    public function saleSetPriceSave(SalePriceRequest $request)
    {
        $input = $request->validated();
        $dataArray = [
            'school_id' => getUserSchoolId(),
            'product_id' => $input['product_id'] ?? null,
            'category_id' => $input['category_id'] ?? null,
            'sub_category_id' => $input['sub_category_id'] ?? null,
            'sale_price' => $input['sale_price'] ?? null,
            'applied_date_at' => !empty($input['applied_date_at']) ? \Carbon\Carbon::parse($input['applied_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'note' => $input['note'] ?? null,
            'status' => Status::ACTIVE,
            'applied_by' => Auth::user()->id,
        ];
        $productSalePrice = $this->productRepository->createProductSalePrice($dataArray);
        if (!$productSalePrice) {
            return redirect()->route('set_sale_price.create_list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('set_sale_price.create_list')->with('message', 'Sale price set successfully.');
    }

    /**
     * saleSetPriceSave
     */
    public function setSalePriceUpdate(SalePriceRequest $request, int $id)
    {
        $input = $request->validated();
        $dataArray = [
            'sale_price' => $input['sale_price'] ?? null,
            'applied_date_at' => !empty($input['applied_date_at']) ? \Carbon\Carbon::parse($input['applied_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'note' => $input['note'] ?? null,
            'applied_by' => Auth::user()->id,
        ];
        $productSalePrice = $this->productRepository->updateSalePriceProduct($id, $dataArray);
        if (!$productSalePrice) {
            return redirect()->route('set_sale_price.create_list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('set_sale_price.create_list')->with('message', 'Sale price updated successfully.');
    }

    /**
     * saleSetPriceSave
     */
    public function setCostPriceUpdate(Request $request, int $id)
    {
        $input = $request->all();
        $dataArray = [
            'rate_per_product' => $input['rate_per_product'] ?? null,
            'purchase_date_at' => !empty($input['purchase_date_at']) ? \Carbon\Carbon::parse($input['purchase_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'note' => $input['note'] ?? null,
        ];
        $productSalePrice = $this->productRepository->update($id, $dataArray);
        if (!$productSalePrice) {
            return redirect()->route('set_sale_price.create_list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('set_sale_price.create_list')->with('message', 'Cost price updated successfully.');
    }

    /**
     * Delete sale price
     */
    public function salePriceDelete(int $id): RedirectResponse
    {
        $salePriceProduct = $this->productRepository->getSalePriceById($id);
        if (!$salePriceProduct) {
            return redirect()->route('set_sale_price.create_list')->with('error', 'Area not found.');
        }
        $this->productRepository->deleteSalePrice($id);
        return redirect()->route('set_sale_price.create_list')->with('message', 'Area deleted successfully.');
    }
}
