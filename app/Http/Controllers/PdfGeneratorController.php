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
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Repositories\IStudentRepository;
use App\Repositories\IClassroomRepository;
use Box\Spout\Common\Exception\IOException;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IClassroomAttendanceRepository;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;

final class PdfGeneratorController extends Controller
{

    public function __construct(
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
    ) {}


    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printRegistrationFeeReceipt($id)
    {
        $report = $this->getRegistrationFeePaymentReportById($id);

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

        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.invoice', ['order' => [], 'report' => $report, 'schoolData' => $schoolData])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = 'nasir2';

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


    /**
     * helper method to get registration fee payment report by payment id and format data
     * @param int $reportId  The id of the fregistration ee payment method.
     *
     * @return array The formatted registration fee payment report data.
     */
    protected function getRegistrationFeePaymentReportById(int $reportId)
    {
        $report = $this->feePaymentMethodRepository->getRegistrationFeePaymentReportById($reportId);
        $reportData = [];

        if ($report != null) {
            $reportData = [
                'fee_type_title' => 'Registration Fee',
                'amount' => $report?->fee_amount ?? 0,
                'registration_no' => $report?->registration_no,
                'student_name' => "{$report?->enquiry?->first_name} {$report?->enquiry?->middle_name} {$report?->enquiry?->last_name}",
                'father_name' => "{$report?->enquiry?->guardian?->father_first_name} {$report?->enquiry?->guardian?->father_middle_name} {$report?->enquiry?->guardian?->father_last_name}",
                'classroom_title' => $report?->enquiry?->className?->title,
                'payment_mode' => $report?->payment_mode,
                'receipt_no' => $report?->receipt_no,
                'receipt_date' => $report?->created_at->format('d M, Y'),
                'academic_session' => $report?->enquiry?->academicYear?->academic_session,
            ];
        }

        return $reportData;
    }
}
