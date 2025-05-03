<?php

namespace App\Repositories;

use App\Models\Exam;
use App\Models\Mark;
use App\Enums\Status;
use App\Models\ClassName;
use App\Models\AcademicRemark;
use App\Models\AdmissionExamMark;
use Illuminate\Support\Facades\DB;
use App\Models\AcademicTermWiseExam;

class ExamRepository implements IRepository, IExamRepository
{
    public function getAll()
    {
        return Exam::all();
    }

    public function getById($id)
    {
        return Exam::findOrFail($id);
    }

    public function delete($id)
    {
        return Exam::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Exam::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Exam::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getExamtitle($schoolId = null, $academicYearId = null)
    {
        return Exam::where('exams.status', Status::ACTIVE)
            ->where('exams.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('exams.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->with(['classrooms' => function ($query) {
                $query->select('id', 'title', 'exam_status');
            }])
            ->select('id', 'title', 'is_registration')
            ->get();
    }

    public function getRegistrationExamsByClassNameId(int $classNameId)
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_registration', true)
            ->whereHas('classrooms', function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->select('id', 'title')
            ->get();
    }

    public function getRegisterAll()
    {
        return Exam::where('status', Status::ACTIVE);
    }

    public function getActiveClassroom()
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->get();
    }

    public function getActiveExam()
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveExamForWithClassroomId()
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->join('classroom_exam', 'exams.id', 'classroom_exam.exam_id')
            ->select(
                'exams.id',
                'exams.title',
                'classroom_exam.classroom_id',
            )
            ->get();
    }

    public function getActiveExamsByExamIds($ids)
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('id', $ids)
            ->get();
    }

    public function getExamsForEventCalendar(string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_display_on_calender', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate) && !empty($endDate)) {
                    $query->whereBetween('start_date_at', [$startDate, $endDate])
                        ->orWhereBetween('end_date_at', [$startDate, $endDate])
                        ->orWhere(function ($query) use ($startDate, $endDate) {
                            $query->where('start_date_at', '<=', $startDate)
                                ->where('end_date_at', '>=', $endDate);
                        });
                } elseif (!empty($startDate)) {
                    $query->where('start_date_at', '>=', $startDate)
                        ->orWhere('end_date_at', '>=', $startDate);
                } elseif (!empty($endDate)) {
                    $query->where('start_date_at', '<=', $endDate)
                        ->orWhere('end_date_at', '<=', $endDate);
                }
            })
            ->select(
                'id',
                'title',
                'start_date_at',
                'end_date_at'
            )
            ->get();
    }

    //academic exam remark
    public function getRemarkById($id)
    {
        return AcademicRemark::findOrFail($id);
    }
    public function deleteRemark($id)
    {
        AcademicRemark::destroy($id);
    }

    public function createRemark(array $arrayData)
    {
        return AcademicRemark::create($arrayData);
    }

    public function updateRemark($id, array $arrayData)
    {
        return AcademicRemark::whereId($id)->update($arrayData);
    }

    public function getActiveAllRemark()
    {
        return AcademicRemark::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveRemarks()
    {
        return AcademicRemark::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', null)
            ->where('exam_id', null)
            ->where('class_name_id', null)
            ->get();
    }

    //academic term wise exam-------------
    public function getTermById($id)
    {
        return AcademicTermWiseExam::findOrFail($id);
    }
    public function deleteTerm($id)
    {
        AcademicTermWiseExam::destroy($id);
    }

    public function createTerm(array $arrayData)
    {
        return AcademicTermWiseExam::create($arrayData);
    }

    public function updateTerm($id, array $arrayData)
    {
        return AcademicTermWiseExam::whereId($id)->update($arrayData);
    }

    public function getActiveAllTerm()
    {
        return AcademicTermWiseExam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function updateOrCreate($attributesToCheck, $valuesToUpdate)
    {
        return Mark::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getMarkFromExamId($classroomId, $examId, $schoolId = null, $academicYearId = null)
    {
        return Mark::where('status', Status::ACTIVE)
            ->where('classroom_id', $classroomId)
            ->where('exam_id', $examId)
            ->where('is_present', 0)
            ->with([
                'student',
                'student.father',
                'student.classroomRollRaw' => function ($q) use ($classroomId, $academicYearId) {
                    $q->where('classroom_rolls.classroom_id', $classroomId)
                        ->where('classroom_rolls.academic_year_id', $academicYearId);
                },
                'student.studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId);
                }
            ])
            ->get();
    }

    public function RemarksUpdateOrcreate($attributesToCheck, $attributesValueUpdate)
    {
        return AcademicRemark::updateOrCreate($attributesToCheck, $attributesValueUpdate);
    }

    public function getActiveClassNames()
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select(
                'id',
                'title',
            )
            ->get();
    }

    // classroom exam
    public function getClassroomIdsByExamId($examId)
    {
        return DB::table('classroom_exam')
            ->where('exam_id', $examId)
            ->pluck('classroom_id');
    }

    public function getExamIdsByClassroomIds($classroomIds)
    {
        return DB::table('classroom_exam')
            ->whereIn('classroom_id', $classroomIds)
            ->pluck('exam_id');
    }


    public function getByExamIdAndStudentId(int $examId, int $studentId)
    {
        return AcademicRemark::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('exam_id', $examId)
            ->where('student_id', $studentId)
            ->select(
                'id',
                'remarks',
                'student_id',
                'exam_id'
            )
            ->first();
    }

    public function getExamById(int $id)
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select('id', 'title')
            ->first();
    }

    public function updateOrCreateRegistrationExamMark(array $attributesToCheck, array $valuesToUpdate)
    {
        AdmissionExamMark::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getExamsByClassroomId(int $classroomId)
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('classrooms', function ($query) use ($classroomId) {
                $query->where('id', $classroomId);
            })
            ->select('id', 'title')
            ->get();
    }

    public function getExamByIdAndClassroomId(int $examId = null, int $classroomId = null)
    {
        return Exam::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $examId)
            ->whereHas('classrooms', function ($query) use ($classroomId) {
                $query->where('id', $classroomId);
            })
            ->with(['examDates:exam_id,classroom_subject_id,date_at,start_time_at,end_time_at',
                'examDates.classroomSubject:id,subject_id',
                'examDates.classroomSubject.subject:id,title'
            ])
            ->select('id', 'title', 'start_date_at', 'end_date_at')
            ->get();
    }
}
