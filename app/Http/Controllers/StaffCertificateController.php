<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Repositories\IStaffCertificateRepository;
use Illuminate\Http\Request;

class StaffCertificateController extends Controller
{

    public function __construct(
        private IStaffCertificateRepository $staffCertificateRepository,
    ) {
        $this->middleware('permission:add certificate', ['only' => ['staffCertificateSave']]);
    }

    /**
     * staffCertificateSave
     */
    public function staffCertificateSave(Request $request)
    {
        $staffId = $request->input('staff_id') ?? '';

        $dataArr =  [
            'school_id' => getUserSchoolId(),
            'staff_id' => $staffId,
            'certificate_no' => $staffId,
            'generated_date_at' => now(),
            'issue_date_at' => now(),
            'is_generated' => true,
            'status' => Status::ACTIVE->value ?? '',
        ];

        $certificate = $this->staffCertificateRepository->create($dataArr);
        if ($certificate) {
            return response()->json(['status' => 200, 'message' => 'Certificate created successfully']);
        } else {
            return response()->json(['status' => 500, 'message' => 'Error creating Certificate']);
        }
    }

}
