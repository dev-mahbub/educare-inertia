<?php

namespace App\Http\Controllers\Api\V1\Traits;

use App\Enums\FeeInstallmentType;
use App\Enums\FeePaymentType;
use App\Enums\PaymentStatus;
use App\Enums\Status;
use App\Enums\StudentStatus;
use App\Models\AllocateTransport;
use App\Models\Category;
use App\Models\ClassFeeStudentAmount;
use App\Models\Classroom;
use App\Models\DeallocateTransport;
use App\Models\Fee;
use App\Models\FeePayment;
use App\Models\FeePaymentMethod;
use App\Models\FeeType;
use App\Models\RegistrationFee;
use App\Models\SiteSetting;
use App\Models\Student;
use App\Models\StudentFeeDiscount;
use App\Models\StudentFeeVoucher;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

trait StudentAccessor
{
    public function apiStudentDetailsData($id, $schoolId, $academicYearId, $classroomId)
    {
        return Student::where('students.id', $id)
            ->where('students.status', Status::ACTIVE)
            ->with([
                'father', 'mother', 'classroomRollRaw' => function ($q) use ($classroomId, $academicYearId) {
                    $q->where('classroom_rolls.classroom_id', $classroomId)
                        ->where('classroom_rolls.academic_year_id', $academicYearId);
                },
                'studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId);
                }
            ])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.gender',
                'students.religion',
                'students.blood_group'
            )
            ->first();
    }

    public function apiStudentDetailsFromClassroomIdExeptsIds($classroomId, $excludeIds, $schoolId, $academicYearId) {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->whereNotIn('id', $excludeIds)
            ->with([
                'father', 'mother', 'classroomRollRaw' => function ($q) use ($classroomId, $academicYearId) {
                    $q->where('classroom_rolls.classroom_id', $classroomId)
                        ->where('classroom_rolls.academic_year_id', $academicYearId);
                },
                'studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId);
                }
            ])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_no',
                'gender',
                'religion',
                'blood_group'
            )
            ->get();
    }

    private function apiStudentsFromAttendance($attendances, $schoolId, $academicYearId, $classroomId)
    {
        $students = array();
        $attStudents = array();
        if( !empty($attendances) ) {
            foreach($attendances as $attendance) {
                $studentsData = json_decode($attendance?->students);
                if( !empty($studentsData) ) {
                    foreach($studentsData as $std) {
                        if( !empty($std->student_id) ) {
                            array_push($attStudents, $std->student_id);
                            $stdObj = $this->apiStudentDetailsData($std->student_id, $schoolId, $academicYearId, $classroomId);
                            $studentData = array('is_leave' => $std->is_leave, 'attendance_status' => $std->attendance_status, 'student' => $stdObj);
                            array_push($students, $studentData);
                        }
                    }
                }
            }
        }
        
        return [
            'students' => $students,
            'student_ids' => $attStudents
        ];
    }

    private function apiSingleStudentFromAttendanceBetweenDates($attendances, $stdId)
    {
        $attendanceDays = array();
        $total_leaves = 0;
        $total_absents = 0;
        $total_presents = 0;
        if( !empty($attendances) ) {
            foreach($attendances as $attendance) {
                $studentsData = json_decode($attendance?->students);
                if( !empty($studentsData) ) {
                    foreach($studentsData as $std) {
                        if( isset($std->student_id) && $std->student_id == $stdId ) {
                            if($std?->is_leave == true) {
                                $attendance_status = 'leave';
                            }
                            else {
                                $attendance_status = $std->attendance_status;
                            }
                            $attendanceDays[$attendance?->attendance_date_at]['status'] = $attendance_status;
                            $attendanceDays[$attendance?->attendance_date_at]['attendance_date'] = $attendance?->attendance_date_at;
                            if((strtolower($std->attendance_status) == 'absent') && ($std?->is_leave == false)) {
                                $total_absents+= 1;
                            }
                            elseif((strtolower($std->attendance_status) == 'present') && ($std?->is_leave == false)) {
                                $total_presents+= 1;
                            }
                            elseif($std?->is_leave == true) {
                                $total_leaves+= 1;
                            }
                        }
                    }
                }
            }
        }

        return array(
            'attns' => array_values($attendanceDays),
            'total_leaves' => $total_leaves,
            'total_absents' => $total_absents,
            'total_presents' => $total_presents,
        );
    }

    private function apiStudentsFromAttendanceOnDate($attendances, $schoolId, $academicYearId, $classroomId)
    {
        $attendanceDays = array();
        $presentCount = 0;
        $absentCount = 0;
        if( !empty($attendances) ) {
            foreach($attendances as $attendance) {
                $studentsData = json_decode($attendance?->students);
                if( !empty($studentsData) ) {
                    foreach($studentsData as $std) {
                        if( isset($std->student_id) ) {
                            $stdObj = $this->apiStudentDetailsData($std->student_id, $schoolId, $academicYearId, $classroomId);
                            $attendanceDays[$std->student_id]['status'] = $std->attendance_status;
                            $attendanceDays[$std->student_id]['student'] = $stdObj;

                            if($std->attendance_status == 'present') {
                                $presentCount++;
                            }
                            elseif($std->attendance_status == 'absent') {
                                $absentCount++;
                            }
                        }
                    }
                }
            }
        }
        
        return [
            'presentCount' => $presentCount,
            'absentCount' => $absentCount,
            'students' => array_values($attendanceDays)
        ];
    }

    private function apiStudentsFromAttendancesAll($attendances, $stdId)
    {
        $attendanceDays = array();
        if( !empty($attendances) ) {
            foreach($attendances as $attendance) {
                $studentsData = json_decode($attendance?->students);
                if( !empty($studentsData) ) {
                    foreach($studentsData as $std) {
                        if( isset($std->student_id) && ($std->student_id == $stdId) ) {
                            $attnMonth = Carbon::parse($attendance->attendance_date_at)->format('F');
                            $attnYear = Carbon::parse($attendance->attendance_date_at)->format('Y');
                            if($std->attendance_status == 'present') {
                                if( !empty($attendanceDays[$attnMonth]['presentCount']) ) {
                                    $attendanceDays[$attnMonth]['presentCount'] = intval($attendanceDays[$attnMonth]['presentCount']) + 1;
                                }
                                else {
                                    $attendanceDays[$attnMonth]['presentCount'] = 1;
                                }
                                $attendanceDays[$attnMonth]['month'] = $attnMonth;
                            }
                            elseif($std->attendance_status == 'absent') {
                                if( !empty($attendanceDays[$attnMonth]['absentCount']) ) {
                                    $attendanceDays[$attnMonth]['absentCount'] = intval($attendanceDays[$attnMonth]['absentCount']) + 1;
                                }
                                else {
                                    $attendanceDays[$attnMonth]['absentCount'] = 1;
                                }
                                $attendanceDays[$attnMonth]['month'] = $attnMonth;
                                $attendanceDays[$attnMonth]['year'] = $attnYear;
                            }
                        }
                    }
                }
            }
        }
        
        return array_values($attendanceDays);
    }

    private function apiStudentsFromAttendanceBetweenDates($attendances, $schoolId, $academicYearId, $classroomId)
    {
        $students = array();
        $attStudents = array();
        if( !empty($attendances) ) {
            foreach($attendances as $attendance) {
                $studentsData = json_decode($attendance?->students);
                if( !empty($studentsData) ) {
                    foreach($studentsData as $std) {
                        if( !empty($std->student_id) ) {
                            array_push($attStudents, $std->student_id);
                            $stdObj = $this->apiStudentDetailsData($std->student_id, $schoolId, $academicYearId, $classroomId);
                            if($std->attendance_status == 'present') {
                                if( isset($students[$std->student_id]['present_count']) ) {
                                    $students[$std->student_id]['present_count'] = intval($students[$std->student_id]['present_count']) + 1;
                                }
                                else {
                                    $students[$std->student_id]['present_count'] = 1;
                                }
                            }
                            elseif($std->attendance_status == 'absent') {
                                if( isset($students[$std->student_id]['absent_count']) ) {
                                    $students[$std->student_id]['absent_count'] = intval($students[$std->student_id]['absent_count']) + 1;
                                }
                                else {
                                    $students[$std->student_id]['absent_count'] = 1;
                                }
                            }
                            $students[$std->student_id]['student'] = $stdObj;
                        }
                    }
                }
            }
        }
        
        return [
            'students' => array_values($students),
            'student_ids' => array_unique($attStudents)
        ];
    }



    private function apiStudentsFromMonths($attendances, $staffId)
    {
        $months = array('April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January');
        $staffs = array();
        if( !empty($attendances) ) {
            foreach($attendances as $attendance) {
                $staffsData = json_decode($attendance?->staffs);
                if( !empty($staffsData) ) {
                    foreach($staffsData as $staff) {
                        if( $staff->staff_id == $staffId) {
                            $attnMonth = Carbon::parse($attendance->attendance_date_at)->format('F');
                            // leave count
                            if( isset($staffs[$attnMonth]['leave_count']) ) {
                                if($staff->is_leave == true) {
                                    $staffs[$attnMonth]['leave_count'] = intval($staffs[$attnMonth]['leave_count']) + 1;
                                }
                                else {
                                    $staffs[$attnMonth]['leave_count'] = intval($staffs[$attnMonth]['leave_count']) + 0;
                                }
                            }
                            elseif($staff->is_leave == true) {
                                $staffs[$attnMonth]['leave_count'] = 1;
                            }
                            else {
                                $staffs[$attnMonth]['leave_count'] = 0;
                            }

                            // absent count
                            if( isset($staffs[$attnMonth]['absent_count']) ) {
                                if($staff->is_absent == true) {
                                    $staffs[$attnMonth]['absent_count'] = intval($staffs[$attnMonth]['absent_count']) + 1;
                                }
                                else {
                                    $staffs[$attnMonth]['absent_count'] = intval($staffs[$attnMonth]['absent_count']) + 0;
                                }
                            }
                            elseif($staff->is_absent == true) {
                                $staffs[$attnMonth]['absent_count'] = 1;
                            }
                            else {
                                $staffs[$attnMonth]['absent_count'] = 0;
                            }

                            // halfday count
                            if( isset($staffs[$attnMonth]['halfday_count']) ) {
                                if($staff->is_halfday == true) {
                                    $staffs[$attnMonth]['halfday_count'] = intval($staffs[$attnMonth]['halfday_count']) + 1;
                                }
                                else {
                                    $staffs[$attnMonth]['halfday_count'] = intval($staffs[$attnMonth]['halfday_count']) + 0;
                                }
                            }
                            elseif($staff->is_halfday == true) {
                                $staffs[$attnMonth]['halfday_count'] = 1;
                            }
                            else {
                                $staffs[$attnMonth]['halfday_count'] = 0;
                            }

                            // present count
                            if( isset($staffs[$attnMonth]['present_count']) ) {
                                if($staff->is_present == true) {
                                    $staffs[$attnMonth]['present_count'] = intval($staffs[$attnMonth]['present_count']) + 1;
                                }
                                else {
                                    $staffs[$attnMonth]['present_count'] = intval($staffs[$attnMonth]['present_count']) + 0;
                                }
                            }
                            elseif($staff->is_present == true) {
                                $staffs[$attnMonth]['present_count'] = 1;
                            }
                            else {
                                $staffs[$attnMonth]['present_count'] = 0;
                            }

                            // weekly off count
                            if( isset($staffs[$attnMonth]['weekly_off_count']) ) {
                                if($staff->is_weekly_off == true) {
                                    $staffs[$attnMonth]['weekly_off_count'] = intval($staffs[$attnMonth]['weekly_off_count']) + 1;
                                }
                                else {
                                    $staffs[$attnMonth]['weekly_off_count'] = intval($staffs[$attnMonth]['weekly_off_count']) + 0;
                                }
                            }
                            elseif($staff->is_weekly_off == true) {
                                $staffs[$attnMonth]['weekly_off_count'] = 1;
                            }
                            else {
                                $staffs[$attnMonth]['weekly_off_count'] = 0;
                            }

                            $staffs[$attnMonth]['month'] = $attnMonth;
                        }
                    }
                }
            }
        }
        
        return [
            'staffs' => array_values($staffs),
        ];
    }

   
}
