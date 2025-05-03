<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\LibraryRequest;
use App\Http\Requests\LibraryVendorRequest;
use App\Repositories\LibraryRepository;
use App\Repositories\ILibraryRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LibraryVendorController extends Controller
{

    public function __construct(
        private ILibraryRepository $libraryRepository
    ) {
        $this->middleware('permission:view library', ['only' => ['index']]);
        $this->middleware('permission:add library', ['only' => ['save']]);
        $this->middleware('permission:delete library', ['only' => ['destroy']]);
    }

    /**
     * index
     */
    public function index(Request $request): Response
    {
        $libraryVendor = $this->libraryRepository->getActiveAllLibraryVendor();

        return Inertia::render('LibraryVendor/Vendors', [
            'libraryVendor' => $libraryVendor,
        ]);
    }

    /**
     * save
     */
    public function save(LibraryVendorRequest $request)
    {
        $input = $request->validated();
        $checkData = [
            'id' => $input['id'] ?? null
        ];
        $arrayData = [
            'school_id' => getUserSchoolId(),
            'vendor_name' => $input['vendor_name'] ?? "",
            'company_name' => $input['company_name'] ?? "",
            'email' => $input['email'] ?? "",
            'website' => $input['website'] ?? "",
            'contact_no' => $input['contact_no'] ?? "",
            'contact_no_two' => $input['contact_no_two'] ?? "",
            'company_address' => $input['company_address'] ?? "",
            'status' => Status::ACTIVE->value,
        ];
        $libraryVendor = $this->libraryRepository->updateOrCreateLibraryVendor($checkData, $arrayData);
        if (!$libraryVendor) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Save successfully.');
    }

   /**
     * destroy
     */
    public function destroy(int $id): RedirectResponse
    {
        $libraryVendor = $this->libraryRepository->getByIdLibraryVendor($id);
        if (!$libraryVendor) {
            return redirect()->route('library_vendor.list')->with('error', 'Data not found.');
        }
        $this->libraryRepository->deleteLibraryVendor($id);
        return redirect()->route('library_vendor.list')->with('message', 'Deleted successfully.');
    }
}
