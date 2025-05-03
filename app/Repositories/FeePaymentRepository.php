<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Enums\Status;
use App\Models\FeePayment;
use App\Models\EnquiryFee;
use App\Enums\PaymentStatus;
use App\Enums\FeePaymentType;
use Illuminate\Support\Facades\DB;
use App\Repositories\IFeePaymentRepository;

class FeePaymentRepository implements IRepository, IFeePaymentRepository
{
    public function getAll()
    {
        return FeePayment::all();
    }

    public function getById($id)
    {
        return FeePayment::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return FeePayment::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        FeePayment::destroy($id);
    }

    public function create(array $arrayData)
    {
        return FeePayment::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return FeePayment::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return FeePayment::where('status', Status::ACTIVE);
    }


    public function checkFeePaymentByStudentIdAndFeeId(int $studentId, int $feeId)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->exists();
    }


    public function getCompletePaidReports($classroomId = null, array $studentIds = [], $fromFeeId, $toFeeId)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($classroomId), function ($query) use ($studentIds) {
                $query->whereIn('student_id', $studentIds);
            })
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            // ->whereHas('payment_method', function ($query) {
            //     $query->where('is_cancelled', false);
            // })
            ->with(['student' => function ($query) use ($classroomId) {
                $query->select(
                    'id',
                    'school_id',
                    'academic_year_id',
                    'class_name_id',
                    'classroom_id',
                    'admission_no',
                    'srn_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'present_address',
                    'boarding_type',
                )->with([
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                    'classroom:id,title',
                    'promotedClassroom',
                    // 'classroomRoll' => function ($query) use ($classroomId) {
                    //     $query->where('classroom_id', $classroomId);
                    // },
                ]);
            }])
            ->get();
    }

    public function getStudentCompletePaidReportData(int $fromFeeId, int $toFeeId, array $studentIds = [], int $academicYearId = null)
    {
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($studentIds), function ($query) use ($studentIds) {
                $query->whereIn('student_id', $studentIds);
            })
            ->whereBetween('fee_id', [$fromFeeId, $toFeeId])
            ->where('fee_payment_type', FeePaymentType::FEEINSTALLMENT)
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->with(['student' => function ($query) {
                $query->select(
                    'id',
                    'school_id',
                    'academic_year_id',
                    'class_name_id',
                    'classroom_id',
                    'admission_no',
                    'srn_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'present_address',
                    'boarding_type',
                )->with([
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                    'classroom:id,title',
                    'promotedClassroom',
                ]);
            }])
            ->get();
    }

    public function getTotalDiscountAmount($schoolId = null, $academicYearId = null)
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSChoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->sum('discount_amount');
    }


    public function getCurrentDayTotalCollection()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->whereHas('payment_method', function ($query) {
                $query->whereDate('payment_date', Carbon::now()->today()->format('Y-m-d'));
            })
            ->sum('paid_amount');
    }


    public function getCurrentMonthTotalCollection()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->whereHas('payment_method', function ($query) {
                $query->whereBetween('payment_date', getStartEndDateOfMonth());
            })
            ->sum('paid_amount');
    }

    public function getCurrentMonthTotalCollectionForAccountReport()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->whereHas('payment_method', function ($query) {
                $query->whereBetween('payment_date', getStartEndDateOfMonth());
            })
            ->sum('paid_amount');
    }

    public function getMonthWiseCollectionForAccountReport()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->with(['payment_method:id,payment_date'])
            ->select(
                'id',
                'paid_amount',
                'fee_payment_method_id'
            )
            ->get();
    }


    public function getCurrentAcademicYearTotalCollection()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->sum('paid_amount');
    }


    public function getMonthWiseCollection()
    {
        return FeePayment::where('fee_payments.status', Status::ACTIVE)
            ->where('fee_payments.school_id', getUserSChoolId())
            ->where('fee_payments.academic_year_id', getAcademicYearId())
            ->where('fee_payments.payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->leftJoin('fee_payment_methods', 'fee_payments.fee_payment_method_id', '=', 'fee_payment_methods.id')
            ->select(
                'fee_payments.paid_amount',
                'fee_payment_methods.payment_date',
            )
            ->get();
    }


    public function getLastTenDaysCollection()
    {
        $startDate = Carbon::now()->subDays(9)->startOfDay()->format('Y-m-d');
        $endDate = Carbon::now()->endOfDay()->format('Y-m-d');

        return FeePayment::where('fee_payments.status', Status::ACTIVE)
            ->where('fee_payments.school_id', getUserSChoolId())
            ->where('fee_payments.academic_year_id', getAcademicYearId())
            ->where('fee_payments.payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->rightJoin('fee_payment_methods', function ($join) use ($startDate, $endDate) {
                $join->on('fee_payments.fee_payment_method_id', '=', 'fee_payment_methods.id')
                    ->whereBetween('fee_payment_methods.payment_date', [$startDate, $endDate]);
            })
            ->select(
                'fee_payments.paid_amount',
                'fee_payment_methods.payment_date',
            )
            ->get();
    }

    public function checkFeePaymentExists()
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED)
            ->exists();
    }

    public function checkRegistrationFeePaymentExists()
    {
        return EnquiryFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->exists();
    }

    public function cancelPaymentByPaymentMethodId($paymentMethodId)
    {
        return FeePayment::where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('fee_payment_method_id', $paymentMethodId)
            ->update([
                'payment_status' => PaymentStatus::CANCELLED
            ]);
    }

    public function updatePaymentStatusByStudentIdAndInstallmentIds($studentId, $installmentIds, $feePaymentType)
    {
        return FeePayment::where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_payment_type', $feePaymentType)
            ->where('payment_status', PaymentStatus::PAID)
            ->where(function ($query) use ($installmentIds, $feePaymentType) {
                if ($feePaymentType == FeePaymentType::TRANSPORTVOUCHER->value) {
                    $query->whereIn('voucher_id', $installmentIds);
                } else if ($feePaymentType == FeePaymentType::GENERALVOUCHER->value) {
                    $query->whereIn('student_fee_voucher_id', $installmentIds);
                } else if ($feePaymentType == FeePaymentType::FEEINSTALLMENT->value) {
                    $query->whereIn('fee_id', $installmentIds);
                }
            })
            ->update([
                'payment_status' => PaymentStatus::PARTIAL
            ]);
    }

    public function getFilteredFeePayments(string $startDate = '', string $endDate = '')
    {
        return FeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->whereHas('payment_method', function ($query) use ($startDate, $endDate) {
                $query->where('is_cancelled', false);

                if (!empty($startDate)) {
                    $query->whereDate('payment_date', '>=', $startDate);
                }

                if (!empty($startDate)) {
                    $query->whereDate('payment_date', '<=', $endDate);
                }
            })
            ->with([
                'student:id,first_name,middle_name,last_name',
                'feeType:id,fee_type',
                'payment_method:id,receipt_no,payment_date,school_receipt_no,payment_note',
            ])
            ->get();
    }
}
