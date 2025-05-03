<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Fee;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\Semester;
use App\Models\Student;
use App\Models\ClassName;
use App\Enums\PaymentMode;
use App\Models\FeePayment;
use App\Enums\LateFineType;
use App\Enums\ContextStatus;
use App\Enums\PaymentStatus;
use App\Enums\StructureType;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Enums\SmsTemplateTag;
use App\Enums\FeeInstallmentType;
use App\Http\Requests\FeeRequest;
use App\Models\ClassFeeStructure;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Models\ClassroomFeeStudent;
use App\Enums\WalletTransactionType;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use App\Enums\EmploymentCategoryType;
use App\Http\Requests\FeeTypeRequest;
use App\Models\ClassFeeStudentAmount;
use App\Repositories\IBankRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\FeeAssignRequest;
use App\Models\ClassFeeStructureAmount;
use App\Repositories\FeeTypeRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\SectionRepository;
use App\Repositories\StudentRepository;
use App\Http\Requests\FeePaymentRequest;
use App\Http\Requests\FeeSettingRequest;
use App\Repositories\CategoryRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\ISectionRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IVoucherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StudentNoteRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IDiscountRepository;
use App\Repositories\IGuardianRepository;
use Illuminate\Support\Facades\Validator;
use App\Models\ClassFeeStructureClassName;
use App\Repositories\IAssignFeeRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Http\Requests\GuardianPhoneRequest;
use App\Repositories\IFeePaymentRepository;
use App\Http\Requests\BulkFeePaymentRequest;
use App\Http\Requests\FeeSpecialTypeRequest;
use App\Http\Requests\TransferDueFeeRequest;
use App\Repositories\IBankAccountRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IStudentNoteRepository;
use App\Repositories\IAcademicYearRepository;
use App\Repositories\IFeeStructureRepository;
use App\Http\Requests\CancelFeePaymentRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ClassFeeStructureRequest;
use App\Http\Requests\UpdateFeeToStudentRequest;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Http\Requests\RemoveSpecialFeeTypeRequest;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassroomFeeStudentRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Http\Requests\UpdateStudentFeeStructureRequest;
use App\Repositories\IFeePaymentRefundMethodRepository;
use App\Repositories\IStudentFeeVoucherAmountRepository;
use App\Repositories\IBackDateStaffRepository;
use App\Http\Requests\AssignFeeStructureToStudentRequest;

class FeeController extends Controller
{

    public function __construct(
        private ICategoryRepository $categoryRepository,
        private ISectionRepository $sectionRepository,
        private IClassroomRepository $classroomRepository,
        private IFeeRepository $feeRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private IAssignFeeRepository $assignFeeRepository,
        private IStudentRepository $studentRepository,
        private IClassroomFeeStudentRepository $classroomFeeStudentRepository,
        private IGuardianRepository $guardianRepository,
        private IStudentNoteRepository $studentNoteRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IBankAccountRepository $bankAccountRepository,
        private IBankRepository $bankRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IAcademicYearRepository $academicYearRepository,
        private IDiscountRepository $discountRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private IStudentFeeVoucherAmountRepository $studentFeeVoucherAmountRepository,
        private IFeePaymentRefundRepository $feePaymentRefundRepository,
        private ITransportRepository $transportRepository,
        private IVoucherRepository $voucherRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
        private ILedgerRepository $ledgerRepository,
        private IStaffRepository $staffRepository,
        private IBackDateStaffRepository $backDateStaffRepository,
    ) {
        $this->middleware('permission:view fees', ['only' => [
            'index',
            'misReport',
            'installment',
            'getFeeDiscountsByStudent',
            'installmentOneByOne',
            'type',
            'specialType',
            'getClassFeeStructureById',
            'getStudentsWithFeeStructure',
            'feeSetting',
            'getStudentsWithFeesByClassroom',
            'getInstallmentsByStudentId',
            'getInstallmentsByStudent',
            'getBankAcocuntsByStudentId',
            'installmentPayment',
            'getFeeInstallmentsByStudentId',
            'getFeeVouchersByStudentId',
            'getTransportVouchersByStudentId',
            'getStudentFeePaymentReports',
            'voucher',
            'getFeeInstallmentsByStudentIdsAndFeeId'
        ]]);
        $this->middleware('permission:add fees', ['only' => [
            'create',
            'save',
            'saveInstallment',
            'saveType',
            'saveSpecialType',
            'assignSpecialType',
            'saveAssignSpecialType',
            'createClassFeeStructure',
            'saveClassFeeStructure',
            'assignFeeToStudent',
            'saveAssignFeeToStudent',
            'saveUpdateFeeToStudent',
            'transferDueFee',
            'saveTransferDueFee',
            'saveFeeSetting',
            'saveAssignStudentFeeStructure',
            'cancelFeePayment',
            'saveStudentContext',
            'saveFeePayment',
            'saveInstallmentPayment',
            'saveVoucher',
            'bulkFeePayment',
            'saveBulkFeePayment'
        ]]);
        $this->middleware('permission:edit fees', ['only' => [
            'editInstallment',
            'updateInstallment',
            'editType',
            'updateType',
            'editSpecialType',
            'updateSpecialType',
            'editClassFeeStructure',
            'updateCreateClassFeeStructure',
            'updateClassFeeStructure',
            'updateStudentFeeStructure',
            'updateFeeToStudent',
            'updateFeesDisplayOrder',
            'createOrUpdateDueFee',
            'updateGuardianPhone'
        ]]);
        $this->middleware('permission:delete fees', ['only' => [
            'destroy',
            'deleteInstallment',
            'deleteType',
            'deleteSpecialType',
            'removeSpecialType',
            'deleteStudentSpecialFeeType',
            'deleteClassFeeStructure',
            'deleteStudentFeeStructure'
        ]]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveAll();

        return Inertia::render('Fee/Show', [
            'fees' => $fees,
        ]);
    }


    /**
     * Display fee collection reports.
     */
    public function misReport(): Response
    {
        $currentMonth = getCurrentMonth();
        $currentAcademicYear = getAcademicYear();
        $currentDayTotalCollection = $this->feePaymentRepository->getCurrentDayTotalCollection();
        $currentMonthTotalCollection = $this->feePaymentRepository->getCurrentMonthTotalCollection();
        $currentAcademicYearTotalCollection = $this->feePaymentRepository->getCurrentAcademicYearTotalCollection();
        $totalDiscountAmount = $this->feePaymentRepository->getTotalDiscountAmount();
        $monthWiseFeeCollection = [];
        $lastTenDaysFeeCollection = [];

        $monthWiseCollectionData = $this->feePaymentRepository->getMonthWiseCollection();
        $lastTenDaysFeeCollectionData = $this->feePaymentRepository->getLastTenDaysCollection();

        foreach ($monthWiseCollectionData as $feeCollection) {
            $month = Carbon::parse($feeCollection->payment_date)->format('F');
            $monthWiseFeeCollection[$month] = ($monthWiseFeeCollection[$month] ?? 0) + (float) $feeCollection->paid_amount;
        }

        foreach ($lastTenDaysFeeCollectionData as $feeCollection) {
            $date = Carbon::parse($feeCollection->payment_date)->format('d-M');
            $lastTenDaysFeeCollection[$date] = ($lastTenDaysFeeCollection[$date] ?? 0) + (float) $feeCollection->paid_amount;
        }

        return Inertia::render('Fee/MisReport', [
            'currentMonth' => $currentMonth,
            'currentAcademicYear' => $currentAcademicYear,
            'currentDayTotalCollection' => (float) $currentDayTotalCollection,
            'currentMonthTotalCollection' => (float) $currentMonthTotalCollection,
            'currentAcademicYearTotalCollection' => (float) $currentAcademicYearTotalCollection,
            'totalDiscountAmount' => (float) $totalDiscountAmount,
            'monthWiseFeeCollection' => $monthWiseFeeCollection,
            'lastTenDaysFeeCollection' => $lastTenDaysFeeCollection,
        ]);
    }



    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {

        return Inertia::render('Fee/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(FeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : 0,
            'board_id' => !empty($input['board_id']) ? intval($input['board_id']) : 0,
            'country_id' => !empty($input['country_id']) ? intval($input['country_id']) : 0,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : 0,
            'timezone_id' => !empty($input['timezone_id']) ? intval($input['timezone_id']) : 0,
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'status' => Status::ACTIVE,
        );

        $school = $this->feeRepository->create();

        return Redirect::route('fee.list');
    }


    /**
     * Display the installment.
     */
    public function installment(): Response
    {
        $fees = $this->feeRepository->getActiveAll();
        $next_installment_no = $this->feeRepository->getNextInstallmentNo();

        return Inertia::render('Fee/Installment', [
            'fees' => $fees,
            'next_installment_no' => $next_installment_no,
        ]);
    }

    /**
     * save the installment.
     */
    public function saveInstallment(FeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $timezone = config('app.timezone');

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'installment_no' => $input['installment_no'],
            'title' => !empty($input['title']) ? $input['title'] : "",
            // 'start_date_at' => !empty($input['start_date_at']) ? Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'end_date_at' => !empty($input['end_date_at']) ? Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'last_pay_date_at' => !empty($input['last_pay_date_at']) ? Carbon::parse($input['last_pay_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date_at'))->timezone($timezone)->toDateString() : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date_at'))->timezone($timezone)->toDateString() : date('Y-m-d'),
            'last_pay_date_at' => !empty($input['last_pay_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('last_pay_date_at'))->timezone($timezone)->toDateString() : date('Y-m-d'),
            'description' => !empty($input['description']) ? $input['description'] : "",
            'is_admission_install' => $input['is_admission_install'] ?? false,
            'status' => Status::ACTIVE,
        );

        $fee = $this->feeRepository->create($dataArray);

        if (!$fee) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Fee installment created successfully.');
    }

    /**
     * edit the installment.
     */
    public function editInstallment(int $id): Response
    {
        $fees = $this->feeRepository->getActiveAll();
        $fee = $this->feeRepository->getById($id);

        return Inertia::render('Fee/EditInstallment', [
            'fee' => $fee,
            'fees' => $fees,
        ]);
    }

    /**
     * update the installment.
     */
    public function updateInstallment(FeeRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $timezone = config('app.timezone');

        $dataArray = array(
            'installment_no' => $input['installment_no'],
            'title' => $input['title'],
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date_at'))->timezone($timezone)->toDateString() : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date_at'))->timezone($timezone)->toDateString() : date('Y-m-d'),
            'last_pay_date_at' => !empty($input['last_pay_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('last_pay_date_at'))->timezone($timezone)->toDateString() : date('Y-m-d'),
            // 'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'last_pay_date_at' => !empty($input['last_pay_date_at']) ? \Carbon\Carbon::parse($input['last_pay_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'description' => $input['description'],
            'is_admission_install' => $input['is_admission_install'] ?? false,
            'status' => Status::ACTIVE,
        );

        $fee = $this->feeRepository->update($id, $dataArray);

        if (!$fee) {
            return redirect()->route('fee.installment')->with('error', 'Something goes wrong.');
        }

        return redirect()->route('fee.installment')->with('message', 'Fee installment updated successfully.');
    }

    /**
     * delete the installment.
     */
    public function deleteInstallment(int $id): RedirectResponse
    {
        $fee = $this->feeRepository->getById($id);

        if (!$fee) {
            return redirect()->route('fee.list')->with('error', 'Fee installment not found.');
        }

        $fee->loadMissing([
            'payments',
            'discounts',
            'class_fee_structure_amounts',
            'class_fee_student_amounts',
            'adjust_fee_payments_from',
            'adjust_fee_payments_to',
            'nullify_fee_amounts'
        ]);

        if (
            $fee->payments->count() > 0 ||
            $fee->discounts->count() > 0 ||
            $fee->class_fee_structure_amounts->count() > 0 ||
            $fee->class_fee_student_amounts->count() > 0  ||
            $fee->adjust_fee_payments_from->count() > 0 ||
            $fee->adjust_fee_payments_to->count() > 0 ||
            $fee->nullify_fee_amounts->count() > 0
        ) {
            return redirect()->back()->with('error', 'This installment fee is in use, it cannot be deleted.');
        }

        $this->feeRepository->delete($id);

        return redirect()->route('fee.installment')->with('message', 'Fee installment deleted successfully.');
    }


    // need to review and delete this code start
    public function getFeeDiscountsByStudent(Request $request)
    {
        $fees = [];

        if ($request->student_id && !is_null($request->student_id)) {
            $fees = $this->feeRepository->getFeeDiscountsByStudentId($request->student_id);
        }

        return redirect()->back()->with([
            'feeDiscountsByStudent' => $fees
        ]);
    }
    // need to review and delete this code end

    /**
     * Display the installment One by One.
     */
    public function installmentOneByOne(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveAll();

        return Inertia::render('Fee/InstallmentOneByOne', [
            'fees' => $fees,
        ]);
    }


    /**
     * Display fee types.
     */
    public function type(): Response
    {
        $types = $this->feeTypeRepository->getActiveFeeTypesAll();
        $types->load('category');

        $categories = $this->categoryRepository->getActiveFeeCategoryAll();

        $installment_types = getFeeInstallmentTypeList();

        return Inertia::render('Fee/Type', [
            'types' => $types,
            'installment_types' => $installment_types,
            'categories' => $categories,
        ]);
    }

    /**
     * save the fee type.
     */
    public function saveType(FeeTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'fee_type' => $input['fee_type'],
            'installment_type' => $input['installment_type'],
            'category_id' => !empty($input['category_id']) ? $input['category_id'] : null,
            'display_name' => !empty($input['display_name']) ? $input['display_name'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'is_fee_refundable' => !empty($input['is_fee_refundable']) ? $input['is_fee_refundable'] : false,
            'is_late_fee' => !empty($input['is_late_fee']) ? $input['is_late_fee'] : false,
            'is_transport_fee' => !empty($input['is_transport_fee']) ? $input['is_transport_fee'] : false,
            'status' => Status::ACTIVE,
        );

        $type = $this->feeTypeRepository->create($dataArray);

        if (!$type) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Fee type created successfully.');
    }


    /**
     * edit the fee type.
     */
    public function editType(int $id): Response
    {
        $types = $this->feeTypeRepository->getActiveFeeTypesAll();
        $types->load('category');

        $type = $this->feeTypeRepository->getById($id);

        $installment_types = getFeeInstallmentTypeList();

        $fee_categories = $this->categoryRepository->getActiveFeeCategoryAll();

        return Inertia::render('Fee/EditType', [
            'type' => $type,
            'types' => $types,
            'installment_types' => $installment_types,
            'fee_categories' => $fee_categories,
        ]);
    }

    /**
     * update the fee type.
     */
    public function updateType(FeeTypeRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'fee_type' => $input['fee_type'],
            'installment_type' => $input['installment_type'],
            'category_id' => !empty($input['category_id']) ? $input['category_id'] : null,
            'display_name' => !empty($input['display_name']) ? $input['display_name'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'is_fee_refundable' => !empty($input['is_fee_refundable']) ? $input['is_fee_refundable'] : false,
            'is_late_fee' => !empty($input['is_late_fee']) ? $input['is_late_fee'] : false,
            'is_transport_fee' => !empty($input['is_transport_fee']) ? $input['is_transport_fee'] : false,
            'status' => Status::ACTIVE,
        );

        $type = $this->feeTypeRepository->update($id, $dataArray);

        if (!$type) {
            return redirect()->route('fee.type')->with('error', 'Something goes wrong.');
        }

        return redirect()->route('fee.type')->with('message', 'Fee type updated successfully.');
    }

    /**
     * delete the fee type.
     */
    public function deleteType(int $id): RedirectResponse
    {
        $type = $this->feeTypeRepository->getById($id);

        if (!$type) {
            return redirect()->route('fee.type')->with('error', 'Fee type not found.');
        }

        $type->loadMissing([
            'payments',
            'payment_refunds',
            'discounts',
            'discount_fee_type_amounts',
            'class_fee_structure_amounts',
            'class_fee_student_amounts',
            'adjust_fee_payment_amounts',
            'nullify_fee_amounts',
            'student_fee_voucher_amounts',
        ]);

        if (
            $type->payments->count() > 0 ||
            $type->payment_refunds->count() > 0 ||
            $type->discounts->count() > 0 ||
            $type->discount_fee_type_amounts->count() > 0 ||
            $type->class_fee_structure_amounts->count() > 0 ||
            $type->class_fee_student_amounts->count() > 0  ||
            $type->adjust_fee_payment_amounts->count() > 0 ||
            $type->nullify_fee_amounts->count() > 0 ||
            $type->student_fee_voucher_amounts->count() > 0
        ) {
            return redirect()->back()->with('error', 'This fee type is in use, it cannot be deleted.');
        }

        $this->feeTypeRepository->delete($id);

        return redirect()->route('fee.type')->with('message', 'Fee type deleted successfully.');
    }


    /**
     * Display the specialType.
     */
    public function specialType(): Response
    {
        $installment_types = getFeeInstallmentTypeList();
        $special_types = $this->feeTypeRepository->getActiveFeeSpecialTypesAll();
        $special_types->load('category');

        $fee_categories = $this->categoryRepository->getActiveFeeCategoryAll();

        return Inertia::render('Fee/SpecialType', [
            'special_types' => $special_types,
            'installment_types' => $installment_types,
            'fee_categories' => $fee_categories,
        ]);
    }

    /**
     * save the specialType.
     */
    public function saveSpecialType(FeeTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'fee_type' => $input['fee_type'],
            'installment_type' => $input['installment_type'],
            'is_fee_special' => 1,
            'category_id' => $input['category_id'],
            'display_name' => $input['display_name'],
            'description' => $input['description'],
            'is_fee_refundable' => $input['is_fee_refundable'] ?? false,
            'status' => Status::ACTIVE,
        );

        $special_type = $this->feeTypeRepository->create($dataArray);

        if (!$special_type) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Fee special type created successfully.');
    }


    /**
     * edit the specialType.
     */
    public function editSpecialType(int $id): Response
    {
        $special_types = $this->feeTypeRepository->getActiveFeeSpecialTypesAll();
        $special_types->load('category');

        $special_type = $this->feeTypeRepository->getById($id);

        $installment_types = getFeeInstallmentTypeList();

        $fee_categories = $this->categoryRepository->getActiveFeeCategoryAll();

        return Inertia::render('Fee/EditSpecialType', [
            'special_type' => $special_type,
            'special_types' => $special_types,
            'installment_types' => $installment_types,
            'fee_categories' => $fee_categories,
        ]);
    }

    /**
     * update the specialType.
     */
    public function updateSpecialType(FeeSpecialTypeRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'fee_type' => $input['fee_type'],
            'installment_type' => $input['installment_type'],
            'category_id' => $input['category_id'],
            'display_name' => $input['display_name'],
            'description' => $input['description'],
            'is_fee_refundable' => $input['is_fee_refundable'] ?? false,
            'status' => Status::ACTIVE,
        );

        $special_type = $this->feeTypeRepository->update($id, $dataArray);

        if (!$special_type) {
            return redirect()->route('fee.special_type')->with('error', 'Something goes wrong.');
        }

        return redirect()->route('fee.special_type')->with('message', 'Fee special type updated successfully.');
    }

    /**
     * delete the specialType.
     */
    public function deleteSpecialType(int $id): RedirectResponse
    {
        $special_type = $this->feeTypeRepository->getById($id);

        if (!$special_type) {
            return redirect()->route('fee.special_type')->with('error', 'Fee type not found.');
        }

        $special_type->loadMissing([
            'payments',
            'payment_refunds',
            'discounts',
            'discount_fee_type_amounts',
            'class_fee_structure_amounts',
            'class_fee_student_amounts',
            'adjust_fee_payment_amounts',
            'nullify_fee_amounts',
            'student_fee_voucher_amounts',
        ]);

        if (
            $special_type->payments->count() > 0 ||
            $special_type->payment_refunds->count() > 0 ||
            $special_type->discounts->count() > 0 ||
            $special_type->discount_fee_type_amounts->count() > 0 ||
            $special_type->class_fee_structure_amounts->count() > 0 ||
            $special_type->class_fee_student_amounts->count() > 0  ||
            $special_type->adjust_fee_payment_amounts->count() > 0 ||
            $special_type->nullify_fee_amounts->count() > 0 ||
            $special_type->student_fee_voucher_amounts->count() > 0
        ) {
            return redirect()->back()->with('error', 'This fee type is in use, it cannot be deleted.');
        }

        $this->feeTypeRepository->delete($id);

        return redirect()->route('fee.special_type')->with('message', 'Fee special type deleted successfully.');
    }


    /**
     * Display the assignSpecialType.
     */
    public function assignSpecialType(Request $request): Response
    {
        $feeInstallments = $this->feeRepository->getActiveAll();
        $classNames =  $this->classroomRepository->getActiveClassNameAll();
        $special_fee_types = $this->feeTypeRepository->getActiveFeeSpecialTypesAll()->map(function ($special_fee_type) {
            return [
                'id' => $special_fee_type->id,
                'title' => $special_fee_type->fee_type,
            ];
        });

        $classrooms = [];
        $students = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classNameId)) {
                $classrooms = $this->classroomRepository->getActiveNameAndIdByClassNameId($classNameId);
                $students = $this->studentRepository->getStudentsByClassNameIdAndClassroomId($classNameId, $classroomId);

                if (count($students) > 0) {
                    $students->loadMissing(['promotedClassroom']);

                    $students =  $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            unset($student['classroom']);

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        $classroomId = $student?->classroom_id;

                        $student->load(['classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        }]);

                        return $student;
                    });
                }
            }
        }

        return Inertia::render('Fee/AssignSpecialType', [
            'students' => $students,
            'classrooms' => $classrooms,
            'special_fee_types' => $special_fee_types,
            'feeInstallments' => $feeInstallments,
            'classNames' => $classNames,
        ]);
    }


    /**
     * save the assignSpecialType.
     */
    public function saveAssignSpecialType(FeeAssignRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            foreach ($input['selected_student_ids'] as $studentId) {
                foreach ($input['selected_fee_ids'] as $feeId) {
                    $student = $this->studentRepository->getById($studentId);
                    $fee = $this->feeRepository->getById($feeId);

                    if (
                        $student->student_status == StudentStatus::NEW->value ||
                        (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $fee->is_admission_install == false)
                    ) {
                        $hasPayment = $this->feePaymentRepository->checkFeePaymentByStudentIdAndFeeId($studentId, $feeId);

                        if (!$hasPayment) {
                            $student_fee_exists = $this->classroomFeeStudentRepository->checkClassroomStudentFee($studentId, $feeId);

                            if (!$student_fee_exists) {
                                $classroomFeeStudentData = array(
                                    'school_id' => getUserSchoolId(),
                                    'academic_year_id' => getAcademicYearId(),
                                    'student_id' => $studentId,
                                    'fee_id' => $feeId,
                                    'class_name_id' => $input['class_name_id'],
                                );

                                $this->assignFeeRepository->saveClassroomFeeStudent($classroomFeeStudentData);
                            }

                            foreach ($input['special_fee_array'] as $specialFeeData) {
                                $attributeToCheck =  [
                                    'school_id' => getUserSchoolId(),
                                    'academic_year_id' => getAcademicYearId(),
                                    'student_id' => $studentId,
                                    'class_name_id' => $input['class_name_id'],
                                    'fee_id' => $feeId,
                                    'fee_type_id' => $specialFeeData['special_fee_type']
                                ];

                                $attributeToCreate = [
                                    'amount' => $specialFeeData['special_fee_type_amount'],
                                    'is_admission_installment' => $fee?->is_admisison_install ?? false,
                                    'is_fee_special' => 1,
                                    'status' => Status::ACTIVE,
                                ];

                                $this->classFeeStudentAmountRepository->updateOrCreate($attributeToCheck, $attributeToCreate);
                            }
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->route('fee.assign_special_type')->with('message', 'Fee assigned successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the removeSpecialType.
     */
    public function removeSpecialType(Request $request): Response
    {
        $specialFeeTypes = $this->feeTypeRepository->getActiveFeeSpecialTypesAll()->map(function ($special_fee_type) {
            return [
                'id' => $special_fee_type->id,
                'title' => $special_fee_type->fee_type,
            ];
        });

        $classrooms = $this->classroomRepository->getActiveAll();

        $filteredSpecialFeeAssignedStudentsData = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->input('fee_type_id'))) {
                $specialFeeAssignedStudents = $this->assignFeeRepository->getSpecialFeeAssignedStudentsAll($request->input('fee_type_id'), $request->input('classroom_id'));

                foreach ($specialFeeAssignedStudents as $stdData) {
                    if (!empty($stdData['classroom_fee_student_amounts'])) {
                        foreach ($stdData['classroom_fee_student_amounts'] as $key => $amt) {
                            $tempArray = array(
                                'student_id' => $stdData['id'],
                                'admission_no' => $stdData['admission_no'],
                                'first_name' => $stdData['first_name'],
                                'middle_name' => $stdData['middle_name'],
                                'last_name' => $stdData['last_name'],
                                'classroom' => [
                                    'id' => $stdData['classroom']['id'],
                                    'title' => $stdData['classroom']['title'],
                                    'class_name_id' => $stdData['classroom']['class_name_id'],
                                ],
                            );

                            $feeArray = array(
                                'fee_id' => $amt['fee_id'],
                                'fee_title' => $stdData['classroom_fee_student_amounts'][$key]['fee']['title'],
                                'fee_type' => array(
                                    'id' => $amt->feeType->id,
                                    'title' => $amt->feeType->fee_type,
                                    'amount' => (float) $amt['amount'] * ($amt['semester'] ?? 1),
                                ),
                                'payment' => $amt?->payment,
                            );

                            if (!isset($filteredSpecialFeeAssignedStudentsData[$stdData['id']])) {
                                $filteredSpecialFeeAssignedStudentsData[$stdData['id']] = $tempArray;
                            }

                            $filteredSpecialFeeAssignedStudentsData[$stdData['id']]['fee'][] = $feeArray;
                        }
                    }
                }
            }
        }

        return Inertia::render('Fee/RemoveSpecialType', [
            'specialFeeTypes' => $specialFeeTypes,
            'classrooms' => $classrooms,
            'specialFeeAssignedStudents' => $filteredSpecialFeeAssignedStudentsData,
        ]);
    }

    /**
     * Display delete student special type fee.
     */
    public function deleteStudentSpecialFeeType(RemoveSpecialFeeTypeRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $cantDelete = false;

            foreach ($input['student_ids'] as $studentId) {
                $classFeeStudentAmounts = $this->classFeeStudentAmountRepository->getStudentSpecialFeeTypeAmounts($studentId, $input['fee_type_id'], $input['class_name_id'], $input['fee_id']);

                if (count($classFeeStudentAmounts) > 0) {
                    $classFeeStudentAmounts->each(function ($classFeeStudentAmount) use ($classFeeStudentAmounts, &$cantDelete, $input) {
                        if (
                            $classFeeStudentAmount->payment != null &&
                            $classFeeStudentAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value &&
                            $classFeeStudentAmounts->count() == 1 &&
                            count($input['student_ids']) == 1
                        ) {
                            $cantDelete =  true;
                        }

                        if (
                            $classFeeStudentAmount->payment == null ||
                            (
                                $classFeeStudentAmount->payment != null &&
                                $classFeeStudentAmount?->payment?->payment_status == PaymentStatus::CANCELLED->value
                            )
                        ) {
                            $classFeeStudentAmount->delete();
                        }
                    });
                }
            }

            if ($cantDelete) {
                return redirect()->back()->with('error', 'Could not deleted special type fee beacuse, you have already taken fee for this fee type.');
            }

            DB::commit();

            return redirect()->route('fee.remove_special_type')->with(['message' => 'Removed successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('fee.remove_special_type')->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the createClassFeeStructure.
     */
    public function createClassFeeStructure(): Response
    {
        $feeStructures = $this->feeStructureRepository->getActiveAll();

        $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

        if ($isFeeStructureWithTemplate == "Yes") {
            $classNames =  $this->classroomRepository->getSessionWiseActiveClassNameAll();
        } else {
            $classNames =  $this->classroomRepository->getClassNameWithoutFeeStructure();
        }

        $feeTypes = $this->feeTypeRepository->getActiveFeeTypesAll();
        $fees = $this->feeRepository->getActiveAll();
        $hostelAvailable = getSiteSettingData('fee_is_hostel_available') != null && getSiteSettingData('fee_is_hostel_available')->value == 'Yes' ? true : false;

        $semesters = [];

        foreach (Semester::cases() as $semester) {
            array_push($semesters, ['id' => $semester->value, 'title' => $semester->value]);
        }

        $structureTypes = [];

        foreach (StructureType::cases() as $structureType) {
            array_push($structureTypes, ['id' => $structureType->value, 'title' => $structureType->value]);
        }

        return Inertia::render('Fee/CreateClassFeeStructure', [
            'feeStructures' => $feeStructures,
            'class_names' => $classNames,
            'fees' => $fees,
            'feeTypes' => $feeTypes,
            'structureTypes' => $structureTypes,
            'semesters' => $semesters,
            'hostelAvailable' => $hostelAvailable,
        ]);
    }

    /**
     * save class fee structure.
     */
    public function saveClassFeeStructure(ClassFeeStructureRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
            $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";
            $hostelAvailable = getSiteSettingData('fee_is_hostel_available') != null && getSiteSettingData('fee_is_hostel_available')->value == 'Yes' ? true : false;

            if ($hostelAvailable) {
                $fee_structure_type = !empty($input['structure_type']) ? $input['structure_type'] : "";
            } else {
                $fee_structure_type = StructureType::DAYSCHOLAR->value;
            }

            $feeStructureDataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'title' => !empty($input['title']) ? $input['title'] : "",
                'description' => !empty($input['description']) ? $input['description'] : "",
                'structure_type' => $fee_structure_type,
                'status' => Status::ACTIVE,
            );

            // create fee structure
            $classFeeStructure = $this->feeStructureRepository->create($feeStructureDataArray);

            // set transport fee setting if fee structure is created
            if ($classFeeStructure != null && $transportFeeStructureSetting == null) {
                setSiteSettingData('Transport', 'transport_fee_structure', 'fee');
            }

            foreach ($input['selected_class_ids'] as $classNameId) {
                if ($isFeeStructureWithTemplate == "Yes") {
                    $className = $this->classroomRepository->getSessionWiseClassNameById($classNameId);
                } else {
                    $className = $this->classroomRepository->getClassNameWithoutFeeStructureAmountById($classNameId);
                }

                if ($className != null) {
                    $feeStructureClassNameDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'class_fee_structure_id' => $classFeeStructure->id,
                        'class_name_id' => $classNameId,
                        'status' => Status::ACTIVE,
                    );

                    $this->feeStructureRepository->createFeeStructureClassName($feeStructureClassNameDataArray);

                    if (!empty($input['fee_type_amount_array'])) {
                        foreach ($input['fee_type_amount_array'] as $feeTypeAmount) {
                            $feeStructureAmountDataArray = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'class_fee_structure_id' => $classFeeStructure->id,
                                'class_name_id' => $classNameId,
                                'fee_id' => $feeTypeAmount['fee_id'],
                                'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                'student_status' => StudentStatus::NEW,
                                'status' => Status::ACTIVE,
                            );

                            $this->feeStructureRepository->createFeeStructureAmount($feeStructureAmountDataArray);
                        }
                    }

                    if (!empty($input['old_fee_type_amount_array'])) {
                        foreach ($input['old_fee_type_amount_array'] as $feeTypeAmount) {
                            $feeStructureAmountDataArray = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'class_fee_structure_id' => $classFeeStructure->id,
                                'class_name_id' => $classNameId,
                                'fee_id' => $feeTypeAmount['fee_id'],
                                'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                'student_status' => StudentStatus::OLD,
                                'status' => Status::ACTIVE,
                            );

                            $this->feeStructureRepository->createFeeStructureAmount($feeStructureAmountDataArray);
                        }
                    }
                }
            }

            if (
                $isFeeStructureWithTemplate == "No" &&
                (!empty($input['old_fee_type_amount_array']) || !empty($input['fee_type_amount_array']))
            ) {
                $students = $this->studentRepository->getStudentsByClassNameIds($input['selected_class_ids']);

                if (!empty($students)) {
                    $students->loadMissing(['promotedClassroom']);

                    $students = $students?->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                        }

                        return $student;
                    });

                    $disallowStructureToEwsStudent = getSiteSettingData('fee_is_disallow_structure_to_ews_student')?->value ?? "No";

                    foreach ($students as $student) {
                        if (
                            ($disallowStructureToEwsStudent == "No" || ($disallowStructureToEwsStudent == "Yes" && $student?->is_economically_weaker != true)) && $input['structure_type'] == $student->boarding_type
                        ) {
                            if (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])) {
                                $fee_type_amount_array = $input['old_fee_type_amount_array'] ?? [];
                            } else {
                                $fee_type_amount_array = $input['fee_type_amount_array'] ?? [];
                            }

                            if (count($fee_type_amount_array) > 0) {
                                foreach ($fee_type_amount_array as $feeTypeAmount) {
                                    if (
                                        $student->student_status == StudentStatus::NEW->value ||
                                        (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $feeTypeAmount['is_admission_installment'] == false)
                                    ) {
                                        $studentAmountAttributesToCheck = array(
                                            'school_id' => getUserSchoolId(),
                                            'academic_year_id' => getAcademicYearId(),
                                            'student_id' => $student->id,
                                            'class_name_id' => $student->class_name_id,
                                            // 'class_fee_structure_id' => $classFeeStructure->id,
                                            'fee_id' => $feeTypeAmount['fee_id'],
                                            'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                        );

                                        $studentAmountValuesToUpdate = array(
                                            'class_fee_structure_id' => $classFeeStructure->id,
                                            'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                            'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                            'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                            'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                            'status' => Status::ACTIVE,
                                        );

                                        $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($studentAmountAttributesToCheck, $studentAmountValuesToUpdate);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->route('fee.create_class_fee_structure')->with('message', 'Fee class structure created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Edit class fee structure.
     */
    public function editClassFeeStructure(int $id): Response
    {
        $classFeeStructure = $this->feeStructureRepository->getSessionWiseFeeStructureById($id);
        $classFeeStructure->load(['classNames', 'class_fee_structure_amounts.feeType']);
        $uniqueAmounts = $classFeeStructure->class_fee_structure_amounts->groupBy('class_name_id')->first();
        $classFeeStructure->setRelation('class_fee_structure_amounts', $uniqueAmounts);
        $feeStructures = $this->feeStructureRepository->getActiveAll();

        // do not remove this code
        // $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

        // if ($isFeeStructureWithTemplate == "Yes") {
        //     $classNames =  $this->classroomRepository->getSessionWiseActiveClassNameAll();
        // } else {
        //     $classNames = $this->classroomRepository->getClassNameWithoutFeeStructureByIds($classFeeStructure->classNames->pluck('id')->toArray());
        // }

        $classNames = $this->classroomRepository->getClassNameWithoutFeeStructureByIds($classFeeStructure->classNames->pluck('id')->toArray());
        $feeTypes = $this->feeTypeRepository->getActiveFeeTypesAll();
        $fees = $this->feeRepository->getActiveAll();
        $hostelAvailable = getSiteSettingData('fee_is_hostel_available') != null && getSiteSettingData('fee_is_hostel_available')->value == 'Yes' ? true : false;
        $semesters = [];

        foreach (Semester::cases() as $semester) {
            array_push($semesters, ['id' => $semester->value, 'title' => $semester->value]);
        }

        $structureTypes = [];

        foreach (StructureType::cases() as $structureType) {
            array_push($structureTypes, ['id' => $structureType->value, 'title' => $structureType->value]);
        }

        return Inertia::render('Fee/EditClassFeeStructure', [
            'feeStructures' => $feeStructures,
            'feeStructure' => $classFeeStructure,
            'class_names' => $classNames,
            'feeTypes' => $feeTypes,
            'fees' => $fees,
            'structureTypes' => $structureTypes,
            'semesters' => $semesters,
            'hostelAvailable' => $hostelAvailable,
        ]);
    }

    /**
     * update the class fee structure.
     */
    public function updateCreateClassFeeStructure(int $id, ClassFeeStructureRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $classFeeStructure = $this->feeStructureRepository->getSessionWiseFeeStructureById($id);

        DB::beginTransaction();

        try {
            $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

            $hostelAvailable = getSiteSettingData('fee_is_hostel_available') != null && getSiteSettingData('fee_is_hostel_available')->value == 'Yes' ? true : false;

            if ($hostelAvailable) {
                $fee_structure_type = !empty($input['structure_type']) ? $input['structure_type'] : "";
            } else {
                $fee_structure_type = $classFeeStructure->structure_type;
            }

            // update fee structure
            $feeStructureDataArray = array(
                'title' => !empty($input['title']) ? $input['title'] : "",
                'description' => !empty($input['description']) ? $input['description'] : "",
                'structure_type' => $fee_structure_type,
                'status' => Status::ACTIVE,
            );

            $this->feeStructureRepository->update($classFeeStructure->id, $feeStructureDataArray);

            $classFeeStructureAmountIdsToUpdate = [];
            $feeStructureStudentAmountIdsToUpdate = [];
            $classNameIds = $classFeeStructure->classNames->pluck('id')->toArray();
            $message = "Class fee structure updated successfully.";
            $hasErrorMessage = false;

            $newFeePaymentMap = [];
            $oldFeePaymentMap = [];

            $studentFeeAmounts = $this->classFeeStudentAmountRepository->getStudentFeeAmountsByStructureId($classFeeStructure->id);
            $studentFeeAmounts->load(['student:id,student_status']);

            if ($studentFeeAmounts->count() > 0) {
                foreach ($studentFeeAmounts as $studentAmount) {
                    if ($studentAmount->payment != null && $studentAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                        array_push($feeStructureStudentAmountIdsToUpdate, $studentAmount->id);

                        if ($studentAmount?->student?->student_status == StudentStatus::NEW->value && !isset($newFeePaymentMap[$studentAmount['fee_id']])) {
                            $newFeePaymentMap[$studentAmount['fee_id']] = $studentAmount['fee_id'];
                        } else if (
                            in_array($studentAmount?->student?->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) &&
                            !isset($oldFeePaymentMap[$studentAmount['fee_id']])
                        ) {
                            $oldFeePaymentMap[$studentAmount['fee_id']] = $studentAmount['fee_id'];
                        }
                    }
                }
            }

            // get new student fee amounts
            $newStudentFeeStructureAmountsData = $this->feeStructureRepository->getNewStudentAmountsByFeeStructureIdAndFeeIds($classFeeStructure->id, $newFeePaymentMap);

            // get old student fee amounts
            $oldStudentFeeStructureAmountsData = $this->feeStructureRepository->getOldStudentAmountsByFeeStructureIdAndFeeIds($classFeeStructure->id, $oldFeePaymentMap);

            // merge old and new class fee structure amount ids
            $classFeeStructureAmountIdsToUpdate = array_merge($classFeeStructureAmountIdsToUpdate, $newStudentFeeStructureAmountsData?->pluck('id')->toArray(), $oldStudentFeeStructureAmountsData?->pluck('id')->toArray());

            foreach ($classNameIds as $classNameId) {
                if (!empty($input['fee_type_amount_array'])) {
                    foreach ($input['fee_type_amount_array'] as $feeTypeAmount) {
                        if (!isset($newFeePaymentMap[$feeTypeAmount['fee_id']])) {
                            $amountAttributesToCheck = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'class_fee_structure_id' => $classFeeStructure->id,
                                'class_name_id' => $classNameId,
                                'fee_id' => $feeTypeAmount['fee_id'],
                                'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                'student_status' => StudentStatus::NEW,
                            );

                            $amountValuesToUpdate = array(
                                'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                'status' => Status::ACTIVE,
                            );

                            $feeStructureAmount = $this->feeStructureRepository->updateOrCreateFeeStructureAmount($amountAttributesToCheck, $amountValuesToUpdate);

                            array_push($classFeeStructureAmountIdsToUpdate, $feeStructureAmount->id);
                        } else {
                            $message = "Some installments could not be updated, need to delete payment first.";
                            $hasErrorMessage = true;
                        }
                    }
                }

                if (!empty($input['old_fee_type_amount_array'])) {
                    foreach ($input['old_fee_type_amount_array'] as $feeTypeAmount) {
                        if (!isset($oldFeePaymentMap[$feeTypeAmount['fee_id']])) {
                            $amountAttributesToCheck = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'class_fee_structure_id' => $classFeeStructure->id,
                                'class_name_id' => $classNameId,
                                'fee_id' => $feeTypeAmount['fee_id'],
                                'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                'student_status' => StudentStatus::OLD,
                            );

                            $amountValuesToUpdate = array(
                                'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                'status' => Status::ACTIVE,
                            );

                            $feeStructureAmount = $this->feeStructureRepository->updateOrCreateFeeStructureAmount($amountAttributesToCheck, $amountValuesToUpdate);

                            array_push($classFeeStructureAmountIdsToUpdate, $feeStructureAmount->id);
                        } else {
                            $message = "Some installments could not be updated, need to delete payment first.";
                            $hasErrorMessage = true;
                        }
                    }
                }
            }

            if ($isFeeStructureWithTemplate == "No") {
                if ((isset($input['old_fee_type_amount_array']) && count($input['old_fee_type_amount_array']) > 0) || (isset($input['fee_type_amount_array']) && count($input['fee_type_amount_array']) > 0)) {
                    $students = $this->studentRepository->getStudentsByClassNameIds($classNameIds);

                    if (!empty($students)) {
                        $students->loadMissing(['promotedClassroom:classrooms.id,classrooms.class_name_id']);

                        $students = $students?->map(function ($student) {
                            if ($student?->promotedClassroom != null) {
                                $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                            }

                            return $student;
                        });

                        $tempStudentFeeIds = [];
                        $tempStudentIds = [];

                        foreach ($students as $student) {
                            if ($input['structure_type'] == $student->boarding_type) {
                                $isOldOrPromoted = in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]);

                                if ($isOldOrPromoted) {
                                    $fee_type_amount_array = $input['old_fee_type_amount_array'] ?? [];
                                    $feePaymentMap = $oldFeePaymentMap;
                                } else {
                                    $fee_type_amount_array = $input['fee_type_amount_array'] ?? [];
                                    $feePaymentMap = $newFeePaymentMap;
                                }

                                if (count($fee_type_amount_array) > 0) {
                                    foreach ($fee_type_amount_array as $feeTypeAmount) {
                                        if (
                                            $student->student_status == StudentStatus::NEW->value ||
                                            ($isOldOrPromoted && $feeTypeAmount['is_admission_installment'] == false)
                                        ) {
                                            if (!isset($feePaymentMap[$feeTypeAmount['fee_id']])) {
                                                $studentAmountAttributesToCheck = array(
                                                    'school_id' => getUserSchoolId(),
                                                    'academic_year_id' => getAcademicYearId(),
                                                    'student_id' => $student->id,
                                                    'class_name_id' => $student->class_name_id,
                                                    'fee_id' => $feeTypeAmount['fee_id'],
                                                    'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                                );

                                                $studentAmountValuesToUpdate = array(
                                                    'class_fee_structure_id' => $classFeeStructure->id,
                                                    'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                                    'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                                    'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                                    'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                                    'status' => Status::ACTIVE,
                                                );

                                                $feeStructureStudentAmount = $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($studentAmountAttributesToCheck, $studentAmountValuesToUpdate);

                                                array_push($feeStructureStudentAmountIdsToUpdate, $feeStructureStudentAmount->id);
                                            } else {
                                                $tempStudentFeeIds[] = ['student_id' => $student->id, 'fee_id' => $feeTypeAmount['fee_id']];
                                            }
                                        } else {
                                            $tempStudentIds[] = $student->id;
                                        }
                                    }
                                }
                            }
                        }

                        $studentFeeAmountIds = $studentFeeAmounts->filter(function ($item) use ($tempStudentIds, $feeStructureStudentAmountIdsToUpdate) {
                            return in_array($item->student_id, $tempStudentIds) && !in_array($item->id, $feeStructureStudentAmountIdsToUpdate);
                        })->pluck('id')->toArray();

                        $feeStructureStudentAmountIdsToUpdate = array_merge($feeStructureStudentAmountIdsToUpdate, $studentFeeAmountIds);

                        $studentFeeAmountIds = $studentFeeAmounts->filter(function ($item) use ($tempStudentFeeIds, $feeStructureStudentAmountIdsToUpdate) {
                            return in_array(['student_id' => $item->student_id, 'fee_id' => $item->fee_id], $tempStudentFeeIds) &&
                                !in_array($item->id, $feeStructureStudentAmountIdsToUpdate);
                        })->pluck('id')->toArray();

                        $feeStructureStudentAmountIdsToUpdate = array_merge($feeStructureStudentAmountIdsToUpdate, $studentFeeAmountIds);
                    }
                }

                $feeStructureStudentAmountIdsToUpdate = array_unique($feeStructureStudentAmountIdsToUpdate);

                $this->classFeeStudentAmountRepository->deleteClassFeeStudentAmounts($classFeeStructure->id, $feeStructureStudentAmountIdsToUpdate);
            }

            $classFeeStructureAmountIdsToUpdate = array_unique($classFeeStructureAmountIdsToUpdate);

            // delete fee amounts that are were not selected
            $this->feeStructureRepository->deleteClassFeeStructureAmounts($classFeeStructure->id, $classFeeStructureAmountIdsToUpdate);

            DB::commit();

            if ($hasErrorMessage == true) {
                return redirect()->back()->with('error', $message);
            }

            return redirect()->back()->with('message', $message);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function updateCreateClassFeeStructure_old(int $id, ClassFeeStructureRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $classFeeStructure = $this->feeStructureRepository->getSessionWiseFeeStructureById($id);

        DB::beginTransaction();

        try {
            // $classFeeStructure->loadMissing(['fee_payments']);

            // if ($classFeeStructure->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->count() > 0) {
            //     return redirect()->back()->with('error', 'Some installments could not be updated, need to delete payment first.');
            // }

            $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

            $hostelAvailable = getSiteSettingData('fee_is_hostel_available') != null && getSiteSettingData('fee_is_hostel_available')->value == 'Yes' ? true : false;

            if ($hostelAvailable) {
                $fee_structure_type = !empty($input['structure_type']) ? $input['structure_type'] : "";
            } else {
                $fee_structure_type = $classFeeStructure->structure_type;
            }

            $feeStructureDataArray = array(
                'title' => !empty($input['title']) ? $input['title'] : "",
                'description' => !empty($input['description']) ? $input['description'] : "",
                'structure_type' => $fee_structure_type,
                'status' => Status::ACTIVE,
            );

            $classFeeStructure->update($feeStructureDataArray);

            $classFeeStructureAmountIdsToUpdate = [];
            $feeStructureStudentAmountIdsToUpdate = [];
            $classNameIds = $classFeeStructure->classNames->pluck('id')->toArray();
            $message = "Class fee structure updated successfully.";
            $isErrorMessage = false;
            $canUpdate = true;

            $newFeePaymentMap = [];
            $oldFeePaymentMap = [];

            $classFeeStructure->load(['class_fee_structure_amounts']);

            $studentFeeAmounts = $this->classFeeStudentAmountRepository->getStudentFeeAmountsByStructureId($classFeeStructure->id);
            $studentFeeAmounts->load(['student']);

            if ($studentFeeAmounts->count() > 0) {
                foreach ($studentFeeAmounts as $studentAmount) {
                    if ($studentAmount->payment != null && $studentAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                        array_push($feeStructureStudentAmountIdsToUpdate, $studentAmount->id);

                        if ($studentAmount?->student?->student_status == StudentStatus::NEW->value && !isset($newFeePaymentMap[$studentAmount['fee_id']])) {
                            $newFeePaymentMap[$studentAmount['fee_id']] = $studentAmount['fee_id'];
                        } else if (
                            in_array($studentAmount?->student?->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) &&
                            !isset($oldFeePaymentMap[$studentAmount['fee_id']])
                        ) {
                            $oldFeePaymentMap[$studentAmount['fee_id']] = $studentAmount['fee_id'];
                        }
                    }
                }
            }

            // get new student fee amounts
            $newStudentFeeStructureAmountsData = $this->feeStructureRepository->getNewStudentAmountsByFeeStructureIdAndFeeIds($classFeeStructure->id, $newFeePaymentMap);

            // get old student fee amounts
            $oldStudentFeeStructureAmountsData = $this->feeStructureRepository->getOldStudentAmountsByFeeStructureIdAndFeeIds($classFeeStructure->id, $oldFeePaymentMap);

            $feeStructureAmountsData = array_merge($newStudentFeeStructureAmountsData->toArray(), $oldStudentFeeStructureAmountsData->toArray());

            if (count($feeStructureAmountsData) > 0) {
                foreach ($feeStructureAmountsData as $structureAmount) {
                    array_push($classFeeStructureAmountIdsToUpdate, $structureAmount['id']);
                }
            }

            foreach ($classNameIds as $classNameId) {
                if (!empty($input['fee_type_amount_array'])) {
                    foreach ($input['fee_type_amount_array'] as $feeTypeAmount) {
                        if (!isset($newFeePaymentMap[$feeTypeAmount['fee_id']])) {
                            $amountAttributesToCheck = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'class_fee_structure_id' => $classFeeStructure->id,
                                'class_name_id' => $classNameId,
                                'fee_id' => $feeTypeAmount['fee_id'],
                                'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                'student_status' => StudentStatus::NEW,
                            );

                            $amountValuesToUpdate = array(
                                'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                'status' => Status::ACTIVE,
                            );

                            $feeStructureAmount = $this->feeStructureRepository->updateOrCreateFeeStructureAmount($amountAttributesToCheck, $amountValuesToUpdate);

                            array_push($classFeeStructureAmountIdsToUpdate, $feeStructureAmount->id);
                        } else {
                            $message = "Some installments could not be updated, need to delete payment first.";
                            $isErrorMessage = true;
                            $canUpdate = false;
                        }
                    }
                }

                if (!empty($input['old_fee_type_amount_array'])) {
                    foreach ($input['old_fee_type_amount_array'] as $feeTypeAmount) {
                        if (!isset($oldFeePaymentMap[$feeTypeAmount['fee_id']])) {
                            $amountAttributesToCheck = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'class_fee_structure_id' => $classFeeStructure->id,
                                'class_name_id' => $classNameId,
                                'fee_id' => $feeTypeAmount['fee_id'],
                                'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                'student_status' => StudentStatus::OLD,
                            );

                            $amountValuesToUpdate = array(
                                'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                'status' => Status::ACTIVE,
                            );

                            $feeStructureAmount = $this->feeStructureRepository->updateOrCreateFeeStructureAmount($amountAttributesToCheck, $amountValuesToUpdate);

                            array_push($classFeeStructureAmountIdsToUpdate, $feeStructureAmount->id);
                        } else {
                            $message = "Some installments could not be updated, need to delete payment first.";
                            $isErrorMessage = true;
                            $canUpdate = false;
                        }
                    }
                }
            }

            if ($isFeeStructureWithTemplate == "No") {
                if ((isset($input['old_fee_type_amount_array']) && count($input['old_fee_type_amount_array']) > 0) || (isset($input['fee_type_amount_array']) && count($input['fee_type_amount_array']) > 0)) {
                    $students = $this->studentRepository->getStudentsByClassNameIds($classNameIds);
                    // $students = $this->studentRepository->getStudentsByClassNameIds($input['selected_class_ids']);

                    if (!empty($students)) {
                        $students->loadMissing(['promotedClassroom']);

                        $students = $students?->map(function ($student) {
                            if ($student?->promotedClassroom != null) {
                                $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                            }

                            return $student;
                        });

                        foreach ($students as $student) {
                            if ($input['structure_type'] == $student->boarding_type) {
                                if (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])) {
                                    $fee_type_amount_array = $input['old_fee_type_amount_array'] ?? [];
                                    $feePaymentMap = $oldFeePaymentMap;
                                } else {
                                    $fee_type_amount_array = $input['fee_type_amount_array'] ?? [];
                                    $feePaymentMap = $newFeePaymentMap;
                                }

                                if (count($fee_type_amount_array) > 0) {
                                    foreach ($fee_type_amount_array as $feeTypeAmount) {
                                        if (
                                            $student->student_status == StudentStatus::NEW->value ||
                                            (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $feeTypeAmount['is_admission_installment'] == false)
                                        ) {
                                            if (!isset($feePaymentMap[$feeTypeAmount['fee_id']])) {
                                                $studentAmountAttributesToCheck = array(
                                                    'school_id' => getUserSchoolId(),
                                                    'academic_year_id' => getAcademicYearId(),
                                                    'student_id' => $student->id,
                                                    'class_name_id' => $student->class_name_id,
                                                    // 'class_fee_structure_id' => $classFeeStructure->id,
                                                    'fee_id' => $feeTypeAmount['fee_id'],
                                                    'fee_type_id' => $feeTypeAmount['fee_type_id'],
                                                );

                                                $studentAmountValuesToUpdate = array(
                                                    'class_fee_structure_id' => $classFeeStructure->id,
                                                    'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
                                                    'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
                                                    'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
                                                    'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
                                                    'status' => Status::ACTIVE,
                                                );

                                                $feeStructureStudentAmount = $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($studentAmountAttributesToCheck, $studentAmountValuesToUpdate);

                                                array_push($feeStructureStudentAmountIdsToUpdate, $feeStructureStudentAmount->id);
                                            } else {
                                                $studentFees = $studentFeeAmounts->where('student_id', $student->id)->where('fee_id', $feeTypeAmount['fee_id']);

                                                $feeStructureStudentAmountIdsToUpdate = array_merge($feeStructureStudentAmountIdsToUpdate, $studentFees?->pluck('id')->toArray());
                                            }
                                        } else {
                                            $studentFees = $studentFeeAmounts->where('student_id', $student->id);

                                            $feeStructureStudentAmountIdsToUpdate = array_merge($feeStructureStudentAmountIdsToUpdate, $studentFees?->pluck('id')->toArray());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                $feeStructureStudentAmountIdsToUpdate = array_unique($feeStructureStudentAmountIdsToUpdate);

                $this->classFeeStudentAmountRepository->deleteClassFeeStudentAmounts($classFeeStructure->id, $feeStructureStudentAmountIdsToUpdate);
            }

            $classFeeStructureAmountIdsToUpdate = array_unique($classFeeStructureAmountIdsToUpdate);

            // delete fee amounts that are were not selected
            $this->feeStructureRepository->deleteClassFeeStructureAmounts($classFeeStructure->id, $classFeeStructureAmountIdsToUpdate);

            // if ($canUpdate == true) {
            //     $this->feeStructureRepository->deleteClassFeeStructureAmounts($classFeeStructure->id, $classFeeStructureAmountIdsToUpdate);
            // }


            // old code
            // do not remove this code
            // if ($classFeeStructure->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->count() <= 0) {
            //     $classFeeStructureAmountIdsToUpdate = [];
            //     $feeStructureStudentAmountIdsToUpdate = [];
            //     $classNameIds = $classFeeStructure->classNames->pluck('id')->toArray();

            //     foreach ($classNameIds as $classNameId) {
            //         if (isset($input['fee_type_amount_array']) && count($input['fee_type_amount_array']) > 0) {
            //             foreach ($input['fee_type_amount_array'] as $feeTypeAmount) {
            //                 $amountAttributesToCheck = array(
            //                     'school_id' => getUserSchoolId(),
            //                     'academic_year_id' => getAcademicYearId(),
            //                     'class_fee_structure_id' => $classFeeStructure->id,
            //                     'class_name_id' => $classNameId,
            //                     'fee_id' => $feeTypeAmount['fee_id'],
            //                     'fee_type_id' => $feeTypeAmount['fee_type_id'],
            //                 );

            //                 $amountValuesToUpdate = array(
            //                     'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
            //                     'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
            //                     'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
            //                     'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
            //                     'student_status' => StudentStatus::NEW,
            //                     'status' => Status::ACTIVE,
            //                 );

            //                 $feeStructureAmount = $this->feeStructureRepository->updateOrCreateFeeStructureAmount($amountAttributesToCheck, $amountValuesToUpdate);

            //                 $classFeeStructureAmountIdsToUpdate[] = $feeStructureAmount->id;
            //             }
            //         }

            //         if (isset($input['old_fee_type_amount_array']) && count($input['old_fee_type_amount_array']) > 0) {
            //             foreach ($input['old_fee_type_amount_array'] as $feeTypeAmount) {
            //                 $amountAttributesToCheck = array(
            //                     'school_id' => getUserSchoolId(),
            //                     'academic_year_id' => getAcademicYearId(),
            //                     'class_fee_structure_id' => $classFeeStructure->id,
            //                     'class_name_id' => $classNameId,
            //                     'fee_id' => $feeTypeAmount['fee_id'],
            //                     'fee_type_id' => $feeTypeAmount['fee_type_id'],
            //                 );

            //                 $amountValuesToUpdate = array(
            //                     'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
            //                     'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
            //                     'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
            //                     'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
            //                     'student_status' => StudentStatus::OLD,
            //                     'status' => Status::ACTIVE,
            //                 );

            //                 $feeStructureAmount = $this->feeStructureRepository->updateOrCreateFeeStructureAmount($amountAttributesToCheck, $amountValuesToUpdate);

            //                 $classFeeStructureAmountIdsToUpdate[] = $feeStructureAmount->id;
            //             }
            //         }
            //     }

            //     if ($isFeeStructureWithTemplate == "No") {
            //         $students = $this->studentRepository->getStudentsByClassNameIds($classNameIds);

            //         if ((isset($input['old_fee_type_amount_array']) && count($input['old_fee_type_amount_array']) > 0) || (isset($input['fee_type_amount_array']) && count($input['fee_type_amount_array']) > 0)) {
            //             $students = $this->studentRepository->getStudentsByClassNameIds($input['selected_class_ids']);

            //             if ($students->count() > 0) {
            //                 foreach ($students as $student) {
            //                     if ($input['structure_type'] == $student->boarding_type) {
            //                         if (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])) {
            //                             $fee_type_amount_array = $input['old_fee_type_amount_array'] ?? [];
            //                         } else {
            //                             $fee_type_amount_array = $input['fee_type_amount_array'] ?? [];
            //                         }

            //                         if (count($fee_type_amount_array) > 0) {
            //                             foreach ($fee_type_amount_array as $feeTypeAmount) {
            //                                 if (
            //                                     $student->student_status == StudentStatus::NEW->value ||
            //                                     (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $feeTypeAmount['is_admission_installment'] == false)
            //                                 ) {
            //                                     $studentAmountAttributesToCheck = array(
            //                                         'school_id' => getUserSchoolId(),
            //                                         'academic_year_id' => getAcademicYearId(),
            //                                         'student_id' => $student->id,
            //                                         'class_name_id' => $student->class_name_id,
            //                                         'class_fee_structure_id' => $classFeeStructure->id,
            //                                         'fee_id' => $feeTypeAmount['fee_id'],
            //                                         'fee_type_id' => $feeTypeAmount['fee_type_id'],
            //                                     );

            //                                     $studentAmountValuesToUpdate = array(
            //                                         'amount' => !empty($feeTypeAmount['amount']) ? $feeTypeAmount['amount'] : 0,
            //                                         'semester' => !empty($feeTypeAmount['semester']) ? $feeTypeAmount['semester'] : null,
            //                                         'is_admission_installment' => !empty($feeTypeAmount['is_admission_installment']) ? $feeTypeAmount['is_admission_installment'] : 0,
            //                                         'is_fee_special' => !empty($feeTypeAmount['is_special']) ? $feeTypeAmount['is_special'] : 0,
            //                                         'status' => Status::ACTIVE,
            //                                     );

            //                                     $feeStructureStudentAmount = $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($studentAmountAttributesToCheck, $studentAmountValuesToUpdate);

            //                                     $feeStructureStudentAmountIdsToUpdate[] = $feeStructureStudentAmount->id;
            //                                 }
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }

            //         $this->classFeeStudentAmountRepository->deleteClassFeeStudentAmounts($classFeeStructure->id, $feeStructureStudentAmountIdsToUpdate);
            //     }

            //     $this->feeStructureRepository->deleteClassFeeStructureAmounts($classFeeStructure->id, $classFeeStructureAmountIdsToUpdate);

            //     $message = "Class fee structure updated successfully.";
            // } else {
            //     $message = "Class fee structure info updated, but fee cannot be updated.";
            // }

            DB::commit();

            if ($isErrorMessage == true) {
                // return redirect()->route('fee.create_class_fee_structure')->with('error', $message);
                return redirect()->back()->with('error', $message);
            }

            // return redirect()->route('fee.create_class_fee_structure')->with('message', $message);
            return redirect()->back()->with('message', $message);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    * delete class fee structure
    */
    public function deleteClassFeeStructure(int $id): RedirectResponse
    {
        $classFeeStructure = $this->feeStructureRepository->getSessionWiseFeeStructureById($id);

        DB::beginTransaction();

        try {
            $cantDelete = false;

            $classFeeStructure->class_fee_student_amounts->each(function ($item) use (&$cantDelete) {
                if ($item->fee_payments->count() > 0) {
                    $cantDelete = true;
                }
            });

            if ($cantDelete) {
                return redirect()->back()->with('error', 'Fee structure cannot be deleted.');
            }

            $this->feeStructureRepository->deleteFeeStructureClassNamesByFeeStructureId($classFeeStructure->id);
            $classFeeStructure->class_fee_structure_amounts()->delete();
            $classFeeStructure->class_fee_student_amounts()->delete();
            $classFeeStructure->delete();

            DB::commit();

            return redirect()->route('fee.create_class_fee_structure')->with('message', 'Fee structure deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the updateClassFeeStructure.
     */
    public function updateClassFeeStructure(Request $request): Response
    {
        $fees = [];
        $feeTypes = $this->feeTypeRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        $students = [];
        $activeStudents = [];
        $inactiveStudents = [];
        $tcStudents = [];
        $studentFeeStructureData = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $admissionNo = $request->admission_no ?? null;
            $studentId = $request->student_id ?? null;

            if (!empty($admissionNo)) {
                $student = $this->studentRepository->getActiveAndInactiveStudentByAdmissionNo($admissionNo);
            }

            if (!empty($studentId)) {
                $student = $this->studentRepository->getActiveAndInActiveStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getActiveAndInActiveStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['studentTransferCertificate', 'promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });

                $activeStudents = $students->filter(function ($student) {
                    return $student?->status == Status::ACTIVE;
                });

                $inactiveStudents = $students->filter(function ($student) {
                    return $student?->status == Status::INACTIVE  && $student?->studentTransferCertificate == null;
                });

                $tcStudents = $students->filter(function ($student) {
                    return $student?->status == Status::INACTIVE && $student?->studentTransferCertificate != null;
                });
            }

            if ($student != null) {
                $fees = $this->feeRepository->getActiveAll()->filter(function ($fee) use ($student) {
                    if ($student->student_status != StudentStatus::NEW->value) {
                        return $fee->is_admission_install == false;
                    }

                    return true;
                });

                $studentFeeStructure = $this->feeStructureRepository->getFeeStructureByStudentId($student->id);

                if (count($studentFeeStructure) > 0) {
                    foreach ($studentFeeStructure->groupBy('fee_id') as $feeId => $feeAmountData) {
                        $studentFeeStructureData[$feeId]['fee'] = [
                            'id' => $feeAmountData->first()->fee->id,
                            'title' => $feeAmountData->first()->fee->title,
                            'is_admission_installment' => $feeAmountData->first()->fee->is_admission_install,
                        ];

                        $total_amount = 0;
                        $total_payable = 0;
                        $total_paid = 0;
                        $total_due = 0;

                        $paid_status_count = 0;
                        $partial_status_count = 0;
                        $due_status_count = 0;

                        foreach ($feeAmountData as $feeAmount) {
                            if ($feeAmount?->payment != null) {
                                $discount_amount = (float) $feeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            } else {
                                if ($feeAmount->is_discount_percentage) {
                                    $discount_amount = (float) ($feeAmount->discount_amount / 100) *  (float) $feeAmount->amount;
                                } else {
                                    $discount_amount = (float) $feeAmount->discount_amount;
                                }
                            }

                            $fee_amount = $feeAmount->semester != null ? (float) $feeAmount->amount * $feeAmount->semester : (float) $feeAmount->amount;
                            $total_amount += $fee_amount;
                            $paid_amount = $feeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $total_paid += $paid_amount;
                            $discount_amount = $discount_amount > (float) $fee_amount ? (float) $fee_amount : (float) $discount_amount;

                            if ($feeAmount->nullify_fee != null) {
                                $due_amount = 0;
                                $status = PaymentStatus::PAID->value;
                            } else {
                                // $due_amount = (float) $feeAmount?->payment?->due_amount ?? 0;
                                // $due_amount = $fee_amount;

                                // if ($feeAmount->payment != null) {
                                //     // $due_amount = (float) $feeAmount->payment->due_amount ?? 0;
                                //     $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                // }
                                $due_amount = $fee_amount - $discount_amount - $paid_amount;

                                $status = $feeAmount?->payment?->payment_status;
                            }

                            $payable_amount = $due_amount;
                            $total_payable += $payable_amount;

                            $total_due += $due_amount;

                            if ($status == PaymentStatus::CANCELLED->value) {
                                $status = PaymentStatus::DUE->value;
                            }

                            if ($due_amount <= 0 && empty($feeAmount['payment'])) {
                                $status = PaymentStatus::DUE->value;
                            } else if ($due_amount <= 0) {
                                $status = PaymentStatus::PAID->value;
                            } else if ($due_amount > 0 && !empty($feeAmount['payment'])) {
                                $status = PaymentStatus::PARTIAL->value;
                            }

                            if ($status == PaymentStatus::PAID->value) {
                                $paid_status_count++;
                            } else if ($status == PaymentStatus::PARTIAL->value) {
                                $partial_status_count++;
                            } else {
                                $due_status_count++;
                            }

                            $newFeeAmountData = [
                                'id' => $feeAmount->id,
                                'class_fee_structure_id' => $feeAmount->class_fee_structure_id,
                                'class_name_id' => $feeAmount->class_name_id,
                                'student_id' => $feeAmount->student_id,
                                'fee_id' => $feeAmount->fee_id,
                                'fee_type_id' => $feeAmount->fee_type_id,
                                'fee_type_title' => $feeAmount->feeType->fee_type,
                                'semester' => $feeAmount->semester,
                                'amount' => $fee_amount,
                                'payable_amount' => $payable_amount,
                                'paid_amount' =>  $paid_amount,
                                'due_amount' => $due_amount,
                                'discount_amount' => $discount_amount,
                                'is_discount_percentage' => $feeAmount->is_discount_percentage,
                                'is_fee_special' => $feeAmount->is_fee_special,
                                'payment_status' => $status ?? PaymentStatus::DUE->value,
                            ];

                            $studentFeeStructureData[$feeId]['fee_type_amounts'][] = $newFeeAmountData;
                        }

                        if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                            $payment_status =  PaymentStatus::PAID->value;
                        } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                            $payment_status = PaymentStatus::PARTIAL->value;
                        } else {
                            $payment_status = PaymentStatus::DUE->value;
                        }

                        $studentFeeStructureData[$feeId]['total_amount'] = $total_amount;
                        $studentFeeStructureData[$feeId]['total_payable'] = $total_payable;
                        $studentFeeStructureData[$feeId]['total_paid'] = $total_paid;
                        $studentFeeStructureData[$feeId]['total_due'] = $total_due;
                        $studentFeeStructureData[$feeId]['payment_status'] = $payment_status;
                    }
                }
            }
        }

        $groupedStudents = [
            'active' => [
                'student_type' => 'Active',
                'options' => $activeStudents
            ],
            'inactive' => [
                'student_type' => 'InActive',
                'options' => $inactiveStudents
            ],
            'tc' => [
                'student_type' => 'TC',
                'options' => $tcStudents
            ],
        ];

        return Inertia::render('Fee/UpdateClassFeeStructure', [
            'fees' => $fees,
            'feeTypes' => $feeTypes,
            'classrooms' => $classrooms,
            'students' => $groupedStudents,
            'student' => $student,
            'studentFeeStructure' => $studentFeeStructureData,
        ]);
    }

    /**
     * update student fee structure.
     */
    public function updateStudentFeeStructure(UpdateStudentFeeStructureRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $studentFeeStructureIdsToUpdate = [];

            $student = $this->studentRepository->getById($input['student_id']);

            $canUpdate = false;

            if (
                $student->student_status == StudentStatus::NEW->value ||
                (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $input['is_admission_installment'] == false)
            ) {
                $canUpdate = true;
            }

            if ($canUpdate) {
                foreach ($input['fee_type_amount_array'] as $feeTypeAmount) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'class_name_id' => $input['class_name_id'],
                        'student_id' => $student->id,
                        'fee_id' => $feeTypeAmount['fee_id'],
                        'fee_type_id' => $feeTypeAmount['fee_type_id'],
                    ];

                    $valuesToUpdate = [
                        'amount' => $feeTypeAmount['amount'],
                        'is_admission_installment' => !empty($input['is_admission_installment']) ? $input['is_admission_installment'] : 0,
                        'is_fee_special' => $feeTypeAmount['is_fee_special'],
                        'semester' => $feeTypeAmount['semester'] ?? null,
                        'status' => $input['status'] ?? Status::ACTIVE,
                    ];

                    $studentFeeStructure = $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($attributesToCheck, $valuesToUpdate);

                    $studentFeeStructureIdsToUpdate[] = $studentFeeStructure->id;
                }

                // new
                $this->classFeeStudentAmountRepository->deleteClassFeeStudentAmountsByStudentIdAndFeeId($student->id, $input['fee_type_amount_array'][0]['fee_id'], $studentFeeStructureIdsToUpdate);

                // old
                // ClassFeeStudentAmount::where('school_id', getUserSchoolId())
                //     ->where('academic_year_id', getAcademicYearId())
                //     ->where('student_id', $student->id)
                //     ->where('fee_id', $input['fee_type_amount_array'][0]['fee_id'])
                //     ->whereNotIn('id', $studentFeeStructureIdsToUpdate)
                //     ->delete();
            }

            DB::commit();

            return redirect()->back()->with('message', 'Fee structure updated successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    // public function getStudentFeeStructure(Request $request)
    // {
    //     $studentFeeStructure = $this->feeStructureRepository->getFeeStructureByStudentId($request->student_id);

    //     $studentFeeStructureData = [];

    //     if (count($studentFeeStructure) > 0) {
    //         foreach ($studentFeeStructure->groupBy('fee_id') as $feeId => $feeAmountData) {
    //             $studentFeeStructureData[$feeId]['fee'] = [
    //                 'id' => $feeAmountData->first()->fee->id,
    //                 'title' => $feeAmountData->first()->fee->title,
    //                 'is_admission_install' => $feeAmountData->first()->fee->is_admission_install,
    //             ];

    //             $total_amount = 0;
    //             $total_payable = 0;
    //             $total_paid = 0;
    //             $total_due = 0;

    //             $paid_status_count = 0;
    //             $partial_status_count = 0;
    //             $due_status_count = 0;

    //             foreach ($feeAmountData as $feeAmount) {
    //                 if ($feeAmount?->payment != null) {
    //                     $discount_amount = (float) $feeAmount?->fee_payments?->sum('discount_amount') ?? 0;
    //                 } else {
    //                     if ($feeAmount->is_discount_percentage) {
    //                         $discount_amount = (float) ($feeAmount->discount_amount / 100) *  (float) $feeAmount->amount;
    //                     } else {
    //                         $discount_amount = (float) $feeAmount->discount_amount;
    //                     }
    //                 }

    //                 $fee_amount = $feeAmount->semester != null ? (float) $feeAmount->amount * $feeAmount->semester : (float) $feeAmount->amount;
    //                 $total_amount += $fee_amount;
    //                 $paid_amount = $feeAmount?->fee_payments?->sum('paid_amount') ?? 0;
    //                 $total_paid += $paid_amount;
    //                 $discount_amount = $discount_amount > (float) $fee_amount ? (float) $fee_amount : (float) $discount_amount;
    //                 $payable_amount = $fee_amount - $discount_amount;
    //                 $total_payable += $payable_amount;

    //                 if ($feeAmount->nullify_fee != null) {
    //                     $due_amount = 0;
    //                     $status = PaymentStatus::PAID;
    //                     $paid_status_count++;
    //                 } else {
    //                     $due_amount = (float) $feeAmount?->payment?->due_amount ?? 0;
    //                     $status = $feeAmount?->payment?->payment_status;

    //                     if ($status === PaymentStatus::PAID->value) {
    //                         $paid_status_count++;
    //                     } else if ($status === PaymentStatus::PARTIAL->value) {
    //                         $partial_status_count++;
    //                     } else {
    //                         $due_status_count++;
    //                     }
    //                 }

    //                 // $due_amount = (float) $feeAmount?->payment?->due_amount ?? 0;
    //                 $total_due += $due_amount;

    //                 // $status = $feeAmount?->payment?->payment_status;

    //                 $newFeeAmountData = [
    //                     'id' => $feeAmount->id,
    //                     'class_fee_structure_id' => $feeAmount->class_fee_structure_id,
    //                     'class_name_id' => $feeAmount->class_name_id,
    //                     'student_id' => $feeAmount->student_id,
    //                     'fee_id' => $feeAmount->fee_id,
    //                     'fee_type_id' => $feeAmount->fee_type_id,
    //                     'fee_type_title' => $feeAmount->feeType->fee_type,
    //                     'semester' => $feeAmount->semester,
    //                     'amount' => $fee_amount,
    //                     'payable_amount' => $payable_amount,
    //                     'paid_amount' =>  $paid_amount,
    //                     'due_amount' => $due_amount,
    //                     'discount_amount' => $discount_amount,
    //                     'is_discount_percentage' => $feeAmount->is_discount_percentage,
    //                     'is_fee_special' => $feeAmount->is_fee_special,
    //                     'payment_status' => $status ?? PaymentStatus::DUE,
    //                 ];

    //                 $studentFeeStructureData[$feeId]['fee_type_amounts'][] = $newFeeAmountData;

    //                 // if ($status === PaymentStatus::PAID->value) {
    //                 //     $paid_status_count++;
    //                 // } else if ($status === PaymentStatus::PARTIAL->value) {
    //                 //     $partial_status_count++;
    //                 // } else {
    //                 //     $due_status_count++;
    //                 // }
    //             }

    //             if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
    //                 $payment_status =  PaymentStatus::PAID;
    //             } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
    //                 $payment_status = PaymentStatus::PARTIAL;
    //             } else {
    //                 $payment_status = PaymentStatus::DUE;
    //             }

    //             $studentFeeStructureData[$feeId]['total_amount'] = $total_amount;
    //             $studentFeeStructureData[$feeId]['total_payable'] = $total_payable;
    //             $studentFeeStructureData[$feeId]['total_paid'] = $total_paid;
    //             $studentFeeStructureData[$feeId]['total_due'] = $total_due;
    //             $studentFeeStructureData[$feeId]['payment_status'] = $payment_status;
    //         }
    //     }

    //     // $transformedData = [];

    //     // if (count($studentFeeStructure) > 0) {
    //     //     foreach ($studentFeeStructure->groupBy('fee_id') as $feeId => $feeAmountData) {
    //     //         $transformedData[$feeId]['fee'] = [
    //     //             'id' => $feeAmountData->first()->fee->id,
    //     //             'title' => $feeAmountData->first()->fee->title,
    //     //         ];

    //     //         $total_amount = 0;
    //     //         $total_paid = 0;

    //     //         foreach ($feeAmountData as $feeAmount) {
    //     //             $total_amount += ($feeAmount->amount - $feeAmount->discount_amount);
    //     //             $total_paid += $feeAmount?->payment?->paid_amount ?? 0;

    //     //             if ($feeAmount?->payment != null) {
    //     //                 $discount_amount = (float) $feeAmount?->payment?->discount_amount;
    //     //             } else {
    //     //                 if ($feeAmount->is_discount_percentage) {
    //     //                     $discount_amount = (float) ($feeAmount->discount_amount / 100) *  (float) $feeAmount->amount;
    //     //                 } else {
    //     //                     $discount_amount = (float) $feeAmount->discount_amount;
    //     //                 }
    //     //             }

    //     //             $newFeeAmountData = [
    //     //                 'id' => $feeAmount->id,
    //     //                 'class_fee_structure_id' => $feeAmount->class_fee_structure_id,
    //     //                 'class_name_id' => $feeAmount->class_name_id,
    //     //                 'student_id' => $feeAmount->student_id,
    //     //                 'fee_id' => $feeAmount->fee_id,
    //     //                 'fee_type_id' => $feeAmount->fee_type_id,
    //     //                 'fee_type_title' => $feeAmount->feeType->fee_type,
    //     //                 'amount' => (float) $feeAmount->amount,
    //     //                 'paid_amount' => (float) $feeAmount?->payment?->paid_amount,
    //     //                 'due_amount' => (float) $feeAmount?->payment?->due_amount,
    //     //                 'discount_amount' => $discount_amount > (float) $feeAmount->amount ? (float) $feeAmount->amount : (float) $discount_amount,
    //     //                 'is_discount_percentage' => $feeAmount->is_discount_percentage,
    //     //                 'is_fee_special' => $feeAmount->is_fee_special,
    //     //             ];

    //     //             $transformedData[$feeId]['fee_type_amounts'][] = $newFeeAmountData;
    //     //         }

    //     //         $total_due = $total_amount - $total_paid;

    //     //         if ($total_due == 0) {
    //     //             $payment_status =  PaymentStatus::PAID;
    //     //         } else if ($total_due > 0 && $total_due < $total_amount) {
    //     //             $payment_status =  PaymentStatus::PARTIAL;
    //     //         } else {
    //     //             $payment_status = PaymentStatus::DUE;
    //     //         }

    //     //         $transformedData[$feeId]['total_amount'] = $total_amount;
    //     //         $transformedData[$feeId]['total_paid'] = $total_paid;
    //     //         $transformedData[$feeId]['total_due'] = $total_due;
    //     //         $transformedData[$feeId]['payment_status'] = $payment_status;
    //     //     }
    //     // }

    //     return redirect()->back()->with([
    //         // 'studentFeeStructure' => $transformedData
    //         'studentFeeStructure' => $studentFeeStructureData
    //     ]);
    // }

    /**
     * Display the assignFeeToStudent.
     */
    public function assignFeeToStudent(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $feeStructures = $this->feeStructureRepository->getActiveAll();

        if (count($feeStructures) > 0) {
            $feeStructures->load(['classNames']);

            $feeStructures = $feeStructures->map(function ($feeStructure) {
                $classNameIds = $feeStructure->classNames->pluck('id')->toArray();
                $classrooms = $this->classroomRepository->getActiveNameAndIdByClassNameIds($classNameIds);
                $classroomIds = $classrooms->pluck('id')->toArray();

                return [
                    'id' => $feeStructure->id,
                    'title' => $feeStructure->title,
                    'classroom_ids' => array_unique($classroomIds),
                ];
            });
        }

        $employmentCategoryTypes = $this->categoryRepository->getEmploymentCategory();
        $studentsWithFeeStructure = [];
        $classFeeStructure = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->input('classroom_id'))) {
                $studentsWithFeeStructure = $this->feeStructureRepository->getstudentsWithFeeStructure($request->classroom_id, $request->employment_cat_id);

                if (!empty($studentsWithFeeStructure)) {
                    $studentsWithFeeStructure = $studentsWithFeeStructure?->map(function ($student) {
                        $student->loadMissing(['promotedClassroom']);

                        if ($student?->promotedClassroom != null) {
                            unset($student['classroom']);

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });
                }
            }

            if (!empty($request->input('fee_structure_id'))) {
                $classFeeStructure = $this->getClassFeeStructureById($request->input('fee_structure_id'));
            }
        }

        return Inertia::render('Fee/AssignFeeToStudent', [
            'classrooms' => $classrooms,
            'employmentCategoryTypes' => $employmentCategoryTypes,
            'feeStructures' => $feeStructures,
            'studentsWithFeeStructure' => $studentsWithFeeStructure,
            'classFeeStructure' => $classFeeStructure
        ]);
    }


    /*
    *  helper method to get fee structure by id
    */
    protected function getClassFeeStructureById(int $classFeeStructureId)
    {
        $fees = $this->feeRepository->getActiveAll();
        $classFeeStructure = $this->feeStructureRepository->getSessionWiseById($classFeeStructureId);
        $classFeeStructure->load(['class_fee_structure_amounts.feeType']);

        if (count($classFeeStructure->class_fee_structure_amounts) > 0) {
            $uniqueAmounts = $classFeeStructure->class_fee_structure_amounts->groupBy('class_name_id')->first();
            $classFeeStructure->setRelation(
                'class_fee_structure_amounts',
                $uniqueAmounts
            );
        }

        $classFeeStructureData = [
            'id' => $classFeeStructure->id,
            'title' => $classFeeStructure->title,
            'description' => $classFeeStructure->description,
            'structure_type' => $classFeeStructure->structure_type,
        ];

        $studentTypes = [StudentStatus::NEW->value, StudentStatus::OLD->value];

        foreach ($fees as $fee) {
            foreach ($studentTypes as $studentType) {
                $total_amount = 0;
                $feeTypeAmountArray = [];

                if (count($classFeeStructure->class_fee_structure_amounts) > 0) {
                    foreach ($classFeeStructure->class_fee_structure_amounts as $feeAmount) {
                        if ($feeAmount->fee_id === $fee->id && $studentType == $feeAmount->student_status) {
                            $feeTypeAmountArray[] = [
                                'id' => $feeAmount->id,
                                'fee_id' => $feeAmount->fee_id,
                                'fee_type_id' => $feeAmount->fee_type_id,
                                'fee_type_title' => $feeAmount->feeType->title,
                                'amount' => (float) $feeAmount->amount,
                                'semester' => $feeAmount->semester,
                                'is_fee_special' => $feeAmount->is_fee_special,
                            ];

                            $total_amount += ((float) $feeAmount->amount * ($feeAmount->semester ?? 1)) ?? 0;
                        }
                    }
                }

                $classFeeStructureData[$studentType]['fees'][$fee->id]['fee'] = [
                    'id' => $fee->id,
                    'title' => $fee->title,
                ];

                $classFeeStructureData[$studentType]['fees'][$fee->id]['fee_type_amount_array'] = $feeTypeAmountArray;
                $classFeeStructureData[$studentType]['fees'][$fee->id]['total_amount'] = $total_amount;
            }
        }

        return $classFeeStructureData;
    }

    /*
    *  assign fee structure to student
    */
    public function saveAssignFeeToStudent(AssignFeeStructureToStudentRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $students = $this->studentRepository->getActiveAllByIds($input['student_ids']);

            if ($students->count() > 0) {
                $students->loadMissing(['promotedClassroom']);

                $students = $students?->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                    }

                    return $student;
                });
            }

            $feeStructure = $this->feeStructureRepository->getById($input['fee_structure_id']);
            $feeStructure->load(['class_fee_structure_amounts']);

            if (count($feeStructure->class_fee_structure_amounts) > 0) {
                $uniqueAmounts = $feeStructure->class_fee_structure_amounts->groupBy('class_name_id')->first();
                $feeStructure->setRelation('class_fee_structure_amounts', $uniqueAmounts);
            }

            $students->each(function ($student) use ($feeStructure) {
                // old code
                // if ($student->classroom_fee_student_amounts->count() <= 0) {
                //     if (count($feeStructure->class_fee_structure_amounts) > 0) {
                //         foreach ($feeStructure->class_fee_structure_amounts as $feeAmount) {
                //             $attributesToCheck = array(
                //                 'school_id' => getUserSchoolId(),
                //                 'academic_year_id' => getAcademicYearId(),
                //                 'student_id' => $student->id,
                //                 'class_name_id' => $student->class_name_id,
                //                 'class_fee_structure_id' => $feeStructure->id,
                //                 'fee_id' => $feeAmount['fee_id'],
                //                 'fee_type_id' => $feeAmount['fee_type_id'],
                //             );

                //             $valuesToUpdate = array(
                //                 'amount' => !empty($feeAmount['amount']) ? $feeAmount['amount'] : 0,
                //                 'semester' => !empty($feeAmount['semester']) ? $feeAmount['semester'] : null,
                //                 'is_special' => !empty($feeAmount['is_special']) ? $feeAmount['is_special'] : 0,
                //                 'status' => Status::ACTIVE,
                //             );

                //             $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($attributesToCheck, $valuesToUpdate);
                //         }
                //     }
                // }

                if (count($feeStructure->class_fee_structure_amounts) > 0) {
                    foreach ($feeStructure->class_fee_structure_amounts as $feeAmount) {
                        $attributesToCheck = array(
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'student_id' => $student->id,
                            'class_name_id' => $student->class_name_id,
                            'class_fee_structure_id' => $feeStructure->id,
                            'fee_id' => $feeAmount['fee_id'],
                            'fee_type_id' => $feeAmount['fee_type_id'],
                        );

                        $valuesToUpdate = array(
                            'amount' => !empty($feeAmount['amount']) ? $feeAmount['amount'] : 0,
                            'semester' => !empty($feeAmount['semester']) ? $feeAmount['semester'] : null,
                            'is_special' => !empty($feeAmount['is_special']) ? $feeAmount['is_special'] : 0,
                            'status' => Status::ACTIVE,
                        );

                        $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($attributesToCheck, $valuesToUpdate);
                    }
                }
            });

            DB::commit();

            return redirect()->back()->with('message', 'Fee structure associated to student successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *  remove student fee structure
    */
    public function deleteStudentFeeStructure(int $id)
    {
        DB::beginTransaction();

        try {
            $student = $this->studentRepository->getStudentDataById($id);

            abort_if($student == null, 404);

            $student->loadMissing(['fee_payments' => function ($query) {
                $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId())
                    ->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
            }]);

            if ($student->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->count() > 0) {
                return redirect()->back()->with('error', 'Could not process, first delete payment for this student.');
            }

            $student->classroom_fee_student_amounts()->where('academic_year_id', getAcademicYearId())->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Student fee structure removed successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    // need to review this code start
    public function getStudentsWithFeeStructure(Request $request)
    {
        $studentsWithFeeStructure = $this->feeStructureRepository->getstudentsWithFeeStructure($request->classroom_id, $request->employment_cat_id);

        return redirect()->back()->with([
            'studentsWithFeeStructure' => $studentsWithFeeStructure,
        ]);
    }
    // need to review this code end


    // public function getClassFeeStructureById(ClassFeeStructure $classFeeStructure)
    // {
    //     $fees = $this->feeRepository->getActiveAll();
    //     $classFeeStructure->load(['class_fee_structure_amounts.feeType']);
    //     $uniqueAmounts = $classFeeStructure->class_fee_structure_amounts->groupBy('class_name_id')->first();
    //     $classFeeStructure->setRelation('class_fee_structure_amounts', $uniqueAmounts);

    //     $classFeeStructureData = [
    //         'id' => $classFeeStructure->id,
    //         'title' => $classFeeStructure->title,
    //         'description' => $classFeeStructure->description,
    //         'structure_type' => $classFeeStructure->structure_type,
    //     ];

    //     foreach ($fees as $fee) {
    //         $feeTypeAmountArray = [];
    //         $total_amount = 0;

    //         foreach ($classFeeStructure->class_fee_structure_amounts as $feeAmount) {
    //             if ($feeAmount->fee_id === $fee->id) {
    //                 $feeTypeAmountArray[] = [
    //                     'id' => $feeAmount->id,
    //                     'fee_id' => $feeAmount->fee_id,
    //                     'fee_type_id' => $feeAmount->fee_type_id,
    //                     'fee_type_title' => $feeAmount->feeType->title,
    //                     'amount' => (float) $feeAmount->amount,
    //                     'semester' => $feeAmount->semester,
    //                     'is_fee_special' => $feeAmount->is_fee_special,
    //                 ];

    //                 $total_amount += ((float) $feeAmount->amount * ($feeAmount->semester ?? 1)) ?? 0;
    //             }
    //         }

    //         $classFeeStructureData['fees'][$fee->id]['fee'] = [
    //             'id' => $fee->id,
    //             'title' => $fee->title,
    //         ];
    //         $classFeeStructureData['fees'][$fee->id]['fee_type_amount_array'] = $feeTypeAmountArray;
    //         $classFeeStructureData['fees'][$fee->id]['total_amount'] = $total_amount;
    //     }

    //     return redirect()->back()->with([
    //         'classFeeStructureById' => $classFeeStructureData
    //     ]);
    // }


    /**
     * Display the update Fee To Student.
     */
    public function updateFeeToStudent(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $students = $this->studentRepository->getStudentsByBoardingType(ScholarBoardingType::BOARDING->value);

        if (count($students) > 0) {
            $students->loadMissing(['promotedClassroom']);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                return [
                    'id' => $student->id,
                    'admission_no' => $student->admission_no,
                    'title' => "{$student->first_name} {$student->middle_name} {$student->last_name}",
                    'classroom_id' => $student->classroom_id,
                    'class_name_id' => $student->class_name_id,
                    'boarding_type' => $student->boarding_type,
                ];
            });
        }

        $feeStructureLists = [];
        $studentFeeInstallments = [];

        if ($request->isMethod('POST')) {
            $studentFeeInstallments = [];

            if (!empty($request->student_id)) {
                $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($request->student_id);

                $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($request->student_id);

                foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                    $total_fee_amount = 0;
                    $total_paid_amount = 0;
                    $total_due_amount = 0;
                    $total_discount_amount = 0;

                    $paid_status_count = 0;
                    $partial_status_count = 0;
                    $due_status_count = 0;

                    foreach ($feeInstallments as $feeInstallment) {
                        $fee_amount = ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);
                        $due_amount = $fee_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($feeInstallment?->payment != null) {
                            $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;

                            // $total_discount_amount += (float) $feeInstallment?->payment?->discount_amount ?? 0;
                        } elseif ($studentFeeDiscounts->count() > 0) {
                            foreach ($studentFeeDiscounts as $discount) {
                                if ($discount->fee_id === $feeInstallment->fee_id && $discount->fee_type_id === $feeInstallment->fee_type_id) {
                                    if ($discount->is_discount_percentage) {
                                        // $total_discount_amount += (float) ($discount->amount / 100) * ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);
                                        $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);
                                    } else {
                                        // $total_discount_amount += (float) $discount->amount;
                                        $discount_amount = (float) $discount->amount;
                                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                    }
                                }
                            }
                        }

                        // $total_paid_amount += (float) $feeInstallment?->payment?->paid_amount ?? 0;
                        // $total_due_amount += (float) $feeInstallment?->payment?->due_amount ?? 0;
                        $total_fee_amount += $fee_amount;
                        $total_paid_amount += $paid_amount;
                        $total_due_amount += $due_amount;
                        $total_discount_amount += $discount_amount;

                        $status = $feeInstallment?->payment?->payment_status;

                        if (!isset($studentFeeInstallments[$feeInstallmentId]['fee'])) {
                            $studentFeeInstallments[$feeInstallmentId]['fee'] = [
                                'id' => $feeInstallment->fee_id,
                                'title' => $feeInstallment->fee->title,
                            ];
                        }

                        if ($status == PaymentStatus::CANCELLED->value) {
                            $status = PaymentStatus::DUE->value;
                        }

                        if ($due_amount <= 0) {
                            $status = PaymentStatus::PAID->value;
                        } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                            $status = PaymentStatus::PARTIAL->value;
                        }

                        if ($status == PaymentStatus::PAID->value) {
                            $paid_status_count++;
                        } else if ($status == PaymentStatus::PARTIAL->value) {
                            $partial_status_count++;
                        } else {
                            $due_status_count++;
                        }
                    }

                    if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                        $payment_status =  PaymentStatus::PAID->value;
                    } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                        $payment_status = PaymentStatus::PARTIAL->value;
                    } else {
                        $payment_status = PaymentStatus::DUE->value;
                    }

                    $studentFeeInstallments[$feeInstallmentId]['total_payable_amount'] = $total_fee_amount - $total_discount_amount;
                    $studentFeeInstallments[$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                    $studentFeeInstallments[$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                    $studentFeeInstallments[$feeInstallmentId]['payment_status'] = $payment_status;
                }

                $feeStructures = $this->feeStructureRepository->getFeeStructures(StructureType::DAYSCHOLAR->value);

                foreach ($feeStructures as $index => $feeStructure) {
                    $feeStructureLists[$index]['id'] = $feeStructure->id;
                    $feeStructureLists[$index]['title'] = $feeStructure->title;
                    $feeStructureLists[$index]['structure_type'] = $feeStructure->structure_type;

                    $uniqueAmounts = $feeStructure->class_fee_structure_amounts->groupBy('class_name_id')->first();
                    $feeStructure->setRelation('class_fee_structure_amounts', $uniqueAmounts);

                    $class_name_ids = [];

                    foreach ($feeStructure->classNames as $className) {
                        array_push($class_name_ids, $className->id);
                    }

                    $feeStructureLists[$index]['class_name_ids'] = $class_name_ids;

                    foreach ($feeStructure->class_fee_structure_amounts->groupBy('fee_id') as $feeId => $feeAmounts) {
                        $total_fee_amount = 0;

                        foreach ($feeAmounts as $feeAmount) {
                            $feeStructureLists[$index]['fee_installments'][$feeId]['fee_id'] = $feeAmount->fee_id;
                            $feeStructureLists[$index]['fee_installments'][$feeId]['fee_title'] = $feeAmount->fee->title;

                            $total_fee_amount += ($feeAmount->semester != null ? (float) $feeAmount->amount * $feeAmount->semester : (float)        $feeAmount->amount);
                        }

                        $feeStructureLists[$index]['fee_installments'][$feeId]['total_fee_amount'] = $total_fee_amount;
                    }
                }
            }
        }

        return Inertia::render('Fee/UpdateFeeToStudent', [
            'classrooms' => $classrooms,
            'students' => $students,
            'studentFeeInstallments' => $studentFeeInstallments,
            'feeStructureLists' => $feeStructureLists,
        ]);
    }


    public function saveUpdateFeeToStudent(UpdateFeeToStudentRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $student = $this->studentRepository->getById($input['student_id']);

            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            $student->load(['classroom_fee_student_amounts' => function ($query) use ($input) {
                $query->whereIn('fee_id', $input['old_fee_ids'])
                    ->with(['payment']);
            }]);

            $feeIdsToDelete = [];
            $paidFeeIds = [];

            foreach ($student->classroom_fee_student_amounts->groupBy('fee_id') as $feeId => $fees) {
                $hasPayment = false;

                foreach ($fees as $fee) {
                    if ($fee->payment != null) {
                        $hasPayment = true;
                    }
                }

                if ($hasPayment === false) {
                    array_push($feeIdsToDelete, $feeId);
                } else {
                    array_push($paidFeeIds, $feeId);
                }
            }

            // new
            $this->classFeeStudentAmountRepository->deleteStudentFeeAmountsByFeeIdsAndStudent($feeIdsToDelete, $student->id, $student?->classroom?->class_name_id);

            // old
            // ClassFeeStudentAmount::where('school_id', getUserSchoolId())
            //     ->where('academic_year_id', getAcademicYearId())
            //     ->where('student_id', $student->id)
            //     ->where('class_name_id', $student?->classroom?->class_name_id)
            //     ->whereIn('fee_id', $feeIdsToDelete)
            //     ->delete();

            // new
            $feeStructureAmountsToUpdate = $this->feeStructureRepository->getClassFeeStructureAmountsByFeeStructureIdAndFeeIds($input['fee_structure_id'], $input['new_fee_ids']);

            // old
            // $feeStructureAmountsToUpdate = ClassFeeStructureAmount::where('status', Status::ACTIVE)
            //     ->where('school_id', getUserSchoolId())
            //     ->where('academic_year_id', getAcademicYearId())
            //     ->where('class_fee_structure_id', $input['fee_structure_id'])
            //     ->whereIn('fee_id', $input['new_fee_ids'])
            //     ->get();

            foreach ($feeStructureAmountsToUpdate as $feeStructure) {
                if (!in_array($feeStructure->fee_id, $paidFeeIds) && (count($feeIdsToDelete) <= 0 || (count($feeIdsToDelete) > 0 && in_array($feeStructure->fee_id, $feeIdsToDelete)))) {
                    $attributesToCheck = [
                        'school_id' => $feeStructure->school_id,
                        'student_id' => $student->id,
                        'class_name_id' => $student?->classroom?->class_name_id,
                        'fee_id' => $feeStructure->fee_id,
                    ];

                    $valuesToUpdate = [
                        'class_fee_structure_id' => $feeStructure->class_fee_structure_id,
                        'fee_type_id' => $feeStructure->fee_type_id,
                        'amount' => $feeStructure->amount,
                        'semester' => $feeStructure->semester,
                        'is_fee_special' => $feeStructure->is_fee_special,
                        'status' => Status::ACTIVE
                    ];

                    $this->classFeeStudentAmountRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Student fee structure updated successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong.']);
        }
    }

    /**
     * Display the transferDueFee.
     */
    public function transferDueFee(): Response
    {
        $academicYears = $this->academicYearRepository->getPreviousAcademicYears();
        $currentAcademicYear = $this->academicYearRepository->getCurrentAcademicYear();
        $classrooms = $this->classroomRepository->getActiveAllSessionData();

        return Inertia::render('Fee/TransferDueFee', [
            'classrooms' => $classrooms,
            'academicYears' => $academicYears,
            'currentAcademicYear' => $currentAcademicYear,
        ]);
    }

    /*
    *   transfer student previous session due fee
    */
    public function saveTransferDueFee(TransferDueFeeRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // get previous academic year by id
            $academic_year = $this->academicYearRepository->getById($input['academic_year_id']);

            $transferedStudentIds = [];
            $classroomIds = $input['classroom_ids'];
            $includeLateFee = $input['late_fee'] ?? false;

            // check if all students promoted from previous sesion
            $newStudentExists = $this->studentRepository->checkNewStudentExists($classroomIds, null, $academic_year->id);

            if (!$newStudentExists) {
                // check if class name without fee structure exists
                // $classExistsWithoutFeeStructure = $this->classroomRepository->checkClassNamesWithoutFeeStructureExists();

                // get class names from current session
                $currentClassNameIds = $this->classroomRepository->getClassNamesWithFeestructure()
                    ->pluck('id')->toArray();

                // if (!$classExistsWithoutFeeStructure) {
                if (count($currentClassNameIds) > 0) {
                    // students
                    $students = $this->studentRepository->getPreviousSessionStudentsByClassroomIdsAndAcademicYearId($classroomIds, $academic_year->id);

                    if (count($students) > 0) {
                        $students->loadMissing([
                            'promotedClassroomRaw' => function ($query) use ($academic_year) {
                                $query->where('classroom_students.academic_year_id', $academic_year->id)
                                    ->select('classrooms.id', 'classrooms.class_name_id');
                            },
                            'promotedClassroom' => function ($query) {
                                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                                    ->select('classrooms.id', 'classrooms.class_name_id');
                            }
                        ]);

                        $students->transform(function ($student) {
                            if ($student?->promotedClassroomRaw != null) {
                                $student['classroom_id'] = $student->promotedClassroomRaw->id;
                                $student['class_name_id'] = $student->promotedClassroomRaw->class_name_id;
                            }

                            if ($student?->promotedClassroom != null) {
                                $student['promoted_classroom_id'] = $student->promotedClassroom->id;
                                $student['promoted_class_name_id'] = $student->promotedClassroom->class_name_id;
                            }

                            return $student;
                        })->filter(function ($student) use ($currentClassNameIds) {
                            return in_array($student->promoted_class_name_id, $currentClassNameIds);
                        });

                        // student ids
                        $studentIds = $students->groupBy('class_name_id')->map(function ($groupedStudents) {
                            return $groupedStudents->pluck('id')->toArray();
                        })->toArray();

                        // get all due fee installments
                        $dueFeeInstallments = $this->classFeeStudentAmountRepository->getPreviousSessionFeeDues($academic_year->id, $studentIds);

                        if ($dueFeeInstallments->count() > 0) {
                            // Update display order for fees
                            $this->updateFeesDisplayOrder();

                            $previousDueFeeTitle = "Previous_Due(" . $academic_year->academic_session . ")";

                            // if Previous_Due Fee installtment does not exists then create Previous_Due Fee installtment for current session id - table fees
                            $dueFee = $this->createOrUpdateDueFee($previousDueFeeTitle, $academic_year, $input);

                            $lateFeeDate = !empty($input['late_fee_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['late_fee_date'])->format('Y-m-d') : '';

                            // add trasnport fee and late fee to due installments
                            $this->addTransportFeeAndLateFeeToDueInstallments($dueFeeInstallments, $academic_year->id, $includeLateFee, $lateFeeDate);

                            // create student due fee installments
                            $this->createStudentDueFeeInstallments($students, $dueFeeInstallments, $dueFee, $transferedStudentIds, $academic_year->id);
                        }
                    }
                }
            }

            if (count($transferedStudentIds) > 0) {
                DB::commit();
            } else {
                DB::rollBack();

                return redirect()->back()->with(['error' => "Total 0 student's due transfered."]);
            }

            return redirect()->back()->with(['message' => 'Previous due transfered successfully.']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    public function saveTransferDueFee_old(TransferDueFeeRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // get previous academic year by id
            $academic_year = $this->academicYearRepository->getById($input['academic_year_id']);

            // get class names from previous session
            $previousClassNameIds = $this->classroomRepository->getClassNamesByClassroomIds($input['classroom_ids'], $academic_year->id)
                ->pluck('id')->toArray();

            //new code start
            $students = $this->studentRepository->getPreviousSessionStudentsByClassroomIdsAndAcademicYearId($input['classroom_ids'], $academic_year->id);
            //new code end

            // old code start
            // get class names from current session
            // $currentClassNameIds = $this->classroomRepository->getClassNamesWithFeestructure()
            //     ->pluck('id')->toArray();

            // // get students from current session
            // $students = $this->studentRepository->getCurrentSessionStudentsAll();
            // old code end

            $transferedStudentIds = [];

            if (count($students) > 0) {
                $studentIds = $students->pluck('id')->toArray();

                // get all dues
                $dueFeeInstallments = $this->classFeeStudentAmountRepository->getPreviousSessionFeeDues($academic_year->id, $studentIds, $previousClassNameIds);

                // if (count($currentClassNameIds) > 0 && $dueFeeInstallments->count() > 0) {
                if ($dueFeeInstallments->count() > 0) {
                    // Update display order for fees
                    $this->updateFeesDisplayOrder();

                    $previousDueFeeTitle = "Previous_Due(" . $academic_year->academic_session . ")";

                    // if Previous_Due Fee installtment doesnot exists then create Previous_Due Fee installtment for current session id - table fees
                    $dueFee = $this->createOrUpdateDueFee($previousDueFeeTitle, $academic_year, $input);

                    foreach ($students as $student) {
                        $groupedInstallments = $dueFeeInstallments->groupBy(['student_id']);

                        if (!empty($groupedInstallments[$student->id])) {
                            foreach ($groupedInstallments[$student->id]->groupBy('fee_type_id') as $feeTypeId => $feeInstallments) {
                                //check if previous session due fee already transfered to current session
                                $hasTransfered = $this->classFeeStudentAmountRepository->checkPreviousFeeDue($academic_year->id, $student->id, $feeTypeId);

                                if (!$hasTransfered) {
                                    $amount = $feeInstallments->sum(function ($feeInstallment) {
                                        if ($feeInstallment->nullify_fee != null) {
                                            return 0;
                                        } elseif ($feeInstallment->payment != null & $feeInstallment->payment->payment_status != PaymentStatus::CANCELLED->value) {
                                            return (float) $feeInstallment->payment->due_amount ?? 0;
                                        } else {
                                            return (float) $feeInstallment->amount ?? 0 * ($feeInstallment->semester ?? 1);
                                        }
                                    });

                                    $dataArray = [
                                        'school_id' => getUserSchoolId(),
                                        'academic_year_id' => getAcademicYearId(),
                                        'student_id' => $student->id,
                                        'class_name_id' => $student->class_name_id,
                                        'fee_id' => $dueFee->id,
                                        'fee_type_id' => $feeInstallments?->first()?->fee_type_id,
                                        'amount' => $amount,
                                        'is_fee_special' => $feeInstallments?->first()?->is_fee_special,
                                        'is_previous_due' => 1,
                                        'status' => Status::ACTIVE,
                                    ];

                                    // create previous fee dues for current seesion students
                                    $this->classFeeStudentAmountRepository->create($dataArray);

                                    if (!in_array($student->id, $transferedStudentIds)) {
                                        array_push($transferedStudentIds, $student->id);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (count($transferedStudentIds) > 0) {
                DB::commit();
            } else {
                DB::rollBack();
            }

            return redirect()->back()->with(['message' => 'Previous due transfered successfully.']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /*
    *   save student due fee installments
    */
    private function createStudentDueFeeInstallments(
        object $students,
        object $dueFeeInstallments,
        object $dueFee,
        array &$transferedStudentIds,
        int $previousAcademicYearId
    ) {
        foreach ($students as $student) {
            $groupedInstallments = $dueFeeInstallments->groupBy(['student_id']);

            if (!empty($groupedInstallments[$student->id])) {
                $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($student->id, null, $previousAcademicYearId);

                foreach ($groupedInstallments[$student->id]->groupBy('fee_type_id') as $feeTypeId => $feeInstallments) {
                    //check if previous session due fee already transfered to current session
                    // $hasTransfered = $this->classFeeStudentAmountRepository->checkPreviousFeeDue($academic_year->id, $student->id, $feeTypeId, $dueFee->id);
                    $hasTransfered = $this->classFeeStudentAmountRepository->checkPreviousFeeDue(getAcademicYearId(), $student->id, $feeTypeId, $dueFee->id);

                    if (!$hasTransfered) {
                        $amount = $feeInstallments->sum(function ($feeInstallment) use ($studentFeeDiscounts) {
                            if (!empty($feeInstallment['nullify_fee'])) {
                                return 0;
                            } elseif (
                                !empty($feeInstallment['payment']) &&
                                $feeInstallment['payment']['payment_status'] != PaymentStatus::CANCELLED->value
                            ) {
                                return (float) $feeInstallment['payment']['due_amount'] ?? 0;
                            } else {
                                if (count($studentFeeDiscounts) > 0) {
                                    foreach ($studentFeeDiscounts as $discount) {
                                        if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }

                                            $paid_amount = 0;

                                            if (!empty($feeInstallment['fee_payments'])) {
                                                $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                                            }

                                            $fee_amount = (float) $feeInstallment['amount'] ?? 0 * ($feeInstallment['semester'] ?? 1);
                                            $amount = $fee_amount - $discount_amount - $paid_amount;

                                            return $amount < 0 ? 0 : $amount;
                                        }
                                    }
                                }

                                return (float) $feeInstallment['amount'] ?? 0 * ($feeInstallment['semester'] ?? 1);
                            }
                        });

                        // fee installment
                        $feeInstallment = $feeInstallments?->first();

                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'student_id' => $student->id,
                            'class_name_id' => $student?->promoted_class_name_id,
                            'fee_id' => $dueFee->id,
                            'fee_type_id' => $feeInstallment['fee_type_id'] ?? null,
                            'amount' => $amount,
                            'is_fee_special' => $feeInstallment['is_fee_special'] ?? false,
                            'is_previous_due' => 1,
                            'status' => Status::ACTIVE,
                        ];

                        // create previous fee dues for current seesion students
                        $this->classFeeStudentAmountRepository->create($dataArray);

                        if (!in_array($student->id, $transferedStudentIds)) {
                            array_push($transferedStudentIds, $student->id);
                        }
                    }
                }
            }
        }
    }

    /*
    * add transport fee and late fee to due installments
    */
    private function addTransportFeeAndLateFeeToDueInstallments(&$dueFeeInstallments, $previousAcademicYearId, $includeLateFee, $lateFeeDate)
    {
        foreach ($dueFeeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
            foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee', null, $previousAcademicYearId);
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee', null, $previousAcademicYearId);
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee', null, $previousAcademicYearId);

                if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                    if ($currentAllocateTransport != null) {
                        $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                        $transportFeeAmount = (float) $currentAllocateTransport?->amount ?? 0;
                    } else {
                        $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                        $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $studentId,
                        $currentAllocateFeeId,
                        $deallocateTransport?->fee_id,
                        null,
                        $previousAcademicYearId
                    );

                    if (count($allocateTransportFees) > 0) {
                        $transportFee = $this->feeTypeRepository->getTransportFeeType();

                        foreach ($allocateTransportFees as $allocateTransportFee) {
                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                if ($transportFee != null) {
                                    $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                    if ($existedTransportFee == null) {
                                        $newTransportFee = collect([
                                            'id' => null,
                                            'student_id' => $studentId,
                                            'fee_id' => $feeInstallmentId,
                                            'fee_type_id' =>  $transportFee->id,
                                            'amount' =>  $transportFeeAmount,
                                            'semester' => null,
                                            'is_fee_special' => $transportFee->is_fee_special,
                                            'is_extra_charge' => true,
                                            'payment' => null,
                                            'nullify_fee' => null,
                                        ]);

                                        $dueFeeInstallments->push($newTransportFee);
                                    }
                                }
                            }
                        }
                    }
                }

                // add late fee in structure if late fine is available
                if ($includeLateFee) {
                    $fee = $groupedFeeInstallments->first()->fee;

                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                    if ($lateFee != null) {
                        $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();

                        if (
                            $existedLateFee == null &&
                            ($fee->last_pay_date_at != null && $lateFeeDate > $fee->last_pay_date_at)
                        ) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                            if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                $currentDate = $lateFeeDate;
                                $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                if ($lateFineType == LateFineType::DAILY->value) {
                                    $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                    $weeksDifference = floor($daysDifference / 7);
                                    $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                    // Extract year and month from the start date
                                    list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                    // Extract year and month from the current date
                                    list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                    // Calculate the difference in months
                                    $startMonths = ($startYear * 12) + $startMonth;
                                    $currentMonths = ($currentYear * 12) + $currentMonth;
                                    $monthsDifference = $currentMonths - $startMonths;

                                    $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                }
                            }

                            $newLateFee = collect([
                                'id' => null,
                                'student_id' => $studentId,
                                'fee_id' => $feeInstallmentId,
                                'fee_type_id' => $lateFee->id,
                                'amount' => $late_fee_amount,
                                'semester' => null,
                                'is_fee_special' => $lateFee->is_fee_special,
                                'is_extra_charge' => true,
                                'payment' => null,
                                'nullify_fee' => null,
                            ]);

                            $dueFeeInstallments->push($newLateFee);
                        }
                    }
                }
            }
        }
    }

    /**
     * Helper method for update fees display order
     * */

    private function updateFeesDisplayOrder()
    {
        $fees = $this->feeRepository->getActiveAll();
        $fees->each(function ($fee) {
            $fee->installment_no = (int) $fee->installment_no + 1;
            $fee->save();
        });
    }

    /**
     * Helper method for create or get existing due fee
     * */
    private function createOrUpdateDueFee($previousDueFeeTitle, $academicYear, $input)
    {
        $dueFee = $this->feeRepository->getByTitle($previousDueFeeTitle);

        if (!$dueFee) {
            $dueFee = $this->feeRepository->create([
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'installment_no' => 1,
                'title' => $previousDueFeeTitle,
                'start_date_at' => !empty($input['late_fee_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['late_fee_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'end_date_at' => !empty($input['late_fee_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['late_fee_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'last_pay_date_at' => !empty($input['late_fee_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['late_fee_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                // 'start_date_at' => !empty($input['late_fee_date']) ? Carbon::parse($input['late_fee_date'])->format('Y-m-d') : null,
                // 'end_date_at' => !empty($input['late_fee_date']) ? Carbon::parse($input['late_fee_date'])->format('Y-m-d') : null,
                // 'last_pay_date_at' => !empty($input['late_fee_date']) ? Carbon::parse($input['late_fee_date'])->format('Y-m-d') : null,
                'description' => "Last Year Due {$academicYear->academic_session}",
                'status' => Status::ACTIVE,
            ]);
        }

        return $dueFee;
    }

    /**
     * Display the feeSetting.
     */
    public function feeSetting(): Response
    {
        $paymentGatewaySettings = getPaymentGatewaySettings();
        $siteSettingsFee = getSiteSettingDataByType('Fee');
        $siteSettingsAccount = getSiteSettingDataByType('Account');
        $currentAcademicYear = getAcademicYear();

        $templateTags = [];

        foreach (SmsTemplateTag::cases() as $case) {
            array_push($templateTags, ['title' => $case->value, 'value' => implode('', explode(' ', $case->value))]);
        }

        $lateFineTypes = [];

        foreach (LateFineType::cases() as $case) {
            array_push($lateFineTypes, ['title' => $case->value, 'value' => implode('', explode(' ', $case->value))]);
        }

        $backDateStaffIds = $this->backDateStaffRepository->getActiveAll()?->pluck('staff_id')?->toArray();

        $staffs = $this->staffRepository->getActiveAdminStaffs()?->map(function ($staff) {
            return [
                'id' => $staff->id,
                'title' => "{$staff->first_name} {$staff->middle_name} {$staff->last_name}",
            ];
        });

        return Inertia::render('Fee/FeeSetting', [
            'siteSettingsFee' => !empty($siteSettingsFee['Fee']) ? $siteSettingsFee['Fee'] : [],
            'siteSettingsAccount' => !empty($siteSettingsAccount['Account']) ? $siteSettingsAccount['Account'] : [],
            'templateTags' => $templateTags,
            'lateFineTypes' => $lateFineTypes,
            'currentAcademicYear' => $currentAcademicYear,
            'backDateStaffIds' => $backDateStaffIds,
            'staffs' => $staffs,
            'paymentGatewaySettings' => $paymentGatewaySettings
        ]);
    }


    /*
    *  save fee settings
    */
    public function saveFeeSetting(FeeSettingRequest $request): RedirectResponse
    {
        $inputArray = $request->validated();

        DB::beginTransaction();

        try {
            foreach ($inputArray['key_value_array'] as $input) {
                if ($input['key'] == 'fee_late_fine_start_date') {
                    // $input['value'] = !empty($input['value']) ? Carbon::parse($input['value'])->format('Y-m-d') : "";
                    $input['value'] = !empty($input['value']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['value'])->timezone(getSchoolTimeZone())->toDateString() : "";
                }

                if ($input['key'] == 'fee_is_structure_with_template') {
                    $hasFeeStructure = $this->feeStructureRepository->checkFeeStructureExists();

                    if ($hasFeeStructure) {
                        return redirect()->back()->with('error', 'You have already created fee structure for this session,if you want to change setting ,first remove all fee structure!.');
                    }
                }

                if (
                    $input['key'] == 'fee_is_receipt_number_session_wise_enabled' ||
                    $input['key'] == 'fee_receipt_number_session_wise_seed_no'
                ) {
                    $hasPayment = $this->feePaymentRepository->checkFeePaymentExists();

                    if ($hasPayment) {
                        return redirect()->back()->with('error', 'Sorry! You can not change receipt number setting when payment is done, if want to change setting, remove all fee payment for this session.');
                    }
                }

                if (
                    $input['key'] == 'fee_is_voucher_seed_no_enabled' ||
                    $input['key'] == 'fee_voucher_seed_no'
                ) {
                    $hasPayment = $this->feePaymentRepository->checkFeePaymentExists();

                    if ($hasPayment) {
                        return redirect()->back()->with('error', 'Sorry! You can not change receipt number setting when payment is done, if want to change setting, remove all voucher payment for this session.');
                    }
                }

                if (
                    $input['key'] == 'fee_is_registration_seed_no_enabled' ||
                    $input['key'] == 'fee_registration_seed_no'
                ) {
                    $hasPayment = $this->feePaymentRepository->checkRegistrationFeePaymentExists();

                    if ($hasPayment) {
                        return redirect()->back()->with('error', 'Sorry! You can not change receipt number setting when payment is done, if want to change setting, remove all registration payment for this session.');
                    }
                }

                if (
                    $input['key'] == 'fee_is_refund_seed_no_enabled' ||
                    $input['key'] == 'fee_refund_seed_no'
                ) {
                    $hasPayment = $this->feePaymentRefundMethodRepository->checkFeePaymentRefundExists();

                    if ($hasPayment) {
                        return redirect()->back()->with('error', 'Sorry! You can not change receipt number setting when payment is done, if want to change setting, remove all refund payment for this session.');
                    }
                }

                if (
                    $input['key'] == 'fee_is_transport_voucher_seed_no_enabled' ||
                    $input['key'] == 'fee_transport_voucher_seed_no'
                ) {
                    $hasPayment = $this->feePaymentRepository->checkFeePaymentExists();

                    if ($hasPayment) {
                        return redirect()->back()->with('error', 'Sorry! You can not change receipt number setting when payment is done, if want to change setting, remove all transport voucher payment for this session.');
                    }
                }

                if (
                    $input['key'] == 'fee_is_hostel_voucher_seed_no_enabled' ||
                    $input['key'] == 'fee_hostel_voucher_seed_no'
                ) {
                    $hasPayment = $this->feePaymentRepository->checkFeePaymentExists();

                    if ($hasPayment) {
                        return redirect()->back()->with('error', 'Sorry! You can not change receipt number setting when payment is done, if want to change setting, remove all hostel voucher payment for this session.');
                    }
                }

                if ($input['key'] == 'fee_allow_fee_taking_for_back_date' && $input['value'] == 'Yes') {
                    $currentStaffIds = $this->backDateStaffRepository->getActiveAll()?->pluck('staff_id')?->toArray();
                    $newStaffIds = $inputArray['staff_ids'] ?? [];

                    $idsToUpdate = array_diff($newStaffIds, $currentStaffIds);
                    $idsToDelete = array_diff($currentStaffIds, $newStaffIds);

                    $this->backDateStaffRepository->deleteByStaffIds($idsToDelete);

                    if (!empty($idsToUpdate)) {
                        $attributesToCheck = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                        ];

                        foreach ($idsToUpdate as $staffId) {
                            $attributesToCheck['staff_id'] = $staffId;

                            $valuesToUpdate = [
                                'status' => Status::ACTIVE
                            ];

                            $this->backDateStaffRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                        }
                    }
                }

                setSiteSettingData($input['type'], $input['key'], $input['value']);
            }

            DB::commit();

            return redirect()->route('fee.fee_setting')->with('message', 'Fee setting successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('fee.fee_setting')->with('error', 'Something goes wrong.');
        }
    }


    //  assign fee structure to students
    public function saveAssignStudentFeeStructure(Request $request)
    {
        DB::beginTransaction();

        try {
            $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

            if ($isFeeStructureWithTemplate == "Yes") {
                return redirect()->back()->with(['error' => 'Action not done, because Fee Structure of current academic year created through a template.!!']);
            }

            $classFeeStructures = $this->feeStructureRepository->getActiveAll();
            $classFeeStructures->load(['class_fee_structure_amounts']);

            $classFeeStructures = $classFeeStructures->map(function ($feeStructure) {
                $feeStructure->class_fee_structure_amounts->map(function ($structureAmount) use ($feeStructure) {
                    $structureAmount['structure_type'] = $feeStructure->structure_type;

                    return $structureAmount;
                });

                return $feeStructure;
            });

            $classFeeStructureAmounts = $classFeeStructures->pluck('class_fee_structure_amounts')->flatten();

            if ($classFeeStructureAmounts->count() > 0) {
                $classNameIds = $classFeeStructureAmounts->pluck('class_name_id')->unique()->toArray();

                $students = $this->studentRepository->getStudentsByClassNameIds($classNameIds);

                if (!empty($students)) {
                    $students->load(['classroom_fee_student_amounts']);

                    $students = $students->reject(function ($student) {
                        return $student->classroom_fee_student_amounts->contains(function ($feeAmount) {
                            return $feeAmount->class_fee_structure_id != null;
                        });
                    });

                    $students->loadMissing(['promotedClassroom']);

                    $students = $students?->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                        }

                        return $student;
                    });

                    $disallowStructureToEwsStudent = getSiteSettingData('fee_is_disallow_structure_to_ews_student')?->value ?? "No";

                    foreach ($classFeeStructureAmounts->groupBy('class_name_id') as $classNameId => $structureAmounts) {
                        foreach ($students as $student) {
                            foreach ($structureAmounts as $structureAmount) {
                                if (
                                    // ($student->student_status == StudentStatus::NEW->value ||
                                    // (in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $structureAmount->is_admission_installment == false)) &&
                                    // $structureAmount->class_name_id == $student->class_name_id
                                    ($disallowStructureToEwsStudent == "No" || ($disallowStructureToEwsStudent == "Yes" && $student?->is_economically_weaker != true)) &&
                                    $structureAmount->structure_type == $student->boarding_type &&
                                    ($student->student_status == $structureAmount->student_status ||
                                        in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) &&
                                        in_array($structureAmount->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])
                                    ) &&
                                    (
                                        $student->student_status == StudentStatus::NEW->value ||
                                        in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $structureAmount['is_admission_installment'] == false
                                    ) && $structureAmount->class_name_id == $student->class_name_id
                                ) {
                                    $studentAmountAttributesToCheck = array(
                                        'school_id' => $structureAmount->school_id,
                                        'academic_year_id' => $structureAmount->academic_year_id,
                                        'student_id' => $student->id,
                                        'class_name_id' => $student->class_name_id,
                                        // 'class_fee_structure_id' => $structureAmount->class_fee_structure_id,
                                        'fee_id' => $structureAmount->fee_id,
                                        'fee_type_id' => $structureAmount->fee_type_id,
                                    );

                                    $studentAmountValuesToUpdate = array(
                                        'class_fee_structure_id' => $structureAmount->class_fee_structure_id,
                                        'amount' => $structureAmount->amount,
                                        'semester' => $structureAmount->semester,
                                        'is_admission_installment' => $structureAmount->is_admission_installment,
                                        'is_special' => $structureAmount->is_special,
                                        'status' => Status::ACTIVE,
                                    );

                                    $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($studentAmountAttributesToCheck, $studentAmountValuesToUpdate);
                                }
                            }
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Student fee structure assigned successfully.']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    // need to review this code start
    /**
     * Fee filter check form.
     */
    public function getStudentsWithFeesByClassroom(Request $request)
    {
        $classroom_id = $request->input('classroom_id');

        if (!empty($classroom_id) && is_numeric($classroom_id)) {

            $students = $this->studentRepository->getStudentsByClassroomId($classroom_id);
            $installments = $this->feeRepository->getInstallmentArray();
            $feeInstallments = array();

            $students->load([
                'guardians',
                'classroom_fees',
                'classroom_structures_fees.feeType',
                'classroom_fee_student_amounts.feeType',
                'siblings.classroom',
                'notes.activities.user'
            ]);

            $students = $students->each(function ($student) {
                $groupedGuardians = $student['guardians']->groupBy('guardian_type');

                $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
                    return $guardian->toArray();
                })->toArray();

                unset($student['guardians']);

                $student['guardians'] = $groupedGuardiansArray;
            });

            $totalAmounts = [];
            $totalPayableAmounts = [];

            foreach ($students as $stdData) {
                if (!empty($stdData['classroom_fee_student_amounts'])) {
                    foreach ($stdData['classroom_fee_student_amounts'] as $amt) {
                        $tempArray = array(
                            'student_id' => $stdData['id'],
                            'fee_id' => $amt['fee_id'],
                            'fee_title' => $installments[$amt['fee_id']],
                            'total_amount' => 0,
                        );

                        $totalAmounts[$stdData['id']][$amt['fee_id']] = ($totalAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];
                        $totalPayableAmounts[$stdData['id']][$amt['fee_id']] = ($totalPayableAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];

                        $feeTypesArray = array(
                            'id' => $amt->feeType->id,
                            'title' => $amt->feeType->fee_type,
                            'amount' => $amt['amount'],
                            'payable' => $amt['amount'],
                            'semester' => $amt['semester']
                        );

                        if (!isset($feeInstallments[$stdData['id']][$amt['fee_id']])) {
                            $feeInstallments[$stdData['id']][$amt['fee_id']] = $tempArray;
                        }

                        $feeInstallments[$stdData['id']][$amt['fee_id']]['fee_types'][] = $feeTypesArray;
                    }
                }

                if (!empty($stdData['classroom_structures_fees'])) {
                    foreach ($stdData['classroom_structures_fees'] as $amt) {
                        $tempArray = array(
                            'student_id' => $stdData['id'],
                            'fee_id' => $amt['fee_id'],
                            'fee_title' => $installments[$amt['fee_id']],
                            'total_amount' => 0,
                        );

                        $totalAmounts[$stdData['id']][$amt['fee_id']] = ($totalAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];
                        $totalPayableAmounts[$stdData['id']][$amt['fee_id']] = ($totalPayableAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];

                        $feeTypesArray = array(
                            'id' => $amt->feeType->id,
                            'title' => $amt->feeType->fee_type,
                            'amount' => $amt['amount'],
                            'payable' => $amt['amount'],
                            'semester' => $amt['semester']
                        );

                        if (!isset($feeInstallments[$stdData['id']][$amt['fee_id']])) {
                            $feeInstallments[$stdData['id']][$amt['fee_id']] = $tempArray;
                        }

                        $feeInstallments[$stdData['id']][$amt['fee_id']]['fee_types'][] = $feeTypesArray;
                    }
                }
            }

            foreach ($feeInstallments as $studentId => &$studentInstallments) {
                foreach ($studentInstallments as &$feeInstallment) {
                    $feeId = $feeInstallment['fee_id'];

                    if (isset($totalAmounts[$studentId])) {
                        $feeInstallment['total_amount'] = $totalAmounts[$studentId][$feeId];
                    }

                    if (isset($totalPayableAmounts[$studentId])) {
                        $feeInstallment['total_payable'] = $totalPayableAmounts[$studentId][$feeId];
                    }
                }
            }

            return redirect()->back()->with([
                'studentsWithFeesByClassroom' => $students,
                'customData2' => $feeInstallments,
            ]);
        }
    }


    public function getInstallmentsByStudentId(Request $request)
    {
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($request->student_id);

        $studentFeeDiscounts = [];

        if (!empty($request->student_id)) {
            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($request->student_id);
        }

        $feeInstallmentsData = [];

        if (count($feeInstallments) > 0) {
            $total_amount = 0;
            $total_paid = 0;
            $total_refund = 0;

            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = [];

                foreach ($feeInstallments as $feeInstallment) {
                    $total_amount += $feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount;

                    $total_paid += (float) $feeInstallment?->payment?->paid_amount ?? 0;

                    $total_fee_amount += ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);

                    $total_paid_amount += (float) $feeInstallment?->fee_payments?->sum('paid_amount') ?? 0;

                    $total_due_amount += (float) $feeInstallment?->payment?->due_amount ?? 0;

                    $discount_amount = 0;

                    if ($feeInstallment?->payment != null) {
                        $discount_amount = (float) $feeInstallment?->payment?->discount_amount ?? 0;

                        $total_discount_amount += $discount_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment->fee_id && $discount->fee_type_id === $feeInstallment->fee_type_id) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount);

                                    $total_discount_amount += $discount_amount;
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                    $total_discount_amount += $discount_amount;
                                }
                            }
                        }
                    }

                    $status = $feeInstallment?->payment?->payment_status;

                    $feeTypeAmountDataArray[] = [
                        'id' => $feeInstallment->id,
                        'fee_id' => $feeInstallment->fee_id,
                        'fee_type_id' => $feeInstallment->fee_type_id,
                        'fee_type_title' => $feeInstallment->feeType->fee_type,
                        'amount' => $feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount, // need to work on this
                        'payable_amount' => ($feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount) - $feeInstallment?->payment?->paid_amount ?? 0, //need to work on this
                        'paid_amount' => (float) $feeInstallment?->payment?->paid_amount ?? 0, //need to work on this
                        'due_amount' => (float) $feeInstallment?->payment?->due_amount ?? 0,
                        'discount_amount' => $discount_amount,
                        'semester' => (int) $feeInstallment->semester,
                        'is_fee_special' => $feeInstallment->is_fee_special,
                        'payment_status' => $status ?? PaymentStatus::DUE,
                    ];

                    if (!isset($feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee'])) {
                        $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee'] = [
                            'id' => $feeInstallment->fee_id,
                            'title' => $feeInstallment->fee->title,
                        ];
                    }

                    if ($status === 'Paid') {
                        $paid_status_count++;
                    } else if ($status === 'Partial') {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }
                }

                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL;
                } else {
                    $payment_status = PaymentStatus::DUE;
                }

                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['payment_status'] = $payment_status;
            }

            $feeInstallmentsData['total_amount'] = $total_amount;
            $feeInstallmentsData['total_paid'] = $total_paid;
            $feeInstallmentsData['current_due'] = $total_amount - $total_paid;
            $feeInstallmentsData['total_due'] = $total_amount - $total_paid;
            $feeInstallmentsData['total_refund'] = $total_refund;
        }

        return redirect()->back()->with([
            'feeInstallmentsByStudent' => $feeInstallmentsData,
        ]);
    }

    /**
     * Fee filter check form.
     */
    public function getInstallmentsByStudent(Request $request)
    {
        $classroom_id = $request->input('classroom_id');

        if (!empty($classroom_id) && is_numeric($classroom_id)) {
            $students = $this->studentRepository->getStudentsByClassroomId($classroom_id);
            $installments = $this->feeRepository->getInstallmentArray();
            $feeInstallments = array();

            $students->load([
                'guardians',
                'classroom_fees',
                'classroom_structures_fees.feeType',
                'classroom_fee_student_amounts.feeType',
                'siblings.classroom',
                'notes.activities.user'
            ]);

            $students = $students->each(function ($student) {
                $groupedGuardians = $student['guardians']->groupBy('guardian_type');

                $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
                    return $guardian->toArray();
                })->toArray();

                unset($student['guardians']);

                $student['guardians'] = $groupedGuardiansArray;
            });

            $totalAmounts = [];
            $totalPayableAmounts = [];

            foreach ($students as $stdData) {
                if (!empty($stdData['classroom_fee_student_amounts'])) {
                    foreach ($stdData['classroom_fee_student_amounts'] as $amt) {
                        $tempArray = array(
                            'student_id' => $stdData['id'],
                            'fee_id' => $amt['fee_id'],
                            'fee_title' => $installments[$amt['fee_id']],
                            'total_amount' => 0,
                        );

                        $totalAmounts[$stdData['id']][$amt['fee_id']] = ($totalAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];
                        $totalPayableAmounts[$stdData['id']][$amt['fee_id']] = ($totalPayableAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];

                        $feeTypesArray = array(
                            'id' => $amt->feeType->id,
                            'title' => $amt->feeType->fee_type,
                            'amount' => $amt['amount'],
                            'payable' => $amt['amount'],
                            'semester' => $amt['semester']
                        );

                        if (!isset($feeInstallments[$stdData['id']][$amt['fee_id']])) {
                            $feeInstallments[$stdData['id']][$amt['fee_id']] = $tempArray;
                        }

                        $feeInstallments[$stdData['id']][$amt['fee_id']]['fee_types'][] = $feeTypesArray;
                    }
                }

                if (!empty($stdData['classroom_structures_fees'])) {
                    foreach ($stdData['classroom_structures_fees'] as $amt) {
                        $tempArray = array(
                            'student_id' => $stdData['id'],
                            'fee_id' => $amt['fee_id'],
                            'fee_title' => $installments[$amt['fee_id']],
                            'total_amount' => 0,
                        );

                        $totalAmounts[$stdData['id']][$amt['fee_id']] = ($totalAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];
                        $totalPayableAmounts[$stdData['id']][$amt['fee_id']] = ($totalPayableAmounts[$stdData['id']][$amt['fee_id']] ?? 0) + $amt['amount'];

                        $feeTypesArray = array(
                            'id' => $amt->feeType->id,
                            'title' => $amt->feeType->fee_type,
                            'amount' => $amt['amount'],
                            'payable' => $amt['amount'],
                            'semester' => $amt['semester']
                        );

                        if (!isset($feeInstallments[$stdData['id']][$amt['fee_id']])) {
                            $feeInstallments[$stdData['id']][$amt['fee_id']] = $tempArray;
                        }

                        $feeInstallments[$stdData['id']][$amt['fee_id']]['fee_types'][] = $feeTypesArray;
                    }
                }
            }

            foreach ($feeInstallments as $studentId => &$studentInstallments) {
                foreach ($studentInstallments as &$feeInstallment) {
                    $feeId = $feeInstallment['fee_id'];

                    if (isset($totalAmounts[$studentId])) {
                        $feeInstallment['total_amount'] = $totalAmounts[$studentId][$feeId];
                    }

                    if (isset($totalPayableAmounts[$studentId])) {
                        $feeInstallment['total_payable'] = $totalPayableAmounts[$studentId][$feeId];
                    }
                }
            }


            return redirect()->back()->with([
                'customData' => $students,
                'customData2' => $feeInstallments,
            ]);
        }
    }


    public function getBankAcocuntsByStudentId(Request $request)
    {
        $bankAccounts = [];

        if (!empty($request->input('student_id'))) {
            $bankAccounts = $this->bankAccountRepository->getAllByStudentId($request->input('student_id'))->map(function ($bankAccount) {
                $bankAccount['id'] = $bankAccount['id'];
                $bankAccount['title'] = $bankAccount['account_name'];

                return $bankAccount;
            });
        }

        return redirect()->back()->with([
            'bankAccounts' => $bankAccounts,
        ]);
    }
    // need to review this code end

    // do not remove this installment payment old code
    /**
     * Display the installment payment.
     */
    public function installmentPaymentOld(Request $request): Response
    {
        $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
        $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";
        $autoSelectFeeSetting = getSiteSettingData('fee_is_installment_auto_selected');
        $selectFeeSequentiallySetting = getSiteSettingData('fee_is_installment_sequentially_selected');
        $autoSelectFee = $autoSelectFeeSetting != null && $autoSelectFeeSetting?->value == 'Yes';
        $selectFeeSequentially = $selectFeeSequentiallySetting != null && $selectFeeSequentiallySetting?->value == 'Yes';

        $classrooms = $this->classroomRepository->getActiveAll();
        // $classroomIds = $classrooms->pluck('id')->toArray();

        $students = [];

        // old code start
        // $students = $this->studentRepository->getStudentsByClassroomIds($classroomIds);
        // $students->load([
        //     'guardians',
        //     // 'siblings.classroom',
        //     // 'siblingOf.classroom',
        //     'student_notes.createdBy',
        //     'classroomRoll',
        //     'promotedClassroom'
        // ]);

        // $students = $students->each(function ($student) {
        //     $groupedGuardians = $student['guardians']->groupBy('guardian_type');

        //     $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
        //         return $guardian->toArray();
        //     })->toArray();

        //     // $mergedSiblings = $student->siblings->union($student->siblingOf)->toArray();

        //     // unset($student['guardians'], $student['siblings'], $student['siblingOf']);
        //     unset($student['guardians']);

        //     $student['guardians'] = $groupedGuardiansArray;
        //     // $student['siblings'] = $mergedSiblings;
        // });

        // $students = $students->map(function ($student) {
        //     if (count($student->student_notes) > 0) {
        //         $student['student_notes'] = $student?->student_notes?->map(function ($note) {
        //             $note['added_on'] = Carbon::parse($note->created_at)->format('d-M-Y');
        //             return $note;
        //         });
        //     }

        //     if (!empty($student['guardians']['Father'][0])) {
        //         $fatherName = $student['guardians']['Father'][0]['first_name'] ?? "";
        //         $fatherEmail = $student['guardians']['Father'][0]['email'] ?? "";
        //         $fatherPhone = $student['guardians']['Father'][0]['phone'] ?? "";

        //         $student['siblings'] = $this->studentRepository->getSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone);
        //     }

        //     if ($student?->promotedClassroom != null) {
        //         unset($student['classroom']);

        //         $student['classroom_id'] = $student?->promotedClassroom?->id;
        //         $student['classroom'] = $student?->promotedClassroom;
        //     }

        //     return $student;
        // });
        // old code end

        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            $bank['id'] = $bank['id'];
            $bank['title'] = $bank['name'];

            return $bank;
        });

        $paymentModes = [];

        foreach (PaymentMode::cases() as $payment_mode) {
            array_push($paymentModes, ['id' => $payment_mode->value, 'title' => $payment_mode->value]);
        }

        $extraFeeTypes = $this->feeTypeRepository->getExtraFeeTypeAll();

        $studentFeeInstallments = [];
        $studentFeeVouchers = [];
        $studentTransportVouchers = [];
        $studentFeePaymentReports = [];
        $filteredStudents = [];
        $student = null;
        $studentFeeDiscount = null;
        $discounts = [];
        $bankAccounts = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->request_type) && $request->request_type === 'filter_student') {
                $filter_arguments = [
                    'admissionNo' => $request->admission_no ?? "",
                    'studentName' => $request->student_name ?? "",
                    'fatherName' => $request->father_name ?? "",
                    'fatherPhone' => $request->father_mobile ?? "",
                    'motherName' => $request->mother_name ?? "",
                    'motherPhone' => $request->mother_mobile ?? "",
                ];

                $filteredStudents = $this->studentRepository->filterStudents(...$filter_arguments);

                if (count($filteredStudents) > 0) {
                    $filteredStudents->loadMissing(['promotedClassroom']);

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

            if (
                (!empty($request->request_type) && $request->request_type != 'filter_student') &&
                (!empty($request->admission_no) && empty($request->student_id))
            ) {
                $student = $this->studentRepository->getStudentByAdmissionNoAndStudentId($request->admission_no);
            } elseif (!empty($request->student_id)) {
                $student = $this->studentRepository->getStudentByAdmissionNoAndStudentId(null, $request->student_id);
            }

            // old code start
            // if (
            //     (!empty($request->request_type) && $request->request_type != 'filter_student') &&
            //     (!empty($request->admission_no) && empty($request->student_id))
            // ) {
            //     $student = $students->filter(function ($student) use ($request) {
            //         return $student->admission_no == $request->admission_no;
            //     })->first();
            // } elseif (!empty($request->student_id)) {
            //     $student = $students->filter(function ($student) use ($request) {
            //         return $student->id == $request->student_id;
            //     })->first();
            // }
            // old code end


            if ($student != null) {
                // new code start
                $student->loadMissing([
                    'guardians',
                    'student_notes.createdBy',
                    // 'classroomRoll',
                    'promotedClassroom'
                ]);

                $groupedGuardians = $student['guardians']->groupBy('guardian_type');

                $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
                    return $guardian->toArray();
                })->toArray();

                unset($student['guardians']);

                $student['guardians'] = $groupedGuardiansArray;

                if (count($student->student_notes) > 0) {
                    $student['student_notes'] = $student?->student_notes?->map(function ($note) {
                        $note['added_on'] = Carbon::parse($note->created_at)->format('d-M-Y');
                        return $note;
                    });
                }

                if (!empty($student['guardians']['Father'][0])) {
                    $fatherName = $student['guardians']['Father'][0]['first_name'] ?? "";
                    $fatherEmail = $student['guardians']['Father'][0]['email'] ?? "";
                    $fatherPhone = $student['guardians']['Father'][0]['phone'] ?? "";

                    $student['siblings'] = $this->studentRepository->getSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone);
                }

                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }


                $student->loadMissing(['classroomRoll' => function ($query) use ($student) {
                    $query->where('classroom_id', $student->classroom_id);
                }]);
                // new code end

                $bankAccounts = $this->bankAccountRepository->getAllByStudentId($request->input('student_id'))->map(function ($bankAccount) {
                    $bankAccount['id'] = $bankAccount['id'];
                    $bankAccount['title'] = $bankAccount['account_name'];

                    return $bankAccount;
                });

                $discounts = $this->discountRepository->getActiveAll();
                $discounts->load(['discountFeeTypeAmounts']);

                $studentFeeDiscount = $student?->discount;
                $studentFeeInstallments = $this->getFeeInstallmentsByStudentId($student->id);
                $studentFeeVouchers = $this->getFeeVouchersByStudentId($student->id);
                $studentTransportVouchers = $this->getTransportVouchersByStudentId($student->id);
                $studentFeePaymentReports = $this->getStudentFeePaymentReports($student->id);
            }

            // new code start
            $classroomId = $request?->classroom_id ?? $student?->classroom_id;

            if (
                !empty($classroomId) &&
                (
                    empty($request->request_type) ||
                    (!empty($request->request_type) && $request->request_type !== 'filter_student')
                )
            ) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

                $students->load([
                    'guardians',
                    'student_notes.createdBy',
                    'classroomRoll'  => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    },
                    'promotedClassroom'
                ]);

                $students = $students->filter(function ($student) use ($classroomId) {
                    if ($student?->promotedClassroom != null) {
                        return $classroomId == $student?->promotedClassroom?->id;
                    }

                    return $classroomId == $student?->classroom_id;
                })->map(function ($student) {
                    $groupedGuardians = $student['guardians']->groupBy('guardian_type');

                    $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
                        return $guardian->toArray();
                    })->toArray();

                    unset($student['guardians']);

                    $student['guardians'] = $groupedGuardiansArray;

                    if (count($student->student_notes) > 0) {
                        $student['student_notes'] = $student?->student_notes?->map(function ($note) {
                            $note['added_on'] = Carbon::parse($note->created_at)->format('d-M-Y');
                            return $note;
                        });
                    }

                    if (!empty($student['guardians']['Father'][0])) {
                        $fatherName = $student['guardians']['Father'][0]['first_name'] ?? "";
                        $fatherEmail = $student['guardians']['Father'][0]['email'] ?? "";
                        $fatherPhone = $student['guardians']['Father'][0]['phone'] ?? "";

                        $student['siblings'] = $this->studentRepository->getSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone);
                    }

                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    return $student;
                });

                // sort by classroom roll
                // $students = $students->sortBy(function ($student) {
                //     return optional($student->classroomRoll)->roll_no;
                // });
            }
            //new code end
        }

        return Inertia::render('Fee/InstallmentPayment', [
            'classrooms' => $classrooms,
            'students' => $students,
            'banks' => $banks,
            'paymentModes' => $paymentModes,
            'studentFeeInstallments' => $studentFeeInstallments,
            'studentFeeVouchers' => $studentFeeVouchers,
            'studentTransportVouchers' => $studentTransportVouchers,
            'studentFeePaymentReports' => $studentFeePaymentReports,
            'filteredStudentsData' => $filteredStudents,
            'student' => $student,
            'studentFeeDiscount' => $studentFeeDiscount,
            'discounts' => $discounts,
            'bankAccounts' => $bankAccounts,
            'extraFeeTypes' => $extraFeeTypes,
            'autoSelectFee' => $autoSelectFee,
            'selectFeeSequentially' => $selectFeeSequentially,
            'feeReceiptPageSize' => $feeReceiptPageSize,
            'feeReceiptCopy' => $feeReceiptCopy
        ]);
    }

    /**
     * Display the installment payment.
     */
    public function installmentPayment(Request $request): Response
    {
        $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
        $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";
        $autoSelectFeeSetting = getSiteSettingData('fee_is_installment_auto_selected');
        $selectFeeSequentiallySetting = getSiteSettingData('fee_is_installment_sequentially_selected');
        $autoSelectFee = $autoSelectFeeSetting != null && $autoSelectFeeSetting?->value == 'Yes';
        $selectFeeSequentially = $selectFeeSequentiallySetting != null && $selectFeeSequentiallySetting?->value == 'Yes';
        $allowBackDateSetting = getSiteSettingData('fee_allow_fee_taking_for_back_date');
        $isBackDateAllowed = false;

        if ($allowBackDateSetting?->value == 'Yes') {
            $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);

            if ($staff != null) {
                $backDateStaff = $this->backDateStaffRepository->getBackDateStaffByStaffId($staff->id);
                $isBackDateAllowed = $backDateStaff != null;
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        $students = [];

        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            $bank['id'] = $bank['id'];
            $bank['title'] = $bank['name'];

            return $bank;
        });

        // payment mode

        // $paymentModes = [];

        // foreach (PaymentMode::cases() as $payment_mode) {
        //     array_push($paymentModes, ['id' => $payment_mode->value, 'title' => $payment_mode->value]);
        // }

        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->title,
                    'title' => $ledger->title
                ];
            })->toArray();

        $extraFeeTypes = $this->feeTypeRepository->getExtraFeeTypeAll();

        $studentFeeInstallments = [];
        $studentFeeVouchers = [];
        $studentTransportVouchers = [];
        $studentFeePaymentReports = [];
        $filteredStudents = [];
        $student = null;
        $studentFeeDiscount = null;
        $discounts = [];
        // $bankAccounts = [];
        $bankAccounts = $this->bankAccountRepository->getActiveAll()->map(function ($bankAccount) {
            $bankAccount['id'] = $bankAccount['id'];
            $bankAccount['title'] = $bankAccount['account_name'];

            return $bankAccount;
        });

        if ($request->isMethod('POST')) {
            if (!empty($request->request_type) && $request->request_type === 'filter_student') {
                $filter_arguments = [
                    'admissionNo' => $request->admission_no ?? "",
                    'studentName' => $request->student_name ?? "",
                    'fatherName' => $request->father_name ?? "",
                    'fatherPhone' => $request->father_mobile ?? "",
                    'motherName' => $request->mother_name ?? "",
                    'motherPhone' => $request->mother_mobile ?? "",
                ];

                $filteredStudents = $this->studentRepository->filterStudents(...$filter_arguments);

                if (count($filteredStudents) > 0) {
                    $filteredStudents->loadMissing(['promotedClassroom']);

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

            if (
                (!empty($request->request_type) && $request->request_type != 'filter_student') &&
                (!empty($request->admission_no) && empty($request->student_id))
            ) {
                $student = $this->studentRepository->getStudentByAdmissionNoAndStudentId($request->admission_no);
            } elseif (!empty($request->student_id)) {
                $student = $this->studentRepository->getStudentByAdmissionNoAndStudentId(null, $request->student_id);
            }

            if ($student != null) {
                $student->loadMissing([
                    'guardians' => function ($query) {
                        $query->select(
                            'id',
                            'student_id',
                            'guardian_type',
                            'first_name',
                            'middle_name',
                            'last_name',
                            'email',
                            'phone',
                            'sms_phone',
                        );
                    },
                    'student_notes' => function ($query) {
                        $query->where('academic_year_id', getAcademicYearId())
                            ->with(['createdBy' => function ($query) {
                                $query->select(
                                    'id',
                                    'first_name',
                                    'middle_name',
                                    'last_name',
                                );
                            }])->select(
                                'id',
                                'student_id',
                                'created_by',
                                'context',
                                'notes',
                                'note_status',
                                'created_at',
                            );
                    },
                    'promotedClassroom' => function ($query) {
                        $query->select(
                            'classrooms.id',
                            'classrooms.title',
                        );
                    }
                ]);

                $groupedGuardians = $student['guardians']->groupBy('guardian_type');

                $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
                    return $guardian->toArray();
                })->toArray();

                unset($student['guardians']);

                $student['guardians'] = $groupedGuardiansArray;

                if (count($student->student_notes) > 0) {
                    $student['student_notes'] = $student?->student_notes?->map(function ($note) {
                        $note['added_on'] = Carbon::parse($note->created_at)->format('d-M-Y');
                        return $note;
                    });
                }

                if (!empty($student['guardians']['Father'][0])) {
                    $fatherName = $student['guardians']['Father'][0]['first_name'] ?? "";
                    $fatherEmail = $student['guardians']['Father'][0]['email'] ?? "";
                    $fatherPhone = $student['guardians']['Father'][0]['phone'] ?? "";

                    $student['siblings'] = $this->studentRepository->getSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone);
                }

                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }


                $student->loadMissing(['classroomRoll' => function ($query) use ($student) {
                    $query->where('classroom_id', $student->classroom_id)
                        ->select(
                            'id',
                            'student_id',
                            'roll_no',
                        );
                }]);

                // $bankAccounts = $this->bankAccountRepository->getAllByStudentId($student->id)->map(function ($bankAccount) {
                //     $bankAccount['id'] = $bankAccount['id'];
                //     $bankAccount['title'] = $bankAccount['account_name'];

                //     return $bankAccount;
                // });

                $discounts = $this->discountRepository->getActiveAll();
                $discounts->load(['discountFeeTypeAmounts']);

                $studentFeeDiscount = $student?->discount;
                $studentFeeInstallments = $this->getFeeInstallmentsByStudentId($student->id);
                $studentFeeVouchers = $this->getFeeVouchersByStudentId($student->id);
                $studentTransportVouchers = $this->getTransportVouchersByStudentId($student->id);
                $studentFeePaymentReports = $this->getStudentFeePaymentReports($student->id);
            }

            $classroomId = $request?->classroom_id ?? $student?->classroom_id;

            if (!empty($classroomId) && $request?->request_type !== 'filter_student') {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

                $students->loadMissing([
                    'guardians' => function ($query) {
                        $query->select(
                            'id',
                            'student_id',
                            'guardian_type',
                            'first_name',
                            'middle_name',
                            'last_name',
                            'email',
                            'phone',
                            'sms_phone',
                        );
                    },
                    'student_notes' => function ($query) {
                        $query->where('academic_year_id', getAcademicYearId())
                            ->with(['createdBy' => function ($query) {
                                $query->select(
                                    'id',
                                    'first_name',
                                    'middle_name',
                                    'last_name',
                                );
                            }])->select(
                                'id',
                                'student_id',
                                'created_by',
                                'context',
                                'notes',
                                'note_status',
                                'created_at',
                            );
                    },
                    'classroomRoll'  => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId)
                            ->select(
                                'id',
                                'student_id',
                                'roll_no',
                            );
                    },
                    'promotedClassroom' => function ($query) {
                        $query->select(
                            'classrooms.id',
                            'classrooms.title',
                        );
                    }
                ]);

                $students = $students->filter(function ($student) use ($classroomId) {
                    if ($student?->promotedClassroom != null) {
                        return $classroomId == $student?->promotedClassroom?->id;
                    }

                    return $classroomId == $student?->classroom_id;
                })->map(function ($student) {
                    $groupedGuardians = $student['guardians']->groupBy('guardian_type');

                    $groupedGuardiansArray = $groupedGuardians->map(function ($guardian) {
                        return $guardian->toArray();
                    })->toArray();

                    unset($student['guardians']);

                    $student['guardians'] = $groupedGuardiansArray;

                    if (count($student->student_notes) > 0) {
                        $student['student_notes'] = $student?->student_notes?->map(function ($note) {
                            $note['added_on'] = Carbon::parse($note->created_at)->format('d-M-Y');
                            return $note;
                        });
                    }

                    if (!empty($student['guardians']['Father'][0])) {
                        $fatherName = $student['guardians']['Father'][0]['first_name'] ?? "";
                        $fatherEmail = $student['guardians']['Father'][0]['email'] ?? "";
                        $fatherPhone = $student['guardians']['Father'][0]['phone'] ?? "";

                        $student['siblings'] = $this->studentRepository->getSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone);
                    }

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

        return Inertia::render('Fee/InstallmentPayment', [
            'classrooms' => $classrooms,
            'students' => $students,
            'banks' => $banks,
            'paymentModes' => $paymentModes,
            'studentFeeInstallments' => $studentFeeInstallments,
            'studentFeeVouchers' => $studentFeeVouchers,
            'studentTransportVouchers' => $studentTransportVouchers,
            'studentFeePaymentReports' => $studentFeePaymentReports,
            'filteredStudentsData' => $filteredStudents,
            'student' => $student,
            'studentFeeDiscount' => $studentFeeDiscount,
            'discounts' => $discounts,
            'bankAccounts' => $bankAccounts,
            'extraFeeTypes' => $extraFeeTypes,
            'autoSelectFee' => $autoSelectFee,
            'selectFeeSequentially' => $selectFeeSequentially,
            'feeReceiptPageSize' => $feeReceiptPageSize,
            'feeReceiptCopy' => $feeReceiptCopy,
            'isBackDateAllowed' => $isBackDateAllowed
        ]);
    }

    /*
    *   get student fee installments
    */
    protected function getFeeInstallmentsByStudentId(int $studentId)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId);

        if (count($feeInstallments) > 0) {
            $total_amount = 0;
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;
            $total_refund = $this->feePaymentRefundRepository->getStudentTotalRefund($studentId);

            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = [];

                $hasTransportFee = false;

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                if (!$hasPayment) {
                    $fee = $groupedFeeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                            if ($currentAllocateTransport != null) {
                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                $transportFeeAmount = (float) $currentAllocateTransport?->amount ?? 0;
                            } else {
                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                            }

                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                $studentId,
                                $currentAllocateFeeId,
                                $deallocateTransport?->fee_id
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                    if ($allocateTransportFee->id == $feeInstallmentId) {
                                        if ($transportFee != null) {
                                            $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                            if ($existedTransportFee == null) {
                                                $newTransportFee = collect([
                                                    'id' => null,
                                                    'student_id' => $studentId,
                                                    'fee_id' => $feeInstallmentId,
                                                    'fee_type_id' =>  $transportFee->id,
                                                    'amount' =>  $transportFeeAmount,
                                                    'semester' => null,
                                                    'is_fee_special' => $transportFee->is_fee_special,
                                                    'is_extra_charge' => true,
                                                    'feeType' => $transportFee,
                                                    'fee' => $fee,
                                                    'payment' => null,
                                                    'nullify_fee' => null,
                                                ]);

                                                $groupedFeeInstallments->push($newTransportFee);

                                                $hasTransportFee = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // add late fee in structure if late fine is available
                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                    if ($lateFee != null) {
                        $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();
                        // if ($existedLateFee != null) {
                        //     $existedLateFee['amount'] = $late_fee_amount;
                        //     $existedLateFee['is_extra_charge'] = true;
                        // } else {
                        //     if ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at) {
                        //         $newLateFee = collect([
                        //             'id' => null,
                        //             'fee_id' => $feeInstallmentId,
                        //             'fee_type_id' =>  $lateFee->id,
                        //             'amount' => $late_fee_amount,
                        //             'semester' => null,
                        //             'is_fee_special' => $lateFee->is_fee_special,
                        //             'is_extra_charge' => true,
                        //             'feeType' => $lateFee,
                        //             'fee' => $fee->title,
                        //             'payment' => null,
                        //             'nullify_fee' => null,
                        //         ]);

                        //         $feeInstallments->push($newLateFee);
                        //     }
                        // }

                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                            if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                $currentDate = date("Y-m-d");
                                $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                if ($lateFineType == LateFineType::DAILY->value) {
                                    $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                    $weeksDifference = floor($daysDifference / 7);
                                    $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                    // Extract year and month from the start date
                                    list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                    // Extract year and month from the current date
                                    list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                    // Calculate the difference in months
                                    $startMonths = ($startYear * 12) + $startMonth;
                                    $currentMonths = ($currentYear * 12) + $currentMonth;
                                    $monthsDifference = $currentMonths - $startMonths;

                                    $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                }
                            }

                            $newLateFee = collect([
                                'id' => null,
                                'student_id' => $studentId,
                                'fee_id' => $feeInstallmentId,
                                'fee_type_id' =>  $lateFee->id,
                                'amount' => $late_fee_amount,
                                'semester' => null,
                                'is_fee_special' => $lateFee->is_fee_special,
                                'is_extra_charge' => true,
                                'feeType' => $lateFee,
                                'fee' => $fee,
                                'payment' => null,
                                'nullify_fee' => null,
                            ]);

                            $groupedFeeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($groupedFeeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $total_fee_amount += $fee_amount;
                    $paid_amount = 0;
                    $status = PaymentStatus::DUE->value;

                    if (!empty($feeInstallment['payment'])) {
                        $status = $feeInstallment?->payment?->payment_status;
                    }

                    // if (!empty($feeInstallment['fee_payments']) && $status != PaymentStatus::CANCELLED->value) {
                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;
                    $discount_id = null;
                    $hasDiscount = false;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                        // $payable_amount = 0;
                        $status = PaymentStatus::PAID->value;
                        // } elseif (!empty($feeInstallment['payment']) && $status != PaymentStatus::CANCELLED->value) {
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        // $due_amount = (float) $feeInstallment?->payment?->due_amount ?? 0;
                        // $payable_amount = $due_amount;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;

                        if ($discount_amount > 0) {
                            $hasDiscount = true;
                        }
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                // $payable_amount = $fee_amount - $discount_amount;
                                // $due_amount = $payable_amount;
                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $discount_id = $discount?->discount_id;
                                //new
                                $payable_amount = $fee_amount;
                            }
                        }
                    }

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    // $payable_amount = $due_amount;

                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;

                    $is_extra_charge = $feeInstallment['feeType']['installment_type'] == FeeInstallmentType::EXTRACHARGE->value;

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    if ($due_amount <= 0 && empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::DUE->value;
                    } else if ($due_amount <= 0) {
                        $status = PaymentStatus::PAID->value;
                    } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    $feeTypeAmountDataArray[] = [
                        'id' => $feeInstallment['id'],
                        'discount_id' => $discount_id,
                        'fee_id' => $feeInstallment['fee_id'],
                        'fee_type_id' => $feeInstallment['fee_type_id'],
                        'fee_type_title' => $feeInstallment['feeType']['fee_type'],
                        'fee_installment_type' => $feeInstallment['feeType']['installment_type'],
                        'amount' => $fee_amount,
                        'payable_amount' => $payable_amount,
                        'paid_amount' => $paid_amount,
                        'due_amount' => $due_amount,
                        'discount_amount' => $discount_amount,
                        'semester' => (int) $feeInstallment['semester'],
                        'is_fee_special' => $feeInstallment['is_fee_special'],
                        'is_extra_charge' =>  $is_extra_charge,
                        'has_discount' => $hasDiscount,
                        'fee_payment_type' => FeePaymentType::FEEINSTALLMENT->value,
                        'payment_status' => $status,
                    ];

                    if (!isset($feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee'])) {
                        $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee'] = [
                            'id' => $feeInstallment['fee_id'],
                            'title' => $feeInstallment['fee']['title'],
                            'start_date' => $feeInstallment['fee']['start_date_at'] ?? '',
                            'installment_no' => $feeInstallment['fee']['installment_no'] ?? 0,
                        ];
                    }

                    // count payment status for each fee type
                    if ($status === PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status === PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }
                }

                $total_payable_amount = $total_fee_amount - $total_discount_amount;
                $total_amount += $total_fee_amount;
                $total_payable += $total_payable_amount;
                $total_paid += $total_paid_amount;
                $total_due += $total_due_amount;

                // set payment status for fee installment
                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['has_transport_fee'] = $hasTransportFee;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_payable_amount'] = $total_payable_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee_payment_type'] = FeePaymentType::FEEINSTALLMENT->value;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['payment_status'] = $payment_status;
            }

            $feeInstallmentsData['total_amount'] = $total_amount;
            $feeInstallmentsData['total_payable'] = $total_payable;
            $feeInstallmentsData['total_paid'] = $total_paid;
            $feeInstallmentsData['current_due'] = $total_due;
            $feeInstallmentsData['total_due'] = $total_due;
            $feeInstallmentsData['total_refund'] = (float) $total_refund;
        }

        // sort installments by date and installment no
        if (!empty($feeInstallmentsData['feeInstallments'])) {
            usort($feeInstallmentsData['feeInstallments'], function ($a, $b) {
                $dateA = !empty($a['fee']['start_date']) ? Carbon::createFromFormat('Y-m-d', $a['fee']['start_date']) : '';
                $dateB = !empty($b['fee']['start_date']) ? Carbon::createFromFormat('Y-m-d', $b['fee']['start_date']) : '';

                $dateComparison = $dateA <=> $dateB;

                if ($dateComparison == 0 && !empty($a['fee']['installment_no']) && !empty($b['fee']['installment_no'])) {
                    $installmentA = $a['fee']['installment_no'] ?? 0;
                    $installmentB = $b['fee']['installment_no'] ?? 0;

                    return $installmentA <=> $installmentB;
                }

                return $dateComparison;
            });
        }

        return $feeInstallmentsData;
    }

    /*
    *   get student general vouchers
    */
    protected function getFeeVouchersByStudentId(int $studentId)
    {
        $feeVouchersData = [];

        $feeVouchers = $this->studentFeeVoucherRepository->getFeeVouchersByStudentId($studentId);

        if (count($feeVouchers) > 0) {
            $total_amount = 0;
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;

            $feeVouchers = $feeVouchers->map(function ($voucher) use (&$total_amount, &$total_payable, &$total_paid, &$total_due) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;
                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = $voucher->feeTypeAmounts->map(function ($feeTypeAmount) use (
                    &$total_fee_amount,
                    &$total_paid_amount,
                    &$total_due_amount,
                    &$total_discount_amount,
                    &$paid_status_count,
                    &$partial_status_count,
                    &$due_status_count,
                ) {
                    $total_fee_amount += $feeTypeAmount->amount;
                    $fee_amount = (float) $feeTypeAmount->amount;
                    $payable_amount = $fee_amount;
                    $paid_amount = 0;
                    $due_amount = $fee_amount;
                    $discount_amount = 0;
                    $hasDiscount = false;

                    $status = $feeTypeAmount?->payment?->payment_status;

                    // if ($feeTypeAmount->payment != null && $feeTypeAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($feeTypeAmount->payment != null) {
                        $paid_amount = (float) $feeTypeAmount->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;
                        $discount_amount = (float) $feeTypeAmount->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;
                        // $due_amount = (float) $feeTypeAmount->payment->due_amount ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;

                        if ($discount_amount > 0) {
                            $hasDiscount = true;
                        }
                    }

                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    // old
                    // if ($due_amount <= 0) {
                    //     $status = PaymentStatus::PAID->value;
                    // } else if ($due_amount > 0 && !empty($feeTypeAmount['payment'])) {
                    //     $status = PaymentStatus::PARTIAL->value;
                    // }

                    // new
                    if ($due_amount <= 0 && empty($feeTypeAmount['payment'])) {
                        $status = PaymentStatus::DUE->value;
                    } else if ($due_amount <= 0) {
                        $status = PaymentStatus::PAID->value;
                    } else if ($due_amount > 0 && !empty($feeTypeAmount['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    if ($status === PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status === PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }

                    return [
                        'id' => $feeTypeAmount->id,
                        'discount_id' => null,
                        'fee_id' => $feeTypeAmount->student_fee_voucher_id,
                        'fee_type_id' => $feeTypeAmount->fee_type_id,
                        'fee_type_title' => $feeTypeAmount->feeType->fee_type,
                        'amount' => $fee_amount,
                        'payable_amount' => $payable_amount,
                        'paid_amount' => $paid_amount,
                        'due_amount' => $due_amount,
                        'discount_amount' => $discount_amount,
                        'semester' => 0,
                        'is_fee_special' => 0,
                        'has_discount' => $hasDiscount,
                        'fee_payment_type' => FeePaymentType::GENERALVOUCHER->value,
                        'payment_status' => $status ?? PaymentStatus::DUE->value,
                    ];
                })->toArray();

                $total_payable_amount = $total_fee_amount - $total_discount_amount;

                $total_amount += $total_fee_amount;
                $total_payable += $total_payable_amount;
                $total_paid += $total_paid_amount;
                $total_due += $total_due_amount;

                $voucherArray = [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                ];


                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                return [
                    'total_fee_amount' => $total_fee_amount,
                    'total_payable_amount' => $total_payable_amount,
                    'total_paid_amount' => $total_paid_amount,
                    'total_due_amount' => $total_due_amount,
                    'total_discount_amount' => $total_discount_amount,
                    'fee_type_amounts' => $feeTypeAmountDataArray,
                    'fee' => $voucherArray,
                    'fee_payment_type' => FeePaymentType::GENERALVOUCHER->value,
                    'payment_status' => $payment_status,
                ];
            })->toArray();

            $feeVouchersData['feeVouchers'] = $feeVouchers;
            $feeVouchersData['total_amount'] = $total_amount;
            $feeVouchersData['total_payable'] = $total_payable;
            $feeVouchersData['total_paid'] = $total_paid;
            $feeVouchersData['total_due'] = $total_due;
        }

        return $feeVouchersData;
    }

    /*
    *   get student transport vouchers
    */
    protected function getTransportVouchersByStudentId(int $studentId)
    {
        // get allocate transport vouchers
        // $allocateTransport = $this->transportRepository->getAllocateTransportFromStudent($studentId);
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'voucher');
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'voucher');
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'voucher');

        $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

        $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

        $allocateTransportVouchers = [];

        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
            $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $studentId,
                $currentAllocateVoucherId,
                $deallocateVoucherId
            );
        }

        $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
            $studentId,
            $previousAllocateTransportId,
            $previousAllocationVoucherId,
            $deallocateVoucherId,
            $transportFeeStructureSetting?->value,
            'voucher'
        );

        $transportVouchersArray = array();
        $tempArray = array();
        $total_amount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;

        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if (!empty($allocateTransport)) {
            foreach ($allocateTransport as $allocate) {
                if (!empty($allocate->voucher)) {
                    // from voucher table
                    $tempFeeArray = array(
                        "id" => $allocate->voucher->id,
                        "title" => $allocate->voucher->title,
                    );
                } else {
                    $tempFeeArray = array(
                        "id" => 0,
                        "title" => "",
                    );
                }

                $fee_amount = (float) $allocate->amount;
                $payable_amount = $fee_amount;
                $paid_amount = 0;
                $due_amount = $fee_amount;
                $discount_amount = 0;
                $hasDiscount = false;

                // if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                if ($allocate->payment != null) {
                    $paid_amount = (float) $allocate->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;
                    $discount_amount = (float) $allocate->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;
                    // $due_amount = (float) $allocate->payment->due_amount ?? 0;
                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    $payable_amount = $due_amount;

                    if ($discount_amount > 0) {
                        $hasDiscount = true;
                    }
                }

                $payment_status = $allocate?->payment?->payment_status ?? PaymentStatus::DUE->value;

                if ($payment_status == PaymentStatus::CANCELLED->value) {
                    $payment_status = PaymentStatus::DUE->value;
                }

                // old
                // if ($due_amount <= 0) {
                //     $payment_status = PaymentStatus::PAID->value;
                // } else if ($due_amount > 0 && !empty($allocate['payment'])) {
                //     $payment_status = PaymentStatus::PARTIAL->value;
                // }

                // new
                if ($due_amount <= 0 && empty($allocate['payment'])) {
                    $payment_status = PaymentStatus::DUE->value;
                } else if ($due_amount <= 0) {
                    $payment_status = PaymentStatus::PAID->value;
                } else if ($due_amount > 0 && !empty($allocate['payment'])) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                }

                $tempAmountArray = array(
                    [
                        "id" => $allocate->id,
                        'discount_id' => null,
                        "fee_id" => $allocate->voucher_id,
                        "fee_type_id" => !empty($transportFee) ? $transportFee->id : null,
                        "fee_type_title" => !empty($transportFee) ? $transportFee->fee_type : "Transport",
                        "amount" => $fee_amount,
                        "payable_amount" => $payable_amount,
                        "paid_amount" => $paid_amount,
                        "due_amount" => $due_amount,
                        "discount_amount" => $discount_amount,
                        "semester" => 0,
                        "is_fee_special" => 0,
                        "has_discount" => $hasDiscount,
                        'fee_payment_type' => FeePaymentType::TRANSPORTVOUCHER->value,
                        "payment_status" => $payment_status
                    ]
                );

                $tempArray['fee'] = $tempFeeArray;
                $tempArray['fee_type_amounts'] = $tempAmountArray;
                $tempArray['total_fee_amount'] =  $fee_amount;
                $tempArray['total_payable_amount'] =  $fee_amount - $discount_amount;
                $tempArray['total_paid_amount'] = $paid_amount;
                $tempArray['total_due_amount'] = $due_amount;
                $tempArray['total_discount_amount'] = $discount_amount;
                $tempArray['fee_payment_type'] = FeePaymentType::TRANSPORTVOUCHER->value;
                $tempArray['payment_status'] = $payment_status;

                $total_amount += $fee_amount;
                $total_payable += ($fee_amount - $discount_amount);
                $total_paid += $paid_amount;
                $total_due += $due_amount;

                array_push($transportVouchersArray, $tempArray);
            }
        }

        if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
            if ($currentAllocateTransport != null) {
                $fee_amount = (float) $currentAllocateTransport->amount;
            } else {
                $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            foreach ($allocateTransportVouchers as $voucher) {
                $feeArray = array(
                    "id" => $voucher->id,
                    "title" => $voucher->title,
                );

                $payable_amount = $fee_amount;
                $paid_amount = 0;
                $due_amount = $fee_amount;
                $discount_amount = 0;

                $tempAmountArray = array(
                    [
                        "id" => null,
                        'discount_id' => null,
                        "fee_id" => $voucher->id,
                        "fee_type_id" => !empty($transportFee) ? $transportFee->id : null,
                        "fee_type_title" => !empty($transportFee) ? $transportFee->fee_type : "Transport",
                        "amount" => $fee_amount,
                        "payable_amount" => $payable_amount,
                        "paid_amount" => $paid_amount,
                        "due_amount" => $due_amount,
                        "discount_amount" => $discount_amount,
                        "semester" => 0,
                        "is_fee_special" => 0,
                        "has_discount" => false,
                        'fee_payment_type' => FeePaymentType::TRANSPORTVOUCHER->value,
                        "payment_status" =>  PaymentStatus::DUE->value
                    ]
                );

                $tempArray['fee'] = $feeArray;
                $tempArray['fee_type_amounts'] = $tempAmountArray;
                $tempArray['total_fee_amount'] =  $fee_amount;
                $tempArray['total_payable_amount'] =  $fee_amount - $discount_amount;
                $tempArray['total_paid_amount'] = $paid_amount;
                $tempArray['total_due_amount'] = $due_amount;
                $tempArray['total_discount_amount'] = $discount_amount;
                $tempArray['fee_payment_type'] = FeePaymentType::TRANSPORTVOUCHER->value;
                $tempArray['payment_status'] = PaymentStatus::DUE->value;

                $total_amount += $fee_amount;
                $total_payable += ($fee_amount - $discount_amount);
                $total_paid += $paid_amount;
                $total_due += $due_amount;

                array_push($transportVouchersArray, $tempArray);
            }
        }

        $transportVouchersData['transportVouchers'] = $transportVouchersArray;

        // Final total amount
        $transportVouchersData['total_amount'] = $total_amount;
        $transportVouchersData['total_payable'] = $total_payable;
        $transportVouchersData['total_paid'] = $total_paid;
        $transportVouchersData['total_due'] = $total_due;

        return $transportVouchersData;
    }

    /*
    * get student fee payment reports
    */
    protected function getStudentFeePaymentReports(int $studentId)
    {
        $paymentReportsData = [];

        $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($studentId);

        $paymentReportsData = $paymentReports->map(function ($report) {
            $receipt_note = "";
            $total_amount = 0;
            $total_discount = 0;
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;

            $report->fee_payments->each(function ($feePayment) use (&$receipt_note, &$total_amount, &$total_discount, &$total_payable, &$total_paid, &$total_due) {
                // if ($feePayment->fee_payment_type == FeePaymentType::GENERALVOUCHER->value) {
                //     if (strlen($receipt_note) <= 0) {
                //         if ($feePayment->is_fee_due) {
                //             $receipt_note = "Payment with due voucher fee {$feePayment->fee->title}";
                //         } else {
                //             $receipt_note = "Payment with voucher fee {$feePayment->fee->title}";
                //         }
                //     } else {
                //         if (!strpos($receipt_note, $feePayment->fee->title)) {
                //             $receipt_note .=  ", {$feePayment->fee->title}";
                //         }
                //     }
                // } else if ($feePayment->fee_payment_type == FeePaymentType::TRANSPORTVOUCHER->value) {
                //     if (strlen($receipt_note) <= 0) {
                //         if ($feePayment->is_fee_due) {
                //             $receipt_note = "Payment with due transport fee {$feePayment->fee->title}";
                //         } else {
                //             $receipt_note = "Payment with transport fee {$feePayment->fee->title}";
                //         }
                //     } else {
                //         if (!strpos($receipt_note, $feePayment->fee->title)) {
                //             $receipt_note .=  ", {$feePayment->fee->title}";
                //         }
                //     }
                // } else {
                //     if (strlen($receipt_note) <= 0) {
                //         if ($feePayment->is_fee_due) {
                //             $receipt_note = "Payment against previous dues from {$feePayment->fee->title}";
                //         } else {
                //             $receipt_note = "Payment for {$feePayment->fee->title}";
                //         }
                //     } else {
                //         if (!strpos($receipt_note, $feePayment->fee->title)) {
                //             $receipt_note .=  ", {$feePayment->fee->title}";
                //         }
                //     }
                // }

                // Determine the payment note based on the fee payment type and due status
                $payment_note = '';

                switch ($feePayment->fee_payment_type) {
                    case FeePaymentType::GENERALVOUCHER->value:
                        $payment_note = $feePayment->is_fee_due ? 'due voucher fee' : 'with voucher fee';
                        break;
                    case FeePaymentType::TRANSPORTVOUCHER->value:
                        $payment_note = $feePayment->is_fee_due ? 'due transport fee' : 'with transport fee';
                        break;
                    default:
                        $payment_note = $feePayment->is_fee_due ? 'against previous dues from' : 'for';
                        break;
                }

                // Construct receipt note
                if (strlen($receipt_note) <= 0) {
                    $receipt_note = "Payment {$payment_note} {$feePayment->fee->title}";
                } elseif (!strpos($receipt_note, $feePayment->fee->title)) {
                    $receipt_note .= ", {$payment_note} {$feePayment->fee->title}";
                }

                $total_amount += (float) $feePayment->amount;
                $total_payable += (float) $feePayment->payable_amount;
                $total_paid += (float) $feePayment->paid_amount;
                $total_due += (float) $feePayment->due_amount;
                $total_discount += (float) $feePayment->discount_amount;
            });

            return [
                'id' => $report->id,
                'student_id' => $report->student_id,
                'title' => $receipt_note,
                'total_amount' => $total_amount,
                'total_discount' => $total_discount,
                'total_payable' => $total_payable,
                'total_paid' => $total_paid,
                'total_due' => $total_due,
                'payment_mode' => $report->payment_mode,
                'payment_date' => Carbon::parse($report->payment_date)->format('d M, Y'),
                'receipt_no' => $report->receipt_no,
                'is_cancelled' => $report->is_cancelled,
                // 'school_receipt_no' => $report->school_receipt_no,
                // 'payment_note' => $report->payment_note,
            ];
        })->toArray();

        return $paymentReportsData;
    }

    /*
    *  cancel fee payment
    */
    public function cancelFeePayment(CancelFeePaymentRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            if (empty($input['payment_method_id']) && empty($input['student_id'])) {
                return redirect()->back()->with(['error' => "Something goes wrong!"]);
            }

            $feePaymentMethod = $this->feePaymentMethodRepository->getPaymentByIdAndStudentId($input['payment_method_id'], $input['student_id']);

            $feePaymentMethod->is_cancelled = true;
            $feePaymentMethod->cancelled_by = auth()->user()->id;
            $feePaymentMethod->cancellation_date = Carbon::now()->format('Y-m-d');
            $feePaymentMethod->cancel_reason = !empty($input['cancel_reason']) ? $input['cancel_reason'] : "";

            if ($feePaymentMethod != null && $feePaymentMethod->payment_mode == PaymentMode::CHEQUE->value) {
                $feePaymentMethod->is_cleared_cheque = false;
            }

            if (count($feePaymentMethod->fee_payments) > 0) {
                // update payment status
                $feePaymentMethod->fee_payments()->update(['payment_status' => PaymentStatus::CANCELLED]);

                // debit student wallet
                $feePaymentMethod->fee_payments->each(function ($feePayment) {
                    if ($feePayment?->feeType?->fee_type == 'Wallet Amount') {
                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'student_id' => $feePayment?->student_id,
                            'created_by' => auth()->user()->id,
                            'fee_payment_id' => $feePayment->id,
                            'transaction_type' => WalletTransactionType::CREDIT,
                            'transaction_date' => date('Y-m-d'),
                            'transaction_mode' => 'feeCancel',
                            'amount' => $feePayment->paid_amount ?? 0,
                            'description' => 'Deposited amount of wallet deducted due to fee cancel',
                            'status' => Status::ACTIVE,
                        ];

                        $this->studentRepository->createStudentWalletTransaction($dataArray);
                    }
                });
            }

            $feePaymentMethod->save();

            // update payment status to partial
            // $groupedInstallmentIds = [];

            // foreach ($feePaymentMethod->fee_payments as $payment) {
            //     if ($payment->fee_payment_type == FeePaymentType::TRANSPORTVOUCHER->value) {
            //         $installmentId = $payment->voucher_id;
            //     } else if ($payment->fee_payment_type == FeePaymentType::GENERALVOUCHER->value) {
            //         $installmentId = $payment->student_fee_voucher_id;
            //     } else {
            //         $installmentId = $payment->fee_id;
            //     }

            //     $groupedInstallmentIds[$payment->fee_payment_type][] = $installmentId;
            // }

            // foreach ($groupedInstallmentIds as $feePaymentType => $installmentIds) {
            //     $this->feePaymentRepository->updatePaymentStatusByStudentIdAndInstallmentIds($feePaymentMethod->student_id, $installmentIds, $feePaymentType);
            // }

            DB::commit();

            return redirect()->back()->with(['message' => "Fee payment cancelled successfully!"]);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => "Something goes wrong!"]);
        }
    }

    /*
    *   update student guardian phone
    */
    public function updateGuardianPhone(int $id, GuardianPhoneRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'sms_phone' => $input['guardian_phone'],
        );

        $update_status = $this->guardianRepository->update($id, $dataArray);

        if (!$update_status) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Guardian phone updated successfully.');
    }

    /*
    *   save student fee payment context
    */
    public function saveStudentContext(StudentNoteRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'],
                'context' => $input['context'],
                'notes' => $input['notes'],
                'note_status' => ContextStatus::OPEN,
                'status' => Status::ACTIVE,
            );

            $studentNote = $this->studentNoteRepository->create($dataArray);

            $studentNote->activities()->create([
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id,
                'activitiesable_id' => $studentNote->id,
                'activitiesable_type' => $studentNote->getMorphClass(),
            ]);

            DB::commit();

            return redirect()->back()->with('message', 'Context added successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *   save installment payment
    */
    public function saveFeePayment(FeePaymentRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // if ($input['fee_payment_type'] == FeePaymentType::GENERALVOUCHER->value) {
            //     $feePaymentType = FeePaymentType::GENERALVOUCHER->value;
            // } else if ($input['fee_payment_type'] == FeePaymentType::TRANSPORTVOUCHER->value) {
            //     $feePaymentType = FeePaymentType::TRANSPORTVOUCHER->value;
            // } else {
            //     $feePaymentType = FeePaymentType::FEEINSTALLMENT->value;
            // }

            // new code
            $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextFeeReceiptNumber();
            $paymentDate = !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('payment_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');
            $paymentTimestamp = !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('payment_date'))->timezone(getSchoolTimeZone())->getTimestamp() : 0;
            $currentTimestamp = Carbon::now()->timestamp;
            $allowBackDateSetting = getSiteSettingData('fee_allow_fee_taking_for_back_date');
            $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
            $backDateStaff = null;

            if ($staff != null) {
                $backDateStaff = $this->backDateStaffRepository->getBackDateStaffByStaffId($staff->id);
            }

            if (($paymentTimestamp < $currentTimestamp && $allowBackDateSetting?->value == 'Yes' && $backDateStaff == null) || ($paymentTimestamp > $currentTimestamp && $allowBackDateSetting?->value == 'No')) {
                $paymentDate = date('Y-m-d');
            }

            $paymentMethodDataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'],
                'payment_mode' => $input['payment_mode'],
                'payment_date' => $paymentDate,
                'school_receipt_no' => !empty($input['school_receipt_no']) ? $input['school_receipt_no'] : null,
                'payment_note' => !empty($input['payment_note']) ? $input['payment_note'] : "",
                'cheque_no' => !empty($input['cheque_no']) ? $input['cheque_no'] : null,
                'cheque_date' => !empty($input['cheque_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('cheque_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'cheque_amount' => !empty($input['cheque_amount']) ? $input['cheque_amount'] : null,
                'bank_id' => !empty($input['bank_id']) ? $input['bank_id'] : null,
                'branch' => !empty($input['branch']) ? $input['branch'] : "",
                'bank_account_id' => !empty($input['bank_account_id']) ? $input['bank_account_id'] : null,
                'dd_bank' => !empty($input['dd_bank']) ? $input['dd_bank'] : "",
                'dd_date' => !empty($input['dd_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('dd_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'dd_amount' => !empty($input['dd_amount']) ? $input['dd_amount'] : null,
                'paytm_ref_no' => !empty($input['paytm_ref_no']) ? $input['paytm_ref_no'] : null,
                'paytm_mobile' => !empty($input['paytm_mobile']) ? $input['paytm_mobile'] : null,
                'neft_number' => !empty($input['neft_number']) ? $input['neft_number'] : null,
                'neft_desc' => !empty($input['neft_desc']) ? $input['neft_desc'] : null,
                'transaction_id' => !empty($input['transaction_id']) ? $input['transaction_id'] : null,
                'upi_transaction_id' => !empty($input['upi_transaction_id']) ? $input['upi_transaction_id'] : null,
                'upi_description' => !empty($input['upi_description']) ? $input['upi_description'] : null,
                'receipt_no' => (int) $nextFeeReceiptNumber,
                // 'fee_payment_type' => $feePaymentType,
                'status' => Status::ACTIVE,
            );

            // generate receipt no
            // old code
            $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";
            // if ($receiptNumberEnabaled) {
            //     $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextFeeReceiptNumber();

            //     if ($nextFeeReceiptNumber == null) {
            //         $nextFeeReceiptNumber = getSiteSettingData('fee_receipt_number_session_wise_seed_no')?->value ?? 1;
            //     }

            //     $paymentMethodDataArray['receipt_no'] = (int) $nextFeeReceiptNumber;
            // }

            $feePaymentMethod = $this->feePaymentMethodRepository->create($paymentMethodDataArray);

            if ($receiptNumberEnabaled) {
                $currentSeedNo = getCurrentFeeReceiptSeedNumber();
                setSiteSettingData('Fee', 'fee_receipt_number_session_wise_seed_no', $currentSeedNo + 1);
            }

            foreach ($input['fee_installments_array'] as $feeInstallment) {
                if ($feeInstallment['payment_status'] != PaymentStatus::PAID->value) {
                    $due_amount = ($feeInstallment['payable_amount'] - $feeInstallment['paid_amount']) - $feeInstallment['discount_amount'];

                    if ($due_amount <= 0) {
                        $payment_status =  PaymentStatus::PAID;
                    } else {
                        $payment_status =  PaymentStatus::PARTIAL;
                    }

                    $fee_id = null;
                    $voucher_id = null;
                    $transport_voucher_id = null;
                    $feeType = $this->feeTypeRepository->getById($feeInstallment['fee_type_id']);

                    if ($feeInstallment['fee_payment_type'] == FeePaymentType::GENERALVOUCHER->value) {
                        $voucher_id = $feeInstallment['fee_id'] ?? null;
                        $classFeeStudentAmount = $this->studentFeeVoucherAmountRepository->getById($feeInstallment['id']);
                    } elseif ($feeInstallment['fee_payment_type'] == FeePaymentType::FEEINSTALLMENT->value) {
                        $fee_id = $feeInstallment['fee_id'] ?? null;

                        if (empty($feeInstallment['id'])) {
                            $student = $this->studentRepository->getById($input['student_id']);

                            if ($student != null) {
                                $classFeeStudentAmount = $this->classFeeStudentAmountRepository->create([
                                    'school_id' => getUserSchoolId(),
                                    'academic_year_id' => getAcademicYearId(),
                                    'student_id' => $student->id,
                                    'class_name_id' =>  $student->class_name_id,
                                    'class_fee_structure_id' => null,
                                    'fee_id' => $feeInstallment['fee_id'],
                                    'fee_type_id' => $feeType->id,
                                    'amount' => $feeInstallment['amount'],
                                    'semester' => null,
                                    'is_admission_installment' => 0,
                                    'is_fee_special' => $feeType->is_fee_special,
                                    'status' => Status::ACTIVE,
                                ]);
                            }
                        } else {
                            $classFeeStudentAmount = $this->classFeeStudentAmountRepository->getById($feeInstallment['id']);
                            $classFeeStudentAmount->load(['payment']);

                            if ($feeType->installment_type == FeeInstallmentType::EXTRACHARGE->value) {
                                if ($classFeeStudentAmount->payment == null) {
                                    $classFeeStudentAmount->update([
                                        'amount' => $feeInstallment['amount'],
                                    ]);
                                }
                            }
                        }
                    } elseif ($feeInstallment['fee_payment_type'] == FeePaymentType::TRANSPORTVOUCHER->value) {
                        $transport_voucher_id = $feeInstallment['fee_id'] ?? null;

                        if (empty($feeInstallment['id'])) {
                            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                                $student = $this->studentRepository->getById($input['student_id']);
                                $allocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($input['student_id']);

                                if ($allocateTransport != null) {
                                    $allocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($input['student_id']);
                                }

                                if ($student != null) {
                                    $classFeeStudentAmount = $this->transportRepository->createAllocateTransport([
                                        'school_id' => getUserSchoolId(),
                                        'student_id' =>  $student->id,
                                        'classroom_id' => $student->classroom_id,
                                        'transport_stoppage_id' => $allocateTransport->transport_stoppage_id ?? null,
                                        'academic_year_id' => getAcademicYearId(),
                                        'staff_id' => $allocateTransport->staff_id ?? null,
                                        'voucher_id' => $transport_voucher_id,
                                        'transport_route_id' => $allocateTransport->transport_route_id ?? null,
                                        'allocate_type_for' => $allocateTransport->allocate_type_for ?? null,
                                        'is_current' => false,
                                        'transport_type' => $allocateTransport->transport_type  ?? null,
                                        'amount' => $feeInstallment['amount'] ?? 0,
                                        'allocation_type' => 'voucher',
                                        'status' => Status::ACTIVE->value ?? null,
                                    ]);
                                }
                            }
                        } else {
                            $classFeeStudentAmount = $this->transportRepository->getAllocateTransportById($feeInstallment['id']);
                        }
                    }

                    $dataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'created_by' => auth()->user()->id,
                        'fee_paymentable_type' => $classFeeStudentAmount->getMorphClass(),
                        'fee_paymentable_id' => $classFeeStudentAmount->id,
                        'student_id' => $input['student_id'],
                        'discount_id' => !empty($feeInstallment['discount_id']) ? $feeInstallment['discount_id'] : null,
                        'fee_payment_method_id' => $feePaymentMethod->id,
                        'fee_id' => $fee_id,
                        'student_fee_voucher_id' => $voucher_id,
                        'voucher_id' => $transport_voucher_id,
                        'fee_type_id' => $feeInstallment['fee_type_id'],
                        'amount' => $feeInstallment['payable_amount'],
                        'payable_amount' => $feeInstallment['payable_amount'] - $feeInstallment['discount_amount'],
                        'paid_amount' => $feeInstallment['paid_amount'],
                        'due_amount' => $due_amount,
                        'discount_amount' => $feeInstallment['discount_amount'],
                        'is_fee_due' => $feeInstallment['payment_status'] === PaymentStatus::PARTIAL->value,
                        'fee_payment_type' => $feeInstallment['fee_payment_type'],
                        'payment_status' => $payment_status,
                        'status' => Status::ACTIVE,
                    );

                    $feePayment = $this->feePaymentRepository->create($dataArray);

                    // credit student wallet
                    if ($feeType?->fee_type == 'Wallet Amount') {
                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'student_id' => $input['student_id'],
                            'created_by' => auth()->user()->id,
                            'fee_payment_id' => $feePayment->id,
                            'transaction_type' => WalletTransactionType::CREDIT,
                            'transaction_date' => $paymentDate,
                            'transaction_mode' => 'fee',
                            'amount' => $feeInstallment['paid_amount'],
                            'description' => 'Amount deposited in Wallet',
                            'status' => Status::ACTIVE,
                        ];

                        $this->studentRepository->createStudentWalletTransaction($dataArray);
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Fee paid successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * save the installment payment.
     */
    public function saveInstallmentPayment(FeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'installment_no' => $input['installment_no'],
            'title' => $input['title'],
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'last_pay_date_at' => !empty($input['last_pay_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['last_pay_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            // 'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'last_pay_date_at' => !empty($input['last_pay_date_at']) ? \Carbon\Carbon::parse($input['last_pay_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'description' => $input['description'],
            'is_admission_install' => $input['is_admission_install'] ?? false,
            'status' => Status::ACTIVE,
        );

        $fee = $this->feeRepository->create($dataArray);

        if (!$fee) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Fee installment created successfully.');
    }


    /**
     * Display the Voucher.
     */
    public function voucher(): Response
    {
        $fees = $this->feeRepository->getActiveAll();

        return Inertia::render('Fee/Voucher', [
            'fees' => $fees,
        ]);
    }

    /**
     * save the Voucher.
     */
    public function saveVoucher(FeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'installment_no' => $input['installment_no'],
            'title' => $input['title'],
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'last_pay_date_at' => !empty($input['last_pay_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['last_pay_date_at'])->timezone(getSchoolTimeZone())->toDateString()  : date('Y-m-d'),
            // 'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            // 'last_pay_date_at' => !empty($input['last_pay_date_at']) ? \Carbon\Carbon::parse($input['last_pay_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'description' => $input['description'],
            'is_admission_install' => $input['is_admission_install'] ?? false,
            'status' => Status::ACTIVE,
        );

        $fee = $this->feeRepository->create($dataArray);

        if (!$fee) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Fee installment created successfully.');
    }


    /**
     * Display bulk fee payment.
     */
    public function bulkFeePayment(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $fees = $this->feeRepository->getActiveAll();
        $employmentCategories = $this->categoryRepository->getEmploymentCategory();
        $bankAccounts = [];

        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            $bank['id'] = $bank['id'];
            $bank['title'] = $bank['name'];

            return $bank;
        });

        $paymentModes = [];

        foreach (PaymentMode::cases() as $case) {
            if ($case != PaymentMode::ONLINEBACKOFFICE) {
                array_push($paymentModes, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        $studentFeeInstallments = [];
        $students = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $feeId = $request->fee_id ?? null;
            $employmentCatgoryId = $request->employment_category_id ?? null;

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomIdAndEmploymentCatId($classroomId, $employmentCatgoryId);

                if (count($students) > 0) {
                    $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    }]);

                    $students =  $students->map(function ($student) {
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

                $studentIds = $students->pluck('id')->toArray();

                if (count($studentIds) > 0) {
                    $bankAccounts = $this->bankAccountRepository->getActiveAllByStudentIds($studentIds)->map(function ($bankAccount) {
                        return [
                            'id' => $bankAccount['id'],
                            'student_id' => $bankAccount['student_id'],
                            'title' => $bankAccount['account_name'] ?? "",
                        ];
                    })->groupBy('student_id');
                }

                if (count($studentIds) > 0 && !empty($feeId)) {
                    $studentFeeInstallments = $this->getFeeInstallmentsByStudentIdsAndFeeId($studentIds, $feeId);
                }
            }

            if (count($studentFeeInstallments) > 0) {
                ksort($studentFeeInstallments);
            }
        }

        return Inertia::render('Fee/BulkFeePayment', [
            'classrooms' => $classrooms,
            'fees' => $fees,
            'banks' => $banks,
            'bankAccounts' => $bankAccounts,
            'paymentModes' => $paymentModes,
            'employmentCategories' => $employmentCategories,
            'students' => $students,
            'studentFeeInstallments' => $studentFeeInstallments
        ]);
    }

    /*
    * save bulk fee payment
    */
    public function saveBulkFeePayment(BulkFeePaymentRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            foreach ($input['student_data_array'] as $studentData) {
                // new code
                $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextFeeReceiptNumber();

                $paymentMethodDataArray = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'student_id' => $studentData['student_id'],
                    'payment_mode' => $studentData['payment_mode'],
                    'payment_date' => !empty($studentData['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('payment_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'school_receipt_no' => !empty($studentData['school_receipt_no']) ? $studentData['school_receipt_no'] : null,
                    'payment_note' => !empty($studentData['payment_note']) ? $studentData['payment_note'] : "",
                    'cheque_no' => !empty($studentData['cheque_no']) ? $studentData['cheque_no'] : null,
                    'cheque_date' => !empty($studentData['cheque_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('cheque_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'cheque_amount' => !empty($studentData['cheque_amount']) ? $studentData['cheque_amount'] : null,
                    'bank_id' => !empty($studentData['bank_id']) ? $studentData['bank_id'] : null,
                    'branch' => !empty($studentData['branch']) ? $studentData['branch'] : "",
                    'bank_account_id' => !empty($studentData['bank_account_id']) ? $studentData['bank_account_id'] : null,
                    'dd_bank' => !empty($studentData['dd_bank']) ? $studentData['dd_bank'] : "",
                    'dd_date' => !empty($studentData['dd_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('dd_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'dd_amount' => !empty($studentData['dd_amount']) ? $studentData['dd_amount'] : null,
                    'paytm_ref_no' => !empty($studentData['paytm_ref_no']) ? $studentData['paytm_ref_no'] : null,
                    'paytm_mobile' => !empty($studentData['paytm_mobile']) ? $studentData['paytm_mobile'] : null,
                    'neft_number' => !empty($studentData['neft_number']) ? $studentData['neft_number'] : null,
                    'neft_desc' => !empty($studentData['neft_desc']) ? $studentData['neft_desc'] : null,
                    'transaction_id' => !empty($studentData['transaction_id']) ? $studentData['transaction_id'] : null,
                    'upi_transaction_id' => !empty($studentData['upi_transaction_id']) ? $studentData['upi_transaction_id'] : null,
                    'upi_description' => !empty($studentData['upi_description']) ? $studentData['upi_description'] : null,
                    'receipt_no' => $nextFeeReceiptNumber,
                    'status' => Status::ACTIVE,
                );

                // generate receipt no
                $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled');
                $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

                //old code
                // if ($receiptNumberEnabaled) {
                //     $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextFeeReceiptNumber();

                //     if ($nextFeeReceiptNumber == null) {
                //         $nextFeeReceiptNumber = getSiteSettingData('fee_receipt_number_session_wise_seed_no')?->value ?? 1;
                //     }

                //     $paymentMethodDataArray['receipt_no'] = (int) $nextFeeReceiptNumber;
                // }

                $feePaymentMethod = $this->feePaymentMethodRepository->create($paymentMethodDataArray);

                if ($receiptNumberEnabaled) {
                    $currentSeedNo = getCurrentFeeReceiptSeedNumber();
                    setSiteSettingData('Fee', 'fee_receipt_number_session_wise_seed_no', $currentSeedNo + 1);
                }

                foreach ($studentData['fee_installments_array'] as $feeInstallment) {
                    if ($feeInstallment['payment_status'] == PaymentStatus::DUE->value) {
                        $due_amount = ($feeInstallment['payable_amount'] - $feeInstallment['paid_amount']);

                        if ($due_amount <= 0) {
                            $payment_status =  PaymentStatus::PAID;
                        } else {
                            $payment_status =  PaymentStatus::PARTIAL;
                        }

                        $fee_id = $feeInstallment['fee_id'] ?? null;
                        $feeType = $this->feeTypeRepository->getById($feeInstallment['fee_type_id']);

                        if (empty($feeInstallment['id'])) {
                            $student = $this->studentRepository->getById($studentData['student_id']);

                            if ($student != null) {
                                $classFeeStudentAmount = $this->classFeeStudentAmountRepository->create([
                                    'school_id' => getUserSchoolId(),
                                    'academic_year_id' => getAcademicYearId(),
                                    'student_id' => $student->id,
                                    'class_name_id' =>  $student->class_name_id,
                                    'class_fee_structure_id' => null,
                                    'fee_id' => $feeInstallment['fee_id'],
                                    'fee_type_id' => $feeType->id,
                                    'amount' => $feeInstallment['amount'],
                                    'semester' => null,
                                    'is_admission_installment' => 0,
                                    'is_fee_special' => $feeType->is_fee_special,
                                    'status' => Status::ACTIVE,
                                ]);
                            }
                        } else {
                            $classFeeStudentAmount = $this->classFeeStudentAmountRepository->getById($feeInstallment['id']);
                            $classFeeStudentAmount->load(['payment']);

                            if ($feeType->installment_type == FeeInstallmentType::EXTRACHARGE->value) {
                                if ($classFeeStudentAmount->payment == null) {
                                    $classFeeStudentAmount->update([
                                        'amount' => $feeInstallment['amount'],
                                    ]);
                                }
                            }
                        }

                        $dataArray = array(
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'created_by' => auth()->user()->id,
                            'fee_paymentable_type' => $classFeeStudentAmount->getMorphClass(),
                            'fee_paymentable_id' => $classFeeStudentAmount->id,
                            'student_id' => $studentData['student_id'],
                            'discount_id' => !empty($feeInstallment['discount_id']) ? $feeInstallment['discount_id'] : null,
                            'fee_payment_method_id' => $feePaymentMethod->id,
                            'fee_id' => $fee_id,
                            'student_fee_voucher_id' => null,
                            'voucher_id' => null,
                            'fee_type_id' => $feeInstallment['fee_type_id'],
                            'amount' => $feeInstallment['amount'],
                            'payable_amount' => $feeInstallment['payable_amount'],
                            'paid_amount' => $feeInstallment['paid_amount'],
                            'due_amount' => $due_amount,
                            'discount_amount' => $feeInstallment['discount_amount'],
                            'is_fee_due' => $feeInstallment['payment_status'] === PaymentStatus::PARTIAL->value,
                            'fee_payment_type' => FeePaymentType::FEEINSTALLMENT,
                            'payment_status' => $payment_status,
                            'status' => Status::ACTIVE,
                        );

                        $this->feePaymentRepository->create($dataArray);
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Bulk fee taken successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *   get student fee installments by student ids and fee id
    */
    protected function getFeeInstallmentsByStudentIdsAndFeeId(array $studentIds, int $feeId)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentIds($studentIds)->groupBy('student_id');
        $studentFeeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentIdsAndFeeId($studentIds, $feeId);

        if (count($studentFeeInstallments) > 0) {
            $hasPaymentMap = [];

            $studentPayments = $this->classFeeStudentAmountRepository->getFeePaymentByStudentIdsANdFeeId($studentIds, $feeId);

            $hasPaymentMap[$feeId] = array_unique($studentPayments->pluck('student_id')->toArray());

            foreach ($studentFeeInstallments->groupBy('student_id') as $studentId => $feeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = [];

                $hasPayment = in_array($studentId, $hasPaymentMap[$feeId]);

                if (!$hasPayment) {
                    $fee = $feeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                            if ($currentAllocateTransport != null) {
                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                            } else {
                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                            }

                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                $studentId,
                                $currentAllocateFeeId,
                                $deallocateTransport?->fee_id
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                    if ($allocateTransportFee->id == $feeId) {
                                        if ($transportFee != null) {
                                            $existedTransportFee = $feeInstallments->where('fee_type_id', $transportFee->id)->first();

                                            if ($existedTransportFee == null) {
                                                $newTransportFee = collect([
                                                    'id' => null,
                                                    'student_id' => $studentId,
                                                    'fee_id' => $feeId,
                                                    'fee_type_id' =>  $transportFee->id,
                                                    'amount' =>  $transportFeeAmount,
                                                    'semester' => null,
                                                    'is_fee_special' => $transportFee->is_fee_special,
                                                    'is_extra_charge' => true,
                                                    'feeType' => $transportFee,
                                                    'fee' => $fee,
                                                    'payment' => null,
                                                    'nullify_fee' => null,
                                                ]);

                                                $feeInstallments->push($newTransportFee);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // add late fee in structure if late fine is available
                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                    if ($lateFee != null) {
                        $existedLateFee = $feeInstallments->where('fee_type_id', $lateFee->id)->first();

                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                            if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                $currentDate = date("Y-m-d");
                                $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                if ($lateFineType == LateFineType::DAILY->value) {
                                    $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                    $weeksDifference = floor($daysDifference / 7);
                                    $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                    // Extract year and month from the start date
                                    list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                    // Extract year and month from the current date
                                    list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                    // Calculate the difference in months
                                    $startMonths = ($startYear * 12) + $startMonth;
                                    $currentMonths = ($currentYear * 12) + $currentMonth;
                                    $monthsDifference = $currentMonths - $startMonths;

                                    $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                }
                            }

                            $newLateFee = collect([
                                'id' => null,
                                'student_id' => $studentId,
                                'fee_id' => $feeId,
                                'fee_type_id' =>  $lateFee->id,
                                'amount' => $late_fee_amount,
                                'semester' => null,
                                'is_fee_special' => $lateFee->is_fee_special,
                                'is_extra_charge' => true,
                                'feeType' => $lateFee,
                                'fee' => $fee,
                                'payment' => null,
                                'nullify_fee' => null,
                            ]);

                            $feeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($feeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $paid_amount = 0;
                    $status = PaymentStatus::DUE->value;

                    if (!empty($feeInstallment['payment'])) {
                        $status = $feeInstallment?->payment?->payment_status;
                    }

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $payable_amount;
                    $discount_id = null;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $payable_amount = $paid_amount;
                        $status = PaymentStatus::PAID->value;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;
                    } elseif (!empty($studentFeeDiscounts[$studentId])) {
                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $discount_id = $discount?->discount_id;
                                $payable_amount = $fee_amount - $discount_amount;
                            }
                        }
                    }

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;

                    $is_extra_charge = $feeInstallment['feeType']['installment_type'] == FeeInstallmentType::EXTRACHARGE->value;

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    if ($due_amount <= 0 && !empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::PAID->value;
                    } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    if (!$hasPayment) {
                        $feeTypeAmountDataArray[] = [
                            'id' => $feeInstallment['id'],
                            'student_id' => $studentId,
                            'discount_id' => $discount_id,
                            'fee_id' => $feeInstallment['fee_id'],
                            'fee_type_id' => $feeInstallment['fee_type_id'],
                            'fee_type_title' => $feeInstallment['feeType']['fee_type'],
                            'fee_installment_type' => $feeInstallment['feeType']['installment_type'],
                            'amount' => $fee_amount,
                            'payable_amount' => $payable_amount,
                            'paid_amount' => $paid_amount,
                            'due_amount' => $due_amount,
                            'discount_amount' => $discount_amount,
                            'semester' => (int) $feeInstallment['semester'],
                            'is_fee_special' => $feeInstallment['is_fee_special'],
                            'is_extra_charge' =>  $is_extra_charge,
                            'payment_status' => $status,
                        ];

                        $total_fee_amount += $fee_amount;
                        $total_paid_amount += $paid_amount;
                        $total_due_amount += $due_amount;
                        $total_discount_amount += $discount_amount;
                    }

                    // count payment status for each fee type
                    if ($status == PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status == PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }
                }

                $total_payable_amount = !$hasPayment ? $total_fee_amount - $total_discount_amount : 0;

                // set payment status for fee installment
                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                $feeInstallmentsData[$studentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData[$studentId]['total_payable_amount'] = $total_payable_amount;
                $feeInstallmentsData[$studentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData[$studentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData[$studentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData[$studentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
                $feeInstallmentsData[$studentId]['payment_status'] = $payment_status;
            }
        }

        return $feeInstallmentsData;
    }
}
