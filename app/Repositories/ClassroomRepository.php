<?php

namespace App\Repositories;

use App\Models\Mark;
use App\Enums\Status;
use App\Models\Marks;
use App\Models\Section;
use App\Models\Student;
use App\Models\Subject;
use App\Models\ExamDate;
use App\Models\RuleType;
use App\Models\ClassName;
use App\Models\Classroom;
use App\Models\Timetable;
use App\Enums\GuardianType;
use App\Models\OnlineClass;
use App\Enums\EnquiryStatus;
use App\Models\ClassroomRoll;
use App\Enums\ClassSubjectType;
use App\Models\ExamCardSummary;
use App\Models\ClassroomSubject;
use App\Http\Requests\ResultCard;
use App\Models\ResultCardSummary;
use PhpParser\Node\Expr\FuncCall;
use App\Models\SubjectCardSummary;
use Illuminate\Support\Facades\DB;
use App\Models\ClassroomAttendance;
use App\Models\AcademicProgressReport;
use Illuminate\Database\Query\JoinClause;

class ClassroomRepository implements IRepository, IClassroomRepository
{
    public function getAll()
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->latest()
            ->get();
    }


    public function getActiveClassroomForTodayAtt($classroomIds)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereNotIn('id', $classroomIds)
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Classroom::findOrFail($id);
    }

    public function getByIdForAssignRoll($id)
    {
        $classroom = Classroom::where('classrooms.status', Status::ACTIVE)
            ->where('classrooms.school_id', getUserSchoolId())
            ->where('classrooms.academic_year_id', getAcademicYearId())
            ->where('classrooms.id', '=', $id)
            // ->where('school_id', '=', getUserSchoolId())
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->select(
                // classroom
                'classrooms.id',
                'classrooms.title',
                // student
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                // teacher
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name',
                DB::raw('(SELECT COUNT(*) FROM students WHERE classroom_id = ' . $id . ' AND status="Active") as total_students'),
                // DB::raw('(SELECT COUNT(*) FROM classroom_students JOIN students ON classroom_students.student_id = students.id WHERE classroom_students.academic_year_id = ' . getAcademicYearId() . ' AND  classroom_students.classroom_id = ' . $id . ' AND classroom_students.status="Active" AND students.status = "Active") as promoted_students'),
                DB::raw('(SELECT COUNT(DISTINCT classroom_students.student_id) FROM classroom_students JOIN students ON classroom_students.student_id = students.id WHERE classroom_students.academic_year_id = ' . getAcademicYearId() . ' AND  classroom_students.classroom_id = ' . $id . ' AND classroom_students.status="Active" AND students.status = "Active") as promoted_students'),
            )
            ->first();
        return $classroom;
    }

    public function getByIdForAssignRollOld($id)
    {
        $classroom = Classroom::where('classrooms.status', Status::ACTIVE)
            ->where('classrooms.school_id', getUserSchoolId())
            ->where('classrooms.academic_year_id', getAcademicYearId())
            ->where('classrooms.id', '=', $id)
            // ->where('school_id', '=', getUserSchoolId())
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->select(
                // classroom
                'classrooms.id',
                'classrooms.title',
                // student
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                // teacher
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name',
                DB::raw('(SELECT COUNT(*) FROM students WHERE classroom_id = ' . $id . ' AND status="Active") as total_students'),
                DB::raw('(SELECT COUNT(*) FROM classroom_students WHERE academic_year_id = ' . getAcademicYearId() . ' AND  classroom_id = ' . $id . ' AND status="Active") as promoted_students'),
            )
            ->first();
        return $classroom;
    }

    public function delete($id)
    {
        Classroom::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Classroom::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Classroom::whereId($id)->update($arrayData);
    }

    public function getClassroomFromClassNameId($classNameId, $classroomId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->whereNot('id', $classroomId)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->with('classTeacher')
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getClassroomsFromClassId($classNameId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('class_name_id', $classNameId)
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('display_order', 'ASC')
            ->get();
    }


    public function getClassroomsByAcademicYearId(int $academicYearId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getClassroomsByAcademicYearIdAndClassNameId(int $academicYearId, int $classNameId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('class_name_id', $classNameId)
            ->select(
                'id',
                'title'
            )
            ->get();
    }

    public function getClassroomIdsByClassNameId($classNameId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('class_name_id', $classNameId)
            ->pluck('id');
    }

    public function getClassroomsByIds(array $classroomIds)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $classroomIds)
            ->select('id', 'title')
            ->get();
    }

    public function getClassroomIdsByClassNameIds($classNameIds)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('class_name_id', $classNameIds)
            ->pluck('id');
    }

    public function getClassroomsByClassNameIds(array $classNameIds)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('class_name_id', $classNameIds)
            ->select('id', 'title')
            ->get();
    }

    public function getClassroomsByClassNameId(int $classNameId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('class_name_id', $classNameId)
            ->select('id', 'title')
            ->get();
    }

    public function getActiveAllSessionData()
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getClassRooms()
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'title')
            ->get();
    }

    public function getByClassNameParams($schoolId, $classNameId, $academicYearId, $title)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('class_name_id', $classNameId)
            ->where('academic_year_id', $academicYearId)
            ->where('title', $title)
            ->first();
    }

    public function getOnlineClassActiveAll()
    {
        return Classroom::with('subject', 'className')
            ->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            //  ->where('is_online_class', 1)
            ->latest()
            ->get();
    }

    public function getTodayOnlineLiveClass()
    {
        $today = now();
        return Classroom::with('subject', 'className')
            ->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->where('is_online_class', 1)
            ->whereDate('start_date_at', '<=', $today)
            ->whereDate('end_date_at', '>=', $today)
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getSubject()
    {
        return Subject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getAllActiveClass()
    {
        return Classroom::with('subject', 'className')
            ->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_online_class', 0)
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($academicId = null, $schoolId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicId != null) ? $academicId : getAcademicYearId())
            ->select('id', 'title', 'academic_year_id', 'class_name_id')
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getActiveNameAndIdNotAcy()
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title', 'academic_year_id', 'class_name_id')
            ->orderBy('title', 'ASC')
            ->get();
    }

    public function getActiveNameAndIdByClassNameId($class_id = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', '=', $class_id)
            ->select('id', 'class_name_id', 'title')
            // ->latest()
            ->orderBy('display_order', 'asc')
            ->get();
    }

    public function getActiveNameAndIdByClassNameIds(array $class_name_ids, $schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereIn('class_name_id', $class_name_ids)
            ->select('id', 'class_name_id', 'title')
            // ->latest()
            ->orderBy('display_order', 'asc')
            ->get();
    }


    public function getClassroomByTitle($classroomTitle)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('title', $classroomTitle)
            ->select('id', 'academic_year_id', 'class_name_id', 'title', 'section_title')
            ->first();
    }

    public function getClassNameIdFromClassId($classId)
    {
        return Classroom::find($classId)?->class_name_id;
    }

    public function getSessionIdFromClassId($classId)
    {
        return Classroom::find($classId)?->academic_year_id;
    }

    public function getClassNameForWorkingClassroom()
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'title')
            ->get();
    }

    public function getClassroomForWorkingClassroom($yearId, $class_id)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $yearId)
            ->where('class_name_id', $class_id)
            ->select('id', 'title', 'class_name_id')
            ->get();
    }


    //get by academic year
    public function getByAcy($id)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $id)
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getByAcyIds(array $ids)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('academic_year_id', $ids)
            ->select('id', 'title', 'academic_year_id')
            ->latest()
            ->get();
    }

    //get by academic year
    public function getByClass($id)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $id)
            ->where('classrooms.id', '=', 'classroom_id')
            ->select('id', 'title')
            ->latest()
            ->get();
    }


    // Class name
    public function getActiveClassNameAllByAcademicYearId(int $academicYearId, $schoolId = null)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->latest()
            ->get();
    }

    public function getActiveClassNameAll($schoolId = null, $academicYearId = null)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getActiveClassNameForTD()
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getClassNameById($id)
    {
        return ClassName::findOrFail($id);
    }

    public function classNameCreate(array $arrayData)
    {
        return ClassName::create($arrayData);
    }

    public function classNameModelUpdate($id, array $arrayData)
    {
        return ClassName::whereId($id)->update($arrayData);
    }

    public function classNameDelete($id)
    {
        return ClassName::destroy($id);
    }

    public function getAllActiveClassName()
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy("id", "DESC")
            ->with('sections')
            ->with('classrooms')
            ->get();
    }

    public function getActiveClassNameById($id)
    {
        return ClassName::where('id', $id)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with('sections')
            ->first();
    }

    public function getActiveClassNameAndId($schoolId = null, $academicYearId = null)
    {
        return ClassName::where('status', '=', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->select('id', 'title')
            ->orderBy("title", "ASC")
            ->get();
    }

    public function getActiveClassAndSection()
    {
        return ClassName::where('class_names.status', Status::ACTIVE)
            ->where('class_names.school_id', getUserSchoolId())
            ->where('class_names.academic_year_id', getAcademicYearId())
            ->orderBy("class_names.id", "DESC")
            ->leftJoin('sections', 'class_names.id', '=', 'sections.class_name_id')
            ->select(
                'class_names.id',
                'sections.id as section_id',
                'class_names.title',
                'sections.title as section_name',
            )
            ->get();
    }

    public function getClasses($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null)
    {
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $subQuery = DB::table('students')
            ->select(DB::raw('count(id)'))
            ->whereRaw('classroom_id = classrooms.id AND status="Active"');
        $subQueryPromo = DB::table('classroom_students')
            ->leftJoin('students', 'students.id', '=', 'classroom_students.student_id')
            // ->select(DB::raw('count(classroom_students.id)'))
            ->select(DB::raw('COUNT(DISTINCT classroom_students.student_id) AS student_count'))
            ->whereRaw('classroom_students.classroom_id = classrooms.id  AND students.status="Active" AND classroom_students.academic_year_id = ' . $academicYearId);

        return Classroom::where('classrooms.status', Status::ACTIVE)
            ->with(['students', 'classroomPromotedStudents'])
            //  => function ($q) {
            //     $q->whereNotNull('classroom_students.academic_year_id_from')
            //         ->whereNotNull('classroom_students.classroom_id_from');
            // }])
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->leftJoin('classroom_subjects', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            ->where('classrooms.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('classrooms.academic_year_id', $academicYearId)
            // ->where('students.status', "Active")
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('classrooms.class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('classroom_subjects.subject_id', $subjectId);
            })
            ->orderBy("classrooms.display_order", "ASC")
            ->select(
                'classrooms.id',
                'classrooms.title',
                'classrooms.class_monitor_id',
                DB::raw("(" . $subQuery->toSql() . ") as studentCount"),
                DB::raw("(" . $subQueryPromo->toSql() . ") as promoStudentCount"),
                'students.id as as_student_id',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'staff.id as as_teacher_id',
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name'
            )
            ->groupBy('classrooms.id')
            ->orderBy('classrooms.title', 'ASC')
            ->get();
    }


    public function getStudentsByClassNameIdAndSubjectId($classId = null, $subjectId = null)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classId, $subjectId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
                if (!empty($classId)) {
                    $query->where('class_name_id', $classId);
                }

                if (!empty($subjectId)) {
                    $query->whereHas('classroom.classroomSubjects', function ($query) use ($subjectId) {
                        $query->where('subject_id', $subjectId);
                    });
                }
            })
            ->with([
                'promotedClassroom',
                'father:id,student_id,first_name,middle_name,last_name',
                'classroomRoll' => function ($q) {
                    $q->where('classroom_rolls.academic_year_id', getAcademicYearId());
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_no',
            )
            ->get();
    }

    public function getClassWiseReg()
    {
        return  Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['enquiries.enquiry_fee'])
            ->withCount(['enquiries' => function ($query) {
                $query->where('enquiry_status', EnquiryStatus::REGISTRATION_TAKEN);
            }])
            ->get();
    }


    public function getClassNameWithoutFeeStructureAmountById(int $id)
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->where('id', $id)
            ->whereDoesntHave('fee_structure_amounts', function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->first();
    }

    public function getClassNameWithoutFeeStructureAmount()
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->whereDoesntHave('fee_structure_amounts', function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->get();
    }

    public function getClassNameWithoutFeeStructure()
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->whereDoesntHave('fee_structure', function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getClassNameWithoutFeeStructureByIds(array $ids)
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->whereDoesntHave('fee_structure', function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->orWhere(function ($query) use ($ids) {
                $query->whereIn('id', $ids);
            })
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getClassNameWithExams()
    {
        return ClassName::where('class_names.school_id', getUserSchoolId())
            ->where('class_names.academic_year_id', getAcademicYearId())
            ->where('class_names.status', Status::ACTIVE)
            ->with(['classrooms.exams'])
            ->get();
    }

    public function getClassroomWithExams()
    {
        return Classroom::where('classrooms.school_id', getUserSchoolId())
            ->where('classrooms.academic_year_id', getAcademicYearId())
            ->where('classrooms.status', Status::ACTIVE)
            ->leftJoin('classroom_exam', 'classroom_exam.classroom_id', '=', 'classrooms.id')
            ->leftJoin('exams', 'exams.id', '=', 'classroom_exam.exam_id')
            ->select(
                'classrooms.id as classroom_id',
                'exams.id as exam_id',
                'exams.title as exam_title',
            )
            ->get();
    }

    public function getClassroomsByExamId(int $examId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('exams', function ($query) use ($examId) {
                $query->where('exam_id', $examId);
            })
            ->select('id', 'class_name_id', 'title')
            ->get();
    }

    public function getClassNamesByExamId(int $examId)
    {
        $classrooms = $this->getClassroomsByExamId($examId);
        $classNameIds = $classrooms?->pluck('class_name_id')?->toArray();

        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('id', $classNameIds)
            ->select('id', 'title')
            ->get();
    }

    public function getStudentClassWiseData($classroomId, $subjectId)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->join('classroom_students', function ($join) use ($classroomId) {
                $join->on('students.id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->join('classroom_subjects', function ($join) use ($classroomId, $subjectId) {
                $join->on('classroom_subjects.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_subjects.classroom_id', $classroomId)
                    ->where('classroom_subjects.subject_id', $subjectId)
                    ->where('classroom_subjects.type', ClassSubjectType::OPTIONAL);
            })
            ->with([
                'father:guardians.student_id,guardians.first_name,guardians.middle_name,guardians.last_name,guardians.guardian_type',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_rolls.classroom_id', $classroomId);
                }
            ])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.classroom_id',
                'students.admission_no',
                'students.birth_date_at'
            )
            ->groupBy('students.id')
            ->get();
    }

    public function getStudentClassWiseDataOld($classroomId, $subjectId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with(['father:student_id,first_name,middle_name,last_name,guardian_type'])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
                'admission_no',
            )
            ->get();
    }

    public function getStudentSInfo($classId, $studentId, $schoolId = null, $academicYearId = null)
    {
        // need to work for student
        return ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classroom_id', $classId)
            // ->where('classroom_subjects.id', $studentId)
            ->with(['subject' => function ($query) {
                $query->select('id', 'title');
            }])
            ->select(
                'id',
                'type',
                'subject_id',
            )
            ->get();
    }

    public function getStudentMarks($class_name_id)
    {
        return Mark::where('marks.classroom_id', $class_name_id)
            ->where('marks.school_id', getUserSchoolId())
            ->leftJoin('students', 'marks.student_id', '=', 'students.id')
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            // ->leftJoin('subjects', 'classroom_subjects.subject_id', '=', 'subjects.id')
            ->select(
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.srn_no',
                'exams.title as exam_title',
                'marks.mark',
            )
            ->get();
    }

    public function getAbsentStudentData()
    {
        return Mark::where('marks.status', Status::ACTIVE)
            ->where('marks.school_id', getUserSchoolId())
            ->where('marks.is_present', false)
            ->leftJoin('classrooms', 'marks.classroom_id', '=', 'classrooms.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('students', 'marks.student_id', '=', 'students.id')
            ->select(
                'students.srn_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.notes',
                'classrooms.title as classroom_title',
                'subjects.title as subject_title',
                'exams.title as exam_title',
            )
            ->get();
    }

    public function fielterDataForAbsentStu($classId, $subjectId, $examID)
    {
        return Mark::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_present', false)
            ->where('classroom_id', $classId)
            ->where('subject_id', $subjectId)
            ->where('exam_id', $examID)
            ->with(
                [
                    'student' => function ($query) {
                        $query->select('id', 'first_name', 'middle_name', 'last_name', 'notes');
                    },
                    'student.classroomRoll' => function ($query) {
                        $query->select('id', 'student_id', 'roll_no');
                    },
                    'classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'subject' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'exam' => function ($query) {
                        $query->select('id', 'title');
                    }
                ]
            )
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'exam_id',
                'student_id',
            )
            ->get();
    }

    public function getStudentForSendMark($classroom_id, $exam_id)
    {
        return Mark::where('is_present', true)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroom_id)
            ->where('exam_id', $exam_id)
            ->with(
                [
                    'student' => function ($query) use ($classroom_id) {
                        $query->with(['classroomRoll' => function ($query) use ($classroom_id) {
                            $query->where('academic_year_id', getAcademicYearId())
                                ->where('classroom_id', $classroom_id);
                        }])
                            ->select('id', 'admission_no', 'first_name', 'middle_name', 'last_name');
                    },
                    'student.father' => function ($query) {
                        $query->select('id', 'student_id', 'first_name', 'middle_name', 'last_name', 'sms_phone');
                    },
                    'classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'grade' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'classroomSubject' => function ($query) use ($classroom_id, $exam_id) {
                        $query->where('classroom_id', $classroom_id)
                            ->with(['examRoasters' => function ($query) use ($exam_id) {
                                $query->where('exam_id', $exam_id);
                            }]);
                    }
                ]
            )
            ->select(
                'id',
                'classroom_id',
                'student_id',
                'subject_id',
                'academic_grade_item_id',
                'mark',
            )
            ->get();
    }

    public function getSubjectsCountStudents($classroom_id, $exam_id)
    {
        $subQuery = DB::table('marks')
            ->select(DB::raw('count(id)'))
            ->whereRaw('classroom_id = classroom_subjects.classroom_id AND exam_id =' . $exam_id);

        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.academic_year_id', getAcademicYearId())
            ->where('classroom_subjects.classroom_id', $classroom_id)
            ->with(['subject' => function ($query) {
                $query->select('id', 'title');
            }])
            ->select(
                'classroom_subjects.classroom_id',
                'classroom_subjects.subject_id',
                DB::raw("(" . $subQuery->toSql() . ") as studentCount"),
            )
            ->get();
    }


    public function getConsolidData($clssNameId)
    {
        return Mark::where('marks.classroom_id', $clssNameId)
            ->where('marks.school_id', getUserSchoolId())
            ->leftJoin('students', 'marks.student_id', '=', 'students.id')
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->select(
                'students.admission_no',
                'students.srn_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'exams.title as exam_title',
                'subjects.title as subject_title',
                'marks.*',
                // DB::raw('SUM(marks.mark) as total_mark')
            )
            ->get();
    }

    public function getConsolidatedReportData(int $classroomId)
    {
        return Mark::where('marks.classroom_id', $classroomId)
            ->where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->join('classroom_students', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->join('students', 'classroom_students.student_id', '=', 'students.id')
            ->leftJoin('classroom_rolls', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classroomId);
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->select(
                'students.admission_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'exams.title as exam_title',
                'subjects.title as subject_title',
                'subjects.is_co_scholastic',
                'classroom_rolls.roll_no',
                'marks.*',
            )
            ->get();
    }

    public function getFinalConsolidatedReportData(int $classroomId)
    {
        return Mark::where('marks.classroom_id', $classroomId)
            ->where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->join('classroom_students', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->join('students', 'classroom_students.student_id', '=', 'students.id')
            ->leftJoin('classroom_rolls', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classroomId);
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('exam_attendances', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'exam_attendances.student_id')
                    ->on('marks.exam_id', '=', 'exam_attendances.exam_id')
                    ->where('exam_attendances.academic_year_id', getAcademicYearId())
                    ->where('exam_attendances.classroom_id', $classroomId);
            })
            ->leftJoin('student_ranks', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'student_ranks.student_id')
                    ->where('student_ranks.academic_year_id', getAcademicYearId())
                    ->where('student_ranks.classroom_id', $classroomId);
            })
            ->leftJoin('classroom_subjects', function ($join) use ($classroomId) {
                $join->on('marks.classroom_id', '=', 'classroom_subjects.classroom_id')
                    ->on('marks.subject_id', '=', 'classroom_subjects.subject_id')
                    ->where('classroom_subjects.academic_year_id', getAcademicYearId())
                    ->where('classroom_subjects.classroom_id', $classroomId);
            })
            ->leftJoin('exam_roasters', function ($join) {
                $join->on('exam_roasters.exam_id', '=', 'marks.exam_id')
                    ->on('exam_roasters.classroom_subject_id', '=', 'classroom_subjects.id');
            })
            ->leftJoin('academic_grade_items', function ($join) {
                $join->on('academic_grade_items.id', '=', 'marks.academic_grade_item_id');
            })
            ->select(
                'students.admission_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'exams.title as exam_title',
                'subjects.title as subject_title',
                'subjects.is_co_scholastic',
                'classroom_rolls.roll_no',
                'exam_attendances.present_day',
                'student_ranks.rank',
                'exam_roasters.full_mark',
                'marks.*',
                'academic_grade_items.title as grade',
                'classroom_subjects.is_marking',
            )
            ->get();
    }

    public function getFinalConsolidatedReportData_Old(int $classroomId)
    {
        return Mark::where('marks.classroom_id', $classroomId)
            ->where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->join('classroom_students', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->join('students', 'classroom_students.student_id', '=', 'students.id')
            ->leftJoin('classroom_rolls', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classroomId);
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('exam_attendances', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'exam_attendances.student_id')
                    ->on('marks.exam_id', '=', 'exam_attendances.exam_id')
                    ->where('exam_attendances.academic_year_id', getAcademicYearId())
                    ->where('exam_attendances.classroom_id', $classroomId);
            })
            ->leftJoin('student_ranks', function ($join) use ($classroomId) {
                $join->on('marks.student_id', '=', 'student_ranks.student_id')
                    ->where('student_ranks.academic_year_id', getAcademicYearId())
                    ->where('student_ranks.classroom_id', $classroomId);
            })
            ->leftJoin('classroom_subjects', function ($join) use ($classroomId) {
                $join->on('marks.classroom_id', '=', 'classroom_subjects.classroom_id')
                    ->on('marks.subject_id', '=', 'classroom_subjects.subject_id')
                    ->where('classroom_subjects.academic_year_id', getAcademicYearId())
                    ->where('classroom_subjects.classroom_id', $classroomId);
            })
            ->leftJoin('exam_roasters', function ($join) {
                $join->on('exam_roasters.exam_id', '=', 'marks.exam_id')
                    ->on('exam_roasters.classroom_subject_id', '=', 'classroom_subjects.id');
            })
            ->select(
                'students.admission_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'exams.title as exam_title',
                'subjects.title as subject_title',
                'classroom_rolls.roll_no',
                'exam_attendances.present_day',
                'student_ranks.rank',
                'exam_roasters.full_mark',
                'marks.*',
            )
            ->get();
    }

    public function getExamWiseReport($classId, $examId)
    {
        return Mark::where('marks.classroom_id', $classId)
            ->where('marks.exam_id', $examId)
            ->where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->leftJoin('students', 'marks.student_id', '=', 'students.id')
            ->join('classroom_students', function ($join) use ($classId) {
                $join->on('students.id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classId);
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('classroom_rolls', function ($join) use ($classId) {
                $join->on('students.id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classId);
            })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value);
            })
            ->select(
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no',
                'exams.title as exam_title',
                'exams.id as exam_id',
                'subjects.id as subject_id',
                'subjects.title as subject_title',
                // mark
                'marks.id as mark_id',
                'marks.mark',
                'marks.is_present',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
            )
            ->get();
    }

    public function getExamWiseReportOld($classId, $examId)
    {
        return Mark::where('marks.classroom_id', $classId)
            ->where('marks.exam_id', $examId)
            ->where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->leftJoin('students', 'marks.student_id', '=', 'students.id')
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('classroom_rolls', 'students.id', '=', 'classroom_rolls.student_id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value);
            })
            ->select(
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no',
                'exams.title as exam_title',
                'subjects.title as subject_title',
                // mark
                'marks.id as mark_id',
                'marks.mark',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
            )
            ->get();
    }

    public function getSubjectWiseData()
    {
        return Mark::where('marks.status', Status::ACTIVE)
            ->where('marks.school_id', getUserSchoolId())
            ->leftJoin('classrooms', 'marks.classroom_id', '=', 'classrooms.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('students', 'marks.student_id', '=', 'students.id')
            ->select(
                'students.admission_no',
                'students.srn_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
            )
            ->get();
    }

    public function getSubjectWiseDataWith()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with([
                'marks' => function ($query) {
                    $query->select('id', 'mark', 'student_id');
                }
            ])
            ->select(
                'id',
                'students.admission_no',
                'students.srn_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
            )
            ->get();
    }

    public function getGraphWeakerReport($classroomId, $examId, $subjectId)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->join('classroom_students', function ($join) use ($classroomId) {
                $join->on('students.id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->join('classroom_subjects', function ($join) use ($classroomId, $subjectId) {
                $join->on('classroom_students.classroom_id', '=', 'classroom_subjects.classroom_id')
                    ->where('classroom_subjects.academic_year_id', getAcademicYearId())
                    ->where('classroom_subjects.classroom_id', $classroomId);

                if (!empty($subjectId)) {
                    $join->where('classroom_subjects.subject_id', $subjectId);
                }
            })
            ->leftJoin('classroom_rolls', function ($join) use ($classroomId) {
                $join->on('students.id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classroomId);
            })
            ->join('marks', function ($join) use ($classroomId, $examId, $subjectId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.academic_year_id', getAcademicYearId())
                    ->where('marks.classroom_id', $classroomId);

                if (!empty($examId)) {
                    $join->where('marks.exam_id', $examId);
                }

                if (!empty($subjectId)) {
                    $join->where('marks.subject_id', $subjectId);
                }
            })
            ->leftJoin('exam_roasters', function ($join) use ($examId) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->on('marks.exam_id', '=', 'exam_roasters.exam_id')
                    ->where('exam_roasters.academic_year_id', getAcademicYearId());

                if (!empty($examId)) {
                    $join->where('exam_roasters.exam_id', $examId);
                }
            })
            ->select(
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'marks.mark',
                'marks.exam_id',
                'marks.subject_id',
                'exam_roasters.full_mark',
                'classroom_rolls.roll_no'
            )
            ->get();
    }

    public function getGraphWeakerReportOld($classroomId, $examId, $subjectId)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->whereHas('marks', function ($query) use ($classroomId, $examId, $subjectId) {
                $query->where('classroom_id', $classroomId)
                    ->where('exam_id', $examId)
                    ->where('subject_id', $subjectId);
            })
            ->with(['marks'])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.classroom_id',
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->whereHas('marks', function ($query) use ($classroomId, $examId, $subjectId) {
                $query->where('classroom_id', $classroomId)
                    ->where('exam_id', $examId)
                    ->where('subject_id', $subjectId);
            })
            ->with(['marks'])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.classroom_id',
            );

        return $query->union($query2)->get();
    }

    public function getAllGraphWeakerReport()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->with(['marks'])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
            )
            ->get();
    }

    public function getTopperReportFilter($classId, $examId, $subjectId)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->join('classroom_students', function ($join) use ($classId) {
                $join->on('students.id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classId);
            })
            ->join('classroom_subjects', function ($join) use ($classId, $subjectId) {
                $join->on('classroom_students.classroom_id', '=', 'classroom_subjects.classroom_id')
                    ->where('classroom_subjects.academic_year_id', getAcademicYearId())
                    ->where('classroom_subjects.classroom_id', $classId);

                if (!empty($subjectId)) {
                    $join->where('classroom_subjects.subject_id', $subjectId);
                }
            })
            ->leftJoin('classroom_rolls', function ($join) use ($classId) {
                $join->on('students.id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classId);
            })
            ->join('marks', function ($join) use ($classId, $examId, $subjectId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.academic_year_id', getAcademicYearId())
                    ->where('marks.classroom_id', $classId);

                if (!empty($examId)) {
                    $join->where('marks.exam_id', $examId);
                }

                if (!empty($subjectId)) {
                    $join->where('marks.subject_id', $subjectId);
                }
            })
            ->leftJoin('exam_roasters', function ($join) use ($examId) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->on('marks.exam_id', '=', 'exam_roasters.exam_id')
                    ->where('exam_roasters.academic_year_id', getAcademicYearId());

                if (!empty($examId)) {
                    $join->where('exam_roasters.exam_id', $examId);
                }
            })
            ->select(
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'marks.mark',
                'marks.exam_id',
                'marks.subject_id',
                'exam_roasters.full_mark',
                'classroom_rolls.roll_no'
            )
            ->get();
    }

    public function getTopperReportFilterOld($classId, $examId, $subjectId)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->whereHas('marks', function ($query) use ($classId, $examId, $subjectId) {
                $query->where('classroom_id', $classId)
                    ->where('exam_id', $examId)
                    ->where('subject_id', $subjectId);
            })
            ->with(['marks'])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.classroom_id',
                DB::raw('(SELECT AVG(mark) FROM marks WHERE student_id = students.id) as total_percentage')
            )
            ->orderByDesc('total_percentage');

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->whereHas('marks', function ($query) use ($classId, $examId, $subjectId) {
                $query->where('classroom_id', $classId)
                    ->where('exam_id', $examId)
                    ->where('subject_id', $subjectId);
            })
            ->with(['marks'])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.classroom_id',
                DB::raw('(SELECT AVG(mark) FROM marks WHERE student_id = students.id) as total_percentage')
            )
            ->orderByDesc('total_percentage');

        return $query->union($query2)->get();
    }

    public function getTopperReport()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->with(['marks'])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
                DB::raw('(SELECT AVG(mark) FROM marks WHERE student_id = students.id) as total_percentage')
            )
            ->orderByDesc('total_percentage')
            ->get();
    }

    public function getAllStudentSubWiseRep(int $classroomId, int $studentId, int $subjectId)
    {
        return Mark::where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->where('marks.student_id', $studentId)
            ->where('marks.classroom_id', $classroomId)
            ->where('marks.subject_id', $subjectId)
            ->join('exams', 'exams.id', '=', 'marks.exam_id')
            ->join('classroom_subjects', function ($join) {
                $join->on('classroom_subjects.classroom_id', '=', 'marks.classroom_id')
                    ->on('classroom_subjects.subject_id', '=', 'marks.subject_id');
            })
            ->leftJoin('exam_roasters', function ($join) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->on('marks.exam_id', '=', 'exam_roasters.exam_id');
            })
            ->select(
                'marks.mark',
                'exams.id as exam_id',
                'exams.title as exam_title',
                'exam_roasters.full_mark'
            )
            ->get();
    }

    public function getAllStudentSubWiseRepOld($classroomID, $studentID, $subjectID)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.id', $studentID)
            ->whereHas('marks', function ($query) use ($classroomID, $subjectID) {
                $query->where('marks.classroom_id', $classroomID)
                    ->where('marks.subject_id', $subjectID);
            })
            ->with(['marks.exam'])
            ->join('marks', 'students.id', '=', 'marks.student_id')
            ->join('exams', 'exams.id', '=', 'marks.exam_id')
            ->select(
                'students.id',
                'exams.title'
            )
            ->get();
    }


    public function getStudentSubWiseRep()
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->with(['marks.exam'])
            ->join('marks', 'students.id', '=', 'marks.student_id')
            ->join('exams', 'exams.id', '=', 'marks.exam_id')
            ->select(
                'students.id',
                'exams.title'
            )
            ->get();
    }


    public function getClassNamesByClassroomIds($classroomIds, $academicYearId)
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereHas('classrooms', function ($query) use ($classroomIds, $academicYearId) {
                $query->where('academic_year_id', $academicYearId)
                    ->whereIn('id', $classroomIds);
            })
            ->whereHas('fee_structure')
            ->get();
    }

    public function getClassNamesByClassroomIdsTwo($classroomIds)
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereHas('classrooms', function ($query) use ($classroomIds) {
                $query->whereIn('id', $classroomIds);
            })
            ->get();
    }

    public function getClassRoomIdByClassNameIds($classNameIds)
    {
        return Classroom::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereHas('className', function ($query) use ($classNameIds) {
                $query->whereIn('id', $classNameIds);
            })
            ->pluck('id');
    }

    public function getClassNamesWithFeestructure()
    {
        return ClassName::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereHas('classrooms', function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->whereHas('fee_structure')
            ->get();
    }

    public function checkClassNamesWithoutFeeStructureExists(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassName::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->whereHas('classrooms', function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId);
            })
            ->whereDoesntHave('fee_structure')
            ->exists();
    }

    public function gellAllRuleType()
    {
        return AcademicProgressReport::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function resultCardUpdate($attributesToCheck, $valuesToUpdate)
    {
        return ResultCardSummary::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function resultCardStepThreeUpdate($attributesToCheck, $valuesToUpdate)
    {
        return ExamCardSummary::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function resultCardStepFourUpdate($attributesToCheck, $valuesToUpdate)
    {
        return SubjectCardSummary::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }


    public function getActiveResultCardData()
    {
        return ResultCardSummary::where('result_card_summaries.school_id', getUserSchoolId())
            ->where('result_card_summaries.academic_year_id', getAcademicYearId())
            ->leftJoin('exams', 'result_card_summaries.exam_id', '=', 'exams.id')
            ->leftJoin('academic_progress_reports', 'result_card_summaries.academic_progress_report_id', '=', 'academic_progress_reports.id')
            ->select(
                'result_card_summaries.classroom_id as classroom_id',
                'academic_progress_reports.title as report_title',
                'exams.title as exam_title',
            )
            ->get()
            ->map(function ($resultCard) {
                // Decode classroom_id only if it's not null
                $classrooms = json_decode($resultCard->classroom_id) ?? [];

                $classroomTitles = Classroom::whereIn('id', $classrooms)
                    ->pluck('title')
                    ->toArray();

                $resultCard['classrooms'] = $classroomTitles ? implode(', ', $classroomTitles) : null;

                return $resultCard;
            });
    }

    public function exportExcelClasses()
    {
        $subQuery = DB::table('students')
            ->select(DB::raw('count(id)'))
            ->whereRaw('classroom_id = classrooms.id AND status="Active"');
        $subQueryPromo = DB::table('classroom_students')
            ->leftJoin('students', 'students.id', '=', 'classroom_students.student_id')
            // ->select(DB::raw('count(classroom_students.id)'))
            ->select(DB::raw('COUNT(DISTINCT classroom_students.student_id) AS student_count'))
            ->whereRaw('classroom_students.classroom_id = classrooms.id  AND students.status="Active" AND classroom_students.academic_year_id = ' . getAcademicYearId());


        return Classroom::where('classrooms.status', Status::ACTIVE)
            ->with(['students', 'classroomPromotedStudents' => function ($q) {
                // $q->whereNotNull('classroom_students.academic_year_id_from')
                //     ->whereNotNull('classroom_students.classroom_id_from');
            }])
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->leftJoin('classroom_subjects', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            ->leftJoin('academic_years', 'academic_years.id', '=', 'classrooms.academic_year_id')
            ->where('classrooms.school_id', getUserSchoolId())
            ->where('classrooms.academic_year_id', getAcademicYearId())
            ->orderBy("classrooms.display_order", "ASC")
            ->select(
                'academic_years.academic_session',
                'classrooms.title as class_name',
                DB::raw("CONCAT(staff.first_name, ' ', staff.middle_name, ' ', staff.last_name) as teacher_name"),
                DB::raw("CONCAT(students.first_name,' ',students.middle_name,' ',students.last_name) AS student_name"),
                // DB::raw("SUM((" . $subQuery->toSql() . ") + (" . $subQueryPromo->toSql() . ")) as studentCount")
                DB::raw("(" . $subQueryPromo->toSql() . ") as studentCount")
            )
            ->groupBy('classrooms.id')
            ->orderBy('classrooms.title', 'ASC')
            ->get();
    }


    public function getRollFromClassAndStudent($classroomId, $studentId)
    {
        return ClassroomRoll::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('classroom_id', $classroomId)
            ->where('student_id', $studentId)
            ->select('roll_no')
            ->first();
    }


    public function getSessionWiseActiveClassNameAll()
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getClassNamesByAcademicYearId(int $academicYearId)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getClassNameByIdAndAcademicYearId(int $id, int $academicYearId)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->orderBy('id', 'asc')
            ->first();
    }


    public function getSessionWiseClassNameById(int $id)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->first();
    }

    public function getClassNameByClassroomId(int $classroomId)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('classrooms', function ($query) use ($classroomId) {
                $query->where('id', $classroomId);
            })
            ->first();
    }


    public function getClassroomTitleById(int $id)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select('id', 'title')
            ->first();
    }

    public function getClassroomById(int $id, $schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('id', $id)
            ->select('id', 'academic_year_id', 'class_name_id', 'title', 'class_teacher_id')
            ->first();
    }


    public function getClassroomByIdAndAcademicYearId(int $id, int $academicYearId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select('id', 'class_name_id', 'title')
            ->first();
    }


    public function getClassNameTitleById(int $id)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select('title')
            ->first()?->title;
    }

    public function getAllClassesRaw($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null)
    {
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $subQueryPromo = DB::table('classroom_students')
            ->leftJoin('students', 'students.id', '=', 'classroom_students.student_id')
            ->select(DB::raw('count(classroom_students.id)'))
            ->whereRaw('classroom_students.classroom_id = classrooms.id  AND students.status="Active" AND classroom_students.academic_year_id = ' . $academicYearId);

        return Classroom::where('classrooms.status', Status::ACTIVE)
            ->with(['classroomPromotedStudentsRaw' => function ($q) use ($schoolId, $academicYearId) {
                $q->where(['school_id' => $schoolId, 'academic_year_id' => $academicYearId]);
            }])
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->leftJoin('classroom_subjects', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            ->where('classrooms.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('classrooms.academic_year_id', $academicYearId)
            // ->where('students.status', "Active")
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('classrooms.class_name_id', $classId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('classroom_subjects.subject_id', $subjectId);
            })
            ->orderBy("classrooms.display_order", "ASC")
            ->select(
                'classrooms.id',
                'classrooms.title',
                'classrooms.class_monitor_id',
                DB::raw("(" . $subQueryPromo->toSql() . ") as promoStudentCount"),
                'students.id as as_student_id',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'staff.id as as_teacher_id',
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name'
            )
            ->groupBy('classrooms.id')
            ->orderBy('classrooms.title', 'ASC')
            ->get();
    }

    public function getTeacherClassroomsRaw(int $teacherId, int $classNameId = null, $schoolId = null, $academicYearId = null)
    {
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $subQueryPromo = DB::table('classroom_students')
            ->leftJoin('students', 'students.id', '=', 'classroom_students.student_id')
            ->select(DB::raw('count(classroom_students.id)'))
            ->whereRaw('classroom_students.classroom_id = classrooms.id  AND students.status="Active" AND classroom_students.academic_year_id = ' . $academicYearId);

        return Classroom::where('classrooms.status', Status::ACTIVE)
            ->with(['classroomPromotedStudentsRaw' => function ($q) use ($schoolId, $academicYearId) {
                $q->where(['school_id' => $schoolId, 'academic_year_id' => $academicYearId]);
            }])
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->leftJoin('classroom_subjects', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            ->where('classrooms.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('classrooms.academic_year_id', $academicYearId)
            ->where('classrooms.class_teacher_id', $teacherId)
            // ->where('students.status', "Active")
            ->orderBy("classrooms.display_order", "ASC")
            ->select(
                'classrooms.id',
                'classrooms.title',
                'classrooms.class_monitor_id',
                DB::raw("(" . $subQueryPromo->toSql() . ") as promoStudentCount"),
                'students.id as as_student_id',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'staff.id as as_teacher_id',
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name'
            )
            ->groupBy('classrooms.id')
            ->orderBy('classrooms.title', 'ASC')
            ->get();
    }

    public function getSingleClassroomRaw($classroomId = null, $subjectId = null, $schoolId = null, $academicYearId = null)
    {
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $subQueryPromo = DB::table('classroom_students')
            ->leftJoin('students', 'students.id', '=', 'classroom_students.student_id')
            ->select(DB::raw('count(classroom_students.id)'))
            ->whereRaw('classroom_students.classroom_id = classrooms.id  AND students.status="Active" AND classroom_students.academic_year_id = ' . $academicYearId);

        return Classroom::where('classrooms.status', Status::ACTIVE)
            ->with(['classroomPromotedStudentsRaw' => function ($q) use ($schoolId, $academicYearId) {
                $q->where(['school_id' => $schoolId, 'academic_year_id' => $academicYearId]);
            }])
            ->leftJoin('students', 'students.id', '=', 'classrooms.class_monitor_id')
            ->leftJoin('staff', 'staff.id', '=', 'classrooms.class_teacher_id')
            ->leftJoin('classroom_subjects', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            ->where('classrooms.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('classrooms.academic_year_id', $academicYearId)
            // ->where('students.status', "Active")
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->where('classrooms.id', $classroomId);
            })
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('classroom_subjects.subject_id', $subjectId);
            })
            ->orderBy("classrooms.display_order", "ASC")
            ->select(
                'classrooms.id',
                'classrooms.title',
                'classrooms.class_monitor_id',
                DB::raw("(" . $subQueryPromo->toSql() . ") as promoStudentCount"),
                'students.id as as_student_id',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'staff.id as as_teacher_id',
                'staff.first_name as teacher_first_name',
                'staff.middle_name as teacher_middle_name',
                'staff.last_name as teacher_last_name'
            )
            ->groupBy('classrooms.id')
            ->orderBy('classrooms.title', 'ASC')
            ->get();
    }

    public function getTeacherClassNames(int $teacherId, $schoolId = null, $academicYearId = null)
    {
        return ClassName::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereHas('classrooms', function ($query) use ($teacherId) {
                $query->where('class_teacher_id', $teacherId);
            })
            ->select(
                'id',
                'title'
            )
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getTeacherClassrooms(int $teacherId, int $classNameId = null, $schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_teacher_id', $teacherId)
            ->when(!empty($classNameId), function ($query) use ($classNameId) {
                $query->where('class_name_id', $classNameId);
            })
            ->select(
                'id',
                'title'
            )
            ->orderBy('display_order', 'asc')
            ->get();
    }

    public function getByClassNameId(int $classNameId, $schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->select(
                'id',
                'title'
            )
            ->orderBy('display_order', 'asc')
            ->get();
    }

    // online class

    public function getOnlineClassById(int $id, int $userId = null, $schoolId = null)
    {
        return OnlineClass::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->where(function ($query) use ($userId) {
                if (!empty($userId)) {
                    $query->where('user_id', $userId);
                }
            })
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'start_date',
                'start_time',
                'end_time',
                'repeat_date',
                'live_class_url',
                'notes',
                'repeatable_days',
            )
            ->first();
    }

    public function deleteOnlineClass(int $id)
    {
        return OnlineClass::destroy($id);
    }

    public function createOnlineClass(array $arrayData)
    {
        return OnlineClass::create($arrayData);
    }

    public function updateOnlineClass(int $id, array $arrayData)
    {
        return OnlineClass::where('id', $id)->update($arrayData);
    }

    public function getOnlineClasses(
        int $classroomId = null,
        int $subjectId = null,
        string $startDate = "",
        string $endDate = "",
        int $userId = null,
        int $academicYearId = null,
        int $schoolId = null
    ) {
        $academicYearId =  !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return OnlineClass::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where(function ($query) use ($classroomId, $subjectId, $startDate, $endDate, $userId) {
                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomId);
                }

                if (!empty($subjectId)) {
                    $query->where('subject_id', $subjectId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('start_date', '<=', $endDate);
                }

                if (!empty($userId)) {
                    $query->where('user_id', $userId);
                }
            })
            ->with([
                'subject' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                    );
                },
                'classroom' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                    );
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'start_date',
                'start_time',
                'end_time',
                'repeat_date',
                'repeatable_days',
                'live_class_url',
                'notes'
            )
            ->get();
    }

    public function getTodayOnlineClasses(
        int $classroomId = null,
        int $subjectId = null,
        int $userId = null,
        int $academicYearId = null,
        int $schoolId = null
    ) {
        $today = now()->toDateString();
        $academicYearId =  !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return OnlineClass::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('start_date', $today)
            ->where(function ($query) use ($classroomId, $subjectId, $userId) {
                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomId);
                }

                if (!empty($subjectId)) {
                    $query->where('subject_id', $subjectId);
                }

                if (!empty($userId)) {
                    $query->where('user_id', $userId);
                }
            })
            ->with([
                'subject' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                    );
                },
                'classroom' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                    );
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'start_date',
                'start_time',
                'end_time',
                'repeat_date',
                'repeatable_days',
                'live_class_url',
                'notes'
            )
            ->get();
    }

    // timetable
    public function createTimeTable(array $arrayData)
    {
        return Timetable::create($arrayData);
    }

    // timetable
    public function getTimeTableActiveAll($type = 'Morning', $classroomId = null, $schoolId = null, $academicYearId = null)
    {
        return Timetable::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereHas('subject.classroomSubjects', function ($query) {
                $query->whereRaw('subject_id = timetables.subject_id');
            })

            ->with(['classroom', 'subject.classroomSubjects' => function ($query) use ($classroomId) {
                $query->whereRaw('classroom_id = (SELECT classroom_id FROM timetables WHERE id = timetables.id LIMIT 1)')->select(
                    'id',
                    'classroom_id',
                    'subject_id',
                    'teachers_data'
                );
            }])
            ->when(!empty($type), function ($query) use ($type) {
                $query->where('shift_type', $type);
            })
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->where(function ($query) {
                $query->where(function ($q) {
                    $q->whereDate('start_date', '<=', now())
                        ->whereDate('repeat_date', '>=', now());
                })
                    ->orWhere(function ($q) {
                        $q->whereNull('repeat_date')
                            ->whereDate('start_date', '=', now());
                    });
            })
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'start_date',
                'start_time',
                'end_time',
                'shift_type',
                'repeat_date',
                'repeatable_days',
                'status',
                'type',
            )
            ->orderBy('start_time', 'ASC')
            ->get();
    }
    // Teacher timetable
    public function getTeacherTimeTableActiveAll($type = 'Morning', $schoolId = null, $academicYearId = null)
    {
        return Timetable::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereHas('subject.classroomSubjects', function ($query) {
                $query->whereRaw('subject_id = timetables.subject_id');
            })
            ->when(!empty($type), function ($query) use ($type) {
                $query->where('shift_type', $type);
            })
            ->with(['classroom', 'subject.classroomSubjects' => function ($query) {
                $query->select(
                    'id',
                    'classroom_id',
                    'subject_id',
                    'teachers_data'
                );
            }])
            ->where(function ($query) {
                $query->where(function ($q) {
                    $q->whereDate('start_date', '<=', now())
                        ->whereDate('repeat_date', '>=', now());
                })
                    ->orWhere(function ($q) {
                        $q->whereNull('repeat_date')
                            ->whereDate('start_date', '=', now());
                    });
            })
            ->select(
                'id',
                'classroom_id',
                'subject_id',
                'start_date',
                'start_time',
                'end_time',
                'shift_type',
                'repeat_date',
                'repeatable_days',
                'status',
                'type',
            )
            ->orderBy('start_time', 'ASC')
            ->get();
    }

    public function getActiveNameAndIdByClassRoomIds(array $ids, $schoolId = null, $academicYearId = null)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereIn('id', $ids)
            ->select('id', 'title')
            ->get();
    }

    public function getClassTeacherByClassRoomId(int $classroomId, $schoolId = null, $academicYearId = null)
    {
        return Classroom::with('classTeacher')
            ->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('id', $classroomId)
            ->select('class_teacher_id')
            ->first();
    }
}
