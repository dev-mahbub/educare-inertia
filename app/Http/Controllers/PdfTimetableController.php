<?php

namespace App\Http\Controllers;

use Storage;
use Mpdf\Mpdf;
use Throwable;
use Carbon\Carbon;
use App\Enums\TimetableDay;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Repositories\IStaffRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITimetableRepository;
use App\Repositories\ISchoolShiftRepository;
use App\Repositories\ISchoolPeriodRepository;
use App\Repositories\IClassroomPeriodRepository;

class PdfTimetableController extends Controller
{
    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IClassroomPeriodRepository $classroomPeriodRepository,
        private ITimetableRepository $timetableRepository,
        private ISchoolShiftRepository $schoolShiftRepository,
        private ISchoolPeriodRepository $schoolPeriodRepository,
        private IStaffRepository $staffRepository,
    ) {}

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printClassroomTimetableReport(Request $request)
    {
        $classroomId = $request->classroom_id ?? null;
        $schoolShiftId = $request->school_shift_id ?? null;
        $timetables = [];
        $classroomPeriods = [];

        // timetable days
        $timetableDays = buildEnumOptionsArray(TimetableDay::cases());

        foreach ($timetableDays as $day) {
            $timetables[$day['title']] = [
                'day' => $day['title'],
                'period_data' => []
            ];
        }

        if (!empty($classroomId) && !empty($schoolShiftId)) {
            // classroom periods
            $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

            if (count($classroomPeriods) > 0) {
                $classroomPeriods = $classroomPeriods->map(function ($classroomPeriod) {
                    return [
                        'id' => $classroomPeriod->id,
                        'type' => $classroomPeriod->type,
                        'school_shift_id' => $classroomPeriod->school_shift_id,
                        'classroom_id' => $classroomPeriod->classroom_id,
                        'school_period_id' => $classroomPeriod->school_period_id,
                        'start_time' => !empty($classroomPeriod->schoolPeriod->start_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->start_time_at)->format('H:i A') : '',
                        'end_time' => !empty($classroomPeriod->schoolPeriod->end_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->end_time_at)->format('H:i A') : ''
                    ];
                })->all();

                // classroom timetables
                $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

                if (count($classroomTimetables) > 0) {
                    foreach ($classroomTimetables as $timetable) {
                        $timetables[$timetable->day]['period_data'][$timetable->classroom_period_id][] = [
                            'subject_title' => $timetable?->subject?->title,
                            'teacher_name' => trim(implode(' ', [$timetable?->staff?->first_name, $timetable?->staff?->middle_name, $timetable?->staff?->last_name])),
                        ];
                    }
                }
            }
        }

        // classroom title
        $classroomTitle = "";

        if (!empty($classroomId)) {
            $classroom = $this->classroomRepository->getClassroomById($classroomId);
            $classroomTitle = $classroom?->title;
        }

        // shift title
        $shiftTitle = "";

        if (!empty($schoolShiftId)) {
            $schoolShift = $this->schoolShiftRepository->getSchoolShiftById($schoolShiftId);
            $shiftTitle = $schoolShift?->title;
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

        $pdf->writeHTML(view('pdf.timetable.classroom_timetable_report', [
            'schoolData' => $schoolData,
            'timetables' => $timetables,
            'classroomPeriods' => $classroomPeriods,
            'classroomTitle' => $classroomTitle,
            'shiftTitle' => $shiftTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function printTeacherTimetableReport(Request $request)
    {
        $staffId = $request->staff_id ?? null;
        $schoolShiftId = $request->school_shift_id ?? null;
        $timetables = [];
        $schoolPeriods = [];

        // timetable days
        $timetableDays = buildEnumOptionsArray(TimetableDay::cases());

        foreach ($timetableDays as $day) {
            $timetables[$day['title']] = [
                'day' => $day['title'],
                'period_data' => []
            ];
        }

        if (!empty($staffId) && !empty($schoolShiftId)) {
            // school periods
            $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);

            if (count($schoolPeriods) > 0) {
                $schoolPeriods = $schoolPeriods->map(function ($schoolPeriod) {
                    return [
                        'id' => $schoolPeriod->id,
                        'type' => $schoolPeriod->type,
                        'school_shift_id' => $schoolPeriod->school_shift_id,
                        'start_time' => !empty($schoolPeriod->start_time_at) ? Carbon::parse($schoolPeriod->start_time_at)->format('H:i A') : '',
                        'end_time' => !empty($schoolPeriod->end_time_at) ? Carbon::parse($schoolPeriod->end_time_at)->format('H:i A') : ''
                    ];
                })->all();

                // classroom timetables
                $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByStaffIdAndSchoolShiftId($staffId, $schoolShiftId);

                if (count($classroomTimetables) > 0) {
                    foreach ($classroomTimetables as $timetable) {
                        $schoolPeriodId = $timetable?->classroomPeriod?->school_period_id;

                        $timetables[$timetable->day]['period_data'][$schoolPeriodId][] = [
                            'school_period_id' => $schoolPeriodId,
                            'subject_title' => $timetable?->subject?->title,
                            'classroom_title' => $timetable?->classroom?->title,
                        ];
                    }
                }
            }
        }

        // teacher name
        $teacherName = "";

        if (!empty($staffId)) {
            $teacher = $this->staffRepository->getStaffById($staffId);
            $teacherName = trim(implode(' ', [$teacher?->first_name, $teacher?->middle_name, $teacher?->last_name]));
        }

        // shift title
        $shiftTitle = "";

        if (!empty($schoolShiftId)) {
            $schoolShift = $this->schoolShiftRepository->getSchoolShiftById($schoolShiftId);
            $shiftTitle = $schoolShift?->title;
        }

        $schoolData = $this->getSchoolData();

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Teacher Timetable Report'));
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

        $pdf->writeHTML(view('pdf.timetable.teacher_timetable_report', [
            'schoolData' => $schoolData,
            'timetables' => $timetables,
            'schoolPeriods' => $schoolPeriods,
            'teacherName' => $teacherName,
            'shiftTitle' => $shiftTitle
        ])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }

    /*
    * helper method to get school data
    */
    private function getSchoolData(): array
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
}
