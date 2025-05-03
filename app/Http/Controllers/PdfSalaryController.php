<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Repositories\IStaffRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\IPaymentMonthRepository;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStaffAdvancePaymentRepository;

class PdfSalaryController extends Controller
{

    public function __construct(
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private IPaymentMonthRepository $paymentMonthRepository,
        private IStaffRepository $staffRepository,
        private IEarningTypeRepository $earningTypeRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
    ) {
        //
    }

    /**
     * Salary Slip
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSalarySlipPdf()
    {
        $staffSalaryPaymentId = $_COOKIE['staff_salary_payment_id'] ?? null;

        abort_if($staffSalaryPaymentId == null, 404);

        $staffSalaryPayment = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentById($staffSalaryPaymentId);

        abort_if($staffSalaryPayment == null, 404);

        $staffSalaryPayment['payment_date'] = !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '';

        $schoolData = $this->getSchoolData();

        return view('pdf.salary.salary_slip', [
            'staffSalaryPayment' => $staffSalaryPayment,
            'schoolData' => $schoolData
        ]);
    }

    /**
     * Salary Slips
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSalarySlips(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;
        $isWithOfficeCopy = $request->is_with_office_copy ?? false;

        $staffSalaryPayments = [];

        if (!empty($paymentMonthId)) {
            $staffSalaryPayments = $this->staffSalaryPaymentRepository->getPublishedStaffSalaryPaymentsByPaymentMonthId($paymentMonthId);

            if (count($staffSalaryPayments) > 0) {
                $staffSalaryPayments->transform(function ($staffSalaryPayment) {
                    $staffSalaryPayment['payment_date'] = !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '';

                    return $staffSalaryPayment;
                });
            }
        }

        $schoolData = $this->getSchoolData();

        return view('pdf.salary.salary_slips', [
            'staffSalaryPayments' => $staffSalaryPayments,
            'schoolData' => $schoolData,
            'isWithOfficeCopy' => $isWithOfficeCopy,
        ]);
    }

    /**
     * Advance Payment Slip
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printAdvancePaymentSlip()
    {
        $staffAdvancePaymentId = $_COOKIE['staff_advance_payment_id'] ?? null;

        abort_if($staffAdvancePaymentId == null, 404);

        $staffAdvancePayment = $this->staffAdvancePaymentRepository->getStaffAdvancePaymentById($staffAdvancePaymentId);

        abort_if($staffAdvancePayment == null, 404);

        $staffAdvancePayment['payment_date'] = !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '';

        $schoolData = $this->getSchoolData();

        return view('pdf.salary.advance_payment_slip', [
            'schoolData' => $schoolData,
            'staffAdvancePayment' => $staffAdvancePayment
        ]);
    }

    /**
     * Salary Bank Statement Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSalaryBankStatementReport(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;

        $report = [];
        $paymentMonth = null;

        if (!empty($paymentMonthId)) {
            // payment month
            $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($paymentMonthId);

            // report data
            $report = $this->getSalaryBankStatementReportData($paymentMonthId);
        }

        // school data
        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Bank Statement'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.salary.bank_statement_report', [
            'report' => $report,
            'schoolData' => $schoolData,
            'paymentMonth' => $paymentMonth
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Yearly Salary Bank Statement Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printYearlySalaryBankStatementReport(Request $request)
    {
        $staffId = $request->staff_id ?? null;

        $report = [];
        $staff = null;

        if (!empty($staffId)) {
            // staff
            $staff = $this->staffRepository->getStaffById($staffId);

            // report data
            $report = $this->getYearlySalaryBankStatementReportData($staffId);
        }

        // school data
        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Yearly Bank Statement'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.salary.yearly_bank_statement_report', [
            'report' => $report,
            'schoolData' => $schoolData,
            'staff' => $staff
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Salary Epf Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSalaryEpfReport(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;
        $earningTypeIds = !empty($request->earning_type_ids) ? json_decode($request->earning_type_ids) : [];
        $pf = (int) $request->pf ?? 0;

        $report = [];
        $paymentMonth = null;
        $earningTypeTitles = "";

        if (!empty($paymentMonthId) && count($earningTypeIds) > 0) {
            // payment month
            $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($paymentMonthId);

            // earning types
            $earningTypes = $this->earningTypeRepository->getEarningTypesByIds($earningTypeIds);

            $earningTypeTitles = implode('+', $earningTypes?->pluck('title')?->toArray());

            // report data
            $report = $this->getSalaryEpfReportData($paymentMonthId, $earningTypeIds, $pf);
        }

        // school data
        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('EPF Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.salary.epf_report', [
            'report' => $report,
            'schoolData' => $schoolData,
            'paymentMonth' => $paymentMonth,
            'earningTypeTitles' => $earningTypeTitles
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * helper method to get school data
    */
    private function getSchoolData()
    {
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

        if (!empty($schoolData)) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
                'school_number' => $schoolData->school_number,
                'udise_code' => $schoolData->udise_code,
            ];
        }

        return $schoolData;
    }

    /*
    * helper method to get salary bank statement report data
    */
    private function getSalaryBankStatementReportData(int $paymentMonthId)
    {
        // salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryBankStatementReport($paymentMonthId);

        // total paid salary
        $totalPaid = $staffSalaryPayments?->reduce(function ($total, $staffSalaryPayment) {
            return $total + $staffSalaryPayment->paid_amount ?? 0;
        }, 0);

        return [
            'staff_salary_payments' => $staffSalaryPayments,
            'total_paid' => $totalPaid
        ];
    }

    /*
    * helper method to get yearly salary bank statement report data
    */
    private function getYearlySalaryBankStatementReportData(int $staffId)
    {
        // salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryYearlyStatementReport($staffId);

        $totalEarning = 0;
        $totalDeduction = 0;
        $totalPaid = 0;
        $totalDue = 0;

        if (count($staffSalaryPayments) > 0) {
            $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) use (&$totalEarning, &$totalDeduction, &$totalPaid, &$totalDue) {
                $totalEarningAmount = (int) ($staffSalaryPayment->total_earning_amount ?? 0);
                $totalDeductionAmount = (int) ($staffSalaryPayment->total_deduction_amount ?? 0);
                $dueAmount = (int) ($staffSalaryPayment->due_amount ?? 0);
                $paidAmount = (int) ($staffSalaryPayment->paid_amount ?? 0);

                $totalEarning += $totalEarningAmount;
                $totalDeduction += $totalDeductionAmount;
                $totalDue += $dueAmount;
                $totalPaid += $paidAmount;

                return [
                    'payment_month' => $staffSalaryPayment?->paymentMonth?->title,
                    'payment_date' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '',
                    'total_earning_amount' => $totalEarningAmount,
                    'total_deduction_amount' => $totalDeductionAmount,
                    'due_amount' => $dueAmount,
                    'paid_amount' => $paidAmount
                ];
            });
        }

        return [
            'staff_salary_payments' => !is_array($staffSalaryPayments) ? $staffSalaryPayments->toArray() : $staffSalaryPayments,
            'total_earning' => $totalEarning,
            'total_deduction' => $totalDeduction,
            'total_due' => $totalDue,
            'total_paid' => $totalPaid
        ];
    }

    /*
    * helper method to get salary epf report data
    */
    private function getSalaryEpfReportData(int $paymentMonthId, array $earningTypeIds, $pf)
    {
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEpfReport($paymentMonthId, $earningTypeIds);
        $totalEarningAmount = 0;
        $totalPfAmount = 0;

        if (count($staffSalaryPayments) > 0) {
            $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) use ($pf, &$totalEarningAmount, &$totalPfAmount) {
                $totalEarning = 0;

                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $totalEarning += (int) $earning->amount ?? 0;
                    }
                }

                $pfAmount = ($pf / 100) * $totalEarning;

                $staffSalaryPayment['total_earning'] = $totalEarning;
                $staffSalaryPayment['pf_amount'] = (float) number_format($pfAmount, 2, '.', '');

                $totalEarningAmount += $totalEarning;
                $totalPfAmount += $pfAmount;

                return $staffSalaryPayment;
            })->toArray();
        }

        return [
            'staff_salary_payments' => $staffSalaryPayments,
            'total_earning_amount' => $totalEarningAmount,
            'total_pf_amount' => $totalPfAmount
        ];
    }

    /**
     * Salary Esi Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSalaryEsiReport(Request $request)
    {
        $paymentMonthId = $request->payment_month_id ?? null;
        $earningTypeIds = !empty($request->earning_type_ids) ? json_decode($request->earning_type_ids) : [];
        $employeesValue = (int) $request->employees_value ?? 0;
        $employersValue = (int) $request->employers_value ?? 0;
        $income = (int) $request->income ?? 0;

        $report = [];
        $paymentMonth = null;

        if (!empty($paymentMonthId) && count($earningTypeIds) > 0) {
            // payment month
            $paymentMonth = $this->paymentMonthRepository->getPaymentMonthById($paymentMonthId);

            // report data
            $report = $this->getSalaryEsiReportData($paymentMonthId, $earningTypeIds, $employeesValue, $employersValue);
        }

        // school data
        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('ESI Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.salary.esi_report', [
            'report' => $report,
            'schoolData' => $schoolData,
            'paymentMonth' => $paymentMonth
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * helper method to get salary esi report data
    */
    private function getSalaryEsiReportData(int $paymentMonthId, array $earningTypeIds, $employeesValue, $employersValue)
    {
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getStaffSalaryPaymentsForEsiReport($paymentMonthId, $earningTypeIds);
        $totalGrossSalary = 0;
        $totalEmpoyeeAmount = 0;
        $totalEmployerAmount = 0;
        $totalAmount = 0;

        if (count($staffSalaryPayments) > 0) {
            $staffSalaryPayments = $staffSalaryPayments->map(function ($staffSalaryPayment) use ($employeesValue, $employersValue, &$totalGrossSalary, &$totalAmount, &$totalEmpoyeeAmount, &$totalEmployerAmount) {
                $grossSalary = 0;

                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $grossSalary += (int) $earning->amount ?? 0;
                    }
                }

                $employeesAmount = ($employeesValue / 100) * $grossSalary;
                $employersAmount = ($employersValue / 100) * $grossSalary;

                $staffSalaryPayment['gross_salary'] = $grossSalary;
                $staffSalaryPayment['employees_amount'] = (float) number_format($employeesAmount, 2, '.', '');
                $staffSalaryPayment['employers_amount'] = (float) number_format($employersAmount, 2, '.', '');
                $staffSalaryPayment['total_amount'] = $employeesAmount + $employersAmount;

                $totalGrossSalary += $grossSalary;
                $totalEmpoyeeAmount += $employeesAmount;
                $totalEmployerAmount += $employersAmount;
                $totalAmount += ($employeesAmount + $employersAmount);

                return $staffSalaryPayment;
            })->toArray();
        }

        return [
            'staff_salary_payments' => $staffSalaryPayments,
            'total_gross_salary' => $totalGrossSalary,
            'total_employee_amount' => $totalEmpoyeeAmount,
            'total_employer_amount' => $totalEmployerAmount,
            'total_amount' => $totalAmount
        ];
    }
}
