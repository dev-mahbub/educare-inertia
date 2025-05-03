<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use App\Enums\Gender;
use Illuminate\Support\Str;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\Storage;
use App\Repositories\IStudentRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomAttendanceRepository;

class PdfStudentController extends Controller
{
    public function __construct(
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IReligionRepository $religionRepository,
        private ICategoryRepository $categoryRepository,
        private IClassroomAttendanceRepository $classroomAttendanceRepository
    ) {
        // do something
    }

    /*
    *  print class wise student list
    */
    public function printClassWiseStudentList(Request $request)
    {
        $classNameId = $request->input('class_name_id') ?? '';
        $classroomId = $request->input('classroom_id') ?? '';
        $searchValue = $request->input('search_value') ?? '';
        $studentActiveStatus = $request->input('type') ?? "";

        $allStudents = $this->studentRepository->getListForSummery($classNameId, $classroomId, $searchValue, $studentActiveStatus);

        $reports = $allStudents['students'] ?? [];

        $schoolData = [];
        $classNameTitle = "";

        if (!empty($classNameId)) {
            $classNameTitle = $this->classroomRepository->getClassNameTitleById($classNameId);
        }

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomTitleById($classroomId);

            $classNameTitle = $classroom?->title ?? "";
        }

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'title' => $schoolData->title,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student List'));
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

        $pdf->writeHTML(view('pdf.student.class_wise_student_list', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classNameTitle' => $classNameTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }


    /*
    *  print student age report
    */
    public function printStudentAgeReport(Request $request)
    {
        $selectedDate = !empty($request->input('selected_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('selected_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        $minAge = $request->input('min_age') ?? 0;
        $maxAge = $request->input('max_age') ?? 0;

        $reports = $this->getStudentAgeReportData(
            $selectedDate,
            $minAge,
            $maxAge
        );

        $schoolData = [];
        $reportDate = $selectedDate;

        if (!empty($reports)) {
            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'title' => $schoolData->title,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Age Report'));
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

        $pdf->writeHTML(view('pdf.student.student_age_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'reportDate' => $reportDate,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *   helper mehtod to get student age report data
    */
    private function getStudentAgeReportData(
        $selectedDate = "",
        $minAge = 0,
        $maxAge = 0
    ) {
        $students = $this->studentRepository->getActiveListForAgeReport($selectedDate, $minAge, $maxAge);

        $studentData = $students->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
            $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

            $birthDate = "";
            $age = "";
            $ageCloseTo = "0y";

            if (!empty($student?->birth_date_at)) {
                $birthDate = Carbon::parse($student?->birth_date_at)->format('d-M-Y');

                $dob = Carbon::parse($student?->birth_date_at);
                $now = Carbon::now();

                $ageYears = $dob->diff($now)->y;
                $ageMonths = $dob->diff($now)->m;
                $ageDays = $dob->diff($now)->d;

                $age = "{$ageYears}y, {$ageMonths}m, {$ageDays}d";

                if ($ageMonths >= 6) {
                    $ageCloseTo = ($ageYears + 1) . "y";
                } else {
                    $ageCloseTo = $ageYears . "y";
                }
            }

            return [
                'student_name' => $studentName,
                'roll_no' => $student?->classroomRoll?->roll_no,
                'admission_no' => $student?->admission_no,
                'classroom_title' => $student?->classroom?->title,
                'birth_date' => $birthDate,
                'age' => $age,
                'age_close_to' => $ageCloseTo,
                'father_name' => $fatherName,
            ];
        })->toArray();

        return $studentData;
    }

    /*
    *  print inactive student details
    */
    public function printInactiveStudentDetails(int $id)
    {
        $student = null;
        $schoolData = [];

        if (!empty($id)) {
            $student = $this->studentRepository->getInactiveStudentByIdForPrint($id);
        }

        if ($student != null) {
            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

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
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Details'));
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

        $pdf->writeHTML(view('pdf.student.inactive_student_details', [
            'student' => $student,
            'schoolData' => $schoolData
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }


    /*
    *  print student general report
    */
    public function printStudentGeneralReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentGeneralReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_general_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student general report data
    */
    public function getStudentGeneralReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");
                $motherName = ($student?->mother?->first_name ?? "") . " " . ($student?->mother?->middle_name ?? "") . " " . ($student?->mother?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'mother_name' => $motherName,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student birth date wise report
    */
    public function printStudentBirthDateWiseReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentBirthDateWiseReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_birth_date_wise_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student birth date wise report data
    */
    public function getStudentBirthDateWiseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'student_name' => $studentName,
                    'birth_date' => !empty($student->birth_date_at) ? Carbon::parse($student->birth_date_at)->format('d-M-Y') : "",
                    'admission_date' => !empty($student->admission_date_at) ? Carbon::parse($student->admission_date_at)->format('d-M-Y') : "",
                    'father_name' => $fatherName,
                    'father_phone' => $student?->father?->phone,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print student gender report
    */
    public function printStudentGenderReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentGenderReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_gender_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student gender report data
    */
    public function getStudentGenderReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'gender' => $student?->gender,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print student contact report
    */
    public function printStudentContactReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentContactReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_contact_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student contact report data
    */
    public function getStudentContactReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,sms_phone',
                'mother:id,student_id,guardian_type,phone',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'father_phone' => $student?->father?->phone,
                    'mother_phone' => $student?->mother?->phone,
                    'sms_phone' => $student?->father?->sms_phone,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student address report
    */
    public function printStudentAddressReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentAddressReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_address_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student address report data
    */
    public function getStudentAddressReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'address' => $student?->present_address,
                    'city' => $student?->present_city,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student email report
    */
    public function printStudentEmailReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentEmailReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_email_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student email report data
    */
    public function getStudentEmailReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,email',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'father_phone' => $student?->father?->phone,
                    'father_email' => $student?->father?->email,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student religion report
    */
    public function printStudentReligionReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentReligionReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_religion_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student religion report data
    */
    public function getStudentReligionReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'religion' => $student?->religion,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student category report
    */
    public function printStudentCategoryReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentCategoryReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_category_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student category report data
    */
    public function getStudentCategoryReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'student_category.category'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'category' => $student?->student_category?->category?->title,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student inactive report
    */
    public function printStudentInactiveReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = "Inactive";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentInactiveReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_inactive_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student inactive report data
    */
    public function getStudentInactiveReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print student sibling report
    */
    public function printStudentSiblingReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentSiblingReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_sibling_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student sibling report data
    */
    public function getStudentSiblingReportData(array $classroomIds, string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentSiblingReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) use ($status) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                $fatherName = $student?->father?->first_name ?? "";
                $fatherEmail = $student?->father?->email ?? "";
                $fatherPhone = $student?->father?->phone ?? "";

                $hasSibling = $this->studentRepository->checkSiblingByFatherInfo($student->id, $fatherName, $fatherEmail, $fatherPhone, $status);

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'id' => $student?->id,
                    'name' => $studentName,
                    'father_user_id' => $student?->father?->user_id,
                    'father_name' => $fatherName,
                    'father_email' => $fatherEmail,
                    'father_phone' => $fatherPhone,
                    'has_sibling' => $hasSibling,
                ];
            })->filter(function ($student) {
                return $student['has_sibling'] ?? false;
            })->sortBy('display_order');

            foreach ($students as $student) {
                if (!isset($reports[$student['father_name'] . "-" . $student['father_phone']])) {
                    $reports[$student['father_name'] . "-" . $student['father_phone']] = [
                        'parent_name' => $student['father_name'],
                        'parent_email' => $student['father_email'],
                        'parent_phone' => $student['father_phone'],
                    ];
                }

                if (!isset($reports[$student['father_name'] . "-" . $student['father_phone']]['students'][$student['id']])) {
                    $reports[$student['father_name'] . "-" . $student['father_phone']]['students'][$student['id']] = [
                        'student_name' => $student['name'] ?? "",
                        'admission_no' => $student['admission_no'] ?? "",
                        'roll_no' => $student['roll_no'] ?? "",
                        'class_name' => $student['classroom_title'] ?? "",
                    ];
                }
            }
        }

        return $reports;
    }


    /*
    *  print student house report
    */
    public function printStudentHouseReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentHouseReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_house_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student house report data
    */
    public function getStudentHouseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentHouseWiseReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'house' => $student?->student_house?->house?->name,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print new student report
    */
    public function printNewStudentReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getNewStudentReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.new_student_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get new student report data
    */
    public function getNewStudentReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getNewStudentReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $createdBy = ($student?->createdBy?->user?->first_name ?? "") . " " . ($student?->createdBy?->user?->middle_name ?? "") . " " . ($student?->createdBy?->user?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'admission_date' => !empty($student?->admission_date_at) ? Carbon::parse($student?->admission_date_at)->format('d-M-Y') : "",
                    'created_by' => $createdBy,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print old student report
    */
    public function printOldStudentReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getOldStudentReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.old_student_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get old student report data
    */
    public function getOldStudentReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getOldStudentReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                if ($student?->promoted_date_at != null) {
                    $promotedDate = Carbon::parse($student?->promoted_date_at)->format('d-M-Y');
                    $promotedBy = $student?->promoted_by;
                } else {
                    $promotedDate = !empty($student?->classroomStudent?->promoted_date_at) ? Carbon::parse($student?->classroomStudent?->promoted_date_at)->format('d-M-Y') : "";
                    $promotedBy = ($student?->classroomStudent?->user?->first_name ?? "") . " " . ($student?->classroomStudent?->user?->middle_name ?? "") . " " . ($student?->classroomStudent?->user?->last_name ?? "");
                }

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'promoted_date' => $promotedDate,
                    'promoted_by' => $promotedBy,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print student employment category wise report
    */
    public function printStudentEmploymentCategoryWiseReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentEmploymentCategoryWiseReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_employment_category_wise_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student employment category wise data
    */
    public function getStudentEmploymentCategoryWiseReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'employment_category'
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'employment_category' => $student?->employment_category?->title,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print student boarding type report
    */
    public function printStudentBoardingTypeReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentBoardingTypeReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_boarding_type_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student boarding type report data
    */
    public function getStudentBoardingTypeReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");
                $motherName = ($student?->mother?->first_name ?? "") . " " . ($student?->mother?->middle_name ?? "") . " " . ($student?->mother?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'student_type' => $student?->boarding_type,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'mother_name' => $motherName,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student document report
    */
    public function printStudentDocumentReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentDocumentReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $documentTitles = ['Pan card', 'Voter card', 'Passport', 'Aadhaar card'];

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_document_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
            'documentTitles' => $documentTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student document report data
    */
    public function getStudentDocumentReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsByClassroomIdsAndStatus($classroomIds, $status);

        if (count($students) > 0) {
            $students->loadMissing([
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
            ]);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                $attachedDocuments = [];

                if ($student?->document_attached != null) {
                    $documentAttached = json_decode($student->document_attached);

                    if (count($documentAttached) > 0) {
                        foreach ($documentAttached as $document) {
                            if ($document?->is_have == true) {
                                $attachedDocuments[] = $document?->title;
                            }
                        }
                    }
                }

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'student_type' => $student?->boarding_type,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                    'father_name' => $fatherName,
                    'document_attached' => $attachedDocuments,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student with transport report
    */
    public function printStudentWithTransportReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentWithTransportReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_with_transport_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student with transport report data
    */
    public function getStudentWithTransportReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsWithTransportReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }

    /*
    *  print student without transport report
    */
    public function printStudentWithoutTransportReport(Request $request)
    {
        $reports = [];
        $classroomTitles = "";
        $classroomIds = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        if ($request?->class_section_type == 'class_type') {
            $classNameIds = !empty($request->class_name_ids) ? json_decode($request->class_name_ids) : [];

            if (!empty($classNameIds)) {
                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds)->toArray();
            }
        } else if ($request?->class_section_type == 'section_type') {
            $classroomIds = !empty($request->classroom_ids) ? json_decode($request->classroom_ids) : [];
        }

        if (!empty($classroomIds)) {
            $reports = $this->getStudentWithoutTransportReportData($classroomIds, $status);

            $titles = $this->classroomRepository->getClassroomsByIds($classroomIds)
                ->pluck('title')
                ->toArray();

            if (!empty($titles)) {
                $classroomTitles = implode(',', $titles);
            }
        }

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_without_transport_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
            'classroomTitles' => $classroomTitles,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student without transport report data
    */
    public function getStudentWithoutTransportReportData(array $classroomIds, string $status = "")
    {
        $students = $this->studentRepository->getStudentsWithoutTransportReport($classroomIds, $status);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");

                return [
                    'display_order' => $student?->classroom?->display_order ?? 0,
                    'classroom_title' => $student?->classroom?->title,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'student_name' => $studentName,
                ];
            })->sortBy('display_order');
        }

        return $students;
    }


    /*
    *  print student gender wise summary report
    */
    public function printStudentGenderWiseSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentGenderWiseSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $genders = [];

        foreach (Gender::cases() as $case) {
            array_push($genders, $case->value);
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_gender_wise_summary_report', [
            'reports' => $reports,
            'genders' => $genders,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student gender wise summary report data
    */
    public function getStudentGenderWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $reports[$classNameId][$student?->gender] = ($reports[$classNameId][$student?->gender] ?? 0) + 1;
            });
        }

        return $reports;
    }


    /*
    *  print student religion wise summary report
    */
    public function printStudentReligionWiseSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentReligionWiseSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $religions = $this->religionRepository->getActiveAll()
            ->pluck('name')
            ->toArray();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_religion_wise_summary_report', [
            'reports' => $reports,
            'religions' => $religions,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student religion wise summary report data
    */
    public function getStudentReligionWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $reports[$classNameId][$student?->religion] = ($reports[$classNameId][$student?->religion] ?? 0) + 1;
            });
        }

        return $reports;
    }


    /*
    *  print student category wise summary report
    */
    public function printStudentCategoryWiseSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentCategoryWiseSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $categories = $this->categoryRepository->getActiveNameAndId()
            ->pluck('title')
            ->toArray();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_category_wise_summary_report', [
            'reports' => $reports,
            'categories' => $categories,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student category wise summary report data
    */
    public function getStudentCategoryWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->loadMissing(['student_category.category']);

            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $categoryTitle = $student?->student_category?->category?->title;

                $reports[$classNameId][$categoryTitle] = ($reports[$classNameId][$categoryTitle] ?? 0) + 1;
            });
        }

        return $reports;
    }


    /*
    *  print student inactive summary report
    */
    public function printStudentInactiveSummaryReport(Request $request)
    {
        $reports = [];
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentInactiveSummaryReportData();

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_inactive_summary_report', [
            'reports' => $reports,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student inactive summary report data
    */
    public function getStudentInactiveSummaryReportData()
    {
        $reports = [];

        $students = $this->studentRepository->getStudentInactiveSummaryReport();

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }
            });
        }

        return $reports;
    }

    /*
    *  print student status summary report
    */
    public function printStudentOldNewSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentOldNewSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $studentStatusArray = [];

        foreach (StudentStatus::cases() as $case) {
            if ($case->value != StudentStatus::OLD->value) {
                array_push($studentStatusArray, $case->value);
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_old_new_summary_report', [
            'reports' => $reports,
            'studentStatusArray' => $studentStatusArray,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student status summary report data
    */
    public function getStudentOldNewSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports[$classNameId])) {
                    $reports[$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                if (in_array($student?->student_status, [StudentStatus::OLD, StudentStatus::PROMOTED])) {
                    $studentStatus = StudentStatus::PROMOTED->value;
                } else {
                    $studentStatus = $student?->student_status;
                }

                $reports[$classNameId][$studentStatus] = ($reports[$classNameId][$studentStatus] ?? 0) + 1;
            });
        }

        return $reports;
    }

    /*
    *  print student employment category wise summary report
    */
    public function printStudentEmploymentCategoryWiseSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentEmploymentCategoryWiseSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $categories = $this->categoryRepository->getEmploymentCategory()
            ->pluck('title')
            ->toArray();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_employment_category_wise_summary_report', [
            'reports' => $reports,
            'categories' => $categories,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student employment category wise summary report data
    */
    public function getStudentEmploymentCategoryWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->loadMissing(['employment_category']);

            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classNameId = $student?->classroom?->className?->id ?? 0;
                $classNameTitle = $student?->classroom?->className?->title ?? "";

                if (!isset($reports['reports'][$classNameId])) {
                    $reports['reports'][$classNameId] = [
                        'class_name' => $classNameTitle,
                    ];
                }

                $categoryTitle = $student?->employment_category?->title;

                if ($categoryTitle != null) {
                    $reports['reports'][$classNameId][$categoryTitle] = ($reports['reports'][$classNameId][$categoryTitle] ?? 0) + 1;
                    $reports['reports'][$classNameId]['total_count'] = ($reports['reports'][$classNameId]['total_count'] ?? 0) + 1;
                    $reports['total_count'] = ($reports['total_count'] ?? 0) + 1;
                    $reports[$categoryTitle] = ($reports[$categoryTitle] ?? 0) + 1;
                }
            });
        }

        return $reports;
    }


    /*
    *  print student boarding wise wise summary report
    */
    public function printStudentBoardingWiseSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentBoardingWiseSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $boardingTypeArray = [];

        foreach (ScholarBoardingType::cases() as $case) {
            array_push($boardingTypeArray, $case->value);
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_boarding_wise_summary_report', [
            'reports' => $reports,
            'boardingTypeArray' => $boardingTypeArray,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student boarding wise wise summary report data
    */
    public function getStudentBoardingWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $students->each(function ($student) use (&$reports) {
                $boardingType = $student?->boarding_type;

                if ($boardingType != null) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $classroomId = $student?->classroom?->id ?? 0;
                    $classroomTitle = $student?->classroom?->title ?? "";

                    if (!isset($reports[$classroomId])) {
                        $reports[$classroomId] = [
                            'class_name' => $classroomTitle,
                        ];
                    }

                    $reports[$classroomId][$boardingType] = ($reports[$classroomId][$boardingType] ?? 0) + 1;
                }
            });
        }

        return $reports;
    }


    /*
    *  print student document wise wise summary report
    */
    public function printStudentDocumentWiseSummaryReport(Request $request)
    {
        $reports = [];
        $status = $request->status ?? "";
        $orientation = !empty($request->orientation) && in_array(strtolower($request->orientation), ['p', 'l']) ? $request->orientation : "L";

        $reports = $this->getStudentDocumentWiseSummaryReportData($status);

        $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

        if ($schoolData != null) {
            $schoolData = [
                'academic_year' => getAcademicYear(),
                'logo' => $schoolData->logo,
                'title' => $schoolData->title,
            ];
        }

        $documentTitles = ['Pan card', 'Voter card', 'Passport', 'Aadhaar card'];

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('PDF Student Report'));
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
            'orientation' => $orientation,
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

        $pdf->writeHTML(view('pdf.student.student_document_wise_summary_report', [
            'reports' => $reports,
            'documentTitles' => $documentTitles,
            'schoolData' => $schoolData,
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  get student document wise wise summary report data
    */
    public function getStudentDocumentWiseSummaryReportData(string $status = "")
    {
        $reports = [];

        $students = $this->studentRepository->getStudentsByStatus($status);

        if (count($students) > 0) {
            $reports = [
                'total_count' => 0,
                'total_student' => 0,
            ];

            $students->each(function ($student) use (&$reports) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student?->classroom?->id ?? 0;
                $classroomTitle = $student?->classroom?->title ?? "";

                if (!isset($reports['reports'][$classroomId])) {
                    $reports['reports'][$classroomId] = [
                        'class_name' => $classroomTitle,
                    ];
                }

                if ($student?->document_attached != null) {
                    $documentAttached = json_decode($student->document_attached);

                    if (count($documentAttached) > 0) {
                        foreach ($documentAttached as $document) {
                            if ($document?->is_have == true) {
                                if ($document?->title != null) {
                                    $reports['reports'][$classroomId][$document?->title] = ($reports['reports'][$classroomId][$document?->title] ?? 0) + 1;
                                    $reports[$document?->title] = ($reports[$document?->title] ?? 0) + 1;
                                    $reports['total_count'] = ($reports['total_count'] ?? 0) + 1;
                                }
                            }
                        }
                    }
                }

                $reports['reports'][$classroomId]['total_student'] = ($reports['reports'][$classroomId]['total_student'] ?? 0) + 1;
                $reports['total_student'] = ($reports['total_student'] ?? 0) + 1;
            });
        }

        return $reports;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printMonthWiseAttendanceReport(Request $request)
    {
        $monthWiseReport = [];
        $classroomId = $request->classroom_id ?? null;
        $month = $request->month ?? null;
        $year = $request->year ?? null;
        $classroomTitle = "";

        if (!empty($classroomId)) {
            $monthWiseReport = $this->getMonthWiseAttendanceReportData($classroomId, $month, $year);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
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
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Month Wise Attendance Report'));
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

        $pdf->writeHTML(view('pdf.student.month_wise_attendance_report', [
            'reports' => $monthWiseReport,
            'schoolData' => $schoolData,
            'classroomTitle' => $classroomTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  helper method to get month wise attendance report data
    */
    private function getMonthWiseAttendanceReportData(int $classroomId, $month, $year)
    {
        $monthWiseReport = [];
        $allStudentIds = [];
        $studentCounts = [];

        $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceByMonthWise($classroomId, $month, $year);

        if (!empty($classroomAttendances)) {
            foreach ($classroomAttendances as $classAtt) {
                $attStudents = json_decode($classAtt['students']);
                foreach ($attStudents as $attStu) {
                    if (!empty($attStu)) {
                        $studentId = $attStu->student_id;
                        $attendanceStatus = $attStu->attendance_status;

                        if (!isset($studentCounts[$studentId])) {
                            $studentCounts[$studentId] = [
                                'present' => 0,
                                'absent' => 0,
                            ];
                        }

                        // Increment count based on attendance status
                        if ($attendanceStatus === 'present') {
                            $studentCounts[$studentId]['present']++;
                        } elseif ($attendanceStatus === 'absent') {
                            $studentCounts[$studentId]['absent']++;
                        }

                        $allStudentIds[] = $attStu->student_id;
                    }
                }
            }
        }

        $studentsArray = $this->studentRepository->getStudentForMonthReport($allStudentIds)->toArray();

        if (!empty($studentsArray)) {
            foreach ($studentsArray as $student) {
                $studentId = $student['id'];

                // Initialize the combined array
                $monthWiseReport[$studentId] = [
                    'roll_no' => $student['classroom_roll']['roll_no'] ?? '',
                    'name' => ($student['first_name'] ?? '') . ' ' . ($student['middle_name'] ?? '') . ' ' . ($student['last_name'] ?? ''),
                    'present' => $studentCounts[$studentId]['present'],
                    'absent' => $studentCounts[$studentId]['absent'],
                    'percentage' => 0,
                ];

                // Calculate attendance percentage
                $totalAttendance = $monthWiseReport[$studentId]['present'] + $monthWiseReport[$studentId]['absent'];
                $attendancePercentage = ($totalAttendance > 0) ? (($monthWiseReport[$studentId]['present'] / $totalAttendance) * 100) : 0;

                $monthWiseReport[$studentId]['percentage'] = round($attendancePercentage, 2);
            }
        }

        return $monthWiseReport;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printDateWiseClassAttendanceReport(Request $request)
    {
        $dateWiseClassAttendanceReport = [];
        $classroomId = $request->classroom_id ?? null;
        $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        $classroomTitle = "";

        if (!empty($classroomId)) {
            $dateWiseClassAttendanceReport = $this->getDateWiseClassAttendanceReportData($classroomId, $startDate, $endDate);
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
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
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Date Wise Class Attendance Report'));
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

        $pdf->writeHTML(view('pdf.student.date_wise_class_attendance_report', [
            'reports' => $dateWiseClassAttendanceReport,
            'schoolData' => $schoolData,
            'classroomTitle' => $classroomTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  helper method to get date wise class attendance report data
    */
    private function getDateWiseClassAttendanceReportData(int $classroomId, string $startDate = "", string $endDate = "")
    {
        $dateWiseClassAttendanceReport = [];

        $allStudentData = $this->studentRepository->getActiveDataByClassroomId($classroomId);

        if (count($allStudentData) > 0) {
            $allStudentData->load(['classroomData', 'classroomRoll']);
            $allStudents = $allStudentData->toArray();
            $dateWiseStudent = $this->classroomAttendanceRepository->getAttendanceByDateWise($startDate,  $endDate)->toArray();

            foreach ($allStudents as $student) {
                // Initialize counters for each student
                $presentCount = 0;
                $absentCount = 0;

                foreach ($dateWiseStudent as $attendance) {
                    $studentsAttendance = json_decode($attendance['students'], true);

                    foreach ($studentsAttendance as $attendanceRecord) {
                        if (!empty($attendanceRecord['student_id']) && $student['id'] == $attendanceRecord['student_id']) {
                            // Match found, update counters based on attendance status
                            if ($attendanceRecord['attendance_status'] == 'present') {
                                $presentCount++;
                            } elseif ($attendanceRecord['attendance_status'] == 'absent') {
                                $absentCount++;
                            }
                        }
                    }
                }

                // Calculate percentage for each student
                $totalAttendance = $presentCount + $absentCount;

                if ($totalAttendance > 0) {
                    $percentagePresent = ($presentCount / $totalAttendance) * 100;
                } else {
                    $percentagePresent = 0;
                }

                // Get classroom roll and name with error handling
                $classroomRoll = isset($student['classroom_roll']['roll_no']) ? $student['classroom_roll']['roll_no'] : 'N/A';
                $classroomName = isset($student['classroom_data']['title']) ? $student['classroom_data']['title'] : 'N/A';

                // Store attendance details for each student
                $dateWiseClassAttendanceReport[] = [
                    'name' => $student['first_name'] . ' ' . $student['middle_name'] . ' ' . $student['last_name'],
                    'roll_no' => $classroomRoll,
                    'class_name' => $classroomName,
                    'present' => $presentCount,
                    'absent' => $absentCount,
                    'percentage' => round($percentagePresent, 2)
                ];
            }
        }

        return $dateWiseClassAttendanceReport;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printClassWiseDailyAttendanceReport(Request $request)
    {
        $classWiseDailyAttendanceReport = [];
        $attendanceReportDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->format('d-M-Y') : "";
        $attendanceDate = !empty($request?->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request?->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";

        if (!empty($attendanceDate)) {
            $classWiseDailyAttendanceReport = $this->getClassWiseDailyAttendanceReportData($attendanceDate);
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
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Class Wise Daily Attendance Report'));
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

        $pdf->writeHTML(view('pdf.student.class_wise_daily_attendance_report', [
            'reports' => $classWiseDailyAttendanceReport,
            'schoolData' => $schoolData,
            'attendanceReportDate' => $attendanceReportDate
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    *  helper method to get class wise daily attendance report data
    */
    private function getClassWiseDailyAttendanceReportData(string $attendanceDate)
    {
        $classWiseDailyAttendanceReport = [];

        $attendanceDaily = $this->classroomAttendanceRepository->getAttendanceByClassWiseDaily($attendanceDate)->toArray();

        if (!empty($attendanceDaily)) {
            foreach ($attendanceDaily as $attendance) {
                foreach ($attendance as $record) {
                    $classroomId = $record['classroom_id'];
                    $classroomName = $record['classroom_data']['title'];

                    // Initialize counters if the class is not encountered yet
                    if (!isset($classWiseDailyAttendanceReport['reports'][$classroomId])) {
                        $classWiseDailyAttendanceReport['reports'][$classroomId] = [
                            'class_name' => $classroomName,
                            'total_student' => 0,
                            'present' => 0,
                            'absent' => 0,
                            'leave' => 0,
                        ];
                    }

                    // Increment total student count
                    $classWiseDailyAttendanceReport['reports'][$classroomId]['total_student'] += count(json_decode($record['students'], true));

                    // Iterate through students and update present and absent counts
                    foreach (json_decode($record['students'], true) as $student) {
                        if ($student['attendance_status'] == 'present') {
                            $classWiseDailyAttendanceReport['reports'][$classroomId]['present']++;
                        } elseif ($student['attendance_status'] == 'absent') {
                            $classWiseDailyAttendanceReport['reports'][$classroomId]['absent']++;
                            $classWiseDailyAttendanceReport['reports'][$classroomId]['leave']++;
                        }
                    }
                }
            }

            if (!empty($classWiseDailyAttendanceReport['reports'])) {
                $classWiseDailyAttendanceReport['total_student'] = collect($classWiseDailyAttendanceReport['reports'])->sum('total_student');
                $classWiseDailyAttendanceReport['total_present'] = collect($classWiseDailyAttendanceReport['reports'])->sum('present');
                $classWiseDailyAttendanceReport['total_absent'] = collect($classWiseDailyAttendanceReport['reports'])->sum('absent');
                $classWiseDailyAttendanceReport['total_leave'] = collect($classWiseDailyAttendanceReport['reports'])->sum('leave');
            }
        }

        return $classWiseDailyAttendanceReport;
    }
}
