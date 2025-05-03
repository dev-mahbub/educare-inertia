<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Repositories\IExamRepository;
use App\Repositories\IEventRepository;
use App\Repositories\IHolidayRepository;

class EventCalendarController extends Controller
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
    public function calendar(): Response
    {
        // exams
        $exams = $this->getExamsData();

        // events
        $events = $this->getEventsData();

        // holidays
        $holidays = $this->getHolidaysData();

        return Inertia::render('EventCalendar/Calendar', [
            'exams' => $exams,
            'events' => $events,
            'holidays' => $holidays
        ]);
    }

    /**
     * Display the schools.
     */
    public function listView(Request $request): Response
    {
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
        }

        // exams
        $exams = $this->getExamsData('list', $startDate, $endDate);

        // events
        $events = $this->getEventsData('list', $startDate, $endDate);

        // holidays
        $holidays = $this->getHolidaysData('list', $startDate, $endDate);

        return Inertia::render('EventCalendar/ListView', [
            'exams' => $exams,
            'events' => $events,
            'holidays' => $holidays
        ]);
    }


    /**
     * get exams data
     */
    protected function getExamsData(string $viewType = 'grid', string $start_date = '', string $end_date = '')
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
    protected function getEventsData(string $viewType = 'grid', string $start_date = '', string $end_date = '')
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
    protected function getHolidaysData(string $viewType = 'grid', string $start_date = '', string $end_date = '')
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
