<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Repositories\IVirtualExamRepository;

class OnlineExamReportController extends Controller
{
    public function __construct(
        private IVirtualExamRepository $virtualExamRepository
    ) {
        $this->middleware('permission:view online exam', ['only' => ['liveExam', 'takenExam', 'exportExamMarks', 'examSummary']]);
    }

    /*
    *   Live Exam
    */
    public function liveExam(Request $request): Response
    {
        return Inertia::render('OnlineExamReport/LiveExam', []);
    }

    /*
    *   Taken Exam
    */
    public function takenExam(Request $request): Response
    {
        return Inertia::render('OnlineExamReport/TakenExam', []);
    }

    /*
    *   Export Exam Marks
    */
    public function exportExamMarks(Request $request): Response
    {
        return Inertia::render('OnlineExamReport/ExportExamMark', []);
    }

    /*
    *   Exam Summary
    */
    public function examSummary(Request $request): Response
    {
        $virtualExams = [];

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";

            if (!empty($startDate) && !empty($endDate)) {
                $virtualExams = $this->virtualExamRepository->getVirtualExamSummaryData($startDate, $endDate);

                if (count($virtualExams)) {
                    $virtualExams = $virtualExams->map(function ($virtualExam) {
                        $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
                        $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';

                        return $virtualExam;
                    });
                }
            }
        }

        return Inertia::render('OnlineExamReport/ExamSummary', [
            'virtualExams' => $virtualExams
        ]);
    }
}
