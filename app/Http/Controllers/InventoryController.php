<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AccountRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\AccountRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\IAccountRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ICategoryRepository;
use App\Repositories\IPurchaseRepository;
use App\Repositories\IFeePaymentRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class InventoryController extends Controller
{

    public function __construct(
        private IAccountRepository $accountRepository,
        private ICategoryRepository $categoryRepository,
        private IPurchaseRepository $purchaseRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private ISiteSettingRepository $siteSettingRepository,
    ) {
        $this->middleware('permission:view accounts', ['only' => ['misReport', 'getMonthWiseCollectionReport', 'getMonthWiseExpenseReport']]);
    }

    /**
     * Display the schools.
     */
    public function misReport(Request $request): Response
    {
        // account setting
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        // Purchased
        $totalPurchaseAmount = $this->accountRepository->getTotalPurchaseSum();
        $monthlyPurchaseAmount = $this->accountRepository->getMonthlyPurchaseSum();

        // Return Sale
        $totalReturnSaleAmount = $this->accountRepository->getTotalSaleReturnSum();
        $monthlyReturnSaleAmount = $this->accountRepository->getMonthlySaleReturnSum();

        // Paid Sale
        $totalPaidSaleAmount = $this->accountRepository->getTotalPaidSaleSum();
        $monthlyPaidSaleAmount = $this->accountRepository->getMonthlyPaidSaleSum();

        // Unpaid Sale
        $totalUnpaidSaleAmount = $this->accountRepository->getTotalUnpaidSaleSum();
        $monthlyUnpaidSaleAmount = $this->accountRepository->getMonthlyUnpaidSaleSum();

        // Sale
        $totalSaleAmount = $this->accountRepository->getTotalSaleSum();
        $monthlySaleAmount = $this->accountRepository->getMonthlySaleSum();

        // fee
        if ($isFeeIntegratedWithAccount) {
            $totalSaleAmount += $this->feePaymentRepository->getCurrentAcademicYearTotalCollection();
            $monthlySaleAmount += $this->feePaymentRepository->getCurrentMonthTotalCollectionForAccountReport();
        }

        //Expense
        $totalPaymentAmount = $this->accountRepository->getTotalPaymentSum();
        $monthlyPaymentAmount = $this->accountRepository->getMonthlyPaymentSum();

        $totalExpenseAmount = $totalPaymentAmount + $totalPurchaseAmount + $totalReturnSaleAmount;
        $monthlyExpenseAmount = $monthlyPaymentAmount + $monthlyPurchaseAmount + $monthlyReturnSaleAmount;

        //month wise collection report
        $monthWiseCollectionReport = $this->getMonthWiseCollectionReport($isFeeIntegratedWithAccount);

        //month wise expense report
        $monthWiseExpenseReport = $this->getMonthWiseExpenseReport();

        return Inertia::render('Inventory/MisReport', [
            'totalPurchaseAmount' => $totalPurchaseAmount,
            'monthlyPurchaseAmount' => $monthlyPurchaseAmount,
            'totalReturnSaleAmount' => $totalReturnSaleAmount,
            'monthlyReturnSaleAmount' => $monthlyReturnSaleAmount,
            'totalPaidSaleAmount' => $totalPaidSaleAmount,
            'monthlyPaidSaleAmount' => $monthlyPaidSaleAmount,
            'totalUnpaidSaleAmount' => $totalUnpaidSaleAmount,
            'monthlyUnpaidSaleAmount' => $monthlyUnpaidSaleAmount,
            'totalSaleAmount' => $totalSaleAmount,
            'monthlySaleAmount' => $monthlySaleAmount,
            'currentMonth' => getCurrentMonth(),
            'totalExpenseAmount' => $totalExpenseAmount,
            'monthlyExpenseAmount' => $monthlyExpenseAmount,
            'monthWiseCollectionReport' => $monthWiseCollectionReport,
            'monthWiseExpenseReport' => $monthWiseExpenseReport
        ]);
    }

    /*
    * Helper mehtod to get month wise collection report
    */
    private function getMonthWiseCollectionReport(bool $isFeeIntegratedWithAccount = false)
    {
        $monthWiseCollectionReport = [];

        // sale ledgers
        $saleLedgers = $this->accountRepository->getMonthWiseSaleLedgerReportData();

        if (count($saleLedgers) > 0) {
            foreach ($saleLedgers as $saleLedger) {
                if (!empty($saleLedger->sale_date_at)) {
                    $month = Carbon::parse($saleLedger->sale_date_at)->format('F');

                    if (!isset($monthWiseCollectionReport[$month])) {
                        $monthWiseCollectionReport[$month] = [
                            'month' => Carbon::parse($saleLedger->sale_date_at)->format('m'),
                            'amount' => 0,
                        ];
                    }

                    $monthWiseCollectionReport[$month]['amount'] = ($monthWiseCollectionReport[$month]['amount'] ?? 0) + ($saleLedger->total ?? 0);
                }
            }
        }

        if ($isFeeIntegratedWithAccount) {
            // fee payments
            $feePayments = $this->feePaymentRepository->getMonthWiseCollectionForAccountReport();

            if (count($feePayments) > 0) {
                foreach ($feePayments as $feePayment) {
                    if (!empty($feePayment->payment_method->payment_date)) {
                        $month = Carbon::parse($feePayment->payment_method->payment_date)->format('F');

                        if (!isset($monthWiseCollectionReport[$month])) {
                            $monthWiseCollectionReport[$month] = [
                                'month' => Carbon::parse($feePayment->payment_method->payment_date)->format('m'),
                                'amount' => 0,
                            ];
                        }

                        $monthWiseCollectionReport[$month]['amount'] = ($monthWiseCollectionReport[$month]['amount'] ?? 0) + ($feePayment->paid_amount ?? 0);
                    }
                }
            }
        }

        if (!empty($monthWiseCollectionReport)) {
            // sort report by month
            $monthWiseCollectionReport = collect($monthWiseCollectionReport)
                ->sortBy('month')
                ->map(function ($report) {
                    unset($report['month']);

                    return $report;
                })->toArray();
        }

        return $monthWiseCollectionReport;
    }


    /*
    * Helper mehtod to get month wise expense report
    */
    private function getMonthWiseExpenseReport()
    {
        $monthWiseExpenseReport = [];

        // ledger payments
        $ledgerPayments = $this->accountRepository->getMonthWiseLedgerPaymentReportData();

        if (count($ledgerPayments) > 0) {
            foreach ($ledgerPayments as $ledgerPayment) {
                if (!empty($ledgerPayment->payment_date_at)) {
                    $month = Carbon::parse($ledgerPayment->payment_date_at)->format('F');

                    if (!isset($monthWiseExpenseReport[$month])) {
                        $monthWiseExpenseReport[$month] = [
                            'month' => Carbon::parse($ledgerPayment->payment_date_at)->format('m'),
                            'amount' => 0,
                        ];
                    }

                    $monthWiseExpenseReport[$month]['amount'] = ($monthWiseExpenseReport[$month]['amount'] ?? 0) + ($ledgerPayment->total ?? 0);
                }
            }
        }

        // purchases
        $purchases = $this->accountRepository->getMonthWisePurchaseReportData();

        if (count($purchases) > 0) {
            foreach ($purchases as $purchase) {
                if (!empty($purchase->purchase_date_at)) {
                    $month = Carbon::parse($purchase->purchase_date_at)->format('F');

                    if (!isset($monthWiseExpenseReport[$month])) {
                        $monthWiseExpenseReport[$month] = [
                            'month' => Carbon::parse($purchase->purchase_date_at)->format('m'),
                            'amount' => 0,
                        ];
                    }

                    $monthWiseExpenseReport[$month]['amount'] = ($monthWiseExpenseReport[$month]['amount'] ?? 0) + ($purchase->total ?? 0);
                }
            }
        }

        // sale ledger returns
        $saleLedgerReturns = $this->accountRepository->getMonthWiseSaleLedgerReturnReportData();

        if (count($saleLedgerReturns) > 0) {
            foreach ($saleLedgerReturns as $saleLedgerReturn) {
                if (!empty($saleLedgerReturn->return_date_at)) {
                    $month = Carbon::parse($saleLedgerReturn->return_date_at)->format('F');

                    if (!isset($monthWiseExpenseReport[$month])) {
                        $monthWiseExpenseReport[$month] = [
                            'month' => Carbon::parse($saleLedgerReturn->return_date_at)->format('m'),
                            'amount' => 0,
                        ];
                    }

                    $monthWiseExpenseReport[$month]['amount'] = ($monthWiseExpenseReport[$month]['amount'] ?? 0) + ($saleLedgerReturn->total ?? 0);
                }
            }
        }

        if (!empty($monthWiseExpenseReport)) {
            // sort report by month
            $monthWiseExpenseReport = collect($monthWiseExpenseReport)
                ->sortBy('month')
                ->map(function ($report) {
                    unset($report['month']);

                    return $report;
                })->toArray();
        }

        return $monthWiseExpenseReport;
    }
}
