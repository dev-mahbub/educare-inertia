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
use App\Enums\LateFineType;
use Illuminate\Support\Str;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use Illuminate\Support\Number;
use App\Enums\FeeInstallmentType;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Repositories\IFeeRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IVoucherRepository;
use App\Repositories\ITransportRepository;
use Box\Spout\Common\Exception\IOException;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IStudentFeeVoucherRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Repositories\IFeePaymentRefundMethodRepository;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;
use Illuminate\Support\Facades\Cookie;

final class PdfFeeController extends Controller
{

    public function __construct(
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private ITransportRepository $transportRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IFeeRepository $feeRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IStudentFeeVoucherRepository $studentFeeVoucherRepository,
        private IVoucherRepository $voucherRepository,
        private IStudentRepository $studentRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
    ) {
    }

    /**
     * Fee Summary
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentFeeSummary(Request $request)
    {
        $student = null;
        $schoolData = [];
        $studentFeeStructure = [];
        $agreementDate = Carbon::now()->format('d-M-Y');

        if (!empty($request->student_id)) {
            $student = $this->studentRepository->getStudentById($request->student_id);
        }

        if ($student != null) {
            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                unset($student['classroom']);

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

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

            $studentFeeStructure = $this->getStudentStudentFeeStructure($student->id, $student->student_status);
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Fee Summary'));
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

        $pdf->writeHTML(view('pdf.fee.student_fee_summary', ['schoolData' => $schoolData, 'student' => $student, 'studentFeeStructure' => $studentFeeStructure, 'agreementDate' => $agreementDate])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');

        // return view('pdf.fee.student_fee_summary', ['schoolData' => $schoolData, 'student' => $student, 'studentFeeStructure' => $studentFeeStructure, 'agreementDate' => $agreementDate]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Student Fee Summary')),
        //     view('pdf.fee.student_fee_summary', ['schoolData' => $schoolData, 'student' => $student, 'studentFeeStructure' => $studentFeeStructure, 'agreementDate' => $agreementDate])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Student Fee Summary') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Cancel Office Large
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCancelledStudentOfficeLarge()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;
        $report = $this->getFeePaymentReportById($id, true);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-cancelled.student_cancelled_office_large', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancelled Student Office Large')),
        //     view('pdf.fee.fee-cancelled.student_cancelled_office_large', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancelled Student Office Large') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Cancel Office Single Large
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCancelledStudentOfficeSingleLarge()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;
        $report = $this->getFeePaymentReportById($id, true);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-cancelled.student_cancelled_office_single_large', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancelled Student Office Single Large')),
        //     view('pdf.fee.fee-cancelled.student_cancelled_office_single_large', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport3';

        // $file = 'invoices' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancelled Student Office Single Large') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Cancel Office Single Small
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCancelledStudentOfficeSingleSmall()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;
        $report = $this->getFeePaymentReportById($id, true);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-cancelled.student_cancelled_office_single_small', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancel Student Office Single Small')),
        //     view('pdf.fee.fee-cancelled.student_cancelled_office_single_small', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancel Student Office Single Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Cancel Office Small
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printCancelledStudentOfficeSmall()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;
        $report = $this->getFeePaymentReportById($id, true);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-cancelled.student_cancelled_office_small', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancel Student Office Small')),
        //     view('pdf.fee.fee-cancelled.student_cancelled_office_small', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancel Student Office Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }


    /**
     * Student Paid Large
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentPaidLarge()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;
        $report = $this->getFeePaymentReportById($id, false);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-paid.student_paid_large', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancel Student Office Small')),
        //     view('pdf.fee.fee-paid.student_paid_large', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancel Student Office Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Cancel Office Small
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentPaidSingleLarge()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;
        $report = $this->getFeePaymentReportById($id, false);

        if (empty($report)) {
            abort(404);
        }

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

        return  view('pdf.fee.fee-paid.student_paid_single_large', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancel Student Office Small')),
        //     view('pdf.fee.fee-paid.student_paid_single_large', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancel Student Office Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Cancel Office Small
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentPaidSingleLargeTwo($id)
    {
        $report = $this->getFeePaymentReportById($id, false);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-paid.student_paid_single_large2', ['order' => [], 'report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancel Student Office Small')),
        //     view('pdf.fee.fee-paid.student_paid_single_large2', ['order' => [], 'report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancel Student Office Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Student Paid Single Small
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentPaidSingleSmall()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;

        $report = $this->getFeePaymentReportById($id, false);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-paid.student_paid_single_small', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Cancel Student Office Small')),
        //     view('pdf.fee.fee-paid.student_paid_single_small', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Cancel Student Office Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }


    /**
     * Student Paid Small
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentPaidSmall()
    {
        $id = isset($_COOKIE['feeId']) ? $_COOKIE['feeId'] : null;

        $report = $this->getFeePaymentReportById($id, false);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-paid.student_paid_small', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Student Paid Small')),
        //     view('pdf.fee.fee-paid.student_paid_small', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Student Paid Small') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }

    /**
     * Print Paid Large
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printPaidLarge($id)
    {
        $report = $this->getFeePaymentReportById($id, false);

        if (empty($report)) {
            abort(404);
        }

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

        return view('pdf.fee.fee-paid.student_paid_large2', ['report' => $report, 'schoolData' => $schoolData]);

        // $storage = Storage::disk('local');
        // $storage->makeDirectory('invoices');

        // $content = Pdf::generate(
        //     Str::slug(__('Print Paid Large')),
        //     view('pdf.fee.fee-paid.student_paid_large2', ['report' => $report, 'schoolData' => $schoolData])->render(),
        //     view('pdf.empty_header')->render(),
        //     view('pdf.empty_footer')->render()
        // );

        // $pdf_name = 'printProgressReport4';

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
        //         'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Print Paid Large') . ' ' . $pdf_name)) . '.pdf' . '"',
        //     ]
        // );
    }


    /*
    * Print student payment receipt
    */
    public function printPaymentReceipt()
    {
        $reportId = $this->feePaymentMethodRepository->getLastPaymentReportId()?->id ?? null;

        if ($reportId != null) {
            $report = $this->getFeePaymentReportById($reportId, false);

            if (empty($report)) {
                abort(404);
            }

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

            $feeReceiptPageSize = getSiteSettingData('fee_receipt_page_size') != null ? getSiteSettingData('fee_receipt_page_size')->value : "Small";
            $feeReceiptCopy = getSiteSettingData('fee_receipt_copy') != null ? getSiteSettingData('fee_receipt_copy')->value : "Single";

            $view = "";
            if ($feeReceiptPageSize == "Small" && $feeReceiptCopy != "Single") {
                $view = 'pdf.fee.fee-paid.student_paid_small';
            } else if ($feeReceiptPageSize == "Small" && $feeReceiptCopy == "Single") {
                $view = 'pdf.fee.fee-paid.student_paid_single_small';
            } else if ($feeReceiptPageSize == "Large" && $feeReceiptCopy != "Single") {
                $view = 'pdf.fee.fee-paid.student_paid_large';
            } else if ($feeReceiptPageSize == "Large" && $feeReceiptCopy == "Single") {
                $view = 'pdf.fee.fee-paid.student_paid_single_large';
            }

            if ($view != "") {
                return view($view, ['report' => $report, 'schoolData' => $schoolData]);
            }
        }
    }


    /**
     * Print Student fee agreement
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentFeeAgreement(Request $request)
    {
        $schoolData = [];
        $reports = [];

        $guardian = $request->guardian ?? "";
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;
        $studentStatus = $request->student_status ?? "";
        $agreementDate = !empty($request->date) ? Carbon::parse($request->date)->format('d-M-Y') : Carbon::now()->format('d-M-Y');

        if (!empty($guardian) && !empty($classroomId) && !empty($studentId)) {
            $reports = $this->getStudentFeeAgreementData($studentId, $studentStatus);
        }

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'title' => $schoolData->title
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Fee Agreement'));
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

        $pdf->writeHTML(view('pdf.fee.fee-agreement.print_student_fee_agreement', ['reports' => $reports, 'schoolData' => $schoolData, 'agreementDate' => $agreementDate])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }


    /**
     * Print student fee details
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentFeeDetails(Request $request)
    {
        $schoolData = [];
        $reports = [];

        $guardian = $request->guardian ?? "";
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;
        $studentStatus = $request->student_status ?? "";
        $agreementDate = !empty($request->date) ? Carbon::parse($request->date)->format('d-M-Y') : Carbon::now()->format('d-M-Y');

        if (!empty($guardian) && !empty($classroomId) && !empty($studentId)) {
            $reports = $this->getStudentFeeDetails($studentId, $studentStatus);
        }

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Fee Details'));
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

        $pdf->writeHTML(view('pdf.fee.fee-agreement.print_student_fee_details', ['reports' => $reports, 'schoolData' => $schoolData, 'agreementDate' => $agreementDate])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }


    /**
     * Print student fee refund receipt
     * @param $id
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printFeeRefundReceipt(int $id)
    {
        $report = $this->getFeeRefundReportData($id);

        abort_if(empty($report), 404);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'street_address' => $schoolData->street_address,
            ];
        }

        return view('pdf.fee.fee-refund.fee_refund_receipt', ['report' => $report, 'schoolData' => $schoolData]);
    }

    /*
    *   download student ledger report
    */
    public function downloadStudentLedgerReport(Request $request)
    {
        $reports = $this->getStudentLedgerReportData($request);
        $studentLedgerReport = $reports['studentLedgerReport'] ?? [];
        $installmentWiseAmounts = $reports['installmentWiseAmounts'] ?? [];
        $schoolData = [];

        if (!empty($studentLedgerReport) && !empty($installmentWiseAmounts)) {
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
            Str::slug(__(' Student Ledger Report')),
            view('pdf.demand-slip.student_ledger_report', [
                'studentLedgerReport' => $studentLedgerReport,
                'installmentWiseAmounts' => $installmentWiseAmounts,
                'schoolData' => $schoolData
            ])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = '';

        $file = 'student-ledger-report' . DIRECTORY_SEPARATOR . $pdf_name . '.pdf';
        $storage->put($file, encrypt($content));

        abort_if(empty($file) || !$storage->exists($file), 404);

        $pdfFile = decrypt($storage->get($file));

        return response()->make(
            $pdfFile,
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__(' Student Ledger Report') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }

    /*
    * helper function to get student ledger report data
    */
    private function getStudentLedgerReportData(Request $request)
    {
        $studentLedgerReport = [];
        $installmentWiseAmounts = [];
        $studentWiseAmounts = [];

        if (!empty($request->classroom_id) && !empty($request->from_id) && !empty($request->to_id)) {
            // get transport fee setting
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            $feeInstallments = $this->classFeeStudentAmountRepository->getStudentLedgerReport($request->classroom_id, $request->from_id, $request->to_id, $request->student_id ?? null, $request->student_status ?? "");

            $feeTypeInstallmentWiseAmounts = [];

            if (count($feeInstallments) > 0) {
                $studentFeeDiscounts = [];

                $feeInstallments = $feeInstallments->map(function ($feeInstallment) {
                    if ($feeInstallment?->student?->promotedClassroom != null) {
                        if (!empty($feeinstallment['student']['classroom'])) {
                            unset($feeinstallment['student']['classroom']);
                        }

                        $feeinstallment['student']['classroom_id'] = $feeInstallment?->student?->promotedClassroom?->id;
                        $feeinstallment['student']['classroom'] = $feeInstallment?->student?->promotedClassroom;
                    }

                    return $feeInstallment;
                });

                // if fee installments does not have any payment then based on transport fee and late fee setting late fine and transport fee will be included in fee installments.
                $this->processFeeInstallmentsLateFeeAndTransportFee($feeInstallments, $studentFeeDiscounts, $transportFeeStructureSetting);

                // to calculate fee installments amounts
                $this->processStudentLedgerReportFeeInstallmentsData(
                    $studentLedgerReport,
                    $installmentWiseAmounts,
                    $feeTypeInstallmentWiseAmounts,
                    $studentWiseAmounts,
                    $studentFeeDiscounts,
                    $feeInstallments
                );
            }

            // to calculate general voucher and transport voucher due
            if (!empty($request->voucher) && $request->voucher == true) {
                // general vouchers
                $generalVouchers = $this->studentFeeVoucherRepository->getStudentLedgerReportVouchers(
                    $request->classroom_id,
                    $request->student_id ?? null,
                    $request->student_status ?? ""
                );

                // if has any general voucher then calculate amount and merge data with studentLedgerReport
                $this->processStudentLedgerReportGeneralVouchersData(
                    $studentLedgerReport,
                    $installmentWiseAmounts,
                    $feeTypeInstallmentWiseAmounts,
                    $studentWiseAmounts,
                    $generalVouchers
                );

                // transport voucher
                $this->processStudentLedgerReportTransportVouchersData(
                    $studentLedgerReport,
                    $installmentWiseAmounts,
                    $feeTypeInstallmentWiseAmounts,
                    $studentWiseAmounts,
                    $transportFeeStructureSetting,
                    $request->classroom_id,
                    $request->student_id ?? null,
                    $request->student_status ?? ""
                );
            }

            foreach ($studentLedgerReport as $studentId => $studentReports) {
                foreach ($studentReports['reports'] as $feeTypeId => $groupedReports) {
                    $total_payable = 0;
                    $total_discount = 0;
                    $total_paid = 0;
                    $total_due = 0;

                    if (!empty($feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId])) {
                        foreach ($feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId] as $amounts) {
                            $total_payable += $amounts['total_payable'] ?? 0;
                            $total_discount += $amounts['total_discount'] ?? 0;
                            $total_paid += $amounts['total_paid'] ?? 0;
                            $total_due += $amounts['total_due'] ?? 0;
                        }
                    }

                    $studentLedgerReport[$studentId]['reports'][$feeTypeId]['installment_wise_amounts'] = $feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId];
                    $studentLedgerReport[$studentId]['reports'][$feeTypeId]['total_payable'] = $total_payable;
                    $studentLedgerReport[$studentId]['reports'][$feeTypeId]['total_discount'] = $total_discount;
                    $studentLedgerReport[$studentId]['reports'][$feeTypeId]['total_paid'] = $total_paid;
                    $studentLedgerReport[$studentId]['reports'][$feeTypeId]['total_due'] = $total_due;
                }

                $studentLedgerReport[$studentId]['total_payable'] = $studentWiseAmounts[$studentId]['total_payable'];
                $studentLedgerReport[$studentId]['total_discount'] = $studentWiseAmounts[$studentId]['total_discount'];
                $studentLedgerReport[$studentId]['total_paid'] = $studentWiseAmounts[$studentId]['total_paid'];
                $studentLedgerReport[$studentId]['total_due'] = $studentWiseAmounts[$studentId]['total_due'];
            }
        }

        return [
            'installmentWiseAmounts' => $installmentWiseAmounts,
            'studentLedgerReport' => $studentLedgerReport,
        ];
    }

    /*
    * helper function to update student ledger report installment wise yearly due summary
    */
    private function updateLedgerReportInstallmentWiseAmounts(
        &$installmentWiseAmounts,
        $studentId,
        string $title,
        float|int $payableAmount,
        float|int $discountAmount,
        float|int $paidAmount,
        float|int $dueAmount
    ) {
        $installmentWiseAmounts[$studentId][$title]['total_payable'] = ($installmentWiseAmounts[$studentId][$title]['total_payable'] ?? 0) + $payableAmount;
        $installmentWiseAmounts[$studentId][$title]['total_discount'] = ($installmentWiseAmounts[$studentId][$title]['total_discount'] ?? 0) + $discountAmount;
        $installmentWiseAmounts[$studentId][$title]['total_paid'] = ($installmentWiseAmounts[$studentId][$title]['total_paid'] ?? 0) + $paidAmount;
        $installmentWiseAmounts[$studentId][$title]['total_due'] = ($installmentWiseAmounts[$studentId][$title]['total_due'] ?? 0) + $dueAmount;
    }

    /*
    *  helper function to update student ledger report fee type installment wise yearly due summary
    */
    private function updateLedgerReportFeeTypeInstallmentWiseAmounts(
        &$feeTypeInstallmentWiseAmounts,
        $studentId,
        int $feeTypeId,
        string $title,
        float|int $payableAmount,
        float|int $discountAmount,
        float|int $paidAmount,
        float|int $dueAmount
    ) {
        $feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_payable'] = ($feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_payable'] ?? 0) + $payableAmount;
        $feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_discount'] = ($feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_discount'] ?? 0) + $discountAmount;
        $feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_paid'] = ($feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_paid'] ?? 0) + $paidAmount;
        $feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_due'] = ($feeTypeInstallmentWiseAmounts[$studentId][$feeTypeId][$title]['total_due'] ?? 0) + $dueAmount;
    }

    /*
    * helper function to update student ledger report
    */
    private function updateLedgerReportData(&$studentLedgerReport, $studentId, int $feeTypeId, string $feeTypeTitle)
    {
        $studentLedgerReport[$studentId]['reports'][$feeTypeId] = [
            'fee_type_id' => $feeTypeId,
            'fee_type_title' => $feeTypeTitle,
        ];
    }

    /*
    * helper method to get fee installments transport fee and late fee
    */
    protected function processFeeInstallmentsLateFeeAndTransportFee(&$feeInstallments, &$studentFeeDiscounts, $transportFeeStructureSetting)
    {
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
    * helper method to process student ledger report fee installments data
    */
    protected function processStudentLedgerReportFeeInstallmentsData(
        &$studentLedgerReport,
        &$installmentWiseAmounts,
        &$feeTypeInstallmentWiseAmounts,
        &$studentWiseAmounts,
        $studentFeeDiscounts,
        $feeInstallments
    ) {
        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments as $feeInstallment) {
                // check if installment has nullify fee. if fee nullified then exclude the fee
                if (empty($feeInstallment['nullify_fee'])) {
                    $fee_amount = !empty($feeInstallment['semester']) ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $due_amount = $fee_amount;
                    $payable_amount = $fee_amount;
                    $paid_amount = 0;
                    $discount_amount = 0;

                    // check if installment has payment. if has payment then update due amount
                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $fee_amount - $discount_amount;
                    } elseif (!empty($studentFeeDiscounts[$feeInstallment['student_id']])) {
                        foreach ($studentFeeDiscounts[$feeInstallment['student_id']] as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] ?? 0 * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount ?? 0;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $payable_amount = $fee_amount - $discount_amount;
                            }
                        }
                    }

                    if (!empty($studentWiseAmounts[$feeInstallment['student_id']])) {
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_payable'] += $payable_amount;
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_discount'] += $discount_amount;
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_paid'] += $paid_amount;
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_due'] += $due_amount;
                    } else {
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_payable'] = $payable_amount;
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_discount'] = $discount_amount;
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_paid'] = $paid_amount;
                        $studentWiseAmounts[$feeInstallment['student_id']]['total_due'] = $due_amount;
                    }

                    // calculate and update fee amount installment wise
                    $this->updateLedgerReportInstallmentWiseAmounts(
                        $installmentWiseAmounts,
                        $feeInstallment['student_id'],
                        $feeInstallment['fee']['title'],
                        $payable_amount,
                        $discount_amount,
                        $paid_amount,
                        $due_amount
                    );

                    // calculate and update fee amount installment wise
                    $this->updateLedgerReportFeeTypeInstallmentWiseAmounts(
                        $feeTypeInstallmentWiseAmounts,
                        $feeInstallment['student_id'],
                        $feeInstallment['fee_type_id'],
                        $feeInstallment['fee']['title'],
                        $payable_amount,
                        $discount_amount,
                        $paid_amount,
                        $due_amount
                    );

                    // update headWiseSummary data
                    $this->updateLedgerReportData($studentLedgerReport, $feeInstallment['student_id'], $feeInstallment['fee_type_id'], $feeInstallment['feeType']['fee_type']);

                    if (!isset($studentLedgerReport[$feeInstallment['student_id']]['student'])) {
                        $studentLedgerReport[$feeInstallment['student_id']]['student'] = $feeInstallment['student']?->toArray();
                    }
                }
            }
        }
    }


    /*
    * helper method to process student ledger report general vouchers data
    */
    protected function processStudentLedgerReportGeneralVouchersData(
        &$studentLedgerReport,
        &$installmentWiseAmounts,
        &$feeTypeInstallmentWiseAmounts,
        &$studentWiseAmounts,
        $vouchers
    ) {
        if (count($vouchers) > 0) {
            foreach ($vouchers->groupBy('student_id') as $studentId => $studentVouchers) {
                foreach ($studentVouchers as $voucher) {
                    foreach ($voucher->feeTypeAmounts as $feeTypeAmount) {
                        $voucher_amount = (float) $feeTypeAmount->amount ?? 0;
                        $voucher_payable_amount = $voucher_amount;
                        $voucher_due_amount = $voucher_amount;
                        $voucher_discount_amount = 0;
                        $voucher_paid_amount = 0;;

                        // check if voucher has payment. if has payment then update due amount
                        if ($feeTypeAmount?->payment != null) {
                            $voucher_discount_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $voucher_paid_amount = (float) $feeTypeAmount?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $voucher_due_amount = $voucher_amount - $voucher_discount_amount - $voucher_paid_amount;
                            $voucher_payable_amount = $voucher_amount - $voucher_discount_amount;
                        }

                        if (!empty($studentWiseAmounts[$studentId])) {
                            $studentWiseAmounts[$studentId]['total_payable'] += $voucher_payable_amount;
                            $studentWiseAmounts[$studentId]['total_discount'] += $voucher_discount_amount;
                            $studentWiseAmounts[$studentId]['total_paid'] += $voucher_paid_amount;
                            $studentWiseAmounts[$studentId]['total_due'] += $voucher_due_amount;
                        } else {
                            $studentWiseAmounts[$studentId]['total_payable'] = $voucher_payable_amount;
                            $studentWiseAmounts[$studentId]['total_discount'] = $voucher_discount_amount;
                            $studentWiseAmounts[$studentId]['total_paid'] = $voucher_paid_amount;
                            $studentWiseAmounts[$studentId]['total_due'] = $voucher_due_amount;
                        }

                        // calculate and update fee amount installment wise
                        $this->updateLedgerReportInstallmentWiseAmounts(
                            $installmentWiseAmounts,
                            $studentId,
                            "Voucher",
                            $voucher_payable_amount,
                            $voucher_discount_amount,
                            $voucher_paid_amount,
                            $voucher_due_amount
                        );

                        // calculate and update fee amount installment wise
                        $this->updateLedgerReportFeeTypeInstallmentWiseAmounts(
                            $feeTypeInstallmentWiseAmounts,
                            $studentId,
                            $feeTypeAmount?->fee_type_id,
                            "Voucher",
                            $voucher_payable_amount,
                            $voucher_discount_amount,
                            $voucher_paid_amount,
                            $voucher_due_amount
                        );

                        // update headWiseSummary data
                        $this->updateLedgerReportData(
                            $studentLedgerReport,
                            $studentId,
                            $feeTypeAmount?->fee_type_id,
                            $feeTypeAmount?->feeType?->fee_type
                        );

                        if (!isset($studentLedgerReport[$studentId]['student'])) {
                            $studentLedgerReport[$studentId]['student'] = $voucher?->student?->toArray();
                        }
                    }
                }
            }
        }
    }

    /*
    * helper method to process student ledger report transport vouchers data
    */
    protected function processStudentLedgerReportTransportVouchersData(
        &$studentLedgerReport,
        &$installmentWiseAmounts,
        &$feeTypeInstallmentWiseAmounts,
        &$studentWiseAmounts,
        $transportFeeStructureSetting,
        $classroomId,
        $studentId = null,
        $studentStatus = ""
    ) {
        $students = $this->studentRepository->getStudentsByClassroomIdAndActiveStatus($classroomId, $studentStatus, $studentId);

        if ($students->count() > 0) {
            $students->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            }, 'promotedClassroom']);

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

                if (!empty($allocateTransport)) {
                    foreach ($allocateTransport as $allocate) {
                        $fee_amount = (float) $allocate->amount;
                        $payable_amount = $fee_amount;
                        $discount_amount = 0;
                        $paid_amount = 0;
                        $due_amount = $fee_amount;

                        if ($allocate?->payment != null) {
                            $discount_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                            $paid_amount = (float) $allocate?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                            $due_amount = $fee_amount - $discount_amount - $paid_amount;
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        if (!empty($studentWiseAmounts[$student->id])) {
                            $studentWiseAmounts[$student->id]['total_payable'] += $payable_amount;
                            $studentWiseAmounts[$student->id]['total_discount'] += $discount_amount;
                            $studentWiseAmounts[$student->id]['total_paid'] += $paid_amount;
                            $studentWiseAmounts[$student->id]['total_due'] += $due_amount;
                        } else {
                            $studentWiseAmounts[$student->id]['total_payable'] = $payable_amount;
                            $studentWiseAmounts[$student->id]['total_discount'] = $discount_amount;
                            $studentWiseAmounts[$student->id]['total_paid'] = $paid_amount;
                            $studentWiseAmounts[$student->id]['total_due'] = $due_amount;
                        }

                        // calculate and update fee amount installment wise
                        $this->updateLedgerReportInstallmentWiseAmounts(
                            $installmentWiseAmounts,
                            $student->id,
                            "Voucher",
                            $payable_amount,
                            $discount_amount,
                            $paid_amount,
                            $due_amount
                        );

                        // calculate and update fee amount installment wise
                        $this->updateLedgerReportFeeTypeInstallmentWiseAmounts(
                            $feeTypeInstallmentWiseAmounts,
                            $student->id,
                            $transportFeeType?->id ?? "",
                            "Voucher",
                            $payable_amount,
                            $discount_amount,
                            $paid_amount,
                            $due_amount
                        );

                        // update headWiseSummary data
                        $this->updateLedgerReportData(
                            $studentLedgerReport,
                            $student->id,
                            $transportFeeType?->id ?? "",
                            $transportFeeType?->fee_type ?? "Transport"
                        );

                        if (!isset($studentLedgerReport[$student->id]['student'])) {
                            $studentLedgerReport[$student->id]['student'] = $student?->toArray();
                        }
                    }
                }

                if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
                    if ($currentAllocateTransport != null) {
                        $fee_amount = (float) $currentAllocateTransport->amount;
                    } else {
                        $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
                    }

                    $payable_amount = $fee_amount;
                    $discount_amount = 0;
                    $paid_amount = 0;
                    $due_amount = $fee_amount;

                    foreach ($allocateTransportVouchers as $voucher) {
                        if (!empty($studentWiseAmounts[$student->id])) {
                            $studentWiseAmounts[$student->id]['total_payable'] += $payable_amount;
                            $studentWiseAmounts[$student->id]['total_discount'] += $discount_amount;
                            $studentWiseAmounts[$student->id]['total_paid'] += $paid_amount;
                            $studentWiseAmounts[$student->id]['total_due'] += $due_amount;
                        } else {
                            $studentWiseAmounts[$student->id]['total_payable'] = $payable_amount;
                            $studentWiseAmounts[$student->id]['total_discount'] = $discount_amount;
                            $studentWiseAmounts[$student->id]['total_paid'] = $paid_amount;
                            $studentWiseAmounts[$student->id]['total_due'] = $due_amount;
                        }

                        // calculate and update fee amount installment wise
                        $this->updateLedgerReportInstallmentWiseAmounts(
                            $installmentWiseAmounts,
                            $student->id,
                            "Voucher",
                            $payable_amount,
                            $discount_amount,
                            $paid_amount,
                            $due_amount
                        );

                        // calculate and update fee amount installment wise
                        $this->updateLedgerReportFeeTypeInstallmentWiseAmounts(
                            $feeTypeInstallmentWiseAmounts,
                            $student->id,
                            $transportFeeType?->id ?? "",
                            "Voucher",
                            $payable_amount,
                            $discount_amount,
                            $paid_amount,
                            $due_amount
                        );

                        // update headWiseSummary data
                        $this->updateLedgerReportData(
                            $studentLedgerReport,
                            $student->id,
                            $transportFeeType?->id ?? "",
                            $transportFeeType?->fee_type ?? "Transport"
                        );

                        if (!isset($studentLedgerReport[$student->id]['student'])) {
                            $studentLedgerReport[$student->id]['student'] = $student?->toArray();
                        }
                    }
                }
            }
        }
    }


    /**
     * helper method to get fee payment report by payment method id and format data
     * @param int $reportId  The id of the fee payment method.
     *
     * @return array The formatted fee payment report data.
     */
    protected function getFeePaymentReportById(int $reportId, bool $isCancelled = false)
    {
        $report = $this->feePaymentMethodRepository->getFeePaymentReportById($reportId);

        abort_if($isCancelled != $report?->is_cancelled, 404);

        $reportFeePayments = [];

        $total_amount = 0;
        $total_payable = 0;
        $total_paid = 0;
        $total_due = 0;
        $total_discount = 0;
        $receipt_note = "";

        if (count($report->fee_payments) > 0) {
            foreach ($report->fee_payments->groupBy('fee_type_id') as $feeTypeId => $payments) {
                $tempPaymentsArray = [];
                $total_fee_amount = 0;
                $total_payable_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                foreach ($payments as $payment) {
                    $tempPaymentsArray = [
                        'fee_type_id' => $feeTypeId,
                        'fee_type_title' => $payment?->feeType?->fee_type
                    ];

                    // calculate total amoun for each fee type
                    $total_fee_amount += (float) $payment->amount ?? 0;
                    $total_payable_amount += (float) $payment->payable_amount ?? 0;
                    $total_paid_amount += (float) $payment->paid_amount ?? 0;
                    $total_due_amount += (float) $payment->due_amount ?? 0;
                    $total_discount_amount += (float) $payment->discount_amount ?? 0;

                    // Determine the payment note based on the fee payment type and due status
                    $payment_note = '';

                    switch ($payment->fee_payment_type) {
                        case FeePaymentType::GENERALVOUCHER->value:
                            $payment_note = $payment->is_fee_due ? 'due voucher fee' : 'with voucher fee';
                            break;
                        case FeePaymentType::TRANSPORTVOUCHER->value:
                            $payment_note = $payment->is_fee_due ? 'due transport fee' : 'with transport fee';
                            break;
                        default:
                            $payment_note = $payment->is_fee_due ? 'against previous dues from' : 'for';
                            break;
                    }

                    // Construct receipt note
                    if (strlen($receipt_note) <= 0) {
                        $receipt_note = "Payment {$payment_note} {$payment->fee->title}";
                    } elseif (!strpos($receipt_note, $payment->fee->title)) {
                        $receipt_note .= ", {$payment_note} {$payment->fee->title}";
                    }
                }

                // calculate total amount
                $total_amount += $total_fee_amount;
                $total_payable += $total_payable_amount;
                $total_paid += $total_paid_amount;
                $total_due += $total_due_amount;
                $total_discount += $total_discount_amount;

                $tempPaymentsArray['amount'] = $total_fee_amount;
                $tempPaymentsArray['payable_amount'] = $total_payable_amount;
                $tempPaymentsArray['paid_amount'] = $total_paid_amount;
                $tempPaymentsArray['due_amount'] = $total_due_amount;
                $tempPaymentsArray['discount_amount'] = $total_discount_amount;

                $reportFeePayments[$feeTypeId] = $tempPaymentsArray;
            }
        }

        if ($report?->student?->promotedClassroom != null) {
            unset($report['student']['classroom']);

            $report['student']['classroom_id'] = $report?->student?->promotedClassroom?->id;
            $report['student']['classroom'] = $report?->student?->promotedClassroom;
        }

        $classroomId = $report['student']['classroom_id'];

        $report->loadMissing(['student.classroomRoll' => function ($query) use ($classroomId) {
            $query->where('classroom_id', $classroomId)
                ->select(
                    'id',
                    'classroom_id',
                    'student_id',
                    'roll_no',
                );
        }]);

        $student_total_due = $this->getStudentTotalDueAmountByStudentId($report->student_id);

        $report->makeHidden('fee_payments');
        $report = $report->toArray();

        $report['receipt_date'] = !empty($report['payment_date']) ? Carbon::parse($report['payment_date'])->format('d M, Y') : '';
        $report['receipt_title'] = $receipt_note;
        $report['total_amount'] = $total_amount;
        $report['total_payable_amount'] = $total_payable;
        $report['total_paid_amount'] = $total_paid;
        $report['total_paid_amount_in_word'] = Number::spell($total_paid) . " only";
        $report['total_due_amount'] = $total_due;
        $report['total_discount_amount'] = $total_discount;
        $report['payments'] = $reportFeePayments;
        $report['student_total_due'] = $student_total_due;

        return $report;
    }

    /**
     * helper method to get student due amount
     * @param int $studentId
     *
     * @return float|int
     */
    protected function getStudentTotalDueAmountByStudentId(int $studentId)
    {
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId);

        $total_due = 0;

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                $total_due_amount = 0;

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                if (!$hasPayment) {
                    $fee = $feeInstallments->first()->fee;

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
                                            $existedTransportFee = $feeInstallments->where('fee_type_id', $transportFee->id)->first();

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
                        $existedLateFee = $feeInstallments->where('fee_type_id', $lateFee->id)->first();

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
                                'nullify_fee' => null,
                            ]);

                            $feeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($feeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $paid_amount = 0;
                    $status = null;

                    if (!empty($feeInstallment['payment'])) {
                        $status = $feeInstallment?->payment?->payment_status;
                    }

                    // if (!empty($feeInstallment['fee_payments']) && $status != PaymentStatus::CANCELLED->value) {
                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                        $status = PaymentStatus::PAID->value;
                        // } elseif (!empty($feeInstallment['payment']) && $status != PaymentStatus::CANCELLED->value) {
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        // $due_amount = (float) $feeInstallment?->payment?->due_amount ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }
                            }
                        }
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $fee_amount - $discount_amount;
                        // $due_amount = $payable_amount;
                    }

                    $total_due_amount += $due_amount;
                }

                $total_due += $total_due_amount;
            }
        }

        // get transport voucher data and calculate due

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');
        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'voucher');
        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'voucher');
        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'voucher');

        $previousAllocateTransportId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->id ?? "";
        $previousAllocationVoucherId = !empty($currentAllocateTransport) ? "" : $previousAllocateTransport?->voucher_id;

        $currentAllocateVoucherId = $currentAllocateTransport != null ? $currentAllocateTransport->voucher_id : $previousAllocateTransport?->voucher_id ?? "";
        $deallocateVoucherId = $deallocateTransport != null ? $deallocateTransport->voucher_id : "";

        $allocateTransportVouchers = [];

        if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'voucher') {
            $allocateTransportVouchers = $this->voucherRepository->getAllBetweenCurrentAllocateAndDeallocate(
                $studentId,
                $currentAllocateVoucherId,
                $deallocateVoucherId
            );
        }

        $allocateTransport = $this->transportRepository->getStudentAllocateTransports(
            $studentId,
            $previousAllocateTransportId,
            $previousAllocationVoucherId,
            $deallocateVoucherId,
            $transportFeeStructureSetting?->value,
            'voucher'
        );

        if (!empty($allocateTransport)) {
            foreach ($allocateTransport as $allocate) {
                $due_amount = (float) $allocate->amount;

                // if ($allocate->payment != null && $allocate?->payment?->payment_status != PaymentStatus::CANCELLED->value) {
                if ($allocate->payment != null) {
                    // $due_amount = (float) $allocate->payment->due_amount ?? 0;
                    $discount_amount = (float) $allocate?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                    $paid_amount = (float) $allocate?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                    $due_amount = $due_amount - $discount_amount - $paid_amount;
                }

                $total_due += $due_amount;
            }
        }

        if (count($allocateTransportVouchers) > 0 && ($currentAllocateTransport != null || $previousAllocateTransport != null)) {
            if ($currentAllocateTransport != null) {
                $fee_amount = (float) $currentAllocateTransport->amount;
            } else {
                $fee_amount = (float) $previousAllocateTransport?->amount ?? 0;
            }

            foreach ($allocateTransportVouchers as $voucher) {
                $total_due += $fee_amount;
            }
        }

        // get general voucher all due
        $generalVouchers = $this->studentFeeVoucherRepository->getAllDueVouchersByStudentId($studentId);

        // calculate vouchers due
        $total_due += $this->calculateVoucherTotalDue($generalVouchers, 'general');

        return $total_due;
    }

    /*
    *   helper method to calculate voucher due data
    */
    private function calculateVoucherTotalDue($vouchers, $voucherType)
    {
        $totalDueAmount = 0;

        if (count($vouchers) > 0) {
            foreach ($vouchers as $voucher) {
                if ($voucherType == 'general') {
                    $due_amount = 0;

                    foreach ($voucher->feeTypeAmounts as $voucherAmountData) {
                        $amount = (float) $voucherAmountData->amount;

                        // if ($voucherAmountData->payment !== null && $voucherAmountData->payment->payment_status != PaymentStatus::CANCELLED->value) {
                        if ($voucherAmountData->payment !== null) {
                            // $amount = (float) $voucherAmountData->payment->due_amount;
                            $discount_amount = (float) $voucherAmountData?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                            $paid_amount = (float) $voucherAmountData?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                            $amount = $amount - $discount_amount - $paid_amount;
                        }

                        $due_amount += $amount;
                    }
                } else {
                    $due_amount = (float) $voucher->amount;

                    // if ($voucher->payment !== null && $voucher->payment->payment_status != PaymentStatus::CANCELLED->value) {
                    if ($voucher->payment !== null) {
                        // $due_amount = (float) $voucher->payment->due_amount;
                        $discount_amount = (float) $voucher?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $paid_amount = (float) $voucher?->fee_payments->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $due_amount = $due_amount - $discount_amount - $paid_amount;
                    }
                }

                $totalDueAmount += $due_amount;
            }
        }

        return $totalDueAmount;
    }

    /*
    * helper function to get student fee refund report data
    */
    private function getFeeRefundReportData(int $refundId)
    {
        $reportData = [];
        $feePaymentRefund = $this->feePaymentRefundMethodRepository->getFeeRefundReportById($refundId);

        if ($feePaymentRefund != null) {
            $total_refund = 0;

            if (count($feePaymentRefund->refund_amounts) > 0) {
                $feePaymentRefund->refund_amounts = $feePaymentRefund->refund_amounts->map(function ($refundAmount) use (&$total_refund) {
                    $total_refund += (float) $refundAmount?->refund_amount ?? 0;
                    $refundAmount['refund_amount'] = (float) $refundAmount?->refund_amount;
                    return $refundAmount;
                });
            }

            $reportData =  $feePaymentRefund->toArray();
            $reportData['refund_date'] = Carbon::parse($feePaymentRefund['refund_date'])->format('d-M-Y');
            $reportData['total_amount'] = $total_refund;
        }

        return $reportData;
    }


    /*
    * helper method to get student fee summary data
    */
    private function getStudentStudentFeeStructure(int $studentId, string $studentStatus)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId);

        $fees = $this->feeRepository->getActiveAll()->filter(function ($fee) use ($studentStatus) {
            if ($studentStatus === StudentStatus::NEW->value) {
                return $fee->is_admission_install == false;
            }

            return true;
        });

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $feeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;
                $total_payable_amount = 0;

                $feeTypeAmountDataArray = [];

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                if (!$hasPayment) {
                    $fee = $feeInstallments->first()->fee;

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
                                            $existedTransportFee = $feeInstallments->where('fee_type_id', $transportFee->id)->first();

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
                        $existedLateFee = $feeInstallments->where('fee_type_id', $lateFee->id)->first();

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
                                'nullify_fee' => null,
                            ]);

                            $feeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($feeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $paid_amount = 0;

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $due_amount = ($fee_amount - $discount_amount) - $paid_amount;
                        $payable_amount = $fee_amount - $discount_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $payable_amount = $fee_amount - $discount_amount;
                            }
                        }
                    }

                    $due_amount = ($fee_amount - $discount_amount) - $paid_amount;

                    $total_fee_amount += $fee_amount;
                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;
                    $total_payable_amount += $payable_amount;

                    $feeTypeAmountDataArray[] = [
                        'fee_type_title' => $feeInstallment['feeType']['fee_type'],
                        'amount' => $fee_amount,
                        'payable_amount' => $payable_amount,
                        'paid_amount' => $paid_amount,
                        'due_amount' => $due_amount,
                        'discount_amount' => $discount_amount
                    ];

                    if (!isset($feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee'])) {
                        $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee'] = [
                            'id' => $feeInstallment['fee_id'],
                            'title' => $feeInstallment['fee']['title'],
                            'last_pay_date' => !empty($feeInstallment['fee']['last_pay_date_at']) ? Carbon::parse($feeInstallment['fee']['last_pay_date_at'])->format('d-M-Y') : "",
                        ];
                    }
                }

                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_payable_amount'] = $total_payable_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData['feeInstallments'][$feeInstallmentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
            }
        }

        if (count($fees) > 0) {
            foreach ($fees as $fee) {
                if (empty($feeInstallmentsData['feeInstallments'][$fee->id])) {
                    $feeInstallmentsData['feeInstallments'][$fee->id]['fee'] = [
                        'id' => $fee?->id,
                        'title' => $fee?->title,
                        'last_pay_date' => !empty($fee?->last_pay_date_at) ? Carbon::parse($fee?->last_pay_date_at)->format('d-M-Y') : "",
                    ];

                    $feeInstallmentsData['feeInstallments'][$fee->id]['total_fee_amount'] = 0;
                    $feeInstallmentsData['feeInstallments'][$fee->id]['total_payable_amount'] = 0;
                    $feeInstallmentsData['feeInstallments'][$fee->id]['total_paid_amount'] = 0;
                    $feeInstallmentsData['feeInstallments'][$fee->id]['total_due_amount'] = 0;
                    $feeInstallmentsData['feeInstallments'][$fee->id]['total_discount_amount'] = 0;
                    $feeInstallmentsData['feeInstallments'][$fee->id]['fee_type_amounts'] = [];
                }
            }
        }

        if (!empty($feeInstallmentsData['feeInstallments'])) {
            ksort($feeInstallmentsData['feeInstallments']);
        }

        return $feeInstallmentsData;
    }


    /*
    * helper function to get student fee agreement data
    */
    private function getStudentFeeAgreementData(int $studentId, string $studentStatus = "")
    {
        $feeAgreementData = [];
        $feeTypeWiseAmounts = [];
        $installmentWiseAmounts = [];
        $students = collect([]);

        $student = $this->studentRepository->getStudentByIdAndStatus($studentId, $studentStatus);

        if ($student != null) {
            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            $students->push($student);

            $fatherName = $student?->father?->first_name ?? "";
            $fatherEmail = $student?->father?->email ?? "";
            $fatherPhone = $student?->father?->phone ?? "";

            $siblings = $this->studentRepository->getSiblingByStatusAndFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone, $studentStatus);

            $studentIds = [$student->id];

            if (!empty($siblings)) {
                $studentIds = array_merge($studentIds, $siblings->pluck('id')->toArray());

                $siblings->loadMissing(['promotedClassroom', 'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone']);

                $siblings = $siblings->map(function ($sibling) {
                    if ($sibling?->promotedClassroom != null) {
                        if (!empty($sibling['classroom'])) {
                            unset($sibling['classroom']);
                        }

                        $sibling['classroom_id'] = $sibling?->promotedClassroom?->id;
                        $sibling['classroom'] = $sibling?->promotedClassroom;
                    }
                });

                $students = $students->merge($siblings);
            }

            $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentIds($studentIds)->groupBy('student_id');
            $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentIds($studentIds);

            if (count($feeInstallments) > 0) {
                // merge late fee and transport fee
                $feeInstallments = $this->mergeFeeInstallmentsLateFeeAndTransportFee($feeInstallments);

                // format fee installmnets data
                foreach ($feeInstallments as $feeInstallment) {
                    $studentId = $feeInstallment['student_id'];
                    $feeId = $feeInstallment['fee_id'];
                    $feeTitle = $feeInstallment['fee']['title'] ?? "";
                    $feeTypeId = $feeInstallment['fee_type_id'];
                    $feeTypeTitle = $feeInstallment['feeType']['fee_type'] ?? "";

                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $paid_amount = 0;

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $payable_amount = $fee_amount - $discount_amount;
                    } elseif (!empty($studentFeeDiscounts[$studentId])) {
                        foreach ($studentFeeDiscounts[$studentId] as $discount) {
                            if ($discount->fee_id === $feeId && $discount->fee_type_id === $feeTypeId) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $payable_amount = $fee_amount - $discount_amount;
                            }
                        }
                    }

                    // calculate and update fee amount installment wise
                    if (!isset($installmentWiseAmounts[$studentId][$feeId]['title'])) {
                        $installmentWiseAmounts[$studentId][$feeId]['title'] = $feeTitle;
                    }

                    $installmentWiseAmounts[$studentId][$feeId]['amount'] = ($installmentWiseAmounts[$studentId][$feeId]['amount'] ?? 0) + $fee_amount;

                    // calculate and update fee amount installment wise
                    if (!isset($feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['title'])) {
                        $feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['title'] = $feeTitle;
                    }

                    $feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['amount'] = ($feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['amount'] ?? 0) + $fee_amount;
                    $feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['discount_amount'] = ($feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['discount_amount'] ?? 0) + $discount_amount;
                    $feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['payable_amount'] = ($feeTypeWiseAmounts[$studentId][$feeTypeId][$feeId]['payable_amount'] ?? 0) + $payable_amount;

                    // update fee agreement data
                    if (!isset($feeAgreementData['reports'][$studentId]['fee_type_wise_amounts'][$feeTypeId]['fee_type_title'])) {
                        $feeAgreementData['reports'][$studentId]['fee_type_wise_amounts'][$feeTypeId]['fee_type_title'] = $feeTypeTitle;
                    }
                }
            }

            // calculate reports total amount
            if (!empty($feeAgreementData['reports'])) {
                foreach ($feeAgreementData['reports'] as $studentId => $studentFeeData) {
                    $grand_total_amount = 0;
                    $grand_total_discount = 0;
                    $grand_total_payable = 0;

                    foreach ($studentFeeData['fee_type_wise_amounts'] as $feeTypeId => $groupedData) {
                        $total_amount = 0;
                        $total_discount = 0;
                        $total_payable = 0;

                        foreach ($feeTypeWiseAmounts[$studentId][$feeTypeId] as $amount) {
                            $total_amount += $amount['amount'] ?? 0;
                            $total_discount += $amount['discount_amount'] ?? 0;
                            $total_payable += $amount['payable_amount'] ?? 0;
                        }

                        $grand_total_amount += $total_amount;
                        $grand_total_discount += $total_discount;
                        $grand_total_payable += $total_payable;

                        ksort($feeTypeWiseAmounts[$studentId][$feeTypeId]);

                        $feeAgreementData['reports'][$studentId]['fee_type_wise_amounts'][$feeTypeId]['installment_wise_amounts'] = $feeTypeWiseAmounts[$studentId][$feeTypeId];
                        $feeAgreementData['reports'][$studentId]['fee_type_wise_amounts'][$feeTypeId]['total_amount'] = $total_amount;
                        $feeAgreementData['reports'][$studentId]['fee_type_wise_amounts'][$feeTypeId]['total_discount'] = $total_discount;
                        $feeAgreementData['reports'][$studentId]['fee_type_wise_amounts'][$feeTypeId]['total_payable'] = $total_payable;
                    }

                    ksort($installmentWiseAmounts[$studentId]);

                    $feeAgreementData['reports'][$studentId]['installment_wise_amounts'] = $installmentWiseAmounts[$studentId];
                    $feeAgreementData['reports'][$studentId]['total_amount'] = $grand_total_amount;
                    $feeAgreementData['reports'][$studentId]['total_discount'] = $grand_total_discount;
                    $feeAgreementData['reports'][$studentId]['total_payable'] = $grand_total_payable;
                }
            }

            // update fee summary report and student details
            if (!empty($feeAgreementData['reports']) && $students->count() > 0) {
                $feeSummaryReportData = [];

                // student details
                foreach ($students as $student) {
                    $fatherName = "";

                    if ($student?->father != null) {
                        $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                    }

                    $feeAgreementData['reports'][$student->id]['student'] = [
                        'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                        'father_name' => $fatherName,
                        'father_phone' => $student?->father?->phone ?? "",
                        'classroom_title' => $student?->classroom?->title ?? "",
                    ];
                }

                // fee summary report
                foreach ($feeAgreementData['reports'] as $studentId => $report) {
                    unset($report['fee_type_wise_amounts']);

                    $feeSummaryReportData['reports'][$studentId] = $report;
                    $feeSummaryReportData['total_amount'] = ($feeSummaryReportData['total_amount'] ?? 0) + $report['total_amount'];
                    $feeSummaryReportData['total_discount'] = ($feeSummaryReportData['total_discount'] ?? 0) + $report['total_discount'];
                    $feeSummaryReportData['total_payable'] = ($feeSummaryReportData['total_payable'] ?? 0) + $report['total_payable'];
                }

                $feeAgreementData['fee_summary_report'] = $feeSummaryReportData;

                // installment wise fee summary report
                if (!empty($installmentWiseAmounts)) {
                    foreach ($installmentWiseAmounts as $studentId => $studentInstallmentData) {
                        foreach ($studentInstallmentData as $feeId => $feeAmountItem) {
                            if (!isset($feeAgreementData['fee_summary_report']['installment_wise_amounts'][$feeId]['title'])) {
                                $feeAgreementData['fee_summary_report']['installment_wise_amounts'][$feeId]['title'] = $feeAmountItem['title'];
                            }

                            $feeAgreementData['fee_summary_report']['installment_wise_amounts'][$feeId]['total_amount'] = ($feeAgreementData['fee_summary_report']['installment_wise_amounts'][$feeId]['total_amount'] ?? 0) + $feeAmountItem['amount'];
                        }
                    }
                }

                // selected student details
                $fatherName = "";

                if ($student?->father != null) {
                    $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
                }

                $feeAgreementData['student'] = [
                    'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
                    'father_name' => $fatherName,
                    'father_phone' => $student?->father?->phone ?? "",
                    'address' => $student?->present_address ?? "",
                ];
            }
        }

        return $feeAgreementData;
    }

    /*
    * helper function to merge fee installments late fee and transport fee
    */
    private function mergeFeeInstallmentsLateFeeAndTransportFee($feeInstallments)
    {
        if (!empty($feeInstallments)) {
            foreach ($feeInstallments->groupBy('student_id') as $studentId => $studentInstallments) {
                foreach ($studentInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedInstallments) {
                    $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                    if (!$hasPayment) {
                        $fee = $groupedInstallments->first()->fee;

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
                                                $existedTransportFee = $groupedInstallments->where('fee_type_id', $transportFee->id)->first();

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
                            $existedLateFee = $groupedInstallments->where('fee_type_id', $lateFee->id)->first();

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
                                    'nullify_fee' => null,
                                ]);

                                $feeInstallments->push($newLateFee);
                            }
                        }
                    }
                }
            }
        }
        return $feeInstallments;
    }

    /*
    * helper function to get student fee details
    */
    private function getStudentFeeDetails(int $studentId, string $studentStatus = "")
    {
        $studentFeeDetails = [];

        $student = $this->studentRepository->getStudentByIdAndStatus($studentId, $studentStatus);

        if ($student != null) {
            $student->loadMissing(['promotedClassroom']);

            if ($student?->promotedClassroom != null) {
                unset($student['classroom']);

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            $studentFeeStructure = $this->getStudentStudentFeeStructure($student->id, $student->student_status);
        }

        if (!empty($studentFeeStructure['feeInstallments'])) {
            $total_amount = 0;
            $total_discount = 0;
            $total_payable = 0;

            foreach ($studentFeeStructure['feeInstallments'] as $installment) {
                $total_amount += $installment['total_fee_amount'] ?? 0;
                $total_discount += $installment['total_discount_amount'] ?? 0;
                $total_payable += $installment['total_payable_amount'] ?? 0;
            }

            $studentFeeDetails['report'] = $studentFeeStructure['feeInstallments'];
            $studentFeeDetails['student'] = $student->toArray();
            $studentFeeDetails['total_amount'] = $total_amount;
            $studentFeeDetails['total_discount'] = $total_discount;
            $studentFeeDetails['total_payable'] = $total_payable;
        }

        return $studentFeeDetails;
    }
}
