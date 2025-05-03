<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\AssetRequest;
use App\Models\TransportStoppage;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\AssetRepository;
use App\Repositories\IAssetRepository;
use App\Repositories\IDriverRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\TopicRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\IVehicleRepository;
use App\Repositories\IVoucherRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TransportReportController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private ITransportRepository $transportRepository,
        private IVehicleRepository $vehicleRepository,
        private IDriverRepository $driverRepository,
        private IVoucherRepository $voucherRepository,
    ) {
        $this->middleware('permission:view transport', ['only' => [
            'routeSummary',
            'stoppageSummary',
            'areaWiseSummary',
            'routeStoppages',
            'vehicleWiseReport',
            'classWiseReport',
            'studentPaymentDetails',
            'teacherTransportReport',
            'driversLogBook',
            'driverLogBookReport',
            'vehicleSummary',
            'routeWiseDueReport',
            'trackYourVehicle'
        ]]);
        $this->middleware('permission:add transport', ['only' => ['driversLogBookSave']]);
        $this->middleware('permission:edit transport', ['only' => ['updateTransportFee']]);
        $this->middleware('permission:delete transport', ['only' => ['destroyDriverLogBook']]);
    }

    /**
     * routeSummary
     */
    public function routeSummary(Request $request): Response
    {
        $studentData = [];
        $routeName = '';
        if ($request->isMethod('post')) {
            $routeId = $request->input('id');
            $studentData = $this->transportRepository->getAllAllocateTransportByRouteId($routeId);

            if (!empty($studentData)) {
                $studentData = $studentData->map(function ($data) {
                    if ($data?->student?->promotedClassroom != null) {
                        if (!empty($data['student']['classroom'])) {
                            unset($data['student']['classroom']);
                        }

                        $data['student']['classroom_id'] = $data?->student?->promotedClassroom?->id;
                        $data['student']['classroom'] = $data?->student?->promotedClassroom;
                    }

                    return $data;
                });
            }
        }

        // route name
        $totalStudent = 0;
        $routeData = $this->transportRepository->getActiveRoutesWithAllocation();

        if (!empty($routeData)) {
            foreach ($routeData as $route) {
                $totalStudent += $route?->allocated_students_count;
            }
        }

        return Inertia::render('TransportReport/RouteSummary', [
            'routeData' => $routeData,
            'totalStudent' => $totalStudent,
            'studentData' => $studentData,
            'routeName' => $routeName,
        ]);
    }

    /**
     * stoppageSummary
     */
    public function stoppageSummary(Request $request): Response
    {
        $studentData = [];
        $stopPageName = '';

        if ($request->isMethod('post')) {
            $stopPageId = $request->input('id');

            $studentDetail = $this->transportRepository->getById($stopPageId);

            $studentDetail->loadMissing([
                'transportAllocations' => function ($query) {
                    $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId())
                        ->where('allocate_type_for', 'Student')
                        ->where('is_current', 1)
                        ->with([
                            'student' => function ($query) {
                                $query->with(['father', 'classroom', 'promotedClassroom']);
                            },
                            'transportRoute.vehicle'
                        ]);
                }
            ]);

            if (!empty($studentDetail)) {
                if (!empty($studentDetail?->transportAllocations)) {
                    $stopPageName = $studentDetail?->stoppage;
                    foreach ($studentDetail?->transportAllocations as $transportAllocation) {
                        $classroomTitle = $transportAllocation?->student?->classroom?->title;

                        if ($transportAllocation?->student?->promotedClassroom != null) {
                            $classroomTitle = $transportAllocation?->student?->promotedClassroom?->title;
                        }

                        $studentData[] = [
                            'student_name' => $transportAllocation?->student?->first_name . ' ' . $transportAllocation?->student?->middle_name . ' ' . $transportAllocation?->student?->last_name,
                            'admission_no' => $transportAllocation?->student?->admission_no,
                            'classroom_title' => $classroomTitle,
                            'father_name' => $transportAllocation?->student?->father?->first_name . ' ' . $transportAllocation?->student?->father?->middle_name . ' ' . $transportAllocation?->student?->father?->last_name,
                            'vehicle_number' => $transportAllocation?->transportRoute?->vehicle?->vehicle_number,
                            'route_name' => $transportAllocation?->transportRoute?->name,
                        ];
                    }
                }
            }
        }

        // stoppage summary
        $totalStudent = 0;

        $stopPageData = $this->transportRepository->getActiveStoppagesWithAllocation();

        if (!empty($stopPageData)) {
            foreach ($stopPageData as $stopPage) {
                $totalStudent += $stopPage?->transport_allocations_count;
            }
        }

        return Inertia::render('TransportReport/StoppageSummary', [
            'stopPageData' => $stopPageData,
            'totalStudent' => $totalStudent,
            'studentData' => $studentData,
            'stopPageName' => $stopPageName,
        ]);
    }

    public function stoppageSummary_old(Request $request): Response
    {
        $studentData = [];
        $stopPageName = '';

        if ($request->isMethod('post')) {
            $stopPageId = $request->input('id');
            $studentDetail = $this->transportRepository->getById($stopPageId);
            $studentDetail->load('students.student.father', 'students.student.classroom', 'students.transportRoute.vehicle');
            if (!empty($studentDetail)) {
                if (!empty($studentDetail?->students)) {
                    $stopPageName = $studentDetail?->stoppage;
                    foreach ($studentDetail?->students as $student) {
                        $studentData[] = [
                            'student_name' => $student?->student?->first_name . ' ' . $student?->student?->middle_name . ' ' . $student?->student?->last_name,
                            'admission_no' => $student?->student?->admission_no,
                            'classroom_title' => $student?->student?->classroom?->title,
                            'father_name' => $student?->student?->father?->first_name . ' ' . $student?->student?->father?->middle_name . ' ' . $student?->student?->father?->last_name,
                            'vehicle_number' => $student?->transportRoute?->vehicle?->vehicle_number,
                            'route_name' => $student?->transportRoute?->name,
                        ];
                    }
                }
            }
        }

        // stop page name
        $totalStudent = 0;
        $stopPageData = $this->transportRepository->getStoppageAllFromSession();
        if (!empty($stopPageData)) {
            foreach ($stopPageData as $stopPage) {
                $totalStudent += $stopPage?->students_count;
            }
        }

        return Inertia::render('TransportReport/StoppageSummary', [
            'stopPageData' => $stopPageData,
            'totalStudent' => $totalStudent,
            'studentData' => $studentData,
            'stopPageName' => $stopPageName,
        ]);
    }

    /**
     * areaWiseSummary
     */
    public function areaWiseSummary(Request $request): Response
    {
        $uniqueAreas = [];
        $uniqueTitles = [];
        $areaData = [];
        $studentData = [];
        $areaName = '';

        $areas = $this->transportRepository->getAreaAllFromSession()->toArray();

        if (!empty($areas)) {
            foreach ($areas as $area) {
                $title = $area['title'];

                if (!in_array($title, $uniqueTitles)) {
                    $uniqueTitles[] = $title;
                    $uniqueAreas[] = $area;
                }
            }
        }

        if (!empty($uniqueAreas)) {
            foreach ($uniqueAreas as $area) {
                $transportStoppage = $this->transportRepository->getById($area['transport_stoppage_id']);

                $transportStoppage?->loadMissing(['transportAllocations' => function ($query) {
                    $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId())
                        ->where('allocate_type_for', 'Student')
                        ->where('is_current', 1);
                }]);

                $studentCount = $transportStoppage?->transportAllocations?->count();

                if ($studentCount > 0) {
                    $areaData[] = [
                        'area_id' => $area['id'],
                        'area_title' => $area['title'],
                        'transport_stoppage_id' => $area['transport_stoppage_id'],
                        'allocate_transport_id' => $area['allocate_transport_id'],
                        'student_count' => $studentCount,
                    ];
                }
            }
        }

        if ($request->isMethod('post')) {
            $stopPageId = $request->input('transport_stoppage_id');
            $areaId = $request->input('area_id');

            $studentDetail = $this->transportRepository->getById($stopPageId);

            $studentDetail->loadMissing([
                'transportAllocations' => function ($query) {
                    $query->where('school_id', getUserSchoolId())
                        ->where('academic_year_id', getAcademicYearId())
                        ->where('allocate_type_for', 'Student')
                        ->where('is_current', 1)
                        ->with([
                            'student' => function ($query) {
                                $query->with(['father', 'classroom', 'promotedClassroom']);
                            },
                            'transportRoute.vehicle'
                        ]);
                }
            ]);

            if (!empty($studentDetail)) {
                if (!empty($studentDetail?->transportAllocations)) {
                    $areaName = $this->transportRepository->getAreaById($areaId)->title;
                    foreach ($studentDetail?->transportAllocations as $transportAllocation) {
                        $classroomTitle = $transportAllocation?->student?->classroom?->title;

                        if ($transportAllocation?->student?->promotedClassroom != null) {
                            $classroomTitle = $transportAllocation?->student?->promotedClassroom?->title;
                        }

                        $studentData[] = [
                            'student_name' => $transportAllocation?->student?->first_name . ' ' . $transportAllocation?->student?->middle_name . ' ' . $transportAllocation?->student?->last_name,
                            'admission_no' => $transportAllocation?->student?->admission_no,
                            'classroom_title' => $classroomTitle,
                            'father_name' => $transportAllocation?->student?->father?->first_name . ' ' . $transportAllocation?->student?->father?->middle_name . ' ' . $transportAllocation?->student?->father?->last_name,
                            'vehicle_number' => $transportAllocation?->transportRoute?->vehicle?->vehicle_number,
                            'route_name' => $transportAllocation?->transportRoute?->name,
                            'transport_fee' => $transportAllocation?->amount,
                        ];
                    }
                }
            }
        }

        return Inertia::render('TransportReport/AreaWiseSummary', [
            'areaData' => $areaData,
            'areaName' => $areaName,
            'studentData' => $studentData,
        ]);
    }

    public function areaWiseSummary_old(Request $request): Response
    {
        $uniqueAreas = [];
        $uniqueTitles = [];
        $areaData = [];
        $studentData = [];
        $areaName = '';

        $areas = $this->transportRepository->getAreaAllFromSession()->toArray();
        if (!empty($areas)) {
            foreach ($areas as $area) {
                $title = $area['title'];
                if (!in_array($title, $uniqueTitles)) {
                    $uniqueTitles[] = $title;
                    $uniqueAreas[] = $area;
                }
            }
        }
        if (!empty($uniqueAreas)) {
            foreach ($uniqueAreas as $area) {
                $transportStoppage = $this->transportRepository->getById($area['transport_stoppage_id']);
                $students = $transportStoppage?->students()->count();
                $areaData[] = [
                    'area_id' => $area['id'],
                    'area_title' => $area['title'],
                    'transport_stoppage_id' => $area['transport_stoppage_id'],
                    'allocate_transport_id' => $area['allocate_transport_id'],
                    'student_count' => $students,
                ];
            }
        }
        if ($request->isMethod('post')) {
            $stopPageId = $request->input('transport_stoppage_id');
            $areaId = $request->input('area_id');
            $studentDetail = $this->transportRepository->getById($stopPageId);
            $studentDetail->load('students.student.father', 'students.student.classroom', 'students.transportRoute.vehicle');
            if (!empty($studentDetail)) {
                if (!empty($studentDetail?->students)) {
                    $areaName = $this->transportRepository->getAreaById($areaId)->title;
                    foreach ($studentDetail?->students as $student) {
                        $studentData[] = [
                            'student_name' => $student?->student?->first_name . ' ' . $student?->student?->middle_name . ' ' . $student?->student?->last_name,
                            'admission_no' => $student?->student?->admission_no,
                            'classroom_title' => $student?->student?->classroom?->title,
                            'father_name' => $student?->student?->father?->first_name . ' ' . $student?->student?->father?->middle_name . ' ' . $student?->student?->father?->last_name,
                            'vehicle_number' => $student?->transportRoute?->vehicle?->vehicle_number,
                            'route_name' => $student?->transportRoute?->name,
                            'transport_fee' => $student?->amount,
                        ];
                    }
                }
            }
        }
        return Inertia::render('TransportReport/AreaWiseSummary', [
            'areaData' => $areaData,
            'areaName' => $areaName,
            'studentData' => $studentData,
        ]);
    }

    /**
     * routeStoppages
     */
    public function routeStoppages(Request $request): Response
    {
        $routeStoppages = [];
        $stoppages = $this->transportRepository->getRouteStoppageData();
        $stoppages->load(['area', 'students.student.classroom', 'teachers.teacher']);

        if (!empty($stoppages)) {
            foreach ($stoppages as $stoppage) {
                $stopData = [
                    'id' => $stoppage?->id,
                    'order' => $stoppage?->order,
                    'stoppage' => $stoppage?->stoppage,
                    'area_name' => $stoppage?->area?->title,
                    'distance' => $stoppage?->distance,
                    'pickup_time' => \Carbon\Carbon::parse($stoppage?->pickup_time_at)->format('h:i:s A'),
                    'drop_time' => \Carbon\Carbon::parse($stoppage?->drop_time)->format('h:i:s A'),
                    'students' => [],
                    'teachers' => [],
                ];
                foreach ($stoppage?->students as $stu) {
                    $stopData['students'][] = [
                        'student_name' => $stu?->student?->first_name . ' ' . $stu?->student?->middle_name . ' ' . $stu?->student?->last_name,
                        'admission_no' => $stu?->student?->admission_no,
                        'classroom_title' => $stu?->student?->classroom?->title,
                    ];
                }
                foreach ($stoppage?->teachers as $teacher) {
                    $stopData['teachers'][] = [
                        'teacher_name' => $teacher?->teacher?->first_name . ' ' . $teacher?->teacher?->middle_name . ' ' . $teacher?->teacher?->last_name,
                        'teacher_phone' => $teacher?->teacher?->phone,
                    ];
                }
                $routeStoppages[] = $stopData;
            }
        }

        return Inertia::render('TransportReport/RouteStoppages', [
            'routeStoppages' => $routeStoppages,
        ]);
    }


    /**
     * vehicleWiseReport
     */
    public function vehicleWiseReport(Request $request): Response
    {
        $studentData = [];
        $teacherData = [];
        if ($request->isMethod('post')) {
            $vehicleId = $request->input('vehicle_id');
            $stoppageId = $request->input('transport_stoppage_id');
            $allocateTransport = $this->transportRepository->getAllAllocateTransport();
            $allocateTransport->load(['transportStoppage', 'student.classroom', 'student.father', 'transportRoute.vehicle', 'teacher']);
            if (!empty($allocateTransport)) {
                foreach ($allocateTransport as $item) {
                    if (($vehicleId && $item?->transportRoute?->vehicle_id == $vehicleId) && ($stoppageId && $item?->transport_stoppage_id == $stoppageId)) {
                        if ($item['allocate_type_for'] === 'Student') {
                            $studentData[] = [
                                'id' => $item?->id,
                                'student_id' => $item?->student_id,
                                'transport_route_id' => $item?->transport_route_id,
                                'vehicle_id' => $item?->transportRoute?->vehicle?->id,
                                'student_name' => $item?->student?->first_name . ' ' . $item?->student?->middle_name . ' ' . $item?->student?->last_name,
                                'admission_no' => $item?->student?->admission_no,
                                'classroom_title' => $item?->student?->classroom?->title,
                                'father_name' => $item?->student?->father?->first_name . ' ' . $item?->student?->father?->middle_name . ' ' . $item?->student?->father?->last_name,
                                'father_phone' => $item?->student?->father?->phone,
                                'stop_page_title' => $item?->transportStoppage?->stoppage,
                                'pickup_time' => \Carbon\Carbon::parse($item?->transportStoppage?->pickup_time_at)->format('h:i:s A'),
                                'pickup_time' => \Carbon\Carbon::parse($item?->transportStoppage?->drop_time_at)->format('h:i:s A'),
                            ];
                        } else {
                            $teacherData[] = [
                                'id' => $item->id,
                                'teacher_id' => $item->staff_id,
                                'transport_route_id' => $item->transport_route_id,
                                'vehicle_id' => $item->transportRoute?->vehicle?->id,
                                'teacher_name' => $item?->teacher?->first_name . ' ' . $item?->teacher?->middle_name . ' ' . $item?->teacher?->last_name,
                                'teacher_phone' => $item?->teacher?->phone,
                                'stop_page_title' => $item?->transportStoppage?->stoppage,
                            ];
                        }
                    }
                }
            }
        }

        $vehicles = $this->vehicleRepository->getActiveAll();
        $vehicleData = $vehicles->map(fn($vehicle) => [
            'id' => $vehicle->id,
            'title' => $vehicle->vehicle_number,
        ])->all();

        $routes = $this->transportRepository->getActiveAllRoute();
        $routeData = $routes->map(fn($route) => [
            'id' => $route->id,
            'title' => $route->name,
            'vehicle_id' => $route->vehicle_id,
        ])->all();

        return Inertia::render('TransportReport/VehicleWiseReport', [
            'studentData' => $studentData,
            'teacherData' => $teacherData,
            'vehicleData' => $vehicleData,
            'routeData' => $routeData,
        ]);
    }

    /**
     * classWiseReport
     */
    public function classWiseReport(Request $request): Response
    {
        $studentData = [];
        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            if (!empty($classroomId)) {
                $allocateStudents = $this->transportRepository->getAllocateTransportByClassroomId($classroomId);

                $allocateStudents->load(['student.classroom', 'student.promotedClassroom', 'transportStoppage', 'transportRoute.vehicle.driver', 'transportRoute.vehicle.conductor', 'transportRoute.coordinator']);

                if (!empty($allocateStudents)) {
                    $allocateStudents = $allocateStudents->map(function ($data) {
                        if ($data?->student?->promotedClassroom != null) {
                            if (!empty($data['student']['classroom'])) {
                                unset($data['student']['classroom']);
                            }

                            $data['student']['classroom_id'] = $data?->student?->promotedClassroom?->id;
                            $data['student']['classroom'] = $data?->student?->promotedClassroom;
                        }

                        return $data;
                    });
                }

                if (!empty($allocateStudents)) {
                    foreach ($allocateStudents as $item) {
                        $studentData[] = [
                            'id' => $item?->id,
                            'student_id' => $item?->student_id,
                            'student_name' => $item?->student?->first_name . ' ' . $item?->student?->middle_name . ' ' . $item?->student?->last_name,
                            'admission_no' => $item?->student?->admission_no,
                            'classroom_title' => $item?->student?->classroom?->title,
                            'father_name' => $item?->student?->father?->first_name . ' ' . $item?->student?->father?->middle_name . ' ' . $item?->student?->father?->last_name,
                            'father_phone' => $item?->student?->father?->phone,
                            'route_name' => $item?->transportRoute?->name,
                            'stop_page_title' => $item?->transportStoppage?->stoppage,
                            'vehicle_number' => $item?->transportRoute?->vehicle?->vehicle_number,
                            'transport_fee' => $item?->amount,
                            'coordinator' => $item?->transportRoute?->coordinator?->first_name . ' ' . $item?->transportRoute?->coordinator?->middle_name . ' ' . $item?->transportRoute?->coordinator?->last_name,
                            'driver_name' => $item?->transportRoute?->vehicle?->driver?->first_name . ' ' . $item?->transportRoute?->vehicle?->driver?->last_name,
                            'conductor_name' => $item?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $item?->transportRoute?->vehicle?->conductor?->last_name,
                        ];
                    }
                }
            }
        }
        $classrooms = $this->transportRepository->getAllAllocateClassroom()->toArray();
        $uniqueClassrooms = [];
        foreach ($classrooms as $item) {
            $uniqueClassrooms[$item['classroom_id']]['classroom_id'] = $item['classroom_id'];
            $uniqueClassrooms[$item['classroom_id']]['classroom_title'] = $item['title'];
            $uniqueClassrooms[$item['classroom_id']]['students'][] = $item['student_id'];
        }
        return Inertia::render('TransportReport/ClassWiseReport', [
            'classrooms' => $uniqueClassrooms,
            'studentData' => $studentData,
        ]);
    }

    /**
     * studentPaymentDetails
     */
    public function studentPaymentDetails(Request $request): Response
    {
        $allocateStudents = $this->transportRepository->getStudentPaymentReport();
        $vouchers = $this->voucherRepository->getActiveAll();
        $students = array();
        $StudentFees = array();

        if (!empty($allocateStudents)) {
            foreach ($allocateStudents as $allocate) {
                $tempStudent = array(
                    'id' => $allocate->id,
                    'name' => getCocatenationTitle($allocate->first_name, $allocate->middle_name, $allocate->last_name),
                    'admission_no' => $allocate->admission_no,
                    'classroom_title' => $allocate->classroom_title,
                    'transport_type' => $allocate->transport_type,
                    'stoppage_title' => $allocate->stoppage_title,
                    'father_phone' => $allocate->father_phone,
                    'amount' => $allocate->amount,
                );
                $students[$allocate->id] = $tempStudent;
                $StudentFees[$allocate->id][$allocate->vouchers_title] = $allocate->amount;
            }
        }

        return Inertia::render('TransportReport/StudentPaymentDetails', [
            'vouchers' => $vouchers,
            'students' => $students,
            'StudentFees' => $StudentFees,
        ]);
    }

    /**
     * teacherTransportReport
     */
    public function teacherTransportReport(Request $request): Response
    {
        $teacherData = [];
        if ($request->isMethod('post')) {
            $transportRouteId = $request->input('transport_route_id');
            $transportTeachers = $this->transportRepository->getAllTeacherByTransportRouteId($transportRouteId);
            $transportTeachers->load(['teacher', 'transportRoute.vehicle', 'transportStoppage']);
            if (!empty($transportTeachers)) {
                foreach ($transportTeachers as $item) {
                    $teacherData[] = [
                        'id' => $item?->id,
                        'staff_id' => $item?->staff_id,
                        'teacher_name' => $item?->teacher?->first_name . ' ' . $item?->teacher?->middle_name . ' ' . $item?->teacher?->last_name,
                        'teacher_phone' => $item?->teacher?->phone,
                        'route_name' => $item?->transportRoute?->name,
                        'stop_page_title' => $item?->transportStoppage?->stoppage,
                        'vehicle_number' => $item?->transportRoute?->vehicle?->vehicle_number,
                        'transport_fee' => $item?->amount,
                    ];
                }
            }
        }

        $routes = $this->transportRepository->getActiveAllRoute();
        $routeData = $routes->map(fn($route) => [
            'id' => $route->id,
            'title' => $route->name,
        ])->all();

        return Inertia::render('TransportReport/TeacherTransportReport', [
            'routeData' => $routeData,
            'teacherData' => $teacherData,
        ]);
    }

    /**
     * driversLogBook
     */
    public function driversLogBook(Request $request): Response
    {
        $driverLogBooks = [];
        $stoppageData = [];
        $vehicleData = [];

        $driverLogBooks = $this->driverRepository->getActiveAllDriverLogBook();
        $driverLogBooks->load([
            'fromStoppage' => function ($query) {
                $query->select('id', 'stoppage');
            },
            'toStoppage' => function ($query) {
                $query->select('id', 'stoppage');
            },
        ]);

        $stoppages = $this->transportRepository->getAllActiveNameId();
        $stoppageData = $stoppages->map(fn($stoppage) => [
            'id' => $stoppage->id,
            'title' => $stoppage->stoppage,
        ])->all();

        $vehicles = $this->vehicleRepository->getActiveAllNumberId();
        $vehicleData = $vehicles->map(fn($vehicle) => [
            'id' => $vehicle->id,
            'title' => $vehicle->vehicle_number,
        ])->all();

        return Inertia::render('TransportReport/DriversLogBook', [
            'stoppageData' => $stoppageData,
            'vehicleData' => $vehicleData,
            'driverLogBooks' => $driverLogBooks,
        ]);
    }

    /**
     * driversLogBookSave
     */
    public function driversLogBookSave(Request $request)
    {
        $vehicleId = $request->input('vehicle_id');
        $input = $request->input('items');
        if (!empty($vehicleId) && $input) {
            foreach ($input as $item) {
                $dataArray = array(
                    'school_id' => getUserSchoolId() ?? null,
                    'academic_year_id' => getAcademicYearId() ?? null,
                    'vehicle_id' => $vehicleId ?? null,
                    'from_transport_stoppage_id' => $item['from_transport_stoppage_id'] ?? null,
                    'to_transport_stoppage_id' => $item['to_transport_stoppage_id'] ?? null,
                    'date_at' => !empty($item['date_at']) ? \Carbon\Carbon::parse($item['date_at'])->format('Y-m-d') : null,
                    'in_time_at' => !empty($item['in_time_at']) ? \Carbon\Carbon::parse($item['in_time_at'])->format('H:i:s') : null,
                    'out_time_at' => !empty($item['out_time_at']) ? \Carbon\Carbon::parse($item['out_time_at'])->format('H:i:s') : null,
                    'starting_km' => $item['starting_km'] ?? 0,
                    'last_km' => $item['last_km'] ?? 0,
                    'total_km' => $item['total_km'] ?? 0,
                    'fuel_ltr' => $item['fuel_ltr'] ?? 0,
                    'fuel_rate' => $item['fuel_rate'] ?? 0,
                    'mileage' => $item['mileage'] ?? 0,
                    'status' => Status::ACTIVE,
                );
                $driver = $this->driverRepository->createDriverLogBook($dataArray);
            }
            if (!empty($driver)) {
                return redirect()->route('transport_report.drivers_log_book')->with('message', 'Driver log saved successfully.');
            }
        } else {
            return redirect()->route('transport_report.drivers_log_book')->with('error', 'Please select required fields.');
        }
    }

    /**
     * destroyDriverLogBook
     */
    public function destroyDriverLogBook(String $id): RedirectResponse
    {
        $driverLogBook = $this->driverRepository->getByDriverLogBookId($id);
        if (!$driverLogBook) {
            return redirect()->route('transport_report.drivers_log_book')->with('error', 'Something goes wrong.');
        }
        $this->driverRepository->deleteDriverLogBook($id);
        return redirect()->route('transport_report.drivers_log_book')->with('message', 'Driver log book deleted successfully.');
    }

    /**
     * driverLogBookReport
     */
    public function driverLogBookReport(Request $request): Response
    {
        $driverLogBooks = [];
        $vehicleData = [];
        $vehicleId = '';
        $startDate = '';
        $endDate = '';

        if ($request->isMethod('post')) {
            $vehicleId = $request->input('vehicle_id');
            $startDate = !empty($request->input('start_date')) ? \Carbon\Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
            $startDate = !empty($request->input('end_date')) ? \Carbon\Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';
        }
        $driverLogBooks = $this->driverRepository->getDriverLogBookReport($vehicleId, $startDate, $endDate);
        $driverLogBooks->load([
            'fromStoppage' => function ($query) {
                $query->select('id', 'stoppage');
            },
            'toStoppage' => function ($query) {
                $query->select('id', 'stoppage');
            },
            'vehicle' => function ($query) {
                $query->select('id', 'vehicle_number');
            },
        ]);

        $vehicles = $this->vehicleRepository->getActiveAllNumberId();
        $vehicleData = $vehicles->map(fn($vehicle) => [
            'id' => $vehicle->id,
            'title' => $vehicle->vehicle_number,
        ])->all();

        return Inertia::render('TransportReport/DriverLogBookReport', [
            'vehicleData' => $vehicleData,
            'driverLogBooks' => $driverLogBooks,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function updateTransportFee(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('TransportReport/UpdateTransportFee', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * vehicleSummary
     */
    public function vehicleSummary(Request $request): Response
    {

        $studentData = [];
        $routeName = '';

        if ($request->isMethod('post')) {
            $routeId = $request->input('transport_route_id');
            $studentDetail = $this->transportRepository->getAllStudentByTransportRouteId($routeId);
            $studentDetail->load('student.father', 'student.classroom', 'transportStoppage');
            if (!empty($studentDetail)) {
                // $routeName = $studentDetail->name;
                if (!empty($studentDetail)) {
                    foreach ($studentDetail as $student) {
                        $studentData[] = [
                            'student_id' => $student?->student_id,
                            'student_name' => $student?->student?->first_name . ' ' . $student?->student?->middle_name . ' ' . $student?->student?->last_name,
                            'admission_no' => $student?->student?->admission_no,
                            'classroom_title' => $student?->student?->classroom?->title,
                            'father_name' => $student?->student?->father?->first_name . ' ' . $student?->student?->father?->middle_name . ' ' . $student?->student?->father?->last_name,
                            'father_mobile' => $student?->student?->father?->phone,
                            'stoppage_name' => $student?->transportStoppage?->stoppage
                        ];
                    }
                }
            }
        }

        // route name
        $routeDetails = [];
        $routeData = $this->transportRepository->getRoutesAllFromSession();
        $routeData->load('vehicle');
        if (!empty($routeData)) {
            foreach ($routeData as $route) {
                $routeDetails[] = [
                    'transport_route_id' => $route['id'],
                    'vehicle_id' => $route['vehicle_id'],
                    'route_name' => $route['name'],
                    'vehicle_name' => $route['vehicle']['vehicle_number'],
                    'students_count' => $route['students_count'],
                ];
            }
        }

        return Inertia::render('TransportReport/VehicleSummary', [
            'routeDetails' => $routeDetails,
            'studentData' => $studentData,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function routeWiseDueReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('TransportReport/RouteWiseDueReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * track your vehicle
     */
    public function trackYourVehicle(Request $request): Response
    {
        $vehicleDetails = [];
        $vehicles = $this->vehicleRepository->getActiveAll();

        if (!empty($vehicles)) {
            $vehicles->load('driver');
            $vehicleDetails = [];
            if (!empty($vehicles)) {
                foreach ($vehicles as $vehicle) {
                    $vehicleDetails[] = [
                        'vehicle_id' => $vehicle?->id,
                        'vehicle_number' => $vehicle?->vehicle_number ?? '',
                        'device_id' => $vehicle?->device_id ?? '',
                        'driver_name' => getCocatenationTitle($vehicle?->driver?->first_name, '', $vehicle?->driver?->last_name),
                        'driver_name' => $vehicle?->driver?->first_name,
                    ];
                }
            }
        }

        return Inertia::render('TransportReport/TrackYourVehicle', [
            'vehicleDetails' => $vehicleDetails,
        ]);
    }
}
