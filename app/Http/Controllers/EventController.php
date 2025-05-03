<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\FileType;
use App\Enums\EventType;
use App\Enums\EventLevel;
use App\Enums\EventStatus;
use App\Enums\StaffRoleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\EventRequest;
use Illuminate\Support\Facades\URL;
use App\Repositories\IFileRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IEventRepository;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStaffRepository;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\EventStaffRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\EventActivityRequest;
use App\Http\Requests\EventDocumentRequest;
use App\Http\Requests\EventActivityWinnerRequest;
use App\Http\Requests\EventActivityParticipantRequest;

class EventController extends Controller
{
    private $_upload;

    public function __construct(
        private IEventRepository $eventRepository,
        private ICategoryRepository $categoryRepository,
        private IImageRepository $imageRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IHouseRepository $houseRepository,
        private IStaffRepository $staffRepository,
        private IFileRepository $fileRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view event', ['only' => ['index', 'eventDetails', 'eventPreview', 'downloadEventDocumentFile']]);
        $this->middleware('permission:add event', ['only' => ['create', 'save', 'createEventActivity', 'saveEventActivity', 
            'addEventActivityParticipants', 'saveEventActivityParticipants', 'addEventActivityWinner',
            'saveEventActivityWinner', 'saveEventIncharge', 'saveEventDocument'
        ]]);
        $this->middleware('permission:edit event', ['only' => ['edit', 'update', 'editEventActivity', 'updateEventActivity']]);
        $this->middleware('permission:delete event', ['only' => ['destroy', 'deleteEventDocument']]);
    }

    /**
     * Display events.
     */
    public function index(Request $request): Response
    {
        $eventStatusArr = buildEnumOptionsArray(EventStatus::cases());
        $eventTypes = buildEnumOptionsArray(EventType::cases());
        $academicYears = getAcademicYearsAll();

        $eventStatus = "";
        $eventType = "";
        $startDate = "";
        $endDate = "";
        $academicYearId = null;

        if ($request->isMethod('POST')) {
            $eventStatus = $request->event_status ?? "";
            $eventType = $request->event_type ?? "";
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : "";
            $academicYearId = $request->academic_year_id ?? null;
        }

        $events = $this->eventRepository->getFilteredEvents(
            $eventStatus,
            $eventType,
            $startDate,
            $endDate,
            $academicYearId
        );

        if (count($events) > 0) {
            $events = $events->map(function ($event) {
                $eventStartDate = !empty($event->start_datetime) ? Carbon::parse($event->start_datetime)->format('d-M-Y') : "";
                $eventEndDate = !empty($event->end_datetime) ? Carbon::parse($event->end_datetime)->format('d-M-Y') : "";
                $eventStartTime = !empty($event->start_time) ? Carbon::parse($event->start_time)->format('H:i A') : "";
                $eventCreatedOn = !empty($event->created_at) ? Carbon::parse($event->created_at)->format('d-M-Y H:i A') : "";

                $event['start_date'] = $eventStartDate;
                $event['end_date'] = $eventEndDate;
                $event['start_time'] = $eventStartTime;
                $event['created_on'] = $eventCreatedOn;

                return $event;
            });
        }

        return Inertia::render('Event/Show', [
            'eventStatusArr' => $eventStatusArr,
            'eventTypes' => $eventTypes,
            'academicYears' => $academicYears,
            'events' => $events
        ]);
    }

    /**
     * create event
     */
    public function create(): Response
    {
        $eventTypes = buildEnumOptionsArray(EventType::cases());
        $eventLevels = buildEnumOptionsArray(EventLevel::cases());

        return Inertia::render('Event/Create', [
            'eventTypes' => $eventTypes,
            'eventLevels' => $eventLevels,
        ]);
    }

    /**
     * save event
     */
    public function save(EventRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'title' => !empty($input['title']) ? $input['title'] : "",
                'event_type' => !empty($input['event_type']) ? $input['event_type'] : null,
                'event_level' => !empty($input['event_level']) ? $input['event_level'] : null,
                'start_datetime' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'end_datetime' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                'event_budget' => !empty($input['event_budget']) ? $input['event_budget'] : 0.00,
                'location' => !empty($input['location']) ? $input['location'] : null,
                'description' => !empty($input['description']) ? $input['description'] : null,
                'is_published' => !empty($input['is_published']) ? $input['is_published'] : 0,
                'status' => Status::ACTIVE,
            );

            $event = $this->eventRepository->create($dataArray);

            // upload event image
            if (!empty($input['event_image'])) {
                $imageUrl = $this->_upload->uploadImage($request, 'event_image', 'event_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => $event->getMorphClass(),
                    'imageable_id' => $event->id,
                    'name' => "event_image",
                    'path' => !empty($imageUrl) ? $imageUrl : 'no image',
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $event->id);
            }

            DB::commit();

            return redirect()->route('event.list')->with('message', 'Event Created Successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Edit event
     */
    public function edit(int $id): Response
    {
        $event = $this->eventRepository->getEventById($id);

        abort_if(empty($event), 404);

        $eventTypes = buildEnumOptionsArray(EventType::cases());
        $eventLevels = buildEnumOptionsArray(EventLevel::cases());

        return Inertia::render('Event/Edit', [
            'eventTypes' => $eventTypes,
            'eventLevels' => $eventLevels,
            'eventData' => $event,
        ]);
    }

    /**
     * update event
     */
    public function update(int $id, EventRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($id);

        abort_if(empty($event), 404);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'title' => !empty($input['title']) ? $input['title'] : "",
                'event_type' => !empty($input['event_type']) ? $input['event_type'] : null,
                'event_level' => !empty($input['event_level']) ? $input['event_level'] : null,
                'start_datetime' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'end_datetime' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                'event_budget' => !empty($input['event_budget']) ? $input['event_budget'] : 0.00,
                'location' => !empty($input['location']) ? $input['location'] : null,
                'description' => !empty($input['description']) ? $input['description'] : null,
                'is_published' => !empty($input['is_published']) ? $input['is_published'] : 0,
            );

            $this->eventRepository->update($id, $dataArray);

            // upload event image
            if (!empty($input['event_image'])) {
                $imageUrl = $this->_upload->uploadImage($request, 'event_image', 'event_image');

                $attributesToCheck = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => $event->getMorphClass(),
                    'imageable_id' => $event->id,
                    'name' => "event_image",
                );

                $valuesToUpdate = array(
                    'path' => !empty($imageUrl) ? $imageUrl : 'no image',
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Event updated Successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Delete event.
     */
    public function destroy(int $id): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($id);

        abort_if(empty($event), 404);

        DB::beginTransaction();

        try {
            if ($event?->image != null) {
                $event->image->delete();
            }

            $event->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Event deleted Successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Event Details
     */
    public function eventDetails(int $id): Response
    {
        $event = $this->eventRepository->getEventById($id);

        abort_if(empty($event), 404);

        $event->loadMissing(['staffs', 'eventActivities', 'eventDocuments.file']);

        if ($event?->eventActivities->count() > 0) {
            $event->eventActivities->transform(function ($activity) {
                $activity->start_date = !empty($activity->start_date) ? Carbon::parse($activity->start_date)->format('d M, Y') : "";
                $activity->end_date = !empty($activity->end_date) ? Carbon::parse($activity->end_date)->format('d M, Y') : "";

                return $activity;
            });
        }

        if ($event?->staffs->count() > 0) {
            $event->staffs->transform(function ($staff) {
                return [
                    'id' => $staff?->id,
                    'first_name' => $staff?->first_name,
                    'middle_name' => $staff?->middle_name,
                    'last_name' => $staff?->last_name,
                    'title' => $staff?->first_name . " " . $staff?->middle_name . " " . $staff?->last_name,
                    'user_roll_type' => $staff?->user_roll_type,
                ];
            });
        }

        if ($event?->eventDocuments->count() > 0) {
            $event->eventDocuments->transform(function ($eventDocument) {
                $uploadDate = !empty($eventDocument->created_at) ? Carbon::parse($eventDocument->created_at)->format('d M, Y') : "";

                $eventDocument['upload_date'] = $uploadDate;

                return $eventDocument;
            });
        }

        $fileTypes = buildEnumOptionsArray(FileType::cases());
        $staffRoles = buildEnumOptionsArray(StaffRoleType::cases());
        $classGroups = [];
        $staffs = $this->staffRepository->getActiveStaffForEvent()->map(function ($staff) {
            $staff['title'] = $staff?->first_name . " " . $staff?->middle_name . " " . $staff?->last_name;

            return $staff;
        });

        return Inertia::render('Event/Details', [
            'eventData' => $event,
            'staffRoles' => $staffRoles,
            'classGroups' => $classGroups,
            'staffs' => $staffs,
            'fileTypes' => $fileTypes,
        ]);
    }


    /**
     * Event Preview
     */
    public function eventPreview(int $id): Response
    {
        $event = $this->eventRepository->getEventById($id);

        abort_if(empty($event), 404);

        $event->loadMissing(['staffs.staffProfileImage', 'eventActivities']);

        $eventStartDate = !empty($event->start_datetime) ? Carbon::parse($event->start_datetime)->format('d-M-Y') : "";
        $eventEndDate = !empty($event->end_datetime) ? Carbon::parse($event->end_datetime)->format('d-M-Y') : "";

        $event['start_date'] = $eventStartDate;
        $event['end_date'] = $eventEndDate;

        if ($event?->eventActivities->count() > 0) {
            $event->eventActivities->transform(function ($activity) {
                $activity->start_date = !empty($activity->start_date) ? Carbon::parse($activity->start_date)->format('d M, Y') : "";
                $activity->end_date = !empty($activity->end_date) ? Carbon::parse($activity->end_date)->format('d M, Y') : "";
                $activity->start_time = !empty($activity->start_time) ? Carbon::parse($activity->start_time)->format('H:i A') : "";
                $activity->end_time = !empty($activity->end_time) ? Carbon::parse($activity->end_time)->format('H:i A') : "";

                $participants = !empty($activity->participants) ? json_decode($activity->participants) : [];

                if (count($participants) > 0) {
                    $participantIds = collect($participants)->map(function ($participant) {
                        return $participant->student_id;
                    })->toArray();

                    $winnerIds = collect($participants)->filter(function ($participant) {
                        return $participant->is_winner;
                    })->map(function ($participant) {
                        return $participant->student_id;
                    })->flatten()->toArray();

                    $students = $this->studentRepository->getEventActivityStudentByIds($participantIds);
                    $winners = [];

                    if (count($students) > 0) {
                        $students->transform(function ($student) {
                            if ($student?->promotedClassroom != null) {
                                $classroomTitle = $student->promotedClassroom?->title;
                            } else {
                                $classroomTitle = $student?->classroom?->title;
                            }

                            return [
                                'id' => $student->id,
                                'first_name' => $student->first_name,
                                'middle_name' => $student->middle_name,
                                'last_name' => $student->last_name,
                                'classroom_title' => $classroomTitle,
                                'student_image' => $student?->studentImage,
                            ];
                        });

                        $winners = $students->filter(function ($student) use ($winnerIds) {
                            return in_array($student['id'], $winnerIds);
                        });
                    }

                    $activity['students'] = $students;
                    $activity['winners'] = $winners;
                }

                return $activity;
            });
        }

        return Inertia::render('Event/Preview', [
            'eventData' => $event
        ]);
    }


    /*
    * Create Event Activity
    */
    public function createEventActivity(int $eventId): Response
    {
        $event = $this->eventRepository->getEventById($eventId);

        abort_if(empty($event), 404);

        return Inertia::render('Event/CreateActivity', [
            'eventData' => $event
        ]);
    }


    /*
    * Save Event Activity
    */
    public function saveEventActivity(int $eventId, EventActivityRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);

        abort_if(empty($event), 404);

        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'event_id' => $event->id,
            'created_by' => auth()->user()->id,
            'title' => $input['title'],
            'description' => !empty($input['description']) ? $input['description'] : null,
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'is_group_activity' => $input['is_group_activity'] ?? false,
            'status' => Status::ACTIVE,
        ];

        $eventActivity = $this->eventRepository->createEventActivity($dataArray);

        if (!$eventActivity) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Activity Created Successfully');
    }

    /*
    * Edit Event Activity
    */
    public function editEventActivity(int $eventId, int $id): Response
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventActivity = $this->eventRepository->getEventActivityById($id, $event?->id);

        abort_if(empty($event) || empty($eventActivity), 404);

        return Inertia::render('Event/EditActivity', [
            'eventData' => $event,
            'eventActivity' => $eventActivity
        ]);
    }

    /*
    * Update Event Activity
    */
    public function updateEventActivity(int $eventId, int $id, EventActivityRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventActivity = $this->eventRepository->getEventActivityById($id, $event?->id);

        abort_if(empty($event) || empty($eventActivity), 404);

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'],
            'description' => !empty($input['description']) ? $input['description'] : null,
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'end_date' => !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'is_group_activity' => $input['is_group_activity'] ?? false,
        ];

        $updateActivity = $this->eventRepository->updateEventActivity($id, $dataArray);

        if (!$updateActivity) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Activity Updated Successfully');
    }

    /*
    * Add Event Activity Participants
    */
    public function addEventActivityParticipants(int $eventId, int $activityId, Request $request): Response
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventActivity = $this->eventRepository->getEventActivityById($activityId, $event?->id);

        abort_if(empty($event) || empty($eventActivity), 404);

        $participants = !empty($eventActivity?->participants) ? json_decode($eventActivity->participants) : [];

        if (count($participants) > 0) {
            $studentIds = array_map(function ($participant) {
                return $participant->student_id;
            }, $participants);

            $participantsData = $this->studentRepository->getStudentsByIds($studentIds);

            $eventActivity['participants'] = array_map(function ($participant) use ($participantsData) {
                $participantData = $participantsData->where('id', $participant->student_id)->first();

                $participant->title = $participantData?->first_name . " " . $participantData?->middle_name . " " . $participantData?->last_name;

                return $participant;
            }, $participants);
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $houses = $this->houseRepository->getActiveAll()->map(function ($house) {
            return [
                'id' => $house->id,
                'title' => $house->name,
            ];
        });
        $students = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $houseId = $request->house_id ?? null;

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getByClassroomIdForEvent($classroomId, $houseId);

                if (count($students) > 0) {
                    $students = $students->map(function ($student) {
                        return [
                            'id' => $student?->id,
                            'first_name' => $student?->first_name,
                            'middle_name' => $student?->middle_name,
                            'last_name' => $student?->last_name,
                            'title' => $student?->first_name . " " . $student?->middle_name . " " . $student?->last_name,
                        ];
                    });
                }
            }
        }

        return Inertia::render('Event/AddActivityParticipant', [
            'eventData' => $event,
            'eventActivity' => $eventActivity,
            'classrooms' => $classrooms,
            'houses' => $houses,
            'students' => $students,
        ]);
    }


    /*
    * Save Event Activity Participants
    */
    public function saveEventActivityParticipants(int $eventId, int $activityId, EventActivityParticipantRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventActivity = $this->eventRepository->getEventActivityById($activityId, $event?->id);

        abort_if(empty($event) || empty($eventActivity), 404);

        $input = $request->validated();

        $dataArray = [
            'participants' => !empty($input['participants']) ? json_encode($input['participants']) : null,
        ];

        $updateActivity = $this->eventRepository->updateEventActivity($activityId, $dataArray);

        if (!$updateActivity) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Participant Added Successfully');
    }

    /*
    * Add Event Activity Winners
    */
    public function addEventActivityWinner(int $eventId, int $activityId): Response
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventActivity = $this->eventRepository->getEventActivityById($activityId, $event?->id);

        abort_if(empty($event) || empty($eventActivity), 404);

        $students = [];
        $participants = !empty($eventActivity->participants) ? json_decode($eventActivity->participants) : [];

        if (count($participants) > 0) {
            $winners = array_filter($participants, function ($winner) {
                return $winner->is_winner;
            });

            $winnerIds = array_map(function ($winner) {
                return $winner->student_id;
            }, $winners);

            $winnersData = $this->studentRepository->getStudentsByIds($winnerIds);

            $eventActivity['winners'] = array_map(function ($winner) use ($winnersData) {
                $winnerData = $winnersData->where('id', $winner->student_id)->first();

                $winner->title = $winnerData?->first_name . " " . $winnerData?->middle_name . " " . $winnerData?->last_name;

                return $winner;
            }, $winners);

            $participantIds = collect($participants)->map(function ($participant) {
                return $participant->student_id;
            })->toArray();

            $students = $this->studentRepository->getEventActivityStudentByIds($participantIds);

            $eventActivity['participants'] = array_map(function ($participant) use ($students) {
                $participantData = $students->where('id', $participant->student_id)->first();

                $participant->title = $participantData?->first_name . " " . $participantData?->middle_name . " " . $participantData?->last_name;

                return $participant;
            }, $participants);

            if (count($students) > 0) {
                $students->transform(function ($student) {
                    $title = $student->first_name . " " . $student->middle_name . " " . $student->last_name;

                    return [
                        'id' => $student->id,
                        'title' => $title
                    ];
                });
            }
        }

        return Inertia::render('Event/AddActivityWinner', [
            'eventData' => $event,
            'eventActivity' => $eventActivity,
            'participants' => $students,
        ]);
    }


    /*
    * Save Event Activity Winners
    */
    public function saveEventActivityWinner(int $eventId, int $activityId, EventActivityWinnerRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventActivity = $this->eventRepository->getEventActivityById($activityId, $event?->id);

        abort_if(empty($event) || empty($eventActivity), 404);

        $input = $request->validated();

        $dataArray = [
            'participants' => !empty($input['participants']) ? json_encode($input['participants']) : null,
        ];

        $updateActivity = $this->eventRepository->updateEventActivity($activityId, $dataArray);

        if (!$updateActivity) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Winner Added Successfully');
    }


    /*
    * Save Event Incharge
    */
    public function saveEventIncharge(int $eventId, EventStaffRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);

        abort_if(empty($event), 404);

        DB::beginTransaction();

        try {
            $input = $request->validated();

            $event->loadMissing(['staffs']);

            $currentStaffIds = $event?->staffs?->pluck('id')?->toArray();
            $newStaffIds = !empty($input['staffs']) ? $input['staffs'] : [];

            $idsToUpdate = array_diff($newStaffIds, $currentStaffIds);
            $idsToDelete = array_diff($currentStaffIds, $newStaffIds);

            $this->eventRepository->deleteEventStaffByIds($eventId, $idsToDelete);

            if (!empty($idsToUpdate)) {
                $attributesToCheck = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'event_id' => $eventId,
                ];

                foreach ($idsToUpdate as $staffId) {
                    $attributesToCheck['staff_id'] = $staffId;

                    $valuesToUpdate = [
                        'status' => Status::ACTIVE
                    ];

                    $this->eventRepository->updateOrCreateEventStaff($attributesToCheck, $valuesToUpdate);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Incharge Added Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    * Save Event Document
    */
    public function saveEventDocument(int $eventId, EventDocumentRequest $request): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);

        abort_if(empty($event), 404);

        DB::beginTransaction();

        try {
            $input = $request->validated();

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'event_id' => $eventId,
                'created_by' => auth()->user()->id,
                'name' => !empty($input['name']) ? $input['name'] : "",
                'description' => !empty($input['description']) ? $input['description'] : null,
                'file_type' => !empty($input['file_type']) ? $input['file_type'] : "",
                'status' => Status::ACTIVE
            ];

            $eventDocument = $this->eventRepository->createEventDocument($dataArray);

            // upload file
            if (!empty($input['event_document'])) {
                $uploadedFile = $this->_upload->uploadSingleFile($request, 'event_document', 'event');

                if (!empty($uploadedFile)) {
                    $dataFile = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'fileable_type' => $eventDocument->getMorphClass(),
                        'fileable_id' => $eventDocument->id,
                        'name' => $uploadedFile['name'] ?? null,
                        'file_name' => $uploadedFile['file_name'] ?? null,
                        'path' => $uploadedFile['path'] ?? "",
                        'status' => Status::ACTIVE,
                    );

                    $this->fileRepository->morphCreate($dataFile);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Document Added Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    * Delete Event Document
    */
    public function deleteEventDocument(int $eventId, int $id): RedirectResponse
    {
        $event = $this->eventRepository->getEventById($eventId);
        $eventDocument = $this->eventRepository->getEventDocumentById($id, $eventId);

        abort_if(empty($event) || empty($eventDocument), 404);

        DB::beginTransaction();

        try {
            $eventDocument->loadMissing(['file']);

            if ($eventDocument?->file != null) {
                $eventDocument->file->delete();
            }

            $eventDocument->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Document Deleted Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    *   download event document
    */
    public function downloadEventDocumentFile(int $id)
    {
        try {
            $file = $this->fileRepository->getFileById($id);

            abort_if(empty($file), 404);

            $path = !empty($file->path) ? explode('/', $file->path) : [];
            $fileName = end($path);
            $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file->fileable->created_by . "/" . $fileName;

            $disk = Storage::disk('s3');
            $stream = $disk->readStream($filePath);

            return response()->stream(function () use ($stream) {
                fpassthru($stream);
            }, 200, [
                'Content-Type' => $disk->mimeType($filePath),
                'Content-Length' => $disk->size($filePath),
                'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"',
            ]);
        } catch (\Throwable $th) {
            return redirect()->to(URL::previous())->with('error', 'Something goes wrong.');
        }
    }
}
