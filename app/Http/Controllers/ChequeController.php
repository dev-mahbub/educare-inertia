<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\Cheque;
use App\Enums\ChequeStatus;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use App\Http\Requests\ChequeRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\IBankRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\IChequeRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Http\Requests\UpdateChequeRequest;
use App\Repositories\IClassroomRepository;
use App\Repositories\IFeePaymentRepository;
use App\Http\Requests\UpdateChequeNoRequest;
use App\Http\Requests\UpdateChequeDataRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\UpdateChequeStatusRequest;
use App\Repositories\IFeePaymentMethodRepository;

class ChequeController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IChequeRepository $chequeRepository,
        private IStudentRepository $studentRepository,
        private IBankRepository $bankRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IFeePaymentRepository $feePaymentRepository,
    ) {
        $this->middleware('permission:view fees', ['only' => ['pdc', 'manageCheque', 'allPdc', 'bouncedReport',
            'chequeReport', 'clearanceReport'
        ]]);
        $this->middleware('permission:add fees', ['only' => ['savePdc']]);
        $this->middleware('permission:edit fees', ['only' => ['editPdc', 'updatePdc', 'updateChequeData']]);
        $this->middleware('permission:delete fees', ['only' => ['deletePdc']]);
    }

    /**
     * Display pdc.
     */
    public function pdc(Request $request): Response
    {
        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            return [
                'id' => $bank->id,
                'title' => $bank->name,
            ];
        });
        $classrooms = $this->classroomRepository->getActiveAll();
        $cheques = $this->chequeRepository->getActiveAll();
        $cheques->load('bank');

        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $admissionNo = $request->admission_no ?? null;

            if (!empty($admissionNo)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }


                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $student['title'] = ($student?->classroomRoll?->roll_no ?? "") . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }
        }

        return Inertia::render('Cheque/Pdc', [
            'banks' => $banks,
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
            'cheques' => $cheques,
        ]);
    }


    public function savePdc(ChequeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            if (empty($input['cheque_array'])) {
                return redirect()->back()->with('error', 'Required fields cannot be empty.');
            }

            foreach ($input['cheque_array'] as $chequeData) {
                $dataArray = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'classroom_id' => $input['classroom_id'] ?? null,
                    'student_id' => $input['student_id'] ?? null,
                    'bank_id' => $chequeData['bank_id'] ?? null,
                    'branch' => $chequeData['branch'] ?? "",
                    'cheque_date' => !empty($chequeData['cheque_date']) ? Carbon::parse($chequeData['cheque_date'])->format('Y-m-d') : Carbon::now()->format('Y-m-d'),
                    'pay_date' => !empty($chequeData['pay_date']) ? Carbon::parse($chequeData['pay_date'])->format('Y-m-d') : null,
                    'cheque_no' => $chequeData['cheque_no'] ?? "",
                    'amount' => $chequeData['amount'] ?? 0,
                    'cheque_status' => $chequeData['cheque_status'] ?? null,
                    'status' => Status::ACTIVE,
                );

                $this->chequeRepository->create($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Cheque created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    public function editPdc(int $id): Response
    {
        $cheque = $this->chequeRepository->getCurrentSessionWiseById($id);

        $banks = $this->bankRepository->getActiveAll()->map(function ($bank) {
            return [
                'id' => $bank->id,
                'title' => $bank->name,
            ];
        });

        $classrooms = $this->classroomRepository->getActiveAll();
        $students = $this->studentRepository->getActiveNameAndId()->map(function ($student) {
            $student['title'] = "{$student->first_name} {$student->middle_name} {$student->last_name}";
            return $student;
        });
        $cheques = $this->chequeRepository->getActiveAll();
        $cheques->load('bank');

        return Inertia::render('Cheque/EditPdc', [
            'banks' => $banks,
            'classrooms' => $classrooms,
            'students' => $students,
            'cheques' => $cheques,
            'cheque' => $cheque,
        ]);
    }


    public function updatePdc(int $id, ChequeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {

            foreach ($input['cheque_array'] as $chequeData) {
                $dataArray = array(
                    'bank_id' => $chequeData['bank_id'],
                    'branch' => $chequeData['branch'],
                    'cheque_date' => !empty($chequeData['cheque_date']) ? \Carbon\Carbon::parse($chequeData['cheque_date'])->format('Y-m-d') : date('Y-m-d'),
                    'pay_date' => !empty($chequeData['pay_date']) ? \Carbon\Carbon::parse($chequeData['pay_date'])->format('Y-m-d') : null,
                    'cheque_no' => $chequeData['cheque_no'],
                    'amount' => $chequeData['amount'],
                    'cheque_status' => $chequeData['cheque_status'] ?? null,
                    'status' => Status::ACTIVE,
                );

                $this->chequeRepository->update($id, $dataArray);
            }

            DB::commit();

            return redirect()->route('cheque.pdc')->with('message', 'Cheque updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    public function deletePdc(int $id): RedirectResponse
    {
        $cheque = $this->chequeRepository->getById($id);

        if (!$cheque) {
            return redirect()->back()->with('error', 'Cheque not found.');
        }

        $this->chequeRepository->delete($id);

        return redirect()->route('cheque.pdc')->with('message', 'Cheque deleted successfully.');
    }


    public function updateChequeData($id, UpdateChequeDataRequest $request)
    {
        $input = $request->validated();

        $chequeReport = $this->feePaymentMethodRepository->getByPaymentMethodId($id);

        DB::beginTransaction();

        try {
            if ($input['type'] === 'cheque_bounce') {
                $cheque_penalty_amount = !empty(getSiteSettingData('fee_payment_cheque_bounce_fine')) ? getSiteSettingData('fee_payment_cheque_bounce_fine')?->value : 0;

                $chequeReport->is_bounced_cheque = true;
                $chequeReport->is_cleared_cheque = false;
                $chequeReport->is_cancelled = true;
                $chequeReport->cancelled_by = auth()->user()->id;
                $chequeReport->cancellation_date = Carbon::now()->format('Y-m-d');
                $chequeReport->cheque_penalty = $cheque_penalty_amount;
                $chequeReport->save();

                $this->feePaymentRepository->cancelPaymentByPaymentMethodId($chequeReport->id);

                // update payment status to partial
                // $chequeReport->loadMissing(['fee_payments']);

                // $groupedInstallmentIds = [];

                // foreach ($chequeReport->fee_payments as $payment) {
                //     if ($payment->fee_payment_type == FeePaymentType::TRANSPORTVOUCHER->value) {
                //         $installmentId = $payment->voucher_id;
                //     } else if ($payment->fee_payment_type == FeePaymentType::GENERALVOUCHER->value) {
                //         $installmentId = $payment->student_fee_voucher_id;
                //     } else {
                //         $installmentId = $payment->fee_id;
                //     }

                //     $groupedInstallmentIds[$payment->fee_payment_type][] = $installmentId;
                // }

                // foreach ($groupedInstallmentIds as $feePaymentType => $installmentIds) {
                //     $this->feePaymentRepository->updatePaymentStatusByStudentIdAndInstallmentIds($chequeReport->student_id, $installmentIds, $feePaymentType);
                // }
            } else if ($input['type'] === 'cheque_no') {
                if (!empty($input['cheque_no'])) {
                    $chequeReport->cheque_no =  $input['cheque_no'];
                }

                if (!empty($input['cheque_date'])) {
                    $chequeReport->cheque_date = Carbon::parse($input['cheque_date'])->format('Y-m-d');
                }

                $chequeReport->save();
            } else if ($input['type'] === 'clearance_date') {
                if (!empty($input['clearance_date']) && !empty($input['clearance_note'])) {
                    $chequeReport->cheque_clearance_date = Carbon::parse($input['clearance_date'])->format('Y-m-d');
                    $chequeReport->cheque_clearance_note = $input['clearance_note'];
                    $chequeReport->is_cleared_cheque = true;
                    $chequeReport->save();
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Cheque updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Display cheque report.
     */
    public function manageCheque(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $chequeReports = $this->feePaymentMethodRepository->getChequeReports();

        if ($request->isMethod('POST')) {
            $chequeReports = $this->feePaymentMethodRepository->getFilteredChequeReports(
                "cheque_cleared",
                $request->from_date ?? "",
                $request->to_date ?? "",
                $request->classroom_id ?? null,
                $request->cheque_no ?? null,
                $request->admission_no ?? "",
                $request->student_name ?? "",
            );
        }

        return Inertia::render('Cheque/Managecheque', [
            'chequeReports' => $chequeReports,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display all pdc.
     */
    public function allPdc(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $cheques = $this->chequeRepository->getActiveAll();
        $cheques->loadMissing(['bank', 'student.classroom', 'student.father']);

        $cheque_all_status = [];

        foreach (ChequeStatus::cases() as $status) {
            array_push($cheque_all_status, ['id' => $status->value, 'title' => $status->value]);
        }

        if ($request->isMethod('POST')) {
            if (!empty($request->classroom_id)) {
                $cheques = $this->chequeRepository->getFilteredData($request->classroom_id);
                $cheques->loadMissing(['bank', 'student.classroom', 'student.father']);
            }
        }

        return Inertia::render('Cheque/AllPdc', [
            'cheques' => $cheques,
            'cheque_all_status' => $cheque_all_status,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display cheque bounced report.
     */
    public function bouncedReport(): Response
    {
        $bouncedChequeReports = $this->feePaymentMethodRepository->getBouncedChequeReports();

        return Inertia::render('Cheque/BouncedReport', [
            'bouncedChequeReports' => $bouncedChequeReports,
        ]);
    }

    /**
     * Display cheque date report.
     */
    public function chequeReport(Request $request): Response
    {
        $chequeDateReports = $this->feePaymentMethodRepository->getChequeDateReports();

        if ($request->isMethod('POST')) {
            $chequeDateReports = $this->feePaymentMethodRepository->getFilteredChequeReports(
                "cheque_date",
                $request->from_date ?? "",
                $request->to_date ?? ""
            );
        }

        return Inertia::render('Cheque/ChequeReport', [
            'chequeDateReports' => $chequeDateReports,
        ]);
    }

    /**
     * Display cheque clearance report.
     */
    public function clearanceReport(): Response
    {
        $chequeClearanceReports = $this->feePaymentMethodRepository->getChequeClearanceReports();

        return Inertia::render('Cheque/ClearanceReport', [
            'chequeClearanceReports' => $chequeClearanceReports,
        ]);
    }
}
