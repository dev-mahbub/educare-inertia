<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Repositories\ISaleRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\IPaymentRepository;
use App\Repositories\IReceiptRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\SiteSettingRequest;
use App\Repositories\IPurchaseRepository;
use App\Repositories\SiteSettingRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IAccountGroupRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class SiteSettingController extends Controller
{

    public function __construct(
        private ISiteSettingRepository $siteSettingRepository,
        private IPaymentRepository $paymentRepository,
        private IReceiptRepository $receiptRepository,
        private IPurchaseRepository $purchaseRepository,
        private ISaleRepository $saleRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
    ) {
        $this->middleware('permission:view account setting', ['only' => ['accountSetting']]);
        $this->middleware('permission:add account setting', ['only' => ['accountSettingSave', 'accountSettingCheckboxSave']]);
    }

    /**
     * Display accountSetting
     */
    public function accountSetting(Request $request): Response
    {
        $siteSettingAccount = getSiteSettingDataByType('Account');
        $siteSettingsReceipt = getSiteSettingDataByType('Receipt');
        $siteSettingsVoucher = getSiteSettingDataByType('Voucher');

        return Inertia::render('Inventory/AccountSetting', [
            'siteSettings' => !empty($siteSettingAccount['Account']) ? $siteSettingAccount['Account'] : [],
            'siteSettingsReceipt' => !empty($siteSettingsReceipt['Receipt']) ? $siteSettingsReceipt['Receipt'] : [],
            'siteSettingsVoucher' => !empty($siteSettingsVoucher['Voucher']) ? $siteSettingsVoucher['Voucher'] : [],
        ]);
    }

    /**
     * accountSettingSave
     */
    public function accountSettingSave(Request $request): RedirectResponse
    {
        $input = $request->all();

        DB::beginTransaction();

        try {
            if (isset($input['value'])) {
                $canUpdate = true;
                $errorMessage = "Sorry ! You can not change receipt seed setting when transaction is done, if want to change setting, remove all undefined transaction for this session.";

                if ($input['key'] == 'voucher_is_enable_payment' || $input['key'] == 'voucher_payment_voucher_receipt_seed_no') {
                    $ledgerPaymentExists = $this->paymentRepository->ledgerPaymentExists();

                    if ($ledgerPaymentExists) {
                        $canUpdate = false;
                    }
                } else if ($input['key'] == 'voucher_is_enable_receipt' || $input['key'] == 'voucher_receipt_voucher_receipt_seed_no') {
                    $ledgerReceiptExists = $this->receiptRepository->ledgerReceiptExists();

                    if ($ledgerReceiptExists) {
                        $canUpdate = false;
                    }
                } else if ($input['key'] == 'voucher_is_enable_purchase' || $input['key'] == 'voucher_purchase_voucher_receipt_seed_no') {
                    $purchaseExists = $this->purchaseRepository->purchaseExists();

                    if ($purchaseExists) {
                        $canUpdate = false;
                    }
                } else if ($input['key'] == 'voucher_is_enable_sale' || $input['key'] == 'voucher_sale_voucher_receipt_seed_no') {
                    $saleLedgerExists = $this->saleRepository->saleLedgerExists();

                    if ($saleLedgerExists) {
                        $canUpdate = false;
                    }
                } else if ($input['key'] == 'account_is_fee_integrated') {
                    $accountFeeIntegratedSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');

                    if ($accountFeeIntegratedSetting->updated_at > $accountFeeIntegratedSetting->created_at) {
                        $canUpdate = false;
                        $errorMessage = "Cannot be updated.";
                    } else {
                        if ($input['value'] == 'Yes') {
                            $students = $this->studentRepository->getActiveStudentsWithoutLedger();

                            if (count($students) > 0) {
                                $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Debtors');

                                foreach ($students as $student) {
                                    $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                                    $dataArray = [
                                        'school_id' => getUserSchoolId(),
                                        'account_group_id' => $accountGroup->id ?? null,
                                        'student_id' => $student?->id,
                                        'title' => $title,
                                        'amount_type' => LedgerAmountType::DEBIT,
                                        'is_system_default' => true,
                                        'status' => Status::ACTIVE,
                                    ];

                                    $this->ledgerRepository->create($dataArray);
                                }
                            }
                        }
                    }
                } else if ($input['key'] == 'account_is_salary_integrated') {
                    $accountSalaryIntegratedSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');

                    if ($accountSalaryIntegratedSetting->updated_at > $accountSalaryIntegratedSetting->created_at) {
                        $canUpdate = false;
                        $errorMessage = "Cannot be updated.";
                    } else {
                        if ($input['value'] == 'Yes') {
                            $staffs = $this->staffRepository->getActiveTeachersWithoutLedger();

                            if (count($staffs) > 0) {
                                $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Creditors');

                                foreach ($staffs as $staff) {
                                    $title = "{$staff?->first_name} {$staff?->middle_name} {$staff?->last_name}";

                                    $dataArray = [
                                        'school_id' => getUserSchoolId(),
                                        'account_group_id' => $accountGroup->id ?? null,
                                        'staff_id' => $staff?->id,
                                        'title' => $title,
                                        'amount_type' => LedgerAmountType::DEBIT,
                                        'is_system_default' => true,
                                        'status' => Status::ACTIVE,
                                    ];

                                    $this->ledgerRepository->create($dataArray);
                                }
                            }
                        }
                    }
                } else if ($input['key'] == 'account_is_registration_integrated') {
                    if ($input['value'] == 'Yes') {
                        $students = $this->studentRepository->getActiveRegistrationStudentsWithoutLedger();

                        if (count($students) > 0) {
                            $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Debtors');

                            foreach ($students as $student) {
                                $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                                $dataArray = [
                                    'school_id' => getUserSchoolId(),
                                    'account_group_id' => $accountGroup->id ?? null,
                                    'student_id' => $student?->id,
                                    'title' => $title,
                                    'amount_type' => LedgerAmountType::DEBIT,
                                    'is_system_default' => true,
                                    'status' => Status::ACTIVE,
                                ];

                                $this->ledgerRepository->create($dataArray);
                            }
                        }
                    }
                }

                if (!$canUpdate) {
                    return redirect()->back()->with('error', $errorMessage);
                }

                setSiteSettingData($input['type'], $input['key'], $input['value']);
            } else if (isset($input['key_value_array'])) {
                foreach ($input['key_value_array'] as $inputData) {
                    $canUpdate = true;
                    $errorMessage = "Sorry ! You can not change receipt seed setting when transaction is done, if want to change setting, remove all undefined transaction for this session.";

                    if ($inputData['key'] == 'voucher_is_enable_payment' || $inputData['key'] == 'voucher_payment_voucher_receipt_seed_no') {
                        $ledgerPaymentExists = $this->paymentRepository->ledgerPaymentExists();

                        if ($ledgerPaymentExists) {
                            $canUpdate = false;
                        }
                    } else if ($inputData['key'] == 'voucher_is_enable_receipt' || $inputData['key'] == 'voucher_receipt_voucher_receipt_seed_no') {
                        $ledgerReceiptExists = $this->receiptRepository->ledgerReceiptExists();

                        if ($ledgerReceiptExists) {
                            $canUpdate = false;
                        }
                    } else if ($inputData['key'] == 'voucher_is_enable_purchase' || $inputData['key'] == 'voucher_purchase_voucher_receipt_seed_no') {
                        $purchaseExists = $this->purchaseRepository->purchaseExists();

                        if ($purchaseExists) {
                            $canUpdate = false;
                        }
                    } else if ($inputData['key'] == 'voucher_is_enable_sale' || $inputData['key'] == 'voucher_sale_voucher_receipt_seed_no') {
                        $saleLedgerExists = $this->saleRepository->saleLedgerExists();

                        if ($saleLedgerExists) {
                            $canUpdate = false;
                        }
                    } else if ($inputData['key'] == 'account_is_fee_integrated') {
                        $accountFeeIntegratedSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');

                        if ($accountFeeIntegratedSetting->updated_at > $accountFeeIntegratedSetting->created_at) {
                            $canUpdate = false;
                            $errorMessage = "Cannot be updated.";
                        } else {
                            if ($inputData['value'] == 'Yes') {
                                $students = $this->studentRepository->getActiveStudentsWithoutLedger();

                                if (count($students) > 0) {
                                    $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Debtors');

                                    foreach ($students as $student) {
                                        $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                                        $dataArray = [
                                            'school_id' => getUserSchoolId(),
                                            'account_group_id' => $accountGroup->id ?? null,
                                            'student_id' => $student?->id,
                                            'title' => $title,
                                            'amount_type' => LedgerAmountType::DEBIT,
                                            'is_system_default' => true,
                                            'status' => Status::ACTIVE,
                                        ];

                                        $this->ledgerRepository->create($dataArray);
                                    }
                                }
                            }
                        }
                    } else if ($inputData['key'] == 'account_is_salary_integrated') {
                        $accountSalaryIntegratedSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');

                        if ($accountSalaryIntegratedSetting->updated_at > $accountSalaryIntegratedSetting->created_at) {
                            $canUpdate = false;
                            $errorMessage = "Cannot be updated.";
                        } else {
                            if ($inputData['value'] == 'Yes') {
                                $staffs = $this->staffRepository->getActiveTeachersWithoutLedger();

                                if (count($staffs) > 0) {
                                    $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Creditors');

                                    foreach ($staffs as $staff) {
                                        $title = "{$staff?->first_name} {$staff?->middle_name} {$staff?->last_name}";

                                        $dataArray = [
                                            'school_id' => getUserSchoolId(),
                                            'account_group_id' => $accountGroup->id ?? null,
                                            'staff_id' => $staff?->id,
                                            'title' => $title,
                                            'amount_type' => LedgerAmountType::DEBIT,
                                            'is_system_default' => true,
                                            'status' => Status::ACTIVE,
                                        ];

                                        $this->ledgerRepository->create($dataArray);
                                    }
                                }
                            }
                        }
                    } else if ($inputData['key'] == 'account_is_registration_integrated') {
                        if ($inputData['value'] == 'Yes') {
                            $students = $this->studentRepository->getActiveRegistrationStudentsWithoutLedger();

                            if (count($students) > 0) {
                                $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Debtors');

                                foreach ($students as $student) {
                                    $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                                    $dataArray = [
                                        'school_id' => getUserSchoolId(),
                                        'account_group_id' => $accountGroup->id ?? null,
                                        'student_id' => $student?->id,
                                        'title' => $title,
                                        'amount_type' => LedgerAmountType::DEBIT,
                                        'is_system_default' => true,
                                        'status' => Status::ACTIVE,
                                    ];

                                    $this->ledgerRepository->create($dataArray);
                                }
                            }
                        }
                    }

                    if (!$canUpdate) {
                        return redirect()->back()->with('error', $errorMessage);
                    }

                    setSiteSettingData($inputData['type'], $inputData['key'], $inputData['value']);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Setting save successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        // old code

        // $input = $request->all();

        // if (isset($input['value'])) {
        //     $canUpdate = true;

        //     if ($input['key'] == 'voucher_is_enable_payment' || $input['key'] == 'voucher_payment_voucher_receipt_seed_no') {
        //         $ledgerPaymentExists = $this->paymentRepository->ledgerPaymentExists();

        //         if ($ledgerPaymentExists) {
        //             $canUpdate = false;
        //         }
        //     } else if ($input['key'] == 'voucher_is_enable_receipt' || $input['key'] == 'voucher_receipt_voucher_receipt_seed_no') {
        //         $ledgerReceiptExists = $this->receiptRepository->ledgerReceiptExists();

        //         if ($ledgerReceiptExists) {
        //             $canUpdate = false;
        //         }
        //     } else if ($input['key'] == 'voucher_is_enable_purchase' || $input['key'] == 'voucher_purchase_voucher_receipt_seed_no') {
        //         $purchaseExists = $this->purchaseRepository->purchaseExists();

        //         if ($purchaseExists) {
        //             $canUpdate = false;
        //         }
        //     } else if ($input['key'] == 'voucher_is_enable_sale' || $input['key'] == 'voucher_sale_voucher_receipt_seed_no') {
        //         $saleLedgerExists = $this->saleRepository->saleLedgerExists();

        //         if ($saleLedgerExists) {
        //             $canUpdate = false;
        //         }
        //     }

        //     if (!$canUpdate) {
        //         return redirect()->back()->with('error', "Sorry ! You can not change receipt seed setting when transaction is done, if want to change setting, remove all undefined transaction for this session.");
        //     }

        //     $accountSetting = setSiteSettingData($input['type'], $input['key'], $input['value']);

        //     if (empty($accountSetting)) {
        //         return redirect()->back()->with('error', 'Something goes wrong.');
        //     }

        //     return redirect()->back()->with('message', 'Setting save successfully.');
        // } else {
        //     return redirect()->back()->with('error', 'Something goes wrong.');
        // }
    }

    /**
     * accountSettingCheckboxSave
     */
    public function accountSettingCheckboxSave(Request $request): RedirectResponse
    {
        $input = $request->all();
        $jsonString = json_encode($input);
        if (!empty($jsonString)) {
            $accountSetting = setSiteSettingData($input['type'], $input['key'], $jsonString);
            if (empty($accountSetting)) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }
            return redirect()->back()->with('message', 'Setting save successfully.');
        } else {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * SMS Setting Save
     */
    public function smsSettingSave(Request $request): RedirectResponse
    {
        $input = $request->all();

        DB::beginTransaction();

        try {
            if (isset($input['value'])) {
                setSiteSettingData($input['type'], $input['key'], $input['value']);
            } else if (isset($input['key_value_array'])) {
                foreach ($input['key_value_array'] as $inputData) {
                    setSiteSettingData($inputData['type'], $inputData['key'], $inputData['value']);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Setting saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * SMS Setting Save
     */
    public function visitorEnquirySettingSave(Request $request): RedirectResponse
    {
        $input = $request->all();
        DB::beginTransaction();

        try {
            if (isset($input['value'])) {
                setSiteSettingData($input['type'], $input['key'], $input['value']);
            } else if (isset($input['key_value_array'])) {
                foreach ($input['key_value_array'] as $inputData) {
                    setSiteSettingData($inputData['type'], $inputData['key'], $inputData['value']);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Setting saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }
}
