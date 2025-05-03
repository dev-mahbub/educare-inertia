<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\LessonPlan;
use App\Models\LessonPlanRemark;
use App\Models\LessonPlanTeacher;
use App\Models\LessonPlanClassroom;

class LessonPlanRepository implements IRepository, ILessonPlanRepository
{
    public function getAll()
    {
        return LessonPlan::all()->latest()->get();
    }

    public function getById($id)
    {
        return LessonPlan::findOrFail($id);
    }

    public function delete($id)
    {
        LessonPlan::destroy($id);
    }

    public function create(array $arrayData)
    {
        return LessonPlan::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return LessonPlan::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return LessonPlan::with('subject', 'className')->where('status', Status::ACTIVE)->latest()->get();
    }

    public function getRegisterAll()
    {
        return LessonPlan::where('status', Status::ACTIVE)->latest()->get();
    }

    public function createLessonPlanClassroom(array $dataArray)
    {
        LessonPlanClassroom::create($dataArray);
    }

    public function updateOrCreateLessonPlanClassroom(array $attributesToCheck, array $valuesToCheck)
    {
        LessonPlanClassroom::updateOrCreate($attributesToCheck, $valuesToCheck);
    }

    public function deleteLessonPlanClassrooms(array $classroomIds)
    {
        LessonPlanClassroom::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('classroom_id', $classroomIds)
            ->delete();
    }

    public function createLessonPlanTeacher(array $dataArray)
    {
        LessonPlanTeacher::create($dataArray);
    }

    public function updateOrCreateLessonPlanTeacher(array $attributesToCheck, array $valuesToCheck)
    {
        LessonPlanTeacher::updateOrCreate($attributesToCheck, $valuesToCheck);
    }

    public function deleteLessonPlanTeachers(array $teacherIds)
    {
        LessonPlanTeacher::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('teacher_id', $teacherIds)
            ->delete();
    }

    public function getLessonPlanById(int $id)
    {
        return LessonPlan::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->with(['lessonPlanClassrooms', 'lessonPlanTeachers', 'files'])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'teacher_id',
                'title',
                'lesson_topic',
                'description',
                'start_date_at',
                'end_date_at',
                'methodology',
                'is_notification_teacher',
                'is_mail_teacher',
                'created_at',
            )
            ->first();
    }

    public function createLessonPlanRemark(array $dataArray)
    {
        return LessonPlanRemark::create($dataArray);
    }

    public function getActiveAllByTeacher(int $teacherId, int $classroomId = null, int $subjectId = null, string $startDate = "", string $endDate = "")
    {
        return LessonPlan::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('teacher_id', $teacherId)
            ->where(function ($query) use ($classroomId, $subjectId, $startDate, $endDate) {
                if (!empty($classroomId)) {
                    $query->whereHas('lessonPlanClassrooms', function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    });
                }

                if (!empty($subjectId)) {
                    $query->where('subject_id', $subjectId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_date_at', '<=', $endDate);
                }
            })
            ->with(['subject', 'className', 'classrooms'])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'teacher_id',
                'title',
                'lesson_topic',
                'description',
                'start_date_at',
                'end_date_at',
                'methodology',
                'is_notification_teacher',
                'is_mail_teacher',
                'created_at',
            )
            ->get();
    }

    public function getActiveAllLessonPlans(int $classroomId = null, int $subjectId = null, string $startDate = "", string $endDate = "")
    {
        return LessonPlan::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) use ($classroomId, $subjectId, $startDate, $endDate) {
                if (!empty($classroomId)) {
                    $query->whereHas('lessonPlanClassrooms', function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    });
                }

                if (!empty($subjectId)) {
                    $query->where('subject_id', $subjectId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_date_at', '<=', $endDate);
                }
            })
            ->with(['subject', 'className', 'classrooms', 'teacher'])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'teacher_id',
                'title',
                'lesson_topic',
                'description',
                'start_date_at',
                'end_date_at',
                'methodology',
                'is_notification_teacher',
                'is_mail_teacher',
                'created_at',
            )
            ->get();
    }

    public function getShareByOtherLessonPlanByTeacher(int $teacherId)
    {
        return LessonPlan::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('teacher_id', '!=', $teacherId)
            ->whereHas('lessonPlanTeachers', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })
            ->with(['subject', 'className', 'classrooms', 'teacher'])
            ->select(
                'id',
                'class_name_id',
                'subject_id',
                'teacher_id',
                'title',
                'lesson_topic',
                'description',
                'start_date_at',
                'end_date_at',
                'methodology',
                'is_notification_teacher',
                'is_mail_teacher',
                'created_at',
            )
            ->get();
    }

    public function getTeacherWiseLessonPlanReport(int $teacherId = null, string $startDate = "", string $endDate = "")
    {
        return LessonPlan::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) use ($teacherId, $startDate, $endDate) {
                if (!empty($teacherId)) {
                    $query->where('teacher_id', $teacherId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_date_at', '<=', $endDate);
                }
            })
            ->with(['lessonPlanClassrooms'])
            ->select(
                'id',
                'subject_id',
                'teacher_id',
                'title',
                'lesson_topic',
                'description',
                'start_date_at',
                'end_date_at',
            )
            ->get();
    }

    public function getClassWiseLessonPlanReport(int $classroomId, int $teacherId = null, string $startDate = "", string $endDate = "")
    {
        return LessonPlan::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) use ($teacherId, $classroomId, $startDate, $endDate) {
                if (!empty($teacherId)) {
                    $query->where('teacher_id', $teacherId);
                }

                if (!empty($classroomId)) {
                    $query->whereHas('lessonPlanClassrooms', function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    });
                }

                if (!empty($startDate)) {
                    $query->whereDate('start_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('end_date_at', '<=', $endDate);
                }
            })
            ->with(['teacher'])
            ->select(
                'id',
                'subject_id',
                'teacher_id',
                'title',
                'lesson_topic',
                'description',
                'start_date_at',
                'end_date_at',
            )
            ->get();
    }
}
