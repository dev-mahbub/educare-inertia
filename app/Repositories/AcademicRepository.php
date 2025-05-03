<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentRank;
use App\Models\AcademicYear;
use App\Models\AcademicGrade;
use App\Models\AcademicRemark;
use App\Models\AcademicGradeItem;

class AcademicRepository implements IRepository, IAcademicRepository
{
    public function getAll()
    {
        return AcademicYear::all();
    }

    public function getById($id)
    {
        return AcademicYear::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return AcademicYear::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        AcademicYear::destroy($id);
    }

    public function create(array $arrayData)
    {
        return AcademicYear::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return AcademicYear::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return AcademicYear::where('status', Status::ACTIVE);
    }

    public function getActiveSessionAndId()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'academic_session')
            ->get();
    }

    //academic grade
    public function getAllGrade()
    {
        return AcademicGrade::where(
            [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ]
        )->get();
    }

    public function getGradeById($id)
    {
        return AcademicGrade::findOrFail($id);
    }
    public function deleteGrade($id)
    {
        AcademicGrade::destroy($id);
    }

    public function createGrade(array $arrayData)
    {
        return AcademicGrade::create($arrayData);
    }

    public function updateOrCreateGrade(array $checkedArray, array $arrayData)
    {
        return AcademicGrade::updateOrCreate($checkedArray, $arrayData);
    }

    public function updateGrade($id, array $arrayData)
    {
        return AcademicGrade::whereId($id)->update($arrayData);
    }

    public function getActiveAllGrade()
    {
        return AcademicGrade::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['academicGradeItems'])
            ->get();
    }

    public function getAcademicGradeById(int $id)
    {
        return AcademicGrade::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->with(['academicGradeItems'])
            ->first();
    }

    public function getActiveAllGradeNameId()
    {
        return AcademicGrade::where('status', Status::ACTIVE)
            ->where('school_id',  getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'scale_name')
            ->get();
    }

    public function getRegisterAllGrade()
    {
        return AcademicGrade::where('status', Status::ACTIVE);
    }

    public function getGradeOne($subjectId = null, $classroomId = null, $schoolId = null, $academicYearId = null)
    {
        return AcademicGrade::where(
            [
                'status' => Status::ACTIVE->value,
                'school_id' => ($schoolId != null) ? $schoolId : getUserSchoolId(),
                'academic_year_id' => ($academicYearId != null) ? $academicYearId : getAcademicYearId(),
            ]
        )
            ->where(function ($query) use ($subjectId, $classroomId) {
                if (!empty($subjectId) || !empty($classroomId)) {
                    $query->whereHas('classroomSubjects', function ($query) use ($subjectId, $classroomId) {
                        if (!empty($subjectId)) {
                            $query->where('subject_id', $subjectId);
                        }

                        if (!empty($classroomId)) {
                            $query->where('classroom_id', $classroomId);
                        }
                    });
                }
            })->with(
                [
                    'academicGradeItems' => function ($query) {
                        $query->select('id', 'academic_grade_id', 'title', 'min_mark', 'max_mark');
                    },
                    'academicGradeItemsRaw' => function ($query) use($schoolId, $academicYearId) {
                        $query->where('school_id', $schoolId)
                            ->where('academic_year_id', $academicYearId)
                            ->select('id', 'academic_grade_id', 'title', 'min_mark', 'max_mark');
                    }
                ]
            )
            ->select('id', 'scale_name')
            ->first();
    }

    public function getGradeOneTitleId()
    {
        return AcademicGrade::where(
            [
                'status' => Status::ACTIVE->value,
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ]
        )
            ->select('id', 'scale_name')
            ->first();
    }

    public function getOpeningGradeById($id)
    {
        return AcademicGrade::where('id', '=', $id)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'is_opening_grade_name', 'scale_name')
            ->first();
    }


    //academic grade item
    public function getAllGradeItem()
    {
        return AcademicGradeItem::all();
    }

    public function getGradeItemById($id)
    {
        return AcademicGradeItem::findOrFail($id);
    }
    public function deleteGradeItem($id)
    {
        return AcademicGradeItem::destroy($id);
    }

    public function createGradeItem(array $arrayData)
    {
        return AcademicGradeItem::create($arrayData);
    }

    public function updateOrCreateGradeItem(array $checkedArray, array $arrayData)
    {
        return AcademicGradeItem::updateOrCreate($checkedArray, $arrayData);
    }

    public function updateGradeItem($id, array $arrayData)
    {
        return AcademicGradeItem::whereId($id)->update($arrayData);
    }

    public function getActiveAllGradeItem()
    {
        return AcademicGradeItem::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getRegisterAllGradeItem()
    {
        return AcademicGradeItem::where('status', Status::ACTIVE);
    }

    public function getAcademicGradeItemByIdAndAcademicGradeId(int $id, int $academicGradeId)
    {
        return AcademicGradeItem::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->where('academic_grade_id', $academicGradeId)
            ->first();
    }


    public function getAcademicGradeScale()
    {
        return AcademicGrade::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['academicGradeItems' => function ($query) {
                $query->select(
                    'id',
                    'academic_grade_id',
                    'title',
                    'min_mark',
                    'max_mark'
                );
            }])
            ->select(
                'id',
                'scale_name'
            )
            ->first();
    }

    public function getAcademicGradeScaleByTitle(string $title)
    {
        return AcademicGrade::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('scale_name', $title)
            ->with(['academicGradeItems' => function ($query) {
                $query->select(
                    'id',
                    'academic_grade_id',
                    'title',
                    'min_mark',
                    'max_mark'
                );
            }])
            ->select(
                'id',
                'scale_name'
            )
            ->first();
    }


    public function updateOrCreateStudentRank($attributesToCheck, $valuesToUpdate)
    {
        return StudentRank::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }
}
