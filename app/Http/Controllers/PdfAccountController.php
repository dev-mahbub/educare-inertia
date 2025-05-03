<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Repositories\ISaleRepository;
use App\Repositories\ILedgerRepository;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Repositories\IJournalRepository;
use App\Repositories\IPaymentRepository;
use App\Repositories\IProductRepository;
use App\Repositories\IReceiptRepository;
use App\Repositories\IPurchaseRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStaffAdvancePaymentRepository;
use App\Repositories\IFeePaymentRefundMethodRepository;

class PdfAccountController extends Controller
{

    public function __construct(
        private IPaymentRepository $paymentRepository,
        private ISaleRepository $saleRepository,
        private IReceiptRepository $receiptRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IPurchaseRepository $purchaseRepository,
        private IProductRepository $productRepository,
        private ILedgerRepository $ledgerRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IJournalRepository $journalRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
        private IEarningTypeRepository $earningTypeRepository,
    ) {
        //
    }

    /**
     * Ledger Payment Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printLedgerPaymentReport(Request $request)
    {
        // $search = $request->search_query ?? "";
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        // $payment_mode = $request->payment_mode ?? "";
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

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($paymentReport) || !empty($paymentSummary)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Ledger Payment Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.ledger_payment_report', [
            'paymentReport' => $paymentReport,
            'paymentSummary' => $paymentSummary,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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
                $payment['payment_date'] = !empty($payment->payment_date_at) ? Carbon::parse($payment->payment_date_at)->format('d-M-Y') : '';

                $totalAmount += $payment->total ?? 0;

                return $payment;
            });

            $paymentReport['total_amount'] = $totalAmount;

            // payment summary
            foreach ($paymentReportData as $payment) {
                if ($payment?->ledger_payment_items?->count() > 0) {
                    foreach ($payment?->ledger_payment_items as $paymentItem) {
                        $ledgerId = $paymentItem?->ledger_id;

                        if (!isset($paymentSummary['reports'][$ledgerId])) {
                            $paymentSummary['reports'][$ledgerId] = [
                                'ledger_title' => $paymentItem?->ledger?->title,
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


    /**
     * Ledger Payment Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printLedgerPaymentReceipt()
    {
        // $ledgerPaymentId = isset($_COOKIE['ledger_payment_id']) ? $_COOKIE['ledger_payment_id'] : null;
        $ledgerPaymentId = Session::get('ledger_payment_id') != null ? Session::get('ledger_payment_id') : $_COOKIE['ledger_payment_id'] ?? null;

        if (Session::has('ledger_payment_id')) {
            Session::forget('ledger_payment_id');
        }

        abort_if($ledgerPaymentId == null, 404);

        // $ledgerPayment = $this->paymentRepository->getActiveLedgerPaymentById($ledgerPaymentId);
        $ledgerPayment = $this->paymentRepository->getLedgerPaymentById($ledgerPaymentId);

        abort_if(empty($ledgerPayment), 404);

        $ledgerPayment->loadMissing(['ledger_payment_items.ledger', 'createdBy', 'bankLedger']);

        $ledgerPayment['payment_date'] = !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->format('d-M-Y') : '';

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        // receipt copy setting
        $receiptCopySetting = getSiteSettingData('receipt_is_copy');
        $isDoubleReceiptCopy = $receiptCopySetting?->value != null && strtolower($receiptCopySetting->value) == 'double';

        // code for generate pdf. do not remove

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('tmp');

        // $title =  Str::slug(__('Payment Receipt'));
        // $header =  view('pdf.empty_header')->render();
        // $footer =  view('pdf.empty_footer')->render();

        // $pdf = new Mpdf([
        //     'mode' => 'utf-8',
        //     'format' => 'A4',
        //     'default_font_size' => 10,
        //     //'default_font' => 'chelvetica',
        //     'margin_left' => 20,
        //     'margin_right' => 15,
        //     'margin_top' => 8,
        //     'margin_bottom' => 0,
        //     'margin_header' => 5,
        //     'margin_footer' => 5,
        //     'orientation' => 'P',
        //     'tempDir' => $storage->path('tmp'),
        // ]);

        // $pdf->PDFA = false;
        // $pdf->use_kwt = true;
        // $pdf->setAutoTopMargin = 'pad';
        // $pdf->setAutoBottomMargin = 'pad';

        // $pdf->SetTitle($title);
        // $pdf->SetAuthor(config('app.name'));

        // if ($header) {
        //     $pdf->SetHTMLHeader($header);
        // }
        // if ($footer) {
        //     $pdf->SetHTMLFooter($footer);
        // }

        return view('pdf.account.ledger_payment_receipt', [
            'ledgerPayment' => $ledgerPayment,
            'schoolData' => $schoolData,
            'isDoubleReceiptCopy' => $isDoubleReceiptCopy
        ]);

        // code for generate pdf. do not remove

        // $pdf->writeHTML(view('pdf.account.ledger_payment_receipt', ['ledgerPayment' => $ledgerPayment, 'schoolData' => $schoolData])->render());

        // $pdfContent = $pdf->output();

        // return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Sale Ledger Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSaleLedgerReceipt()
    {
        $saleLedgerId = Session::get('sale_ledger_id') != null ? Session::get('sale_ledger_id') : $_COOKIE['sale_ledger_id'] ?? null;

        if (Session::has('sale_ledger_id')) {
            Session::forget('sale_ledger_id');
        }

        abort_if($saleLedgerId == null, 404);

        $saleLedger = $this->saleRepository->getActiveSaleLedgerById($saleLedgerId);

        abort_if(empty($saleLedger), 404);

        $classroomId = $saleLedger->classroom_id;

        $saleLedger->loadMissing(['bankLedger', 'saleLedgerProducts.product', 'createdBy', 'student' => function ($query) use ($classroomId) {
            $query->with(['father', 'classroomRoll' => function ($query) use ($classroomId) {
                $query->where('academic_year_id', getAcademicYearId())
                    ->where('classroom_id', $classroomId);
            }]);
        }, 'classroom', 'staff']);

        $saleLedger?->saleLedgerProducts?->transform(function ($ledgerProduct) {
            $title = '';

            if (!empty($ledgerProduct?->product->product_code)) {
                $title .= "{$ledgerProduct?->product->product_code} - ";
            }

            if (!empty($ledgerProduct?->product->title)) {
                $title .= "{$ledgerProduct?->product->title} - ";
            }

            if (!empty($ledgerProduct?->product->product_size)) {
                $title .= $ledgerProduct?->product->product_size;
            }

            $ledgerProduct['product']['title'] = $title;

            return $ledgerProduct;
        });

        $saleLedger['sale_date'] = !empty($saleLedger->sale_date_at) ? Carbon::parse($saleLedger->sale_date_at)->format('d-M-Y') : '';

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        // receipt copy setting
        $receiptCopySetting = getSiteSettingData('receipt_is_copy');
        $isDoubleReceiptCopy = $receiptCopySetting?->value != null && strtolower($receiptCopySetting->value) == 'double';

        // code for generate pdf. do not remove

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('tmp');

        // $title =  Str::slug(__('Sale Receipt'));
        // $header =  view('pdf.empty_header')->render();
        // $footer =  view('pdf.empty_footer')->render();

        // $pdf = new Mpdf([
        //     'mode' => 'utf-8',
        //     'format' => 'A4',
        //     'default_font_size' => 10,
        //     //'default_font' => 'chelvetica',
        //     'margin_left' => 20,
        //     'margin_right' => 15,
        //     'margin_top' => 8,
        //     'margin_bottom' => 0,
        //     'margin_header' => 5,
        //     'margin_footer' => 5,
        //     'orientation' => 'P',
        //     'tempDir' => $storage->path('tmp'),
        // ]);

        // $pdf->PDFA = false;
        // $pdf->use_kwt = true;
        // $pdf->setAutoTopMargin = 'pad';
        // $pdf->setAutoBottomMargin = 'pad';

        // $pdf->SetTitle($title);
        // $pdf->SetAuthor(config('app.name'));

        // if ($header) {
        //     $pdf->SetHTMLHeader($header);
        // }
        // if ($footer) {
        //     $pdf->SetHTMLFooter($footer);
        // }

        return view('pdf.account.sale_ledger_receipt', [
            'saleLedger' => $saleLedger,
            'schoolData' => $schoolData,
            'isDoubleReceiptCopy' => $isDoubleReceiptCopy
        ]);

        // code for generate pdf. do not remove

        // $pdf->writeHTML(view('pdf.account.sale_ledger_receipt', ['saleLedger' => $saleLedger, 'schoolData' => $schoolData])->render());

        // $pdfContent = $pdf->output();

        // return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Sale Ledger Payment Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSaleLedgerPaymentReceipt()
    {
        $saleLedgerPaymentId = Session::get('sale_ledger_payment_id') != null ? Session::get('sale_ledger_payment_id') : $_COOKIE['sale_ledger_payment_id'] ?? null;

        if (Session::has('sale_ledger_payment_id')) {
            Session::forget('sale_ledger_payment_id');
        }

        abort_if($saleLedgerPaymentId == null, 404);

        $saleLedgerPayment = $this->saleRepository->getActiveSaleLedgerPaymentById($saleLedgerPaymentId);

        abort_if(empty($saleLedgerPayment), 404);

        $classroomId = $saleLedgerPayment?->saleLedger?->classroom_id;

        $saleLedgerPayment->loadMissing([
            'saleLedger.student.classroomRoll' => function ($query) use ($classroomId) {
                $query->where('academic_year_id', getAcademicYearId())
                    ->where('classroom_id', $classroomId)
                    ->select(
                        'id',
                        'classroom_id',
                        'student_id',
                        'roll_no'
                    );
            }
        ]);

        $saleLedgerPayment?->saleLedger?->saleLedgerProducts?->transform(function ($ledgerProduct) {
            $title = '';

            if (!empty($ledgerProduct?->product->product_code)) {
                $title .= "{$ledgerProduct?->product->product_code} - ";
            }

            if (!empty($ledgerProduct?->product->title)) {
                $title .= "{$ledgerProduct?->product->title} - ";
            }

            if (!empty($ledgerProduct?->product->product_size)) {
                $title .= $ledgerProduct?->product->product_size;
            }

            $ledgerProduct['product']['title'] = $title;

            return $ledgerProduct;
        });

        $saleLedgerPayment['payment_date'] = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->format('d-M-Y') : '';
        $saleLedgerPayment['transaction_date'] = !empty($saleLedgerPayment->transaction_date) ? Carbon::parse($saleLedgerPayment->transaction_date)->format('d-M-Y') : '';
        $saleLedgerPayment['narration'] = $saleLedgerPayment->description;

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        // receipt copy setting
        $receiptCopySetting = getSiteSettingData('receipt_is_copy');
        $isDoubleReceiptCopy = $receiptCopySetting?->value != null && strtolower($receiptCopySetting->value) == 'double';

        return view('pdf.account.sale_ledger_payment_receipt', [
            'saleLedgerPayment' => $saleLedgerPayment,
            'schoolData' => $schoolData,
            'isDoubleReceiptCopy' => $isDoubleReceiptCopy
        ]);
    }


    /**
     * Sale return Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSaleReturnReceipt()
    {
        $saleLedgerReturnId = isset($_COOKIE['sale_ledger_return_id']) ? $_COOKIE['sale_ledger_return_id'] : null;

        abort_if($saleLedgerReturnId == null, 404);

        $saleLedgerReturn = $this->saleRepository->getSaleLedgerReturnById($saleLedgerReturnId);

        abort_if(empty($saleLedgerReturn), 404);

        $classroomId = $saleLedgerReturn->classroom_id;

        $saleLedgerReturn->loadMissing([
            'saleLedgerReturnProducts.product:id,title,product_code,product_size',
            'student' => function ($query) use ($classroomId) {
                $query->with(['father', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->where('classroom_id', $classroomId);
                }]);
            },
            'classroom',
            'staff:id,first_name,middle_name,last_name',
            'createdBy:id,first_name,middle_name,last_name'
        ]);

        $saleLedgerReturn?->saleLedgerReturnProducts?->transform(function ($returnProduct) {
            $title = '';

            if (!empty($returnProduct?->product->product_code)) {
                $title .= "{$returnProduct?->product->product_code} - ";
            }

            if (!empty($returnProduct?->product->title)) {
                $title .= "{$returnProduct?->product->title} - ";
            }

            if (!empty($returnProduct?->product->product_size)) {
                $title .= $returnProduct?->product->product_size;
            }

            $returnProduct['product']['title'] = $title;

            return $returnProduct;
        });

        $saleLedgerReturn['return_date'] = !empty($saleLedgerReturn->return_date_at) ? Carbon::parse($saleLedgerReturn->return_date_at)->format('d-M-Y') : '';

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        // receipt copy setting
        $receiptCopySetting = getSiteSettingData('receipt_is_copy');
        $isDoubleReceiptCopy = $receiptCopySetting?->value != null && strtolower($receiptCopySetting->value) == 'double';

        // code for generate pdf. do not remove

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('tmp');

        // $title =  Str::slug(__('Sale Return Receipt'));
        // $header =  view('pdf.empty_header')->render();
        // $footer =  view('pdf.empty_footer')->render();

        // $pdf = new Mpdf([
        //     'mode' => 'utf-8',
        //     'format' => 'A4',
        //     'default_font_size' => 10,
        //     //'default_font' => 'chelvetica',
        //     'margin_left' => 20,
        //     'margin_right' => 15,
        //     'margin_top' => 8,
        //     'margin_bottom' => 0,
        //     'margin_header' => 5,
        //     'margin_footer' => 5,
        //     'orientation' => 'P',
        //     'tempDir' => $storage->path('tmp'),
        // ]);

        // $pdf->PDFA = false;
        // $pdf->use_kwt = true;
        // $pdf->setAutoTopMargin = 'pad';
        // $pdf->setAutoBottomMargin = 'pad';

        // $pdf->SetTitle($title);
        // $pdf->SetAuthor(config('app.name'));

        // if ($header) {
        //     $pdf->SetHTMLHeader($header);
        // }
        // if ($footer) {
        //     $pdf->SetHTMLFooter($footer);
        // }

        return view('pdf.account.sale_return_receipt', [
            'saleLedgerReturn' => $saleLedgerReturn,
            'schoolData' => $schoolData,
            'isDoubleReceiptCopy' => $isDoubleReceiptCopy
        ]);

        // code for generate pdf. do not remove

        // $pdf->writeHTML(view('pdf.account.sale_return_receipt', ['saleLedgerReturn' => $saleLedgerReturn, 'schoolData' => $schoolData])->render());

        // $pdfContent = $pdf->output();

        // return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Ledger Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printLedgerReceipt()
    {
        // $ledgerReceiptId = isset($_COOKIE['ledger_receipt_id']) ? $_COOKIE['ledger_receipt_id'] : null;
        $ledgerReceiptId = Session::get('ledger_receipt_id') != null ? Session::get('ledger_receipt_id') : $_COOKIE['ledger_receipt_id'] ?? null;

        if (Session::has('ledger_receipt_id')) {
            Session::forget('ledger_receipt_id');
        }

        abort_if($ledgerReceiptId == null, 404);

        // $ledgerReceipt = $this->receiptRepository->getActiveLedgerReceiptById($ledgerReceiptId);
        $ledgerReceipt = $this->receiptRepository->getLedgerReceiptById($ledgerReceiptId);

        abort_if(empty($ledgerReceipt), 404);

        $ledgerReceipt->loadMissing(['ledger_receipt_items.ledger', 'createdBy', 'bankLedger']);

        $ledgerReceipt['receipt_date'] = !empty($ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->format('d-M-Y') : '';

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        // receipt copy setting
        $receiptCopySetting = getSiteSettingData('receipt_is_copy');
        $isDoubleReceiptCopy = $receiptCopySetting?->value != null && strtolower($receiptCopySetting->value) == 'double';

        // code for generate pdf. do not remove

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('tmp');

        // $title =  Str::slug(__('Payment Receipt'));
        // $header =  view('pdf.empty_header')->render();
        // $footer =  view('pdf.empty_footer')->render();

        // $pdf = new Mpdf([
        //     'mode' => 'utf-8',
        //     'format' => 'A4',
        //     'default_font_size' => 10,
        //     //'default_font' => 'chelvetica',
        //     'margin_left' => 20,
        //     'margin_right' => 15,
        //     'margin_top' => 8,
        //     'margin_bottom' => 0,
        //     'margin_header' => 5,
        //     'margin_footer' => 5,
        //     'orientation' => 'P',
        //     'tempDir' => $storage->path('tmp'),
        // ]);

        // $pdf->PDFA = false;
        // $pdf->use_kwt = true;
        // $pdf->setAutoTopMargin = 'pad';
        // $pdf->setAutoBottomMargin = 'pad';

        // $pdf->SetTitle($title);
        // $pdf->SetAuthor(config('app.name'));

        // if ($header) {
        //     $pdf->SetHTMLHeader($header);
        // }
        // if ($footer) {
        //     $pdf->SetHTMLFooter($footer);
        // }

        return view('pdf.account.ledger_receipt', [
            'ledgerReceipt' => $ledgerReceipt,
            'schoolData' => $schoolData,
            'isDoubleReceiptCopy' => $isDoubleReceiptCopy
        ]);

        // code for generate pdf. do not remove

        // $pdf->writeHTML(view('pdf.account.ledger_receipt', ['ledgerReceipt' => $ledgerReceipt, 'schoolData' => $schoolData])->render());

        // $pdfContent = $pdf->output();

        // return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Ledger Receipt Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printLedgerReceiptReport(Request $request)
    {
        $search = $request->search_query ?? "";
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $ledgerId = $request->input('ledger_id') ?? null;

        list($receiptReport, $receiptSummary) = $this->getLedgerReceiptReportData($search, $ledgerId, $start_date, $end_date);

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($receiptReport) || !empty($receiptSummary)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Ledger Receipt Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.ledger_receipt_report', [
            'receiptReport' => $receiptReport,
            'receiptSummary' => $receiptSummary,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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
                    'amount' => $amount,
                    'timestamp' => $timestamp,
                    'payment_items' => $paymentItems
                ];

                $receiptReport['total_amount'] = ($receiptReport['total_amount'] ?? 0) + $amount;

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
                    'amount' => $amount,
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

    /**
     * Head Wise Payment Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printHeadWisePaymentReport(Request $request)
    {
        $paymentType = $request->payment_type ?? "";
        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $ledgerId = $request->legder_id ?? null;

        list($headWisePaymentReport, $headWiseSummary, $ledgerTitles) = $this->getHeadWisePaymentReportData($paymentType, $startDate, $endDate, $ledgerId);

        $schoolData = [];

        if (!empty($receiptReport) || !empty($receiptSummary)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Head Wise Payment Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.head_wise_payment_report', [
            'headWisePaymentReport' => $headWisePaymentReport,
            'headWiseSummary' => $headWiseSummary,
            'ledgerTitles' => $ledgerTitles,
            'schoolData' => $schoolData
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * Helper method to get ead wise ledger payment report data
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

    /**
     * Daybook Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printDayBookReport(Request $request)
    {
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $dayBookReport = $this->getDayBookReportData($start_date, $end_date);

        $schoolData = [];
        $reportDateTitle = "";
        $totalDebitAmount = 0;
        $totalCreditAmount = 0;

        if (!empty($dayBookReport)) {
            foreach ($dayBookReport as $report) {
                $totalDebitAmount += $report['debit'] ?? 0;
                $totalCreditAmount += $report['credit'] ?? 0;
            }

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Day Book Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.daybook_report', [
            'dayBookReport' => $dayBookReport,
            'totalDebitAmount' => $totalDebitAmount,
            'totalCreditAmount' => $totalCreditAmount,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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

    /**
     * Purchase Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printPurchaseReceipt()
    {
        // $purchaseId = isset($_COOKIE['purchase_id']) ? $_COOKIE['purchase_id'] : null;
        $purchaseId = Session::get('purchase_id') != null ? Session::get('purchase_id') : $_COOKIE['purchase_id'] ?? null;

        if (Session::has('purchase_id')) {
            Session::forget('purchase_id');
        }

        abort_if($purchaseId == null, 404);

        $purchase = $this->purchaseRepository->getPurchaseById($purchaseId);

        abort_if(empty($purchase), 404);

        $purchase->loadMissing(['purchaseProducts.product', 'createdBy', 'partyLedger']);

        $purchase['purchase_date'] = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-M-Y') : '';

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        // code for generate pdf. do not remove

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('tmp');

        // $title =  Str::slug(__('Purchase Receipt'));
        // $header =  view('pdf.empty_header')->render();
        // $footer =  view('pdf.empty_footer')->render();

        // $pdf = new Mpdf([
        //     'mode' => 'utf-8',
        //     'format' => 'A4',
        //     'default_font_size' => 10,
        //     //'default_font' => 'chelvetica',
        //     'margin_left' => 20,
        //     'margin_right' => 15,
        //     'margin_top' => 8,
        //     'margin_bottom' => 0,
        //     'margin_header' => 5,
        //     'margin_footer' => 5,
        //     'orientation' => 'P',
        //     'tempDir' => $storage->path('tmp'),
        // ]);

        // $pdf->PDFA = false;
        // $pdf->use_kwt = true;
        // $pdf->setAutoTopMargin = 'pad';
        // $pdf->setAutoBottomMargin = 'pad';

        // $pdf->SetTitle($title);
        // $pdf->SetAuthor(config('app.name'));

        // if ($header) {
        //     $pdf->SetHTMLHeader($header);
        // }
        // if ($footer) {
        //     $pdf->SetHTMLFooter($footer);
        // }

        return view('pdf.account.purchase_receipt', ['purchase' => $purchase, 'schoolData' => $schoolData]);

        // code for generate pdf. do not remove

        // $pdf->writeHTML(view('pdf.account.purchase_receipt', ['purchase' => $purchase, 'schoolData' => $schoolData])->render());

        // $pdfContent = $pdf->output();

        // return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Purchase Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printPurchaseReport(Request $request)
    {
        $partyAccountId = $request->party_account_id ?? null;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $purchaseReport = $this->getPurchaseReportData($partyAccountId, $start_date, $end_date);

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($purchaseReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Purchase Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.purchase_report', [
            'purchaseReport' => $purchaseReport,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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

    /**
     * Sale Ledger Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSaleLedgerReport(Request $request)
    {
        $ledgerId = $request->ledger_id ?? null;
        $search = $request->search_value ?? '';
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $saleReport = $this->getSaleLedgerReportData($search, $start_date, $end_date, $ledgerId);

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($saleReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Inventory Sale Register'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.sale_ledger_report', [
            'saleReport' => $saleReport,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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

    /**
     * Product Purchase Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printProductPurchaseReport(Request $request)
    {
        $productId = $request->product_id ?? '';
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $productPurchaseReport = [];
        $product = null;

        if (!empty($productId)) {
            if (!empty($start_date) && !empty($end_date)) {
                $productPurchaseReport = $this->getProductPurchaseReportData($productId, $start_date, $end_date);
            }

            $product = $this->productRepository->getProductById($productId);
        }

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($productPurchaseReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "from {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Product Purchase Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.product_purchase_report', [
            'productPurchaseReport' => $productPurchaseReport,
            'product' => $product,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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
                    'tax_amount' => 0,
                    'discount_amount' => 0,
                    'amount' => $purchaseProduct->amount,
                ];
            })->toArray();

            $productPurchaseReport['total_quantity'] = $totalQuantity;
            $productPurchaseReport['total_tax_amount'] = 0;
            $productPurchaseReport['total_discount_amount'] = 0;
            $productPurchaseReport['total_amount'] = $totalAmount;
        }

        return $productPurchaseReport;
    }

    /**
     * Product Sale Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printProductSaleReport(Request $request)
    {
        $productId = $request->product_id ?? '';
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $productSaleReport = [];
        $product = null;

        if (!empty($productId)) {
            if (!empty($start_date) && !empty($end_date)) {
                $productSaleReport = $this->getProductSaleReportData($productId, $start_date, $end_date);
            }

            $product = $this->productRepository->getProductById($productId);
        }

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($productSaleReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "from {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Product Sale Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.product_sale_report', [
            'productSaleReport' => $productSaleReport,
            'product' => $product,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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

    /**
     * Party Wise Sale Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printPartyWiseSaleReport(Request $request)
    {
        $saleType = $request->sale_type ?? '';
        $teacherStudentType = $request->teacher_student_type ?? '';
        $studentId = $request->student_id ?? '';
        $staffId = $request->staff_id ?? '';
        $classroomId = $request->classroom_id ?? '';

        $partyWiseSaleReport = [];

        if (!empty($saleType) && !empty($teacherStudentType) && (($teacherStudentType == 'Student' && !empty($studentId)) || ($teacherStudentType == 'Teacher' && !empty($staffId)))) {
            $partyWiseSaleReport = $this->getPartyWiseSaleReportData($saleType, $teacherStudentType, $classroomId, $studentId, $staffId);
        }

        $schoolData = [];
        $reportTitle = "Party Wise Sale Report";

        if ($saleType == 'pending') {
            $reportTitle = "Party Wise Sale Report  (Pending Sales)";
        } else if ($saleType == 'paid') {
            $reportTitle = "Party Wise Sale Report  (Paid Sales)";
        }

        if (!empty($partyWiseSaleReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Party Wise Sale Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.party_wise_sale_report', [
            'partyWiseSaleReport' => $partyWiseSaleReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * Helper method to get party wise sale report data
    */
    private function getPartyWiseSaleReportData($saleType, $teacherStudentType, $classroomId, $studentId, $staffId)
    {
        $partyWiseSaleReport = [];
        $saleLedgers = [];

        if ($saleType == 'pending') {
            $saleLedgers = $this->saleRepository->getPendingSale($teacherStudentType, $classroomId, $studentId, $staffId);
        } else if ($saleType == 'paid') {
            $saleLedgers = $this->saleRepository->getPaidSale($teacherStudentType, $classroomId, $studentId, $staffId);
        }

        if (count($saleLedgers) > 0) {
            $totalAmount = 0;
            $totalPaidAmount = 0;
            $totalDueAmount = 0;

            foreach ($saleLedgers as $index => $saleLedger) {
                $date = !empty($saleLedger->sale_date_at) ? Carbon::parse($saleLedger->sale_date_at)->format('d-M-Y') : '';
                $title = "Sale, Receipt No - {$saleLedger?->receipt_no}, $date";

                $partyWiseSaleReport['reports'][$index] = [
                    'sr_no' => $index + 1,
                    'title' => $title,
                    'total_amount' => $saleLedger->total ?? 0,
                    'paid_amount' => $saleLedger->paid_amount ?? 0,
                    'due_amount' => $saleLedger->due_amount ?? 0,
                    'sale_ledger_products' => []
                ];

                if ($saleLedger?->saleLedgerProducts?->count() > 0) {
                    foreach ($saleLedger->saleLedgerProducts as $saleLedgerProduct) {
                        $partyWiseSaleReport['reports'][$index]['sale_ledger_products'][] = [
                            'product_title' => $saleLedgerProduct?->product?->title,
                            'rate' => $saleLedgerProduct->rate ?? 0,
                            'quantity' => $saleLedgerProduct->quantity ?? 1,
                            'tax_amount' => $saleLedgerProduct->tax_amount ?? 0,
                            'discount_amount' => $saleLedgerProduct->discount_amount ?? 0,
                            'total_amount' => $saleLedgerProduct->total_amount ?? 0
                        ];
                    }
                }

                $totalAmount += $saleLedger->total ?? 0;
                $totalPaidAmount += $saleLedger->paid_amount ?? 0;
                $totalDueAmount += $saleLedger->due_amount ?? 0;
            }

            $partyWiseSaleReport['total_amount'] = $totalAmount;
            $partyWiseSaleReport['total_paid_amount'] = $totalPaidAmount;
            $partyWiseSaleReport['total_due_amount'] = $totalDueAmount;
        }

        return $partyWiseSaleReport;
    }

    /**
     * Sale Due Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSaleDueReport(Request $request)
    {
        $saleDueReport = $this->getSaleDueReportData();

        $schoolData = [];

        if (!empty($saleDueReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Sale Due Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.sale_due_report', [
            'saleDueReport' => $saleDueReport,
            'schoolData' => $schoolData
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * Helper method to get sale due report data
    */
    private function getSaleDueReportData(string $search = '')
    {
        $saleDueReport = [];

        $dueSaleLedgers = $this->saleRepository->getDueReportForStudent($search);

        if (count($dueSaleLedgers) > 0) {
            $count = 0;
            $totalDueAmount = 0;

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

                if (!isset($saleDueReport['reports'][$key])) {
                    $count++;

                    $saleDueReport['reports'][$key] = [
                        'sr_no' => $count,
                        'name' => $name,
                        'admission_no' => $admissionNo,
                        'classroom_title' => $classroomTitle,
                        'phone' => $phone,
                        'due_amount' => 0,
                    ];
                }

                $saleDueReport['reports'][$key]['due_amount'] = ($saleDueReport['reports'][$key]['due_amount'] ?? 0) + ($dueSaleLedger->due_amount ?? 0);

                $totalDueAmount += $dueSaleLedger->due_amount ?? 0;
            }

            $saleDueReport['total_due_amount'] = $totalDueAmount;
        }

        return $saleDueReport;
    }

    /**
     * Sale Paid Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printSalePaidReport(Request $request)
    {
        $salePaidReport = $this->getSalePaidReportData();

        $schoolData = [];

        if (!empty($salePaidReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Sale Paid Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.sale_paid_report', [
            'salePaidReport' => $salePaidReport,
            'schoolData' => $schoolData
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * Helper method to get sale paid report data
    */
    private function getSalePaidReportData(string $search = '')
    {
        $salePaidReport = [];

        $paidSaleLedgers = $this->saleRepository->getPaidReportForStudent($search);

        if (count($paidSaleLedgers) > 0) {
            $count = 0;
            $totalPaidAmount = 0;

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

                if (!isset($salePaidReport['reports'][$key])) {
                    $count++;

                    $salePaidReport['reports'][$key] = [
                        'sr_no' => $count,
                        'name' => $name,
                        'admission_no' => $admissionNo,
                        'classroom_title' => $classroomTitle,
                        'phone' => $phone,
                        'paid_amount' => 0,
                    ];
                }

                $salePaidReport['reports'][$key]['paid_amount'] = ($salePaidReport['reports'][$key]['paid_amount'] ?? 0) + ($paidSaleLedger->paid_amount ?? 0);

                $totalPaidAmount += $paidSaleLedger->paid_amount ?? 0;
            }

            $salePaidReport['total_paid_amount'] = $totalPaidAmount;
        }

        return $salePaidReport;
    }

    /**
     * Consolidated Sale Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printConsolidatedSaleReport(Request $request)
    {
        $start_date = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        $end_date = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';

        list($consolidatedSaleReport, $consolidatedSaleSummary) = $this->getConsolidatedSaleReportData($start_date, $end_date);

        $schoolData = [];

        if (!empty($consolidatedSaleReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Consolidated Sale Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.consolidated_sale_report', [
            'consolidatedSaleReport' => $consolidatedSaleReport,
            'consolidatedSaleSummary' => $consolidatedSaleSummary,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * Helper method to get consolidated sale report data
    */
    private function getConsolidatedSaleReportData(string $startDate = '', string $endDate = '')
    {
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
                $consolidatedSaleReport['reports'][] = [
                    'invoice_no' => $invoiceNo,
                    'sale_date' => $saleDate,
                    'name' => $name,
                    'admission_no' => $saleLedger?->student?->admission_no,
                    'classroom_title' => $saleLedger?->classroom?->title,
                    'payment_mode' => $paymentMode,
                    'sale_amount' => $saleAmount,
                    'sale_return_amount' => $saleReturnAmount
                ];

                $consolidatedSaleReport['total_sale_amount'] = ($consolidatedSaleReport['total_sale_amount'] ?? 0) + $saleAmount;
                $consolidatedSaleReport['total_sale_return_amount'] = ($consolidatedSaleReport['total_sale_return_amount'] ?? 0) + $saleReturnAmount;

                // summary
                if (!isset($consolidatedSaleSummary['reports'][$paymentMode])) {
                    $consolidatedSaleSummary['reports'][$paymentMode] = [
                        'payment_mode' => $paymentMode,
                        'sale_amount' => 0,
                        'sale_return_amount' => 0
                    ];
                }

                $consolidatedSaleSummary['reports'][$paymentMode]['sale_amount'] = ($consolidatedSaleSummary['reports'][$paymentMode]['sale_amount'] ?? 0) + $saleAmount;
                $consolidatedSaleSummary['reports'][$paymentMode]['sale_return_amount'] = ($consolidatedSaleSummary['reports'][$paymentMode]['sale_return_amount'] ?? 0) + $saleReturnAmount;

                $consolidatedSaleSummary['total_sale_amount'] = ($consolidatedSaleSummary['total_sale_amount'] ?? 0) + $saleAmount;
                $consolidatedSaleSummary['total_sale_return_amount'] = ($consolidatedSaleSummary['total_sale_return_amount'] ?? 0) + $saleReturnAmount;
            }

            $consolidatedSaleSummary['reports'] = !empty($consolidatedSaleSummary['reports']) ? array_values($consolidatedSaleSummary['reports']) : [];
        }


        return [$consolidatedSaleReport, $consolidatedSaleSummary];
    }

    /**
     * Journal Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printJournalReport(Request $request)
    {
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";

        $journalReport = $this->getJournalReportData($start_date, $end_date);

        $schoolData = [];
        $reportDateTitle = "";

        if (!empty($journalReport)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Journal Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
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

        $pdf->writeHTML(view('pdf.account.journal_report', [
            'journalReport' => $journalReport,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
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

    /**
     * Journal Receipt
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printJournalReceipt()
    {
        $journalId = $_COOKIE['journal_id'] ?? null;

        abort_if($journalId == null, 404);

        $journal = $this->journalRepository->getJournalById($journalId);

        abort_if(empty($journal), 404);

        $journal->loadMissing(['journalLedgers.ledger']);

        $journal['journal_date'] = !empty($journal->journal_date) ? Carbon::parse($journal->journal_date)->format('d-M-Y') : '';
        $journal['total_debit'] = $journal?->journalLedgers?->sum('debit_amount');
        $journal['total_credit'] = $journal?->journalLedgers?->sum('credit_amount');

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
            ];
        }

        return view('pdf.account.journal_receipt', [
            'journal' => $journal,
            'schoolData' => $schoolData
        ]);
    }
}
