<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\ITransportRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\IVehicleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransportApiController extends ControllerApi
{
    public function __construct(
        private ITransportRepository $transportRepository,
        private IVehicleRepository $vehicleRepository,
        private ITeacherRepository $teacherRepository,
        private IStaffRepository $staffRepository,
    ) {
         // do something!
    }
    
    /**
     * @OA\Get(
     *    path="/transports/routes",
     *    operationId="indexTransport",
     *    tags={"Transport"},
     *    summary="Get all Transport",
     *    description="Get all Transport",
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
    public function indexTransport(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $vehicles = $this->vehicleRepository->getActiveAll();
            $teachers = $this->staffRepository->getActiveNameId();
            $routes = $this->transportRepository->getActiveAllTransportAndRoute($request->schoolId);
            $routes->loadMissing(['vehicle.driver']);
            return response()->json([
                'success' => true,
                'data' => [
                    'vehicles' => $vehicles,
                    'teachers' => $teachers,
                    'routes' => $routes,
                ]
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
     * @OA\Get(
     *    path="/transports/route-wise/transports",
     *    operationId="routeWiseTransports",
     *    tags={"Transport"},
     *    summary="Get all Transport",
     *    description="Get all Transport",
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
    public function routeWiseTransports(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $routes = $this->transportRepository->getRoutesAllFromSession($request->schoolId, $setting?->academic_year_id);
            $routes->loadMissing([
              //  'vehicle',
                'students' => function ($query) {
                    $query->where('is_current', 1);
                   // $query->select('is_current', 'school_id', 'student_id', 'academic_year_id', 'transport_route_id', 'transport_stoppage_id', 'student_id');
                },
                'students.student' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                },
                'students.student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'students.student.promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                },
                'students.student.father' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                },
                'students.transportStoppage' => function ($query) {
                    $query->select('id', 'stoppage');
                },
                'students.transportRoute' => function ($query) {
                    $query->select('id', 'name', 'vehicle_id', 'school_id');
                },
                'students.transportRoute.vehicle' => function ($query) {
                    $query->select('id', 'vehicle_number', 'registration_number', 'total_seat');
                }
            ]);
            return response()->json([
                'success' => true,
                'data' => $routes
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
     * @OA\Get(
     *    path="/transports/stoppage-wise/routes",
     *    operationId="stoppageWiseRoutes",
     *    tags={"Transport"},
     *    summary="Get all Transport",
     *    description="Get all Transport",
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
    public function stoppageWiseRoutes(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $routes = $this->transportRepository->getActiveTransportAll($request->schoolId); 
            $routes->loadMissing([
                'students' => function ($query) {
                    $query->where('is_current', 1);
                   // $query->select('is_current', 'school_id', 'student_id', 'academic_year_id', 'transport_route_id', 'transport_stoppage_id', 'student_id');
                },
                'students.student' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                },
                'students.student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'students.student.promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                },
                'students.student.father' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                },
                'students.transportStoppage' => function ($query) {
                    $query->select('id', 'stoppage');
                },
                'students.transportRoute' => function ($query) {
                    $query->select('id', 'name', 'vehicle_id', 'school_id');
                },
                'students.transportRoute.vehicle' => function ($query) {
                    $query->select('id', 'vehicle_number', 'registration_number', 'total_seat');
                }
            ]); 

            return response()->json([
                'success' => true,
                'data' => $routes
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
     * @OA\Get(
     *    path="/transports/class-wise/routes",
     *    operationId="classWiseRoutes",
     *    tags={"Transport"},
     *    summary="Get Class Wise Routes",
     *    description="Get Class Wise Routes",
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
    public function classWiseRoutes(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classrooms = $this->transportRepository->getClassroomsWithStudentsAllocate($request->schoolId, $setting?->academic_year_id);
            $classrooms->loadMissing([
                'transportStudents' => function ($query) {
                    $query->where('allocate_transports.is_current', 1);
                },
                'transportStudents.student' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                },
                'transportStudents.student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'transportStudents.student.promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                },
                'transportStudents.student.father' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                },
                'transportStudents.transportStoppage' => function ($query) {
                    $query->select('id', 'stoppage');
                },
                'transportStudents.transportRoute' => function ($query) {
                    $query->select('id', 'name', 'vehicle_id', 'school_id');
                },
                'transportStudents.transportRoute.vehicle' => function ($query) {
                    $query->select('id', 'vehicle_number', 'registration_number', 'total_seat');
                } 
            ]);
            return response()->json([
                'success' => true,
                'data' => $classrooms
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
     * path="/transports/create",
     * summary="Create Transport",
     * description="Create Transport",
     * operationId="createTransport",
     * tags={"Transport"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Transport",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","TransportType","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="TransportType", type="string", example=""),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="endDateAt", type="string", example=""),
     *       @OA\Property(property="description", type="string", example=""),
     *       @OA\Property(property="isApproved", type="integer", example="0"),
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
    public function createTransport(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolId) && !empty($request->userId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $endDateAt = !empty($request->endDateAt) ? \Carbon\Carbon::parse($request->endDateAt)->format('Y-m-d') : date('Y-m-d');
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'Transport_type' => $request->TransportType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $transport =  $this->transportRepository->create($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $transport
            ], 200);
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
     * path="/transports/update/{id}",
     * summary="Update Transport",
     * description="Update Transport",
     * operationId="updateTransport",
     * tags={"Transport"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Transport",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Transport",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","submissionDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="submissionDateAt", type="string", example=""),
     *       @OA\Property(property="homeFile", type="string", example="file"),
     *       @OA\Property(property="homeCameraFile", type="string", example="file"),
     *       @OA\Property(property="homeDocFile", type="string", example="file"),
     *       @OA\Property(property="homeFileUrl", type="string", example="url"),
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
    public function updateTransport(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolId) && !empty($request->userId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $endDateAt = !empty($request->endDateAt) ? \Carbon\Carbon::parse($request->endDateAt)->format('Y-m-d') : date('Y-m-d');
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'Transport_type' => $request->TransportType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $transport =  $this->transportRepository->update($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $transport
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
     * @OA\Get(
     *    path="/transports/show/{id}",
     *    operationId="showTransport",
     *    tags={"Transport"},
     *    summary="Show Transport Details",
     *    description="Show Transport Details",
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
    public function showTransport(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $transport = $this->transportRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $transport,
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
     *     path="/transports/delete/{id}",
     *     tags={"Transport"},
     *     summary="Delete Transport",
     *     operationId="deleteTransport",
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
    public function deleteTransport(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $transport =  $this->transportRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $transport
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
     * @OA\Post(
     * path="/transports/settings/save",
     * summary="Save Transport Settings",
     * description="Save Transport Settings",
     * operationId="setSettings",
     * tags={"Transport"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Transport Settings",
     *    @OA\JsonContent(
     *       required={"schoolId", "transport_start_journey", "transport_complete_journey"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="transport_start_journey", type="boolean", example="1"),
     *       @OA\Property(property="transport_complete_journey", type="boolean", example="1"),
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
    public function setSettings(Request $request)
    {
        if ( !empty($request->schoolId) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $startJourneyVal = !empty($request->transport_start_journey) ? $request->transport_start_journey : null;
            $completeJourneyVal = !empty($request->transport_complete_journey) ? $request->transport_complete_journey : null;

            DB::beginTransaction();

            try {
                setSiteSettingData('Transport', 'transport_start_journey', $startJourneyVal, $request->schoolId, $academicYearId);
                setSiteSettingData('Transport', 'transport_complete_journey', $completeJourneyVal, $request->schoolId, $academicYearId);
                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();
                return false;
            }

            $settings = getSiteSettingDataByType('Transport', $request->schoolId, $academicYearId);
      
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $settings
            ], 200);
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
     *    path="/transports/settings",
     *    operationId="getSettings",
     *    tags={"Transport"},
     *    summary="Transport Settings",
     *    description="Transport Settings",
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
    public function getSettings(Request $request)
    {
        if ( !empty($request->schoolId) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $settings = getSiteSettingDataByType('Transport', $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $settings
            ], 200);
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
     *    path="/transports/routes",
     *    operationId="viewStudentTransport",
     *    tags={"student Transport"},
     *    summary="Get all student Transport",
     *    description="Get all student Transport",
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
    public function viewStudentTransport(Request $request)
    {
        if ( !empty($request->schoolId) ) {
            $schoolId = $request->schoolId ?? null;
            $academicYearId = getAcademicYearIdFromSchoolId($schoolId);
            $allocationType = "Student";
  
            $transports = $this->transportRepository->studentAllocateTransport($request->studentId, $allocationType, $schoolId, $academicYearId);

            return response()->json([
                'success' => true,
                'data' => [
                    'transports' => $transports
                ]
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
}