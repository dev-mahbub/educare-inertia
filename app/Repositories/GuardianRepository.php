<?php

namespace App\Repositories;

use App\Enums\GuardianType;
use App\Enums\Status;
use App\Models\EnquiryGuardian;
use App\Models\Guardian;
use App\Models\Student;

class GuardianRepository implements IRepository, IGuardianRepository
{
    public function getAll()
    {
        return Guardian::all();
    }

    public function getById($id)
    {
        return Guardian::findOrFail($id);
    }

    public function delete($id)
    {
        Guardian::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Guardian::create($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return Guardian::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function update($id, array $arrayData)
    {
        return Guardian::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Guardian::where('guardians.status', Status::ACTIVE)
            ->join('students', 'students.id', 'guardians.student_id')
            ->where('guardians.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllGuardians()
    {
        return Guardian::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('guardian_type', GuardianType::GUARDIAN)
            ->whereHas('student', function ($query) {
                $query->whereHas('classroomPromotedStudents', function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                });
            })
            ->with(['student' => function ($query) {
                $query->where(function ($query) {
                    $query->whereHas('classroomPromotedStudents', function ($query) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId());
                    });
                })->with([
                    'classroom:id,title',
                    'promotedClassroom',
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name,email,phone'
                ])->select(
                    'id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                );
            }])
            ->select(
                'id',
                'student_id',
                'user_id',
                'guardian_type',
                'phone',
                'first_name',
                'middle_name',
                'last_name',
                'email',
                'guardianid',
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return Guardian::where('status', Status::ACTIVE)
            ->join('students', 'students.id', 'guardians.student_id')
            ->where('guardians.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getByStudentId($id)
    {
        return Guardian::where('student_id', $id)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getByGuardianId($id)
    {
        return Guardian::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    public function getParentByStudentId($id)
    {
        return Guardian::where('guardian_type', '=', GuardianType::FATHER)
            ->where('school_id', getUserSchoolId())
            ->where('student_id', $id)
            ->first();
    }

    public function getParentByIds(array $ids)
    {
        return Guardian::where('school_id', getUserSchoolId())
            ->where('guardian_type', GuardianType::FATHER)
            ->whereIn('id', $ids)
            ->select(
                'id',
                'student_id',
                'first_name',
                'middle_name',
                'last_name',
                'income_per_year',
                'phone',
                'city'
            )
            ->with(['student' => function ($query) {
                $query->select(
                    'id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                );
            }])
            ->get();
    }

    public function getParentByIncomeRange($range)
    {
        return Guardian::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('guardian_type', GuardianType::FATHER)
            ->whereRaw('CAST(income_per_year AS UNSIGNED) > ?', [0])
            ->whereRaw('CAST(income_per_year AS UNSIGNED) <= ?', [$range])
            // ->where('income_per_year', '<=', $range)
            ->select(
                'id',
                'income_per_year'
            )
            ->get();
    }

    public function getParentByIncomeRangeOld($range)
    {
        $guardians = Guardian::where('school_id', getUserSchoolId())
            ->where('guardian_type', GuardianType::FATHER)
            ->where('income_per_year', '<=', $range)
            ->get(['id', 'first_name', 'income_per_year'])
            ->toArray();

        return $guardians;
    }

    public function getStudentFatherInfo()
    {
        return Guardian::where('guardians.status', '=', Status::ACTIVE)
            ->where('guardians.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('guardians.guardian_type', '=', GuardianType::FATHER)
            ->join('students', 'students.id', 'guardians.student_id')
            ->select(
                'guardians.id',
                'guardians.user_id',
                'guardians.student_id',
                'guardians.first_name',
                'guardians.middle_name',
                'guardians.last_name',
                'guardians.phone',
                'students.admission_no',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'guardians.first_name as father_first_name',
                'guardians.middle_name as father_middle_name',
                'guardians.last_name as father_last_name',
            )
            ->get();
    }

    public function getSiblingByFatherInfo($fatherName, $fatherEmail, $fatherPhone)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->join('guardians as father', function ($join) use ($fatherName, $fatherEmail, $fatherPhone) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER)
                    ->where('father.first_name', '=', $fatherName)
                    ->where('father.email', '=', $fatherEmail)
                    ->where('father.phone', '=', $fatherPhone);
            })
            ->select(
                'students.id',
                'students.admission_no',
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'students.first_name',
                'students.middle_name',
                'students.last_name'
            )
            ->get();
    }

    public function getGuardianData()
    {
        return Guardian::where('guardians.status', '=', Status::ACTIVE)
            ->where('guardians.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->join('students', 'students.id', 'guardians.student_id')
            ->select(
                'guardians.id',
                'guardians.user_id',
                'guardians.student_id',
                'guardians.first_name',
                'guardians.middle_name',
                'guardians.last_name',
                'guardians.guardian_type',
                'guardians.phone',
                'guardians.email',
            )
            ->get();
    }


    public function getPossibleSiblingByPhone($classroomId, $searchValue)
    {
        $query = Guardian::query();
        $query->where('guardians.status', Status::ACTIVE)
            ->where('guardians.school_id', getUserSchoolId())
            ->where('guardians.guardian_type', GuardianType::FATHER->value)
            ->leftJoin('students', 'students.id', '=', 'guardians.student_id')
            ->leftJoin('classroom_students', function ($join) {
                $join->on('classroom_students.student_id', '=', 'students.id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->leftJoin('classrooms', 'classrooms.id', '=', 'classroom_students.classroom_id')
            ->leftJoin('classroom_rolls', function ($join) {
                $join->on('classroom_rolls.student_id', '=', 'students.id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId());
            })
            ->where('classrooms.academic_year_id', '=', getAcademicYearId());

        $query->where(function ($subQuery) use ($classroomId, $searchValue) {
            if (!empty($searchValue)) {
                $subQuery->where(function ($innerSubQuery) use ($searchValue) {
                    $innerSubQuery->where('guardians.email', 'like', '%' . $searchValue . '%')
                        ->orWhere('guardians.phone', 'like', '%' . $searchValue . '%')
                        ->orWhere('guardians.first_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('guardians.middle_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('guardians.last_name', 'like', '%' . $searchValue . '%');
                });
            }
            if (!empty($classroomId)) {
                $subQuery->where('students.classroom_id', '=', $classroomId);
            }
        });

        $query->select(
            // student
            'students.id as guardian_id',
            'students.first_name as student_first_name',
            'students.middle_name as student_middle_name',
            'students.last_name as student_last_name',
            'students.admission_no',
            // classroom
            'classrooms.title as classroom_title',
            'classroom_rolls.roll_no as classroom_roll_no',
            // father
            'guardians.id as guardian_id',
            'guardians.first_name as father_first_name',
            'guardians.middle_name as father_middle_name',
            'guardians.last_name as father_last_name',
            'guardians.phone',
            'guardians.email',
        );

        return $query->get()
            ->groupBy('phone')
            ->map(function ($group) {
                return $group->toArray(); // Convert the group to an array
            })
            ->values();
    }



    public function createEnquiryGuardian(array $arrayData)
    {
        return EnquiryGuardian::create($arrayData);
    }

    public function updateEnquiryGuardian($id, array $arrayData)
    {
        return EnquiryGuardian::whereId($id)->update($arrayData);
    }


    public function getFatherByStudentId($studentId)
    {
        return Guardian::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('guardian_type', GuardianType::FATHER)
            ->where('student_id', $studentId)
            ->select(
                'id',
                'user_id',
                'student_id',
                'first_name',
                'middle_name',
                'last_name',
                'guardian_type',
                'phone',
                'email',
            )
            ->first();
    }

    public function getFatherByUserId(int $userId)
    {
        return Guardian::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('guardian_type', GuardianType::FATHER)
            ->where('user_id', $userId)
            ->select(
                'id',
                'user_id',
                'student_id',
                'first_name',
                'middle_name',
                'last_name',
                'guardian_type',
                'phone',
                'email',
                'highest_qualification',
                'occupation',
                'company_name',
                'department',
                'aadhar_card_no',
                'pan_card_no',
                'address',
                'city',
            )
            ->first();
    }
}
