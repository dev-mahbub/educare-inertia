<?php

namespace App\Http\Controllers;

use App\Exports\PreviousDueFeeTemplateExport;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\PreviousDueFeeImport;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ImportPreviousDueFeeRequest;

class FeeImportController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IFeeRepository $feeRepository,
        private IFeeTypeRepository $feeTypeRepository,
    ) {
        $this->middleware('permission:add fees', ['only' => ['importFee', 'importHistory', 'previousDue', 'storePreviousDue', 'storePreviousDue', 'downloadPreviousDueFeeTemplate']]);
    }

    /**
     * Display import fee
     */
    public function importFee(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeImport/ImportFee', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the schools.
     */
    public function importHistory(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('FeeImport/ImportHistory', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the schools.
     */
    public function previousDue(Request $request): Response
    {
        $fees = $this->feeRepository->getActiveAll();
        $feeTypes = $this->feeTypeRepository->getActiveAll()
            ->map(function ($feeType) {
                return [
                    'id' => $feeType->id,
                    'title' => $feeType->fee_type,
                    'is_fee_special' => $feeType->is_fee_special,
                ];
            });

        return Inertia::render('FeeImport/PreviousDue', [
            'fees' => $fees,
            'feeTypes' => $feeTypes,
        ]);
    }


    /**
     * Display the schools.
     */
    public function storePreviousDue(ImportPreviousDueFeeRequest $request)
    {
        DB::beginTransaction();

        try {
            $import = new PreviousDueFeeImport($request);

            Excel::import($import, $request->file('due_fee_file'));

            $validationErrors = $import->getValidationErrors();

            if (!empty($validationErrors)) {
                return redirect()->back()->withErrors($validationErrors);
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Fee imported successfully!']);
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }


    public function downloadPreviousDueFeeTemplate()
    {
        return Excel::download(new PreviousDueFeeTemplateExport, 'student_previous_due_template.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }
}
