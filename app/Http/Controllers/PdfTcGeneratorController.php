<?php

namespace App\Http\Controllers;

use URL;
use Mail;
use Storage;
use Exception;
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
use App\Repositories\ISchoolRepository;
use App\Repositories\IStudentRepository;
use Box\Spout\Common\Exception\IOException;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;

final class PdfTcGeneratorController extends Controller
{

    public function __construct(
        private IStudentRepository $studentRepository,
        private ISchoolRepository $schoolRepository,
    ) {
        // do something
    }

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function renderTcForm(int $id)
    {
        $student = $this->studentRepository->getById($id);
        $student->load([
            'father',
            'mother',
            'country',
            'classroom',
            'promotedClassroom',
            'schoolLogo',
            'schoolData',
            'studentTc'
        ]);

        if ($student?->promotedClassroom != null) {
            if (!empty($student['classroom'])) {
                unset($student['classroom']);
            }

            $student['classroom_id'] = $student?->promotedClassroom?->id;
            $student['classroom'] = $student?->promotedClassroom;
        }

        $schoolKey = $this->schoolRepository->getSchoolKeyByID($student->school_id);

        return view("pdf.tc.tc_form", compact("student", "schoolKey"));
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function renderBulkTcForm(Request $request)
    {
        $classroomId = $request->input('classroom_id') ?? '';
        $isDraft = $request->input('is_draft') ?? false;
        $isGenerated = $request->input('is_generated') ?? false;
        $studentIds = "";

        if (!empty($classroomId)) {
            $students = $this->studentRepository->getStudentsByClassroomIdAndTcStatus($classroomId, $isDraft, $isGenerated);

            if (count($students) > 0) {
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

                $studentIds = implode(',', $students->pluck('id')->toArray());
            } else {
                return response()->json(['error' => 'No Data Available']);
            }
        }

        $schoolKey = $this->schoolRepository->getSchoolKeyByID(getUserSchoolId());

        return view("pdf.tc.bulk_tc_form", compact("students", "schoolKey", 'classroomId', 'studentIds'));
    }

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printTcForm()
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.tc.tc_form', ['order' => []])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = 'printProgressReportWithGraph';

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
                'Content-Disposition' => 'attachment; filename="' . Str::ucfirst(Str::slug(__('Invoice') . ' ' . $pdf_name)) . '.pdf' . '"',
            ]
        );
    }
}
