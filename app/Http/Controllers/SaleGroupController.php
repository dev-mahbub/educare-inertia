<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use App\Enums\StudentTeacherLedger;
use App\Repositories\ISaleRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\SaleGroupRequest;
use App\Repositories\ILedgerRepository;
use Illuminate\Support\Facades\Session;
use App\Repositories\IPaymentRepository;
use App\Repositories\IProductRepository;
use App\Repositories\IReceiptRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IPurchaseRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISaleGroupRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\IInfraLevelRepository;
use App\Http\Requests\SaleDuePaymentRequest;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IAccountGroupRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Http\Requests\StudentTeacherLedgerRequest;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStaffAdvancePaymentRepository;
use App\Http\Requests\CancelSaleLedgerPaymentRequest;
use App\Http\Requests\ProductLocationAllocationRequest;
use App\Repositories\IFeePaymentRefundMethodRepository;
use App\Http\Requests\SaleLedgerPaymentDetailsUpdateRequest;

class SaleGroupController extends Controller
{

    public function __construct(
        private ISaleGroupRepository $saleGroupRepository,
        private IProductRepository $productRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private IStudentRepository $studentRepository,
        private IPaymentRepository $paymentRepository,
        private IReceiptRepository $receiptRepository,
        private ILedgerRepository $ledgerRepository,
        private IPurchaseRepository $purchaseRepository,
        private ISaleRepository $saleRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IInfraLevelRepository $infraLevelRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
        private IEarningTypeRepository $earningTypeRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
    ) {
        $this->middleware('permission:view sale group', ['only' => [
            'show',
            'studentTeacherLedger',
            'allocateProductLocation',
            'allocateProductLocationReport',
            'locationProductList',
            'saleDuePayment',
            'dateWisePaymentReceipt',
            'dayBookReport',
            'getLedgerPaymentReportData',
            'getPurchaseReportData',
            'getSaleReturnReportData',
            'groupSummaryReport',
            'cancelledPaymentReceipt',
            'trialBalanceReport',
            'cashBookReport',
            'saleSummaryReport'
        ]]);
        $this->middleware('permission:add sale group', ['only' => [
            'save',
            'importItem',
            'saveStudentTeacherLedger',
            'allocateProductLocationSave',
            'saveSaleDuePayment',
            'cancelSaleDuePayment'
        ]]);
        $this->middleware('permission:edit sale group', ['only' => ['edit', 'update', 'updateSaleDuePaymentDetails']]);
        $this->middleware('permission:delete sale group', ['only' => ['destroy', 'deleteAllocateProductLocation']]);
    }

    /**
     * show
     */
    public function show(Request $request): Response
    {
        // product titles
        $productData = $this->productRepository->getActiveNameAndId();
        $products = $productData->map(fn($product) => ['id' => $product->id, 'title' => $product->title])->all();

        $saleGroups = $this->saleGroupRepository->getActiveAll();

        return Inertia::render('Inventory/SaleGroup', [
            'saleGroups' => $saleGroups,
            'products' => $products,
        ]);
    }

    /**
     * save
     */
    public function save(SaleGroupRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? "",
            'status' => Status::ACTIVE,
        );
        $saleGroup = $this->saleGroupRepository->create($dataArray);

        if (!empty($saleGroup)) {
            foreach ($input['products'] as $product) {
                if ($product) {
                    $dataArray2 = array(
                        'school_id' => getUserSchoolId(),
                        'sale_group_id' => $saleGroup->id ?? '',
                        'product_id' => $product['id'] ?? '',
                        'status' => Status::ACTIVE,
                    );
                    $this->saleGroupRepository->createProduct($dataArray2);
                }
            }
        }

        if (!$saleGroup) {
            return redirect()->route('sale_group.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('sale_group.list')->with('message', 'Sale group created successfully.');
    }

    /**
     * edit
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('sale_group.list');
        }

        $saleGroup = $this->saleGroupRepository->getById($id);

        if (!empty($saleGroup)) {
            $saleGroupProductData = $this->saleGroupRepository->getProductBySaleGroupId($id);
            $saleGroupProducts = $saleGroupProductData->map(fn($product) => ['id' => $product->id, 'title' => $product->product_title, 'product_id' => $product->product_id])->all();
        }

        // product titles
        $productData = $this->productRepository->getActiveNameAndId();
        $products = $productData->map(fn($product) => ['id' => $product->id, 'title' => $product->title])->all();

        $saleGroups = $this->saleGroupRepository->getActiveAll();

        return Inertia::render('Inventory/EditSaleGroup', [
            'saleGroups' => $saleGroups,
            'products' => $products,
            'saleGroup' => $saleGroup,
            'saleGroupProducts' => $saleGroupProducts,
        ]);
    }

    /**
     * update
     */
    public function update(SaleGroupRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? "",
        );

        $saleGroup = $this->saleGroupRepository->update($id, $dataArray);
        $existingProducts = $this->saleGroupRepository->getSaleGroupProductIds($id);

        // dd($existingProducts);
        $noChangeProducts = array();

        if (!empty($input['products'])) {
            foreach ($input['products'] as $product) {
                if (!empty($product['product_id'])) {
                    array_push($noChangeProducts, $product['id']);
                } else {
                    $dataArray2 = array(
                        'school_id' => getUserSchoolId(),
                        'sale_group_id' => $id,
                        'product_id' => $product['id'] ?? '',
                        'status' => Status::ACTIVE,
                    );
                    $this->saleGroupRepository->createProduct($dataArray2);
                }
            }
        }

        $deleteProduct = array_diff($existingProducts, $noChangeProducts);

        if (!empty($deleteProduct)) {
            foreach ($deleteProduct as $dId) {
                $this->saleGroupRepository->deleteSaleGroupProduct($dId);
            }
        }

        if (!$saleGroup) {
            return redirect()->route('sale_group.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('sale_group.list')->with('message', 'Sale group updated successfully.');
    }

    /**
     * Delete
     */
    public function destroy(String $id): RedirectResponse
    {

        $saleGroupProducts = $this->saleGroupRepository->getProductBySaleGroupId($id);

        // dd($saleGroupProducts);

        if (!empty($saleGroupProducts)) {
            foreach ($saleGroupProducts as $item) {
                // dd($item['id']);
                $this->saleGroupRepository->deleteProduct($item->id);
            }
        }

        $saleGroup = $this->saleGroupRepository->getById($id);
        if (!$saleGroup) {
            return redirect()->route('sale_group.list')->with('error', 'Something goes wrong.');
        }
        $this->saleGroupRepository->delete($id);
        return redirect()->route('sale_group.list')->with('message', 'Sale group deleted successfully.');
    }


    /**
     * importItem
     */
    public function importItem(Request $request): Response
    {
        return Inertia::render('Inventory/ImportItem', []);
    }

    /**
     * studentTeacherLedger
     */
    public function studentTeacherLedger(Request $request): Response
    {
        $ledgerType = '';
        $classroomId = null;
        $students = [];
        $teachers = [];
        $dataList = [];

        if ($request->isMethod('post')) {
            $ledgerType = $request->input('ledger_type') ?? '';
            $classroomId = $request->input('classroom_id') ?? null;
        }

        // students
        if ($ledgerType === StudentTeacherLedger::STUDENT->value && !empty($classroomId)) {
            // $dataList = $this->studentRepository->getActiveDataByClassroomId($classroomId)->toArray();
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

            if (count($students) > 0) {
                $students->loadMissing(['ledger:id,student_id', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->where('classroom_id', $classroomId);
                }]);

                $dataList = $students?->sortBy(function ($student) {
                    return $student?->classroomRoll?->roll_no;
                })->values()->toArray();
            }
        }

        // staff
        if ($ledgerType === StudentTeacherLedger::STAFF->value) {
            // $teachers = $this->staffRepository->getActiveTeacherData();
            $teachers = $this->staffRepository->getActiveNameId();

            if (count($teachers) > 0) {
                $teachers->loadMissing(['ledger:id,staff_id']);

                $dataList = $teachers->toArray();
            }
        }

        // registration students
        if ($ledgerType === StudentTeacherLedger::REGISTER_STUDENT->value) {
            $students = $this->studentRepository->getActiveRegistrationStudents();

            if (count($students) > 0) {
                $students->loadMissing(['ledger:id,student_id', 'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                }]);

                $dataList = $students?->sortBy(function ($student) {
                    return $student?->classroomRoll?->roll_no;
                })->values()->toArray();
            }
        }

        // student teacher ledger type
        $stuTeaType = StudentTeacherLedger::cases();
        $stuTeaTypeArr = array();
        foreach ($stuTeaType as $ledger) {
            if ($ledger != StudentTeacherLedger::TEACHER) {
                array_push($stuTeaTypeArr, ['id' => $ledger->value, 'title' => $ledger->value]);
            }
        }

        // classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('Inventory/StudentTeacherLedger', [
            'classrooms' => $classrooms,
            'stuTeaTypeArr' => $stuTeaTypeArr,
            'students' => $students,
            'teachers' => $teachers,
            'dataList' => $dataList,
        ]);
    }

    /*
    * Save Student Teacher Ledger
    */
    public function saveStudentTeacherLedger(StudentTeacherLedgerRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $accountGroupTitle = $input['ledger_type'] == 'Staffs' ? 'Sundry Creditors' : 'Sundry Debtors';
            $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle($accountGroupTitle);

            foreach ($input['selected_ids'] as $id) {
                $student = null;
                $staff = null;
                $title = null;

                if ($input['ledger_type'] == 'Staffs') {
                    $staff = $this->staffRepository->getStaffById($id);
                    $staff?->loadMissing(['ledger']);

                    if ($staff->ledger != null) {
                        continue;
                    }

                    $title = "{$staff?->first_name} {$staff?->middle_name} {$staff?->last_name}";
                } else {
                    $student = $this->studentRepository->getStudentById($id);
                    $student?->loadMissing(['ledger']);

                    if ($student->ledger != null) {
                        continue;
                    }

                    $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                }

                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'account_group_id' => $accountGroup->id ?? null,
                    'student_id' => $student?->id,
                    'staff_id' => $staff?->id,
                    'title' => $title,
                    'amount_type' => LedgerAmountType::DEBIT,
                    'is_system_default' => true,
                    'status' => Status::ACTIVE,
                ];

                $this->ledgerRepository->create($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Ledger synced successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * AllocateProductLocation
     */
    public function allocateProductLocation(): Response
    {
        $products = $this->productRepository->getActiveAllForLocationAllocation();

        if (count($products) > 0) {
            $products = $products->map(function ($product) {
                $product['allocated_quantity'] = $product?->productLocationAllocations?->sum('quantity') ?? 0;

                return $product;
            });
        }

        $infraLevels = $this->infraLevelRepository->getActiveAllInfraLevels();

        return Inertia::render('Inventory/AllocateProductLocation', [
            'products' => $products,
            'infraLevels' => $infraLevels
        ]);
    }

    /**
     * Save Allocate Product Location
     */
    public function allocateProductLocationSave(ProductLocationAllocationRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'product_id' => $input['product_id'] ?? null,
            'infra_level_id' => $input['infra_level_id'] ?? null,
            'created_by' => auth()->user()->id,
            'allocate_date' => !empty($input['allocate_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['allocate_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'quantity' => $input['allocate_quantity'] ?? 0,
            'status' => Status::ACTIVE
        ];

        $productLocationAllocation = $this->productRepository->createProductLocationAllocation($dataArray);

        if (!$productLocationAllocation) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Product location allocated successfully.');
    }

    /**
     * Delete Allocate Product Location
     */
    public function deleteAllocateProductLocation(int $id)
    {
        $productLocationAllocation = $this->productRepository->getProductLocationAllocationById($id);

        abort_if($productLocationAllocation == null, 404);

        $dataArray = [
            'status' => Status::INACTIVE
        ];

        $deleteProductLocationAllocation = $this->productRepository->updateProductLocationAllocation($id, $dataArray);

        if (!$deleteProductLocationAllocation) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Deleted successfully.');
    }

    /**
     * AllocateProductLocationReport
     */
    public function allocateProductLocationReport(Request $request): Response
    {
        $status = '';
        $productId = null;
        $search = '';

        if ($request->isMethod('POST')) {
            $status = $request->status ?? '';
            $productId = $request->product_id ?? null;
            $search = $request->search ?? '';
        }

        // product location report
        $productLocationReport = [];

        $productLocationAllocations = $this->productRepository->getProductLocationAllocationReport($status, $productId, $search);

        if (count($productLocationAllocations) > 0) {
            foreach ($productLocationAllocations as $productLocationAllocation) {
                $productLocationReport[] = [
                    'product_name' => $productLocationAllocation?->product?->title,
                    'category_title' => $productLocationAllocation?->product?->category?->title,
                    'product_code' => $productLocationAllocation?->product?->product_code,
                    'status' => $productLocationAllocation->status,
                    'infra_level_name' => $productLocationAllocation?->infraLevel?->name,
                    'allocated_by' => "{$productLocationAllocation?->createdBy?->first_name} {$productLocationAllocation?->createdBy?->middle_name} {$productLocationAllocation?->createdBy?->last_name}",
                    'allocate_date' => !empty($productLocationAllocation->allocate_date) ? Carbon::parse($productLocationAllocation->allocate_date)->format('d-M-Y') : ''
                ];
            }
        }

        // products
        $products = $this->productRepository->getActiveAll();

        // status array
        $statusArray = [];

        foreach (Status::cases() as $case) {
            if (in_array($case, [Status::ACTIVE, Status::INACTIVE])) {
                array_push($statusArray, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('Inventory/AllocateProductLocationReport', [
            'productLocationReport' => $productLocationReport,
            'products' => $products,
            'statusArray' => $statusArray
        ]);
    }

    /**
     * LocationProductList
     */
    public function locationProductList(Request $request): Response
    {
        $locationWiseProductReport = [];

        if ($request->isMethod('POST')) {
            $status = $request->status ?? '';
            $search = $request->search ?? '';
            $infraLevelId = $request->infra_level_id ?? null;

            if (!empty($infraLevelId)) {
                $productLocationAllocations = $this->productRepository->getLocationWiseProductAllocationReport($infraLevelId, $status, $search);

                if (count($productLocationAllocations) > 0) {
                    foreach ($productLocationAllocations as $productLocationAllocation) {
                        $locationWiseProductReport[] = [
                            'product_name' => $productLocationAllocation?->product?->title,
                            'product_code' => $productLocationAllocation?->product?->product_code,
                            'status' => $productLocationAllocation->status,
                            'infra_level_name' => $productLocationAllocation?->infraLevel?->name,
                            'allocated_by' => "{$productLocationAllocation?->createdBy?->first_name} {$productLocationAllocation?->createdBy?->middle_name} {$productLocationAllocation?->createdBy?->last_name}",
                            'allocate_date' => !empty($productLocationAllocation->allocate_date) ? Carbon::parse($productLocationAllocation->allocate_date)->format('d-M-Y') : ''
                        ];
                    }
                }
            }
        }

        // status array
        $statusArray = [];

        foreach (Status::cases() as $case) {
            if (in_array($case, [Status::ACTIVE, Status::INACTIVE])) {
                array_push($statusArray, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        // infra levels
        $infraLevels = $this->infraLevelRepository->getActiveAllInfraLevels();

        return Inertia::render('Inventory/LocationProductList', [
            'locationWiseProductReport' => $locationWiseProductReport,
            'infraLevels' => $infraLevels,
            'statusArray' => $statusArray,
        ]);
    }

    /**
     * SaleDuePayment
     */
    public function saleDuePayment(Request $request): Response
    {
        $classrooms = [];
        $staffs = [];
        $students = [];
        $student = null;
        $staff = null;
        $audienceType = 'Student';
        $saleLedgers = [];
        $filteredStudents = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $studentId = $request->student_id ?? null;
            $admissionNo = $request->admission_no ?? '';
            $staffId = $request->staff_id ?? null;
            $audienceType = $request->audience_type ?? '';
            $requestType = $request->request_type ?? '';

            if ($audienceType == 'Student') {
                if ($requestType == 'filter_student') {
                    $filteredStudents = $this->studentRepository->filterStudentsForSaleDuePayment($request->admission_no ?? '', $request->student_name ?? '', $request->father_name ?? '');

                    if (count($filteredStudents) > 0) {
                        $filteredStudents =  $filteredStudents->map(function ($student) {
                            if ($student?->promotedClassroom != null) {
                                if (!empty($student['classroom'])) {
                                    unset($student['classroom']);
                                }

                                $student['classroom_id'] = $student?->promotedClassroom?->id;
                                $student['classroom'] = $student?->promotedClassroom;
                            }

                            return $student;
                        });
                    }
                }

                if ($requestType != 'filter_student' && empty($studentId) && !empty($admissionNo)) {
                    $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
                }

                if ($student == null && !empty($studentId)) {
                    $student = $this->studentRepository->getStudentById($studentId);
                }

                if ($student != null) {
                    $student->loadMissing(['father:id,student_id,first_name,middle_name,last_name,guardian_type,phone', 'promotedClassroom']);

                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $classroomId = $student?->classroom_id;
                    $studentId = $student?->id;
                }

                // get students
                if (!empty($classroomId)) {
                    $students = $this->getStudentsByClassroomId($classroomId);
                }

                // get sale ledgers
                if (!empty($studentId)) {
                    $saleLedgers = $this->saleRepository->getStudentSaleLedgers($studentId);
                }
            } else if ($audienceType == 'Teacher') {
                if (!empty($staffId)) {
                    $staff = $this->staffRepository->getStaffById($staffId);
                    $saleLedgers = $this->saleRepository->getTeacherSaleLedgers($staffId);
                }
            }

            if (count($saleLedgers) > 0) {
                $saleLedgers = $saleLedgers->map(function ($saleLedger) {
                    $saleDate = !empty($saleLedger->sale_date_at) ? Carbon::parse($saleLedger->sale_date_at)->format('d-M-Y') : '';

                    return [
                        'id' => $saleLedger->id,
                        'title' => "Sale, InvoiceNo-{$saleLedger->invoice_no}, {$saleDate}",
                        'total_amount' => $saleLedger->total ?? 0,
                        'paid_amount' => $saleLedger->paid_amount ?? 0,
                        'due_amount' => $saleLedger->due_amount ?? 0,
                        'paid_type' => $saleLedger->paid_type,
                        'sale_ledger_products' => $saleLedger?->saleLedgerProducts?->toArray() ?? []
                    ];
                })->toArray();
            }
        }

        if ($audienceType == 'Student') {
            $classrooms = $this->classroomRepository->getActiveNameAndId();
        } else if ($audienceType == 'Teacher') {
            // $staffs = $this->staffRepository->getActiveTeacherAll()->map(fn($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->last_name])->all();
            $staffs = $this->staffRepository->getActiveStaffData()->map(fn($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $staff?->middle_name . ' ' . $teacher->last_name])->all();
        }

        // payment modes
        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand']);

        return Inertia::render('Inventory/SaleDuePayment', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'paymentModes' => $paymentModes,
            'staffs' => $staffs,
            'staff' => $staff,
            'saleLedgers' => $saleLedgers,
            'filteredStudents' => $filteredStudents,
        ]);
    }

    /**
     * Save Sale Due Payment
     */
    public function saveSaleDuePayment(SaleDuePaymentRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // update sale ledger
            $saleLedger = $this->saleRepository->getActiveSaleLedgerById($input['sale_ledger_id']);

            $dataArray = [
                // 'previous_paid_amount' => ($input['paid_amount'] ?? 0),
                'paid_amount' => ($saleLedger->paid_amount ?? 0) + ($input['paid_amount'] ?? 0),
                'due_amount' => $input['due_amount'] ?? 0,
                'paid_type' => ($input['due_amount'] ?? 0) > 0 ? 'Unpaid' : 'Paid'
            ];

            $this->saleRepository->update($saleLedger->id, $dataArray);

            // create sale ledger payment
            $nextReceiptNo = $this->saleRepository->getSaleLedgerNextReceiptNo();
            $description = 'Sale Due Payment on date: ' . date('d-M-Y');

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'sale_ledger_id' => $saleLedger->id,
                'created_by' => auth()->user()->id,
                'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                'payment_date' => !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'transaction_no' => $input['transaction_no'] ?? null,
                'transaction_details' => $input['transaction_details'] ?? null,
                'transaction_date' => !empty($input['transaction_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['transaction_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'paid_amount' => $input['paid_amount'] ?? 0,
                'receipt_no' => $nextReceiptNo,
                'description' => $description,
                'status' => Status::ACTIVE
            ];

            $saleLedgerPayment = $this->saleRepository->createSaleLedgerPayment($dataArray);

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('voucher_is_enable_sale');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                setSiteSettingData('Voucher', 'voucher_sale_voucher_receipt_seed_no', $nextReceiptNo + 1);
            }

            Session::put('sale_ledger_payment_id', $saleLedgerPayment->id);

            DB::commit();

            return redirect()->back()->with('message', 'Payment taken successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong');
        }
    }

    /**
     * Update Sale Due Payment Details
     */
    public function updateSaleDuePaymentDetails(int $id, SaleLedgerPaymentDetailsUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $saleLedgerPayment = $this->saleRepository->getActiveSaleLedgerPaymentById($id);

        abort_if(empty($saleLedgerPayment), 404);

        $dataArray = [
            'description' => $input['description'] ?? null,
            'payment_date' => !empty($input['receipt_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['receipt_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
        ];

        $updatePayment = $this->saleRepository->updateSaleLedgerPayment($id, $dataArray);

        if (!$updatePayment) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Payment details updated successfully.');
    }

    /*
    * Cancel Sale Due Payment
    */
    public function cancelSaleDuePayment(int $id, CancelSaleLedgerPaymentRequest $request)
    {
        $input = $request->validated();

        $saleLedgerPayment = $this->saleRepository->getActiveSaleLedgerPaymentById($id);

        abort_if(empty($saleLedgerPayment), 404);

        $dataArray = [
            'cancel_reason' => $input['cancel_reason'] ?? null,
            'is_cancelled' => true
        ];

        $cancelPayment = $this->saleRepository->updateSaleLedgerPayment($saleLedgerPayment->id, $dataArray);

        if (!$cancelPayment) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Payment cancelled successfully');
    }

    /**
     * Head Wise Payment/Receipt Report
     */
    public function dateWisePaymentReceipt(Request $request): Response
    {
        // payment types
        $paymentTypes = [
            [
                'id' => 'Payment',
                'title' => 'Payment'
            ],
            [
                'id' => 'Receipt',
                'title' => 'Receipt'
            ]
        ];

        //ledgers
        $ledgers = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand']);

        $headWisePaymentReport = [];
        $headWiseSummary = [];
        $ledgerTitles = [];
        $paymentType = 'Payment';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');
        $ledgerId = null;

        // account settings
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        if ($request->isMethod('POST')) {
            $paymentType = $request->payment_type ?? '';
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $ledgerId = $request->ledger_id ?? null;
        }

        if ($paymentType == 'Payment') {
            // ledger payment
            $ledgerPaymentItems = $this->paymentRepository->getFilteredLedgerPaymentItems($startDate, $endDate, $ledgerId);

            $this->addLedgerPaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $ledgerPaymentItems);

            // if salary is integrated with account then merge salary payment report
            if ($isSalaryIntegratedWithAccount) {
                // staff salary payments
                $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredPublishedStaffSalaryPayments($ledgerId, $startDate, $endDate);

                $this->addStaffSalaryPaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $staffSalaryPayments);

                // staff advance payments
                $staffAdvancePayments = $this->staffAdvancePaymentRepository->getStaffAdvancePaymentsForPaymentReport($ledgerId, $startDate, $endDate);

                $this->addStaffAdvancePaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $staffAdvancePayments);
            }

            // if fee is integrated with account then merge fee refund report
            if ($isFeeIntegratedWithAccount) {
                // ledger
                $ledger = null;

                if (!empty($ledgerId)) {
                    $ledger = $this->ledgerRepository->getLedgerByLedgerId($ledgerId);
                }

                $refundMode = $ledger?->title ?? '';

                // fee payment refunds
                $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getActiveFeeRefunds($refundMode, $startDate, $endDate);

                $this->addFeeRefundPaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $feePaymentRefunds);
            }
        } else if ($paymentType == 'Receipt') {
            // ledger receipt
            $ledgerReceiptItems = $this->receiptRepository->getFilteredLedgerReceiptItems($startDate, $endDate, $ledgerId);

            $this->addLedgerReceiptDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $ledgerReceiptItems);

            // sale ledger payment
            $saleLedgerPayments =  $this->saleRepository->getActiveSaleLedgerPayments('', $ledgerId, $startDate, $endDate);

            $this->addSaleLedgerPaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $saleLedgerPayments);

            $paymentMode = '';

            if (($isFeeIntegratedWithAccount || $isRegistrationIntegratedWithAccount) && !empty($ledgerId)) {
                $ledger = $this->ledgerRepository->getLedgerByLedgerId($ledgerId);
                $paymentMode = $ledger->title ?? '';
            }

            // if fee is integrated with account then merge fee payment report
            if ($isFeeIntegratedWithAccount) {
                // fee payments
                $feePayments = $this->feePaymentMethodRepository->getFeePaymentsForAccountReceiptReport('', $paymentMode, $startDate, $endDate);

                $this->addFeePaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $feePayments);
            }

            // if registration fee is integrated with account then merge registration fee report
            if ($isRegistrationIntegratedWithAccount) {
                // registration fee payments
                $registrationFees = $this->feePaymentMethodRepository->getRegistrationFeesForReceiptReport('', $paymentMode, $startDate, $endDate);

                $this->addRegistrationFeePaymentDataToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $registrationFees);
            }
        }

        // sort by date
        $headWisePaymentReport = collect($headWisePaymentReport)
            ->sortBy(['payment_date'])
            ->values()
            ->toArray();

        return Inertia::render('Inventory/DateWisePaymentReceipt', [
            'paymentTypes' => $paymentTypes,
            'ledgers' => $ledgers,
            'headWisePaymentReport' => $headWisePaymentReport,
            'ledgerTitles' => $ledgerTitles,
            'headWiseSummary' => $headWiseSummary
        ]);
    }

    public function dateWisePaymentReceipt_old(Request $request): Response
    {
        // payment types
        $paymentTypes = [
            [
                'id' => 'Payment',
                'title' => 'Payment'
            ],
            [
                'id' => 'Receipt',
                'title' => 'Receipt'
            ]
        ];

        //ledgers
        $ledgers = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand']);

        $headWisePaymentReport = [];
        $headWiseSummary = [];
        $ledgerTitles = [];
        $paymentType = 'Payment';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');
        $ledgerId = null;

        if ($request->isMethod('POST')) {
            $paymentType = $request->payment_type ?? '';
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $ledgerId = $request->ledger_id ?? null;
        }

        // format data
        if ($paymentType == 'Payment') {
            $ledgerPaymentItems = $this->paymentRepository->getFilteredLedgerPaymentItems($startDate, $endDate, $ledgerId);

            if (count($ledgerPaymentItems) > 0) {
                // sort by payment date
                $ledgerPaymentItems = $ledgerPaymentItems->sortBy(function ($ledgerPaymentItem) {
                    return optional($ledgerPaymentItem->ledgerPayment)->payment_date_at;
                });

                foreach ($ledgerPaymentItems as $ledgerPaymentItem) {
                    $paymentDate = !empty($ledgerPaymentItem->ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPaymentItem->ledgerPayment->payment_date_at)->format('d-m-Y') : '';
                    $ledgerTitle = $ledgerPaymentItem?->ledger?->title ?? '';

                    if (!in_array($ledgerTitle, $ledgerTitles)) {
                        array_push($ledgerTitles, $ledgerTitle);
                    }

                    if (!isset($headWisePaymentReport[$paymentDate])) {
                        $headWisePaymentReport[$paymentDate] = [
                            'payment_date' => $paymentDate,
                            'head_wise_data' => [],
                            'total' => 0
                        ];
                    }

                    $headWisePaymentReport[$paymentDate]['head_wise_data'][$ledgerTitle] = ($headWisePaymentReport[$paymentDate]['head_wise_data'][$ledgerTitle] ?? 0) + ($ledgerPaymentItem->amount ?? 0);
                    $headWisePaymentReport[$paymentDate]['total'] = ($headWisePaymentReport[$paymentDate]['total'] ?? 0) + ($ledgerPaymentItem->amount ?? 0);
                    $headWiseSummary[$ledgerTitle] = ($headWiseSummary[$ledgerTitle] ?? 0) + ($ledgerPaymentItem->amount ?? 0);
                    $headWiseSummary['total'] = ($headWiseSummary['total'] ?? 0) + ($ledgerPaymentItem->amount ?? 0);
                }
            }
        } else if ($paymentType == 'Receipt') {
            $ledgerReceiptItems = $this->receiptRepository->getFilteredLedgerReceiptItems($startDate, $endDate, $ledgerId);

            if (count($ledgerReceiptItems) > 0) {
                // sort by payment date
                $ledgerReceiptItems = $ledgerReceiptItems->sortBy(function ($ledgerReceiptItem) {
                    return optional($ledgerReceiptItem->ledgerReceipt)->receipt_date_at;
                });

                foreach ($ledgerReceiptItems as $ledgerReceiptItem) {
                    $receiptDate = !empty($ledgerReceiptItem->ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceiptItem->ledgerReceipt->receipt_date_at)->format('d-m-Y') : '';
                    $ledgerTitle = $ledgerReceiptItem?->ledger?->title ?? '';

                    if (!in_array($ledgerTitle, $ledgerTitles)) {
                        array_push($ledgerTitles, $ledgerTitle);
                    }

                    if (!isset($headWisePaymentReport[$receiptDate])) {
                        $headWisePaymentReport[$receiptDate] = [
                            'payment_date' => $receiptDate,
                            'head_wise_data' => [],
                            'total' => 0
                        ];
                    }

                    $headWisePaymentReport[$receiptDate]['head_wise_data'][$ledgerTitle] = ($headWisePaymentReport[$receiptDate]['head_wise_data'][$ledgerTitle] ?? 0) + ($ledgerReceiptItem->amount ?? 0);
                    $headWisePaymentReport[$receiptDate]['total'] = ($headWisePaymentReport[$receiptDate]['total'] ?? 0) + ($ledgerReceiptItem->amount ?? 0);
                    $headWiseSummary[$ledgerTitle] = ($headWiseSummary[$ledgerTitle] ?? 0) + ($ledgerReceiptItem->amount ?? 0);
                    $headWiseSummary['total'] = ($headWiseSummary['total'] ?? 0) + ($ledgerReceiptItem->amount ?? 0);
                }
            }
        }

        $headWisePaymentReport = !empty($headWisePaymentReport) ? array_values($headWisePaymentReport) : [];

        return Inertia::render('Inventory/DateWisePaymentReceipt', [
            'paymentTypes' => $paymentTypes,
            'ledgers' => $ledgers,
            'headWisePaymentReport' => $headWisePaymentReport,
            'ledgerTitles' => $ledgerTitles,
            'headWiseSummary' => $headWiseSummary
        ]);
    }

    /**
     * Helper function to add ledger payments to the report and summary
     *
     */
    protected function addLedgerPaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $ledgerPaymentItems)
    {
        if (count($ledgerPaymentItems) > 0) {
            foreach ($ledgerPaymentItems as $ledgerPaymentItem) {
                $paymentDate = !empty($ledgerPaymentItem->ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPaymentItem->ledgerPayment->payment_date_at)->format('d-m-Y') : '';
                $ledgerTitle = $ledgerPaymentItem?->ledger?->title ?? '';
                $key = 'ledger_' . $ledgerPaymentItem?->ledger_id;
                $amount = $ledgerPaymentItem->amount ?? 0;

                $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
            }
        }
    }

    /**
     * Helper function to add staff salary payments to the report and summary
     *
     */
    protected function addStaffSalaryPaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $staffSalaryPayments)
    {
        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $paymentDate = !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-m-Y') : '';

                // earnings
                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $ledgerTitle = $earning?->earningType?->title ?? '';
                        $key = 'earning_type_' . $earning?->earning_type_id;
                        $amount = $earning->amount ?? 0;

                        $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
                    }
                }

                // deductions
                if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentDeductions as $deduction) {
                        $ledgerTitle = $deduction?->deductionType?->title ?? '';
                        $key = 'deduction_type_' . $deduction?->deduction_type_id;
                        $amount = $deduction->amount ?? 0;

                        $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
                    }
                }
            }
        }
    }

    /**
     * Helper function to add staff advance payments to the report and summary
     *
     */
    protected function addStaffAdvancePaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $staffAdvancePayments)
    {
        if (count($staffAdvancePayments) > 0) {
            foreach ($staffAdvancePayments as $staffAdvancePayment) {
                // earning type
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                $paymentDate = !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '';
                $ledgerTitle = $earningType?->title ?? '';
                $key = 'earning_type_' . $earningType?->id;
                $amount = $staffAdvancePayment->paid_amount ?? 0;

                $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
            }
        }
    }

    /**
     * Helper function to add fee refund payments to the report and summary
     *
     */
    protected function addFeeRefundPaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $feePaymentRefunds)
    {
        if (count($feePaymentRefunds) > 0) {
            foreach ($feePaymentRefunds as $feePaymentRefund) {
                $paymentDate = !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->format('d-M-Y') : '';

                if ($feePaymentRefund?->refund_amounts?->count() > 0) {
                    foreach ($feePaymentRefund?->refund_amounts as $refund) {
                        $ledgerTitle = $refund?->feeType?->fee_type ?? '';
                        $key = 'fee_type_' . $refund?->fee_type_id;
                        $amount = $refund->refund_amount ?? 0;

                        $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
                    }
                }
            }
        }
    }

    /**
     * Helper function to add ledger receipt to the report and summary
     *
     */
    protected function addLedgerReceiptDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $ledgerReceiptItems)
    {
        if (count($ledgerReceiptItems) > 0) {
            foreach ($ledgerReceiptItems as $ledgerReceiptItem) {
                $paymentDate = !empty($ledgerReceiptItem->ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceiptItem->ledgerReceipt->receipt_date_at)->format('d-m-Y') : '';
                $ledgerTitle = $ledgerReceiptItem?->ledger?->title ?? '';
                $key = 'ledger_' . $ledgerReceiptItem?->ledger_id;
                $amount = $ledgerReceiptItem->amount ?? 0;

                $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
            }
        }
    }

    /**
     * Helper function to add sale ledger payment payments to the report and summary
     *
     */
    protected function addSaleLedgerPaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $saleLedgerPayments)
    {
        if (count($saleLedgerPayments) > 0) {
            foreach ($saleLedgerPayments as $saleLedgerPayment) {
                $paymentDate = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->format('d-M-Y') : '';
                $amount = $saleLedgerPayment?->paid_amount ?? 0;
                $key = '';
                $ledgerTitle = '';

                if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student') {
                    if ($saleLedgerPayment?->saleLedger?->student?->ledger != null) {
                        $ledgerTitle = $saleLedgerPayment?->saleLedger?->student?->ledger?->title;
                        $key = 'ledger_' . $saleLedgerPayment?->saleLedger?->student?->ledger?->id;
                    } else {
                        $ledgerTitle = ($saleLedgerPayment?->saleLedger?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->last_name ?? '');
                        $key = 'student_' . $saleLedgerPayment?->saleLedger?->student_id;
                    }
                } else if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher') {
                    if ($saleLedgerPayment?->saleLedger?->staff?->ledger != null) {
                        $ledgerTitle = $saleLedgerPayment?->saleLedger?->staff?->ledger?->title;
                        $key = 'ledger_' . $saleLedgerPayment?->saleLedger?->staff?->ledger?->id;
                    } else {
                        $ledgerTitle = ($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '');
                        $key = 'staff_' . $saleLedgerPayment?->saleLedger?->staff_id;
                    }
                }

                $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
            }
        }
    }

    /**
     * Helper function to add fee payment payments to the report and summary
     *
     */
    protected function addFeePaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $feePayments)
    {
        if (count($feePayments) > 0) {
            foreach ($feePayments as $feePayment) {
                $paymentDate = !empty($feePayment->payment_date) ? Carbon::parse($feePayment->payment_date)->format('d-M-Y') : '';

                if ($feePayment?->fee_payments?->count() > 0) {
                    foreach ($feePayment->fee_payments as $paymentItem) {
                        $ledgerTitle = $paymentItem?->feeType?->fee_type ?? '';
                        $key = 'fee_type_' . $paymentItem->fee_type_id;
                        $amount = $paymentItem->paid_amount ?? 0;

                        $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
                    }
                }
            }
        }
    }

    /**
     * Helper function to add registration fee payment payments to the report and summary
     *
     */
    protected function addRegistrationFeePaymentDataToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $registrationFees)
    {
        if (count($registrationFees) > 0) {
            foreach ($registrationFees as $registrationFee) {
                $paymentDate = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->format('d-M-Y') : '';
                $key = 'registration_fee';
                $ledgerTitle = 'Registration Fee';
                $amount = $registrationFee->fee_amount ?? 0;

                $this->addAmountToReportAndSummary($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount);
            }
        }
    }

    /**
     * Helper function to add amounts to the report and summary
     *
     */
    protected function addAmountToReportAndSummary(&$headWisePaymentReport, &$headWiseSummary, &$ledgerTitles, $key, $ledgerTitle, $paymentDate, $amount)
    {
        if (!isset($ledgerTitles[$key])) {
            $ledgerTitles[$key] = $ledgerTitle;
        }

        if (!isset($headWisePaymentReport[$paymentDate])) {
            $headWisePaymentReport[$paymentDate] = [
                'payment_date' => $paymentDate,
                'head_wise_data' => [],
                'total' => 0
            ];
        }

        $headWisePaymentReport[$paymentDate]['head_wise_data'][$key] = ($headWisePaymentReport[$paymentDate]['head_wise_data'][$key] ?? 0) + $amount;
        $headWisePaymentReport[$paymentDate]['total'] += $amount;

        $headWiseSummary[$key] = ($headWiseSummary[$key] ?? 0) + $amount;
        $headWiseSummary['total'] = ($headWiseSummary['total'] ?? 0) + $amount;
    }

    /**
     * SaleDuePayment
     */
    public function dayBookReport(Request $request): Response
    {
        $dayBookReport = [];
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // account settngs
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        // ledger payments
        $ledgerPaymentReport = $this->getLedgerPaymentReportData($startDate, $endDate);

        if (!empty($ledgerPaymentReport)) {
            $dayBookReport = array_merge($dayBookReport, $ledgerPaymentReport);
        }

        //purchases
        $purchaseReport = $this->getPurchaseReportData($startDate, $endDate);

        if (!empty($purchaseReport)) {
            $dayBookReport = array_merge($dayBookReport, $purchaseReport);
        }

        //sale returns
        $saleReturnReport = $this->getSaleReturnReportData($startDate, $endDate);

        if (!empty($saleReturnReport)) {
            $dayBookReport = array_merge($dayBookReport, $saleReturnReport);
        }

        // ledger sales
        $ledgerSaleReport = $this->getLedgerSaleReportData($startDate, $endDate);

        if (!empty($ledgerSaleReport)) {
            $dayBookReport = array_merge($dayBookReport, $ledgerSaleReport);
        }

        // sale ledger payment
        $saleLedgerPaymentReport = $this->getSaleLedgerPaymentReportData($startDate, $endDate);

        if (!empty($saleLedgerPaymentReport)) {
            $dayBookReport = array_merge($dayBookReport, $saleLedgerPaymentReport);
        }

        // ledger receipts
        $ledgerReceiptReport = $this->getLedgerReceiptReportData($startDate, $endDate);

        if (!empty($ledgerReceiptReport)) {
            $dayBookReport = array_merge($dayBookReport, $ledgerReceiptReport);
        }

        // if fee is integrated with account then merge fee payment report
        if ($isFeeIntegratedWithAccount) {
            // fee payment
            $feePaymentReport = $this->getFeePaymentReportData($startDate, $endDate);

            if (!empty($feePaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $feePaymentReport);
            }

            // fee refund
            $feeRefundReport = $this->getFeePaymentRefundReportData($startDate, $endDate);

            if (!empty($feeRefundReport)) {
                $dayBookReport = array_merge($dayBookReport, $feeRefundReport);
            }
        }

        // if salary is integrated with account then merge salary payment report
        if ($isSalaryIntegratedWithAccount) {
            // staff salary payment
            $staffSalaryPaymentReport = $this->getStaffSalaryPaymentReportData($startDate, $endDate);

            if (!empty($staffSalaryPaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $staffSalaryPaymentReport);
            }

            // staff advance payment
            $staffAdvancePaymentReport = $this->getStaffAdvancePaymentReportData($startDate, $endDate);

            if (!empty($staffAdvancePaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $staffAdvancePaymentReport);
            }
        }

        // if registration fee is integrated with account then merge registration fee report
        if ($isRegistrationIntegratedWithAccount) {
            // registration fee payment
            $registrationFeeReport = $this->getRegistrationFeePaymentReportData($startDate, $endDate);

            if (!empty($registrationFeeReport)) {
                $dayBookReport = array_merge($dayBookReport, $registrationFeeReport);
            }
        }

        if (count($dayBookReport) > 0) {
            // sort report by date
            usort($dayBookReport, function ($a, $b) {
                $dateA = $a['timestamp'] ?? null;
                $dateB = $b['timestamp'] ?? null;

                if ($dateA == $dateB) {
                    return 0;
                }

                // If $dateA is null, move it to the end
                if ($dateA == null) {
                    return 1;
                }

                // If $dateB is null, move it to the end
                if ($dateB == null) {
                    return -1;
                }

                return ($dateA < $dateB) ? -1 : 1;
            });
        }

        return Inertia::render('Inventory/DayBookReport', [
            'dayBookReport' => $dayBookReport,
        ]);
    }

    /*
    * Helper method to get ledger payment report data
    */
    private function getLedgerPaymentReportData(string $startDate = '', string $endDate = '')
    {
        $ledgerPaymentReport = [];

        $ledgerPaymentItems = $this->paymentRepository->getFilteredLedgerPaymentItems($startDate, $endDate);

        if (count($ledgerPaymentItems) > 0) {
            foreach ($ledgerPaymentItems as $ledgerPaymentItem) {
                $paymentDate = !empty($ledgerPaymentItem->ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPaymentItem->ledgerPayment->payment_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($ledgerPaymentItem->ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPaymentItem->ledgerPayment->payment_date_at)->getTimestamp() : 0;

                $ledgerPaymentReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $paymentDate,
                    'particulars' => $ledgerPaymentItem?->ledger?->title,
                    'voucher_type' => 'Payment',
                    'voucher_no' => $ledgerPaymentItem?->ledgerPayment?->receipt_no,
                    'narration' => $ledgerPaymentItem?->ledgerPayment?->description,
                    'debit' => $ledgerPaymentItem->amount ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $ledgerPaymentReport;
    }

    /*
    * Helper method to get purchase report data
    */
    private function getPurchaseReportData(string $startDate = '', string $endDate = '')
    {
        $purchaseReport = [];

        $purchases = $this->purchaseRepository->getFilteredPurchases($startDate, $endDate);

        if (count($purchases) > 0) {
            foreach ($purchases as $purchase) {
                $purchaseDate = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->getTimestamp() : 0;

                $purchaseReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $purchaseDate,
                    'particulars' => $purchase?->partyLedger?->title,
                    'voucher_type' => 'Purchase',
                    'voucher_no' => $purchase?->receipt_no,
                    'narration' => $purchase?->description,
                    'debit' => $purchase->total ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $purchaseReport;
    }

    /*
    * Helper method to get sale return report data
    */
    private function getSaleReturnReportData(string $startDate = '', string $endDate = '')
    {
        $saleReturnReport = [];

        $saleReturns = $this->saleRepository->getFilteredSaleReturns($startDate, $endDate);

        if (count($saleReturns) > 0) {
            foreach ($saleReturns as $saleReturn) {
                $returnDate = !empty($saleReturn->return_date_at) ? Carbon::parse($saleReturn->return_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($saleReturn->return_date_at) ? Carbon::parse($saleReturn->return_date_at)->getTimestamp() : 0;
                $particulars = "";

                if ($saleReturn?->return_type_for == 'Student' && $saleReturn?->student != null) {
                    $particulars = "{$saleReturn->student?->first_name} {$saleReturn->student?->middle_name} {$saleReturn->student?->last_name}";
                } else if ($saleReturn?->return_type_for == 'Teacher' && $saleReturn?->staff != null) {
                    $particulars = "{$saleReturn->staff?->first_name} {$saleReturn->staff?->middle_name} {$saleReturn->staff?->last_name}";
                }

                $saleReturnReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $returnDate,
                    'particulars' => $particulars,
                    'voucher_type' => 'Sale Return',
                    'voucher_no' => $saleReturn?->receipt_no,
                    'narration' => $saleReturn?->description,
                    'debit' => $saleReturn->total ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $saleReturnReport;
    }

    /*
    * Helper method to get ledger sale report data
    */
    private function getLedgerSaleReportData(string $startDate = '', string $endDate = '')
    {
        $ledgerSaleReport = [];

        $ledgerSales = $this->saleRepository->getFilteredLedgerSales($startDate, $endDate);

        if (count($ledgerSales) > 0) {
            foreach ($ledgerSales as $ledgerSale) {
                $saleDate = !empty($ledgerSale->sale_date_at) ? Carbon::parse($ledgerSale->sale_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($ledgerSale->sale_date_at) ? Carbon::parse($ledgerSale->sale_date_at)->getTimestamp() : 0;
                $particulars = "";

                if ($ledgerSale?->sale_type_for == 'Student' && $ledgerSale?->student != null) {
                    // $particulars = "{$ledgerSale->student?->first_name} {$ledgerSale->student?->middle_name} {$ledgerSale->student?->last_name}";
                    $particulars = $ledgerSale?->student?->ledger?->title ?? ($ledgerSale?->student?->first_name ?? '') . ' ' . ($ledgerSale?->student?->middle_name ?? '') . ' ' . ($ledgerSale?->student?->last_name ?? '');
                } else if ($ledgerSale?->sale_type_for == 'Teacher' && $ledgerSale?->staff != null) {
                    // $particulars = "{$ledgerSale->staff?->first_name} {$ledgerSale->staff?->middle_name} {$ledgerSale->staff?->last_name}";
                    $particulars = $ledgerSale?->staff?->ledger?->title ?? ($ledgerSale?->staff?->first_name ?? '') . ' ' . ($ledgerSale?->staff?->middle_name ?? '') . ' ' . ($ledgerSale?->staff?->last_name ?? '');
                }

                $ledgerSaleReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $saleDate,
                    'particulars' => $particulars,
                    'voucher_type' => 'Sale',
                    'voucher_no' => $ledgerSale?->receipt_no,
                    'narration' => $ledgerSale?->description,
                    'debit' => null,
                    'credit' => $ledgerSale->total ?? 0,
                ];
            }
        }

        return $ledgerSaleReport;
    }

    /*
    * Helper method to get sale ledger payment report data
    */
    private function getSaleLedgerPaymentReportData(string $startDate = '', string $endDate = '')
    {
        $saleLedgerPaymentReport = [];

        // sale ledger payments
        $saleLedgerPayments =  $this->saleRepository->getActiveSaleLedgerPayments('', null, $startDate, $endDate);

        if (count($saleLedgerPayments) > 0) {
            foreach ($saleLedgerPayments as $saleLedgerPayment) {
                $paymentDate = "";
                $timestamp = 0;

                if (!empty($saleLedgerPayment->payment_date)) {
                    $paymentDate = Carbon::parse($saleLedgerPayment->payment_date)->format('d-m-Y');
                    $timestamp = Carbon::parse($saleLedgerPayment->payment_date)->getTimestamp();
                }

                $particulars = '';

                if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student') {
                    $particulars = $saleLedgerPayment?->saleLedger?->student?->ledger?->title ?? ($saleLedgerPayment?->saleLedger?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->last_name ?? '');
                } else if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher') {
                    $particulars = $saleLedgerPayment?->saleLedger?->staff?->ledger?->title ?? ($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '');
                }

                $saleLedgerPaymentReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $paymentDate,
                    'particulars' => $particulars,
                    'voucher_type' => 'Receipt',
                    'voucher_no' => $saleLedgerPayment?->receipt_no,
                    'narration' => $saleLedgerPayment?->description,
                    'debit' => null,
                    'credit' => $ledgerSale->total ?? 0,
                ];
            }
        }

        return $saleLedgerPaymentReport;
    }

    /*
    * Helper method to get ledger receipt report data
    */
    private function getLedgerReceiptReportData(string $startDate = '', string $endDate = '')
    {
        $ledgerReceiptReport = [];

        $ledgerReceiptItems = $this->receiptRepository->getFilteredLedgerReceiptItems($startDate, $endDate);

        if (count($ledgerReceiptItems) > 0) {
            foreach ($ledgerReceiptItems as $ledgerReceiptItem) {
                $receiptDate = !empty($ledgerReceiptItem->ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceiptItem->ledgerReceipt->receipt_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($ledgerReceiptItem->ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceiptItem->ledgerReceipt->receipt_date_at)->getTimestamp() : 0;

                $ledgerReceiptReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $receiptDate,
                    'particulars' => $ledgerReceiptItem?->ledger?->title,
                    'voucher_type' => 'Receipt',
                    'voucher_no' => $ledgerReceiptItem?->ledgerReceipt?->receipt_no,
                    'narration' => $ledgerReceiptItem?->ledgerReceipt?->description,
                    'debit' => null,
                    'credit' => $ledgerReceiptItem->amount ?? 0,
                ];
            }
        }

        return $ledgerReceiptReport;
    }

    /*
    * Helper method to get fee payment report data
    */
    private function getFeePaymentReportData(string $startDate = '', string $endDate = '')
    {
        $feePaymentReport = [];

        $feePayments = $this->feePaymentRepository->getFilteredFeePayments($startDate, $endDate);

        if (count($feePayments) > 0) {
            $groupedFeePayments = $feePayments->groupBy('fee_payment_method_id');

            foreach ($groupedFeePayments as $payments) {
                foreach ($payments->groupBy('fee_type_id') as $groupedPayments) {
                    $credit = $groupedPayments?->sum('paid_amount') ?? 0;

                    if ($credit > 0) {
                        $feeType = $groupedPayments?->first()?->feeType;
                        $paymentMethod = $groupedPayments?->first()?->payment_method;
                        $student = $groupedPayments?->first()?->student;
                        $firstFeeInstallment = $groupedPayments?->sortBy(function ($payment) {
                            return $payment?->fee?->id;
                        })?->first()?->fee;

                        $studentName = "";

                        if ($student != null) {
                            $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                        }

                        $narration = "Fee Payment of {$studentName}, Payment for {$firstFeeInstallment?->title}";

                        if (count($groupedPayments) > 1) {
                            $lastFeeInstallment = $groupedPayments?->sortByDesc(function ($payment) {
                                return $payment?->fee?->id;
                            })?->first()?->fee;

                            $narration .= " to {$lastFeeInstallment?->title}";
                        }

                        $narration .= ", Note - {$paymentMethod?->payment_note}, SchoolReceiptNo - {$paymentMethod?->school_receipt_no}";
                        $paymentDate = !empty($paymentMethod?->payment_date) ? Carbon::parse($paymentMethod?->payment_date)->format('d-m-y') : '';
                        $timestamp = !empty($paymentMethod?->payment_date) ? Carbon::parse($paymentMethod?->payment_date)->getTimestamp() : 0;

                        $feePaymentReport[] = [
                            'timestamp' => $timestamp,
                            'date' => $paymentDate,
                            'particulars' => $feeType?->fee_type,
                            'voucher_type' => 'Receipt',
                            'voucher_no' => $paymentMethod?->receipt_no,
                            'narration' => $narration,
                            'debit' => null,
                            'credit' => $credit,
                        ];
                    }
                }
            }
        }

        return $feePaymentReport;
    }

    /*
    * Helper method to get fee payment refund report data
    */
    private function getFeePaymentRefundReportData(string $startDate = '', string $endDate = '')
    {
        $feeRefundReport = [];

        // fee payment refunds
        $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getActiveFeeRefunds('', $startDate, $endDate);

        if (count($feePaymentRefunds) > 0) {
            foreach ($feePaymentRefunds as $feePaymentRefund) {
                $refundDate = "";
                $timestamp = 0;

                if (!empty($feePaymentRefund->refund_date)) {
                    $refundDate = Carbon::parse($feePaymentRefund->refund_date)->format('d-m-Y');
                    $timestamp = Carbon::parse($feePaymentRefund->refund_date)->getTimestamp();
                }

                $studentName = trim(implode(' ', [$feePaymentRefund?->student?->first_name, $feePaymentRefund?->student?->middle_name, $feePaymentRefund?->student?->last_name]));
                $description = "Fee Refund of {$studentName}";
                $refundAmount = $feePaymentRefund?->refund_amounts?->sum('refund_amount') ?? 0;

                $feeRefundReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $refundDate,
                    'particulars' => '',
                    'voucher_type' => 'Payment',
                    'voucher_no' => $feePaymentRefund?->receipt_no,
                    'narration' => $description,
                    'debit' => $refundAmount,
                    'credit' => null,
                ];
            }
        }

        return $feeRefundReport;
    }

    /*
    * Helper method to get staff salary payment report data
    */
    private function getStaffSalaryPaymentReportData(string $startDate = '', string $endDate = '')
    {
        $staffSalaryPaymentReport = [];

        // staff salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredPublishedStaffSalaryPayments(null, $startDate, $endDate);

        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $paymentDate = "";
                $timestamp = 0;

                if (!empty($staffSalaryPayment->payment_date)) {
                    $paymentDate = Carbon::parse($staffSalaryPayment->payment_date)->format('d-m-Y');
                    $timestamp = Carbon::parse($staffSalaryPayment->payment_date)->getTimestamp();
                }

                $staffName = trim(implode(' ', [$staffSalaryPayment?->staff?->first_name, $staffSalaryPayment?->staff?->middle_name, $staffSalaryPayment?->staff?->last_name]));
                $paymentMonth = $staffSalaryPayment?->paymentMonth?->title;
                $paymentNote = $staffSalaryPayment->payment_note ?? '';
                $description = "Salary Payment of {$staffName} for the month of {$paymentMonth}, Note - {$paymentNote}";

                $staffSalaryPaymentReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $paymentDate,
                    'particulars' => $staffName,
                    'voucher_type' => 'Payment',
                    'voucher_no' => $staffSalaryPayment?->receipt_no,
                    'narration' => $description,
                    'debit' => $staffSalaryPayment->paid_amount ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $staffSalaryPaymentReport;
    }

    /*
    * Helper method to get staff advance payment report data
    */
    private function getStaffAdvancePaymentReportData(string $startDate = '', string $endDate = '')
    {
        $staffAdvancePaymentReport = [];

        // staff advance payments
        $staffAdvancePayments = $this->staffAdvancePaymentRepository->getStaffAdvancePaymentsForPaymentReport(null, $startDate, $endDate);

        if (count($staffAdvancePayments) > 0) {
            foreach ($staffAdvancePayments as $staffAdvancePayment) {
                $paymentDate = "";
                $timestamp = 0;

                if (!empty($staffAdvancePayment->payment_date)) {
                    $paymentDate = Carbon::parse($staffAdvancePayment->payment_date)->format('d-m-Y');
                    $timestamp = Carbon::parse($staffAdvancePayment->payment_date)->getTimestamp();
                }

                $staffName = trim(implode(' ', [$staffAdvancePayment?->staff?->first_name, $staffAdvancePayment?->staff?->middle_name, $staffAdvancePayment?->staff?->last_name]));
                $paymentMonth = $staffAdvancePayment?->paymentMonth?->title;
                $description = "Extra/Advance Payment of {$staffName} for the month of {$paymentMonth}";

                $staffAdvancePaymentReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $paymentDate,
                    'particulars' => $staffName,
                    'voucher_type' => 'Payment',
                    'voucher_no' => $staffAdvancePayment?->receipt_no,
                    'narration' => $description,
                    'debit' => $staffAdvancePayment->paid_amount ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $staffAdvancePaymentReport;
    }

    /*
    * Helper method to get registration fee payment report data
    */
    private function getRegistrationFeePaymentReportData(string $startDate = '', string $endDate = '')
    {
        $registrationFeeReport = [];

        // registration fees
        $registrationFees = $this->feePaymentMethodRepository->getRegistrationFeesForReceiptReport('', '', $startDate, $endDate);

        if (count($registrationFees) > 0) {
            foreach ($registrationFees as $registrationFee) {
                $paymentDate = "";
                $timestamp = 0;

                if (!empty($registrationFee->payment_date)) {
                    $paymentDate = Carbon::parse($registrationFee->payment_date)->format('d-m-Y');
                    $timestamp = Carbon::parse($registrationFee->payment_date)->getTimestamp();
                }

                $description = "Registration Payment of {$registrationFee?->enquiry?->first_name} {$registrationFee?->enquiry?->middle_name} {$registrationFee?->enquiry?->last_name}, RegNo- {$registrationFee?->enquiry?->registration_no}";

                $registrationFeeReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $paymentDate,
                    'particulars' => 'Registration Fee',
                    'voucher_type' => 'Receipt',
                    'voucher_no' => $registrationFee?->receipt_no,
                    'narration' => $description,
                    'debit' => null,
                    'credit' => $registrationFee->fee_amount ?? 0,
                ];
            }
        }

        return $registrationFeeReport;
    }

    /**
     * Group Summary Report
     */
    public function groupSummaryReport(Request $request): Response
    {
        $accountGroups = $this->accountGroupRepository->getActiveNameAndId()
            ->sortBy('title')
            ->values();

        $groupSummary = [];

        if ($request->isMethod('POST')) {
            $accountGroupId = $request->account_group_id ?? null;

            if ($accountGroupId != null) {
                $ledgers = $this->ledgerRepository->getLedgersByAccountGroupId($accountGroupId);

                if (count($ledgers) > 0) {
                    $ledgers->loadMissing([
                        'ledgerPayments' => function ($query) {
                            $query->where('is_cancelled', false);
                        },
                        'ledgerPaymentItems' => function ($query) {
                            $query->whereHas('ledgerPayment', function ($query) {
                                $query->where('is_cancelled', false);
                            });
                        },
                        'ledgerReceipts' => function ($query) {
                            $query->where('is_cancelled', false);
                        },
                        'ledgerReceiptItems' => function ($query) {
                            $query->whereHas('ledgerReceipt', function ($query) {
                                $query->where('is_cancelled', false);
                            });
                        },
                        'partyPurchases' => function ($query) {
                            $query->where('is_cancelled', false);
                        },
                        'purchases' => function ($query) {
                            $query->where('is_cancelled', false);
                        },
                        'saleLedgers' => function ($query) {
                            $query->where('is_cancelled', false);
                        },
                        'saleLedgerReturns' => function ($query) {
                            $query->where('is_cancelled', false);
                        }
                    ]);

                    $groupSummary = $ledgers->map(function ($ledger) {
                        $debit = ($ledger?->amount_type == LedgerAmountType::DEBIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPayments?->sum('total') ?? 0) + ($ledger?->ledgerReceiptItems?->sum('amount') ?? 0) + ($ledger?->saleLedgerReturns?->sum('total') ?? 0) + ($ledger?->purchases?->sum('total') ?? 0);

                        $credit = ($ledger?->amount_type == LedgerAmountType::CREDIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPaymentItems?->sum('amount') ?? 0) + ($ledger?->ledgerReceipts?->sum('total') ?? 0) + ($ledger?->saleLedgers?->sum('total') ?? 0) + ($ledger?->partyPurchases?->sum('total') ?? 0);

                        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
                        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

                        // calculate student fee
                        if ($isFeeIntegratedWithAccount) {
                            $feePayments = $this->feePaymentMethodRepository->getPaymentsByPaymentMode($ledger->title);

                            if (count($feePayments) > 0) {
                                foreach ($feePayments as $feePayment) {
                                    $debit += $feePayment?->fee_payments?->sum('paid_amount') ?? 0;
                                }
                            }
                        }

                        return [
                            'id' => $ledger?->id,
                            'title' => $ledger?->title,
                            'debit' => $debit,
                            'credit' => $credit
                        ];
                    });
                }
            }
        }

        return Inertia::render('Inventory/GroupSummaryReport', [
            'accountGroups' => $accountGroups,
            'groupSummary' => $groupSummary
        ]);
    }

    /**
     * Cancelled Payment Receipt
     */
    public function cancelledPaymentReceipt(Request $request): Response
    {
        // payment types
        $paymentTypes = [
            [
                'id' => 'Payment',
                'title' => 'Payment'
            ],
            [
                'id' => 'Receipt',
                'title' => 'Receipt'
            ]
        ];

        $paymentReport = [];
        $paymentType = 'Payment';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        // account settings
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        if ($request->isMethod('POST')) {
            $paymentType = $request->payment_type ?? '';
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        if ($paymentType == 'Payment') {
            // ledger payments
            $ledgerPaymentData = $this->getCanceledLedgerPaymentData($startDate, $endDate);

            if (!empty($ledgerPaymentData)) {
                $paymentReport = array_merge($paymentReport, $ledgerPaymentData);
            }

            // if salary is integrated with account then merge salary payment report
            if ($isSalaryIntegratedWithAccount) {
                // staff salary payments
                $staffSalaryPaymentData = $this->getCanceledStaffSalaryPaymentData($startDate, $endDate);

                if (!empty($staffSalaryPaymentData)) {
                    $paymentReport = array_merge($paymentReport, $staffSalaryPaymentData);
                }

                // staff advance payments
                $staffAdvancePaymentData = $this->getCanceledStaffAdvancePaymentData($startDate, $endDate);

                if (!empty($staffAdvancePaymentData)) {
                    $paymentReport = array_merge($paymentReport, $staffAdvancePaymentData);
                }
            }

            // if fee is integrated with account then merge fee refund report
            if ($isFeeIntegratedWithAccount) {
                // fee payment refunds
                $feePaymentRefundData = $this->getCanceledFeePaymentRefundData($startDate, $endDate);

                if (!empty($feePaymentRefundData)) {
                    $paymentReport = array_merge($paymentReport, $feePaymentRefundData);
                }
            }
        } else if ($paymentType == 'Receipt') {
            // ledger receipts
            $ledgerReceipts = $this->getCanceledLedgerReceiptData($startDate, $endDate);

            if (count($ledgerReceipts) > 0) {
                $paymentReport = array_merge($paymentReport, $ledgerReceipts);
            }

            // sale ledger due payments
            $saleLedgerPayments = $this->getCanceledSaleLedgerPaymentData($startDate, $endDate);

            if (count($saleLedgerPayments) > 0) {
                $paymentReport = array_merge($paymentReport, $saleLedgerPayments);
            }

            // fee payments
            if ($isFeeIntegratedWithAccount) {
                $feePayments = $this->getCanceledFeePaymentData($startDate, $endDate);

                if (count($feePayments) > 0) {
                    $paymentReport = array_merge($paymentReport, $feePayments);
                }
            }

            // registration fee payments
            if ($isRegistrationIntegratedWithAccount) {
                $registrationFees = $this->getCanceledRegistrationFeeData($startDate, $endDate);

                if (count($registrationFees) > 0) {
                    $paymentReport = array_merge($paymentReport, $registrationFees);
                }
            }
        }

        // if not empty then sort by date
        if (!empty($paymentReport)) {
            usort($paymentReport, function ($a, $b) {
                return ($a['timestamp'] ?? 0) < ($b['timestamp'] ?? 0);
            });
        }

        return Inertia::render('Inventory/CancelledPaymentReceipt', [
            'paymentTypes' => $paymentTypes,
            'paymentReport' => $paymentReport
        ]);
    }

    public function cancelledPaymentReceipt_old(Request $request): Response
    {
        // payment types
        $paymentTypes = [
            [
                'id' => 'Payment',
                'title' => 'Payment'
            ],
            [
                'id' => 'Receipt',
                'title' => 'Receipt'
            ]
        ];

        $paymentReport = [];
        $paymentType = 'Payment';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $paymentType = $request->payment_type ?? '';
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        if ($paymentType == 'Payment') {
            $paymentReport = $this->paymentRepository->getCancelledReport($startDate, $endDate)->map(function ($payment) {
                $paymentItems = [];

                if ($payment?->ledger_payment_items?->count() > 0) {
                    foreach ($payment->ledger_payment_items as $paymentItem) {
                        $paymentItems[] = [
                            'ledger_title' => $paymentItem?->ledger?->title,
                            'amount' => $paymentItem->amount ?? 0,
                        ];
                    }
                }

                return [
                    'id' => $payment?->id,
                    'payment_type' => 'Payment',
                    'receipt_no' => $payment?->receipt_no,
                    'ledger_title' => $payment?->bankLedger?->title,
                    'payment_date' => !empty($payment->payment_date_at) ? Carbon::parse($payment->payment_date_at)->format('d-M-Y') : "",
                    'description' => $payment?->description,
                    'amount' => $payment->total ?? 0,
                    'payment_items' => $paymentItems
                ];
            });
        } else if ($paymentType == 'Receipt') {
            $paymentReport = $this->receiptRepository->getCancelledReport($startDate, $endDate)->map(function ($receipt) {
                $receiptItems = [];

                if ($receipt?->ledger_receipt_items?->count() > 0) {
                    foreach ($receipt->ledger_receipt_items as $receiptItem) {
                        $receiptItems[] = [
                            'ledger_title' => $receiptItem?->ledger?->title,
                            'amount' => $receiptItem->amount ?? 0,
                        ];
                    }
                }

                return [
                    'id' => $receipt?->id,
                    'payment_type' => 'Receipt',
                    'receipt_no' => $receipt?->receipt_no,
                    'ledger_title' => $receipt?->bankLedger?->title,
                    'payment_date' => !empty($receipt->receipt_date_at) ? Carbon::parse($receipt->receipt_date_at)->format('d-M-Y') : "",
                    'description' => $receipt?->description,
                    'amount' => $receipt->total ?? 0,
                    'payment_items' => $receiptItems
                ];
            });
        }

        return Inertia::render('Inventory/CancelledPaymentReceipt', [
            'paymentTypes' => $paymentTypes,
            'paymentReport' => $paymentReport
        ]);
    }

    /**
     * helper method to get canceled ledger payment data
     *
     */
    protected function getCanceledLedgerPaymentData(string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // ledger payments
        $ledgerPayments = $this->paymentRepository->getCanceledLedgerPayments($startDate, $endDate);

        if (count($ledgerPayments) > 0) {
            foreach ($ledgerPayments as $ledgerPayment) {
                $paymentItems = [];

                if ($ledgerPayment?->ledger_payment_items?->count() > 0) {
                    foreach ($ledgerPayment->ledger_payment_items as $ledgerPaymentItem) {
                        $paymentItems[] = [
                            'ledger_title' => $ledgerPaymentItem?->ledger?->title,
                            'amount' => $ledgerPaymentItem->amount ?? 0
                        ];
                    }
                }

                $paymentReport[] = [
                    'id' => $ledgerPayment->id,
                    'report_type' => 'ledger_payment',
                    'payment_type' => 'Payment',
                    'receipt_no' => $ledgerPayment->receipt_no,
                    'ledger_title' => $ledgerPayment?->bankLedger?->title,
                    'description' => $ledgerPayment->description,
                    'total_amount' => $ledgerPayment->total ?? 0,
                    'payment_date' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->format('d-M-Y') : '',
                    'timestamp' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }

    /**
     * helper method to get canceled staff salary payment data
     *
     */
    protected function getCanceledStaffSalaryPaymentData(string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // staff salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredPublishedStaffSalaryPayments(null, $startDate, $endDate, true);

        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $paymentItems = [];

                // earnings
                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $paymentItems[] = [
                            'ledger_title' => $earning?->earningType?->title . '(Earning)',
                            'amount' => $earning->amount ?? 0
                        ];
                    }
                }

                // deductions
                if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentDeductions as $deduction) {
                        $paymentItems[] = [
                            'ledger_title' => $deduction?->deductionType?->title . '(Deduction)',
                            'amount' => $deduction->amount ?? 0
                        ];
                    }
                }

                $staffName = trim(implode(' ', [$staffSalaryPayment?->staff?->first_name, $staffSalaryPayment?->staff?->middle_name, $staffSalaryPayment?->staff?->last_name]));
                $paymentMonth = $staffSalaryPayment?->paymentMonth?->title;
                $paymentNote = $staffSalaryPayment->payment_note ?? '';
                $description = "Salary Payment of {$staffName} for the month of {$paymentMonth}, Note - {$paymentNote}";

                $paymentReport[] = [
                    'id' => $staffSalaryPayment->id,
                    'report_type' => 'staff_salary_payment',
                    'payment_type' => 'Payment',
                    'receipt_no' => $staffSalaryPayment->receipt_no,
                    'ledger_title' => $staffSalaryPayment?->ledger?->title,
                    'description' => $description,
                    'total_amount' => $staffSalaryPayment->paid_amount ?? 0,
                    'payment_date' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }

    /**
     * helper method to get canceled staff advance payment data
     *
     */
    protected function getCanceledStaffAdvancePaymentData(string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // staff advance payments
        $staffAdvancePayments = $this->staffAdvancePaymentRepository->getCanceledStaffAdvancePayments($startDate, $endDate);

        if (count($staffAdvancePayments) > 0) {
            foreach ($staffAdvancePayments as $staffAdvancePayment) {
                $paymentItems = [];

                // earning type
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                $paidAmount = $staffAdvancePayment->paid_amount ?? 0;

                $paymentItems[] = [
                    'ledger_title' => $earningType?->title . '(Earning)',
                    'amount' => $paidAmount
                ];

                $staffName = trim(implode(' ', [$staffAdvancePayment?->staff?->first_name, $staffAdvancePayment?->staff?->middle_name, $staffAdvancePayment?->staff?->last_name]));
                $paymentMonth = $staffAdvancePayment?->paymentMonth?->title;
                $description = "Extra/Advance Payment of {$staffName} for the month of {$paymentMonth}";

                $paymentReport[] = [
                    'id' => $staffAdvancePayment->id,
                    'report_type' => 'staff_advance_payment',
                    'payment_type' => 'Payment',
                    'receipt_no' => $staffAdvancePayment->receipt_no,
                    'ledger_title' => $staffAdvancePayment?->ledger?->title,
                    'description' => $description,
                    'total_amount' => $paidAmount,
                    'payment_date' => !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }

    /**
     * helper method to get canceled fee payment refund data
     *
     */
    protected function getCanceledFeePaymentRefundData(string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // fee payment refunds
        $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getCanceledFeeRefunds($startDate, $endDate);

        if (count($feePaymentRefunds) > 0) {
            foreach ($feePaymentRefunds as $feePaymentRefund) {
                $paymentItems = [];

                $refundAmount = $feePaymentRefund?->refund_amounts?->sum('refund_amount') ?? 0;
                $ledgerTitle = $feePaymentRefund?->refund_mode;

                $paymentItems[] = [
                    'ledger_title' => $ledgerTitle,
                    'amount' => $refundAmount
                ];

                $studentName = trim(implode(' ', [$feePaymentRefund?->student?->first_name, $feePaymentRefund?->student?->middle_name, $feePaymentRefund?->student?->last_name]));
                $description = "Fee Refund of {$studentName}";

                $paymentReport[] = [
                    'id' => $feePaymentRefund->id,
                    'report_type' => 'fee_payment_refund',
                    'payment_type' => 'Payment',
                    'receipt_no' => $feePaymentRefund->receipt_no,
                    'ledger_title' => '',
                    'description' => $description,
                    'total_amount' => $refundAmount,
                    'payment_date' => !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }

    /*
    * Helper method to get canceled ledger receipt data
    */
    protected function getCanceledLedgerReceiptData(string $startDate = '', string $endDate = '')
    {
        $ledgerReceiptReport = [];

        // ledger receipts
        $ledgerReceipts = $this->receiptRepository->getCanceledLedgerReceipts($startDate, $endDate);

        if (count($ledgerReceipts) > 0) {
            foreach ($ledgerReceipts as $ledgerReceipt) {
                $timestamp = !empty($ledgerReceipt?->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->getTimestamp() : 0;
                $receiptDate = !empty($ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->format('d-M-Y') : '';
                $description = $ledgerReceipt?->description;

                $receiptItems = [];

                if ($ledgerReceipt?->ledger_receipt_items?->count() > 0) {
                    foreach ($ledgerReceipt->ledger_receipt_items as $receiptItem) {
                        $ledgerId = $receiptItem->ledger_id;

                        if (!isset($receiptItems[$ledgerId])) {
                            $receiptItems[$ledgerId] = [
                                'ledger_title' => $receiptItem?->ledger?->title,
                                'amount' => 0
                            ];
                        }

                        $receiptItems[$ledgerId]['amount'] += $receiptItem->amount ?? 0;
                    }
                }

                $ledgerReceiptReport[] = [
                    'id' => $ledgerReceipt->id,
                    'report_type' => 'ledger_receipt',
                    'payment_type' => 'Receipt',
                    'receipt_no' => $ledgerReceipt->receipt_no,
                    'ledger_title' => $ledgerReceipt?->bankLedger?->title,
                    'description' => $description,
                    'total_amount' => $ledgerReceipt->total ?? 0,
                    'payment_date' => $receiptDate,
                    'timestamp' => $timestamp,
                    'payment_items' => array_values($receiptItems)
                ];
            }
        }

        return $ledgerReceiptReport;
    }

    /*
    * Helper method to get canceled sale ledger payment data
    */
    protected function getCanceledSaleLedgerPaymentData(string $startDate = '', string $endDate = '')
    {
        $saleLedgerPaymentReport = [];

        // sale ledger payments
        $saleLedgerPayments =  $this->saleRepository->getCanceledSaleLedgerPayments($startDate, $endDate);

        if (count($saleLedgerPayments) > 0) {
            foreach ($saleLedgerPayments as $saleLedgerPayment) {
                $timestamp = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->format('d-M-Y') : '';
                $description = $saleLedgerPayment->description;
                $receiptItems = [];
                $title = '';

                if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student') {
                    $title = $saleLedgerPayment?->saleLedger?->student?->ledger?->title ?? ($saleLedgerPayment?->saleLedger?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->last_name ?? '');
                } else if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher') {
                    $title = $saleLedgerPayment?->saleLedger?->staff?->ledger?->title ?? ($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '');
                }

                $receiptItems[] = [
                    'ledger_title' => $title,
                    'amount' => $saleLedgerPayment?->paid_amount ?? 0
                ];

                $saleLedgerPaymentReport[] = [
                    'id' => $saleLedgerPayment->id,
                    'report_type' => 'sale_ledger_payment',
                    'payment_type' => 'Receipt',
                    'receipt_no' => $saleLedgerPayment->receipt_no,
                    'ledger_title' => $saleLedgerPayment?->bankLedger?->title,
                    'description' => $description,
                    'total_amount' => $saleLedgerPayment->paid_amount ?? 0,
                    'payment_date' => $paymentDate,
                    'timestamp' => $timestamp,
                    'payment_items' => $receiptItems
                ];
            }
        }

        return $saleLedgerPaymentReport;
    }

    /*
    * Helper method to get canceled fee payment data
    */
    protected function getCanceledFeePaymentData(string $startDate = '', string $endDate = '')
    {
        $feePaymentReport = [];

        // fee payments
        $feePayments = $this->feePaymentMethodRepository->getCanceledFeePaymentsForAccountReceiptReport($startDate, $endDate);

        if (count($feePayments) > 0) {
            foreach ($feePayments as $feePayment) {
                $timestamp = !empty($feePayment?->payment_date) ? Carbon::parse($feePayment->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($feePayment->payment_date) ? Carbon::parse($feePayment->payment_date)->format('d-M-Y') : '';
                $description = '';
                $studentName = "";

                if ($feePayment?->student != null) {
                    $studentName = "{$feePayment->student?->first_name} {$feePayment->student?->middle_name} {$feePayment->student?->last_name}";
                }

                $firstFeeInstallment = $feePayment?->fee_payments?->sortBy(function ($payment) {
                    return $payment?->fee?->id;
                })?->first()?->fee;

                $description = "Fee Payment of {$studentName}, Payment for {$firstFeeInstallment?->title}";

                if ($feePayment?->fee_payments?->count() > 1) {
                    $lastFeeInstallment = $feePayment?->fee_payments?->sortByDesc(function ($payment) {
                        return $payment?->fee?->id;
                    })?->first()?->fee;

                    if ($lastFeeInstallment?->id != $firstFeeInstallment?->id) {
                        $description .= " to {$lastFeeInstallment?->title}";
                    }
                }

                $description .= ", Note - {$feePayment?->payment_note}, SchoolReceiptNo - {$feePayment?->school_receipt_no}";

                $paymentItems = [];

                if ($feePayment?->fee_payments?->count() > 0) {
                    foreach ($feePayment->fee_payments as $paymentItem) {
                        $feeTypeId = $paymentItem->fee_type_id;

                        if (!isset($paymentItems[$feeTypeId])) {
                            $paymentItems[$feeTypeId] = [
                                'ledger_title' => $paymentItem?->feeType?->fee_type,
                                'amount' => 0
                            ];
                        }

                        $paymentItems[$feeTypeId]['amount'] += $paymentItem->paid_amount ?? 0;
                    }
                }

                $feePaymentReport[] = [
                    'id' => $feePayment->id,
                    'report_type' => 'fee_payment',
                    'payment_type' => 'Receipt',
                    'receipt_no' => $feePayment->receipt_no,
                    'ledger_title' => $feePayment->payment_mode,
                    'description' => $description,
                    'total_amount' => $feePayment?->fee_payments?->sum('paid_amount') ?? 0,
                    'payment_date' => $paymentDate,
                    'timestamp' => $timestamp,
                    'payment_items' => array_values($paymentItems)
                ];
            }
        }

        return $feePaymentReport;
    }

    /*
    * Helper method to get canceled registration fee data
    */
    protected function getCanceledRegistrationFeeData(string $startDate = '', string $endDate = '')
    {
        $registrationFeeReport = [];

        // registration fees
        $registrationFees = $this->feePaymentMethodRepository->getCanceledRegistrationFeesForReceiptReport($startDate, $endDate);

        if (count($registrationFees) > 0) {
            foreach ($registrationFees as $registrationFee) {
                $receiptItems = [];
                $timestamp = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->format('d-M-Y') : '';
                $description = "Registration Payment of {$registrationFee?->enquiry?->first_name} {$registrationFee?->enquiry?->middle_name} {$registrationFee?->enquiry?->last_name}, RegNo- {$registrationFee?->enquiry?->registration_no}";

                $receiptItems[] = [
                    'ledger_title' => 'Registration Fee',
                    'amount' => $registrationFee->fee_amount ?? 0
                ];

                $registrationFeeReport[] = [
                    'id' => $registrationFee->id,
                    'report_type' => 'registration_fee_payment',
                    'payment_type' => 'Receipt',
                    'receipt_no' => $registrationFee->receipt_no,
                    'ledger_title' => $registrationFee?->payment_mode,
                    'description' => $description,
                    'total_amount' => $registrationFee->fee_amount ?? 0,
                    'payment_date' => $paymentDate,
                    'timestamp' => $timestamp,
                    'payment_items' => $receiptItems
                ];
            }
        }

        return $registrationFeeReport;
    }

    /**
     * Trial Balance Report
     */
    public function trialBalanceReport(Request $request): Response
    {
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // ledger amount setting
        $ledgerAmountSetting = getSiteSettingData('account_is_ledger_amount_based');
        $isLedgerAmountSessionWise = $ledgerAmountSetting?->value != null && strtolower($ledgerAmountSetting->value) == 'yes';

        $accountGroups = $this->accountGroupRepository->getTrialBalanceReport($startDate, $endDate, $isLedgerAmountSessionWise);

        $accountGroupSummary = [];

        if (count($accountGroups) > 0) {
            // account settings
            $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
            $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
            $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
            $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
            $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
            $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

            foreach ($accountGroups as $accountGroup) {
                $totalDebit = 0;
                $totalCredit = 0;
                $ledgers = [];

                if (count($accountGroup?->ledgers) > 0) {
                    foreach ($accountGroup->ledgers as $ledger) {
                        $debit = ($ledger?->amount_type == LedgerAmountType::DEBIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPayments?->sum('total') ?? 0) + ($ledger?->ledgerReceiptItems?->sum('amount') ?? 0) + ($ledger?->saleLedgerReturns?->sum('total') ?? 0) + ($ledger?->purchases?->sum('total') ?? 0);

                        $credit = ($ledger?->amount_type == LedgerAmountType::CREDIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPaymentItems?->sum('amount') ?? 0) + ($ledger?->ledgerReceipts?->sum('total') ?? 0) + ($ledger?->saleLedgers?->sum('total') ?? 0) + ($ledger?->partyPurchases?->sum('total') ?? 0);

                        // calculate student fee
                        if ($isFeeIntegratedWithAccount) {
                            $feePayments = $this->feePaymentMethodRepository->getPaymentsByPaymentModeAndPaymentDate($ledger->title, $startDate, $endDate, $isLedgerAmountSessionWise);

                            if (count($feePayments) > 0) {
                                foreach ($feePayments as $feePayment) {
                                    $debit += $feePayment?->fee_payments?->sum('paid_amount') ?? 0;
                                }
                            }
                        }

                        if (($debit > 0 || $credit > 0)) {
                            $totalDebit += $debit;
                            $totalCredit += $credit;

                            $ledgers[] = [
                                'id' => $ledger?->id,
                                'account_group_id' => $ledger?->account_group_id,
                                'title' => $ledger?->title,
                                'debit' => $debit,
                                'credit' => $credit
                            ];
                        }
                    }
                }

                if (($totalDebit > 0 || $totalCredit > 0)) {
                    $accountGroupSummary[] = [
                        'id' => $accountGroup->id,
                        'title' => $accountGroup->title,
                        'ledgers' => $ledgers,
                        'debit' => $totalDebit,
                        'credit' => $totalCredit
                    ];
                }
            }
        }

        return Inertia::render('Inventory/TrialBalanceReport', [
            'accountGroupSummary' => $accountGroupSummary,
        ]);
    }

    /**
     * CashBookReport
     */
    public function cashBookReport(Request $request): Response
    {
        $paymentDate = date('Y-m-d');

        $cashBookReport = [];
        $cashBookSummary = [];

        if ($request->isMethod('POST')) {
            $paymentDate = !empty($request['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        if (!empty($paymentDate)) {
            // ledger amount setting
            $ledgerAmountSetting = getSiteSettingData('account_is_ledger_amount_based');
            $isLedgerAmountSessionWise = $ledgerAmountSetting?->value != null && strtolower($ledgerAmountSetting->value) == 'yes';

            // previous day cash book
            $previousDayReport = $this->ledgerRepository->getPreviousDayCashBookReportData($paymentDate, $isLedgerAmountSessionWise);

            $openeingBalance = 0;

            if (count($previousDayReport) > 0) {
                $debit = 0;
                $credit = 0;

                foreach ($previousDayReport as $ledger) {
                    $debit += ($ledger?->amount_type == LedgerAmountType::DEBIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPayments?->sum('total') ?? 0) + ($ledger?->ledgerReceiptItems?->sum('amount') ?? 0) + ($ledger?->saleLedgerReturns?->sum('total') ?? 0) + ($ledger?->purchases?->sum('total') ?? 0);

                    $credit += ($ledger?->amount_type == LedgerAmountType::CREDIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPaymentItems?->sum('amount') ?? 0) + ($ledger?->ledgerReceipts?->sum('total') ?? 0) + ($ledger?->saleLedgers?->sum('total') ?? 0) + ($ledger?->partyPurchases?->sum('total') ?? 0);

                    $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
                    $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

                    // calculate student fee
                    if ($isFeeIntegratedWithAccount) {
                        $feePayments = $this->feePaymentMethodRepository->getPreviousDayCashBookReportData($ledger->title, $paymentDate, $isLedgerAmountSessionWise);

                        if (count($feePayments) > 0) {
                            foreach ($feePayments as $feePayment) {
                                $debit += $feePayment?->fee_payments?->sum('paid_amount') ?? 0;
                            }
                        }
                    }

                    $openeingBalance = $credit - $debit;
                }
            }

            // current day cash book
            $ledgers = $this->ledgerRepository->getCashBookReportData($paymentDate, $isLedgerAmountSessionWise);

            $totalDebit = 0;
            $totalCredit = 0;

            if (count($ledgers) > 0) {
                foreach ($ledgers as $ledger) {
                    $debit = ($ledger?->amount_type == LedgerAmountType::DEBIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPayments?->sum('total') ?? 0) + ($ledger?->ledgerReceiptItems?->sum('amount') ?? 0) + ($ledger?->saleLedgerReturns?->sum('total') ?? 0) + ($ledger?->purchases?->sum('total') ?? 0);

                    $credit = ($ledger?->amount_type == LedgerAmountType::CREDIT->value ? $ledger->opening_balance ?? 0 : 0) + ($ledger?->ledgerPaymentItems?->sum('amount') ?? 0) + ($ledger?->ledgerReceipts?->sum('total') ?? 0) + ($ledger?->saleLedgers?->sum('total') ?? 0) + ($ledger?->partyPurchases?->sum('total') ?? 0);

                    $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
                    $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

                    // calculate student fee
                    if ($isFeeIntegratedWithAccount) {
                        $feePayments = $this->feePaymentMethodRepository->getCashBookReportData($ledger->title, $paymentDate, $isLedgerAmountSessionWise);

                        if (count($feePayments) > 0) {
                            foreach ($feePayments as $feePayment) {
                                $debit += $feePayment?->fee_payments?->sum('paid_amount') ?? 0;
                            }
                        }
                    }

                    $totalDebit += $debit;
                    $totalCredit += $credit;

                    $cashBookSummary[] = [
                        'title' => $ledger?->title,
                        'debit' => $debit,
                        'credit' => $credit
                    ];
                }
            }

            $cashBookReport = [
                'opening_balance' => $openeingBalance,
                'debit' => $totalDebit,
                'credit' => $totalCredit,
                'balance' => $openeingBalance - ($totalCredit - $totalDebit)
            ];
        }

        return Inertia::render('Inventory/CashBookReport', [
            'cashBookReport' => $cashBookReport,
            'cashBookSummary' => $cashBookSummary,
        ]);
    }

    /**
     * SaleSummaryReport
     */
    public function saleSummaryReport(): Response
    {
        $saleSummaryReport = [];

        $sales = $this->saleRepository->getActiveAllForSaleSummary();

        if (count($sales) > 0) {
            foreach ($sales as $sale) {
                $month = "";
                $date = "";
                $ledgerWiseKey = "";
                $ledgerTitle = "";

                if ($sale?->sale_type_for == 'Student') {
                    $ledgerWiseKey = "Student-{$sale->student_id}";
                    $ledgerTitle = "{$sale?->student?->first_name} {$sale?->student?->middle_name} {$sale?->student?->last_name}";
                } else if ($sale?->sale_type_for == 'Teacher') {
                    $ledgerWiseKey = "Teacher-{$sale->staff_id}";
                    $ledgerTitle = "{$sale?->staff?->first_name} {$sale?->staff?->middle_name} {$sale?->staff?->last_name}";
                }

                if (!empty($sale->sale_date_at)) {
                    $month = Carbon::parse($sale->sale_date_at)->format('F-Y');
                    $date = Carbon::parse($sale->sale_date_at)->format('d-M-Y');
                }

                // sale summary
                if (!isset($saleSummaryReport[$month])) {
                    $saleSummaryReport[$month] = [
                        'month' => $month,
                        'amount' => 0
                    ];
                }

                $saleSummaryReport[$month]['amount'] = ($saleSummaryReport[$month]['amount'] ?? 0) + ($sale->total ?? 0);

                // date wise report
                if (!isset($saleSummaryReport[$month]['date_wise_report'][$date])) {
                    $saleSummaryReport[$month]['date_wise_report'][$date] = [
                        'date' => $date,
                        'amount' => 0
                    ];
                }

                $saleSummaryReport[$month]['date_wise_report'][$date]['amount'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['amount'] ?? 0) + ($sale->total ?? 0);

                // ledger wise report
                if (!isset($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey])) {
                    $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey] = [
                        'ledger_title' => $ledgerTitle,
                        'amount' => 0
                    ];
                }

                $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['amount'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['amount'] ?? 0) + ($sale->total ?? 0);

                // item report
                if ($sale?->saleLedgerProducts?->count() > 0) {
                    foreach ($sale->saleLedgerProducts as $saleLedgerProduct) {
                        $productId = $saleLedgerProduct?->product_id;

                        if (!isset($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId])) {
                            $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId] = [
                                'product_title' => $saleLedgerProduct?->product?->title,
                                'quantity' => 0,
                                'rate' => 0,
                                'amount' => 0,
                                'tax_amount' => 0,
                                'discount_amount' => 0
                            ];
                        }

                        $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['quantity'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['quantity'] ?? 0) + ($saleLedgerProduct->quantity ?? 0);
                        $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['rate'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['rate'] ?? 0) + ($saleLedgerProduct->rate ?? 0);
                        $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['amount'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['amount'] ?? 0) + ($saleLedgerProduct->total_amount ?? 0);
                        $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['tax_amount'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['tax_amount'] ?? 0) + ($saleLedgerProduct->tax_amount ?? 0);
                        $saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['discount_amount'] = ($saleSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerWiseKey]['item_report'][$productId]['discount_amount'] ?? 0) + ($saleLedgerProduct->discount_amount ?? 0);
                    }
                }
            }
        }

        $saleSummaryReport = !empty($saleSummaryReport) ? array_values($saleSummaryReport) : [];

        return Inertia::render('Inventory/SaleSummaryReport', [
            'saleSummaryReport' => $saleSummaryReport,
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
}
