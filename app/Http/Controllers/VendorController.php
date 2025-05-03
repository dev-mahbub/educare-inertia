<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\VendorType;
use App\Enums\ProductType;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\VendorRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILedgerRepository;
use App\Repositories\IVendorRepository;
use App\Repositories\IAccountGroupRepository;

class VendorController extends Controller
{

    public function __construct(
        private IVendorRepository $vendorRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
    ) {
        $this->middleware('permission:view vendor', ['only' => ['productVendorShow']]);
        $this->middleware('permission:add vendor', ['only' => ['productVendorSave']]);
        $this->middleware('permission:edit vendor', ['only' => ['productVendorUpdate']]);
        $this->middleware('permission:delete vendor', ['only' => ['productVendorDestroy']]);
    }


    /**
     * Display form and list
     */
    public function productVendorShow(Request $request): Response
    {
        $proVendors = $this->vendorRepository->getActiveAll();
        return Inertia::render('Inventory/ProductVendor', [
            'proVendors' => $proVendors,
        ]);
    }

    /**
     * save
     */
    public function productVendorSave(VendorRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'vendor_type' => VendorType::PRODUCT,
                'title' => $input['title'] ?? "",
                'description' => $input['description'] ?? "",
                'status' => Status::ACTIVE,
            );

            $proVendor = $this->vendorRepository->create($dataArray);

            // account group
            $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Vendors Account');

            if ($accountGroup != null) {
                // create ledger
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'account_group_id' => $accountGroup->id ?? null,
                    'vendor_id' => $proVendor?->id,
                    'title' => $input['title'] ?? null,
                    'amount_type' => LedgerAmountType::DEBIT,
                    'is_system_default' => true,
                    'status' => Status::ACTIVE,
                ];

                $this->ledgerRepository->create($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Vendor created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function productVendorSave_old(VendorRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'vendor_type' => VendorType::PRODUCT,
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $proVendor = $this->vendorRepository->create($dataArray);
        if (!$proVendor) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Vendor created successfully.');
    }

    /**
     *
     */
    public function productVendorUpdate(VendorRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
        );

        $proVendor = $this->vendorRepository->update($id, $dataArray);
        if (!$proVendor) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Vendor updated successfully.');
    }

    /**
     * delete proVendor
     */
    public function productVendorDestroy(String $id): RedirectResponse
    {
        $proVendor = $this->vendorRepository->getById($id);
        if (!$proVendor) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        $this->vendorRepository->delete($id);
        return redirect()->back()->with('message', 'Vendor deleted successfully.');
    }
}
