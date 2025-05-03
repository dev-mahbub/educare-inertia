<?php

namespace App\Http\Controllers;


use Mpdf\Mpdf;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Repositories\IStaffRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\IGatePassRepository;

class PdfVisitorGatePassController extends Controller
{
    public function __construct(
        private IGatePassRepository $gatePassRepository,
        private IStaffRepository $staffRepository,
    ) {
        // do something
    }

    /*
    *  print staff details
    */
    public function printVisitorGatePass(int $id)
    {
        $studentGatePass =  $this->gatePassRepository->getById($id);
        $studentGatePass->load(['student' => function ($query) { 
            $query->with(['guardian','studentImage'])
                ->select('id', 'first_name', 'middle_name', 'last_name', 'classroom_id', 'email', 'phone', 'admission_no', 'present_address');
        }, 
        'visitorImage',
        'classroom' => function ($query) {
            $query->select('id', 'title');
        }]);

        $schoolData = [];

        if (!empty($studentGatePass)) {
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

        $gatePassSettings = getGatePassSettings();
        $getpassReceiptPageSize = $gatePassSettings['getpass_receipt_page_size'] ?? 'Large'; 

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Gate Pass'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        if(!empty($getpassReceiptPageSize) && $getpassReceiptPageSize == "Large")
        {
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

            $pdf->writeHTML(view('pdf.enquiry.visitor_enquiry_print', [
                'schoolData' => $schoolData,
                'studentGatePass' => $studentGatePass,
            ])->render());
        }else{
            $pdf = new Mpdf([
                'mode' => 'utf-8',
                'format' => [100, 200],
                'default_font_size' => 10,
                //'default_font' => 'chelvetica',
                'margin_left' => 2,
                'margin_right' => 2,
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

            $pdf->writeHTML(view('pdf.enquiry.visitor_enquiry_small_print', [
                'schoolData' => $schoolData,
                'studentGatePass' => $studentGatePass,
            ])->render());
        }

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }
}
