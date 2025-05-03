<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\Academic;
use App\Enums\LateFineType;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use App\Enums\CertificateType;
use App\Enums\OrientationType;
use App\Enums\FeeInstallmentType;
use App\Enums\IdCardAudienceType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\IExamRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\INullifyFeeRepository;
use App\Repositories\ICertificateRepository;
use App\Repositories\IExamRoasterRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\IdCardCertificateRequest;
use App\Http\Requests\NullifyStudentFeeRequest;
use App\Repositories\IStudentCertificateRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Http\Requests\IdCardCertificateUpdateRequest;
use App\Repositories\IClassFeeStudentAmountRepository;

class StudentCertificateController extends Controller
{
    private $_upload;

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IStudentRepository $studentRepository,
        private IStudentCertificateRepository $studentCertificateRepository,
        private IAcademicRepository $academicRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IFeeRepository $feeRepository,
        private IStaffRepository $staffRepository,
        private IExamRoasterRepository $examRoasterRepository,
        private IExamRepository $examRepository,
        private ICertificateRepository $certificateRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private ITransportRepository $transportRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private INullifyFeeRepository $nullifyFeeRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view certificate', ['only' => ['generateTc', 'nullifyStudentFeeInstallment',
            'tcSummaryReport', 'generatedTCReport', 'studentCertificate', 'teacherCertificate', 'certificateList']]);
        $this->middleware('permission:add certificate', ['only' => ['generateTcSave', 'generateDraftTcSave', 'generateBulkTcSave', 
            'generateBulkDraftTcSave', 'studentBonafideCertificateSave', 'studentCharacterCertificateSave',
            'generatedCertificate', 'customIdCard', 'customIdCardSave', 'uploadIdCardImages', 'uploadCustomIdCardBackgroundImage'
        ]]);
        $this->middleware('permission:edit certificate', ['only' => ['customIdCardUpdate']]);
        $this->middleware('permission:delete certificate', ['only' => ['deleteCustomIdCardCertificateImage']]);
    }

    /**
     * Display the tc.
     */
    public function generateTc(Request $request): Response
    {
        $feeInstallments = [];
        $students = [];
        $student = null;

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? null;
            $studentId = $request->input('student_id') ?? null;
            $admissionNo = $request->input('admission_no') ?? "";

            if (!empty($admissionNo) && empty($studentId)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if (!empty($studentId)) {
                $student = $this->studentRepository->getStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing([
                    'classroom:id,title',
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                    'mother:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                    'promotedClassroom'
                ]);

                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student?->classroom_id;
                $studentId = $student?->id;

                $student->loadMissing([
                    'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    },
                ]);
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query)  use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }

            if (!empty($studentId)) {
                //get student fee installments
                $feeInstallments = $this->getFeeInstallmentsByStudentId($studentId);
            }
        }

        // get classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('StudentCertificate/GenerateTC', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'feeInstallments' => $feeInstallments,
        ]);
    }

    /*
    *   get student fee installments
    */
    private function getFeeInstallmentsByStudentId(int $studentId)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId);

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = [];

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

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;
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
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $discount_id = $discount?->discount_id;
                                $payable_amount = $fee_amount;
                            }
                        }
                    }

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;

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

                    if (!isset($feeInstallmentsData[$feeInstallmentId]['fee'])) {
                        $feeInstallmentsData[$feeInstallmentId]['fee'] = [
                            'id' => $feeInstallment['fee_id'],
                            'title' => $feeInstallment['fee']['title'],
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

                // set payment status for fee installment
                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                $feeInstallmentsData[$feeInstallmentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_payable_amount'] = $total_payable_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData[$feeInstallmentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
                $feeInstallmentsData[$feeInstallmentId]['payment_status'] = $payment_status;
            }
        }

        return $feeInstallmentsData;
    }

    /*
    *  nullify student fee installment
    */
    public function nullifyStudentFeeInstallment(NullifyStudentFeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $studentFeeInstallments = $this->classFeeStudentAmountRepository->getFeeStructureByStudentIdAndFeeIds($input['student_id'], $input['fee_ids']);

            if ($studentFeeInstallments->count() > 0) {
                $dataArray = [
                    'school_id' =>  getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'student_id' => $input['student_id'],
                    // 'nullify_date' => Carbon::parse($input['status_date_at'])->format('Y-m-d'),
                    'nullify_date' => !empty($request->input('status_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('status_date_at'))->timezone(getSchoolTimeZone())->toDateString() : '',
                    'nullify_reason' => $input['reason'],
                    'status' => Status::ACTIVE,
                ];

                $nullifyFee = $this->nullifyFeeRepository->create($dataArray);

                foreach ($studentFeeInstallments as $feeInstallment) {
                    if (
                        (
                            $feeInstallment->payment == null ||
                            ($feeInstallment->payment != null && $feeInstallment->payment->payment_status != PaymentStatus::PAID->value)
                        ) && $feeInstallment->nullify_fee == null
                    ) {
                        $fee_amount = $feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount;

                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        if ($feeInstallment->payment == null) {
                            $payable_amount = $fee_amount;
                        } else {
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        $nullified_amount = $payable_amount - $paid_amount;

                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'created_by' => auth()->user()->id,
                            'class_fee_student_amount_id' => $feeInstallment->id,
                            'nullify_fee_id' => $nullifyFee->id,
                            'student_id' => $input['student_id'],
                            'fee_id' => $feeInstallment->fee_id,
                            'fee_type_id' => $feeInstallment->fee_type_id,
                            'fee_amount' => $fee_amount,
                            'payable_amount' => $payable_amount,
                            'paid_amount' =>  $paid_amount,
                            'nullified_amount' => $nullified_amount,
                            'status' => Status::ACTIVE,
                        ];

                        $this->nullifyFeeRepository->createNullifyFeeAmount($dataArray);

                        if ($feeInstallment->payment != null) {
                            $feeInstallment->update([
                                'amount' => $paid_amount + $discount_amount,
                                'semester' => null,
                            ]);
                        } else {
                            $feeInstallment->delete();
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Fee nullified successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    /**
     * generate tc save
     */
    public function generateTcSave(Request $request)
    {
        $studentId = $request->input('student_id') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';

        $checkAlreadyDaft = $this->studentCertificateRepository->getDaftTcByStudentIdClassroomId($studentId, $classroomId);

        if ($checkAlreadyDaft) {
            $tcStudent = $this->studentCertificateRepository->getByStudentIdClassroomId($studentId,  $classroomId);

            if (!empty($tcStudent)) {
                $certificateUpdated = $this->studentCertificateRepository->update($tcStudent->id, [
                    'is_generated' => true,
                    'academic_year_id' => getAcademicYearId(),
                    'is_draft' => false,
                    'generated_date_at' => now(),
                    'issue_date_at' => now(),
                    'certificate_type' => CertificateType::TRANSFER_CERTIFICATE->value,
                ]);
                if ($certificateUpdated) {
                    // new code
                    $student = $this->studentRepository->update($studentId, ['status' => Status::INACTIVE]);

                    return response()->json(['status' => 200, 'message' => 'TC generated successfully']);
                } else {
                    return response()->json(['status' => 500, 'message' => 'Error creating TC']);
                }
            } else {
                $dataArr =  [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'student_id' => $studentId,
                    'classroom_id' => $classroomId,
                    'certificate_no' => $studentId,
                    'generated_date_at' => now(),
                    'issue_date_at' => now(),
                    'is_draft' => false,
                    'tc_reason' => null,
                    'certificate_type' => CertificateType::TRANSFER_CERTIFICATE->value,
                    'is_generated' => true,
                ];

                $student = $this->studentRepository->update($studentId, ['status' => Status::INACTIVE]);
                if (!empty($student)) {
                    $certificate = $this->studentCertificateRepository->create($dataArr);
                    if ($certificate) {
                        return response()->json(['status' => 200, 'message' => 'TC generated successfully']);
                    } else {
                        return response()->json(['status' => 500, 'message' => 'Error creating TC']);
                    }
                }
            }
        } else {
            return response()->json(['status' => 200, 'message' => 'First save as a draft.']);
        }
    }

    /**
     * Draft tc save
     */
    public function generateDraftTcSave(Request $request)
    {
        $studentId = $request->input('student_id') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';

        $tcStudent = $this->studentCertificateRepository->checkDraft($studentId,  $classroomId);

        if (!empty($tcStudent)) {
            return response()->json(['status' => 200, 'message' => 'Already save draft tc']);
        }

        $dataArr =  [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'student_id' => $studentId,
            'classroom_id' => $classroomId,
            'certificate_no' => $studentId,
            'generated_date_at' => now(),
            'tc_reason' => null,
            'is_draft' => true,
            'is_generated' => false,
            'certificate_type' => CertificateType::TRANSFER_CERTIFICATE->value,
        ];

        $certificate = $this->studentCertificateRepository->create($dataArr);
        if ($certificate) {
            return response()->json(['status' => 200, 'message' => 'TC save to draft successfully']);
        } else {
            return response()->json(['status' => 500, 'message' => 'Error creating TC']);
        }
    }

    /**
     * generate bulk tc save
     */
    public function generateBulkTcSave(Request $request)
    {
        $studentIds = $request->input('student_ids') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';

        DB::beginTransaction();

        try {
            if (!empty($studentIds)) {
                $studentIds = explode(',', $studentIds);

                $checkAlreadyDaft = $this->studentCertificateRepository->getBulkDraftTcByStudentIdsClassroomId($studentIds, $classroomId)->groupBy('student_id');

                $tcStudents = $this->studentCertificateRepository->getByStudentIdsClassroomId($studentIds,  $classroomId)->groupBy('student_id')->toArray();

                foreach ($studentIds as $studentId) {
                    if (!empty($checkAlreadyDaft[$studentId])) {
                        if (!empty($tcStudents[$studentId])) {
                            $this->studentCertificateRepository->update($tcStudents[$studentId][0]['id'], [
                                'is_generated' => true,
                                'academic_year_id' => getAcademicYearId(),
                                'is_draft' => false,
                                'generated_date_at' => now(),
                                'issue_date_at' => now(),
                                'certificate_type' => CertificateType::TRANSFER_CERTIFICATE->value,
                            ]);
                        } else {
                            $dataArr =  [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'student_id' => $studentId,
                                'classroom_id' => $classroomId,
                                'certificate_no' => $studentId,
                                'generated_date_at' => now(),
                                'issue_date_at' => now(),
                                'is_draft' => false,
                                'tc_reason' => null,
                                'certificate_type' => CertificateType::TRANSFER_CERTIFICATE->value,
                                'is_generated' => true,
                            ];

                            $student = $this->studentRepository->update($studentId, ['status' => Status::INACTIVE]);

                            if (!empty($student)) {
                                $this->studentCertificateRepository->create($dataArr);
                            }
                        }
                    }
                }
            }

            DB::commit();

            return response()->json(['status' => 200, 'message' => 'TC generated successfully']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json(['status' => 500, 'message' => 'Error creating TC']);
        }
    }

    /**
     * Draft bulk tc save
     */
    public function generateBulkDraftTcSave(Request $request)
    {
        $studentIds = $request->input('student_ids') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';

        DB::beginTransaction();

        try {
            if (!empty($studentIds)) {
                $studentIds = explode(',', $studentIds);

                $tcStudents = $this->studentCertificateRepository->checkBulkDraft($studentIds,  $classroomId)->groupBy('student_id');

                foreach ($studentIds as $studentId) {
                    if (empty($tcStudents[$studentId])) {
                        $dataArr =  [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'student_id' => $studentId,
                            'classroom_id' => $classroomId,
                            'certificate_no' => $studentId,
                            'generated_date_at' => now(),
                            'tc_reason' => null,
                            'is_draft' => true,
                            'is_generated' => false,
                            'certificate_type' => CertificateType::TRANSFER_CERTIFICATE->value,
                        ];

                        $this->studentCertificateRepository->create($dataArr);
                    }
                }
            }

            DB::commit();

            return response()->json(['status' => 200, 'message' => 'TC save to draft successfully']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json(['status' => 500, 'message' => 'Error creating TC']);
        }
    }


    /**
     * studentBonafideCertificateSave
     */
    public function studentBonafideCertificateSave(Request $request)
    {
        $studentId = $request->input('student_id') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';

        $dataArr =  [
            'school_id' => getUserSchoolId(),
            'student_id' => $studentId,
            'academic_year_id' => getAcademicYearId(),
            'classroom_id' => $classroomId,
            'certificate_no' => $studentId,
            'generated_date_at' => now(),
            'issue_date_at' => now(),
            'tc_reason' => null,
            'is_draft' => null,
            'is_generated' => true,
            'certificate_type' => CertificateType::BONAFIDE_CERTIFICATE->value,
        ];

        $certificate = $this->studentCertificateRepository->create($dataArr);
        if ($certificate) {
            return response()->json(['status' => 200, 'message' => 'Certificate created successfully']);
        } else {
            return response()->json(['status' => 500, 'message' => 'Error creating Certificate']);
        }
    }


    /**
     * studentCharacterCertificateSave
     */
    public function studentCharacterCertificateSave(Request $request)
    {
        $studentId = $request->input('student_id') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';

        $dataArr =  [
            'school_id' => getUserSchoolId(),
            'student_id' => $studentId,
            'classroom_id' => $classroomId,
            'certificate_no' => $studentId,
            'academic_year_id' => getAcademicYearId(),
            'generated_date_at' => now(),
            'issue_date_at' => now(),
            'tc_reason' => null,
            'is_draft' => null,
            'is_generated' => true,
            'certificate_type' => CertificateType::CHARACTER_CERTIFICATE->value,
        ];

        $certificate = $this->studentCertificateRepository->create($dataArr);
        if ($certificate) {
            return response()->json(['status' => 200, 'message' => 'Certificate created successfully']);
        } else {
            return response()->json(['status' => 500, 'message' => 'Error creating Certificate']);
        }
    }


    /**
     * tcSummaryReport
     */
    public function tcSummaryReport(Request $request): Response
    {
        $classroomId = '';
        $tcSummery = [];
        $tcStudents = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? '';
            $isDraft = $request->input('is_draft') ?? false;
            $isGenerated = $request->input('is_generated') ?? false;

            $tcStudents = $this->studentCertificateRepository->getTcByClassroomId($classroomId, $isDraft, $isGenerated);
        }

        $tcSummery = $this->studentCertificateRepository->getTcSummary();

        return Inertia::render('StudentCertificate/TcSummaryReport', [
            'tcSummery' => $tcSummery,
            'tcStudents' => $tcStudents,
        ]);
    }

    /**
     * Display tc report
     */
    public function generatedTCReport(Request $request): Response
    {

        $searchValue = '';
        $academicYearId = '';
        $status = '';
        $classroomId = '';
        $generatedTc = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? '';
            $searchValue = $request->input('search_value') ?? '';
            $academicYearId = $request->input('academic_year_id') ?? '';
            $status = $request->input('status') ?? '';
        }

        // status
        $statusType = Status::cases();
        $statusArr = array();
        foreach ($statusType as $status2) {
            array_push($statusArr, ['id' => $status2->value, 'title' => $status2->value]);
        }

        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        $generatedTc = $this->studentCertificateRepository->getGeneratedTc($searchValue, $academicYearId, $status, $classroomId)->toArray();

        return Inertia::render('StudentCertificate/GeneratedTCReport', [
            'generatedTc' => $generatedTc,
            'classrooms' => $classrooms,
            'academicSession' => $academicSession,
            'statusArr' => $statusArr,
        ]);
    }

    /**
     * studentCertificate
     */
    public function studentCertificate(Request $request): Response
    {
        $students = $this->studentRepository->getListForCertificate();

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            })->toArray();
        }

        $certificates = $this->certificateRepository->getStudentCertificatesWithypesAll();

        // certificate type
        $certificateType = CertificateType::cases();
        $certificateArr = array();
        foreach ($certificateType as $certificate) {
            array_push($certificateArr, ['id' => $certificate->value, 'title' => $certificate->value]);
        }

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // get classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'academic_year_id' => $classroom->academic_year_id])->all();

        // student names
        $studentNameData = $this->studentRepository->getActiveNameAndId();
        $studentNames = $studentNameData->map(fn ($student) => ['id' => $student->id, 'title' => $student->first_name . ' ' . $student->middle_name . ' ' .  $student->last_name, 'classroom_id' => $student->classroom_id])->all();

        // fee type
        $feeTypes = $this->feeTypeRepository->getActiveIdName();

        // fee title
        $feeData = $this->feeRepository->getActiveIdTitle();
        $feeTitles = $feeData->map(fn ($fee) => ['id' => $fee->id, 'title' => $fee->title])->all();

        $classroomWthExamTitles = $this->classroomRepository->getClassroomWithExams();

        $tempArray = array();
        $classroomWthExam = array();

        // new code
        foreach ($classroomWthExamTitles as $type) {
            if (!in_array($type->exam_title . '_' . $type->classroom_id, $tempArray)) {
                array_push($classroomWthExam, ['id' => $type->exam_id, 'classroom_id' => $type->classroom_id, 'title' => $type->exam_title]);
                array_push($tempArray, $type->exam_title . '_' . $type->classroom_id);
            }
        }
        // old code
        // foreach ($classroomWthExamTitles as $type) {
        //     if (!in_array($type->exam_title, $tempArray)) {
        //         array_push($classroomWthExam, ['id' => $type->exam_id, 'classroom_id' => $type->classroom_id, 'title' => $type->exam_title]);
        //         array_push($tempArray, $type->exam_title);
        //     }
        // }

        $idCardCertificates = $this->studentCertificateRepository->getStudentIdCardCertificates();

        return Inertia::render('StudentCertificate/StudentCertificate', [
            'certificateArr' => $certificateArr,
            'classrooms' => $classrooms,
            'studentNames' => $studentNames,
            'students' => $students,
            'academicSession' => $academicSession,
            'feeTypes' => $feeTypes,
            'feeTitles' => $feeTitles,
            'classroomWthExam' => $classroomWthExam,
            'certificates' => $certificates,
            'idCardCertificates' => $idCardCertificates,
        ]);
    }


    /**
     * teacherCertificate
     */
    public function teacherCertificate(): Response
    {
        $teacherNameData = $this->staffRepository->getActiveNameId();
        $teacherNames = $teacherNameData->map(fn ($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' .  $teacher->last_name])->all();

        $idCardCertificates = $this->studentCertificateRepository->getTeacherIdCardCertificates();

        return Inertia::render('StudentCertificate/TeacherCertificate', [
            'teacherNames' => $teacherNames,
            'idCardCertificates' => $idCardCertificates,
        ]);
    }

    /**
     * teacherCertificate
     */
    public function teacherCertificateOld(Request $request): Response
    {
        $teacherNameData = $this->staffRepository->getActiveTeacherNameId();
        $teacherNames = $teacherNameData->map(fn ($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' .  $teacher->last_name])->all();

        $certificates = $this->certificateRepository->getTeacherCertificatesWithypesAll();

        return Inertia::render('StudentCertificate/TeacherCertificate', [
            'teacherNames' => $teacherNames,
            'certificates' => $certificates,
        ]);
    }

    /**
     * certificateList
     */
    public function certificateList(Request $request): Response
    {

        $studentCertificate = [];

        if ($request->isMethod('post')) {
            $searchValue = $request->input('search_value') ?? '';
            $studentCertificate = $this->studentCertificateRepository->getActiveAllBonafideCharacterSearch($searchValue);
        } else {
            $student = $this->studentCertificateRepository->getActiveAllBonafideCharacter();
            $student->load(['studentData', 'classroomData']);
            $studentCertificate = $student->toArray();
        }

        return Inertia::render('StudentCertificate/CertificateList', [
            'studentCertificate' => $studentCertificate,
        ]);
    }

    /**
     * Display the tc.
     */
    public function generatedCertificate(Request $request): Response
    {

        $classroomId = '';
        $classroomStudents = [];
        $certificateStudents = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? '';
            $certificateStudents = $this->studentCertificateRepository->getCertificateByClassroomId($classroomId);
        }

        $classroomStudents = $this->studentCertificateRepository->getClassroomWithStudentCertificate();

        return Inertia::render('StudentCertificate/GeneratedCertificate', [
            'classroomStudents' => $classroomStudents,
            'certificateStudents' => $certificateStudents,
        ]);
    }

    /**
     * Display custom id card certificate.
     */
    public function customIdCard(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        // $staffs = $this->staffRepository->getActiveTeacherNameId();
        $staffs = $this->staffRepository->getActiveNameId();

        $students = [];
        $idCardCertificate = null;
        $audienceTypeArray = [];
        $orientationTypeArray = [];

        foreach (IdCardAudienceType::cases() as $case) {
            if ($case->value != IdCardAudienceType::GUARDIAN->value) {
                array_push($audienceTypeArray, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        foreach (OrientationType::cases() as $case) {
            array_push($orientationTypeArray, ['id' => $case->value, 'title' => $case->value]);
        }

        $idCardCertificates = $this->studentCertificateRepository->getActiveAllIdCardCertificates();

        if (count($idCardCertificates) > 0) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

            if (!empty($schoolData)) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    // 'title' => $schoolData->title,
                    // 'affiliation_no' => $schoolData->affiliation_no,
                    // 'phone' => $schoolData->phone,
                    // 'phone_2' => $schoolData->phone_2,
                    // 'mail' => $schoolData->mail,
                    // 'street_address' => $schoolData->street_address,
                ];
            }

            $idCardCertificates = $idCardCertificates->map(function ($idCardCertificate) use ($schoolData) {
                $columns = !empty($idCardCertificate['columns']) ? json_decode($idCardCertificate['columns']) : [];

                $sortedColumns = $columns;

                usort($sortedColumns, function ($item1, $item2) {
                    return $item1?->order <=> $item2?->order;
                });

                $idCardCertificate['column_data'] = $sortedColumns;

                $idCardCertificate['title'] = $idCardCertificate?->template_name;
                $idCardCertificate['columns'] = $columns;
                $idCardCertificate['header'] = !empty($idCardCertificate['header']) ? json_decode($idCardCertificate['header']) : null;
                $idCardCertificate['body'] = !empty($idCardCertificate['body']) ? json_decode($idCardCertificate['body']) : null;
                $idCardCertificate['footer'] = !empty($idCardCertificate['footer']) ? json_decode($idCardCertificate['footer']) : null;
                $idCardCertificate['back_page'] = !empty($idCardCertificate['back_page']) ? json_decode($idCardCertificate['back_page']) : null;
                $idCardCertificate['background_image'] = $idCardCertificate?->backgroundImage?->path ?? "";
                $idCardCertificate['header_background_image'] = $idCardCertificate?->headerBackgroundImage?->path ?? "";
                $idCardCertificate['body_background_image'] = $idCardCertificate?->bodyBackgroundImage?->path ?? "";
                $idCardCertificate['footer_background_image'] = $idCardCertificate?->footerBackgroundImage?->path ?? "";
                $idCardCertificate['footer_signature_image'] = $idCardCertificate?->footerSignatureImage?->path ?? "";
                $idCardCertificate['backpage_background_image'] = $idCardCertificate?->backpageBackgroundImage?->path ?? "";

                $idCardCertificate->makeHidden([
                    'backgroundImage',
                    'headerBackgroundImage',
                    'bodyBackgroundImage',
                    'footerBackgroundImage',
                    'backpageBackgroundImage',
                    'footerSignatureImage'
                ]);

                $idCardCertificate['school_logo'] =  $schoolData['logo']['path'] ?? "";
                $idCardCertificate['academic_session'] =  $schoolData['academic_year'] ?? "";

                return $idCardCertificate;
            });
        }

        $fields = [
            'student' => [
                'student_name' => 'Student Name',
                'admission_number' => 'Admission Number',
                'class_name' => 'Class Name',
                'roll_number' => 'Roll Number',
                'gender' => 'Gender',
                'date_of_birth' => 'Date of birth',
                'address' => 'Address',
                'house_name' => 'House Name',
                'blood_group' => 'Blood Group',
                'student_type' => 'Student Type',
                'student_aadharcard_no' => 'Student Aadharcard No.',
                'father_name' => 'Father Name',
                'father_phone' => 'Father Phone',
                'mother_name' => 'Mother Name',
                'mother_phone' => 'Mother Phone',
                'permanent_address' => 'Permanent Address',
            ],
            'teacher' => [
                'staff_name' => 'Staff Name',
                'designation' => 'Designation',
                'department' => 'Department',
                'father_name' => 'Father Name',
                'gender' => 'Gender',
                'doj' => 'DOJ',
                'dob' => 'DOB',
                'religion' => 'Religion',
                // 'caste' => 'Caste',
                // 'biometric_code' => 'Biometric Code',
                'employee_id' => 'Employee Id',
                'qualification' => 'Qualification',
                'city' => 'City',
                'blood_group' => 'Blood Group',
                'address' => 'Address',
            ],
            'guardian' => [
                'guardian_name' => 'Guardian Name',
                'guardian_relation' => 'Guardian Relation',
                'guardian_qualification' => 'Guardian Qualification',
                'guardian_occupation' => 'Guardian Occupation',
                'guardian_designation' => 'Guardian Designation',
                'guardian_department' => 'Guardian Department',
                'guardian_office_address' => 'Guardian Office Address',
                'guardian_contact_no' => 'Guardian Contact No',
                'guardian_email' => 'Guardian Email',
                'guardian_id' => 'Guardian Id',
                'guardian_adhar_no' => 'Guardian Aadhar No',
                'guardian_village' => 'Guardian Village',
            ],
        ];

        $fontSizes = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'];

        $fontSizeArray = [];

        foreach ($fontSizes as $fontSize) {
            array_push($fontSizeArray, ['id' => $fontSize, 'title' => $fontSize]);
        }

        if ($request->isMethod('POST')) {
            $templateId = $request?->template_id ?? null;
            $classroomId = $request?->classroom_id ?? null;

            if (count($idCardCertificates) > 0) {
                if (!empty($templateId)) {
                    $idCardCertificate = $idCardCertificates->filter(function ($idCardCertificate) use ($templateId) {
                        return $idCardCertificate?->id == $templateId;
                    })->first();
                } else {
                    $idCardCertificate = $idCardCertificates->sortByDesc('id')->first();
                }
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

                if (count($students) > 0) {
                    $students = $students->loadMissing([
                        'promotedClassroom',
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId);
                        }
                    ]);

                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student->promotedClassroom?->id;
                            $student['class_name_id'] = $student->promotedClassroom?->class_name_id;
                        }

                        $rollNo = $student?->classroomRoll?->roll_no ?? "";

                        $student['roll_no'] = $rollNo;

                        return $student;
                    })->sortBy('roll_no')->toArray();
                }
            }
        }

        return Inertia::render('StudentCertificate/CustomIdCard', [
            'classrooms' => $classrooms,
            'audienceTypeArray' => $audienceTypeArray,
            'orientationTypeArray' => $orientationTypeArray,
            'idCardCertificates' => $idCardCertificates,
            'idCardCertificate' => $idCardCertificate,
            'fields' => $fields,
            'students' => $students,
            'fontSizeArray' => $fontSizeArray,
            'staffs' => $staffs,
        ]);
    }


    /**
     * save custom id card certificate.
     */
    public function customIdCardSave(IdCardCertificateRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'template_name' => !empty($input['template_name']) ? $input['template_name'] : "",
                'orientation' => !empty($input['orientation']) ? $input['orientation'] : "",
                'audience_type' => !empty($input['audience_type']) ? $input['audience_type'] : "",
                'is_with_backpage' => !empty($input['is_with_backpage']) ? $input['is_with_backpage'] : false,
                'background_color' => !empty($input['background_color']) ? $input['background_color'] : null,
                'columns' => !empty($input['columns']) ? json_encode($input['columns']) : null,
                'header' => !empty($input['header']) ? json_encode($input['header']) : null,
                'body' => !empty($input['body']) ? json_encode($input['body']) : null,
                'footer' => !empty($input['footer']) ? json_encode($input['footer']) : null,
                'back_page' => !empty($input['back_page']) ? json_encode($input['back_page']) : null,
                'status' => Status::ACTIVE
            ];

            $idCardCertificate = $this->studentCertificateRepository->createIdCardCertificate($dataArray);

            if ($idCardCertificate?->id != null) {
                $this->uploadIdCardImages($idCardCertificate, $request);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Certificate saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * update custom id card certificate.
     */
    public function customIdCardUpdate(int $id, IdCardCertificateUpdateRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $idCardCertificate = $this->studentCertificateRepository->getIdCardCertificateById($id);

            if ($idCardCertificate == null) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }

            $dataArray = [
                'template_name' => !empty($input['template_name']) ? $input['template_name'] : "",
                'orientation' => !empty($input['orientation']) ? $input['orientation'] : "",
                'audience_type' => !empty($input['audience_type']) ? $input['audience_type'] : "",
                'is_with_backpage' => !empty($input['is_with_backpage']) ? $input['is_with_backpage'] : false,
                'background_color' => !empty($input['background_color']) ? $input['background_color'] : null,
                'columns' => !empty($input['columns']) ? json_encode($input['columns']) : null,
                'header' => !empty($input['header']) ? json_encode($input['header']) : null,
                'body' => !empty($input['body']) ? json_encode($input['body']) : null,
                'footer' => !empty($input['footer']) ? json_encode($input['footer']) : null,
                'back_page' => !empty($input['back_page']) ? json_encode($input['back_page']) : null,
            ];

            $this->studentCertificateRepository->updateIdCardCertificate($id, $dataArray);

            $this->uploadIdCardImages($idCardCertificate, $request);

            DB::commit();

            return redirect()->back()->with('message', 'Certificate saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    * helper method to upload id card image
    */
    protected function uploadIdCardImages(object $idCardCertificate, Request $request)
    {
        // backgound image
        if (!empty($request->file('background_image'))) {
            $name = 'id_card_background_image';

            $image_url = $this->_upload->uploadImage($request, 'background_image', $name);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\IdCardCertificate::class,
                'imageable_id' =>  $idCardCertificate->id,
                'name' => $name,
            ];

            $dataImage = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);
        }

        // header background image
        if (!empty($request->file('header_background_image'))) {
            $name = 'id_card_header_background_image';

            $image_url = $this->_upload->uploadImage($request, 'header_background_image', $name);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\IdCardCertificate::class,
                'imageable_id' =>  $idCardCertificate->id,
                'name' => $name,
            ];

            $dataImage = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);
        }

        // body background image
        if (!empty($request->file('body_background_image'))) {
            $name = 'id_card_body_background_image';

            $image_url = $this->_upload->uploadImage($request, 'body_background_image', $name);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\IdCardCertificate::class,
                'imageable_id' =>  $idCardCertificate->id,
                'name' => $name,
            ];

            $dataImage = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);
        }

        // footer background image
        if (!empty($request->file('footer_background_image'))) {
            $name = 'id_card_footer_background_image';

            $image_url = $this->_upload->uploadImage($request, 'footer_background_image', $name);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\IdCardCertificate::class,
                'imageable_id' =>  $idCardCertificate->id,
                'name' => $name,
            ];

            $dataImage = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);
        }

        // footer signature image
        if (!empty($request->file('footer_signature_image'))) {
            $name = 'id_card_footer_signature_image';

            $image_url = $this->_upload->uploadImage($request, 'footer_signature_image', $name);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\IdCardCertificate::class,
                'imageable_id' =>  $idCardCertificate->id,
                'name' => $name,
            ];

            $dataImage = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);
        }

        // bcakepage background image
        if (!empty($request->file('backpage_background_image'))) {
            $name = 'id_card_backpage_background_image';

            $image_url = $this->_upload->uploadImage($request, 'backpage_background_image', $name);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\IdCardCertificate::class,
                'imageable_id' =>  $idCardCertificate->id,
                'name' => $name,
            ];

            $dataImage = array(
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);
        }
    }

    /*
    * upload id card certificate background image
    */
    public function uploadCustomIdCardBackgroundImage(Request $request)
    {
        $input = $request->validate(
            [
                'image' => ['required', 'mimes:jpg,jpeg,png'],
                'file_name' => ['required', 'string'],
                'template_id' => ['required', 'integer']
            ],
            [
                'image.required' => 'required',
                'image.mimes' => 'supported file types: jpg,jpeg,png',
            ]
        );

        $idCardCertificate = $this->studentCertificateRepository->getIdCardCertificateById($input['template_id']);

        if ($idCardCertificate != null) {
            if (!empty($request->file('image'))) {
                $name = 'id_card_' . $input['file_name'];

                $image_url = $this->_upload->uploadImage($request, 'image', $name);

                $attributesToCheck = [
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\IdCardCertificate::class,
                    'imageable_id' =>  $idCardCertificate->id,
                    'name' => $name,
                ];

                $dataImage = array(
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                );

                $image = $this->imageRepository->updateOrCreate($attributesToCheck, $dataImage);

                if ($image) {
                    return redirect()->back()->with('message', 'Image saved successfully.');
                }
            }
        }

        return redirect()->back()->with('error', 'Something goes wrong.');
    }

    /*
    * delete id card certificate image
    */
    public function deleteCustomIdCardCertificateImage(int $id, string $name)
    {
        $idCardCertificate = $this->studentCertificateRepository->getIdCardCertificateById($id);

        if ($idCardCertificate == null) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        $fileName = 'id_card_' . $name;

        $deleteImage = $this->studentCertificateRepository->deleteIdCardCertificateImageByCertificateIdAndImageName($idCardCertificate->id, $fileName);

        if (!$deleteImage) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Deleted successfully.');
    }

}
