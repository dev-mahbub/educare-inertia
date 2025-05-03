<?php

namespace App\Http\Controllers;

use URL;
use Mail;
use Storage;
use Exception;
use Mpdf\Mpdf;
use Throwable;
use ZipArchive;
use App\Mail\Paid;
use Carbon\Carbon;
use App\Helpers\Pdf;

use App\Models\Order;
use Mpdf\MpdfException;
use App\Enums\FeeTypeEnum;
use App\Enums\LateFineType;
use Illuminate\Support\Str;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use Illuminate\Support\Number;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Repositories\IFeeRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IVoucherRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\IFeePaymentRepository;
use Box\Spout\Common\Exception\IOException;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;

final class PdfDemandSlipController extends Controller
{

    private $studentDueInstallments = [];
    private $headWiseDueSummary = [];
    private $headWiseAmounts = [];
    private $installmentWiseDueSummary = [];
    private $installmentWiseAmounts = [];
    private $studentWiseAmounts = [];
    private $studentFeeDiscounts = [];
    private $demandSlipVouchersData = [];
    private $dueReportInstallmentWiseAmounts = [];
    private $dueReportStudentWiseAmounts = [];
    private $installmentWiseStudentDueReport = [];
    private $dueReportVouchersData = [];


    public function __construct(
        private IFeeRepository $feeRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private ITransportRepository $transportRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IVoucherRepository $voucherRepository,
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IFeePaymentRepository $feePaymentRepository,
        private IStaffRepository $staffRepository,
    ) {}
    /**
     * Fee Summary
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function viewStudentDemandSlip()
    {
        $student = array();
        return view("pdf.demand-slip.demand_slip", compact("student"))->render();
    }

    /**
     * Fee Summary
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentDemandSlip(Request $request)
    {
        $reports = $this->getStudentDemandSlipData($request);
        $schoolData = [];

        if (!empty($reports) && !empty($request->classroom_id)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        // new code
        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        if (!empty($reports)) {
            $rowCount = 0;

            foreach ($reports as $studentReport) {
                if (!empty($studentReport['installments'])) {
                    $studentInstallmentReports = [
                        ...$studentReport,
                        'reports' => $studentReport['installments']
                    ];

                    unset($studentInstallmentReports['installments'], $studentInstallmentReports['vouchers']);

                    $pdf->writeHTML(view('pdf.demand-slip.demand_slip_2', ['studentReport' => $studentInstallmentReports, 'schoolData' => $schoolData])->render());

                    $rowCount++;
                }

                if (!empty($studentReport['vouchers'])) {
                    $studentVoucherReports = [
                        ...$studentReport,
                        'reports' => $studentReport['vouchers']
                    ];

                    unset($studentVoucherReports['installments'], $studentVoucherReports['vouchers']);

                    $pdf->writeHTML(view('pdf.demand-slip.demand_slip_2', ['studentReport' => $studentVoucherReports, 'schoolData' => $schoolData])->render());

                    $rowCount++;
                }

                if ($rowCount % 3 === 0) {
                    $pdf->AddPage();
                }
            }
        } else {
            $pdf->writeHTML(view('pdf.demand-slip.demand_slip_2', ['studentReport' => [], 'schoolData' => $schoolData])->render());
        }

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
        // end new code


        // old code. do not remove this code

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Demand Slip')),
        //     view('pdf.demand-slip.demand_slip', ['reports' => $reports, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // // $pdf_name = 'printProgressReportWithGraph';
        // $pdf_name = '';

        // $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        // $storage->put($file, encrypt($content));
        // // Mail::to('nasir.chalo@gmail.com')
        // //     ->send(new Paid($file));

        // abort_if(empty($file) || !$storage->exists($file), 404);

        // $pdfFile = decrypt($storage->get($file));

        // return response()->make(
        //     $pdfFile,
        //     200,
        //     [
        //         'Content-Type' => 'application/pdf',
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Demand Slip') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
        // end old code
    }

    /**
     * Single demand bill/ slip
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentSingleDemandSlip(Request $request)
    {
        $reports = $this->getSingleStudentDemandSlipData($request);
        $schoolData = [];

        if (!empty($reports) && !empty($request->student_id)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.single_demand_slip', ['reports' => $reports, 'schoolData' => $schoolData])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    public function printStudentSingleDemandSlip_old(Request $request)
    {
        $reports = $this->getSingleStudentDemandSlipData($request);
        $schoolData = [];

        if (!empty($reports) && !empty($request->student_id)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Single Demand Slip')),
            view('pdf.demand-slip.single_demand_slip', ['reports' => $reports, 'schoolData' => $schoolData])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        // $pdf_name = 'printProgressReportWithGraph';
        $pdf_name = '';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));
        // Mail::to('nasir.chalo@gmail.com')
        //     ->send(new Paid($file));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Single Demand Slip') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }


    /**
     * Student Due Summary
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentDueSummary(Request $request)
    {
        $reports = $this->getStudentDueReports($request);
        $schoolData = [];
        $classroomTitle = "";

        if (!empty($reports) && !empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom?->title;
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.student_due_summary', ['reports' => $reports, 'schoolData' => $schoolData, 'classroomTitle' => $classroomTitle])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    public function printStudentDueSummary_old(Request $request)
    {
        $reports = $this->getStudentDueReports($request);
        $schoolData = [];
        $classroomTitle = "";

        if (!empty($reports) && !empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom?->title;
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Student Due Summary')),
            view('pdf.demand-slip.student_due_summary', ['reports' => $reports, 'schoolData' => $schoolData, 'classroomTitle' => $classroomTitle])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        // $pdf_name = 'printProgressReportWithGraph';
        $pdf_name = '';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));
        // Mail::to('nasir.chalo@gmail.com')
        //     ->send(new Paid($file));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Student Due Summary') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /**
     * Head Wise - Student Due Summary
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentDueSummaryHeadWise(Request $request)
    {
        $reports = $this->getHeadWiseDueReports($request);
        $schoolData = [];
        $reportTitle = "";

        if (!empty($reports) && !empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $fromInstallment = $this->feeRepository->getFeeTitleById($request->from_installment);
            $toInstallment = $this->feeRepository->getFeeTitleById($request->to_installment);

            $reportTitle = "{$classroom?->title} ({$fromInstallment?->title} to {$toInstallment?->title})";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.student_due_summary_head_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportTitle' => $reportTitle])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    public function printStudentDueSummaryHeadWise_old(Request $request)
    {
        $reports = $this->getHeadWiseDueReports($request);
        $schoolData = [];
        $reportTitle = "";

        if (!empty($reports) && !empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $fromInstallment = $this->feeRepository->getFeeTitleById($request->from_installment);
            $toInstallment = $this->feeRepository->getFeeTitleById($request->to_installment);

            $reportTitle = "{$classroom?->title} ({$fromInstallment?->title} to {$toInstallment?->title})";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Head Wise - Student Due Summary')),
            view('pdf.demand-slip.student_due_summary_head_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportTitle' => $reportTitle])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        // $pdf_name = 'printProgressReportWithGraph';
        $pdf_name = '';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Head Wise - Student Due Summary') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /**
     * Installment Wise - Student Due Summary
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentDueSummaryInstallmentWise(Request $request)
    {
        $reports = $this->getInstallmentWiseDueReports($request);
        $schoolData = [];
        $reportTitle = "";

        if (!empty($reports) && !empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $fromInstallment = $this->feeRepository->getFeeTitleById($request->from_installment);
            $toInstallment = $this->feeRepository->getFeeTitleById($request->to_installment);

            $reportTitle = "{$classroom?->title} ({$fromInstallment?->title} to {$toInstallment?->title})";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.student_due_summary_installment_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportTitle' => $reportTitle])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    public function printStudentDueSummaryInstallmentWise_old(Request $request)
    {
        $reports = $this->getInstallmentWiseDueReports($request);
        $schoolData = [];
        $reportTitle = "";

        if (!empty($reports) && !empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $fromInstallment = $this->feeRepository->getFeeTitleById($request->from_installment);
            $toInstallment = $this->feeRepository->getFeeTitleById($request->to_installment);

            $reportTitle = "{$classroom?->title} ({$fromInstallment?->title} to {$toInstallment?->title})";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Installment Wise - Student Due Summary')),
            view('pdf.demand-slip.student_due_summary_installment_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportTitle' => $reportTitle])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        // $pdf_name = 'printProgressReportWithGraph';
        $pdf_name = '';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Installment Wise - Student Due Summary') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /**
     * Daily Collection Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printDailyCollectionReport(Request $request)
    {
        $feeType = $request->fee_type ?? "";
        $currentSession = $request->current_session ?? false;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $payment_mode = $request->payment_mode ?? "";
        $classNameId = $request->class_name_id ?? null;
        $classroomId = $request->classroom_id ?? null;
        $cancelledFee = $request->cancelled_fee ?? false;
        $excludeVoucherFee = $request->exclude_voucher_fee ?? false;
        $concession = $request->concession ?? false;

        $reports = $this->getFeeDailyCollectionReportData(
            $feeType,
            $currentSession,
            $start_date,
            $end_date,
            $payment_mode,
            $classNameId,
            $classroomId,
            $cancelledFee,
            $excludeVoucherFee,
            $concession,
        );

        $schoolData = [];
        $reportDateTitle = "";
        $feeMode = $request->fee_type ?? "All";
        $paymentMode = $request->payment_mode ?? "All";

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

            $reportDateTitle = "{$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.daily_collection_report', ['reports' => $reports, 'schoolData' => $schoolData, 'reportDateTitle' => $reportDateTitle, 'feeMode' => $feeMode, 'paymentMode' => $paymentMode])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Daily Collection Fee Wise Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printDailyCollectionFeeHeadWiseReport(Request $request)
    {
        $sortBy = $request->sort_by ?? "";
        $voucher = $request->voucher ?? false;
        $cancelledFee = $request->cancelled_fee ?? false;
        $start_date = $request->start_date ?? "";
        $end_date = $request->end_date ?? "";
        $paymentMode = $request->payment_mode ?? "";
        $feeTypeId = $request->fee_type_id ?? null;
        $classNameId = $request->class_name_id ?? null;

        $reports = $this->getHeadWiseDailyCollectionReportData(
            $sortBy,
            $voucher,
            $cancelledFee,
            $start_date,
            $end_date,
            $paymentMode,
            $feeTypeId,
            $classNameId
        );

        $schoolData = [];
        $reportDate = Carbon::now()->format('d-m-Y');
        $classNameTitle = "All";
        $reportDateTitle = "";

        if (!empty($classNameId)) {
            $classNameTitle = $this->classroomRepository->getClassNameTitleById($classNameId);
        }

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

            $reportDateTitle = "From {$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.daily_collection_fee_head_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportDateTitle' => $reportDateTitle, 'classNameTitle' => $classNameTitle, 'reportDate' => $reportDate, 'includeSummaryPage' => false])->render());

        $pdf->addPage();

        $pdf->writeHTML(view('pdf.demand-slip.daily_collection_fee_head_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportDateTitle' => $reportDateTitle, 'classNameTitle' => $classNameTitle, 'reportDate' => $reportDate, 'includeSummaryPage' => true])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Daily Collection Report With Inventory
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printDailyCollectionWithInventoryReport(Request $request)
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.daily_collection_with_inventory', ['report' => [], 'schoolData' => []])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * Head Wise Daily Fee Summary Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printHeadWiseDailyFeeSummaryReport(Request $request)
    {
        $headWiseDailySummaryReport = [];

        if (!empty($request->start_date) && !empty($request->end_date)) {
            $headWiseDailySummaryReport = $this->getHeadWiseDailyFeeSummaryReportData(
                $request->filter_mode ?? "head_wise",
                $request->start_date,
                $request->end_date,
                $request->payment_mode ?? "",
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";
        $reportDateTitle = "From {$startDate} to {$endDate}";
        $reportDate = Carbon::now()->format('d-m-Y');
        $paymentMode = $request->payment_mode ?? "All";

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.head_wise_daily_fee_summary', [
            'headWiseDailySummaryReport' => $headWiseDailySummaryReport,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle,
            'reportDate' => $reportDate,
            'paymentMode' => $paymentMode
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get head wise daily fee summary report data
    */
    private function getHeadWiseDailyFeeSummaryReportData(
        $filterMode,
        $startDate,
        $endDate,
        $paymentMode = ""
    ) {
        $headWiseDailySummary = [];
        $headWiseAmounts = [];
        $grand_total_paid = 0;
        $grand_total_discount = 0;

        $dailySummaryData = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentSummary($paymentMode, $startDate, $endDate);

        $headWiseDailySummary = $dailySummaryData->groupBy('payment_date')
            ->map(function ($groupedReports) use (
                &$headWiseAmounts,
                $filterMode,
                &$grand_total_paid,
                &$grand_total_discount,
            ) {
                $total_paid = 0;
                $total_discount = 0;
                $groupedHeadWiseAmounts = [];

                $groupedReports->each(function ($report) use (
                    &$headWiseAmounts,
                    &$groupedHeadWiseAmounts,
                    &$total_paid,
                    &$total_discount,
                    $filterMode
                ) {
                    if (count($report->fee_payments) > 0) {
                        $report->fee_payments->each(function ($feePayment) use (
                            &$headWiseAmounts,
                            &$groupedHeadWiseAmounts,
                            &$total_paid,
                            &$total_discount,
                            $report,
                            $filterMode
                        ) {
                            if ($filterMode == 'head_wise') {
                                // calculate fee type paid amount for grand total
                                if (isset($headWiseAmounts[$feePayment->feeType->fee_type])) {
                                    $headWiseAmounts[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $headWiseAmounts[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }

                                // calculate fee type paid amount for date wise total
                                if (isset($groupedHeadWiseAmounts[$feePayment->feeType->fee_type])) {
                                    $groupedHeadWiseAmounts[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $groupedHeadWiseAmounts[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }
                            }

                            if ($filterMode == 'payment_mode_wise') {
                                // calculate payment mode paid amount for grand total
                                if (isset($headWiseAmounts[$report->payment_mode])) {
                                    $headWiseAmounts[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $headWiseAmounts[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }

                                // calculate payment mode paid amount for date wise total
                                if (isset($groupedHeadWiseAmounts[$report->payment_mode])) {
                                    $groupedHeadWiseAmounts[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $groupedHeadWiseAmounts[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }
                            }

                            $total_paid += (float) $feePayment->paid_amount;
                            $total_discount += (float) $feePayment->discount_amount;
                        });
                    }
                });

                $grand_total_paid += $total_paid;
                $grand_total_discount += $total_discount;

                return collect([
                    'date' => Carbon::parse($groupedReports->first()->payment_date)->format('d-M-Y'),
                    'total' => $total_paid,
                    'concession' => $total_discount,
                    'head_wise_amounts' => $groupedHeadWiseAmounts
                ]);
            })->toArray();

        return [
            'reports' => $headWiseDailySummary,
            'head_wise_amounts' => $headWiseAmounts,
            'total' => $grand_total_paid,
            'concession' => $grand_total_discount,
        ];
    }

    /**
     * Head Wise Daily Paid Fee Summary Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printHeadWiseDailySummaryReport(Request $request)
    {
        $headWiseReport = [];

        if (!empty($request->start_date) && !empty($request->end_date)) {
            $headWiseReport = $this->getHeadWiseDailySummaryReportData(
                $request->filter_mode ?? "head_wise",
                $request->start_date,
                $request->end_date,
                $request->payment_mode ?? "",
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";
        $reportDateTitle = "From {$startDate} to {$endDate}";
        $paymentMode = $request->payment_mode ?? "All";

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.head_wise_daily_summary', [
            'headWiseReport' => $headWiseReport,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle,
            'paymentMode' => $paymentMode
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get head wise daily fee summary report data
    */
    private function getHeadWiseDailySummaryReportData(
        $filterMode,
        $startDate,
        $endDate,
        $paymentMode = ""
    ) {
        $headWiseSummaryReport = [];
        $total_paid = 0;

        $dailySummaryData = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentSummary($paymentMode, $startDate, $endDate);

        $dailySummaryData->groupBy('payment_date')
            ->each(function ($groupedReports) use (
                &$headWiseSummaryReport,
                $filterMode,
                &$total_paid,
            ) {
                $groupedReports->each(function ($report) use (
                    &$headWiseSummaryReport,
                    &$total_paid,
                    $filterMode
                ) {
                    if (count($report->fee_payments) > 0) {
                        $report->fee_payments->each(function ($feePayment) use (
                            &$headWiseSummaryReport,
                            &$total_paid,
                            $report,
                            $filterMode
                        ) {
                            if ($filterMode == 'head_wise') {
                                // calculate fee type paid amount for grand total
                                if (isset($headWiseSummaryReport[$feePayment->feeType->fee_type])) {
                                    $headWiseSummaryReport[$feePayment->feeType->fee_type] += (float) $feePayment->paid_amount;
                                } else {
                                    $headWiseSummaryReport[$feePayment->feeType->fee_type] = (float) $feePayment->paid_amount;
                                }
                            }

                            if ($filterMode == 'payment_mode_wise') {
                                // calculate payment mode paid amount for grand total
                                if (isset($headWiseSummaryReport[$report->payment_mode])) {
                                    $headWiseSummaryReport[$report->payment_mode] += (float) $feePayment->paid_amount;
                                } else {
                                    $headWiseSummaryReport[$report->payment_mode] = (float) $feePayment->paid_amount;
                                }
                            }

                            $total_paid += (float) $feePayment->paid_amount;
                        });
                    }
                });
            })->toArray();

        return [
            'head_wise_amounts' => $headWiseSummaryReport,
            'total' => $total_paid
        ];
    }

    /**
     * Yearly Head Wise Paid Summary Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printYearlyHeadWisePaidSummaryReport(Request $request)
    {
        $yearlyHeadWiseSummaryReport = [];

        if (!empty($request->start_date) && !empty($request->end_date)) {
            $yearlyHeadWiseSummaryReport = $this->getYearlyHeadWisePaidSummaryReportData(
                $request->start_date,
                $request->end_date,
                $request->payment_mode ?? "",
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
        $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";
        $reportDateTitle = "From {$startDate} to {$endDate}";
        $reportDate = Carbon::now()->format('d-m-Y');
        $paymentMode = $request->payment_mode ?? "All";

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.yearly_head_wise_paid_summary', [
            'yearlyHeadWiseSummaryReport' => $yearlyHeadWiseSummaryReport,
            'schoolData' => $schoolData,
            'reportDateTitle' => $reportDateTitle,
            'reportDate' => $reportDate,
            'paymentMode' => $paymentMode
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get head wise daily fee summary report data
    */
    private function getYearlyHeadWisePaidSummaryReportData(
        $startDate,
        $endDate,
        $paymentMode = ""
    ) {
        $yearlyPaidSummary = [];
        $month_wise_amounts = [];
        $fee_type_month_wise_amounts = [];
        $fee_type_refund_amounts = [];
        $grand_total = 0;
        $grand_total_refund = 0;

        $yearlySummaryData = $this->feePaymentMethodRepository->getHeadWiseYearlyFeePaymentSummary($paymentMode, $startDate, $endDate);

        $yearlySummaryData->each(function ($yearlySummary) use (
            &$month_wise_amounts,
            &$yearlyPaidSummary,
            &$fee_type_month_wise_amounts,
            &$fee_type_refund_amounts,
        ) {
            foreach ($yearlySummary->fee_payments as $feePayment) {
                // calculate month wise paid amount for grand total
                $groupDate = Carbon::parse($yearlySummary->payment_date)->format('M-Y');

                if (isset($month_wise_amounts[$groupDate])) {
                    $month_wise_amounts[$groupDate] += (float) $feePayment?->paid_amount ?? 0;
                } else {
                    $month_wise_amounts[$groupDate] = (float) $feePayment?->paid_amount ?? 0;
                }

                // calculate  month wise paid amount for date wise total
                if (isset($fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate])) {
                    $fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate] += (float) $feePayment?->paid_amount ?? 0;
                } else {
                    $fee_type_month_wise_amounts[$feePayment->fee_type_id][$groupDate] = (float) $feePayment?->paid_amount ?? 0;
                }

                $yearlyPaidSummary[$feePayment->fee_type_id] = [
                    'fee_type' => $feePayment->feeType->fee_type,
                ];

                // calculate total refund of each fee type
                $refund_amount = $this->feePaymentRefundRepository->getPaymentFeeTypeTotalRefund($feePayment->student_id, $feePayment->fee_type_id) ?? 0;

                if (isset($fee_type_refund_amounts[$feePayment->fee_type_id])) {
                    $fee_type_refund_amounts[$feePayment->fee_type_id] += $refund_amount;
                } else {
                    $fee_type_refund_amounts[$feePayment->fee_type_id] = $refund_amount;
                }
            }
        });

        foreach ($yearlyPaidSummary as $feeTypeId => $yearlyFeePayment) {
            $total_paid = 0;

            foreach ($fee_type_month_wise_amounts[$feeTypeId] as $amount) {
                $total_paid += $amount;
            }

            $yearlyPaidSummary[$feeTypeId]['month_wise_amounts'] = $fee_type_month_wise_amounts[$feeTypeId];
            $yearlyPaidSummary[$feeTypeId]['total'] = $total_paid;
            $yearlyPaidSummary[$feeTypeId]['refund'] = $fee_type_refund_amounts[$feeTypeId] ?? 0;
            $yearlyPaidSummary[$feeTypeId]['net_receipt'] = $total_paid - ($fee_type_refund_amounts[$feeTypeId] ?? 0);

            $grand_total += $total_paid;
            $grand_total_refund += $fee_type_refund_amounts[$feeTypeId] ?? 0;
        }

        return [
            'reports' => $yearlyPaidSummary,
            'month_wise_amounts' => $month_wise_amounts,
            'total' => $grand_total,
            'refund' => $grand_total_refund,
            'net_receipt' => $grand_total - $grand_total_refund,
        ];
    }

    /**
     * Class Wise Fee Collection Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printClassWiseFeeCollectionReport(Request $request)
    {
        $classWiseFeeCollectionReport = [];

        $filterType = $request->filter_type ?? "date_wise";

        if ($filterType === "installment_wise") {
            $reportTitle = "Installment - ";
        } else {
            $reportTitle = "Date - ";
        }

        if (
            ($filterType === "date_wise" && (!empty($request->start_date) && !empty($request->end_date))) ||
            ($filterType === "installment_wise" && (!empty($request->from_fee_id) && !empty($request->to_fee_id)))
        ) {
            $classWiseFeeCollectionReport = $this->getClassWiseFeeCollectionReportData(
                $filterType,
                $request->start_date,
                $request->end_date,
                $request->from_fee_id,
                $request->to_fee_id
            );

            if ($filterType === "installment_wise") {
                $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
                $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

                $reportTitle .= "From {$fromFeeTitle} to {$toFeeTitle}";
            } else {
                $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
                $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

                $reportTitle .= "From {$startDate} to {$endDate}";
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Fee Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.class_wise_fee_collection_report', [
            'classWiseFeeCollectionReport' => $classWiseFeeCollectionReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get class wise daily fee collection report data
    */
    private function getClassWiseFeeCollectionReportData(
        $filterType,
        $startDate,
        $endDate,
        $fromFeeId,
        $toFeeId
    ) {
        $classWiseFeeCollectionReport = [];
        $totalAmount = 0;

        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getDateAndInstallmentWiseFeePaymentSummary(
            $filterType,
            $startDate,
            $endDate,
            $fromFeeId,
            $toFeeId
        );

        if ($feeCollectionSummaryData->count() > 0) {
            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($report) {
                if ($report->fee_payments->count() > 0) {
                    $report['fee_payments'] = $report->fee_payments->map(function ($payment) {
                        if ($payment?->student?->promotedClassroom != null) {
                            $payment['student']['classroom_id'] = $payment?->student?->promotedClassroom?->id;
                        }

                        return $payment;
                    });
                }

                return $report;
            });

            $classrooms = $this->classroomRepository->getActiveAll();

            $tempClassWiseData = [];

            foreach ($feeCollectionSummaryData as $summaryData) {
                if (count($summaryData->fee_payments) > 0) {
                    foreach ($summaryData->fee_payments as $feePayment) {
                        if (isset($tempClassWiseData[$feePayment->student->classroom_id])) {
                            $tempClassWiseData[$feePayment->student->classroom_id] += (float) $feePayment->paid_amount ?? 0;
                        } else {
                            $tempClassWiseData[$feePayment->student->classroom_id] = (float) $feePayment->paid_amount ?? 0;
                        }
                    }
                }
            }

            foreach ($classrooms as $classroom) {
                $classWiseFeeCollectionReport[$classroom->id]['classroom_title'] = $classroom->title;
                $classWiseFeeCollectionReport[$classroom->id]['total_amount'] = $tempClassWiseData[$classroom->id] ?? 0;
                $totalAmount += $tempClassWiseData[$classroom->id] ?? 0;
            }
        }

        return [
            'reports' => $classWiseFeeCollectionReport,
            'total_report' => count($classWiseFeeCollectionReport),
            'total_amount' => $totalAmount
        ];
    }

    /**
     * Installment Wise Fee Collection Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printInstallmentWiseFeeCollectionReport(Request $request)
    {
        $installmentWiseFeeCollectionReport = [];

        $filterType = $request->filter_type ?? "date_wise";

        if ($filterType === "installment_wise") {
            $reportTitle = "Installment - ";
        } else {
            $reportTitle = "Date - ";
        }

        if (
            ($filterType === "date_wise" && (!empty($request->start_date) && !empty($request->end_date))) ||
            ($filterType === "installment_wise" && (!empty($request->from_fee_id) && !empty($request->to_fee_id)))
        ) {
            $installmentWiseFeeCollectionReport = $this->getInstallmentWiseFeeCollectionReportData(
                $filterType,
                $request->start_date,
                $request->end_date,
                $request->from_fee_id,
                $request->to_fee_id
            );

            if ($filterType === "installment_wise") {
                $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
                $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

                $reportTitle .= "From {$fromFeeTitle} to {$toFeeTitle}";
            } else {
                $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
                $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

                $reportTitle .= "From {$startDate} to {$endDate}";
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Fee Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.installment_wise_fee_collection_report', [
            'installmentWiseFeeCollectionReport' => $installmentWiseFeeCollectionReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get installment wise daily fee collection report data
    */
    private function getInstallmentWiseFeeCollectionReportData(
        $filterType,
        $startDate,
        $endDate,
        $fromFeeId,
        $toFeeId
    ) {
        $installmentWiseFeeCollectionReport = [];
        $totalAmount = 0;

        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getDateAndInstallmentWiseFeePaymentSummary(
            $filterType,
            $startDate,
            $endDate,
            $fromFeeId,
            $toFeeId
        );

        if ($feeCollectionSummaryData->count() > 0) {
            $fees = $this->feeRepository->getActiveIdTitle();

            $tempInstallmentWiseData = [];

            foreach ($feeCollectionSummaryData as $summaryData) {
                if (count($summaryData->fee_payments) > 0) {
                    foreach ($summaryData->fee_payments as $feePayment) {
                        if ($feePayment->fee_payment_type == FeePaymentType::FEEINSTALLMENT->value) {
                            if (isset($tempInstallmentWiseData[$feePayment->fee_id])) {
                                $tempInstallmentWiseData[$feePayment->fee_id] += (float) $feePayment->paid_amount ?? 0;
                            } else {
                                $tempInstallmentWiseData[$feePayment->fee_id] = (float) $feePayment->paid_amount ?? 0;
                            }
                        }
                    }
                }
            }

            if ($filterType == "installment_wise") {
                $fees->filter(function ($fee) use ($fromFeeId) {
                    return $fee->id >= $fromFeeId;
                })->map(function ($fee) use (&$installmentWiseFeeCollectionReport, $tempInstallmentWiseData, &$totalAmount) {
                    $installmentWiseFeeCollectionReport[$fee->id]['fee_title'] = $fee->title;
                    $installmentWiseFeeCollectionReport[$fee->id]['total_amount'] = $tempInstallmentWiseData[$fee->id] ?? 0;
                    $totalAmount += $tempInstallmentWiseData[$fee->id] ?? 0;
                });
            } else {
                $fees->filter(function ($fee) use ($tempInstallmentWiseData) {
                    return in_array($fee->id, array_keys($tempInstallmentWiseData));
                })->map(function ($fee) use (&$installmentWiseFeeCollectionReport, $tempInstallmentWiseData, &$totalAmount) {
                    $installmentWiseFeeCollectionReport[$fee->id]['fee_title'] = $fee->title;
                    $installmentWiseFeeCollectionReport[$fee->id]['total_amount'] = $tempInstallmentWiseData[$fee->id] ?? 0;
                    $totalAmount += $tempInstallmentWiseData[$fee->id] ?? 0;
                });
            }
        }

        return [
            'reports' => $installmentWiseFeeCollectionReport,
            'total_report' => count($installmentWiseFeeCollectionReport),
            'total_amount' => $totalAmount,
        ];
    }

    /**
     * Complete Fee Paid Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCompleteFeePaidReport(Request $request)
    {
        $completeFeePaidReport = [];
        $classroomTitle = "All Class";
        $reportTitle = "Installments ";

        $classroomId = $request->classroom_id ?? null;

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($request->classroom_id);
            $classroomTitle = $classroom->title ?? "";
        }

        if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
            $completeFeePaidReport = $this->getCompleteFeePaidReportData(
                $request->from_fee_id,
                $request->to_fee_id,
                $classroomId
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

            $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Fee Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.complete_fee_paid_summary', [
            'completeFeePaidReport' => $completeFeePaidReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle,
            'classroomTitle' => $classroomTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get complete fee paid report data
    */
    private function getCompleteFeePaidReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId = null
    ) {
        $completePaidReport = [];
        $installmentWiseAmounts = [];
        $grandTotalPaidAmount = 0;
        $studentIds = [];

        if (!empty($classroomId)) {
            $studentIds = $this->studentRepository->getStudentsByClassroomId($classroomId)
                ->pluck('id')
                ->toArray();
        }

        $completePaidReportData = $this->feePaymentRepository->getCompletePaidReports(
            $classroomId,
            $studentIds,
            $fromFeeId,
            $toFeeId
        );

        if (count($completePaidReportData) > 0) {
            $completePaidReportData->loadMissing(['fee']);

            $completePaidReportData = $completePaidReportData->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }
                return $report;
            });

            foreach ($completePaidReportData->groupBy('student_id') as $studentId =>  $studentReports) {
                $student = $studentReports->first()?->student;
                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                foreach ($studentReports->groupBy('fee_id') as $feeId => $reports) {
                    $total_paid_amount = 0;
                    $isCompletePaid = true;

                    $fee = $reports->first()->fee;

                    $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByFeeIdAndStudentId($studentId, $feeId);

                    if (count($feeInstallments) > 0) {
                        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeId);

                        $total_transport_fee = 0;
                        $total_late_fee = 0;

                        if (!$hasPayment) {
                            $fee = $reports->first()->fee;

                            // calculte transport fee if transport fee setting set to fee
                            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                                if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                    if ($currentAllocateTransport != null) {
                                        $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                        $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                    } else {
                                        $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                        $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                    }

                                    $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                        $studentId,
                                        $currentAllocateFeeId,
                                        $deallocateTransport?->fee_id
                                    );

                                    if (count($allocateTransportFees) > 0) {
                                        $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeId) {
                                                if ($transportFee != null) {
                                                    $existedTransportFee = $reports->where('fee_type_id', $transportFee->id)->first();

                                                    if ($existedTransportFee == null) {
                                                        $total_transport_fee += $transportFeeAmount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            // calculate late fee
                            $lateFee = $this->feeTypeRepository->getLateFeeType();

                            if ($lateFee != null) {
                                $existedLateFee = $reports->where('fee_type_id', $lateFee->id)->first();
                                if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                    $late_fee_amount = 0;

                                    $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                    // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                    $lateFineStartDate = $fee->last_pay_date_at;
                                    $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                    if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                        $currentDate = date("Y-m-d");
                                        $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                        if ($lateFineType == LateFineType::DAILY->value) {
                                            $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                        } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                            $weeksDifference = floor($daysDifference / 7);
                                            $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                        } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                            // Extract year and month from the start date
                                            list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                            // Extract year and month from the current date
                                            list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                            // Calculate the difference in months
                                            $startMonths = ($startYear * 12) + $startMonth;
                                            $currentMonths = ($currentYear * 12) + $currentMonth;
                                            $monthsDifference = $currentMonths - $startMonths;

                                            $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                        }
                                    }

                                    $total_late_fee += $late_fee_amount;
                                }
                            }
                        }

                        foreach ($feeInstallments as $installment) {
                            $semester = $installment?->smeseter ?? 1;
                            $fee_amount = ((float) $installment?->amount ?? 0) * $semester;
                            $payable_amount =  $fee_amount + $total_late_fee + $total_transport_fee;

                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;

                            $total_paid_amount += $paid_amount;

                            if ($payable_amount != ($paid_amount + $discount_amount)) {
                                $isCompletePaid = false;
                                break;
                            }
                        }
                    }

                    if ($isCompletePaid) {
                        $studentName = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");
                        $parentName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                        $completePaidReport[$studentId]['admission_no'] = $student->admission_no;
                        $completePaidReport[$studentId]['student_name'] = $studentName;
                        $completePaidReport[$studentId]['parent_name'] = $parentName;
                        $completePaidReport[$studentId]['phone'] = $student?->father?->phone ?? "";
                        $completePaidReport[$studentId]['classroom_title'] = $student?->classroom?->title ?? "";
                        $completePaidReport[$studentId]['installment_wise_amounts'][$fee->id] = $total_paid_amount;

                        if (!empty($completePaidReport[$studentId]['total_paid_amount'])) {
                            $completePaidReport[$studentId]['total_paid_amount'] += $total_paid_amount;
                        } else {
                            $completePaidReport[$studentId]['total_paid_amount'] = $total_paid_amount;
                        }

                        $installmentWiseAmounts[$fee->id] = [
                            'title' => $fee->title,
                            'amount' => ($installmentWiseAmounts[$fee->title] ?? 0) + $total_paid_amount
                        ];

                        $grandTotalPaidAmount += $total_paid_amount;
                    }
                }
            }
        }

        ksort($installmentWiseAmounts);

        return [
            'reports' => $completePaidReport,
            'installment_wise_amounts' => $installmentWiseAmounts,
            'total_paid_amount' => $grandTotalPaidAmount,
        ];
    }

    /**
     * yearly head wise due summary report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printYearlyHeadWiseDueSummaryReport(Request $request)
    {
        $yearlyHeadWiseDueReport = [];

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $includeVoucher = $request->include_voucher ?? false;

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $yearlyHeadWiseDueReport = $this->getYearlyHeadWiseDueReportData(
                $fromFeeId,
                $toFeeId,
                $includeVoucher
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;
        $reportDate = Carbon::now()->format('d-m-Y');

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Yearly Head Wise Due Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.yearly_head_wise_due_summary', [
            'yearlyHeadWiseDueReport' => $yearlyHeadWiseDueReport,
            'schoolData' => $schoolData,
            'reportDate' => $reportDate,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get complete fee paid report data
    */
    private function getYearlyHeadWiseDueReportData(
        $fromFeeId,
        $toFeeId,
        $includeVoucher = false
    ) {
        $yearlyHeadWiseDueSummary = [];
        $installmentWiseAmounts = [];
        $feeTypeInstallmentWiseAmounts = [];
        $totalDueAmount = 0;

        // get transport fee setting
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $this->getAndFormatYearlyHeadWiseFeeInstallmentsDueData(
            $yearlyHeadWiseDueSummary,
            $installmentWiseAmounts,
            $feeTypeInstallmentWiseAmounts,
            $fromFeeId,
            $toFeeId,
            $transportFeeStructureSetting
        );

        // calculate general voucher and transport voucher due
        if ($includeVoucher == true) {
            // general vouchers
            $this->getAndFormatYearlyHeadWiseGeneralVouchersDueData(
                $yearlyHeadWiseDueSummary,
                $installmentWiseAmounts,
                $feeTypeInstallmentWiseAmounts
            );

            // transport vouchers
            $this->getAndFormatYearlyHeadWiseTransportVouchersDueData(
                $yearlyHeadWiseDueSummary,
                $installmentWiseAmounts,
                $feeTypeInstallmentWiseAmounts,
                $transportFeeStructureSetting
            );
        }

        foreach ($yearlyHeadWiseDueSummary as $feeTypeId => $groupedDueSummary) {
            $total_due = 0;

            foreach ($feeTypeInstallmentWiseAmounts[$feeTypeId] as $amount) {
                $total_due += $amount;
                $totalDueAmount += $amount;
            }

            $yearlyHeadWiseDueSummary[$feeTypeId]['installment_wise_amounts'] = $feeTypeInstallmentWiseAmounts[$feeTypeId];
            $yearlyHeadWiseDueSummary[$feeTypeId]['total_amount'] = $total_due;
        }

        $updatedInstallmentWiseAmounts = [];

        if (count($installmentWiseAmounts) > 0) {
            ksort($installmentWiseAmounts);

            if (!empty($installmentWiseAmounts['Voucher'])) {
                // Removing the Voucher key and its corresponding value
                $voucherValue = $installmentWiseAmounts['Voucher'];
                unset($installmentWiseAmounts['Voucher']);

                // Pushing the Voucher key to the end of the array
                $installmentWiseAmounts['Voucher'] = $voucherValue;
            }

            foreach ($installmentWiseAmounts as $installment) {
                $updatedInstallmentWiseAmounts[$installment['title']] = $installment['amount'];
            }
        }

        return [
            'reports' => $yearlyHeadWiseDueSummary,
            'installment_wise_amounts' => $updatedInstallmentWiseAmounts,
            'total_amount' => $totalDueAmount
        ];
    }

    /*
    *   helper method to get yearly head wise fee installments due data
    */
    private function getAndFormatYearlyHeadWiseFeeInstallmentsDueData(
        array &$yearlyHeadWiseDueSummary,
        array &$installmentWiseAmounts,
        array &$feeTypeInstallmentWiseAmounts,
        int $fromFeeId,
        int $toFeeId,
        $transportFeeStructureSetting
    ) {
        $feeInstallments = $this->classFeeStudentAmountRepository->getYearlyHeadWiseDueSummary($fromFeeId, $toFeeId);

        if (count($feeInstallments) > 0) {
            $studentFeeDiscounts = [];

            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;
                        // add transport fee in structure if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                    foreach ($allocateTransportFees as $allocateTransportFee) {
                                        if ($allocateTransportFee->id == $feeInstallmentId) {
                                            if ($transportFee != null) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    $newTransportFee = collect([
                                                        'id' => null,
                                                        'student_id' => $studentId,
                                                        'fee_id' => $feeInstallmentId,
                                                        'fee_type_id' =>  $transportFee->id,
                                                        'amount' =>  $transportFeeAmount,
                                                        'semester' => null,
                                                        'is_fee_special' => $transportFee->is_fee_special,
                                                        'is_extra_charge' => true,
                                                        'feeType' => $transportFee,
                                                        'fee' => $fee,
                                                        'payment' => null,
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // to calculate fee installments due
            foreach ($feeInstallments as $feeInstallment) {
                // check if installment has nullify fee. if fee nullified then exclude the fee
                if (empty($feeInstallment['nullify_fee'])) {
                    $fee_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $due_amount = $fee_amount;
                    $paid_amount = 0;
                    $discount_amount = 0;

                    // check if installment has payment. if has payment then update due amount
                    if (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    } elseif (!empty($studentFeeDiscounts[$feeInstallment['student_id']])) {
                        foreach ($studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            }
                        }
                    }

                    $feeId = $feeInstallment['fee']['id'];
                    $feeTitle = $feeInstallment['fee']['title'];
                    $feeTypeId = $feeInstallment['fee_type_id'];
                    $feeTypeTitle = $feeInstallment['feeType']['fee_type'];

                    // calculate and update fee amount installment wise
                    $installmentWiseAmounts[$feeId] = [
                        'title' => $feeTitle,
                        'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $due_amount
                    ];

                    // calculate and update fee amount installment wise
                    $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $due_amount;

                    // update yearly head wise due summary data
                    $yearlyHeadWiseDueSummary[$feeTypeId]['fee_type_title'] = $feeTypeTitle;
                }
            }
        }
    }

    /*
    *   helper method to get yearly head wise fee installments due data
    */
    private function getAndFormatYearlyHeadWiseGeneralVouchersDueData(
        array &$yearlyHeadWiseDueSummary,
        array &$installmentWiseAmounts,
        array &$feeTypeInstallmentWiseAmounts,
    ) {
        $generalVouchers = $this->studentFeeVoucherRepository->getHeadWiseDueFeeVouchers();

        // if has any general voucher then calculate due and merge data with headWiseDueSummary
        if (count($generalVouchers) > 0) {
            foreach ($generalVouchers as $generalVoucher) {
                foreach ($generalVoucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_amount = (float) $feeTypeAmount->amount ?? 0;
                    $voucher_due_amount = $voucher_amount;
                    $voucher_discount_amount = 0;
                    $voucher_paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount?->payment != null) {
                        $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $voucher_due_amount = $voucher_amount - $voucher_discount_amount - $voucher_paid_amount;
                    }

                    $feeId = "Voucher";
                    $feeTitle = 'Voucher';
                    $feeTypeId = $feeTypeAmount->fee_type_id;
                    $feeTypeTitle = $feeTypeAmount->feeType->fee_type;

                    // calculate and update fee amount installment wise
                    $installmentWiseAmounts[$feeId] = [
                        'title' => $feeTitle,
                        'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $voucher_due_amount
                    ];

                    // calculate and update fee amount installment wise
                    $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $voucher_due_amount;

                    // update yearly head wise due summary data
                    $yearlyHeadWiseDueSummary[$feeTypeId]['fee_type_title'] = $feeTypeTitle;
                }
            }
        }
    }

    /*
    *   helper method to get yearly head wise fee installments due data
    */
    private function getAndFormatYearlyHeadWiseTransportVouchersDueData(
        array &$yearlyHeadWiseDueSummary,
        array &$installmentWiseAmounts,
        array &$feeTypeInstallmentWiseAmounts,
        $transportFeeStructureSetting
    ) {
        $students = $this->studentRepository->getActiveNameAndId();

        if ($students->count() > 0) {
            foreach ($students as $student) {
                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                $transportFeeType = $this->feeTypeRepository->getTransportFeeType();

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount;
                        $discount_amount = 0;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }

                        $feeId = "Voucher";
                        $feeTitle = 'Voucher';
                        $feeTypeId = $transportFeeType->id;
                        $feeTypeTitle = $transportFeeType->fee_type;

                        // calculate and update fee amount installment wise
                        $installmentWiseAmounts[$feeId] = [
                            'title' => $feeTitle,
                            'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $due_amount
                        ];

                        // calculate and update fee amount installment wise
                        $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $due_amount;

                        // update yearly head wise due summary data
                        $yearlyHeadWiseDueSummary[$feeTypeId]['fee_type_title'] = $feeTypeTitle;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $due_amount = $fee_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $feeId = "Voucher";
                        $feeTitle = 'Voucher';
                        $feeTypeId = $transportFeeType->id;
                        $feeTypeTitle = $transportFeeType->fee_type;

                        // calculate and update fee amount installment wise
                        $installmentWiseAmounts[$feeId] = [
                            'title' => $feeTitle,
                            'amount' => ($installmentWiseAmounts[$feeId]['amount'] ?? 0) + $due_amount
                        ];

                        // calculate and update fee amount installment wise
                        $feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] = ($feeTypeInstallmentWiseAmounts[$feeTypeId][$feeTitle] ?? 0) + $due_amount;

                        // update yearly head wise due summary data
                        $yearlyHeadWiseDueSummary[$feeTypeId]['fee_type_title'] = $feeTypeTitle;
                    }
                }
            }
        }
    }

    /**
     * complete outstaning due report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCompleteOutstandingDueReport(Request $request)
    {
        $completeOutstandingDueReport = [];
        $reportTitle = "Installments ";

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $classroomId = $request->classroom_id ?? "";
        $studentStatus = $request->student_status ?? "";
        $studentActiveStatus = $request->student_active_status ?? "";
        $employmentCategoryId = $request->employment_category_id ?? null;
        $includeLateFee = $request->late_fee ?? false;
        $includeVoucher = $request->voucher ?? false;

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $completeOutstandingDueReport = $this->getCompleteOutstandingDueReportData(
                $fromFeeId,
                $toFeeId,
                $classroomId,
                $studentStatus,
                $studentActiveStatus,
                $employmentCategoryId,
                $includeLateFee,
                $includeVoucher
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

            $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Complete Outstanding Due Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.complete_outstanding_due_summary', [
            'completeOutstandingDueReport' => $completeOutstandingDueReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get complete outstanding due report data
    */
    private function getCompleteOutstandingDueReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId = "",
        $studentStatus = "",
        $studentActiveStatus = "",
        $employmentCategoryId = null,
        $includeLateFee = false,
        $includeVoucher = false
    ) {
        $completeOutstandingDueReports = [];
        $totalDueAmount = 0;

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $feeInstallments = $this->classFeeStudentAmountRepository->getCompleteDueSummary(
            $fromFeeId,
            $toFeeId,
            $classroomId,
            $studentStatus,
            $studentActiveStatus,
            $employmentCategoryId
        );

        // process fee installments data
        $completeOutstandingDueReports = $this->processCompleteOutstandingDueFeeInstallmentsData(
            $transportFeeStructureSetting,
            $completeOutstandingDueReports,
            $feeInstallments,
            $includeLateFee,
        );

        // get voucher fee
        if ($includeVoucher == true) {
            // get transport voucher data and calculate due
            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                $completeOutstandingDueReports = $this->getAndProcessCompleteDueTransportVouchersData(
                    $completeOutstandingDueReports,
                    $transportFeeStructureSetting,
                    $classroomId,
                    $studentStatus,
                    $studentActiveStatus,
                    $employmentCategoryId
                );
            }

            // get general voucher all due
            $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchers(
                $classroomId,
                $studentStatus,
                $studentActiveStatus,
                $employmentCategoryId
            );

            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['classroom'])) {
                        unset($voucher['classroom']);
                    }

                    $voucher['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->student?->classroom_id;

                $voucher->student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $voucher;
            });

            // process general vouchers data
            $completeOutstandingDueReports = $this->processCompleteDueGeneralVouchersData($completeOutstandingDueReports, $generalVouchers);
        }

        if (count($completeOutstandingDueReports) > 0) {
            foreach ($completeOutstandingDueReports as $report) {
                $totalDueAmount += $report['total_due_amount'] ?? 0;
            }
        }

        return [
            'reports' => $completeOutstandingDueReports,
            'total_due_amount' => $totalDueAmount
        ];
    }

    /*
    *   helper method to processs fee installments due data for student complete outstanding due
    */
    private function processCompleteOutstandingDueFeeInstallmentsData(
        $transportFeeStructureSetting,
        $completeOutstandingDueReports,
        $feeInstallments,
        $includeLateFee = false
    ) {
        if (count($feeInstallments) > 0) {
            $feeInstallments->loadMissing([
                'payment',
                'nullify_fee',
                'father',
            ]);

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['student']['classroom'])) {
                        unset($feeInstallment['student']['classroom']);
                    }

                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            $completeOutstandingDueReports = $feeInstallments->groupBy('student_id')->map(function ($studentInstallments) use ($includeLateFee, $transportFeeStructureSetting) {
                // calculate student total due
                $studentTotalDue = 0;
                $studentTotalLateFee = 0;
                $studentTotalTranspotFee = 0;

                $student = $studentInstallments?->first()?->student;
                $classroomId = $student?->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                // calculate late fee and transport fee
                foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $feeIntallmentsGroupedData) {
                    $studentId = $studentInstallments->first()->student_id;
                    $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $feeIntallmentsGroupedData->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                    foreach ($allocateTransportFees as $allocateTransportFee) {
                                        if ($allocateTransportFee->id == $feeInstallmentId) {
                                            if ($transportFee != null) {
                                                $existedTransportFee = $feeIntallmentsGroupedData->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (count($studentFeeDiscounts) > 0) {
                                                        foreach ($studentFeeDiscounts as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $transportFeeAmount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }

                                                                $transportFeeAmount = $transportFeeAmount - $discount_amount;
                                                            }
                                                        }
                                                    }

                                                    $studentTotalTranspotFee += $transportFeeAmount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        if ($includeLateFee == true) {
                            // add late fee in structure if late fine is available
                            $lateFee = $this->feeTypeRepository->getLateFeeType();

                            if ($lateFee != null) {
                                $existedLateFee = $feeIntallmentsGroupedData->where('fee_type_id', $lateFee->id)->first();
                                if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                    $late_fee_amount = 0;

                                    $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                    // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                    $lateFineStartDate = $fee->last_pay_date_at;
                                    $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                    if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                        $currentDate = date("Y-m-d");
                                        $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                        if ($lateFineType == LateFineType::DAILY->value) {
                                            $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                        } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                            $weeksDifference = floor($daysDifference / 7);
                                            $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                        } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                            // Extract year and month from the start date
                                            list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                            // Extract year and month from the current date
                                            list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                            // Calculate the difference in months
                                            $startMonths = ($startYear * 12) + $startMonth;
                                            $currentMonths = ($currentYear * 12) + $currentMonth;
                                            $monthsDifference = $currentMonths - $startMonths;

                                            $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                        }
                                    }

                                    if (count($studentFeeDiscounts) > 0) {
                                        foreach ($studentFeeDiscounts as $discount) {
                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                                if ($discount->is_discount_percentage) {
                                                    $discount_amount = (float) ($discount->amount / 100) * $late_fee_amount;
                                                } else {
                                                    $discount_amount = (float) $discount->amount;
                                                }

                                                $late_fee_amount = $late_fee_amount - $discount_amount;
                                            }
                                        }
                                    }

                                    $studentTotalLateFee += $late_fee_amount;
                                }
                            }
                        }
                    }
                }

                $studentInstallments->each(function ($installment) use (&$studentTotalDue, $studentFeeDiscounts) {
                    $semester = $installment->semester ?? 1;
                    $due_amount = ((float) $installment->amount ?? 0) * $semester;

                    if ($installment->nullify_fee !== null) {
                        $due_amount = 0;
                    } elseif ($installment->payment !== null) {
                        $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $due_amount = $due_amount - $discount_amount - $paid_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $due_amount - $discount_amount;
                            }
                        }
                    }

                    $studentTotalDue += $due_amount;
                });

                $studentinstallment = $studentInstallments->first();

                // construct father name
                $father_name = "";

                if ($studentinstallment->father != null) {
                    $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";
                }

                return [
                    'id' => $studentinstallment->student_id,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                    'present_address' => $student?->present_address,
                    'father_name' => $father_name,
                    'sms_phone' => $student?->father?->sms_phone,
                    'classroom_title' => $student?->classroom?->title,
                    'total_due_amount' => $studentTotalDue + $studentTotalLateFee + $studentTotalTranspotFee,
                ];
            })->toArray();
        }

        return $completeOutstandingDueReports;
    }

    /*
    *   helper method to processs transport voucher due data for student outstanding due
    */
    private function getAndProcessCompleteDueTransportVouchersData(
        $completeOutstandingDueReports,
        $transportFeeStructureSetting,
        $classroomId = null,
        $studentStatus = "",
        $studentActiveStatus = "",
        $employmentCategoryId = null
    ) {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndStudentStatus($classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId);

        if (count($students) > 0) {
            $students->load(['classroom', 'father', 'promotedClassroom']);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $student;
            });

            foreach ($students as $student) {
                $total_due = 0;

                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $due_amount = (float) $allocate->amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $due_amount - $discount_amount - $paid_amount;
                        }

                        $total_due += $due_amount;
                    }
                }

                if (
                    count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)
                ) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    foreach ($allocateTransportVouchers as $voucher) {
                        $total_due += $fee_amount;
                    }
                }

                if ($total_due > 0) {
                    if (isset($completeOutstandingDueReports[$student->id])) {
                        $completeOutstandingDueReports[$student->id]['total_due_amount'] += $total_due;
                    } else {
                        // construct father name
                        $father_name = "";

                        if ($student->father != null) {
                            $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student->father->last_name}";
                        }

                        // merge student data in reports
                        $completeOutstandingDueReports[$student?->id] = [
                            'id' => $student?->id,
                            'admission_no' => $student?->admission_no,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                            'present_address' => $student?->present_address,
                            'father_name' => $father_name,
                            'sms_phone' => $student?->father?->sms_phone ?? "",
                            'classroom_title' => $student?->classroom?->title ?? "",
                            'total_due_amount' =>  $total_due,
                        ];
                    }

                    $completeOutstandingDueReports[$student?->classroom?->id]['total_due_amount'] += $total_due;
                }
            }
        }

        return $completeOutstandingDueReports;
    }

    /*
    *   helper method to processs voucher due data
    */
    private function processCompleteDueGeneralVouchersData($completeOutstandingDueReports, $vouchers)
    {
        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                $due_amount = 0;

                foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                    $amount = (float) $voucherAmountData->amount;

                    if ($voucherAmountData->payment != null) {
                        $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $amount = $amount - $discount_amount - $paid_amount;
                    }

                    $due_amount += $amount;
                }

                // check if student daat already exists. if alreday exists then update due amount else add new student data
                if (isset($completeOutstandingDueReports[$voucher->student_id])) {
                    $completeOutstandingDueReports[$voucher->student_id]['total_due_amount'] += $due_amount;
                } else {
                    // construct father name
                    $father_name = "";

                    if ($voucher->father != null) {
                        $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher->father->last_name}";
                    }

                    // merge student data in reports
                    $completeOutstandingDueReports[$voucher->student_id] = [
                        'id' => $voucher->student?->id,
                        'admission_no' => $voucher->student?->admission_no,
                        'roll_no' => $voucher->student?->classroomRoll?->roll_no,
                        'name' => "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}",
                        'present_address' => $voucher?->student?->present_address,
                        'father_name' => $father_name,
                        'sms_phone' => $voucher?->father?->sms_phone ?? "",
                        'classroom_title' => $voucher?->classroom?->title ?? "",
                        'total_due_amount' =>  $due_amount,
                    ];
                }
            }
        }

        return $completeOutstandingDueReports;
    }

    /**
     * consolidated due report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printConsolidatedDueReport(Request $request)
    {
        $consolidatedDueReport = [];

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $studentStatus = $request->student_status ?? "";
        $feeCategoryId = $request->fee_category_id ?? null;
        $includeVoucher = $request->voucher ?? false;

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $consolidatedDueReport = $this->getConsolidatedDueReportData(
                $fromFeeId,
                $toFeeId,
                $studentStatus,
                $feeCategoryId,
                $includeVoucher
            );
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Consolidated Due Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.consolidated_due_summary', [
            'consolidatedDueReport' => $consolidatedDueReport,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get consolidated due report data
    */
    private function getConsolidatedDueReportData(
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId = null,
        $includeVoucher = false
    ) {
        $consolidatedDueReports = [];
        $totalPayable = 0;
        $totalPaid = 0;
        $totalDue = 0;

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        // get fee installments
        $consolidatedDueReports = $this->getConsolidatedDueFeeInstallmentsData(
            $consolidatedDueReports,
            $transportFeeStructureSetting,
            $fromFeeId,
            $toFeeId,
            $studentStatus,
            $feeCategoryId
        );

        if ($includeVoucher == true) {
            // get general vouchers
            $consolidatedDueReports = $this->getConsolidatedDueGeneralVouchersData($consolidatedDueReports, $studentStatus);

            // get transport vouchers
            $consolidatedDueReports = $this->getConsolidatedDueTransortVouchersData(
                $consolidatedDueReports,
                $transportFeeStructureSetting,
                $studentStatus
            );
        }

        if (!empty($consolidatedDueReports)) {
            foreach ($consolidatedDueReports as $report) {
                $totalPayable += $report['payable_amount'] ?? 0;
                $totalPaid += $report['paid_amount'] ?? 0;
                $totalDue += $report['due_amount'] ?? 0;
            }
        }

        return [
            'reports' => $consolidatedDueReports,
            'payable_amount' => $totalPayable,
            'paid_amount' => $totalPaid,
            'due_amount' => $totalDue,
        ];
    }

    /*
    *   helper method to get consolidated due fee installments data
    */
    private function getConsolidatedDueFeeInstallmentsData(
        $consolidatedDueReports,
        $transportFeeStructureSetting,
        $fromFeeId,
        $toFeeId,
        $studentStatus = "",
        $feeCategoryId = null
    ) {
        $studentFeeDiscounts = [];

        // arguments for filter data
        $filter_arguments = [
            'studentStatus' => $studentStatus,
            'fromFeeId' => $fromFeeId,
            'toFeeId' => $toFeeId,
            'feeCategoryId' => $feeCategoryId,
        ];

        //get filtered fee installments
        $feeInstallments = $this->classFeeStudentAmountRepository->getConsolidatedDueReports(...$filter_arguments);

        if (count($feeInstallments) > 0) {
            $feeInstallments->load([
                'payment',
                'fee_payments',
                'nullify_fee',
                'classroom',
                'student' => function ($query) {
                    $query->with(['promotedClassroom']);
                },
            ]);

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['classroom'])) {
                        unset($feeInstallment['classroom']);
                    }

                    $feeInstallment['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            // get transport fee
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                    foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                        if (!$hasPayment) {
                            // add transport fee in structure if transport fee setting set to fee
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                    foreach ($allocateTransportFees as $allocateTransportFee) {
                                        if ($allocateTransportFee->id == $feeInstallmentId) {
                                            if ($transportFee != null) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    $newTransportFee = collect([
                                                        'id' => null,
                                                        'student_id' => $studentId,
                                                        'classroom_id' => $studentFeeInstallments->first()?->student?->classroom_id,
                                                        'fee_id' => $feeInstallmentId,
                                                        'fee_type_id' =>  $transportFee->id,
                                                        'amount' =>  $transportFeeAmount,
                                                        'semester' => null,
                                                        'is_fee_special' => $transportFee->is_fee_special,
                                                        'is_extra_charge' => true,
                                                        'feeType' => $transportFee,
                                                        'payment' => null,
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                        'classroom' => $studentFeeInstallments->first()?->student?->classroom,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // calculate and format fee due report data
            $consolidatedDueReports = $feeInstallments->groupBy('classroom_id')->map(function ($classroomInstallments) {
                $classTotalPayable = 0;
                $classTotalPaid = 0;
                $classTotalDue = 0;

                $classroomInstallments->groupBy('fee_type_id')->each(function ($feeTypeInstallments) use (
                    &$classTotalPayable,
                    &$classTotalPaid,
                    &$classTotalDue
                ) {
                    $feeTypeInstallments->each(function ($installment) use (&$classTotalPayable, &$classTotalPaid, &$classTotalDue) {
                        $semester = $installment['semester'] ?? 1;
                        $payable_amount = ((float) $installment['amount'] ?? 0) * $semester;
                        $due_amount = $payable_amount;
                        $paid_amount = 0;
                        $discount_amount = 0;

                        if ($installment['nullify_fee'] !== null) {
                            $due_amount = 0;
                            $paid_amount = $payable_amount;
                        } elseif ($installment['payment'] !== null) {
                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                            $payable_amount = $payable_amount - $discount_amount;
                        } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                            foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                                if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                                    if ($discount->is_discount_percentage) {
                                        $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                                    } else {
                                        $discount_amount = (float) $discount->amount;
                                    }

                                    $due_amount =  $payable_amount - $discount_amount - $paid_amount;
                                    $payable_amount =  $payable_amount - $discount_amount;
                                }
                            }
                        }

                        $classTotalPayable += $payable_amount;
                        $classTotalPaid += $paid_amount;
                        $classTotalDue += $due_amount;
                    });
                });

                $classroomTitle = $classroomInstallments[0]['classroom']['title'];

                return [
                    'class_name' => $classroomTitle,
                    'payable_amount' => $classTotalPayable,
                    'paid_amount' => $classTotalPaid,
                    'due_amount' => $classTotalDue,
                ];
            })->filter(function ($report) {
                return $report['due_amount'] > 0;
            })->toArray();
        }

        return $consolidatedDueReports;
    }

    /*
    *   helper method to get consolidated due general vouchers data
    */
    private function getConsolidatedDueGeneralVouchersData(
        $consolidatedDueReports,
        $studentStatus = ""
    ) {
        $generalVouchers = $this->studentFeeVoucherRepository->getActiveAllFeeVouchers($studentStatus);

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }

                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                return $voucher;
            });

            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_payable_amount = (float) $feeTypeAmount->amount ?? 0;
                    $voucher_due_amount = $voucher_payable_amount;
                    $voucher_discount_amount = 0;
                    $voucher_paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                        $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                    }

                    if (empty($consolidatedDueReports[$voucher?->student?->classroom_id])) {
                        $consolidatedDueReports[$voucher?->student?->classroom_id] = [
                            'class_name' => $voucher?->student?->classroom?->title,
                            'payable_amount' => $voucher_payable_amount,
                            'paid_amount' => $voucher_paid_amount,
                            'due_amount' => $voucher_due_amount,
                        ];
                    } else {
                        $consolidatedDueReports[$voucher?->student?->classroom_id]['payable_amount'] += $voucher_payable_amount;
                        $consolidatedDueReports[$voucher?->student?->classroom_id]['paid_amount'] += $voucher_paid_amount;
                        $consolidatedDueReports[$voucher?->student?->classroom_id]['due_amount'] += $voucher_due_amount;
                    }
                }
            }
        }

        return $consolidatedDueReports;
    }

    /*
    *   helper method to get consolidated due transport vouchers data
    */
    private function getConsolidatedDueTransortVouchersData(
        $consolidatedDueReports,
        $transportFeeStructureSetting,
        $studentStatus = ""
    ) {
        // get students
        $students = $this->studentRepository->getActiveNameAndId($studentStatus);

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null && count($students) > 0) {
            $students->loadMissing(['promotedClassroom']);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $voucher_payable_amount = (float) $allocate->amount;
                        $voucher_due_amount = $voucher_payable_amount;
                        $voucher_discount_amount = 0;
                        $voucher_paid_amount = 0;

                        if ($allocate->payment != null) {
                            $voucher_discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $voucher_paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $voucher_due_amount = $voucher_payable_amount - $voucher_discount_amount - $voucher_paid_amount;
                            $voucher_payable_amount = $voucher_payable_amount - $voucher_discount_amount;
                        }

                        if (empty($consolidatedDueReports[$student?->classroom_id])) {
                            $consolidatedDueReports[$student?->classroom_id] = [
                                'class_name' => $student?->classroom?->title,
                                'payable_amount' => $voucher_payable_amount,
                                'paid_amount' => $voucher_paid_amount,
                                'due_amount' => $voucher_due_amount,
                            ];
                        } else {
                            $consolidatedDueReports[$student?->classroom_id]['payable_amount'] += $voucher_payable_amount;
                            $consolidatedDueReports[$student?->classroom_id]['paid_amount'] += $voucher_paid_amount;
                            $consolidatedDueReports[$student?->classroom_id]['due_amount'] += $voucher_due_amount;
                        }
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $voucher_payable_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $voucher_payable_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $voucher_due_amount = $voucher_payable_amount;
                    $voucher_paid_amount = 0;

                    foreach ($allocateTransportVouchers as $voucher) {
                        if (empty($consolidatedDueReports[$student?->classroom_id])) {
                            $consolidatedDueReports[$student?->classroom_id] = [
                                'class_name' => $student?->classroom?->title,
                                'payable_amount' => $voucher_payable_amount,
                                'paid_amount' => $voucher_paid_amount,
                                'due_amount' => $voucher_due_amount,
                            ];
                        } else {
                            $consolidatedDueReports[$student?->classroom_id]['payable_amount'] += $voucher_payable_amount;
                            $consolidatedDueReports[$student?->classroom_id]['paid_amount'] += $voucher_paid_amount;
                            $consolidatedDueReports[$student?->classroom_id]['due_amount'] += $voucher_due_amount;
                        }
                    }
                }
            }
        }

        return $consolidatedDueReports;
    }

    /**
     * student payment report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentPaymentReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;

        $studentPaymentReport = $this->getStudentPaymentReportData(
            $classroomId,
            $studentId
        );

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Payment Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.student_fee_payment_report', [
            'studentPaymentReport' => $studentPaymentReport,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper method to get student payment report data
    */
    private function getStudentPaymentReportData($classroomId = null, $studentId = null)
    {
        $studentFeePaymentReports = [];
        $paymentReports = [];
        $studentIds = [];
        $student = null;

        if (!empty($studentId)) {
            $student = $this->studentRepository->getStudentById($studentId);
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

            if ($students->count() > 0) {
                $studentIds = $students->pluck('id')->toArray();
            }
        }

        if ($student == null && count($studentIds) > 0) {
            $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($studentIds);
        } else if ($student != null) {
            $paymentReports = $this->feePaymentMethodRepository->getStudentPaymentReports($student->id);
        }

        if (count($paymentReports) > 0) {
            $paymentReports->loadMissing(['student']);

            $studentFeePaymentReports = $paymentReports->map(function ($report) {
                $receipt_note = "";
                $total_amount = 0;
                $total_discount = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;
                $feeTypeAmountsArray = [];

                if (count($report->fee_payments) > 0) {
                    $report->fee_payments->each(function ($feePayment) use (&$receipt_note, &$total_amount, &$total_discount, &$total_payable, &$total_paid, &$total_due, &$feeTypeAmountsArray) {
                        // Determine the payment note based on the fee payment type and due status
                        $payment_note = '';

                        switch ($feePayment->fee_payment_type) {
                            case FeePaymentType::GENERALVOUCHER->value:
                                $payment_note = $feePayment->is_fee_due ? 'due voucher fee' : 'with voucher fee';
                                break;
                            case FeePaymentType::TRANSPORTVOUCHER->value:
                                $payment_note = $feePayment->is_fee_due ? 'due transport fee' : 'with transport fee';
                                break;
                            default:
                                $payment_note = $feePayment->is_fee_due ? 'against previous dues from' : 'for';
                                break;
                        }

                        // Construct receipt note
                        if (strlen($receipt_note) <= 0) {
                            $receipt_note = "Payment {$payment_note} {$feePayment->fee->title}";
                        } elseif (!strpos($receipt_note, $feePayment?->fee?->title)) {
                            $receipt_note .= ", {$payment_note} {$feePayment?->fee?->title}";
                        }

                        $amount = (float) $feePayment->amount ?? 0;
                        $payable_amount = (float) $feePayment->payable_amount ?? 0;
                        $paid_amount = (float) $feePayment->paid_amount ?? 0;
                        $due_amount = (float) $feePayment->due_amount ?? 0;
                        $discount_amount = (float) $feePayment->discount_amount ?? 0;

                        $total_amount += $amount;
                        $total_payable += $payable_amount;
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;
                        $total_discount += $discount_amount;

                        $fee_title = $feePayment?->fee?->title ?? "";

                        if ($feePayment?->fee_payment_type != FeePaymentType::FEEINSTALLMENT->value) {
                            $fee_title = "Voucher";
                        }

                        $feeTypeAmountsArray[] = [
                            'fee_type_title' => $feePayment?->feeType?->fee_type ?? "",
                            'fee_title' => $fee_title,
                            'total_amount' => $amount,
                            'total_discount' => $discount_amount,
                            'total_payable' => $payable_amount,
                            'total_paid' => $paid_amount,
                            'due' => $due_amount,
                        ];
                    });
                }

                return [
                    'admission_no' => $report?->student?->admission_no,
                    'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                    'title' => $receipt_note,
                    'total_amount' => $total_amount,
                    'total_discount' => $total_discount,
                    'total_payable' => $total_payable,
                    'total_paid' => $total_paid,
                    'due' => $total_due,
                    'payment_mode' => $report->payment_mode,
                    'date' => Carbon::parse($report->payment_date)->format('d-M-Y'),
                    'receipt_no' => $report->receipt_no,
                    'fee_type_amounts' => $feeTypeAmountsArray,
                ];
            })->toArray();
        }

        return $studentFeePaymentReports;
    }

    /**
     * student head wise fee report report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentHeadWiseFeeReport(Request $request)
    {
        $studentHeadWiseReport = [];
        $classroomTitle = "All Class";
        $fromFeeTitle = "";
        $toFeeTitle = "";

        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;
        $classroomId = $request->classroom_id ?? null;
        $studentStatus = $request->student_status ?? "";
        $includeVoucher = $request->voucher ?? false;

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($classroomId);
            $classroomTitle = $classroom != null ? $classroom?->title : "All Class";
        }

        if (!empty($fromFeeId) && !empty($toFeeId)) {
            $studentHeadWiseReport = $this->getStudentHeadWiseFeeReportData(
                $fromFeeId,
                $toFeeId,
                $classroomId,
                $studentStatus,
                $includeVoucher
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($fromFeeId)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($toFeeId)?->title ?? "";
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'street_address' => $schoolData->street_address,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Head Wise Fee Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.student_head_wise_fee_report', [
            'studentHeadWiseReport' => $studentHeadWiseReport,
            'schoolData' => $schoolData,
            'classroomTitle' => $classroomTitle,
            'fromFeeTitle' => $fromFeeTitle,
            'toFeeTitle' => $toFeeTitle,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }


    /*
    *   helper method to get student head wise fee report data
    */
    private function getStudentHeadWiseFeeReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId = null,
        $studentStatus = "",
        $includeVoucher = false
    ) {
        // get transport fee setting
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $feeInstallments = $this->classFeeStudentAmountRepository->getStudentHeadWiseFeeInstallments($fromFeeId, $toFeeId, $classroomId, $studentStatus);

        $grand_total_amount = 0;
        $grand_total_discount = 0;
        $grand_total_payable = 0;
        $grand_total_paid = 0;
        $grand_total_due = 0;

        $payment_fee_types = [];
        $studentHeadWiseReports['reports'] = [];
        $studentHeadWiseReports['fee_type_amounts'] = [];
        $studentHeadWiseReports['total_fee'] = 0;
        $studentHeadWiseReports['concession'] = 0;
        $studentHeadWiseReports['total_payable'] = 0;
        $studentHeadWiseReports['total_paid'] = 0;
        $studentHeadWiseReports['total_due'] = 0;

        if (count($feeInstallments) > 0) {
            $studentFeeDiscounts = [];

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['student']['classroom'])) {
                        unset($feeInstallment['student']['classroom']);
                    }

                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                return $feeInstallment;
            });

            $this->mergeFeeInstallmentsTransportFeeAndLateFee($feeInstallments, $studentFeeDiscounts, $transportFeeStructureSetting);

            $this->processStudentHeadWiseFeeInstallmentsData(
                $studentHeadWiseReports,
                $payment_fee_types,
                $grand_total_amount,
                $grand_total_discount,
                $grand_total_payable,
                $grand_total_paid,
                $grand_total_due,
                $feeInstallments,
                $studentFeeDiscounts
            );

            $studentHeadWiseReports['total_fee'] = $grand_total_amount;
            $studentHeadWiseReports['concession'] = $grand_total_discount;
            $studentHeadWiseReports['total_payable'] = $grand_total_payable;
            $studentHeadWiseReports['total_paid'] = $grand_total_paid;
            $studentHeadWiseReports['total_due'] = $grand_total_due;
        }

        if ($includeVoucher == true) {
            // get transport voucher data and calculate due
            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                $this->getAndProcessStudentHeadWiseTransportVouchersData(
                    $studentHeadWiseReports,
                    $payment_fee_types,
                    $transportFeeStructureSetting,
                    $classroomId,
                    $studentStatus,
                );
            }

            // get general voucher all due
            $generalVouchers = $this->studentFeeVoucherRepository->getStudentHeadWiseAllVouchers(
                $classroomId,
                $studentStatus,
            );

            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }
                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                return $voucher;
            });

            // process general vouchers data
            $this->processStudentHeadWiseGeneralVouchersData($studentHeadWiseReports, $payment_fee_types, $generalVouchers);

            $studentHeadWiseReports['hasVoucher'] = true;
        }

        $studentHeadWiseReports['fee_type_amounts'] = $payment_fee_types;

        // sort reports by classroom roll
        $this->sortStudentHeadWiseReportByClassroomRoll($studentHeadWiseReports);

        return $studentHeadWiseReports;
    }

    /*
    *   helper method to processs voucher due data
    */
    protected function sortStudentHeadWiseReportByClassroomRoll(array &$studentHeadWiseReports)
    {
        if (!empty($studentHeadWiseReports['reports'])) {
            usort($studentHeadWiseReports['reports'], function ($a, $b) {
                $rollNoA = $a['roll_no'] ?? null;
                $rollNoB = $b['roll_no'] ?? null;

                if ($rollNoA == $rollNoB) {
                    return 0;
                }

                // If $rollNoA is null, move it to the end
                if ($rollNoA == null) {
                    return 1;
                }

                // If $rollNoB is null, move it to the end
                if ($rollNoB == null) {
                    return -1;
                }

                return ($rollNoA < $rollNoB) ? -1 : 1;
            });
        }
    }

    /*
    *   helper method to merge transport fee and late fee to fee installments for student head wise fee report
    */
    private function mergeFeeInstallmentsTransportFeeAndLateFee(&$feeInstallments, &$studentFeeDiscounts, $transportFeeStructureSetting)
    {
        foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
            $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

            foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                if (!$hasPayment) {
                    $fee = $groupedFeeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                            if ($currentAllocateTransport != null) {
                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                            } else {
                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                            }

                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                $studentId,
                                $currentAllocateFeeId,
                                $deallocateTransport?->fee_id
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                    if ($allocateTransportFee->id == $feeInstallmentId) {
                                        if ($transportFee != null) {
                                            $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                            if ($existedTransportFee == null) {
                                                $newTransportFee = collect([
                                                    'id' => null,
                                                    'student_id' => $studentId,
                                                    'fee_id' => $feeInstallmentId,
                                                    'fee_type_id' =>  $transportFee->id,
                                                    'amount' =>  $transportFeeAmount,
                                                    'semester' => null,
                                                    'is_fee_special' => $transportFee->is_fee_special,
                                                    'is_extra_charge' => true,
                                                    'feeType' => $transportFee,
                                                    'fee' => $fee,
                                                    'payment' => null,
                                                    'fee_payments' => [],
                                                    'nullify_fee' => null,
                                                ]);

                                                $feeInstallments->push($newTransportFee);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // add late fee in structure if late fine is available
                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                    if ($lateFee != null) {
                        $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();

                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                            if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                $currentDate = date("Y-m-d");
                                $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                if ($lateFineType == LateFineType::DAILY->value) {
                                    $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                    $weeksDifference = floor($daysDifference / 7);
                                    $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                    // Extract year and month from the start date
                                    list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                    // Extract year and month from the current date
                                    list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                    // Calculate the difference in months
                                    $startMonths = ($startYear * 12) + $startMonth;
                                    $currentMonths = ($currentYear * 12) + $currentMonth;
                                    $monthsDifference = $currentMonths - $startMonths;

                                    $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                }
                            }

                            $newLateFee = collect([
                                'id' => null,
                                'student_id' => $studentId,
                                'fee_id' => $feeInstallmentId,
                                'fee_type_id' =>  $lateFee->id,
                                'amount' => $late_fee_amount,
                                'semester' => null,
                                'is_fee_special' => $lateFee->is_fee_special,
                                'is_extra_charge' => true,
                                'feeType' => $lateFee,
                                'fee' => $fee,
                                'payment' => null,
                                'fee_payments' => [],
                                'nullify_fee' => null,
                            ]);

                            $feeInstallments->push($newLateFee);
                        }
                    }
                }
            }
        }
    }

    /*
    *   helper method to merge transport fee and late fee to fee installments for student head wise fee report
    */
    private function processStudentHeadWiseFeeInstallmentsData(
        &$studentHeadWiseReports,
        &$payment_fee_types,
        &$grand_total_amount,
        &$grand_total_discount,
        &$grand_total_payable,
        &$grand_total_paid,
        &$grand_total_due,
        $feeInstallments,
        $studentFeeDiscounts
    ) {
        foreach ($feeInstallments->groupBy('student_id') as $studentId => $groupedInstallments) {
            $total_amount = 0;
            $total_payable = 0;
            $total_paid = 0;
            $total_due = 0;
            $total_discount = 0;
            $payment_fee_types_amount = [];

            foreach ($groupedInstallments as $installment) {
                $fee_amount = !empty($installment['semester']) ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount'];
                $payable_amount = $fee_amount;
                $due_amount = $fee_amount;
                $paid_amount = 0;
                $discount_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $payable_amount = $paid_amount;
                } elseif (!empty($installment['payment']) && count($installment['fee_payments']) > 0) {
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        }
                    }
                }

                $payable_amount = $fee_amount - $discount_amount;

                // if ($paid_amount > 0) {
                // }
                // calculate fee type paid amount for grand total
                if (isset($payment_fee_types[$installment['feeType']['fee_type']])) {
                    $payment_fee_types[$installment['feeType']['fee_type']] += $paid_amount;
                } else {
                    $payment_fee_types[$installment['feeType']['fee_type']] = $paid_amount;
                }

                // calculate fee type paid amount for each date group
                if (isset($payment_fee_types_amount[$installment['feeType']['fee_type']])) {
                    $payment_fee_types_amount[$installment['feeType']['fee_type']] += $paid_amount;
                } else {
                    $payment_fee_types_amount[$installment['feeType']['fee_type']] = $paid_amount;
                }

                $total_amount += $fee_amount;
                $total_payable += $payable_amount;
                $total_paid += $paid_amount;
                $total_due += $due_amount;
                $total_discount += $discount_amount;
            }

            $student = $groupedInstallments?->first()?->student;

            $admissionNo = "";
            $studentName = "";
            $studentClassroomTitle = "";
            $fatherName = "";
            $fatherPhone = "";
            $status = "";

            if ($student != null) {
                $admissionNo = $student?->admission_no ?? "";
                $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                $studentClassroomTitle = $student?->classroom?->title ?? "";

                if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                    $status = strtoupper('Tc');
                } else {
                    $status = strtoupper($student?->status?->value ?? "");
                }
            }

            if ($student?->father != null) {
                $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                $fatherPhone = $student?->father?->phone ?? "";
            }

            $studentHeadWiseReports['reports'][$studentId] = [
                'admission_no' => $admissionNo,
                'name' => $studentName,
                'roll_no' => $student?->classroomRoll?->roll_no ?? "",
                'class' => $studentClassroomTitle,
                'father_name' => $fatherName,
                'father_mobile' => $fatherPhone,
                'total_fee' => $total_amount,
                'concession' => $total_discount,
                'total_payable' => $total_payable,
                'total_paid' => $total_paid,
                'total_due' => $total_due,
                'status' => $status,
                ...$payment_fee_types_amount
            ];

            $grand_total_amount += $total_amount;
            $grand_total_discount += $total_discount;
            $grand_total_payable += $total_payable;
            $grand_total_paid += $total_paid;
            $grand_total_due += $total_due;
        }
    }

    /*
    *   helper method to processs transport voucher due data for student head wise fee report
    */
    private function getAndProcessStudentHeadWiseTransportVouchersData(&$studentHeadWiseReports, &$payment_fee_types, $transportFeeStructureSetting, $classroomId = null, $studentStatus = "")
    {
        // get students
        $students = $this->studentRepository->getStudentsByClassroomIdAndActiveStatus($classroomId, $studentStatus);

        if (count($students) > 0) {
            $students->loadMissing([
                'promotedClassroom',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId());

                    if (!empty($classroomId)) {
                        $query->where('classroom_id', $classroomId);
                    }
                }
            ]);

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    unset($student['classroom']);

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            foreach ($students as $student) {
                // get current allocation
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocation
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocation
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

                $allocateTransportVouchers = [];

                // if transport fee seetinf is voucher then get transport voucher
                if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                $transportFeeType = $this->feeTypeRepository->getTransportFeeType();

                $total_fee = 0;
                $concession = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount ?? 0;
                        $discount_amount = 0;
                        $payable_amount = $fee_amount;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        // if ($paid_amount > 0) {
                        // }
                        // calculate fee type paid amount for grand total
                        if (isset($payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'])) {
                            $payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'] += $paid_amount;
                        } else {
                            $payment_fee_types[$transportFeeType?->fee_type ?? 'Transport'] = $paid_amount;
                        }

                        // check if student data already exists. if alreday exists then update fee type amounts
                        if (isset($studentHeadWiseReports['reports'][$student->id][$transportFeeType?->fee_type ?? 'Transport'])) {
                            $studentHeadWiseReports['reports'][$student->id][$transportFeeType?->fee_type ?? 'Transport'] += $paid_amount;
                        } else {
                            $studentHeadWiseReports['reports'][$student->id][$transportFeeType?->fee_type ?? 'Transport'] = $paid_amount;
                        }

                        $total_fee += $fee_amount;
                        $concession += $discount_amount;
                        $total_payable += $payable_amount;
                        $total_paid += $paid_amount;
                        $total_due += $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport?->amount ?? 0;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    if ($fee_amount > 0) {
                        $payable_amount = $fee_amount;
                        $due_amount = $fee_amount;

                        foreach ($allocateTransportVouchers as $voucher) {
                            $total_fee += $fee_amount;
                            $total_payable += $payable_amount;
                            $total_due += $due_amount;
                        }
                    }
                }

                if ($total_fee > 0) {
                    // update reports total amounts
                    $keysToUpdate = ['total_fee', 'concession', 'total_payable', 'total_paid', 'total_due'];

                    foreach ($keysToUpdate as $key) {
                        if (isset($studentHeadWiseReports['reports'][$student->id][$key])) {
                            $studentHeadWiseReports['reports'][$student->id][$key] += $$key;
                        } else {
                            $studentHeadWiseReports['reports'][$student->id][$key] = $$key;
                        }

                        if (isset($studentHeadWiseReports[$key])) {
                            $studentHeadWiseReports[$key] += $$key;
                        } else {
                            $studentHeadWiseReports[$key] = $$key;
                        }
                    }

                    $admissionNo = "";
                    $studentName = "";
                    $studentClassroomTitle = "";
                    $fatherName = "";
                    $fatherPhone = "";
                    $status = "";

                    if ($student != null) {
                        $admissionNo = $student?->admission_no ?? "";
                        $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                        $studentClassroomTitle = $student?->classroom?->title ?? "";
                        $status = strtoupper($student?->status?->value ?? "");

                        if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                            $status = strtoupper('Tc');
                        } else {
                            $status = strtoupper($student?->status?->value ?? "");
                        }
                    }

                    if ($student?->father != null) {
                        $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                        $fatherPhone = $student?->father?->phone ?? "";
                    }

                    $studentHeadWiseReports['reports'][$student->id]['admission_no'] = $studentHeadWiseReports['reports'][$student->id]['admission_no'] ?? $admissionNo;
                    $studentHeadWiseReports['reports'][$student->id]['name'] = $studentHeadWiseReports['reports'][$student->id]['name'] ?? $studentName;
                    $studentHeadWiseReports['reports'][$student->id]['roll_no'] = $studentHeadWiseReports['reports'][$student->id]['roll_no'] ?? $student?->classroomRoll?->roll_no;
                    $studentHeadWiseReports['reports'][$student->id]['class'] = $studentHeadWiseReports['reports'][$student->id]['class'] ?? $studentClassroomTitle;
                    $studentHeadWiseReports['reports'][$student->id]['father_name'] = $studentHeadWiseReports['reports'][$student->id]['father_name'] ?? $fatherName;
                    $studentHeadWiseReports['reports'][$student->id]['father_mobile'] = $studentHeadWiseReports['reports'][$student->id]['father_mobile'] ?? $fatherPhone;
                    $studentHeadWiseReports['reports'][$student->id]['status'] = $studentHeadWiseReports['reports'][$student->id]['status'] ?? $status;
                }
            }
        }
    }

    /*
    *   helper method to processs voucher due data for student head wise fee report
    */
    private function processStudentHeadWiseGeneralVouchersData(&$studentHeadWiseReports, &$payment_fee_types, $vouchers)
    {
        if (count($vouchers) > 0) {
            $grand_total_fee = 0;
            $grand_concession = 0;
            $grand_total_payable = 0;
            $grand_total_paid = 0;
            $grand_total_due = 0;

            foreach ($vouchers->groupBy('student_id') as $studentId => $groupedVouchers) {
                $total_fee = 0;
                $concession = 0;
                $total_payable = 0;
                $total_paid = 0;
                $total_due = 0;

                foreach ($groupedVouchers as $voucher) {
                    if (count($voucher->feeTypeAmounts) > 0) {
                        foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                            $amount = (float) $voucherAmountData->amount ?? 0;
                            $discount_amount = 0;
                            $payable_amount = $amount;
                            $paid_amount = 0;
                            $due_amount = $amount;

                            if ($voucherAmountData?->payment != null) {
                                $discount_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                                $paid_amount = (float) $voucherAmountData?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                                $due_amount = $amount - $discount_amount - $paid_amount;
                                $payable_amount = $amount - $discount_amount;
                            }

                            // if ($paid_amount > 0) {
                            // }
                            // calculate fee type paid amount for grand total
                            if (isset($payment_fee_types[$voucherAmountData->feeType->fee_type])) {
                                $payment_fee_types[$voucherAmountData->feeType->fee_type] += $paid_amount;
                            } else {
                                $payment_fee_types[$voucherAmountData->feeType->fee_type] = $paid_amount;
                            }

                            // check if student data already exists. if alreday exists then update fee type amounts
                            if (isset($studentHeadWiseReports['reports'][$studentId][$voucherAmountData?->feeType?->fee_type])) {
                                $studentHeadWiseReports['reports'][$studentId][$voucherAmountData?->feeType?->fee_type] += $paid_amount;
                            } else {
                                $studentHeadWiseReports['reports'][$studentId][$voucherAmountData?->feeType?->fee_type] = $paid_amount;
                            }

                            $total_fee += $amount;
                            $concession += $discount_amount;
                            $total_payable += $payable_amount;
                            $total_paid += $paid_amount;
                            $total_due += $due_amount;
                        }

                        // update reports total amounts
                        $keysToUpdate = ['total_fee', 'concession', 'total_payable', 'total_paid', 'total_due'];

                        foreach ($keysToUpdate as $key) {
                            if (isset($studentHeadWiseReports['reports'][$studentId][$key])) {
                                $studentHeadWiseReports['reports'][$studentId][$key] += $$key;
                            } else {
                                $studentHeadWiseReports['reports'][$studentId][$key] = $$key;
                            }
                        }

                        $student = $voucher?->student;

                        $admissionNo = "";
                        $studentName = "";
                        $studentClassroomTitle = "";
                        $fatherName = "";
                        $fatherPhone = "";
                        $status = "";

                        if ($student != null) {
                            $admissionNo = $student?->admission_no ?? "";
                            $studentName = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";
                            $studentClassroomTitle = $student?->classroom?->title ?? "";

                            if ($student?->studentTransferCertificate != null && $student?->studentTransferCertificate?->is_generated == true) {
                                $status = strtoupper('Tc');
                            } else {
                                $status = strtoupper($student?->status?->value ?? "");
                            }
                        }

                        if ($student?->father != null) {
                            $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                            $fatherPhone = $student?->father?->phone ?? "";
                        }

                        $studentHeadWiseReports['reports'][$studentId]['admission_no'] = $studentHeadWiseReports['reports'][$studentId]['admission_no'] ?? $admissionNo;
                        $studentHeadWiseReports['reports'][$studentId]['name'] = $studentHeadWiseReports['reports'][$studentId]['name'] ?? $studentName;
                        $studentHeadWiseReports['reports'][$student->id]['roll_no'] = $studentHeadWiseReports['reports'][$student->id]['roll_no'] ?? $student?->classroomRoll?->roll_no;
                        $studentHeadWiseReports['reports'][$studentId]['class'] = $studentHeadWiseReports['reports'][$studentId]['class'] ?? $studentClassroomTitle;
                        $studentHeadWiseReports['reports'][$studentId]['father_name'] = $studentHeadWiseReports['reports'][$studentId]['father_name'] ?? $fatherName;
                        $studentHeadWiseReports['reports'][$studentId]['father_mobile'] = $studentHeadWiseReports['reports'][$studentId]['father_mobile'] ?? $fatherPhone;
                        $studentHeadWiseReports['reports'][$studentId]['status'] = $studentHeadWiseReports['reports'][$studentId]['status'] ?? $status;
                    }
                }

                $grand_total_fee += $total_fee;
                $grand_concession += $concession;
                $grand_total_payable += $total_payable;
                $grand_total_paid += $total_paid;
                $grand_total_due += $total_due;
            }

            // update reports total amounts
            $keysToUpdate = ['total_fee', 'concession', 'total_payable', 'total_paid', 'total_due'];

            foreach ($keysToUpdate as $key) {
                if (isset($studentHeadWiseReports[$key])) {
                    $studentHeadWiseReports[$key] += ${'grand_' . $key};
                } else {
                    $studentHeadWiseReports[$key] = ${'grand_' . $key};
                }
            }
        }
    }

    /**
     * student class wise fee collection summary
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printClassWiseFeeCollectionSummary()
    {
        $classWiseFeeCollectionSummary = $this->getClassWiseFeeCollectionSummaryData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Class Wise Fee Collection Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.class_wise_fee_collection_summary', [
            'classWiseFeeCollectionSummary' => $classWiseFeeCollectionSummary,
            'schoolData' => $schoolData
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper method to get class wise fee collection summary  data
    */
    private function getClassWiseFeeCollectionSummaryData()
    {
        $classWiseFeeCollectionSummary = [];
        $totalAmount = 0;

        $classrooms = $this->classroomRepository->getActiveAll();
        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getClassAndInstallmentWiseFeePaymentSummary();

        if ($feeCollectionSummaryData->count() > 0) {
            $tempClassWiseData = [];

            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($feeCollection) {
                $feeCollection->fee_payments->transform(function ($feePayment) {
                    if ($feePayment?->student?->promotedClassroom != null) {
                        $feePayment['student']['classroom_id'] = $feePayment?->student?->promotedClassroom?->id;
                    }

                    return $feePayment;
                });
                return $feeCollection;
            });

            foreach ($feeCollectionSummaryData as $summaryData) {
                foreach ($summaryData->fee_payments as $feePayment) {
                    if ($feePayment?->payment_status != PaymentStatus::CANCELLED->value) {
                        if (isset($tempClassWiseData[$feePayment->student->classroom_id])) {
                            $tempClassWiseData[$feePayment->student->classroom_id] += (float) $feePayment->paid_amount ?? 0;
                        } else {
                            $tempClassWiseData[$feePayment->student->classroom_id] = (float) $feePayment->paid_amount ?? 0;
                        }
                    }
                }
            }

            foreach ($classrooms as $classroom) {
                $amount = $tempClassWiseData[$classroom->id] ?? 0;

                $classWiseFeeCollectionSummary[$classroom->id] = [
                    'class_name' => $classroom->title,
                    'total_amount' => $amount,
                ];

                $totalAmount += $amount;
            }
        }

        return [
            'reports' => $classWiseFeeCollectionSummary,
            'total_amount' => $totalAmount
        ];
    }

    /**
     * student installment wise fee collection summary
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printInstallmentWiseFeeCollectionSummary()
    {
        $installmentWiseFeeCollectionSummary = $this->getInstallmentWiseFeeCollectionSummaryData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Class Wise Fee Collection Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.installment_wise_fee_collection_summary', [
            'installmentWiseFeeCollectionSummary' => $installmentWiseFeeCollectionSummary,
            'schoolData' => $schoolData
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper method to get installment wise fee collection summary  data
    */
    private function getInstallmentWiseFeeCollectionSummaryData()
    {
        $installmentWiseFeeCollectionSummary = [];
        $totalAmount = 0;

        $fees = $this->feeRepository->getActiveIdTitle();
        $feeCollectionSummaryData = $this->feePaymentMethodRepository->getClassAndInstallmentWiseFeePaymentSummary();

        if ($feeCollectionSummaryData->count() > 0) {
            $tempInstallmentWiseData = [];

            $feeCollectionSummaryData = $feeCollectionSummaryData->map(function ($feeCollection) {
                $feeCollection->fee_payments->transform(function ($feePayment) {
                    if ($feePayment?->student?->promotedClassroom != null) {
                        $feePayment['student']['classroom_id'] = $feePayment?->student?->promotedClassroom?->id;
                    }

                    return $feePayment;
                });
                return $feeCollection;
            });

            foreach ($feeCollectionSummaryData as $summaryData) {
                foreach ($summaryData->fee_payments as $feePayment) {
                    if ($feePayment?->payment_status != PaymentStatus::CANCELLED->value) {
                        if ($feePayment->fee_payment_type == FeePaymentType::FEEINSTALLMENT->value) {
                            if (isset($tempInstallmentWiseData[$feePayment->fee_id])) {
                                $tempInstallmentWiseData[$feePayment->fee_id] += (float) $feePayment->paid_amount ?? 0;
                            } else {
                                $tempInstallmentWiseData[$feePayment->fee_id] = (float) $feePayment->paid_amount ?? 0;
                            }
                        }
                    }
                }
            }

            $fees->filter(function ($fee) use ($tempInstallmentWiseData) {
                return in_array($fee->id, array_keys($tempInstallmentWiseData));
            })->each(function ($fee) use (&$installmentWiseFeeCollectionSummary, &$tempInstallmentWiseData, &$totalAmount) {
                $amount = $tempInstallmentWiseData[$fee->id] ?? 0;

                $installmentWiseFeeCollectionSummary[$fee->id] = [
                    'title' => $fee->title,
                    'amount' => $amount
                ];

                $totalAmount += $amount;
            });
        }

        return [
            'reports' => $installmentWiseFeeCollectionSummary,
            'amount' => $totalAmount
        ];
    }

    /**
     * fee cancellation report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printFeeCancellationReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;
        $admissionNo = $request->admission_no ?? "";

        $feeCancellationReport = $this->getFeeCancellationReportData(
            $classroomId,
            $studentId,
            $admissionNo
        );

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Cancel Payment Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.fee_cancellation_report', [
            'feeCancellationReport' => $feeCancellationReport
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper method to get fee cancellation report data
    */
    private function getFeeCancellationReportData(
        $classroomId = null,
        $studentId = null,
        $admissionNo = ""
    ) {
        $cancellationReports = [];
        $student = null;

        if (!empty($admissionNo) && empty($studentId)) {
            $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
        }

        if (!empty($studentId)) {
            $student = $this->studentRepository->getStudentById($studentId);
        }

        if ($student != null) {
            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                $student['classroom_id'] = $student?->promotedClassroom?->id;
            }

            $classroomId = $student?->classroom_id;
            $studentId = $student?->id;
        }

        if (empty($studentId) && !empty($admissionNo) && $student == null) {
            $cancellationReports = [];
        } else {
            $cancellationReports = $this->feePaymentMethodRepository->getCancellationReports($classroomId, $studentId);
        }

        if (count($cancellationReports) > 0) {
            $cancellationReports = $cancellationReports->map(function ($report) {
                $total_amount = 0;

                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }

                if (count($report->fee_payments) > 0) {
                    foreach ($report->fee_payments as $payment) {
                        $total_amount += (float) $payment->paid_amount ?? 0;
                    }
                }

                $formatted_date = Carbon::parse($report->cancellation_date)->format('d M,Y');

                unset($report['cancellation_date']);

                $report['cancelled_date'] = $formatted_date;
                $report['amount'] = $total_amount;

                $studentName = ($report?->student?->first_name ?? "") . " " . ($report?->student?->middle_name ?? "") . " " . ($report?->student?->last_name ?? "");
                $cancelledBy = ($report?->cancelledBy?->first_name ?? "") . " " . ($report?->cancelledBy?->middle_name ?? "") . " " . ($report?->cancelledBy?->last_name ?? "");

                return [
                    'admission_no' => $report?->student?->admission_no,
                    'student_name' => $studentName,
                    'class' => $report?->student?->classroom?->title,
                    'amount' => $total_amount,
                    'payment_mode' => $report?->payment_mode,
                    'receipt_no' => $report?->receipt_no,
                    'cancelled_date' => $formatted_date,
                    'cancelled_by' => $cancelledBy,
                    'reason' => $report?->cancel_reason,
                ];
            })->toArray();
        }

        return  $cancellationReports;
    }

    /**
     * guardian wis edue report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printGuardianWiseDueReport(Request $request)
    {
        $guardianWiseDueReport = [];

        $paymentStatus = $request->payment_status ?? "";
        $includeVoucher = $request->voucher ?? false;
        $studentStatus = $request->student_status ?? "";
        $transportRouteId = $request->transport_route ?? null;
        $classroomId = $request->classroom_id ?? null;
        $guardianType = $request->guardian_type ?? "";
        $fromFeeId = $request->from_fee_id ?? null;
        $toFeeId = $request->to_fee_id ?? null;

        $reportTitle = "Guardian wise due ";

        if (!empty($fromFeeId) && !empty($toFeeId) && !empty($guardianType)) {
            $guardianWiseDueReport = $this->getGuardianWiseDueReportData(
                $guardianType,
                $fromFeeId,
                $toFeeId,
                $paymentStatus,
                $includeVoucher,
                $studentStatus,
                $transportRouteId,
                $classroomId
            );

            $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
            $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

            $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Guardian Wise Due Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.guardian_wise_due_report', [
            'guardianWiseDueReport' => $guardianWiseDueReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle,
            'guardianType' => $guardianType
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper method to get guardian wise due report data
    */
    private function getGuardianWiseDueReportData(
        $guardianType,
        $fromFeeId,
        $toFeeId,
        $paymentStatus = "",
        $includeVoucher = false,
        $studentStatus = "",
        $transportRouteId = null,
        $classroomId = null
    ) {
        $guardianWiseReport = [];

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        $feeInstallmentsData = $this->getGuardianWiseFeeInstallmentsData(
            $transportFeeStructureSetting,
            $guardianType,
            $fromFeeId,
            $toFeeId,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId,
        );

        $guardianWiseReport = $feeInstallmentsData;

        $generalVouchersData = [];
        $transportVouchersData = [];

        // get voucher reports
        if ($includeVoucher == true) {
            // get genral vouchers data
            $generalVouchersData = $this->getGuardianWiseGeneralVouchersData(
                $transportFeeStructureSetting,
                $guardianType,
                $paymentStatus,
                $studentStatus,
                $transportRouteId,
                $classroomId
            );

            // get transport vouchers data
            $transportVouchersData = $this->getGuardianWiseTransportVouchersData(
                $transportFeeStructureSetting,
                $guardianType,
                $paymentStatus,
                $studentStatus,
                $transportRouteId,
                $classroomId
            );
        }

        if (!empty($generalVouchersData)) {
            $this->updateGuardianWiseReport($guardianWiseReport, $generalVouchersData);
        }

        if (!empty($transportVouchersData)) {
            $this->updateGuardianWiseReport($guardianWiseReport, $transportVouchersData);
        }

        return [
            'reports' => $guardianWiseReport
        ];
    }

    /**
     * helper method to update guardian wise report
     */
    private function updateGuardianWiseReport(array &$guardianWiseReport, array $vouchersData)
    {
        foreach ($vouchersData as $guardianId => $guardianData) {
            if (!isset($guardianWiseReport[$guardianId])) {
                $guardianWiseReport[$guardianId] = $guardianData;
            } else {
                foreach ($guardianData['student_data'] as $studentId => $studentData) {
                    if (!isset($guardianWiseReport[$guardianId]['student_data'][$studentId])) {
                        $guardianWiseReport[$guardianId]['student_data'][$studentId] = $studentData;
                    } else {
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['name'] = $studentData['name'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['admission_no'] = $studentData['admission_no'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['roll_no'] = $studentData['roll_no'];
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['classroom_title'] = $studentData['classroom_title'];

                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_amount'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_amount'] ?? 0) + $studentData['total_amount'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_discount'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_discount'] ?? 0) + $studentData['total_discount'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_payable'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_payable'] ?? 0) + $studentData['total_payable'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_paid'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_paid'] ?? 0) + $studentData['total_paid'] ?? 0;
                        $guardianWiseReport[$guardianId]['student_data'][$studentId]['total_due'] = ($guardianWiseReport[$guardianId]['student_data'][$studentId]['total_due'] ?? 0) + $studentData['total_due'] ?? 0;
                    }
                }

                $guardianWiseReport[$guardianId]['total_amount'] = ($guardianWiseReport[$guardianId]['total_amount'] ?? 0) + $studentData['total_amount'] ?? 0;
                $guardianWiseReport[$guardianId]['total_discount'] = ($guardianWiseReport[$guardianId]['total_discount'] ?? 0) + $studentData['total_discount'] ?? 0;
                $guardianWiseReport[$guardianId]['total_payable'] = ($guardianWiseReport[$guardianId]['total_payable'] ?? 0) + $studentData['total_payable'] ?? 0;
                $guardianWiseReport[$guardianId]['total_paid'] = ($guardianWiseReport[$guardianId]['total_paid'] ?? 0) + $studentData['total_paid'] ?? 0;
                $guardianWiseReport[$guardianId]['total_due'] = ($guardianWiseReport[$guardianId]['total_due'] ?? 0) + $studentData['total_due'] ?? 0;
            }
        }
    }

    /**
     * helper method to get guardian wise fee installments data
     */
    private function getGuardianWiseFeeInstallmentsData(
        $transportFeeStructureSetting,
        string $guardianType,
        int $fromFeeId,
        int $toFeeId,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $feeInstallmentsData = [];
        $studentAmountArray = [];
        $studentFeeDiscounts = [];

        $feeInstallments = $this->classFeeStudentAmountRepository->getGuardianWiseStudentFeeInstallments(
            $transportFeeStructureSetting,
            $fromFeeId,
            $toFeeId,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        if (count($feeInstallments) > 0) {
            if ($guardianType == 'guardian') {
                $feeInstallments->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $feeInstallments->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                if ($feeInstallment?->student?->promotedClassroom != null) {
                    if (!empty($feeInstallment['student']['classroom'])) {
                        unset($feeInstallment['student']['classroom']);
                    }

                    $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                    $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                }

                $classroomId = $feeInstallment?->student?->classroom_id;

                $feeInstallment?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $feeInstallment;
            });

            // get transport fee and late fee if does not have any payment
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // calculte transport fee if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $amount = (float) $currentAllocateTransport?->amount ?? 0;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $amount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();
                                    $discount_amount = 0;

                                    if ($transportFee != null) {
                                        foreach ($allocateTransportFees as $allocateTransportFee) {
                                            if ($allocateTransportFee->id == $feeInstallmentId) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    if (!empty($studentFeeDiscounts[$studentId])) {
                                                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                                            if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $transportFee->id) {
                                                                if ($discount->is_discount_percentage) {
                                                                    $discount_amount = (float) ($discount->amount / 100) * $amount;
                                                                } else {
                                                                    $discount_amount = (float) $discount->amount;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    $payable_amount = $amount - $discount_amount;

                                                    $studentAmountArray[$studentId]['total_amount'] = ($studentAmountArray[$studentId]['total_amount'] ?? 0) + $amount;
                                                    $studentAmountArray[$studentId]['total_discount'] = ($studentAmountArray[$studentId]['total_discount'] ?? 0) + $discount_amount;
                                                    $studentAmountArray[$studentId]['total_payable'] = ($studentAmountArray[$studentId]['total_payable'] ?? 0) + $payable_amount;
                                                    $studentAmountArray[$studentId]['total_due'] = ($studentAmountArray[$studentId]['total_due'] ?? 0) + $payable_amount;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // calculate late fee
                        $lateFee = $this->feeTypeRepository->getLateFeeType();

                        if ($lateFee != null) {
                            $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();
                            $discount_amount = 0;

                            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                $amount = 0;

                                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                $lateFineStartDate = $fee->last_pay_date_at;
                                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                    $currentDate = date("Y-m-d");
                                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                    if ($lateFineType == LateFineType::DAILY->value) {
                                        $amount = (float) $lateFineAmount * $daysDifference;
                                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                        $weeksDifference = floor($daysDifference / 7);
                                        $amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                        // Extract year and month from the start date
                                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                        // Extract year and month from the current date
                                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                        // Calculate the difference in months
                                        $startMonths = ($startYear * 12) + $startMonth;
                                        $currentMonths = ($currentYear * 12) + $currentMonth;
                                        $monthsDifference = $currentMonths - $startMonths;

                                        $amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                    }
                                }

                                if (count($studentFeeDiscounts[$studentId]) > 0) {
                                    foreach ($studentFeeDiscounts[$studentId] as $discount) {
                                        if ($discount->fee_id == $feeInstallmentId && $discount->fee_type_id == $lateFee->id) {
                                            if ($discount->is_discount_percentage) {
                                                $discount_amount = (float) ($discount->amount / 100) * $amount;
                                            } else {
                                                $discount_amount = (float) $discount->amount;
                                            }
                                        }
                                    }
                                }

                                $payable_amount = $amount - $discount_amount;

                                $studentAmountArray[$studentId]['total_amount'] = ($studentAmountArray[$studentId]['total_amount'] ?? 0) + $amount;
                                $studentAmountArray[$studentId]['total_discount'] = ($studentAmountArray[$studentId]['total_discount'] ?? 0) + $discount_amount;
                                $studentAmountArray[$studentId]['total_payable'] = ($studentAmountArray[$studentId]['total_payable'] ?? 0) + $payable_amount;
                                $studentAmountArray[$studentId]['total_due'] = ($studentAmountArray[$studentId]['total_due'] ?? 0) + $payable_amount;
                            }
                        }
                    }
                }
            }

            foreach ($feeInstallments as $installment) {
                $semester = $installment['semester'] ?? 1;
                $amount = ((float) $installment['amount'] ?? 0) * $semester;
                $payable_amount = $amount;
                $due_amount = $payable_amount;
                $paid_amount = 0;
                $discount_amount = 0;

                if (!empty($installment['nullify_fee'])) {
                    $due_amount = 0;
                    $paid_amount = $payable_amount;
                } elseif (!empty($installment['payment'])) {
                    $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $due_amount =  $amount - $discount_amount - $paid_amount;
                    $payable_amount = $amount - $discount_amount;
                } elseif (!empty($studentFeeDiscounts[$installment['student_id']])) {
                    foreach ($studentFeeDiscounts[$installment['student_id']] as $discount) {
                        if ($discount->fee_id === $installment['fee_id'] && $discount->fee_type_id === $installment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($installment['semester'] != null ? (float) $installment['amount'] * $installment['semester'] : (float) $installment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount =  $amount - $discount_amount - $paid_amount;
                            $payable_amount =  $amount - $discount_amount;
                        }
                    }
                }

                $studentAmountArray[$installment?->student_id]['total_amount'] = ($studentAmountArray[$installment?->student_id]['total_amount'] ?? 0) + $amount;
                $studentAmountArray[$installment?->student_id]['total_discount'] = ($studentAmountArray[$installment?->student_id]['total_discount'] ?? 0) + $discount_amount;
                $studentAmountArray[$installment?->student_id]['total_payable'] = ($studentAmountArray[$installment?->student_id]['total_payable'] ?? 0) + $payable_amount;
                $studentAmountArray[$installment?->student_id]['total_paid'] = ($studentAmountArray[$installment?->student_id]['total_paid'] ?? 0) + $paid_amount;
                $studentAmountArray[$installment?->student_id]['total_due'] = ($studentAmountArray[$installment?->student_id]['total_due'] ?? 0) + $due_amount;

                $student_name = "";
                $father_name = "";
                $father_phone = "";
                $guardian_name = "";
                $guardian_phone = "";

                if ($installment?->student != null) {
                    $student_name = "{$installment?->student?->first_name} {$installment?->student?->middle_name} {$installment?->student?->last_name}";
                }

                if ($installment?->father != null) {
                    $father_name = "{$installment?->father?->first_name} {$installment?->father?->middle_name} {$installment?->father?->last_name}";
                    $father_phone = $installment?->father?->phone ?? "";
                }

                if ($guardianType == 'guardian') {
                    $guardianId = $installment?->guardian?->user_id;

                    if ($installment?->guardian != null) {
                        $guardian_name = "{$installment?->guardian?->first_name} {$installment?->guardian?->middle_name} {$installment?->guardian?->last_name}";
                        $guardian_phone = $installment?->guardian?->phone ?? "";
                    }
                } else {
                    $guardianId = $installment?->father?->user_id;
                    $guardian_name = $father_name;
                    $guardian_phone = $father_phone;
                }

                $guardianData = [
                    'guardian_id' => $guardianId,
                    'guardian_name' => $guardian_name,
                    'guardian_phone' => $guardian_phone,
                ];

                $studentData = [
                    'id' => $installment?->student?->id ?? "",
                    'name' => $student_name,
                    'admission_no' => $installment?->student?->admission_no ?? "",
                    'roll_no' => $installment?->student?->classroomRoll?->roll_no ?? "",
                    'classroom_title' => $installment?->student?->classroom?->title ?? "",
                    'address' => $installment?->student?->present_address ?? "",
                    'father_name' => $father_name,
                    'father_phone' => $father_phone,
                ];

                if (!isset($feeInstallmentsData[$guardianId])) {
                    $feeInstallmentsData[$guardianId] = $guardianData;
                }

                if (!isset($feeInstallmentsData[$guardianId]['student_data'][$installment?->student_id])) {
                    $feeInstallmentsData[$guardianId]['student_data'][$installment?->student_id] = $studentData;
                }
            }

            if (!empty($feeInstallmentsData)) {
                foreach ($feeInstallmentsData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $feeInstallmentsData[$guardianId]['total_amount'] = ($feeInstallmentsData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_discount'] = ($feeInstallmentsData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_payable'] = ($feeInstallmentsData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_paid'] = ($feeInstallmentsData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $feeInstallmentsData[$guardianId]['total_due'] = ($feeInstallmentsData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $feeInstallmentsData[$guardianId]['total_amount'] = 0;
                            $feeInstallmentsData[$guardianId]['total_discount'] = 0;
                            $feeInstallmentsData[$guardianId]['total_payable'] = 0;
                            $feeInstallmentsData[$guardianId]['total_paid'] = 0;
                            $feeInstallmentsData[$guardianId]['total_due'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $feeInstallmentsData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $feeInstallmentsData;
    }

    /**
     * helper method to get guardian wise general vouchers data
     */
    private function getGuardianWiseGeneralVouchersData(
        $transportFeeStructureSetting,
        string $guardianType,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $vouchersData = [];
        $studentAmountArray = [];

        // get all active general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getGuardianWiseFeeVouchers(
            $transportFeeStructureSetting,
            $paymentStatus,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        //format  general vouchers
        if (count($generalVouchers) > 0) {
            if ($guardianType == 'guardian') {
                $generalVouchers->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $generalVouchers->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }

                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                $classroomId = $voucher?->student?->classroom_id;

                $voucher?->student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $voucher;
            });

            foreach ($generalVouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $amount = (float) $feeTypeAmount->amount ?? 0;
                    $payable_amount = $amount;
                    $due_amount = $payable_amount;
                    $discount_amount = 0;
                    $paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    if ($feeTypeAmount->payment != null) {
                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $due_amount = $amount - $discount_amount - $paid_amount;
                        $payable_amount = $amount - $discount_amount;
                    }

                    $studentAmountArray[$voucher?->student_id]['total_amount'] = ($studentAmountArray[$voucher?->student_id]['total_amount'] ?? 0) + $amount;
                    $studentAmountArray[$voucher?->student_id]['total_discount'] = ($studentAmountArray[$voucher?->student_id]['total_discount'] ?? 0) + $discount_amount;
                    $studentAmountArray[$voucher?->student_id]['total_payable'] = ($studentAmountArray[$voucher?->student_id]['total_payable'] ?? 0) + $payable_amount;
                    $studentAmountArray[$voucher?->student_id]['total_paid'] = ($studentAmountArray[$voucher?->student_id]['total_paid'] ?? 0) + $paid_amount;
                    $studentAmountArray[$voucher?->student_id]['total_due'] = ($studentAmountArray[$voucher?->student_id]['total_due'] ?? 0) + $due_amount;

                    $student_name = "";
                    $father_name = "";
                    $father_phone = "";
                    $guardian_name = "";
                    $guardian_phone = "";

                    if ($voucher?->student != null) {
                        $student_name = "{$voucher?->student?->first_name} {$voucher?->student?->middle_name} {$voucher?->student?->last_name}";
                    }

                    if ($voucher?->father != null) {
                        $father_name = "{$voucher?->father?->first_name} {$voucher?->father?->middle_name} {$voucher?->father?->last_name}";
                        $father_phone = $voucher?->father?->phone ?? "";
                    }

                    if ($guardianType == 'guardian') {
                        $guardianId = $voucher?->guardian?->user_id;

                        if ($voucher?->guardian != null) {
                            $guardian_name = "{$voucher?->guardian?->first_name} {$voucher?->guardian?->middle_name} {$voucher?->guardian?->last_name}";
                            $guardian_phone = $voucher?->guardian?->phone ?? "";
                        }
                    } else {
                        $guardianId = $voucher?->father?->user_id;
                        $guardian_name = $father_name;
                        $guardian_phone = $father_phone;
                    }

                    $guardianData = [
                        'guardian_id' => $guardianId,
                        'guardian_name' => $guardian_name,
                        'guardian_phone' => $guardian_phone,
                    ];

                    $studentData = [
                        'id' => $voucher?->student?->id ?? "",
                        'name' => $student_name,
                        'admission_no' => $voucher?->student?->admission_no ?? "",
                        'roll_no' => $voucher?->student?->classroomRoll?->roll_no ?? "",
                        'classroom_title' => $voucher?->student?->classroom?->title ?? "",
                        'address' => $voucher?->student?->present_address ?? "",
                        'father_name' => $father_name,
                        'father_phone' => $father_phone,
                    ];

                    if (!isset($vouchersData[$guardianId])) {
                        $vouchersData[$guardianId] = $guardianData;
                    }

                    if (!isset($vouchersData[$guardianId]['student_data'][$voucher?->student_id])) {
                        $vouchersData[$guardianId]['student_data'][$voucher?->student_id] = $studentData;
                    }
                }
            }

            if (!empty($vouchersData)) {
                foreach ($vouchersData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $vouchersData[$guardianId]['total_amount'] = ($vouchersData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['total_discount'] = ($vouchersData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['total_payable'] = ($vouchersData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['total_paid'] = ($vouchersData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['total_due'] = ($vouchersData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $vouchersData[$guardianId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['total_due'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $vouchersData;
    }

    /**
     * helper method to get guardian wise transport vouchers data
     */
    private function getGuardianWiseTransportVouchersData(
        $transportFeeStructureSetting,
        string $guardianType,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        $vouchersData = [];
        $studentAmountArray = [];

        // get all active students
        $students = $this->studentRepository->getGuardianWiseReportStudents(
            $transportFeeStructureSetting,
            $studentStatus,
            $transportRouteId,
            $classroomId
        );

        // get transport fee type
        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if ($transportFee != null && count($students) > 0) {
            if ($guardianType == 'guardian') {
                $students->loadMissing(['guardian:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            } else {
                $students->loadMissing(['father:guardians.id,guardians.user_id,guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.phone']);
            }

            $students =  $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student?->classroom_id;

                $student?->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'roll_no'
                        );
                }]);

                return $student;
            });

            foreach ($students as $student) {
                // get current allocate transport
                $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

                // get previous allocate transport
                $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

                // get deallocate transport
                $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

                $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
                $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
                $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
                $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
                $allocateTransportVouchers = [];

                // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
                if (
                    $transportFeeStructureSetting != null &&
                    $transportFeeStructureSetting?->value == 'voucher' &&
                    (empty($paymentStatus) || (!empty($paymentStatus) && $paymentStatus == PaymentStatus::DUE->value))
                ) {
                    $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                        $student->id,
                        $currentAllocateVoucherId,
                        $deallocateVoucherId
                    );
                }

                // get allocated transport vouchers
                $allocateTransport = $this->transportRepository->getGuardianWiseStudentAllocateTransports(
                    $student->id,
                    $previousAllocateTransportId,
                    $previousAllocationVoucherId,
                    $deallocateVoucherId,
                    $transportFeeStructureSetting?->value,
                    'voucher'
                );

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        if (
                            !empty($paymentStatus) &&
                            (
                                ($paymentStatus == PaymentStatus::DUE->value && $allocate->payment != null) ||
                                ($paymentStatus == PaymentStatus::PAID->value && $allocate->payment == null)
                            )
                        ) {
                            continue;
                        }

                        $amount = (float) $allocate->amount ?? 0;
                        $payable_amount = $amount;
                        $due_amount = $payable_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;

                        if ($allocate->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $due_amount = $amount - $discount_amount - $paid_amount;
                            $payable_amount = $amount - $discount_amount;
                        }

                        $studentAmountArray[$student?->id]['total_amount'] = ($studentAmountArray[$student?->id]['total_amount'] ?? 0) + $amount;
                        $studentAmountArray[$student?->id]['total_discount'] = ($studentAmountArray[$student?->id]['total_discount'] ?? 0) + $discount_amount;
                        $studentAmountArray[$student?->id]['total_payable'] = ($studentAmountArray[$student?->id]['total_payable'] ?? 0) + $payable_amount;
                        $studentAmountArray[$student?->id]['total_paid'] = ($studentAmountArray[$student?->id]['total_paid'] ?? 0) + $paid_amount;
                        $studentAmountArray[$student?->id]['total_due'] = ($studentAmountArray[$student?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $amount = (float) $currentAllocateTransport->amount ?? 0;
                    } else {
                        $amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $payable_amount = $amount;
                    $due_amount = $payable_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        $studentAmountArray[$student?->id]['total_amount'] = ($studentAmountArray[$student?->id]['total_amount'] ?? 0) + $amount;
                        $studentAmountArray[$student?->id]['total_discount'] = ($studentAmountArray[$student?->id]['total_discount'] ?? 0) + 0;
                        $studentAmountArray[$student?->id]['total_payable'] = ($studentAmountArray[$student?->id]['total_payable'] ?? 0) + $payable_amount;
                        $studentAmountArray[$student?->id]['total_paid'] = ($studentAmountArray[$student?->id]['total_paid'] ?? 0) + 0;
                        $studentAmountArray[$student?->id]['total_due'] = ($studentAmountArray[$student?->id]['total_due'] ?? 0) + $due_amount;
                    }
                }

                if (!empty($studentAmountArray)) {
                    $father_name = "";
                    $father_phone = "";
                    $guardian_name = "";
                    $guardian_phone = "";

                    $student_name = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                    if ($student?->father != null) {
                        $father_name = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                        $father_phone = $student?->father?->phone ?? "";
                    }

                    if ($guardianType == 'guardian') {
                        $guardianId = $student?->guardian?->user_id;

                        if ($student?->guardian != null) {
                            $guardian_name = "{$student?->guardian?->first_name} {$student?->guardian?->middle_name} {$student?->guardian?->last_name}";
                            $guardian_phone = $student?->guardian?->phone ?? "";
                        }
                    } else {
                        $guardianId = $student?->father?->user_id;
                        $guardian_name = $father_name;
                        $guardian_phone = $father_phone;
                    }

                    $guardianData = [
                        'guardian_id' => $guardianId,
                        'guardian_name' => $guardian_name,
                        'guardian_phone' => $guardian_phone,
                    ];

                    $studentData = [
                        'id' => $student?->id ?? "",
                        'name' => $student_name,
                        'admission_no' => $student?->admission_no ?? "",
                        'roll_no' => $student?->classroomRoll?->roll_no ?? "",
                        'classroom_title' => $student?->classroom?->title ?? "",
                        'address' => $student?->present_address ?? "",
                        'father_name' => $father_name,
                        'father_phone' => $father_phone,
                    ];

                    if (!isset($vouchersData[$guardianId])) {
                        $vouchersData[$guardianId] = $guardianData;
                    }

                    if (!isset($vouchersData[$guardianId]['student_data'][$student->id])) {
                        $vouchersData[$guardianId]['student_data'][$student->id] = $studentData;
                    }
                }
            }

            if (!empty($vouchersData)) {
                foreach ($vouchersData as $guardianId => $guardianData) {
                    foreach ($guardianData['student_data'] as $studentId => $studentData) {
                        if (isset($studentAmountArray[$studentId])) {
                            $vouchersData[$guardianId]['total_amount'] = ($vouchersData[$guardianId]['total_amount'] ?? 0) + $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['total_discount'] = ($vouchersData[$guardianId]['total_discount'] ?? 0) + $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['total_payable'] = ($vouchersData[$guardianId]['total_payable'] ?? 0) + $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['total_paid'] = ($vouchersData[$guardianId]['total_paid'] ?? 0) + $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['total_due'] = ($vouchersData[$guardianId]['total_due'] ?? 0) + $studentAmountArray[$studentId]['total_due'] ?? 0;

                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = $studentAmountArray[$studentId]['total_amount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = $studentAmountArray[$studentId]['total_discount'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = $studentAmountArray[$studentId]['total_payable'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = $studentAmountArray[$studentId]['total_paid'] ?? 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = $studentAmountArray[$studentId]['total_due'] ?? 0;
                        } else {
                            $vouchersData[$guardianId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['total_due'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_amount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_discount'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_payable'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_paid'] = 0;
                            $vouchersData[$guardianId]['student_data'][$studentId]['total_due'] = 0;
                        }
                    }
                }
            }
        }

        return $vouchersData;
    }

    /*
    *   helper method to get student due demand slips data
    */
    private function getSingleStudentDemandSlipData(Request $request)
    {
        $reports = [];

        if (!empty($request->student_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReportsByStudent(
                $request->student_id,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
            );

            if (count($feeInstallments) > 0) {
                $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                    if ($feeInstallment?->student?->promotedClassroom != null) {
                        if (!empty($feeInstallment['student']['classroom'])) {
                            unset($feeInstallment['student']['classroom']);
                        }

                        $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                        $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                    }

                    return $feeInstallment;
                });

                $classroomId = $feeInstallments->first()?->student?->classroom_id;

                $feeInstallments->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $feeInstallmentsData = $this->getFeeInstallmentsData($request, $feeInstallments, $transportFeeStructureSetting);

                if (count($feeInstallmentsData) > 0) {
                    foreach ($feeInstallmentsData as $studentId => $groupedData) {
                        $total_due = 0;

                        if (!isset($reports[$studentId]['installments']['head_wise_reports'])) {
                            $reports[$studentId]['installments']['head_wise_reports'] = $groupedData['head_wise_reports'];
                        }

                        if (!isset($reports[$studentId]['installments']['installment_wise_amounts'])) {
                            $reports[$studentId]['installments']['installment_wise_amounts'] = $groupedData['installment_wise_reports'];
                        }

                        foreach ($groupedData['head_wise_reports'] as $feeTypeId => $headWiseReport) {
                            $headWiseTotalDue = 0;

                            foreach ($headWiseReport['installment_wise_amounts'] as $amount) {

                                $total_due += $amount;
                                $headWiseTotalDue += $amount;
                            }

                            $reports[$studentId]['installments']['head_wise_reports'][$feeTypeId]['total_due'] = $headWiseTotalDue;
                        }

                        if (!isset($reports[$studentId]['installments']['total_due'])) {
                            $reports[$studentId]['installments']['total_due'] = $total_due;
                            $reports[$studentId]['installments']['total_due_in_word'] = Number::spell($total_due);
                        }

                        if (!isset($reports[$studentId]['student'])) {
                            $reports[$studentId]['student'] = $groupedData['student'];
                        }
                    }
                }
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                $vouchersData = $this->getSingleStudentVouchersData($request, $transportFeeStructureSetting);

                if (count($vouchersData) > 0) {
                    foreach ($vouchersData as $studentId => $groupedData) {
                        $total_due = 0;

                        if (!isset($reports[$studentId]['vouchers']['head_wise_reports'])) {
                            $reports[$studentId]['vouchers']['head_wise_reports'] = $groupedData['head_wise_reports'];
                        }

                        if (!isset($reports[$studentId]['vouchers']['installment_wise_amounts'])) {
                            $reports[$studentId]['vouchers']['installment_wise_amounts'] = $groupedData['installment_wise_reports'];
                        }

                        foreach ($groupedData['head_wise_reports'] as $feeTypeId => $headWiseReport) {
                            $headWiseTotalDue = 0;

                            foreach ($headWiseReport['installment_wise_amounts'] as $amount) {

                                $total_due += $amount;
                                $headWiseTotalDue += $amount;
                            }

                            $reports[$studentId]['vouchers']['head_wise_reports'][$feeTypeId]['total_due'] = $headWiseTotalDue;
                        }

                        if (!isset($reports[$studentId]['vouchers']['total_due'])) {
                            $reports[$studentId]['vouchers']['total_due'] = $total_due;
                            $reports[$studentId]['vouchers']['total_due_in_word'] = Number::spell($total_due);
                        }

                        if (!isset($reports[$studentId]['student'])) {
                            $reports[$studentId]['student'] = $groupedData['student'];
                        }
                    }
                }
            }
        }

        return $reports;
    }

    /*
    * function to get installment and head wise fee installments
    */
    private function getSingleStudentVouchersData(Request $request, $transportFeeStructureSetting)
    {
        // general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getStudentInstallmentWiseDueFeeVouchers(
            $request->student_id,
            $request->student_status ?? ""
        );

        $this->formatGeneralVouchersData($generalVouchers);

        // transport vouchers

        // get student by id and status
        $student = $this->studentRepository->getByIdAndStatus($request->student_id, $request->student_status ?? "");

        if ($student != null) {
            $this->formatTransportVouchersData($student, $transportFeeStructureSetting);
        }

        return $this->demandSlipVouchersData;
    }

    /*
    *   helper method to get student due demand slips data
    */
    private function getStudentDemandSlipData(Request $request)
    {
        $reports = [];

        if (!empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $request->classroom_id,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
            );

            if (count($feeInstallments) > 0) {
                $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                    if ($feeInstallment?->student?->promotedClassroom != null) {
                        if (!empty($feeInstallment['student']['classroom'])) {
                            unset($feeInstallment['student']['classroom']);
                        }

                        $feeInstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                        $feeInstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                    }

                    return $feeInstallment;
                });

                $feeInstallmentsData = $this->getFeeInstallmentsData($request, $feeInstallments, $transportFeeStructureSetting);

                if (count($feeInstallmentsData) > 0) {
                    foreach ($feeInstallmentsData as $studentId => $groupedData) {
                        $total_due = 0;

                        if (!isset($reports[$studentId]['installments']['head_wise_reports'])) {
                            $reports[$studentId]['installments']['head_wise_reports'] = $groupedData['head_wise_reports'];
                        }

                        if (!isset($reports[$studentId]['installments']['installment_wise_amounts'])) {
                            $reports[$studentId]['installments']['installment_wise_amounts'] = $groupedData['installment_wise_reports'];
                        }

                        foreach ($groupedData['head_wise_reports'] as $feeTypeId => $headWiseReport) {
                            $headWiseTotalDue = 0;

                            foreach ($headWiseReport['installment_wise_amounts'] as $amount) {

                                $total_due += $amount;
                                $headWiseTotalDue += $amount;
                            }

                            $reports[$studentId]['installments']['head_wise_reports'][$feeTypeId]['total_due'] = $headWiseTotalDue;
                        }

                        if (!isset($reports[$studentId]['installments']['total_due'])) {
                            $reports[$studentId]['installments']['total_due'] = $total_due;
                            $reports[$studentId]['installments']['total_due_in_word'] = Number::spell($total_due);
                        }

                        if (!isset($reports[$studentId]['student'])) {
                            $reports[$studentId]['student'] = $groupedData['student'];
                        }
                    }
                }
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                $vouchersData = $this->getVouchersData($request, $transportFeeStructureSetting);

                if (count($vouchersData) > 0) {
                    foreach ($vouchersData as $studentId => $groupedData) {
                        $total_due = 0;

                        if (!isset($reports[$studentId]['vouchers']['head_wise_reports'])) {
                            $reports[$studentId]['vouchers']['head_wise_reports'] = $groupedData['head_wise_reports'];
                        }

                        if (!isset($reports[$studentId]['vouchers']['installment_wise_amounts'])) {
                            $reports[$studentId]['vouchers']['installment_wise_amounts'] = $groupedData['installment_wise_reports'];
                        }

                        foreach ($groupedData['head_wise_reports'] as $feeTypeId => $headWiseReport) {
                            $headWiseTotalDue = 0;

                            foreach ($headWiseReport['installment_wise_amounts'] as $amount) {

                                $total_due += $amount;
                                $headWiseTotalDue += $amount;
                            }

                            $reports[$studentId]['vouchers']['head_wise_reports'][$feeTypeId]['total_due'] = $headWiseTotalDue;
                        }

                        if (!isset($reports[$studentId]['vouchers']['total_due'])) {
                            $reports[$studentId]['vouchers']['total_due'] = $total_due;
                            $reports[$studentId]['vouchers']['total_due_in_word'] = Number::spell($total_due);
                        }

                        if (!isset($reports[$studentId]['student'])) {
                            $reports[$studentId]['student'] = $groupedData['student'];
                        }
                    }
                }
            }
        }

        // sort reports by classroom roll
        usort($reports, function ($a, $b) {
            $rollNoA = $a['student']['classroom_roll']['roll_no'] ?? null;
            $rollNoB = $b['student']['classroom_roll']['roll_no'] ?? null;

            if ($rollNoA == $rollNoB) {
                return 0;
            }

            // If $rollNoA is null, move it to the end
            if ($rollNoA == null) {
                return 1;
            }

            // If $rollNoB is null, move it to the end
            if ($rollNoB == null) {
                return -1;
            }

            return ($rollNoA < $rollNoB) ? -1 : 1;
        });

        // ksort($reports);

        return $reports;
    }

    /*
    * function to get installment and head wise fee installments
    */
    private function getFeeInstallmentsData(Request $request, $feeInstallments, $transportFeeStructureSetting)
    {
        $feeInstallmentsData = [];

        // get fee installments late fee and transport fee and merge them with fee installments
        $feeInstallments = $this->getInstallmentsLateFeeAndTransportFee($request, $feeInstallments, $transportFeeStructureSetting);

        // $feeInstallments = $feeInstallments->sortBy(['student_id', 'fee_id']);
        $feeInstallments = $feeInstallments->sortBy(function ($item) {
            if (!empty($item['fee'])) {
                return [
                    $item['fee']['installment_no']
                ];
            } else {
                return [
                    $item['fee_id']
                ];
            }
        });

        // calculate fee installments due
        foreach ($feeInstallments as $feeInstallment) {
            // check if installment has nullify fee. if fee nullified then exclude the fee
            if (empty($feeInstallment['nullify_fee'])) {
                $due_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];

                // check if installment has payment. if has payment then update due amount
                if (!empty($feeInstallment['payment']) && $feeInstallment['payment']['payment_status'] != PaymentStatus::CANCELLED->value) {
                    $due_amount = (float) $feeInstallment['payment']['due_amount'] ?? 0;
                } elseif (!empty($this->studentFeeDiscounts[$feeInstallment['student_id']])) {
                    foreach ($this->studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                        if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount = $due_amount - $discount_amount;
                        }
                    }
                }

                $fee_due_amount = ($feeInstallmentsData[$feeInstallment['student']['id']]['installment_wise_reports'][$feeInstallment['fee']['title']] ?? 0) + $due_amount;
                $feeInstallmentsData[$feeInstallment['student']['id']]['installment_wise_reports'][$feeInstallment['fee']['title']] = $fee_due_amount;

                $fee_type_due_amount = ($feeInstallmentsData[$feeInstallment['student']['id']]['head_wise_reports'][$feeInstallment['fee_type_id']]['installment_wise_amounts'][$feeInstallment['fee']['title']] ?? 0) + $due_amount;
                $feeInstallmentsData[$feeInstallment['student']['id']]['head_wise_reports'][$feeInstallment['fee_type_id']]['installment_wise_amounts'][$feeInstallment['fee']['title']] = $fee_type_due_amount;

                $feeInstallmentsData[$feeInstallment['student']['id']]['head_wise_reports'][$feeInstallment['fee_type_id']]['fee_type_id'] = $feeInstallment['fee_type_id'];
                $feeInstallmentsData[$feeInstallment['student']['id']]['head_wise_reports'][$feeInstallment['fee_type_id']]['fee_type_title'] = $feeInstallment['feeType']['fee_type'];

                if (!isset($feeInstallmentsData[$feeInstallment['student']['id']]['student'])) {
                    $feeInstallmentsData[$feeInstallment['student']['id']]['student'] = $feeInstallment['student']->toArray();
                }
            }
        }

        return $feeInstallmentsData;
    }

    /*
    * function to get installment and head wise fee installments
    */
    private function getVouchersData(Request $request, $transportFeeStructureSetting)
    {
        // general vouchers
        $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
            $request->classroom_id,
            $request->student_status ?? ""
        );

        if ($generalVouchers->count() > 0) {
            $generalVouchers = $generalVouchers->map(function ($voucher) {
                if ($voucher?->student?->promotedClassroom != null) {
                    if (!empty($voucher['student']['classroom'])) {
                        unset($voucher['student']['classroom']);
                    }

                    $voucher['student']['classroom_id'] = $voucher?->student?->promotedClassroom?->id;
                    $voucher['student']['classroom'] = $voucher?->student?->promotedClassroom;
                }

                return $voucher;
            });
        }

        $this->formatGeneralVouchersData($generalVouchers);

        // transport vouchers

        // get students by classroom id and student status
        $students = $this->studentRepository->getAllByClassroomAndStatus($request->classroom_id, $request->student_status ?? "");

        if ($students->count() > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });
        }

        foreach ($students as $student) {
            $this->formatTransportVouchersData($student, $transportFeeStructureSetting);
        }

        return $this->demandSlipVouchersData;
    }

    /*
    * function to format general vouchers
    */
    private function formatGeneralVouchersData($vouchers)
    {
        // if has any general voucher then calculate due and merge data with installmentWiseDueSummary
        if (count($vouchers) > 0) {
            // $vouchers = $vouchers->sortBy(['student_id', 'id']);
            $vouchers = $vouchers->sortBy(['id']);

            foreach ($vouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_due_amount = (float) $feeTypeAmount->amount;

                    // check if voucher has payment. if has payment then update due amount
                    // if ($feeTypeAmount->payment != null && $feeTypeAmount->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($feeTypeAmount->payment != null) {
                        // $voucher_due_amount = (float) $feeTypeAmount->payment->due_amount ?? 0;
                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $voucher_due_amount = $voucher_due_amount - $discount_amount - $paid_amount;
                    }

                    $fee_due_amount = ($this->demandSlipVouchersData[$feeTypeAmount->student_id]['installment_wise_reports'][$voucher->title] ?? 0) +  $voucher_due_amount;
                    $this->demandSlipVouchersData[$feeTypeAmount->student_id]['installment_wise_reports'][$voucher->title] = $fee_due_amount;

                    $fee_type_due_amount = ($this->demandSlipVouchersData[$feeTypeAmount->student_id]['head_wise_reports'][$feeTypeAmount->fee_type_id]['installment_wise_amounts'][$voucher->title] ?? 0) +  $voucher_due_amount;
                    $this->demandSlipVouchersData[$feeTypeAmount->student_id]['head_wise_reports'][$feeTypeAmount->fee_type_id]['installment_wise_amounts'][$voucher->title] = $fee_type_due_amount;

                    $this->demandSlipVouchersData[$feeTypeAmount->student_id]['head_wise_reports'][$feeTypeAmount->fee_type_id]['fee_type_id'] = $feeTypeAmount->fee_type_id;
                    $this->demandSlipVouchersData[$feeTypeAmount->student_id]['head_wise_reports'][$feeTypeAmount->fee_type_id]['fee_type_title'] = $feeTypeAmount?->feeType?->fee_type;

                    if (!isset($this->demandSlipVouchersData[$feeTypeAmount->student_id]['student'])) {
                        $this->demandSlipVouchersData[$feeTypeAmount->student_id]['student'] = $voucher?->student?->toArray();
                    }
                }
            }
        }
    }

    /*
    * function to format transport vouchers
    */
    private function formatTransportVouchersData($student, $transportFeeStructureSetting)
    {
        // get current allocate transport
        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

        // get previous allocate transport
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

        // get deallocate transport
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

        $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
        $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
        $allocateTransportVouchers = [];

        // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
            $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $student->id,
                $currentAllocateVoucherId,
                $deallocateVoucherId
            );
        }

        // get allocated transport vouchers
        $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
            $student->id,
            $previousAllocateTransportId,
            $previousAllocationVoucherId,
            $deallocateVoucherId,
            $transportFeeStructureSetting?->value,
            'voucher'
        );

        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if (!empty($allocateTransport) && $transportFee != null) {
            // $allocateTransport = $allocateTransport->sortBy(['student_id', 'voucher_id']);
            $allocateTransport = $allocateTransport->sortBy(function ($item) {
                if ($item?->voucher != null) {
                    return [
                        $item?->voucher?->installment_no
                    ];
                } else {
                    return [
                        $item?->voucher_id
                    ];
                }
            });

            foreach ($allocateTransport as $allocate) {
                $voucher_due_amount = (float) $allocate->amount;

                if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                    $voucher_due_amount = (float) $allocate->payment->due_amount ?? 0;
                }

                $fee_due_amount = ($this->demandSlipVouchersData[$allocate->student_id]['installment_wise_reports'][$allocate->voucher->title] ?? 0) +  $voucher_due_amount;
                $this->demandSlipVouchersData[$allocate->student_id]['installment_wise_reports'][$allocate->voucher->title] = $fee_due_amount;

                $fee_type_due_amount = ($this->demandSlipVouchersData[$allocate->student_id]['head_wise_reports'][$transportFee->id]['installment_wise_amounts'][$allocate->voucher->title] ?? 0) +  $voucher_due_amount;
                $this->demandSlipVouchersData[$allocate->student_id]['head_wise_reports'][$transportFee->id]['installment_wise_amounts'][$allocate->voucher->title] = $fee_type_due_amount;

                $this->demandSlipVouchersData[$allocate->student_id]['head_wise_reports'][$transportFee->id]['fee_type_id'] = $transportFee->id;
                $this->demandSlipVouchersData[$allocate->student_id]['head_wise_reports'][$transportFee->id]['fee_type_title'] = $transportFee->fee_type;

                if (!isset($this->demandSlipVouchersData[$allocate->student_id]['student'])) {
                    $this->demandSlipVouchersData[$allocate->student_id]['student'] = $student->toArray();
                }
            }
        }

        if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null) && $transportFee != null) {
            if ($currentAllocateTransport != null) {
                $voucher_due_amount = (float) $currentAllocateTransport->amount;
            } else {
                $voucher_due_amount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportVouchers = $allocateTransportVouchers->sortBy('installment_no');

            foreach ($allocateTransportVouchers as $voucher) {
                $fee_due_amount = ($this->demandSlipVouchersData[$student->id]['installment_wise_reports'][$voucher->title] ?? 0) +  $voucher_due_amount;
                $this->demandSlipVouchersData[$student->id]['installment_wise_reports'][$voucher->title] = $fee_due_amount;

                $fee_type_due_amount = ($this->demandSlipVouchersData[$student->id]['head_wise_reports'][$transportFee->id]['installment_wise_amounts'][$voucher->title] ?? 0) +  $voucher_due_amount;
                $this->demandSlipVouchersData[$student->id]['head_wise_reports'][$transportFee->id]['installment_wise_amounts'][$voucher->title] = $fee_type_due_amount;

                $this->demandSlipVouchersData[$student->id]['head_wise_reports'][$transportFee->id]['fee_type_id'] = $transportFee->id;
                $this->demandSlipVouchersData[$student->id]['head_wise_reports'][$transportFee->id]['fee_type_title'] = $transportFee->fee_type;

                if (!isset($this->demandSlipVouchersData[$student->id]['student'])) {
                    $this->demandSlipVouchersData[$student->id]['student'] = $student->toArray();
                }
            }
        }
    }

    /*
    *   helper method to get head wise due reports
    */
    private function getHeadWiseDueReports(Request $request)
    {
        $headWiseTotalDue = 0;
        $type = 'head_wise';

        if (!empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $request->classroom_id,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments($request, $feeInstallments, $transportFeeStructureSetting, $type);
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $request->classroom_id,
                    $request->student_status ?? ""
                );

                $this->formatInstallmentWiseGeneralVouchers($type, $generalVouchers);

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($request->classroom_id, $request->student_status ?? "");

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers($type, $student, $transportFeeStructureSetting);
                    }
                }
            }

            if (count($this->headWiseDueSummary) > 0) {
                foreach ($this->headWiseDueSummary as $studentId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($this->studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $this->headWiseDueSummary[$studentId]['head_wise_amounts'] = $this->studentWiseAmounts[$studentId];
                    $this->headWiseDueSummary[$studentId]['total_due'] = $total_due;
                    $this->headWiseDueSummary[$studentId]['installments'] = !empty($this->studentDueInstallments[$studentId]) ? implode(',', $this->studentDueInstallments[$studentId]) : "";
                    $this->headWiseDueSummary[$studentId]['total_installments'] = !empty($this->studentDueInstallments[$studentId]) ? count($this->studentDueInstallments[$studentId]) : 0;

                    $headWiseTotalDue += $total_due;
                }
            }
        }

        $studentWiseReports = $this->headWiseDueSummary;

        // sort reports by classroom roll
        usort($studentWiseReports, function ($a, $b) {
            $rollNoA = $a['student']['classroom_roll']['roll_no'] ?? null;
            $rollNoB = $b['student']['classroom_roll']['roll_no'] ?? null;

            if ($rollNoA == $rollNoB) {
                return 0;
            }

            // If $rollNoA is null, move it to the end
            if ($rollNoA == null) {
                return 1;
            }

            // If $rollNoB is null, move it to the end
            if ($rollNoB == null) {
                return -1;
            }

            return ($rollNoA < $rollNoB) ? -1 : 1;
        });

        return [
            'student_wise_reports' => $studentWiseReports,
            'head_wise_reports' => $this->headWiseAmounts,
            'total_due' => $headWiseTotalDue
        ];
    }

    /*
    *   helper method to get installment wise due reports
    */
    private function getInstallmentWiseDueReports(Request $request)
    {
        $installmentWiseTotalDue = 0;
        $type = 'installment_wise';

        if (!empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $request->classroom_id,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments($request, $feeInstallments, $transportFeeStructureSetting, $type);
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $request->classroom_id,
                    $request->student_status ?? ""
                );

                $this->formatInstallmentWiseGeneralVouchers($type, $generalVouchers);

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($request->classroom_id, $request->student_status ?? "");

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers($type, $student, $transportFeeStructureSetting);
                    }
                }
            }

            if (count($this->installmentWiseDueSummary) > 0) {
                foreach ($this->installmentWiseDueSummary as $studentId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($this->studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $this->installmentWiseDueSummary[$studentId]['installment_wise_amounts'] = $this->studentWiseAmounts[$studentId];
                    $this->installmentWiseDueSummary[$studentId]['total_due'] = $total_due;

                    $installmentWiseTotalDue += $total_due;
                }
            }
        }

        $studentWiseReports = $this->installmentWiseDueSummary;

        // sort reports by classroom roll
        usort($studentWiseReports, function ($a, $b) {
            $rollNoA = $a['student']['classroom_roll']['roll_no'] ?? null;
            $rollNoB = $b['student']['classroom_roll']['roll_no'] ?? null;

            if ($rollNoA == $rollNoB) {
                return 0;
            }

            // If $rollNoA is null, move it to the end
            if ($rollNoA == null) {
                return 1;
            }

            // If $rollNoB is null, move it to the end
            if ($rollNoB == null) {
                return -1;
            }

            return ($rollNoA < $rollNoB) ? -1 : 1;
        });

        return [
            'student_wise_reports' => $studentWiseReports,
            'installment_wise_reports' => $this->installmentWiseAmounts,
            'total_due' => $installmentWiseTotalDue
        ];
    }

    /*
    * function to get installment wise fee installments
    */
    private function getInstallmentsLateFeeAndTransportFee(
        Request $request,
        $feeInstallments,
        $transportFeeStructureSetting,
        $schoolId = null,
        $academicYearId = null
    ) {
        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentFeeInstallments) {
                $this->studentFeeDiscounts[$studentId] = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId, $schoolId, $academicYearId);

                foreach ($studentFeeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId, $schoolId, $academicYearId);

                    if (!$hasPayment) {
                        $fee = $groupedFeeInstallments->first()->fee;

                        // add transport fee in structure if transport fee setting set to fee
                        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                            $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee', $schoolId, $academicYearId);
                            $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee', $schoolId, $academicYearId);
                            $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee', $schoolId, $academicYearId);

                            if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                                if ($currentAllocateTransport != null) {
                                    $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                    $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                                } else {
                                    $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                    $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                                }

                                $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                    $studentId,
                                    $currentAllocateFeeId,
                                    $deallocateTransport?->fee_id,
                                    $schoolId,
                                    $academicYearId
                                );

                                if (count($allocateTransportFees) > 0) {
                                    $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                    foreach ($allocateTransportFees as $allocateTransportFee) {
                                        if ($allocateTransportFee->id == $feeInstallmentId) {
                                            if ($transportFee != null) {
                                                $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                                if ($existedTransportFee == null) {
                                                    $newTransportFee = collect([
                                                        'id' => null,
                                                        'student_id' => $studentId,
                                                        'fee_id' => $feeInstallmentId,
                                                        'fee_type_id' =>  $transportFee->id,
                                                        'amount' =>  $transportFeeAmount,
                                                        'semester' => null,
                                                        'is_fee_special' => $transportFee->is_fee_special,
                                                        'is_extra_charge' => true,
                                                        'feeType' => $transportFee,
                                                        'fee' => $fee,
                                                        'payment' => null,
                                                        'fee_payments' => collect([]),
                                                        'nullify_fee' => null,
                                                        'student' => $studentFeeInstallments->first()->student,
                                                    ]);

                                                    $feeInstallments->push($newTransportFee);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // add late fee in structure
                        if (!empty($request->late_fee) && $request->late_fee == true) {
                            // add late fee in structure if late fine is available
                            $lateFee = $this->feeTypeRepository->getLateFeeType();

                            if ($lateFee != null) {
                                $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();

                                if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                                    $late_fee_amount = 0;

                                    $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                                    // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                                    $lateFineStartDate = $fee->last_pay_date_at;
                                    $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                                    if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                        $currentDate = date("Y-m-d");
                                        $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                        if ($lateFineType == LateFineType::DAILY->value) {
                                            $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                        } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                            $weeksDifference = floor($daysDifference / 7);
                                            $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                        } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                            // Extract year and month from the start date
                                            list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                            // Extract year and month from the current date
                                            list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                            // Calculate the difference in months
                                            $startMonths = ($startYear * 12) + $startMonth;
                                            $currentMonths = ($currentYear * 12) + $currentMonth;
                                            $monthsDifference = $currentMonths - $startMonths;

                                            $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                        }
                                    }

                                    $newLateFee = collect([
                                        'id' => null,
                                        'student_id' => $studentId,
                                        'fee_id' => $feeInstallmentId,
                                        'fee_type_id' =>  $lateFee->id,
                                        'amount' => $late_fee_amount,
                                        'semester' => null,
                                        'is_fee_special' => $lateFee->is_fee_special,
                                        'is_extra_charge' => true,
                                        'feeType' => $lateFee,
                                        'fee' => $fee,
                                        'payment' => null,
                                        'fee_payments' => collect([]),
                                        'nullify_fee' => null,
                                        'student' => $studentFeeInstallments->first()->student,
                                    ]);

                                    $feeInstallments->push($newLateFee);
                                }
                            }
                        }
                    }
                }
            }
        }

        return $feeInstallments;
    }

    /*
    * function to get installment and head wise fee installments
    */
    private function formatHeadAndInstallmentWiseFeeInstallments(
        Request $request,
        $feeInstallments,
        $transportFeeStructureSetting,
        $type,
        $schoolId = null,
        $academicYearId = null
    ) {
        // get fee installments late fee and transport fee and merge them with fee installments
        $feeInstallments = $this->getInstallmentsLateFeeAndTransportFee($request, $feeInstallments, $transportFeeStructureSetting, $schoolId, $academicYearId);

        // sort by fee installment
        $feeInstallments = $feeInstallments->sortBy(function ($item) {
            if (!empty($item['fee'])) {
                return [
                    $item['fee']['installment_no']
                ];
            } else {
                return [
                    $item['fee_id']
                ];
            }
        });

        // calculate fee installments due
        foreach ($feeInstallments as $feeInstallment) {
            // check if installment has nullify fee. if fee nullified then exclude the fee
            if (empty($feeInstallment['nullify_fee'])) {
                $due_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];

                // check if installment has payment. if has payment then update due amount
                // if (!empty($feeInstallment['payment']) && $feeInstallment['payment']['payment_status'] != PaymentStatus::CANCELLED->value) {
                if (!empty($feeInstallment['payment'])) {
                    // $due_amount = (float) $feeInstallment['payment']['due_amount'] ?? 0;
                    $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                    $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                    $due_amount = $due_amount - $discount_amount - $paid_amount;
                } elseif (!empty($this->studentFeeDiscounts[$feeInstallment['student_id']])) {
                    foreach ($this->studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                        if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount = $due_amount - $discount_amount;
                        }
                    }
                }

                if ($type == 'head_wise') {
                    // calculate and update fee amount installment wise
                    $this->updateHeadWiseAmounts($feeInstallment['feeType']['fee_type'], $due_amount);

                    // calculate and update fee amount fee type wise
                    $this->updateStudentWiseAmounts($feeInstallment['student_id'], $feeInstallment['feeType']['fee_type'], $due_amount);

                    // update headWiseSummary data
                    if (!isset($this->headWiseDueSummary[$feeInstallment['student']['id']])) {
                        $this->updateStudentHeadWiseDueSummaryData($feeInstallment['student']->toArray());
                    }

                    // store student due installments
                    if (
                        !isset($this->studentDueInstallments[$feeInstallment['student_id']]) ||
                        (isset($this->studentDueInstallments[$feeInstallment['student_id']]) && !in_array($feeInstallment['fee']['title'], $this->studentDueInstallments[$feeInstallment['student_id']]))
                    ) {
                        $this->studentDueInstallments[$feeInstallment['student_id']][] = $feeInstallment['fee']['title'];
                    }
                } else if ($type == 'installment_wise') {
                    // calculate and update fee amount installment wise
                    $this->updateInstallmentWiseAmounts($feeInstallment['fee']['title'], $due_amount);

                    // calculate and update fee amount fee type wise
                    $this->updateStudentWiseAmounts($feeInstallment['student_id'], $feeInstallment['fee']['title'], $due_amount);

                    // update installmentWiseSummary data
                    if (!isset($this->installmentWiseDueSummary[$feeInstallment['student']['id']])) {
                        $this->updateStudentInstallmentWiseDueSummaryData($feeInstallment['student']->toArray());
                    }
                }
            }
        }
    }

    /*
    * function to get installment wise general vouchers
    */
    private function formatInstallmentWiseGeneralVouchers($type, $vouchers)
    {
        // if has any general voucher then calculate due and merge data with installmentWiseDueSummary
        if (count($vouchers) > 0) {
            // sort voucher by id
            $vouchers = $vouchers->sortBy(['id']);

            foreach ($vouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_due_amount = (float) $feeTypeAmount->amount;

                    // check if voucher has payment. if has payment then update due amount
                    // if ($feeTypeAmount->payment != null && $feeTypeAmount->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($feeTypeAmount->payment != null) {
                        // $voucher_due_amount = (float) $feeTypeAmount->payment->due_amount ?? 0;

                        $discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $voucher_due_amount = $voucher_due_amount - $discount_amount - $paid_amount;
                    }

                    if ($type == 'head_wise') {
                        // calculate and update fee amount installment wise
                        $this->updateHeadWiseAmounts($feeTypeAmount->feeType->fee_type, $voucher_due_amount);

                        // calculate and update fee amount installment wise
                        $this->updateStudentWiseAmounts($feeTypeAmount->student_id, $feeTypeAmount->feeType->fee_type, $voucher_due_amount);

                        // update headWiseSummary data
                        if (!isset($this->headWiseDueSummary[$voucher->student->id])) {
                            $this->updateStudentHeadWiseDueSummaryData($voucher->student->toArray());
                        }

                        // store student due installments
                        if (
                            !isset($this->studentDueInstallments[$feeTypeAmount->student_id]) ||
                            (isset($this->studentDueInstallments[$feeTypeAmount->student_id]) && !in_array($voucher->title, $this->studentDueInstallments[$feeTypeAmount->student_id]))
                        ) {
                            $this->studentDueInstallments[$feeTypeAmount->student_id][] =
                                $voucher->title;
                        }
                    } else if ($type == 'installment_wise') {
                        // calculate and update fee amount installment wise
                        $this->updateInstallmentWiseAmounts($voucher->title, $voucher_due_amount);

                        // calculate and update fee amount installment wise
                        $this->updateStudentWiseAmounts($feeTypeAmount->student_id, $voucher->title, $voucher_due_amount);

                        // update installmentWiseSummary data
                        if (!isset($this->installmentWiseDueSummary[$voucher->student->id])) {
                            $this->updateStudentInstallmentWiseDueSummaryData($voucher->student->toArray());
                        }
                    }
                }
            }
        }
    }

    /*
    * function to get installment wise transport vouchers
    */
    private function formatInstallmentWiseTransportVouchers($type, $student, $transportFeeStructureSetting, $schoolId = null, $academicYearId = null)
    {
        // get current allocate transport
        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher', $schoolId, $academicYearId);

        // get previous allocate transport
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher', $schoolId, $academicYearId);

        // get deallocate transport
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher', $schoolId, $academicYearId);

        $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
        $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
        $allocateTransportVouchers = [];

        // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
            $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $student->id,
                $currentAllocateVoucherId,
                $deallocateVoucherId,
                $academicYearId
            );
        }

        // get allocated transport vouchers
        $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
            $student->id,
            $previousAllocateTransportId,
            $previousAllocationVoucherId,
            $deallocateVoucherId,
            $transportFeeStructureSetting?->value,
            'voucher',
            $academicYearId
        );

        $transportFee = $this->feeTypeRepository->getTransportFeeType();

        if (!empty($allocateTransport)) {
            // sort by voucher
            $allocateTransport = $allocateTransport->sortBy(function ($item) {
                if ($item?->voucher != null) {
                    return [
                        $item?->voucher?->installment_no
                    ];
                } else {
                    return [
                        $item?->voucher_id
                    ];
                }
            });

            foreach ($allocateTransport as $allocate) {
                $voucher_due_amount = (float) $allocate->amount;

                if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                    $voucher_due_amount = (float) $allocate->payment->due_amount ?? 0;
                }

                if ($type == 'head_wise') {
                    if ($transportFee != null) {
                        // calculate and update voucher amount installment wise
                        $this->updateHeadWiseAmounts($transportFee->fee_type, $voucher_due_amount);

                        // calculate and update voucher amount installment wise
                        $this->updateStudentWiseAmounts($allocate->student_id, $transportFee->fee_type, $voucher_due_amount);

                        // update headWiseSummary data
                        if (!isset($this->headWiseDueSummary[$allocate->student_id])) {
                            $this->updateStudentHeadWiseDueSummaryData($student->toArray());
                        }

                        //store student due installments
                        if (
                            !isset($this->studentDueInstallments[$allocate->student_id]) ||
                            (isset($this->studentDueInstallments[$allocate->student_id]) && !in_array($allocate->voucher->title, $this->studentDueInstallments[$allocate->student_id]))
                        ) {
                            $this->studentDueInstallments[$allocate->student_id][] = $allocate->voucher->title;
                        }
                    }
                } else if ($type == 'installment_wise') {
                    // calculate and update voucher amount installment wise
                    $this->updateInstallmentWiseAmounts($allocate->voucher->title, $voucher_due_amount);

                    // calculate and update voucher amount installment wise
                    $this->updateStudentWiseAmounts($allocate->student_id, $allocate->voucher->title, $voucher_due_amount);

                    // update installmentWiseSummary data
                    if (!isset($this->installmentWiseDueSummary[$allocate->student_id])) {
                        $this->updateStudentInstallmentWiseDueSummaryData($student->toArray());
                    }
                }
            }
        }

        if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
            if ($currentAllocateTransport != null) {
                $voucher_due_amount = (float) $currentAllocateTransport->amount;
            } else {
                $voucher_due_amount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportVouchers = $allocateTransportVouchers->sortBy('installment_no');

            foreach ($allocateTransportVouchers as $voucher) {
                if ($type == 'head_wise') {
                    if ($transportFee != null) {
                        // calculate and update voucher amount installment wise
                        $this->updateHeadWiseAmounts($transportFee->fee_type, $voucher_due_amount);

                        // calculate and update voucher amount installment wise
                        $this->updateStudentWiseAmounts($student->id, $transportFee->fee_type, $voucher_due_amount);

                        // update installmentWiseSummary data
                        if (!isset($this->headWiseDueSummary[$student->id])) {
                            $this->updateStudentHeadWiseDueSummaryData($student->toArray());
                        }

                        // store student due installments
                        if (
                            !isset($this->studentDueInstallments[$student->id]) ||
                            (isset($this->studentDueInstallments[$student->id]) && !in_array($voucher->title, $this->studentDueInstallments[$student->id]))
                        ) {
                            $this->studentDueInstallments[$student->id][] = $voucher->title;
                        }
                    }
                } else if ($type == 'installment_wise') {
                    // calculate and update voucher amount installment wise
                    $this->updateInstallmentWiseAmounts($voucher->title, $voucher_due_amount);

                    // calculate and update voucher amount installment wise
                    $this->updateStudentWiseAmounts($student->id, $voucher->title, $voucher_due_amount);

                    // update installmentWiseSummary data
                    if (!isset($this->installmentWiseDueSummary[$student->id])) {
                        $this->updateStudentInstallmentWiseDueSummaryData($student->toArray());
                    }
                }
            }
        }
    }

    /*
    *   function to update head wise due summary
    */
    private function updateHeadWiseAmounts(string $title, float|int $dueAmount)
    {
        $this->headWiseAmounts[$title] = ($this->headWiseAmounts[$title] ?? 0) + $dueAmount;
    }

    /*
    *   function to update installment wise due summary
    */
    private function updateInstallmentWiseAmounts(string $title, float|int $dueAmount)
    {
        $this->installmentWiseAmounts[$title] = ($this->installmentWiseAmounts[$title] ?? 0) + $dueAmount;
    }

    /*
    * function to update student installment wise due summary
    */
    private function updateStudentWiseAmounts(int $studentId, string $title, float|int $dueAmount)
    {
        $this->studentWiseAmounts[$studentId][$title] = ($this->studentWiseAmounts[$studentId][$title] ?? 0) + $dueAmount;
    }

    /*
    * function to update student head wise due summary
    */
    private function updateStudentHeadWiseDueSummaryData($studentData)
    {
        if (!empty($studentData['promoted_classroom'])) {
            if (!empty($studentData['classroom'])) {
                unset($studentData['classroom']);
            }

            $studentData['classroom_id'] = $studentData['promoted_classroom']['id'] ?? null;
            $studentData['classroom'] = $studentData['promoted_classroom'];
        }

        $this->headWiseDueSummary[$studentData['id']] = [
            'student' => $studentData,
        ];
    }

    /*
    * function to update student installment wise due summary
    */
    private function updateStudentInstallmentWiseDueSummaryData($studentData)
    {
        if (!empty($studentData['promoted_classroom'])) {
            if (!empty($studentData['classroom'])) {
                unset($studentData['classroom']);
            }

            $studentData['classroom_id'] = $studentData['promoted_classroom']['id'] ?? null;
            $studentData['classroom'] = $studentData['promoted_classroom'];
        }

        $this->installmentWiseDueSummary[$studentData['id']] = [
            'student' => $studentData,
        ];
    }

    /*
    *   helper method to get student due reports
    */
    private function getStudentDueReports(Request $request)
    {
        $installmentWiseTotalAmount = 0;
        $installmentWiseTotalDiscount = 0;
        $installmentWiseTotalPaid = 0;
        $installmentWiseTotalDue = 0;

        if (!empty($request->classroom_id) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getStudentDueReports(
                $request->classroom_id,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
            );

            if (count($feeInstallments) > 0) {
                $this->formatStudentFeeInstallmentsDue($request, $feeInstallments, $transportFeeStructureSetting);
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $request->classroom_id,
                    $request->student_status ?? ""
                );

                $this->formatStudentReportGeneralVouchers($generalVouchers);

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($request->classroom_id, $request->student_status ?? "");

                foreach ($students as $student) {
                    $this->formatDueReportTransportVouchers($student, $transportFeeStructureSetting);
                }
            }

            if (count($this->installmentWiseStudentDueReport) > 0) {
                foreach ($this->installmentWiseStudentDueReport as $studentId => $groupedDueSummary) {
                    $total_amount = 0;
                    $total_discount = 0;
                    $total_paid = 0;
                    $total_due = 0;

                    foreach ($this->dueReportStudentWiseAmounts[$studentId] as $amounts) {
                        $total_amount += $amounts['total_amount'];
                        $total_discount += $amounts['discount_amount'];
                        $total_paid += $amounts['paid_amount'];
                        $total_due += $amounts['due_amount'];
                    }

                    $this->installmentWiseStudentDueReport[$studentId]['installment_wise_amounts'] = $this->dueReportStudentWiseAmounts[$studentId];
                    $this->installmentWiseStudentDueReport[$studentId]['total_amount'] = $total_amount;
                    $this->installmentWiseStudentDueReport[$studentId]['total_discount'] = $total_discount;
                    $this->installmentWiseStudentDueReport[$studentId]['total_paid'] = $total_paid;
                    $this->installmentWiseStudentDueReport[$studentId]['total_due'] = $total_due;

                    $installmentWiseTotalAmount += $total_amount;
                    $installmentWiseTotalDiscount += $total_discount;
                    $installmentWiseTotalPaid += $total_paid;
                    $installmentWiseTotalDue += $total_due;
                }
            }
        }

        // filter report
        $studentWiseReport = collect($this->installmentWiseStudentDueReport)->filter(function ($report) {
            return $report['total_due'] > 0;
        })->toArray();

        // sort reports by classroom roll
        usort($studentWiseReport, function ($a, $b) {
            $rollNoA = $a['student']['classroom_roll']['roll_no'] ?? null;
            $rollNoB = $b['student']['classroom_roll']['roll_no'] ?? null;

            if ($rollNoA == $rollNoB) {
                return 0;
            }

            // If $rollNoA is null, move it to the end
            if ($rollNoA == null) {
                return 1;
            }

            // If $rollNoB is null, move it to the end
            if ($rollNoB == null) {
                return -1;
            }

            return ($rollNoA < $rollNoB) ? -1 : 1;
        });

        return [
            'student_wise_reports' => $studentWiseReport,
            'installment_wise_reports' => $this->dueReportInstallmentWiseAmounts,
            'total_amount' => $installmentWiseTotalAmount,
            'total_discount' => $installmentWiseTotalDiscount,
            'total_paid' => $installmentWiseTotalPaid,
            'total_due' => $installmentWiseTotalDue
        ];
    }

    /*
    * function to format student fee installments due report
    */
    private function formatStudentFeeInstallmentsDue(Request $request, $feeInstallments, $transportFeeStructureSetting)
    {
        // get fee installments late fee and transport fee and merge them with fee installments
        $feeInstallments = $this->getInstallmentsLateFeeAndTransportFee($request, $feeInstallments, $transportFeeStructureSetting);

        // sort by fee installment
        $feeInstallments = $feeInstallments->sortBy(function ($item) {
            if (!empty($item['fee'])) {
                return [
                    $item['fee']['installment_no']
                ];
            } else {
                return [
                    $item['fee_id']
                ];
            }
        });

        // calculate fee installments due
        foreach ($feeInstallments as $feeInstallment) {
            // check if installment has nullify fee. if fee nullified then exclude the fee
            if (empty($feeInstallment['nullify_fee'])) {
                $fee_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                $paid_amount = 0;
                $discount_amount = 0;
                $due_amount = $fee_amount;

                // check if installment has payment. if has payment then update due amount
                // if (!empty($feeInstallment['payment']) && $feeInstallment['payment']['payment_status'] != PaymentStatus::CANCELLED->value) {
                if (!empty($feeInstallment['payment'])) {
                    $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;
                    // $due_amount = (float) $feeInstallment['payment']['due_amount'] ?? 0;
                } elseif (!empty($this->studentFeeDiscounts[$feeInstallment['student_id']])) {
                    foreach ($this->studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                        if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                            if ($discount->is_discount_percentage) {
                                $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                            } else {
                                $discount_amount = (float) $discount->amount;
                            }

                            $due_amount = $fee_amount - $discount_amount;
                        }
                    }
                }

                // calculate and update due report fee amount installment wise
                $this->updateDueReportInstallmentWiseAmounts(
                    $feeInstallment['fee']['title'],
                    $fee_amount,
                    $discount_amount,
                    $paid_amount,
                    $due_amount,
                );

                // calculate and update due report fee amount student installment wise
                $this->updateDueReportStudentWiseAmounts(
                    $feeInstallment['student_id'],
                    $feeInstallment['fee']['title'],
                    $fee_amount,
                    $discount_amount,
                    $paid_amount,
                    $due_amount
                );

                // update installmentWiseStudentDueReport data
                if (!isset($this->installmentWiseStudentDueReport[$feeInstallment['student']['id']])) {
                    $this->installmentWiseStudentDueReport[$feeInstallment['student']['id']] = [
                        'student' => $feeInstallment['student']->toArray(),
                    ];
                }
            }
        }
    }

    /*
    * function to get installment wise general vouchers
    */
    private function formatStudentReportGeneralVouchers($vouchers)
    {
        // if has any general voucher then calculate due and merge data with installmentWiseDueSummary
        if (count($vouchers) > 0) {
            $vouchers = $vouchers->sortBy(['id']);

            foreach ($vouchers as $voucher) {
                foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                    $voucher_fee_amount = (float) $feeTypeAmount->amount;
                    $voucher_due_amount = $voucher_fee_amount;
                    $voucher_discount_amount = 0;
                    $voucher_paid_amount = 0;

                    // check if voucher has payment. if has payment then update due amount
                    // if ($feeTypeAmount->payment != null && $feeTypeAmount?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($feeTypeAmount->payment != null) {
                        $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        // $voucher_due_amount = (float) $feeTypeAmount?->payment?->due_amount ?? 0;
                        $voucher_due_amount = $voucher_fee_amount - $voucher_discount_amount - $voucher_paid_amount;
                    }

                    // calculate and update fee amount installment wise
                    $this->updateDueReportInstallmentWiseAmounts(
                        $voucher->title,
                        $voucher_fee_amount,
                        $voucher_discount_amount,
                        $voucher_paid_amount,
                        $voucher_due_amount,
                    );

                    // calculate and update fee amount installment wise
                    $this->updateDueReportStudentWiseAmounts(
                        $feeTypeAmount->student_id,
                        $voucher->title,
                        $voucher_fee_amount,
                        $voucher_discount_amount,
                        $voucher_paid_amount,
                        $voucher_due_amount
                    );

                    // update installmentWiseStudentDueReport data
                    if (!isset($this->installmentWiseStudentDueReport[$voucher->student->id])) {
                        $this->installmentWiseStudentDueReport[$voucher->student->id] = [
                            'student' => $voucher?->student?->toArray(),
                        ];
                    }
                }
            }
        }
    }

    /*
    * function to get due report installment wise transport vouchers
    */
    private function formatDueReportTransportVouchers($student, $transportFeeStructureSetting)
    {
        // get current allocate transport
        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($student->id, 'voucher');

        // get previous allocate transport
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($student->id, 'voucher');

        // get deallocate transport
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($student->id, 'voucher');

        $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;
        $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";
        $allocateTransportVouchers = [];

        // if transport voucher setting is voucher then get allocate transports between current and deallocate transport
        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
            $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $student->id,
                $currentAllocateVoucherId,
                $deallocateVoucherId
            );
        }

        // get allocated transport vouchers
        $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
            $student->id,
            $previousAllocateTransportId,
            $previousAllocationVoucherId,
            $deallocateVoucherId,
            $transportFeeStructureSetting?->value,
            'voucher'
        );

        if (!empty($allocateTransport)) {
            $allocateTransport = $allocateTransport->sortBy(function ($item) {
                if ($item?->voucher != null) {
                    return [
                        $item?->voucher?->installment_no
                    ];
                } else {
                    return [
                        $item?->voucher_id
                    ];
                }
            });

            foreach ($allocateTransport as $allocate) {
                $voucher_fee_amount = (float) $allocate->amount;
                $voucher_due_amount = $voucher_fee_amount;
                $voucher_discount_amount = 0;
                $voucher_paid_amount = 0;

                // if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                if ($allocate->payment != null) {
                    $voucher_discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $voucher_paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    // $voucher_due_amount = (float) $allocate->payment->due_amount ?? 0;
                    $voucher_due_amount =  $voucher_fee_amount -  $voucher_discount_amount - $voucher_paid_amount;
                }

                // calculate and update voucher amount installment wise
                $this->updateDueReportInstallmentWiseAmounts(
                    $allocate->voucher->title,
                    $voucher_fee_amount,
                    $voucher_discount_amount,
                    $voucher_paid_amount,
                    $voucher_due_amount,
                );

                // calculate and update voucher amount installment wise
                $this->updateDueReportStudentWiseAmounts(
                    $allocate->student_id,
                    $allocate->voucher->title,
                    $voucher_fee_amount,
                    $voucher_discount_amount,
                    $voucher_paid_amount,
                    $voucher_due_amount
                );

                // update installmentWiseStudentDueReport data
                if (!isset($this->installmentWiseStudentDueReport[$allocate->student_id])) {
                    $this->installmentWiseStudentDueReport[$allocate->student_id] = [
                        'student' => $student->toArray(),
                    ];
                }
            }
        }

        if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
            if ($currentAllocateTransport != null) {
                $voucher_fee_amount = (float) $currentAllocateTransport->amount;
            } else {
                $voucher_fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportVouchers = $allocateTransportVouchers->sortBy('installment_no');

            $voucher_due_amount = $voucher_fee_amount;
            $voucher_discount_amount = 0;
            $voucher_paid_amount = 0;

            foreach ($allocateTransportVouchers as $voucher) {
                // calculate and update voucher amount installment wise
                $this->updateDueReportInstallmentWiseAmounts(
                    $voucher->title,
                    $voucher_fee_amount,
                    $voucher_discount_amount,
                    $voucher_paid_amount,
                    $voucher_due_amount,
                );

                // calculate and update voucher amount installment wise
                $this->updateDueReportStudentWiseAmounts(
                    $student->id,
                    $voucher->title,
                    $voucher_fee_amount,
                    $voucher_discount_amount,
                    $voucher_paid_amount,
                    $voucher_due_amount
                );

                // update installmentWiseStudentDueReport data
                if (!isset($this->installmentWiseStudentDueReport[$student->id])) {
                    $this->installmentWiseStudentDueReport[$student->id] = [
                        'student' => $student->toArray(),
                    ];
                }
            }
        }
    }

    /*
    *   function to update due report installment wise due summary
    */
    private function updateDueReportInstallmentWiseAmounts(
        string $title,
        float|int $totalAmount,
        float|int $discountAmount,
        float|int $paidAmount,
        float|int $dueAmount
    ) {
        $this->dueReportInstallmentWiseAmounts[$title]['total_amount'] = ($this->dueReportInstallmentWiseAmounts[$title]['total_amount'] ?? 0) + $totalAmount;
        $this->dueReportInstallmentWiseAmounts[$title]['discount_amount'] = ($this->dueReportInstallmentWiseAmounts[$title]['discount_amount'] ?? 0) + $discountAmount;
        $this->dueReportInstallmentWiseAmounts[$title]['paid_amount'] = ($this->dueReportInstallmentWiseAmounts[$title]['paid_amount'] ?? 0) + $paidAmount;
        $this->dueReportInstallmentWiseAmounts[$title]['due_amount'] = ($this->dueReportInstallmentWiseAmounts[$title]['due_amount'] ?? 0) + $dueAmount;
    }

    /*
    * function to update due report student installment wise due summary
    */
    private function updateDueReportStudentWiseAmounts(
        int $studentId,
        string $title,
        float|int $totalAmount,
        float|int $discountAmount,
        float|int $paidAmount,
        float|int $dueAmount
    ) {
        $this->dueReportStudentWiseAmounts[$studentId][$title]['total_amount'] = ($this->dueReportStudentWiseAmounts[$studentId][$title]['total_amount'] ?? 0) + $totalAmount;
        $this->dueReportStudentWiseAmounts[$studentId][$title]['discount_amount'] = ($this->dueReportStudentWiseAmounts[$studentId][$title]['discount_amount'] ?? 0) + $discountAmount;
        $this->dueReportStudentWiseAmounts[$studentId][$title]['paid_amount'] = ($this->dueReportStudentWiseAmounts[$studentId][$title]['paid_amount'] ?? 0) + $paidAmount;
        $this->dueReportStudentWiseAmounts[$studentId][$title]['due_amount'] = ($this->dueReportStudentWiseAmounts[$studentId][$title]['due_amount'] ?? 0) + $dueAmount;
    }

    /*
    *   helper method to get data for fee daily collection report
    */
    private function getFeeDailyCollectionReportData(
        string $feeType = "",
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $classNameId = null,
        int $classroomId = null,
        bool $cancelledFee = false,
        bool $excludeVoucherFee = false,
        bool $concession = false,
    ) {
        $dailyCollectionReport = [];
        $total_amount = 0;
        $total_discount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;
        $totalPaidByPaymentModeReport = [];
        $totalPaidByAdminReport = [];
        $totalPaidByPaymentMode = 0;
        $totalPaidByAdmin = 0;

        $registrationFeeTransformedData = [];

        if ($feeType == FeeTypeEnum::REGISTRATION->value || empty($feeType)) {
            // get registration fee payment reports
            $dailyRegistrationFeeReports = $this->feePaymentMethodRepository->getDailyRegistrationFeeReports(
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $classNameId,
                $classroomId
            );

            // format registration fee payment report data
            $registrationFeeTransformedData = $this->formatDailyCollectionRegistrationFeeData($dailyRegistrationFeeReports);
        }

        $feeTransformedData = [];

        if ($feeType == FeeTypeEnum::FEE->value || empty($feeType)) {
            // get fee payment reports
            $dailyFeePaymentReports = $this->feePaymentMethodRepository->getDailyFeePaymentReports(
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $classNameId,
                $classroomId,
                $cancelledFee,
                $excludeVoucherFee
            );

            // $dailyFeePaymentReports->loadMissing([
            //     'student.classroomRoll:id,student_id,roll_no'
            // ]);

            // store payment fee types title
            $reportFeeTypes = [];

            if ($dailyFeePaymentReports->count() > 0) {
                $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroom_id = $report?->student?->classroom_id;

                    $report?->student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('classroom_id', $classroom_id);
                        }
                    ]);

                    return $report;
                });

                $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                    if ($report->fee_payments->count() > 0) {
                        $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                            $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                        });
                    }
                });
            }

            // format fee payment report data
            $feeTransformedData = $this->formatDailyCollectionFeeData($dailyFeePaymentReports, $reportFeeTypes);
        }

        // merge registration fee payment report and fee installment payment report
        $dailyCollectionReportData = collect($feeTransformedData)->merge($registrationFeeTransformedData)->all();

        // filter report to take only payments that has discount
        if (!empty($concession) && $concession == true) {
            $dailyCollectionReportData = collect($dailyCollectionReportData)->filter(function ($report) {
                return $report['total_discount_amount'] > 0;
            });
        }

        if (!empty($dailyCollectionReportData)) {
            // calculate total paid by payment mode
            foreach (collect($dailyCollectionReportData)->groupBy('payment_mode') as $paymentMode =>  $reports) {
                if (empty($totalPaidByPaymentModeReport[$paymentMode])) {
                    $totalPaidByPaymentModeReport[$paymentMode]['payment_mode'] = $paymentMode;
                    $totalPaidByPaymentModeReport[$paymentMode]['total_paid_amount'] = $reports->sum('total_paid_amount');
                }

                $totalPaidByPaymentMode += $reports->sum('total_paid_amount');
            }

            // calculate total paid by taken by
            foreach (collect($dailyCollectionReportData)->groupBy('created_by') as $createdBy =>  $reports) {
                if (empty($totalPaidByAdminReport[$createdBy])) {
                    $totalPaidByAdminReport[$createdBy]['created_by'] = $createdBy;
                    $totalPaidByAdminReport[$createdBy]['total_paid_amount'] = $reports->sum('total_paid_amount');
                }

                $totalPaidByAdmin += $reports->sum('total_paid_amount');
            }

            foreach ($dailyCollectionReportData as $report) {
                $total_amount += $report['total_amount'];
                $total_discount += $report['total_discount_amount'];
                $total_payable += $report['total_payable_amount'];
                $total_paid += $report['total_paid_amount'];
                $total_due += $report['total_due_amount'];
            }
        }

        $dailyCollectionReport['reports'] = $dailyCollectionReportData;
        $dailyCollectionReport['totalPaidByPaymentModeReport'] = $totalPaidByPaymentModeReport;
        $dailyCollectionReport['totalPaidByAdminReport'] = $totalPaidByAdminReport;
        $dailyCollectionReport['totalPaidByPaymentMode'] = $totalPaidByPaymentMode;
        $dailyCollectionReport['totalPaidByAdmin'] = $totalPaidByAdmin;
        $dailyCollectionReport['total_amount'] = $total_amount;
        $dailyCollectionReport['total_discount'] = $total_discount;
        $dailyCollectionReport['total_payable'] = $total_payable;
        $dailyCollectionReport['total_paid'] = $total_paid;
        $dailyCollectionReport['total_due'] = $total_due;

        return $dailyCollectionReport;
    }

    /*
    *  helper method to generate receipt note
    */
    private function generateReceiptNote($payments = [])
    {
        $receipt_note = '';

        if (!empty($payments)) {
            foreach ($payments as $feePayment) {
                $payment_note = '';

                switch ($feePayment->fee_payment_type) {
                    case FeePaymentType::GENERALVOUCHER->value:
                        $payment_note = $feePayment->is_fee_due ? 'due voucher fee' : 'with voucher fee';
                        break;
                    case FeePaymentType::TRANSPORTVOUCHER->value:
                        $payment_note = $feePayment->is_fee_due ? 'due transport fee' : 'with transport fee';
                        break;
                    default:
                        $payment_note = $feePayment->is_fee_due ? 'against previous dues from' : 'for';
                        break;
                }

                // Construct receipt note
                if (strlen($receipt_note) <= 0) {
                    $receipt_note = "Payment {$payment_note} {$feePayment->fee->title}";
                } elseif (!strpos($receipt_note, $feePayment->fee->title)) {
                    $receipt_note .= ", {$payment_note} {$feePayment->fee->title}";
                }
            }
        }

        return $receipt_note;
    }

    /*
    *  helper method to format daily collection registration fee data
    */
    private function formatDailyCollectionRegistrationFeeData($registrationFeeReports)
    {
        $registrationFeeTransformedData = [];

        if (!empty($registrationFeeReports)) {
            $registrationFeeTransformedData = $registrationFeeReports->map(function ($report) {
                $newData = [
                    'admission_no' => "",
                    'student_type' => $report?->enquiry?->boarding_scholar ?? "",
                    'student_name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                    'class_name' => $report?->enquiry?->className?->title,
                    'fee_source' => 'Registration Fee',
                    'receipt_no' => $report?->receipt_no,
                    'roll_no' => "",
                    'total_amount' => (float) $report->total_amount ?? 0,
                    'total_discount_amount' => 0,
                    'total_payable_amount' => (float) $report->total_amount ?? 0,
                    'total_paid_amount' => (float) $report->total_amount ?? 0,
                    'total_due_amount' => 0,
                    'payment_mode' => $report->payment_mode,
                    'payment_note' => $report->payment_note,
                    'payment_date' => $report->created_at->format('d-m-Y H:i:s A'),
                    'receipt_note' => $report->payment_note,
                    'created_by' => "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}",
                    'school_receipt_no' => ""
                ];

                return collect($newData);
            });
        }

        return $registrationFeeTransformedData;
    }

    /*
    *  helper method to format daily collection registration fee data
    */
    private function formatDailyCollectionFeeData($feeReports, $reportFeeTypes)
    {
        $feeTransformedReport = [];

        if (!empty($feeReports)) {
            $feeTransformedReport = $feeReports->map(function ($report) use ($reportFeeTypes) {
                $date = Carbon::parse($report->payment_date)->format('d-m-Y');
                $time = $report->created_at->format('H:i:s A');
                $receipt_no = $report->is_cancelled ? "{$report->receipt_no} (Cancelled)" : $report->receipt_no;
                $receipt_note = $this->generateReceiptNote($report->fee_payments);

                $newData = [
                    'admission_no' => $report?->student?->admission_no ?? "",
                    'student_type' => $report?->student?->boarding_type ?? "",
                    'student_name' => "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}",
                    'class_name' => $report?->student?->classroom?->title,
                    'fee_source' => !empty(array_unique($reportFeeTypes[$report->id])) ? implode(',', array_unique($reportFeeTypes[$report->id])) : "",
                    'receipt_no' => $receipt_no,
                    'roll_no' => $report?->student?->classroomRoll?->roll_no,
                    'total_amount' =>  (float) $report->total_amount ?? 0,
                    'total_discount_amount' =>  (float) $report->total_discount_amount ?? 0,
                    'total_payable_amount' => (float) $report->total_payable_amount ?? 0,
                    'total_paid_amount' => (float) $report->total_paid_amount ?? 0,
                    'total_due_amount' =>  (float) $report->total_due_amount ?? 0,
                    'payment_mode' =>  $report->payment_mode,
                    'payment_note' =>  $report->payment_note,
                    'payment_date' => "{$date} {$time}",
                    'receipt_note' => $receipt_note,
                    'created_by' => "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}",
                    'school_receipt_no' => $report?->school_receipt_no ?? ""
                ];

                return collect($newData);
            });
        }

        return $feeTransformedReport;
    }


    /*
    *   helper method to get data for fee head wise daily collection report
    */
    private function getHeadWiseDailyCollectionReportData(
        string $sortBy = "",
        bool $voucher = false,
        bool $cancelledFee = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $feeTypeId = null,
        int $classNameId = null
    ) {
        $headWiseDailyCollectionReport = [];
        $feeTypePaidAmountArray = [];
        $totalPaidByPaymentModeReport = [];
        $totalPaidByAdminReport = [];
        $totalAmountByFeeType = 0;
        $totalAmountByPaymentMode = 0;
        $totalAmountByAdmin = 0;
        $grand_amount = 0;
        $grand_payable = 0;
        $grand_paid = 0;
        $grand_due = 0;
        $grand_discount = 0;

        $headWiseDailyCollections = $this->feePaymentMethodRepository->getHeadWiseDailyFeePaymentReports(
            $sortBy,
            $voucher,
            $cancelledFee,
            $startDate,
            $endDate,
            $paymentMode,
            $feeTypeId,
            $classNameId
        );

        if ($headWiseDailyCollections->count() > 0) {
            $headWiseDailyCollections = $headWiseDailyCollections->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }

                return $report;
            });

            $headWiseDailyCollections->loadMissing(['student.employment_category']);

            $headWiseDailyCollectionReportData = $headWiseDailyCollections->groupBy('payment_date')
                ->map(function ($groupedReports) use (
                    &$feeTypePaidAmountArray,
                    &$grand_amount,
                    &$grand_payable,
                    &$grand_paid,
                    &$grand_due,
                    &$grand_discount,
                    &$totalPaidByPaymentModeReport,
                    &$totalPaidByAdminReport
                ) {
                    $grand_total_amount = 0;
                    $grand_total_payable = 0;
                    $grand_total_paid = 0;
                    $grand_total_due = 0;
                    $grand_total_discount = 0;
                    $dateWiseFeeTypePaidAmountArray = [];

                    $groupedReports = $groupedReports->map(function ($report) use (
                        &$feeTypePaidAmountArray,
                        &$dateWiseFeeTypePaidAmountArray,
                        &$grand_total_amount,
                        &$grand_total_payable,
                        &$grand_total_paid,
                        &$grand_total_due,
                        &$grand_total_discount,
                        &$totalPaidByPaymentModeReport,
                        &$totalPaidByAdminReport
                    ) {
                        $tempFeeTypePaidAmountArray = [];
                        $total_amount = 0;
                        $total_payable = 0;
                        $total_paid = 0;
                        $total_due = 0;
                        $total_discount = 0;
                        $receipt_note = $this->generateReceiptNote($report->fee_payments);

                        if (count($report->fee_payments) > 0) {
                            $report->fee_payments->each(function ($feePayment) use (
                                &$feeTypePaidAmountArray,
                                &$dateWiseFeeTypePaidAmountArray,
                                &$tempFeeTypePaidAmountArray,
                                &$total_amount,
                                &$total_payable,
                                &$total_paid,
                                &$total_due,
                                &$total_discount
                            ) {
                                // calculate fee type paid amount for each report
                                $tempFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($tempFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;

                                // calculate fee type paid amount for each date group
                                $dateWiseFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($dateWiseFeeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;

                                // calculate fee type paid amount for grand total
                                $feeTypePaidAmountArray[$feePayment?->feeType?->fee_type] = ($feeTypePaidAmountArray[$feePayment?->feeType?->fee_type] ?? 0) + (float) $feePayment?->paid_amount ?? 0;

                                $total_amount += (float) $feePayment->amount ?? 0;
                                $total_payable += (float) $feePayment->payable_amount ?? 0;
                                $total_paid += (float) $feePayment->paid_amount ?? 0;
                                $total_due += (float) $feePayment->due_amount ?? 0;
                                $total_discount += (float) $feePayment->discount_amount ?? 0;
                            });
                        }

                        // calculte total paid by payment mode
                        $totalPaidByPaymentModeReport[$report?->payment_mode] = ($totalPaidByPaymentModeReport[$report?->payment_mode] ?? 0) + $total_paid;

                        // calculte total paid by taken by
                        $takenBy = "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}";

                        if (empty($totalPaidByAdminReport[$report?->created_by])) {
                            $totalPaidByAdminReport[$report?->created_by] = [
                                'taken_by' => $takenBy,
                                'amount' => $total_paid,
                            ];
                        } else {
                            $totalPaidByAdminReport[$report?->created_by]['amount'] += $total_paid;
                        }

                        $grand_total_amount += $total_amount;
                        $grand_total_payable += $total_payable;
                        $grand_total_paid += $total_paid;
                        $grand_total_due += $total_due;
                        $grand_total_discount += $total_discount;

                        $receipt_no = $report->is_cancelled ? "{$report->receipt_no} (Cancelled)" : $report->receipt_no;
                        $studentName = "";
                        $fatherName = "";

                        if ($report->student != null) {
                            $studentName = "{$report?->student?->first_name} {$report?->student?->middle_name} {$report?->student?->last_name}";
                        }

                        if ($report?->student?->father != null) {
                            $fatherName = "{$report?->student?->father?->first_name} {$report?->student?->father?->middle_name} {$report?->student?->father?->last_name}";
                        }

                        $reportData = [
                            'admission_no' => $report?->student?->admission_no ?? "",
                            'name' =>  $studentName,
                            'class' =>  $report?->student?->classroom?->title ?? "",
                            'father_name' =>  $fatherName,
                            'receipt_no' => $receipt_no,
                            'school_receipt_no' => $report?->school_receipt_no,
                            'receipt_date' => $report->created_at->format('d/m/Y'),
                            'receipt_note' => $receipt_note,
                            'transaction_id' => $report?->transaction_id,
                            'mode' => $report?->payment_mode,
                            'taken_by' => $takenBy,
                            'payment_note' => $report?->payment_note,
                            'student_type' => $report?->student?->boarding_type,
                            'gender' => $report?->student?->gender,
                            'employment_category' => $report?->student?->employment_category?->title,
                            'amount' => $total_amount,
                            'discount' => $total_discount,
                            'payable' => $total_payable,
                            'paid' => $total_paid,
                            'due' => $total_due
                        ];

                        $mergedReportData = collect($reportData)->merge($tempFeeTypePaidAmountArray)->all();

                        return $mergedReportData;
                    });

                    $grand_amount += $grand_total_amount;
                    $grand_payable += $grand_total_payable;
                    $grand_paid += $grand_total_paid;
                    $grand_due += $grand_total_due;
                    $grand_discount += $grand_total_discount;

                    return collect([
                        'reports' => $groupedReports,
                        'amount' => $grand_total_amount,
                        'discount' => $grand_total_discount,
                        'payable' => $grand_total_payable,
                        'paid' => $grand_total_paid,
                        'due' => $grand_total_due,
                        'fee_type_paid_amount_array' => $dateWiseFeeTypePaidAmountArray
                    ]);
                })->toArray();


            if (!empty($feeTypePaidAmountArray)) {
                foreach ($feeTypePaidAmountArray as $amount) {
                    $totalAmountByFeeType += $amount;
                }
            }

            if (!empty($totalPaidByPaymentModeReport)) {
                foreach ($totalPaidByPaymentModeReport as $amount) {
                    $totalAmountByPaymentMode += $amount;
                }
            }

            if (!empty($totalPaidByAdminReport)) {
                foreach ($totalPaidByAdminReport as $report) {
                    $totalAmountByAdmin += $report['amount'];
                }
            }

            $headWiseDailyCollectionReport['reports'] = $headWiseDailyCollectionReportData;
            $headWiseDailyCollectionReport['amount'] = $grand_amount;
            $headWiseDailyCollectionReport['discount'] = $grand_discount;
            $headWiseDailyCollectionReport['payable'] = $grand_payable;
            $headWiseDailyCollectionReport['paid'] = $grand_paid;
            $headWiseDailyCollectionReport['due'] = $grand_due;
            $headWiseDailyCollectionReport['fee_type_paid_amount_array'] = $feeTypePaidAmountArray;
            $headWiseDailyCollectionReport['total_paid_by_payment_mode'] = $totalPaidByPaymentModeReport;
            $headWiseDailyCollectionReport['total_paid_by_admin'] = $totalPaidByAdminReport;
            $headWiseDailyCollectionReport['total_by_fee_type'] = $totalAmountByFeeType;
            $headWiseDailyCollectionReport['total_by_payment_mode'] = $totalAmountByPaymentMode;
            $headWiseDailyCollectionReport['total_by_admin'] = $totalAmountByAdmin;
        }

        return $headWiseDailyCollectionReport;
    }

    /**
     * Student Complete Fee Paid Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentCompleteFeePaidReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $completeFeePaidReport = [];
        $classroomTitle = "";
        $reportTitle = "Installments ";

        $classroomId = $classroom->id ?? null;

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($classroomId);
            $classroomTitle = $classroom->title ?? "";
            $academicYearId = $classroom?->academic_year_id;

            if (!empty($request->from_fee_id) && !empty($request->to_fee_id)) {
                $completeFeePaidReport = $this->getStudentCompleteFeePaidReportData(
                    $request->from_fee_id,
                    $request->to_fee_id,
                    $classroomId,
                    $academicYearId
                );

                $fromFeeTitle = $this->feeRepository->getFeeTitleById($request->from_fee_id)?->title ?? "";
                $toFeeTitle = $this->feeRepository->getFeeTitleById($request->to_fee_id)?->title ?? "";

                $reportTitle .= "from {$fromFeeTitle} to {$toFeeTitle}";
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Fee Summary'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.complete_fee_paid_summary', [
            'completeFeePaidReport' => $completeFeePaidReport,
            'schoolData' => $schoolData,
            'reportTitle' => $reportTitle,
            'classroomTitle' => $classroomTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get student complete fee paid report data
    */
    protected function getStudentCompleteFeePaidReportData(
        $fromFeeId,
        $toFeeId,
        $classroomId,
        $academicYearId = null,
    ) {
        $completePaidReport = [];
        $installmentWiseAmounts = [];
        $grandTotalPaidAmount = 0;
        $schoolId = getUserSchoolId();

        $studentIds = $this->studentRepository->getStudentsByClassroomId($classroomId, $schoolId, $academicYearId)
            ->pluck('id')
            ->toArray();

        $completePaidReportData = $this->feePaymentRepository->getStudentCompletePaidReportData(
            $fromFeeId,
            $toFeeId,
            $studentIds,
            $academicYearId
        );

        if (count($completePaidReportData) > 0) {
            $completePaidReportData->loadMissing(['fee']);

            $completePaidReportData = $completePaidReportData->map(function ($report) {
                if ($report?->student?->promotedClassroom != null) {
                    if (!empty($report['student']['classroom'])) {
                        unset($report['student']['classroom']);
                    }

                    $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                    $report['student']['classroom'] = $report?->student?->promotedClassroom;
                }
                return $report;
            });

            foreach ($completePaidReportData->groupBy('student_id') as $studentId =>  $studentReports) {
                $student = $studentReports->first()?->student;
                $classroomId = $student->classroom_id;

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                foreach ($studentReports->groupBy('fee_id') as $feeId => $reports) {
                    $total_paid_amount = 0;
                    $isCompletePaid = true;

                    $fee = $reports->first()->fee;

                    $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByFeeIdAndStudentId($studentId, $feeId);

                    if (count($feeInstallments) > 0) {
                        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
                        $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeId);

                        $total_transport_fee = 0;
                        $total_late_fee = 0;

                        if (!$hasPayment) {
                            $fee = $reports->first()->fee;

                            // calculte transport fee if transport fee setting set to fee
                            if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                                $total_transport_fee += $this->calculateStudentCompletePaidTransportFee($studentId, $reports);
                            }

                            // calculate late fee
                            $total_late_fee += $this->calculateStudentCompletePaidLateFee($fee, $reports);
                        }

                        foreach ($feeInstallments as $installment) {
                            $semester = $installment?->smeseter ?? 1;
                            $fee_amount = ((float) $installment?->amount ?? 0) * $semester;
                            $payable_amount =  $fee_amount + $total_late_fee + $total_transport_fee;

                            $discount_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $installment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)->sum('paid_amount') ?? 0;

                            $total_paid_amount += $paid_amount;

                            if ($payable_amount != ($paid_amount + $discount_amount)) {
                                $isCompletePaid = false;
                                break;
                            }
                        }
                    }

                    if ($isCompletePaid) {
                        $studentName = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");
                        $parentName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                        $completePaidReport[$studentId]['admission_no'] = $student->admission_no;
                        $completePaidReport[$studentId]['student_name'] = $studentName;
                        $completePaidReport[$studentId]['parent_name'] = $parentName;
                        $completePaidReport[$studentId]['phone'] = $student?->father?->phone ?? "";
                        $completePaidReport[$studentId]['classroom_title'] = $student?->classroom?->title ?? "";
                        $completePaidReport[$studentId]['installment_wise_amounts'][$fee->id] = $total_paid_amount;

                        if (!empty($completePaidReport[$studentId]['total_paid_amount'])) {
                            $completePaidReport[$studentId]['total_paid_amount'] += $total_paid_amount;
                        } else {
                            $completePaidReport[$studentId]['total_paid_amount'] = $total_paid_amount;
                        }

                        $installmentWiseAmounts[$fee->id] = [
                            'title' => $fee->title,
                            'amount' => ($installmentWiseAmounts[$fee->title] ?? 0) + $total_paid_amount
                        ];

                        $grandTotalPaidAmount += $total_paid_amount;
                    }
                }
            }
        }

        ksort($installmentWiseAmounts);

        return [
            'reports' => $completePaidReport,
            'installment_wise_amounts' => $installmentWiseAmounts,
            'total_paid_amount' => $grandTotalPaidAmount,
        ];
    }

    /*
    *  helper method to calculate student complete paid transport fee
    */
    protected function calculateStudentCompletePaidTransportFee($studentId, $reports)
    {
        $totalTransportFeeAmount = 0;

        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
            if ($currentAllocateTransport != null) {
                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
            } else {
                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $studentId,
                $currentAllocateFeeId,
                $deallocateTransport?->fee_id
            );

            if (count($allocateTransportFees) > 0) {
                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                foreach ($allocateTransportFees as $allocateTransportFee) {
                    if ($allocateTransportFee->id == $feeId) {
                        if ($transportFee != null) {
                            $existedTransportFee = $reports->where('fee_type_id', $transportFee->id)->first();

                            if ($existedTransportFee == null) {
                                $totalTransportFeeAmount += $transportFeeAmount;
                            }
                        }
                    }
                }
            }
        }

        return $totalTransportFeeAmount;
    }


    /*
    *  helper method to calculate student complete paid late fee
    */
    protected function calculateStudentCompletePaidLateFee($fee, $reports)
    {
        $lateFeeAmount = 0;

        $lateFee = $this->feeTypeRepository->getLateFeeType();

        if ($lateFee != null) {
            $existedLateFee = $reports->where('fee_type_id', $lateFee->id)->first();

            if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                $lateFineStartDate = $fee->last_pay_date_at;
                $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                    $currentDate = date("Y-m-d");
                    $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                    if ($lateFineType == LateFineType::DAILY->value) {
                        $lateFeeAmount = (float) $lateFineAmount * $daysDifference;
                    } else if ($lateFineType == LateFineType::WEEKLY->value) {
                        $weeksDifference = floor($daysDifference / 7);
                        $lateFeeAmount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                    } else if ($lateFineType == LateFineType::MONTHLY->value) {
                        // Extract year and month from the start date
                        list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                        // Extract year and month from the current date
                        list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                        // Calculate the difference in months
                        $startMonths = ($startYear * 12) + $startMonth;
                        $currentMonths = ($currentYear * 12) + $currentMonth;
                        $monthsDifference = $currentMonths - $startMonths;

                        $lateFeeAmount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                    }
                }
            }
        }

        return $lateFeeAmount;
    }

    /**
     * Student Daily Collection Report
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentDailyCollectionReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $feeType = FeeTypeEnum::FEE->value;
        $currentSession = $request->current_session ?? false;
        $start_date = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $end_date = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
        $payment_mode = $request->payment_mode ?? "";
        $classroomId = $classroom?->id;
        $cancelledFee = $request->cancelled_fee ?? false;
        $excludeVoucherFee = $request->exclude_voucher_fee ?? false;
        $concession = $request->concession ?? false;
        $academicYearId = $classroom?->academic_year_id;
        $reports = [];

        if (!empty($classroomId)) {
            $reports = $this->getStudentDailyCollectionReportData(
                $feeType,
                $currentSession,
                $start_date,
                $end_date,
                $payment_mode,
                $classroomId,
                $cancelledFee,
                $excludeVoucherFee,
                $concession,
                $academicYearId
            );
        }

        $schoolData = [];
        $reportDateTitle = "";
        $feeMode = FeeTypeEnum::FEE->value;
        $paymentMode = $request->payment_mode ?? "All";

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $startDate = !empty($request->start_date) ? Carbon::parse($request->start_date)->format('d-M-Y') : "";
            $endDate = !empty($request->end_date) ? Carbon::parse($request->end_date)->format('d-M-Y') : "";

            $reportDateTitle = "{$startDate} to {$endDate}";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Demand Slip'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 20,
            'margin_right' => 15,
            'margin_top' => 8,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'L',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        if ($header) {
            $pdf->SetHTMLHeader($header);
        }
        if ($footer) {
            $pdf->SetHTMLFooter($footer);
        }

        $pdf->writeHTML(view('pdf.demand-slip.daily_collection_report', ['reports' => $reports, 'schoolData' => $schoolData, 'reportDateTitle' => $reportDateTitle, 'feeMode' => $feeMode, 'paymentMode' => $paymentMode])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper method to get data for student daily collection report
    */
    private function getStudentDailyCollectionReportData(
        string $feeType = "",
        bool $currentSession = false,
        string $startDate = "",
        string $endDate = "",
        string $paymentMode = "",
        int $classroomId = null,
        bool $cancelledFee = false,
        bool $excludeVoucherFee = false,
        bool $concession = false,
        int $academicYearId = null
    ) {
        $dailyCollectionReport = [];
        $total_amount = 0;
        $total_discount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;
        $totalPaidByPaymentModeReport = [];
        $totalPaidByAdminReport = [];
        $totalPaidByPaymentMode = 0;
        $totalPaidByAdmin = 0;
        $feeTransformedData = [];

        if ($feeType == FeeTypeEnum::FEE->value || empty($feeType)) {
            // get fee payment reports
            $dailyFeePaymentReports = $this->feePaymentMethodRepository->getStudentDailyCollectionReportData(
                $classroomId,
                $currentSession,
                $startDate,
                $endDate,
                $paymentMode,
                $cancelledFee,
                $excludeVoucherFee,
                $academicYearId
            );

            // store payment fee types title
            $reportFeeTypes = [];

            if ($dailyFeePaymentReports->count() > 0) {
                $dailyFeePaymentReports = $dailyFeePaymentReports->map(function ($report) {
                    if ($report?->student?->promotedClassroom != null) {
                        if (!empty($report['student']['classroom'])) {
                            unset($report['student']['classroom']);
                        }

                        $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
                        $report['student']['class_name_id'] = $report?->student?->promotedClassroom?->class_name_id;
                        $report['student']['classroom'] = $report?->student?->promotedClassroom;
                    }

                    $classroom_id = $report?->student?->classroom_id;

                    $report?->student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('classroom_id', $classroom_id);
                        }
                    ]);

                    return $report;
                });

                $dailyFeePaymentReports->each(function ($report) use (&$reportFeeTypes) {
                    if ($report->fee_payments->count() > 0) {
                        $report->fee_payments->each(function ($payment) use ($report, &$reportFeeTypes) {
                            $reportFeeTypes[$report->id][] = $payment?->feeType?->fee_type;
                        });
                    }
                });
            }

            // format fee payment report data
            $feeTransformedData = $this->formatDailyCollectionFeeData($dailyFeePaymentReports, $reportFeeTypes);
        }

        // merge registration fee payment report and fee installment payment report
        $dailyCollectionReportData = $feeTransformedData;

        // filter report to take only payments that has discount
        if (!empty($concession) && $concession == true) {
            $dailyCollectionReportData = collect($dailyCollectionReportData)->filter(function ($report) {
                return $report['total_discount_amount'] > 0;
            });
        }

        if (!empty($dailyCollectionReportData)) {
            // calculate total paid by payment mode
            foreach (collect($dailyCollectionReportData)->groupBy('payment_mode') as $paymentMode =>  $reports) {
                if (empty($totalPaidByPaymentModeReport[$paymentMode])) {
                    $totalPaidByPaymentModeReport[$paymentMode]['payment_mode'] = $paymentMode;
                    $totalPaidByPaymentModeReport[$paymentMode]['total_paid_amount'] = $reports->sum('total_paid_amount');
                }

                $totalPaidByPaymentMode += $reports->sum('total_paid_amount');
            }

            // calculate total paid by taken by
            foreach (collect($dailyCollectionReportData)->groupBy('created_by') as $createdBy =>  $reports) {
                if (empty($totalPaidByAdminReport[$createdBy])) {
                    $totalPaidByAdminReport[$createdBy]['created_by'] = $createdBy;
                    $totalPaidByAdminReport[$createdBy]['total_paid_amount'] = $reports->sum('total_paid_amount');
                }

                $totalPaidByAdmin += $reports->sum('total_paid_amount');
            }

            foreach ($dailyCollectionReportData as $report) {
                $total_amount += $report['total_amount'];
                $total_discount += $report['total_discount_amount'];
                $total_payable += $report['total_payable_amount'];
                $total_paid += $report['total_paid_amount'];
                $total_due += $report['total_due_amount'];
            }
        }

        $dailyCollectionReport['reports'] = $dailyCollectionReportData;
        $dailyCollectionReport['totalPaidByPaymentModeReport'] = $totalPaidByPaymentModeReport;
        $dailyCollectionReport['totalPaidByAdminReport'] = $totalPaidByAdminReport;
        $dailyCollectionReport['totalPaidByPaymentMode'] = $totalPaidByPaymentMode;
        $dailyCollectionReport['totalPaidByAdmin'] = $totalPaidByAdmin;
        $dailyCollectionReport['total_amount'] = $total_amount;
        $dailyCollectionReport['total_discount'] = $total_discount;
        $dailyCollectionReport['total_payable'] = $total_payable;
        $dailyCollectionReport['total_paid'] = $total_paid;
        $dailyCollectionReport['total_due'] = $total_due;

        return $dailyCollectionReport;
    }

    /**
     * Head Wise - Student Due Report
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printHeadWiseStudentDueReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $classroomId = $classroom?->id;
        $academicYearId = $classroom?->academic_year_id;
        $schoolId = getUserSchoolId();

        $reports = $this->getHeadWiseStudentDueReportData($request, $classroomId, $schoolId, $academicYearId);
        $schoolData = [];
        $reportTitle = "";

        if (!empty($reports) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $fromInstallment = $this->feeRepository->getFeeTitleById($request->from_installment);
            $toInstallment = $this->feeRepository->getFeeTitleById($request->to_installment);

            $reportTitle = "{$classroom?->title} ({$fromInstallment?->title} to {$toInstallment?->title})";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Head Wise - Student Due Summary')),
            view('pdf.demand-slip.student_due_summary_head_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportTitle' => $reportTitle])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        // $pdf_name = 'printProgressReportWithGraph';
        $pdf_name = '';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Head Wise - Student Due Summary') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /*
    *   helper method to get head wise student due report data
    */
    private function getHeadWiseStudentDueReportData(Request $request, int $classroomId = null, int $schoolId = null, int $academicYearId = null)
    {
        $headWiseTotalDue = 0;
        $type = 'head_wise';

        if (!empty($classroomId) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $classroomId,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
                $academicYearId
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments($request, $feeInstallments, $transportFeeStructureSetting, $type, $schoolId, $academicYearId);
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $classroomId,
                    $request->student_status ?? "",
                    $academicYearId
                );

                $this->formatInstallmentWiseGeneralVouchers($type, $generalVouchers);

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($classroomId, $request->student_status ?? "", $academicYearId);

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers($type, $student, $transportFeeStructureSetting, $schoolId, $academicYearId);
                    }
                }
            }

            if (count($this->headWiseDueSummary) > 0) {
                foreach ($this->headWiseDueSummary as $studentId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($this->studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $this->headWiseDueSummary[$studentId]['head_wise_amounts'] = $this->studentWiseAmounts[$studentId];
                    $this->headWiseDueSummary[$studentId]['total_due'] = $total_due;
                    $this->headWiseDueSummary[$studentId]['installments'] = !empty($this->studentDueInstallments[$studentId]) ? implode(',', $this->studentDueInstallments[$studentId]) : "";
                    $this->headWiseDueSummary[$studentId]['total_installments'] = !empty($this->studentDueInstallments[$studentId]) ? count($this->studentDueInstallments[$studentId]) : 0;

                    $headWiseTotalDue += $total_due;
                }
            }
        }

        $studentWiseReports = $this->headWiseDueSummary;

        // sort reports by classroom roll
        usort($studentWiseReports, function ($a, $b) {
            $rollNoA = $a['student']['classroom_roll']['roll_no'] ?? null;
            $rollNoB = $b['student']['classroom_roll']['roll_no'] ?? null;

            if ($rollNoA == $rollNoB) {
                return 0;
            }

            // If $rollNoA is null, move it to the end
            if ($rollNoA == null) {
                return 1;
            }

            // If $rollNoB is null, move it to the end
            if ($rollNoB == null) {
                return -1;
            }

            return ($rollNoA < $rollNoB) ? -1 : 1;
        });

        return [
            'student_wise_reports' => $studentWiseReports,
            'head_wise_reports' => $this->headWiseAmounts,
            'total_due' => $headWiseTotalDue
        ];
    }

    /**
     * Installment Wise - Student Due Report
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printInstallmentWiseStudentDueReport(Request $request)
    {
        $staff = $this->staffRepository->getStaffByUserId(auth()->user()->id);
        $classroom = $staff?->classroom;
        $classroomId = $classroom?->id;
        $academicYearId = $classroom?->academic_year_id;
        $schoolId = getUserSchoolId();

        $reports = $this->getInstallmentWiseStudentDueReportData($request, $classroomId, $schoolId, $academicYearId);
        $schoolData = [];
        $reportTitle = "";

        if (!empty($reports) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }

            $fromInstallment = $this->feeRepository->getFeeTitleById($request->from_installment);
            $toInstallment = $this->feeRepository->getFeeTitleById($request->to_installment);

            $reportTitle = "{$classroom?->title} ({$fromInstallment?->title} to {$toInstallment?->title})";
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Installment Wise - Student Due Summary')),
            view('pdf.demand-slip.student_due_summary_installment_wise', ['reports' => $reports, 'schoolData' => $schoolData, 'reportTitle' => $reportTitle])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        // $pdf_name = 'printProgressReportWithGraph';
        $pdf_name = '';

        $file = 'progress-card' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Installment Wise - Student Due Summary') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /*
    *   helper method to get installment wise stuent due report data
    */
    private function getInstallmentWiseStudentDueReportData(Request $request, int $classroomId = null, int $schoolId = null, int $academicYearId = null)
    {
        $installmentWiseTotalDue = 0;
        $type = 'installment_wise';

        if (!empty($classroomId) && !empty($request->from_installment) && !empty($request->to_installment)) {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getInstallmentWiseDueReports(
                $classroomId,
                $request->from_installment,
                $request->to_installment,
                $request->student_status ?? "",
                $request->fee_category_id ?? null,
                $request->fee_structure_id ?? null,
                $academicYearId
            );

            if (count($feeInstallments) > 0) {
                $this->formatHeadAndInstallmentWiseFeeInstallments($request, $feeInstallments, $transportFeeStructureSetting, $type, $schoolId, $academicYearId);
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getClassroomInstallmentWiseDueFeeVouchers(
                    $classroomId,
                    $request->student_status ?? "",
                    $academicYearId
                );

                $this->formatInstallmentWiseGeneralVouchers($type, $generalVouchers);

                // transport vouchers

                // get students by classroom id and student status
                $students = $this->studentRepository->getAllByClassroomAndStatus($classroomId, $request->student_status ?? "", $academicYearId);

                if ($students->count() > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if ($student?->classroom != null) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        return $student;
                    });

                    foreach ($students as $student) {
                        $this->formatInstallmentWiseTransportVouchers($type, $student, $transportFeeStructureSetting, $schoolId, $academicYearId);
                    }
                }
            }

            if (count($this->installmentWiseDueSummary) > 0) {
                foreach ($this->installmentWiseDueSummary as $studentId => $groupedDueSummary) {
                    $total_due = 0;

                    foreach ($this->studentWiseAmounts[$studentId] as $amount) {
                        $total_due += $amount;
                    }

                    $this->installmentWiseDueSummary[$studentId]['installment_wise_amounts'] = $this->studentWiseAmounts[$studentId];
                    $this->installmentWiseDueSummary[$studentId]['total_due'] = $total_due;

                    $installmentWiseTotalDue += $total_due;
                }
            }
        }

        return [
            'student_wise_reports' => $this->installmentWiseDueSummary,
            'installment_wise_reports' => $this->installmentWiseAmounts,
            'total_due' => $installmentWiseTotalDue
        ];
    }
}
