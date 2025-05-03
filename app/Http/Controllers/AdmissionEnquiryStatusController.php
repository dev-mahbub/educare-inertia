<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\AdmissionEnquiryStatusRequest;
use Illuminate\Http\Request;
use App\Repositories\AdmissionRepository;
use App\Repositories\IAdmissionRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionEnquiryStatusController extends Controller
{
    public function __construct(
        private IAdmissionRepository $admissionRepository,
    ) {
        $this->middleware('permission:view enquiry', ['only' => ['enquiryStatus']]);
        $this->middleware('permission:add enquiry', ['only' => ['save']]);
        $this->middleware('permission:edit enquiry', ['only' => ['edit','update']]);
        $this->middleware('permission:delete enquiry', ['only' => ['destroy']]);
    }

    public function enquiryStatus(Request $request): Response
    {
        $enquiryStatus = $this->admissionRepository->getSchoolWiseActiveAllEnqueryStatus();

        return Inertia::render('Admission/EnquiryStatus', [
            'enquiryStatus' => $enquiryStatus
        ]);
    }

    public function save(AdmissionEnquiryStatusRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $enquiryStatus = $this->admissionRepository->createEnqueryStaus($dataArray);

        if (!$enquiryStatus) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Enquiry Status created successfully.');
    }

    public function edit(int $id): Response
    {
        $enquiryStatus = $this->admissionRepository->getSchoolWiseActiveAllEnqueryStatus();
        $enquiryStatusId = $this->admissionRepository->getSchoolWiseEnqueryStatusById($id);

        return Inertia::render('Admission/EditEnquiryStatus', [
            'enquiryStatus' => $enquiryStatus,
            'enquiryStatusId' => $enquiryStatusId,
        ]);
    }
    public function update(AdmissionEnquiryStatusRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
        );

        $enquiryStatus = $this->admissionRepository->updateEnquiryStatus($id, $dataArray);

        if (!$enquiryStatus) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('admission.enquiry_status')->with('message', 'Enquiry Status Updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $enquiryStatus = $this->admissionRepository->getSchoolWiseEnqueryStatusById($id);

        if (!$enquiryStatus) {
            return redirect()->route('admission.enquiry_status')->with('error', 'Source not found.');
        }

        $this->admissionRepository->deleteEnqueryStaus($id);

        return redirect()->route('admission.enquiry_status')->with('message', 'Enquiry Status deleted successfully.');
    }
}
