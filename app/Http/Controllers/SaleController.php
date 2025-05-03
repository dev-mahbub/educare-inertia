<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use App\Enums\PaymentMode;
use Illuminate\Http\Request;
use App\Enums\SaleDiscountType;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Repositories\ISaleRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ILedgerRepository;
use Illuminate\Support\Facades\Session;
use App\Repositories\IProductRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Response;
use App\Repositories\ICategoryRepository;
use App\Repositories\IPurchaseRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\CancelSaleLedgerRequest;
use App\Http\Requests\StudentSaleLedgerRequest;
use App\Http\Requests\TeacherSaleLedgerRequest;
use App\Repositories\IFeePaymentMethodRepository;
use App\Http\Requests\CancelSaleLedgerReturnRequest;
use App\Http\Requests\StudentSaleLedgerReturnRequest;
use App\Http\Requests\TeacherSaleLedgerReturnRequest;

class SaleController extends Controller
{

    public function __construct(
        private ITeacherRepository $teacherRepository,
        private IProductRepository $productRepository,
        private ILedgerRepository $ledgerRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private ISaleRepository $saleRepository,
        private IPurchaseRepository $purchaseRepository,
        private IStudentRepository $studentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private ICategoryRepository $categoryRepository,

    ) {
        $this->middleware('permission:view sale', ['only' => [
            'studentSale',
            'getProductById',
            'teacherSale',
            'saleRegisterReport',
            'saleReturnReport',
            'productTransactionReport',
            'productLedgerSaleReport',
            'partySaleReport',
            'duePaidReport',
            'getStudentsByClassroomId',
            'cancelSaleReturn',
            'cancelSaleLedger'
        ]]);
        $this->middleware('permission:add sale', ['only' => [
            'saveStudentSaleLedger',
            'saveTeacherSaleLedger',
            'studentSaleReturn',
            'saveStudentSaleReturnLedger',
            'teacherSaleReturn',
            'teacherSaleReturnSave',
            'consolidatedSaleReport'
        ]]);
    }

    /**
     * studentSale
     */
    public function studentSale(Request $request)
    {
        // ledger titles
        $ledgerData = $this->ledgerRepository->getLedgersByAccountGroupTitle('Sales Account');
        $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();

        // classroom titles
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classroomTitles = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // product titles
        $productData = $this->productRepository->getActiveAll()->map(function ($product) {
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

            $product['title'] = $title;
            $product['label'] = $title;
            $product['sale_price'] = $product?->productSalePrice?->sale_price ?? 0;

            return $product;
        });

        // payment type
        // $paymentType = PaymentMode::cases();
        // $paymentArrType = array();
        // foreach ($paymentType as $payType) {
        //     if (!in_array($payType, [
        //         PaymentMode::CARDSWAP,
        //         PaymentMode::HDFC,
        //         PaymentMode::ONLINEBACKOFFICE,
        //         PaymentMode::UPI,
        //         PaymentMode::EMPLOYEEWARD,
        //         PaymentMode::RTGS,
        //     ])) {
        //         array_push($paymentArrType, ['id' => $payType->value, 'title' => $payType->value]);
        //     }
        // }

        $paymentArrType = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title
                ];
            })->toArray();

        //students
        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($request?->admission_no)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($request->admission_no);
            }

            if ($student != null) {
                $student->loadMissing(['father:id,student_id,first_name,middle_name,last_name,guardian_type,phone', 'promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->getStudentsByClassroomId($classroomId);
            }
        }

        // discount types
        $discountTypes = \buildEnumOptionsArray(SaleDiscountType::cases());

        return Inertia::render('Inventory/StudentSaleProduct', [
            'ledgerTitles' => $ledgerTitles,
            'classroomTitles' => $classroomTitles,
            'paymentArrType' => $paymentArrType,
            'products' => $productData,
            'students' => $students,
            'student' => $student,
            'discountTypes' => $discountTypes,
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

        DB::beginTransaction();

        try {
            $nextInvoiceNo = $this->saleRepository->getSaleLedgerNextInvoiceNo();
            $nextReceiptNo = $this->saleRepository->getSaleLedgerNextReceiptNo();
            $saleDate = !empty($input['sale_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['sale_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');
            $paymentNote = "System receipt entry for sale invoice no - {$nextInvoiceNo} on date {$saleDate}";

            // sale ledger
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => intval($input['student_id']) ?? null,
                'ledger_id' => intval($input['ledger_id']) ?? null,
                'classroom_id' => intval($input['classroom_id']) ?? null,
                'sale_date_at' => $saleDate,
                'transaction_date' => !empty($input['transaction_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['transaction_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'admission_no' => $input['admission_no'] ?? null,
                'father_name' => $input['father_name'] ?? null,
                'father_phone' => $input['father_phone'] ?? null,
                'sub_total' => $input['item_total'] ?? 0,
                'total_discount' => $input['item_discount_value_total'] ?? 0,
                'total_tax' => $input['item_tax_amount_total'] ?? 0,
                'total' => $input['item_total_amount_total'] ?? 0,
                'paid_amount' => $input['paid_type'] == "Paid" ? $input['item_total_amount_total'] : 0,
                // 'previous_paid_amount' => $input['paid_type'] == "Paid" ? $input['item_total_amount_total'] : 0,
                'due_amount' => $input['paid_type'] == "Unpaid" ? $input['item_total_amount_total'] : 0,
                'is_print_receipt' => $input['is_print_receipt'] ?? null,
                'paid_type' => $input['paid_type'] ?? null,
                'payment_type' => $input['payment_type'] ?? null,
                'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                'transaction_no' => $input['transaction_no'] ?? null,
                'transaction_desc' => $input['transaction_desc'] ?? null,
                'sale_type_for' => 'Student',
                // 'description' => $input['description'] ?? $paymentNote,
                'description' => $input['description'] ?? "",
                'status' => Status::ACTIVE,
                'invoice_no' => $nextInvoiceNo,
                'receipt_no' => $nextReceiptNo,
                'created_by' => auth()->user()->id,
            );

            $studentLedger = $this->saleRepository->crateSaleLedger($dataArray);

            // sale ledger product
            if (!empty($input['products'])) {
                $productsArray = $input['products'];

                $filteredProducts = array_filter($productsArray, function ($product) {
                    return $product['product_id'] !== null;
                });

                foreach ($filteredProducts as $pData) {
                    $pDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'product_id' => intval($pData['product_id']) ?? null,
                        'sale_ledger_id' => $studentLedger->id,
                        'quantity' => $pData['quantity'] ?? 1,
                        'rate' => $pData['rate'] ?? 0,
                        'discount_value' => $pData['item_discount_value'] ?? 0,
                        'discount_amount' => $pData['item_discount_amount'] ?? 0,
                        'tax_amount' => $pData['item_tax_amount'] ?? 0,
                        'total_amount' => $pData['item_total_amount'] ?? 0,
                        'discount_type' => $input['discount_type'] ?? null,
                        'sale_type_for' => 'Student',
                        'status' => Status::ACTIVE,
                    );

                    $this->saleRepository->createSaleLedgerProduct($pDataArray);

                    // update product stock
                    $this->productRepository->updateProductAvailableStock($pData['product_id'], $pData['quantity'] ?? 1);
                }
            }

            // sale ledger payment
            if ($input['paid_type'] == "Paid") {
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'sale_ledger_id' => $studentLedger->id,
                    'created_by' => auth()->user()->id,
                    'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                    'payment_date' => $saleDate,
                    'transaction_no' => $input['transaction_no'] ?? null,
                    'transaction_details' => $input['transaction_desc'] ?? null,
                    'transaction_date' => !empty($input['transaction_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['transaction_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                    'paid_amount' => $input['item_total_amount_total'] ?? 0,
                    'receipt_no' => $nextReceiptNo,
                    'description' => $paymentNote,
                    'status' => Status::ACTIVE
                ];

                $this->saleRepository->createSaleLedgerPayment($dataArray);
            }

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('voucher_is_enable_sale');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                setSiteSettingData('Voucher', 'voucher_sale_voucher_receipt_seed_no', $nextReceiptNo + 1);
            }

            Session::put('sale_ledger_id', $studentLedger->id);

            DB::commit();

            return redirect()->route('student_sale.create')->with('message', 'Product sale successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            if (Session::has('sale_ledger_id')) {
                Session::forget('sale_ledger_id');
            }

            return redirect()->route('student_sale.create')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * teacher sale
     */
    public function teacherSale(Request $request)
    {
        // ledger titles
        // $ledgerData = $this->ledgerRepository->getActiveNameAndId();
        // $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();
        // ledger titles
        $ledgerData = $this->ledgerRepository->getLedgersByAccountGroupTitle('Sales Account');
        $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();

        // teachers
        $teacherData = $this->staffRepository->getActiveListForTeacherSale();
        $teacherNames = $teacherData->map(fn($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->last_name])->all();

        // product titles
        // $productData = $this->productRepository->getActiveAll();
        // $productTitles = $productData->map(fn($product) => ['id' => $product->id, 'title' => $product->title])->all();
        $productData = $this->productRepository->getActiveAll()->map(function ($product) {
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

            $product['title'] = $title;
            $product['label'] = $title;
            $product['sale_price'] = $product?->productSalePrice?->sale_price ?? 0;

            return $product;
        });

        // payment type
        // $paymentType = PaymentMode::cases();
        // $paymentArrType = array();
        // foreach ($paymentType as $payType) {
        //     array_push($paymentArrType, ['id' => $payType->value, 'title' => $payType->value]);
        // }
        $paymentArrType = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title
                ];
            })->toArray();

        // discount types
        $discountTypes = \buildEnumOptionsArray(SaleDiscountType::cases());

        return Inertia::render('Inventory/TeacherSaleProduct', [
            'ledgerTitles' => $ledgerTitles,
            'paymentArrType' => $paymentArrType,
            'products' => $productData,
            'teachers' => $teacherData,
            'teacherNames' => $teacherNames,
            'discountTypes' => $discountTypes,
        ]);
    }

    /**
     * saveTeacherSaleLedger
     */
    public function saveTeacherSaleLedger(TeacherSaleLedgerRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $nextInvoiceNo = $this->saleRepository->getSaleLedgerNextInvoiceNo();
            $nextReceiptNo = $this->saleRepository->getSaleLedgerNextReceiptNo();
            $saleDate = !empty($input['sale_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['sale_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');
            $paymentNote = "System receipt entry for sale invoice no - {$nextInvoiceNo} on date {$saleDate}";

            // sale ledger
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'staff_id' => intval($input['teacher_id']) ?? null,
                'ledger_id' => intval($input['ledger_id']) ?? null,
                'sale_date_at' => $saleDate,
                'transaction_date' => !empty($input['transaction_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['transaction_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'email' => $input['email'] ?? null,
                'address' => $input['address'] ?? null,
                'phone' => $input['phone'] ?? null,
                'sub_total' => $input['item_total'] ?? 0,
                'total_discount' => $input['item_discount_value_total'] ?? 0,
                'total_tax' => $input['item_tax_amount_total'] ?? 0,
                'total' => $input['item_total_amount_total'] ?? 0,
                'paid_amount' => $input['paid_type'] == "Paid" ? $input['item_total_amount_total'] : 0,
                'previous_paid_amount' => $input['paid_type'] == "Paid" ? $input['item_total_amount_total'] : 0,
                'due_amount' => $input['paid_type'] == "Unpaid" ? $input['item_total_amount_total'] : 0,
                'is_print_receipt' => $input['is_print_receipt'] ?? null,
                'paid_type' => $input['paid_type'] ?? null,
                'payment_type' => $input['payment_type'] ?? null,
                'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                'transaction_no' => $input['transaction_no'] ?? null,
                'transaction_desc' => $input['transaction_desc'] ?? null,
                'sale_type_for' => 'Teacher',
                // 'description' => $input['description'] ?? $paymentNote,
                'description' => $input['description'] ?? "",
                'status' => Status::ACTIVE,
                'invoice_no' => $nextInvoiceNo,
                'receipt_no' => $nextReceiptNo,
                'created_by' => auth()->user()->id,
            );

            $teacherLedger = $this->saleRepository->crateSaleLedger($dataArray);

            // sale ledger product
            if (!empty($input['products'])) {
                $productsArray = $input['products'];

                $filteredProducts = array_filter($productsArray, function ($product) {
                    return $product['product_id'] !== null;
                });

                foreach ($filteredProducts as $pData) {
                    $pDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'product_id' => intval($pData['product_id']) ?? null,
                        'sale_ledger_id' => $teacherLedger->id,
                        'quantity' => $pData['quantity'] ?? 1,
                        'rate' => $pData['rate'] ?? 0,
                        'discount_value' => $pData['item_discount_value'] ?? 0,
                        'discount_amount' => $pData['item_discount_amount'] ?? 0,
                        'tax_amount' => $pData['item_tax_amount'] ?? 0,
                        'total_amount' => $pData['item_total_amount'] ?? 0,
                        'discount_type' => $input['discount_type'] ?? null,
                        'sale_type_for' => 'Teacher',
                        'status' => Status::ACTIVE,
                    );

                    $this->saleRepository->createSaleLedgerProduct($pDataArray);

                    // update product stock
                    $this->productRepository->updateProductAvailableStock($pData['product_id'], $pData['quantity'] ?? 1, 'decrement');
                }
            }

            // sale ledger payment
            if ($input['paid_type'] == "Paid") {
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'sale_ledger_id' => $teacherLedger->id,
                    'created_by' => auth()->user()->id,
                    'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                    'payment_date' => $saleDate,
                    'transaction_no' => $input['transaction_no'] ?? null,
                    'transaction_details' => $input['transaction_desc'] ?? null,
                    'transaction_date' => !empty($input['transaction_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['transaction_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                    'paid_amount' => $input['item_total_amount_total'] ?? 0,
                    'receipt_no' => $nextReceiptNo,
                    'description' => $paymentNote,
                    'status' => Status::ACTIVE
                ];

                $this->saleRepository->createSaleLedgerPayment($dataArray);
            }

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('voucher_is_enable_sale');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                setSiteSettingData('Voucher', 'voucher_sale_voucher_receipt_seed_no', $nextReceiptNo + 1);
            }

            Session::put('sale_ledger_id', $teacherLedger->id);

            DB::commit();

            return redirect()->route('teacher_sale.create')->with('message', 'Product sale successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            if (Session::has('sale_ledger_id')) {
                Session::forget('sale_ledger_id');
            }

            return redirect()->route('teacher_sale.create')->with('error', 'Something goes wrong.');
        }
    }

    public function studentSaleReturn(Request $request)
    {
        // ledger titles
        $ledgerData = $this->ledgerRepository->getLedgersByAccountGroupTitle('Sales Account');
        $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();

        // classroom titles
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classroomTitles = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // product titles
        $productData = $this->productRepository->getActiveAll()->map(function ($product) {
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

            $product['title'] = $title;
            $product['label'] = $title;
            $product['sale_price'] = $product?->productSalePrice?->sale_price ?? 0;

            return $product;
        });

        // discount type
        $discountTypes = buildEnumOptionsArray(SaleDiscountType::cases());

        // get next receipt no
        $receiptNo = $this->saleRepository->getNextReceiptNo();

        //students
        $students = [];
        $student = null;
        $saleLedger = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $saleInvoiceNo = $request->sale_invoice_no ?? "";
            $admissionNo = $request->admission_no ?? "";
            $studentId = null;
            $filterType = $request->filter_type;

            if ($filterType == 'sale_ledger') {
                // validate invoice no
                $request->validate(
                    [
                        'sale_invoice_no' => [
                            Rule::exists('sale_ledgers', 'invoice_no')->where(function ($query) {
                                $query->where('school_id', getUserSchoolId())
                                    ->where('sale_type_for', 'Student');
                            }),
                        ],
                    ]
                );

                if (!empty($saleInvoiceNo)) {
                    $saleLedger = $this->saleRepository->getSaleLedgerByInvoiceNo($saleInvoiceNo, 'Student');
                    $studentId = $saleLedger?->student_id;
                }

                if (!empty($studentId)) {
                    $student = $this->studentRepository->getStudentById($studentId);
                }
            }

            if (!empty($admissionNo) && ($filterType == 'student' || $saleLedger == null)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if ($student != null) {
                $student->loadMissing(['father:id,student_id,first_name,middle_name,last_name,guardian_type,phone', 'promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->getStudentsByClassroomId($classroomId);
            }
        }

        return Inertia::render('Inventory/StudentSaleReturnProduct', [
            'ledgerTitles' => $ledgerTitles,
            'classroomTitles' => $classroomTitles,
            'products' => $productData,
            'discountTypes' => $discountTypes,
            'receiptNo' => $receiptNo,
            'students' => $students,
            'student' => $student,
            'saleLedger' => $saleLedger
        ]);
    }

    /**
     * saveStudentSaleReturnLedger
     */
    public function saveStudentSaleReturnLedger(StudentSaleLedgerReturnRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $receiptNo = $input['receipt_no'] ?? null;

            if ($receiptNo == null) {
                // get next receipt no
                $receiptNo = $this->saleRepository->getNextReceiptNo();
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'] ?? null,
                'ledger_id' => $input['ledger_id'] ?? null,
                'classroom_id' => $input['classroom_id'] ?? null,
                'return_date_at' => !empty($input['return_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['return_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'receipt_no' => $receiptNo,
                'sale_invoice_no' => $input['sale_invoice_no'] ?? null,
                'admission_no' => $input['admission_no'] ?? null,
                'father_name' => $input['father_name'] ?? null,
                'father_phone' => $input['father_phone'] ?? null,
                'sub_total' => $input['item_total'] ?? 0,
                'total_discount' => $input['item_discount_value_total'] ?? 0,
                'total_tax' => $input['item_tax_amount_total'] ?? 0,
                'total' => $input['item_total_amount_total'] ?? 0,
                'return_type_for' => 'Student',
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            );

            $studentLedgerReturn = $this->saleRepository->crateSaleLedgerReturn($dataArray);

            if (!empty($input['products'])) {
                foreach ($input['products'] as $pData) {
                    $pDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'product_id' => $pData['product_id'] ?? null,
                        'sale_ledger_return_id' => $studentLedgerReturn->id,
                        'quantity' => $pData['quantity'] ?? 1,
                        'rate' => $pData['rate'] ?? 0,
                        // 'discount_value' => $pData['item_discount_value'] ?? 0,
                        // 'tax_amount' => $pData['item_tax_amount'] ?? 0,
                        // 'total_amount' => $pData['item_total_amount'] ?? 0,
                        'total_amount' => ($pData['rate'] ?? 0) * ($pData['quantity'] ?? 1),
                        'return_type_for' => 'Student',
                        'status' => Status::ACTIVE,
                    );

                    $this->saleRepository->createSaleLedgerReturnProduct($pDataArray);

                    // update product stock
                    $this->productRepository->updateProductAvailableStock($pData['product_id'], $pData['quantity'] ?? 1, 'increment');
                }
            }

            DB::commit();

            return redirect()->route('student_sale_return.create')->with('message', 'Product return successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('student_sale_return.create')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * teacher sale return
     */
    public function teacherSaleReturn(Request $request)
    {
        // ledger titles
        $ledgerData = $this->ledgerRepository->getActiveNameAndId();
        $ledgerTitles = $ledgerData->map(fn($ledger) => ['id' => $ledger->id, 'title' => $ledger->title])->all();

        // teachers
        $teacherData = $this->staffRepository->getActiveListForTeacherSale();
        $teacherNames = $teacherData->map(fn($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->last_name])->all();

        // product titles
        $productData = $this->productRepository->getActiveAll()->map(function ($product) {
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

            $product['title'] = $title;
            $product['label'] = $title;
            $product['sale_price'] = $product?->productSalePrice?->sale_price ?? 0;

            return $product;
        });

        // discount type
        $discountTypes = buildEnumOptionsArray(SaleDiscountType::cases());

        // get next receipt no
        $receiptNo = $this->saleRepository->getNextReceiptNo();

        $saleLedger = null;

        if ($request->isMethod('POST')) {
            $saleInvoiceNo = $request->sale_invoice_no ?? "";

            // validate invoice no
            $request->validate(
                [
                    'sale_invoice_no' => [
                        Rule::exists('sale_ledgers', 'invoice_no')->where(function ($query) {
                            $query->where('school_id', getUserSchoolId())
                                ->where('sale_type_for', 'Teacher');
                        }),
                    ],
                ]
            );

            if (!empty($saleInvoiceNo)) {
                $saleLedger = $this->saleRepository->getSaleLedgerByInvoiceNo($saleInvoiceNo, 'Teacher');
            }
        }

        return Inertia::render('Inventory/TeacherSaleProductReturn', [
            'ledgerTitles' => $ledgerTitles,
            'products' => $productData,
            'teachers' => $teacherData,
            'teacherNames' => $teacherNames,
            'discountTypes' => $discountTypes,
            'receiptNo' => $receiptNo,
            'saleLedger' => $saleLedger
        ]);
    }

    /**
     * teacherSaleReturnSave
     */
    public function teacherSaleReturnSave(TeacherSaleLedgerReturnRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $receiptNo = $input['receipt_no'] ?? null;

            if ($receiptNo == null) {
                // get next receipt no
                $receiptNo = $this->saleRepository->getNextReceiptNo();
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'staff_id' => $input['teacher_id'] ?? null,
                'ledger_id' => $input['ledger_id'] ?? null,
                'return_date_at' => !empty($input['return_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['return_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'receipt_no' => $receiptNo,
                'sale_invoice_no' => $input['sale_invoice_no'] ?? null,
                'email' => $input['email'] ?? null,
                'address' => $input['address'] ?? null,
                'phone' => $input['phone'] ?? null,
                'sub_total' => $input['item_total'] ?? 0,
                'total_discount' => $input['item_discount_value_total'] ?? 0,
                'total_tax' => $input['item_tax_amount_total'] ?? 0,
                'total' => $input['item_total_amount_total'] ?? 0,
                'return_type_for' => 'Teacher',
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            );

            $teacherLedgerReturn = $this->saleRepository->crateSaleLedgerReturn($dataArray);

            if (!empty($input['products'])) {
                foreach ($input['products'] as $pData) {
                    $pDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'product_id' => $pData['product_id'] ?? null,
                        'sale_ledger_return_id' => $teacherLedgerReturn->id,
                        'quantity' => $pData['quantity'] ?? 1,
                        'rate' => $pData['rate'] ?? 0,
                        // 'discount_value' => $pData['item_discount_value'] ?? 0,
                        // 'tax_amount' => $pData['item_tax_amount'] ?? 0,
                        // 'total_amount' => $pData['item_total_amount'] ?? 0,
                        'total_amount' => ($pData['rate'] ?? 0) * ($pData['quantity'] ?? 1),
                        'return_type_for' => 'Teacher',
                        'status' => Status::ACTIVE,
                    );

                    $this->saleRepository->createSaleLedgerReturnProduct($pDataArray);

                    // update product stock
                    $this->productRepository->updateProductAvailableStock($pData['product_id'], $pData['quantity'] ?? 1, 'increment');
                }
            }

            DB::commit();

            return redirect()->route('teacher_sale_return.create')->with('message', 'Product return successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('teacher_sale_return.create')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * SaleRegisterReport
     */
    public function saleRegisterReport(Request $request)
    {
        $ledgerId = null;
        $search = '';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $ledgerId = $request->input('ledger_id') ?? null;
            $search = $request->input('search_value') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // ledgers
        $ledgers = $this->ledgerRepository->getLedgersByAccountGroupTitle('Sales Account');

        // sale report
        $saleReport = $this->saleRepository->getActiveAllForReport($search, $startDate, $endDate, $ledgerId);

        $paymentModeSummary = [];
        $takenBySummary = [];

        if (count($saleReport) > 0) {
            foreach ($saleReport as $saleLedger) {
                $paidAmount = $saleLedger?->paid_amount ?? 0;

                // payment mode summary
                $bankLedgerId = $saleLedger?->bank_ledger_id;

                if (!isset($paymentModeSummary[$bankLedgerId])) {
                    $paymentModeSummary[$bankLedgerId] = [
                        'payment_mode' => $saleLedger?->bankLedger?->title,
                        'amount' => 0
                    ];
                }

                $paymentModeSummary[$bankLedgerId]['amount'] += $paidAmount;

                // taken by summary
                $userId = $saleLedger?->created_by;

                if (!isset($takenBySummary[$userId])) {
                    $takenBySummary[$userId] = [
                        'taken_by' => trim(implode(' ', [$saleLedger?->createdBy?->first_name, $saleLedger?->createdBy?->middle_name, $saleLedger?->createdBy?->last_name])),
                        'amount' => 0
                    ];
                }

                $takenBySummary[$userId]['amount'] += $paidAmount;
            }
        }

        return Inertia::render('Inventory/SaleRegisterReport', [
            'saleReport' => $saleReport,
            'ledgers' => $ledgers,
            'paymentModeSummary' => !empty($paymentModeSummary) ? array_values($paymentModeSummary) : [],
            'takenBySummary' => !empty($takenBySummary) ? array_values($takenBySummary) : []
        ]);
    }

    /**
     * SaleReturnReport
     */
    public function saleReturnReport(Request $request)
    {
        $search =  '';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $search = $request->input('search_value') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // sale return report
        $saleReturnReport = $this->saleRepository->getActiveAllForReturnReport($search, $startDate, $endDate);

        return Inertia::render('Inventory/SaleReturnReport', [
            'saleReturnReport' => $saleReturnReport,
        ]);
    }


    /**
     * Transaction Report
     */
    public function productTransactionReport(Request $request)
    {
        $transactionPurchaseReport = [];
        $transactionSaleReport = [];
        $sumOpeningStock = 0;
        $availableStock = 0;

        // product names
        $productData = $this->productRepository->getActiveAll();
        $productNames = $productData->map(fn($product) => [
            'id' => $product->id,
            'label' => $product->title
        ])->all();

        if ($request->isMethod('POST')) {
            $productId = $request->input('product_id') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';

            if (!empty($productId) && !empty($startDate) && !empty($endDate)) {
                $transactionPurchaseReport = $this->purchaseRepository->getActiveAllTransactionPurchase($productId, $startDate, $endDate);
                $transactionSaleReport = $this->saleRepository->getActiveAllTransactionSale($productId, $startDate, $endDate);
            }

            // selected product
            $product = $productData?->filter(function ($product) use ($productId) {
                return $product?->id == $productId;
            })?->first();

            // Calculate the sum of opening_stock for each product
            // old code
            // $sumOpeningStock = $transactionPurchaseReport->sum(function ($purchaseProduct) {
            //     return $purchaseProduct->product->opening_stock;
            // });
            $sumOpeningStock = $product?->opening_stock ?? 0;

            // Calculate the sum of available stock for selected product
            $availableStock = $product?->available_stock ?? 0;
        }

        return Inertia::render('Inventory/ProductTransactionReport', [
            'transactionPurchaseReport' => $transactionPurchaseReport,
            'sumOpeningStock' => $sumOpeningStock,
            'productNames' => $productNames,
            'transactionSaleReport' => $transactionSaleReport,
            'availableStock' => $availableStock
        ]);
    }


    /**
     * ProductSaleReport
     */
    public function productLedgerSaleReport(Request $request)
    {
        $ledgerSummary = [];
        $products = [];

        if ($request->isMethod('POST')) {
            $categoryId = $request->category_id ?? null;
            $productId = $request->product_id ?? '';
            $partyType = $request->party_type ?? '';

            if (!empty($categoryId)) {
                $products = $this->productRepository->getProductsByCategoryId($categoryId);
            }

            if (!empty($productId) && !empty($partyType)) {
                $saleLedgers = $this->saleRepository->getActiveAllLedgerSummery($productId, $partyType);

                if (count($saleLedgers) > 0) {
                    foreach ($saleLedgers as $saleLedger) {
                        $key = $partyType == 'Student' ? $saleLedger?->student_id : $saleLedger?->staff_id;
                        $saleDate = !empty($saleLedger->sale_date_at) ? Carbon::parse($saleLedger->sale_date_at)->format('d-M-Y') : '';

                        if (!isset($ledgerSummary[$key])) {
                            $name = '';
                            $fatherName = '';
                            $phone = '';

                            if ($partyType == 'Student') {
                                $name = "{$saleLedger?->student?->first_name} {$saleLedger?->student?->middle_name} {$saleLedger?->student?->last_name}";
                                $fatherName = "{$saleLedger?->student?->father?->first_name} {$saleLedger?->student?->father?->middle_name} {$saleLedger?->student?->father?->last_name}";
                                $phone = $saleLedger?->student?->father?->phone;
                            } else if ($partyType == 'Teacher') {
                                $name = "{$saleLedger?->staff?->first_name} {$saleLedger?->staff?->middle_name} {$saleLedger?->staff?->last_name}";
                                $phone = $saleLedger?->staff?->phone;
                            }

                            $ledgerSummary[$key] = [
                                'name' => $name,
                                'admission_no' => $saleLedger?->student?->admission_no,
                                'classroom_title' => $saleLedger?->classroom?->title,
                                'father_name' => $fatherName,
                                'phone' => $phone,
                                'designation' => $saleLedger?->staff?->designation?->name,
                                'quantity' => 0,
                            ];
                        }

                        if ($saleLedger?->saleLedgerProducts?->count() > 0) {
                            foreach ($saleLedger->saleLedgerProducts as $saleLedgerProduct) {
                                $ledgerSummary[$key]['quantity'] = ($ledgerSummary[$key]['quantity'] ?? 0) + ($saleLedgerProduct->quantity ?? 1);

                                $ledgerSummary[$key]['ledger_summary_items'][] = [
                                    'date' => $saleDate,
                                    'quantity' => $saleLedgerProduct->quantity ?? 1,
                                    'rate' => $saleLedgerProduct->rate ?? 0,
                                    'tax_amount' => $saleLedgerProduct->tax_amount ?? 0,
                                    'discount_amount' => $saleLedgerProduct->discount_amount ?? 0,
                                    'total_amount' => $saleLedgerProduct->total_amount ?? 0,
                                ];
                            }
                        }
                    }

                    $ledgerSummary = !empty($ledgerSummary) ? array_values($ledgerSummary) : [];
                }
            }
        }

        // category
        $categories = $this->categoryRepository->getProductCategoryNameAndId()
            ?->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();

        // party type
        $partyTypes = [
            [
                'id' => 'Student',
                'title' => 'Student'
            ],
            [
                'id' => 'Teacher',
                'title' => 'Teacher'
            ]
        ];

        return Inertia::render('Inventory/ProductSaleReport', [
            'ledgerSummary' => $ledgerSummary,
            'categories' => $categories,
            'products' => $products,
            'partyTypes' => $partyTypes
        ]);
    }

    /**
     * partySaleReport
     */
    public function partySaleReport(Request $request)
    {
        $pendingSale = [];
        $paidSale = [];
        $pendingSaleItem = [];
        $paidSaleItem = [];

        //students
        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $teacherStudentType = $request->input('teacher_student_type') ?? '';
            $studentId = $request->input('student_id') ?? '';
            $staffId = $request->input('staff_id') ?? '';
            $classroomId = $request->input('classroom_id') ?? '';

            if ($teacherStudentType == 'Student') {
                if (!empty($request?->admission_no)) {
                    $student = $this->studentRepository->getStudentByAdmissionNo($request->admission_no);
                }

                if ($student != null) {
                    $student->loadMissing([
                        'father:id,student_id,first_name,middle_name,last_name,guardian_type,phone',
                        'promotedClassroom'
                    ]);

                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $classroomId = $student?->classroom_id;
                    $studentId = $student?->id;
                }

                if (!empty($classroomId)) {
                    $students = $this->getStudentsByClassroomId($classroomId);
                }
            }

            if (!empty($teacherStudentType) && (($teacherStudentType == 'Student' && !empty($studentId)) || ($teacherStudentType == 'Teacher' && !empty($staffId)))) {
                $pendingSale = $this->saleRepository->getPendingSale($teacherStudentType, $classroomId, $studentId, $staffId);
                $paidSale = $this->saleRepository->getPaidSale($teacherStudentType, $classroomId, $studentId, $staffId);
                $pendingSaleLedgerProducts = $this->saleRepository->getActiveAllPendingSale($teacherStudentType, $classroomId, $studentId, $staffId);

                if (count($pendingSaleLedgerProducts) > 0) {
                    foreach ($pendingSaleLedgerProducts as $pendingLedgerProduct) {
                        $productId = $pendingLedgerProduct?->product_id;

                        if (!isset($pendingSaleItem[$productId])) {
                            $pendingSaleItem[$productId] = [
                                'product_title' => $pendingLedgerProduct?->product?->title,
                                'rate' => 0,
                                'quantity' => 0,
                                'tax_amount' => 0,
                                'discount_amount' => 0,
                                'total_amount' => 0
                            ];
                        }

                        $pendingSaleItem[$productId]['rate'] = ($pendingSaleItem[$productId]['rate'] ?? 0) + ($pendingLedgerProduct->rate ?? 0);
                        $pendingSaleItem[$productId]['quantity'] = ($pendingSaleItem[$productId]['quantity'] ?? 0) + ($pendingLedgerProduct->quantity ?? 1);
                        $pendingSaleItem[$productId]['tax_amount'] = ($pendingSaleItem[$productId]['tax_amount'] ?? 0) + ($pendingLedgerProduct->tax_amount ?? 0);
                        $pendingSaleItem[$productId]['discount_amount'] = ($pendingSaleItem[$productId]['discount_amount'] ?? 0) + ($pendingLedgerProduct->discount_amount ?? 0);
                        $pendingSaleItem[$productId]['total_amount'] = ($pendingSaleItem[$productId]['total_amount'] ?? 0) + ($pendingLedgerProduct->total_amount ?? 0);
                    }

                    $pendingSaleItem = !empty($pendingSaleItem) ? array_values($pendingSaleItem) : [];
                }

                $paidSaleLedgerProducts = $this->saleRepository->getActiveAllPaidSale($teacherStudentType, $classroomId, $studentId, $staffId);

                if (count($paidSaleLedgerProducts) > 0) {
                    foreach ($paidSaleLedgerProducts as $paidLedgerProduct) {
                        $productId = $paidLedgerProduct?->product_id;

                        if (!isset($paidSaleItem[$productId])) {
                            $paidSaleItem[$productId] = [
                                'product_title' => $paidLedgerProduct?->product?->title,
                                'rate' => 0,
                                'quantity' => 0,
                                'tax_amount' => 0,
                                'discount_amount' => 0,
                                'total_amount' => 0
                            ];
                        }

                        $paidSaleItem[$productId]['rate'] = ($paidSaleItem[$productId]['rate'] ?? 0) + ($paidLedgerProduct->rate ?? 0);
                        $paidSaleItem[$productId]['quantity'] = ($paidSaleItem[$productId]['quantity'] ?? 0) + ($paidLedgerProduct->quantity ?? 1);
                        $paidSaleItem[$productId]['tax_amount'] = ($paidSaleItem[$productId]['tax_amount'] ?? 0) + ($paidLedgerProduct->tax_amount ?? 0);
                        $paidSaleItem[$productId]['discount_amount'] = ($paidSaleItem[$productId]['discount_amount'] ?? 0) + ($paidLedgerProduct->discount_amount ?? 0);
                        $paidSaleItem[$productId]['total_amount'] = ($paidSaleItem[$productId]['total_amount'] ?? 0) + ($paidLedgerProduct->total_amount ?? 0);
                    }

                    $paidSaleItem = !empty($paidSaleItem) ? array_values($paidSaleItem) : [];
                }
            }
        }

        // classroom names
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classroomNames = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // teacher names
        $teacherNameData = $this->staffRepository->getActiveListForTeacherSale();
        $teacherNames = $teacherNameData->map(fn($teacherName) => [
            'id' => $teacherName->id,
            'title' => $teacherName->first_name . ' ' . $teacherName->middle_name . ' ' .  $teacherName->last_name,
            'staff_phone' => $teacherName->phone,
        ])->all();

        return Inertia::render('Inventory/PartySaleReport', [
            'classroomNames' => $classroomNames,
            'studentNames' => [],
            'pendingSale' => $pendingSale,
            'paidSale' => $paidSale,
            'teacherNames' => $teacherNames,
            'pendingSaleItem' => $pendingSaleItem,
            'paidSaleItem' => $paidSaleItem,
            'students' => $students,
            'student' => $student,
        ]);
    }

    /**
     * DuePaidReport
     */
    public function duePaidReport(Request $request)
    {
        $search =  '';
        $search2 =  '';

        if ($request->isMethod('POST')) {
            $search = $request->input('search_value') ?? '';
            $search2 = $request->input('search_value2') ?? '';
        }

        $dueReportForStudent = [];
        $paidReportForStudent = [];

        // due sale
        $dueSaleLedgers = $this->saleRepository->getDueReportForStudent($search);

        if (count($dueSaleLedgers) > 0) {
            foreach ($dueSaleLedgers as $dueSaleLedger) {
                $key = "";
                $name = "";
                $admissionNo = "";
                $classroomTitle = "";
                $phone = "";

                if ($dueSaleLedger->sale_type_for == 'Student') {
                    $key = $dueSaleLedger->sale_type_for . '_' . $dueSaleLedger->student_id;
                    $admissionNo = $dueSaleLedger?->student?->admission_no;
                    $classroomTitle = $dueSaleLedger?->classroom?->title;
                    $phone = $dueSaleLedger?->student?->father?->phone;
                    $name = "{$dueSaleLedger?->student?->first_name} {$dueSaleLedger?->student?->middle_name} {$dueSaleLedger?->student?->last_name}";
                } else if ($dueSaleLedger->sale_type_for == 'Teacher') {
                    $key = $dueSaleLedger->sale_type_for . '_' . $dueSaleLedger->staff_id;
                    $name = "{$dueSaleLedger?->staff?->first_name} {$dueSaleLedger?->staff?->middle_name} {$dueSaleLedger?->staff?->last_name}";
                }

                if (!isset($dueReportForStudent[$key])) {
                    $dueReportForStudent[$key] = [
                        'name' => $name,
                        'admission_no' => $admissionNo,
                        'classroom_title' => $classroomTitle,
                        'phone' => $phone,
                        'due_amount' => 0,
                    ];
                }

                $dueReportForStudent[$key]['due_amount'] = ($dueReportForStudent[$key]['due_amount'] ?? 0) + ($dueSaleLedger->due_amount ?? 0);
            }

            $dueReportForStudent = !empty($dueReportForStudent) ? array_values($dueReportForStudent) : [];
        }

        // paid sale
        $paidSaleLedgers = $this->saleRepository->getPaidReportForStudent($search2);

        if (count($paidSaleLedgers) > 0) {
            foreach ($paidSaleLedgers as $paidSaleLedger) {
                $key = "";
                $name = "";
                $admissionNo = "";
                $classroomTitle = "";
                $phone = "";

                if ($paidSaleLedger->sale_type_for == 'Student') {
                    $key = $paidSaleLedger->sale_type_for . '_' . $paidSaleLedger->student_id;
                    $admissionNo = $paidSaleLedger?->student?->admission_no;
                    $classroomTitle = $paidSaleLedger?->classroom?->title;
                    $phone = $paidSaleLedger?->student?->father?->phone;
                    $name = "{$paidSaleLedger?->student?->first_name} {$paidSaleLedger?->student?->middle_name} {$paidSaleLedger?->student?->last_name}";
                } else if ($paidSaleLedger->sale_type_for == 'Teacher') {
                    $key = $paidSaleLedger->sale_type_for . '_' . $paidSaleLedger->staff_id;
                    $name = "{$paidSaleLedger?->staff?->first_name} {$paidSaleLedger?->staff?->middle_name} {$paidSaleLedger?->staff?->last_name}";
                }

                if (!isset($paidReportForStudent[$key])) {
                    $paidReportForStudent[$key] = [
                        'name' => $name,
                        'admission_no' => $admissionNo,
                        'classroom_title' => $classroomTitle,
                        'phone' => $phone,
                        'paid_amount' => 0,
                    ];
                }

                $paidReportForStudent[$key]['paid_amount'] = ($paidReportForStudent[$key]['paid_amount'] ?? 0) + ($paidSaleLedger->paid_amount ?? 0);
            }

            $paidReportForStudent = !empty($paidReportForStudent) ? array_values($paidReportForStudent) : [];
        }

        return Inertia::render('Inventory/DuePaidReport', [
            'dueReportForStudent' => !empty($dueReportForStudent) ? array_values($dueReportForStudent) : [],
            'paidReportForStudent' => !empty($paidReportForStudent) ? array_values($paidReportForStudent) : [],
        ]);
    }

    /**
     * ConsolidatedSaleReport
     */
    public function consolidatedSaleReport(Request $request)
    {
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        $consolidatedSaleReport = [];
        $consolidatedSaleSummary = [];

        $saleLedgers = $this->saleRepository->getConsolidatedSaleReport($startDate, $endDate);

        if (count($saleLedgers) > 0) {
            foreach ($saleLedgers->groupBy('invoice_no') as $groupedSaleLedgers) {
                $saleLedger = $groupedSaleLedgers?->first();
                $invoiceNo = $saleLedger?->invoice_no;
                $saleDate = !empty($saleLedger->sale_date_at) ? Carbon::parse($saleLedger->sale_date_at)->format('d-M-Y') : '';
                $name = "{$saleLedger?->student?->first_name} {$saleLedger?->student?->middle_name} {$saleLedger?->student?->last_name}";
                $paymentMode = $saleLedger?->bankLedger?->title;
                $saleAmount = $saleLedger->total ?? 0;
                $saleReturnAmount = $groupedSaleLedgers?->sum('sale_return_amount') ?? 0;

                // report
                $consolidatedSaleReport[] = [
                    'invoice_no' => $invoiceNo,
                    'sale_date' => $saleDate,
                    'name' => $name,
                    'admission_no' => $saleLedger?->student?->admission_no,
                    'classroom_title' => $saleLedger?->classroom?->title,
                    'payment_mode' => $paymentMode,
                    'sale_amount' => $saleAmount,
                    'sale_return_amount' => $saleReturnAmount
                ];

                // summary
                if (!isset($consolidatedSaleSummary[$paymentMode])) {
                    $consolidatedSaleSummary[$paymentMode] = [
                        'payment_mode' => $paymentMode,
                        'sale_amount' => 0,
                        'sale_return_amount' => 0
                    ];
                }

                $consolidatedSaleSummary[$paymentMode]['sale_amount'] = ($consolidatedSaleSummary[$paymentMode]['sale_amount'] ?? 0) + $saleAmount;
                $consolidatedSaleSummary[$paymentMode]['sale_return_amount'] = ($consolidatedSaleSummary[$paymentMode]['sale_return_amount'] ?? 0) + $saleReturnAmount;
            }

            $consolidatedSaleSummary = !empty($consolidatedSaleSummary) ? array_values($consolidatedSaleSummary) : [];
        }

        return Inertia::render('Inventory/ConsolidatedSaleReport', [
            'consolidatedSaleReport' => $consolidatedSaleReport,
            'consolidatedSaleSummary' => $consolidatedSaleSummary
        ]);
    }

    /**
     * Helper method to get students by classroomId
     */
    private function getStudentsByClassroomId(int $classroomId)
    {
        $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

        if (count($students) > 0) {
            $students->loadMissing([
                'father:id,student_id,first_name,middle_name,last_name,guardian_type,phone',
                'promotedClassroom',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->where('classroom_id', $classroomId);
                }
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $student['title'] = $student?->classroomRoll?->roll_no . ' - ' . ($student->first_name ?? '') . ' ' . ($student->middle_name ?? '') . ' ' . ($student->last_name ?? '');

                return $student;
            })->toArray();

            // sort students by classroom roll
            usort($students, function ($a, $b) {
                $rollNoA = $a['classroom_roll']['roll_no'] ?? null;
                $rollNoB = $b['classroom_roll']['roll_no'] ?? null;

                if ($rollNoA == $rollNoB) {
                    return 0;
                }

                // If $rollNoA is null, move it to the end
                if ($rollNoA == null) {
                    return 1;
                }

                // If $rollNoB is null, move it to the end
                if ($rollNoB == null) {
                    return -1;
                }

                return ($rollNoA < $rollNoB) ? -1 : 1;
            });
        }

        return $students;
    }

    /*
    * Cancel Sale Return
    */
    public function cancelSaleReturn(int $id, CancelSaleLedgerReturnRequest $request)
    {
        $input = $request->validated();

        $saleLedgerReturn = $this->saleRepository->getSaleLedgerReturnById($id);

        abort_if(empty($saleLedgerReturn), 404);

        $saleLedgerReturn->loadMissing(['saleLedgerReturnProducts']);

        DB::beginTransaction();

        try {
            $dataArray = [
                'cancel_reason' => $input['cancel_reason'] ?? null,
                'is_cancelled' => true
            ];

            $this->saleRepository->updateSaleLedgerReturn($saleLedgerReturn->id, $dataArray);

            // update product available stock
            if ($saleLedgerReturn?->saleLedgerReturnProducts?->count() > 0) {
                foreach ($saleLedgerReturn->saleLedgerReturnProducts as $saleLedgerReturnproduct) {
                    $this->productRepository->updateProductAvailableStock($saleLedgerReturnproduct?->product_id, $saleLedgerReturnproduct?->quantity, 'decrement');
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Sale return cancelled successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    * Cancel Sale Ledger
    */
    public function cancelSaleLedger(int $id, CancelSaleLedgerRequest $request)
    {
        $input = $request->validated();

        $saleLedger = $this->saleRepository->getActiveSaleLedgerById($id);

        abort_if(empty($saleLedger), 404);

        $saleLedger->loadMissing(['saleLedgerProducts']);

        DB::beginTransaction();

        try {
            $dataArray = [
                'cancel_reason' => $input['cancel_reason'] ?? null,
                'is_cancelled' => true
            ];

            $this->saleRepository->update($saleLedger->id, $dataArray);

            // update product available stock
            if ($saleLedger?->saleLedgerProducts?->count() > 0) {
                foreach ($saleLedger->saleLedgerProducts as $saleLedgerproduct) {
                    $this->productRepository->updateProductAvailableStock($saleLedgerproduct?->product_id, $saleLedgerproduct?->quantity, 'increment');
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Sale cancelled successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }
}
