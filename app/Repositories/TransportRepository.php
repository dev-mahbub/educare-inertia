<?php

namespace App\Repositories;

use App\Models\Area;
use App\Enums\Status;
use App\Models\Driver;
use App\Models\Student;
use App\Models\Vehicle;
use App\Models\Classroom;
use App\Enums\CompanyType;
use App\Enums\GuardianType;
use App\Models\SiteSetting;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use App\Models\TransportRoute;
use App\Models\AllocateTransport;
use App\Models\TransportStoppage;
use Illuminate\Support\Facades\DB;
use App\Models\DeallocateTransport;

class TransportRepository implements IRepository, ITransportRepository
{
    public function getAll()
    {
        return TransportStoppage::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return TransportStoppage::findOrFail($id);
    }

    public function delete($id)
    {
        TransportStoppage::destroy($id);
    }

    public function create(array $arrayData)
    {
        return TransportStoppage::create($arrayData);
    }

    public function getRouteStoppageData()
    {
        return TransportStoppage::where('transport_stoppages.status', Status::ACTIVE)
            ->join('allocate_transports', 'allocate_transports.transport_stoppage_id', '=', 'transport_stoppages.id')
            ->where('transport_stoppages.school_id', '=', getUserSchoolId())
            ->where('allocate_transports.academic_year_id', getAcademicYearId())
            ->select('transport_stoppages.*')
            ->groupBy('transport_stoppages.id')
            ->get();
    }

    public function getStoppageAllFromSession()
    {
        return TransportStoppage::where('transport_stoppages.status', Status::ACTIVE)
            ->where('transport_stoppages.school_id', '=', getUserSchoolId())
            ->join('allocate_transports', 'allocate_transports.transport_stoppage_id', '=', 'transport_stoppages.id')
            ->where('transport_stoppages.school_id', getUserSchoolId())
            ->where('allocate_transports.academic_year_id', getAcademicYearId())
            ->withCount('students')
            ->groupBy('transport_stoppages.id')
            ->latest()
            ->get();
    }

    public function getActiveStoppagesWithAllocation(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return TransportStoppage::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('transportAllocations', function ($query) use ($schoolId, $academicYearId) {
                $query->where('school_id', $schoolId)
                    ->where('academic_year_id', $academicYearId)
                    ->where('allocate_type_for', 'Student')
                    ->where('is_current', 1);
            })
            ->withCount([
                'transportAllocations' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('school_id', $schoolId)
                        ->where('academic_year_id', $academicYearId)
                        ->where('allocate_type_for', 'Student')
                        ->where('is_current', 1);
                }
            ])
            ->latest()
            ->get();
    }

    public function update($id, array $arrayData)
    {
        return TransportStoppage::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return TransportStoppage::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getAllActiveNameId()
    {
        return TransportStoppage::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'stoppage')
            ->get();
    }

    public function getRegisterAll()
    {
        return TransportStoppage::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveTransportAll($schoolId = null)
    {
        return TransportStoppage::where('transport_stoppages.status', Status::ACTIVE)
            ->where('transport_stoppages.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->leftJoin('areas', 'areas.id', '=', 'transport_stoppages.area_id')
            ->withCount('allocatedStudents')
            ->select(
                'areas.title as area_title',
                'transport_stoppages.*',
            )
            ->get();
    }

    public function getTransportStoppageById(int $id, int $schoolId = null)
    {
        return TransportStoppage::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    public function getActiveAllArea()
    {
        return Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    // Mis Reports Counts data
    public function getMisReportCounts()
    {
        $areaCount = Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->count();

        $driverCount = Driver::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->count();

        $routeCount = TransportRoute::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->count();

        $stoppageCount = TransportStoppage::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->count();

        $allocateSeatCount = AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_current', 1)
            ->count();

        $vehicleCount = Vehicle::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->count();

        $totalSeatCount = Vehicle::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->sum('total_seat');

        $totalStudentCount = Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->whereHas('allocateTransport')
            ->count();

        return [
            'area_count' => $areaCount,
            'driver_count' => $driverCount,
            'route_count' => $routeCount,
            'stoppage_count' => $stoppageCount,
            'allocate_seat_count' => $allocateSeatCount,
            'vehicle_count' => $vehicleCount,
            'total_seat_count' => $totalSeatCount,
            'available_seat_count' => intval($totalSeatCount) - intval($allocateSeatCount),
            'total_student_count' => $totalStudentCount,
        ];
    }

    // area
    public function getAllAreas()
    {
        return Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getAreaAllFromSession()
    {
        return Area::where('areas.status', Status::ACTIVE)
            ->join('transport_stoppages', 'areas.id', '=', 'transport_stoppages.area_id')
            ->join('allocate_transports', 'transport_stoppages.id', '=', 'allocate_transports.transport_stoppage_id')
            ->where('areas.school_id', getUserSchoolId())
            ->where('allocate_transports.academic_year_id', getAcademicYearId())
            ->select(
                'areas.id',
                'areas.title',
                'transport_stoppages.id as transport_stoppage_id',
                'allocate_transports.id as allocate_transport_id',
            )
            ->get();
    }

    public function getAreaById($id)
    {
        return Area::findOrFail($id);
    }

    public function deleteArea($id)
    {
        Area::destroy($id);
    }

    public function createArea(array $arrayData)
    {
        return Area::create($arrayData);
    }

    public function updateArea($id, array $arrayData)
    {
        return Area::whereId($id)->update($arrayData);
    }

    public function getActiveAllAreas()
    {
        return Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAllAreas()
    {
        return Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAreaNameAndId()
    {
        return Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title', 'pick_price', 'drop_price', 'pick_drop_price')
            ->latest()
            ->get();
    }

    public function getLastItem()
    {
        return Area::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->first();
    }



    // Transport Routes
    public function getAllRoute()
    {
        return TransportRoute::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRouteById($id)
    {
        return TransportRoute::findOrFail($id);
    }

    // public function getRouteByIdOnlyAllocated($id)
    // {
    //     return TransportRoute::where('status', Status::ACTIVE->value)
    //         ->where('school_id', getUserSchoolId())
    //         ->load(['students', 'students.student.father', 'students.student.classroom', 'students.transportStoppage'])
    //         ->whereHas('payment', function ($query) use ($studentId) {
    //             $query->where('payment_status', PaymentStatus::CANCELLED)
    //                 ->where('student_id', $studentId);
    //         })
    //         ->get();
    // }

    public function deleteRoute($id)
    {
        TransportRoute::destroy($id);
    }

    public function createRoute(array $arrayData)
    {
        return TransportRoute::create($arrayData);
    }

    public function updateRoute($id, array $arrayData)
    {
        return TransportRoute::whereId($id)->update($arrayData);
    }

    public function getActiveAllRoute()
    {
        return TransportRoute::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAllRoute()
    {
        return TransportRoute::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveRouteNameAndId()
    {
        return TransportRoute::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'name')
            ->latest()
            ->get();
    }

    public function getRoutesAllFromSession($schoolId = null, $academicYearId = null)
    {
        return TransportRoute::where('transport_routes.status', Status::ACTIVE)
            ->join('allocate_transports', 'allocate_transports.transport_route_id', '=', 'transport_routes.id')
            ->where('transport_routes.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('allocate_transports.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->withCount('allocatedStudents')
            ->groupBy('transport_routes.id')
            ->latest()
            ->get();
    }

    public function getActiveRoutesWithAllocation(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return TransportRoute::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('allocatedStudents', function ($query) use ($schoolId, $academicYearId) {
                $query->where('school_id', $schoolId)
                    ->where('academic_year_id', $academicYearId);
            })
            ->withCount([
                'allocatedStudents' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('school_id', $schoolId)
                        ->where('academic_year_id', $academicYearId);
                }
            ])
            ->latest()
            ->get();
    }

    public function getActiveAllTransportAndRoute($schoolId = null)
    {
        return TransportRoute::where('transport_routes.status', Status::ACTIVE)
            ->where('transport_routes.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->leftJoin('vehicles', 'vehicles.id', '=', 'transport_routes.vehicle_id')
            ->leftJoin('staff', 'staff.id', '=', 'transport_routes.staff_id')
            ->select(
                'vehicles.vehicle_number as vehicle_no',
                'staff.first_name as staff_first_name',
                'staff.middle_name as staff_middle_name',
                'staff.last_name as staff_last_name',
                'transport_routes.*',
            )
            ->get();
    }

    public function getSeatCount()
    {
        return TransportRoute::where('transport_routes.status', Status::ACTIVE)
            ->where('transport_routes.school_id', getUserSchoolId())
            ->join('vehicles', 'vehicles.id', '=', 'transport_routes.vehicle_id')
            ->select(
                'vehicles.id as id',
                'vehicles.total_seat as total_seat',
                'transport_routes.id as transport_route_id',
            )
            ->get();
    }

    public function getTransportRouteById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return TransportRoute::where('transport_routes.status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->first();
    }


    //Transport fee setting
    public function getAllFeeSetting()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getFeeSettingById($id)
    {
        return SiteSetting::findOrFail($id);
    }

    public function deleteFeeSetting($id)
    {
        SiteSetting::destroy($id);
    }

    public function createFeeSetting(array $arrayData)
    {
        return SiteSetting::create($arrayData);
    }

    public function updateFeeSetting($id, array $arrayData)
    {
        return SiteSetting::whereId($id)->update($arrayData);
    }

    public function getActiveAllFeeSetting()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAllFeeSetting()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getAllRouteSummary()
    {
        return TransportRoute::where('transport_routes.status', Status::ACTIVE)
            ->where('transport_routes.school_id', getUserSchoolId())
            ->leftJoin('students', 'transport_routes.student_id', '=', 'students.id')
            ->leftJoin('guardians', 'transport_routes.guardian_id', '=', 'guardians.id')
            ->leftJoin('classrooms', 'transport_routes.classroom_id', '=', 'classrooms.id')
            ->leftJoin('transport_stoppages', 'transport_routes.transport_stoppage_id', '=', 'transport_stoppages.id')
            ->select(
                'students.first_name as first_name',
                'students.middle_name as middle_name',
                'students.last_name as last_name',
                'students.admission_no as admission_no',
                'classrooms.title as classroom_title',
                'guardians.first_name as father_first_name',
                'guardians.middle_name as father_middle_name',
                'guardians.last_name as father_last_name',
                'guardians.phone as phone',
                'transport_stoppages.stoppage as stoppage',
                'transport_stoppages.pick_price',
                'transport_stoppages.drop_price'
            )
            ->get();
    }


    // AllocateTransport
    public function getAllocateTransportByStudentId($sId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $sId)
            ->get();
    }

    public function getCurrentAllocateTransportByStudentId($sId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', $academicYearId)
            ->where('school_id', $schoolId)
            ->where('is_current', 1)
            ->where('student_id', $sId)
            ->first();
    }

    public function getAllocateTransportByTeacherId($tId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('staff_id', $tId)
            ->get();
    }

    public function getCurrentAllocateTransportByTeacherId($tId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('is_current', 1)
            ->where('staff_id', $tId)
            ->first();
    }

    public function getAllAllocateTransport()
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getAllAllocateTransportCount()
    {
        return AllocateTransport::where(
            [
                'status' => Status::ACTIVE->value,
                'academic_year_id' => getAcademicYearId(),
                'school_id' => getUserSchoolId(),
                'is_current' => 1,
            ]
        )
            ->get();
    }

    public function getAllAllocateTransportStudentIds($classroomId = null)
    {
        if ($classroomId != null) {
            return AllocateTransport::where(
                [
                    'status' => Status::ACTIVE->value,
                    'academic_year_id' => getAcademicYearId(),
                    'school_id' => getUserSchoolId(),
                    'classroom_id' => $classroomId,
                    'is_current' => 1,
                ]
            )
                ->pluck('student_id');
        } else {
            $students = AllocateTransport::where(
                [
                    'status' => Status::ACTIVE->value,
                    'academic_year_id' => getAcademicYearId(),
                    'school_id' => getUserSchoolId(),
                    'is_current' => 1,
                ]
            )
                ->pluck('student_id');

            return $students;
        }
    }

    public function getAllAllocateTransportByRouteId($routeId)
    {
        return AllocateTransport::where(
            [
                'status' => Status::ACTIVE->value,
                'academic_year_id' => getAcademicYearId(),
                'school_id' => getUserSchoolId(),
                'is_current' => 1,
                'allocate_type_for' => 'Student',
                'transport_route_id' => $routeId
            ]
        )->whereNotNull('student_id')
            ->with(
                [
                    'student' => function ($query) {
                        $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                    },
                    'student.classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'student.promotedClassroom' => function ($query) {
                        $query->select('classrooms.id', 'classrooms.title');
                    },
                    'student.father' => function ($query) {
                        $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                    },
                    'transportStoppage' => function ($query) {
                        $query->select('id', 'stoppage', 'pickup_time_at', 'drop_time_at');
                    },
                    'transportRoute' => function ($query) {
                        $query->select('id', 'name', 'vehicle_id');
                    }
                ]
            )
            ->get();
    }

    public function getCurrentAllocateTransportByStudentIdAndClassroomId($studentId, $classroomId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            // ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $studentId)
            ->where('classroom_id', $classroomId)
            ->where('allocate_type_for', 'Student')
            ->where('is_current', 1)
            ->first();
    }

    public function getStaffCurrentAllocateTransportByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', $academicYearId)
            ->where('school_id', $schoolId)
            ->where('allocate_type_for', 'Teacher')
            ->where('is_current', 1)
            ->where('staff_id', $staffId)
            ->with(['transportRoute.vehicle.driver', 'transportRoute.vehicle.conductor'])
            ->first();
    }

    public function getStaffAllPreviousAllocateTransports(int $staffId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', $academicYearId)
            ->where('school_id', $schoolId)
            ->where('allocate_type_for', 'Teacher')
            ->where('is_current', 0)
            ->where(function ($query) use ($staffId) {
                if (!empty($staffId)) {
                    $query->where('staff_id', $staffId);
                }
            })
            ->with(['transportRoute.vehicle', 'transportStoppage'])
            ->get();
    }

    public function getStudentCurrentAllocateTransportByStudentId(int $studentId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', $academicYearId)
            ->where('school_id', $schoolId)
            ->where('student_id', $studentId)
            ->where('allocate_type_for', 'Student')
            ->where('is_current', 1)
            ->with(['transportRoute.vehicle.driver', 'transportRoute.vehicle.conductor'])
            ->first();
    }

    public function getStudentAllPreviousAllocateTransports(int $studentId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', $academicYearId)
            ->where('school_id', $schoolId)
            ->where(function ($query) use ($studentId) {
                if (!empty($studentId)) {
                    $query->where('student_id', $studentId);
                }
            })
            ->where('allocate_type_for', 'Student')
            ->where('is_current', 0)
            ->with(['transportRoute.vehicle', 'transportStoppage'])
            ->get();
    }

    public function getAllCurrentAllocateTransport($classroomId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('classroom_id', $classroomId)
            ->where('is_current', 1)
            ->get();
    }

    public function getAllPreviousAllocateTransport($classroomId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('classroom_id', $classroomId)
            ->where('is_current', 0)
            ->get();
    }

    public function getAllAllocateClassroom($schoolId = null, $academicYearId = null)
    {
        return AllocateTransport::where('allocate_transports.status', Status::ACTIVE)
            ->where('allocate_transports.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('allocate_transports.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('allocate_transports.is_current', 1)
            ->join('classrooms', 'allocate_transports.classroom_id', '=', 'classrooms.id')
            ->select(
                'allocate_transports.id',
                'allocate_transports.student_id',
                'allocate_transports.classroom_id',
                'classrooms.title',
            )
            ->get();
    }

    public function getClassroomsWithStudentsAllocate($schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->get();
    }

    public function getAllAllocateStudentDetails()
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getAllocateTransportById($id)
    {
        return AllocateTransport::findOrFail($id);
    }

    public function deleteAllocateTransport($id)
    {
        AllocateTransport::destroy($id);
    }

    public function createAllocateTransport(array $arrayData)
    {
        return AllocateTransport::create($arrayData);
    }

    public function updateAllocateTransport($id, array $arrayData)
    {
        return AllocateTransport::whereId($id)->update($arrayData);
    }

    public function getActiveAllAllocateTransport()
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getAllocateTransportFromStudent($stdId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->with('voucher')
            ->where('student_id', $stdId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }


    public function getStudentCurrentAllocateTransport($studentId, $allocationType = "", $schoolId = null, $academicYearId = null)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('is_current', true)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->whereDoesntHave('voucher.deallocate_transport', function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->first();
    }

    public function getStudentPreviousAllocateTransport($studentId, $allocationType = "", $schoolId = null, $academicYearId = null)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('is_current', false)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->latest('id')
            ->first();
    }


    public function getStudentDeallocateTransport($studentId, $allocationType = "", $schoolId = null, $academicYearId = null)
    {
        return DeallocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->latest('id')
            ->first();
    }

    public function getStudentAllocateTransports(
        $studentId,
        $previousAllocationId = "",
        $previousAllocationVoucherId = "",
        $deallocationVoucherId = "",
        $transportFeeStructureSetting = "",
        $allocationType = "",
        $academicYearId = null
    ) {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('student_id', $studentId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->where(function ($query) use ($previousAllocationId, $previousAllocationVoucherId, $deallocationVoucherId, $transportFeeStructureSetting) {
                $query->whereHas('payment', function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                });

                if (!empty($transportFeeStructureSetting) && $transportFeeStructureSetting == 'voucher') {
                    if (empty($previousAllocationId) && empty($previousAllocationVoucherId)) {
                        $query->orWhere('is_current', true);
                    } else if ($previousAllocationVoucherId != $deallocationVoucherId) {
                        $query->orWhere(function ($query) use ($previousAllocationId, $previousAllocationVoucherId, $deallocationVoucherId) {
                            $query->where('id', '>=', $previousAllocationId)
                                ->where('voucher_id', '>=', $previousAllocationVoucherId)
                                ->when(!empty($deallocationVoucherId), function ($query) use ($deallocationVoucherId) {
                                    $query->where('voucher_id', '<', $deallocationVoucherId);
                                });
                        });
                    }
                }
            })
            ->whereDoesntHave('voucher.deallocate_transport', function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->with('voucher')
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getGuardianWiseStudentAllocateTransports($studentId, $previousAllocationId = "", $previousAllocationVoucherId = "", $deallocationVoucherId = "", $transportFeeStructureSetting = "", $allocationType = "")
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('student_id', $studentId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->where(function ($query) use ($previousAllocationId, $previousAllocationVoucherId, $deallocationVoucherId, $transportFeeStructureSetting) {
                $query->whereHas('payment', function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                });

                if (!empty($transportFeeStructureSetting) && $transportFeeStructureSetting == 'voucher') {
                    if (empty($previousAllocationId) && empty($previousAllocationVoucherId)) {
                        $query->orWhere('is_current', true);
                    } else if ($previousAllocationVoucherId != $deallocationVoucherId) {
                        $query->orWhere(function ($query) use ($previousAllocationId, $previousAllocationVoucherId, $deallocationVoucherId) {
                            $query->where('id', '>=', $previousAllocationId)
                                ->where('voucher_id', '>=', $previousAllocationVoucherId)
                                ->when(!empty($deallocationVoucherId), function ($query) use ($deallocationVoucherId) {
                                    $query->where('voucher_id', '<', $deallocationVoucherId);
                                });
                        });
                    }
                }
            })
            ->whereDoesntHave('voucher.deallocate_transport', function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->with('voucher')
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getStudentAllocateTransportReport($studentId, $fromId, $toId, $previousAllocationId = "", $previousAllocationVoucherId = "", $deallocationVoucherId = "", $transportFeeStructureSetting = "", $allocationType = "")
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('student_id', $studentId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocation_type', $allocationType);
            })
            ->where(function ($query) use ($previousAllocationId, $previousAllocationVoucherId, $deallocationVoucherId, $transportFeeStructureSetting) {
                $query->whereHas('payment', function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                });

                if (!empty($transportFeeStructureSetting) && $transportFeeStructureSetting == 'voucher') {
                    if (empty($previousAllocationId) && empty($previousAllocationVoucherId)) {
                        $query->orWhere('is_current', true);
                    } else if ($previousAllocationVoucherId != $deallocationVoucherId) {
                        $query->orWhere(function ($query) use ($previousAllocationId, $previousAllocationVoucherId, $deallocationVoucherId) {
                            $query->where('id', '>=', $previousAllocationId)
                                ->where('voucher_id', '>=', $previousAllocationVoucherId)
                                ->when(!empty($deallocationVoucherId), function ($query) use ($deallocationVoucherId) {
                                    $query->where('voucher_id', '<', $deallocationVoucherId);
                                });
                        });
                    }
                }
            })
            ->whereDoesntHave('voucher.deallocate_transport', function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->when(!empty($fromId) && !empty($toId), function ($query) use ($fromId, $toId) {
                $query->whereBetween('voucher_id', [$fromId, $toId]);
            })
            ->with('voucher')
            ->orderBy('id', 'asc')
            ->get();
    }


    public function deleteDeallocationTransport($allocate_type_for, $id)
    {
        return DeallocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when($allocate_type_for == 'Student', function ($query) use ($allocate_type_for, $id) {
                $query->where('allocate_type_for', $allocate_type_for)
                    ->where('student_id', $id);
            })
            ->when($allocate_type_for == 'Teacher', function ($query) use ($allocate_type_for, $id) {
                $query->where('allocate_type_for', $allocate_type_for)
                    ->where('staff_id', $id);
            })
            ->delete();
    }

    public function getAllTeacherByTransportRouteId($routeId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('allocate_type_for', '=', 'Teacher')
            ->where('transport_route_id', $routeId)
            ->get();
    }

    public function getAllStudentByTransportRouteId($routeId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('allocate_type_for', '=', 'Student')
            ->where('transport_route_id', $routeId)
            ->get();
    }

    public function getRegisterAllAllocateTransport()
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getAllocateTransportByClassroomId($classroomId)
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->where('is_current', 1)
            ->get();
    }

    public function getYearlyHeadWiseDueSummary()
    {
        return AllocateTransport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID->value);
            })
            ->with(['payment'])
            ->get();
    }


    public function getAllDueAllocateTransports($classroomId = "", $studentStatus = "", $studentActiveStatus = "")
    {
        return AllocateTransport::where('allocate_transports.status', Status::ACTIVE)
            ->where('allocate_transports.school_id', getUserSchoolId())
            ->where('allocate_transports.academic_year_id', getAcademicYearId())
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID->value);
            })
            ->rightJoin('students', function ($join) use ($classroomId, $studentStatus, $studentActiveStatus) {
                $join->on('students.id', '=', 'allocate_transports.student_id')
                    ->when(!empty($classroomId), function ($query) use ($classroomId) {
                        $query->where('students.classroom_id', $classroomId);
                    })
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        if ($studentStatus == StudentStatus::PROMOTED) {
                            $query->whereNot('students.student_status', StudentStatus::NEW);
                        } else {
                            $query->where('students.student_status', $studentStatus);
                        }
                    })
                    ->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                        $query->where('students.status', $studentActiveStatus);
                    });
            })
            ->with(['payment', 'father', 'classroom', 'student.due_follow_ups'])
            ->get();
    }


    public function getAllDueAllocateTransportsByStudentId($studentId)
    {
        return AllocateTransport::where('allocate_transports.status', Status::ACTIVE)
            ->where('allocate_transports.school_id', getUserSchoolId())
            ->where('allocate_transports.academic_year_id', getAcademicYearId())
            ->whereDoesntHave('payment', function ($query) {
                $query->where('payment_status', PaymentStatus::PAID->value);
            })
            ->rightJoin('students', function ($join) use ($studentId) {
                $join->on('students.id', '=', 'allocate_transports.student_id')
                    ->where('students.id', $studentId);
            })
            ->with(['payment'])
            ->get();
    }


    public function getStudentPaymentReport()
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('classrooms', 'classrooms.id', '=', 'students.classroom_id')
            ->leftJoin('allocate_transports', 'allocate_transports.student_id', '=', 'students.id')
            ->leftJoin('transport_stoppages', 'transport_stoppages.id', '=', 'allocate_transports.transport_stoppage_id')
            ->leftJoin('transport_routes', 'transport_routes.id', '=', 'allocate_transports.transport_route_id')
            ->leftJoin('vehicles', 'vehicles.id', '=', 'transport_routes.vehicle_id')
            ->leftJoin('vouchers', 'vouchers.id', '=', 'allocate_transports.voucher_id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value);
            })
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classrooms.title as classroom_title',
                'allocate_transports.transport_type',
                'allocate_transports.amount',
                'allocate_transports.is_current',
                'vouchers.title as vouchers_title',
                'transport_stoppages.stoppage as stoppage_title',
                'father.phone as father_phone'
            )
            ->get();
    }

    // report classroom wise
    public function getReportAllocateTransportFromClassroom()
    {
        $subQuery = DB::table('allocate_transports')
            ->whereRaw('school_id = ' . getUserSchoolId())
            ->whereRaw('academic_year_id = ' . getAcademicYearId())
            ->select(DB::raw('count(student_id)'))
            // ->groupByRaw('student_id')
            ->whereRaw('classrooms.id = classroom_id');

        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy("title", "ASC")
            ->pluck(DB::raw("(" . $subQuery->toSql() . ") as Count"), 'title')
            ->toArray();
    }

    // report area wise
    public function getReportAllocateTransportFromArea()
    {
        return AllocateTransport::where('allocate_transports.status', Status::ACTIVE)
            ->where('allocate_transports.school_id', getUserSchoolId())
            ->where('allocate_transports.academic_year_id', getAcademicYearId())
            ->leftJoin('transport_stoppages', 'transport_stoppages.id', '=', 'allocate_transports.transport_stoppage_id')
            ->leftJoin('areas', 'areas.id', '=', 'transport_stoppages.area_id')
            ->orderBy("areas.title", "ASC")
            ->select('areas.id', 'areas.title', 'allocate_transports.student_id')
            ->get();
    }


    // deallocate
    public function getAllDeallocateTransport()
    {
        return DeallocateTransport::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getByDeallocateTransportId($id)
    {
        return DeallocateTransport::findOrFail($id);
    }

    public function deleteDeallocateTransport($id)
    {
        DeallocateTransport::destroy($id);
    }

    public function createDeallocateTransport(array $arrayData)
    {
        return DeallocateTransport::create($arrayData);
    }

    public function studentAllocateTransport($studentId, $allocationType, $schoolId = null, $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return AllocateTransport::where('status', Status::ACTIVE)
            ->with([
                'transportRoute' =>  function ($query) {
                    $query->select('id', 'name', 'vehicle_id')->with(['vehicle' => function ($q) {
                        $q->select('id', 'vehicle_number', 'registration_number', 'total_seat', 'driver_id', 'conductor_id')
                            ->with(['driver', 'conductor']);
                    }]);
                },
                'voucher',
                'transportStoppage'
            ])
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->when(!empty($allocationType), function ($query) use ($allocationType) {
                $query->where('allocate_type_for', $allocationType);
            })
            ->whereDoesntHave('voucher.deallocate_transport', function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->get();
    }
}
