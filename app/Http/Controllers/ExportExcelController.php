<?php

namespace App\Http\Controllers;

use Mail;
use Storage;
use Throwable;
use Carbon\Carbon;
use App\Enums\Gender;
use App\Enums\EnquiryType;
use App\Enums\FeeTypeEnum;
use App\Enums\LateFineType;
use App\Enums\RefundStatus;
use Illuminate\Support\Str;
use App\Enums\PaymentStatus;
use App\Enums\PublishStatus;
use App\Enums\StudentStatus;
use App\Exports\StaffExport;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Exports\ClassesExport;
use App\Enums\LedgerAmountType;
use App\Exports\StudentsExport;
use App\Enums\SurveyQuestionType;
use App\Models\TransportStoppage;
use Illuminate\Http\JsonResponse;
use App\Enums\AdmissionExamStatus;
use App\Enums\CustomFieldDataType;
use App\Enums\ScholarBoardingType;
use App\Enums\DocumentAudienceType;
use App\Exports\CalendarListExport;
use App\Exports\LedgerReportExport;
use App\Enums\StudentStaffFieldType;
use App\Exports\DayBookReportExport;
use App\Exports\EpfWageReportExport;
use App\Exports\JournalReportExport;
use App\Exports\ProductReportExport;
use App\Exports\VoucherReportExport;
use App\Http\Controllers\Controller;
use App\Repositories\IFeeRepository;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ClassDueReportExport;
use App\Exports\ExamWiseReportExport;
use App\Exports\PurchaseReportExport;
use App\Exports\SalaryPfReportExport;
use App\Exports\StudentDetailsExport;
use App\Repositories\IExamRepository;
use App\Repositories\ISaleRepository;
use App\Repositories\IUserRepository;
use App\Exports\AdjustFeeReportExport;
use App\Exports\ExamGroupReportExport;
use App\Repositories\IEventRepository;
use App\Repositories\ILeaveRepository;
use App\Repositories\IStaffRepository;
use App\Enums\VisitorEnquiryDetailEnum;
use App\Exports\FeeSummaryReportExport;
use App\Exports\NewStudentReportExport;
use App\Exports\OldStudentReportExport;
use App\Exports\SaleLedgerReportExport;
use App\Exports\StudentAgeReportExport;
use App\Repositories\ILedgerRepository;
use App\Repositories\ISurveyRepository;
use App\Exports\BasicSalaryReportExport;
use App\Exports\ClassWiseTcReportExport;
use App\Exports\ProductSaleReportExport;
use App\Exports\SubjectMarkReportExport;
use App\Exports\SubjectWiseReportExport;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IHolidayRepository;
use App\Repositories\IJournalRepository;
use App\Repositories\IPaymentRepository;
use App\Repositories\IProductRepository;
use App\Repositories\IReceiptRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IVoucherRepository;
use App\Exports\ConsolidatedReportExport;
use App\Exports\FeeDailyCollectionExport;
use App\Exports\ManageChequeReportExport;
use App\Exports\PaidDiscountReportExport;
use App\Exports\RefundCancelReportExport;
use App\Exports\RegistrationReportExport;
use App\Exports\RouteSummaryReportExport;
use App\Exports\StudentEmailReportExport;
use App\Exports\StudentHouseReportExport;
use App\Exports\StudentRouteReportExport;
use App\Exports\StudentsExportWithFilter;
use App\Repositories\IAcademicRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IDocumentRepository;
use App\Repositories\IPurchaseRepository;
use App\Repositories\IReligionRepository;
use Illuminate\Support\Facades\Validator;
use App\Exports\LedgerPaymentReportExport;
use App\Exports\LedgerReceiptReportExport;
use App\Exports\SalaryPaymentReportExport;
use App\Exports\StudentGenderReportExport;
use App\Exports\VacantTeacherReportExport;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IExamGroupRepository;
use App\Repositories\ITimetableRepository;
use App\Repositories\ITransportRepository;
use App\Exports\AdmissionExamSummaryExport;
use App\Exports\DailyAdmissionReportExport;
use App\Exports\SchoolDocumentReportExport;
use App\Exports\SpecialFeeTypeReportExport;
use App\Exports\StaffLeaveAllocationExport;
use App\Exports\StudentAddressReportExport;
use App\Exports\StudentContactReportExport;
use App\Exports\StudentGeneralReportExport;
use App\Exports\StudentPaymentReportExport;
use App\Exports\StudentSiblingReportExport;
use App\Exports\SurveyResponseReportExport;
use App\Exports\VisitorEnquiryReportExport;
use App\Repositories\IFeePaymentRepository;
use App\Exports\AttendanceTakenReportExport;
use App\Exports\CompleteFeePaidReportExport;
use App\Exports\ConsolidatedDueReportExport;
use App\Exports\FeeCancellationReportExport;
use App\Exports\GuardianWiseDueReportExport;
use App\Exports\HeadWisePaymentReportExport;
use App\Exports\InactiveStudentReportExport;
use App\Exports\OptionalSubjectReportExport;
use App\Exports\ProductImportTemplateExport;
use App\Exports\ProductLocationReportExport;
use App\Exports\ProductPurchaseReportExport;
use App\Exports\PromotedStudentReportExport;
use App\Exports\StaffAttendanceReportExport;
use App\Exports\StoppageSummaryReportExport;
use App\Exports\StudentCategoryReportExport;
use App\Exports\StudentDocumentReportExport;
use App\Exports\StudentInactiveReportExport;
use App\Exports\StudentReligionReportExport;
use App\Exports\StudentStoppageReportExport;
use App\Repositories\ICustomFieldRepository;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\ISchoolShiftRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IVirtualExamRepository;
use App\Exports\ExamMarkImportTemplateExport;
use App\Exports\ExpectedDiscountReportExport;
use App\Exports\QuestionImportTemplateExport;
use App\Exports\RegistrationExamReportExport;
use App\Exports\SaleLedgerReturnReportExport;
use App\Exports\TransportVoucherReportExport;
use App\Repositories\IAcademicYearRepository;
use App\Repositories\IPaymentMonthRepository;
use App\Repositories\ISchoolPeriodRepository;
use App\Repositories\IStaffEarningRepository;
use App\Exports\FinalConsolidatedReportExport;
use App\Exports\YearlyHeadWiseDueReportExport;
use App\Repositories\IDeductionTypeRepository;
use App\Exports\AttendanceNotTakenReportExport;
use App\Exports\ClassWiseStudentTcReportExport;
use App\Exports\FeeStudentFollowUpReportExport;
use App\Exports\GeneratedTcStudentReportExport;
use App\Exports\StudentHeadWiseFeeReportExport;
use App\Exports\TimetableAllotmentReportExport;
use App\Exports\VirtualExamSummaryReportExport;
use App\Repositories\IVisitorEnquiryRepository;
use App\Exports\DayWiseRegistrationReportExport;
use App\Exports\MonthWiseAttendanceReportExport;
use App\Exports\StaffSalaryImportTemplateExport;
use App\Exports\StudentBoardingTypeReportExport;
use App\Exports\StudentDocumentWiseReportExport;
use App\Repositories\IStaffAttendanceRepository;
use App\Exports\ClassWiseStudentListReportExport;
use App\Exports\FeeHeadWiseDailyCollectionExport;
use App\Exports\HeadWiseDailySummaryReportExport;
use App\Exports\StaffCancelledSalaryReportExport;
use App\Exports\StudentBirthDateWiseReportExport;
use App\Exports\StudentOldNewSummaryReportExport;
use App\Exports\StudentWithTransportReportExport;
use App\Repositories\IAdjustFeePaymentRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Exports\ClassWiseRegistrationReportExport;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Exports\ClassWiseFeeCollectionReportExport;
use App\Exports\CompleteOutstandingDueReportExport;
use App\Exports\HeadWiseOutstandingDueReportExport;
use App\Exports\StudentInactiveSummaryReportExport;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStudentCertificateRepository;
use App\Repositories\IStudentDueFollowUpRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Exports\ClassWiseFeeCollectionSummaryExport;
use App\Exports\ClassWiseStudentSummaryReportExport;
use App\Exports\DateWiseClassAttendanceReportExport;
use App\Exports\StudentWithoutTransportReportExport;
use App\Repositories\IClassroomAttendanceRepository;
use App\Repositories\IStaffAdvancePaymentRepository;
use App\Exports\ClassWiseConsolidatedDueReportExport;
use App\Exports\ClassWiseDailyAttendanceReportExport;
use App\Exports\StaffSalaryBankStatementReportExport;
use App\Exports\StudentClassWiseDocumentReportExport;
use App\Exports\StudentGenderWiseSummaryReportExport;
use App\Exports\YearlyHeadWisePaidSummaryReportExport;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Exports\StudentBoardingWiseSummaryReportExport;
use App\Exports\StudentCategoryWiseSummaryReportExport;
use App\Exports\StudentReligionWiseSummaryReportExport;
use App\Repositories\IFeePaymentRefundMethodRepository;
use App\Exports\ClassroomWiseStudentSummaryReportExport;
use App\Exports\FeeInstallmentWiseDailyCollectionExport;
use App\Exports\RegistrationDailyCollectionReportExport;
use App\Repositories\IResultCardConfigurationRepository;
use App\Exports\InstallmentWiseFeeCollectionReportExport;
use App\Exports\InstallmentWiseFeeCollectionSummaryExport;
use App\Exports\InstallmentWiseOutstandingDueReportExport;
use App\Exports\StudentEmploymentCategoryWiseReportExport;
use App\Exports\MasterClassWiseDailyAttendanceReportExport;

final class ExportExcelController extends Controller
{

    public function __construct(
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IFeeRepository $feeRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
        private IAdjustFeePaymentRepository $adjustFeePaymentRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private ITransportRepository $transportRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IVoucherRepository $voucherRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IFeePaymentRefundRepository $feePaymentRefundRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IStudentDueFollowUpRepository $studentDueFollowUpRepository,
        private IStudentCertificateRepository $studentCertificateRepository,
        private IUserRepository $userRepository,
        private IAcademicYearRepository $academicYearRepository,
        private IReligionRepository $religionRepository,
        private ICategoryRepository $categoryRepository,
        private ISubjectRepository $subjectRepository,
        private IExamRepository $examRepository,
        private IAcademicRepository $academicRepository,
        private IAdmissionRepository $admissionRepository,
        private IStaffAttendanceRepository $staffAttendanceRepository,
        private IStaffRepository $staffRepository,
        private ISurveyRepository $surveyRepository,
        private IExamGroupRepository $examGroupRepository,
        private IResultCardConfigurationRepository $resultCardConfigurationRepository,
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private ILeaveRepository $leaveRepository,
        private IPaymentRepository $paymentRepository,
        private ILedgerRepository $ledgerRepository,
        private ISaleRepository $saleRepository,
        private IReceiptRepository $receiptRepository,
        private IPurchaseRepository $purchaseRepository,
        private IProductRepository $productRepository,
        private IVirtualExamRepository $virtualExamRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private IPaymentMonthRepository $paymentMonthRepository,
        private ICustomFieldRepository $customFieldRepository,
        private IEventRepository $eventRepository,
        private IHolidayRepository $holidayRepository,
        private IVisitorEnquiryRepository $visitorEnquiryRepository,
        private IDocumentRepository $documentRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private ISchoolShiftRepository $schoolShiftRepository,
        private ISchoolPeriodRepository $schoolPeriodRepository,
        private ITimetableRepository $timetableRepository,
        private IJournalRepository $journalRepository,
        private IEarningTypeRepository $earningTypeRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
        private IStaffEarningRepository $staffEarningRepository,
        private IDeductionTypeRepository $deductionTypeRepository,
    ) {
        // do something
    }


    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function classesDownload()
    {
        return Excel::download(new ClassesExport($this->classroomRepository), 'classes.xlsx');
    }

    /*
    *   export paid discount report in excel
    */
    public function downloadStudentExcel(Request $request)
    {
        $classroomId = $request?->classroom_id;
        $boardingType = $request?->boarding_type;
        $studentSearch = $request?->student_search;

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::STUDENT->value);

        $students = $this->studentRepository->getActiveAll($classroomId, $boardingType, $studentSearch);

        if (!empty($students)) {
            $students?->loadMissing(['studentCustomFields']);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classTitle'] = $student?->promotedClassroom?->title;
                }

                return $student;
            });

            $export = new StudentsExportWithFilter($students, $customFields?->toArray());
        } else {
            $export = new StudentsExportWithFilter([], $customFields?->toArray());
        }

        return Excel::download($export, 'students_list.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function exportOldAcademicYearData()
    {
        return Excel::download(new StudentsExport($this->studentRepository), 'invoices.xlsx');
    }

    /*
    *   export cheque manage report in excel
    */
    public function exportChequeManageReport(Request $request)
    {
        $chequeReportsData = [];

        $chequeReports = $this->feePaymentMethodRepository->getFilteredChequeReports(
            "cheque_cleared",
            $request->from_date ?? "",
            $request->to_date ?? "",
            $request->classroom_id ?? null,
            $request->cheque_no ?? null,
            $request->admission_no ?? "",
            $request->student_name ?? "",
        );

        if (count($chequeReports) > 0) {
            $chequeReports->loadMissing([
                'fee_payments',
                'student.father:id,student_id,first_name,middle_name,last_name,phone,sms_phone,guardian_type'
            ]);

            foreach ($chequeReports as $report) {
                $receipt_title = "";

                if (count($report->fee_payments) > 0) {
                    foreach ($report->fee_payments as $payment) {
                        // Determine the payment note based on the fee payment type and due status
                        $note = '';

                        switch ($payment->fee_payment_type) {
                            case FeePaymentType::GENERALVOUCHER->value:
                                $note = $payment->is_fee_due ? 'due voucher fee' : 'with voucher fee';
                                break;
                            case FeePaymentType::TRANSPORTVOUCHER->value:
                                $note = $payment->is_fee_due ? 'due transport fee' : 'with transport fee';
                                break;
                            default:
                                $note = $payment->is_fee_due ? 'against previous dues from' : 'for';
                                break;
                        }

                        // Construct receipt note
                        if (strlen($receipt_title) <= 0) {
                            $receipt_title = "Payment {$note} {$payment->fee->title}";
                        } elseif (!strpos($receipt_title, $payment->fee->title)) {
                            $receipt_title .= ", {$note} {$payment->fee->title}";
                        }
                    }
                }

                $cheque_date = Carbon::parse($report->cheque_date)->format('d M,Y');
                $payment_date = Carbon::parse($report->payment_date)->format('d M,Y');

                // concat student name
                $student_name = "";

                if ($report?->student != null) {
                    $student_name = "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}";
                }

                // concat parent name
                $parent_name = "";

                if ($report?->student?->father != null) {
                    $parent_name = "{$report?->student?->father?->first_name} {$report?->student?->father?->middle_name} {$report?->student?->father?->last_name}";
                }

                $tempArray = [
                    'cheque_no' => $report->cheque_no,
                    'cheque_date' => $cheque_date,
                    'amount' => (float) $report->cheque_amount ?? 0,
                    'bank_name' => $report?->bank?->name ?? "",
                    'student_name' => $student_name,
                    'class_name' => $report?->student?->classroom?->title ?? "",
                    'admission_no' => $report?->student?->admission_no ?? "",
                    'parent_name' => $parent_name,
                    'payment_date' => $payment_date,
                    'receipt_title' => $receipt_title,
                    'receipt_no' => $report->receipt_no,
                    'payment_note' => $report->payment_note,
                    'status' => 'Cleared'
                ];

                $chequeReportsData[] = $tempArray;
            }
        }

        $export = new ManageChequeReportExport($chequeReportsData);

        return Excel::download($export, 'fee_manage_cheques_report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export expected discount report in excel
    */
    public function exportExpectedDiscountReport(Request $request)
    {
        $expectedDiscountReportData = [];

        $discountId = $request->discount_id ?? null;
        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $search = $request->search ?? "";
        $fromFeeTitle = "";
        $toFeeTitle = "";

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $fromFeeTitle = $this->feeRepository->getFeeTitleById($fromFeeId)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($toFeeId)?->title ?? "";

            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getExpectedStudentFeeDiscountsData($fromFeeId, $toFeeId, $discountId, $search);

            if (count($studentFeeDiscounts) > 0) {
                $total_discount = 0;

                foreach ($studentFeeDiscounts->groupBy(['discount_id']) as $discountId => $group) {
                    $studentsData = $group->groupBy('student_id')->map(function ($groupedItem) {
                        $studentData = [
                            'student' => $groupedItem->first()->student,
                            'total_fee_discount' => 0
                        ];

                        $amountsDataArray = [];
                        $total_fee_discount = 0;
                        $total_fee_amount = 0;

                        foreach ($groupedItem as $item) {
                            foreach ($item->student->classroom_structures_fees as $amountItem) {
                                if (
                                    $item->fee_type_id === $amountItem->fee_type_id &&
                                    $item->fee_id === $amountItem->fee_id &&
                                    $item->student->class_name_id === $amountItem->class_name_id
                                ) {
                                    $amountItem['discount_amount'] = $item->amount;
                                    $amountItem['is_discount_percentage'] = $item->is_discount_percentage;

                                    $amountsDataArray[$item->id] = $amountItem;
                                }
                            }

                            foreach ($item->student->classroom_fee_student_amounts as $amountItem) {
                                if (
                                    $item->fee_type_id === $amountItem->fee_type_id &&
                                    $item->fee_id === $amountItem->fee_id &&
                                    $item->student->id === $amountItem->student_id
                                ) {
                                    $amountItem['discount_amount'] = $item->amount;
                                    $amountItem['is_discount_percentage'] = $item->is_discount_percentage;

                                    $amountsDataArray[$item->id] = $amountItem;
                                }
                            }
                        }

                        foreach ($amountsDataArray as $item) {
                            $total_fee_amount += (float) $item['amount'] ?? 0 * ($item['semester'] ?? 1);
                            if ($item['is_discount_percentage'] == true) {
                                $discount_amount = (float) ($item['discount_amount'] / 100) * (float) $item['amount'] ?? 0;

                                $total_fee_discount += $discount_amount;
                            } else {
                                $total_fee_discount += (float) $item['discount_amount'] ?? 0;
                            }
                        }

                        if ($total_fee_amount > $total_fee_discount) {
                            $studentData['total_fee_discount'] = $total_fee_discount;
                        } else if ($total_fee_amount <= $total_fee_discount) {
                            $studentData['total_fee_discount'] = $total_fee_amount;
                        }

                        if ($studentData['total_fee_discount'] > 0) {
                            return $studentData;
                        }
                    });

                    foreach ($studentsData as $student) {
                        if ($student != null) {
                            $total_discount += $student['total_fee_discount'] ?? 0;

                            $student_name = "{$student['student']['first_name']} {$student['student']['middle_name']} {$student['student']['last_name']}";

                            $father_name = "";

                            if (!empty($student['student']['father'])) {
                                $father_name = "{$student['student']['father']['first_name']} {$student['student']['father']['middle_name']} {$student['student']['father']['last_name']}";
                            }

                            $mother_name = "";

                            if (!empty($student['student']['mother'])) {
                                $mother_name = "{$student['student']['mother']['first_name']} {$student['student']['mother']['middle_name']} {$student['student']['mother']['last_name']}";
                            }

                            $tempArray = [
                                'student_name' => $student_name,
                                'admission_number' => $student['student']['admission_no'] ?? "",
                                'roll_number' => $student['student']['classroomRoll']['roll_no'] ?? "",
                                'class_name' => $student['student']['classroom']['title'] ?? "",
                                'father_name' => $father_name,
                                'mother_name' => $mother_name,
                                'title' => $group->first()->discount?->title ?? "",
                                'discount_amount' => $student['total_fee_discount'] ?? 0,
                            ];

                            $expectedDiscountReportData['reports'][] = $tempArray;
                        }
                    }
                }

                $expectedDiscountReportData['total_discount'] = $total_discount;
            }
        }

        $export = new ExpectedDiscountReportExport($expectedDiscountReportData, $fromFeeTitle, $toFeeTitle);

        return Excel::download($export, 'avail_concession_list.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export paid discount report in excel
    */
    public function exportPaidDiscountReport(Request $request)
    {
        $expectedDiscountReportData = [];

        $discountId = $request->discount_id ?? null;
        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $fromFeeTitle = "";
        $toFeeTitle = "";

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $fromFeeTitle = $this->feeRepository->getFeeTitleById($fromFeeId)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($toFeeId)?->title ?? "";

            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getPaidStudentFeeDiscountsData($fromFeeId, $toFeeId, $discountId);

            if (count($studentFeeDiscounts) > 0) {
                $total_discount = 0;

                foreach ($studentFeeDiscounts->groupBy('discount_id') as $discountId => $group) {
                    $studentsData = $group->groupBy('student_id')->map(function ($groupedItem) {
                        $discount_amount = (float) $groupedItem?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                        $studentData = [
                            'student' => $groupedItem?->first()?->student?->toArray(),
                            'total_fee_discount' => $discount_amount
                        ];

                        if ($studentData['total_fee_discount'] > 0) {
                            return $studentData;
                        }
                    });

                    foreach ($studentsData as $student) {
                        if ($student != null) {
                            $total_discount += $student['total_fee_discount'] ?? 0;

                            $student_name = "{$student['student']['first_name']} {$student['student']['middle_name']} {$student['student']['last_name']}";

                            $father_name = "";

                            if (!empty($student['student']['father'])) {
                                $father_name = "{$student['student']['father']['first_name']} {$student['student']['father']['middle_name']} {$student['student']['father']['last_name']}";
                            }

                            $mother_name = "";

                            if (!empty($student['student']['mother'])) {
                                $mother_name = "{$student['student']['mother']['first_name']} {$student['student']['mother']['middle_name']} {$student['student']['mother']['last_name']}";
                            }

                            $tempArray = [
                                'student_name' => $student_name,
                                'admission_number' => $student['student']['admission_no'] ?? "",
                                'roll_number' => $student['student']['classroomRoll']['roll_no'] ?? "",
                                'class_name' => $student['student']['classroom']['title'] ?? "",
                                'father_name' => $father_name,
                                'mother_name' => $mother_name,
                                'title' => $group->first()->discount?->title ?? "Unknown Discount",
                                'discount_amount' => $student['total_fee_discount'] ?? 0,
                            ];

                            $expectedDiscountReportData['reports'][] = $tempArray;
                        }
                    }
                }

                $expectedDiscountReportData['total_discount'] = (float) $total_discount;
            }
        }

        $export = new PaidDiscountReportExport($expectedDiscountReportData, $fromFeeTitle, $toFeeTitle);

        return Excel::download($export, 'concession_list.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export cancelled refund report in excel
    */
    public function exportCancelledRefundReport()
    {
        $cancelledRefundReport = $this->feePaymentRefundMethodRepository->getFeeRefundAmountsByRefundStatus(RefundStatus::CANCELED);

        if (count($cancelledRefundReport) > 0) {
            $cancelledRefundReport->load(['cancelled_by.user', 'academic_year']);

            $cancelledRefundReport = $cancelledRefundReport->map(function ($refund) {
                $refund_amount = 0;

                if (count($refund->refund_amounts) > 0) {
                    foreach ($refund->refund_amounts as $refundAmount) {
                        $refund_amount += $refundAmount->refund_amount ?? 0;
                    }
                }

                return [
                    'admission_no' => $refund?->student?->admission_no ?? "",
                    'student_name' => "{$refund?->student?->first_name} {$refund?->student?->middle_name} {$refund?->student?->last_name}",
                    'class' => $refund?->student?->classroom?->title ?? "",
                    'academic_year' => $refund?->academic_year?->academic_session ?? getAcademicYear(),
                    'refund_amount' => number_format($refund_amount, 2),
                    'refund_date' => Carbon::parse($refund['refund_date'])->format('d-M-Y'),
                    'refund_cancel_date' => Carbon::parse($refund['cancel_date'])->format('d-M-Y'),
                    'cancelled_by' => "{$refund?->cancelled_by?->user?->first_name} {$refund?->cancelled_by?->user?->middle_name} {$refund?->cancelled_by?->user?->last_name}",
                    'cancellation_note' => $refund?->cancellation_reason ?? "",
                ];
            })->toArray();
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $report_created_on = Carbon::now()->format('d-M-Y');
        $academicYear = getAcademicYear();

        $export = new RefundCancelReportExport($cancelledRefundReport, $report_created_on, $academicYear, $schoolTitle);

        return Excel::download($export, 'Refund_cancel_report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export adjust fee report in excel
    */
    public function exportAdjustFeeReport()
    {
        $adjustFeePaymentReport = $this->adjustFeePaymentRepository->getActiveAll();
        $adjustFeePaymentReportData = [];

        if (count($adjustFeePaymentReport) > 0) {
            $adjustFeePaymentReport->load(['adjust_fee_payment_amounts.feeType', 'from_fee', 'to_fee', 'student.classroom']);

            $total_amount = 0;

            $adjustFeePaymentReport = $adjustFeePaymentReport->map(function ($adjustItem) use (&$total_amount) {
                $adjust_amount = 0;

                if (count($adjustItem->adjust_fee_payment_amounts) > 0) {
                    foreach ($adjustItem->adjust_fee_payment_amounts as $adjustAmount) {
                        $adjust_amount += $adjustAmount->adjust_amount ?? 0;
                    }
                }

                $total_amount += $adjust_amount;

                $fromFeeTitle = $adjustItem?->from_fee?->title ?? "";
                $toFeeTitle = $adjustItem?->to_fee?->title ?? "";

                return [
                    'admission_number' => $adjustItem?->student?->admission_no ?? "",
                    'student_name' => "{$adjustItem?->student?->first_name} {$adjustItem?->student?->middle_name} {$adjustItem?->student?->last_name}",
                    'class_name' => $adjustItem?->student?->classroom?->title ?? "",
                    'adjust_date' => Carbon::parse($adjustItem['adjust_date'])->format('d/m/Y'),
                    'by_installment' => $fromFeeTitle . " -> " . $toFeeTitle,
                    'note' => $adjustItem?->adjust_note ?? "",
                    'adjust_amount' => number_format($adjust_amount, 2),
                ];
            })->toArray();

            $adjustFeePaymentReportData['reports'] = $adjustFeePaymentReport;
            $adjustFeePaymentReportData['total_amount'] = number_format($total_amount, 2);
        }

        $export = new AdjustFeeReportExport($adjustFeePaymentReportData);

        return Excel::download($export, 'Adjust_fee_report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export voucher report in excel
    */
    public function exportVoucherReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;
        $startDate = $request->start_date ?? "";
        $endDate = $request->end_date ?? "";

        $feeVouchers = $this->studentFeeVoucherRepository->getFilteredData($classroomId, $studentId, $startDate, $endDate);
        $voucherReportsData = [];

        if (count($feeVouchers) > 0) {
            $feeVouchers->loadMissing(['student.classroom', 'feeTypeAmounts.feeType', 'feeTypeAmounts.payment', 'feeTypeAmounts.fee_payments']);

            if ($request->voucher_status && $request->voucher_status != null) {
                $feeVouchers = $feeVouchers->filter(function ($feeVoucher) use ($request) {
                    return $feeVoucher->feeTypeAmounts->filter(function ($feeTypeAmount) use ($request) {
                        if ($feeTypeAmount->payment != null) {
                            if ($feeTypeAmount->payment->payment_status == PaymentStatus::CANCELLED->value && $request->voucher_status === 'Due') {
                                return true;
                            }

                            return $feeTypeAmount?->payment?->payment_status === $request->voucher_status;
                        } else {
                            return $request->voucher_status === 'Due';
                        }
                    })->isNotEmpty();
                })->values();
            }

            if (count($feeVouchers) > 0) {
                $total_amount = 0;
                $total_paid = 0;
                $total_due = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $voucherReports = $feeVouchers->map(function ($voucher) use (&$total_amount, &$total_paid, &$total_due, $paid_status_count, &$partial_status_count, &$due_status_count) {
                    $amount = 0;
                    $paid_amount = 0;
                    $due_amount = 0;
                    $discount_amount = 0;

                    if (count($voucher->feeTypeAmounts) > 0) {
                        foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                            $fee_amount = $feeTypeAmount->amount ?? 0;
                            $amount += $fee_amount;

                            $status = $feeTypeAmount?->payment?->payment_status;

                            if ($feeTypeAmount->payment != null) {
                                $paid_amount = $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                                $discount_amount = $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            }

                            if ($status == PaymentStatus::CANCELLED->value) {
                                $status = PaymentStatus::DUE->value;
                            }

                            if ((($fee_amount - $discount_amount) - $paid_amount) <= 0) {
                                $status = PaymentStatus::PAID->value;
                            } else if ((($fee_amount - $discount_amount) - $paid_amount) > 0 && !empty($feeTypeAmount['payment'])) {
                                $status = PaymentStatus::PARTIAL->value;
                            }

                            if ($status === PaymentStatus::PAID->value) {
                                $paid_status_count++;
                            } else if ($status === PaymentStatus::PARTIAL->value) {
                                $partial_status_count++;
                            } else {
                                $due_status_count++;
                            }
                        }
                    }

                    $due_amount = ($amount - $discount_amount) - $paid_amount;

                    $total_amount += $amount;
                    $total_paid += $paid_amount;
                    $total_due += $due_amount;

                    if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                        $payment_status =  PaymentStatus::PAID->value;
                    } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                        $payment_status = PaymentStatus::PARTIAL->value;
                    } else {
                        $payment_status = PaymentStatus::DUE->value;
                    }

                    return [
                        'admission_no' => $voucher?->student?->admission_no ?? "",
                        'student_name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                        'class' => $voucher?->student?->classroom?->title ?? "",
                        'title' => $voucher?->title ?? "",
                        'start_date' => Carbon::parse($voucher['start_date'])->format('d-M-Y'),
                        'end_date' => Carbon::parse($voucher['end_date'])->format('d-M-Y'),
                        'amount' => (float) $amount,
                        'total_paid' => (float) $paid_amount,
                        'total_due' => (float) $due_amount,
                        'status' => $payment_status,
                    ];
                })->toArray();

                $voucherReportsData['reports'] = $voucherReports;
                $voucherReportsData['total_amount'] = (float) $total_amount;
                $voucherReportsData['total_paid'] = (float) $total_paid;
                $voucherReportsData['total_due'] = (float) $total_due;
            }
        }

        $export = new VoucherReportExport($voucherReportsData);

        return Excel::download($export, 'Voucher_report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export transport voucher report in excel
    */
    public function exportTransportVoucherReport(Request $request)
    {
        $fromId = $request->from_id ?? null;
        $toId = $request->to_id ?? null;
        $classroomIds = $request->classroom_ids ?? [];
        $paymentStatus = $request->payment_status ?? "";

        $transportVoucherReport = [];

        if (!empty($fromId) && !empty($toId)) {
            $transportVoucherReport = $this->getTransportVoucherReport($fromId, $toId, $classroomIds, $paymentStatus);
        }

        $export = new TransportVoucherReportExport($transportVoucherReport);

        return Excel::download($export, 'Transport_voucher_report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
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
            $students->loadMissing(['promotedClassroom', 'classroom:id,title', 'father:id,student_id,guardian_type,sms_phone']);
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
                    $allocateTransport->loadMissing(['transportRoute:id,name']);

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
                        $tempArray['sms_no'] = $student?->father?->sms_phone ?? "";
                        $tempArray['title'] = $allocate?->voucher?->title ?? "";
                        $tempArray['fee_type'] = !empty($transportFee) ? $transportFee->fee_type : "Transport";
                        $tempArray['amount'] =  $fee_amount - $discount_amount;
                        $tempArray['total_paid'] = $paid_amount;
                        $tempArray['total_due'] = $due_amount;
                        $tempArray['status'] = $payment_status;
                        $tempArray['route'] = $allocate?->transportRoute?->name ?? "";

                        $total_payable += ($fee_amount - $discount_amount);
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;

                        array_push($transportVouchersArray, $tempArray);
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $currentAllocateTransport->loadMissing(['transportRoute:id,name']);
                        $fee_amount = (float) $currentAllocateTransport->amount ?? 0;
                        $routeName = $currentAllocateTransport?->transportRoute?->name ?? "";
                    } else {
                        $previousAllocateTransport->loadMissing(['transportRoute:id,name']);
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                        $routeName = $previousAllocateTransport?->transportRoute?->name ?? "";
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $tempArray = array();

                        $paid_amount = 0;
                        $due_amount = $fee_amount;
                        $discount_amount = 0;

                        $tempArray['admission_no'] = $student->admission_no;
                        $tempArray['student_name'] = "{$student->first_name} {$student->middle_name} {$student->last_name}";
                        $tempArray['class_name'] = $student?->classroom?->title ?? "";
                        $tempArray['sms_no'] = $student?->father?->sms_phone ?? "";
                        $tempArray['title'] = $voucher?->title ?? "";
                        $tempArray['fee_type'] = !empty($transportFee) ? $transportFee->fee_type : "Transport";
                        $tempArray['amount'] =  $fee_amount - $discount_amount;
                        $tempArray['total_paid'] = $paid_amount;
                        $tempArray['total_due'] = $due_amount;
                        $tempArray['status'] = PaymentStatus::DUE->value;
                        $tempArray['route'] = $routeName;

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

    /*
    *   export student head wise fee report in excel
    */
    public function exportStudentHeadWiseFeeReport(Request $request)
    {
        $studentHeadWiseReports = [];
        $payment_fee_types = [];
        $classroomTitle = "All Class";
        $fromFeeTitle = "";
        $toFeeTitle = "";

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        if (!empty($request->classroom_id)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom != null ? $classroom?->title : "All Class";
        }

        if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
            $fromFeeId = !empty($request->from_fee_id) ? $request->from_fee_id : null;
            $toFeeId = !empty($request->to_fee_id) ? $request->to_fee_id : null;
            $classroomId = !empty($request->classroom_id) ? $request->classroom_id : null;
            $studentStatus = !empty($request->student_status) ? $request->student_status : "";

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($fromFeeId)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($toFeeId)?->title ?? "";

            // get transport fee setting
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getStudentHeadWiseFeeInstallments($fromFeeId, $toFeeId, $classroomId, $studentStatus);

            $grand_total_amount = 0;
            $grand_total_discount = 0;
            $grand_total_payable = 0;
            $grand_total_paid = 0;
            $grand_total_due = 0;

            $studentHeadWiseReports['reports'] = [];
            $studentHeadWiseReports['fee_type_amounts'] = [];
            $studentHeadWiseReports['total_fee'] = 0;
            $studentHeadWiseReports['concession'] = 0;
            $studentHeadWiseReports['total_payable'] = 0;
            $studentHeadWiseReports['total_paid'] = 0;
            $studentHeadWiseReports['total_due'] = 0;

            if (count($feeInstallments) > 0) {
                $studentFeeDiscounts = [];

                $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                    if ($feeInstallment?->student?->promotedClassroom != null) {
                        if (!empty($feeInstallment['student']['classroom'])) {
                            unset($feeInstallment['student']['classroom']);
                        }

                        $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                        $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                    }

                    return $feeInstallment;
                });

                $this->mergeFeeInstallmentsTransportFeeAndLateFee($feeInstallments, $studentFeeDiscounts, $transportFeeStructureSetting);

                $this->processStudentHeadWiseFeeInstallmentsData(
                    $studentHeadWiseReports,
                    $payment_fee_types,
                    $grand_total_amount,
                    $grand_total_discount,
                    $grand_total_payable,
                    $grand_total_paid,
                    $grand_total_due,
                    $feeInstallments,
                    $studentFeeDiscounts
                );

                $studentHeadWiseReports['total_fee'] = $grand_total_amount;
                $studentHeadWiseReports['concession'] = $grand_total_discount;
                $studentHeadWiseReports['total_payable'] = $grand_total_payable;
                $studentHeadWiseReports['total_paid'] = $grand_total_paid;
                $studentHeadWiseReports['total_due'] = $grand_total_due;
            }

            if (!empty($request->voucher) && $request->voucher == true) {
                // get transport voucher data and calculate due
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $this->getAndProcessStudentHeadWiseTransportVouchersData(
                        $studentHeadWiseReports,
                        $payment_fee_types,
                        $transportFeeStructureSetting,
                        $request->classroom_id ?? null,
                        $request->student_status ?? "",
                    );
                }

                // get general voucher all due
                $generalVouchers = $this->studentFeeVoucherRepository->getStudentHeadWiseAllVouchers(
                    $request->classroom_id ?? null,
                    $request->student_status ?? "",
                );

                $generalVouchers = $generalVouchers->map(function ($voucher) {
                    if ($voucher?->student?->promotedClassroom != null) {
                        if (!empty($voucher['student']['classroom'])) {
                            unset($voucher['student']['classroom']);
                        }
                        $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                        $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                    }

                    return $voucher;
                });

                // process general vouchers data
                $this->processStudentHeadWiseGeneralVouchersData($studentHeadWiseReports, $payment_fee_types, $generalVouchers);

                $studentHeadWiseReports['hasVoucher'] = true;
            }

            $studentHeadWiseReports['fee_type_amounts'] = $payment_fee_types;
        }

        // sort reports by classroom roll
        $this->sortStudentHeadWiseReportByClassroomRoll($studentHeadWiseReports);

        $export = new StudentHeadWiseFeeReportExport($studentHeadWiseReports, $classroomTitle, $fromFeeTitle, $toFeeTitle, $schoolTitle, $academicYear);

        return Excel::download($export, "Head_Wise Report ({$classroomTitle}).xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to processs voucher due data
    */
    protected function sortStudentHeadWiseReportByClassroomRoll(array &$studentHeadWiseReports)
    {
        if (!empty($studentHeadWiseReports['reports'])) {
            usort($studentHeadWiseReports['reports'], function ($a, $b) {
                $rollNoA = $a['roll_no'] ?? null;
                $rollNoB = $b['roll_no'] ?? null;

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
    }

    /*
    *   helper method to merge transport fee and late fee to fee installments for student head wise fee report
    */
    private function mergeFeeInstallmentsTransportFeeAndLateFee(&$feeInstallments, &$studentFeeDiscounts, $transportFeeStructureSetting)
    {
        foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
            $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

            foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
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
                                                    'fee_payments' => [],
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
                                'fee_payments' => [],
                                'nullify_fee' => null,
                            ]);

                            $feeInstallments->push($newLateFee);
                        }
                    }
                }
            }
        }
    }

    /*
    *   helper method to merge transport fee and late fee to fee installments for student head wise fee report
    */
    private function processStudentHeadWiseFeeInstallmentsData(
        &$studentHeadWiseReports,
        &$payment_fee_types,
        &$grand_total_amount,
        &$grand_total_discount,
        &$grand_total_payable,
        &$grand_total_paid,
        &$grand_total_due,
        $feeInstallments,
        $studentFeeDiscounts
    ) {
        foreach ($feeInstallments->groupBy('student_id') as $studentId => $groupedInstallments) {
            $total_amount = 0;
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;
            $total_discount = 0;
            $payment_fee_types_amount = [];

            foreach ($groupedInstallments as $installment) {
                $fee_amount = !empty($installment['semester']) ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount'];
                $payable_amount = $fee_amount;
                $due_amount = $fee_amount;
                $paid_amount = 0;
                $discount_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $payable_amount = $paid_amount;
                } elseif (!empty($installment['payment']) && count($installment['fee_payments']) > 0) {
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }
                    }
                }

                $payable_amount = $fee_amount - $discount_amount;

                // if ($paid_amount > 0) {
                // }
                // calculate fee type paid amount for grand total
                if (isset($payment_fee_types[$installment['feeType']['fee_type']])) {
                    $payment_fee_types[$installment['feeType']['fee_type']] += $paid_amount;
                } else {
                    $payment_fee_types[$installment['feeType']['fee_type']] = $paid_amount;
                }

                // calculate fee type paid amount for each date group
                if (isset($payment_fee_types_amount[$installment['feeType']['fee_type']])) {
                    $payment_fee_types_amount[$installment['feeType']['fee_type']] += $paid_amount;
                } else {
                    $payment_fee_types_amount[$installment['feeType']['fee_type']] = $paid_amount;
                }

                $total_amount += $fee_amount;
                $total_payable += $payable_amount;
                $total_paid += $paid_amount;
                $total_due += $due_amount;
                $total_discount += $discount_amount;
            }

            $student = $groupedInstallments?->first()?->student;

            $admissionNo = "";
            $studentName = "";
            $studentClassroomTitle = "";
            $fatherName = "";
            $fatherPhone = "";
            $status = "";

            if ($student != null) {
                $admissionNo = $student?->admission_no ?? "";
                $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                $studentClassroomTitle = $student?->classroom?->title ?? "";

                if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                    $status = strtoupper('Tc');
                } else {
                    $status = strtoupper($student?->status?->value ?? "");
                }
            }

            if ($student?->father != null) {
                $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                $fatherPhone = $student?->father?->phone ?? "";
            }

            $studentHeadWiseReports['reports'][$studentId] = [
                'admission_no' => $admissionNo,
                'name' => $studentName,
                'roll_no' => $student?->classroomRoll?->roll_no ?? "",
                'class' => $studentClassroomTitle,
                'father_name' => $fatherName,
                'father_mobile' => $fatherPhone,
                'total_fee' => $total_amount,
                'concession' => $total_discount,
                'total_payable' => $total_payable,
                'total_paid' => $total_paid,
                'total_due' => $total_due,
                'status' => $status,
                ...$payment_fee_types_amount
            ];

            $grand_total_amount += $total_amount;
            $grand_total_discount += $total_discount;
            $grand_total_payable += $total_payable;
            $grand_total_paid += $total_paid;
            $grand_total_due += $total_due;
        }
    }

    /*
    *   helper method to processs transport voucher due data for student head wise fee report
    */
    private function getAndProcessStudentHeadWiseTransportVouchersData(&$studentHeadWiseReports, &$payment_fee_types, $transportFeeStructureSetting, $classroomId = null, $studentStatus = "")
    {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndActiveStatus($classroomId, $studentStatus);

        if (count($students) > 0) {
            $students->loadMissing([
                'promotedClassroom',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId());

                    if (!empty($classroomId)) {
                        $query->where('classroom_id', $classroomId);
                    }
                }
            ]);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    unset($student['classroom']);

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                $transportFeeType = $this->feeTypeRepository->getTransportFeeType();

                $total_fee = 0;
                $concession = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount ?? 0;
                        $discount_amount = 0;
                        $payable_amount = $fee_amount;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        // if ($paid_amount > 0) {
                        // }
                        // calculate fee type paid amount for grand total
                        if (isset($payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'])) {
                            $payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'] += $paid_amount;
                        } else {
                            $payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'] = $paid_amount;
                        }

                        // check if student data already exists. if alreday exists then update fee type amounts
                        if (isset($studentHeadWiseReports['reports'][$student->id][$transportFeeType?->fee_type ?? 'Transport'])) {
                            $studentHeadWiseReports['reports'][$student->id][$transportFeeType?->fee_type ?? 'Transport'] += $paid_amount;
                        } else {
                            $studentHeadWiseReports['reports'][$student->id][$transportFeeType?->fee_type ?? 'Transport'] = $paid_amount;
                        }

                        $total_fee += $fee_amount;
                        $concession += $discount_amount;
                        $total_payable += $payable_amount;
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport?->amount ?? 0;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    if ($fee_amount > 0) {
                        $payable_amount = $fee_amount;
                        $due_amount = $fee_amount;

                        foreach ($allocateTransportVouchers as $voucher) {
                            $total_fee += $fee_amount;
                            $total_payable += $payable_amount;
                            $total_due += $due_amount;
                        }
                    }
                }

                if ($total_fee > 0) {
                    // update reports total amounts
                    $keysToUpdate = ['total_fee', 'concession', 'total_payable', 'total_paid', 'total_due'];

                    foreach ($keysToUpdate as $key) {
                        if (isset($studentHeadWiseReports['reports'][$student->id][$key])) {
                            $studentHeadWiseReports['reports'][$student->id][$key] += $$key;
                        } else {
                            $studentHeadWiseReports['reports'][$student->id][$key] = $$key;
                        }

                        if (isset($studentHeadWiseReports[$key])) {
                            $studentHeadWiseReports[$key] += $$key;
                        } else {
                            $studentHeadWiseReports[$key] = $$key;
                        }
                    }

                    $admissionNo = "";
                    $studentName = "";
                    $studentClassroomTitle = "";
                    $fatherName = "";
                    $fatherPhone = "";
                    $status = "";

                    if ($student != null) {
                        $admissionNo = $student?->admission_no ?? "";
                        $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                        $studentClassroomTitle = $student?->classroom?->title ?? "";
                        $status = strtoupper($student?->status?->value ?? "");

                        if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                            $status = strtoupper('Tc');
                        } else {
                            $status = strtoupper($student?->status?->value ?? "");
                        }
                    }

                    if ($student?->father != null) {
                        $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                        $fatherPhone = $student?->father?->phone ?? "";
                    }

                    $studentHeadWiseReports['reports'][$student->id]['admission_no'] = $studentHeadWiseReports['reports'][$student->id]['admission_no'] ?? $admissionNo;
                    $studentHeadWiseReports['reports'][$student->id]['name'] = $studentHeadWiseReports['reports'][$student->id]['name'] ?? $studentName;
                    $studentHeadWiseReports['reports'][$student->id]['class'] = $studentHeadWiseReports['reports'][$student->id]['class'] ?? $studentClassroomTitle;
                    $studentHeadWiseReports['reports'][$student->id]['roll_no'] = $studentHeadWiseReports['reports'][$student->id]['roll_no'] ?? $student?->classroomRoll?->roll_no;
                    $studentHeadWiseReports['reports'][$student->id]['father_name'] = $studentHeadWiseReports['reports'][$student->id]['father_name'] ?? $fatherName;
                    $studentHeadWiseReports['reports'][$student->id]['father_mobile'] = $studentHeadWiseReports['reports'][$student->id]['father_mobile'] ?? $fatherPhone;
                    $studentHeadWiseReports['reports'][$student->id]['status'] = $studentHeadWiseReports['reports'][$student->id]['status'] ?? $status;
                }
            }
        }
    }

    /*
    *   helper method to processs voucher due data for student head wise fee report
    */
    private function processStudentHeadWiseGeneralVouchersData(&$studentHeadWiseReports, &$payment_fee_types, $vouchers)
    {
        if (count($vouchers) > 0) {
            $grand_total_fee = 0;
            $grand_concession = 0;
            $grand_total_payable = 0;
            $grand_total_paid = 0;
            $grand_total_due = 0;

            foreach ($vouchers->groupBy('student_id') as $studentId => $groupedVouchers) {
                $total_fee = 0;
                $concession = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;

                foreach ($groupedVouchers as $voucher) {
                    if (count($voucher->feeTypeAmounts) > 0) {
                        foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                            $amount = (float) $voucherAmountData->amount ?? 0;
                            $discount_amount = 0;
                            $payable_amount = $amount;
                            $paid_amount = 0;
                            $due_amount = $amount;

                            if ($voucherAmountData?->payment != null) {
                                $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $amount - $discount_amount - $paid_amount;
                                $payable_amount = $amount - $discount_amount;
                            }

                            // if ($paid_amount > 0) {
                            // }
                            // calculate fee type paid amount for grand total
                            if (isset($payment_fee_types[$voucherAmountData->feeType->fee_type])) {
                                $payment_fee_types[$voucherAmountData->feeType->fee_type] += $paid_amount;
                            } else {
                                $payment_fee_types[$voucherAmountData->feeType->fee_type] = $paid_amount;
                            }

                            // check if student data already exists. if alreday exists then update fee type amounts
                            if (isset($studentHeadWiseReports['reports'][$studentId][$voucherAmountData?->feeType?->fee_type])) {
                                $studentHeadWiseReports['reports'][$studentId][$voucherAmountData?->feeType?->fee_type] += $paid_amount;
                            } else {
                                $studentHeadWiseReports['reports'][$studentId][$voucherAmountData?->feeType?->fee_type] = $paid_amount;
                            }

                            $total_fee += $amount;
                            $concession += $discount_amount;
                            $total_payable += $payable_amount;
                            $total_paid += $paid_amount;
                            $total_due += $due_amount;
                        }

                        // update reports total amounts
                        $keysToUpdate = ['total_fee', 'concession', 'total_payable', 'total_paid', 'total_due'];

                        foreach ($keysToUpdate as $key) {
                            if (isset($studentHeadWiseReports['reports'][$studentId][$key])) {
                                $studentHeadWiseReports['reports'][$studentId][$key] += $$key;
                            } else {
                                $studentHeadWiseReports['reports'][$studentId][$key] = $$key;
                            }
                        }

                        $student = $voucher?->student;

                        $admissionNo = "";
                        $studentName = "";
                        $studentClassroomTitle = "";
                        $fatherName = "";
                        $fatherPhone = "";
                        $status = "";

                        if ($student != null) {
                            $admissionNo = $student?->admission_no ?? "";
                            $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                            $studentClassroomTitle = $student?->classroom?->title ?? "";

                            if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                                $status = strtoupper('Tc');
                            } else {
                                $status = strtoupper($student?->status?->value ?? "");
                            }
                        }

                        if ($student?->father != null) {
                            $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                            $fatherPhone = $student?->father?->phone ?? "";
                        }

                        $studentHeadWiseReports['reports'][$studentId]['admission_no'] = $studentHeadWiseReports['reports'][$studentId]['admission_no'] ?? $admissionNo;
                        $studentHeadWiseReports['reports'][$studentId]['name'] = $studentHeadWiseReports['reports'][$studentId]['name'] ?? $studentName;
                        $studentHeadWiseReports['reports'][$student->id]['roll_no'] = $studentHeadWiseReports['reports'][$student->id]['roll_no'] ?? $student?->classroomRoll?->roll_no;
                        $studentHeadWiseReports['reports'][$studentId]['class'] = $studentHeadWiseReports['reports'][$studentId]['class'] ?? $studentClassroomTitle;
                        $studentHeadWiseReports['reports'][$studentId]['father_name'] = $studentHeadWiseReports['reports'][$studentId]['father_name'] ?? $fatherName;
                        $studentHeadWiseReports['reports'][$studentId]['father_mobile'] = $studentHeadWiseReports['reports'][$studentId]['father_mobile'] ?? $fatherPhone;
                        $studentHeadWiseReports['reports'][$studentId]['status'] = $studentHeadWiseReports['reports'][$studentId]['status'] ?? $status;
                    }
                }

                $grand_total_fee += $total_fee;
                $grand_concession += $concession;
                $grand_total_payable += $total_payable;
                $grand_total_paid += $total_paid;
                $grand_total_due += $total_due;
            }

            // update reports total amounts
            $keysToUpdate = ['total_fee', 'concession', 'total_payable', 'total_paid', 'total_due'];

            foreach ($keysToUpdate as $key) {
                if (isset($studentHeadWiseReports[$key])) {
                    $studentHeadWiseReports[$key] += ${'grand_' . $key};
                } else {
                    $studentHeadWiseReports[$key] = ${'grand_' . $key};
                }
            }
        }
    }

    /*
    *   export fee daily collection report in excel
    */
    public function exportFeeDailyCollectionReport(Request $request)
    {
        $feeType = $request->fee_type ?? "";
        $currentSession = $request->current_session ?? false;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $payment_mode = $request->payment_mode ?? "";
        $classNameId = $request->class_name_id ?? null;
        $classroomId = $request->classroom_id ?? null;
        $cancelledFee = $request->cancelled_fee ?? false;
        $excludeVoucherFee = $request->exclude_voucher_fee ?? false;
        $concession = $request->concession ?? false;

        $dailyCollectionReport = $this->getFeeDailyCollectionReportData(
            $feeType,
            $currentSession,
            $start_date,
            $end_date,
            $payment_mode,
            $classNameId,
            $classroomId,
            $cancelledFee,
            $excludeVoucherFee,
            $concession,
        );

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $startDate = !empty($start_date) ? Carbon::parse($start_date)->format('d-M-Y') : "";
        $endDate = !empty($end_date) ? Carbon::parse($end_date)->format('d-M-Y') : "";
        $paymentMode = $request->payment_mode ?? "All";
        $feeMode = $request->fee_type ?? "All";

        $export = new FeeDailyCollectionExport($dailyCollectionReport, $schoolTitle, $startDate, $endDate, $paymentMode, $feeMode);

        return Excel::download($export, "fee_daily_collection.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get data for fee daily collection report
    */
    private function getFeeDailyCollectionReportData(
        string $feeType = "",
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $classNameId = null,
        int $classroomId = null,
        bool $cancelledFee = false,
        bool $excludeVoucherFee = false,
        bool $concession = false,
    ) {
        $dailyCollectionReport = [];

        $registrationFeeTransformedData = [];

        if ($feeType == FeeTypeEnum::REGISTRATION->value || empty($feeType)) {
            // get registration fee payment reports
            $dailyRegistrationFeeReports = $this->feePaymentMethodRepository->getDailyRegistrationFeeReports(
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $classNameId,
                $classroomId
            );

            $dailyRegistrationFeeReports->loadMissing([
                'enquiry.guardian:id,enquiry_id,father_first_name,father_middle_name,father_last_name,father_mobile',
                'academicYear:id,academic_session',
                'enquiry.employment_category'
            ]);

            // format registration fee payment report data
            $registrationFeeTransformedData = $this->formatDailyCollectionRegistrationFeeData($dailyRegistrationFeeReports, $concession);
        }

        $feeTransformedData = [];

        if ($feeType == FeeTypeEnum::FEE->value || empty($feeType)) {
            // get fee payment reports
            $dailyFeePaymentReports = $this->feePaymentMethodRepository->getDailyFeePaymentReports(
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $classNameId,
                $classroomId,
                $cancelledFee,
                $excludeVoucherFee
            );

            $dailyFeePaymentReports->loadMissing([
                'student.father:id,student_id,first_name,middle_name,last_name,phone',
                'academicYear:id,academic_session',
                // 'student.classroomRoll:id,student_id,roll_no',
                'student.employment_category'
            ]);

            // store payment fee types title
            $reportFeeTypes = [];

            if ($dailyFeePaymentReports->count() > 0) {
                $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroom_id = $report?->student?->classroom_id;

                    $report?->student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('classroom_id', $classroom_id);
                        }
                    ]);

                    return $report;
                });

                $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                    if ($report->fee_payments->count() > 0) {
                        $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                            $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                        });
                    }
                });
            }

            // format fee payment report data
            $feeTransformedData = $this->formatDailyCollectionFeeData($dailyFeePaymentReports, $reportFeeTypes, $concession);
        }

        // merge registration fee payment report and fee installment payment report
        $dailyCollectionReportData = collect($feeTransformedData['reports'] ?? [])->merge($registrationFeeTransformedData['reports'] ?? [])->all();

        $dailyCollectionReport['reports'] = $dailyCollectionReportData;
        $dailyCollectionReport['total_amount'] = ($registrationFeeTransformedData['total_amount'] ?? 0) + ($feeTransformedData['total_amount'] ?? 0);
        $dailyCollectionReport['discount'] = ($registrationFeeTransformedData['discount'] ?? 0) + ($feeTransformedData['discount'] ?? 0);
        $dailyCollectionReport['payable_amount'] = ($registrationFeeTransformedData['payable_amount'] ?? 0) + ($feeTransformedData['payable_amount'] ?? 0);
        $dailyCollectionReport['total_paid'] = ($registrationFeeTransformedData['total_paid'] ?? 0) + ($feeTransformedData['total_paid'] ?? 0);
        $dailyCollectionReport['total_due'] = ($registrationFeeTransformedData['total_due'] ?? 0) + ($feeTransformedData['total_due'] ?? 0);

        return $dailyCollectionReport;
    }

    /*
    *  helper method to generate receipt note
    */
    private function generateReceiptNote($payments = [])
    {
        $receipt_note = '';

        if (!empty($payments)) {
            foreach ($payments as $feePayment) {
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
            }
        }

        return $receipt_note;
    }

    /*
    *  helper method to format daily collection registration fee data
    */
    private function formatDailyCollectionRegistrationFeeData($registrationFeeReports, $concession = false)
    {
        $registrationFeeTransformedReport = [];
        $total_amount = 0;
        $total_discount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;
        $registrationFeeTransformedData = [];

        if (!empty($registrationFeeReports) && $concession == false) {
            $registrationFeeTransformedData = $registrationFeeReports->map(function ($report) use (&$total_amount, &$total_payable, &$total_paid) {
                $parent_name = "";

                if ($report?->enquiry?->guardian != null) {
                    $parent_name = "{$report?->enquiry?->guardian?->father_first_name} {$report?->enquiry?->guardian?->father_middle_name} {$report?->enquiry?->guardian?->father_last_name}";
                }

                $newData = [
                    'status' => 'N',
                    'student_type' => $report?->enquiry?->boarding_scholar ?? "",
                    'student_name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                    'admission_number' => "",
                    'class_name' => $report?->enquiry?->className?->title,
                    'parent_name' => $parent_name,
                    'fee_source' => 'Registration Fee',
                    'receipt_no' => $report?->receipt_no,
                    'receipt_note' => "",
                    'roll_no' => "",
                    'total_amount' => (float) $report->total_amount ?? 0,
                    'discount' => 0,
                    'payable_amount' => (float) $report->total_amount ?? 0,
                    'total_paid' => (float) $report->total_amount ?? 0,
                    'total_due' => 0,
                    'payment_mode' => $report->payment_mode,
                    'transaction_id' => "",
                    'payment_date' => $report->created_at->format('d-m-Y H:i:s A'),
                    'payment_note' => $report->payment_note,
                    'address' => $report?->enquiry?->present_address ?? "",
                    'school_receipt_no' => "",
                    'employment_category' => $report?->enquiry?->employment_category?->title ?? "",
                    'student_mobile' => $report?->enquiry?->contact_number ?? "",
                    'father_mobile' => $report?->enquiry?->guardian?->father_mobile ?? "",
                    'academic_year' => $report?->academicYear?->academic_session ?? ""
                ];

                $total_amount += (float) $report->total_amount ?? 0;
                $total_payable += (float) $report->total_amount ?? 0;
                $total_paid += (float) $report->total_amount ?? 0;

                return collect($newData);
            });
        }

        $registrationFeeTransformedReport['reports'] = $registrationFeeTransformedData;
        $registrationFeeTransformedReport['total_amount'] = $total_amount;
        $registrationFeeTransformedReport['discount'] = $total_discount;
        $registrationFeeTransformedReport['payable_amount'] = $total_payable;
        $registrationFeeTransformedReport['total_paid'] = $total_paid;
        $registrationFeeTransformedReport['total_due'] = $total_due;

        return $registrationFeeTransformedReport;
    }

    /*
    *  helper method to format daily collection installment fee data
    */
    private function formatDailyCollectionFeeData($feeReports, $reportFeeTypes, $concession = false)
    {
        $feeTransformedReport = [];
        $total_amount = 0;
        $total_discount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;

        if (!empty($feeReports)) {
            $feeTransformedData = $feeReports->filter(function ($report) use ($concession) {
                if ($concession == true && $report->total_discount_amount <= 0) {
                    return false;
                }

                return true;
            })->map(function ($report) use (
                $reportFeeTypes,
                &$total_amount,
                &$total_discount,
                &$total_payable,
                &$total_paid,
                &$total_due
            ) {
                $date = Carbon::parse($report->payment_date)->format('d-m-Y');
                $time = $report->created_at->format('H:i:s A');
                $student_status = $report?->student?->student_status;

                if ($student_status == StudentStatus::NEW->value || empty($student_status)) {
                    $status = 'N';
                } else {
                    $status = 'P';
                }

                $parent_name = "";

                if ($report?->student?->father != null) {
                    $parent_name = "{$report?->student?->father?->first_name} {$report?->student?->father?->middle_name} {$report?->student?->father?->last_name}";
                }

                $receipt_no = $report->is_cancelled ? "{$report->receipt_no} (Cancelled)" : $report->receipt_no;
                $receipt_note = $this->generateReceiptNote($report->fee_payments);

                $newData = [
                    'status' => $status,
                    'student_type' => $report?->student?->boarding_type ?? "",
                    'admission_number' => $report?->student?->admission_no,
                    'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                    'class_name' => $report?->student?->classroom?->title,
                    'parent_name' => $parent_name,
                    'fee_source' => !empty(array_unique($reportFeeTypes[$report->id])) ? implode(',', array_unique($reportFeeTypes[$report->id])) : '',
                    'receipt_no' => $receipt_no,
                    'receipt_note' => $receipt_note,
                    'roll_no' => $report?->student?->classroomRoll?->roll_no,
                    'total_amount' =>  (float) $report->total_amount ?? 0,
                    'discount' =>  (float) $report->total_discount_amount ?? 0,
                    'payable_amount' => (float) $report->total_payable_amount ?? 0,
                    'total_paid' => (float) $report->total_paid_amount ?? 0,
                    'total_due' =>  (float) $report->total_due_amount ?? 0,
                    'payment_mode' =>  $report->payment_mode ?? "",
                    'transaction_id' =>  $report->transaction_id ?? "",
                    'payment_date' => "{$date} {$time}",
                    'payment_note' =>  $report->payment_note ?? "",
                    'address' => $report?->student?->present_address ?? "",
                    'school_receipt_no' => $report?->school_receipt_no ?? "",
                    'employment_category' => $report?->student?->employment_category?->title ?? "",
                    'student_mobile' => $report?->student?->phone ?? "",
                    'father_mobile' => $report?->student?->father?->phone ?? "",
                    'academic_year' => $report?->academicYear?->academic_session ?? ""
                ];

                $total_amount += (float) $report->total_amount ?? 0;
                $total_discount += (float) $report->total_discount_amount ?? 0;
                $total_payable += (float) $report->total_payable_amount ?? 0;
                $total_paid += (float) $report->total_paid_amount ?? 0;
                $total_due += (float) $report->total_due_amount ?? 0;

                return collect($newData);
            });
        }

        $feeTransformedReport['reports'] = $feeTransformedData;
        $feeTransformedReport['total_amount'] = $total_amount;
        $feeTransformedReport['discount'] = $total_discount;
        $feeTransformedReport['payable_amount'] = $total_payable;
        $feeTransformedReport['total_paid'] = $total_paid;
        $feeTransformedReport['total_due'] = $total_due;

        return $feeTransformedReport;
    }

    /*
    *   export fee installment wise daily collection report in excel
    */
    public function exportFeeInstallmentWiseDailyCollectionReport(Request $request)
    {
        $feeType = $request->fee_type ?? "";
        $currentSession = $request->current_session ?? false;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $payment_mode = $request->payment_mode ?? "";
        $classNameId = $request->class_name_id ?? null;
        $classroomId = $request->classroom_id ?? null;
        $cancelledFee = $request->cancelled_fee ?? false;
        $excludeVoucherFee = $request->exclude_voucher_fee ?? false;
        $concession = $request->concession ?? false;

        $installmentWiseDailyCollectionReport = $this->getInstallmentWiseDailyCollectionReportData(
            $feeType,
            $currentSession,
            $start_date,
            $end_date,
            $payment_mode,
            $classNameId,
            $classroomId,
            $cancelledFee,
            $excludeVoucherFee,
            $concession,
        );

        $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";
        $paymentMode = $request->payment_mode ?? "All";
        $feeMode = $request->fee_type ?? "All";

        $export = new FeeInstallmentWiseDailyCollectionExport($installmentWiseDailyCollectionReport, $startDate, $endDate, $paymentMode, $feeMode);

        return Excel::download($export, "fee_installment_wise_daily_collection.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get data for fee installment wise daily collection report
    */
    private function getInstallmentWiseDailyCollectionReportData(
        string $feeType = "",
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $classNameId = null,
        int $classroomId = null,
        bool $cancelledFee = false,
        bool $excludeVoucherFee = false,
        bool $concession = false,
    ) {
        $installmentWiseDailyCollectionReport = [];
        $feeTypePaidAmountArray = [];

        $registrationFeeTransformedData = [];

        if ($feeType == FeeTypeEnum::REGISTRATION->value || empty($feeType)) {
            // get registration fee payment reports
            $dailyRegistrationFeeReports = $this->feePaymentMethodRepository->getDailyRegistrationFeeReports(
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $classNameId,
                $classroomId
            );

            $dailyRegistrationFeeReports->loadMissing([
                'enquiry.guardian:id,enquiry_id,father_first_name,father_middle_name,father_last_name,father_mobile',
                'academicYear:id,academic_session',
                'enquiry.employment_category'
            ]);

            // format registration fee payment report data
            $registrationFeeTransformedData = $this->formatInstallmentWiseDailyCollectionRegistrationFeeData($dailyRegistrationFeeReports, $concession);
        }

        $feeTransformedData = [];

        if ($feeType == FeeTypeEnum::FEE->value || empty($feeType)) {
            // get fee payment reports
            $dailyFeePaymentReports = $this->feePaymentMethodRepository->getDailyFeePaymentReports(
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $classNameId,
                $classroomId,
                $cancelledFee,
                $excludeVoucherFee
            );

            $dailyFeePaymentReports->loadMissing([
                'student.father:id,student_id,first_name,middle_name,last_name,phone',
                'academicYear:id,academic_session',
                // 'student.classroomRoll:id,student_id,roll_no',
                'student.employment_category'
            ]);

            // store payment fee types title
            $reportFeeTypes = [];

            if ($dailyFeePaymentReports->count() > 0) {
                $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroom_id = $report?->student?->classroom_id;

                    $report?->student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('classroom_id', $classroom_id);
                        }
                    ]);

                    return $report;
                });

                $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                    if ($report->fee_payments->count() > 0) {
                        $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                            $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                        });
                    }
                });
            }

            // format fee payment report data
            $feeTransformedData = $this->formatInstallmentWiseDailyCollectionFeeData($dailyFeePaymentReports, $reportFeeTypes, $concession);
        }

        // merge registration fee payment report and fee installment payment report
        $installmentWiseDailyCollectionReportData = collect($feeTransformedData['reports'] ?? [])->merge($registrationFeeTransformedData['reports'] ?? [])->all();

        // merge fee type paid amount data
        $feeTypePaidAmountArray = $feeTransformedData['fee_type_paid_amount'] ?? [];

        if (!empty($registrationFeeTransformedData['fee_type_paid_amount'])) {
            foreach ($registrationFeeTransformedData['fee_type_paid_amount'] as $feeType => $amount) {
                $feeTypePaidAmountArray[$feeType] = ($feeTypePaidAmountArray[$feeType] ?? 0) + $amount;
            }
        }

        $installmentWiseDailyCollectionReport['reports'] = $installmentWiseDailyCollectionReportData;
        $installmentWiseDailyCollectionReport['fee_type_paid_amount'] = $feeTypePaidAmountArray;
        $installmentWiseDailyCollectionReport['amount'] = ($registrationFeeTransformedData['amount'] ?? 0) + ($feeTransformedData['amount'] ?? 0);
        $installmentWiseDailyCollectionReport['discount'] = ($registrationFeeTransformedData['discount'] ?? 0) + ($feeTransformedData['discount'] ?? 0);
        $installmentWiseDailyCollectionReport['payable'] = ($registrationFeeTransformedData['payable'] ?? 0) + ($feeTransformedData['payable'] ?? 0);
        $installmentWiseDailyCollectionReport['paid'] = ($registrationFeeTransformedData['paid'] ?? 0) + ($feeTransformedData['paid'] ?? 0);
        $installmentWiseDailyCollectionReport['due'] = ($registrationFeeTransformedData['due'] ?? 0) + ($feeTransformedData['due'] ?? 0);

        return $installmentWiseDailyCollectionReport;
    }

    /*
    *  helper method to format installment wise daily collection registration fee data
    */
    private function formatInstallmentWiseDailyCollectionRegistrationFeeData($registrationFeeReports, $concession = false)
    {
        $registrationFeeTransformedReport = [];
        $feeTypePaidAmountArray = [];
        $total_amount = 0;
        $total_discount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;
        $registrationFeeTransformedData = [];

        if (!empty($registrationFeeReports) && $concession == false) {
            $registrationFeeTransformedData = $registrationFeeReports->map(function ($report) use (&$total_amount, &$total_payable, &$total_paid, &$feeTypePaidAmountArray) {
                $feeTypeTitle = 'Registration Fee';

                $feeTypePaidAmountArray[$feeTypeTitle] = ($feeTypePaidAmountArray[$feeTypeTitle] ?? 0) + (float) $report->total_amount ?? 0;

                $father_name = "";

                if ($report?->enquiry?->guardian != null) {
                    $father_name = "{$report?->enquiry?->guardian?->father_first_name} {$report?->enquiry?->guardian?->father_middle_name} {$report?->enquiry?->guardian?->father_last_name}";
                }

                $newData = [
                    'admission_no' => "",
                    'roll_no' => "",
                    'student_type' => $report?->enquiry?->boarding_scholar ?? "",
                    'name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                    'class' => $report?->enquiry?->className?->title,
                    'father_name' => $father_name,
                    'fee_source' => $feeTypeTitle,
                    'receipt_no' => $report?->receipt_no,
                    'receipt_date' => $report->created_at->format('d-m-Y H:i:s A'),
                    'receipt_note' => "",
                    'payment_mode' => $report->payment_mode,
                    'amount' => (float) $report->total_amount ?? 0,
                    'discount' => 0,
                    'payable' => (float) $report->total_amount ?? 0,
                    'paid' => (float) $report->total_amount ?? 0,
                    'due' => 0,
                    'school_receipt_no' => "",
                    'academic_year' => $report?->academicYear?->academic_session ?? "",
                    $feeTypeTitle => (float) $report->total_amount ?? 0
                ];

                $total_amount += (float) $report->total_amount ?? 0;
                $total_payable += (float) $report->total_amount ?? 0;
                $total_paid += (float) $report->total_amount ?? 0;

                return collect($newData);
            });
        }

        $registrationFeeTransformedReport['reports'] = $registrationFeeTransformedData;
        $registrationFeeTransformedReport['fee_type_paid_amount'] = $feeTypePaidAmountArray;
        $registrationFeeTransformedReport['amount'] = $total_amount;
        $registrationFeeTransformedReport['discount'] = $total_discount;
        $registrationFeeTransformedReport['payable'] = $total_payable;
        $registrationFeeTransformedReport['paid'] = $total_paid;
        $registrationFeeTransformedReport['due'] = $total_due;

        return $registrationFeeTransformedReport;
    }

    /*
    *  helper method to format installment wise daily collection fee data
    */
    private function formatInstallmentWiseDailyCollectionFeeData($feeReports, $reportFeeTypes, bool $concession = false)
    {
        $feeTransformedReport = [];
        $feeTypePaidAmountArray = [];
        $total_amount = 0;
        $total_discount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;

        if (!empty($feeReports)) {
            $feeTransformedData = $feeReports->filter(function ($report) use ($concession) {
                if ($concession == true && $report->total_discount_amount <= 0) {
                    return false;
                }

                return true;
            })->map(function ($report) use (
                $reportFeeTypes,
                &$total_amount,
                &$total_discount,
                &$total_payable,
                &$total_paid,
                &$total_due,
                &$feeTypePaidAmountArray
            ) {
                $tempFeeTypePaidAmountArray = [];

                if (!empty($report->fee_payments)) {
                    foreach ($report->fee_payments as $feePayment) {
                        $tempFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($tempFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;
                        $feeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($feeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;
                    }
                }

                $father_name = "";

                if ($report?->student?->father != null) {
                    $father_name = "{$report?->student?->father?->first_name} {$report?->student?->father?->middle_name} {$report?->student?->father?->last_name}";
                }

                $receipt_no = $report->is_cancelled ? "{$report->receipt_no} (Cancelled)" : $report->receipt_no;
                $receipt_note = $this->generateReceiptNote($report->fee_payments);

                $newData = [
                    'admission_no' => $report?->student?->admission_no,
                    'roll_no' => $report?->student?->classroomRoll?->roll_no,
                    'student_type' => $report?->student?->boarding_type ?? "",
                    'name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                    'class' => $report?->student?->classroom?->title,
                    'father_name' => $father_name,
                    'fee_source' => !empty(array_unique($reportFeeTypes[$report->id])) ? implode(',', array_unique($reportFeeTypes[$report->id])) : '',
                    'receipt_no' => $receipt_no,
                    'receipt_date' => $report->created_at->format('d-m-Y H:i:s A'),
                    'receipt_note' => $receipt_note,
                    'payment_mode' =>  $report->payment_mode ?? "",
                    'amount' =>  (float) $report->total_amount ?? 0,
                    'discount' =>  (float) $report->total_discount_amount ?? 0,
                    'payable' => (float) $report->total_payable_amount ?? 0,
                    'paid' => (float) $report->total_paid_amount ?? 0,
                    'due' =>  (float) $report->total_due_amount ?? 0,
                    'school_receipt_no' => $report?->school_receipt_no ?? "",
                    'academic_year' => $report?->academicYear?->academic_session ?? ""
                ];

                $mergedData = array_merge($newData, $tempFeeTypePaidAmountArray);

                $total_amount += (float) $report->total_amount ?? 0;
                $total_discount += (float) $report->total_discount_amount ?? 0;
                $total_payable += (float) $report->total_payable_amount ?? 0;
                $total_paid += (float) $report->total_paid_amount ?? 0;
                $total_due += (float) $report->total_due_amount ?? 0;

                return collect($mergedData);
            });
        }

        $feeTransformedReport['reports'] = $feeTransformedData;
        $feeTransformedReport['fee_type_paid_amount'] = $feeTypePaidAmountArray;
        $feeTransformedReport['amount'] = $total_amount;
        $feeTransformedReport['discount'] = $total_discount;
        $feeTransformedReport['payable'] = $total_payable;
        $feeTransformedReport['paid'] = $total_paid;
        $feeTransformedReport['due'] = $total_due;

        return $feeTransformedReport;
    }

    /*
    *   export fee head wise daily collection report in excel
    */
    public function exportFeeHeadWiseDailyCollectionReport(Request $request)
    {
        $sortBy = $request->sort_by ?? "";
        $voucher = $request->voucher ?? false;
        $cancelledFee = $request->cancelled_fee ?? false;
        $start_date = $request->start_date ?? "";
        $end_date = $request->end_date ?? "";
        $paymentMode = $request->payment_mode ?? "";
        $feeTypeId = $request->fee_type_id ?? null;
        $classNameId = $request->class_name_id ?? null;

        $headWiseDailyCollectionReport = $this->getHeadWiseDailyCollectionReportData(
            $sortBy,
            $voucher,
            $cancelledFee,
            $start_date,
            $end_date,
            $paymentMode,
            $feeTypeId,
            $classNameId
        );

        $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();
        $classNameTitle = "All";

        if (!empty($classNameId)) {
            $classNameTitle = $this->classroomRepository->getClassNameTitleById($classNameId);
        }

        $export = new FeeHeadWiseDailyCollectionExport($headWiseDailyCollectionReport, $startDate, $endDate, $schoolTitle, $academicYear, $classNameTitle);

        return Excel::download($export, "fee_head_wise_daily_collection.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get data for fee head wise daily collection report
    */
    private function getHeadWiseDailyCollectionReportData(
        string $sortBy = "",
        bool $voucher = false,
        bool $cancelledFee = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $feeTypeId = null,
        int $classNameId = null
    ) {
        $headWiseDailyCollectionReport = [];
        $feeTypePaidAmountArray = [];
        $totalPaidByPaymentModeReport = [];
        $grand_amount = 0;
        $grand_payable = 0;
        $grand_paid = 0;
        $grand_due = 0;
        $grand_discount = 0;

        $headWiseDailyCollections = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentReports(
            $sortBy,
            $voucher,
            $cancelledFee,
            $startDate,
            $endDate,
            $paymentMode,
            $feeTypeId,
            $classNameId
        );

        if ($headWiseDailyCollections->count() > 0) {
            $headWiseDailyCollections = $headWiseDailyCollections->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }

                return $report;
            });

            $headWiseDailyCollections->loadMissing(['student.employment_category']);

            $headWiseDailyCollectionReportData = $headWiseDailyCollections->groupBy('payment_date')
                ->map(function ($groupedReports) use (
                    &$feeTypePaidAmountArray,
                    &$grand_amount,
                    &$grand_payable,
                    &$grand_paid,
                    &$grand_due,
                    &$grand_discount,
                    &$totalPaidByPaymentModeReport
                ) {
                    $grand_total_amount = 0;
                    $grand_total_payable = 0;
                    $grand_total_paid = 0;
                    $grand_total_due = 0;
                    $grand_total_discount = 0;
                    $dateWiseFeeTypePaidAmountArray = [];

                    $groupedReports = $groupedReports->map(function ($report) use (
                        &$feeTypePaidAmountArray,
                        &$dateWiseFeeTypePaidAmountArray,
                        &$grand_total_amount,
                        &$grand_total_payable,
                        &$grand_total_paid,
                        &$grand_total_due,
                        &$grand_total_discount,
                        &$totalPaidByPaymentModeReport
                    ) {
                        $tempFeeTypePaidAmountArray = [];
                        $total_amount = 0;
                        $total_payable = 0;
                        $total_paid = 0;
                        $total_due = 0;
                        $total_discount = 0;
                        $receipt_note = $this->generateReceiptNote($report->fee_payments);

                        if (count($report->fee_payments) > 0) {
                            $report->fee_payments->each(function ($feePayment) use (
                                &$feeTypePaidAmountArray,
                                &$dateWiseFeeTypePaidAmountArray,
                                &$tempFeeTypePaidAmountArray,
                                &$total_amount,
                                &$total_payable,
                                &$total_paid,
                                &$total_due,
                                &$total_discount
                            ) {
                                // calculate fee type paid amount for each report
                                $tempFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($tempFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;

                                // calculate fee type paid amount for each date group
                                $dateWiseFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($dateWiseFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;

                                // calculate fee type paid amount for grand total
                                $feeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($feeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;

                                $total_amount += (float) $feePayment->amount ?? 0;
                                $total_payable += (float) $feePayment->payable_amount ?? 0;
                                $total_paid += (float) $feePayment->paid_amount ?? 0;
                                $total_due += (float) $feePayment->due_amount ?? 0;
                                $total_discount += (float) $feePayment->discount_amount ?? 0;
                            });
                        }

                        // calculte total paid by payment mode
                        $totalPaidByPaymentModeReport[$report?->payment_mode] = ($totalPaidByPaymentModeReport[$report?->payment_mode] ?? 0) + $total_paid;

                        $grand_total_amount += $total_amount;
                        $grand_total_payable += $total_payable;
                        $grand_total_paid += $total_paid;
                        $grand_total_due += $total_due;
                        $grand_total_discount += $total_discount;

                        $receipt_no = $report->is_cancelled ? "{$report->receipt_no} (Cancelled)" : $report->receipt_no;
                        $studentName = "";
                        $fatherName = "";

                        if ($report->student != null) {
                            $studentName = "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}";
                        }

                        if ($report?->student?->father != null) {
                            $fatherName = "{$report?->student?->father?->first_name} {$report?->student?->father?->middle_name} {$report?->student?->father?->last_name}";
                        }

                        $reportData = [
                            'admission_no' => $report?->student?->admission_no ?? "",
                            'name' =>  $studentName,
                            'class' =>  $report?->student?->classroom?->title ?? "",
                            'father_name' =>  $fatherName,
                            'receipt_no' => $receipt_no,
                            'school_receipt_no' => $report?->school_receipt_no,
                            'receipt_date' => $report->created_at->format('d/m/Y'),
                            'receipt_note' => $receipt_note,
                            'transaction_id' => $report?->transaction_id,
                            'mode' => $report?->payment_mode,
                            'taken_by' => "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}",
                            'payment_note' => $report?->payment_note,
                            'student_type' => $report?->student?->boarding_type,
                            'gender' => $report?->student?->gender,
                            'employment_category' => $report?->student?->employment_category?->title,
                            'amount' => $total_amount,
                            'discount' => $total_discount,
                            'payable' => $total_payable,
                            'paid' => $total_paid,
                            'due' => $total_due
                        ];

                        $mergedReportData = collect($reportData)->merge($tempFeeTypePaidAmountArray)->all();

                        return $mergedReportData;
                    });

                    $grand_amount += $grand_total_amount;
                    $grand_payable += $grand_total_payable;
                    $grand_paid += $grand_total_paid;
                    $grand_due += $grand_total_due;
                    $grand_discount += $grand_total_discount;

                    return collect([
                        'reports' => $groupedReports,
                        'amount' => $grand_total_amount,
                        'discount' => $grand_total_discount,
                        'payable' => $grand_total_payable,
                        'paid' => $grand_total_paid,
                        'due' => $grand_total_due,
                        'fee_type_paid_amount_array' => $dateWiseFeeTypePaidAmountArray
                    ]);
                })->toArray();

            $headWiseDailyCollectionReport['reports'] = $headWiseDailyCollectionReportData;
            $headWiseDailyCollectionReport['amount'] = $grand_amount;
            $headWiseDailyCollectionReport['discount'] = $grand_discount;
            $headWiseDailyCollectionReport['payable'] = $grand_payable;
            $headWiseDailyCollectionReport['paid'] = $grand_paid;
            $headWiseDailyCollectionReport['due'] = $grand_due;
            $headWiseDailyCollectionReport['fee_type_paid_amount_array'] = $feeTypePaidAmountArray;
            $headWiseDailyCollectionReport['total_paid_by_payment_mode'] = $totalPaidByPaymentModeReport;
        }

        return $headWiseDailyCollectionReport;
    }

    /*
    *   export fee class due report in excel
    */
    public function exportClassDueReport(Request $request)
    {
        $classNameId = $request->class_name_id ?? null;
        $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        $fromFeeId = $request->from_installment ?? null;
        $toFeeId = $request->to_installment ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $feeStructureId = $request->fee_structure_id ?? null;
        $includeVoucher = $request->voucher ?? false;

        $classDueReport = [];
        $fromFeeTitle = "";
        $toFeeTitle = "";

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $fromFeeTitle = $this->feeRepository->getFeeTitleById($fromFeeId)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($toFeeId)?->title ?? "";

            if (!empty($classroomIds)) {
                $classDueReport = $this->getClassDueReportData(
                    $classroomIds,
                    $fromFeeId,
                    $toFeeId,
                    $classNameId,
                    $studentStatus,
                    $feeCategoryId,
                    $feeStructureId,
                    $includeVoucher
                );
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassDueReportExport($classDueReport, $schoolTitle, $academicYear, $fromFeeTitle, $toFeeTitle);

        return Excel::download($export, "class_due_report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * helper method to get class due report data
    */
    private function getClassDueReportData(
        $classroomIds,
        $fromFeeId,
        $toFeeId,
        $classNameId = null,
        $studentStatus = "",
        $feeCategoryId = null,
        $feeStructureId = null,
        $includeVoucher = false
    ) {
        $classDueReport = [];

        // get transport fee setting
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        // arguments for filter data
        $filter_arguments = [
            'classNameId' => $classNameId,
            'classroomIds' => $classroomIds,
            'studentStatus' => $studentStatus,
            'fromFeeId' => $fromFeeId,
            'toFeeId' => $toFeeId,
            'feeCategoryId' => $feeCategoryId,
            'feeStructureId' => $feeStructureId
        ];

        //get filtered fee installments
        $feeInstallments = $this->classFeeStudentAmountRepository->getFilteredStudentsFees(...$filter_arguments);

        if (count($feeInstallments) > 0) {
            $feeInstallments->loadMissing([
                'payment',
                'nullify_fee',
                'father',
                'classroom',
                'student.promotedClassroom'
            ]);

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    $feeInstallment['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            // calculate and format fee due report data
            $classDueReport = $feeInstallments->groupBy('classroom_id')->map(function ($classroomInstallments, $classroomId) use ($transportFeeStructureSetting) {
                $classTotalDue = 0;

                $classroomInstallments->groupBy('student_id')->each(function ($studentInstallments) use (&$classTotalDue, $transportFeeStructureSetting) {
                    $studentTotalDue = 0;
                    $studentTotalTranspotFee = 0;

                    // calculate late fee and transport fee
                    foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeIntallmentsGroupedData) {
                        $studentId = $studentInstallments->first()?->student_id;
                        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                        if (!$hasPayment) {
                            // calculte transport fee if transport fee setting set to fee
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

                                    // transport fee
                                    if (count($allocateTransportFees) > 0) {
                                        $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                                if ($transportFee != null) {
                                                    $existedTransportFee = $feeIntallmentsGroupedData->where('fee_type_id', $transportFee->id)->first();

                                                    if ($existedTransportFee == null) {
                                                        if (count($studentFeeDiscounts) > 0) {
                                                            foreach ($studentFeeDiscounts as $discount) {
                                                                if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                    if ($discount->is_discount_percentage) {
                                                                        $discount_amount = (float) ($discount->amount / 100) * $transportFeeAmount;
                                                                    } else {
                                                                        $discount_amount = (float) $discount->amount;
                                                                    }

                                                                    $transportFeeAmount = $transportFeeAmount - $discount_amount;
                                                                }
                                                            }
                                                        }

                                                        $studentTotalTranspotFee += $transportFeeAmount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    $studentInstallments->each(function ($installment) use (&$studentTotalDue, $studentFeeDiscounts, $studentInstallments) {
                        $semester = $installment->semester ?? 1;
                        $fee_amount = (float) $installment->amount * $semester;
                        $due_amount = $fee_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($installment->nullify_fee !== null) {
                            $due_amount = 0;
                        } elseif ($installment->payment !== null && $installment?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = ($fee_amount - $discount_amount) - $paid_amount;
                        } elseif (count($studentFeeDiscounts) > 0) {
                            foreach ($studentFeeDiscounts as $discount) {
                                if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                    if ($discount->is_discount_percentage) {
                                        $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                    } else {
                                        $discount_amount = (float) $discount->amount;
                                    }

                                    $due_amount = ($fee_amount - $discount_amount) - $paid_amount;
                                }
                            }
                        }

                        $studentTotalDue += $due_amount;
                    });

                    $classTotalDue += ($studentTotalDue + $studentTotalTranspotFee);
                });

                return [
                    'class' => $classroomInstallments->first()?->classroom?->title ?? "",
                    'amount' => $classTotalDue,
                ];
            })->filter(function ($report) {
                return $report['amount'] > 0;
            })->toArray();
        }

        if (!empty($includeVoucher) && $includeVoucher == true) {
            // get transport voucher data and calculate due
            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                $classDueReport = $this->getTransportVoucherDueDataByClassroomIds(
                    $classDueReport,
                    $transportFeeStructureSetting,
                    $classroomIds,
                    "",
                    $studentStatus
                );
            }

            // get general voucher all due
            $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchersByClassroomIds($classroomIds, "", $studentStatus);

            $classDueReport = $this->processGeneralVouchersDueData($classDueReport, $generalVouchers);
        }

        return $classDueReport;
    }

    /*
    *   helper method to get and processs transport voucher due data for class due report
    */
    private function getTransportVoucherDueDataByClassroomIds(
        $classDueReport,
        $transportFeeStructureSetting,
        $classroomIds,
        $studentStatus = "",
        $studentActiveStatus = ""
    ) {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStudentStatus($classroomIds, $studentStatus, $studentActiveStatus);

        if (count($students) > 0) {
            $students->load(['classroom', 'promotedClassroom']);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                $total_due = 0;

                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount ?? 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }

                        $total_due += $due_amount;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $total_due += $fee_amount;
                    }
                }

                if ($total_due > 0) {
                    if (!isset($classDueReport[$student?->classroom?->id])) {
                        $classDueReport[$student?->classroom?->id] = [
                            'class' => $student?->classroom?->title ?? "",
                            'amount' => 0,
                        ];
                    }

                    $classDueReport[$student?->classroom?->id]['amount'] += $total_due;
                }
            }
        }

        return $classDueReport;
    }

    /*
    *   helper method to processs general voucher due data for class due report
    */
    private function processGeneralVouchersDueData($classDueReport, $vouchers)
    {
        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['classroom'])) {
                        unset($voucher['classroom']);
                    }

                    $voucher['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $due_amount = 0;

                foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                    $amount = (float) $voucherAmountData->amount ?? 0;

                    if ($voucherAmountData->payment !== null) {
                        $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $amount = $amount - $discount_amount - $paid_amount;
                    }

                    $due_amount += $amount;
                }

                if ($due_amount > 0) {
                    if (!isset($classDueReport[$voucher?->classroom?->id])) {
                        $classDueReport[$voucher?->classroom?->id] = [
                            'class' => $voucher->first()?->classroom?->title ?? "",
                            'amount' => 0,
                        ];
                    }

                    $classDueReport[$voucher?->classroom?->id]['amount'] += $due_amount;
                }
            }
        }

        return $classDueReport;
    }

    /*
    *   export fee head wise outstanding due report in excel
    */
    public function exportHeadWiseOutstandingDueReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $fromInstallment = $request->from_installment ?? null;
        $toInstallment = $request->to_installment ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $feeStructureId = $request->fee_structure_id ?? null;
        $includeLateFee = $request->late_fee ?? false;
        $includeVoucher = $request->voucher ?? false;

        $headWiseReport = [];

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $headWiseReport = $this->getHeadWiseOutstandingDueReport(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
                $includeLateFee,
                $includeVoucher
            );
        }

        $classroomTitle = $this->classroomRepository->getClassroomTitleById($request->classroom_id)?->title ?? "";

        $export = new HeadWiseOutstandingDueReportExport($headWiseReport, $classroomTitle);

        return Excel::download($export, "Due Report For {$classroomTitle}.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get head wise outstanding due report
    */
    private function getHeadWiseOutstandingDueReport(
        $classroomId,
        $fromInstallment,
        $toInstallment,
        $studentStatus = "",
        $feeCategoryId = null,
        $feeStructureId = null,
        $includeLateFee = false,
        $includeVoucher = false
    ) {
        $headWiseReport = [];
        $installmentWiseReport = [];
        $studentWiseAmounts = [];
        $headWiseAmounts = [];
        $installmentWiseAmounts = [];
        $studentFeeDiscounts = [];
        $studentDueInstallments = [];
        $headWiseTotalDue = 0;
        $type = 'head_wise';

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentFeeDiscounts,
                    $studentDueInstallments,
                    $feeInstallments,
                    $transportFeeStructureSetting,
                    $type,
                    $includeLateFee
                );
            }

            // to calculate general voucher and transport voucher due
            if (!empty($includeVoucher) && $includeVoucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $classroomId,
                    $studentStatus
                );

                $this->formatInstallmentWiseGeneralVouchers(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentDueInstallments,
                    $type,
                    $generalVouchers
                );

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($classroomId, $studentStatus);

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers(
                            $headWiseReport,
                            $installmentWiseReport,
                            $studentWiseAmounts,
                            $headWiseAmounts,
                            $installmentWiseAmounts,
                            $studentDueInstallments,
                            $type,
                            $student,
                            $transportFeeStructureSetting
                        );
                    }
                }
            }

            if (count($headWiseReport) > 0) {
                foreach ($headWiseReport as $studentId => $groupedDueReport) {
                    $total_due = 0;

                    foreach ($studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $headWiseReport[$studentId]['head_wise_amounts'] = $studentWiseAmounts[$studentId];
                    $headWiseReport[$studentId]['total'] = $total_due;
                    $headWiseReport[$studentId]['installments'] = !empty($studentDueInstallments[$studentId]) ? implode(',', $studentDueInstallments[$studentId]) : "";
                    $headWiseReport[$studentId]['no_of_due_installments'] = !empty($studentDueInstallments[$studentId]) ? count($studentDueInstallments[$studentId]) : 0;

                    $headWiseTotalDue += $total_due;
                }
            }
        }

        // sort reports by classroom roll
        usort($headWiseReport, function ($a, $b) {
            $rollNoA = $a['roll'] ?? null;
            $rollNoB = $b['roll'] ?? null;

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

        return [
            'reports' => $headWiseReport,
            'head_wise_amounts' => $headWiseAmounts,
            'total' => $headWiseTotalDue
        ];
    }

    /*
    * function to get installment and head wise fee installments
    */
    private function formatHeadAndInstallmentWiseFeeInstallments(
        &$headWiseReport,
        &$installmentWiseReport,
        &$studentWiseAmounts,
        &$headWiseAmounts,
        &$installmentWiseAmounts,
        &$studentFeeDiscounts,
        &$studentDueInstallments,
        $feeInstallments,
        $transportFeeStructureSetting,
        $type,
        $includeLateFee = false,
        $schoolId = null,
        $academicYearId = null
    ) {
        // get fee installments late fee and transport fee and merge them with fee installments
        $feeInstallments = $this->getInstallmentsLateFeeAndTransportFee($studentFeeDiscounts, $feeInstallments, $transportFeeStructureSetting, $includeLateFee, $schoolId, $academicYearId);

        // sort by fee installment
        $feeInstallments = $feeInstallments->sortBy(function ($item) {
            if (!empty($item['fee'])) {
                return [
                    $item['fee']['installment_no']
                ];
            } else {
                return [
                    $item['fee_id']
                ];
            }
        });

        // calculate fee installments due
        foreach ($feeInstallments as $feeInstallment) {
            // check if installment has nullify fee. if fee nullified then exclude the fee
            if (empty($feeInstallment['nullify_fee'])) {
                $due_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];

                // check if installment has payment. if has payment then update due amount
                if (!empty($feeInstallment['payment'])) {
                    $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                    $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                    $due_amount = ($due_amount - $discount_amount) - $paid_amount;
                } elseif (!empty($studentFeeDiscounts[$feeInstallment['student_id']])) {
                    foreach ($studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                        if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount = $due_amount - $discount_amount;
                        }
                    }
                }

                if ($type == 'head_wise') {
                    // calculate and update fee amount installment wise
                    $this->updateHeadWiseAmounts($headWiseAmounts, $feeInstallment['feeType']['fee_type'], $due_amount);

                    // calculate and update fee amount fee type wise
                    $this->updateStudentWiseAmounts($studentWiseAmounts, $feeInstallment['student_id'], $feeInstallment['feeType']['fee_type'], $due_amount);

                    // update headWiseSummary data
                    if (!isset($headWiseReport[$feeInstallment['student']['id']])) {
                        $this->updateStudentHeadWiseDueSummaryData($headWiseReport, $feeInstallment['student']->toArray());
                    }

                    // store student due installments
                    if (
                        !isset($studentDueInstallments[$feeInstallment['student_id']]) ||
                        (isset($studentDueInstallments[$feeInstallment['student_id']]) && !in_array($feeInstallment['fee']['title'], $studentDueInstallments[$feeInstallment['student_id']]))
                    ) {
                        $studentDueInstallments[$feeInstallment['student_id']][] = $feeInstallment['fee']['title'];
                    }
                } else if ($type == 'installment_wise') {
                    // calculate and update fee amount installment wise
                    $this->updateInstallmentWiseAmounts($installmentWiseAmounts, $feeInstallment['fee']['title'], $due_amount);

                    // calculate and update fee amount fee type wise
                    $this->updateStudentWiseAmounts($studentWiseAmounts, $feeInstallment['student_id'], $feeInstallment['fee']['title'], $due_amount);

                    // update installmentWiseSummary data
                    if (!isset($installmentWiseReport[$feeInstallment['student']['id']])) {
                        $this->updateStudentInstallmentWiseDueSummaryData($installmentWiseReport, $feeInstallment['student']->toArray());
                    }
                }
            }
        }
    }

    /*
    * function to get installment wise general vouchers
    */
    private function formatInstallmentWiseGeneralVouchers(
        &$headWiseReport,
        &$installmentWiseReport,
        &$studentWiseAmounts,
        &$headWiseAmounts,
        &$installmentWiseAmounts,
        &$studentDueInstallments,
        $type,
        $vouchers
    ) {
        // if has any general voucher then calculate due and merge data with installmentWiseDueSummary
        if (count($vouchers) > 0) {
            // sort voucher by id
            $vouchers = $vouchers->sortBy(['id']);

            foreach ($vouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_due_amount = (float) $feeTypeAmount->amount;

                    // check if voucher has payment. if has payment then update due amount
                    // if ($feeTypeAmount->payment != null && $feeTypeAmount->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($feeTypeAmount->payment != null) {
                        // $voucher_due_amount = (float) $feeTypeAmount->payment->due_amount ?? 0;

                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $voucher_due_amount = $voucher_due_amount - $discount_amount - $paid_amount;
                    }

                    if ($type == 'head_wise') {
                        // calculate and update fee amount installment wise
                        $this->updateHeadWiseAmounts($headWiseAmounts, $feeTypeAmount->feeType->fee_type, $voucher_due_amount);

                        // calculate and update fee amount installment wise
                        $this->updateStudentWiseAmounts($studentWiseAmounts, $feeTypeAmount->student_id, $feeTypeAmount->feeType->fee_type, $voucher_due_amount);

                        // update headWiseSummary data
                        if (!isset($headWiseReport[$voucher->student->id])) {
                            $this->updateStudentHeadWiseDueSummaryData($headWiseReport, $voucher->student->toArray());
                        }

                        // store student due installments
                        if (
                            !isset($studentDueInstallments[$feeTypeAmount->student_id]) ||
                            (isset($studentDueInstallments[$feeTypeAmount->student_id]) && !in_array($voucher->title, $studentDueInstallments[$feeTypeAmount->student_id]))
                        ) {
                            $studentDueInstallments[$feeTypeAmount->student_id][] =
                                $voucher->title;
                        }
                    } else if ($type == 'installment_wise') {
                        // calculate and update fee amount installment wise
                        $this->updateInstallmentWiseAmounts($installmentWiseAmounts, $voucher->title, $voucher_due_amount);

                        // calculate and update fee amount installment wise
                        $this->updateStudentWiseAmounts($studentWiseAmounts, $feeTypeAmount->student_id, $voucher->title, $voucher_due_amount);

                        // update installmentWiseSummary data
                        if (!isset($installmentWiseReport[$voucher->student->id])) {
                            $this->updateStudentInstallmentWiseDueSummaryData($installmentWiseReport, $voucher->student->toArray());
                        }
                    }
                }
            }
        }
    }

    /*
    * function to get installment wise transport vouchers
    */
    private function formatInstallmentWiseTransportVouchers(
        &$headWiseReport,
        &$installmentWiseReport,
        &$studentWiseAmounts,
        &$headWiseAmounts,
        &$installmentWiseAmounts,
        &$studentDueInstallments,
        $type,
        $student,
        $transportFeeStructureSetting,
        $schoolId = null,
        $academicYearId = null
    ) {
        // get current allocate transport
        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher', $schoolId, $academicYearId);

        // get previous allocate transport
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher', $schoolId, $academicYearId);

        // get deallocate transport
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher', $schoolId, $academicYearId);

        $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
        $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
        $allocateTransportVouchers = [];

        // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
            $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $student->id,
                $currentAllocateVoucherId,
                $deallocateVoucherId,
                $academicYearId
            );
        }

        // get allocated transport vouchers
        $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
            $student->id,
            $previousAllocateTransportId,
            $previousAllocationVoucherId,
            $deallocateVoucherId,
            $transportFeeStructureSetting?->value,
            'voucher',
            $academicYearId
        );

        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if (!empty($allocateTransport)) {
            // sort by voucher
            $allocateTransport = $allocateTransport->sortBy(function ($item) {
                if ($item?->voucher != null) {
                    return [
                        $item?->voucher?->installment_no
                    ];
                } else {
                    return [
                        $item?->voucher_id
                    ];
                }
            });

            foreach ($allocateTransport as $allocate) {
                $voucher_due_amount = (float) $allocate->amount;

                if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                    $voucher_due_amount = (float) $allocate->payment->due_amount ?? 0;
                }

                if ($type == 'head_wise') {
                    if ($transportFee != null) {
                        // calculate and update voucher amount installment wise
                        $this->updateHeadWiseAmounts($headWiseAmounts, $transportFee->fee_type, $voucher_due_amount);

                        // calculate and update voucher amount installment wise
                        $this->updateStudentWiseAmounts($studentWiseAmounts, $allocate->student_id, $transportFee->fee_type, $voucher_due_amount);

                        // update headWiseSummary data
                        if (!isset($headWiseReport[$allocate->student_id])) {
                            $this->updateStudentHeadWiseDueSummaryData($headWiseReport, $student->toArray());
                        }

                        //store student due installments
                        if (
                            !isset($studentDueInstallments[$allocate->student_id]) ||
                            (isset($studentDueInstallments[$allocate->student_id]) && !in_array($allocate->voucher->title, $studentDueInstallments[$allocate->student_id]))
                        ) {
                            $studentDueInstallments[$allocate->student_id][] = $allocate->voucher->title;
                        }
                    }
                } else if ($type == 'installment_wise') {
                    // calculate and update voucher amount installment wise
                    $this->updateInstallmentWiseAmounts($installmentWiseAmounts, $allocate->voucher->title, $voucher_due_amount);

                    // calculate and update voucher amount installment wise
                    $this->updateStudentWiseAmounts($studentWiseAmounts, $allocate->student_id, $allocate->voucher->title, $voucher_due_amount);

                    // update installmentWiseSummary data
                    if (!isset($installmentWiseReport[$allocate->student_id])) {
                        $this->updateStudentInstallmentWiseDueSummaryData($installmentWiseReport, $student->toArray());
                    }
                }
            }
        }

        if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
            if ($currentAllocateTransport != null) {
                $voucher_due_amount = (float) $currentAllocateTransport->amount;
            } else {
                $voucher_due_amount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportVouchers = $allocateTransportVouchers->sortBy('installment_no');

            foreach ($allocateTransportVouchers as $voucher) {
                if ($type == 'head_wise') {
                    if ($transportFee != null) {
                        // calculate and update voucher amount installment wise
                        $this->updateHeadWiseAmounts($headWiseAmounts, $transportFee->fee_type, $voucher_due_amount);

                        // calculate and update voucher amount installment wise
                        $this->updateStudentWiseAmounts($studentWiseAmounts, $student->id, $transportFee->fee_type, $voucher_due_amount);

                        // update installmentWiseSummary data
                        if (!isset($headWiseReport[$student->id])) {
                            $this->updateStudentHeadWiseDueSummaryData($headWiseReport, $student->toArray());
                        }

                        // store student due installments
                        if (
                            !isset($studentDueInstallments[$student->id]) ||
                            (isset($studentDueInstallments[$student->id]) && !in_array($voucher->title, $studentDueInstallments[$student->id]))
                        ) {
                            $studentDueInstallments[$student->id][] = $voucher->title;
                        }
                    }
                } else if ($type == 'installment_wise') {
                    // calculate and update voucher amount installment wise
                    $this->updateInstallmentWiseAmounts($istallmentWiseAmounts, $voucher->title, $voucher_due_amount);

                    // calculate and update voucher amount installment wise
                    $this->updateStudentWiseAmounts($studentWiseAmounts, $student->id, $voucher->title, $voucher_due_amount);

                    // update installmentWiseSummary data
                    if (!isset($installmentWiseReport[$student->id])) {
                        $this->updateStudentInstallmentWiseDueSummaryData($installmentWiseReport, $student->toArray());
                    }
                }
            }
        }
    }

    /*
    * function to get installment wise fee installments
    */
    private function getInstallmentsLateFeeAndTransportFee(
        &$studentFeeDiscounts,
        $feeInstallments,
        $transportFeeStructureSetting,
        $includeLateFee = false,
        $schoolId = null,
        $academicYearId = null
    ) {
        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId, $schoolId, $academicYearId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId, $schoolId, $academicYearId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // add transport fee in structure if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee', $schoolId, $academicYearId);
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee', $schoolId, $academicYearId);
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee', $schoolId, $academicYearId);

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
                                    $deallocateTransport?->fee_id,
                                    $schoolId,
                                    $academicYearId
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
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // add late fee in structure
                        if (!empty($includeLateFee) && $includeLateFee == true) {
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
                                        'fee_payments' => collect([]),
                                        'nullify_fee' => null,
                                        'student' => $studentFeeInstallments->first()->student,
                                    ]);

                                    $feeInstallments->push($newLateFee);
                                }
                            }
                        }
                    }
                }
            }
        }

        return $feeInstallments;
    }

    /*
    *   function to update head wise due summary
    */
    private function updateHeadWiseAmounts(array &$headWiseAmounts, string $title, float|int $dueAmount)
    {
        $headWiseAmounts[$title] = ($headWiseAmounts[$title] ?? 0) + $dueAmount;
    }

    /*
    *   function to update installment wise due summary
    */
    private function updateInstallmentWiseAmounts(array &$installmentWiseAmounts, string $title, float|int $dueAmount)
    {
        $installmentWiseAmounts[$title] = ($installmentWiseAmounts[$title] ?? 0) + $dueAmount;
    }

    /*
    * function to update student installment wise due summary
    */
    private function updateStudentWiseAmounts(array &$studentWiseAmounts, int $studentId, string $title, float|int $dueAmount)
    {
        $studentWiseAmounts[$studentId][$title] = ($studentWiseAmounts[$studentId][$title] ?? 0) + $dueAmount;
    }

    /*
    * function to update student head wise due summary
    */
    private function updateStudentHeadWiseDueSummaryData(array &$headWiseReport, $studentData)
    {
        if (!empty($studentData['promoted_classroom'])) {
            if (!empty($studentData['classroom'])) {
                unset($studentData['classroom']);
            }

            $studentData['classroom_id'] = $studentData['promoted_classroom']['id'] ?? null;
            $studentData['classroom'] = $studentData['promoted_classroom'];
        }

        $studentName = ($studentData['first_name'] ?? "") . " " . ($studentData['middle_name'] ?? "") . " " . ($studentData['last_name'] ?? "");
        $fatherName = ($studentData['father']['first_name'] ?? "") . " " . ($studentData['father']['middle_name'] ?? "") . " " . ($studentData['father']['last_name'] ?? "");

        $headWiseReport[$studentData['id']]['class'] = $studentData['classroom']['title'] ?? "";
        $headWiseReport[$studentData['id']]['roll'] = $studentData['classroom_roll']['roll_no'] ?? "";
        $headWiseReport[$studentData['id']]['admission_no'] = $studentData['admission_no'] ?? "";
        $headWiseReport[$studentData['id']]['name'] = $studentName;
        $headWiseReport[$studentData['id']]['parent'] = $fatherName;
        $headWiseReport[$studentData['id']]['phone'] = $studentData['father']['phone'] ?? "";
        $headWiseReport[$studentData['id']]['employment_category'] = $studentData['employment_category']['title'] ?? "";
    }

    /*
    * function to update student installment wise due summary
    */
    private function updateStudentInstallmentWiseDueSummaryData(array &$installmentWiseReport, $studentData)
    {
        if (!empty($studentData['promoted_classroom'])) {
            if (!empty($studentData['classroom'])) {
                unset($studentData['classroom']);
            }

            $studentData['classroom_id'] = $studentData['promoted_classroom']['id'] ?? null;
            $studentData['classroom'] = $studentData['promoted_classroom'];
        }

        $studentName = ($studentData['first_name'] ?? "") . " " . ($studentData['middle_name'] ?? "") . " " . ($studentData['last_name'] ?? "");
        $fatherName = ($studentData['father']['first_name'] ?? "") . " " . ($studentData['father']['middle_name'] ?? "") . " " . ($studentData['father']['last_name'] ?? "");

        $installmentWiseReport[$studentData['id']]['class'] = $studentData['classroom']['title'] ?? "";
        $installmentWiseReport[$studentData['id']]['roll'] = $studentData['classroom_roll']['roll_no'] ?? "";
        $installmentWiseReport[$studentData['id']]['admission_no'] = $studentData['admission_no'] ?? "";
        $installmentWiseReport[$studentData['id']]['name'] = $studentName;
        $installmentWiseReport[$studentData['id']]['parent'] = $fatherName;
        $installmentWiseReport[$studentData['id']]['phone'] = $studentData['father']['phone'] ?? "";
        $installmentWiseReport[$studentData['id']]['address'] = $studentData['present_address'] ?? "";
        $installmentWiseReport[$studentData['id']]['city'] = $studentData['present_city'] ?? "";
        $installmentWiseReport[$studentData['id']]['employment_category'] = $studentData['employment_category']['title'] ?? "";
    }

    /*
    *   export fee installment wise outstanding due report in excel
    */
    public function exportInstallmentWiseOutstandingDueReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $fromInstallment = $request->from_installment ?? null;
        $toInstallment = $request->to_installment ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $feeStructureId = $request->fee_structure_id ?? null;
        $includeLateFee = $request->late_fee ?? false;
        $includeVoucher = $request->voucher ?? false;

        $installmentWiseReport = [];

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $installmentWiseReport = $this->getInstallmentWiseOutstandingDueReport(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
                $includeLateFee,
                $includeVoucher
            );
        }

        $classroomTitle = $this->classroomRepository->getClassroomTitleById($request->classroom_id)?->title ?? "";

        $export = new InstallmentWiseOutstandingDueReportExport($installmentWiseReport, $classroomTitle);

        return Excel::download($export, "Due Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get installment wise outstanding due report
    */
    private function getInstallmentWiseOutstandingDueReport(
        $classroomId,
        $fromInstallment,
        $toInstallment,
        $studentStatus = "",
        $feeCategoryId = null,
        $feeStructureId = null,
        $includeLateFee = false,
        $includeVoucher = false
    ) {
        $headWiseReport = [];
        $installmentWiseReport = [];
        $studentWiseAmounts = [];
        $headWiseAmounts = [];
        $installmentWiseAmounts = [];
        $studentFeeDiscounts = [];
        $studentDueInstallments = [];
        $installmentWiseTotalDue = 0;
        $type = 'installment_wise';

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentFeeDiscounts,
                    $studentDueInstallments,
                    $feeInstallments,
                    $transportFeeStructureSetting,
                    $type,
                    $includeLateFee
                );
            }

            // to calculate general voucher and transport voucher due
            if (!empty($includeVoucher) && $includeVoucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $classroomId,
                    $studentStatus
                );

                $this->formatInstallmentWiseGeneralVouchers(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentDueInstallments,
                    $type,
                    $generalVouchers
                );

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($classroomId, $studentStatus);

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers(
                            $headWiseReport,
                            $installmentWiseReport,
                            $studentWiseAmounts,
                            $headWiseAmounts,
                            $installmentWiseAmounts,
                            $studentDueInstallments,
                            $type,
                            $student,
                            $transportFeeStructureSetting
                        );
                    }
                }
            }

            if (count($installmentWiseReport) > 0) {
                foreach ($installmentWiseReport as $studentId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $installmentWiseReport[$studentId]['installment_wise_amounts'] = $studentWiseAmounts[$studentId];
                    $installmentWiseReport[$studentId]['total'] = $total_due;

                    $installmentWiseTotalDue += $total_due;
                }
            }
        }

        // sort reports by classroom roll
        usort($installmentWiseReport, function ($a, $b) {
            $rollNoA = $a['roll'] ?? null;
            $rollNoB = $b['roll'] ?? null;

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

        return [
            'reports' => $installmentWiseReport,
            'installment_wise_amounts' => $installmentWiseAmounts,
            'total' => $installmentWiseTotalDue
        ];
    }

    /*
    *   export fee installment wise outstanding due report in excel
    */
    public function exportHeadWiseDailyFeeSummaryReport(Request $request)
    {
        $headWiseDailySummaryReport = [];

        if (!empty($request->start_date) && !empty($request->end_date)) {
            $headWiseDailySummaryReport = $this->getHeadWiseDailyFeeSummaryReportData(
                $request->filter_mode ?? "head_wise",
                $request->start_date,
                $request->end_date,
                $request->payment_mode ?? "",
            );
        }

        $paymentMode = $request->payment_mode ?? "All";

        $export = new HeadWiseDailySummaryReportExport($headWiseDailySummaryReport, $paymentMode);

        return Excel::download($export, "Head wise fee collections.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get head wise daily fee summary report data
    */
    private function getHeadWiseDailyFeeSummaryReportData(
        $filterMode,
        $startDate,
        $endDate,
        $paymentMode = ""
    ) {
        $headWiseDailySummary = [];
        $headWiseAmounts = [];
        $grand_total_paid = 0;
        $grand_total_discount = 0;

        $dailySummaryData = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentSummary($paymentMode, $startDate, $endDate);

        $headWiseDailySummary = $dailySummaryData->groupBy('payment_date')
            ->map(function ($groupedReports) use (
                &$headWiseAmounts,
                $filterMode,
                &$grand_total_paid,
                &$grand_total_discount,
            ) {
                $total_paid = 0;
                $total_discount = 0;
                $groupedHeadWiseAmounts = [];

                $groupedReports->each(function ($report) use (
                    &$headWiseAmounts,
                    &$groupedHeadWiseAmounts,
                    &$total_paid,
                    &$total_discount,
                    $filterMode
                ) {
                    if (count($report->fee_payments) > 0) {
                        $report->fee_payments->each(function ($feePayment) use (
                            &$headWiseAmounts,
                            &$groupedHeadWiseAmounts,
                            &$total_paid,
                            &$total_discount,
                            $report,
                            $filterMode
                        ) {
                            if ($filterMode == 'head_wise') {
                                // calculate fee type paid amount for grand total
                                if (isset($headWiseAmounts[$feePayment->feeType->fee_type])) {
                                    $headWiseAmounts[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $headWiseAmounts[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }

                                // calculate fee type paid amount for date wise total
                                if (isset($groupedHeadWiseAmounts[$feePayment->feeType->fee_type])) {
                                    $groupedHeadWiseAmounts[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $groupedHeadWiseAmounts[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }
                            }

                            if ($filterMode == 'payment_mode_wise') {
                                // calculate payment mode paid amount for grand total
                                if (isset($headWiseAmounts[$report->payment_mode])) {
                                    $headWiseAmounts[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $headWiseAmounts[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }

                                // calculate payment mode paid amount for date wise total
                                if (isset($groupedHeadWiseAmounts[$report->payment_mode])) {
                                    $groupedHeadWiseAmounts[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $groupedHeadWiseAmounts[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }
                            }

                            $total_paid += (float) $feePayment->paid_amount;
                            $total_discount += (float) $feePayment->discount_amount;
                        });
                    }
                });

                $grand_total_paid += $total_paid;
                $grand_total_discount += $total_discount;

                return collect([
                    'date' => Carbon::parse($groupedReports->first()->payment_date)->format('d-M-Y'),
                    'total' => $total_paid,
                    'concession' => $total_discount,
                    'head_wise_amounts' => $groupedHeadWiseAmounts
                ]);
            })->toArray();

        return [
            'reports' => $headWiseDailySummary,
            'head_wise_amounts' => $headWiseAmounts,
            'total' => $grand_total_paid,
            'concession' => $grand_total_discount,
        ];
    }

    /*
    *   export fee installment wise outstanding due report in excel
    */
    public function exportYearlyHeadWisePaidSummaryReport(Request $request)
    {
        $yearlyHeadWiseSummaryReport = [];

        if (!empty($request->start_date) && !empty($request->end_date)) {
            $yearlyHeadWiseSummaryReport = $this->getYearlyHeadWisePaidSummaryReportData(
                $request->start_date,
                $request->end_date,
                $request->payment_mode ?? "",
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $paymentMode = $request->payment_mode ?? "All";

        $export = new YearlyHeadWisePaidSummaryReportExport($yearlyHeadWiseSummaryReport, $paymentMode, $schoolTitle);

        return Excel::download($export, "Yearly Head wise paid summary.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get head wise daily fee summary report data
    */
    private function getYearlyHeadWisePaidSummaryReportData(
        $startDate,
        $endDate,
        $paymentMode = ""
    ) {
        $yearlyPaidSummary = [];
        $month_wise_amounts = [];
        $fee_type_month_wise_amounts = [];
        $fee_type_refund_amounts = [];
        $grand_total = 0;
        $grand_total_refund = 0;

        $yearlySummaryData = $this->feePaymentMethodRepository->getHeadWiseYearlyFeePaymentSummary($paymentMode, $startDate, $endDate);

        $yearlySummaryData->each(function ($yearlySummary) use (
            &$month_wise_amounts,
            &$yearlyPaidSummary,
            &$fee_type_month_wise_amounts,
            &$fee_type_refund_amounts,
        ) {
            foreach ($yearlySummary->fee_payments as $feePayment) {
                // calculate month wise paid amount for grand total
                $groupDate = Carbon::parse($yearlySummary->payment_date)->format('M-Y');

                if (isset($month_wise_amounts[$groupDate])) {
                    $month_wise_amounts[$groupDate] += (float) $feePayment?->paid_amount ?? 0;
                } else {
                    $month_wise_amounts[$groupDate] = (float) $feePayment?->paid_amount ?? 0;
                }

                // calculate  month wise paid amount for date wise total
                if (isset($fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate])) {
                    $fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate] += (float) $feePayment?->paid_amount ?? 0;
                } else {
                    $fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate] = (float) $feePayment?->paid_amount ?? 0;
                }

                $yearlyPaidSummary[$feePayment->fee_type_id] = [
                    'fee_type' => $feePayment->feeType->fee_type,
                ];

                // calculate total refund of each fee type
                $refund_amount = $this->feePaymentRefundRepository->getPaymentFeeTypeTotalRefund($feePayment->student_id, $feePayment->fee_type_id) ?? 0;

                if (isset($fee_type_refund_amounts[$feePayment->fee_type_id])) {
                    $fee_type_refund_amounts[$feePayment->fee_type_id] += $refund_amount;
                } else {
                    $fee_type_refund_amounts[$feePayment->fee_type_id] = $refund_amount;
                }
            }
        });

        foreach ($yearlyPaidSummary as $feeTypeId => $yearlyFeePayment) {
            $total_paid = 0;

            foreach ($fee_type_month_wise_amounts[$feeTypeId] as $amount) {
                $total_paid += $amount;
            }

            $yearlyPaidSummary[$feeTypeId]['month_wise_amounts'] = $fee_type_month_wise_amounts[$feeTypeId];
            $yearlyPaidSummary[$feeTypeId]['total'] = $total_paid;
            $yearlyPaidSummary[$feeTypeId]['refund'] = $fee_type_refund_amounts[$feeTypeId] ?? 0;
            $yearlyPaidSummary[$feeTypeId]['net_receipt'] = $total_paid - ($fee_type_refund_amounts[$feeTypeId] ?? 0);

            $grand_total += $total_paid;
            $grand_total_refund += $fee_type_refund_amounts[$feeTypeId] ?? 0;
        }

        return [
            'reports' => $yearlyPaidSummary,
            'month_wise_amounts' => $month_wise_amounts,
            'total' => $grand_total,
            'refund' => $grand_total_refund,
            'net_receipt' => $grand_total - $grand_total_refund,
        ];
    }

    /*
    *   export class wise fee collection report in excel
    */
    public function exportClassWiseFeeCollectionReport(Request $request)
    {
        $classWiseFeeCollectionReport = [];
        $filterType = $request->filter_type ?? "date_wise";

        if ($filterType === "installment_wise") {
            $reportTitle = "Installment - ";
        } else {
            $reportTitle = "Date - ";
        }

        if (
            ($filterType === "date_wise" && (!empty($request->start_date) && !empty($request->end_date))) ||
            ($filterType === "installment_wise" && (!empty($request->from_fee_id) && !empty($request->to_fee_id)))
        ) {
            $classWiseFeeCollectionReport = $this->getClassWiseFeeCollectionReportData(
                $filterType,
                $request->start_date,
                $request->end_date,
                $request->from_fee_id,
                $request->to_fee_id
            );

            if ($filterType === "installment_wise") {
                $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
                $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

                $reportTitle .= "From {$fromFeeTitle} to {$toFeeTitle}";
            } else {
                $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
                $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

                $reportTitle .= "From {$startDate} to {$endDate}";
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = $academicYear = getAcademicYear();

        $export = new ClassWiseFeeCollectionReportExport($classWiseFeeCollectionReport, $academicYear, $schoolTitle, $reportTitle);

        return Excel::download($export, "Class wise fee collections.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get class wise daily fee collection report data
    */
    private function getClassWiseFeeCollectionReportData(
        $filterType,
        $startDate,
        $endDate,
        $fromFeeId,
        $toFeeId
    ) {
        $classWiseFeeCollectionReport = [];
        $totalAmount = 0;

        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getDateAndInstallmentWiseFeePaymentSummary(
            $filterType,
            $startDate,
            $endDate,
            $fromFeeId,
            $toFeeId
        );

        if ($feeCollectionSummaryData->count() > 0) {
            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($report) {
                if ($report->fee_payments->count() > 0) {
                    $report['fee_payments'] = $report->fee_payments->map(function ($payment) {
                        if ($payment?->student?->promotedClassroom != null) {
                            $payment['student']['classroom_id'] = $payment?->student?->promotedClassroom?->id;
                        }

                        return $payment;
                    });
                }

                return $report;
            });

            $classrooms = $this->classroomRepository->getActiveAll();

            $tempClassWiseData = [];

            foreach ($feeCollectionSummaryData as $summaryData) {
                if (count($summaryData->fee_payments) > 0) {
                    foreach ($summaryData->fee_payments as $feePayment) {
                        if (isset($tempClassWiseData[$feePayment->student->classroom_id])) {
                            $tempClassWiseData[$feePayment->student->classroom_id] += (float) $feePayment->paid_amount ?? 0;
                        } else {
                            $tempClassWiseData[$feePayment->student->classroom_id] = (float) $feePayment->paid_amount ?? 0;
                        }
                    }
                }
            }

            foreach ($classrooms as $classroom) {
                $classWiseFeeCollectionReport[$classroom->id]['class'] = $classroom->title;
                $classWiseFeeCollectionReport[$classroom->id]['total_amount'] = $tempClassWiseData[$classroom->id] ?? 0;
                $totalAmount += $tempClassWiseData[$classroom->id] ?? 0;
            }
        }

        return [
            'reports' => $classWiseFeeCollectionReport,
            'total_amount' => $totalAmount
        ];
    }

    /*
    *   export installment wise fee collection report in excel
    */
    public function exportInstallmentWiseFeeCollectionReport(Request $request)
    {
        $installmentWiseFeeCollectionReport = [];
        $filterType = $request->filter_type ?? "date_wise";

        if ($filterType === "installment_wise") {
            $reportTitle = "Installment - ";
        } else {
            $reportTitle = "Date - ";
        }

        if (
            ($request->filter_type === "date_wise" && (!empty($request->start_date) && !empty($request->end_date))) ||
            ($request->filter_type === "installment_wise" && (!empty($request->from_fee_id) && !empty($request->to_fee_id)))
        ) {
            $installmentWiseFeeCollectionReport = $this->getInstallmentWiseFeeCollectionReportData(
                $filterType,
                $request->start_date,
                $request->end_date,
                $request->from_fee_id,
                $request->to_fee_id
            );

            if ($filterType === "installment_wise") {
                $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
                $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

                $reportTitle .= "From {$fromFeeTitle} to {$toFeeTitle}";
            } else {
                $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
                $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

                $reportTitle .= "From {$startDate} to {$endDate}";
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new InstallmentWiseFeeCollectionReportExport($installmentWiseFeeCollectionReport, $academicYear, $schoolTitle, $reportTitle);

        return Excel::download($export, "Installment wise fee collections.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get installment wise daily fee collection report data
    */
    private function getInstallmentWiseFeeCollectionReportData(
        $filterType,
        $startDate,
        $endDate,
        $fromFeeId,
        $toFeeId
    ) {
        $installmentWiseFeeCollectionReport = [];
        $totalAmount = 0;

        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getDateAndInstallmentWiseFeePaymentSummary(
            $filterType,
            $startDate,
            $endDate,
            $fromFeeId,
            $toFeeId
        );

        if ($feeCollectionSummaryData->count() > 0) {
            $fees = $this->feeRepository->getActiveIdTitle();

            $tempInstallmentWiseData = [];

            foreach ($feeCollectionSummaryData as $summaryData) {
                if (count($summaryData->fee_payments) > 0) {
                    foreach ($summaryData->fee_payments as $feePayment) {
                        if ($feePayment->fee_payment_type == FeePaymentType::FEEINSTALLMENT->value) {
                            if (isset($tempInstallmentWiseData[$feePayment->fee_id])) {
                                $tempInstallmentWiseData[$feePayment->fee_id] += (float) $feePayment->paid_amount ?? 0;
                            } else {
                                $tempInstallmentWiseData[$feePayment->fee_id] = (float) $feePayment->paid_amount ?? 0;
                            }
                        }
                    }
                }
            }

            if ($filterType == "installment_wise") {
                $fees->filter(function ($fee) use ($fromFeeId) {
                    return $fee->id >= $fromFeeId;
                })->map(function ($fee) use (&$installmentWiseFeeCollectionReport, $tempInstallmentWiseData, &$totalAmount) {
                    $installmentWiseFeeCollectionReport[$fee->id]['installment'] = $fee->title;
                    $installmentWiseFeeCollectionReport[$fee->id]['total_amount'] = $tempInstallmentWiseData[$fee->id] ?? 0;
                    $totalAmount += $tempInstallmentWiseData[$fee->id] ?? 0;
                });
            } else {
                $fees->filter(function ($fee) use ($tempInstallmentWiseData) {
                    return in_array($fee->id, array_keys($tempInstallmentWiseData));
                })->map(function ($fee) use (&$installmentWiseFeeCollectionReport, $tempInstallmentWiseData, &$totalAmount) {
                    $installmentWiseFeeCollectionReport[$fee->id]['installment'] = $fee->title;
                    $installmentWiseFeeCollectionReport[$fee->id]['total_amount'] = $tempInstallmentWiseData[$fee->id] ?? 0;
                    $totalAmount += $tempInstallmentWiseData[$fee->id] ?? 0;
                });
            }
        }

        return [
            'reports' => $installmentWiseFeeCollectionReport,
            'total_amount' => $totalAmount,
        ];
    }

    /*
    *   export complete fee paid report in excel
    */
    public function exportCompleteFeePaidReport(Request $request)
    {
        $completeFeePaidReport = [];

        $classroomTitle = "All Class";
        $reportTitle = "Installments ";

        $classroomId = $request->classroom_id ?? null;

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom->title ?? "";
        }

        if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
            $completeFeePaidReport = $this->getCompleteFeePaidReportData(
                $request->from_fee_id,
                $request->to_fee_id,
                $classroomId
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

            $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
        }

        $export = new CompleteFeePaidReportExport($completeFeePaidReport, $classroomTitle, $reportTitle);

        return Excel::download($export, "Paid Report of {$classroomTitle}.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get complete fee paid report data
    */
    private function getCompleteFeePaidReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId = null
    ) {
        $completePaidReport = [];
        $installmentWiseAmounts = [];
        $grandTotalPaidAmount = 0;
        $studentIds = [];

        if (!empty($classroomId)) {
            $studentIds = $this->studentRepository->getStudentsByClassroomId($classroomId)
                ->pluck('id')
                ->toArray();
        }

        $completePaidReportData = $this->feePaymentRepository->getCompletePaidReports(
            $classroomId,
            $studentIds,
            $fromFeeId,
            $toFeeId
        );

        if (count($completePaidReportData) > 0) {
            $completePaidReportData->loadMissing(['fee']);

            $completePaidReportData = $completePaidReportData->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }
                return $report;
            });

            foreach ($completePaidReportData->groupBy('student_id') as $studentId =>  $studentReports) {
                $student = $studentReports->first()?->student;
                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                foreach ($studentReports->groupBy('fee_id') as $feeId => $reports) {
                    $total_paid_amount = 0;
                    $isCompletePaid = true;

                    $fee = $reports->first()->fee;

                    $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByFeeIdAndStudentId($studentId, $feeId);

                    if (count($feeInstallments) > 0) {
                        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeId);

                        $total_transport_fee = 0;
                        $total_late_fee = 0;

                        if (!$hasPayment) {
                            $fee = $reports->first()->fee;

                            // calculte transport fee if transport fee setting set to fee
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
                                                    $existedTransportFee = $reports->where('fee_type_id', $transportFee->id)->first();

                                                    if ($existedTransportFee == null) {
                                                        $total_transport_fee += $transportFeeAmount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            // calculate late fee
                            $lateFee = $this->feeTypeRepository->getLateFeeType();

                            if ($lateFee != null) {
                                $existedLateFee = $reports->where('fee_type_id', $lateFee->id)->first();
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

                                    $total_late_fee += $late_fee_amount;
                                }
                            }
                        }

                        foreach ($feeInstallments as $installment) {
                            $semester = $installment?->smeseter ?? 1;
                            $fee_amount = ((float) $installment?->amount ?? 0) * $semester;
                            $payable_amount =  $fee_amount + $total_late_fee + $total_transport_fee;

                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;

                            $total_paid_amount += $paid_amount;

                            if ($payable_amount != ($paid_amount + $discount_amount)) {
                                $isCompletePaid = false;
                                break;
                            }
                        }
                    }

                    if ($isCompletePaid) {
                        $studentName = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");
                        $parentName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                        $completePaidReport[$studentId]['roll'] = $student?->classroomRoll?->roll_no;
                        $completePaidReport[$studentId]['admission_no'] = $student->admission_no;
                        $completePaidReport[$studentId]['student_type'] = $student->boarding_type;
                        $completePaidReport[$studentId]['name'] = $studentName;
                        $completePaidReport[$studentId]['parent'] = $parentName;
                        $completePaidReport[$studentId]['class'] = $student?->classroom?->title ?? "";
                        $completePaidReport[$studentId]['mobile_no'] = $student?->father?->phone ?? "";
                        $completePaidReport[$studentId]['address'] = $student->present_address ?? "";
                        $completePaidReport[$studentId]['installment_wise_amounts'][$fee->title] = $total_paid_amount;

                        if (!empty($completePaidReport[$studentId]['total_paid_amount'])) {
                            $completePaidReport[$studentId]['total_paid_amount'] += $total_paid_amount;
                        } else {
                            $completePaidReport[$studentId]['total_paid_amount'] = $total_paid_amount;
                        }

                        $installmentWiseAmounts[$fee->id] = [
                            'title' => $fee->title,
                            'amount' => ($installmentWiseAmounts[$fee->title] ?? 0) + $total_paid_amount
                        ];

                        $grandTotalPaidAmount += $total_paid_amount;
                    }
                }
            }
        }

        $updatedInstallmentWiseAmounts = [];

        if (count($installmentWiseAmounts) > 0) {
            ksort($installmentWiseAmounts);

            foreach ($installmentWiseAmounts as $installment) {
                $updatedInstallmentWiseAmounts[$installment['title']] = $installment['amount'];
            }
        }

        return [
            'reports' => $completePaidReport,
            'installment_wise_amounts' => $updatedInstallmentWiseAmounts,
            'total_paid_amount' => $grandTotalPaidAmount,
        ];
    }

    /*
    *   export yearly head wise due report in excel
    */
    public function exportYearlyHeadWiseDueReport(Request $request)
    {
        $yearlyHeadWiseDueReport = [];

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $includeVoucher = $request->include_voucher ?? false;

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $yearlyHeadWiseDueReport = $this->getYearlyHeadWiseDueReportData(
                $fromFeeId,
                $toFeeId,
                $includeVoucher
            );
        }

        $export = new YearlyHeadWiseDueReportExport($yearlyHeadWiseDueReport);

        return Excel::download($export, "Yearly Fee Due.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get complete fee paid report data
    */
    private function getYearlyHeadWiseDueReportData(
        $fromFeeId,
        $toFeeId,
        $includeVoucher = false
    ) {
        $yearlyHeadWiseDueSummary = [];
        $installmentWiseAmounts = [];
        $feeTypeInstallmentWiseAmounts = [];
        $totalDueAmount = 0;

        // get transport fee setting
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $this->getAndFormatYearlyHeadWiseFeeInstallmentsDueData(
            $yearlyHeadWiseDueSummary,
            $installmentWiseAmounts,
            $feeTypeInstallmentWiseAmounts,
            $fromFeeId,
            $toFeeId,
            $transportFeeStructureSetting
        );

        // calculate general voucher and transport voucher due
        if ($includeVoucher == true) {
            // general vouchers
            $this->getAndFormatYearlyHeadWiseGeneralVouchersDueData(
                $yearlyHeadWiseDueSummary,
                $installmentWiseAmounts,
                $feeTypeInstallmentWiseAmounts
            );

            // transport vouchers
            $this->getAndFormatYearlyHeadWiseTransportVouchersDueData(
                $yearlyHeadWiseDueSummary,
                $installmentWiseAmounts,
                $feeTypeInstallmentWiseAmounts,
                $transportFeeStructureSetting
            );
        }

        foreach ($yearlyHeadWiseDueSummary as $feeTypeId => $groupedDueSummary) {
            $total_due = 0;

            foreach ($feeTypeInstallmentWiseAmounts[$feeTypeId] as $amount) {
                $total_due += $amount;
                $totalDueAmount += $amount;
            }

            $yearlyHeadWiseDueSummary[$feeTypeId]['installment_wise_amounts'] = $feeTypeInstallmentWiseAmounts[$feeTypeId];
            $yearlyHeadWiseDueSummary[$feeTypeId]['total'] = $total_due;
        }

        $updatedInstallmentWiseAmounts = [];

        if (count($installmentWiseAmounts) > 0) {
            ksort($installmentWiseAmounts);

            if (!empty($installmentWiseAmounts['Voucher'])) {
                // Removing the Voucher key and its corresponding value
                $voucherValue = $installmentWiseAmounts['Voucher'];
                unset($installmentWiseAmounts['Voucher']);

                // Pushing the Voucher key to the end of the array
                $installmentWiseAmounts['Voucher'] = $voucherValue;
            }

            foreach ($installmentWiseAmounts as $installment) {
                $updatedInstallmentWiseAmounts[$installment['title']] = $installment['amount'];
            }
        }

        return [
            'reports' => $yearlyHeadWiseDueSummary,
            'installment_wise_amounts' => $updatedInstallmentWiseAmounts,
            'total' => $totalDueAmount
        ];
    }

    /*
    *   helper method to get yearly head wise fee installments due data
    */
    private function getAndFormatYearlyHeadWiseFeeInstallmentsDueData(
        array &$yearlyHeadWiseDueSummary,
        array &$installmentWiseAmounts,
        array &$feeTypeInstallmentWiseAmounts,
        int $fromFeeId,
        int $toFeeId,
        $transportFeeStructureSetting
    ) {
        $feeInstallments = $this->classFeeStudentAmountRepository->getYearlyHeadWiseDueSummary($fromFeeId, $toFeeId);

        if (count($feeInstallments) > 0) {
            $studentFeeDiscounts = [];

            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;
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
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // to calculate fee installments due
            foreach ($feeInstallments as $feeInstallment) {
                // check if installment has nullify fee. if fee nullified then exclude the fee
                if (empty($feeInstallment['nullify_fee'])) {
                    $fee_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $due_amount = $fee_amount;
                    $paid_amount = 0;
                    $discount_amount = 0;

                    // check if installment has payment. if has payment then update due amount
                    if (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    } elseif (!empty($studentFeeDiscounts[$feeInstallment['student_id']])) {
                        foreach ($studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            }
                        }
                    }

                    $feeId = $feeInstallment['fee']['id'];
                    $feeTitle = $feeInstallment['fee']['title'];
                    $feeTypeId = $feeInstallment['fee_type_id'];
                    $feeTypeTitle = $feeInstallment['feeType']['fee_type'];

                    // calculate and update fee amount installment wise
                    $installmentWiseAmounts[$feeId] = [
                        'title' => $feeTitle,
                        'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $due_amount
                    ];

                    // calculate and update fee amount installment wise
                    $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $due_amount;

                    // update yearly head wise due summary data
                    $yearlyHeadWiseDueSummary[$feeTypeId]['title'] = $feeTypeTitle;
                }
            }
        }
    }

    /*
    *   helper method to get yearly head wise fee installments due data
    */
    private function getAndFormatYearlyHeadWiseGeneralVouchersDueData(
        array &$yearlyHeadWiseDueSummary,
        array &$installmentWiseAmounts,
        array &$feeTypeInstallmentWiseAmounts,
    ) {
        $generalVouchers = $this->studentFeeVoucherRepository->getHeadWiseDueFeeVouchers();

        // if has any general voucher then calculate due and merge data with headWiseDueSummary
        if (count($generalVouchers) > 0) {
            foreach ($generalVouchers as $generalVoucher) {
                foreach ($generalVoucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_amount = (float) $feeTypeAmount->amount ?? 0;
                    $voucher_due_amount = $voucher_amount;
                    $voucher_discount_amount = 0;
                    $voucher_paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount?->payment != null) {
                        $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $voucher_due_amount = $voucher_amount - $voucher_discount_amount - $voucher_paid_amount;
                    }

                    $feeId = "Voucher";
                    $feeTitle = 'Voucher';
                    $feeTypeId = $feeTypeAmount->fee_type_id;
                    $feeTypeTitle = $feeTypeAmount->feeType->fee_type;

                    // calculate and update fee amount installment wise
                    $installmentWiseAmounts[$feeId] = [
                        'title' => $feeTitle,
                        'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $voucher_due_amount
                    ];

                    // calculate and update fee amount installment wise
                    $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $voucher_due_amount;

                    // update yearly head wise due summary data
                    $yearlyHeadWiseDueSummary[$feeTypeId]['title'] = $feeTypeTitle;
                }
            }
        }
    }

    /*
    *   helper method to get yearly head wise fee installments due data
    */
    private function getAndFormatYearlyHeadWiseTransportVouchersDueData(
        array &$yearlyHeadWiseDueSummary,
        array &$installmentWiseAmounts,
        array &$feeTypeInstallmentWiseAmounts,
        $transportFeeStructureSetting
    ) {
        $students = $this->studentRepository->getActiveNameAndId();

        if ($students->count() > 0) {
            foreach ($students as $student) {
                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                $transportFeeType = $this->feeTypeRepository->getTransportFeeType();

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount;
                        $discount_amount = 0;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }

                        $feeId = "Voucher";
                        $feeTitle = 'Voucher';
                        $feeTypeId = $transportFeeType->id;
                        $feeTypeTitle = $transportFeeType->fee_type;

                        // calculate and update fee amount installment wise
                        $installmentWiseAmounts[$feeId] = [
                            'title' => $feeTitle,
                            'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $due_amount
                        ];

                        // calculate and update fee amount installment wise
                        $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $due_amount;

                        // update yearly head wise due summary data
                        $yearlyHeadWiseDueSummary[$feeTypeId]['title'] = $feeTypeTitle;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $due_amount = $fee_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $feeId = "Voucher";
                        $feeTitle = 'Voucher';
                        $feeTypeId = $transportFeeType->id;
                        $feeTypeTitle = $transportFeeType->fee_type;

                        // calculate and update fee amount installment wise
                        $installmentWiseAmounts[$feeId] = [
                            'title' => $feeTitle,
                            'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $due_amount
                        ];

                        // calculate and update fee amount installment wise
                        $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $due_amount;

                        // update yearly head wise due summary data
                        $yearlyHeadWiseDueSummary[$feeTypeId]['title'] = $feeTypeTitle;
                    }
                }
            }
        }
    }

    /*
    *   export complete outstanding due report in excel
    */
    public function exportCompleteOutstandingDueReport(Request $request)
    {
        $completeOutstandingDueReport = [];
        $reportTitle = "Installments ";
        $classroomTitle = "All Class";

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $classroomId = $request->classroom_id ?? "";
        $studentStatus = $request->student_status ?? "";
        $studentActiveStatus = $request->student_active_status ?? "";
        $employmentCategoryId = $request->employment_category_id ?? null;
        $includeLateFee = $request->late_fee ?? false;
        $includeVoucher = $request->voucher ?? false;

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom->title ?? "";
        }

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $completeOutstandingDueReport = $this->getCompleteOutstandingDueReportData(
                $fromFeeId,
                $toFeeId,
                $classroomId,
                $studentStatus,
                $studentActiveStatus,
                $employmentCategoryId,
                $includeLateFee,
                $includeVoucher
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

            $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
        }

        $export = new CompleteOutstandingDueReportExport($completeOutstandingDueReport, $reportTitle, $classroomTitle);

        return Excel::download($export, "Due Report of {$classroomTitle}.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }


    /*
    *   helper mehtod to get complete fee paid report data
    */
    private function getCompleteOutstandingDueReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId = "",
        $studentStatus = "",
        $studentActiveStatus = "",
        $employmentCategoryId = null,
        $includeLateFee = false,
        $includeVoucher = false
    ) {
        $completeOutstandingDueReports = [];
        $totalDueAmount = 0;

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $feeInstallments = $this->classFeeStudentAmountRepository->getCompleteDueSummary(
            $fromFeeId,
            $toFeeId,
            $classroomId,
            $studentStatus,
            $studentActiveStatus,
            $employmentCategoryId
        );

        // process fee installments data
        $completeOutstandingDueReports = $this->processCompleteOutstandingDueFeeInstallmentsData(
            $transportFeeStructureSetting,
            $completeOutstandingDueReports,
            $feeInstallments,
            $includeLateFee,
        );

        // get voucher fee
        if ($includeVoucher == true) {
            // get transport voucher data and calculate due
            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                $completeOutstandingDueReports = $this->getAndProcessCompleteDueTransportVouchersData(
                    $completeOutstandingDueReports,
                    $transportFeeStructureSetting,
                    $classroomId,
                    $studentStatus,
                    $studentActiveStatus,
                    $employmentCategoryId
                );
            }

            // get general voucher all due
            $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchers(
                $classroomId,
                $studentStatus,
                $studentActiveStatus,
                $employmentCategoryId
            );

            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['classroom'])) {
                        unset($voucher['classroom']);
                    }

                    $voucher['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->student?->classroom_id;

                $voucher->student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $voucher;
            });

            // process general vouchers data
            $completeOutstandingDueReports = $this->processCompleteDueGeneralVouchersData($completeOutstandingDueReports, $generalVouchers);
        }

        if (count($completeOutstandingDueReports) > 0) {
            foreach ($completeOutstandingDueReports as $report) {
                $totalDueAmount += $report['total_due_amount'] ?? 0;
            }
        }

        return [
            'reports' => $completeOutstandingDueReports,
            'total_due_amount' => $totalDueAmount
        ];
    }

    /*
    *   helper method to processs fee installments due data for student complete outstanding due
    */
    private function processCompleteOutstandingDueFeeInstallmentsData(
        $transportFeeStructureSetting,
        $completeOutstandingDueReports,
        $feeInstallments,
        $includeLateFee = false
    ) {
        if (count($feeInstallments) > 0) {
            $feeInstallments->loadMissing([
                'payment',
                'nullify_fee',
                'father',
                'mother',
            ]);

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['student']['classroom'])) {
                        unset($feeInstallment['student']['classroom']);
                    }

                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            $completeOutstandingDueReports = $feeInstallments->groupBy('student_id')->map(function ($studentInstallments) use ($includeLateFee, $transportFeeStructureSetting) {
                // calculate student total due
                $studentTotalDue = 0;
                $studentTotalLateFee = 0;
                $studentTotalTranspotFee = 0;

                $student = $studentInstallments?->first()?->student;
                $classroomId = $student?->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                // calculate late fee and transport fee
                foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeIntallmentsGroupedData) {
                    $studentId = $studentInstallments->first()->student_id;
                    $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $feeIntallmentsGroupedData->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
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
                                                $existedTransportFee = $feeIntallmentsGroupedData->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (count($studentFeeDiscounts) > 0) {
                                                        foreach ($studentFeeDiscounts as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $transportFeeAmount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }

                                                                $transportFeeAmount = $transportFeeAmount - $discount_amount;
                                                            }
                                                        }
                                                    }

                                                    $studentTotalTranspotFee += $transportFeeAmount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        if ($includeLateFee == true) {
                            // add late fee in structure if late fine is available
                            $lateFee = $this->feeTypeRepository->getLateFeeType();

                            if ($lateFee != null) {
                                $existedLateFee = $feeIntallmentsGroupedData->where('fee_type_id', $lateFee->id)->first();
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

                                    if (count($studentFeeDiscounts) > 0) {
                                        foreach ($studentFeeDiscounts as $discount) {
                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                                if ($discount->is_discount_percentage) {
                                                    $discount_amount = (float) ($discount->amount / 100) * $late_fee_amount;
                                                } else {
                                                    $discount_amount = (float) $discount->amount;
                                                }

                                                $late_fee_amount = $late_fee_amount - $discount_amount;
                                            }
                                        }
                                    }

                                    $studentTotalLateFee += $late_fee_amount;
                                }
                            }
                        }
                    }
                }

                $studentInstallments->each(function ($installment) use (&$studentTotalDue, $studentFeeDiscounts) {
                    $semester = $installment->semester ?? 1;
                    $due_amount = ((float) $installment->amount ?? 0) * $semester;

                    if ($installment->nullify_fee !== null) {
                        $due_amount = 0;
                    } elseif ($installment->payment !== null) {
                        $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $due_amount = $due_amount - $discount_amount - $paid_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $due_amount - $discount_amount;
                            }
                        }
                    }

                    $studentTotalDue += $due_amount;
                });

                $studentinstallment = $studentInstallments->first();

                // construct father name
                $father_name = "";

                if ($studentinstallment->father != null) {
                    $father_name = "{$studentinstallment?->father?->first_name} {$studentinstallment?->father?->middle_name} {$studentinstallment->father->last_name}";
                }

                return [
                    'id' => $studentinstallment->student_id,
                    'admission_no' => $student?->admission_no,
                    'roll' => $student?->classroomRoll?->roll_no ?? "",
                    'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                    'address' => $student?->present_address,
                    'parent' => $father_name,
                    'mobile_no' => $student?->father?->sms_phone ?? "",
                    'class' => $student?->classroom?->title,
                    'mother_phone' => $studentinstallment?->mother?->phone ?? "",
                    'father_email' => $studentinstallment?->father?->email ?? "",
                    'mother_email' => $studentinstallment?->mother?->email ?? "",
                    'employment_category' => $student?->employment_category?->title ?? "",
                    'total_due_amount' => $studentTotalDue + $studentTotalLateFee + $studentTotalTranspotFee,
                ];
            })->toArray();
        }

        return $completeOutstandingDueReports;
    }

    /*
    *   helper method to processs transport voucher due data for student outstanding due
    */
    private function getAndProcessCompleteDueTransportVouchersData(
        $completeOutstandingDueReports,
        $transportFeeStructureSetting,
        $classroomId = null,
        $studentStatus = "",
        $studentActiveStatus = "",
        $employmentCategoryId = null
    ) {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndStudentStatus($classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId);

        if (count($students) > 0) {
            $students->load(['classroom', 'father', 'mother', 'employment_category', 'promotedClassroom']);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $student;
            });

            foreach ($students as $student) {
                $total_due = 0;

                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $due_amount = (float) $allocate->amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $due_amount - $discount_amount - $paid_amount;
                        }

                        $total_due += $due_amount;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $total_due += $fee_amount;
                    }
                }

                if ($total_due > 0) {
                    if (isset($completeOutstandingDueReports[$student->id])) {
                        $completeOutstandingDueReports[$student->id]['total_due_amount'] += $total_due;
                    } else {
                        // construct father name
                        $father_name = "";

                        if ($student->father != null) {
                            $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";
                        }

                        // merge student data in reports
                        $completeOutstandingDueReports[$student?->id] = [
                            'id' => $student?->id,
                            'admission_no' => $student?->admission_no,
                            'roll' => $student?->classroomRoll?->roll_no,
                            'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                            'address' => $student?->present_address,
                            'parent' => $father_name,
                            'mobile_no' => $student?->father?->sms_phone ?? "",
                            'class' => $student?->classroom?->title ?? "",
                            'mother_phone' => $student?->mother?->phone ?? "",
                            'father_email' => $student?->father?->email ?? "",
                            'mother_email' => $student?->mother?->email ?? "",
                            'employment_category' => $student?->employment_category?->title ?? "",
                            'total_due_amount' =>  $total_due,
                        ];
                    }

                    $completeOutstandingDueReports[$student?->classroom?->id]['total_due_amount'] += $total_due;
                }
            }
        }

        return $completeOutstandingDueReports;
    }

    /*
    *   helper method to processs voucher due data
    */
    private function processCompleteDueGeneralVouchersData($completeOutstandingDueReports, $vouchers)
    {
        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                $due_amount = 0;

                foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                    $amount = (float) $voucherAmountData->amount;

                    if ($voucherAmountData->payment != null) {
                        $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $amount = $amount - $discount_amount - $paid_amount;
                    }

                    $due_amount += $amount;
                }

                // check if student daat already exists. if alreday exists then update due amount else add new student data
                if (isset($completeOutstandingDueReports[$voucher->student_id])) {
                    $completeOutstandingDueReports[$voucher->student_id]['total_due_amount'] += $due_amount;
                } else {
                    // construct father name
                    $father_name = "";

                    if ($voucher->father != null) {
                        $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher->father->last_name}";
                    }

                    // merge student data in reports
                    $completeOutstandingDueReports[$voucher->student_id] = [
                        'id' => $voucher->student?->id,
                        'admission_no' => $voucher->student?->admission_no,
                        'roll' => $voucher->student?->classroomRoll?->roll_no,
                        'name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                        'address' => $voucher?->student?->present_address,
                        'parent' => $father_name,
                        'mobile_no' => $voucher?->father?->sms_phone ?? "",
                        'class' => $voucher?->classroom?->title ?? "",
                        'mother_phone' => $voucher?->mother?->phone ?? "",
                        'father_email' => $voucher?->father?->email ?? "",
                        'mother_email' => $voucher?->mother?->email ?? "",
                        'employment_category' => $voucher?->student?->employment_category?->title ?? "",
                        'total_due_amount' =>  $due_amount,
                    ];
                }
            }
        }

        return $completeOutstandingDueReports;
    }

    /*
    *   export consolidated due report in excel
    */
    public function exportConsolidatedDueReport(Request $request)
    {
        $consolidatedDueReport = [];

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $includeVoucher = $request->voucher ?? false;

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $consolidatedDueReport = $this->getConsolidatedDueReportData(
                $fromFeeId,
                $toFeeId,
                $studentStatus,
                $feeCategoryId,
                $includeVoucher
            );
        }

        $export = new ConsolidatedDueReportExport($consolidatedDueReport);

        return Excel::download($export, "Fee Consolideted Due Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get consolidated due report data
    */
    private function getConsolidatedDueReportData(
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId = null,
        $includeVoucher = false
    ) {
        $consolidatedDueReports = [];
        $totalPayable = 0;
        $totalPaid = 0;
        $totalDue = 0;

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        // get fee installments
        $consolidatedDueReports = $this->getConsolidatedDueFeeInstallmentsData(
            $consolidatedDueReports,
            $transportFeeStructureSetting,
            $fromFeeId,
            $toFeeId,
            $studentStatus,
            $feeCategoryId
        );

        if ($includeVoucher == true) {
            // get general vouchers
            $consolidatedDueReports = $this->getConsolidatedDueGeneralVouchersData($consolidatedDueReports, $studentStatus);

            // get transport vouchers
            $consolidatedDueReports = $this->getConsolidatedDueTransortVouchersData(
                $consolidatedDueReports,
                $transportFeeStructureSetting,
                $studentStatus
            );
        }

        if (!empty($consolidatedDueReports)) {
            foreach ($consolidatedDueReports as $report) {
                $totalPayable += $report['expected'] ?? 0;
                $totalPaid += $report['paid'] ?? 0;
                $totalDue += $report['due'] ?? 0;
            }
        }

        return [
            'reports' => $consolidatedDueReports,
            'expected' => $totalPayable,
            'paid' => $totalPaid,
            'due' => $totalDue,
        ];
    }

    /*
    *   helper method to get consolidated due fee installments data
    */
    private function getConsolidatedDueFeeInstallmentsData(
        $consolidatedDueReports,
        $transportFeeStructureSetting,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId = null
    ) {
        $studentFeeDiscounts = [];

        // arguments for filter data
        $filter_arguments = [
            'studentStatus' => $studentStatus,
            'fromFeeId' => $fromFeeId,
            'toFeeId' => $toFeeId,
            'feeCategoryId' => $feeCategoryId,
        ];

        //get filtered fee installments
        $feeInstallments = $this->classFeeStudentAmountRepository->getConsolidatedDueReports(...$filter_arguments);

        if (count($feeInstallments) > 0) {
            $feeInstallments->load([
                'payment',
                'fee_payments',
                'nullify_fee',
                'classroom',
                'student' => function ($query) {
                    $query->with(['promotedClassroom']);
                },
            ]);

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['classroom'])) {
                        unset($feeInstallment['classroom']);
                    }

                    $feeInstallment['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            // get transport fee
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                    foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                        if (!$hasPayment) {
                            // add transport fee in structure if transport fee setting set to fee
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
                                                        'classroom_id' => $studentFeeInstallments->first()?->student?->classroom_id,
                                                        'fee_id' => $feeInstallmentId,
                                                        'fee_type_id' =>  $transportFee->id,
                                                        'amount' =>  $transportFeeAmount,
                                                        'semester' => null,
                                                        'is_fee_special' => $transportFee->is_fee_special,
                                                        'is_extra_charge' => true,
                                                        'feeType' => $transportFee,
                                                        'payment' => null,
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                        'classroom' => $studentFeeInstallments->first()?->student?->classroom,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // calculate and format fee due report data
            $consolidatedDueReports = $feeInstallments->groupBy('classroom_id')->map(function ($classroomInstallments) {
                $classTotalPayable = 0;
                $classTotalPaid = 0;
                $classTotalDue = 0;

                $classroomInstallments->groupBy('fee_type_id')->each(function ($feeTypeInstallments) use (
                    &$classTotalPayable,
                    &$classTotalPaid,
                    &$classTotalDue
                ) {
                    $feeTypeInstallments->each(function ($installment) use (&$classTotalPayable, &$classTotalPaid, &$classTotalDue) {
                        $semester = $installment['semester'] ?? 1;
                        $payable_amount = ((float) $installment['amount'] ?? 0) * $semester;
                        $due_amount = $payable_amount;
                        $paid_amount = 0;
                        $discount_amount = 0;

                        if ($installment['nullify_fee'] !== null) {
                            $due_amount = 0;
                            $paid_amount = $payable_amount;
                        } elseif ($installment['payment'] !== null) {
                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                            $payable_amount = $payable_amount - $discount_amount;
                        } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                            foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                                if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                    if ($discount->is_discount_percentage) {
                                        $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                    } else {
                                        $discount_amount = (float) $discount->amount;
                                    }

                                    $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                                    $payable_amount =  $payable_amount - $discount_amount;
                                }
                            }
                        }

                        $classTotalPayable += $payable_amount;
                        $classTotalPaid += $paid_amount;
                        $classTotalDue += $due_amount;
                    });
                });

                $classroomTitle = $classroomInstallments[0]['classroom']['title'];

                return [
                    'class_name' => $classroomTitle,
                    'expected' => $classTotalPayable,
                    'paid' => $classTotalPaid,
                    'due' => $classTotalDue,
                ];
            })->filter(function ($report) {
                return $report['due'] > 0;
            })->toArray();
        }

        return $consolidatedDueReports;
    }

    /*
    *   helper method to get consolidated due general vouchers data
    */
    private function getConsolidatedDueGeneralVouchersData(
        $consolidatedDueReports,
        $studentStatus = ""
    ) {
        $generalVouchers = $this->studentFeeVoucherRepository->getActiveAllFeeVouchers($studentStatus);

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }

                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                return $voucher;
            });

            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_payable_amount = (float) $feeTypeAmount->amount ?? 0;
                    $voucher_due_amount = $voucher_payable_amount;
                    $voucher_discount_amount = 0;
                    $voucher_paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                        $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                    }

                    if (empty($consolidatedDueReports[$voucher?->student?->classroom_id])) {
                        $consolidatedDueReports[$voucher?->student?->classroom_id] = [
                            'class_name' => $voucher?->student?->classroom?->title,
                            'expected' => $voucher_payable_amount,
                            'paid' => $voucher_paid_amount,
                            'due' => $voucher_due_amount,
                        ];
                    } else {
                        $consolidatedDueReports[$voucher?->student?->classroom_id]['expected'] += $voucher_payable_amount;
                        $consolidatedDueReports[$voucher?->student?->classroom_id]['paid'] += $voucher_paid_amount;
                        $consolidatedDueReports[$voucher?->student?->classroom_id]['due'] += $voucher_due_amount;
                    }
                }
            }
        }

        return $consolidatedDueReports;
    }

    /*
    *   helper method to get consolidated due transport vouchers data
    */
    private function getConsolidatedDueTransortVouchersData(
        $consolidatedDueReports,
        $transportFeeStructureSetting,
        $studentStatus = ""
    ) {
        // get students
        $students = $this->studentRepository->getActiveNameAndId($studentStatus);

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null && count($students) > 0) {
            $students->loadMissing(['promotedClassroom']);

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

            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $voucher_payable_amount = (float) $allocate->amount;
                        $voucher_due_amount = $voucher_payable_amount;
                        $voucher_discount_amount = 0;
                        $voucher_paid_amount = 0;

                        if ($allocate->payment != null) {
                            $voucher_discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $voucher_paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                            $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                        }

                        if (empty($consolidatedDueReports[$student?->classroom_id])) {
                            $consolidatedDueReports[$student?->classroom_id] = [
                                'class_name' => $student?->classroom?->title,
                                'expected' => $voucher_payable_amount,
                                'paid' => $voucher_paid_amount,
                                'due' => $voucher_due_amount,
                            ];
                        } else {
                            $consolidatedDueReports[$student?->classroom_id]['expected'] += $voucher_payable_amount;
                            $consolidatedDueReports[$student?->classroom_id]['paid'] += $voucher_paid_amount;
                            $consolidatedDueReports[$student?->classroom_id]['due'] += $voucher_due_amount;
                        }
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $voucher_payable_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $voucher_payable_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $voucher_due_amount = $voucher_payable_amount;
                    $voucher_paid_amount = 0;

                    foreach ($allocateTransportVouchers as $voucher) {
                        if (empty($consolidatedDueReports[$student?->classroom_id])) {
                            $consolidatedDueReports[$student?->classroom_id] = [
                                'class_name' => $student?->classroom?->title,
                                'expected' => $voucher_payable_amount,
                                'paid' => $voucher_paid_amount,
                                'due' => $voucher_due_amount,
                            ];
                        } else {
                            $consolidatedDueReports[$student?->classroom_id]['expected'] += $voucher_payable_amount;
                            $consolidatedDueReports[$student?->classroom_id]['paid'] += $voucher_paid_amount;
                            $consolidatedDueReports[$student?->classroom_id]['due'] += $voucher_due_amount;
                        }
                    }
                }
            }
        }

        return $consolidatedDueReports;
    }

    /*
    *   export consolidated due report in excel
    */
    public function exportClassWiseConsolidatedDueReport(Request $request)
    {
        $classWiseConsolidatedDueReport = [];

        $classroomId = $request->classroom_id ?? null;
        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $includeVoucher = $request->voucher ?? false;

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $classWiseConsolidatedDueReport = $this->getClassWiseConsolidatedDueReportData(
                $classroomId,
                $fromFeeId,
                $toFeeId,
                $studentStatus,
                $feeCategoryId,
                $includeVoucher
            );
        }

        $export = new ClassWiseConsolidatedDueReportExport($classWiseConsolidatedDueReport);

        return Excel::download($export, "Fee Class Wise Consolideted Due Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get consolidated due report data
    */
    private function getClassWiseConsolidatedDueReportData(
        $classroomId,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId = null,
        $includeVoucher = false
    ) {
        $classWiseConsolidatedDueReports = [];
        $totalPayable = 0;
        $totalPaid = 0;
        $totalDue = 0;

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        // get fee installments
        $classWiseConsolidatedDueReports = $this->getClassWiseConsolidatedDueFeeInstallmentsData(
            $classWiseConsolidatedDueReports,
            $transportFeeStructureSetting,
            $classroomId,
            $fromFeeId,
            $toFeeId,
            $studentStatus,
            $feeCategoryId
        );

        if ($includeVoucher == true) {
            // get general vouchers
            $classWiseConsolidatedDueReports = $this->getClassWiseConsolidatedDueGeneralVouchersData(
                $classWiseConsolidatedDueReports,
                $classroomId,
                $studentStatus
            );

            // get transport vouchers
            $classWiseConsolidatedDueReports = $this->getClassWiseConsolidatedDueTransortVouchersData(
                $classWiseConsolidatedDueReports,
                $transportFeeStructureSetting,
                $classroomId,
                $studentStatus
            );
        }

        if (!empty($classWiseConsolidatedDueReports)) {
            foreach ($classWiseConsolidatedDueReports as $report) {
                $totalPayable += $report['expected'] ?? 0;
                $totalPaid += $report['paid'] ?? 0;
                $totalDue += $report['due'] ?? 0;
            }
        }

        return [
            'reports' => $classWiseConsolidatedDueReports,
            'expected' => $totalPayable,
            'paid' => $totalPaid,
            'due' => $totalDue,
        ];
    }

    /*
    *   helper method to get class wise consolidated due fee installments data
    */
    private function getClassWiseConsolidatedDueFeeInstallmentsData(
        $classWiseConsolidatedDueReports,
        $transportFeeStructureSetting,
        $classroomId,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId = null
    ) {
        $studentFeeDiscounts = [];

        // arguments for filter data
        $filter_arguments = [
            'classroomId' => $classroomId,
            'studentStatus' => $studentStatus,
            'fromFeeId' => $fromFeeId,
            'toFeeId' => $toFeeId,
            'feeCategoryId' => $feeCategoryId,
        ];

        //get filtered fee installments
        $feeInstallments = $this->classFeeStudentAmountRepository->getConsolidatedDueReportsByClassroom(...$filter_arguments);

        if (count($feeInstallments) > 0) {
            $feeInstallments->load([
                'payment',
                'fee_payments',
                'nullify_fee',
                'feeType',
            ]);

            // get transport fee
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                    foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                        if (!$hasPayment) {
                            // add transport fee in structure if transport fee setting set to fee
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
                                                        'classroom_id' => $studentFeeInstallments->first()?->student?->classroom_id,
                                                        'fee_id' => $feeInstallmentId,
                                                        'fee_type_id' =>  $transportFee->id,
                                                        'amount' =>  $transportFeeAmount,
                                                        'semester' => null,
                                                        'is_fee_special' => $transportFee->is_fee_special,
                                                        'is_extra_charge' => true,
                                                        'feeType' => $transportFee,
                                                        'payment' => null,
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                        'classroom' => $studentFeeInstallments->first()?->student?->classroom,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // calculate and format fee due report data
            $classWiseConsolidatedDueReports = $feeInstallments->groupBy('fee_type_id')->map(function ($feeTypeInstallments) {
                $feeTypeTotalPayable = 0;
                $feeTypeTotalPaid = 0;
                $feeTypeTotalDue = 0;

                $feeTypeInstallments->each(function ($installment) use (&$feeTypeTotalPayable, &$feeTypeTotalPaid, &$feeTypeTotalDue) {
                    $semester = $installment['semester'] ?? 1;
                    $payable_amount = ((float) $installment['amount'] ?? 0) * $semester;
                    $due_amount = $payable_amount;
                    $paid_amount = 0;
                    $discount_amount = 0;

                    if ($installment['nullify_fee'] !== null) {
                        $due_amount = 0;
                        $paid_amount = $payable_amount;
                    } elseif ($installment['payment'] !== null) {
                        $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                        $payable_amount = $payable_amount - $discount_amount;
                    } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                        foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                            if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                                $payable_amount =  $payable_amount - $discount_amount;
                            }
                        }
                    }

                    $feeTypeTotalPayable += $payable_amount;
                    $feeTypeTotalPaid += $paid_amount;
                    $feeTypeTotalDue += $due_amount;
                });

                $feeTypeTitle = $feeTypeInstallments[0]['feeType']['fee_type'];

                return [
                    'title' => $feeTypeTitle,
                    'expected' => $feeTypeTotalPayable,
                    'paid' => $feeTypeTotalPaid,
                    'due' => $feeTypeTotalDue,
                ];
            })->filter(function ($report) {
                return $report['due'] > 0;
            })->toArray();
        }

        return $classWiseConsolidatedDueReports;
    }

    /*
    *   helper method to get class wise consolidated due general vouchers data
    */
    private function getClassWiseConsolidatedDueGeneralVouchersData(
        $classWiseConsolidatedDueReports,
        $classroomId,
        $studentStatus = ""
    ) {
        $generalVouchers = $this->studentFeeVoucherRepository->getActiveAllFeeVouchers($studentStatus, $classroomId);

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_payable_amount = (float) $feeTypeAmount->amount ?? 0;
                    $voucher_due_amount = $voucher_payable_amount;
                    $voucher_discount_amount = 0;
                    $voucher_paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                        $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                    }

                    if (empty($classWiseConsolidatedDueReports[$feeTypeAmount->fee_type_id])) {
                        $classWiseConsolidatedDueReports[$feeTypeAmount->fee_type_id] = [
                            'title' => $feeTypeAmount?->feeType?->fee_type,
                            'expected' => $voucher_payable_amount,
                            'paid' => $voucher_paid_amount,
                            'due' => $voucher_due_amount,
                        ];
                    } else {
                        $classWiseConsolidatedDueReports[$feeTypeAmount->fee_type_id]['expected'] += $voucher_payable_amount;
                        $classWiseConsolidatedDueReports[$feeTypeAmount->fee_type_id]['paid'] += $voucher_paid_amount;
                        $classWiseConsolidatedDueReports[$feeTypeAmount->fee_type_id]['due'] += $voucher_due_amount;
                    }
                }
            }
        }

        return $classWiseConsolidatedDueReports;
    }

    /*
    *   helper method to get class wise consolidated due transport vouchers data
    */
    private function getClassWiseConsolidatedDueTransortVouchersData(
        $classWiseConsolidatedDueReports,
        $transportFeeStructureSetting,
        $classroomId,
        $studentStatus = ""
    ) {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndActiveStatus($classroomId, $studentStatus);

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null && count($students) > 0) {
            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $voucher_payable_amount = (float) $allocate->amount;
                        $voucher_due_amount = $voucher_payable_amount;
                        $voucher_discount_amount = 0;
                        $voucher_paid_amount = 0;

                        if ($allocate->payment != null) {
                            $voucher_discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $voucher_paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                            $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                        }

                        if (empty($classWiseConsolidatedDueReports[$transportFee->id])) {
                            $classWiseConsolidatedDueReports[$transportFee->id] = [
                                'title' => $transportFee->fee_type,
                                'expected' => $voucher_payable_amount,
                                'paid' => $voucher_paid_amount,
                                'due' => $voucher_due_amount,
                            ];
                        } else {
                            $classWiseConsolidatedDueReports[$transportFee->id]['expected'] += $voucher_payable_amount;
                            $classWiseConsolidatedDueReports[$transportFee->id]['paid'] += $voucher_paid_amount;
                            $classWiseConsolidatedDueReports[$transportFee->id]['due'] += $voucher_due_amount;
                        }
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $voucher_payable_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $voucher_payable_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $voucher_due_amount = $voucher_payable_amount;
                    $voucher_paid_amount = 0;

                    foreach ($allocateTransportVouchers as $voucher) {
                        if (empty($classWiseConsolidatedDueReports[$transportFee->id])) {
                            $classWiseConsolidatedDueReports[$transportFee->id] = [
                                'title' => $transportFee->fee_type,
                                'expected' => $voucher_payable_amount,
                                'paid' => $voucher_paid_amount,
                                'due' => $voucher_due_amount,
                            ];
                        } else {
                            $classWiseConsolidatedDueReports[$transportFee->id]['expected'] += $voucher_payable_amount;
                            $classWiseConsolidatedDueReports[$transportFee->id]['paid'] += $voucher_paid_amount;
                            $classWiseConsolidatedDueReports[$transportFee->id]['due'] += $voucher_due_amount;
                        }
                    }
                }
            }
        }

        return $classWiseConsolidatedDueReports;
    }

    /*
    *   export fee student followup report in excel
    */
    public function exportFeeStudentFolowUpReport(Request $request)
    {
        $feeStudentFollowUpReport = [];

        $classroomId = $request->classroom_id ?? "";
        $fromDate = !empty($request->from_date) ? Carbon::parse($request->from_date)->format('Y-m-d') : "";
        $toDate = !empty($request->to_date) ? Carbon::parse($request->to_date)->format('Y-m-d') : "";

        $dateTitle = "From : To : ";
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";

        if (!empty($fromDate) && !empty($toDate)) {
            $feeStudentFollowUpReport = $this->getFeeStudentFolowUpReportData($fromDate, $toDate, $classroomId);

            $from_date = Carbon::parse($request->from_date)->format('d-m-Y');
            $to_date = Carbon::parse($request->to_date)->format('d-m-Y');
            $dateTitle = "From : {$from_date} To : {$to_date}";
        }

        $export = new FeeStudentFollowUpReportExport($feeStudentFollowUpReport, $schoolTitle, $dateTitle);

        return Excel::download($export, "Fee Student Follow Up Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get fee student followup report data
    */
    private function getFeeStudentFolowUpReportData(
        $fromDate,
        $toDate,
        $classroomId = ""
    ) {
        $followUpReports = $this->studentDueFollowUpRepository->filterStudentDueFollowUpReports($fromDate, $toDate, $classroomId)
            ->map(function ($followUp) {
                if ($followUp?->student?->promotedClassroom != null) {
                    if (!empty($followUp['student']['classroom'])) {
                        unset($followUp['student']['classroom']);
                    }

                    $followUp['student']['classroom_id'] = $followUp?->student?->promotedClassroom?->id;
                    $followUp['student']['classroom'] = $followUp?->student?->promotedClassroom;
                }

                $classroomId = $followUp?->student?->classroom_id;

                $followUp?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $studentName = ($followUp?->student?->first_name ?? "") . " " . ($followUp?->student?->middle_name ?? "") . " " . ($followUp?->student?->last_name ?? "");

                $fatherName = ($followUp?->student?->father?->first_name ?? "") . " " . ($followUp?->student?->father?->middle_name ?? "") . " " . ($followUp?->student?->father?->last_name ?? "");

                return [
                    'admission_no' => $followUp?->student?->admission_no,
                    'student_name' => $studentName,
                    'class_name' => $followUp?->student?->classroom?->title,
                    'roll_no' => $followUp?->student?->classroomRoll?->roll_no,
                    'father_name' => $fatherName,
                    'phone' => $followUp?->student?->father?->phone,
                    'note' => $followUp->note,
                    'activity_date' => $followUp->created_at->format('d-m-Y H:i'),
                    'follow_up_date' => Carbon::parse($followUp->commitment_date)->format('d-m-Y'),
                ];
            })->toArray();

        return $followUpReports;
    }

    /*
    *   export student fee payment report in excel
    */
    public function exportStudentPaymentReport(Request $request)
    {
        $studentPaymentReport = [];

        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;

        $studentPaymentReport = $this->getStudentPaymentReportData(
            $classroomId,
            $studentId
        );

        $export = new StudentPaymentReportExport($studentPaymentReport);

        return Excel::download($export, "Student Payment List.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get student payment report data
    */
    private function getStudentPaymentReportData($classroomId = null, $studentId = null)
    {
        $studentFeePaymentReports = [];
        $paymentReports = [];
        $studentIds = [];
        $student = null;

        if (!empty($studentId)) {
            $student = $this->studentRepository->getStudentById($studentId);
        }

        if ($student != null) {
            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                $student['classroom_id'] = $student?->promotedClassroom?->id;
            }

            $classroomId = $student?->classroom_id;
        }

        if (!empty($classroomId)) {
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

            if ($students->count() > 0) {
                $studentIds = $students->pluck('id')->toArray();
            }
        }

        if ($student == null && count($studentIds) > 0) {
            $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($studentIds);
        } else if ($student != null) {
            $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($student->id);
        }

        if (count($paymentReports) > 0) {
            $paymentReports->loadMissing(['student' => function ($query) use ($classroomId) {
                $query->with(['promotedClassroom', 'classroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);
            }]);

            $studentFeePaymentReports = $paymentReports->map(function ($report) {
                $receipt_note = "";
                $total_amount = 0;
                $total_discount = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;
                $feeTypeAmountsArray = [];

                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }

                if (count($report->fee_payments) > 0) {
                    $report->fee_payments->each(function ($feePayment) use (&$receipt_note, &$total_amount, &$total_discount, &$total_payable, &$total_paid, &$total_due, &$feeTypeAmountsArray) {
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
                        } elseif (!strpos($receipt_note, $feePayment?->fee?->title)) {
                            $receipt_note .= ", {$payment_note} {$feePayment?->fee?->title}";
                        }

                        $amount = (float) $feePayment->amount ?? 0;
                        $payable_amount = (float) $feePayment->payable_amount ?? 0;
                        $paid_amount = (float) $feePayment->paid_amount ?? 0;
                        $due_amount = (float) $feePayment->due_amount ?? 0;
                        $discount_amount = (float) $feePayment->discount_amount ?? 0;

                        $total_amount += $amount;
                        $total_payable += $payable_amount;
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;
                        $total_discount += $discount_amount;

                        $feeTypeAmountsArray[] = [
                            'title' => $feePayment?->feeType?->fee_type ?? "",
                            'total_amount' => $amount,
                            'total_discount' => $discount_amount,
                            'total_payable' => $payable_amount,
                            'total_paid' => $paid_amount,
                            'due' => $due_amount,
                        ];
                    });
                }

                $paymentStatus = $report->is_cancelled ? "Cancelled" : 'Cleared';

                return [
                    'admission_no' => $report?->student?->admission_no,
                    'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                    'roll_no' => $report?->student?->classroomRoll?->roll_no,
                    'class' => $report?->student?->classroom?->title,
                    'title' => $receipt_note,
                    'total_amount' => $total_amount,
                    'total_discount' => $total_discount,
                    'total_payable' => $total_payable,
                    'total_paid' => $total_paid,
                    'due' => $total_due,
                    'payment_mode' => $report->payment_mode,
                    'date' => Carbon::parse($report->payment_date)->format('d-M-Y'),
                    'receipt_no' => $report->receipt_no,
                    'status' => $paymentStatus,
                    'fee_type_amounts' => $feeTypeAmountsArray,
                ];
            })->toArray();
        }

        return $studentFeePaymentReports;
    }

    /*
    *   export class wise fee collection summary in excel
    */
    public function exportClassWiseFeeCollectionSummary()
    {
        $classWiseFeeCollectionSummary = $this->getClassWiseFeeCollectionSummaryData();

        $export = new ClassWiseFeeCollectionSummaryExport($classWiseFeeCollectionSummary);

        return Excel::download($export, "class_wise_fee_collection_summary.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get class wise fee collection summary  data
    */
    private function getClassWiseFeeCollectionSummaryData()
    {
        $classWiseFeeCollectionSummary = [];
        $totalAmount = 0;

        $classrooms = $this->classroomRepository->getActiveAll();
        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getClassAndInstallmentWiseFeePaymentSummary();

        if ($feeCollectionSummaryData->count() > 0) {
            $tempClassWiseData = [];

            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($feeCollection) {
                $feeCollection->fee_payments->transform(function ($feePayment) {
                    if ($feePayment?->student?->promotedClassroom != null) {
                        $feePayment['student']['classroom_id'] = $feePayment?->student?->promotedClassroom?->id;
                    }

                    return $feePayment;
                });
                return $feeCollection;
            });

            foreach ($feeCollectionSummaryData as $summaryData) {
                foreach ($summaryData->fee_payments as $feePayment) {
                    if ($feePayment?->payment_status != PaymentStatus::CANCELLED->value) {
                        if (isset($tempClassWiseData[$feePayment->student->classroom_id])) {
                            $tempClassWiseData[$feePayment->student->classroom_id] += (float) $feePayment->paid_amount ?? 0;
                        } else {
                            $tempClassWiseData[$feePayment->student->classroom_id] = (float) $feePayment->paid_amount ?? 0;
                        }
                    }
                }
            }

            foreach ($classrooms as $classroom) {
                $amount = $tempClassWiseData[$classroom->id] ?? 0;

                $classWiseFeeCollectionSummary[$classroom->id] = [
                    'class_name' => $classroom->title,
                    'total_amount' => $amount,
                ];

                $totalAmount += $amount;
            }
        }

        return [
            'reports' => $classWiseFeeCollectionSummary,
            'total_amount' => $totalAmount
        ];
    }

    /*
    *   export installment wise fee collection summary  in excel
    */
    public function exportInstallmentWiseFeeCollectionSummary()
    {
        $installmentWiseFeeCollectionSummary = $this->getInstallmentWiseFeeCollectionSummaryData();

        $export = new InstallmentWiseFeeCollectionSummaryExport($installmentWiseFeeCollectionSummary);

        return Excel::download($export, "installment_wise_fee_collection_summary.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get installment wise fee collection summary  data
    */
    private function getInstallmentWiseFeeCollectionSummaryData()
    {
        $installmentWiseFeeCollectionSummary = [];
        $totalAmount = 0;

        $fees = $this->feeRepository->getActiveIdTitle();
        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getClassAndInstallmentWiseFeePaymentSummary();

        if ($feeCollectionSummaryData->count() > 0) {
            $tempInstallmentWiseData = [];

            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($feeCollection) {
                $feeCollection->fee_payments->transform(function ($feePayment) {
                    if ($feePayment?->student?->promotedClassroom != null) {
                        $feePayment['student']['classroom_id'] = $feePayment?->student?->promotedClassroom?->id;
                    }

                    return $feePayment;
                });
                return $feeCollection;
            });

            foreach ($feeCollectionSummaryData as $summaryData) {
                foreach ($summaryData->fee_payments as $feePayment) {
                    if ($feePayment?->payment_status != PaymentStatus::CANCELLED->value) {
                        if ($feePayment->fee_payment_type == FeePaymentType::FEEINSTALLMENT->value) {
                            if (isset($tempInstallmentWiseData[$feePayment->fee_id])) {
                                $tempInstallmentWiseData[$feePayment->fee_id] += (float) $feePayment->paid_amount ?? 0;
                            } else {
                                $tempInstallmentWiseData[$feePayment->fee_id] = (float) $feePayment->paid_amount ?? 0;
                            }
                        }
                    }
                }
            }

            $fees->filter(function ($fee) use ($tempInstallmentWiseData) {
                return in_array($fee->id, array_keys($tempInstallmentWiseData));
            })->each(function ($fee) use (&$installmentWiseFeeCollectionSummary, &$tempInstallmentWiseData, &$totalAmount) {
                $amount = $tempInstallmentWiseData[$fee->id] ?? 0;

                $installmentWiseFeeCollectionSummary[$fee->id] = [
                    'title' => $fee->title,
                    'amount' => $amount
                ];

                $totalAmount += $amount;
            });
        }

        return [
            'reports' => $installmentWiseFeeCollectionSummary,
            'amount' => $totalAmount
        ];
    }

    /*
    *   export fee cancellation report in excel
    */
    public function exportFeeCancellationReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;
        $admissionNo = $request->admission_no ?? "";

        $feeCancellationReport = $this->getFeeCancellationReportData(
            $classroomId,
            $studentId,
            $admissionNo
        );

        $export = new FeeCancellationReportExport($feeCancellationReport);

        return Excel::download($export, "Student Cancel Payment Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get fee cancellation report data
    */
    private function getFeeCancellationReportData(
        $classroomId = null,
        $studentId = null,
        $admissionNo = ""
    ) {
        $cancellationReports = [];
        $student = null;

        if (!empty($admissionNo) && empty($studentId)) {
            $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
        }

        if (!empty($studentId)) {
            $student = $this->studentRepository->getStudentById($studentId);
        }

        if ($student != null) {
            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                $student['classroom_id'] = $student?->promotedClassroom?->id;
            }

            $classroomId = $student?->classroom_id;
            $studentId = $student?->id;
        }

        if (empty($studentId) && !empty($admissionNo) && $student == null) {
            $cancellationReports = [];
        } else {
            $cancellationReports = $this->feePaymentMethodRepository->getCancellationReports($classroomId, $studentId);
        }

        if (count($cancellationReports) > 0) {
            $cancellationReports = $cancellationReports->map(function ($report) {
                $total_amount = 0;

                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }

                if (count($report->fee_payments) > 0) {
                    foreach ($report->fee_payments as $payment) {
                        $total_amount += (float) $payment->paid_amount ?? 0;
                    }
                }

                $formatted_date = Carbon::parse($report->cancellation_date)->format('d M,Y');

                unset($report['cancellation_date']);

                $report['cancelled_date'] = $formatted_date;
                $report['amount'] = $total_amount;

                $studentName = ($report?->student?->first_name ?? "") . " " . ($report?->student?->middle_name ?? "") . " " . ($report?->student?->last_name ?? "");
                $cancelledBy = ($report?->cancelledBy?->first_name ?? "") . " " . ($report?->cancelledBy?->middle_name ?? "") . " " . ($report?->cancelledBy?->last_name ?? "");

                return [
                    'admission_no' => $report?->student?->admission_no,
                    'student_name' => $studentName,
                    'class' => $report?->student?->classroom?->title,
                    'amount' => $total_amount,
                    'payment_mode' => $report?->payment_mode,
                    'receipt_no' => $report?->receipt_no,
                    'cancelled_date' => $formatted_date,
                    'cancelled_by' => $cancelledBy,
                    'reason' => $report?->cancel_reason,
                ];
            })->toArray();
        }

        return  $cancellationReports;
    }

    /*
    *   export fee summary report in excel
    */
    public function exportFeeSummaryReport(Request $request)
    {
        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $feeCategoryId = $request->fee_category_id ?? null;
        $classroomId = $request->classroom_id ?? null;
        $includeVoucher = $request->voucher ?? false;

        $feeSummaryReport = [];
        $classroomTitle = "All";
        $fromFeeTitle = "";
        $toFeeTitle = "";
        $reportDate = Carbon::now()->format('d-m-Y');

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $feeSummaryReport = $this->getFeeSummaryReportData(
                $fromFeeId,
                $toFeeId,
                $feeCategoryId,
                $classroomId,
                $includeVoucher
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";
        }

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom->title ?? "";
        }

        $export = new FeeSummaryReportExport(
            $feeSummaryReport,
            $schoolTitle,
            $academicYear,
            $classroomTitle,
            $reportDate,
            $fromFeeTitle,
            $toFeeTitle
        );

        return Excel::download($export, "Fee Summary Report For Class ({$classroomTitle}).xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get fee summary report data
    */
    private function getFeeSummaryReportData(
        $fromFeeId,
        $toFeeId,
        $feeCategoryId = null,
        $classroomId = null,
        $includeVoucher = false
    ) {
        $feeSummaryReport = [];
        $feeInstallmentsData = [];
        $generalVouchersData = [];
        $transportVouchersData = [];

        $grandTotalAmount = 0;
        $grandTotalDiscount = 0;
        $grandTotalPayable = 0;
        $grandTotalPaid = 0;
        $grandTotalDue = 0;
        $grandTotalRefund = 0;
        $grandTotalAdjust = 0;
        $grandTotalNullify = 0;
        $grandTotalNetReceipt = 0;

        // get fee types
        $feeTypes = $this->feeTypeRepository->getActiveAll();
        // get transport fee structure setting
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        // get fee installments data
        $feeInstallmentsData = $this->getFeeSummaryInstallmentsData($transportFeeStructureSetting, $fromFeeId, $toFeeId, $feeCategoryId, $classroomId);

        if ($includeVoucher == true) {
            // get genral vouchers data
            $generalVouchersData = $this->getFeeSummaryGeneralVouchersData($feeCategoryId, $classroomId);

            // get transport vouchers data
            $transportVouchersData = $this->getFeeSummaryTransportVouchersData($transportFeeStructureSetting, $feeCategoryId, $classroomId);
        }

        if (count($feeTypes) > 0) {
            $feeTypes->loadMissing(['adjust_fee_payment_amounts', 'payment_refunds.refund_method']);

            foreach ($feeTypes as $feeType) {
                $total_amount = 0;
                $total_discount = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;
                $total_refund = 0;
                $total_nullified = 0;
                $total_adjusted = 0;

                if (count($feeType->adjust_fee_payment_amounts) > 0) {
                    $total_adjusted = $feeType?->adjust_fee_payment_amounts?->sum('adjust_amount') ?? 0;
                }

                if (count($feeType->payment_refunds) > 0) {
                    foreach ($feeType->payment_refunds as $refund) {
                        if ($refund?->refund_method?->refund_status != RefundStatus::CANCELED->value) {
                            $total_refund += $refund->refund_amount ?? 0;
                        }
                    }
                }

                if (!empty($feeInstallmentsData[$feeType->id])) {
                    $total_amount += $feeInstallmentsData[$feeType->id]['total_amount'] ?? 0;
                    $total_discount += $feeInstallmentsData[$feeType->id]['total_discount'] ?? 0;
                    $total_payable += $feeInstallmentsData[$feeType->id]['total_payable'] ?? 0;
                    $total_paid += $feeInstallmentsData[$feeType->id]['total_paid'] ?? 0;
                    $total_due += $feeInstallmentsData[$feeType->id]['total_due'] ?? 0;
                    $total_nullified += $feeInstallmentsData[$feeType->id]['total_nullified'] ?? 0;
                }

                if (!empty($generalVouchersData[$feeType->id])) {
                    $total_amount += $generalVouchersData[$feeType->id]['total_amount'] ?? 0;
                    $total_discount += $generalVouchersData[$feeType->id]['total_discount'] ?? 0;
                    $total_payable += $generalVouchersData[$feeType->id]['total_payable'] ?? 0;
                    $total_paid += $generalVouchersData[$feeType->id]['total_paid'] ?? 0;
                    $total_due += $generalVouchersData[$feeType->id]['total_due'] ?? 0;
                }

                if (!empty($transportVouchersData[$feeType->id])) {
                    $total_amount += $transportVouchersData[$feeType->id]['total_amount'] ?? 0;
                    $total_discount += $transportVouchersData[$feeType->id]['total_discount'] ?? 0;
                    $total_payable += $transportVouchersData[$feeType->id]['total_payable'] ?? 0;
                    $total_paid += $transportVouchersData[$feeType->id]['total_paid'] ?? 0;
                    $total_due += $transportVouchersData[$feeType->id]['total_due'] ?? 0;
                }

                $net_receipt = $total_paid - ($total_refund + $total_adjusted);

                $grandTotalAmount +=  $total_amount;
                $grandTotalDiscount += $total_discount;
                $grandTotalPayable += $total_payable;
                $grandTotalPaid += $total_paid;
                $grandTotalDue += $total_due;
                $grandTotalRefund += $total_refund;
                $grandTotalAdjust += $total_adjusted;
                $grandTotalNullify += $total_nullified;
                $grandTotalNetReceipt += $net_receipt;

                $feeSummaryReport[$feeType->id] = [
                    'title' => $feeType->fee_type,
                    'total_amount' => $total_amount,
                    'total_discount' => $total_discount,
                    'total_payable' => $total_payable,
                    'total_paid' => $total_paid,
                    'total_due' => $total_due,
                    'total_refunded' => $total_refund,
                    'total_nullify' => $total_nullified,
                    'total_adjust' => $total_adjusted,
                    'net_receipt' => $net_receipt,
                ];
            }
        }

        return [
            'reports' => $feeSummaryReport,
            'total_amount' => $grandTotalAmount,
            'total_discount' => $grandTotalDiscount,
            'total_payable' => $grandTotalPayable,
            'total_paid' => $grandTotalPaid,
            'total_due' => $grandTotalDue,
            'total_refunded' => $grandTotalRefund,
            'total_nullify' => $grandTotalNullify,
            'total_adjust' => $grandTotalAdjust,
            'net_receipt' => $grandTotalNetReceipt
        ];
    }

    /**
     * helper method to get fee summary general vouchers data
     */
    private function getFeeSummaryInstallmentsData($transportFeeStructureSetting, int $fromFeeId, int $toFeeId, int $feeCategoryId = null, int $classroomId = null)
    {
        $studentFeeDiscounts = [];
        $feeTypeAmountArray = [];

        $feeInstallments = $this->classFeeStudentAmountRepository->getStudentFeeInstallments($fromFeeId, $toFeeId, $feeCategoryId, $classroomId);

        if (count($feeInstallments) > 0) {
            // get transport fee and late fee if does not have any payment
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $amount = (float) $currentAllocateTransport?->amount ?? 0;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();
                                    $discount_amount = 0;

                                    if ($transportFee != null && (empty($feeCategoryId) || (!empty($feeCategoryId) && $transportFee?->category_id == $feeCategoryId))) {

                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (!empty($studentFeeDiscounts[$studentId])) {
                                                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $amount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    $payable_amount = $amount - $discount_amount;

                                                    $feeTypeAmountArray[$transportFee?->id]['total_amount'] = ($feeTypeAmountArray[$transportFee?->id]['total_amount'] ?? 0) + $amount;
                                                    $feeTypeAmountArray[$transportFee?->id]['total_discount'] = ($feeTypeAmountArray[$transportFee?->id]['total_discount'] ?? 0) + $discount_amount;
                                                    $feeTypeAmountArray[$transportFee?->id]['total_payable'] = ($feeTypeAmountArray[$transportFee?->id]['total_payable'] ?? 0) + $payable_amount;
                                                    $feeTypeAmountArray[$transportFee?->id]['total_due'] = ($feeTypeAmountArray[$transportFee?->id]['total_due'] ?? 0) + $payable_amount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        $lateFee = $this->feeTypeRepository->getLateFeeType();

                        if ($lateFee != null && (empty($feeCategoryId) || (!empty($feeCategoryId) && $lateFee?->category_id == $feeCategoryId))) {
                            $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();
                            $discount_amount = 0;

                            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                $amount = 0;

                                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                $lateFineStartDate = $fee->last_pay_date_at;
                                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                    $currentDate = date("Y-m-d");
                                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                    if ($lateFineType == LateFineType::DAILY->value) {
                                        $amount = (float) $lateFineAmount * $daysDifference;
                                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                        $weeksDifference = floor($daysDifference / 7);
                                        $amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                        // Extract year and month from the start date
                                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                        // Extract year and month from the current date
                                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                        // Calculate the difference in months
                                        $startMonths = ($startYear * 12) + $startMonth;
                                        $currentMonths = ($currentYear * 12) + $currentMonth;
                                        $monthsDifference = $currentMonths - $startMonths;

                                        $amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                    }
                                }

                                if (count($studentFeeDiscounts[$studentId]) > 0) {
                                    foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * $amount;
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }
                                        }
                                    }
                                }

                                $payable_amount = $amount - $discount_amount;

                                $feeTypeAmountArray[$lateFee?->id]['total_amount'] = ($feeTypeAmountArray[$lateFee?->id]['total_amount'] ?? 0) + $amount;
                                $feeTypeAmountArray[$lateFee?->id]['total_discount'] = ($feeTypeAmountArray[$lateFee?->id]['total_discount'] ?? 0) + $discount_amount;
                                $feeTypeAmountArray[$lateFee?->id]['total_payable'] = ($feeTypeAmountArray[$lateFee?->id]['total_payable'] ?? 0) + $payable_amount;
                                $feeTypeAmountArray[$lateFee?->id]['total_due'] = ($feeTypeAmountArray[$lateFee?->id]['total_due'] ?? 0) + $payable_amount;
                            }
                        }
                    }
                }
            }

            foreach ($feeInstallments as $installment) {
                $semester = $installment['semester'] ?? 1;
                $amount = ((float) $installment['amount'] ?? 0) * $semester;
                $payable_amount = $amount;
                $due_amount = $payable_amount;
                $paid_amount = 0;
                $discount_amount = 0;
                $nullified_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $nullified_amount = (float) $installment['nullify_fee']['nullified_amount'] ?? 0;
                    $paid_amount = $payable_amount;
                } elseif (!empty($installment['payment'])) {
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $due_amount =  $amount - $discount_amount - $paid_amount;
                    $payable_amount = $amount - $discount_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount =  $amount - $discount_amount - $paid_amount;
                            $payable_amount =  $amount - $discount_amount;
                        }
                    }
                }

                $feeTypeAmountArray[$installment?->fee_type_id]['total_amount'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_amount'] ?? 0) + $amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_discount'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_discount'] ?? 0) + $discount_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_payable'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_payable'] ?? 0) + $payable_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_paid'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_paid'] ?? 0) + $paid_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_due'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_due'] ?? 0) + $due_amount;
                $feeTypeAmountArray[$installment?->fee_type_id]['total_nullified'] = ($feeTypeAmountArray[$installment?->fee_type_id]['total_nullified'] ?? 0) + $nullified_amount;
            }
        }

        return $feeTypeAmountArray;
    }

    /**
     * helper method to get fee summary general vouchers data
     */
    private function getFeeSummaryGeneralVouchersData(int $feeCategoryId = null, int $classroomId = null)
    {
        $vouchersData = [];

        // get all active general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getFeeVouchersByClassroomIdAndFeeCategoryId($feeCategoryId, $classroomId);

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $amount = (float) $feeTypeAmount->amount ?? 0;
                    $payable_amount = $amount;
                    $due_amount = $payable_amount;
                    $discount_amount = 0;
                    $paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $due_amount = $amount - $discount_amount - $paid_amount;
                        $payable_amount = $amount - $discount_amount;
                    }

                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_amount'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_amount'] ?? 0) + $amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_discount'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_discount'] ?? 0) + $discount_amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_payable'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_payable'] ?? 0) + $payable_amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_paid'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_paid'] ?? 0) + $paid_amount;
                    $vouchersData[$feeTypeAmount?->fee_type_id]['total_due'] = ($vouchersData[$feeTypeAmount?->fee_type_id]['total_due'] ?? 0) + $due_amount;
                }
            }
        }

        return $vouchersData;
    }

    /**
     * helper method to get fee summary transport vouchers data
     */
    private function getFeeSummaryTransportVouchersData($transportFeeStructureSetting, int $feeCategoryId = null, int $classroomId = null)
    {
        $vouchersData = [];

        // get all active students
        if (!empty($classroomId)) {
            $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
        } else {
            $students = $this->studentRepository->getActiveNameAndId();
        }

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null  && (empty($feeCategoryId) || (!empty($feeCategoryId) && $transportFee?->category_id == $feeCategoryId)) && count($students) > 0) {
            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $amount = (float) $allocate->amount ?? 0;
                        $payable_amount = $amount;
                        $due_amount = $payable_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $due_amount = $amount - $discount_amount - $paid_amount;
                            $payable_amount = $amount - $discount_amount;
                        }

                        $vouchersData[$transportFee?->id]['total_amount'] = ($vouchersData[$transportFee?->id]['total_amount'] ?? 0) + $amount;
                        $vouchersData[$transportFee?->id]['total_discount'] = ($vouchersData[$transportFee?->id]['total_discount'] ?? 0) + $discount_amount;
                        $vouchersData[$transportFee?->id]['total_payable'] = ($vouchersData[$transportFee?->id]['total_payable'] ?? 0) + $payable_amount;
                        $vouchersData[$transportFee?->id]['total_paid'] = ($vouchersData[$transportFee?->id]['total_paid'] ?? 0) + $paid_amount;
                        $vouchersData[$transportFee?->id]['total_due'] = ($vouchersData[$transportFee?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $amount = (float) $currentAllocateTransport->amount ?? 0;
                    } else {
                        $amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $payable_amount = $amount;
                    $due_amount = $payable_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $vouchersData[$transportFee?->id]['total_amount'] = ($vouchersData[$transportFee?->id]['total_amount'] ?? 0) + $amount;
                        $vouchersData[$transportFee?->id]['total_payable'] = ($vouchersData[$transportFee?->id]['total_payable'] ?? 0) + $payable_amount;
                        $vouchersData[$transportFee?->id]['total_due'] = ($vouchersData[$transportFee?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }
            }
        }

        return $vouchersData;
    }

    /*
    *   export fee special fee type report in excel
    */
    public function exportSpecialFeeTypeReport(Request $request)
    {
        $feeId = $request->fee_id ?? null;
        $feeTypeId = $request->fee_type_id ?? null;
        $classroomId = $request->classroom_id ?? null;

        $specialFeeTypeReport = [];

        $specialFeeTypeReport = $this->getSpecialFeeTypeReportData(
            $feeId,
            $feeTypeId,
            $classroomId
        );

        $export = new SpecialFeeTypeReportExport($specialFeeTypeReport);

        return Excel::download($export, "Special Fee Type Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get special fee type report data
    */
    private function getSpecialFeeTypeReportData(
        $feeId = null,
        $feeTypeId = null,
        $classroomId = null
    ) {
        $specialFeeTypeReport = [];

        $specialFeeTypeReportData = $this->classFeeStudentAmountRepository->getSpecialFeeTypeFeeInstallment($feeId, $feeTypeId, $classroomId);

        if (count($specialFeeTypeReportData) > 0) {
            $specialFeeTypeReportData = $specialFeeTypeReportData->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }

                $classroomId = $report?->student?->classroom_id;

                $report?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $report;
            });

            foreach ($specialFeeTypeReportData->groupBy('fee_type_id') as $feeTypeReports) {
                foreach ($feeTypeReports->groupBy('student_id') as  $studentReports) {
                    $feeInstallment = $studentReports->sortByDesc('id')->first();

                    $amount = ($feeInstallment?->amount ?? 0) * ($feeInstallment?->semester ?? 1);
                    $student_name = "";

                    if ($feeInstallment?->student != null) {
                        $student_name = "{$feeInstallment?->student?->first_name} {$feeInstallment?->student?->middle_name} {$feeInstallment?->student?->last_name}";
                    }

                    $tempArray = [
                        'fee_type' => $feeInstallment?->feeType?->fee_type ?? "",
                        'name' => $student_name,
                        'admission_no' => $feeInstallment?->student?->admission_no ?? "",
                        'roll_no' => $feeInstallment?->student?->classroomRoll?->roll_no ?? "",
                        'class' => $feeInstallment?->student?->classroom?->title ?? "",
                        'amount' => $amount,
                    ];

                    $specialFeeTypeReport[] = $tempArray;
                }
            }
        }

        return [
            'reports' => $specialFeeTypeReport
        ];
    }

    /*
    *   export guardian wise due report in excel
    */
    public function exportGuardianWiseDueReport(Request $request)
    {
        $guardianWiseDueReport = [];

        $paymentStatus = $request->payment_status ?? "";
        $includeVoucher = $request->voucher ?? false;
        $studentStatus = $request->student_status ?? "";
        $transportRouteId = $request->transport_route ?? null;
        $classroomId = $request->classroom_id ?? null;
        $guardianType = $request->guardian_type ?? "";
        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;

        $reportTitle = "Guardian wise due ";

        if (!empty($fromFeeId) && !empty($toFeeId) && !empty($guardianType)) {
            $guardianWiseDueReport = $this->getGuardianWiseDueReportData(
                $guardianType,
                $fromFeeId,
                $toFeeId,
                $paymentStatus,
                $includeVoucher,
                $studentStatus,
                $transportRouteId,
                $classroomId
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

            $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new GuardianWiseDueReportExport($guardianWiseDueReport, $schoolTitle, $academicYear, $reportTitle, $guardianType);

        return Excel::download($export, "Guardian Wise Due Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get guardian wise due report data
    */
    private function getGuardianWiseDueReportData(
        $guardianType,
        $fromFeeId,
        $toFeeId,
        $paymentStatus = "",
        $includeVoucher = false,
        $studentStatus = "",
        $transportRouteId = null,
        $classroomId = null
    ) {
        $guardianWiseReport = [];

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $feeInstallmentsData = $this->getGuardianWiseFeeInstallmentsData(
            $transportFeeStructureSetting,
            $guardianType,
            $fromFeeId,
            $toFeeId,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId,
        );

        $guardianWiseReport = $feeInstallmentsData;

        $generalVouchersData = [];
        $transportVouchersData = [];

        // get voucher reports
        if ($includeVoucher == true) {
            // get genral vouchers data
            $generalVouchersData = $this->getGuardianWiseGeneralVouchersData(
                $transportFeeStructureSetting,
                $guardianType,
                $paymentStatus,
                $studentStatus,
                $transportRouteId,
                $classroomId
            );

            // get transport vouchers data
            $transportVouchersData = $this->getGuardianWiseTransportVouchersData(
                $transportFeeStructureSetting,
                $guardianType,
                $paymentStatus,
                $studentStatus,
                $transportRouteId,
                $classroomId
            );
        }

        if (!empty($generalVouchersData)) {
            $this->updateGuardianWiseReport($guardianWiseReport, $generalVouchersData);
        }

        if (!empty($transportVouchersData)) {
            $this->updateGuardianWiseReport($guardianWiseReport, $transportVouchersData);
        }

        return [
            'reports' => $guardianWiseReport
        ];
    }

    /**
     * helper method to update guardian wise report
     */
    private function updateGuardianWiseReport(array &$guardianWiseReport, array $vouchersData)
    {
        foreach ($vouchersData as $guardianId => $guardianData) {
            if (!isset($guardianWiseReport[$guardianId])) {
                $guardianWiseReport[$guardianId] = $guardianData;
            } else {
                foreach ($guardianData['student_data'] as $studentId => $studentData) {
                    if (!isset($guardianWiseReport[$guardianId]['student_data'][$studentId])) {
                        $guardianWiseReport[$guardianId]['student_data'][$studentId] = $studentData;
                    } else {
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['name'] = $studentData['name'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['admission_no'] = $studentData['admission_no'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['roll_no'] = $studentData['roll_no'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['classroom_title'] = $studentData['classroom_title'];

                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_amount'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_amount'] ?? 0) + $studentData['total_amount'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_discount'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_discount'] ?? 0) + $studentData['total_discount'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_payable'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_payable'] ?? 0) + $studentData['total_payable'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_paid'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_paid'] ?? 0) + $studentData['total_paid'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_due'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_due'] ?? 0) + $studentData['total_due'] ?? 0;
                    }
                }

                $guardianWiseReport[$guardianId]['total_amount'] = ($guardianWiseReport[$guardianId]['total_amount'] ?? 0) + $studentData['total_amount'] ?? 0;
                $guardianWiseReport[$guardianId]['total_discount'] = ($guardianWiseReport[$guardianId]['total_discount'] ?? 0) + $studentData['total_discount'] ?? 0;
                $guardianWiseReport[$guardianId]['total_payable'] = ($guardianWiseReport[$guardianId]['total_payable'] ?? 0) + $studentData['total_payable'] ?? 0;
                $guardianWiseReport[$guardianId]['total_paid'] = ($guardianWiseReport[$guardianId]['total_paid'] ?? 0) + $studentData['total_paid'] ?? 0;
                $guardianWiseReport[$guardianId]['total_due'] = ($guardianWiseReport[$guardianId]['total_due'] ?? 0) + $studentData['total_due'] ?? 0;
            }
        }
    }

    /**
     * helper method to get guardian wise fee installments data
     */
    private function getGuardianWiseFeeInstallmentsData(
        $transportFeeStructureSetting,
        string $guardianType,
        int $fromFeeId,
        int $toFeeId,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $feeInstallmentsData = [];
        $studentAmountArray = [];
        $studentFeeDiscounts = [];

        $feeInstallments = $this->classFeeStudentAmountRepository->getGuardianWiseStudentFeeInstallments(
            $transportFeeStructureSetting,
            $fromFeeId,
            $toFeeId,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        if (count($feeInstallments) > 0) {
            if ($guardianType == 'guardian') {
                $feeInstallments->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $feeInstallments->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['student']['classroom'])) {
                        unset($feeInstallment['student']['classroom']);
                    }

                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                $classroomId = $feeInstallment?->student?->classroom_id;

                $feeInstallment?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $feeInstallment;
            });

            // get transport fee and late fee if does not have any payment
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $amount = (float) $currentAllocateTransport?->amount ?? 0;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();
                                    $discount_amount = 0;

                                    if ($transportFee != null) {
                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (!empty($studentFeeDiscounts[$studentId])) {
                                                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $amount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    $payable_amount = $amount - $discount_amount;

                                                    $studentAmountArray[$studentId]['total_amount'] = ($studentAmountArray[$studentId]['total_amount'] ?? 0) + $amount;
                                                    $studentAmountArray[$studentId]['total_discount'] = ($studentAmountArray[$studentId]['total_discount'] ?? 0) + $discount_amount;
                                                    $studentAmountArray[$studentId]['total_payable'] = ($studentAmountArray[$studentId]['total_payable'] ?? 0) + $payable_amount;
                                                    $studentAmountArray[$studentId]['total_due'] = ($studentAmountArray[$studentId]['total_due'] ?? 0) + $payable_amount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        $lateFee = $this->feeTypeRepository->getLateFeeType();

                        if ($lateFee != null) {
                            $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();
                            $discount_amount = 0;

                            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                $amount = 0;

                                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                $lateFineStartDate = $fee->last_pay_date_at;
                                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                    $currentDate = date("Y-m-d");
                                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                    if ($lateFineType == LateFineType::DAILY->value) {
                                        $amount = (float) $lateFineAmount * $daysDifference;
                                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                        $weeksDifference = floor($daysDifference / 7);
                                        $amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                        // Extract year and month from the start date
                                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                        // Extract year and month from the current date
                                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                        // Calculate the difference in months
                                        $startMonths = ($startYear * 12) + $startMonth;
                                        $currentMonths = ($currentYear * 12) + $currentMonth;
                                        $monthsDifference = $currentMonths - $startMonths;

                                        $amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                    }
                                }

                                if (count($studentFeeDiscounts[$studentId]) > 0) {
                                    foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * $amount;
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }
                                        }
                                    }
                                }

                                $payable_amount = $amount - $discount_amount;

                                $studentAmountArray[$studentId]['total_amount'] = ($studentAmountArray[$studentId]['total_amount'] ?? 0) + $amount;
                                $studentAmountArray[$studentId]['total_discount'] = ($studentAmountArray[$studentId]['total_discount'] ?? 0) + $discount_amount;
                                $studentAmountArray[$studentId]['total_payable'] = ($studentAmountArray[$studentId]['total_payable'] ?? 0) + $payable_amount;
                                $studentAmountArray[$studentId]['total_due'] = ($studentAmountArray[$studentId]['total_due'] ?? 0) + $payable_amount;
                            }
                        }
                    }
                }
            }

            foreach ($feeInstallments as $installment) {
                $semester = $installment['semester'] ?? 1;
                $amount = ((float) $installment['amount'] ?? 0) * $semester;
                $payable_amount = $amount;
                $due_amount = $payable_amount;
                $paid_amount = 0;
                $discount_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $paid_amount = $payable_amount;
                } elseif (!empty($installment['payment'])) {
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $due_amount =  $amount - $discount_amount - $paid_amount;
                    $payable_amount = $amount - $discount_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount =  $amount - $discount_amount - $paid_amount;
                            $payable_amount =  $amount - $discount_amount;
                        }
                    }
                }

                $studentAmountArray[$installment?->student_id]['total_amount'] = ($studentAmountArray[$installment?->student_id]['total_amount'] ?? 0) + $amount;
                $studentAmountArray[$installment?->student_id]['total_discount'] = ($studentAmountArray[$installment?->student_id]['total_discount'] ?? 0) + $discount_amount;
                $studentAmountArray[$installment?->student_id]['total_payable'] = ($studentAmountArray[$installment?->student_id]['total_payable'] ?? 0) + $payable_amount;
                $studentAmountArray[$installment?->student_id]['total_paid'] = ($studentAmountArray[$installment?->student_id]['total_paid'] ?? 0) + $paid_amount;
                $studentAmountArray[$installment?->student_id]['total_due'] = ($studentAmountArray[$installment?->student_id]['total_due'] ?? 0) + $due_amount;

                $student_name = "";
                $father_name = "";
                $father_phone = "";
                $guardian_name = "";
                $guardian_phone = "";

                if ($installment?->student != null) {
                    $student_name = "{$installment?->student?->first_name} {$installment?->student?->middle_name} {$installment?->student?->last_name}";
                }

                if ($installment?->father != null) {
                    $father_name = "{$installment?->father?->first_name} {$installment?->father?->middle_name} {$installment?->father?->last_name}";
                    $father_phone = $installment?->father?->phone ?? "";
                }

                if ($guardianType == 'guardian') {
                    $guardianId = $installment?->guardian?->user_id;

                    if ($installment?->guardian != null) {
                        $guardian_name = "{$installment?->guardian?->first_name} {$installment?->guardian?->middle_name} {$installment?->guardian?->last_name}";
                        $guardian_phone = $installment?->guardian?->phone ?? "";
                    }
                } else {
                    $guardianId = $installment?->father?->user_id;
                    $guardian_name = $father_name;
                    $guardian_phone = $father_phone;
                }

                $guardianData = [
                    'guardian_id' => $guardianId,
                    'guardian_name' => $guardian_name,
                    'guardian_phone' => $guardian_phone,
                ];

                $studentData = [
                    'id' => $installment?->student?->id ?? "",
                    'name' => $student_name,
                    'admission_no' => $installment?->student?->admission_no ?? "",
                    'roll_no' => $installment?->student?->classroomRoll?->roll_no ?? "",
                    'classroom_title' => $installment?->student?->classroom?->title ?? "",
                    'address' => $installment?->student?->present_address ?? "",
                    'father_name' => $father_name,
                    'father_phone' => $father_phone,
                ];

                if (!isset($feeInstallmentsData[$guardianId])) {
                    $feeInstallmentsData[$guardianId] = $guardianData;
                }

                if (!isset($feeInstallmentsData[$guardianId]['student_data'][$installment?->student_id])) {
                    $feeInstallmentsData[$guardianId]['student_data'][$installment?->student_id] = $studentData;
                }
            }

            if (!empty($feeInstallmentsData)) {
                foreach ($feeInstallmentsData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $feeInstallmentsData[$guardianId]['total_amount'] = ($feeInstallmentsData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_discount'] = ($feeInstallmentsData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_payable'] = ($feeInstallmentsData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_paid'] = ($feeInstallmentsData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_due'] = ($feeInstallmentsData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $feeInstallmentsData[$guardianId]['total_amount'] = 0;
                            $feeInstallmentsData[$guardianId]['total_discount'] = 0;
                            $feeInstallmentsData[$guardianId]['total_payable'] = 0;
                            $feeInstallmentsData[$guardianId]['total_paid'] = 0;
                            $feeInstallmentsData[$guardianId]['total_due'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $feeInstallmentsData;
    }

    /**
     * helper method to get guardian wise general vouchers data
     */
    private function getGuardianWiseGeneralVouchersData(
        $transportFeeStructureSetting,
        string $guardianType,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $vouchersData = [];
        $studentAmountArray = [];

        // get all active general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getGuardianWiseFeeVouchers(
            $transportFeeStructureSetting,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            if ($guardianType == 'guardian') {
                $generalVouchers->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $generalVouchers->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }

                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->student?->classroom_id;

                $voucher?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $voucher;
            });

            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $amount = (float) $feeTypeAmount->amount ?? 0;
                    $payable_amount = $amount;
                    $due_amount = $payable_amount;
                    $discount_amount = 0;
                    $paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $due_amount = $amount - $discount_amount - $paid_amount;
                        $payable_amount = $amount - $discount_amount;
                    }

                    $studentAmountArray[$voucher?->student_id]['total_amount'] = ($studentAmountArray[$voucher?->student_id]['total_amount'] ?? 0) + $amount;
                    $studentAmountArray[$voucher?->student_id]['total_discount'] = ($studentAmountArray[$voucher?->student_id]['total_discount'] ?? 0) + $discount_amount;
                    $studentAmountArray[$voucher?->student_id]['total_payable'] = ($studentAmountArray[$voucher?->student_id]['total_payable'] ?? 0) + $payable_amount;
                    $studentAmountArray[$voucher?->student_id]['total_paid'] = ($studentAmountArray[$voucher?->student_id]['total_paid'] ?? 0) + $paid_amount;
                    $studentAmountArray[$voucher?->student_id]['total_due'] = ($studentAmountArray[$voucher?->student_id]['total_due'] ?? 0) + $due_amount;

                    $student_name = "";
                    $father_name = "";
                    $father_phone = "";
                    $guardian_name = "";
                    $guardian_phone = "";

                    if ($voucher?->student != null) {
                        $student_name = "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}";
                    }

                    if ($voucher?->father != null) {
                        $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher?->father?->last_name}";
                        $father_phone = $voucher?->father?->phone ?? "";
                    }

                    if ($guardianType == 'guardian') {
                        $guardianId = $voucher?->guardian?->user_id;

                        if ($voucher?->guardian != null) {
                            $guardian_name = "{$voucher?->guardian?->first_name} {$voucher?->guardian?->middle_name} {$voucher?->guardian?->last_name}";
                            $guardian_phone = $voucher?->guardian?->phone ?? "";
                        }
                    } else {
                        $guardianId = $voucher?->father?->user_id;
                        $guardian_name = $father_name;
                        $guardian_phone = $father_phone;
                    }

                    $guardianData = [
                        'guardian_id' => $guardianId,
                        'guardian_name' => $guardian_name,
                        'guardian_phone' => $guardian_phone,
                    ];

                    $studentData = [
                        'id' => $voucher?->student?->id ?? "",
                        'name' => $student_name,
                        'admission_no' => $voucher?->student?->admission_no ?? "",
                        'roll_no' => $voucher?->student?->classroomRoll?->roll_no ?? "",
                        'classroom_title' => $voucher?->student?->classroom?->title ?? "",
                        'address' => $voucher?->student?->present_address ?? "",
                        'father_name' => $father_name,
                        'father_phone' => $father_phone,
                    ];

                    if (!isset($vouchersData[$guardianId])) {
                        $vouchersData[$guardianId] = $guardianData;
                    }

                    if (!isset($vouchersData[$guardianId]['student_data'][$voucher?->student_id])) {
                        $vouchersData[$guardianId]['student_data'][$voucher?->student_id] = $studentData;
                    }
                }
            }

            if (!empty($vouchersData)) {
                foreach ($vouchersData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $vouchersData[$guardianId]['total_amount'] = ($vouchersData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['total_discount'] = ($vouchersData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['total_payable'] = ($vouchersData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['total_paid'] = ($vouchersData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['total_due'] = ($vouchersData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $vouchersData[$guardianId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['total_due'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $vouchersData;
    }

    /**
     * helper method to get guardian wise transport vouchers data
     */
    private function getGuardianWiseTransportVouchersData(
        $transportFeeStructureSetting,
        string $guardianType,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $vouchersData = [];
        $studentAmountArray = [];

        // get all active students
        $students = $this->studentRepository->getGuardianWiseReportStudents(
            $transportFeeStructureSetting,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null && count($students) > 0) {
            if ($guardianType == 'guardian') {
                $students->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $students->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student?->classroom_id;

                $student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $student;
            });

            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if (
                    $transportFeeStructureSetting != null &&
                    $transportFeeStructureSetting?->value == 'voucher' &&
                    (empty($paymentStatus) || (!empty($paymentStatus) && $paymentStatus == PaymentStatus::DUE->value))
                ) {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getGuardianWiseStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        if (
                            !empty($paymentStatus) &&
                            (
                                ($paymentStatus == PaymentStatus::DUE->value && $allocate->payment != null) ||
                                ($paymentStatus == PaymentStatus::PAID->value && $allocate->payment == null)
                            )
                        ) {
                            continue;
                        }

                        $amount = (float) $allocate->amount ?? 0;
                        $payable_amount = $amount;
                        $due_amount = $payable_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $due_amount = $amount - $discount_amount - $paid_amount;
                            $payable_amount = $amount - $discount_amount;
                        }

                        $studentAmountArray[$student?->id]['total_amount'] = ($studentAmountArray[$student?->id]['total_amount'] ?? 0) + $amount;
                        $studentAmountArray[$student?->id]['total_discount'] = ($studentAmountArray[$student?->id]['total_discount'] ?? 0) + $discount_amount;
                        $studentAmountArray[$student?->id]['total_payable'] = ($studentAmountArray[$student?->id]['total_payable'] ?? 0) + $payable_amount;
                        $studentAmountArray[$student?->id]['total_paid'] = ($studentAmountArray[$student?->id]['total_paid'] ?? 0) + $paid_amount;
                        $studentAmountArray[$student?->id]['total_due'] = ($studentAmountArray[$student?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $amount = (float) $currentAllocateTransport->amount ?? 0;
                    } else {
                        $amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $payable_amount = $amount;
                    $due_amount = $payable_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $studentAmountArray[$student?->id]['total_amount'] = ($studentAmountArray[$student?->id]['total_amount'] ?? 0) + $amount;
                        $studentAmountArray[$student?->id]['total_discount'] = ($studentAmountArray[$student?->id]['total_discount'] ?? 0) + 0;
                        $studentAmountArray[$student?->id]['total_payable'] = ($studentAmountArray[$student?->id]['total_payable'] ?? 0) + $payable_amount;
                        $studentAmountArray[$student?->id]['total_paid'] = ($studentAmountArray[$student?->id]['total_paid'] ?? 0) + 0;
                        $studentAmountArray[$student?->id]['total_due'] = ($studentAmountArray[$student?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (!empty($studentAmountArray)) {
                    $father_name = "";
                    $father_phone = "";
                    $guardian_name = "";
                    $guardian_phone = "";

                    $student_name = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                    if ($student?->father != null) {
                        $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                        $father_phone = $student?->father?->phone ?? "";
                    }

                    if ($guardianType == 'guardian') {
                        $guardianId = $student?->guardian?->user_id;

                        if ($student?->guardian != null) {
                            $guardian_name = "{$student?->guardian?->first_name} {$student?->guardian?->middle_name} {$student?->guardian?->last_name}";
                            $guardian_phone = $student?->guardian?->phone ?? "";
                        }
                    } else {
                        $guardianId = $student?->father?->user_id;
                        $guardian_name = $father_name;
                        $guardian_phone = $father_phone;
                    }

                    $guardianData = [
                        'guardian_id' => $guardianId,
                        'guardian_name' => $guardian_name,
                        'guardian_phone' => $guardian_phone,
                    ];

                    $studentData = [
                        'id' => $student?->id ?? "",
                        'name' => $student_name,
                        'admission_no' => $student?->admission_no ?? "",
                        'roll_no' => $student?->classroomRoll?->roll_no ?? "",
                        'classroom_title' => $student?->classroom?->title ?? "",
                        'address' => $student?->present_address ?? "",
                        'father_name' => $father_name,
                        'father_phone' => $father_phone,
                    ];

                    if (!isset($vouchersData[$guardianId])) {
                        $vouchersData[$guardianId] = $guardianData;
                    }

                    if (!isset($vouchersData[$guardianId]['student_data'][$student->id])) {
                        $vouchersData[$guardianId]['student_data'][$student->id] = $studentData;
                    }
                }
            }

            if (!empty($vouchersData)) {
                foreach ($vouchersData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $vouchersData[$guardianId]['total_amount'] = ($vouchersData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['total_discount'] = ($vouchersData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['total_payable'] = ($vouchersData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['total_paid'] = ($vouchersData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['total_due'] = ($vouchersData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $vouchersData[$guardianId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['total_due'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $vouchersData;
    }

    /*
    *   export class wise student summary report in excel
    */
    public function exportClassWiseStudentSummaryReport(Request $request)
    {
        $studentActiveStatus = $request->type ?? "";

        $classWiseStudentSummaryReport = $this->getClassWiseStudentSummaryReportData($studentActiveStatus);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassWiseStudentSummaryReportExport($classWiseStudentSummaryReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Class Consolidated Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get class wise student summary report data
    */
    private function getClassWiseStudentSummaryReportData(
        $studentActiveStatus = ""
    ) {
        $classWiseReport = [];
        $totalStudentCount = 0;
        $students = [];

        $classNames = $this->classroomRepository->getActiveClassNameAll();

        if ($classNames->count() > 0) {
            $classNameIds = $classNames->pluck('id')->toArray();

            $students = $this->studentRepository->getSummaryStudentsByClassNameIdsAndStatus($classNameIds, $studentActiveStatus);

            if ($students->count() > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                    }

                    return $student;
                });
            }
        }

        $classWiseReport = $classNames->map(function ($className) use ($students, &$totalStudentCount) {
            if (count($students) > 0) {
                $students = $students->groupBy('class_name_id');
            }

            $studentCount = count(($students[$className->id] ?? []));
            $totalStudentCount += $studentCount;

            return [
                'class' => $className?->title,
                'student_count' => $studentCount,
            ];
        });

        return [
            'reports' => $classWiseReport,
            'total_student_count' => $totalStudentCount
        ];
    }

    /*
    *   export classroom wise student summary report in excel
    */
    public function exportClassroomWiseStudentSummaryReport(Request $request)
    {
        $studentActiveStatus = $request->type ?? "";

        $classroomWiseStudentSummaryReport = $this->getClassroomWiseStudentSummaryReportData($studentActiveStatus);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassroomWiseStudentSummaryReportExport($classroomWiseStudentSummaryReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Section Wise Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get classroom wise student summary report data
    */
    private function getClassroomWiseStudentSummaryReportData($studentActiveStatus = "")
    {
        $classroomWiseReport = [];
        $totalStudentCount = 0;
        $students = [];

        $classrooms = $this->classroomRepository->getActiveAll();

        if ($classrooms->count() > 0) {
            $classroomIds = $classrooms->pluck('id')->toArray();

            $students = $this->studentRepository->getSummaryStudentsByClassroomIdsAndStatus($classroomIds, $studentActiveStatus);

            if ($students->count() > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    return $student;
                });
            }
        }

        $classroomWiseReport =  $classrooms->map(function ($classroom) use ($students, &$totalStudentCount) {
            if (count($students) > 0) {
                $students = $students->groupBy('classroom_id');
            }

            $studentCount = count(($students[$classroom->id] ?? []));

            $totalStudentCount += $studentCount;

            return [
                'class' => $classroom?->title,
                'student_count' => $studentCount,
            ];
        });

        return [
            'reports' => $classroomWiseReport,
            'total_student_count' => $totalStudentCount
        ];
    }

    /*
    *   export class wise student list report in excel
    */
    public function exportClassWiseStudentListReport(Request $request)
    {
        $classNameId = $request->input('class_name_id') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';
        $searchValue = $request->input('search_value') ?? '';
        $studentActiveStatus = $request->input('type') ?? "";

        $classWiseStudentListReport = $this->getClassWiseStudentListReportData(
            $classNameId,
            $classroomId,
            $searchValue,
            $studentActiveStatus
        );

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassWiseStudentListReportExport($classWiseStudentListReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Student List.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get class wise student list report data
    */
    private function getClassWiseStudentListReportData(
        $classNameId = null,
        $classroomId = null,
        $searchValue = "",
        $studentActiveStatus = ""
    ) {
        $allStudents = $this->studentRepository->getListForSummery($classNameId, $classroomId, $searchValue, $studentActiveStatus);
        $students = $allStudents['students'] ?? [];

        return [
            'reports' => $students
        ];
    }

    /*
    *   export student age report in excel
    */
    public function exportStudentAgeReport(Request $request)
    {
        $selectedDate = !empty($request->input('selected_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('selected_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        $minAge = $request->input('min_age') ?? 0;
        $maxAge = $request->input('max_age') ?? 0;

        $studentAgeReport = $this->getStudentAgeReportData(
            $selectedDate,
            $minAge,
            $maxAge
        );

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();
        $reportDate = !empty($selectedDate) ? Carbon::parse($selectedDate)->format('d-M-Y') : '';

        $export = new StudentAgeReportExport($studentAgeReport, $schoolTitle, $academicYear, $reportDate);

        return Excel::download($export, "Students Age Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get student age report data
    */
    private function getStudentAgeReportData(
        $selectedDate = "",
        $minAge = 0,
        $maxAge = 0
    ) {
        $students = $this->studentRepository->getActiveListForAgeReport($selectedDate, $minAge, $maxAge);

        $studentData = $students->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
            $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

            $birthDate = "";
            $age = "";
            $ageCloseTo = "0y";

            if (!empty($student?->birth_date_at)) {
                $birthDate = Carbon::parse($student?->birth_date_at)->format('d-M-Y');

                $dob = Carbon::parse($student?->birth_date_at);
                $now = Carbon::now();

                $ageYears = $dob->diff($now)->y;
                $ageMonths = $dob->diff($now)->m;
                $ageDays = $dob->diff($now)->d;

                $age = "{$ageYears}y, {$ageMonths}m, {$ageDays}d";

                if ($ageMonths >= 6) {
                    $ageCloseTo = ($ageYears + 1) . "y";
                } else {
                    $ageCloseTo = $ageYears . "y";
                }
            }

            return [
                'student_name' => $studentName,
                'roll_no' => $student?->classroomRoll?->roll_no,
                'admission_no' => $student?->admission_no,
                'class' => $student?->classroom?->title,
                'dob' => $birthDate,
                'age' => $age,
                'age_close_to' => $ageCloseTo,
                'father_name' => $fatherName,
                'gender' => $student?->gender,
            ];
        })->toArray();

        return $studentData;
    }

    /*
    *   export student document report in excel
    */
    public function exportStudentDocumentReport(Request $request)
    {
        $studentDocumentReport = [];

        $classroomId = $request->input('classroom_id') ?? null;

        if (!empty($classroomId)) {
            $studentDocumentReport = $this->getStudentDocumentReportData($classroomId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new StudentDocumentReportExport($studentDocumentReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Students Document Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get student document report data
    */
    private function getStudentDocumentReportData($classroomId)
    {
        $studentData = [];

        $documentTitles = ['Pan card', 'Voter card', 'Passport', 'Aadhaar card'];

        if (!empty($classroomId)) {
            $studentData = $this->studentRepository->getActiveListForDocument($classroomId)
                ->map(function ($student) use ($documentTitles) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $attachedDocuments = [];

                    if ($student?->document_attached != null) {
                        $documentAttached = json_decode($student->document_attached);

                        if (count($documentAttached) > 0) {
                            foreach ($documentAttached as $document) {
                                if ($document?->is_have == true) {
                                    $attachedDocuments[] = $document?->title;
                                }
                            }
                        }
                    }

                    $unattachedDocuments = array_diff($documentTitles, $attachedDocuments);

                    $unattachedDocumentTitles = implode(', ', $unattachedDocuments);
                    $attachedDocumentTitles = implode(', ', $attachedDocuments);

                    $student['document_submitted'] = $attachedDocumentTitles;
                    $student['document_not_submitted'] = $unattachedDocumentTitles;

                    $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                    $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                    $birthDate = "";

                    if (!empty($student?->birth_date_at)) {
                        $birthDate = Carbon::parse($student?->birth_date_at)->format('d-M-Y');
                    }

                    return [
                        'admission_no' => $student->admission_no,
                        'student_name' => $studentName,
                        'class_name' => $student?->classroom?->title ?? "",
                        'dob' => $birthDate,
                        'father_name' => $fatherName,
                        'document_submitted' => $attachedDocumentTitles,
                        'document_not_submitted' => $unattachedDocumentTitles
                    ];
                })->toArray();
        }

        return $studentData;
    }

    /*
    *   export class wise tc report in excel
    */
    public function exportClassWiseTcReport()
    {
        $classWiseTcReport = $this->getClassWiseTcReportData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassWiseTcReportExport($classWiseTcReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Class Wise SLC Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get class wise tc report data
    */
    private function getClassWiseTcReportData()
    {
        $classWiseTcReport = [];

        $tcSummary = $this->studentCertificateRepository->getTcSummary();

        if (count($tcSummary) > 0) {
            foreach ($tcSummary as $report) {
                $classWiseTcReport[] = [
                    'class_name' => $report['title'] ?? "",
                    'total_active_student' => $report['students_count'] ?? 0,
                    'saved_draft' => $report['student_draft_tc_count'] ?? 0,
                    'generated' => $report['student_generate_tc_count'] ?? 0,
                ];
            }
        }

        return $classWiseTcReport;
    }

    /*
    *   export class wise student tc report in excel
    */
    public function exportClassWiseStudentTcReport(Request $request)
    {
        $classWiseStudentTcReport = [];

        $classroomId = $request->input('classroom_id') ?? '';
        $isDraft = $request->input('is_draft') ?? false;
        $isGenerated = $request->input('is_generated') ?? false;

        if (!empty($classroomId)) {
            $classWiseStudentTcReport = $this->getClassWiseStudentTcReportData(
                $classroomId,
                $isDraft,
                $isGenerated
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassWiseStudentTcReportExport($classWiseStudentTcReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Class Wise SLC Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get class wise student tc report data
    */
    private function getClassWiseStudentTcReportData(
        $classroomId,
        $isDraft = false,
        $isGenerated = false
    ) {
        $classWiseStudentTcReport = [];

        $tcStudents = $this->studentCertificateRepository->getTcByClassroomId($classroomId, $isDraft, $isGenerated);

        if (count($tcStudents) > 0) {
            foreach ($tcStudents as $student) {
                $studentName = ($student['first_name'] ?? "") . " " . ($student['middle_name'] ?? "") . " " . ($student['last_name'] ?? "");

                $classWiseStudentTcReport[] = [
                    'class_name' => $student['classroom_title'] ?? "",
                    'student_name' => $studentName,
                    'admission_no' => $student['admission_no'] ?? "",
                    'tc_number' => $student['certificate_no'] ?? "",
                    'generated_on' => !empty($student['generated_date_at']) ? Carbon::parse($student['generated_date_at'])->format('d-m-Y') : "",
                    'date_of_issue' => !empty($student['issue_date_at']) ? Carbon::parse($student['issue_date_at'])->format('d-m-Y') : "",
                ];
            }
        }

        return $classWiseStudentTcReport;
    }

    /*
    *   export student inactive report in excel
    */
    public function exportStudentInactiveReport(Request $request)
    {
        $classroomId = $request->input('classroom_id') ?? null;
        $search = $request->input('search') ?? "";

        $studentInactiveReport = $this->getStudentInactiveReportData(
            $classroomId,
            $search
        );

        $export = new StudentInactiveReportExport($studentInactiveReport);

        return Excel::download($export, "Inactive Student List.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get student inactive report data
    */
    private function getStudentInactiveReportData(
        $classroomId = null,
        $search = ""
    ) {
        $studentInactiveReport = [];

        $students = $this->studentRepository->getInactiveList($classroomId, $search);

        if (count($students) > 0) {
            $studentInactiveReport = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'student_name' => $studentName,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'class_name' => $student?->classroom?->title,
                    'father_name' => $fatherName,
                    'mobile' => $student?->father?->phone,
                    'inactive_date' => !empty($student?->status_date_at) ? Carbon::parse($student?->status_date_at)->format('d-m-Y') : "",
                    'inactive_reason' => $student?->reason,
                ];
            })->toArray();
        }

        return $studentInactiveReport;
    }


    /*
    *   export promoted student report in excel
    */
    public function exportPromotedStudentReport(Request $request)
    {
        $searchValue = $request->input('search_value') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';
        $startDate = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
        $endDate = !empty($request->input('end_date')) ? Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';

        $promotedStudentReport = $this->getPromotedStudentReportData(
            $searchValue,
            $classroomId,
            $startDate,
            $endDate
        );

        $start_date_title = "";
        $end_date_title = "";

        if (!empty($startDate)) {
            $start_date_title = Carbon::parse($startDate)->format('d-M-Y');
        }

        if (!empty($endDate)) {
            $end_date_title = Carbon::parse($endDate)->format('d-M-Y');
        }

        $export = new PromotedStudentReportExport($promotedStudentReport, $start_date_title, $end_date_title);

        return Excel::download($export, "Promoted Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get promoted student report data
    */
    private function getPromotedStudentReportData(
        $searchValue = '',
        $classroomId = '',
        $startDate = '',
        $endDate = ''
    ) {
        $students = $this->studentRepository->getActivePromotedReport($searchValue, $classroomId,  $startDate, $endDate);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroomData'])) {
                        unset($student['classroomData']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroomData'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->first_name ?? "") . " " . ($student?->first_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->first_name ?? "") . " " . ($student?->father?->first_name ?? "");
                $previousClassroom = ($student?->previousAcademicYear?->academic_session ?? "") . " " . ($student?->previousClassroom?->title ?? "");
                $promotedDate = !empty($student?->classroomStudent?->promoted_date_at) ? Carbon::parse($student?->classroomStudent?->promoted_date_at)->format('d-M-Y') : '';
                $promotedBy = ($student?->classroomStudent?->user?->first_name ?? "") . " " . ($student?->classroomStudent?->user?->middle_name ?? "") . " " . ($student?->classroomStudent?->user?->last_name ?? "");

                return [
                    'student_name' => $studentName,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'admission_no' => $student?->admission_no,
                    'father_name' => $fatherName,
                    'mobile' => $student?->father?->phone,
                    'promoted_to_class' => $student?->classroomData?->title,
                    'promoted_from_class' => $previousClassroom,
                    'promoted_date' => $promotedDate,
                    'promoted_by' => $promotedBy,
                ];
            })->toArray();
        }

        return $students;
    }

    /*
    *   export generated tc report in excel
    */
    public function exportGeneratedTcReport(Request $request)
    {
        $classroomId = $request->input('classroom_id') ?? '';
        $searchValue = $request->input('search_value') ?? '';
        $academicYearId = $request->input('academic_year_id') ?? '';
        $status = $request->input('status') ?? '';

        $generatedTcReport = $this->getGeneratedTcReportData(
            $searchValue,
            $academicYearId,
            $status,
            $classroomId
        );

        $export = new GeneratedTcStudentReportExport($generatedTcReport);

        return Excel::download($export, "TC_Generated_Students.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get generated tc report data
    */
    private function getGeneratedTcReportData(
        $searchValue = '',
        $academicYearId = '',
        $status = '',
        $classroomId = ''
    ) {
        $generatedTcReport = $this->studentCertificateRepository->getGeneratedTc($searchValue, $academicYearId, $status, $classroomId);

        if (count($generatedTcReport) > 0) {
            $generatedTcReport = $generatedTcReport->map(function ($tcData) {
                $studentName = ($tcData?->first_name ?? "") . " " . ($tcData?->middle_name ?? "") . " " . ($tcData?->last_name ?? "");
                $fatherName = ($tcData?->father_first_name ?? "") . " " . ($tcData?->father_middle_name ?? "") . " " . ($tcData?->father_last_name ?? "");

                return [
                    'student_name' => $studentName,
                    'roll_number' => $tcData?->roll_no,
                    'admission_no' => $tcData?->admission_no,
                    'class_name' => $tcData?->classroom_title,
                    'father_name' => $fatherName,
                    'mobile' => $tcData?->father_phone,
                    'tc_no' => $tcData?->certificate_no,
                    'tc_date' => !empty($tcData?->generated_date_at) ? Carbon::parse($tcData?->generated_date_at)->format('d-m-Y') : "",
                    'tc_reason' => $tcData?->tc_reason,
                ];
            })->toArray();
        }

        return $generatedTcReport;
    }

    /*
    *   download student details
    */
    public function downloadStudentDetails(Request $request)
    {
        try {
            $classroomIds = [];
            $status = $request->status ?? "";
            $academicYearId = $request->academic_year_id ?? null;
            $orderBy = $request->order_by ?? "";
            $studentAttributes = !empty($request->student_attributes) ? json_decode($request->student_attributes) : [];

            // validation for acaedmic year id
            if (empty($academicYearId)) {
                return redirect()->route('student_report.custom_download')->with(['error' => 'Academic Year is required to download template.']);
            }

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            // validation for classroom ids
            if (empty($classroomIds)) {
                return redirect()->route('student_report.custom_download')->with(['error' => 'Class is required to download template.']);
            }

            $attributes = [];

            // filter selected attributes
            if (!empty($studentAttributes)) {
                foreach ($studentAttributes as $key => $value) {
                    if ($value == true || $value == "true") {
                        $attributes[] = $key;
                    }
                }
            }

            // validation for attributes
            if (empty($attributes)) {
                return redirect()->route('student_report.custom_download')->with(['error' => 'Please select at least one student attribute.']);
            }

            $classroomTitles = "";

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
            $academicYearTitle = $this->academicYearRepository->getAcademicYearById($academicYearId)?->academic_session ?? "";

            $export = new StudentDetailsExport(
                $this->studentRepository,
                $this->userRepository,
                $this->transportRepository,
                $academicYearId,
                $classroomIds,
                $attributes,
                $status,
                $orderBy,
                $classroomTitles,
                $schoolTitle,
                $academicYearTitle
            );

            return Excel::download($export, 'student_report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.custom_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  download student general report
    */
    public function downloadStudentGeneralReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentGeneralReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentGeneralReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student general report data
    */
    public function getStudentGeneralReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");
                $motherName = ($student?->mother?->first_name ?? "") . " " . ($student?->mother?->middle_name ?? "") . " " . ($student?->mother?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'mother_name' => $motherName,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student birth date wise report
    */
    public function downloadStudentBirthDateWiseReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentBirthDateWiseReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentBirthDateWiseReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student birth date wise report data
    */
    public function getStudentBirthDateWiseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'student_name' => $studentName,
                    'birth_date' => !empty($student->birth_date_at) ? Carbon::parse($student->birth_date_at)->format('d-M-Y') : "",
                    'admission_date' => !empty($student->admission_date_at) ? Carbon::parse($student->admission_date_at)->format('d-M-Y') : "",
                    'father_name' => $fatherName,
                    'father_mobile' => $student?->father?->phone,
                ];
            })->sortBy('display_order')->toArray();
        }

        return $students;
    }

    /*
    *  download student gender report
    */
    public function downloadStudentGenderReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentGenderReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentGenderReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student gender report data
    */
    public function getStudentGenderReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'gender' => $student?->gender,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }

    /*
    *  download student contact report
    */
    public function downloadStudentContactReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentContactReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentContactReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student contact report data
    */
    public function getStudentContactReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,sms_phone',
                'mother:id,student_id,guardian_type,phone'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'father_mobile' => $student?->father?->phone,
                    'sms_phone' => $student?->father?->sms_phone,
                    'mother_mobile' => $student?->mother?->phone,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student address report
    */
    public function downloadStudentAddressReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentAddressReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentAddressReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student address report data
    */
    public function getStudentAddressReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'address' => $student?->present_address,
                    'city' => $student?->present_city,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }

    /*
    *  download student email report
    */
    public function downloadStudentEmailReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentEmailReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentEmailReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student email report data
    */
    public function getStudentEmailReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,email',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'father_mobile' => $student?->father?->phone,
                    'father_email' => $student?->father?->email,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student religion report
    */
    public function downloadStudentReligionReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentReligionReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentReligionReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student religion report data
    */
    public function getStudentReligionReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'religion' => $student?->religion,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student category report
    */
    public function downloadStudentCategoryReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentCategoryReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentCategoryReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student category report data
    */
    public function getStudentCategoryReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'student_category.category'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'category' => $student?->student_category?->category?->title,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student inactive report
    */
    public function downloadInactiveStudentReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = "Inactive";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getInactiveStudentReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new InactiveStudentReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student inactive report data
    */
    public function getInactiveStudentReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student sibling report
    */
    public function downloadStudentSiblingReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentSiblingReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentSiblingReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Sibling Report.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student sibling report data
    */
    public function getStudentSiblingReportData(array $classroomIds, string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentSiblingReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) use ($status) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                $fatherName = $student?->father?->first_name ?? "";
                $fatherEmail = $student?->father?->email ?? "";
                $fatherPhone = $student?->father?->phone ?? "";

                $hasSibling = $this->studentRepository->checkSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone, $status);

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'id' => $student?->id,
                    'name' => $studentName,
                    'father_user_id' => $student?->father?->user_id,
                    'father_name' => $fatherName,
                    'father_email' => $fatherEmail,
                    'father_phone' => $fatherPhone,
                    'has_sibling' => $hasSibling,
                ];
            })->filter(function ($student) {
                return $student['has_sibling'] ?? false;
            })->sortBy('display_order');

            foreach ($students as $student) {
                if (!isset($reports[$student['father_name'] . "-" . $student['father_phone']])) {
                    $reports[$student['father_name'] . "-" . $student['father_phone']] = [
                        'parent_name' => $student['father_name'],
                        'parent_email' => $student['father_email'],
                        'parent_phone' => $student['father_phone'],
                    ];
                }

                if (!isset($reports[$student['father_name'] . "-" . $student['father_phone']]['students'][$student['id']])) {
                    $reports[$student['father_name'] . "-" . $student['father_phone']]['students'][$student['id']] = [
                        'student_name' => $student['name'] ?? "",
                        'admission_no' => $student['admission_no'] ?? "",
                        'roll_no' => $student['roll_no'] ?? "",
                        'class_name' => $student['classroom_title'] ?? "",
                    ];
                }
            }
        }

        return $reports;
    }

    /*
    *  download student house report
    */
    public function downloadStudentHouseReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentHouseReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentHouseReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student house report data
    */
    public function getStudentHouseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentHouseWiseReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'house' => $student?->student_house?->house?->name,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download new student report
    */
    public function downloadNewStudentReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getNewStudentReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new NewStudentReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get new student report data
    */
    public function getNewStudentReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getNewStudentReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $createdBy = ($student?->createdBy?->user?->first_name ?? "") . " " . ($student?->createdBy?->user?->middle_name ?? "") . " " . ($student?->createdBy?->user?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'admission_date' => !empty($student?->admission_date_at) ? Carbon::parse($student?->admission_date_at)->format('d-M-Y') : "",
                    'taken_by' => $createdBy,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download old student report
    */
    public function downloadOldStudentReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getOldStudentReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new OldStudentReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get old student report data
    */
    public function getOldStudentReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getOldStudentReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                if ($student?->promoted_date_at != null) {
                    $promotedDate = Carbon::parse($student?->promoted_date_at)->format('d-M-Y');
                    $promotedBy = $student?->promoted_by;
                } else {
                    $promotedDate = !empty($student?->classroomStudent?->promoted_date_at) ? Carbon::parse($student?->classroomStudent?->promoted_date_at)->format('d-M-Y') : "";
                    $promotedBy = ($student?->classroomStudent?->user?->first_name ?? "") . " " . ($student?->classroomStudent?->user?->middle_name ?? "") . " " . ($student?->classroomStudent?->user?->last_name ?? "");
                }

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'promoted_date' => $promotedDate,
                    'taken_by' => $promotedBy,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }

    /*
    *  download student category report
    */
    public function downloadStudentEmploymentCategoryWiseReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentEmploymentCategoryWiseReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentEmploymentCategoryWiseReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student category report data
    */
    public function getStudentEmploymentCategoryWiseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'employment_category'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'employment_category' => $student?->employment_category?->title,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student boarding type report
    */
    public function downloadStudentBoardingTypeReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentBoardingTypeReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentBoardingTypeReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student boarding type report data
    */
    public function getStudentBoardingTypeReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");
                $motherName = ($student?->mother?->first_name ?? "") . " " . ($student?->mother?->middle_name ?? "") . " " . ($student?->mother?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'student_type' => $student?->boarding_type,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'mother_name' => $motherName,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }

    /*
    *  download student document wise report
    */
    public function downloadStudentDocumentWiseReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentDocumentWiseReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentDocumentWiseReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student document wise report data
    */
    public function getStudentDocumentWiseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                $attachedDocuments = [];

                if ($student?->document_attached != null) {
                    $documentAttached = json_decode($student->document_attached);

                    if (count($documentAttached) > 0) {
                        foreach ($documentAttached as $document) {
                            if ($document?->is_have == true) {
                                $attachedDocuments[] = $document?->title;
                            }
                        }
                    }
                }

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'student_type' => $student?->boarding_type,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'document_attached' => $attachedDocuments,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }


    /*
    *  download student with transport report
    */
    public function downloadStudentWithTransportReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentWithTransportReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentWithTransportReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles,
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student with transport report data
    */
    public function getStudentWithTransportReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsWithTransportReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }

    /*
    *  download student without transport report
    */
    public function downloadStudentWithoutTransportReport(Request $request)
    {
        try {
            $reports = [];
            $classroomTitles = "";
            $classroomIds = [];
            $status = $request->status ?? "";

            if ($request?->class_section_type == 'class_type') {
                $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

                if (!empty($classNameIds)) {
                    $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
                }
            } else if ($request?->class_section_type == 'section_type') {
                $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
            }

            if (!empty($classroomIds)) {
                $reports = $this->getStudentWithoutTransportReportData($classroomIds, $status);

                $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                    ->pluck('title')
                    ->toArray();

                if (!empty($titles)) {
                    $classroomTitles = implode(',', $titles);
                }
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentWithoutTransportReportExport(
                $reports,
                $schoolTitle,
                $classroomTitles
            );

            return Excel::download($export, 'Student Information.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student without transport report data
    */
    public function getStudentWithoutTransportReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsWithoutTransportReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'class_name' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                ];
            })->sortBy('display_order')
                ->toArray();
        }

        return $students;
    }

    /*
    *  download student gender wise summary report
    */
    public function downloadStudentGenderWiseSummaryReport(Request $request)
    {
        try {
            $reports = [];
            $status = $request->status ?? "";

            $reports = $this->getStudentGenderWiseSummaryReportData($status);

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $genders = [];

            foreach (Gender::cases() as $case) {
                array_push($genders, $case->value);
            }

            $export = new StudentGenderWiseSummaryReportExport(
                $reports,
                $schoolTitle,
                $genders,
            );

            return Excel::download($export, 'Student Summary.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student gender wise summary report data
    */
    public function getStudentGenderWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $reports[$classNameId][$student?->gender] = ($reports[$classNameId][$student?->gender] ?? 0) + 1;
            });
        }

        return $reports;
    }

    /*
    *  download student religion wise summary report
    */
    public function downloadStudentReligionWiseSummaryReport(Request $request)
    {
        try {
            $reports = [];
            $status = $request->status ?? "";

            $reports = $this->getStudentReligionWiseSummaryReportData($status);

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $religions = $this->religionRepository->getActiveAll()
                ->pluck('name')
                ->toArray();

            $export = new StudentReligionWiseSummaryReportExport(
                $reports,
                $schoolTitle,
                $religions,
            );

            return Excel::download($export, 'Student Summary.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student religion wise summary report data
    */
    public function getStudentReligionWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $reports[$classNameId][$student?->religion] = ($reports[$classNameId][$student?->religion] ?? 0) + 1;
            });
        }

        return $reports;
    }

    /*
    *  download student category wise summary report
    */
    public function downloadStudentCategoryWiseSummaryReport(Request $request)
    {
        try {
            $reports = [];
            $status = $request->status ?? "";

            $reports = $this->getStudentcategoryWiseSummaryReportData($status);

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $categories = $this->categoryRepository->getActiveNameAndId()
                ->pluck('title')
                ->toArray();

            $export = new StudentCategoryWiseSummaryReportExport(
                $reports,
                $schoolTitle,
                $categories,
            );

            return Excel::download($export, 'Student Summary.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student category wise summary report data
    */
    public function getStudentCategoryWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->loadMissing(['student_category.category']);

            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $categoryTitle = $student?->student_category?->category?->title;

                $reports[$classNameId][$categoryTitle] = ($reports[$classNameId][$categoryTitle] ?? 0) + 1;
            });
        }

        return $reports;
    }


    /*
    *  download student inactive summary report
    */
    public function downloadStudentInactiveSummaryReport(Request $request)
    {
        try {
            $reports = [];

            $reports = $this->getStudentInactiveSummaryReportData();

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $export = new StudentInactiveSummaryReportExport(
                $reports,
                $schoolTitle,
            );

            return Excel::download($export, 'Student Summary.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student inactive summary report data
    */
    public function getStudentInactiveSummaryReportData()
    {
        $reports = [];

        $students = $this->studentRepository->getStudentInactiveSummaryReport();

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }
            });
        }

        return $reports;
    }

    /*
    *  download student old new summary report
    */
    public function downloadStudentOldNewSummaryReport(Request $request)
    {
        try {
            $reports = [];
            $status = $request->status ?? "";

            $reports = $this->getStudentOldNewSummaryReportData($status);

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $studentStatusArray = [];

            foreach (StudentStatus::cases() as $case) {
                if ($case->value != StudentStatus::OLD->value) {
                    array_push($studentStatusArray, $case->value);
                }
            }

            $export = new StudentOldNewSummaryReportExport(
                $reports,
                $schoolTitle,
                $studentStatusArray,
            );

            return Excel::download($export, 'Student Summary.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student old new summary report data
    */
    public function getStudentOldNewSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                if (in_array($student?->student_status, [StudentStatus::OLD, StudentStatus::PROMOTED])) {
                    $studentStatus = StudentStatus::PROMOTED->value;
                } else {
                    $studentStatus = $student?->student_status;
                }

                $reports[$classNameId][$studentStatus] = ($reports[$classNameId][$studentStatus] ?? 0) + 1;
            });
        }

        return $reports;
    }

    /*
    *  download student boarding wise summary report
    */
    public function downloadStudentBoardingWiseSummaryReport(Request $request)
    {
        try {
            $reports = [];
            $status = $request->status ?? "";

            $reports = $this->getStudentBoardingWiseSummaryReportData($status);

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = $schoolData->title ?? "";

            $boardingTypeArray = [];

            foreach (ScholarBoardingType::cases() as $case) {
                array_push($boardingTypeArray, $case->value);
            }

            $export = new StudentBoardingWiseSummaryReportExport(
                $reports,
                $schoolTitle,
                $boardingTypeArray,
            );

            return Excel::download($export, 'Student Summary.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('student_report.predefined_download')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student boarding wise summary report data
    */
    public function getStudentBoardingWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                $boardingType = $student?->boarding_type;

                if ($boardingType != null) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $classroomId = $student?->classroom?->id ?? 0;
                    $classroomTitle = $student?->classroom?->title ?? "";

                    if (!isset($reports[$classroomId])) {
                        $reports[$classroomId] = [
                            'class_name' => $classroomTitle,
                        ];
                    }

                    $reports[$classroomId][$boardingType] = ($reports[$classroomId][$boardingType] ?? 0) + 1;
                }
            });
        }

        return $reports;
    }

    /*
    *  download exam mark import template
    */
    public function downloadExamMarkImportTemplate(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'classroom_id' => ['required'],
                'subject_id' => ['required'],
                'exam_id' => ['required'],
            ]);

            if ($validator->fails()) {
                return redirect()->route('exam.upload_subject_marks')->with(['error' => 'Mandatory fields are marked with an asterisk (*)
                Please select all mandatory fields for download template !!']);
            }

            $classroomId = $request->classroom_id;
            $subjectId = $request->subject_id;
            $examId = $request->exam_id;

            $classroom = $this->classroomRepository->getById($classroomId);
            $subject = $this->subjectRepository->getById($subjectId);
            $exam = $this->examRepository->getById($examId);

            $examMarks = $this->getExamMarkImportTemplateData($classroomId, $subjectId, $examId);

            $export = new ExamMarkImportTemplateExport($examMarks);

            return Excel::download($export, "{$classroom->title}_{$subject->title}_{$exam->title}.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('exam.upload_subject_marks')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get student boarding wise summary report data
    */
    public function getExamMarkImportTemplateData(int $classroomId, int $subjectId, int $examId)
    {
        $examMarks = [];

        $students = $this->studentRepository->getExamMarkTemplateStudent($classroomId, $subjectId, $examId);

        if (count($students) > 0) {
            $examMarks = $students->map(function ($student) {
                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                $mark = "";

                if ($student?->mark?->is_present) {
                    if ($student?->mark?->grade != null) {
                        $mark = $student?->mark?->grade?->title;
                    } else {
                        $mark = $student?->mark?->mark;
                    }
                } else {
                    $mark = $student?->mark?->absence_reason;
                }

                return [
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'admission_no' => $student?->admission_no,
                    'student_name' => $studentName,
                    'is_present' => $student?->mark?->is_present ? "1" : "0",
                    'marks' => $mark,
                ];
            })->sortBy(['roll_no'])->toArray();
        }

        return !empty($examMarks) ? array_values($examMarks) : [];
    }

    /*
    *  export subject mark report
    */
    public function exportSubjectMarkReport(Request $request)
    {
        try {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $examId = $request->exam_id ?? null;

            $classroomTitle = "";
            $subjectTitle = "";
            $examTitle = "";
            $isCoScholastic = false;
            $reports = [];

            if (!empty($classroomId) && !empty($subjectId) && !empty($examId)) {
                $classroom = $this->classroomRepository->getById($classroomId);
                $subject = $this->subjectRepository->getById($subjectId);
                $exam = $this->examRepository->getById($examId);

                $classroomTitle = $classroom?->title ?? "";
                $subjectTitle = $subject?->title ?? "";
                $examTitle = $exam?->title ?? "";

                $isCoScholastic = $subject?->is_co_scholastic === 'Yes' ? true : false;

                $reports = $this->getSubjectMarkReportData($classroomId, $subjectId, $examId);
            }

            $export = new SubjectMarkReportExport($reports, $classroomTitle, $subjectTitle, $examTitle, $isCoScholastic);

            return Excel::download($export, "Student's subject wise marks Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('exam.enter_marks')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get subject mark report data
    */
    public function getSubjectMarkReportData(int $classroomId, int $subjectId, int $examId, bool $isCoScholastic = false)
    {
        $reports = [];

        $students = $this->studentRepository->getSubjectMarkReport($classroomId, $subjectId, $examId);

        $gradeMap = [];

        $academicGradeScale = $this->academicRepository->getGradeOne($subjectId, $classroomId);
        $academicGradeScale->loadMissing(['academicGradeItems']);

        if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems?->count() > 0) {
            foreach ($academicGradeScale?->academicGradeItems as $gradeScaleItem) {
                $gradeMap[] = [
                    'grade' => $gradeScaleItem?->title ?? "",
                    'min_mark' => $gradeScaleItem?->min_mark ?? 0,
                    'max_mark' => $gradeScaleItem?->max_mark ?? 0,
                ];
            }
        }

        if (count($students) > 0) {
            $reports = $students->map(function ($student) use ($isCoScholastic, $gradeMap) {
                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                $mark = "";
                $grade = "";
                $absenceReason = "";
                $attendance = "";

                if ($student?->mark?->is_present) {
                    if ($isCoScholastic) {
                        $mark = "";
                        $grade = $student?->mark?->grade?->title;
                        $attendance = $student?->mark?->grade?->title;
                    } else {
                        $mark = $student?->mark?->mark;
                        $grade = "";

                        if ($student?->mark?->mark != null) {
                            // $mark = floor($mark);
                            $gradeMark = floor($mark);

                            foreach ($gradeMap as $gradeItem) {
                                if ($gradeMark >= $gradeItem['min_mark'] && $gradeMark <= $gradeItem['max_mark']) {
                                    $grade = $gradeItem['grade'];
                                    break;
                                }
                            }
                        }

                        $examAttendance = $student?->examAttendances?->first();

                        $attendance = $examAttendance?->present_day ?? "";
                    }
                } else {
                    $absenceReason = $student?->mark?->absence_reason;
                }

                return [
                    'roll_no' => $student->roll_no,
                    'admission_no' => $student->admission_no,
                    'name' => $studentName,
                    'attendance' => $attendance,
                    'marks' => $mark,
                    'grade' => $grade,
                    'reason' => $absenceReason,
                ];
            })->sortBy(['roll_no'])->toArray();
        }

        return $reports;
    }

    /*
    *  export class wise registration report
    */
    public function exportClassWiseRegistrationReport(Request $request)
    {
        try {
            $academicYearId = $request->academic_year_id ?? null;

            $classWiseReport = [];

            if (!empty($academicYearId)) {
                $classWiseReport = $this->getClassWiseRegistrationReportData($academicYearId);
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";

            $export = new ClassWiseRegistrationReportExport($classWiseReport, $schoolTitle);

            return Excel::download($export, "ClassWiseRegistrationReport.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission_registration_report.registration_report')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get class wise registration report data
    */
    public function getClassWiseRegistrationReportData(int $academicYearId)
    {
        $classWiseReport = [
            'reports' => [],
            'total_registration' => 0,
            'total_admission' => 0,
            'total_fee' => 0,
        ];

        $totalRegistration = 0;
        $totalAdmission = 0;
        $totalFee = 0;

        if (!empty($academicYearId)) {
            $registrations = $this->admissionRepository->getRegistrationReportDataByAcademicYearId($academicYearId);

            if (count($registrations) > 0) {
                foreach ($registrations as $registration) {
                    if (!isset($classWiseReport['reports'][$registration?->class_name_id])) {
                        $classWiseReport['reports'][$registration?->class_name_id] = [
                            'class_name' => $registration?->class_title,
                            'total_registration' => 0,
                            'total_admisison' => 0,
                            'total_fee' => 0,
                        ];
                    }

                    if ($registration?->enquiry_type == EnquiryType::REGISTRATION->value) {
                        $classWiseReport['reports'][$registration?->class_name_id]['total_registration'] = ($classWiseReport['reports'][$registration?->class_name_id]['total_registration'] ?? 0) + 1;
                        $totalRegistration++;
                    } else if ($registration?->enquiry_type == EnquiryType::ADMISSION->value) {
                        $classWiseReport['reports'][$registration?->class_name_id]['total_admission'] = ($classWiseReport['reports'][$registration?->class_name_id]['total_admission'] ?? 0) + 1;

                        $totalAdmission++;
                    }

                    $feeAmount = $registration?->academic_fee ?? 0;

                    $classWiseReport['reports'][$registration?->class_name_id]['total_fee'] = ($classWiseReport['reports'][$registration?->class_name_id]['total_fee'] ?? 0) + $feeAmount;

                    $totalFee += $feeAmount;
                }

                $classWiseReport['total_registration'] = $totalRegistration;
                $classWiseReport['total_admission'] = $totalAdmission;
                $classWiseReport['total_fee'] = $totalFee;
            }
        }

        return $classWiseReport;
    }

    /*
    *  export day wise registration report
    */
    public function exportDayWiseRegistrationReport(Request $request)
    {
        try {
            $academicYearId = $request->academic_year_id ?? null;
            $month = $request->month ?? "";

            $dayWiseReport = [];

            if (!empty($academicYearId)) {
                $dayWiseReport = $this->getDayWiseRegistrationReportData($academicYearId, $month);
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";

            $export = new DayWiseRegistrationReportExport($dayWiseReport, $schoolTitle);

            return Excel::download($export, "DayWiseRegistrationReport.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission_registration_report.registration_report')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get day wise registration report data
    */
    public function getDayWiseRegistrationReportData(int $academicYearId, string $month = "")
    {
        $dayWiseReports = [
            'reports' => [],
            'total_registration' => 0,
            'total_fee' => 0,
        ];

        $totalRegistration = 0;
        $totalFee = 0;

        if (!empty($academicYearId)) {
            $registrations = $this->admissionRepository->getRegistrationReportDataByAcademicYearId($academicYearId);

            if (!empty($month)) {
                $registrations = $registrations->filter(function ($registration) use ($month) {
                    $registrationMonth = !empty($registration?->date_of_registration) ? strtolower(Carbon::parse($registration?->date_of_registration)->format('M')) : "";

                    return $registrationMonth == strtolower($month);
                });
            }

            if (count($registrations) > 0) {
                foreach ($registrations as $registration) {
                    $dateOfRegistration = $registration?->date_of_registration;

                    if (!isset($dayWiseReports['reports'][$dateOfRegistration])) {
                        $dayWiseReports['reports'][$dateOfRegistration] = [
                            'month' => Carbon::parse($dateOfRegistration)->format('M'),
                            'registration_date' => Carbon::parse($dateOfRegistration)->format('d-M-Y'),
                            'total_registration' => 0,
                            'total_fee' => 0,
                        ];
                    }

                    $dayWiseReports['reports'][$dateOfRegistration]['total_registration'] = ($dayWiseReports['reports'][$dateOfRegistration]['total_registration'] ?? 0) + 1;
                    $totalRegistration++;

                    $feeAmount = $registration?->academic_fee ?? 0;

                    $dayWiseReports['reports'][$dateOfRegistration]['total_fee'] = ($dayWiseReports['reports'][$dateOfRegistration]['total_fee'] ?? 0) + $feeAmount;

                    $totalFee += $feeAmount;
                }

                $dayWiseReports['total_registration'] = $totalRegistration;
                $dayWiseReports['total_fee'] = $totalFee;
            }
        }

        return $dayWiseReports;
    }


    /*
    *  export registration daily collection report
    */
    public function exportRegistrationDailyCollectionReport(Request $request)
    {
        try {
            $academicYearId = $request->academic_year_id ?? null;
            $startDate = $request->start_date ?? "";
            $endDate = $request->end_date ?? "";

            $dateTitle = (!empty($startDate) ? Carbon::parse($startDate)->format('d-M-Y') : "") . " to " . !empty($endDate) ? Carbon::parse($endDate)->format('d-M-Y') : "";

            $registrationReport = $this->getRegistrationDailyCollectionReportData($academicYearId, $startDate, $endDate);

            $export = new RegistrationDailyCollectionReportExport($registrationReport, $dateTitle);

            return Excel::download($export, "RegistrationDailyCollectionReport.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission_registration_report.daily_collection')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get registration daily collection report data
    */
    public function getRegistrationDailyCollectionReportData(int $academicYearId = null, string $startDate = "", string $endDate = "")
    {
        $registrationReport = [];
        $totalAmount = 0;

        $registrations = $this->admissionRepository->getRegistrationDailyColectionReportData($academicYearId, $startDate, $endDate);

        if (count($registrations) > 0) {
            $registrationReport['reports'] = $registrations->map(function ($registration) use (&$totalAmount) {
                $studentName = ($registration?->first_name ?? "") . " " . ($registration?->middle_name ?? "") . " " . ($registration?->last_name ?? "");

                $feeAmount = (float) $registration?->academic_fee ?? 0;

                $totalAmount += $feeAmount;

                return [
                    'id' => $registration?->id,
                    'registration_no' => $registration?->registration_no,
                    'student_name' => $studentName,
                    'class' => $registration?->class_title,
                    'amount' => $feeAmount,
                    'date' => !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d M, Y') : "",
                    'payment_mode' => $registration?->payment_mode,
                    'registration_mode' => $registration?->registration_mode,
                    'receipt_no' => $registration?->receipt_no,
                ];
            })->toArray();

            $registrationReport['total_amount'] = $totalAmount;
        }

        return $registrationReport;
    }


    /*
    *  export daily admission report
    */
    public function exportDailyAdmissionReport(Request $request)
    {
        try {
            $academicYearId = $request->academic_year_id ?? null;
            $startDate = $request->start_date ?? "";
            $endDate = $request->end_date ?? "";
            $studentSearch = $request->student_search ?? "";

            $dateTitle = (!empty($startDate) ? Carbon::parse($startDate)->format('d-M-Y') : "") . " to " . !empty($endDate) ? Carbon::parse($endDate)->format('d-M-Y') : "";

            $admissionReport = $this->getDailyAdmissionReportData($academicYearId, $startDate, $endDate, $studentSearch);

            $export = new DailyAdmissionReportExport($admissionReport, $dateTitle);

            return Excel::download($export, "DailyAdmissionReport.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission_registration_report.daily_admission')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get daily admission report data
    */
    public function getDailyAdmissionReportData(int $academicYearId = null, string $startDate = "", string $endDate = "", string $studentSearch = "")
    {
        $admissionReport = [];

        $registrations = $this->admissionRepository->getDailyAdmissionReport($academicYearId, $startDate, $endDate, $studentSearch);

        if (count($registrations) > 0) {
            $admissionReport['reports'] = $registrations->map(function ($registration) {
                $studentName = ($registration?->first_name ?? "") . " " . ($registration?->middle_name ?? "") . " " . ($registration?->last_name ?? "");
                $fatherName = ($registration?->father_first_name ?? "") . " " . ($registration?->father_middle_name ?? "") . " " . ($registration?->father_last_name ?? "");
                $takenBy = ($registration?->user_first_name ?? "") . " " . ($registration?->user_middle_name ?? "") . " " . ($registration?->user_last_name ?? "");

                return [
                    'id' => $registration?->id,
                    'student_id' => $registration?->student_id,
                    'registration_no' => $registration?->registration_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'class' => $registration?->classroom_title,
                    'registration_date' => !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d M, Y') : "",
                    'admission_date' => !empty($registration?->date_of_admission) ? Carbon::parse($registration?->date_of_admission)->format('d M, Y') : "",
                    'admission_no' => $registration?->admission_no,
                    'taken_by' => $takenBy,
                ];
            })->toArray();
        }

        return $admissionReport;
    }

    /*
    *  export staff attendance report
    */
    public function exportStaffAttendanceReport(Request $request)
    {
        try {
            $attendanceDate = !empty($request->input('attendance_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('attendance_date'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

            $attendanceDateTitle = !empty($request->input('attendance_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('attendance_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : date('d-M-Y');

            $staffAttendanceReport = $this->getStaffAttendanceReportData($attendanceDate);

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";

            $export = new StaffAttendanceReportExport($staffAttendanceReport, $schoolTitle, $attendanceDateTitle);

            return Excel::download($export, "Staff Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('staff_attendance.take_attendance')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get staff attendance report data
    */
    public function getStaffAttendanceReportData(string $attendanceDate)
    {
        $staffAttendanceReport = [];

        $staffs = $this->staffRepository->getFilteredStaffData();

        if (count($staffs) > 0) {
            $staffAttendance = $this->staffAttendanceRepository->getStaffAttendance($attendanceDate);

            $attendanceData = !empty($staffAttendance?->staffs) ? json_decode($staffAttendance->staffs) : [];

            foreach ($staffs as $staff) {
                $staffId = $staff->id;
                $staffName = $staff?->first_name . " " . $staff?->middle_name . " " . $staff?->last_name;

                $tempArr = [
                    'employee_id' => $staff?->employee_id,
                    'name' => $staffName,
                    'attendance' => "",
                    'leave_day' => "",
                ];

                if (count($attendanceData) > 0) {
                    foreach ($attendanceData as $attendance) {
                        if ($attendance?->staff_id == $staffId) {
                            $tempArr['attendance'] = $attendance?->attendance_status;
                        }
                    }
                }

                $staffAttendanceReport[$staffId] = $tempArr;
            }
        }

        return $staffAttendanceReport;
    }

    /*
    *  export admission exam summary
    */
    public function exportAdmissionExamSummary(Request $request)
    {
        try {
            $admissionExamSummary = [];
            $classTitle = "All Class";

            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $boardingType = $request->boarding_type ?? "";
            $examStatus = $request->exam_status ?? "";

            if (!empty($examStatus)) {
                $admissionExamSummary = $this->getAdmissionExamSummaryData($examStatus, $fromDate, $toDate, $boardingType);
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
            $academicYear = getAcademicYear();

            $export = new AdmissionExamSummaryExport($admissionExamSummary, $schoolTitle, $academicYear, $classTitle, $examStatus);

            return Excel::download($export, "Admission Exam Summary.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission_exam.exam_summary')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get admission exam summary data
    */
    public function getAdmissionExamSummaryData(string $examStatus, string $fromDate = "", string $toDate = "",  string $boardingType = "")
    {
        $admissionExamSummary = [];

        $registrations = $this->admissionRepository->getAdmissionExamStatusWiseEnquiries($examStatus, $fromDate, $toDate, $boardingType);

        if (count($registrations) > 0) {
            $admissionExamSummary = $registrations->map(function ($registration) {
                $studentName = $registration?->first_name . " " .  $registration?->middle_name . " " .  $registration?->last_name;

                if (!empty($registration->boarding_scholar)) {
                    $studentName .= "($registration->boarding_scholar)";
                }

                $fatherName = $registration?->father_first_name . " " .  $registration?->father_middle_name . " " .  $registration?->father_last_name;

                return [
                    'name' => $studentName,
                    'father_name' => $fatherName,
                    'registration_no' => $registration?->registration_no,
                    'class' => $registration?->class_title,
                    'registration_date' => !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d-M-Y') : "",
                    'exam_status' => $registration?->exam_status ?? AdmissionExamStatus::PENDING->value,
                ];
            })->toArray();
        }

        return $admissionExamSummary;
    }

    /*
    *  export registration exam report
    */
    public function exportRegistrationExamReport(Request $request)
    {
        try {
            $registrationExamReport = [];

            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $registrationStatus = $request->registration_status ?? "";
            $academicYearId = $request->academic_year_id ?? null;
            $classNameId = $request->class_name_id ?? null;

            if (!empty($academicYearId) && !empty($classNameId)) {
                $registrationExamReport = $this->getRegistrationExamReportData(
                    $academicYearId,
                    $classNameId,
                    $fromDate,
                    $toDate,
                    $registrationStatus
                );
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
            $academicYear = getAcademicYear();

            $export = new RegistrationExamReportExport($registrationExamReport, $schoolTitle, $academicYear);

            return Excel::download($export, "Registration Exam Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission_exam.registration_exam_report')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get registration exam report data
    */
    public function getRegistrationExamReportData(
        int $academicYearId,
        int $classNameId,
        string $fromDate = "",
        string $toDate = "",
        string $registrationStatus = ""
    ) {
        $registrationExamReport = [];

        $registrations = $this->admissionRepository->getRegistrationExamReport($academicYearId, $classNameId, $fromDate, $toDate, $registrationStatus);

        if (count($registrations) > 0) {
            foreach ($registrations as $registration) {
                if (count($registration?->admissionExamMarks) > 0) {
                    $registrationId = $registration?->id;

                    $studentName = $registration?->first_name . " " . $registration?->middle_name . " " . $registration?->last_name;
                    $fatherName = $registration?->father_first_name . " " . $registration?->father_middle_name . " " . $registration?->father_last_name;
                    $testDate = !empty($registration?->test_date) ? Carbon::parse($registration->test_date)->format('d-M-Y') : "";

                    $markData = [];
                    $totalFullMark = 0;
                    $totalObtainedMark = 0;

                    foreach ($registration?->admissionExamMarks as $examMark) {
                        $examId = $examMark?->exam_id;
                        $subject = $examMark?->subject;
                        $classroomSubject = $subject?->classroomSubjects?->first();
                        $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $examId)?->first();

                        $totalFullMark += (float) $examRoaster?->full_mark ?? 0;
                        $totalObtainedMark += (float) $examMark?->mark ?? 0;

                        $markData[$subject?->id] = [
                            'subject_name' => $subject?->title,
                            'full_marks' => $examRoaster?->full_mark,
                            'pass_marks' => $examRoaster?->pass_mark,
                            'obtained_marks' => (float) $examMark?->mark,
                            'result' => $examMark?->mark >= $examRoaster?->pass_mark ? "Pass" : "Fail",
                        ];
                    }

                    $percentage = $this->calculatePercentage($totalObtainedMark, $totalFullMark);

                    if ($percentage != null) {
                        $percentage = $percentage . "%";
                    }

                    $tempArr = [
                        'status' => $registration?->registration_status,
                        'registration_number' => $registration?->registration_no,
                        'student_name' => $studentName,
                        'test_date' => $testDate,
                        'parent_name' => $fatherName,
                        'contact_no' => $registration?->father_mobile,
                        'percentage' => $percentage,
                        'marks' => $markData,
                    ];

                    $registrationExamReport[$registrationId] = $tempArr;
                }
            }
        }

        return $registrationExamReport;
    }

    /*
    * helper method to calculate mark percentage
    */
    protected function calculatePercentage($marksObtained, $totalMarks)
    {
        $marksObtained = is_string($marksObtained) ? intval($marksObtained) : $marksObtained;
        $totalMarks = is_string($totalMarks) ? intval($totalMarks) : $totalMarks;

        if ($totalMarks == 0) {
            return 0; // Return 0 if total marks is 0
        }

        // Calculate percentage
        $percentage = ($marksObtained / $totalMarks) * 100;

        // Round the percentage to two decimal places
        return round($percentage, 2);
    }


    /*
    *  export registration report
    */
    public function exportRegistrationReport(Request $request)
    {
        try {
            $registrationReport = [];

            $dateTitle = "Date From";

            $academicYearId = $request?->academic_year_id ?? null;
            $classNameId = $request?->class_name_id ?? null;
            $examStatus = $request->exam_status ?? "";
            $ewsStatus = $request->ews_status ?? "";
            $physicalCondition = $request->physical_condition ?? "";
            $registrationStatus = $request->registration_status ?? "";
            $registrationMode = $request->registration_mode ?? "";
            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $search = $request->search ?? "";

            if (!empty($request->from_date)) {
                $dateTitle .= Carbon::parse($request->from_date)->format('d-M-Y');
            }

            if (!empty($request->to_date)) {
                $dateTitle .= "to " . Carbon::parse($request->to_date)->format('d-M-Y');
            }

            if (!empty($academicYearId)) {
                $registrationReport = $this->getRegistrationReportData(
                    $academicYearId,
                    $classNameId,
                    $examStatus,
                    $ewsStatus,
                    $physicalCondition,
                    $registrationStatus,
                    $registrationMode,
                    $fromDate,
                    $toDate,
                    $search,
                );
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
            $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";

            // custom fields
            $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::REGISTERFORSTUDENT->value);

            $export = new RegistrationReportExport($registrationReport, $schoolTitle, $dateTitle, $customFields?->toArray());

            return Excel::download($export, "Registration Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('admission.registration_list')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *  get registration report data
    */
    public function getRegistrationReportData(
        int $academicYearId,
        int $classNameId = null,
        string $examStatus = "",
        string $ewsStatus = "",
        string $physicalCondition = "",
        string $registrationStatus = "",
        string $registrationMode = "",
        string $fromDate = "",
        string $toDate = "",
        string $search = "",
    ) {
        $registrationReport = [];

        $registrations = $this->admissionRepository->getRegistrationReport(
            $academicYearId,
            $classNameId,
            $examStatus,
            $ewsStatus,
            $physicalCondition,
            $registrationStatus,
            $registrationMode,
            $fromDate,
            $toDate,
            $search
        );

        if (count($registrations) > 0) {
            $registrations->loadMissing(['enquiryCustomFields']);

            $registrationReport = $registrations->map(function ($registration) {
                $studentName = $registration?->first_name . " " . $registration?->middle_name . " " . $registration?->last_name;
                $fatherName = $registration?->father_first_name . " " . $registration?->father_middle_name . " " . $registration?->father_last_name;
                $takenBy = $registration?->user_first_name . " " . $registration?->user_middle_name . " " . $registration?->user_last_name;

                $birthDate = !empty($registration?->date_of_birth) ? Carbon::parse($registration->date_of_birth)->format('d-M-Y') : "";
                $registrationDate = !empty($registration?->date_of_registration) ? Carbon::parse($registration->date_of_registration)->format('d-M-Y') : "";

                return [
                    'registration_no' => $registration?->registration_no,
                    'form_no' => $registration?->form_no,
                    'class' => $registration?->class_title,
                    'student_name' => $studentName,
                    'dob' => $birthDate,
                    'father_name' => $fatherName,
                    'mobile' => $registration?->father_mobile,
                    'fee' => $registration?->academic_fee,
                    'admission_no' => $registration?->admission_no,
                    'registration_date' => $registrationDate,
                    'taken_by' => $takenBy,
                    'enquiry_custom_fields' => $registration->enquiryCustomFields,
                ];
            })->toArray();
        }

        return $registrationReport;
    }

    /*
    *   export student complete fee paid report in excel
    */
    public function exportStudentCompleteFeePaidReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $completeFeePaidReport = [];
        $classroomTitle = "";
        $reportTitle = "Installments ";
        $classroomId = $classroom->id ?? null;

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($classroomId);
            $classroomTitle = $classroom->title ?? "";
            $academicYearId = $classroom?->academic_year_id;

            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                $completeFeePaidReport = $this->getStudentCompleteFeePaidReportData(
                    $request->from_fee_id,
                    $request->to_fee_id,
                    $classroomId,
                    $academicYearId
                );

                $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
                $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

                $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
            }
        }

        $export = new CompleteFeePaidReportExport($completeFeePaidReport, $classroomTitle, $reportTitle);

        return Excel::download($export, "Paid Report of {$classroomTitle}.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper mehtod to get student complete fee paid report data
    */
    private function getStudentCompleteFeePaidReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId,
        $academicYearId = null,
    ) {
        $completePaidReport = [];
        $installmentWiseAmounts = [];
        $grandTotalPaidAmount = 0;
        $schoolId = getUserSchoolId();

        $studentIds = $this->studentRepository->getStudentsByClassroomId($classroomId, $schoolId, $academicYearId)
            ->pluck('id')
            ->toArray();

        $completePaidReportData = $this->feePaymentRepository->getStudentCompletePaidReportData(
            $fromFeeId,
            $toFeeId,
            $studentIds,
            $academicYearId
        );

        if (count($completePaidReportData) > 0) {
            $completePaidReportData->loadMissing(['fee']);

            $completePaidReportData = $completePaidReportData->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }
                return $report;
            });

            foreach ($completePaidReportData->groupBy('student_id') as $studentId =>  $studentReports) {
                $student = $studentReports->first()?->student;
                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                foreach ($studentReports->groupBy('fee_id') as $feeId => $reports) {
                    $total_paid_amount = 0;
                    $isCompletePaid = true;

                    $fee = $reports->first()->fee;

                    $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByFeeIdAndStudentId($studentId, $feeId);

                    if (count($feeInstallments) > 0) {
                        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeId);

                        $total_transport_fee = 0;
                        $total_late_fee = 0;

                        if (!$hasPayment) {
                            $fee = $reports->first()->fee;

                            // calculte transport fee if transport fee setting set to fee
                            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                $total_transport_fee += $this->calculateStudentCompletePaidTransportFee($studentId, $reports);
                            }

                            // calculate late fee
                            $total_late_fee += $this->calculateStudentCompletePaidLateFee($fee, $reports);
                        }

                        foreach ($feeInstallments as $installment) {
                            $semester = $installment?->smeseter ?? 1;
                            $fee_amount = ((float) $installment?->amount ?? 0) * $semester;
                            $payable_amount =  $fee_amount + $total_late_fee + $total_transport_fee;

                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;

                            $total_paid_amount += $paid_amount;

                            if ($payable_amount != ($paid_amount + $discount_amount)) {
                                $isCompletePaid = false;
                                break;
                            }
                        }
                    }

                    if ($isCompletePaid) {
                        $studentName = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");
                        $parentName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                        $completePaidReport[$studentId]['roll'] = $student?->classroomRoll?->roll_no;
                        $completePaidReport[$studentId]['admission_no'] = $student->admission_no;
                        $completePaidReport[$studentId]['student_type'] = $student->boarding_type;
                        $completePaidReport[$studentId]['name'] = $studentName;
                        $completePaidReport[$studentId]['parent'] = $parentName;
                        $completePaidReport[$studentId]['class'] = $student?->classroom?->title ?? "";
                        $completePaidReport[$studentId]['mobile_no'] = $student?->father?->phone ?? "";
                        $completePaidReport[$studentId]['address'] = $student->present_address ?? "";
                        $completePaidReport[$studentId]['installment_wise_amounts'][$fee->title] = $total_paid_amount;

                        if (!empty($completePaidReport[$studentId]['total_paid_amount'])) {
                            $completePaidReport[$studentId]['total_paid_amount'] += $total_paid_amount;
                        } else {
                            $completePaidReport[$studentId]['total_paid_amount'] = $total_paid_amount;
                        }

                        $installmentWiseAmounts[$fee->id] = [
                            'title' => $fee->title,
                            'amount' => ($installmentWiseAmounts[$fee->title] ?? 0) + $total_paid_amount
                        ];

                        $grandTotalPaidAmount += $total_paid_amount;
                    }
                }
            }
        }

        $updatedInstallmentWiseAmounts = [];

        if (count($installmentWiseAmounts) > 0) {
            ksort($installmentWiseAmounts);

            foreach ($installmentWiseAmounts as $installment) {
                $updatedInstallmentWiseAmounts[$installment['title']] = $installment['amount'];
            }
        }

        return [
            'reports' => $completePaidReport,
            'installment_wise_amounts' => $updatedInstallmentWiseAmounts,
            'total_paid_amount' => $grandTotalPaidAmount,
        ];
    }

    /*
    *  helper method to calculate student complete paid transport fee
    */
    protected function calculateStudentCompletePaidTransportFee($studentId, $reports)
    {
        $totalTransportFeeAmount = 0;

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
                            $existedTransportFee = $reports->where('fee_type_id', $transportFee->id)->first();

                            if ($existedTransportFee == null) {
                                $totalTransportFeeAmount += $transportFeeAmount;
                            }
                        }
                    }
                }
            }
        }

        return $totalTransportFeeAmount;
    }


    /*
    *  helper method to calculate student complete paid late fee
    */
    protected function calculateStudentCompletePaidLateFee($fee, $reports)
    {
        $lateFeeAmount = 0;

        $lateFee = $this->feeTypeRepository->getLateFeeType();

        if ($lateFee != null) {
            $existedLateFee = $reports->where('fee_type_id', $lateFee->id)->first();

            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                $lateFineStartDate = $fee->last_pay_date_at;
                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                    $currentDate = date("Y-m-d");
                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                    if ($lateFineType == LateFineType::DAILY->value) {
                        $lateFeeAmount = (float) $lateFineAmount * $daysDifference;
                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                        $weeksDifference = floor($daysDifference / 7);
                        $lateFeeAmount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                        // Extract year and month from the start date
                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                        // Extract year and month from the current date
                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                        // Calculate the difference in months
                        $startMonths = ($startYear * 12) + $startMonth;
                        $currentMonths = ($currentYear * 12) + $currentMonth;
                        $monthsDifference = $currentMonths - $startMonths;

                        $lateFeeAmount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                    }
                }
            }
        }

        return $lateFeeAmount;
    }


    /*
    *   export student daily collection report in excel
    */
    public function exportStudentDailyCollectionReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $feeType = FeeTypeEnum::FEE->value;
        $currentSession = $request->current_session ?? false;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $payment_mode = $request->payment_mode ?? "";
        $classroomId = $classroom?->id;
        $cancelledFee = $request->cancelled_fee ?? false;
        $excludeVoucherFee = $request->exclude_voucher_fee ?? false;
        $concession = $request->concession ?? false;
        $academicYearId = $classroom?->academic_year_id;
        $dailyCollectionReport = [];

        if (!empty($classroomId)) {
            $dailyCollectionReport = $this->getStudentDailyCollectionReportData(
                $feeType,
                $currentSession,
                $start_date,
                $end_date,
                $payment_mode,
                $classroomId,
                $cancelledFee,
                $excludeVoucherFee,
                $concession,
                $academicYearId
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $startDate = !empty($start_date) ? Carbon::parse($start_date)->format('d-M-Y') : "";
        $endDate = !empty($end_date) ? Carbon::parse($end_date)->format('d-M-Y') : "";
        $paymentMode = $request->payment_mode ?? "All";
        $feeMode = FeeTypeEnum::FEE->value;

        $export = new FeeDailyCollectionExport($dailyCollectionReport, $schoolTitle, $startDate, $endDate, $paymentMode, $feeMode);

        return Excel::download($export, "fee_daily_collection.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get data for student daily collection report
    */
    private function getStudentDailyCollectionReportData(
        string $feeType = "",
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $classroomId = null,
        bool $cancelledFee = false,
        bool $excludeVoucherFee = false,
        bool $concession = false,
        int $academicYearId = null
    ) {
        $dailyCollectionReport = [];
        $feeTransformedData = [];

        if ($feeType == FeeTypeEnum::FEE->value || empty($feeType)) {
            // get fee payment reports
            $dailyFeePaymentReports = $this->feePaymentMethodRepository->getStudentDailyCollectionReportData(
                $classroomId,
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $cancelledFee,
                $excludeVoucherFee,
                $academicYearId
            );

            $dailyFeePaymentReports->loadMissing([
                'student.father:id,student_id,first_name,middle_name,last_name,phone',
                'academicYear:id,academic_session',
                // 'student.classroomRoll:id,student_id,roll_no',
                'student.employment_category'
            ]);

            // store payment fee types title
            $reportFeeTypes = [];

            if ($dailyFeePaymentReports->count() > 0) {
                $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroom_id = $report?->student?->classroom_id;

                    $report?->student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('classroom_id', $classroom_id);
                        }
                    ]);

                    return $report;
                });

                $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                    if ($report->fee_payments->count() > 0) {
                        $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                            $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                        });
                    }
                });
            }

            // format fee payment report data
            $feeTransformedData = $this->formatDailyCollectionFeeData($dailyFeePaymentReports, $reportFeeTypes, $concession);
        }

        // merge registration fee payment report and fee installment payment report
        $dailyCollectionReportData = $feeTransformedData['reports'] ?? [];

        $dailyCollectionReport['reports'] = $dailyCollectionReportData;
        $dailyCollectionReport['total_amount'] = ($registrationFeeTransformedData['total_amount'] ?? 0) + ($feeTransformedData['total_amount'] ?? 0);
        $dailyCollectionReport['discount'] = ($registrationFeeTransformedData['discount'] ?? 0) + ($feeTransformedData['discount'] ?? 0);
        $dailyCollectionReport['payable_amount'] = ($registrationFeeTransformedData['payable_amount'] ?? 0) + ($feeTransformedData['payable_amount'] ?? 0);
        $dailyCollectionReport['total_paid'] = ($registrationFeeTransformedData['total_paid'] ?? 0) + ($feeTransformedData['total_paid'] ?? 0);
        $dailyCollectionReport['total_due'] = ($registrationFeeTransformedData['total_due'] ?? 0) + ($feeTransformedData['total_due'] ?? 0);

        return $dailyCollectionReport;
    }

    /*
    *   export student installment wise daily collection report in excel
    */
    public function exportStudentInstallmentWiseDailyCollectionReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $feeType = FeeTypeEnum::FEE->value;
        $currentSession = $request->current_session ?? false;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $payment_mode = $request->payment_mode ?? "";
        $classroomId = $classroom?->id;
        $cancelledFee = $request->cancelled_fee ?? false;
        $excludeVoucherFee = $request->exclude_voucher_fee ?? false;
        $concession = $request->concession ?? false;
        $academicYearId = $classroom?->academic_year_id;
        $installmentWiseDailyCollectionReport = [];

        if (!empty($classroomId)) {
            $installmentWiseDailyCollectionReport = $this->getStudentInstallmentWiseDailyCollectionReportData(
                $feeType,
                $currentSession,
                $start_date,
                $end_date,
                $payment_mode,
                $classroomId,
                $cancelledFee,
                $excludeVoucherFee,
                $concession,
                $academicYearId
            );
        }

        $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";
        $paymentMode = $request->payment_mode ?? "All";
        $feeMode = FeeTypeEnum::FEE->value;

        $export = new FeeInstallmentWiseDailyCollectionExport($installmentWiseDailyCollectionReport, $startDate, $endDate, $paymentMode, $feeMode);

        return Excel::download($export, "fee_installment_wise_daily_collection.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   helper method to get data for student installment wise daily collection report
    */
    private function getStudentInstallmentWiseDailyCollectionReportData(
        string $feeType = "",
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $classroomId = null,
        bool $cancelledFee = false,
        bool $excludeVoucherFee = false,
        bool $concession = false,
        int $academicYearId = null
    ) {
        $installmentWiseDailyCollectionReport = [];
        $feeTypePaidAmountArray = [];
        $feeTransformedData = [];

        if ($feeType == FeeTypeEnum::FEE->value || empty($feeType)) {
            // get fee payment reports
            $dailyFeePaymentReports = $this->feePaymentMethodRepository->getStudentDailyCollectionReportData(
                $classroomId,
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $cancelledFee,
                $excludeVoucherFee,
                $academicYearId
            );

            $dailyFeePaymentReports->loadMissing([
                'student.father:id,student_id,first_name,middle_name,last_name,phone',
                'academicYear:id,academic_session',
                'student.employment_category'
            ]);

            // store payment fee types title
            $reportFeeTypes = [];

            if ($dailyFeePaymentReports->count() > 0) {
                $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroom_id = $report?->student?->classroom_id;

                    $report?->student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('classroom_id', $classroom_id);
                        }
                    ]);

                    return $report;
                });

                $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                    if ($report->fee_payments->count() > 0) {
                        $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                            $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                        });
                    }
                });
            }

            // format fee payment report data
            $feeTransformedData = $this->formatInstallmentWiseDailyCollectionFeeData($dailyFeePaymentReports, $reportFeeTypes, $concession);
        }

        // merge registration fee payment report and fee installment payment report
        $installmentWiseDailyCollectionReportData = $feeTransformedData['reports'] ?? [];

        // merge fee type paid amount data
        $feeTypePaidAmountArray = $feeTransformedData['fee_type_paid_amount'] ?? [];

        if (!empty($registrationFeeTransformedData['fee_type_paid_amount'])) {
            foreach ($registrationFeeTransformedData['fee_type_paid_amount'] as $feeType => $amount) {
                $feeTypePaidAmountArray[$feeType] = ($feeTypePaidAmountArray[$feeType] ?? 0) + $amount;
            }
        }

        $installmentWiseDailyCollectionReport['reports'] = $installmentWiseDailyCollectionReportData;
        $installmentWiseDailyCollectionReport['fee_type_paid_amount'] = $feeTypePaidAmountArray;
        $installmentWiseDailyCollectionReport['amount'] = ($registrationFeeTransformedData['amount'] ?? 0) + ($feeTransformedData['amount'] ?? 0);
        $installmentWiseDailyCollectionReport['discount'] = ($registrationFeeTransformedData['discount'] ?? 0) + ($feeTransformedData['discount'] ?? 0);
        $installmentWiseDailyCollectionReport['payable'] = ($registrationFeeTransformedData['payable'] ?? 0) + ($feeTransformedData['payable'] ?? 0);
        $installmentWiseDailyCollectionReport['paid'] = ($registrationFeeTransformedData['paid'] ?? 0) + ($feeTransformedData['paid'] ?? 0);
        $installmentWiseDailyCollectionReport['due'] = ($registrationFeeTransformedData['due'] ?? 0) + ($feeTransformedData['due'] ?? 0);

        return $installmentWiseDailyCollectionReport;
    }


    /*
    *   export fee head wise student due report in excel
    */
    public function exportHeadWiseStudentDueReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $classroomId = $classroom?->id;
        $fromInstallment = $request->from_installment ?? null;
        $toInstallment = $request->to_installment ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $feeStructureId = $request->fee_structure_id ?? null;
        $includeLateFee = $request->late_fee ?? false;
        $includeVoucher = $request->voucher ?? false;
        $academicYearId = $classroom?->academic_year_id;
        $schoolId = getUserSchoolId();

        $headWiseReport = [];

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $headWiseReport = $this->getHeadWiseStudentDueReportData(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
                $includeLateFee,
                $includeVoucher,
                $schoolId,
                $academicYearId
            );
        }

        $classroomTitle = $classroom?->title ?? "";

        $export = new HeadWiseOutstandingDueReportExport($headWiseReport, $classroomTitle);

        return Excel::download($export, "Due Report For {$classroomTitle}.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get head wise student due report
    */
    private function getHeadWiseStudentDueReportData(
        $classroomId,
        $fromInstallment,
        $toInstallment,
        $studentStatus = "",
        $feeCategoryId = null,
        $feeStructureId = null,
        $includeLateFee = false,
        $includeVoucher = false,
        $schoolId = null,
        $academicYearId = null,
    ) {
        $headWiseReport = [];
        $installmentWiseReport = [];
        $studentWiseAmounts = [];
        $headWiseAmounts = [];
        $installmentWiseAmounts = [];
        $studentFeeDiscounts = [];
        $studentDueInstallments = [];
        $headWiseTotalDue = 0;
        $type = 'head_wise';

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
                $academicYearId
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentFeeDiscounts,
                    $studentDueInstallments,
                    $feeInstallments,
                    $transportFeeStructureSetting,
                    $type,
                    $includeLateFee,
                    $schoolId,
                    $academicYearId
                );
            }

            // to calculate general voucher and transport voucher due
            if (!empty($includeVoucher) && $includeVoucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $classroomId,
                    $studentStatus,
                    $academicYearId
                );

                $this->formatInstallmentWiseGeneralVouchers(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentDueInstallments,
                    $type,
                    $generalVouchers
                );

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($classroomId, $studentStatus, $academicYearId);

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers(
                            $headWiseReport,
                            $installmentWiseReport,
                            $studentWiseAmounts,
                            $headWiseAmounts,
                            $installmentWiseAmounts,
                            $studentDueInstallments,
                            $type,
                            $student,
                            $transportFeeStructureSetting,
                            $schoolId,
                            $academicYearId
                        );
                    }
                }
            }

            if (count($headWiseReport) > 0) {
                foreach ($headWiseReport as $studentId => $groupedDueReport) {
                    $total_due = 0;

                    foreach ($studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $headWiseReport[$studentId]['head_wise_amounts'] = $studentWiseAmounts[$studentId];
                    $headWiseReport[$studentId]['total'] = $total_due;
                    $headWiseReport[$studentId]['installments'] = !empty($studentDueInstallments[$studentId]) ? implode(',', $studentDueInstallments[$studentId]) : "";
                    $headWiseReport[$studentId]['no_of_due_installments'] = !empty($studentDueInstallments[$studentId]) ? count($studentDueInstallments[$studentId]) : 0;

                    $headWiseTotalDue += $total_due;
                }
            }
        }

        // sort reports by classroom roll
        usort($headWiseReport, function ($a, $b) {
            $rollNoA = $a['roll'] ?? null;
            $rollNoB = $b['roll'] ?? null;

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

        return [
            'reports' => $headWiseReport,
            'head_wise_amounts' => $headWiseAmounts,
            'total' => $headWiseTotalDue
        ];
    }

    /*
    *   export fee installment wise student due report in excel
    */
    public function exportInstallmentWiseStudentDueReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $classroomId = $classroom?->id;
        $fromInstallment = $request->from_installment ?? null;
        $toInstallment = $request->to_installment ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $feeStructureId = $request->fee_structure_id ?? null;
        $includeLateFee = $request->late_fee ?? false;
        $includeVoucher = $request->voucher ?? false;
        $academicYearId = $classroom?->academic_year_id;
        $schoolId = getUserSchoolId();
        $installmentWiseReport = [];

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $installmentWiseReport = $this->getInstallmentWiseStudentDueReport(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
                $includeLateFee,
                $includeVoucher,
                $schoolId,
                $academicYearId
            );
        }

        $classroomTitle = $classroom?->title ?? "";

        $export = new InstallmentWiseOutstandingDueReportExport($installmentWiseReport, $classroomTitle);

        return Excel::download($export, "Due Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get installment wise student due report
    */
    private function getInstallmentWiseStudentDueReport(
        $classroomId,
        $fromInstallment,
        $toInstallment,
        $studentStatus = "",
        $feeCategoryId = null,
        $feeStructureId = null,
        $includeLateFee = false,
        $includeVoucher = false,
        $schoolId = null,
        $academicYearId = null
    ) {
        $headWiseReport = [];
        $installmentWiseReport = [];
        $studentWiseAmounts = [];
        $headWiseAmounts = [];
        $installmentWiseAmounts = [];
        $studentFeeDiscounts = [];
        $studentDueInstallments = [];
        $installmentWiseTotalDue = 0;
        $type = 'installment_wise';

        if (!empty($classroomId) && !empty($fromInstallment) && !empty($toInstallment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $classroomId,
                $fromInstallment,
                $toInstallment,
                $studentStatus,
                $feeCategoryId,
                $feeStructureId,
                $academicYearId
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentFeeDiscounts,
                    $studentDueInstallments,
                    $feeInstallments,
                    $transportFeeStructureSetting,
                    $type,
                    $includeLateFee,
                    $schoolId,
                    $academicYearId
                );
            }

            // to calculate general voucher and transport voucher due
            if (!empty($includeVoucher) && $includeVoucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $classroomId,
                    $studentStatus,
                    $academicYearId
                );

                $this->formatInstallmentWiseGeneralVouchers(
                    $headWiseReport,
                    $installmentWiseReport,
                    $studentWiseAmounts,
                    $headWiseAmounts,
                    $installmentWiseAmounts,
                    $studentDueInstallments,
                    $type,
                    $generalVouchers
                );

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($classroomId, $studentStatus, $academicYearId);

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers(
                            $headWiseReport,
                            $installmentWiseReport,
                            $studentWiseAmounts,
                            $headWiseAmounts,
                            $installmentWiseAmounts,
                            $studentDueInstallments,
                            $type,
                            $student,
                            $transportFeeStructureSetting,
                            $schoolId,
                            $academicYearId
                        );
                    }
                }
            }

            if (count($installmentWiseReport) > 0) {
                foreach ($installmentWiseReport as $studentId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $installmentWiseReport[$studentId]['installment_wise_amounts'] = $studentWiseAmounts[$studentId];
                    $installmentWiseReport[$studentId]['total'] = $total_due;

                    $installmentWiseTotalDue += $total_due;
                }
            }
        }

        // sort reports by classroom roll
        usort($installmentWiseReport, function ($a, $b) {
            $rollNoA = $a['roll'] ?? null;
            $rollNoB = $b['roll'] ?? null;

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

        return [
            'reports' => $installmentWiseReport,
            'installment_wise_amounts' => $installmentWiseAmounts,
            'total' => $installmentWiseTotalDue
        ];
    }


    /*
    *   export survey response report
    */
    public function exportSurveyResponseReport(int $id)
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        $survey->loadMissing(['surveyResponses.user']);

        $surveyResponseReport = $this->formatSurveyResponseReportData($survey);

        $surveyTitle = $survey?->title ?? "";

        $export = new SurveyResponseReportExport($surveyResponseReport, $surveyTitle);

        return Excel::download($export, "Survey Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to format survey response report data
    */
    private function formatSurveyResponseReportData(array|object $survey)
    {
        $surveyResponseReport = [
            'questions' => [],
            'responses' => [],
        ];

        //survey questions
        if (count($survey?->surveyQuestions) > 0) {
            foreach ($survey->surveyQuestions as $question) {
                if (!isset($surveyResponseReport['questions'][$question?->id])) {
                    $surveyResponseReport['questions'][$question?->id] = $question->title;
                }
            }
        }

        // survey responses
        if (count($survey?->surveyResponses) > 0) {
            foreach ($survey->surveyResponses as $surveyResponse) {
                $surveyResponseId = $surveyResponse?->id;

                if (!isset($surveyResponseReport['responses'][$surveyResponseId])) {
                    $surveyResponseReport['responses'][$surveyResponseId] = [
                        'participant' => "{$surveyResponse?->user?->first_name} {$surveyResponse?->user?->middle_name} {$surveyResponse?->user?->last_name}",
                        'response_date' => !empty($surveyResponse->created_at) ? Carbon::parse($surveyResponse->created_at)->format('d M, Y') : ""
                    ];
                }

                $responses = !empty($surveyResponse->response) ? json_decode($surveyResponse->response) : null;

                if ($responses != null) {
                    foreach ($responses as $response) {
                        $questionId = $response?->survey_question_id;

                        if (!empty($questionId) && !isset($surveyResponseReport['responses'][$surveyResponseId]['answer'][$questionId])) {
                            $question = $this->surveyRepository->getSurveyQuestionById($questionId);

                            if ($question != null) {
                                $answer = $response?->answer;

                                if ($question?->question_type == SurveyQuestionType::DATE->value) {
                                    $answer = !empty($response->answer) ? Carbon::parse($response?->answer)->format('d M, Y H:i A') : "";
                                }

                                $surveyResponseReport['responses'][$surveyResponseId]['answer'][$questionId] = $answer;
                            }
                        }
                    }
                }
            }
        }

        return $surveyResponseReport;
    }


    /*
    *   export exam group report
    */
    public function exportExamGroupReport(Request $request)
    {
        $reportCardId = $request->report_card_id ?? null;
        $examGroupReport = [];

        if (!empty($reportCardId)) {
            $examGroupReport = $this->getExamGroupReportData($reportCardId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ExamGroupReportExport($examGroupReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Report Card Grouping.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get exam group report data
    */
    private function getExamGroupReportData(int $reportCardId)
    {
        $examGroupReport = [];

        $examGroups = $this->examGroupRepository->getActiveAllByReportCardId($reportCardId);

        if (count($examGroups) > 0) {
            $examGroups->loadMissing(['parentGroup:id,parent,title']);

            foreach ($examGroups as $examGroup) {
                $examGroupReport[] = [
                    'display_order' => $examGroup?->display_order,
                    'parent' => $examGroup?->parentGroup?->title,
                    'title' => $examGroup?->title,
                    'exam_type' => $examGroup?->grouping_type,
                    'weightage' => $examGroup?->weightage,
                ];
            }
        }

        return $examGroupReport;
    }


    /*
    *   export exam wise report
    */
    public function exportExamWiseReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $examId = $request->exam_id ?? null;
        $examWiseReport = [];
        $classroomTitle = "";
        $examTitle = "";

        if (!empty($classroomId) && !empty($examId)) {
            $examWiseReport = $this->getExamWiseReportData($classroomId, $examId);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $exam = $this->examRepository->getExamById($examId);

            $classroomTitle = $classroom?->title;
            $examTitle = $exam?->title;
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ExamWiseReportExport($examWiseReport, $schoolTitle, $academicYear, $classroomTitle, $examTitle);

        return Excel::download($export, "Exam Wise Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get exam wise report data
    */
    private function getExamWiseReportData(int $classroomId, int $examId)
    {
        $examWiseReportData = [];
        $examSubjects = [];

        $examWiseReports = $this->classroomRepository->getExamWiseReport($classroomId, $examId);

        foreach ($examWiseReports->groupBy('student_id') as $studentId => $examWiseReport) {
            $total_mark = [];
            $subjectIds = [];

            foreach ($examWiseReport as $item) {
                if (!isset($data[$studentId]['student'])) {
                    $examWiseReportData['reports'][$studentId]['student'] = [
                        'admission_no' => $item->admission_no,
                        'roll_no' => $item->roll_no,
                        'student_name' => "{$item?->first_name} {$item?->middle_name} {$item?->last_name}",
                        'father_name' => "{$item?->father_first_name} {$item?->father_middle_name} {$item?->father_last_name}",
                    ];
                }

                $examWiseReportData['reports'][$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                if (!in_array($item?->subject_id, $subjectIds)) {
                    $subjectIds[] = $item?->subject_id;

                    $examWiseReportData['reports'][$studentId]['exams'][$item->exam_id]['subjects'][] = [
                        'subject_title' => $item->subject_title,
                        'mark' => $item?->is_present ? ($item->mark ?? '') : 'AB',
                    ];

                    $examSubjects[] = $item->subject_title;

                    $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + $item->mark ?? 0;
                }

                $examWiseReportData['reports'][$studentId]['exams'][$item->exam_id]['total_mark'] = $total_mark[$item->exam_id] ?? 0;
            }
        }

        $examWiseReportData['exam_subjects'] = array_unique($examSubjects);

        if (!empty($examWiseReportData['reports'])) {
            // sort reports by classroom roll
            usort($examWiseReportData['reports'], function ($a, $b) {
                $rollNoA = $a['student']['roll_no'] ?? null;
                $rollNoB = $b['student']['roll_no'] ?? null;

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

        return $examWiseReportData;
    }

    /*
    *   export optional subject report
    */
    public function exportOptionalSubjectReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $subjectId = $request->subject_id ?? null;
        $optionalSubjectReport = [];
        $classroomTitle = "";

        if (!empty($classroomId) && !empty($subjectId)) {
            $optionalSubjectReport = $this->getOptionalSubjectReportData($classroomId, $subjectId);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new OptionalSubjectReportExport($optionalSubjectReport, $schoolTitle, $academicYear, $classroomTitle);

        return Excel::download($export, "Optional Subject Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get optional subject report data
    */
    private function getOptionalSubjectReportData(int $classroomId, int $subjectId)
    {
        $optionalSubjectReport = [];

        $students = $this->classroomRepository->getStudentClassWiseData($classroomId, $subjectId);

        if (count($students) > 0) {
            $students = $students->sortBy(function ($student) {
                return $student?->classroomRoll?->roll_no;
            });

            foreach ($students as $student) {
                $studentName = $student?->first_name . " " . $student?->middle_name . " " . $student?->last_name;
                $fatherName = $student?->father?->first_name . " " . $student?->father?->middle_name . " " . $student?->father?->last_name;

                $optionalSubjectReport[] = [
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'admission_no' => $student?->admission_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'birth_date' => !empty($student->birth_date_at) ? Carbon::parse($student->birth_date_at)->format('d-m-Y') : '',
                ];
            }
        }

        return $optionalSubjectReport;
    }


    /*
    *   export consolidated report
    */
    public function exportConsolidatedReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $consolidatedReport = [];
        $classroomTitle = "";
        $teacherName = "";

        if (!empty($classroomId)) {
            $consolidatedReport = $this->getConsolidatedReportData($classroomId);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroom?->loadMissing(['classTeacher:id,first_name,middle_name,last_name']);
            $classroomTitle = $classroom?->title;
            $teacherName = $classroom?->classTeacher?->first_name . " " . $classroom?->classTeacher?->middle_name . " " . $classroom?->classTeacher?->last_name;
        }

        $academicYear = getAcademicYear();

        $export = new ConsolidatedReportExport($consolidatedReport, $academicYear, $classroomTitle, $teacherName);

        return Excel::download($export, "Consolidated Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get consolidated report data
    */
    private function getConsolidatedReportData(int $classroomId)
    {
        $consolidatedReport = [];

        $consolids = $this->classroomRepository->getConsolidatedReportData($classroomId);

        if (count($consolids) > 0) {
            $consolids = $consolids?->sortBy(['roll_no']);
            foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                $total_mark = [];
                $subjectIds = [];

                foreach ($consolid as $item) {
                    if (!isset($data[$studentId]['student'])) {
                        $consolidatedReport['reports'][$studentId]['student'] = [
                            'admission_no' => $item->admission_no,
                            'roll_no' => $item->roll_no,
                            'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                        ];
                    }

                    if ($item?->is_co_scholastic == 'No' && (empty($subjectIds[$item->exam_id]) || !in_array($item?->subject_id, $subjectIds[$item->exam_id]))) {
                        $subjectIds[$item->exam_id][] = $item?->subject_id;

                        $consolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                        $consolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['subjects'][] = [
                            'subject_title' => $item->subject_title,
                            'mark' => $item->mark,
                        ];

                        $consolidatedReport['exam_subjects'][] = $item->subject_title;

                        $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + $item->mark;

                        $consolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['total_mark'] = number_format($total_mark[$item->exam_id], 2);
                    }
                }
            }

            $consolidatedReport['exam_subjects'] = !empty($consolidatedReport['exam_subjects']) ? array_unique($consolidatedReport['exam_subjects']) : [];
            $consolidatedReport['reports'] = !empty($consolidatedReport['reports']) ? array_values($consolidatedReport['reports']) : [];
        }

        return $consolidatedReport;
    }


    /*
    *   export final consolidated report
    */
    public function exportFinalConsolidatedReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $finalConsolidatedReport = [];
        $classroomTitle = "";
        $teacherName = "";

        if (!empty($classroomId)) {
            $finalConsolidatedReport = $this->getFinalConsolidatedReportData($classroomId);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroom?->loadMissing(['classTeacher:id,first_name,middle_name,last_name']);
            $classroomTitle = $classroom?->title;
            $teacherName = $classroom?->classTeacher?->first_name . " " . $classroom?->classTeacher?->middle_name . " " . $classroom?->classTeacher?->last_name;
        }

        $academicYear = getAcademicYear();

        $export = new FinalConsolidatedReportExport($finalConsolidatedReport, $academicYear, $classroomTitle, $teacherName);

        return Excel::download($export, "Final Consolidated Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get final consolidated report data
    */
    private function getFinalConsolidatedReportData(int $classroomId)
    {
        $finalConsolidatedReport = [];

        $consolids = $this->classroomRepository->getFinalConsolidatedReportData($classroomId);

        if (count($consolids) > 0) {
            $academicGradeScales = [];
            $resultCardConfiguration = null;
            $className = $this->classroomRepository->getClassNameByClassroomId($classroomId);

            if (!empty($className)) {
                $academicGradeScales = $this->getAcademicGradeScales($className->id);
                $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);

                if (!empty($resultCardConfiguration)) {
                    $resultCardConfiguration->loadMissing([
                        'examAttendances' => function ($query) use ($className) {
                            $query->where('exam_attendances.school_id', getUserSchoolId())
                                ->where('exam_attendances.academic_year_id', getAcademicYearId())
                                ->where('exam_attendances.class_name_id', $className?->id);
                        }
                    ]);
                }
            }

            $consolids = $consolids?->sortBy(['roll_no']);

            foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                $total_mark = [];
                $fullMarkArr = [];
                $subjectIds = [];

                $examAttendance = $resultCardConfiguration?->examAttendances?->where('student_id', $studentId)?->first();

                foreach ($consolid as $item) {
                    if (!isset($data[$studentId]['student'])) {
                        $finalConsolidatedReport['reports'][$studentId]['student'] = [
                            'admission_no' => $item->admission_no,
                            'roll_no' => $item->roll_no,
                            'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                        ];
                    }

                    if (empty($subjectIds[$item->exam_id]) || !in_array($item?->subject_id, $subjectIds[$item->exam_id])) {
                        $subjectIds[$item->exam_id][] = $item?->subject_id;

                        $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                        $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['subjects'][] = [
                            'subject_title' => $item->subject_title,
                            'mark' => $item?->is_co_scholastic == 'No' && $item?->is_marking == true ? $item->mark : $item?->grade,
                        ];

                        $finalConsolidatedReport['exam_subjects'][] = $item->subject_title;

                        if ($item?->is_co_scholastic == 'No' && $item?->is_marking == true) {
                            $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + ($item->mark ?? 0);
                            $fullMarkArr[$item->exam_id] = ($fullMarkArr[$item->exam_id] ?? 0) + ($item->full_mark ?? 0);

                            $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['total_mark'] = number_format($total_mark[$item->exam_id], 2);
                            $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['full_mark'] = number_format($fullMarkArr[$item->exam_id], 2);
                        }

                        $finalConsolidatedReport['reports'][$studentId]['grade'] = "";
                        $finalConsolidatedReport['reports'][$studentId]['percentage'] = "";

                        if (!isset($finalConsolidatedReport['reports'][$studentId]['rank'])) {
                            $finalConsolidatedReport['reports'][$studentId]['rank'] = $item?->rank;
                        }
                    }
                }

                if (!isset($finalConsolidatedReport['reports'][$studentId]['total_attendance'])) {
                    $finalConsolidatedReport['reports'][$studentId]['total_attendance'] = number_format($examAttendance?->present_day ?? 0, 2) . '/' . number_format($examAttendance?->working_day ?? 0, 2);
                }

                // calculate overall grade and percentage
                if (!empty($finalConsolidatedReport['reports'])) {
                    foreach ($finalConsolidatedReport['reports'] as $studentId => $report) {
                        if (!empty($report['exams'])) {
                            $grandTotalFullMark = 0;
                            $grandTotalMark = 0;

                            foreach ($report['exams'] as $examId => $exam) {
                                $totalMark = $exam['total_mark'] ?? 0;
                                $fullMark = $exam['full_mark'] ?? 0;
                                $percentage = $this->calculatePercentage($totalMark, $fullMark);
                                $grade = "";

                                if (count($academicGradeScales) >  0) {
                                    $grade = $this->getGrade($percentage, $academicGradeScales);
                                }

                                $finalConsolidatedReport['reports'][$studentId]['exams'][$examId]['grade'] = $grade;
                                $finalConsolidatedReport['reports'][$studentId]['exams'][$examId]['percentage'] = $percentage;

                                $grandTotalFullMark += $fullMark;
                                $grandTotalMark += $totalMark;
                            }

                            $overallPercentage = $this->calculatePercentage($grandTotalMark, $grandTotalFullMark);
                            $grade = "";

                            if (count($academicGradeScales) >  0) {
                                $grade = $this->getGrade($overallPercentage, $academicGradeScales);
                            }

                            $finalConsolidatedReport['reports'][$studentId]['grade'] = $grade;
                            $finalConsolidatedReport['reports'][$studentId]['percentage'] = $overallPercentage;
                            $finalConsolidatedReport['reports'][$studentId]['total_mark'] = number_format($grandTotalMark, 2);
                        }
                    }
                }
            }

            $finalConsolidatedReport['exam_subjects'] = !empty($finalConsolidatedReport['exam_subjects']) ? array_unique($finalConsolidatedReport['exam_subjects']) : [];
            $finalConsolidatedReport['reports'] = !empty($finalConsolidatedReport['reports']) ? array_values($finalConsolidatedReport['reports']) : [];
        }

        return $finalConsolidatedReport;
    }

    /*
    * helper method to get academic grade scale data
    */
    private function getAcademicGradeScales(int $classNameId)
    {
        $academicGradeScales = [];

        $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($classNameId);

        if (!empty($resultCardConfiguration)) {
            $resultCardConfiguration->loadMissing(['board']);
        }

        if ($resultCardConfiguration?->board?->title != null) {
            $academicGradeScale = $this->academicRepository->getAcademicGradeScaleByTitle($resultCardConfiguration?->board?->title);
        }

        if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems?->count() > 0) {
            foreach ($academicGradeScale?->academicGradeItems as $gradeScaleItem) {
                $academicGradeScales[] = [
                    'grade' => $gradeScaleItem?->title ?? "",
                    'min_mark' => $gradeScaleItem?->min_mark ?? 0,
                    'max_mark' => $gradeScaleItem?->max_mark ?? 0,
                ];
            }
        }

        if (empty($academicGradeScales)) {
            $academicGradeScales = [
                [
                    'grade' => 'A1',
                    'min_mark' => 91,
                    'max_mark' => 100,
                ],
                [
                    'grade' => 'A2',
                    'min_mark' => 81,
                    'max_mark' => 90,
                ],
                [
                    'grade' => 'B1',
                    'min_mark' => 71,
                    'max_mark' => 80,
                ],
                [
                    'grade' => 'B2',
                    'min_mark' => 70,
                    'max_mark' => 61,
                ],
                [
                    'grade' => 'C1',
                    'min_mark' => 51,
                    'max_mark' => 60,
                ],
                [
                    'grade' => 'C2',
                    'min_mark' => 41,
                    'max_mark' => 50,
                ],
                [
                    'grade' => 'D',
                    'min_mark' => 33,
                    'max_mark' => 40,
                ],
                [
                    'grade' => 'E',
                    'min_mark' => 0,
                    'max_mark' => 32,
                ],
            ];
        }

        return  $academicGradeScales;
    }

    /*
    * helper method to get academic grade
    */
    private function getGrade($percentage, $gradeMap)
    {
        $percentage = is_string($percentage) ? (float) $percentage : $percentage;
        $percentage = floor($percentage);

        foreach ($gradeMap as $gradeItem) {
            if ($percentage >= $gradeItem['min_mark'] && $percentage <= $gradeItem['max_mark']) {
                return $gradeItem['grade'];
            }
        }

        return "";
    }

    /*
    *   export subject wise report
    */
    public function exportSubjectWiseReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $subjectId = $request->subject_id ?? null;
        $withRoundOff = $request->with_round_off ?? null;
        $subjectWiseReport = [];
        $classroomTitle = "";
        $subjectTitle = "";

        if (!empty($classroomId) && !empty($subjectId)) {
            $subjectWiseReport = $this->getSubjectWiseReportData($classroomId, $subjectId, $withRoundOff);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $subject = $this->subjectRepository->getSubjectById($subjectId);
            $classroomTitle = $classroom?->title;
            $subjectTitle = $subject?->title;
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new SubjectWiseReportExport($subjectWiseReport, $schoolTitle, $academicYear, $classroomTitle, $subjectTitle);

        return Excel::download($export, "Subject Wise Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get subject wise report data
    */
    private function getSubjectWiseReportData(int $classroomId, int $subjectId, bool $withRoundOff = false)
    {
        $subjeteWiseData = [];
        $examWiseData = [];

        $subjectWiseReportData = $this->studentRepository->getSubjectWiseDataByClassroomIdAndSubjectId($classroomId, $subjectId);

        if (count($subjectWiseReportData) > 0) {
            $subjectWiseReportData = $subjectWiseReportData->sortBy(['roll_no']);

            foreach ($subjectWiseReportData as $reportData) {
                $studentId = $reportData->student_id;
                $examId = $reportData->exam_id;

                if (!empty($studentId)) {
                    if (!isset($subjeteWiseData[$studentId])) {
                        $subjeteWiseData[$studentId] = [
                            'student' => [
                                'roll_no' => $reportData?->roll_no,
                                'admission_no' => $reportData?->admission_no,
                                'student_name' => $reportData?->first_name . ' ' . $reportData?->middle_name . ' ' . $reportData?->last_name
                            ],
                            'total_mark' => 0,
                            'total_full_mark' => 0,
                            'total_percentage' => 0
                        ];
                    }

                    if (!empty($examId) && !isset($subjeteWiseData[$studentId]['exams'][$examId])) {
                        $subjeteWiseData[$studentId]['exams'][$examId] = [
                            // 'mark' => $withRoundOff ? round($reportData?->mark) : $reportData?->mark,
                            'exam_id' => $reportData?->exam_id,
                            'exam_title' => $reportData?->exam_title,
                            'mark' => $reportData?->mark,
                            'full_mark' => $reportData?->full_mark
                        ];

                        $subjeteWiseData[$studentId]['total_mark'] = ($subjeteWiseData[$studentId]['total_mark'] ?? 0) + ($reportData->mark ?? 0);
                        $subjeteWiseData[$studentId]['total_full_mark'] = ($subjeteWiseData[$studentId]['total_full_mark'] ?? 0) + ($reportData->full_mark ?? 0);
                    } else {
                        $subjeteWiseData[$studentId]['exams'] = [];
                    }

                    if (!empty($examId) && !isset($examWiseData[$examId])) {
                        $examWiseData[$examId] = [
                            'exam_id' => $reportData?->exam_id,
                            'exam_title' => $reportData?->exam_title,
                            'full_mark' => $reportData?->full_mark
                        ];
                    }
                }
            }
        }

        if (!empty($subjeteWiseData)) {
            $subjeteWiseData = array_map(function ($subjectData) {
                $totalMark = $subjectData['total_mark'] ?? 0;
                $totalFullMark = $subjectData['total_full_mark'] ?? 0;
                $percentage = $this->calculatePercentage($totalMark, $totalFullMark);
                $subjectData['total_percentage'] = $percentage;

                return $subjectData;
            }, $subjeteWiseData);
        }

        $subjectWiseReport = [
            'reports' => !empty($subjeteWiseData) ? array_values($subjeteWiseData) : [],
            'subject_exams' => !empty($examWiseData) ? array_values($examWiseData) : []
        ];

        return $subjectWiseReport;
    }

    /*
    *   export today attendance taken report
    */
    public function exportTodayAttendanceTakenReport(Request $request)
    {
        $attendanceReport = [];
        $attendanceReportDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $attendanceDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";

        if (!empty($attendanceDate)) {
            $attendanceReport = $this->getTodayAttendanceTakenReportData($attendanceDate);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new AttendanceTakenReportExport($attendanceReport, $schoolTitle, $academicYear, $attendanceReportDate);

        return Excel::download($export, "Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get today attendance taken report data
    */
    private function getTodayAttendanceTakenReportData(string $attendanceDate)
    {
        $attendanceReport = [];

        $classroomAttendanceData = $this->classroomAttendanceRepository->getTodayClassroomAttendance($attendanceDate);

        if (count($classroomAttendanceData) > 0) {
            $classroomAttendanceData->load([
                'classroomData',
                'takenUserData',
                'classroomAttendanceNote.userData',
                'updatedUserData',
                'updatedBy.user' => function ($query) {
                    $query->select('username', 'id');
                }
            ]);

            foreach ($classroomAttendanceData as $attendanceData) {
                $updatedDate = !empty($attendanceData->attendance_date_at) ? Carbon::parse($attendanceData->attendance_date_at)->format('d M, Y') : '';
                $updatedTime = !empty($attendanceData->attendance_time_at) ? Carbon::parse($attendanceData->attendance_time_at)->format('H:i:s A') : '';

                $attendanceReport[] = [
                    'class' => $attendanceData?->classroomData?->title,
                    'status' => $attendanceData?->is_attendance_taken == true ? 'Taken' : '',
                    'taken_by' => ($attendanceData?->takenUserData?->first_name ?? '') . " " . ($attendanceData?->takenUserData?->middle_name ?? '') . " " . ($attendanceData?->takenUserData?->last_name ?? ''),
                    'taken_on' => !empty($attendanceData->created_at) ? Carbon::parse($attendanceData->created_at)->format('d M, Y, H:i:s A') : '',
                    'updated_by' => $attendanceData?->is_attendance_allowed_on_back_date ? ($attendanceData?->updatedBy?->user?->first_name ?? '') . ' ' . ($attendanceData?->updatedBy?->user?->middle_name ?? '') . ' ' . ($attendanceData?->updatedBy?->user?->last_name ?? '') : '',
                    'updated_on' => $attendanceData?->is_attendance_allowed_on_back_date ? $updatedDate . ', ' . $updatedTime  : ''
                ];
            }
        }

        return $attendanceReport;
    }

    /*
    *   export today attendance not taken report
    */
    public function exportTodayAttendanceNotTakenReport(Request $request)
    {
        $attendanceReport = [];
        $attendanceReportDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $attendanceDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";

        if (!empty($attendanceDate)) {
            $attendanceReport = $this->getTodayAttendanceNotTakenReportData($attendanceDate);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new AttendanceNotTakenReportExport($attendanceReport, $schoolTitle, $academicYear, $attendanceReportDate);

        return Excel::download($export, "Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get today attendance not taken report data
    */
    private function getTodayAttendanceNotTakenReportData(string $attendanceDate)
    {
        $classroomAttendanceData = $this->classroomAttendanceRepository->getTodayClassroomAttendance($attendanceDate);

        $classroomIds = [];

        if (count($classroomAttendanceData) > 0) {
            foreach ($classroomAttendanceData as $attendanceData) {
                array_push($classroomIds, $attendanceData->classroom_id);
            }
        }

        $classroomsData = $this->classroomRepository->getActiveClassroomForTodayAtt($classroomIds);

        $attendanceReport = $classroomsData?->map(function ($classroom) {
            return [
                'class' => $classroom->title,
                'status' => 'Not Taken',
            ];
        })->all();

        return $attendanceReport;
    }

    /*
    *   export month wise attendance report
    */
    public function exportMonthWiseAttendanceReport(Request $request)
    {
        $monthWiseReport = [];
        $classroomId = $request->classroom_id ?? null;
        $month = $request->month ?? null;
        $year = $request->year ?? null;
        $classroomTitle = "";

        if (!empty($classroomId)) {
            $monthWiseReport = $this->getMonthWiseAttendanceReportData($classroomId, $month, $year);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new MonthWiseAttendanceReportExport($monthWiseReport, $schoolTitle, $academicYear, $classroomTitle);

        return Excel::download($export, "Month Wise Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get month wise attendance report data
    */
    private function getMonthWiseAttendanceReportData(int $classroomId, $month, $year)
    {
        $monthWiseReport = [];
        $allStudentIds = [];
        $studentCounts = [];

        $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceByMonthWise($classroomId, $month, $year);

        if (!empty($classroomAttendances)) {
            foreach ($classroomAttendances as $classAtt) {
                $attStudents = json_decode($classAtt['students']);
                foreach ($attStudents as $attStu) {
                    if (!empty($attStu)) {
                        $studentId = $attStu->student_id;
                        $attendanceStatus = $attStu->attendance_status;

                        if (!isset($studentCounts[$studentId])) {
                            $studentCounts[$studentId] = [
                                'present' => 0,
                                'absent' => 0,
                            ];
                        }

                        // Increment count based on attendance status
                        if ($attendanceStatus === 'present') {
                            $studentCounts[$studentId]['present']++;
                        } elseif ($attendanceStatus === 'absent') {
                            $studentCounts[$studentId]['absent']++;
                        }

                        $allStudentIds[] = $attStu->student_id;
                    }
                }
            }
        }

        $studentsArray = $this->studentRepository->getStudentForMonthReport($allStudentIds)->toArray();

        if (!empty($studentsArray)) {
            foreach ($studentsArray as $student) {
                $studentId = $student['id'];

                // Initialize the combined array
                $monthWiseReport[$studentId] = [
                    'roll_no' => $student['classroom_roll']['roll_no'] ?? '',
                    'name' => ($student['first_name'] ?? '') . ' ' . ($student['middle_name'] ?? '') . ' ' . ($student['last_name'] ?? ''),
                    'present' => $studentCounts[$studentId]['present'],
                    'absent' => $studentCounts[$studentId]['absent'],
                    'percentage' => 0,
                ];

                // Calculate attendance percentage
                $totalAttendance = $monthWiseReport[$studentId]['present'] + $monthWiseReport[$studentId]['absent'];
                $attendancePercentage = ($totalAttendance > 0) ? (($monthWiseReport[$studentId]['present'] / $totalAttendance) * 100) : 0;

                $monthWiseReport[$studentId]['percentage'] = round($attendancePercentage, 2);
            }
        }

        return $monthWiseReport;
    }

    /*
    *   export date wise class attendance report
    */
    public function exportDateWiseClassAttendanceReport(Request $request)
    {
        $dateWiseClassAttendanceReport = [];
        $classroomId = $request->classroom_id ?? null;
        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $classroomTitle = "";

        if (!empty($classroomId)) {
            $dateWiseClassAttendanceReport = $this->getDateWiseClassAttendanceReportData($classroomId, $startDate, $endDate);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new DateWiseClassAttendanceReportExport($dateWiseClassAttendanceReport, $schoolTitle, $academicYear, $classroomTitle);

        return Excel::download($export, "Date Wise Class Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get date wise class attendance report data
    */
    private function getDateWiseClassAttendanceReportData(int $classroomId, string $startDate = "", string $endDate = "")
    {
        $dateWiseClassAttendanceReport = [];

        $allStudentData = $this->studentRepository->getActiveDataByClassroomId($classroomId);

        if (count($allStudentData) > 0) {
            $allStudentData->load(['classroomData', 'classroomRoll']);
            $allStudents = $allStudentData->toArray();
            $dateWiseStudent = $this->classroomAttendanceRepository->getAttendanceByDateWise($startDate,  $endDate)->toArray();

            foreach ($allStudents as $student) {
                // Initialize counters for each student
                $presentCount = 0;
                $absentCount = 0;

                foreach ($dateWiseStudent as $attendance) {
                    $studentsAttendance = json_decode($attendance['students'], true);

                    foreach ($studentsAttendance as $attendanceRecord) {
                        if (!empty($attendanceRecord['student_id']) && $student['id'] == $attendanceRecord['student_id']) {
                            // Match found, update counters based on attendance status
                            if ($attendanceRecord['attendance_status'] == 'present') {
                                $presentCount++;
                            } elseif ($attendanceRecord['attendance_status'] == 'absent') {
                                $absentCount++;
                            }
                        }
                    }
                }

                // Calculate percentage for each student
                $totalAttendance = $presentCount + $absentCount;

                if ($totalAttendance > 0) {
                    $percentagePresent = ($presentCount / $totalAttendance) * 100;
                } else {
                    $percentagePresent = 0;
                }

                // Get classroom roll and name with error handling
                $classroomRoll = isset($student['classroom_roll']['roll_no']) ? $student['classroom_roll']['roll_no'] : 'N/A';
                $classroomName = isset($student['classroom_data']['title']) ? $student['classroom_data']['title'] : 'N/A';

                // Store attendance details for each student
                $dateWiseClassAttendanceReport[] = [
                    'name' => $student['first_name'] . ' ' . $student['middle_name'] . ' ' . $student['last_name'],
                    'roll_no' => $classroomRoll,
                    'class_name' => $classroomName,
                    'present' => $presentCount,
                    'absent' => $absentCount,
                    'percentage' => round($percentagePresent, 2)
                ];
            }
        }

        return $dateWiseClassAttendanceReport;
    }

    /*
    *   export class wise daily attendance report
    */
    public function exportClassWiseDailyAttendanceReport(Request $request)
    {
        $classWiseDailyAttendanceReport = [];
        $attendanceReportDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $attendanceDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";

        if (!empty($attendanceDate)) {
            $classWiseDailyAttendanceReport = $this->getClassWiseDailyAttendanceReportData($attendanceDate);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ClassWiseDailyAttendanceReportExport($classWiseDailyAttendanceReport, $schoolTitle, $academicYear, $attendanceReportDate);

        return Excel::download($export, "Class Wise Daily Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get class wise daily attendance report data
    */
    private function getClassWiseDailyAttendanceReportData(string $attendanceDate)
    {
        $classWiseDailyAttendanceReport = [];

        $attendanceDaily = $this->classroomAttendanceRepository->getAttendanceByClassWiseDaily($attendanceDate)->toArray();

        if (!empty($attendanceDaily)) {
            foreach ($attendanceDaily as $attendance) {
                foreach ($attendance as $record) {
                    $classroomId = $record['classroom_id'];
                    $classroomName = $record['classroom_data']['title'];

                    // Initialize counters if the class is not encountered yet
                    if (!isset($classWiseDailyAttendanceReport['reports'][$classroomId])) {
                        $classWiseDailyAttendanceReport['reports'][$classroomId] = [
                            'class_name' => $classroomName,
                            'total_student' => 0,
                            'present' => 0,
                            'absent' => 0,
                            'leave' => 0,
                        ];
                    }

                    // Increment total student count
                    $classWiseDailyAttendanceReport['reports'][$classroomId]['total_student'] += count(json_decode($record['students'], true));

                    // Iterate through students and update present and absent counts
                    foreach (json_decode($record['students'], true) as $student) {
                        if ($student['attendance_status'] == 'present') {
                            $classWiseDailyAttendanceReport['reports'][$classroomId]['present']++;
                        } elseif ($student['attendance_status'] == 'absent') {
                            $classWiseDailyAttendanceReport['reports'][$classroomId]['absent']++;
                            $classWiseDailyAttendanceReport['reports'][$classroomId]['leave']++;
                        }
                    }
                }
            }

            if (!empty($classWiseDailyAttendanceReport['reports'])) {
                $classWiseDailyAttendanceReport['total_student'] = collect($classWiseDailyAttendanceReport['reports'])->sum('total_student');
                $classWiseDailyAttendanceReport['total_present'] = collect($classWiseDailyAttendanceReport['reports'])->sum('present');
                $classWiseDailyAttendanceReport['total_absent'] = collect($classWiseDailyAttendanceReport['reports'])->sum('absent');
                $classWiseDailyAttendanceReport['total_leave'] = collect($classWiseDailyAttendanceReport['reports'])->sum('leave');
            }
        }

        return $classWiseDailyAttendanceReport;
    }


    /*
    *   export master class wise daily attendance report
    */
    public function exportMasterClassWiseDailyAttendanceReport(Request $request)
    {
        $classWiseDailyAttendanceReport = [];
        $attendanceReportDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $attendanceDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";

        if (!empty($attendanceDate)) {
            $classWiseDailyAttendanceReport = $this->getMasterClassWiseDailyAttendanceReportData($attendanceDate);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new MasterClassWiseDailyAttendanceReportExport($classWiseDailyAttendanceReport, $schoolTitle, $academicYear, $attendanceReportDate);

        return Excel::download($export, "Masterclass Wise Daily Attendance Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get master class wise daily attendance report data
    */
    private function getMasterClassWiseDailyAttendanceReportData(string $attendanceDate)
    {
        $classWiseDailyAttendanceReport = [];

        $attendanceDaily = $this->classroomAttendanceRepository->getAttendanceByClassWiseDaily($attendanceDate)->toArray();

        if (!empty($attendanceDaily)) {
            foreach ($attendanceDaily as $attendance) {
                foreach ($attendance as $record) {
                    $classroomId = $record['classroom_id'];
                    $classroomName = $record['classroom_data']['title'] ?? "";
                    $classNameId = $record['classroom_data']['class_name_id'] ?? null;
                    $className = $record['classroom_data']['class_name']['title'] ?? "";

                    // Initialize counters if the class is not encountered yet
                    if (!isset($classWiseDailyAttendanceReport['classroom_wise']['reports'][$classroomId])) {
                        $classWiseDailyAttendanceReport['classroom_wise']['reports'][$classroomId] = [
                            'class_name' => $classroomName,
                            'total_student' => 0,
                            'present' => 0,
                            'absent' => 0,
                            'leave' => 0,
                        ];
                    }

                    if (!isset($classWiseDailyAttendanceReport['class_wise']['reports'][$classNameId])) {
                        $classWiseDailyAttendanceReport['class_wise']['reports'][$classNameId] = [
                            'class_name' => $className,
                            'total_student' => 0,
                            'present' => 0,
                            'percentage' => 0
                        ];
                    }

                    // Increment total student count
                    $classWiseDailyAttendanceReport['classroom_wise']['reports'][$classroomId]['total_student'] += count(json_decode($record['students'], true));
                    $classWiseDailyAttendanceReport['class_wise']['reports'][$classNameId]['total_student'] += count(json_decode($record['students'], true));

                    // Iterate through students and update present and absent counts
                    foreach (json_decode($record['students'], true) as $student) {
                        if ($student['attendance_status'] == 'present') {
                            $classWiseDailyAttendanceReport['classroom_wise']['reports'][$classroomId]['present']++;
                            $classWiseDailyAttendanceReport['class_wise']['reports'][$classNameId]['present']++;
                        } elseif ($student['attendance_status'] == 'absent') {
                            $classWiseDailyAttendanceReport['classroom_wise']['reports'][$classroomId]['absent']++;
                            $classWiseDailyAttendanceReport['classroom_wise']['reports'][$classroomId]['leave']++;
                        }
                    }
                }
            }

            if (!empty($classWiseDailyAttendanceReport['classroom_wise']['reports'])) {
                $classWiseDailyAttendanceReport['classroom_wise']['total_student'] = collect($classWiseDailyAttendanceReport['classroom_wise']['reports'])->sum('total_student');
                $classWiseDailyAttendanceReport['classroom_wise']['total_present'] = collect($classWiseDailyAttendanceReport['classroom_wise']['reports'])->sum('present');
                $classWiseDailyAttendanceReport['classroom_wise']['total_absent'] = collect($classWiseDailyAttendanceReport['classroom_wise']['reports'])->sum('absent');
                $classWiseDailyAttendanceReport['classroom_wise']['total_leave'] = collect($classWiseDailyAttendanceReport['classroom_wise']['reports'])->sum('leave');
            }

            if (!empty($classWiseDailyAttendanceReport['class_wise']['reports'])) {
                $classWiseDailyAttendanceReport['class_wise']['reports'] = array_map(function ($attendanceData) {
                    $attendanceData['percentage'] = (($attendanceData['present'] ?? 0) / ($attendanceData['total_student'] ?? 0)) * 100;

                    return $attendanceData;
                }, $classWiseDailyAttendanceReport['class_wise']['reports']);

                $totalStudent = collect($classWiseDailyAttendanceReport['class_wise']['reports'])->sum('total_student');
                $totalPresent = collect($classWiseDailyAttendanceReport['class_wise']['reports'])->sum('present');
                $totalPercentage = ($totalPresent / $totalStudent) * 100;

                $classWiseDailyAttendanceReport['class_wise']['total_student'] = $totalStudent;
                $classWiseDailyAttendanceReport['class_wise']['total_present'] = $totalPresent;
                $classWiseDailyAttendanceReport['class_wise']['total_percentage'] = round($totalPercentage, 2);
            }
        }

        return $classWiseDailyAttendanceReport;
    }


    /*
    *   export student class wise document report
    */
    public function exportStudentClassWiseDocumentReport(Request $request)
    {
        $studentDocumentReports = [];
        $classroomId = $request->classroom_id ?? null;
        $documentCategoryId = $request->document_category_id ?? null;
        $classroomTitle = "";
        $documentCategoryTitle = "";

        if (!empty($classroomId) && !empty($documentCategoryId)) {
            // student document reports
            $studentDocumentReports = $this->getStudentClassWiseDocumentReportData($classroomId, $documentCategoryId);

            // classroom
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;

            // document category
            $documentCategory = $this->documentRepository->getDocumentCategoryById($documentCategoryId);
            $documentCategoryTitle = $documentCategory?->title;
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new StudentClassWiseDocumentReportExport($studentDocumentReports, $schoolTitle, $academicYear, $classroomTitle, $documentCategoryTitle);

        return Excel::download($export, "Student Class Wise Document Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get student class wise document report data
    */
    private function getStudentClassWiseDocumentReportData(int $classroomId, int $documentCategoryId)
    {
        $studentDocumentReports = [];

        $students = $this->studentRepository->getStudentDocumentReports($classroomId, $documentCategoryId);

        if (count($students) > 0) {
            $submittedSrNo = 1;

            $documentSubmitted = $students->filter(function ($student) {
                return $student?->studentDocuments?->count() > 0;
            })->map(function ($student) use (&$submittedSrNo) {
                return [
                    'sr_no' => $submittedSrNo++,
                    'full_name' => "{$student->first_name} {$student->middle_name} {$student->last_name}",
                    'admission_number' => $student?->admission_no,
                    'father_name' => ($student?->father?->first_name ?? '') . ' ' . ($student?->father?->middle_name ?? '') . ' ' . ($student?->father?->last_name ?? ''),
                    'father_mobile' => $student?->father?->phone
                ];
            })->toArray();

            $notSubmittedSrNo = 1;

            $documentNotSubmitted = $students->filter(function ($student) {
                return $student?->studentDocuments?->count() == 0;
            })->map(function ($student) use (&$notSubmittedSrNo) {
                return [
                    'sr_no' => $notSubmittedSrNo++,
                    'full_name' => "{$student->first_name} {$student->middle_name} {$student->last_name}",
                    'admission_number' => $student?->admission_no,
                    'father_name' => ($student?->father?->first_name ?? '') . ' ' . ($student?->father?->middle_name ?? '') . ' ' . ($student?->father?->last_name ?? ''),
                    'father_mobile' => $student?->father?->phone
                ];
            })->toArray();

            $studentDocumentReports['document_submitted'] = !empty($documentSubmitted) ? array_values($documentSubmitted) : [];
            $studentDocumentReports['document_not_submitted'] = !empty($documentNotSubmitted) ? array_values($documentNotSubmitted) : [];
        }

        return $studentDocumentReports;
    }

    /*
    *   export staff leave allocation
    */
    public function exportStaffLeaveAllocation(Request $request)
    {
        $staffType = $request->staff_type ?? "";
        $gender = $request->gender ?? "";
        $search = $request->search ?? "";

        $staffLeaveAllocations = $this->getStaffLeaveAllocationData($staffType, $gender, $search);

        $export = new StaffLeaveAllocationExport($staffLeaveAllocations, $staffType, $gender);

        return Excel::download($export, "Staff Leave Allocation.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *  helper method to get staff leave allocation data
    */
    private function getStaffLeaveAllocationData(string $staffType = "", string $gender = "", string $search = "")
    {
        $staffLeaveAllocations = [];

        $staffs = $this->staffRepository->getStaffForLeaveAllocation($staffType, $gender, $search);

        if (count($staffs) > 0) {
            $leaveTypes = $this->leaveRepository->getActiveLeaveTypesAll();

            $staffLeaveAllocations['reports'] = $staffs->map(function ($staff) use ($leaveTypes) {
                $leaveAllocations = [];

                if (count($leaveTypes) > 0) {
                    foreach ($leaveTypes as $leaveType) {
                        $leaveTypeId = $leaveType->id;

                        if (!isset($leaveAllocations[$leaveTypeId])) {
                            $leaveAllocations[$leaveTypeId] = [
                                'leave_type_id' => $leaveTypeId,
                                'leave_type' => $leaveType->title,
                                'days' => null
                            ];
                        }

                        if ($staff?->staffLeaveAllocations?->count() > 0) {
                            foreach ($staff?->staffLeaveAllocations as $staffLeaveAllocation) {
                                if ($staffLeaveAllocation->leave_type_id == $leaveTypeId) {
                                    $leaveAllocations[$leaveTypeId]['days'] = $staffLeaveAllocation?->days;
                                }
                            }
                        }
                    }
                }

                return [
                    'employee_id' => $staff->employee_id,
                    'staff' => $staff->first_name . ' ' . $staff->middle_name . ' ' . $staff->last_name,
                    'designation' => $staff?->designation?->name ?? "",
                    'leave_allocations' => !empty($leaveAllocations) ? array_values($leaveAllocations) : []
                ];
            })->toArray();

            $staffLeaveAllocations['leave_types'] = $leaveTypes?->toArray();
        }

        return $staffLeaveAllocations;
    }


    /*
    *   export ledger payment report
    */
    public function exportLedgerPaymentReport(Request $request)
    {
        // $search = $request->search_query ?? "";
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $bankLedgerId = $request->input('bank_ledger_id') ?? null;

        // salary setting
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        // fee setting
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        $paymentReport = [];
        $paymentSummary = [];

        // list($paymentReport, $paymentSummary) = $this->getLedgerPaymentReportData($search, $bankLedgerId, $start_date, $end_date);

        // ledger payments
        $ledgerPayments = $this->paymentRepository->getActiveList('', $bankLedgerId, $start_date, $end_date);

        list($paymentReport, $paymentSummary) = $this->mergeAndFormatLedgerPaymentData($paymentReport, $paymentSummary, $ledgerPayments);

        // if salary is integrated with account then merge salary payment report
        if ($isSalaryIntegratedWithAccount) {
            // staff salary payments
            $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredPublishedStaffSalaryPayments($bankLedgerId, $start_date, $end_date);

            list($paymentReport, $paymentSummary) = $this->mergeAndFormatStaffSalaryPaymentData($paymentReport, $paymentSummary, $staffSalaryPayments);

            // staff advance payments
            $staffAdvancePayments = $this->staffAdvancePaymentRepository->getStaffAdvancePaymentsForPaymentReport($bankLedgerId, $start_date, $end_date);

            list($paymentReport, $paymentSummary) = $this->mergeAndFormatStaffAdvancePaymentData($paymentReport, $paymentSummary, $staffAdvancePayments);
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
            $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getActiveFeeRefunds($refundMode, $start_date, $end_date);

            list($paymentReport, $paymentSummary) = $this->mergeAndFormatFeePaymentRefundData($paymentReport, $paymentSummary, $feePaymentRefunds);
        }

        // if not empty then sort by date
        if (!empty($paymentReport['reports'])) {
            usort($paymentReport['reports'], function ($a, $b) {
                return ($a['timestamp'] ?? 0) < ($b['timestamp'] ?? 0);
            });
        }

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new LedgerPaymentReportExport($paymentReport, $paymentSummary, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Inventory Payment Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get ledger payment report data
    */
    private function getLedgerPaymentReportData(string $search = "", int $bankLedgerId = null, string $startDate = "", string $endDate = "")
    {
        $paymentReport = [];
        $paymentSummary = [];

        $paymentReportData = $this->paymentRepository->getActiveList($search, $bankLedgerId, $startDate, $endDate);

        if (count($paymentReportData) > 0) {
            $paymentReportData->loadMissing(['ledger_payment_items.ledger']);

            // payment report
            $totalAmount = 0;

            $paymentReport['reports'] = $paymentReportData->map(function ($payment) use (&$totalAmount) {
                $totalAmount += $payment->total ?? 0;

                return [
                    'receipt_no' => $payment?->receipt_no,
                    'ledger' => $payment?->bankLedger?->title,
                    'payment_date' => !empty($payment->payment_date_at) ? Carbon::parse($payment->payment_date_at)->format('d-M-Y') : '',
                    'narration' => $payment?->description,
                    'amount' => $payment->total ?? 0
                ];
            })->toArray();

            $paymentReport['total_amount'] = $totalAmount;

            // payment summary
            foreach ($paymentReportData as $payment) {
                if ($payment?->ledger_payment_items?->count() > 0) {
                    foreach ($payment?->ledger_payment_items as $paymentItem) {
                        $ledgerId = $paymentItem?->ledger_id;

                        if (!isset($paymentSummary['reports'][$ledgerId])) {
                            $paymentSummary['reports'][$ledgerId] = [
                                'ledger' => $paymentItem?->ledger?->title,
                                'amount' => 0
                            ];
                        }

                        $amount = $paymentItem->amount ?? 0;

                        $paymentSummary['reports'][$ledgerId]['amount'] = ($paymentSummary['reports'][$ledgerId]['amount'] ?? 0) + $amount;
                        $paymentSummary['total_amount'] = ($paymentSummary['total_amount'] ?? 0) + $amount;
                    }
                }
            }
        }

        return [$paymentReport, $paymentSummary];
    }


    /**
     * helper method to merge and format ledger payment data
     *
     */
    protected function mergeAndFormatLedgerPaymentData(array $paymentReport, array $paymentSummary, object $ledgerPayments)
    {
        if (count($ledgerPayments) > 0) {
            foreach ($ledgerPayments as $ledgerPayment) {
                $paymentItems = [];

                if ($ledgerPayment?->ledger_payment_items?->count() > 0) {
                    foreach ($ledgerPayment->ledger_payment_items as $ledgerPaymentItem) {
                        $key = 'ledger_' . $ledgerPaymentItem?->ledger_id;
                        $amount = $ledgerPaymentItem->amount ?? 0;

                        $paymentItems[] = [
                            'ledger_title' => $ledgerPaymentItem?->ledger?->title,
                            'amount' => $amount
                        ];

                        // payment summary
                        if (!isset($paymentSummary['reports'][$key])) {
                            $paymentSummary['reports'][$key] = [
                                'ledger_title' => $ledgerPaymentItem?->ledger?->title,
                                'amount' => 0
                            ];
                        }

                        $paymentSummary['reports'][$key]['amount'] += $amount;
                        $paymentSummary['total_amount'] = ($paymentSummary['total_amount'] ?? 0) + $amount;
                    }
                }

                $paymentReport['reports'][] = [
                    'id' => $ledgerPayment->id,
                    'report_type' => 'ledger_payment',
                    'receipt_no' => $ledgerPayment->receipt_no,
                    'ledger_title' => $ledgerPayment?->bankLedger?->title,
                    'description' => $ledgerPayment->description,
                    'total_amount' => $ledgerPayment->total ?? 0,
                    'payment_date' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->format('d-M-Y') : '',
                    'timestamp' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->timestamp : '',
                    'payment_items' => $paymentItems
                ];

                $paymentReport['total_amount'] = ($paymentReport['total_amount'] ?? 0) + $ledgerPayment->total ?? 0;
            }
        }

        return [$paymentReport, $paymentSummary];
    }
    /**
     * helper method to merge and format staff salary payment data
     *
     */
    protected function mergeAndFormatStaffSalaryPaymentData(array $paymentReport, array $paymentSummary, object $staffSalaryPayments)
    {
        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $paymentItems = [];

                // earnings
                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $key = 'earning_type_' . $earning?->earning_type_id;
                        $ledgerTitle = $earning?->earningType?->title . '(Earning)';
                        $amount = $earning->amount ?? 0;

                        $paymentItems[] = [
                            'ledger_title' => $ledgerTitle,
                            'amount' => $amount
                        ];

                        // payment summary
                        if (!isset($paymentSummary['reports'][$key])) {
                            $paymentSummary['reports'][$key] = [
                                'ledger_title' => $ledgerTitle,
                                'amount' => 0
                            ];
                        }

                        $paymentSummary['reports'][$key]['amount'] += $amount;
                        $paymentSummary['total_amount'] = ($paymentSummary['total_amount'] ?? 0) + $amount;
                    }
                }

                // deductions
                if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentDeductions as $deduction) {
                        $key = 'deduction_type_' . $deduction?->deduction_type_id;
                        $ledgerTitle = $deduction?->deductionType?->title . '(Deduction)';
                        $amount = $deduction->amount ?? 0;

                        $paymentItems[] = [
                            'ledger_title' => $ledgerTitle,
                            'amount' => $amount
                        ];

                        // payment summary
                        if (!isset($paymentSummary['reports'][$key])) {
                            $paymentSummary['reports'][$key] = [
                                'ledger_title' => $ledgerTitle,
                                'amount' => 0
                            ];
                        }

                        $paymentSummary['reports'][$key]['amount'] += $amount;
                        $paymentSummary['total_amount'] = ($paymentSummary['total_amount'] ?? 0) - $amount;
                    }
                }

                $staffName = trim(implode(' ', [$staffSalaryPayment?->staff?->first_name, $staffSalaryPayment?->staff?->middle_name, $staffSalaryPayment?->staff?->last_name]));
                $paymentMonth = $staffSalaryPayment?->paymentMonth?->title;
                $paymentNote = $staffSalaryPayment->payment_note ?? '';
                $description = "Salary Payment of {$staffName} for the month of {$paymentMonth}, Note - {$paymentNote}";

                $paymentReport['reports'][] = [
                    'id' => $staffSalaryPayment->id,
                    'report_type' => 'staff_salary_payment',
                    'receipt_no' => $staffSalaryPayment->receipt_no,
                    'ledger_title' => $staffSalaryPayment?->ledger?->title,
                    'description' => $description,
                    'total_amount' => $staffSalaryPayment->paid_amount ?? 0,
                    'payment_date' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];

                $paymentReport['total_amount'] = ($paymentReport['total_amount'] ?? 0) + $staffSalaryPayment->paid_amount ?? 0;
            }
        }

        return [$paymentReport, $paymentSummary];
    }
    /**
     * helper method to merge and format staff advance payment data
     *
     */
    protected function mergeAndFormatStaffAdvancePaymentData(array $paymentReport, array $paymentSummary, object $staffAdvancePayments)
    {
        if (count($staffAdvancePayments) > 0) {
            foreach ($staffAdvancePayments as $staffAdvancePayment) {
                $paymentItems = [];

                // earning type
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                $key = 'earning_type_' . $earningType?->id;
                $ledgerTitle = $earningType?->title . '(Earning)';
                $amount = $staffAdvancePayment->paid_amount ?? 0;

                // payment sumary
                if (!isset($paymentSummary['reports'][$key])) {
                    $paymentSummary['reports'][$key] = [
                        'ledger_title' => $ledgerTitle,
                        'amount' => 0
                    ];
                }

                $paymentSummary['reports'][$key]['amount'] += $amount;
                $paymentSummary['total_amount'] = ($paymentSummary['total_amount'] ?? 0) + $amount;

                // payment report
                $paymentItems[] = [
                    'ledger_title' => $ledgerTitle,
                    'amount' => $amount
                ];

                $staffName = trim(implode(' ', [$staffAdvancePayment?->staff?->first_name, $staffAdvancePayment?->staff?->middle_name, $staffAdvancePayment?->staff?->last_name]));
                $paymentMonth = $staffAdvancePayment?->paymentMonth?->title;
                $description = "Extra/Advance Payment of {$staffName} for the month of {$paymentMonth}";

                $paymentReport['reports'][] = [
                    'id' => $staffAdvancePayment->id,
                    'report_type' => 'staff_advance_payment',
                    'receipt_no' => $staffAdvancePayment->receipt_no,
                    'ledger_title' => $staffAdvancePayment?->ledger?->title,
                    'description' => $description,
                    'total_amount' => $amount,
                    'payment_date' => !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];

                $paymentReport['total_amount'] = ($paymentReport['total_amount'] ?? 0) + $amount;
            }
        }

        return [$paymentReport, $paymentSummary];
    }
    /**
     * helper method to merge and format fee payment refund data
     *
     */
    protected function mergeAndFormatFeePaymentRefundData(array $paymentReport, array $paymentSummary, object $feePaymentRefunds)
    {
        if (count($feePaymentRefunds) > 0) {
            foreach ($feePaymentRefunds as $feePaymentRefund) {
                $paymentItems = [];

                $amount = $feePaymentRefund?->refund_amounts?->sum('refund_amount') ?? 0;
                $ledgerTitle = $feePaymentRefund?->refund_mode;

                // ledger
                $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($ledgerTitle);

                $key = 'ledger_' . $ledger?->id;

                // payment sumary
                if (!isset($paymentSummary['reports'][$key])) {
                    $paymentSummary['reports'][$key] = [
                        'ledger_title' => $ledgerTitle,
                        'amount' => 0
                    ];
                }

                $paymentSummary['reports'][$key]['amount'] += $amount;
                $paymentSummary['total_amount'] = ($paymentSummary['total_amount'] ?? 0) + $amount;

                // payment report
                $paymentItems[] = [
                    'ledger_title' => $ledgerTitle,
                    'amount' => $amount
                ];

                $studentName = trim(implode(' ', [$feePaymentRefund?->student?->first_name, $feePaymentRefund?->student?->middle_name, $feePaymentRefund?->student?->last_name]));
                $description = "Fee Refund of {$studentName}";

                $paymentReport['reports'][] = [
                    'id' => $feePaymentRefund->id,
                    'report_type' => 'fee_payment_refund',
                    'receipt_no' => $feePaymentRefund->receipt_no,
                    'ledger_title' => '',
                    'description' => $description,
                    'total_amount' => $amount,
                    'payment_date' => !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];

                $paymentReport['total_amount'] = ($paymentReport['total_amount'] ?? 0) + $amount;
            }
        }

        return [$paymentReport, $paymentSummary];
    }

    /*
    *   export ledger  report
    */
    public function exportLedgerReport(Request $request)
    {
        $ledgerId = $request->ledger_id ?? null;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $ledgerReport = [];
        $totalDebit = 0;
        $totalCredit = 0;
        $openingBalance = 0;
        $amountType = '';
        $ledgerTitle = '';
        $currentBalance = "";
        $closingBalance = 0;

        if ($ledgerId != null) {
            list(
                $ledgerReport,
                $totalDebit,
                $totalCredit,
                $openingBalance,
                $amountType,
                $ledgerTitle,
                $currentBalance,
                $closingBalance
            ) = $this->getLedgerReportData($ledgerId, $start_date, $end_date);
        }

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";

        $export = new LedgerReportExport(
            $ledgerReport,
            $ledgerTitle,
            $currentBalance,
            $closingBalance,
            $totalDebit,
            $totalCredit,
            $openingBalance,
            $amountType,
            $reportDateTitle
        );

        return Excel::download($export, "Ledger Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get ledger  report data
    */
    private function getLedgerReportData(int $ledgerId, string $startDate = "", string $endDate = "")
    {
        $ledgerReport = [];
        $openingBalance = 0;
        $amountType = '';
        $ledgerTitle = '';
        $totalDebit = 0;
        $totalCredit = 0;
        $currentBalance = "";
        $closingBalance = 0;

        $ledger = $this->ledgerRepository->getLedgerReportData($ledgerId, $startDate, $endDate);

        // ledger purchase
        if ($ledger != null) {
            $openingBalance = $ledger->opening_balance ?? 0;
            $amountType = $ledger->amount_type ?? '';
            $ledgerTitle = $ledger->title ?? '';

            if ($ledger->partyPurchases->count() > 0) {
                foreach ($ledger->partyPurchases as $purchase) {
                    $date = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-M-Y') : '';
                    $credit = $purchase->total ?? 0;

                    $ledgerReport[] = [
                        'timestamp' => !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->getTimestamp() : 0,
                        'date' => $date,
                        'ledger_title' => $purchase?->ledger?->title,
                        'voucher_type' => 'Purchase',
                        'receipt_no' => $purchase?->receipt_no,
                        'description' => $purchase?->description,
                        'debit' => 0,
                        'credit' => $credit
                    ];

                    $totalCredit += $credit;
                }
            }

            if ($ledger->purchases->count() > 0) {
                foreach ($ledger->purchases as $purchase) {
                    $date = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-M-Y') : '';
                    $debit = $purchase->total ?? 0;

                    $ledgerReport[] = [
                        'timestamp' => !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->getTimestamp() : 0,
                        'date' => $date,
                        'ledger_title' => $purchase?->ledger?->title,
                        'voucher_type' => 'Purchase',
                        'receipt_no' => $purchase?->receipt_no,
                        'description' => $purchase?->description,
                        'debit' => $debit,
                        'credit' => 0
                    ];

                    $totalDebit += $debit;
                }
            }

            // ledger payment
            if ($ledger->ledgerPaymentItems->count() > 0) {
                $ledgerPaymentIds = [];

                foreach ($ledger->ledgerPaymentItems as $ledgerPaymentItem) {
                    $ledgerPaymentId = $ledgerPaymentItem->ledger_payment_id;
                    $ledgerPayment = $ledgerPaymentItem->ledgerPayment;

                    if (!in_array($ledgerPaymentId, $ledgerPaymentIds)) {
                        array_push($ledgerPaymentIds, $ledgerPaymentId);

                        $date = !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->format('d-M-Y') : '';
                        $debit = $ledger->ledgerPaymentItems->where('ledger_payment_id', $ledgerPaymentId)->sum('amount') ?? 0;

                        $ledgerReport[] = [
                            'timestamp' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->getTimestamp() : 0,
                            'date' => $date,
                            'ledger_title' => $ledgerPayment?->bankLedger?->title,
                            'voucher_type' => 'Payment',
                            'receipt_no' => $ledgerPayment?->receipt_no,
                            'description' => $ledgerPayment?->description,
                            'debit' => $debit,
                            'credit' => 0
                        ];

                        $totalDebit += $debit;
                    }
                }
            }

            // calculate closing balance
            if (($amountType == LedgerAmountType::DEBIT->value ? ($openingBalance + $totalDebit) : ($totalDebit - $totalCredit)) > 0) {
                $closingBalance = ($openingBalance + $totalDebit) - $totalCredit;
                $currentBalance = "{$closingBalance}Dr";
            } else if (($amountType == LedgerAmountType::CREDIT->value ? ($openingBalance + $totalCredit) : ($totalCredit - $totalDebit)) > 0) {
                $closingBalance = ($openingBalance + $totalCredit) - $totalDebit;
                $currentBalance = "{$closingBalance}Cr";
            }

            // sort ledger report by date
            $this->sortLedgerReport($ledgerReport, 'timestamp');
        }

        return [
            $ledgerReport,
            $totalDebit,
            $totalCredit,
            $openingBalance,
            $amountType,
            $ledgerTitle,
            $currentBalance,
            $closingBalance
        ];
    }

    /*
    * Helper method to sort ledger report
    */
    private function sortLedgerReport(array &$array, string $key)
    {
        usort($array, function ($a, $b) use ($key) {
            $dateA = $a[$key] ?? null;
            $dateB = $b[$key] ?? null;

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

    /*
    *   export sale return report
    */
    public function exportSaleReturnReport(Request $request)
    {
        $search = $request->input('search_value') ?? '';
        $start_date = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        $end_date = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';

        $saleReturnReport = $this->getSaleReturnReportData($start_date, $end_date, $search);

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new SaleLedgerReturnReportExport(
            $saleReturnReport,
            $schoolTitle,
            $academicYear,
            $reportDateTitle
        );

        return Excel::download($export, "Sale Return Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get sale return report data
    */
    private function getSaleReturnReportData(string $startDate = "", string $endDate = "", string $search = "")
    {
        $saleReturnReport = [];

        $saleLedgerReturns = $this->saleRepository->getActiveAllForReturnReport($search, $startDate, $endDate);

        if (count($saleLedgerReturns) > 0) {
            $saleLedgerReturns->loadMissing(['ledger']);

            $srNo = 0;

            foreach ($saleLedgerReturns as $saleLedgerReturn) {
                $srNo++;

                $saleDate = !empty($saleLedgerReturn->return_date_at) ? Carbon::parse($saleLedgerReturn?->return_date_at)->format('d-M-Y') : "";
                $mobileNo = "";
                $ledger = "";

                if ($saleLedgerReturn?->return_type_for == 'Student') {
                    $mobileNo = $saleLedgerReturn?->student?->phone;
                    $ledger = ($saleLedgerReturn?->student?->first_name ?? '') . ' ' . ($saleLedgerReturn?->student?->middle_name ?? '') . ' ' . ($saleLedgerReturn?->student?->last_name ?? '');
                } else if ($saleLedgerReturn?->return_type_for == 'Teacher') {
                    $mobileNo = $saleLedgerReturn?->staff?->phone;
                    $ledger = ($saleLedgerReturn?->staff?->first_name ?? '') . ' ' . ($saleLedgerReturn?->staff?->middle_name ?? '') . ' ' . ($saleLedgerReturn?->staff?->last_name ?? '');
                }

                $products = [];

                if ($saleLedgerReturn?->saleLedgerReturnProducts?->count() > 0) {
                    foreach ($saleLedgerReturn?->saleLedgerReturnProducts as $saleReturnProduct) {
                        $products[] = [
                            'product_title' => $saleReturnProduct?->product?->title,
                            'quantity' => $saleReturnProduct?->quantity,
                            'rate' => $saleReturnProduct?->rate,
                            'total_amount' => $saleReturnProduct?->total_amount,
                        ];
                    }
                }

                $saleReturnReport['reports'][] = [
                    'sr_no' => $srNo,
                    'receipt_no' => $saleLedgerReturn?->receipt_no,
                    'party_account' => $saleLedgerReturn?->ledger?->title,
                    'sale_invoice_no' => $saleLedgerReturn?->sale_invoice_no,
                    'mobile_no' => $mobileNo,
                    'ledger' => $ledger,
                    'sale_date' => $saleDate,
                    'sub_total' => $saleLedgerReturn?->sub_total,
                    'discount' => $saleLedgerReturn?->total_discount,
                    'tax' => $saleLedgerReturn?->total_tax,
                    'total' => $saleLedgerReturn?->total,
                    'products' => $products
                ];

                $saleReturnReport['total_sub_total_amount'] = ($saleReturnReport['total_sub_total_amount'] ?? 0) + ($saleLedgerReturn->sub_total ?? 0);
                $saleReturnReport['total_discount_amount'] = ($saleReturnReport['total_discount_amount'] ?? 0) + ($saleLedgerReturn->total_discount ?? 0);
                $saleReturnReport['total_tax_amount'] = ($saleReturnReport['total_tax_amount'] ?? 0) + ($saleLedgerReturn->total_tax ?? 0);
                $saleReturnReport['total_amount'] = ($saleReturnReport['total_amount'] ?? 0) + ($saleLedgerReturn->total ?? 0);
            }
        }

        return $saleReturnReport;
    }

    /*
    *   export ledger receipt report
    */
    public function exportLedgerReceiptReport(Request $request)
    {
        $search = $request->search_query ?? "";
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $ledgerId = $request->input('ledger_id') ?? null;

        list($receiptReport, $receiptSummary) = $this->getLedgerReceiptReportData($search, $ledgerId, $start_date, $end_date);

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new LedgerReceiptReportExport($receiptReport, $receiptSummary, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Inventory Receipt Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get ledger receipt report data
    */
    private function getLedgerReceiptReportData(string $search = "", int $ledgerId = null, string $startDate = "", string $endDate = "")
    {
        $receiptReport = [];
        $receiptSummary = [];

        // account settngs
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        $paymentMode = '';

        if (($isFeeIntegratedWithAccount || $isRegistrationIntegratedWithAccount) && !empty($ledgerId)) {
            $ledger = $this->ledgerRepository->getLedgerByLedgerId($ledgerId);
            $paymentMode = $ledger->title ?? '';
        }

        // ledger receipts
        $ledgerReceipts = $this->receiptRepository->getActiveList($search, $ledgerId, $startDate, $endDate);

        list($receiptReport, $receiptSummary) = $this->mergeAndFormatLedgerReceiptData($receiptReport, $receiptSummary, $ledgerReceipts);

        // sale ledger due payments
        $saleLedgerPayments =  $this->saleRepository->getActiveSaleLedgerPayments($search, $ledgerId, $startDate, $endDate);

        list($receiptReport, $receiptSummary) = $this->mergeAndFormatSaleLedgerPaymentData($receiptReport, $receiptSummary, $saleLedgerPayments);

        // fee payments
        if ($isFeeIntegratedWithAccount) {
            $feePayments = $this->feePaymentMethodRepository->getFeePaymentsForAccountReceiptReport($search, $paymentMode, $startDate, $endDate);

            list($receiptReport, $receiptSummary) = $this->mergeAndFormatFeePaymentData($receiptReport, $receiptSummary, $feePayments);
        }

        // registration fee payments
        if ($isRegistrationIntegratedWithAccount) {
            $registrationFees = $this->feePaymentMethodRepository->getRegistrationFeesForReceiptReport($search, $paymentMode, $startDate, $endDate);

            list($receiptReport, $receiptSummary) = $this->mergeAndFormatRegistrationFeeData($receiptReport, $receiptSummary, $registrationFees);
        }

        if (!empty($receiptReport['reports'])) {
            // sort by date
            $receiptReport['reports'] = collect($receiptReport['reports'])->sortByDesc(function ($report) {
                return $report['timestamp'];
            })->values()->toArray();
        }

        return [$receiptReport, $receiptSummary];
    }

    /*
    * Helper method to merge and format ledger receipts data
    */
    private function mergeAndFormatLedgerReceiptData(array $receiptReport, array $receiptSummary, object $ledgerReceipts)
    {
        if (count($ledgerReceipts) > 0) {
            $ledgerReceipts->loadMissing(['ledger_receipt_items.ledger']);

            // receipt report
            foreach ($ledgerReceipts as $receipt) {
                $timestamp = !empty($receipt->receipt_date_at) ? Carbon::parse($receipt->receipt_date_at)->getTimestamp() : 0;
                $paymentItems = [];

                // receipt summary
                if ($receipt?->ledger_receipt_items?->count() > 0) {
                    foreach ($receipt?->ledger_receipt_items as $receiptItem) {
                        $ledgerId = $receiptItem?->ledger_id;
                        $key = 'ledger_' . $ledgerId;
                        $amount = $receiptItem->amount ?? 0;

                        if (!isset($paymentItems[$ledgerId])) {
                            $paymentItems[$ledgerId] = [
                                'ledger' => $receiptItem?->ledger?->title,
                                'amount' => 0
                            ];
                        }

                        $paymentItems[$ledgerId]['amount'] += $amount;

                        if (!isset($receiptSummary['reports'][$key])) {
                            $receiptSummary['reports'][$key] = [
                                'ledger' => $receiptItem?->ledger?->title,
                                'amount' => 0
                            ];
                        }

                        $receiptSummary['reports'][$key]['amount'] += $amount;
                        $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;
                    }
                }

                $receiptReport['reports'][] = [
                    'receipt_no' => $receipt?->receipt_no,
                    'ledger' => $receipt?->bankLedger?->title,
                    'receipt_date' => !empty($receipt->receipt_date_at) ? Carbon::parse($receipt->receipt_date_at)->format('d-M-Y') : '',
                    'narration' => $receipt?->description,
                    'amount' => $receipt->total ?? 0,
                    'timestamp' => $timestamp,
                    'payment_items' => $paymentItems
                ];

                $receiptReport['total_amount'] = ($receiptReport['total_amount'] ?? 0) + $receipt->total ?? 0;

                // receipt summary
                // if ($receipt?->ledger_receipt_items?->count() > 0) {
                //     foreach ($receipt?->ledger_receipt_items as $receiptItem) {
                //         $ledgerId = $receiptItem?->ledger_id;

                //         if (!isset($receiptSummary['reports'][$ledgerId])) {
                //             $receiptSummary['reports'][$ledgerId] = [
                //                 'ledger' => $receiptItem?->ledger?->title,
                //                 'amount' => 0
                //             ];
                //         }

                //         $amount = $receiptItem->amount ?? 0;

                //         $receiptSummary['reports'][$ledgerId]['amount'] = ($receiptSummary['reports'][$ledgerId]['amount'] ?? 0) + $amount;
                //         $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;
                //     }
                // }
            }
        }

        return [$receiptReport, $receiptSummary];
    }

    /*
    * Helper method to merge and format sale ledger payments data
    */
    private function mergeAndFormatSaleLedgerPaymentData(array $receiptReport, array $receiptSummary, object $saleLedgerPayments)
    {
        if (count($saleLedgerPayments) > 0) {
            foreach ($saleLedgerPayments as $saleLedgerPayment) {
                $timestamp = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->format('d-M-Y') : '';
                $description = $saleLedgerPayment->description;
                $paymentItems = [];
                $title = '';
                $key = "";
                $amount = $saleLedgerPayment->paid_amount ?? 0;

                if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student') {
                    if ($saleLedgerPayment?->saleLedger?->student?->ledger != null) {
                        $title = $saleLedgerPayment?->saleLedger?->student?->ledger?->title;
                        $key = 'ledger_' . $saleLedgerPayment?->saleLedger?->student?->ledger?->id;
                    } else {
                        $title = ($saleLedgerPayment?->saleLedger?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->last_name ?? '');
                        $key = 'student_' . $saleLedgerPayment?->saleLedger?->student_id;
                    }
                } else if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher') {
                    if ($saleLedgerPayment?->saleLedger?->staff?->ledger != null) {
                        $title = $saleLedgerPayment?->saleLedger?->staff?->ledger?->title;
                        $key = 'ledger_' . $saleLedgerPayment?->saleLedger?->staff?->ledger?->id;
                    } else {
                        $title = ($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '');
                        $key = 'staff_' . $saleLedgerPayment?->saleLedger?->staff_id;
                    }
                }

                $paymentItems[] = [
                    'ledger' => $title,
                    'amount' => $amount
                ];

                $receiptReport['reports'][] = [
                    'receipt_no' => $saleLedgerPayment->receipt_no,
                    'ledger' => $saleLedgerPayment?->bankLedger?->title,
                    'receipt_date' => $paymentDate,
                    'narration' => $description,
                    'amount' => $saleLedgerPayment->paid_amount ?? 0,
                    'timestamp' => $timestamp,
                    'payment_items' => $paymentItems
                ];

                $receiptReport['total_amount'] = ($receiptReport['total_amount'] ?? 0) + $saleLedgerPayment->paid_amount ?? 0;

                // receipt summary
                // $ledgerId = $saleLedgerPayment?->bankLedger?->id;

                // if (!isset($receiptSummary['reports'][$ledgerId])) {
                //     $receiptSummary['reports'][$ledgerId] = [
                //         'ledger' => $saleLedgerPayment?->bankLedger?->title,
                //         'amount' => 0
                //     ];
                // }

                // $amount = $saleLedgerPayment->paid_amount ?? 0;

                // $receiptSummary['reports'][$ledgerId]['amount'] = ($receiptSummary['reports'][$ledgerId]['amount'] ?? 0) + $amount;
                // $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;

                if (!isset($receiptSummary['reports'][$key])) {
                    $receiptSummary['reports'][$key] = [
                        'ledger' => $title,
                        'amount' => 0
                    ];
                }

                $receiptSummary['reports'][$key]['amount'] +=  $amount;
                $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;
            }
        }

        return [$receiptReport, $receiptSummary];
    }

    /*
    * Helper method to merge and format fee payments data
    */
    private function mergeAndFormatFeePaymentData(array $receiptReport, array $receiptSummary, object $feePayments)
    {

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
                $total_amount = $feePayment?->fee_payments?->sum('paid_amount') ?? 0;

                $paymentItems = [];

                // receipt summary
                if ($feePayment?->fee_payments?->count() > 0) {
                    foreach ($feePayment?->fee_payments as $paymentItem) {
                        $feeTypeId = $paymentItem->fee_type_id;
                        $key = 'fee_' . $feeTypeId;
                        $amount = $paymentItem->paid_amount ?? 0;

                        if (!isset($paymentItems[$feeTypeId])) {
                            $paymentItems[$feeTypeId] = [
                                'ledger' => $paymentItem?->feeType?->fee_type,
                                'amount' => 0
                            ];
                        }

                        $paymentItems[$feeTypeId]['amount'] += $amount;

                        if (!isset($receiptSummary['reports'][$key])) {
                            $receiptSummary['reports'][$key] = [
                                'ledger' => $paymentItem?->feeType?->fee_type,
                                'amount' => 0
                            ];
                        }

                        $receiptSummary['reports'][$key]['amount'] += $amount;
                        $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;
                    }
                }

                $receiptReport['reports'][] = [
                    'receipt_no' => $feePayment->receipt_no,
                    'ledger' => $feePayment->payment_mode,
                    'receipt_date' => $paymentDate,
                    'narration' => $description,
                    'amount' => $total_amount,
                    'timestamp' => $timestamp,
                    'payment_items' => $paymentItems
                ];

                $receiptReport['total_amount'] = ($receiptReport['total_amount'] ?? 0) + $total_amount;

                // receipt summary
                // if ($feePayment?->fee_payments?->count() > 0) {
                //     foreach ($feePayment?->fee_payments as $paymentItem) {
                //         $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($feePayment->payment_mode);
                //         $ledgerId = $ledger?->id;

                //         if (!isset($receiptSummary['reports'][$ledgerId])) {
                //             $receiptSummary['reports'][$ledgerId] = [
                //                 'ledger' => $feePayment->payment_mode,
                //                 'amount' => 0
                //             ];
                //         }

                //         $amount = $paymentItem->paid_amount ?? 0;

                //         $receiptSummary['reports'][$ledgerId]['amount'] = ($receiptSummary['reports'][$ledgerId]['amount'] ?? 0) + $amount;
                //         $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;
                //     }
                // }
            }
        }

        return [$receiptReport, $receiptSummary];
    }

    /*
    * Helper method to merge and format registration fee data
    */
    private function mergeAndFormatRegistrationFeeData(array $receiptReport, array $receiptSummary, object $registrationFees)
    {
        if (count($registrationFees) > 0) {
            foreach ($registrationFees as $registrationFee) {
                $timestamp = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->format('d-M-Y') : '';
                $description = "Registration Payment of {$registrationFee?->enquiry?->first_name} {$registrationFee?->enquiry?->middle_name} {$registrationFee?->enquiry?->last_name}, RegNo- {$registrationFee?->enquiry?->registration_no}";

                $paymentItems = [];
                $key = "registration_fee";
                $amount = $registrationFee->fee_amount ?? 0;

                $paymentItems[] = [
                    'ledger' => 'Registration Fee',
                    'amount' => $amount
                ];

                $receiptReport['reports'][] = [
                    'receipt_no' => $registrationFee->receipt_no,
                    'ledger' => $registrationFee?->payment_mode,
                    'receipt_date' => $paymentDate,
                    'narration' => $description,
                    'amount' => $registrationFee->fee_amount ?? 0,
                    'timestamp' => $timestamp,
                    'payment_items' => $paymentItems
                ];

                $receiptReport['total_amount'] = ($receiptReport['total_amount'] ?? 0) + $registrationFee->fee_amount ?? 0;

                // receipt summary
                // $ledger = $this->ledgerRepository->getLedgerByLedgerTitle($registrationFee->payment_mode);
                // $ledgerId = $ledger?->id;

                // if (!isset($receiptSummary['reports'][$ledgerId])) {
                //     $receiptSummary['reports'][$ledgerId] = [
                //         'ledger' => $registrationFee?->payment_mode,
                //         'amount' => 0
                //     ];
                // }

                // $amount = $registrationFee->fee_amount ?? 0;

                // $receiptSummary['reports'][$ledgerId]['amount'] = ($receiptSummary['reports'][$ledgerId]['amount'] ?? 0) + $amount;
                // $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;

                if (!isset($receiptSummary['reports'][$key])) {
                    $receiptSummary['reports'][$key] = [
                        'ledger' => 'Registration Fee',
                        'amount' => 0
                    ];
                }

                $receiptSummary['reports'][$key]['amount'] += $amount;
                $receiptSummary['total_amount'] = ($receiptSummary['total_amount'] ?? 0) + $amount;
            }
        }

        return [$receiptReport, $receiptSummary];
    }

    /*
    *   export head wise payment report
    */
    public function exportHeadWisePaymentReport(Request $request)
    {
        $paymentType = $request->payment_type ?? "";
        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $ledgerId = $request->legder_id ?? null;

        list($headWisePaymentReport, $headWiseSummary, $ledgerTitles) = $this->getHeadWisePaymentReportData($paymentType, $startDate, $endDate, $ledgerId);

        $export = new HeadWisePaymentReportExport($headWisePaymentReport, $headWiseSummary, $ledgerTitles, $paymentType);

        return Excel::download($export, "Head Wise Payment Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get head wise ledger payment report data
    */
    private function getHeadWisePaymentReportData(string $paymentType = "", string $startDate = "", string $endDate = "", int $ledgerId = null)
    {
        $headWisePaymentReport = [];
        $headWiseSummary = [];
        $ledgerTitles = [];

        // account settings
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

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

        return [$headWisePaymentReport, $headWiseSummary, $ledgerTitles];
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

    /*
    *   export day book report
    */
    public function exportDayBookReport(Request $request)
    {
        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $dayBookReport = $this->getDayBookReportData($startDate, $endDate);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new DayBookReportExport($dayBookReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Daybook Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get day book report data
    */
    private function getDayBookReportData(string $startDate = "", string $endDate = "")
    {
        // account settngs
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        $dayBookReport = [];

        // ledger payments
        $ledgerPaymentReport = $this->getLedgerPaymentData($startDate, $endDate);

        if (!empty($ledgerPaymentReport)) {
            $dayBookReport = array_merge($dayBookReport, $ledgerPaymentReport);
        }

        //purchases
        $purchaseReport = $this->getPurchaseData($startDate, $endDate);

        if (!empty($purchaseReport)) {
            $dayBookReport = array_merge($dayBookReport, $purchaseReport);
        }

        //sale returns
        $saleReturnReport = $this->getSaleReturnData($startDate, $endDate);

        if (!empty($saleReturnReport)) {
            $dayBookReport = array_merge($dayBookReport, $saleReturnReport);
        }

        // ledger sales
        $ledgerSaleReport = $this->getLedgerSaleData($startDate, $endDate);

        if (!empty($ledgerSaleReport)) {
            $dayBookReport = array_merge($dayBookReport, $ledgerSaleReport);
        }

        // sale ledger payment
        $saleLedgerPaymentReport = $this->getSaleLedgerPaymentData($startDate, $endDate);

        if (!empty($saleLedgerPaymentReport)) {
            $dayBookReport = array_merge($dayBookReport, $saleLedgerPaymentReport);
        }

        // ledger receipts
        $ledgerReceiptReport = $this->getLedgerReceiptData($startDate, $endDate);

        if (!empty($ledgerReceiptReport)) {
            $dayBookReport = array_merge($dayBookReport, $ledgerReceiptReport);
        }

        // if fee is integrated with account then merge fee payment report
        if ($isFeeIntegratedWithAccount) {
            // fee payment
            $feePaymentReport = $this->getFeePaymentData($startDate, $endDate);

            if (!empty($feePaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $feePaymentReport);
            }

            // fee refund
            $feeRefundReport = $this->getFeePaymentRefundData($startDate, $endDate);

            if (!empty($feeRefundReport)) {
                $dayBookReport = array_merge($dayBookReport, $feeRefundReport);
            }
        }

        // if salary is integrated with account then merge salary payment report
        if ($isSalaryIntegratedWithAccount) {
            // staff salary payment
            $staffSalaryPaymentReport = $this->getStaffSalaryPaymentData($startDate, $endDate);

            if (!empty($staffSalaryPaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $staffSalaryPaymentReport);
            }

            // staff advance payment
            $staffAdvancePaymentReport = $this->getStaffAdvancePaymentData($startDate, $endDate);

            if (!empty($staffAdvancePaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $staffAdvancePaymentReport);
            }
        }

        // if registration fee is integrated with account then merge registration fee report
        if ($isRegistrationIntegratedWithAccount) {
            // registration fee payment
            $registrationFeeReport = $this->getRegistrationFeePaymentData($startDate, $endDate);

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

        return $dayBookReport;
    }

    /*
    * Helper method to get ledger payment data
    */
    private function getLedgerPaymentData(string $startDate = '', string $endDate = '')
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
    * Helper method to get purchase data
    */
    private function getPurchaseData(string $startDate = '', string $endDate = '')
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
    * Helper method to get sale return data
    */
    private function getSaleReturnData(string $startDate = '', string $endDate = '')
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
    * Helper method to get ledger sale data
    */
    private function getLedgerSaleData(string $startDate = '', string $endDate = '')
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
    * Helper method to get sale ledger payment  data
    */
    private function getSaleLedgerPaymentData(string $startDate = '', string $endDate = '')
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
    * Helper method to get ledger receipt data
    */
    private function getLedgerReceiptData(string $startDate = '', string $endDate = '')
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
    * Helper method to get fee payment data
    */
    private function getFeePaymentData(string $startDate = '', string $endDate = '')
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

                        $narration .= ", Note - {$paymentMethod?->school_receipt_no}, SchoolReceiptNo - {$paymentMethod?->payment_note}";
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
    * Helper method to get fee payment refund  data
    */
    private function getFeePaymentRefundData(string $startDate = '', string $endDate = '')
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
    * Helper method to get staff salary payment  data
    */
    private function getStaffSalaryPaymentData(string $startDate = '', string $endDate = '')
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
    * Helper method to get staff advance payment  data
    */
    private function getStaffAdvancePaymentData(string $startDate = '', string $endDate = '')
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
    * Helper method to get registration fee payment  data
    */
    private function getRegistrationFeePaymentData(string $startDate = '', string $endDate = '')
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

    /*
    *   export purchase report
    */
    public function exportPurchaseReport(Request $request)
    {
        $partyAccountId = $request->party_account_id ?? null;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $purchaseReport = $this->getPurchaseReportData($partyAccountId, $start_date, $end_date);

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new PurchaseReportExport($purchaseReport, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Purchase Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get purchase report data
    */
    private function getPurchaseReportData(int $partyAccountId = null, string $startDate = "", string $endDate = "")
    {
        $purchaseReport = [];

        $purchases = $this->purchaseRepository->getActiveAllForReport($partyAccountId, $startDate, $endDate);

        if (count($purchases) > 0) {
            $totalAmount = 0;

            $purchaseReport['reports'] = $purchases->map(function ($purchase) use (&$totalAmount) {
                $purchase['purchase_date'] = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d M, Y') : '';

                $totalAmount += $purchase->total ?? 0;

                return $purchase;
            });

            $purchaseReport['total'] = $totalAmount;
        }

        return $purchaseReport;
    }

    /*
    *   export sale ledger report
    */
    public function exportSaleLedgerReport(Request $request)
    {
        $ledgerId = $request->ledger_id ?? null;
        $search = $request->search_value ?? '';
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $saleReport = $this->getSaleLedgerReportData($search, $start_date, $end_date, $ledgerId);

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new SaleLedgerReportExport($saleReport, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Sale Register Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get sale ledger report data
    */
    private function getSaleLedgerReportData(string $search = '', string $startDate = "", string $endDate = "", int $ledgerId = null)
    {
        $saleReport = [];

        $saleLedgers = $this->saleRepository->getActiveAllForReport($search, $startDate, $endDate, $ledgerId);

        if (count($saleLedgers) > 0) {
            $totalAmount = 0;
            $totalDueAmount = 0;
            $totalPaidAmount = 0;
            $totalPaymentModeAmount = 0;
            $totalTakenByAmount = 0;
            $paymentModeSummary = [];
            $takenBySummary = [];

            $saleReport['reports'] = $saleLedgers->map(function ($saleLedger) use (
                &$totalAmount,
                &$totalDueAmount,
                &$totalPaidAmount,
                &$totalPaymentModeAmount,
                &$totalTakenByAmount,
                &$paymentModeSummary,
                &$takenBySummary
            ) {
                $saleLedger['sale_date'] = !empty($saleLedger->sale_date_at) ? Carbon::parse($saleLedger->sale_date_at)->format('d M, Y') : '';
                $partyAccount = "";

                if ($saleLedger->sale_type_for == 'Student') {
                    $partyAccount = "{$saleLedger?->student?->first_name} {$saleLedger?->student?->middle_name} {$saleLedger?->student?->last_name}";
                } else if ($saleLedger->sale_type_for == 'Teacher') {
                    $partyAccount = "{$saleLedger?->staff?->first_name} {$saleLedger?->staff?->middle_name} {$saleLedger?->staff?->last_name}";
                }

                $saleLedger['party_account'] = $partyAccount;

                $paidAmount = $saleLedger->paid_amount ?? 0;
                $totalAmount += $saleLedger->total ?? 0;
                $totalDueAmount += $saleLedger->due_amount ?? 0;
                $totalPaidAmount += $paidAmount;

                // payment mode summary
                $bankLedgerId = $saleLedger?->bank_ledger_id;

                if (!isset($paymentModeSummary[$bankLedgerId])) {
                    $paymentModeSummary[$bankLedgerId] = [
                        'payment_mode' => $saleLedger?->bankLedger?->title,
                        'amount' => 0
                    ];
                }

                $paymentModeSummary[$bankLedgerId]['amount'] += $paidAmount;

                $totalPaymentModeAmount += $paidAmount;

                // taken by summary
                $userId = $saleLedger?->created_by;

                if (!isset($takenBySummary[$userId])) {
                    $takenBySummary[$userId] = [
                        'taken_by' => trim(implode(' ', [$saleLedger?->createdBy?->first_name, $saleLedger?->createdBy?->middle_name, $saleLedger?->createdBy?->last_name])),
                        'amount' => 0
                    ];
                }

                $takenBySummary[$userId]['amount'] += $paidAmount;

                $totalTakenByAmount += $paidAmount;

                return $saleLedger;
            });

            $saleReport['total'] = $totalAmount;
            $saleReport['total_due'] = $totalDueAmount;
            $saleReport['total_paid'] = $totalPaidAmount;
            $saleReport['total_payment_mode_amount'] = $totalPaymentModeAmount;
            $saleReport['total_taken_by_amount'] = $totalTakenByAmount;
            $saleReport['payment_mode_summary'] = $paymentModeSummary;
            $saleReport['taken_by_summary'] = $takenBySummary;
        }

        return $saleReport;
    }


    /*
    *   export product report
    */
    public function exportProductReport(Request $request)
    {
        $type = $request->type ?? '';
        $catId = $request->category_id ?? '';
        $subCatId = $request->sub_category_id ?? '';
        $search = $request->search_query ?? '';

        $productReport = $this->getProductReportData($catId, $subCatId, $search, $type);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ProductReportExport($productReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Products Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get product report data
    */
    private function getProductReportData($catId, $subCatId, $search, $type)
    {
        $productReport = [];

        $products = $this->productRepository->getActiveList($catId, $subCatId, $search, $type);

        if (count($products) > 0) {
            $productReport = $products->map(function ($product) {
                return [
                    'product_name' => $product->title,
                    'product_type' => $product->type,
                    'category_name' => $product->category_title,
                    'quantity' => $product->available_stock
                ];
            })->toArray();
        }

        return $productReport;
    }

    /*
    *   export product purchase report
    */
    public function exportProductPurchaseReport(Request $request)
    {
        $productId = $request->product_id ?? '';
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $productPurchaseReport = [];
        $product = null;
        $reportDateTitle = "";

        if (!empty(!empty($productId))) {
            if (!empty($start_date) && !empty($end_date)) {
                $productPurchaseReport = $this->getProductPurchaseReportData($productId, $start_date, $end_date);

                $startDate = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y');
                $endDate = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y');

                $reportDateTitle = "from {$startDate} to {$endDate}";
            }

            $product = $this->productRepository->getProductById($productId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ProductPurchaseReportExport($productPurchaseReport, $product, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Product Purchase Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get product purchase report data
    */
    private function getProductPurchaseReportData($productId, $startDate, $endDate)
    {
        $productPurchaseReport = [];

        $purchaseProducts = $this->purchaseRepository->getActiveAllTransactionPurchase($productId, $startDate, $endDate);

        if (count($purchaseProducts) > 0) {
            $totalQuantity = 0;
            $totalAmount = 0;

            $productPurchaseReport['reports'] = $purchaseProducts->map(function ($purchaseProduct) use (&$totalQuantity, &$totalAmount) {
                $totalQuantity += $purchaseProduct->quantity ?? 1;
                $totalAmount += $purchaseProduct->amount ?? 0;

                return [
                    'date' => !empty($purchaseProduct->purchase->purchase_date_at) ? Carbon::parse($purchaseProduct->purchase->purchase_date_at)->format('d-M-Y') : '',
                    'name' => $purchaseProduct?->purchase?->partyLedger?->title,
                    'quantity' => $purchaseProduct->quantity,
                    'rate' => $purchaseProduct->rate,
                    'tax' => 0,
                    'discount' => 0,
                    'amount' => $purchaseProduct->amount,
                ];
            })->toArray();

            $productPurchaseReport['total_quantity'] = $totalQuantity;
            $productPurchaseReport['total_tax'] = 0;
            $productPurchaseReport['total_discount'] = 0;
            $productPurchaseReport['total_amount'] = $totalAmount;
        }

        return $productPurchaseReport;
    }

    /*
    *   export product sale report
    */
    public function exportProductSaleReport(Request $request)
    {
        $productId = $request->product_id ?? '';
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $productSaleReport = [];
        $product = null;
        $reportDateTitle = "";

        if (!empty(!empty($productId))) {
            if (!empty($start_date) && !empty($end_date)) {
                $productSaleReport = $this->getProductSaleReportData($productId, $start_date, $end_date);

                $startDate = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y');
                $endDate = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y');

                $reportDateTitle = "from {$startDate} to {$endDate}";
            }

            $product = $this->productRepository->getProductById($productId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ProductSaleReportExport($productSaleReport, $product, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Product Sale Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get product sale report data
    */
    private function getProductSaleReportData($productId, $startDate, $endDate)
    {
        $productSaleReport = [];

        $saleLedgerProducts = $this->saleRepository->getActiveAllTransactionSale($productId, $startDate, $endDate);

        if (count($saleLedgerProducts) > 0) {
            $totalQuantity = 0;
            $totalTax = 0;
            $totalDiscount = 0;
            $totalAmount = 0;

            $productSaleReport['reports'] = $saleLedgerProducts->map(function ($saleLedgreProduct) use (&$totalQuantity, &$totalTax, &$totalDiscount, &$totalAmount) {
                $name = "";

                if ($saleLedgreProduct?->saleLedger?->sale_type_for == 'Student') {
                    $student = $saleLedgreProduct?->saleLedger?->student;
                    $name = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                } else if ($saleLedgreProduct?->saleLedger?->sale_type_for == 'Teacher') {
                    $staff = $saleLedgreProduct?->saleLedger?->staff;
                    $name = "{$staff?->first_name} {$staff?->middle_name} {$staff?->last_name}";
                }

                $totalQuantity += $saleLedgreProduct->quantity ?? 1;
                $totalTax += $saleLedgreProduct->tax_amount ?? 0;
                $totalDiscount += $saleLedgreProduct->discount_amount ?? 0;
                $totalAmount += $saleLedgreProduct->total_amount ?? 0;

                return [
                    'date' => !empty($saleLedgreProduct->saleLedger->sale_date_at) ? Carbon::parse($saleLedgreProduct->saleLedger->sale_date_at)->format('d-M-Y') : '',
                    'name' => $name,
                    'quantity' => $saleLedgreProduct->quantity,
                    'rate' => $saleLedgreProduct->rate,
                    'tax_amount' => $saleLedgreProduct->tax_amount,
                    'discount_amount' => $saleLedgreProduct->discount_amount,
                    'amount' => $saleLedgreProduct->total_amount,
                ];
            })->toArray();

            $productSaleReport['total_quantity'] = $totalQuantity;
            $productSaleReport['total_tax_amount'] = $totalTax;
            $productSaleReport['total_discount_amount'] = $totalDiscount;
            $productSaleReport['total_amount'] = $totalAmount;
        }

        return $productSaleReport;
    }

    /*
    *  download product import template
    */
    public function downloadProductImportTemplate()
    {
        try {
            $export = new ProductImportTemplateExport();

            return Excel::download($export, "Product Import Template.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('import_item.create_list')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *   export product location report
    */
    public function exportProductLocationReport(Request $request)
    {
        $status = $request->status ?? '';
        $productId = $request->product_id ?? null;
        $search = $request->search ?? '';

        $productLocationReport = $this->getProductLocationReportData($status, $productId, $search);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new ProductLocationReportExport($productLocationReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Product Location Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get product location report data
    */
    private function getProductLocationReportData(string $status = '', int $productId = null, string $search = '')
    {
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
                    'allocate_date' => !empty($productLocationAllocation->allocate_date) ? Carbon::parse($productLocationAllocation->allocate_date)->format('d-M-y') : ''
                ];
            }
        }

        return $productLocationReport;
    }

    /*
    *  download question import template
    */
    public function downloadQuestionImportTemplate()
    {
        try {
            $export = new QuestionImportTemplateExport();

            return Excel::download($export, "Question Import Template.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return redirect()->route('online_exam.import_question')->with(['error' => 'Something goes wrong.']);
        }
    }

    /*
    *   export virtual exam summary report
    */
    public function exportVirtualExamSummaryReport(Request $request)
    {
        $examSummaryReport = [];
        $reportDateTitle = "";
        $reportDate = date("d-M-Y");

        if (!empty($request->start_date) && !empty($request->end_date)) {
            $startDate = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString();
            $endDate = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString();

            $examSummaryReport = $this->getVirtualExamSummaryReportData($startDate, $endDate);

            $reportDateTitle = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') . " to " . Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y');
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new VirtualExamSummaryReportExport($examSummaryReport, $schoolTitle, $academicYear, $reportDateTitle, $reportDate);

        return Excel::download($export, "Online Exam Summary Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to virtual exam summary report data
    */
    private function getVirtualExamSummaryReportData(string $startDate, string $endDate)
    {
        $examSummaryReport = [];

        $virtualExams = $this->virtualExamRepository->getVirtualExamSummaryData($startDate, $endDate);

        if (count($virtualExams)) {
            $examSummaryReport = $virtualExams->map(function ($virtualExam) {
                $startDate = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
                $startTime = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';

                return [
                    'exam_title' => $virtualExam->title,
                    'exam_code' => $virtualExam->exam_code,
                    'start_time' => "{$startDate} {$startTime}",
                    'class_title' => $virtualExam?->className?->title,
                    'subject_title' => $virtualExam?->subject?->title,
                    'participated' => 0, // need to work on this
                    'not_participated' => 0, // need to work on this
                ];
            })->toArray();
        }

        return $examSummaryReport;
    }

    /*
    *  download staff salary import template
    */
    public function downloadStaffSalaryImportTemplate()
    {
        try {
            $staffData = $this->getStaffEarningData();

            $export = new StaffSalaryImportTemplateExport($staffData);

            return Excel::download($export, "Salary Import Template.xlsx", \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {

            return redirect()->route('salary.import_staff_earnings')->with(['error' => 'Something goes wrong.']);
        }
    }

    /**
     * helper method to get staff earning data
     *
     */
    private function getStaffEarningData()
    {
        $staffData = [];

        // staff earnings
        $staffEarnings = $this->staffEarningRepository->getActiveStaffEarningsForImport();

        if (count($staffEarnings) > 0) {
            // earning types
            $earningTypes = $this->earningTypeRepository->getActiveAll()?->keyBy('id')?->toArray();

            // deductions types
            $deductionTypes = $this->deductionTypeRepository->getActiveAll()?->keyBy('id')?->toArray();

            // Basic Earning type
            $basicEarningType = $this->earningTypeRepository->getDefaultEarningTypeByTitle('Basic');

            $srNo = 1;

            foreach ($staffEarnings as $staffEarning) {
                // earnings
                $earnings = [];

                $earnings[$basicEarningType?->title] = [
                    'expression' => '',
                    'amount' => $staffEarning?->basic_pay ?? 0
                ];

                if (!empty($staffEarning->earnings)) {
                    foreach (json_decode($staffEarning->earnings, true) as $earning) {
                        $earningTypeId = $earning['earning_type_id'] ?? null;
                        $earningTypeTitle = $earningTypes[$earningTypeId]['title'] ?? '';

                        if ($earningTypeId != $basicEarningType?->id && $basicEarningType?->title !=  $earningTypeTitle) {
                            $earnings[$earningTypeTitle] = [
                                'expression' => $earning['expression'] ?? null,
                                'amount' => $earning['amount'] ?? null
                            ];
                        }
                    }
                }

                // deducitons
                $deductions = [];

                if (!empty($staffEarning->deductions)) {
                    foreach (json_decode($staffEarning->deductions, true) as $deduction) {
                        $deductionTypeId = $deduction['deduction_type_id'] ?? null;

                        $deductionTypeTitle = $deductionTypes[$deductionTypeId]['title'] ?? '';

                        $deductions[$deductionTypeTitle] = [
                            'expression' => $deduction['expression'] ?? null,
                            'amount' => $deduction['amount'] ?? null
                        ];
                    }
                }

                $staffData[] = [
                    'sr_no' => $srNo,
                    'unique_id' => $staffEarning?->staff_id,
                    'staff_name' => trim(implode(' ', [$staffEarning?->staff?->first_name, $staffEarning?->staff?->middle_name, $staffEarning?->staff?->last_name])),
                    'scale_name' => $staffEarning?->payScale?->title,
                    'employee_id' => (string) $staffEarning?->staff?->employee_id ?? '',
                    'earnings' => $earnings,
                    'deductions' => $deductions,
                ];

                $srNo++;
            }
        }

        return $staffData;
    }

    /*
    *   export staff bank statement report
    */
    public function exportStaffBankStatement(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;
        $staffBankStatementReport = [];
        $paymentMonthTitle = "";

        if (!empty($paymentMonthId)) {
            // payment month
            $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($paymentMonthId);

            $paymentMonthTitle = $paymentMonth->title ?? "";

            $staffBankStatementReport = $this->getStaffBankStatementReportData($paymentMonthId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new StaffSalaryBankStatementReportExport($staffBankStatementReport, $schoolTitle, $academicYear, $paymentMonthTitle);

        return Excel::download($export, "Bank Statement.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to staff bank statement report data
    */
    private function getStaffBankStatementReportData(int $paymentMonthId)
    {
        // salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryBankStatementReport($paymentMonthId);

        $staffBankStatementReport = [];

        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $paidAmount = (int) $staffSalaryPayment?->paid_amount ?? 0;

                $staffBankStatementReport['staff_salary_payments'][] = [
                    'employee_id' => $staffSalaryPayment?->staff?->employee_id,
                    'staff_name' => $staffSalaryPayment?->staff?->first_name . ' ' . $staffSalaryPayment?->staff?->middle_name . ' ' . $staffSalaryPayment?->staff?->last_name,
                    'uan' => $staffSalaryPayment?->staff?->uan,
                    'bank_account_no' => $staffSalaryPayment?->staff?->bank_account_no,
                    'ifsc' => $staffSalaryPayment?->staff?->ifsc,
                    'designation' => $staffSalaryPayment?->staff?->designation?->name,
                    'paid_amount' => $paidAmount,
                ];

                $staffBankStatementReport['total_paid'] = ($staffBankStatementReport['total_paid'] ?? 0) + $paidAmount;
            }
        }

        return  $staffBankStatementReport;
    }

    /*
    *   export staff export
    */
    public function exportStaff(Request $request)
    {
        $orderText = $request->input('order_text') ?? null;
        $staffDepartmentId = $request->input('staff_department') ?? null;
        $staffDesignationId = $request->input('staff_designation') ?? null;
        $staffHouseId = $request->input('staff_house') ?? null;
        $staffType = $request->input('staff_type') ?? "";
        $staffJobType = $request->input('staff_job_type') ?? "";
        $staffRoleType = $request->input('staff_role_type') ?? "";
        $staffSearch = $request->input('staff_search') ?? "";

        $staffReport = $this->staffRepository->getActiveAllStaff($orderText, $staffDepartmentId, $staffDesignationId, $staffHouseId, $staffType, $staffJobType, $staffRoleType, $staffSearch);

        $staffReport?->loadMissing(['staffCustomFields']);

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::TEACHER->value);

        $export = new StaffExport($staffReport, $customFields?->toArray());

        return Excel::download($export, "Staffs.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export inactive staff export
    */
    public function exportInActiveStaff(Request $request)
    {
        $orderText = $request->input('order_text') ?? null;
        $staffDepartmentId = $request->input('staff_department') ?? null;
        $staffDesignationId = $request->input('staff_designation') ?? null;
        $staffHouseId = $request->input('staff_house') ?? null;
        $staffType = $request->input('staff_type') ?? "";
        $staffJobType = $request->input('staff_job_type') ?? "";
        $staffRoleType = $request->input('staff_role_type') ?? "";
        $staffSearch = $request->input('staff_search') ?? "";

        $staffReport = $this->staffRepository->getInactiveAll($orderText, $staffDepartmentId, $staffDesignationId, $staffHouseId, $staffType, $staffJobType, $staffRoleType, $staffSearch);

        $staffReport?->loadMissing(['staffCustomFields']);

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::TEACHER->value);

        $export = new StaffExport($staffReport, $customFields?->toArray());

        return Excel::download($export, "InActiveStaffs.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    *   export staff cancelled salary report
    */
    public function exportStaffCanceledSalaryReport(Request $request)
    {
        $staffId = $request->staff_id ?? null;
        $paymentMonthId = $request->payment_month_id ?? null;

        $staffCancelledSalaryReport = $this->getStaffCanceledSalaryReportData($staffId, $paymentMonthId);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";

        $export = new StaffCancelledSalaryReportExport($staffCancelledSalaryReport, $schoolTitle);

        return Excel::download($export, "Canceled Salary Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to staff cancelled salary report data
    */
    private function getStaffCanceledSalaryReportData(int $staffId = null, int $paymentMonthId = null)
    {
        // cancelled salary payments
        $cancelledStaffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryCancelledReport($staffId, $paymentMonthId);

        $staffCancelledSalaryReport = [];

        if (count($cancelledStaffSalaryPayments) > 0) {
            foreach ($cancelledStaffSalaryPayments as $staffSalaryPayment) {
                $staffCancelledSalaryReport[] = [
                    'employee_id' => $staffSalaryPayment?->staff?->employee_id,
                    'staff_name' => $staffSalaryPayment?->staff?->first_name . ' ' . $staffSalaryPayment?->staff?->middle_name . ' ' . $staffSalaryPayment?->staff?->last_name,
                    'uan' => $staffSalaryPayment?->staff?->uan,
                    'month' => $staffSalaryPayment?->paymentMonth?->title,
                    'total_earning_amount' => (int) $staffSalaryPayment?->total_earning_amount ?? 0,
                    'total_deduction_amount' => (int) $staffSalaryPayment?->total_deduction_amount ?? 0,
                    'paid_amount' => (int) $staffSalaryPayment?->paid_amount ?? 0,
                    'due_amount' => (int) $staffSalaryPayment?->due_amount ?? 0,
                    'payment_date' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '',
                    'cancel_reason' => $staffSalaryPayment?->cancel_reason ?? ''
                ];
            }
        }

        return  $staffCancelledSalaryReport;
    }

    /*
    *   export calendar list
    */
    public function exportCalendarList(Request $request)
    {
        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";

        $calendarList = [];

        if (!empty($startDate) && !empty($endDate)) {
            $calendarList = $this->getCalendarListData($startDate, $endDate);
        }

        $export = new CalendarListExport($calendarList);

        return Excel::download($export, "Calendar List.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get calendar list data
    */
    private function getCalendarListData(string $startDate, string $endDate)
    {
        $calendarList = [];

        // holidays
        $holidays = $this->getHolidaysData($startDate, $endDate);

        if (!empty($holidays)) {
            $calendarList = array_merge($calendarList, $holidays);
        }

        // events
        $events = $this->getEventsData($startDate, $endDate);

        if (!empty($events)) {
            $calendarList = array_merge($calendarList, $events);
        }

        // exams
        $exams = $this->getExamsData($startDate, $endDate);

        if (!empty($exams)) {
            $calendarList = array_merge($calendarList, $exams);
        }

        return $calendarList;
    }

    /**
     * get exams data
     */
    private function getExamsData(string $start_date = '', string $end_date = '')
    {
        // exams
        $exams = $this->examRepository->getExamsForEventCalendar($start_date, $end_date);

        $examData = [];

        if (count($exams) > 0) {
            foreach ($exams as $exam) {
                $startDate = Carbon::parse($exam->start_date_at);
                $endDate = Carbon::parse($exam->end_date_at);

                $data = [
                    'title' => $exam->title,
                    'start_date' => $startDate->format('d-M-Y'),
                    'end_date' => $endDate->format('d-M-Y'),
                    'calendar_type' => "exam",
                ];

                array_push($examData, $data);
            }
        }

        return $examData;
    }

    /**
     * get events data
     */
    private function getEventsData(string $start_date = '', string $end_date = '')
    {
        // events
        $events = $this->eventRepository->getPublishedEvents($start_date, $end_date);

        $eventData = [];

        if (count($events) > 0) {
            foreach ($events as $event) {
                $startDate = Carbon::parse($event->start_datetime);
                $endDate = Carbon::parse($event->end_datetime);

                $data = [
                    'title' => $event->title,
                    'start_date' => $startDate->format('d-M-Y'),
                    'end_date' => $endDate->format('d-M-Y'),
                    'calendar_type' => "event",
                ];

                array_push($eventData, $data);
            }
        }

        return $eventData;
    }

    /**
     * get holidays data
     */
    private function getHolidaysData(string $start_date = '', string $end_date = '')
    {
        // holidays
        $holidays = $this->holidayRepository->getHolidaysForCalendar($start_date, $end_date);

        $holidayData = [];

        if (count($holidays) > 0) {
            foreach ($holidays as $holiday) {
                $startDate = Carbon::parse($holiday->start_date_at);
                $endDate = Carbon::parse($holiday->end_date_at);

                $data = [
                    'title' => $holiday->name,
                    'start_date' => $startDate->format('d-M-Y'),
                    'end_date' => $endDate->format('d-M-Y'),
                    'calendar_type' => "holiday"
                ];

                array_push($holidayData, $data);
            }
        }

        return $holidayData;
    }

    /*
    *   export epf wage report
    */
    public function exportStaffEpfWageReport(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;
        $paymentMonthTitle = "";
        $epfWageReport = [];

        if (!empty($paymentMonthId)) {
            // payment month
            $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($paymentMonthId);

            $paymentMonthTitle = $paymentMonth->title ?? "";

            // epf wage report
            $epfWageReport = $this->getEpfWageReportData($paymentMonthId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new EpfWageReportExport($epfWageReport, $schoolTitle, $academicYear, $paymentMonthTitle);

        return Excel::download($export, "Salary Pf Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }


    /**
     * export Visitor Enquiry Report
     */
    public function exportVisitorEnquiryReport(Request $request)
    {
        $search = $request->input('search') ?? '';
        $start_date = $request->input('start_date') ?? '';
        $end_date = $request->input('end_date') ?? '';

        $visitorEnquiryDetailTypeData = VisitorEnquiryDetailEnum::cases();
        $visitorEnquiryDetailType = array();
        foreach ($visitorEnquiryDetailTypeData as $vType) {
            array_push($visitorEnquiryDetailType, ['id' => $vType->value, 'title' => $vType->value]);
        }

        $visitorsEnquiry = $this->visitorEnquiryRepository->getActiveAllWithFilter($search, $start_date, $end_date);
        $visitorsEnquiry->load(['visitorEnquiryDetails' => function ($query) {
            $query->select('id', 'visitor_enquiry_id', 'title', 'activity_date', 'follow_date', 'status', 'created_by');
        }]);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new VisitorEnquiryReportExport($visitorsEnquiry, $visitorEnquiryDetailType, $schoolTitle, $academicYear);

        return Excel::download($export, "Visitor Enquiry Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get epf wage report data
    */
    private function getEpfWageReportData(int $paymentMonthId)
    {
        $epfWageReport = [];

        // staff salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEpfWageReport($paymentMonthId);

        if (count($staffSalaryPayments) > 0) {
            $epfWageReport = $staffSalaryPayments->map(function ($staffSalaryPayment) {
                $grossSalary = $staffSalaryPayment?->staffSalaryPaymentEarnings?->sum('amount');
                $pf = 12;
                $pfAmount = $grossSalary > 0 ? ($pf / 100) * $grossSalary : 0;

                return [
                    'employee_id' => (string) $staffSalaryPayment?->staff?->employee_id,
                    'staff_name' => $staffSalaryPayment?->staff?->first_name . ' ' . $staffSalaryPayment?->staff?->middle_name . ' ' . $staffSalaryPayment?->staff?->last_name,
                    'uan' => $staffSalaryPayment?->staff?->uan,
                    'gross_salary' => $grossSalary,
                    'pf_amount' => $pfAmount,
                ];
            })->toArray();
        }

        return $epfWageReport;
    }

    /**
     * export School Document Report
     */
    public function exportSchoolDocumentReport(Request $request)
    {
        $documentCategoryId = $request->document_category_id ?? null;

        // school documents
        $schoolDocuments = $this->getSchoolDocumentReportData($documentCategoryId);

        $schoolData =  getSiteSchoolData();
        $schoolTitle = $schoolData?->title ?? "";
        $academicYear = getAcademicYear();

        $export = new SchoolDocumentReportExport($schoolDocuments, $schoolTitle, $academicYear);

        return Excel::download($export, "School Documents.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get school document report data
    */
    private function getSchoolDocumentReportData(int $documentCategoryId = null)
    {
        $schoolDocumentReport = [];

        // school documents
        $schoolDocuments = $this->documentRepository->getFilteredSchoolDocuments($documentCategoryId, false);

        if (count($schoolDocuments) > 0) {
            foreach ($schoolDocuments as $document) {
                $issuedBy = "";
                $uploadedBy = "";

                if ($document?->issuedBy != null) {
                    $issuedBy = trim($document?->issuedBy?->first_name . " " . $document?->issuedBy?->middle_name . " " . $document?->issuedBy?->last_name);
                }

                if ($document?->createdBy != null) {
                    $uploadedBy = trim($document?->createdBy?->first_name . " " . $document?->createdBy?->middle_name . " " . $document?->createdBy?->last_name);
                }

                $schoolDocumentReport[] = [
                    'issue_date' => !empty($document->issued_date) ? Carbon::parse($document->issued_date)->format('d-M-Y') : "",
                    'issue_to' => $document->generated_for ?? "",
                    'letter_no' => $document->document_no ?? "",
                    'subject' => $document->notes ?? "",
                    'attachment' => $document->document_name ?? "",
                    'issued_by' => $issuedBy,
                    'uploaded_by' => $uploadedBy,
                    'user_type' => DocumentAudienceType::SCHOOL->value,
                    'uploaded_on' => !empty($document->created_at) ? Carbon::parse($document->created_at)->format('d-M-Y') : ""
                ];
            }
        }

        return $schoolDocumentReport;
    }

    /**
     * export Vacant Teacher Report
     */
    public function exportVacantTeacherReport(Request $request)
    {
        $schoolShiftId = $request->school_shift_id ?? null;
        $schoolPeriodId = $request->school_period_id ?? null;
        $currentDay = date('l');

        $vacantTeachers = [];

        $shiftTitle = "";
        $periodTitle = "";

        if (!empty($schoolShiftId) && !empty($schoolPeriodId)) {
            // vacant teachers
            $vacantTeachers = $this->getVacantTeacherReportData($schoolShiftId, $schoolPeriodId, $currentDay);

            // school shift
            $schoolShift = $this->schoolShiftRepository->getSchoolShiftById($schoolShiftId);
            $shiftTitle = $schoolShift?->title;

            // school period
            $schoolPeriod = $this->schoolPeriodRepository->getSchoolPeriodById($schoolPeriodId);
            $startTime = !empty($schoolPeriod->start_time_at) ? Carbon::parse($schoolPeriod?->start_time_at)->format('H:i A') : '';
            $endTime = !empty($schoolPeriod->end_time_at) ? Carbon::parse($schoolPeriod?->end_time_at)->format('H:i A') : '';
            $periodTitle = $startTime . ' - ' . $endTime;
        }

        // school data
        $schoolData =  getSiteSchoolData();
        $schoolTitle = $schoolData?->title ?? "";

        $export = new VacantTeacherReportExport($vacantTeachers, $schoolTitle, $shiftTitle, $periodTitle);

        return Excel::download($export, "Vacant Teachers.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get vacant teacher report data
    */
    private function getVacantTeacherReportData(int $schoolShiftId, int $schoolPeriodId, string $currentDay)
    {
        $vacantTeachers = [];

        // vacant teachers
        $teachers = $this->staffRepository->getVacantTeachers($schoolShiftId, $schoolPeriodId, $currentDay);

        if (count($teachers) > 0) {
            $vacantTeachers = $teachers->map(function ($teacher) {
                $classroomSubjects = $this->classroomSubjectRepository->getClassroomSubjectsByTeacherId($teacher->id);

                $teacher['classroom_subjects'] = $classroomSubjects?->map(function ($classroomSubject) {
                    return [
                        'classroom_title' => $classroomSubject?->classroom?->title,
                        'subject_title' => $classroomSubject?->subject?->title,
                    ];
                })->all();

                return $teacher;
            })->all();
        }

        return $vacantTeachers;
    }

    /**
     * export timeable allotment Report
     */
    public function exportTimetableAllotmentReport(Request $request)
    {
        $schoolShiftId = $request->school_shift_id ?? null;
        $classNameId = $request->class_name_id ?? null;
        $shiftTitle = "";
        $schoolPeriods = [];

        if (!empty($schoolShiftId)) {
            // school shift
            $schoolShift = $this->schoolShiftRepository->getSchoolShiftById($schoolShiftId);
            $shiftTitle = $schoolShift?->title;

            // school periods
            $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);

            if (count($schoolPeriods) > 0) {
                $schoolPeriods = $schoolPeriods->map(function ($schoolPeriod) {
                    $startTime = !empty($schoolPeriod->start_time_at) ? Carbon::parse($schoolPeriod?->start_time_at)->format('H:i A') : '';
                    $endTime = !empty($schoolPeriod->end_time_at) ? Carbon::parse($schoolPeriod?->end_time_at)->format('H:i A') : '';

                    return [
                        'id' => $schoolPeriod->id,
                        'school_shift_id' => $schoolPeriod->school_shift_id,
                        'start_time' => $startTime,
                        'end_time' => $endTime
                    ];
                })->all();
            }
        }

        // timetables
        $timetables = $this->getTimetableAllotmentReportData($schoolShiftId, $classNameId);

        // school data
        $schoolData =  getSiteSchoolData();
        $schoolTitle = $schoolData?->title ?? "";
        $academicYear = getAcademicYear();
        $currentDate = date('d-M-Y');

        $export = new TimetableAllotmentReportExport($timetables, $schoolPeriods, $currentDate, $schoolTitle, $academicYear, $shiftTitle);

        return Excel::download($export, "Today Allotment Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get vacant teacher report data
    */
    private function getTimetableAllotmentReportData(int $schoolShiftId = null, int $classNameId = null)
    {
        $timetables = [];

        if (!empty($classNameId)) {
            $classrooms = $this->classroomRepository->getClassroomsByClassNameId($classNameId);
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();
        }

        if (count($classrooms) > 0) {
            foreach ($classrooms as $classroom) {
                $timetables[$classroom->id] = [
                    'classroom_title' => $classroom->title,
                    'period_data' => []
                ];
            }

            if (!empty($schoolShiftId)) {
                $classroomIds = $classrooms?->pluck('id')?->toArray();

                // classroom timetables
                $classroomTimetables = $this->timetableRepository->getTodayAllotmentClassroomTimetables($schoolShiftId, $classroomIds);

                if (count($classroomTimetables) > 0) {
                    foreach ($classroomTimetables as $timetable) {
                        $schoolPeriodId = $timetable?->classroomPeriod?->school_period_id;

                        $timetables[$timetable?->classroom_id]['period_data'][$schoolPeriodId][] = [
                            'school_period_id' => $schoolPeriodId,
                            'subject_title' => $timetable?->subject?->title,
                            'teacher_name' => trim(implode(' ', [$timetable?->staff?->first_name, $timetable?->staff?->middle_name, $timetable?->staff?->last_name])),
                        ];
                    }
                }
            }
        }

        return $timetables;
    }

    /*
    *   export journal report
    */
    public function exportJournalReport(Request $request)
    {
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $journalReport = $this->getJournalReportData($start_date, $end_date);

        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

        $reportDateTitle = "From {$startDate} to {$endDate}";
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new JournalReportExport($journalReport, $schoolTitle, $academicYear, $reportDateTitle);

        return Excel::download($export, "Journal Register.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get journal report data
    */
    private function getJournalReportData(string $startDate = "", string $endDate = "")
    {
        $journalData = [];
        $totalAmount = 0;

        // journals
        $journals = $this->journalRepository->getActiveFilteredJournals($startDate, $endDate);

        if (count($journals) > 0) {
            foreach ($journals as $journal) {
                $ledgerTtiles = [];
                $journalLedgers = [];

                if ($journal?->journalLedgers?->count() > 0) {
                    foreach ($journal?->journalLedgers as $journalLedger) {
                        $ledgerTitle = $journalLedger?->ledger?->title ?? '';
                        $ledgerTtiles[] = $ledgerTitle;

                        $journalLedgers[] = [
                            'ledger_title' => $ledgerTitle,
                            'debit_amount' => $journalLedger?->debit_amount,
                            'credit_amount' => $journalLedger?->credit_amount
                        ];
                    }
                }

                $amount = $journal->total_amount ?? 0;
                $totalAmount += $amount;

                $journalData[] = [
                    'id' => $journal->id,
                    'ledger_titles' => implode(',', $ledgerTtiles),
                    'journal_date' => !empty($journal->journal_date) ? Carbon::parse($journal->journal_date)->format('d-M-Y') : '',
                    'type' => $journal?->type?->title,
                    'voucher_no' => $journal->voucher_no,
                    'total_amount' => $amount,
                    'journal_ledgers' => $journalLedgers
                ];
            }
        }

        return [
            'reports' => $journalData,
            'total_amount' => $totalAmount
        ];
    }

    /*
    *   export basic salary report
    */
    public function exportBasicSalaryReport()
    {
        // basic salary report
        $basicSalaryReport = $this->getBasicSalaryReportData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new BasicSalaryReportExport($basicSalaryReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Basic Salary Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get basic salary report data
    */
    private function getBasicSalaryReportData()
    {
        $basicSalaryReport = [];

        // staff earnings
        $staffEarnings = $this->staffEarningRepository->getActiveAll();

        if (count($staffEarnings) > 0) {
            // earning types
            $earningTypes = $this->earningTypeRepository->getActiveAll();
            $groupedEarningTypes = $earningTypes?->keyBy('id')?->toArray();

            // deduction types
            $deductionTypes = $this->deductionTypeRepository->getActiveAll();
            $groupedDeductionTypes = $deductionTypes?->keyBy('id')?->toArray();

            $basicSalaryReport = $staffEarnings->map(function ($staffEarning) use ($groupedEarningTypes, $groupedDeductionTypes) {
                // earnings
                $earningsData = $staffEarning?->earnings != null ? json_decode($staffEarning?->earnings, true) : [];
                $earnings = [];
                $earningAmount = 0;

                if (count($earningsData) > 0) {
                    foreach ($earningsData as $earning) {
                        $earningTypeId = $earning['earning_type_id'] ?? null;
                        $amount = $earning['amount'] ?? 0;

                        $earnings[] = [
                            'title' => $groupedEarningTypes[$earningTypeId]['title'] ?? '',
                            'amount' => $amount
                        ];

                        $earningAmount += $amount;
                    }
                }

                // deductions
                $deductionsData = $staffEarning?->deductions != null ? json_decode($staffEarning?->deductions, true) : [];
                $deductions = [];
                $deductionAmount = 0;

                if (count($deductionsData) > 0) {
                    foreach ($deductionsData as $deduction) {
                        $deductionTypeId = $deduction['deduction_type_id'] ?? null;
                        $amount = $deduction['amount'] ?? 0;

                        $deductions[] = [
                            'title' => $groupedDeductionTypes[$deductionTypeId]['title'] ?? '',
                            'amount' => $amount
                        ];

                        $deductionAmount += $amount;
                    }
                }

                $staffEarning['earnings'] = $earnings;
                $staffEarning['deductions'] = $deductions;
                $staffEarning['earning_amount'] = $earningAmount;
                $staffEarning['deduction_amount'] = $deductionAmount;
                $staffEarning['updated_on'] = !empty($staffEarning->updated_at) ? Carbon::parse($staffEarning->updated_at)->format('l, d F Y') : '';

                return $staffEarning;
            })->toArray();
        }

        return $basicSalaryReport;
    }

    /*
    *   export salary payment report
    */
    public function exportSalaryPaymentReport(Request $request)
    {
        $staffType = $request->staff_type ?? "";
        $status = $request->status ?? "";
        $paymentMonthIds = !empty($request->payment_month_ids) ? json_decode($request->payment_month_ids) : [];
        $salaryPaymentReport = [];
        $earningTitles = [];
        $deductionTitles = [];
        $reportTitle = "Salary Report for - ";

        if (!empty($paymentMonthIds)) {
            // salary payment report
            list($salaryPaymentReport, $earningTitles, $deductionTitles) = $this->getSalaryPaymentReportData($paymentMonthIds, $staffType, $status);

            // payment months
            $paymentMonths = $this->paymentMonthRepository->getPaymentMonthsByIds($paymentMonthIds);

            if (count($paymentMonths) > 0) {
                $paymentMonthTitles = $paymentMonths->pluck('title')->toArray();

                $reportTitle .= implode(',', $paymentMonthTitles);
            }
        }

        $reportTitle .= ", Total Paid (" . ($salaryPaymentReport['total_summary']['paid_amount'] ?? 0) . "), Status - " . ($request->status ?? 'All') . ', ' . ($request->staff_type ?? 'Teaching & Non Teaching');

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new SalaryPaymentReportExport($salaryPaymentReport, $earningTitles, $deductionTitles, $schoolTitle, $academicYear, $reportTitle);

        return Excel::download($export, "Salary Payment Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get salary payment report data
    */
    private function getSalaryPaymentReportData(array $paymentMonthIds, string $staffType = '', string $status = '')
    {
        $salaryPaymentReport = [];
        $earningTitles = [];
        $deductionTitles = [];

        $salaryPaymentData = [];
        $advancePaymentData = [];

        // earning types
        $earningTypes = $this->earningTypeRepository->getActiveAll();
        $groupedEarningTypes = $earningTypes?->keyBy('id')?->toArray();

        // deduction types
        $deductionTypes = $this->deductionTypeRepository->getActiveAll();
        $groupedDeductionTypes = $deductionTypes?->keyBy('id')?->toArray();

        // staff salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredStaffSalaryPayments($paymentMonthIds, $status, $staffType);

        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $staffId = $staffSalaryPayment?->staff_id;

                if (!isset($salaryPaymentData[$staffId])) {
                    $salaryPaymentData[$staffId] = [
                        'id' => $staffId,
                        'employee_id' => $staffSalaryPayment?->staff?->employee_id,
                        'staff_name' => trim(implode(' ', [$staffSalaryPayment?->staff?->first_name, $staffSalaryPayment?->staff?->middle_name, $staffSalaryPayment?->staff?->last_name])),
                        'uan' => $staffSalaryPayment?->staff?->uan,
                        'salary_structure' => $staffSalaryPayment?->staff?->payScale?->title,
                        'earnings' => [],
                        'deductions' => [],
                        'earning_amount' => 0,
                        'deduction_amount' => 0,
                        'paid_amount' => 0,
                        'leave_deduction_days' => 0,
                        'gross_payment_after_leave' => 0
                    ];
                }

                $salaryPaymentData[$staffId]['paid_amount'] += $staffSalaryPayment->paid_amount ?? 0;
                $salaryPaymentReport['total_summary']['paid_amount'] = ($salaryPaymentReport['total_summary']['paid_amount'] ?? 0) + $staffSalaryPayment->paid_amount ?? 0;
                $salaryPaymentData[$staffId]['leave_deduction_days'] += $staffSalaryPayment->total_deducted_absent ?? 0;
                $salaryPaymentReport['total_summary']['leave_deduction_days'] = ($salaryPaymentReport['total_summary']['leave_deduction_days'] ?? 0) + $staffSalaryPayment->total_deducted_absent ?? 0;

                // earnings
                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $earningTypeId = $earning->earning_type_id ?? null;
                        $key = 'earning_' . $earningTypeId;
                        $amount = $earning->amount ?? 0;

                        if (!isset($earningTitles[$key])) {
                            $earningTitles[$key] = $groupedEarningTypes[$earningTypeId]['title'] ?? '';
                        }

                        $salaryPaymentData[$staffId]['earnings'][$key] = ($salaryPaymentData[$staffId]['earnings'][$key] ?? 0) + $amount;
                        $salaryPaymentData[$staffId]['earning_amount'] += $amount;
                        $salaryPaymentReport['total_summary'][$key] = ($salaryPaymentReport['total_summary'][$key] ?? 0) + $amount;
                        $salaryPaymentReport['total_summary']['earning_amount'] = ($salaryPaymentReport['total_summary']['earning_amount'] ?? 0) + $amount;
                        $salaryPaymentData[$staffId]['gross_payment_after_leave'] += $amount;
                        $salaryPaymentReport['total_summary']['gross_payment_after_leave'] = ($salaryPaymentReport['total_summary']['gross_payment_after_leave'] ?? 0) + $amount;
                    }
                }

                // deductions
                if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentDeductions as $deduction) {
                        $deductionTypeId = $deduction->deduction_type_id ?? null;
                        $key = 'deduction_' . $deductionTypeId;
                        $amount = $deduction->amount ?? 0;
                        $deductionTypeTitle = $groupedDeductionTypes[$deductionTypeId]['title'] ?? '';

                        if (!isset($deductionTitles[$key])) {
                            $deductionTitles[$key] = $deductionTypeTitle;
                        }

                        $salaryPaymentData[$staffId]['deductions'][$key] = ($salaryPaymentData[$staffId]['deductions'][$key] ?? 0) + $amount;
                        $salaryPaymentData[$staffId]['deduction_amount'] += $amount;
                        $salaryPaymentReport['total_summary'][$key] = ($salaryPaymentReport['total_summary'][$key] ?? 0) + $amount;
                        $salaryPaymentReport['total_summary']['deduction_amount'] = ($salaryPaymentReport['total_summary']['deduction_amount'] ?? 0) + $amount;

                        if ($deductionTypeTitle == 'Absent Deduction') {
                            $salaryPaymentData[$staffId]['gross_payment_after_leave'] -= $staffSalaryPayment->paid_amount ?? 0;
                            $salaryPaymentReport['total_summary']['gross_payment_after_leave'] = ($salaryPaymentReport['total_summary']['gross_payment_after_leave'] ?? 0) - $staffSalaryPayment->paid_amount ?? 0;
                        }
                    }
                }
            }
        }

        if (empty($status) || $status != PublishStatus::NOT_PUBLISHED->value) {
            // staff advance payments
            $staffAdvancePayments = $this->staffAdvancePaymentRepository->getFilteredStaffAdvancePayments($paymentMonthIds, $staffType);

            if (count($staffAdvancePayments) > 0) {
                // earning type
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                // earnings
                $earningTypeId = $earningType->id ?? null;
                $key = 'earning_' . $earningTypeId;
                $earningTypeTitle = $earningType->title ?? '';

                foreach ($staffAdvancePayments as $staffAdvancePayment) {
                    $staffId = $staffAdvancePayment?->staff_id;

                    if (!isset($advancePaymentData[$staffId])) {
                        $advancePaymentData[$staffId] = [
                            'id' => $staffId,
                            'employee_id' => $staffAdvancePayment?->staff?->employee_id,
                            'staff_name' => trim(implode(' ', [$staffAdvancePayment?->staff?->first_name, $staffAdvancePayment?->staff?->middle_name, $staffAdvancePayment?->staff?->last_name])),
                            'uan' => $staffAdvancePayment?->staff?->uan,
                            'salary_structure' => $staffAdvancePayment?->staff?->payScale?->title,
                            'earnings' => [],
                            'deductions' => [],
                            'earning_amount' => 0,
                            'deduction_amount' => 0,
                            'paid_amount' => 0,
                            'leave_deduction_days' => 0,
                            'gross_payment_after_leave' => 0
                        ];
                    }

                    $amount = $staffAdvancePayment->paid_amount ?? 0;

                    if (!isset($earningTitles[$key])) {
                        $earningTitles[$key] = $earningTypeTitle;
                    }

                    $advancePaymentData[$staffId]['earnings'][$key] = ($advancePaymentData[$staffId]['earnings'][$key] ?? 0) + $amount;
                    $advancePaymentData[$staffId]['earning_amount'] += $amount;
                    $advancePaymentData[$staffId]['paid_amount'] += $amount;
                    $advancePaymentData[$staffId]['gross_payment_after_leave'] += $amount;
                    $salaryPaymentReport['total_summary'][$key] = ($salaryPaymentReport['total_summary'][$key] ?? 0) + $amount;
                    $salaryPaymentReport['total_summary']['earning_amount'] = ($salaryPaymentReport['total_summary']['earning_amount'] ?? 0) + $amount;
                    $salaryPaymentReport['total_summary']['deduction_amount'] = ($salaryPaymentReport['total_summary']['deduction_amount'] ?? 0) + 0;
                    $salaryPaymentReport['total_summary']['paid_amount'] = ($salaryPaymentReport['total_summary']['paid_amount'] ?? 0) + $amount;
                    $salaryPaymentReport['total_summary']['gross_payment_after_leave'] = ($salaryPaymentReport['total_summary']['gross_payment_after_leave'] ?? 0) + $amount;
                    $salaryPaymentReport['total_summary']['leave_deduction_days'] = ($salaryPaymentReport['total_summary']['leave_deduction_days'] ?? 0) + 0;
                }
            }
        }

        // merge salary payment and advance payment data
        $salaryPaymentReport['reports'] = array_merge($salaryPaymentData, $advancePaymentData);

        if (!empty($salaryPaymentReport['reports'])) {
            usort($salaryPaymentReport['reports'], function ($a, $b) {
                return $a['id'] > $b['id'];
            });
        }

        return [$salaryPaymentReport, $earningTitles, $deductionTitles];
    }

    /*
    *   export salary pf report
    */
    public function exportStaffSalaryPfReport(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;
        $paymentMonthTitle = "";
        $salaryPfReport = [];
        $employeeEpf = 12;
        $employerEps = 8.33;

        if (!empty($paymentMonthId)) {
            // payment month
            $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($paymentMonthId);

            $paymentMonthTitle = $paymentMonth->title ?? "";

            // salary pf report
            $salaryPfReport = $this->getSalaryPfReportData($paymentMonthId, $employeeEpf, $employerEps);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new SalaryPfReportExport($salaryPfReport, $schoolTitle, $academicYear, $paymentMonthTitle, $employeeEpf, $employerEps);

        return Excel::download($export, "Salary Pf Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get salary pf report data
    */
    private function getSalaryPfReportData(int $paymentMonthId, $employeeEpf, $employerEps)
    {
        $salaryPfReport = [];

        // staff salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEpfWageReport($paymentMonthId);

        if (count($staffSalaryPayments) > 0) {
            $salaryPfReport = $staffSalaryPayments->map(function ($staffSalaryPayment) use ($employeeEpf, $employerEps) {
                $grossSalary = $staffSalaryPayment?->staffSalaryPaymentEarnings?->sum('amount');
                $epfWage = ($staffSalaryPayment->basic_pay ?? 0) + ($staffSalaryPayment->grade_pay ?? 0);
                $epsWage = $epfWage > 15000 ? 15000 : $epfWage;
                $eeAmount = $epfWage > 0 ? ($employeeEpf / 100) * $epfWage : 0;
                $epsAmount = $epsWage > 0 ? ceil(($employerEps / 100) * $epsWage) : 0;

                return [
                    'employee_id' => (string) $staffSalaryPayment?->staff?->employee_id,
                    'staff_name' => $staffSalaryPayment?->staff?->first_name . ' ' . $staffSalaryPayment?->staff?->middle_name . ' ' . $staffSalaryPayment?->staff?->last_name,
                    'uan' => $staffSalaryPayment?->staff?->uan,
                    'gross_salary' => $grossSalary,
                    'epf_wage' => $epfWage,
                    'eps_wage' => $epsWage,
                    'ee' => $eeAmount,
                    'eps' => $epsAmount,
                    'er' => $eeAmount - $epsAmount,
                    'leave_deduction_days' => $staffSalaryPayment->total_deducted_absent ?? 0,
                ];
            })->toArray();
        }

        return $salaryPfReport;
    }

    /*
    *   export route summary report
    */
    public function exportRouteSummaryReport()
    {
        // route summary report
        $routeSummaryReport = $this->getRouteSummaryReportData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new RouteSummaryReportExport($routeSummaryReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Route Summary Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get route summary report data
    */
    private function getRouteSummaryReportData()
    {
        $routeSummaryData = [];
        $totalStudentCount = 0;

        // transport routes
        $transportRoutes = $this->transportRepository->getActiveRoutesWithAllocation();

        if (count($transportRoutes) > 0) {
            foreach ($transportRoutes as $transportRoute) {
                $studentCount = $transportRoute->allocated_students_count;

                $routeSummaryData[] = [
                    'route_name' => $transportRoute->name,
                    'student_count' => $studentCount
                ];

                $totalStudentCount += $studentCount;
            }
        }

        return [
            'reports' => $routeSummaryData,
            'total_student_count' => $totalStudentCount
        ];
    }

    /*
    *   export student route report
    */
    public function exportStudentRouteReport(Request $request)
    {
        $transportRouteId = $request->transport_route_id ?? null;
        $routeName = "";
        $studentRouteReport = [];

        if (!empty($transportRouteId)) {
            // transport route
            $transportRoute = $this->transportRepository->getTransportRouteById($transportRouteId);

            $routeName = $transportRoute->name ?? "";

            // route summary report
            $studentRouteReport = $this->getStudentRouteReportData($transportRouteId);
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new StudentRouteReportExport($studentRouteReport, $schoolTitle, $academicYear, $routeName);

        return Excel::download($export, "Student Route Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get student route report data
    */
    private function getStudentRouteReportData(int $transportRouteId)
    {
        $studentRouteData = [];
        $totalAmount = 0;

        // transport allocations
        $transportAllocations = $this->transportRepository->getAllAllocateTransportByRouteId($transportRouteId);

        if (!empty($transportAllocations)) {
            $transportAllocations?->loadMissing(['transportRoute.vehicle' => function ($query) {
                $query->select('id', 'vehicle_number');
            }]);

            $studentRouteData = $transportAllocations->map(function ($transportAllocation) use (&$totalAmount) {
                if ($transportAllocation?->student?->promotedClassroom != null) {
                    if (!empty($transportAllocation['student']['classroom'])) {
                        unset($transportAllocation['student']['classroom']);
                    }

                    $transportAllocation['student']['classroom_id'] = $transportAllocation?->student?->promotedClassroom?->id;
                    $transportAllocation['student']['classroom'] = $transportAllocation?->student?->promotedClassroom;
                }

                $transportAllocation['transportStoppage']['pickup_time'] = !empty($transportAllocation->transportStoppage->pickup_time_at) ? Carbon::parse($transportAllocation->transportStoppage->pickup_time_at)->format('H:i A') : '';
                $transportAllocation['transportStoppage']['drop_time'] = !empty($transportAllocation->transportStoppage->drop_time_at) ? Carbon::parse($transportAllocation->transportStoppage->drop_time_at)->format('H:i A') : '';

                $classroomId = $transportAllocation?->student?->classroom_id;

                $transportAllocation?->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select('id', 'student_id', 'roll_no');
                }]);

                $totalAmount += $transportAllocation->amount ?? 0;

                return $transportAllocation;
            })->toArray();
        }

        return [
            'reports' => $studentRouteData,
            'total_amount' => $totalAmount
        ];
    }

    /*
    *   export stoppage summary report
    */
    public function exportStoppageSummaryReport()
    {
        // stoppage summary report
        $stoppageSummaryReport = $this->getStoppageSummaryReportData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new StoppageSummaryReportExport($stoppageSummaryReport, $schoolTitle, $academicYear);

        return Excel::download($export, "Stoppage Summary Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get stoppage summary report data
    */
    private function getStoppageSummaryReportData()
    {
        $stoppageSummaryData = [];
        $totalStudentCount = 0;

        // transport stoppages
        $transportStoppages = $this->transportRepository->getActiveStoppagesWithAllocation();

        if (count($transportStoppages) > 0) {
            foreach ($transportStoppages as $transportStoppage) {
                $studentCount = $transportStoppage->transport_allocations_count;

                $stoppageSummaryData[] = [
                    'stoppage_name' => $transportStoppage->stoppage,
                    'student_count' => $studentCount
                ];

                $totalStudentCount += $studentCount;
            }
        }

        return [
            'reports' => $stoppageSummaryData,
            'total_student_count' => $totalStudentCount
        ];
    }

    /*
    *   export student stoppage report
    */
    public function exportStudentStoppageReport(Request $request)
    {
        $transportStoppageId = $request->transport_stoppage_id ?? null;
        $stoppageName = "";
        $studentStoppageReport = [];

        if (!empty($transportStoppageId)) {
            // transport stoppage
            $transportStoppage = $this->transportRepository->getTransportStoppageById($transportStoppageId);

            if ($transportStoppage != null) {
                $stoppageName = $transportStoppage->stoppage ?? "";

                // stoppage summary report
                $studentStoppageReport = $this->getStudentStoppageReportData($transportStoppage);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $schoolTitle = !empty($schoolData) ? $schoolData?->title : "";
        $academicYear = getAcademicYear();

        $export = new StudentStoppageReportExport($studentStoppageReport, $schoolTitle, $academicYear, $stoppageName);

        return Excel::download($export, "Student Stoppage Report.xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    /*
    * Helper method to get student stoppage report data
    */
    private function getStudentStoppageReportData(TransportStoppage $transportStoppage)
    {
        $studentRouteData = [];

        $transportStoppage->loadMissing([
            'transportAllocations' => function ($query) {
                $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId())
                    ->where('allocate_type_for', 'Student')
                    ->where('is_current', 1)
                    ->with([
                        'student' => function ($query) {
                            $query->with(['father', 'classroom', 'promotedClassroom']);
                        },
                        'transportRoute.vehicle'
                    ]);
            }
        ]);

        if (!empty($transportStoppage)) {
            if (!empty($transportStoppage?->transportAllocations)) {
                foreach ($transportStoppage?->transportAllocations as $transportAllocation) {
                    $classroomTitle = $transportAllocation?->student?->classroom?->title;
                    $classroomId = $transportAllocation?->student?->classroom?->id;

                    if ($transportAllocation?->student?->promotedClassroom != null) {
                        $classroomTitle = $transportAllocation?->student?->promotedClassroom?->title;
                        $classroomId = $transportAllocation?->student?->promotedClassroom?->id;
                    }

                    $transportAllocation?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId)
                            ->select('id', 'student_id', 'roll_no');
                    }]);

                    $studentRouteData[] = [
                        'student_name' => $transportAllocation?->student?->first_name . ' ' . $transportAllocation?->student?->middle_name . ' ' . $transportAllocation?->student?->last_name,
                        'admission_no' => $transportAllocation?->student?->admission_no,
                        'classroom_title' => $classroomTitle,
                        'father_name' => $transportAllocation?->student?->father?->first_name . ' ' . $transportAllocation?->student?->father?->middle_name . ' ' . $transportAllocation?->student?->father?->last_name,
                        'father_phone' => $transportAllocation?->student?->father?->phone,
                        'vehicle_number' => $transportAllocation?->transportRoute?->vehicle?->vehicle_number,
                        'route_name' => $transportAllocation?->transportRoute?->name,
                        'stoppage_name' => $transportStoppage?->stoppage,
                        'roll_no' => $transportAllocation?->student?->classroomRoll?->roll_no
                    ];
                }
            }
        }

        return $studentRouteData;
    }
}
