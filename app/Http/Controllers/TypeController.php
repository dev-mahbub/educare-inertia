<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Type;
use App\Enums\TypeEnum;
use App\Enums\VoucherType;
use App\Http\Requests\TypeRequest;
use App\Repositories\ICompanyRepository;
use App\Repositories\TypeRepository;
use App\Repositories\ITypeRepository;
use App\Repositories\IVendorRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TypeController extends Controller
{

    public function __construct(
        private ITypeRepository $typeRepository,
        private IVendorRepository $vendorRepository,
        private ICompanyRepository $companyRepository
    ) {
        // do something
    }



    /**
     * Display form and list
     */
    public function productVoucherTypeShow(Request $request): Response
    {
        $vouchers = $this->typeRepository->getActiveAllVoucherType();

        // company
        $companyData = $this->companyRepository->getActiveNameAndId();
        $company = $companyData->map(fn($company) => ['id' => $company->id, 'title' => $company->title])->all();

        // types
        $voucherType = VoucherType::cases();
        $voucherTypeArr = array();
        foreach ($voucherType as $voucher) {
            array_push($voucherTypeArr, ['id' => $voucher->value, 'title' => $voucher->value]);
        }

        return Inertia::render('Inventory/CreateProductVoucherType', [
            'vouchers' => $vouchers,
            'voucherTypeArr' => $voucherTypeArr,
            'vendors' => $company,
        ]);
    }

    /**
     * save
     */
    public function productVoucherTypSave(TypeRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'company_id' => intval($input['vendor_id']) ?? null,
            'type' => Type::VOUCHER,
            'sub_type' => $input['sub_type'] ?? null,
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $voucherType = $this->typeRepository->create($dataArray);
        if (!$voucherType) {
            return redirect()->route('product_voucher_type.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('product_voucher_type.list')->with('message', 'Voucher type created successfully.');
    }

    /**
     * Display edit form and list
     */
    public function productVoucherTypEdit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('product_voucher_type.list');
        }

        $voucher = $this->typeRepository->getById($id);
        $voucherTypes = $this->typeRepository->getActiveAllVoucherType();

        // company
        $companyData = $this->companyRepository->getActiveNameAndId();
        $company = $companyData->map(fn($company) => ['id' => $company->id, 'title' => $company->title])->all();

        // types
        $voucherType = VoucherType::cases();
        $voucherTypeArr = array();
        foreach ($voucherType as $vt) {
            array_push($voucherTypeArr, ['id' => $vt->value, 'title' => $vt->value]);
        }

        return Inertia::render('Inventory/EditProductVoucherType', [
            'voucher' => $voucher,
            'vouchers' => $voucherTypes,
            'voucherTypeArr' => $voucherTypeArr,
            'vendors' => $company,
        ]);
    }




    /**
     * productVoucherTypUpdate
     */
    public function productVoucherTypUpdate(TypeRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'company_id' => intval($input['vendor_id']) ?? null,
            'type' => Type::VOUCHER,
            'sub_type' => $input['sub_type'] ?? null,
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $voucherType = $this->typeRepository->update($id, $dataArray);
        if (!$voucherType) {
            return redirect()->route('product_voucher_type.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('product_voucher_type.list')->with('message', 'Voucher type updated successfully.');
    }


    /**
     * delete proVendor
     */
    public function productVoucherTypDestroy(String $id): RedirectResponse
    {
        $voucherType = $this->typeRepository->getById($id);
        if (!$voucherType) {
            return redirect()->route('product_voucher_type.list')->with('error', 'Something goes wrong.');
        }
        $this->typeRepository->delete($id);
        return redirect()->route('product_voucher_type.list')->with('message', 'Voucher type deleted successfully.');
    }

    /**
     * bookTypeSave
     */
    public function bookTypeCreateUpdate(Request $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $input = $request->validate(
                [
                    'id' => ['nullable', 'integer'],
                    'school_id' => ['nullable', 'integer'],
                    'title' => ['required', 'string', 'max:255'],
                    'status' => ['nullable', 'string'],
                ]
            );

            $checkArr = [
                'id' => $input['id'] ?? null,
                'school_id' => getUserSchoolId(),
            ];

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'company_id' => null,
                'type' => TypeEnum::BOOK->value,
                'sub_type' => null,
                'title' => $input['title'] ?? null,
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE->value,
            ];
            $this->typeRepository->updateOrCreate($checkArr, $dataArray);
            DB::commit();

            return redirect()->back()->with('message', 'Save successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * bookTypeDestroy
     */
    public function bookTypeDestroy(int $id): RedirectResponse
    {
        $bookType = $this->typeRepository->getById($id);
        if (!$bookType) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        $this->typeRepository->delete($id);
        return redirect()->back()->with('message', 'Deleted successfully.');
    }
}
