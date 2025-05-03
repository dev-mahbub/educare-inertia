<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\EventStatus;
use App\Enums\EventType;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IEventRepository;
use App\Repositories\IFileRepository;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IOrganizeFolderRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventApiController extends ControllerApi
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
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/events/all",
     *    operationId="indexEvent",
     *    tags={"Event"},
     *    summary="Get all events",
     *    description="Get all events",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function indexEvent(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $eventStatusArr = buildEnumOptionsArray(EventStatus::cases());
            $eventTypes = buildEnumOptionsArray(EventType::cases());
            $academicYears = getAcademicYearsAll($request->schoolId);
            $academicYearId = $setting?->academic_year_id;
            $eventStatus = $request->eventStatus ?? "";
            $eventType = $request->eventType ?? "";
            $startDate = !empty($request->startDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : "";
            $endDate = !empty($request->endDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->endDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : "";
            $events = $this->eventRepository->getFilteredEvents(
                $eventStatus,
                $eventType,
                $startDate,
                $endDate,
                $academicYearId,
                $request->schoolId
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

            return response()->json([
                'success' => true,
                'data' => $events,
                'eventStatusArr' => $eventStatusArr,
                'eventTypes' => $eventTypes,
                'academicYears' => $academicYears,
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
     * @OA\Post(
     * path="/events/create",
     * summary="Create Event",
     * description="Create Event",
     * operationId="createEvent",
     * tags={"Event"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Event",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "userId","title","startDate","startTime"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="string", example="demo"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="startDate", type="string", example="2024-07-01"),
     *       @OA\Property(property="startTime", type="string", example="10:20"),
     *       @OA\Property(property="eventImage", type="string", example="file"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function createEvent(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            DB::beginTransaction();
            try {
                $dataArray = array(
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $setting?->academic_year_id,
                    'created_by' => $request->userId,
                    'title' => !empty($request->title) ? $request->title : "",
                    'event_type' => !empty($request->eventType) ? $request->eventType : null,
                    'event_level' => !empty($request->eventLevel) ? $request->eventLevel : null,
                    'start_datetime' => !empty($request->startDate) ? Carbon::parse($request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                    'end_datetime' => !empty($request->endDate) ? Carbon::parse($request->endDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                    'start_time' => !empty($request->startTime) ? Carbon::parse($request->startTime)->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                    'event_budget' => !empty($request->eventBudget) ? $request->eventBudget : 0.00,
                    'location' => !empty($request->location) ? $request->location : null,
                    'description' => !empty($request->description) ? $request->description : null,
                    'is_published' => !empty($request->isPublished) ? $request->isPublished : 0,
                    'status' => Status::ACTIVE,
                );
                $event = $this->eventRepository->create($dataArray);
                
                // upload event image
                if (!empty($request->eventImage)) {
                    $imageUrl = $this->_upload->uploadImage($request, 'eventImage', 'event_image', $request->schoolKey);
                    $dataImage = array(
                        'school_id' => $request->schoolId,
                        'imageable_type' => $event->getMorphClass(),
                        'imageable_id' => $event->id,
                        'name' => "event_image",
                        'path' => !empty($imageUrl) ? $imageUrl : 'no image',
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->morphCreate($dataImage, $event->id);
                }
                DB::commit();

                $event = $this->eventRepository->getById($event->id);

                return response()->json([
                    'success' => true,
                    'message' => 'Created successfully',
                    'data' => $event
                ], 200);

            } catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'error' => true,
                    'message' => 'Something goes wrong.',
                    'data' => $th
                ], 200);
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

    /**
     * @OA\Put(
     * path="/events/update/{id}",
     * summary="Update Event",
     * description="Update Event",
     * operationId="updateEvent",
     * tags={"Event"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Event",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Event",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "userId","title","startDate","startTime"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="string", example="demo"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="startDate", type="string", example="2024-07-01"),
     *       @OA\Property(property="startTime", type="string", example="10:20"),
     *       @OA\Property(property="eventImage", type="string", example="file"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Update")
     *        )
     *     )
     * )
     */
    public function updateEvent(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $event = $this->eventRepository->getEventById($id, $request->schoolId);
            abort_if(empty($event), 404);
            DB::beginTransaction();
            try {
                $dataArray = array(
                    'title' => !empty($request->title) ? $request->title : "",
                    'event_type' => !empty($request->eventType) ? $request->eventType : null,
                    'event_level' => !empty($request->eventLevel) ? $request->eventLevel : null,
                    'start_datetime' => !empty($request->startDate) ? Carbon::parse($request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                    'end_datetime' => !empty($request->endDate) ? Carbon::parse($request->endDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                    'start_time' => !empty($request->startTime) ? Carbon::parse($request->startTime)->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                    'event_budget' => !empty($request->eventBudget) ? $request->eventBudget : 0.00,
                    'location' => !empty($request->location) ? $request->location : null,
                    'description' => !empty($request->description) ? $request->description : null,
                    'is_published' => !empty($request->isPublished) ? $request->isPublished : 0,
                );
                $this->eventRepository->update($id, $dataArray);

                // upload event image
                if (!empty($request->eventImage)) {
                    $imageUrl = $this->_upload->uploadImage($request, 'eventImage', 'event_image', $request->schoolKey);
                    $attributesToCheck = array(
                        'school_id' => $request->schoolId,
                        'imageable_type' => $event->getMorphClass(),
                        'imageable_id' => $id,
                        'name' => "event_image",
                    );

                    $valuesToUpdate = array(
                        'path' => !empty($imageUrl) ? $imageUrl : 'no image',
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
                DB::commit();
                $event = $this->eventRepository->getEventById($id, $request->schoolId);
                return response()->json([
                    'success' => true,
                    'message' => 'Updated successfully',
                    'data' => $event
                ], 200);
            } 
            catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'error' => true,
                    'message' => 'Something goes wrong.',
                    'data' => $th
                ], 200);
            }

            
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/events/show/{id}",
     *    operationId="showEvent",
     *    tags={"Event"},
     *    summary="Show events Details",
     *    description="Show events Details",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function showEvent(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
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

            return response()->json([
                'success' => true,
                'data' => $event,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => ['id' => $id]
            ], 200);
        }
    }
    
    /**
     * @OA\Delete(
     *     path="/events/delete/{id}",
     *     tags={"Event"},
     *     summary="Delete Event",
     *     operationId="deleteEvent",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="id to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Classwork not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteEvent(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $event =  $this->eventRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $event
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => ['id' => $id]
            ], 200);
        }
    }
}