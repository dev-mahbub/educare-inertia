<?php

namespace App\Http\Controllers;

use App\Enums\AdmissionExamStatus;
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
use App\Models\Student;

use Mpdf\MpdfException;
use App\Enums\EnquiryType;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Repositories\IAdmissionRepository;
use Box\Spout\Common\Exception\IOException;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;

final class PdfAdmissionController extends Controller
{

    public function __construct(
        private IAdmissionRepository $admissionRepository
    ) {
        // do something
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printAdmissionFee()
    {
        $id = isset($_COOKIE['enquiryFeeId']) ? $_COOKIE['enquiryFeeId'] : null;

        $enquiry = $this->admissionRepository->getEnqueryRelationObjById($id);

        // abort_if(empty($enquiry) || (!empty($enquiry) && $enquiry?->enquiry_type != EnquiryType::REGISTRATION->value), 404);
        abort_if(empty($enquiry), 404);

        $enquiry->loadMissing(['admissionAcademicYear']);

        $enquiry['receipt_date'] = !empty($enquiry->date_of_registration) ? Carbon::parse($enquiry->date_of_registration)->format('d/m/Y') : "";
        $enquiry['created_by'] = $enquiry?->admin_first_name . " " . $enquiry?->admin_middle_name . " " . $enquiry?->admin_last_name;

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Registration Receipt'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 5,
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

        $schoolData = getSiteSchoolData();

        $schoolData['academic_year'] = getAcademicYear();
        $schoolData['logo'] = $schoolData?->logo;

        $domain_name = env('DOMAIN_NAME', 'educarestudy.in');
        $domain_url = $schoolData?->school_key . "." . $domain_name;

        $schoolData['domain_url'] = $domain_url;

        $feeReceiptPageSize = getSiteSettingData('fee_reg_receipt_page_size') != null ? getSiteSettingData('fee_reg_receipt_page_size')->value : "Small";
        $feeReceiptCopy = getSiteSettingData('fee_reg_receipt_copy') != null ? getSiteSettingData('fee_reg_receipt_copy')->value : "Single";

        $view = "";
        if ($feeReceiptPageSize == "Small" && $feeReceiptCopy != "Single") {
            $view = 'pdf.admission.registration_fee_receipt_small';
        } else if ($feeReceiptPageSize == "Small" && $feeReceiptCopy == "Single") {
            $view = 'pdf.admission.registration_fee_receipt_single_small';
        } else if ($feeReceiptPageSize == "Large" && $feeReceiptCopy != "Single") {
            $view = 'pdf.admission.registration_fee_receipt_large';
        } else if ($feeReceiptPageSize == "Large" && $feeReceiptCopy == "Single") {
            $view = 'pdf.admission.registration_fee_receipt_single_large';
        }

        return view($view, [
            'enquiry' => $enquiry,
            'school' => $schoolData,
        ]);

        // $pdf->writeHTML(view('pdf.admission.fee_receipt', [
        //     'enquiry' => $enquiry,
        //     'school' => $schoolData,
        // ])->render());

        // $pdfContent = $pdf->output();

        // return response($pdfContent)->header('Content-Type', 'application/pdf');
    }


    /**
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printAdmissionFeeOld(int $id)
    {
        $enquiry = $this->admissionRepository->getEnqueryRelationObjById($id);

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.admission.fee_receipt', [
                'enquiry' =>  $enquiry,
                'school'  =>  getSiteSchoolData(),
            ])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = 'nasir3';

        $file = 'invoices' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
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
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Invoice') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printRegistrationForm(int $id)
    {
        $enquiry = $this->admissionRepository->getEnqueryRelationObjById($id);

        abort_if(empty($enquiry) || (!empty($enquiry) && $enquiry?->enquiry_type == EnquiryType::ENQUIRY->value), 404);

        $enquiry->loadMissing([
            'admissionAcademicYear',
            'bloodGroup',
            'studentImage',
            'fatherImage',
            'motherImage',
            'category',
            'religionName',
            'presentState',
            'permanentState',
            'student'
        ]);

        // Create a Carbon instance for April of the current year
        $currentYear = Carbon::now()->year;
        $targetDate = Carbon::create($currentYear, 4, 1);
        $ageYears = "";
        $ageMonths = "";
        $ageDays = "";
        $dateOfBirth = "";

        if (!empty($enquiry->date_of_birth)) {
            $dob = Carbon::parse($enquiry->date_of_birth);

            // Calculate the age in years, months, and days
            $ageYears = $dob->diffInYears($targetDate);
            $ageMonths = $dob->diffInMonths($targetDate) % 12;
            $ageDays = $dob->diffInDays($targetDate->copy()->subYears($ageYears)->subMonths($ageMonths));

            $dateOfBirth = Carbon::parse($enquiry->date_of_birth)->format('d M, Y');
        }

        $enquiry['date_of_birth'] = $dateOfBirth;
        $enquiry['age_years'] = $ageYears;
        $enquiry['age_months'] = $ageMonths;
        $enquiry['age_days'] = $ageDays;

        $schoolData = getSiteSchoolData();

        $schoolData['academic_year'] = getAcademicYear();
        $schoolData['logo'] = $schoolData?->logo;

        $siteSettingsReportCard = getSiteSettingDataByType('Team Wise Report Card');
        $waterMarkImage = $siteSettingsReportCard['Team Wise Report Card']['watermark_image'] ?? "";

        $domain_name = env('DOMAIN_NAME', 'educarestudy.in');
        $domain_url = $schoolData?->school_key . "." . $domain_name;

        $schoolData['domain_url'] = $domain_url;

        return view('pdf.admission.registration_form', [
            'enquiry' => $enquiry,
            'schoolData' => $schoolData,
            'currentYear' => $currentYear,
            'waterMarkImage' => $waterMarkImage,
        ]);
    }


    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printExamSummaryReport(Request $request)
    {
        $admissionExamSummary = [];
        $classTitle = "All Class";

        $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $boardingType = $request->boarding_type ?? "";
        $examStatus = $request->exam_status ?? "";

        if (!empty($examStatus)) {
            $admissionExamSummary = $this->getAdmissionExamSummaryData($examStatus, $fromDate, $toDate, $boardingType);
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Registration Receipt'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
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

        $schoolData = getSiteSchoolData();
        $schoolData['academic_year'] = getAcademicYear();

        $pdf->writeHTML(view('pdf.admission.exam_summary_report', [
            'schoolData' => $schoolData,
            'classTitle' => $classTitle,
            'examStatus' => $examStatus,
            'admissionExamSummary' => $admissionExamSummary
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * helper method to get admission exam summary data
    */
    protected function getAdmissionExamSummaryData(string $examStatus, string $fromDate = "", string $toDate = "",  string $boardingType = "")
    {
        $admissionExamSummary = [];

        $registrations = $this->admissionRepository->getAdmissionExamStatusWiseEnquiries($examStatus, $fromDate, $toDate, $boardingType);

        if (count($registrations) > 0) {
            $admissionExamSummary = $registrations->map(function ($registration) {
                $studentName = $registration?->first_name . " " .  $registration?->middle_name . " " .  $registration?->last_name;

                if (!empty($registration->boarding_scholar)) {
                    $studentName .= "($registration->boarding_scholar)";
                }

                $fatherName = $registration?->father_first_name . " " .  $registration?->father_middle_name . " " .  $registration?->father_last_name;

                return [
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'registration_no' => $registration?->registration_no,
                    'class_title' => $registration?->class_title,
                    'registration_date' => !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d-M-Y') : "",
                    'exam_status' => $registration?->exam_status ?? AdmissionExamStatus::PENDING->value,
                ];
            })->toArray();
        }

        return $admissionExamSummary;
    }


    /**
     * @param null
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function ExportOldAcademicYear()
    {
        return response()->json([
            'success' => true,
            'status' => 'success',
        ]);
    }

    public function sampleExample($orderId)
    {
        $order = Order::find($orderId);

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice') . ' ' . $order->id),
            view('pdf.invoice', ['order' => $order])->render(),
            view('pdf.header')->render(),
            view('pdf.footer')->render()
        );

        $file = 'invoices' . DIRECTORY_SEPARATOR . $order->id . '.pdf';

        $storage->put($file, encrypt($content));

        Mail::to(optional($order->customer)->email)
            ->send(new Paid($order, $file));

        Mail::to('example@gmail.com')
            ->send(new Ordered($order, $file));

        return response()->json([
            'success' => true,
            'status' => 'success',
        ]);
    }
}
