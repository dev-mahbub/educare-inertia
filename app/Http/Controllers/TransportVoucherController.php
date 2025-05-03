<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\PaymentStatus;
use App\Enums\VoucherStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\VoucherRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\VoucherRepository;
use App\Repositories\AcademicRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IVoucherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\AcademicYearRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class TransportVoucherController extends Controller
{

    public function __construct(
        private IVoucherRepository $voucherRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private AcademicYearRepository $academicYearRepository,
        private IClassroomRepository $classroomRepository,
        private ITransportRepository $transportRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IStudentRepository $studentRepository
    ) {
        $this->middleware('permission:view transport', ['only' => ['index', 'voucherSetting']]);
        $this->middleware('permission:add transport', ['only' => ['voucherDueSetting', 'voucherDueSettingSave', 'save']]);
        $this->middleware('permission:edit transport', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete transport', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $vouchers = $this->voucherRepository->getActiveAll()->sortBy('installment_no');
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $voucherStatusArray = [];

        foreach (VoucherStatus::cases() as $status) {
            array_push($voucherStatusArray, ['title' => $status->value, 'value' => $status->value]);
        }

        $transportVoucherReport = [];

        if ($request->isMethod('POST')) {
            $fromId = $request->from_id ?? null;
            $toId = $request->to_id ?? null;
            $classroomIds = $request->classroom_ids ?? [];
            $paymentStatus = $request->payment_status ?? "";

            if (!empty($fromId) && !empty($toId)) {
                $transportVoucherReport = $this->getTransportVoucherReport($fromId, $toId, $classroomIds, $paymentStatus);
            }
        }

        return Inertia::render('TransportVoucher/Show', [
            'vouchers' => $vouchers,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'voucherStatusArray' => $voucherStatusArray,
            'transportVoucherReport' => $transportVoucherReport,
        ]);
    }

    /**
     * voucher setting
     */
    public function voucherSetting(Request $request): Response
    {
        $vouchers = $this->voucherRepository->getActiveAll();
        $installmentNo = $this->voucherRepository->getVoucherInstallmentNo();
        $transportFeeStructure = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        return Inertia::render('TransportVoucher/VoucherSetting', [
            'vouchers' => $vouchers,
            'installmentNo' => $installmentNo,
            'transportFeeStructure' => !empty($transportFeeStructure['value']) ? $transportFeeStructure['value'] : null,
        ]);
    }

    /**
     * voucher due setting
     */
    public function voucherDueSetting(Request $request): Response
    {
        $classNames = $this->classroomRepository->getActiveClassNameForTD();

        $currentAcademicYear = $this->academicYearRepository->getCurrentYear();
        $academicYear = $this->academicYearRepository->getAcademicYearExceptCurrent();
        $academicYearData = $academicYear->map(fn ($year) => ['id' => $year->id, 'title' => $year->academic_session])->all();

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKeyAndValue('Transport', 'transport_fee_structure', 'voucher');

        return Inertia::render('TransportVoucher/VoucherDueSetting', [
            'classNames' => $classNames,
            'transportFeeStructureSetting' => $transportFeeStructureSetting,
            'academicYearData' => $academicYearData,
            'currentAcademicYear' => $currentAcademicYear,
        ]);
    }

    /**
     * voucher due setting save
     */
    public function voucherDueSettingSave(Request $request)
    {
        echo "do something";
    }

    /**
     * Update the user's profile information.
     */
    public function save(VoucherRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'installment_no' => intval($input['installment_no']),
            'title' => $input['title'],
            'start_date' => !empty($input['start_date']) ? \Carbon\Carbon::parse($input['start_date'])->format('Y-m-d') : date('Y-m-d'),
            'end_date' => !empty($input['end_date']) ? \Carbon\Carbon::parse($input['end_date'])->format('Y-m-d') : date('Y-m-d'),
            'description' => !empty($input['description']) ? $input['description'] : null,
            'status' => Status::ACTIVE,
        );

        $voucher = $this->voucherRepository->create($dataArray);
        if (!$voucher) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'TransportVoucher created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(int $id): Response
    {
        $voucher = $this->voucherRepository->getById($id);
        $vouchers = $this->voucherRepository->getActiveAll();
        return Inertia::render('TransportVoucher/EditVoucherSetting', [
            'voucher' => $voucher,
            'vouchers' => $vouchers,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(VoucherRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id'      => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'installment_no' => intval($input['installment_no']),
            'title'         => $input['title'],
            'start_date'    => !empty($input['start_date']) ? \Carbon\Carbon::parse($input['start_date'])->format('Y-m-d') : date('Y-m-d'),
            'end_date'     => !empty($input['end_date']) ? \Carbon\Carbon::parse($input['end_date'])->format('Y-m-d') : date('Y-m-d'),
            'description'  => !empty($input['description']) ? $input['description'] : null,
            'status'         => Status::ACTIVE,
        );

        $voucher = $this->voucherRepository->update($id, $dataArray);
        if (!$voucher) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Transport Voucher Updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        $voucher = $this->voucherRepository->getById($id);
        if (!$voucher) {
            return redirect()->route('transport.voucher_setting')->with('error', 'TransportVoucher not found.');
        }
        $this->voucherRepository->delete($id);
        return redirect()->route('transport.voucher_setting')->with('message', 'TransportVoucher deleted successfully.');
    }

    /*
    *   helper method get transport voucher report
    */
    protected function getTransportVoucherReport(int $fromId, int $toId, array $classroomIds = [], string $paymentStatus = "")
    {
        $transportVouchersData = [];

        if (count($classroomIds) > 0) {
            $students = $this->studentRepository->getStudentsByClassroomIds($classroomIds);
        } else {
            $students = $this->studentRepository->getCurrentSessionStudentsAll();
        }

        if (count($students) > 0) {
            $students->loadMissing(['classroom:id,title', 'promotedClassroom']);
            $students->sortBy('admission_no');

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    unset($student['classroom']);

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            $transportVouchersArray = array();
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;

            foreach ($students as $student) {
                // get allocate transport vouchers
                $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocateReport(
                        $student->id,
                        $fromId,
                        $toId,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransportReport(
                    $student->id,
                    $fromId,
                    $toId,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $tempArray = array();

                        $fee_amount = (float) $allocate->amount ?? 0;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;
                        $discount_amount = 0;

                        if ($allocate->payment != null) {
                            $paid_amount = (float) $allocate->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;
                            $discount_amount = (float) $allocate->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }

                        $payment_status = $allocate?->payment?->payment_status ?? PaymentStatus::DUE->value;

                        if ($payment_status == PaymentStatus::CANCELLED->value) {
                            $payment_status = PaymentStatus::DUE->value;
                        }

                        if ($due_amount <= 0) {
                            $payment_status = PaymentStatus::PAID->value;
                        } else if ($due_amount > 0 && !empty($allocate['payment'])) {
                            $payment_status = PaymentStatus::PARTIAL->value;
                        }

                        $tempArray['admission_no'] = $student->admission_no;
                        $tempArray['student_name'] = "{$student->first_name} {$student->middle_name} {$student->last_name}";
                        $tempArray['class_name'] = $student?->classroom?->title ?? "";
                        $tempArray['title'] = $allocate?->voucher?->title ?? "";
                        $tempArray['fee_type'] = !empty($transportFee) ? $transportFee->fee_type : "Transport";
                        $tempArray['amount'] =  $fee_amount - $discount_amount;
                        $tempArray['total_paid'] = $paid_amount;
                        $tempArray['total_due'] = $due_amount;
                        $tempArray['status'] = $payment_status;

                        $total_payable += ($fee_amount - $discount_amount);
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;

                        array_push($transportVouchersArray, $tempArray);
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount ?? 0;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $tempArray = array();

                        $paid_amount = 0;
                        $due_amount = $fee_amount;
                        $discount_amount = 0;

                        $tempArray['admission_no'] = $student->admission_no;
                        $tempArray['student_name'] = "{$student->first_name} {$student->middle_name} {$student->last_name}";
                        $tempArray['class_name'] = $student?->classroom?->title ?? "";
                        $tempArray['title'] = $voucher?->title ?? "";
                        $tempArray['fee_type'] = !empty($transportFee) ? $transportFee->fee_type : "Transport";
                        $tempArray['amount'] =  $fee_amount - $discount_amount;
                        $tempArray['total_paid'] = $paid_amount;
                        $tempArray['total_due'] = $due_amount;
                        $tempArray['status'] = PaymentStatus::DUE->value;

                        $total_payable += ($fee_amount - $discount_amount);
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;

                        array_push($transportVouchersArray, $tempArray);
                    }
                }
            }

            if (!empty($transportVouchersArray) && !empty($paymentStatus)) {
                $transportVouchersArray = array_filter($transportVouchersArray, function ($report) use ($paymentStatus, &$total_payable, &$total_paid, &$total_due) {
                    if ($report['status'] !== $paymentStatus) {
                        $total_payable -= $report['amount'] ?? 0;
                        $total_paid -= $report['total_paid'] ?? 0;
                        $total_due -= $report['total_due'] ?? 0;

                        return false;
                    }

                    return true;
                });
            }

            $transportVouchersData['reports'] = $transportVouchersArray;

            // Final total amount
            $transportVouchersData['total_payable'] = $total_payable;
            $transportVouchersData['total_paid'] = $total_paid;
            $transportVouchersData['total_due'] = $total_due;
        }

        return $transportVouchersData;
    }
}
