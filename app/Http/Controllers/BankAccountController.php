<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use App\Repositories\IBankRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILedgerRepository;
use App\Repositories\IAccountRepository;
use App\Http\Requests\BankAccountRequest;
use App\Repositories\IBankAccountRepository;
use App\Repositories\IAccountGroupRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class BankAccountController extends Controller
{

    public function __construct(
        private IBankAccountRepository $bankAccountRepository,
        private IAccountRepository $accountRepository,
        private IBankRepository $bankRepository,
        private ILedgerRepository $ledgerRepository,
        private IAccountGroupRepository $accountGroupRepository,
    ) {
        $this->middleware('permission:view accounts', ['only' => ['index']]);
        $this->middleware('permission:add accounts', ['only' => ['save']]);
        $this->middleware('permission:edit accounts', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete accounts', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(): Response
    {
        $bankAccounts = $this->bankAccountRepository->getActiveAll();
        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            return [
                'id' => $bank->id,
                'title' => $bank->name,
            ];
        });

        return Inertia::render('BankAccount/Create', [
            'bankAccounts' => $bankAccounts,
            'banks' => $banks,
        ]);
    }


    /**
     * Save Bank Account
     */
    public function save(BankAccountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $bank_account_exists = $this->bankAccountRepository->checkBankAccount($input['account_name'], $input['account_display_name']);

            if ($bank_account_exists) {
                return redirect()->back()->with('error', 'This account already exists.');
            }

            // create bank account
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                'student_id' => !empty($input['student_id']) ? $input['student_id'] : null,
                'account_name' => !empty($input['account_name']) ? $input['account_name'] : "",
                'account_display_name' => !empty($input['account_display_name']) ? $input['account_display_name'] : "",
                'account_no' => !empty($input['account_no']) ? intval($input['account_no']) : null,
                'account_type' => !empty($input['account_type']) ? $input['account_type'] : "",
                'ifsc_code' => !empty($input['ifsc_code']) ? intval($input['ifsc_code']) : null,
                'micr_no' => !empty($input['micr_no']) ? intval($input['micr_no']) : null,
                'branch_name' => !empty($input['branch_name']) ? $input['branch_name'] : "",
                'branch_address' => !empty($input['branch_address']) ? $input['branch_address'] : "",
                'status' => Status::ACTIVE,
            );

            $bankAccount = $this->bankAccountRepository->create($dataArray);

            // account group
            $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Bank Account');

            // create ledger
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'account_group_id' => $accountGroup->id ?? null,
                'bank_account_id' => $bankAccount?->id,
                'title' => $input['account_name'] ?? null,
                'amount_type' => LedgerAmountType::DEBIT,
                'is_system_default' => true,
                'status' => Status::ACTIVE,
            ];

            $this->ledgerRepository->create($dataArray);

            DB::commit();

            return redirect()->back()->with('message', 'Bank account created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function save_old(BankAccountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $bank_account_exists = $this->bankAccountRepository->checkBankAccount($input['account_name'], $input['account_display_name']);

        if ($bank_account_exists) {
            return redirect()->back()->with('error', 'This account already exists.');
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
            'student_id' => !empty($input['student_id']) ? $input['student_id'] : null,
            'account_name' => !empty($input['account_name']) ? $input['account_name'] : "",
            'account_display_name' => !empty($input['account_display_name']) ? $input['account_display_name'] : "",
            'account_no' => !empty($input['account_no']) ? intval($input['account_no']) : null,
            'account_type' => !empty($input['account_type']) ? $input['account_type'] : "",
            'ifsc_code' => !empty($input['ifsc_code']) ? intval($input['ifsc_code']) : null,
            'micr_no' => !empty($input['micr_no']) ? intval($input['micr_no']) : null,
            'branch_name' => !empty($input['branch_name']) ? $input['branch_name'] : "",
            'branch_address' => !empty($input['branch_address']) ? $input['branch_address'] : "",
            'status' => Status::ACTIVE,
        );

        $bankAccount = $this->bankAccountRepository->create($dataArray);

        if (!$bankAccount) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Bank account created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(BankAccount $bankAccount, Request $request): Response
    {
        $bankAccounts = $this->bankAccountRepository->getActiveAll();
        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            return [
                'id' => $bank->id,
                'title' => $bank->name,
            ];
        });

        return Inertia::render('BankAccount/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'banks' => $banks,
            'bankAccounts' => $bankAccounts,
            'bankAccount' => $bankAccount,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(int $id, BankAccountRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $bank_account_exists = $this->bankAccountRepository->checkBankAccount($input['account_name'], $input['account_display_name'], $id);

        if ($bank_account_exists) {
            return redirect()->back()->with('error', 'This account already exists.');
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
            'student_id' => !empty($input['student_id']) ? $input['student_id'] : null,
            'account_name' => !empty($input['account_name']) ? $input['account_name'] : "",
            'account_display_name' => !empty($input['account_display_name']) ? $input['account_display_name'] : "",
            'account_no' => !empty($input['account_no']) ? intval($input['account_no']) : null,
            'account_type' => !empty($input['account_type']) ? $input['account_type'] : "",
            'ifsc_code' => !empty($input['ifsc_code']) ? intval($input['ifsc_code']) : null,
            'micr_no' => !empty($input['micr_no']) ? intval($input['micr_no']) : null,
            'branch_name' => !empty($input['branch_name']) ? $input['branch_name'] : "",
            'branch_address' => !empty($input['branch_address']) ? $input['branch_address'] : "",
            'status' => Status::ACTIVE,
        );

        $bankAccount = $this->bankAccountRepository->update($id, $dataArray);

        if (!$bankAccount) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('bank_account.list')->with('message', 'Bank account updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        $bankAccount = $this->bankAccountRepository->getById($id);

        if (!$bankAccount) {
            return redirect()->back()->with('error', 'Bank account not found.');
        }

        $this->bankAccountRepository->delete($id);

        return redirect()->route('bank_account.list')->with('message', 'Bank account deleted successfully.');
    }
}
