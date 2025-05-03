<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomSubject;
use App\Models\ExamRoaster;
use App\Models\School;

class ExamRoasterRepository implements IRepository, IExamRoasterRepository
{
    public function getAll()
    {
        return ExamRoaster::all();
    }

    public function getById($id)
    {
        return ExamRoaster::findOrFail($id);
    }

    public function delete($id)
    {
        return ExamRoaster::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ExamRoaster::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ExamRoaster::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ExamRoaster::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return ExamRoaster::where('status', Status::ACTIVE);
    }

    public function updateOrCreate($attributesToCheck, $valuesToUpdate)
    {
        return ExamRoaster::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getFullMinMarkBySubjectId($subject_id, int $classroomId = null, $examId = null)
    {
        return ExamRoaster::where('status', Status::ACTIVE->value)
            ->with(
                [
                    'classroom_subject' => function ($query) {
                        $query->select('id', 'subject_id');
                    },
                    'classroom_subject.subject' => function ($query) {
                        $query->select('id', 'is_co_scholastic');
                    }
                ]
            )
            ->whereHas('classroom_subject', function ($query) use ($subject_id, $classroomId) {
                $query->where('subject_id', $subject_id);

                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomId);
                }
            })
            ->where('exam_id', $examId)
            ->select('id', 'full_mark', 'pass_mark', 'classroom_subject_id')
            ->first();
    }

    public function apiFullMinMarkBySubjectId($subject_id, int $classroomId = null, $examId = null, $schoolId = null, $academicYearId = null)
    {
        return ExamRoaster::where('status', Status::ACTIVE->value)
            ->with(
                [
                    'classroomSubjectRaw' => function ($query) use($schoolId, $academicYearId) {
                        $query->select('id', 'subject_id');
                        $query->where('school_id', $schoolId);
                        $query->where('academic_year_id', $academicYearId);
                    },
                    'classroomSubjectRaw.subject' => function ($query) {
                        $query->select('id', 'is_co_scholastic');
                    }
                ]
            )
            ->whereHas('classroomSubjectRaw', function ($query) use ($subject_id, $classroomId, $schoolId, $academicYearId) {
                $query->where('subject_id', $subject_id)
                    ->where('school_id', $schoolId)
                    ->where('academic_year_id', $academicYearId);

                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomId);
                }
            })
            ->where('exam_id', $examId)
            ->select('id', 'full_mark', 'pass_mark', 'classroom_subject_id')
            ->first();
    }

    public function getFullMinMarkBySubjectIdOld($subject_id)
    {
        return ExamRoaster::where('status', Status::ACTIVE->value)
            ->with(
                [
                    'classroom_subject' => function ($query) {
                        $query->select('id', 'subject_id');
                    },
                    'classroom_subject.subject' => function ($query) {
                        $query->select('id', 'is_co_scholastic');
                    }
                ]
            )
            ->whereHas('classroom_subject', function ($query) use ($subject_id) {
                $query->where('subject_id', $subject_id);
            })
            ->select('id', 'full_mark', 'pass_mark', 'classroom_subject_id')
            ->first();
    }

    // ClassroomSubject
    public function getExamIDAndClassroomIds($examId, array $classroomIds)
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.academic_year_id', getAcademicYearId())
            ->whereIn('classroom_subjects.classroom_id', $classroomIds)
            ->rightJoin('subjects', 'classroom_subjects.subject_id', '=', 'subjects.id')
            ->rightJoin('classrooms', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            ->leftJoin('exam_roasters', function ($join) use ($examId) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->where('exam_roasters.exam_id', $examId)
                    ->orWhere('exam_roasters.exam_id', null);
            })
            ->select(
                'exam_roasters.id',
                'exam_roasters.exam_id',
                'classroom_subjects.subject_id',
                'classroom_subjects.id as classroom_subject_id',
                'classroom_subjects.is_marking as is_marking',
                'subjects.title as subject_title',
                'classrooms.id as classroom_id',
                'classrooms.section_title as classroom_section_title',
                'exam_roasters.full_mark as full_mark',
                'exam_roasters.pass_mark as pass_mark',
                'exam_roasters.converted_mark as converted_mark',
            )
            ->get();
    }

    public function getExamIDAndClassroomWiseSubject($classroomIds)
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.academic_year_id', getAcademicYearId())
            ->whereIn('classroom_subjects.classroom_id', $classroomIds)
            ->rightJoin('subjects', 'classroom_subjects.subject_id', '=', 'subjects.id')
            ->leftJoin('exam_roasters', 'classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
            ->select(
                'exam_roasters.id',
                'exam_roasters.exam_id',
                'classroom_subjects.subject_id',
                'subjects.title as subject_title',
                'classroom_subjects.id as classroom_subject_id',
                'exam_roasters.full_mark as full_mark',
                'exam_roasters.pass_mark as pass_mark',
                'exam_roasters.converted_mark as converted_mark',
            )
            ->get();
    }

    public function getClassroomExamRoasterData($classroomIds, $examId)
    {
        return ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.academic_year_id', getAcademicYearId())
            ->where('classroom_subjects.is_marking', true)
            ->whereIn('classroom_subjects.classroom_id', $classroomIds)
            ->rightJoin('subjects', 'classroom_subjects.subject_id', '=', 'subjects.id')
            ->leftJoin('exam_roasters', function ($join) use ($examId) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->where('exam_roasters.exam_id', $examId)
                    ->orWhere('exam_roasters.exam_id', null);
            })
            ->select(
                'exam_roasters.id',
                'exam_roasters.exam_id',
                'exam_roasters.full_mark as full_mark',
                'exam_roasters.pass_mark as pass_mark',
                'exam_roasters.converted_mark as converted_mark',
                'subjects.title as subject_title',
                'classroom_subjects.subject_id',
                'classroom_subjects.classroom_id',
                'classroom_subjects.id as classroom_subject_id',
            )
            ->get();
    }

    public function getFilteredExamRoasters(int $classroomId, int $subjectId, int $examId = null)
    {
        return ExamRoaster::where('status', Status::ACTIVE->value)
            ->whereHas('classroom_subject', function ($query) use ($classroomId, $subjectId) {
                $query->where('classroom_id', $classroomId)
                    ->where('subject_id', $subjectId);
            })
            ->where(function ($query) use ($examId) {
                if (!empty($examId)) {
                    $query->where('exam_id', $examId);
                }
            })
            ->select(
                'id',
                'full_mark',
                'classroom_subject_id'
            )
            ->get();
    }
}
