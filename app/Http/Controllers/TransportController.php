<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\TransportType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\IFeeRepository;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\VoucherRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\IVoucherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\TransportRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\AllocateTransportRequest;
use Illuminate\Support\Facades\Session;

class TransportController extends Controller
{

    public function __construct(
        private ITransportRepository $transportRepository,
        private IVoucherRepository $voucherRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IFeeRepository $feeRepository,
    ) {
        $this->middleware('permission:view transport', ['only' => ['index', 'misReport']]);
        $this->middleware('permission:add transport', ['only' => ['allocation', 'allocationSave', 'deallocationSave', 'allocationBulk', 'allocationBulkSave']]);
        $this->middleware('permission:edit transport', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete transport', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $transports = $this->transportRepository->getActiveAll();

        return Inertia::render('Transport/Show', [
            'transports' => $transports,
        ]);
    }

    /**
     * Display the mis Report.
     */
    public function misReport(Request $request): Response
    {
        $misCounts = $this->transportRepository->getMisReportCounts();
        $transports = $this->transportRepository->getActiveAll();

        // class wise data
        $classroomData = $this->classroomRepository->getActiveAll();
        $classroomsTrans = $this->transportRepository->getReportAllocateTransportFromClassroom();
        $classroomTransports = array();
        if (!empty($classroomData)) {
            foreach ($classroomData as $class) {
                $tempArray = array(
                    'id' => $class->id,
                    'title' => $class->title,
                    'count' => !empty($classroomsTrans[$class->title]) ? $classroomsTrans[$class->title] : 0
                );
                array_push($classroomTransports, $tempArray);
            }
        }

        // area wise data
        $areaData = $this->transportRepository->getActiveAllArea();
        $areaTrans = $this->transportRepository->getReportAllocateTransportFromArea();

        $tempareaTransports = array();
        if (!empty($areaTrans)) {
            foreach ($areaTrans as $allocate) {
                $tempareaTransports[$allocate->id][] = $allocate->student_id;
            }
        }

        $areaTransports = array();
        if (!empty($areaData)) {
            foreach ($areaData as $area) {
                $stdCount = !empty($tempareaTransports[$area->id]) ? array_unique($tempareaTransports[$area->id], SORT_STRING) : [];
                $tempArray = array(
                    'id' => $area->id,
                    'title' => $area->title,
                    'count' => count($stdCount)
                );
                array_push($areaTransports, $tempArray);
            }
        }

        return Inertia::render('Transport/MisReport', [
            'transports' => $transports,
            'misCounts' => $misCounts,
            'classroomTransports' => $classroomTransports,
            'areaTransports' => $areaTransports,
        ]);
    }

    /**
     * allocation
     */
    public function allocation(Request $request): Response
    {
        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        // available seats - school wise
        $availableSeats = [];
        $allAllocateTransports = $this->transportRepository->getAllAllocateTransportCount()->toArray();
        $totalSeats = $this->transportRepository->getSeatCount()->toArray();
        foreach ($totalSeats as $route) {
            $routeId = $route['transport_route_id'];
            $totalSeat = $route['total_seat'];

            // Calculate allocated seats for this route
            $allocated = 0;
            foreach ($allAllocateTransports as $seat) {
                if ($seat['transport_route_id'] === $routeId) {
                    $allocated++;
                }
            }
            // Calculate available seats
            $availableSeats[] = [
                "transport_route_id" => $routeId,
                "total_seat" => $totalSeat > 0 ? $totalSeat : 0,
                "available_seats" => $totalSeat - $allocated > 0 ? $totalSeat - $allocated : 0,
            ];
        }

        $allStudentData = [];
        $studentDetailsData = [];
        $teacherDetailsData = [];
        $prevStudentDetailsData = [];
        $prevTeacherDetailsData = [];
        $student = null;
        $staff = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $studentId = $request->student_id ?? null;
            $admissionNo = $request->admission_no ?? '';
            $staffId = $request->staff_id ?? null;
            $allocateTypeFor = $request->allocate_type_for ?? '';

            if (empty($studentId) && !empty($admissionNo)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if ($student == null && !empty($studentId)) {
                $student = $this->studentRepository->getStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
                $studentId = $student?->id;
            }

            // student transport
            if ($allocateTypeFor == 'Student') {
                if (!empty($studentId)) {
                    // student current allocation
                    $studentCurrentAllocation = $this->transportRepository->getStudentCurrentAllocateTransportByStudentId($studentId);

                    if (!empty($studentCurrentAllocation)) {
                        $studentDetailsData = [
                            'student_id' => $studentCurrentAllocation?->student_id,
                            'route_name' => $studentCurrentAllocation?->transportRoute?->name,
                            'transport_type' => $studentCurrentAllocation?->transport_type,
                            'vehicle_type' => $studentCurrentAllocation?->transportRoute?->vehicle?->type,
                            'driver_name' => $studentCurrentAllocation?->transportRoute?->vehicle?->driver?->first_name . ' ' . $studentCurrentAllocation?->transportRoute?->vehicle?->driver?->last_name,
                            'driver_mobile' => $studentCurrentAllocation?->transportRoute?->vehicle?->driver?->contact,
                            'applied_on_date_at' => $studentCurrentAllocation?->applied_on_date_at,
                            'start_from_date' => $studentCurrentAllocation?->start_from_date,
                            'vehicle_number' => $studentCurrentAllocation?->transportRoute?->vehicle?->vehicle_number,
                            'conductor_name' => $studentCurrentAllocation?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $studentCurrentAllocation?->transportRoute?->vehicle?->conductor?->last_name,
                            'conductor_mobile' => $studentCurrentAllocation?->transportRoute?->vehicle?->conductor?->contact,
                            'transport_fee' => $studentCurrentAllocation?->amount,
                            'timing' => $studentCurrentAllocation?->transportStoppage?->pickup_time_at,
                        ];
                    }

                    // student previous allocations
                    $studentPrevCurrentAllocations = $this->transportRepository->getStudentAllPreviousAllocateTransports($studentId);

                    if (!empty($studentPrevCurrentAllocations)) {
                        foreach ($studentPrevCurrentAllocations as $studentPrevCurrentAllocation) {
                            $prevStudentDetailsData[] = [
                                'student_id' => $studentPrevCurrentAllocation?->student_id,
                                'route_name' => $studentPrevCurrentAllocation?->transportRoute?->name,
                                'applied_on_date_at' => $studentPrevCurrentAllocation?->applied_on_date_at,
                                'start_from_date' => $studentPrevCurrentAllocation?->start_from_date,
                                'vehicle_number' => $studentPrevCurrentAllocation?->transportRoute?->vehicle?->vehicle_number,
                                'transport_fee' => $studentPrevCurrentAllocation?->amount,
                                'stoppage' => $studentPrevCurrentAllocation?->transportStoppage?->stoppage,
                            ];
                        }
                    }
                }

                if (!empty($classroomId)) {
                    //  using transport students
                    $transportUsingStudentIds = $this->transportRepository->getAllAllocateTransportStudentIds($classroomId);
                    $transportStudent = $this->studentRepository->getStudentDataByStudentsIds($transportUsingStudentIds, $classroomId);

                    // not using transport students
                    $notUsingTransportStudent = $this->studentRepository->getStudentDataExceptThisIds($transportUsingStudentIds, $classroomId);

                    if (count($notUsingTransportStudent) > 0) {
                        // update classroom id for promoted student
                        $notUsingTransportStudent->loadMissing(['promotedClassroom']);

                        $notUsingTransportStudent = $notUsingTransportStudent->map(function ($student) {
                            if (
                                $student?->promotedClassroom != null
                            ) {
                                $student['classroom_id'] = $student?->promotedClassroom?->id;
                            }
                            return $student;
                        });

                        $stuArr = [
                            'name' => 'Not Using Transport',
                            'options' => [],
                        ];

                        $tempNotUseSts = [];

                        foreach ($notUsingTransportStudent as $notTStu) {
                            $stdRollNo = !empty($notTStu?->classroomRoll?->roll_no) ? $notTStu?->classroomRoll?->roll_no . ' - ' : '';
                            $stdSerialNo = !empty($notTStu?->classroomRoll?->roll_no) ? intval($notTStu?->classroomRoll?->roll_no) : rand(1000, 9999);

                            $tempNotUseSts[$stdSerialNo] = [
                                'id' => $notTStu->id,
                                'classroom_id' => $notTStu->classroom_id,
                                'name' => $stdRollNo . getCocatenationTitle($notTStu->first_name, $notTStu->middle_name, $notTStu->last_name),
                                'admission_no' => $notTStu->admission_no,
                            ];
                        }

                        ksort($tempNotUseSts);

                        $stuArr['options'] = array_values($tempNotUseSts);

                        $allStudentData[] = $stuArr;
                    }

                    if (count($transportStudent) > 0) {
                        // update classroom id for promoted student
                        $transportStudent->loadMissing(['promotedClassroom']);

                        $transportStudent = $transportStudent->map(function ($student) {
                            if (
                                $student?->promotedClassroom != null
                            ) {
                                $student['classroom_id'] = $student?->promotedClassroom?->id;
                            }

                            return $student;
                        });

                        $stuArr = [
                            'name' => 'Using Transport',
                            'options' => [],
                        ];

                        $tempUseSts = [];

                        foreach ($transportStudent as $tStu) {
                            $stdRollNo = !empty($tStu?->classroomRoll?->roll_no) ? $tStu?->classroomRoll?->roll_no . ' - ' : '';
                            $stdSerialNo = !empty($tStu?->classroomRoll?->roll_no) ? intval($tStu?->classroomRoll?->roll_no) : rand(1000, 9999);

                            $tempUseSts[$stdSerialNo] = [
                                'id' => $tStu->id,
                                'classroom_id' => $tStu->classroom_id,
                                'name' => $stdRollNo . getCocatenationTitle($tStu->first_name, $tStu->middle_name, $tStu->last_name),
                                'admission_no' => $tStu->admission_no,
                            ];
                        }

                        ksort($tempUseSts);

                        $stuArr['options'] = array_values($tempUseSts);

                        $allStudentData[] = $stuArr;
                    }
                }
            }

            // staff transport
            if ($allocateTypeFor == 'Teacher' && !empty($staffId)) {
                // staff
                $staff = $this->staffRepository->getStaffById($staffId);

                // staff current allocation
                $staffTransportAllocation = $this->transportRepository->getStaffCurrentAllocateTransportByStaffId($staffId);

                if (!empty($staffTransportAllocation)) {
                    $teacherDetailsData = [
                        'staff_id' => $staffTransportAllocation?->staff_id,
                        'route_name' => $staffTransportAllocation?->transportRoute?->name,
                        'transport_type' => $staffTransportAllocation?->transport_type,
                        'vehicle_type' => $staffTransportAllocation?->transportRoute?->vehicle?->type,
                        'driver_name' => $staffTransportAllocation?->transportRoute?->vehicle?->driver?->first_name . ' ' . $staffTransportAllocation?->transportRoute?->vehicle?->driver?->last_name,
                        'driver_mobile' => $staffTransportAllocation?->transportRoute?->vehicle?->driver?->contact,
                        'applied_on_date_at' => $staffTransportAllocation?->applied_on_date_at,
                        'start_from_date' => $staffTransportAllocation?->start_from_date,
                        'vehicle_number' => $staffTransportAllocation?->transportRoute?->vehicle?->vehicle_number,
                        'conductor_name' => $staffTransportAllocation?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $staffTransportAllocation?->transportRoute?->vehicle?->conductor?->last_name,
                        'conductor_mobile' => $staffTransportAllocation?->transportRoute?->vehicle?->conductor?->contact,
                        'transport_fee' => $staffTransportAllocation?->amount,
                        'timing' => $staffTransportAllocation?->transportStoppage?->pickup_time_at,
                    ];
                }

                // staff previous allocations
                $staffPrevTransportAllocations = $this->transportRepository->getStaffAllPreviousAllocateTransports($staffId);

                if (!empty($staffPrevTransportAllocations)) {
                    foreach ($staffPrevTransportAllocations as $staffPrevTransportAllocation) {
                        $prevTeacherDetailsData[] = [
                            'staff_id' => $staffPrevTransportAllocation?->staff_id,
                            'route_name' => $staffPrevTransportAllocation?->transportRoute?->name,
                            'applied_on_date_at' => $staffPrevTransportAllocation?->applied_on_date_at,
                            'start_from_date' => $staffPrevTransportAllocation?->start_from_date,
                            'vehicle_number' => $staffPrevTransportAllocation?->transportRoute?->vehicle?->vehicle_number,
                            'transport_fee' => $staffPrevTransportAllocation?->amount,
                            'stoppage' => $staffPrevTransportAllocation?->transportStoppage?->stoppage,
                        ];
                    }
                }
            }
        }

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        //voucher
        $vouchers = [];

        if ($transportFeeStructureSetting != null) {
            if ($transportFeeStructureSetting->value == 'fee') {
                $vouchers = $this->feeRepository->getActiveFeesAll()->map(fn($voucher) => [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                    'payment' => $voucher?->payments,
                ])->all();
            } else if ($transportFeeStructureSetting->value == 'voucher') {
                $vouchers = $this->voucherRepository->getActiveVoucherAll()->map(fn($voucher) => [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                    'payment' => $voucher?->payment,
                ])->all();
            }
        }

        $routeData = $this->transportRepository->getAllRoute();
        $routes = $routeData->map(fn($route) => [
            'id' => $route->id,
            'title' => $route->name,
        ])->all();

        // Transport Type
        $transportType = TransportType::cases();
        $transportTypeArr = array_map(function ($transport) {
            return ['id' => $transport->value, 'title' => $transport->value];
        }, $transportType);

        // get stoppage
        $stoppageData = $this->transportRepository->getActiveAll();
        $stoppages = $stoppageData->map(fn($stoppage) => [
            'id' => $stoppage?->id,
            'title' => $stoppage?->stoppage,
            'transport_route_id' => $stoppage?->transport_route_id,
            'pick_price' => $stoppage?->pick_price,
            'drop_price' => $stoppage?->drop_price,
            'pick_drop_price' => $stoppage?->pick_drop_price,
        ])->all();

        // teacher
        $teacherData = $this->staffRepository->getActiveTeacherData();
        $teachers = $teacherData->map(fn($teacher) => [
            'id' => $teacher->id,
            'title' => $teacher->first_name . ' ' . $teacher->middle_name . '' . $teacher->last_name,
        ])->all();

        return Inertia::render('Transport/Allocation', [
            'availableSeats' => $availableSeats,
            'classrooms' => $classrooms,
            'vouchers' => $vouchers,
            'routes' => $routes,
            'transportTypeArr' => $transportTypeArr,
            'stoppages' => $stoppages,
            'teachers' => $teachers,
            'studentDetailsData' => $studentDetailsData,
            'teacherDetailsData' => $teacherDetailsData,
            'prevStudentDetailsData' => $prevStudentDetailsData,
            'prevTeacherDetailsData' => $prevTeacherDetailsData,
            'transportFeeStructureSetting' => $transportFeeStructureSetting,
            'allStudentData' => $allStudentData,
            'student' => $student,
            'staff' => $staff
        ]);
    }

    public function allocation_old(Request $request): Response
    {
        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        // available seats - school wise
        $availableSeats = [];
        $allAllocateTransports = $this->transportRepository->getAllAllocateTransportCount()->toArray();
        $totalSeats = $this->transportRepository->getSeatCount()->toArray();
        foreach ($totalSeats as $route) {
            $routeId = $route['transport_route_id'];
            $totalSeat = $route['total_seat'];

            // Calculate allocated seats for this route
            $allocated = 0;
            foreach ($allAllocateTransports as $seat) {
                if ($seat['transport_route_id'] === $routeId) {
                    $allocated++;
                }
            }
            // Calculate available seats
            $availableSeats[] = [
                "transport_route_id" => $routeId,
                "total_seat" => $totalSeat > 0 ? $totalSeat : 0,
                "available_seats" => $totalSeat - $allocated > 0 ? $totalSeat - $allocated : 0,
            ];
        }

        $allStudentData = [];
        $studentDetailsData = [];
        $teacherDetailsData = [];
        $prevStudentDetailsData = [];
        $prevTeacherDetailsData = [];
        $stdData = [];
        $sessionCustomData = Session::get('customData');
        $inputClassroomId = '';

        // post method on classroom change
        if ($request->isMethod('POST') || !empty($sessionCustomData)) {
            $inputClassroomId = $request->input('classroom_id');
            $inputAdmissionNo = $request->input('admission_no');

            $stdData = $this->studentRepository->getByAdmissionNo($inputAdmissionNo);
            $stdData->loadMissing(['promotedClassroom']);

            if (!empty($sessionCustomData)) {
                $inputClassroomId =  $sessionCustomData->classroom_id;
            }

            if (!empty($stdData[0]?->classroom_id)) {
                $inputClassroomId = !empty($stdData[0]?->promotedClassroom?->id) ? $stdData[0]?->promotedClassroom?->id : $stdData[0]?->classroom_id;
            }



            if ($inputClassroomId) {
                // current
                $studentDetailsData = [];
                $teacherDetailsData = [];
                $transportDetails = $this->transportRepository->getAllCurrentAllocateTransport($inputClassroomId);
                $transportDetails->load(['transportRoute.vehicle.driver', 'transportRoute.vehicle.conductor']);

                // previous
                $prevStudentDetailsData = [];
                $prevTeacherDetailsData = [];
                $prevTransportDetails = $this->transportRepository->getAllPreviousAllocateTransport($inputClassroomId);
                $prevTransportDetails->load(['transportRoute.vehicle', 'transportStoppage']);

                // current
                if (!empty($transportDetails)) {
                    foreach ($transportDetails as $item) {
                        if ($item?->allocate_type_for === 'Student') {
                            $studentDetailsData[] = [
                                'student_id' => $item?->student_id,
                                'route_name' => $item?->transportRoute?->name,
                                'transport_type' => $item?->transport_type,
                                'vehicle_type' => $item?->transportRoute?->vehicle?->type,
                                'driver_name' => $item?->transportRoute?->vehicle?->driver?->first_name . ' ' . $item?->transportRoute?->vehicle?->driver?->last_name,
                                'driver_mobile' => $item?->transportRoute?->vehicle?->driver?->contact,
                                'applied_on_date_at' => $item?->applied_on_date_at,
                                'start_from_date' => $item?->start_from_date,
                                'vehicle_number' => $item?->transportRoute?->vehicle?->vehicle_number,
                                'conductor_name' => $item?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $item?->transportRoute?->vehicle?->conductor?->last_name,
                                'conductor_mobile' => $item?->transportRoute?->vehicle?->conductor?->contact,
                                'transport_fee' => $item?->amount,
                                'timing' => $item?->transportStoppage?->pickup_time_at,
                            ];
                        } else {
                            $teacherDetailsData[] = [
                                'staff_id' => $item?->staff_id,
                                'route_name' => $item?->transportRoute?->name,
                                'transport_type' => $item?->transport_type,
                                'vehicle_type' => $item?->transportRoute?->vehicle?->type,
                                'driver_name' => $item?->transportRoute?->vehicle?->driver?->first_name . ' ' . $item?->transportRoute?->vehicle?->driver?->last_name,
                                'driver_mobile' => $item?->transportRoute?->vehicle?->driver?->contact,
                                'applied_on_date_at' => $item?->applied_on_date_at,
                                'start_from_date' => $item?->start_from_date,
                                'vehicle_number' => $item?->transportRoute?->vehicle?->vehicle_number,
                                'conductor_name' => $item?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $item?->transportRoute?->vehicle?->conductor?->last_name,
                                'conductor_mobile' => $item?->transportRoute?->vehicle?->conductor?->contact,
                                'transport_fee' => $item?->amount,
                                'timing' => $item?->transportStoppage?->pickup_time_at,
                            ];
                        }
                    }
                }

                // previous
                if (!empty($prevTransportDetails)) {
                    foreach ($prevTransportDetails as $item) {
                        if ($item?->allocate_type_for === 'Student') {
                            $prevStudentDetailsData[] = [
                                'student_id' => $item?->student_id,
                                'route_name' => $item?->transportRoute?->name,
                                'applied_on_date_at' => $item?->applied_on_date_at,
                                'start_from_date' => $item?->start_from_date,
                                'vehicle_number' => $item?->transportRoute?->vehicle?->vehicle_number,
                                'transport_fee' => $item?->amount,
                                'stoppage' => $item?->transportStoppage?->stoppage,
                            ];
                        } else {
                            $prevTeacherDetailsData[] = [
                                'staff_id' => $item?->staff_id,
                                'route_name' => $item?->transportRoute?->name,
                                'applied_on_date_at' => $item?->applied_on_date_at,
                                'start_from_date' => $item?->start_from_date,
                                'vehicle_number' => $item?->transportRoute?->vehicle?->vehicle_number,
                                'transport_fee' => $item?->amount,
                                'stoppage' => $item?->transportStoppage?->stoppage,
                            ];
                        }
                    }
                }

                //  using transport students
                $transportUsingStudentIds = $this->transportRepository->getAllAllocateTransportStudentIds($inputClassroomId);
                $transportStudent = $this->studentRepository->getStudentDataByStudentsIds($transportUsingStudentIds, $inputClassroomId);

                // not using transport students
                $notUsingTransportStudent = $this->studentRepository->getStudentDataExceptThisIds($transportUsingStudentIds, $inputClassroomId);
                if (count($notUsingTransportStudent) > 0) {
                    // new code
                    // update classroom id for promoted student
                    $notUsingTransportStudent->loadMissing(['promotedClassroom']);

                    $notUsingTransportStudent = $notUsingTransportStudent->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }
                        return $student;
                    });

                    $stuArr = [
                        'name' => 'Not Using Transport',
                        'options' => [],
                    ];
                    $tempNotUseSts = [];
                    foreach ($notUsingTransportStudent as $notTStu) {
                        $stdRollNo = !empty($notTStu?->classroomRoll?->roll_no) ? $notTStu?->classroomRoll?->roll_no . ' - ' : '';
                        $stdSerialNo = !empty($notTStu?->classroomRoll?->roll_no) ? intval($notTStu?->classroomRoll?->roll_no) : rand(1000, 9999);
                        $tempNotUseSts[$stdSerialNo] = [
                            'id' => $notTStu->id,
                            'classroom_id' => $notTStu->classroom_id,
                            'name' => $stdRollNo . getCocatenationTitle($notTStu->first_name, $notTStu->middle_name, $notTStu->last_name),
                            'admission_no' => $notTStu->admission_no,
                        ];
                    }

                    ksort($tempNotUseSts);
                    $stuArr['options'] = array_values($tempNotUseSts);
                    $allStudentData[] = $stuArr;
                }

                if (count($transportStudent) > 0) {
                    //new code
                    // update classroom id for promoted student
                    $transportStudent->loadMissing(['promotedClassroom']);

                    $transportStudent = $transportStudent->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }
                        return $student;
                    });

                    $stuArr = [
                        'name' => 'Using Transport',
                        'options' => [],
                    ];
                    $tempUseSts = [];
                    foreach ($transportStudent as $tStu) {
                        $stdRollNo = !empty($tStu?->classroomRoll?->roll_no) ? $tStu?->classroomRoll?->roll_no . ' - ' : '';
                        $stdSerialNo = !empty($tStu?->classroomRoll?->roll_no) ? intval($tStu?->classroomRoll?->roll_no) : rand(1000, 9999);
                        $tempUseSts[$stdSerialNo] = [
                            'id' => $tStu->id,
                            'classroom_id' => $tStu->classroom_id,
                            'name' => $stdRollNo . getCocatenationTitle($tStu->first_name, $tStu->middle_name, $tStu->last_name),
                            'admission_no' => $tStu->admission_no,
                        ];
                    }
                    ksort($tempUseSts);
                    $stuArr['options'] = array_values($tempUseSts);
                    $allStudentData[] = $stuArr;
                }
            }
        }
        // end post method

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        //voucher
        // $voucherData = $this->voucherRepository->getActiveAll();
        $vouchers = [];

        if ($transportFeeStructureSetting != null) {
            if ($transportFeeStructureSetting->value == 'fee') {
                $vouchers = $this->feeRepository->getActiveFeesAll()->map(fn($voucher) => [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                    'payment' => $voucher?->payments,
                ])->all();
            } else if ($transportFeeStructureSetting->value == 'voucher') {
                $vouchers = $this->voucherRepository->getActiveVoucherAll()->map(fn($voucher) => [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                    'payment' => $voucher?->payment,
                ])->all();
            }
        }

        $routeData = $this->transportRepository->getAllRoute();
        $routes = $routeData->map(fn($route) => [
            'id' => $route->id,
            'title' => $route->name,
        ])->all();


        // Transport Type
        $transportType = TransportType::cases();
        $transportTypeArr = array_map(function ($transport) {
            return ['id' => $transport->value, 'title' => $transport->value];
        }, $transportType);

        // get stoppage
        $stoppageData = $this->transportRepository->getActiveAll();
        $stoppages = $stoppageData->map(fn($stoppage) => [
            'id' => $stoppage?->id,
            'title' => $stoppage?->stoppage,
            'transport_route_id' => $stoppage?->transport_route_id,
            'pick_price' => $stoppage?->pick_price,
            'drop_price' => $stoppage?->drop_price,
            'pick_drop_price' => $stoppage?->pick_drop_price,
        ])->all();

        // teacher
        $teacherData = $this->staffRepository->getActiveTeacherData();
        $teachers = $teacherData->map(fn($teacher) => [
            'id' => $teacher->id,
            'title' => $teacher->first_name . ' ' . $teacher->middle_name . '' . $teacher->last_name,
        ])->all();

        return Inertia::render('Transport/Allocation', [
            'availableSeats' => $availableSeats,
            'classrooms' => $classrooms,
            'students' => [],
            'vouchers' => $vouchers,
            'routes' => $routes,
            'transportTypeArr' => $transportTypeArr,
            'stoppages' => $stoppages,
            'teachers' => $teachers,
            'studentDetailsData' => $studentDetailsData,
            'teacherDetailsData' => $teacherDetailsData,
            'prevStudentDetailsData' => $prevStudentDetailsData,
            'prevTeacherDetailsData' => $prevTeacherDetailsData,
            'transportFeeStructureSetting' => $transportFeeStructureSetting,
            'transportStudentData' => $stdData,
            'allStudentData' => $allStudentData,
            'inputClassroomId' => $request->input('classroom_id'),
            'sessionCustomData' => $sessionCustomData
        ]);
    }

    public function allocationSave(AllocateTransportRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            if ($transportFeeStructureSetting == null) {
                return redirect()->route('transport.allocation')->with('error', 'Please set transport voucher setting.');
            }

            if (!empty($input['student_id'])) {
                $allocateStudent = $this->transportRepository->getCurrentAllocateTransportByStudentId($input['student_id']);
                if (!empty($allocateStudent)) {
                    $this->transportRepository->updateAllocateTransport($allocateStudent->id, ['is_current' => 0]);
                }
            }

            if (!empty($input['staff_id'])) {
                $allocateStaff = $this->transportRepository->getCurrentAllocateTransportByTeacherId($input['staff_id']);
                if (!empty($allocateStaff)) {
                    $this->transportRepository->updateAllocateTransport($allocateStaff->id, ['is_current' => 0]);
                }
            }

            $voucher_id = null;
            $fee_id = null;

            if ($transportFeeStructureSetting?->value == 'fee') {
                $fee_id = $input['voucher_id'] ?? null;
            } else if ($transportFeeStructureSetting?->value == 'voucher') {
                $voucher_id = $input['voucher_id'] ?? null;
            }

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'student_id' => $input['student_id'] ?? null,
                'classroom_id' => $input['allocate_type_for'] == 'Student' ? ($input['classroom_id'] ?? null) : null,
                'transport_stoppage_id' => $input['transport_stoppage_id'] ?? null,
                'academic_year_id' => getAcademicYearId(),
                'staff_id' => $input['allocate_type_for'] == 'Student' ? null : ($input['staff_id'] ?? null),
                'voucher_id' => $voucher_id,
                'fee_id' => $fee_id,
                'allocation_type' => $transportFeeStructureSetting?->value,
                'transport_route_id' => $input['transport_route_id'] ?? null,
                'allocate_type_for' => $input['allocate_type_for'] ?? null,
                'applied_on_date_at' => date('Y-m-d'),
                'is_current' => true,
                'transport_type' => $input['transport_type'] ?? null,
                'amount' => $input['amount'] ?? null,
                'status' => Status::ACTIVE->value ?? null,
            ];

            // create student transport allocation
            $studentTransport = $this->transportRepository->createAllocateTransport($dataArray);
            $studentTransport->loadMissing([
                'student:admission_no,id'
            ]);

            // delete student deallocation when allocation is created
            if ((!empty($input['allocate_type_for']) && $input['allocate_type_for'] == 'Student') && !empty($input['student_id'])) {
                $this->transportRepository->deleteDeallocationTransport($input['allocate_type_for'], $input['student_id']);
            }

            // delete teacher deallocation when allocation is created
            if ((!empty($input['allocate_type_for']) && $input['allocate_type_for'] == 'Teacher') && !empty($input['staff_id'])) {
                $this->transportRepository->deleteDeallocationTransport($input['allocate_type_for'], $input['staff_id']);
            }

            DB::commit();

            //return redirect()->route('transport.allocation')->with('message', 'Allocated successfully.');
            return redirect()->back()->with([
                'customData' => $studentTransport,
                'message' => 'Allocated successfully.'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('transport.allocation')->with('error', 'Something goes wrong.');
        }
    }

    public function deallocationSave(Request $request)
    {

        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        if ($transportFeeStructureSetting == null) {
            return redirect()->route('transport.allocation')->with('error', 'Please set transport voucher setting.');
        }

        $voucher_id = null;
        $fee_id = null;

        if ($transportFeeStructureSetting?->value == 'fee') {
            $fee_id = $request->input('voucher_id') ?? null;
        } else if ($transportFeeStructureSetting?->value == 'voucher') {
            $voucher_id = $request->input('voucher_id') ?? null;
        }

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'student_id' => $request->input('student_id') ?? null,
            'academic_year_id' => getAcademicYearId(),
            'staff_id' => $request->input('staff_id') ?? null,
            'voucher_id' => $voucher_id,
            'fee_id' => $fee_id,
            'allocation_type' => $transportFeeStructureSetting?->value,
            'allocate_type_for' => $request->input('allocate_type_for') ?? null,
            'status' => Status::ACTIVE->value ?? null,
        ];

        if (!empty($request->input('student_id'))) {
            $allocateStudent = $this->transportRepository->getCurrentAllocateTransportByStudentId($request->input('student_id'));
            if (!empty($allocateStudent)) {
                $this->transportRepository->updateAllocateTransport($allocateStudent->id, ['is_current' => 0]);
                $this->transportRepository->createDeallocateTransport($dataArray);
                return redirect()->route('transport.allocation')->with('message', 'Deallocated successfully.');
            }
        }

        if (!empty($request->input('staff_id'))) {
            $allocateStaff = $this->transportRepository->getCurrentAllocateTransportByTeacherId($request->input('staff_id'));
            if (!empty($allocateStaff)) {
                $this->transportRepository->updateAllocateTransport($allocateStaff->id, ['is_current' => 0]);
                $this->transportRepository->createDeallocateTransport($dataArray);
                return redirect()->route('transport.allocation')->with('message', 'Deallocated successfully.');
            }
        }
    }

    /**
     * allocationBulk
     */
    public function allocationBulk(Request $request): Response
    {
        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        $allAllocateTransports = $this->transportRepository->getAllAllocateTransportCount()->toArray();
        $totalSeats = $this->transportRepository->getSeatCount()->toArray();

        $students = [];
        // available seats - school wise
        $availableSeats = [];
        $allAllocateTransports = $this->transportRepository->getAllAllocateTransportCount()->toArray();
        $totalSeats = $this->transportRepository->getSeatCount()->toArray();
        foreach ($totalSeats as $route) {
            $routeId = $route['transport_route_id'];
            $totalSeat = $route['total_seat'];

            // Calculate allocated seats for this route
            $allocated = 0;
            foreach ($allAllocateTransports as $seat) {
                if ($seat['transport_route_id'] === $routeId) {
                    $allocated++;
                }
            }
            // Calculate available seats
            $availableSeats[] = [
                "transport_route_id" => $routeId,
                "total_seat" => $totalSeat > 0 ? $totalSeat : 0,
                "available_seats" => $totalSeat - $allocated > 0 ? $totalSeat - $allocated : 0,
            ];
        }

        //voucher
        $voucherData = $this->voucherRepository->getActiveAll();
        $vouchers = $voucherData->map(fn($voucher) => [
            'id' => $voucher->id,
            'title' => $voucher->title,
        ])->all();


        $routeData = $this->transportRepository->getAllRoute();
        $routes = $routeData->map(fn($route) => [
            'id' => $route->id,
            'title' => $route->name,
        ])->all();

        // Transport Type
        $transportType = TransportType::cases();
        $transportTypeArr = array_map(function ($transport) {
            return ['id' => $transport->value, 'title' => $transport->value];
        }, $transportType);

        //  area pick price
        $amount = $this->transportRepository->getLastItem();
        // student
        $allAllocateStudentIds = $this->transportRepository->getAllAllocateTransportStudentIds();

        $studentData = $this->studentRepository->getStudentDataExceptThisIds($allAllocateStudentIds);

        $studentData->load(['classroom', 'promotedClassroom']);

        $students = $studentData->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                if ($student?->classroom != null) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            return [
                'id' => $student?->id,
                'title' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name) . "(ADM NO- " . $student?->admission_no . ", CLASSNAME- " . $student?->classroom?->title . ")",
                'classroom_id' => $student?->classroom_id,
                'admission_no' => $student?->admission_no,
                'classroom_title' => $student?->classroom?->title,
            ];
        })->all();

        // end of post method

        // get stoppage
        $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        //voucher
        // $voucherData = $this->voucherRepository->getActiveAll();
        $vouchers = [];

        if ($transportFeeStructureSetting != null) {
            if ($transportFeeStructureSetting->value == 'fee') {
                $vouchers = $this->feeRepository->getActiveFeesAll()->map(fn($voucher) => [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                    'payment' => $voucher?->payments,
                ])->all();
            } else if ($transportFeeStructureSetting->value == 'voucher') {
                $vouchers = $this->voucherRepository->getActiveVoucherAll()->map(fn($voucher) => [
                    'id' => $voucher->id,
                    'title' => $voucher->title,
                    'payment' => $voucher?->payment,
                ])->all();
            }
        }

        $routeData = $this->transportRepository->getAllRoute();
        $routes = $routeData->map(fn($route) => [
            'id' => $route->id,
            'title' => $route->name,
        ])->all();


        // Transport Type
        $transportType = TransportType::cases();
        $transportTypeArr = array_map(function ($transport) {
            return ['id' => $transport->value, 'title' => $transport->value];
        }, $transportType);

        // get stoppage
        $stoppageData = $this->transportRepository->getActiveAll();
        $stoppages = $stoppageData->map(fn($stoppage) => [
            'id' => $stoppage?->id,
            'title' => $stoppage?->stoppage,
            'transport_route_id' => $stoppage?->transport_route_id,
            'pick_price' => $stoppage?->pick_price,
            'drop_price' => $stoppage?->drop_price,
            'pick_drop_price' => $stoppage?->pick_drop_price,
        ])->all();

        // teacher
        $teacherData = $this->staffRepository->getActiveTeacherData();
        $teachers = $teacherData->map(fn($teacher) => [
            'id' => $teacher->id,
            'title' => $teacher->first_name . ' ' . $teacher->middle_name . '' . $teacher->last_name,
        ])->all();

        // dd($teachers);

        return Inertia::render('Transport/AllocationBulk', [
            'availableSeats' => $availableSeats,
            'classrooms' => $classrooms,
            'students' => $students,
            'vouchers' => $vouchers,
            'routes' => $routes,
            'transportTypeArr' => $transportTypeArr,
            'amountPrice' => $amount,
            'stoppages' => $stoppages,
            'transportFeeStructureSetting' => $transportFeeStructureSetting,
        ]);
    }


    public function allocationBulkSave(AllocateTransportRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();
        try {
            $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

            if ($transportFeeStructureSetting == null) {
                return redirect()->route('transport.allocation_bulk')->with('error', 'Please set transport voucher setting.');
            }

            $voucher_id = null;
            $fee_id = null;

            if ($transportFeeStructureSetting?->value == 'fee') {
                $fee_id = $input['voucher_id'] ?? null;
            } else if ($transportFeeStructureSetting?->value == 'voucher') {
                $voucher_id = $input['voucher_id'] ?? null;
            }

            // start loop
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'transport_stoppage_id' => $input['transport_stoppage_id'] ?? null,
                'staff_id' => null,
                'voucher_id' => $voucher_id,
                'fee_id' => $fee_id,
                'allocation_type' => $transportFeeStructureSetting?->value,
                'transport_route_id' => $input['transport_route_id'] ?? null,
                'allocate_type_for' => 'Student',
                'is_current' => true,
                'transport_type' => $input['transport_type'] ?? null,
                'amount' => $input['amount'] ?? null,
                'applied_on_date_at' => !empty($input['applied_on_date_at']) ? \Carbon\Carbon::parse($input['applied_on_date_at'])->format('Y-m-d') : date('Y-m-d'),
                'start_from_date' => !empty($input['start_from_date']) ? \Carbon\Carbon::parse($input['start_from_date'])->format('Y-m-d') : date('Y-m-d'),
                'status' => Status::ACTIVE->value,
            ];

            if (!empty($input['student_ids'])) {
                foreach ($input['student_ids'] as $studentId) {

                    $allocateStudent = $this->transportRepository->getCurrentAllocateTransportByStudentId($studentId['id']);
                    if (!empty($allocateStudent)) {
                        $this->transportRepository->updateAllocateTransport($allocateStudent->id, ['is_current' => 0]);
                    }

                    $std = $this->studentRepository->getById($studentId['id']);
                    $std->load(['promotedClassroom']);

                    $stdClassId = !empty($std?->promotedClassroom?->id) ? $std?->promotedClassroom?->id : $std->classroom_id;

                    $dataArray['student_id'] = $studentId['id'];
                    $dataArray['classroom_id'] = $stdClassId;

                    $this->transportRepository->createAllocateTransport($dataArray);

                    // delete student deallocation when allocation is created
                    $this->transportRepository->deleteDeallocationTransport('Student', $studentId['id']);
                }
            }

            DB::commit();

            return redirect()->route('transport.allocation_bulk')->with('message', 'Allocated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('transport.allocation_bulk')->with('error', 'Something goes wrong.');
        }
    }
}
