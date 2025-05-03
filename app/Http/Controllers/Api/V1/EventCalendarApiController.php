<?php

namespace App\Http\Controllers\Api\V1;


use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IExamRepository;
use App\Repositories\IEventRepository;
use App\Repositories\IHolidayRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EventCalendarApiController extends ControllerApi
{

    public function __construct(
        private IEventRepository $eventRepository,
        private IExamRepository $examRepository,
        private IHolidayRepository $holidayRepository,

        
    ) {
        $this->middleware('permission:view event', ['only' => ['calendar', 'listView']]);
    }

    /**
     * Display Event calendar.
     */
    public function calendarEvents(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $exams = $exams = $this->examRepository->getExamsForEventCalendar($request->startDate, $request->endDate, $request->schoolId, $academicYearId);
            $events = $this->eventRepository->getPublishedEvents($request->startDate, $request->endDate, $request->schoolId);
            $holidays = $this->holidayRepository->getHolidaysForCalendar($request->startDate, $request->endDate, $request->schoolId);
            return response()->json([
                'success' => true,
                'data' => [
                    'exams' => $exams,
                    'events' => $events,
                    'holidays' => $holidays
                ],
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }


    /**
     * get exams data
     */
    protected function apiExamsData(string $viewType = 'grid', string $start_date = '', string $end_date = '')
    {
        // exams
        $exams = $this->examRepository->getExamsForEventCalendar($start_date, $end_date);

        $examData = [];

        if (count($exams) > 0) {
            foreach ($exams as $exam) {
                $startDate = Carbon::parse($exam->start_date_at);
                $endDate = Carbon::parse($exam->end_date_at);

                $data = [
                    'title' => $exam->title,
                    'start' => $viewType == 'list' ? $startDate->format('d-M-Y') : $startDate->format('Y-m-d'),
                    'end' => $viewType == 'list' ? $endDate->format('d-M-Y') : $endDate->format('Y-m-d'),
                    'backgroundColor' => "#0B52BD",
                    'textColor' => "white",
                ];

                array_push($examData, $data);
            }
        }

        return $examData;
    }

    /**
     * get events data
     */
    protected function apiEventsData(string $viewType = 'grid', string $start_date = '', string $end_date = '')
    {
        // events
        $events = $this->eventRepository->getPublishedEvents($start_date, $end_date);

        $eventData = [];

        if (count($events) > 0) {
            foreach ($events as $event) {
                $startDate = Carbon::parse($event->start_datetime);
                $endDate = Carbon::parse($event->end_datetime);

                $data = [
                    'title' => $event->title,
                    'start' => $viewType == 'list' ? $startDate->format('d-M-Y') : $startDate->format('Y-m-d'),
                    'end' => $viewType == 'list' ? $endDate->format('d-M-Y') : $endDate->format('Y-m-d'),
                    // 'start' => $startDate->format('Y-m-d\TH:i:s'),
                    // 'end' => $endDate->format('Y-m-d\TH:i:s'),
                    'backgroundColor' => "#F78359",
                    'textColor' => "white",
                ];

                array_push($eventData, $data);
            }
        }

        return $eventData;
    }

    /**
     * get holidays data
     */
    protected function apiHolidaysData(string $viewType = 'grid', string $start_date = '', string $end_date = '')
    {
        // holidays
        $holidays = $this->holidayRepository->getHolidaysForCalendar($start_date, $end_date);

        $holidayData = [];

        if (count($holidays) > 0) {
            foreach ($holidays as $holiday) {
                $startDate = Carbon::parse($holiday->start_date_at);
                $endDate = Carbon::parse($holiday->end_date_at);

                $data = [
                    'title' => $holiday->name,
                    'start' => $viewType == 'list' ? $startDate->format('d-M-Y') : $startDate->format('Y-m-d'),
                    'end' => $viewType == 'list' ? $endDate->format('d-M-Y') : $endDate->format('Y-m-d'),
                    'backgroundColor' => "#F30445",
                    'textColor' => "white",
                ];

                array_push($holidayData, $data);
            }
        }

        return $holidayData;
    }
}
