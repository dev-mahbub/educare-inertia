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

use App\Enums\GroupingType;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ClassroomRoll;
use App\Enums\CalculationType;
use App\Enums\ClassSubjectType;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Repositories\IExamRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\IClassroomRepository;
use Box\Spout\Common\Exception\IOException;
use PhpOffice\PhpSpreadsheet\Calculation\Calculation;
use App\Repositories\IResultCardConfigurationRepository;
use App\Repositories\ITeacherRepository;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\Exception\WriterNotOpenedException;

final class PdfAcademicController extends Controller
{

    public function __construct(
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IResultCardConfigurationRepository $resultCardConfigurationRepository,
        private IExamRepository $examRepository,
        private IAcademicRepository $academicRepository,
        private ITeacherRepository $teacherRepository,
    ) {}

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printProgressReport()
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.academic.progress_report_card', ['order' => []])->render(),
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

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printProgressReportTwo()
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.academic.progress_report_card_2', ['order' => []])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = 'printProgressReport';

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

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printProgressReportThree(Request $request)
    {
        abort_if(empty($request->classroom_id), 404);

        $students = $this->getStudentsDataByClassroomId($request->classroom_id);

        abort_if($students->count() == 0, 404);

        $className = null;
        $resultCardConfiguration = null;

        $className = $this->classroomRepository->getClassNameByClassroomId($request?->classroom_id);

        if (!empty($className)) {
            $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);

            if (!empty($resultCardConfiguration)) {
                $resultCardConfiguration->loadMissing([
                    'academicRemarks' => function ($query) use ($className) {
                        $query->where('academic_remarks.school_id', getUserSchoolId())
                            ->where('academic_remarks.academic_year_id', getAcademicYearId())
                            ->where('academic_remarks.class_name_id', $className?->id);
                    },
                    'examAttendances' => function ($query) use ($className) {
                        $query->where('exam_attendances.school_id', getUserSchoolId())
                            ->where('exam_attendances.academic_year_id', getAcademicYearId())
                            ->where('exam_attendances.class_name_id', $className?->id);
                    },
                    'board',
                    'images'
                ]);
            }
        }

        if (empty($resultCardConfiguration)) {
            return response()->json([
                "Status" => 400,
                "Error" => "Result card configuration settings is not created.."
            ]);
        }

        $academicGradeScales = [];

        if ($resultCardConfiguration?->board?->title != null) {
            $academicGradeScales = $this->getAcademicGradeScalesByTitle($resultCardConfiguration?->board?->title);
        }

        if (empty($academicGradeScales)) {
            $academicGradeScales = [
                [
                    'grade' => 'A1',
                    'min_mark' => 91,
                    'max_mark' => 100,
                ],
                [
                    'grade' => 'A2',
                    'min_mark' => 81,
                    'max_mark' => 90,
                ],
                [
                    'grade' => 'B1',
                    'min_mark' => 71,
                    'max_mark' => 80,
                ],
                [
                    'grade' => 'B2',
                    'min_mark' => 70,
                    'max_mark' => 61,
                ],
                [
                    'grade' => 'C1',
                    'min_mark' => 51,
                    'max_mark' => 60,
                ],
                [
                    'grade' => 'C2',
                    'min_mark' => 41,
                    'max_mark' => 50,
                ],
                [
                    'grade' => 'D',
                    'min_mark' => 33,
                    'max_mark' => 40,
                ],
                [
                    'grade' => 'E',
                    'min_mark' => 0,
                    'max_mark' => 32,
                ],
            ];
        }

        $reports = $this->getClassProgressReportData($students, $resultCardConfiguration, $academicGradeScales);
        $schoolData = $this->getSchoolData();
        $printDate = Carbon::now()->format('d-M-Y');

        $siteSettingsReportCard = getSiteSettingDataByType('Team Wise Report Card');

        $signatureImage = $siteSettingsReportCard['Team Wise Report Card']['digital_signature'] ?? "";
        $principalSignature = isValidImageUrl($signatureImage) ? $signatureImage : "";
        $waterMarkImage = $siteSettingsReportCard['Team Wise Report Card']['watermark_image'] ?? "";

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Academic Report Card'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 3,
            'margin_right' => 3,
            'margin_top' => 3,
            'margin_bottom' => 0,
            'margin_header' => 1,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->SetWatermarkImage($waterMarkImage);
        $pdf->showWatermarkImage = true;

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

        if (count($reports) > 0) {
            $count = 0;

            foreach ($reports as $report) {
                $count++;

                $pdf->writeHTML(view('pdf.academic.progress_report_card_3', [
                    'report' => $report,
                    'schoolData' => $schoolData,
                    'printDate' => $printDate,
                    'principalSignature' => $principalSignature,
                    'waterMarkImage' => $waterMarkImage,
                    'academicGradeScales' => $academicGradeScales,
                ])->render());

                if ($count != count($reports)) {
                    $pdf->AddPage();
                }
            }
        } else {
            $pdf->writeHTML(view('pdf.academic.progress_report_card_3', [
                'report' => [],
                'schoolData' => $schoolData,
                'printDate' => $printDate,
                'principalSignature' => $principalSignature,
                'waterMarkImage' => $waterMarkImage,
                'academicGradeScales' => $academicGradeScales,
            ])->render());
        }

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * @param $orderId
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printProgressReportFour()
    {
        $storage = Storage::disk('local');
        $storage->makeDirectory('invoices');

        $content = Pdf::generate(
            Str::slug(__('Invoice')),
            view('pdf.academic.progress_report_card_4', ['order' => []])->render(),
            view('pdf.empty_header')->render(),
            view('pdf.empty_footer')->render()
        );

        $pdf_name = 'printProgressReport4';

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

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printStudentProgressReport(Request $request)
    {
        abort_if(empty($request->student_ids), 404);

        $studentIds = json_decode($request->student_ids);

        $students = $this->getStudentsDataByIds($studentIds);

        abort_if(count($students) == 0, 404);

        $className = null;
        $resultCardConfiguration = null;
        $classroomId = $students?->first()?->classroom_id;

        if ($classroomId  != null) {
            $className = $this->classroomRepository->getClassNameByClassroomId($classroomId);
        }

        if (!empty($className)) {
            $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);

            if (!empty($resultCardConfiguration)) {
                $resultCardConfiguration->loadMissing([
                    'academicRemarks' => function ($query) use ($className) {
                        $query->where('academic_remarks.school_id', getUserSchoolId())
                            ->where('academic_remarks.academic_year_id', getAcademicYearId())
                            ->where('academic_remarks.class_name_id', $className?->id);
                    },
                    'examAttendances' => function ($query) use ($className) {
                        $query->where('exam_attendances.school_id', getUserSchoolId())
                            ->where('exam_attendances.academic_year_id', getAcademicYearId())
                            ->where('exam_attendances.class_name_id', $className?->id);
                    },
                    'board',
                    'images'
                ]);
            }
        }

        if (empty($resultCardConfiguration)) {
            return response()->json([
                "Status" => 400,
                "Error" => "Result card configuration settings is not created.."
            ]);
        }

        $academicGradeScales = [];

        if ($resultCardConfiguration?->board?->title != null) {
            $academicGradeScales = $this->getAcademicGradeScalesByTitle($resultCardConfiguration?->board?->title);
        }

        if (empty($academicGradeScales)) {
            $academicGradeScales = [
                [
                    'grade' => 'A1',
                    'min_mark' => 91,
                    'max_mark' => 100,
                ],
                [
                    'grade' => 'A2',
                    'min_mark' => 81,
                    'max_mark' => 90,
                ],
                [
                    'grade' => 'B1',
                    'min_mark' => 71,
                    'max_mark' => 80,
                ],
                [
                    'grade' => 'B2',
                    'min_mark' => 70,
                    'max_mark' => 61,
                ],
                [
                    'grade' => 'C1',
                    'min_mark' => 51,
                    'max_mark' => 60,
                ],
                [
                    'grade' => 'C2',
                    'min_mark' => 41,
                    'max_mark' => 50,
                ],
                [
                    'grade' => 'D',
                    'min_mark' => 33,
                    'max_mark' => 40,
                ],
                [
                    'grade' => 'E',
                    'min_mark' => 0,
                    'max_mark' => 32,
                ],
            ];
        }

        $reports = $this->getStudentsProgressReportData($students, $resultCardConfiguration, $academicGradeScales);
        $schoolData = $this->getSchoolData();
        $printDate = Carbon::now()->format('d-M-Y');

        $siteSettingsReportCard = getSiteSettingDataByType('Team Wise Report Card');

        $signatureImage = $siteSettingsReportCard['Team Wise Report Card']['digital_signature'] ?? "";
        $principalSignature = isValidImageUrl($signatureImage) ? $signatureImage : "";
        $waterMarkImage = $siteSettingsReportCard['Team Wise Report Card']['watermark_image'] ?? "";

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Academic Report Card'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 3,
            'margin_right' => 3,
            'margin_top' => 3,
            'margin_bottom' => 0,
            'margin_header' => 1,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->SetWatermarkImage($waterMarkImage);
        $pdf->showWatermarkImage = true;

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

        if (count($reports) > 0) {
            $count = 0;

            foreach ($reports as $report) {
                $count++;

                $pdf->writeHTML(view('pdf.academic.progress_report_card_3', [
                    'report' => $report,
                    'schoolData' => $schoolData,
                    'printDate' => $printDate,
                    'principalSignature' => $principalSignature,
                    'waterMarkImage' => $waterMarkImage,
                    'academicGradeScales' => $academicGradeScales,
                ])->render());

                if ($count != count($reports)) {
                    $pdf->AddPage();
                }
            }
        } else {
            $pdf->writeHTML(view('pdf.academic.progress_report_card_3', [
                'report' => [],
                'schoolData' => $schoolData,
                'printDate' => $printDate,
                'principalSignature' => $principalSignature,
                'waterMarkImage' => $waterMarkImage,
                'academicGradeScales' => $academicGradeScales,
            ])->render());
        }

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    public function printStudentProgressReportOld(Request $request)
    {
        abort_if(empty($request->student_id), 404);

        $student = $this->getStudentDataById($request->student_id);

        abort_if(empty($student), 404);

        $className = null;
        $resultCardConfiguration = null;

        if ($student?->classroom_id != null) {
            $className = $this->classroomRepository->getClassNameByClassroomId($student?->classroom_id);
        }

        if (!empty($className)) {
            $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);

            if (!empty($resultCardConfiguration)) {
                $resultCardConfiguration->loadMissing([
                    'academicRemarks' => function ($query) use ($student, $className) {
                        $query->where('academic_remarks.school_id', getUserSchoolId())
                            ->where('academic_remarks.academic_year_id', getAcademicYearId())
                            ->where('academic_remarks.class_name_id', $className?->id)
                            ->where('academic_remarks.student_id', $student->id);
                    },
                    'examAttendances' => function ($query) use ($student, $className) {
                        $query->where('exam_attendances.school_id', getUserSchoolId())
                            ->where('exam_attendances.academic_year_id', getAcademicYearId())
                            ->where('exam_attendances.class_name_id', $className?->id)
                            ->where('exam_attendances.student_id', $student->id);
                    },
                    'board'
                ]);
            }
        }

        if (empty($resultCardConfiguration)) {
            return response()->json([
                "Status" => 400,
                "Error" => "Result card configuration settings is not created.."
            ]);
        }

        $academicGradeScales = [];

        if ($resultCardConfiguration?->board?->title != null) {
            $academicGradeScales = $this->getAcademicGradeScalesByTitle($resultCardConfiguration?->board?->title);
        }

        if (empty($academicGradeScales)) {
            $academicGradeScales = [
                [
                    'grade' => 'A1',
                    'min_mark' => 91,
                    'max_mark' => 100,
                ],
                [
                    'grade' => 'A2',
                    'min_mark' => 81,
                    'max_mark' => 90,
                ],
                [
                    'grade' => 'B1',
                    'min_mark' => 71,
                    'max_mark' => 80,
                ],
                [
                    'grade' => 'B2',
                    'min_mark' => 70,
                    'max_mark' => 61,
                ],
                [
                    'grade' => 'C1',
                    'min_mark' => 51,
                    'max_mark' => 60,
                ],
                [
                    'grade' => 'C2',
                    'min_mark' => 41,
                    'max_mark' => 50,
                ],
                [
                    'grade' => 'D',
                    'min_mark' => 33,
                    'max_mark' => 40,
                ],
                [
                    'grade' => 'E',
                    'min_mark' => 0,
                    'max_mark' => 32,
                ],
            ];
        }

        $report = $this->getStudentProgressReportData($student, $resultCardConfiguration, $academicGradeScales);
        $schoolData = $this->getSchoolData();
        $printDate = Carbon::now()->format('d-M-Y');

        $siteSettingsReportCard = getSiteSettingDataByType('Team Wise Report Card');

        $principalSignature = $siteSettingsReportCard['Team Wise Report Card']['digital_signature'] ?? "";
        $waterMarkImage = $siteSettingsReportCard['Team Wise Report Card']['watermark_image'] ?? "";

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Academic Report Card'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 3,
            'margin_right' => 3,
            'margin_top' => 6,
            'margin_bottom' => 0,
            'margin_header' => 5,
            'margin_footer' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->SetWatermarkImage($waterMarkImage);
        $pdf->showWatermarkImage = true;

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

        $pdf->writeHTML(view('pdf.academic.progress_report_card_3', [
            'report' => $report,
            'schoolData' => $schoolData,
            'printDate' => $printDate,
            'principalSignature' => $principalSignature,
            'waterMarkImage' => $waterMarkImage,
            'academicGradeScales' => $academicGradeScales,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * helper method to get class progress report data
    */
    private function getClassProgressReportData(object $students, object $resultCardConfiguration, array $academicGradeScales = [])
    {
        $reports = [];

        if ($students->count() > 0) {
            foreach ($students as $student) {
                $studentReport = $this->getStudentProgressReportData($student, $resultCardConfiguration, $academicGradeScales);

                $reports[$student->id] = $studentReport;
            }
        }

        return $reports;
    }

    /*
    * helper method to get students progress report data
    */
    private function getStudentsProgressReportData(object $students, object $resultCardConfiguration, array $academicGradeScales = [])
    {
        $reports = [];

        if ($students->count() > 0) {
            foreach ($students as $student) {
                $studentReport = $this->getStudentProgressReportData($student, $resultCardConfiguration, $academicGradeScales);

                $reports[$student->id] = $studentReport;
            }
        }

        return $reports;
    }

    /*
    * helper method to get academic grade scale data
    */
    private function getAcademicGradeScalesByTitle(string $title)
    {
        $academicGradeScales = [];

        $academicGradeScale = $this->academicRepository->getAcademicGradeScaleByTitle($title);

        if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems?->count() > 0) {
            foreach ($academicGradeScale?->academicGradeItems as $gradeScaleItem) {
                $academicGradeScales[] = [
                    'grade' => $gradeScaleItem?->title ?? "",
                    'min_mark' => $gradeScaleItem?->min_mark ?? 0,
                    'max_mark' => $gradeScaleItem?->max_mark ?? 0,
                ];
            }
        }

        return  $academicGradeScales;
    }

    /*
    * helper method to get school data
    */
    private function getSchoolData()
    {
        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : [];

        if (!empty($schoolData)) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
                'affiliation_no' => $schoolData->affiliation_no,
                'phone' => $schoolData->phone,
                'phone_2' => $schoolData->phone_2,
                'mail' => $schoolData->mail,
                'street_address' => $schoolData->street_address,
                'school_number' => $schoolData->school_number,
            ];
        }

        return $schoolData;
    }

    /*
    * helper method to get student data by id
    */
    private function getStudentDataById(int $studentId)
    {
        $student = $this->studentRepository->getStudentById($studentId);

        if (!empty($student)) {
            $schoolId = getUserSchoolId();
            $academicYearId = getAcademicYearId();

            $student->loadMissing([
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                // 'classroomRoll:id,student_id,roll_no',
                'classroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'promotedClassroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'marks.exam',
                'marks.subject',
                'studentImage',
                'academicRank'
            ]);

            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            $classroomId = $student?->classroom_id;

            $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            }]);
        }

        return $student;
    }

    /*
    * helper method to get student data by classroom id
    */
    private function getStudentsDataByIds(array $ids)
    {
        $students = $this->studentRepository->getStudentsByIds($ids);

        if ($students->count() > 0) {
            $schoolId = getUserSchoolId();
            $academicYearId = getAcademicYearId();

            $students->loadMissing([
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                // 'classroomRoll:id,student_id,roll_no',
                'classroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'promotedClassroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'marks.exam',
                'marks.subject',
                'studentImage',
                'academicRank'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student['classroom_id'];

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->where('classroom_id', $classroomId);
                }]);

                return $student;
            });

            // old code
            // $students->loadMissing(['classroomRoll' => function ($query) {
            //     $query->where('academic_year_id', getAcademicYearId());
            // }]);

            // sort by classroom roll
            $students = $students->sortBy(function ($student) {
                return optional($student->classroomRoll)->roll_no;
            });
        }

        return $students;
    }

    /*
    * helper method to get student data by classroom id
    */
    private function getStudentsDataByClassroomId(int $classroomId)
    {
        $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

        if ($students->count() > 0) {
            $schoolId = getUserSchoolId();
            $academicYearId = getAcademicYearId();

            $students->loadMissing([
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                // 'classroomRoll:id,student_id,roll_no',
                'classroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'promotedClassroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'marks.exam',
                'marks.subject',
                'studentImage',
                'academicRank'
            ]);

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

            $students->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            }]);

            // sort by classroom roll
            $students = $students->sortBy(function ($student) {
                return optional($student->classroomRoll)->roll_no;
            });
        }

        return $students;
    }

    /*
    * helper method to get class progress report data
    */
    private function formatStudentData(object $student)
    {
        $fatherName = "";
        $motherName = "";

        if (!empty($student?->father)) {
            $fatherName = "{$student?->father?->first_name} {$student?->father?->middle_name} {$student?->father?->last_name}";
        }

        if (!empty($student?->father)) {
            $motherName = "{$student?->mother?->first_name} {$student?->mother?->middle_name} {$student?->mother?->last_name}";
        }

        $studentImage = $student?->studentImage?->path ?? "";
        $academicRank = $student?->academicRank?->rank ?? "";

        $studentData = [
            'name' => "{$student?->first_name} {$student?->middle_name} {$student?->last_name}",
            'admission_no' => $student?->admission_no,
            'roll_no' => $student?->classroomRoll?->roll_no,
            'classroom_title' => $student?->classroom?->title ?? "",
            'birth_date' => !empty($student?->birth_date_at) ? Carbon::parse($student?->birth_date_at)->format('d-M-Y') : '',
            'father_name' => $fatherName,
            'mother_name' => $motherName,
            'student_image' => $studentImage,
            'academic_rank' => $academicRank,
        ];

        return $studentData;
    }

    /*
    * helper method to get student progress report data
    */
    private function getStudentProgressReportData(object $student, object $resultCardConfiguration, array $academicGradeScales = [])
    {
        $report = [];

        $studentId = $student->id;

        $examGroups = $resultCardConfiguration?->examGroups?->whereNull('parent');
        $examGroups->load([
            'childrenGroups.childrenGroups.exam' => function ($query) use ($studentId) {
                $query->with(['marks' => function ($query) use ($studentId) {
                    $query->where('student_id', $studentId)
                        ->with(['grade', 'classroomSubject']);
                }]);
            },
            'childrenGroups.exam' => function ($query) use ($studentId) {
                $query->with(['marks' => function ($query) use ($studentId) {
                    $query->where('student_id', $studentId)
                        ->with(['grade', 'classroomSubject']);
                }]);
            }
        ]);

        $scholasticExamGroups = $examGroups->where('grouping_type', GroupingType::SCHOLASTIC->value);
        $coScholasticExamGroups = $examGroups->where('grouping_type', GroupingType::COSCHOLASTIC->value);
        $classroomSubjects = $student?->classroom?->classroomSubjects ?? [];
        $academicRemark = $resultCardConfiguration?->academicRemarks?->where('student_id', $student->id)?->first();
        $examAttendance = $resultCardConfiguration?->examAttendances?->where('student_id', $student->id)?->first();

        $report['academic_remark'] =  $academicRemark->remarks ?? "";
        $report['exam_attendance'] =  [
            'present_day' => number_format($examAttendance?->present_day) ?? "",
            'working_day' => number_format($examAttendance?->working_day) ?? "",
        ];

        if (!empty($classroomSubjects)) {
            $scholasticReport = [];
            $coScholasticReport = [];
            $optionalSubjectReport = [];
            $parentGroups = [];
            $childGroups = [];
            $grandTotalFullMark = 0;
            $grandTotalMarkObtained = 0;
            $totalExams = 0;
            $showTotalMark = false;
            $showGrade = false;
            $showPercentage = false;
            $showRank = false;
            $showTotal = false;
            $showAffiliationNo = false;
            $showSchoolCode = false;
            $showDateOfBirth = false;
            $showPrintDate = false;
            $showCbseLogo = false;
            $showIcseLogo = false;
            $showGradingScale = false;
            $affiliatedTitle = '';
            $showOptionalSubject = false;

            foreach ($classroomSubjects as $classroomSubject) {
                $academicGradeScaleMap = [];
                $subject =  $classroomSubject?->subject;

                if ($subject != null) {
                    $academicGradeScale = $classroomSubject?->academic_grade;

                    if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems->count() > 0) {
                        foreach ($academicGradeScale?->academicGradeItems as $gradeItem) {
                            $academicGradeScaleMap[] = [
                                'grade' => $gradeItem?->title,
                                'min_mark' => $gradeItem?->min_mark,
                                'max_mark' => $gradeItem?->max_mark,
                            ];
                        }
                    }

                    // scholastic report data
                    if ($subject->is_co_scholastic == "No") {
                        $subjectWiseGroupReport = $this->getAndFormatGroupWiseReport(
                            $parentGroups,
                            $childGroups,
                            $grandTotalFullMark,
                            $grandTotalMarkObtained,
                            $totalExams,
                            $showTotalMark,
                            $showGrade,
                            $showPercentage,
                            $showRank,
                            $showTotal,
                            $showAffiliationNo,
                            $showSchoolCode,
                            $showDateOfBirth,
                            $showPrintDate,
                            $showCbseLogo,
                            $showIcseLogo,
                            $showGradingScale,
                            $affiliatedTitle,
                            $showOptionalSubject,
                            $scholasticExamGroups,
                            $classroomSubject,
                            $academicGradeScaleMap,
                            $student,
                            $subject,
                            'scholastic'
                        );

                        if ($classroomSubject?->type == ClassSubjectType::OPTIONAL->value) {
                            $optionalSubjectReport['subject_reports'][$subject->id] = [
                                'subject_id' => $subject->id,
                                'subject_name' => $subject->title,
                            ];

                            $optionalSubjectReport['subject_reports'][$subject->id]['group_wise_report'] = $subjectWiseGroupReport;
                        } else {
                            $scholasticReport['subject_reports'][$subject->id] = [
                                'subject_id' => $subject->id,
                                'subject_name' => $subject->title,
                            ];

                            $scholasticReport['subject_reports'][$subject->id]['group_wise_report'] = $subjectWiseGroupReport;
                        }
                    }

                    // co-scholastic report data
                    if ($subject->is_co_scholastic == "Yes") {
                        $subjectWiseGroupReport = $this->getAndFormatGroupWiseReport(
                            $parentGroups,
                            $childGroups,
                            $grandTotalFullMark,
                            $grandTotalMarkObtained,
                            $totalExams,
                            $showTotalMark,
                            $showGrade,
                            $showPercentage,
                            $showRank,
                            $showTotal,
                            $showAffiliationNo,
                            $showSchoolCode,
                            $showDateOfBirth,
                            $showPrintDate,
                            $showCbseLogo,
                            $showIcseLogo,
                            $showGradingScale,
                            $affiliatedTitle,
                            $showOptionalSubject,
                            $coScholasticExamGroups,
                            $classroomSubject,
                            $academicGradeScaleMap,
                            $student,
                            $subject,
                            'co_scholastic'
                        );

                        $coScholasticReport['subject_reports'][$subject->id] = [
                            'subject_id' => $subject->id,
                            'subject_name' => $subject->title,
                        ];

                        $coScholasticReport['subject_reports'][$subject->id]['group_wise_report'] = $subjectWiseGroupReport;
                    }
                }
            }

            $totalPercentage = $this->calculatePercentage($grandTotalMarkObtained, $grandTotalFullMark);

            // $overallGrade = $this->calculateOverallGrade($grandTotalMarkObtained, $totalExams);
            $overallGrade = $this->calculateOverallGrade($grandTotalMarkObtained, $grandTotalFullMark, $academicGradeScales);

            // scholastic
            if (!empty($childGroups['scholastic'])) {
                foreach ($childGroups['scholastic'] as $parentGroupId => $groups) {
                    foreach ($groups as $childGroupId =>  $group) {
                        $totalMark = $group['total_mark'] ?? 0;
                        $totalFullMark = $group['total_full_mark'] ?? 0;
                        $childGroups['scholastic'][$parentGroupId][$childGroupId]['overall_grade'] = $this->calculateOverallGrade($totalMark, $totalFullMark, $academicGradeScales);
                        $childGroups['scholastic'][$parentGroupId][$childGroupId]['overall_percentage'] = $this->calculatePercentage($totalMark, $totalFullMark);
                    }
                }
            }

            // optional subject
            if (!empty($childGroups['optional_subject'])) {
                foreach ($childGroups['optional_subject'] as $parentGroupId => $groups) {
                    foreach ($groups as $childGroupId =>  $group) {
                        $totalMark = $group['total_mark'] ?? 0;
                        $totalFullMark = $group['total_full_mark'] ?? 0;
                        $childGroups['optional_subject'][$parentGroupId][$childGroupId]['overall_grade'] = $this->calculateOverallGrade($totalMark, $totalFullMark, $academicGradeScales);
                        $childGroups['optional_subject'][$parentGroupId][$childGroupId]['overall_percentage'] = $this->calculatePercentage($totalMark, $totalFullMark);
                    }
                }
            }

            $scholasticReport['parentGroups'] = $parentGroups['scholastic'] ?? [];
            $scholasticReport['childGroups'] = $childGroups['scholastic'] ?? [];
            $coScholasticReport['parentGroups'] = $parentGroups['co_scholastic'] ?? [];
            $coScholasticReport['childGroups'] = $childGroups['co_scholastic'] ?? [];
            $optionalSubjectReport['parentGroups'] = $parentGroups['optional_subject'] ?? [];
            $optionalSubjectReport['childGroups'] = $childGroups['optional_subject'] ?? [];

            $report['scholastic_report'] = $scholasticReport;
            $report['co_scholastic_report'] = $coScholasticReport;
            $report['optional_subject_report'] = $optionalSubjectReport;
            $report['total_mark_obtained'] = $grandTotalMarkObtained;
            $report['total_mark'] = $grandTotalFullMark;
            $report['overall_grade'] = $overallGrade;
            $report['total_percentage'] = $totalPercentage;
            $report['show_total_mark'] = $showTotalMark;
            $report['show_percentage'] = $showPercentage;
            $report['show_grade'] = $showGrade;
            $report['show_rank'] = $showRank;
            $report['show_total'] = $showTotal;
            $report['show_affiliation_no'] = $showAffiliationNo;
            $report['show_school_code'] = $showSchoolCode;
            $report['show_date_of_birth'] = $showDateOfBirth;
            $report['show_print_date'] = $showPrintDate;
            $report['show_cbse_logo'] = $showCbseLogo;
            $report['show_icse_logo'] = $showIcseLogo;
            $report['show_grading_scale'] = $showGradingScale;
            $report['affiliated_title'] = $affiliatedTitle;
            $report['show_optional_subject'] = $showOptionalSubject;

            $cbseLogo = $resultCardConfiguration?->images?->where('name', 'cbse_image')?->first();
            $icseLogo = $resultCardConfiguration?->images?->where('name', 'icse_image')?->first();

            $report['cbse_logo'] = $cbseLogo->path ?? "";
            $report['icse_logo'] = $icseLogo->path ?? "";
        }

        $studentData = $this->formatStudentData($student);

        $report = array_merge($report, $studentData);

        return $report;
    }

    /*
    * helper method to get academic grade
    */
    private function getGrade($mark, $gradeMap)
    {
        // $mark = is_string($mark) ? intval($mark) : $mark;
        $mark = is_string($mark) ? (float) $mark : $mark;
        $mark = floor($mark);

        foreach ($gradeMap as $gradeItem) {
            if ($mark >= $gradeItem['min_mark'] && $mark <= $gradeItem['max_mark']) {
                return $gradeItem['grade'];
            }
        }

        return "";
    }

    /*
    * helper method to calculate mark percentage
    */
    protected function calculatePercentage($marksObtained, $totalMarks)
    {
        // $marksObtained = is_string($marksObtained) ? intval($marksObtained) : $marksObtained;
        // $totalMarks = is_string($totalMarks) ? intval($totalMarks) : $totalMarks;
        $marksObtained = is_string($marksObtained) ? (float) $marksObtained : $marksObtained;
        $totalMarks = is_string($totalMarks) ? (float) $totalMarks : $totalMarks;

        if ($totalMarks == 0) {
            return 0; // Return 0 if total marks is 0
        }

        // Calculate percentage
        $percentage = ($marksObtained / $totalMarks) * 100;

        // Round the percentage to two decimal places
        return round($percentage, 2);
    }

    /*
    * helper method to calculate overall grade
    */
    protected function calculateOverallGrade($marksObtained, $totalMarks, $academicGradeScales)
    {
        // $marksObtained = is_string($marksObtained) ? intval($marksObtained) : $marksObtained;
        // $totalMarks = is_string($totalMarks) ? intval($totalMarks) : $totalMarks;
        $marksObtained = is_string($marksObtained) ? (float) $marksObtained : $marksObtained;
        $totalMarks = is_string($totalMarks) ? (float) $totalMarks : $totalMarks;

        // $gradeScaleMap = [
        //     [
        //         'grade' => 'A1',
        //         'min_mark' => 91,
        //         'max_mark' => 100,
        //     ],
        //     [
        //         'grade' => 'A2',
        //         'min_mark' => 81,
        //         'max_mark' => 90,
        //     ],
        //     [
        //         'grade' => 'B1',
        //         'min_mark' => 71,
        //         'max_mark' => 80,
        //     ],
        //     [
        //         'grade' => 'B2',
        //         'min_mark' => 70,
        //         'max_mark' => 61,
        //     ],
        //     [
        //         'grade' => 'C1',
        //         'min_mark' => 51,
        //         'max_mark' => 60,
        //     ],
        //     [
        //         'grade' => 'C2',
        //         'min_mark' => 41,
        //         'max_mark' => 50,
        //     ],
        //     [
        //         'grade' => 'D',
        //         'min_mark' => 33,
        //         'max_mark' => 40,
        //     ],
        //     [
        //         'grade' => 'E',
        //         'min_mark' => 0,
        //         'max_mark' => 32,
        //     ],
        // ];

        // if ($totalExams == 0) {
        //     return "";
        // }

        // $averageMark = $marksObtained / $totalExams;

        if ($totalMarks == 0) {
            return 0; // Return 0 if total marks is 0
        }

        // Calculate percentage
        $percentage = round(($marksObtained / $totalMarks) * 100, 2);

        $grade = $this->getGrade($percentage, $academicGradeScales);

        return $grade;
    }

    /*
    * helper method to get mark
    */
    protected function getMark($examGroup, $academicGradeScaleMap, $markItem, $examRoaster)
    {
        $mark = "";

        if ($examGroup->calculation_type == CalculationType::GRADE->value) {
            if (!empty($markItem?->classroomSubject) && $markItem?->classroomSubject?->is_marking == false) {
                $mark = $markItem?->grade?->title ?? "";
            } else {
                $mark = $markItem?->mark ?? 0;
                $fullMark = $examRoaster?->full_mark ?? 0;

                $percentage = $this->calculatePercentage($mark, $fullMark);
                $grade = $this->getGrade($percentage, $academicGradeScaleMap);

                $mark = $grade;
            }
        } else if ($examGroup->calculation_type == CalculationType::MARKS->value) {
            // $mark =   $markItem?->mark ?? "";
            $mark = $examGroup->weightage > 0 && ($markItem?->mark ?? 0) > 0 ? ($examGroup->weightage / 100) * $markItem->mark : '';

            if ($mark != "") {
                $mark = (float) str_replace('.00', ".0", number_format($mark, 2));
            }
        } else if ($examGroup->calculation_type == CalculationType::PERCENTAGE->value) {
            $mark =  $markItem?->mark ?? 0;
            $totalMark = $examRoaster?->full_mark ?? 0;
            $percentage = $this->calculatePercentage($mark, $totalMark);
            $mark = $percentage;
        }

        return $mark;
    }

    /*
    * helper method to get obtained mark
    */
    protected function getObtainedMark($markItem)
    // protected function getObtainedMark($markItem, $childGroup)
    {
        $mark = $markItem?->mark ?? 0;

        if ($mark != "" || $mark != 0) {
            $mark = (float) str_replace('.00', ".0", number_format($mark, 2));
        }

        return $mark;
    }

    /*
    * helper method to get total mark
    */
    protected function getTotalMark($examGroup, $classroomSubject, $academicGradeScaleMap, $studentId, $subjectId, $classroomId)
    {
        $mark = "";
        $markObtained = 0;
        $totalMark = 0;

        if ($examGroup?->childrenGroups?->count() > 0) {
            foreach ($examGroup?->childrenGroups as $subChildGroup) {
                $markItem = $subChildGroup?->exam?->marks->where('student_id', $studentId)->where('subject_id', $subjectId)->where('classroom_id', $classroomId)->first();
                $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $subChildGroup?->exam_id)?->first();
                // $markObtained += $markItem?->mark ?? 0;
                // $totalMark += $examRoaster?->full_mark ?? 0;

                $markObtained += $subChildGroup->weightage > 0 && ($markItem?->mark ?? 0) > 0 ? ($subChildGroup->weightage / 100) * $markItem?->mark : 0;
                $totalMark += $subChildGroup->weightage > 0 && ($examRoaster?->full_mark ?? 0) > 0 ? ($subChildGroup->weightage / 100) * $examRoaster?->full_mark : 0;
            }
        }

        if ($markObtained > 0) {
            $markObtained = (float) str_replace('.00', ".0", number_format($markObtained, 2));
        } else {
            $markObtained = "";
        }

        if ($examGroup->calculation_type == CalculationType::GRADE->value) {
            // $averageMark = $markObtained / $examGroup?->childrenGroups->count();
            // $grade = $this->getGrade($averageMark, $academicGradeScaleMap);
            $percentage = $this->calculatePercentage($markObtained, $totalMark);
            $grade = $this->getGrade($percentage, $academicGradeScaleMap);

            $mark = $grade;
        } else if ($examGroup->calculation_type == CalculationType::PERCENTAGE->value) {
            $markObtained = $markObtained == "" ? 0 : $markObtained;
            $percentage = $this->calculatePercentage($markObtained, $totalMark);
            $mark = $percentage;
        } else if (strtolower($examGroup?->title) == 'max marks') {
            if ($totalMark > 0) {
                $totalMark = (float) str_replace('.00', ".0", number_format($totalMark, 2));
            } else {
                $totalMark = "";
            }

            $mark = $totalMark;
        } else {
            $mark = $markObtained;
        }

        return $mark;
    }

    /*
    * helper method to get total obtained mark
    */
    protected function getTotalObtainedMark($examGroup, $studentId, $subjectId, $classroomId)
    {
        $mark = 0;
        $markObtained = 0;

        if ($examGroup?->childrenGroups?->count() > 0) {
            foreach ($examGroup?->childrenGroups as $subChildGroup) {
                $markItem = $subChildGroup?->exam?->marks->where('student_id', $studentId)->where('subject_id', $subjectId)->where('classroom_id', $classroomId)->first();

                // $markObtained += $markItem?->mark ?? 0;
                $markObtained += $subChildGroup->weightage > 0 && ($markItem?->mark ?? 0) > 0 ? ($subChildGroup->weightage / 100) * $markItem?->mark : 0;
            }
        }

        if ($markObtained > 0) {
            $markObtained = (float) str_replace('.00', ".0", number_format($markObtained, 2));
        } else {
            $markObtained = 0;
        }

        $mark = $markObtained;

        return $mark;
    }

    /*
    * helper method to get total full mark
    */
    protected function getTotalFullMark($examGroup, $classroomSubject)
    {
        $fullMark = 0;
        $totalMark = 0;

        if ($examGroup?->childrenGroups?->count() > 0) {
            foreach ($examGroup?->childrenGroups as $subChildGroup) {
                $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $subChildGroup?->exam_id)?->first();

                // $totalMark += $examRoaster?->full_mark ?? 0;
                $totalMark += $subChildGroup->weightage > 0 && ($examRoaster?->full_mark ?? 0) > 0 ? ($subChildGroup->weightage / 100) * $examRoaster?->full_mark : 0;
            }
        }

        if ($totalMark > 0) {
            $totalMark = (float) str_replace('.00', ".0", number_format($totalMark, 2));
        } else {
            $totalMark = "";
        }

        $fullMark = $totalMark;

        return $fullMark;
    }

    /*
    * helper method to calculate total full mark
    */
    protected function calculateTotalFullMark($examGroup, $classroomSubject)
    {
        $totalMark = 0;

        $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $examGroup?->exam_id)?->first();

        // $totalMark += $examRoaster?->full_mark ?? 0;

        if ($examGroup?->childrenGroups?->count() > 0) {
            foreach ($examGroup?->childrenGroups as $subChildGroup) {
                $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $subChildGroup?->exam_id)?->first();

                // $totalMark += $examRoaster?->full_mark ?? 0;
                $totalMark += $subChildGroup->weightage > 0 && ($examRoaster?->full_mark ?? 0) > 0 ? ($subChildGroup->weightage / 100) * $examRoaster?->full_mark : 0;
            }
        }

        if ($totalMark > 0) {
            $totalMark = (float) str_replace('.00', "", number_format($totalMark, 2));
        }

        return $totalMark;
    }

    /*
    * helper method to calculate total full mark
    */
    protected function calculateTotalMarkObtained($examGroup, $studentId, $subjectId, $classroomId)
    {
        $markObtained = 0;

        $markItem = $examGroup?->exam?->marks->where('student_id', $studentId)->where('subject_id', $subjectId)->where('classroom_id', $classroomId)->first();

        // $markObtained += $markItem?->mark ?? 0;

        if ($examGroup?->childrenGroups?->count() > 0) {
            foreach ($examGroup?->childrenGroups as $subChildGroup) {
                $markItem = $subChildGroup?->exam?->marks->where('student_id', $studentId)->where('subject_id', $subjectId)->where('classroom_id', $classroomId)->first();

                // $markObtained += $markItem?->mark ?? 0;
                $markObtained += $subChildGroup->weightage > 0 && ($markItem?->mark ?? 0) > 0 ? ($subChildGroup->weightage / 100) * $markItem?->mark : 0;
            }
        }

        if ($markObtained > 0) {
            $markObtained = (float) str_replace('.00', "", number_format($markObtained, 2));
        }

        return $markObtained;
    }

    /*
    * helper method to get and format exam group wise academic report data
    */
    protected function getAndFormatGroupWiseReport(
        &$parentGroups,
        &$childGroups,
        &$grandTotalFullMark,
        &$grandTotalMarkObtained,
        &$totalExams,
        &$showTotalMark,
        &$showGrade,
        &$showPercentage,
        &$showRank,
        &$showTotal,
        &$showAffiliationNo,
        &$showSchoolCode,
        &$showDateOfBirth,
        &$showPrintDate,
        &$showCbseLogo,
        &$showIcseLogo,
        &$showGradingScale,
        &$affiliatedTitle,
        &$showOptionalSubject,
        $examGroups,
        $classroomSubject,
        $academicGradeScaleMap,
        $student,
        $subject,
        $type
    ) {
        $subjectWiseGroupReport = [];

        $groupingType = "";

        if ($type == 'scholastic') {
            $groupingType = GroupingType::SCHOLASTIC->value;
        } else if ($type == 'co_scholastic') {
            $groupingType = GroupingType::COSCHOLASTIC->value;
        }

        if (!empty($examGroups)) {
            foreach ($examGroups as $group) {
                // check if group is scholastic
                if ($group->grouping_type == $groupingType) {
                    if ($classroomSubject?->type == ClassSubjectType::OPTIONAL->value) {
                        $parentGroups['optional_subject'][$group->id]['title'] = $group->title;
                    } else {
                        $parentGroups[$type][$group->id]['title'] = $group->title;
                    }

                    $subjectWiseGroupReport[$group->id]['title'] = $group->title;

                    if ($type == 'scholastic') {
                        if ($group?->is_grand_total_row_to_be_show == true) {
                            $showTotalMark = true;
                        }

                        if ($group?->is_grand_grade_row_to_be_show == true) {
                            $showGrade = true;
                        }

                        if ($group?->is_grand_percentage_row_to_be_show == true) {
                            $showPercentage = true;
                        }

                        if ($group?->is_rank_to_be_given == true) {
                            $showRank = true;
                        }

                        if ($group?->show_total == true) {
                            $showTotal = true;
                        }

                        if ($group?->show_affiliation_no == true) {
                            $showAffiliationNo = true;
                        }

                        if ($group?->show_school_code == true) {
                            $showSchoolCode = true;
                        }

                        if ($group?->show_date_of_birth == true) {
                            $showDateOfBirth = true;
                        }

                        if ($group?->show_print_date == true) {
                            $showPrintDate = true;
                        }

                        if ($group?->show_cbse_logo == true) {
                            $showCbseLogo = true;
                        }

                        if ($group?->show_icse_logo == true) {
                            $showIcseLogo = true;
                        }

                        if ($group?->show_grading_scale == true) {
                            $showGradingScale = true;
                        }

                        $affiliatedTitle = $group?->affiliated_title ?? '';

                        if ($group?->show_optional_subject == true) {
                            $showOptionalSubject = true;
                        }
                    }

                    // if group has children groups then proceed
                    if (!empty($group?->childrenGroups)) {
                        // $group['childrenGroups'] = $group->childrenGroups->sortBy('display_order');

                        $sortedChildrenGroups = $group->childrenGroups->sortBy('display_order');

                        foreach ($sortedChildrenGroups as $childGroup) {
                            if ($childGroup->grouping_type == $groupingType) {
                                $markItem = $childGroup?->exam?->marks?->where('student_id', $student->id)->where('subject_id', $subject->id)->where('classroom_id', $student->classroom_id)->first();
                                $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $childGroup?->exam_id)?->first();

                                $fullMark = 0;
                                $obtainedMark = 0;
                                // get mark or grade based on calculation type
                                // if ($childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'full marks') {
                                if ($childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'max marks') {
                                    $mark = $examRoaster?->full_mark ?? 0;
                                } else if ($markItem?->is_present == false) {
                                    $mark = "AB";
                                } else {
                                    $mark = $this->getMark($childGroup, $academicGradeScaleMap, $markItem, $examRoaster);
                                    $obtainedMark = $this->getObtainedMark($markItem);
                                    // $obtainedMark = $this->getObtainedMark($markItem, $childGroup);
                                }

                                if ($type == 'scholastic') {
                                    // $fullMark = $examRoaster?->full_mark ?? 0;
                                    $fullMark = $childGroup->weightage > 0 && ($examRoaster?->full_mark ?? 0) > 0 ? ($childGroup->weightage / 100) * $examRoaster?->full_mark : 0;
                                }

                                //calculate total mark or grade
                                if ($childGroup?->childrenGroups->count() > 0) {
                                    $mark = $this->getTotalMark($childGroup, $classroomSubject, $academicGradeScaleMap, $student->id, $subject->id, $student->classroom_id);

                                    if ($type == 'scholastic') {
                                        $fullMark = $this->getTotalFullMark($childGroup, $classroomSubject);
                                        $obtainedMark = $this->getTotalObtainedMark($childGroup, $student->id, $subject->id, $student->classroom_id);
                                    }

                                    // if ($type == 'scholastic' && $childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'marks obtained') {
                                    if ($type == 'scholastic' && $childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'total marks' && $classroomSubject?->type == ClassSubjectType::COMPULSORY->value) {
                                        $totalExams = $childGroup?->childrenGroups->count();
                                        $grandTotalFullMark += $this->calculateTotalFullMark($childGroup, $classroomSubject);
                                        $grandTotalMarkObtained += $this->calculateTotalMarkObtained($childGroup, $student->id, $subject->id, $student->classroom_id);
                                    }
                                }

                                if ($fullMark != "" || $fullMark != 0) {
                                    $fullMark = (float) str_replace('.00', ".0", number_format((float)$fullMark, 2));
                                }

                                if ($classroomSubject?->type == ClassSubjectType::OPTIONAL->value) {
                                    $childGroups['optional_subject'][$group->id][$childGroup->id]['title'] = $childGroup->title;
                                    $childGroups['optional_subject'][$group->id][$childGroup->id]['mark'] = $mark == '' ? 0 : $mark;
                                    $childGroups['optional_subject'][$group->id][$childGroup->id]['calculation_type'] = $childGroup?->calculation_type;
                                } else {
                                    $childGroups[$type][$group->id][$childGroup->id]['title'] = $childGroup->title;
                                    $childGroups[$type][$group->id][$childGroup->id]['mark'] = $mark == '' ? 0 : $mark;
                                    $childGroups[$type][$group->id][$childGroup->id]['calculation_type'] = $childGroup?->calculation_type;
                                }

                                // calculate total mark of child group
                                if ($childGroup?->calculation_type == CalculationType::MARKS->value && $type == 'scholastic') {
                                    if ($classroomSubject?->type == ClassSubjectType::OPTIONAL->value) {
                                        $childGroups['optional_subject'][$group->id][$childGroup->id]['total_mark'] = ($childGroups['optional_subject'][$group->id][$childGroup->id]['total_mark'] ?? 0) + (is_string($mark) ? (float) $mark : $mark);
                                    } else {
                                        $childGroups[$type][$group->id][$childGroup->id]['total_mark'] = ($childGroups[$type][$group->id][$childGroup->id]['total_mark'] ?? 0) + (is_string($mark) ? (float) $mark : $mark);
                                    }
                                } else if ($childGroup?->calculation_type != CalculationType::MARKS->value && $type == 'scholastic') {
                                    if ($classroomSubject?->type == ClassSubjectType::OPTIONAL->value) {
                                        $childGroups['optional_subject'][$group->id][$childGroup->id]['total_mark'] = ($childGroups['optional_subject'][$group->id][$childGroup->id]['total_mark'] ?? 0) + (is_string($obtainedMark) ? (float) $obtainedMark : $obtainedMark);
                                    } else {
                                        $childGroups[$type][$group->id][$childGroup->id]['total_mark'] = ($childGroups[$type][$group->id][$childGroup->id]['total_mark'] ?? 0) + (is_string($obtainedMark) ? (float) $obtainedMark : $obtainedMark);
                                    }
                                }

                                // calculate total full mark of child group
                                if ($type == 'scholastic') {
                                    if ($classroomSubject?->type == ClassSubjectType::OPTIONAL->value) {
                                        $childGroups['optional_subject'][$group->id][$childGroup->id]['total_full_mark'] = ($childGroups['optional_subject'][$group->id][$childGroup->id]['total_full_mark'] ?? 0) + (is_string($fullMark) ? (float) $fullMark : $fullMark);
                                    } else {
                                        $childGroups[$type][$group->id][$childGroup->id]['total_full_mark'] = ($childGroups[$type][$group->id][$childGroup->id]['total_full_mark'] ?? 0) + (is_string($fullMark) ? (float) $fullMark : $fullMark);
                                    }
                                }

                                $subjectWiseGroupReport[$group->id]['child_groups'][$childGroup->id]['title'] = $childGroup->title;
                                $subjectWiseGroupReport[$group->id]['child_groups'][$childGroup->id]['mark'] = $mark == '' ? 0 : $mark;
                            }
                        }
                    }
                }
            }
        }

        return $subjectWiseGroupReport;
    }

    protected function getAndFormatGroupWiseReport_Old(
        &$parentGroups,
        &$childGroups,
        &$grandTotalFullMark,
        &$grandTotalMarkObtained,
        &$totalExams,
        &$showTotalMark,
        &$showGrade,
        &$showPercentage,
        &$showRank,
        &$showTotal,
        &$showAffiliationNo,
        &$showSchoolCode,
        &$showDateOfBirth,
        &$showPrintDate,
        &$showCbseLogo,
        &$showIcseLogo,
        &$showGradingScale,
        &$affiliatedTitle,
        $examGroups,
        $classroomSubject,
        $academicGradeScaleMap,
        $student,
        $subject,
        $type
    ) {
        $subjectWiseGroupReport = [];

        $groupingType = "";

        if ($type == 'scholastic') {
            $groupingType = GroupingType::SCHOLASTIC->value;
        } else if ($type == 'co_scholastic') {
            $groupingType = GroupingType::COSCHOLASTIC->value;
        }

        if (!empty($examGroups)) {
            foreach ($examGroups as $group) {
                // check if group is scholastic
                if ($group->grouping_type == $groupingType) {
                    $parentGroups[$type][$group->id]['title'] = $group->title;
                    $subjectWiseGroupReport[$group->id]['title'] = $group->title;

                    if ($type == 'scholastic') {
                        if ($group?->is_grand_total_row_to_be_show == true) {
                            $showTotalMark = true;
                        }

                        if ($group?->is_grand_grade_row_to_be_show == true) {
                            $showGrade = true;
                        }

                        if ($group?->is_grand_percentage_row_to_be_show == true) {
                            $showPercentage = true;
                        }

                        if ($group?->is_rank_to_be_given == true) {
                            $showRank = true;
                        }

                        if ($group?->show_total == true) {
                            $showTotal = true;
                        }

                        if ($group?->show_affiliation_no == true) {
                            $showAffiliationNo = true;
                        }

                        if ($group?->show_school_code == true) {
                            $showSchoolCode = true;
                        }

                        if ($group?->show_date_of_birth == true) {
                            $showDateOfBirth = true;
                        }

                        if ($group?->show_print_date == true) {
                            $showPrintDate = true;
                        }

                        if ($group?->show_cbse_logo == true) {
                            $showCbseLogo = true;
                        }

                        if ($group?->show_icse_logo == true) {
                            $showIcseLogo = true;
                        }

                        if ($group?->show_grading_scale == true) {
                            $showGradingScale = true;
                        }

                        $affiliatedTitle = $group?->affiliated_title ?? '';
                    }

                    // if group has children groups then proceed
                    if (!empty($group?->childrenGroups)) {
                        // $group['childrenGroups'] = $group->childrenGroups->sortBy('display_order');

                        $sortedChildrenGroups = $group->childrenGroups->sortBy('display_order');

                        foreach ($sortedChildrenGroups as $childGroup) {
                            if ($childGroup->grouping_type == $groupingType) {
                                $markItem = $childGroup?->exam?->marks?->where('student_id', $student->id)->where('subject_id', $subject->id)->where('classroom_id', $student->classroom_id)->first();
                                $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $childGroup?->exam_id)?->first();

                                $fullMark = 0;
                                $obtainedMark = 0;
                                // get mark or grade based on calculation type
                                // if ($childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'full marks') {
                                if ($childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'max marks') {
                                    $mark = $examRoaster?->full_mark ?? 0;
                                } else if ($markItem?->is_present == false) {
                                    $mark = "AB";
                                } else {
                                    $mark = $this->getMark($childGroup, $academicGradeScaleMap, $markItem, $examRoaster);
                                    $obtainedMark = $this->getObtainedMark($markItem);
                                    // $obtainedMark = $this->getObtainedMark($markItem, $childGroup);
                                }

                                if ($type == 'scholastic') {
                                    // $fullMark = $examRoaster?->full_mark ?? 0;
                                    $fullMark = $childGroup->weightage > 0 && ($examRoaster?->full_mark ?? 0) > 0 ? ($childGroup->weightage / 100) * $examRoaster?->full_mark : 0;
                                }

                                //calculate total mark or grade
                                if ($childGroup?->childrenGroups->count() > 0) {
                                    $mark = $this->getTotalMark($childGroup, $classroomSubject, $academicGradeScaleMap, $student->id, $subject->id, $student->classroom_id);

                                    if ($type == 'scholastic') {
                                        $fullMark = $this->getTotalFullMark($childGroup, $classroomSubject);
                                        $obtainedMark = $this->getTotalObtainedMark($childGroup, $student->id, $subject->id, $student->classroom_id);
                                    }

                                    // if ($type == 'scholastic' && $childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'marks obtained') {
                                    if ($type == 'scholastic' && $childGroup?->calculation_type == CalculationType::MARKS->value && strtolower($childGroup?->title) == 'total marks') {
                                        $totalExams = $childGroup?->childrenGroups->count();
                                        $grandTotalFullMark += $this->calculateTotalFullMark($childGroup, $classroomSubject);
                                        $grandTotalMarkObtained += $this->calculateTotalMarkObtained($childGroup, $student->id, $subject->id, $student->classroom_id);
                                    }
                                }

                                if ($fullMark != "" || $fullMark != 0) {
                                    $fullMark = (float) str_replace('.00', ".0", number_format((float)$fullMark, 2));
                                }

                                $childGroups[$type][$group->id][$childGroup->id]['title'] = $childGroup->title;
                                $childGroups[$type][$group->id][$childGroup->id]['mark'] = $mark == '' ? 0 : $mark;
                                $childGroups[$type][$group->id][$childGroup->id]['calculation_type'] = $childGroup?->calculation_type;

                                // calculate total mark of child group
                                if ($childGroup?->calculation_type == CalculationType::MARKS->value && $type == 'scholastic') {
                                    $childGroups[$type][$group->id][$childGroup->id]['total_mark'] = ($childGroups[$type][$group->id][$childGroup->id]['total_mark'] ?? 0) + (is_string($mark) ? (float) $mark : $mark);
                                } else if ($childGroup?->calculation_type != CalculationType::MARKS->value && $type == 'scholastic') {
                                    $childGroups[$type][$group->id][$childGroup->id]['total_mark'] = ($childGroups[$type][$group->id][$childGroup->id]['total_mark'] ?? 0) + (is_string($obtainedMark) ? (float) $obtainedMark : $obtainedMark);
                                }

                                // calculate total full mark of child group
                                if ($type == 'scholastic') {
                                    $childGroups[$type][$group->id][$childGroup->id]['total_full_mark'] = ($childGroups[$type][$group->id][$childGroup->id]['total_full_mark'] ?? 0) + (is_string($fullMark) ? (float) $fullMark : $fullMark);
                                }

                                $subjectWiseGroupReport[$group->id]['child_groups'][$childGroup->id]['title'] = $childGroup->title;
                                $subjectWiseGroupReport[$group->id]['child_groups'][$childGroup->id]['mark'] = $mark == '' ? 0 : $mark;
                            }
                        }
                    }
                }
            }
        }

        return $subjectWiseGroupReport;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printExamWiseReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $examId = $request->exam_id ?? null;
        $examWiseReport = [];
        $classroomTitle = "";
        $examTitle = "";

        if (!empty($classroomId) && !empty($examId)) {
            $examWiseReport = $this->getExamWiseReportData($classroomId, $examId);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $exam = $this->examRepository->getExamById($examId);

            $classroomTitle = $classroom?->title;
            $examTitle = $exam?->title;
        }

        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Exam Wise Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 3,
            'margin_right' => 3,
            'margin_top' => 6,
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

        $pdf->writeHTML(view('pdf.academic.exam_wise_report', [
            'examWiseReport' => $examWiseReport,
            'schoolData' => $schoolData,
            'classroomTitle' => $classroomTitle,
            'examTitle' => $examTitle,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  helper method to get exam wise report data
    */
    private function getExamWiseReportData(int $classroomId, int $examId)
    {
        $examWiseReportData = [];

        $examWiseReports = $this->classroomRepository->getExamWiseReport($classroomId, $examId);

        foreach ($examWiseReports->groupBy('student_id') as $studentId => $examWiseReport) {
            $total_mark = [];
            $subjectIds = [];

            foreach ($examWiseReport as $item) {
                if (!isset($data[$studentId]['student'])) {
                    $examWiseReportData['reports'][$studentId]['student'] = [
                        'admission_no' => $item->admission_no,
                        'roll_no' => $item->roll_no,
                        'student_name' => "{$item?->first_name} {$item?->middle_name} {$item?->last_name}",
                        'father_name' => "{$item?->father_first_name} {$item?->father_middle_name} {$item?->father_last_name}",
                    ];
                }

                $examWiseReportData['reports'][$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                if (!in_array($item?->subject_id, $subjectIds)) {
                    $subjectIds[] = $item?->subject_id;

                    $examWiseReportData['reports'][$studentId]['exams'][$item->exam_id]['subjects'][] = [
                        'subject_title' => $item->subject_title,
                        'mark' => $item?->is_present ? ($item->mark ?? '') : 'AB',
                    ];

                    $examSubjects[] = $item->subject_title;

                    $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + $item->mark ?? 0;
                }

                $examWiseReportData['reports'][$studentId]['exams'][$item->exam_id]['total_mark'] = $total_mark[$item->exam_id] ?? 0;
            }
        }

        $examWiseReportData['exam_subjects'] = array_unique($examSubjects);

        if (!empty($examWiseReportData['reports'])) {
            // sort reports by classroom roll
            usort($examWiseReportData['reports'], function ($a, $b) {
                $rollNoA = $a['student']['roll_no'] ?? null;
                $rollNoB = $b['student']['roll_no'] ?? null;

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

        return $examWiseReportData;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printFinalConsolidatedReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $finalConsolidatedReport = [];
        $classroomTitle = "";
        $teacherName = "";

        if (!empty($classroomId)) {
            $finalConsolidatedReport = $this->getFinalConsolidatedReportData($classroomId);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroom?->loadMissing(['classTeacher:id,first_name,middle_name,last_name']);
            $classroomTitle = $classroom?->title;
            $teacherName = $classroom?->classTeacher?->first_name . " " . $classroom?->classTeacher?->middle_name . " " . $classroom?->classTeacher?->last_name;
        }

        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Final Consolidated Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 3,
            'margin_right' => 3,
            'margin_top' => 6,
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

        $pdf->writeHTML(view('pdf.academic.final_consolidated_report', [
            'finalConsolidatedReport' => $finalConsolidatedReport,
            'schoolData' => $schoolData,
            'classroomTitle' => $classroomTitle,
            'teacherName' => $teacherName,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  helper method to get final consolidated report data
    */
    private function getFinalConsolidatedReportData(int $classroomId)
    {
        $finalConsolidatedReport = [];

        $consolids = $this->classroomRepository->getFinalConsolidatedReportData($classroomId);

        if (count($consolids) > 0) {
            $academicGradeScales = [];
            $resultCardConfiguration = null;
            $className = $this->classroomRepository->getClassNameByClassroomId($classroomId);

            if (!empty($className)) {
                $academicGradeScales = $this->getAcademicGradeScales($className->id);
                $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);

                if (!empty($resultCardConfiguration)) {
                    $resultCardConfiguration->loadMissing([
                        'examAttendances' => function ($query) use ($className) {
                            $query->where('exam_attendances.school_id', getUserSchoolId())
                                ->where('exam_attendances.academic_year_id', getAcademicYearId())
                                ->where('exam_attendances.class_name_id', $className?->id);
                        }
                    ]);
                }
            }

            $consolids = $consolids?->sortBy(['roll_no']);

            foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                $total_mark = [];
                $fullMarkArr = [];
                $subjectIds = [];

                $examAttendance = $resultCardConfiguration?->examAttendances?->where('student_id', $studentId)?->first();

                foreach ($consolid as $item) {
                    if (!isset($data[$studentId]['student'])) {
                        $finalConsolidatedReport['reports'][$studentId]['student'] = [
                            'admission_no' => $item->admission_no,
                            'roll_no' => $item->roll_no,
                            'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                        ];
                    }

                    if (empty($subjectIds[$item->exam_id]) || !in_array($item?->subject_id, $subjectIds[$item->exam_id])) {
                        $subjectIds[$item->exam_id][] = $item?->subject_id;

                        $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                        $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['subjects'][] = [
                            'subject_title' => $item->subject_title,
                            'mark' => $item?->is_co_scholastic == 'No' && $item?->is_marking == true ? $item->mark : $item?->grade,
                        ];

                        $finalConsolidatedReport['exam_subjects'][] = $item->subject_title;

                        if ($item?->is_co_scholastic == 'No' && $item?->is_marking == true) {
                            $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + ($item->mark ?? 0);
                            $fullMarkArr[$item->exam_id] = ($fullMarkArr[$item->exam_id] ?? 0) + ($item->full_mark ?? 0);

                            $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['total_mark'] = number_format($total_mark[$item->exam_id], 2);
                            $finalConsolidatedReport['reports'][$studentId]['exams'][$item->exam_id]['full_mark'] = number_format($fullMarkArr[$item->exam_id], 2);
                        }

                        $finalConsolidatedReport['reports'][$studentId]['grade'] = "";
                        $finalConsolidatedReport['reports'][$studentId]['percentage'] = "";

                        if (!isset($finalConsolidatedReport['reports'][$studentId]['rank'])) {
                            $finalConsolidatedReport['reports'][$studentId]['rank'] = $item?->rank;
                        }
                    }
                }

                if (!isset($finalConsolidatedReport['reports'][$studentId]['total_attendance'])) {
                    $finalConsolidatedReport['reports'][$studentId]['total_attendance'] = number_format($examAttendance?->present_day ?? 0, 2) . '/' . number_format($examAttendance?->working_day ?? 0, 2);
                }

                // calculate overall grade and percentage
                if (!empty($finalConsolidatedReport['reports'])) {
                    foreach ($finalConsolidatedReport['reports'] as $studentId => $report) {
                        if (!empty($report['exams'])) {
                            $grandTotalFullMark = 0;
                            $grandTotalMark = 0;

                            foreach ($report['exams'] as $examId => $exam) {
                                $totalMark = $exam['total_mark'] ?? 0;
                                $fullMark = $exam['full_mark'] ?? 0;
                                $percentage = $this->calculatePercentage($totalMark, $fullMark);
                                $grade = "";

                                if (count($academicGradeScales) >  0) {
                                    $grade = $this->getGrade($percentage, $academicGradeScales);
                                }

                                $finalConsolidatedReport['reports'][$studentId]['exams'][$examId]['grade'] = $grade;
                                $finalConsolidatedReport['reports'][$studentId]['exams'][$examId]['percentage'] = $percentage;

                                $grandTotalFullMark += $fullMark;
                                $grandTotalMark += $totalMark;
                            }

                            $overallPercentage = $this->calculatePercentage($grandTotalMark, $grandTotalFullMark);
                            $grade = "";

                            if (count($academicGradeScales) >  0) {
                                $grade = $this->getGrade($overallPercentage, $academicGradeScales);
                            }

                            $finalConsolidatedReport['reports'][$studentId]['grade'] = $grade;
                            $finalConsolidatedReport['reports'][$studentId]['percentage'] = $overallPercentage;
                            $finalConsolidatedReport['reports'][$studentId]['total_mark'] = number_format($grandTotalMark, 2);
                        }
                    }
                }
            }

            $finalConsolidatedReport['exam_subjects'] = !empty($finalConsolidatedReport['exam_subjects']) ? array_unique($finalConsolidatedReport['exam_subjects']) : [];
            $finalConsolidatedReport['reports'] = !empty($finalConsolidatedReport['reports']) ? array_values($finalConsolidatedReport['reports']) : [];
        }

        return $finalConsolidatedReport;
    }

    /*
    * helper method to get academic grade scale data
    */
    private function getAcademicGradeScales(int $classNameId)
    {
        $academicGradeScales = [];

        $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($classNameId);

        if (!empty($resultCardConfiguration)) {
            $resultCardConfiguration->loadMissing(['board']);
        }

        if ($resultCardConfiguration?->board?->title != null) {
            $academicGradeScale = $this->academicRepository->getAcademicGradeScaleByTitle($resultCardConfiguration?->board?->title);
        }

        if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems?->count() > 0) {
            foreach ($academicGradeScale?->academicGradeItems as $gradeScaleItem) {
                $academicGradeScales[] = [
                    'grade' => $gradeScaleItem?->title ?? "",
                    'min_mark' => $gradeScaleItem?->min_mark ?? 0,
                    'max_mark' => $gradeScaleItem?->max_mark ?? 0,
                ];
            }
        }

        if (empty($academicGradeScales)) {
            $academicGradeScales = [
                [
                    'grade' => 'A1',
                    'min_mark' => 91,
                    'max_mark' => 100,
                ],
                [
                    'grade' => 'A2',
                    'min_mark' => 81,
                    'max_mark' => 90,
                ],
                [
                    'grade' => 'B1',
                    'min_mark' => 71,
                    'max_mark' => 80,
                ],
                [
                    'grade' => 'B2',
                    'min_mark' => 70,
                    'max_mark' => 61,
                ],
                [
                    'grade' => 'C1',
                    'min_mark' => 51,
                    'max_mark' => 60,
                ],
                [
                    'grade' => 'C2',
                    'min_mark' => 41,
                    'max_mark' => 50,
                ],
                [
                    'grade' => 'D',
                    'min_mark' => 33,
                    'max_mark' => 40,
                ],
                [
                    'grade' => 'E',
                    'min_mark' => 0,
                    'max_mark' => 32,
                ],
            ];
        }

        return  $academicGradeScales;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printClassTimetableReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $shiftType = $request->shift_type ?? "";

        $timetables = $this->classroomRepository->getTimeTableActiveAll($shiftType, $classroomId);

        $teacherIds = $timetables->flatMap(function ($period) {
            return collect($period->subject->classroomSubjects ?? [])
                ->flatMap(function ($subject) {
                    $teachersData = json_decode($subject->teachers_data, true);
                    return collect($teachersData)->pluck('teacher_id');
                });
        })->unique()->values()->toArray();

        $teachers = $this->teacherRepository->getByIds($teacherIds)
            ->keyBy('id');

        $timeTablesWithTeachers = $timetables->map(function ($period) use ($teachers) {
            $periodData = $period->toArray();

            if (isset($period->subject->classroomSubjects)) {
                $teachersData = collect($period->subject->classroomSubjects)
                    ->map(function ($subject) use ($teachers) {
                        $teacherJson = json_decode($subject->teachers_data, true);

                        return collect($teacherJson)->map(function ($teacherData) use ($teachers) {
                            $teacherId = $teacherData['teacher_id'];
                            return array_merge(
                                $teacherData,
                                ['teacher_details' => $teachers[$teacherId] ?? null]
                            );
                        });
                    })->flatten(1);

                $periodData['teachers'] = $teachersData;
            }
            return $periodData;
        });

        $classroomTitle = "";

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
        }

        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Class Timetable Report'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 10,
            //'default_font' => 'chelvetica',
            'margin_left' => 3,
            'margin_right' => 3,
            'margin_top' => 6,
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

        $pdf->writeHTML(view('pdf.academic.class_timetable_report', [
            'schoolData' => $schoolData,
            'classTimeTables' => $timeTablesWithTeachers,
            'classroomTitle' => $classroomTitle,
            'shiftType' => $shiftType,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }
}
