<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LedgerRequest;
use App\Http\Requests\CompanyRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILedgerRepository;
use App\Repositories\ICompanyRepository;
use App\Repositories\IAccountGroupRepository;

class CompanyController extends Controller
{

    public function __construct(
        private ICompanyRepository $companyRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
    ) {
        $this->middleware('permission:view account company', ['only' => ['show']]);
        $this->middleware('permission:add account company', ['only' => ['save']]);
        $this->middleware('permission:edit account company', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete account company', ['only' => ['destroy']]);
    }

    /**
     * display form and list
     */
    public function show(Request $request): Response
    {
        // filter data
        $search = !empty($_GET['search']) ? $_GET['search'] : '';

        // companies
        $companies = $this->companyRepository->getActiveList($search);

        return Inertia::render('Inventory/CreateCompany', [
            'companies' => $companies,
            'search' => $search,
        ]);
    }


    /**
     * save
     */
    public function save(CompanyRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // create company
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'title' => $input['title'] ?? null,
                'mobile' => $input['mobile'] ?? null,
                'email' => $input['email'] ?? null,
                'address' => $input['address'] ?? null,
                'status' => Status::ACTIVE,
            );

            $company = $this->companyRepository->create($dataArray);

            // account group
            $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Direct Expenses');

            // create ledger
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'account_group_id' => $accountGroup->id ?? null,
                'company_id' => $company?->id,
                'title' => $input['title'] ?? null,
                'amount_type' => LedgerAmountType::DEBIT,
                'is_system_default' => true,
                'status' => Status::ACTIVE,
            ];

            $this->ledgerRepository->create($dataArray);

            DB::commit();

            return redirect()->route('company.list')->with('message', 'Company created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('company.list')->with('error', 'Something goes wrong.');
        }
    }

    public function save_old(CompanyRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? null,
            'mobile' => $input['mobile'] ?? null,
            'email' => $input['email'] ?? null,
            'address' => $input['address'] ?? null,
            'status' => Status::ACTIVE,
        );

        $company = $this->companyRepository->create($dataArray);
        if (!$company) {
            return redirect()->route('company.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('company.list')->with('message', 'Company created successfully.');
    }


    /**
     * Display edit form and list
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('company.list');
        }

        // filter data
        $search = !empty($_GET['search']) ? $_GET['search'] : '';

        // company
        $company = $this->companyRepository->getById($id);
        $companies = $this->companyRepository->getActiveList();

        return Inertia::render('Inventory/EditCompany', [
            'company' => $company,
            'companies' => $companies,
            'search' => $search,
        ]);
    }

    /**
     * Update
     */
    public function update(CompanyRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? null,
            'mobile' => $input['mobile'] ?? null,
            'email' => $input['email'] ?? null,
            'address' => $input['address'] ?? null,
            'status' => Status::ACTIVE,
        );

        $company = $this->companyRepository->update($id, $dataArray);
        if (!$company) {
            return redirect()->route('company.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('company.list')->with('message', 'Company updated successfully.');
    }

    /**
     * Delete ledger
     */
    public function destroy(String $id): RedirectResponse
    {
        $company = $this->companyRepository->getById($id);
        if (!$company) {
            return redirect()->route('company.list')->with('error', 'Data not found.');
        }
        $this->companyRepository->delete($id);
        return redirect()->route('company.list')->with('message', 'Company deleted successfully.');
    }
}
