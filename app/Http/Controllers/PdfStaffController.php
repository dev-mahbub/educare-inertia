<?php

namespace App\Http\Controllers;


use Mpdf\Mpdf;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Repositories\IStaffRepository;
use Illuminate\Support\Facades\Storage;

class PdfStaffController extends Controller
{
    public function __construct(
        private IStaffRepository $staffRepository,
    ) {
        // do something
    }

    /*
    *  print staff details
    */
    public function printStaffDetails(int $id)
    {
        $staff = $this->staffRepository->getStaffDetailsData($id);
        $schoolData = [];

        if (!empty($staff)) {
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

        $title =  Str::slug(__('Teacher Data'));
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

        $pdf->writeHTML(view('pdf.teacher.teacher_print', [
            'schoolData' => $schoolData,
            'staff' => $staff,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }
}
