<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\AdmissionEnquerySourceRequest;
use Illuminate\Http\Request;
use App\Repositories\AdmissionRepository;
use App\Repositories\IAdmissionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionEnquerySourceController extends Controller
{
    public function __construct(
        private IAdmissionRepository $admissionRepository,
    ) {
        $this->middleware('permission:view enquiry', ['only' => ['enquirySource']]);
        $this->middleware('permission:add enquiry', ['only' => ['save']]);
        $this->middleware('permission:edit enquiry', ['only' => ['edit','update']]);
        $this->middleware('permission:delete enquiry', ['only' => ['destroy']]);
    }

    public function enquirySource(Request $request): Response
    {
        $enquirySource = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource();

        return Inertia::render('Admission/EnquirySource', [
            'enquirySource' => $enquirySource,
        ]);
    }

    public function save(AdmissionEnquerySourceRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $enquerySource = $this->admissionRepository->createEnquerySource($dataArray);

        if (!$enquerySource) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Enquiry source created successfully.');
    }

    public function edit(int $id): Response
    {
        $enquirySource = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource();
        $enquerySourceId = $this->admissionRepository->getSchoolWiseEnquerySourceById($id);

        return Inertia::render('Admission/EditEnquirySource', [
            'enquirySource' => $enquirySource,
            'enquerySourceId' => $enquerySourceId,
        ]);
    }

    public function update(AdmissionEnquerySourceRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $enquerySource = $this->admissionRepository->updateEnquerySource($id, $dataArray);

        if (!$enquerySource) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('admission.enquiry_source')->with('message', 'Enquiry source updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $enquerySource = $this->admissionRepository->getSchoolWiseEnquerySourceById($id);

        if (!$enquerySource) {
            return redirect()->route('admission.enquiry_source')->with('error', 'Enquiry source not found.');
        }

        $this->admissionRepository->deleteEnquerySource($id);

        return redirect()->route('admission.enquiry_source')->with('message', 'Enquiry source deleted successfully.');
    }
}
