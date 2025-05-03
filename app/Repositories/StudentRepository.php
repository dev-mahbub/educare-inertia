<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Mark;
use App\Enums\Gender;
use App\Enums\Status;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\Religion;
use App\Models\ClassName;
use App\Models\Classroom;
use App\Models\Transport;
use App\Enums\GuardianType;
use App\Models\StudentType;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use App\Models\AcademicYear;
use App\Models\UserActivity;
use App\Models\StudentSibling;
use App\Enums\FreezeMarkStatus;
use App\Models\ClassroomStudent;
use PhpParser\Node\Expr\FuncCall;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Models\StudentWalletTransaction;
use App\Models\StudentTransferCertificate;

class StudentRepository implements IRepository, IStudentRepository
{
    public function getAll()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Student::findOrFail($id);
    }

    public function getByStudentsForAbsent($absentStudentIds, $classroomId, $boarding)
    {
        $query = Student::query();
        $query->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereIn('id', $absentStudentIds)
            ->with(['classroomData', 'father', 'classroomRoll'])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_no',
                'classroom_id',
                'boarding_type',
            );
        $query->where(function ($q) use ($classroomId, $boarding) {
            if (!empty($boarding)) {
                $q->where('boarding_type', '=', $boarding);
            }
            if (!empty($classroomId)) {
                $q->where('classroom_id', '=', $classroomId);
            }
        });
        return $query->get();
    }

    public function getStudentForMonthReport($ids)
    {

        $query = Student::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['classroomRoll'])
            ->whereIn('id', $ids);
        $query->select(
            'id',
            'admission_no',
            'first_name',
            'middle_name',
            'last_name',
        );
        return $query->get();
    }

    public function getByAdmissionNo($admno)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('admission_no', $admno)
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with('classroomPromotedStudents')
            ->get();
    }

    public function getStudentData()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with([
                'classroomRoll' => function ($q) {
                    $q->where('classroom_rolls.academic_year_id', getAcademicYearId());
                },
                'promotedClassroom'
            ])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
                'admission_no',
                'boarding_type',
                'phone',
                'email',
            )
            ->get();
    }

    public function getStudentDataExceptThisIds($excludeIds, $classroomId = null)
    {
        if ($classroomId != null) {
            return Student::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                })
                ->whereNotIn('id', $excludeIds)
                ->with(['classroomRoll' => function ($q) use ($classroomId) {
                    $q->where('classroom_rolls.classroom_id', $classroomId);
                }])
                ->select(
                    'id',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                    'admission_no',
                    'boarding_type',
                    'phone',
                    'email',
                )
                ->get();
        } else {
            return Student::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->whereHas('classroomPromotedStudents', function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                })
                ->whereNotIn('id', $excludeIds)
                ->with(['classroomRoll' => function ($q) {
                    $q->where('classroom_rolls.academic_year_id', getAcademicYearId());
                }])
                ->select(
                    'id',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'classroom_id',
                    'admission_no',
                    'boarding_type',
                    'phone',
                    'email',
                )
                ->get();
        }
    }

    public function getStudentDataByStudentsIds($studentIds, $classroomId)
    {
        /* We getting data directly from id array ($studentIds), this below where condition will not use */
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $studentIds)
            ->with(['classroomRoll' => function ($q) use ($classroomId) {
                $q->where('classroom_rolls.classroom_id', $classroomId);
            }])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
                'admission_no',
                'boarding_type',
                'phone',
                'email',
            )
            ->get();
    }

    public function delete($id)
    {
        Student::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Student::create($arrayData);
    }

    public function getActiveListForAgeReport($selectedDate, $minAge, $maxAge)
    {
        // Calculate the birth date range based on the selected date
        $selectedDate = Carbon::parse($selectedDate);
        $endDate = $selectedDate->copy()->subYears($minAge)->format('Y-m-d');
        $startDate = $selectedDate->copy()->subYears($maxAge)->format('Y-m-d');

        // Retrieve active students within the age range

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereBetween('birth_date_at', [$startDate, $endDate])
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with([
                'classroom:id,title',
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
                'birth_date_at',
                'gender',
            )
            ->get();
    }

    public function getActiveListForDocument($classroomId)
    {
        $query = Student::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom',
                'father:id,student_id,first_name,middle_name,last_name'
            ]);

        $query->get([
            'id',
            'classroom_id',
            'first_name',
            'middle_name',
            'last_name',
            'admission_no',
            'birth_date_at',
            'document_attached',
        ]);

        return $query->get();
    }


    public function getActivePromotedReport($searchValue, $classroomId,  $startDate, $endDate)
    {
        $query = Student::query();
        // $query->where('academic_year_id', getAcademicYearId())
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('student_status', StudentStatus::PROMOTED->value)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
                if (!empty($classroomId)) {
                    $query->where('classroom_students.classroom_id', $classroomId);
                }
            })
            ->with(['classroomStudent.user', 'classroomData', 'promotedClassroom', 'previousClassroom', 'previousAcademicYear', 'father', 'classroomRoll' => function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            }])
            ->select(
                'id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_no',
                'birth_date_at',
                'promoted_date_at',
                'promoted_by',
            );

        $query->where(function ($q) use ($searchValue, $classroomId,  $startDate, $endDate) {
            if (!empty($searchValue)) {
                $q->where(function ($q) use ($searchValue, $classroomId,  $startDate, $endDate) {
                    $q->where('first_name', 'like', '%' . $searchValue . '%');
                    $q->orWhere('middle_name', 'like', '%' . $searchValue . '%');
                    $q->orWhere('last_name', 'like', '%' . $searchValue . '%');
                    $q->orWhere('admission_no', 'like', '%' . $searchValue . '%');
                    $q->orWhere('admission_no', 'like', '%' . $searchValue . '%');

                    $q->orWhereHas('father', function ($sq) use ($searchValue) {
                        $sq->where('first_name', 'like', '%' . $searchValue . '%');
                        $sq->orWhere('middle_name', 'like', '%' . $searchValue . '%');
                        $sq->orWhere('last_name', 'like', '%' . $searchValue . '%');
                    });

                    $q->orWhereHas('classroomData', function ($sq) use ($searchValue) {
                        $sq->where('title', 'like', '%' . $searchValue . '%');
                    });

                    $q->orWhereHas('promotedClassroom', function ($sq) use ($searchValue) {
                        $sq->where('title', 'like', '%' . $searchValue . '%');
                    });

                    $q->orWhereHas('previousClassroom', function ($sq) use ($searchValue) {
                        $sq->where('title', 'like', '%' . $searchValue . '%');
                    });

                    $q->orWhereHas('classroomRoll', function ($sq) use ($searchValue) {
                        $sq->where('roll_no', 'like', '%' . $searchValue . '%')
                            ->where('academic_year_id', getAcademicYearId());
                    });
                });
            }

            if (!empty($startDate)) {
                $q->whereHas('classroomStudent', function ($query) use ($startDate) {
                    $query->whereDate('classroom_students.promoted_date_at', '>=', $startDate);
                });

                // $q->orWhereDate('promoted_date_at', '>=', $startDate);
            }

            if (!empty($endDate)) {
                $q->whereHas('classroomStudent', function ($query) use ($endDate) {
                    $query->whereDate('classroom_students.promoted_date_at', '<=', $endDate);
                });

                // $q->orWhereDate('promoted_date_at', '<=', $endDate);
            }

            // if (!empty($classroomId)) {
            //     $q->where('classroom_id', '=', $classroomId);
            // }
        });
        return $query->get();
    }

    public function update($id, array $arrayData)
    {
        return Student::whereId($id)->update($arrayData);
    }

    public function checkAdmNo($admNo)
    {
        return Student::where('admission_no', '=', $admNo)
            ->where('school_id', getUserSchoolId())
            ->first();
    }

    public function getNextAdmissionNo($schoolId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $setting = getSchoolSetting($schoolId);
        $lastStudent = Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->orderBy('id', 'DESC')
            ->first();

        if (!empty($lastStudent->admission_no)) {
            if (!empty($setting->admission_prefix)) {
                $lastAdnArray = @explode($setting->admission_prefix, $lastStudent->admission_no);
            }
            $adnNumberEntry = filter_var($lastStudent->admission_no, FILTER_SANITIZE_NUMBER_INT);
            if (!empty($lastAdnArray[1])) {
                $lastAdnArrayNumberOnly = filter_var($lastAdnArray[1], FILTER_SANITIZE_NUMBER_INT);
                $lastAdn = $lastAdnArrayNumberOnly + 1;
            } elseif (!empty($adnNumberEntry)) {
                $lastAdn = intval($adnNumberEntry) + 1;
            } else {
                $lastAdn = $setting->admission_seed + 1;
            }
            return trim($setting->admission_prefix) . $lastAdn;
        } else {
            return trim($setting->admission_prefix) . ++$setting->admission_seed;
        }
    }

    public function getRelationalObjById($id, $schoolId = null)
    {
        return Student::where('students.id', $id)
            ->with('guardians')
            ->where('students.status', Status::ACTIVE)
            ->where('students.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->leftJoin('classroom_students', 'classroom_students.student_id', '=', 'students.id')
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('student_houses', 'students.id', '=', 'student_houses.student_id')
            ->leftJoin('bank_accounts', 'bank_accounts.student_id', '=', 'students.id')
            ->leftJoin('student_categories', 'students.id', '=', 'student_categories.student_id')
            ->with(
                [
                    'classroomStudent',
                    'studentImage',
                    'student_father_profile_image',
                    'student_mother_profile_image',
                    'student_guardian_profile_image',
                    'updatedBy.user',
                    'createdBy.user',
                ]
            )
            ->select(
                'students.*',
                'classrooms.id as classroom_id',
                'student_houses.id as student_house_id',
                'student_houses.house_id',
                'student_categories.id as student_category_id',
                'student_categories.category_id',
                'bank_accounts.id as student_bank_account_id',
                'bank_accounts.bank_id',
                'bank_accounts.account_name',
                'bank_accounts.account_no',
                'bank_accounts.account_type',
                'bank_accounts.ifsc_code',
                'bank_accounts.micr_no',
                'bank_accounts.branch_name',
                'classroom_students.academic_year_id as classroom_student_year_id'
            )
            ->first();
    }


    public function getStudentDetailsData($id, $schoolId = null)
    {
        return Student::where('students.id', $id)
            ->with('guardians')
            ->where('students.status', Status::ACTIVE)
            ->where('students.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->leftJoin('classroom_students', 'classroom_students.student_id', '=', 'students.id')
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('student_houses', 'students.id', '=', 'student_houses.student_id')
            ->leftJoin('houses', 'houses.id', '=', 'student_houses.house_id')
            ->leftJoin('bank_accounts', 'bank_accounts.student_id', '=', 'students.id')
            ->leftJoin('banks', 'bank_accounts.bank_id', '=', 'banks.id')
            ->leftJoin('student_categories', 'students.id', '=', 'student_categories.student_id')
            ->leftJoin('categories', 'categories.id', '=', 'student_categories.category_id')
            ->leftJoin('religions', 'students.religion', '=', 'religions.id')
            ->with(
                [
                    'classroomStudent',
                    'studentImage',
                    'student_father_profile_image',
                    'student_mother_profile_image',
                    'student_guardian_profile_image',
                    'updatedBy.user',
                    'createdBy.user',
                ]
            )
            ->select(
                'students.*',
                'classrooms.title as classroom_title',
                'houses.name as house_name',
                'categories.title as category_title',
                'banks.name as bank_name',
                'bank_accounts.account_name',
                'bank_accounts.account_no',
                'bank_accounts.account_type',
                'bank_accounts.ifsc_code',
                'bank_accounts.micr_no',
                'bank_accounts.branch_name',
                'religions.name as religion_name',
            )
            ->first();
    }

    public function getActiveAll($classroomId = null, $boardingType = null, $studentSearch = null, $schoolId = null, $academicYearId = null)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $boardingType, $studentSearch, $academicYearId) {
                $query->where('classroom_students.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
                    //->where('classroom_students.classroom_id', $classroomId)
                    ->when($classroomId, function ($q) use ($classroomId) {
                        $q->where('classroom_students.classroom_id', $classroomId);
                    })
                    ->when($boardingType, function ($q) use ($boardingType) {
                        $q->where('students.boarding_type', 'like', '%' . $boardingType . '%');
                    })
                    ->when($studentSearch, function ($q) use ($studentSearch) {
                        $q->where('students.first_name', 'like', '%' . $studentSearch . '%')
                            ->orWhere('students.middle_name', 'like', '%' . $studentSearch . '%')
                            ->orWhere('students.last_name', 'like', '%' . $studentSearch . '%')
                            ->orWhere('students.admission_no', 'like', '%' . $studentSearch . '%');
                    });
            })
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value)
                    ->limit(1);
            })
            ->leftJoin('guardians as mother', function ($join) {
                $join->on('students.id', '=', 'mother.student_id')
                    ->where('mother.guardian_type', GuardianType::MOTHER->value)
                    ->limit(1);
            })
            ->with(['studentImage', 'promotedClassroom' => function ($q) {
                $q->select('classrooms.title', 'classrooms.id');
            }])
            ->with(['classroomRoll' => function ($query) use ($classroomId, $academicYearId) {
                $query->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());

                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomId);
                }
            }])
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.birth_date_at',
                'students.context',
                'students.notes',
                'students.student_status',
                // classroom
                'classrooms.title as classTitle',
                // father
                'father.user_id as fatherUserId',
                'father.first_name as fatherFirstName',
                'father.middle_name as fatherMiddleName',
                'father.last_name as fatherLastName',
                'father.sms_phone as smsPhone',
                'father.phone as fatherPhone',
                // mother
                'mother.first_name as motherFirstName',
                'mother.middle_name as motherMiddleName',
                'mother.last_name as motherLastName'
                // 'classroom_rolls.roll_no',
                // 'classroom_rolls.id as classroom_roll_id'
            )

            ->get();
    }

    public function getActiveAllBoarding($dateAt, $classroomId)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.boarding_type', '=', ScholarBoardingType::BOARDING)
            ->leftJoin('classroom_rolls', 'classroom_rolls.student_id', '=', 'students.id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            });
        $query->where(function ($q) use ($dateAt, $classroomId) {
            if (!empty($dateAt)) {
                $q->whereDate('students.created_at', '<=', $dateAt);
            }
            if (!empty($classroomId)) {
                $q->where('students.classroom_id', '=', $classroomId);
            }
        })
            ->select(
                // student
                'students.id',
                'students.admission_no',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                // roll
                'classroom_rolls.roll_no'
            );

        return $query->get();
    }

    // get student for updated
    public function getListForUpdated()
    {
        return Student::where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('student_categories', 'students.id', '=', 'student_categories.student_id')
            ->leftJoin('student_houses', 'students.id', '=', 'student_houses.student_id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->select(
                // student
                'students.id',
                'students.gender',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.aadhar_card_no',
                'students.birth_date_at',
                'students.admission_date_at',
                'students.remark',
                // category
                'student_categories.id as student_category_id',
                'student_categories.category_id',
                // house
                'student_houses.id as student_house_id',
                'student_houses.house_id',
                // father
                'father.id as student_father_id',
                'father.sms_phone as father_sms_phone',
                'father.phone as father_phone',
            )
            ->get();
    }


    // get student for updated by classroom id
    public function getListForUpdatedByClassroomId(int $classroomId, string $searchValue = "")
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->leftJoin('classroom_rolls', function ($join) use ($classroomId) {
                $join->on('students.id', '=', 'classroom_rolls.student_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classroomId);
            })
            ->leftJoin('student_categories', 'students.id', '=', 'student_categories.student_id')
            ->leftJoin('student_houses', function ($join) {
                $join->on('students.id', '=', 'student_houses.student_id')
                    ->where('student_houses.academic_year_id', getAcademicYearId());
            })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->where(function ($query) use ($classroomId, $searchValue) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                });
                if (!empty($searchValue)) {
                    $query->where(function ($subQuery) use ($searchValue) {
                        $subQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
                            ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                            ->orWhere('students.last_name', 'like', '%' . $searchValue . '%');
                    });
                }
            })

            ->select(
                // student
                'students.id',
                'students.admission_no',
                'students.gender',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.aadhar_card_no',
                'students.birth_date_at',
                'students.admission_date_at',
                'students.remark',
                // category
                'student_categories.id as student_category_id',
                'student_categories.category_id',
                // house
                'student_houses.id as student_house_id',
                'student_houses.house_id',
                // father
                'father.id as student_father_id',
                'father.sms_phone as father_sms_phone',
                'father.phone as father_phone',
                // classroom roll
                'classroom_rolls.roll_no'
            )
            ->get();
    }

    // get student for updated
    public function getListForChangeClass($classroomId, $searchValue)
    {
        $query = Student::query();
        $query->where('students.school_id', getUserSchoolId())
            // ->where('students.academic_year_id', getAcademicYearId())
            // ->leftJoin('classrooms', 'classrooms.id', '=', 'students.classroom_id')
            // ->where('classrooms.academic_year_id', '=', getAcademicYearId())
            ->where('students.status', Status::ACTIVE)
            ->where('is_class_change', '=', 0)
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
            );

        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
            $query->where('classroom_students.academic_year_id', getAcademicYearId())
                ->where('classroom_students.classroom_id', $classroomId);
        });

        if (!empty($searchValue)) {
            $query->where(function ($subQuery) use ($searchValue) {
                $subQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.first_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.middle_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.last_name', 'like', '%' . $searchValue . '%');
            });
        }

        return $query->get();
    }

    // get get inactive list
    public function getInactiveList($classroomId, $searchValue)
    {
        $query = Student::query();

        $query->where('students.school_id', getUserSchoolId())
            ->where('students.status', Status::INACTIVE)
            ->whereDoesntHave('studentTransferCertificate')
            ->where(function ($query) use ($searchValue, $classroomId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());

                    if (!empty($classroomId)) {
                        $query->where('classroom_students.classroom_id', $classroomId);
                    }
                });
                if (!empty($searchValue)) {
                    $query->where(function ($query) use ($searchValue, $classroomId) {
                        $query->where(function ($query)  use ($searchValue) {
                            $query->where('students.first_name', 'like', '%' . $searchValue . '%')
                                ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                                ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
                                ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%')
                                ->orWhere('students.reason', 'like', '%' . $searchValue . '%')
                                ->orWhere('students.status_date_at', 'like', '%' . $searchValue . '%');
                        })->orWhere(function ($query)  use ($searchValue, $classroomId) {
                            $query->whereHas('father', function ($query) use ($searchValue) {
                                $query->where('guardians.first_name', 'like', '%' . $searchValue . '%')
                                    ->orWhere('guardians.middle_name', 'like', '%' . $searchValue . '%')
                                    ->orWhere('guardians.last_name', 'like', '%' . $searchValue . '%')
                                    ->orWhere('guardians.phone', 'like', '%' . $searchValue . '%');
                            })->orWhereHas('classroom', function ($query) use ($searchValue) {
                                $query->where('classrooms.title', 'like', '%' . $searchValue . '%')
                                    ->where('classrooms.academic_year_id', getAcademicYearId());

                                if (!empty($classroomId)) {
                                    $query->where('classrooms.id', $classroomId);
                                }
                            })->orWhereHas('promotedClassroom', function ($query) use ($searchValue) {
                                $query->where('classrooms.title', 'like', '%' . $searchValue . '%')
                                    ->where('classrooms.academic_year_id', getAcademicYearId());

                                if (!empty($classroomId)) {
                                    $query->where('classrooms.id', $classroomId);
                                }
                            })->orWhereHas('classroomRoll', function ($query) use ($searchValue, $classroomId) {
                                $query->where('classroom_rolls.roll_no', 'like', '%' . $searchValue . '%')
                                    ->where('classroom_rolls.academic_year_id', getAcademicYearId());

                                if (!empty($classroomId)) {
                                    $query->where('classroom_rolls.classroom_id', $classroomId);
                                }
                            });
                        });
                    });
                }
            })
            ->with([
                'father' => function ($query) {
                    $query->select(
                        'guardians.id',
                        'guardians.student_id',
                        'guardians.guardian_type',
                        'guardians.first_name',
                        'guardians.middle_name',
                        'guardians.last_name',
                        'guardians.phone'
                    );
                },
                'classroom' => function ($query) {
                    $query->select(
                        'classrooms.id',
                        'classrooms.title'
                    );
                },
                'promotedClassroom',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_rolls.academic_year_id', getAcademicYearId());

                    if (!empty($classroomId)) {
                        $query->where('classroom_rolls.classroom_id', $classroomId);
                    }

                    $query->select(
                        'id',
                        'student_id',
                        'classroom_id',
                        'roll_no',
                    );
                },
            ])
            ->select(
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.status_date_at',
                'students.reason'
            );

        return $query->get();
    }

    // get student for search
    public function getListForSearch($session, $admissionNumber, $studentName, $fatherName, $fatherNumber, $motherName)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($session, $admissionNumber, $studentName) {
                $query->when($session == null, function ($q) use ($session) {
                    $q->where('classroom_students.academic_year_id', getAcademicYearId());
                });
                $query->when($admissionNumber, function ($q) use ($admissionNumber) {
                    $q->where('students.admission_no', $admissionNumber);
                });
                $query->when($studentName, function ($q) use ($studentName) {
                    $q->where(function ($sq) use ($studentName) {
                        $sq->orWhere('students.first_name', 'like', '%' . $studentName . '%')
                            ->orWhere('students.middle_name', 'like', '%' . $studentName . '%')
                            ->orWhere('students.last_name', 'like', '%' . $studentName . '%');
                    });
                });
            })
            ->leftJoin('classroom_students', function ($join) use ($session) {
                $join->on('classroom_students.student_id', '=', 'students.id')
                    ->when($session == null, function ($q) {
                        $q->where('classroom_students.academic_year_id', getAcademicYearId());
                    });
            })
            ->leftJoin('classrooms', 'classrooms.id', '=', 'classroom_students.classroom_id')
            ->leftJoin('academic_years', 'classrooms.academic_year_id', '=', 'academic_years.id')
            // ->leftJoin('classroom_rolls', function ($join) use ($session) {
            //     $join->on('classroom_rolls.student_id', '=', 'students.id')
            //         ->where('classroom_rolls.classroom_id', '=', 'classroom_students.classroom_id')
            //         ->when($session == null, function ($q) {
            //             $q->where('classroom_rolls.academic_year_id', getAcademicYearId());
            //         });
            // })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->leftJoin('guardians as mother', function ($join) {
                $join->on('students.id', '=', 'mother.student_id')
                    ->where('mother.guardian_type', GuardianType::MOTHER);
            });

        $query->where(function ($subQuery) use ($fatherName, $fatherNumber, $motherName) {
            $subQuery->when($fatherName, function ($q) use ($fatherName) {
                $q->where(function ($sq) use ($fatherName) {
                    $sq->orWhere('father.first_name', 'like', '%' . $fatherName . '%')
                        ->orWhere('father.middle_name', 'like', '%' . $fatherName . '%')
                        ->orWhere('father.last_name', 'like', '%' . $fatherName . '%');
                });
            });
            $subQuery->when($fatherNumber, function ($q) use ($fatherNumber) {
                $q->where('father.phone', $fatherNumber);
            });
            $subQuery->when($motherName, function ($q) use ($motherName) {
                $q->where(function ($sq) use ($motherName) {
                    $sq->orWhere('mother.first_name', 'like', '%' . $motherName . '%')
                        ->orWhere('mother.middle_name', 'like', '%' . $motherName . '%')
                        ->orWhere('mother.last_name', 'like', '%' . $motherName . '%');
                });
            });
            // ... Add similar conditions for other parameters if needed
        })->with([
            'academicYear',
            // 'promotedAcademicYear' => function ($q) {
            //     $q->select('academic_years.academic_session', 'academic_years.id');
            // }
        ])->distinct()
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.status',
                'students.student_status',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_phone',
                // mother
                'mother.first_name as mother_first_name',
                'mother.middle_name as mother_middle_name',
                'mother.last_name as mother_last_name',
                'mother.phone as mother_phone',
                // classroom
                'classrooms.title as classroom_title',
                'academic_years.academic_session',
                // 'classroom_rolls.roll_no',
                'classroom_students.academic_year_id',

            );

        return $query->get();
    }

    // get student for search
    public function getListForSearchOld($session, $admissionNumber, $studentName, $fatherName, $fatherNumber, $motherName)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($session, $admissionNumber, $studentName) {
                $query->when($session == null, function ($q) use ($session) {
                    $q->where('classroom_students.academic_year_id', getAcademicYearId());
                });
                $query->when($admissionNumber, function ($q) use ($admissionNumber) {
                    $q->where('students.admission_no', $admissionNumber);
                });
                $query->when($studentName, function ($q) use ($studentName) {
                    $q->where(function ($sq) use ($studentName) {
                        $sq->orWhere('students.first_name', 'like', '%' . $studentName . '%')
                            ->orWhere('students.middle_name', 'like', '%' . $studentName . '%')
                            ->orWhere('students.last_name', 'like', '%' . $studentName . '%');
                    });
                });
            })
            ->leftJoin('classrooms', 'classrooms.id', '=', 'students.classroom_id')
            ->leftJoin('academic_years', 'classrooms.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('classroom_rolls', 'classroom_rolls.student_id', '=', 'students.id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->leftJoin('guardians as mother', function ($join) {
                $join->on('students.id', '=', 'mother.student_id')
                    ->where('mother.guardian_type', GuardianType::MOTHER);
            });

        $query->where(function ($subQuery) use ($fatherName, $fatherNumber, $motherName) {
            $subQuery->when($fatherName, function ($q) use ($fatherName) {
                $q->where(function ($sq) use ($fatherName) {
                    $sq->orWhere('father.first_name', 'like', '%' . $fatherName . '%')
                        ->orWhere('father.middle_name', 'like', '%' . $fatherName . '%')
                        ->orWhere('father.last_name', 'like', '%' . $fatherName . '%');
                });
            });
            $subQuery->when($fatherNumber, function ($q) use ($fatherNumber) {
                $q->where('father.phone', $fatherNumber);
            });
            $subQuery->when($motherName, function ($q) use ($motherName) {
                $q->where(function ($sq) use ($motherName) {
                    $sq->orWhere('mother.first_name', 'like', '%' . $motherName . '%')
                        ->orWhere('mother.middle_name', 'like', '%' . $motherName . '%')
                        ->orWhere('mother.last_name', 'like', '%' . $motherName . '%');
                });
            });
            // ... Add similar conditions for other parameters if needed
        })
            ->with(['promotedAcademicYear' => function ($q) {
                $q->select('academic_years.academic_session', 'academic_years.id');
            }])
            ->distinct()
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.status',
                'students.student_status',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_phone',
                // mother
                'mother.first_name as mother_first_name',
                'mother.middle_name as mother_middle_name',
                'mother.last_name as mother_last_name',
                'mother.phone as mother_phone',
                // classroom
                'classrooms.title as classroom_title',
                'academic_years.academic_session',
                'classroom_rolls.roll_no',

            );


        return $query->get();
    }

    // get student for summery
    public function getListForSummery($classNameId, $classroomId, $searchValue, $type)
    {
        $query = Student::query();

        $query->where('students.school_id', getUserSchoolId())
            ->where(function ($subQuery) use ($classroomId, $searchValue, $classNameId) {
                if (!empty($searchValue)) {
                    $subQuery->where(function ($innerSubQuery) use ($searchValue) {
                        $innerSubQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
                            ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                            ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
                            ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%');
                    });

                    $subQuery->whereHas('father', function ($query) use ($searchValue) {
                        $query->where(function ($query) {
                            $query->where('guardians.guardian_type', GuardianType::FATHER);
                        })->where(function ($query) use ($searchValue) {
                            $query->where('guardians.first_name', 'like', '%' . $searchValue . '%')
                                ->orWhere('guardians.middle_name', 'like', '%' . $searchValue . '%')
                                ->orWhere('guardians.last_name', 'like', '%' . $searchValue . '%');
                        });
                    });
                }

                $subQuery->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $classNameId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                    if (!empty($classroomId)) {
                        $query->where('classroom_students.classroom_id', $classroomId);
                    }
                    if (!empty($classNameId)) {
                        $query->whereHas('classroom', function ($query) use ($classNameId) {
                            $query->where('classrooms.class_name_id', $classNameId);
                        });
                    }
                });
            });

        if (!empty($type)) {
            if (strtolower($type) == 'tc') {
                $query->whereHas('studentTransferCertificate')
                    ->where('students.status', $type);
            } else {
                $query->whereDoesntHave('studentTransferCertificate')
                    ->where('students.status', $type);
            }
        }

        $query->with([
            'studentTransferCertificate',
            'classroom:id,title,class_name_id',
            'promotedClassroom',
            // 'father',
            'father' => function ($query) use ($searchValue) {
                $query->where(function ($query) {
                    $query->where('guardians.guardian_type', GuardianType::FATHER);
                })->where(function ($query) use ($searchValue) {
                    $query->where('guardians.first_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('guardians.middle_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('guardians.last_name', 'like', '%' . $searchValue . '%');
                })->select(
                    'guardians.id',
                    'guardians.guardian_type',
                    'guardians.student_id',
                    'guardians.first_name',
                    'guardians.middle_name',
                    'guardians.last_name',
                    'guardians.phone',
                );
            }
        ])->select(
            'id',
            'classroom_id',
            'first_name',
            'middle_name',
            'last_name',
            'admission_no',
            'student_status',
            'status',
            'gender',
        );

        $students = $query->get();

        if ($students->count() > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student->classroom_id;

                $student->load(['classroomRoll' => function ($query) use ($classroomId) {
                    if (!empty($classroomId)) {
                        $query->where('classroom_id', $classroomId);
                    }
                }]);

                $studentName = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'id' => $student->id,
                    'name' => $studentName,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no ?? "",
                    'classroom_title' => $student?->classroom?->title ?? "",
                    'father_name' => $fatherName,
                    'father_mobile_no' => $student?->father?->phone ?? "",
                    'status' => strtolower($student?->status?->value),
                    'student_status' => $student?->student_status == StudentStatus::NEW->value ? 'N' : 'P',
                    'has_tc' => $student?->studentTransferCertificate != null,
                ];
            });
        }

        // Clone the query for counting male, female, and other students
        $maleCountQuery = clone $query;
        $femaleCountQuery = clone $query;
        $otherCountQuery = clone $query;
        $newStudentCountQuery = clone $query;
        $promotedStudentCountQuery = clone $query;

        $maleCount = $maleCountQuery->where('students.gender', Gender::MALE->value)->count();
        $femaleCount = $femaleCountQuery->where('students.gender', Gender::FEMALE->value)->count();
        $otherCount = $otherCountQuery->where('students.gender', Gender::COMMON->value)->count();
        $newStudentCount = $newStudentCountQuery->where('students.student_status', StudentStatus::NEW->value)->count();
        $promotedStudentCount = $promotedStudentCountQuery->whereIn('students.student_status', [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])->count();

        return [
            'students' => $students,
            'male_students' => $maleCount,
            'female_students' => $femaleCount,
            'other_students' => $otherCount,
            'new_students' => $newStudentCount,
            'promoted_students' => $promotedStudentCount,
        ];
    }

    // get student for updated
    public function getListForFee($classNameId = null, $searchValue = null)
    {
        $query = Student::query();
        $query->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('classrooms', 'classrooms.id', '=', 'students.classroom_id')
            ->where('classrooms.academic_year_id', '=', getAcademicYearId())
            ->where('is_class_change', '=', 0)
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                // 'students.roll_no',
                'father.phone as father_phone',
                'classrooms.title as classroom_title',
            );
        if ($classNameId) {
            $query->where('students.class_name_id', '=', $classNameId);
        }
        // if ($searchValue) {
        //     $query->where(function ($subQuery) use ($searchValue) {
        //         $subQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
        //             ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
        //             ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
        //             ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%')
        //             ->orWhere('father.first_name', 'like', '%' . $searchValue . '%')
        //             ->orWhere('father.middle_name', 'like', '%' . $searchValue . '%')
        //             ->orWhere('father.last_name', 'like', '%' . $searchValue . '%');
        //     });
        // }

        return $query->get();
    }


    // get student for updated
    public function getListForChangeClassSelected()
    {
        $query = Student::query();
        $query->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('is_class_change', '=', 1)
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.classroom_id',
            );

        return $query->get();
    }

    public function getActiveListForBiometric($classroomId = null, $searchValue = "")
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            // ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            });

        $query->where(function ($subQuery) use ($classroomId, $searchValue) {
            $subQuery->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            });
            if (!empty($searchValue)) {
                $subQuery->where(function ($innerSubQuery) use ($searchValue) {
                    $innerSubQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%')
                        ->orWhere('father.first_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('father.middle_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('father.last_name', 'like', '%' . $searchValue . '%');
                });
            }
        });

        $query->select(
            // student
            'students.id',
            'students.admission_no',
            'students.first_name',
            'students.middle_name',
            'students.last_name',
            'students.biometric_code',
            // father
            'father.id as student_father_id',
            'father.first_name as father_first_name',
            'father.middle_name as father_middle_name',
            'father.last_name as father_last_name',
        );

        return $query->get();
    }

    public function getListForUpgrade($academicYearId, $classroomId, $upgradeStudents)
    {
        $query = Student::query();
        $query->select(
            'id',
            'admission_no',
            'first_name',
            'middle_name',
            'last_name',
        )
            ->where(
                [
                    'status' => Status::ACTIVE->value,
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => $academicYearId,
                    'classroom_id' => $classroomId,
                    // 'student_status' => StudentStatus::PROMOTED->value, frist time say promoted, now say all
                ]
            )
            ->whereNotIn('id', $upgradeStudents)
            ->with(
                [
                    'father' => function ($fa) {
                        $fa->select('first_name', 'middle_name', 'last_name', 'student_id');
                    },
                ]
            );

        // classroom students for union
        $query2 = Student::query();
        $query2->select(
            'students.id',
            'students.admission_no',
            'students.first_name',
            'students.middle_name',
            'students.last_name',
        )
            ->where('students.status', Status::ACTIVE->value)
            ->where('students.school_id', getUserSchoolId())
            // ->where('students.student_status', StudentStatus::PROMOTED->value)  // 'student_status' => StudentStatus::PROMOTED->value, frist time say promoted, now say all
            ->where('classroom_students.academic_year_id', $academicYearId)
            ->where('classroom_students.classroom_id', $classroomId)
            ->whereNotIn('students.id', $upgradeStudents)
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->with(
                [
                    'father' => function ($fa) {
                        $fa->select('first_name', 'middle_name', 'last_name', 'student_id');
                    },
                ]
            );

        return $query->union($query2)->get();
    }

    public function getUpgradeStudents($targetAcademicYearId, $targetClassroomId)
    {
        $query = ClassroomStudent::query();
        $query->where(
            [
                'status' => Status::ACTIVE->value,
                'school_id' => getUserSchoolId(),
                'academic_year_id_from' => $targetAcademicYearId,
                'classroom_id_from' => $targetClassroomId,
            ]
        )->with(
            [
                'academicYear' => function ($fa) {
                    $fa->select('academic_session', 'id');
                },
                'student' => function ($fa) {
                    $fa->select('first_name', 'middle_name', 'last_name', 'admission_no', 'promoted_date_at', 'id');
                },
                'student.father' => function ($fa) {
                    $fa->select('first_name', 'middle_name', 'last_name', 'student_id');
                },
                'classroom' => function ($fa) {
                    $fa->select('title', 'id');
                },
            ]
        );
        return $query->get();
    }

    public function getListForClassroomStudent($targetAcademicYearId, $targetClassroomId)
    {
        $query = ClassroomStudent::query();
        $query->where(
            [
                'status' => Status::ACTIVE->value,
                'school_id' => getUserSchoolId(),
                'academic_year_id' => $targetAcademicYearId,
                'classroom_id' => $targetClassroomId,
            ]
        )->with(
            [
                'student' => function ($fa) {
                    $fa->select('first_name', 'middle_name', 'last_name', 'admission_no', 'promoted_date_at', 'id');
                },
                'student.father' => function ($fa) {
                    $fa->select('first_name', 'middle_name', 'last_name', 'student_id');
                },
                'user' => function ($fa) {
                    $fa->select('username', 'id');
                },
            ]
        );
        return $query->get();
    }

    // public function getListForClassroomStudent($targetAcademicYearId, $targetClassroomId)
    // {
    //     $query = ClassroomStudent::query();
    //     $query->where('classroom_students.status', Status::ACTIVE)
    //         ->where('classroom_students.school_id', getUserSchoolId())
    //         ->where('students.academic_year_id', getAcademicYearId())
    //         ->join('students', 'students.id', '=', 'classroom_students.student_id')
    //         ->leftJoin('students', 'students.id', '=', 'classroom_students.student_id')
    //         ->where('classroom_students.classroom_id', '=', $targetClassroomId)
    //         ->where('classroom_students.academic_year_id', '=', $targetAcademicYearId)
    //         ->leftJoin('guardians as father', function ($join) {
    //             $join->on('classroom_students.student_id', '=', 'father.student_id')
    //                 ->where('father.guardian_type', GuardianType::FATHER);
    //         });
    //     $query->select(
    //         // student
    //         'students.id',
    //         'students.admission_no',
    //         'students.first_name',
    //         'students.middle_name',
    //         'students.last_name',
    //         'classroom_students.id as classroom_student_id',
    //         'classroom_students.promoted_date_at',

    //         // father
    //         'father.id as student_father_id',
    //         'father.first_name as father_first_name',
    //         'father.middle_name as father_middle_name',
    //         'father.last_name as father_last_name',
    //     );

    //     return $query->get();
    // }

    public function getRegisterAll()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->latest()->get();
    }

    public function getActiveNameAndId(string $studentActiveStatus = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(empty($studentActiveStatus), function ($query) {
                $query->where('students.status', Status::ACTIVE);
            })
            ->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                $query->where('students.status', $studentActiveStatus);
            })
            ->with(['promotedClassroom'])
            ->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id')
            ->latest()
            ->get();
    }

    public function getSiblingById($id)
    {
        return Student::where('id', '=', $id)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'first_name', 'middle_name', 'last_name')->latest()->get();
    }

    public function getActiveNameAndIdWithoutSame($id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereNot('id', '=', $id)
            ->select('id', 'first_name', 'middle_name', 'last_name')->latest()->get();
    }

    public function getActiveNameAndIdByClassroomId($id)
    {
        return Student::where('classroom_id', '=', $id)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->latest()
            ->get();
    }

    public function getActiveDataByClassroomId($id)
    {
        return Student::where('classroom_id', '=', $id)
            ->where('academic_year_id', getAcademicYearId())
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'admission_no', 'classroom_id')
            ->latest()
            ->get();
    }

    public function getAllByClassroomId(int $classroomId, $schoolId = null, $academicYearId = null)
    {
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        return Student::where('status', Status::ACTIVE->value)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $schoolId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId)
                    ->where('classroom_students.school_id', $schoolId);
            })
            ->with([
                'father',
                'mother',
                'classroomRoll' => function ($q) use ($classroomId) {
                    $q->where('classroom_rolls.classroom_id', $classroomId);
                },
                'classroomRollRaw' => function ($q) use ($classroomId, $academicYearId) {
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
                'classroom_id',
                'admission_no',
                'boarding_type',
                'phone',
                'email',
            )
            ->get();
    }

    public function getAllStudents()
    {
        $students = Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with('classroom')
            ->select('id', 'first_name as title')
            ->latest()
            ->get();

        return $students;
    }

    public function getAllActiveStudents()
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
            );

        return $query->union($query2)->get();
    }

    // public function getActiveAll()
    // {
    //     return Student::where('status', Status::ACTIVE)
    //         ->where('school_id', getUserSchoolId())
    //         ->orderBy('first_name', 'ASC')
    //         ->select('id', 'first_name', 'middle_name', 'last_name')
    //         ->get();
    // }

    public function getStudentsByClassroomWise()
    {
        return Student::where('status', Status::ACTIVE->value)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with(['classroom'])
            ->select(
                'id',
                'first_name as title'
            )
            ->get();

        // $students = Student::where('status', Status::ACTIVE)
        //     ->where('school_id', getUserSchoolId())
        //     ->where('academic_year_id', getAcademicYearId())
        //     ->with('classroom')
        //     ->select('id', 'first_name as title')
        //     ->latest()
        //     ->get();
    }

    public function getCredentialList($classroomId = null, $boardingType = null, $studentSearch = null)
    {

        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $boardingType, $studentSearch) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    //->where('classroom_students.classroom_id', $classroomId)
                    ->when($classroomId, function ($q) use ($classroomId) {
                        $q->where('classroom_students.classroom_id', $classroomId);
                    })
                    ->when($boardingType, function ($q) use ($boardingType) {
                        $q->where('students.boarding_type', 'like', '%' . $boardingType . '%');
                    })
                    ->when($studentSearch, function ($q) use ($studentSearch) {
                        $q->where('students.first_name', 'like', '%' . $studentSearch . '%')
                            ->orWhere('students.middle_name', 'like', '%' . $studentSearch . '%')
                            ->orWhere('students.last_name', 'like', '%' . $studentSearch . '%')
                            ->orWhere('students.admission_no', 'like', '%' . $studentSearch . '%');
                    });
            })
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value)
                    ->limit(1);
            })
            ->with(['studentImage', 'promotedClassroom' => function ($q) {
                $q->select('classrooms.title', 'classrooms.id');
            }])
            ->with(['classroomRoll' => function ($query) use ($classroomId) {
                $query->where('academic_year_id', getAcademicYearId());

                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomId);
                }
            }])
            ->select(
                // Student
                'students.id',
                'students.user_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.birth_date_at',
                'students.student_status',
                // classroom
                'classrooms.title as class_name',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_phone',
                'father.user_id as father_user_id',
                // 'classroom_rolls.roll_no',
                // 'classroom_rolls.id as classroom_roll_id'
            )
            ->get();
    }


    public function getListForCertificate()
    {
        $students = Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                }
            ])
            ->select(
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.classroom_id',
                // 'classroom_rolls.roll_no',
            )
            ->get();

        if ($students->count() > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $student['roll_no'] = $student?->classroomRoll?->roll_no;

                return $student;
            });
        }

        return $students;
    }


    public function getStatusList($classroomId)
    {
        $query = Student::query()
            ->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
                if (!empty($classroomId)) {
                    $query->where('classroom_students.classroom_id', $classroomId);
                }
            })
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.student_status',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.status',
                'students.classroom_id',
                // classrooms
                // 'classrooms.id as classroom_id',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
            );

        return $query->get();
    }

    public function getStudentInfoCredent()
    {
        $students = Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select(
                'id',
                'user_id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_no',
                'birth_date_at',
            )
            ->get();
        return $students;
    }

    // get user id
    public function getUserId($id)
    {
        $studentUserIds = Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', '=', $id)
            //->where('classrooms.academic_year_id', getAcademicYearId())
            ->pluck('user_id')
            ->toArray();

        return $studentUserIds;
    }


    public function getStudentsByClassroomId_new($classroomId)
    {
        $academicYearId = getAcademicYearId();

        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->leftJoin('classroom_students', function ($join) use ($classroomId, $academicYearId) {
                $join->on('students.id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.classroom_id', '=', $classroomId)
                    ->where('classroom_students.academic_year_id', '=', $academicYearId);
            })
            ->where(function ($query) use ($classroomId, $academicYearId) {
                $query->where(function ($query) use ($classroomId, $academicYearId) {
                    $query->whereNull('classroom_students.student_id')
                        ->where('students.academic_year_id', $academicYearId)
                        ->where('students.classroom_id', $classroomId);
                })->orWhere(function ($query) use ($classroomId, $academicYearId) {
                    $query->whereNotNull('classroom_students.student_id');
                    $query->where('classroom_students.classroom_id', $classroomId)
                        ->where('classroom_students.academic_year_id', $academicYearId);
                });
            })
            ->select(
                // 'students.id',
                // 'students.classroom_id',
                // 'students.country_id',
                // 'students.employment_cat_id',
                // 'students.admission_no',
                // 'students.first_name',
                // 'students.middle_name',
                // 'students.last_name',
                // 'students.student_status',
                // 'students.boarding_type',
                // 'students.status',
                'students.*'
            )
            ->distinct()
            ->get();
    }

    public function getStudentsByClassroomId($classroomId, $schoolId = null, $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomId, $academicYearId) {
                $sSubQuery->where(function ($query) use ($classroomId, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->where('classroom_students.classroom_id', $classroomId);
                });
            })
            ->get();
    }

    public function getStudentsForSmsCredentials(int $classroomId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomId, $academicYearId) {
                $sSubQuery->where(function ($query) use ($classroomId, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);

                    if (!empty($classroomId)) {
                        $query->where('classroom_students.classroom_id', $classroomId);
                    }
                });
            })
            ->with([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title'
            ])
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->get();
    }

    public function getStudentsByClassroomIdsForSmsCredentials(array $classroomIds, string $boardingType = '', int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomIds, $academicYearId) {
                $sSubQuery->where(function ($query) use ($classroomIds, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->whereIn('classroom_students.classroom_id', $classroomIds);
                });
            })
            ->when(!empty($boardingType), function ($query) use ($boardingType) {
                $query->where('boarding_type', $boardingType);
            })
            ->with([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
            ])
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->get();
    }

    public function getActiveBoardingStudents(int $classroomId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomId, $academicYearId) {
                $sSubQuery->where(function ($query) use ($classroomId, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);

                    if (!empty($classroomId)) {
                        $query->where('classroom_students.classroom_id', $classroomId);
                    }
                });
            })
            ->where('boarding_type', ScholarBoardingType::BOARDING)
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->with([
                'father:id,student_id,first_name,middle_name,last_name,guardian_type',
                'studentWalletTransactions:id,student_id,amount,transaction_type',
                'classroomRoll' => function ($query) use ($academicYearId, $classroomId) {
                    $query->where('academic_year_id', $academicYearId);

                    if (!empty($classroomId)) {
                        $query->where('classroom_id', $classroomId);
                    }
                }
            ])
            ->get();
    }

    public function getBoardingStudentById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($academicYearId) {
                $sSubQuery->where(function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);
                });
            })
            ->where('boarding_type', ScholarBoardingType::BOARDING)
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->with([
                'studentWalletTransactions:id,student_id,amount,transaction_type',
            ])
            ->first();
    }

    public function getActiveRegistrationStudents($schoolId = null, $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('enquiry_id', '!=', null)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($academicYearId) {
                $sSubQuery->where(function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);
                });
            })
            ->get();
    }

    public function getActiveRegistrationStudentsWithoutLedger($schoolId = null, $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('enquiry_id', '!=', null)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($academicYearId) {
                $sSubQuery->where(function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);
                });
            })
            ->whereDoesntHave('ledger')
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get();
    }

    public function getActiveStudentsWithoutLedger($schoolId = null, $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($academicYearId) {
                $sSubQuery->where(function ($query) use ($academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId);
                });
            })
            ->whereDoesntHave('ledger')
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get();
    }

    public function getByClassroomIdForEvent(int $classroomId, int $houseId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomId, $academicYearId) {
                $sSubQuery->where(function ($query) use ($classroomId, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->where('classroom_students.classroom_id', $classroomId);
                });
            })
            ->when(!empty($houseId), function ($query) use ($houseId) {
                $query->whereHas('house', function ($query) use ($houseId) {
                    $query->where('houses.id', $houseId);
                });
            })
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }

    public function getStudentsByIds(array $ids)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) {
                $sSubQuery->where(function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                });
            })
            ->get();
    }

    public function getEventActivityStudentByIds(array $ids)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) {
                $sSubQuery->where(function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                });
            })
            ->with(['classroom', 'promotedClassroom', 'studentImage'])
            ->select(
                'id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }

    public function getStudentsForIdCardByIds(array $ids)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) {
                $sSubQuery->where(function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                });
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'blood_group_name',
                'student_house.house',
                'studentImage'
            ])
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date_at',
                'blood_group',
                'boarding_type',
                'aadhar_card_no',
                'present_address',
                'permanent_address',
            )
            ->get();
    }

    public function getStudentsForIdCardByAdmissionNo(array $admissionNo)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('admission_no', $admissionNo)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) {
                $sSubQuery->where(function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                });
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'blood_group_name',
                'student_house.house',
                'studentImage'
            ])
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date_at',
                'blood_group',
                'boarding_type',
                'aadhar_card_no',
                'present_address',
                'permanent_address',
            )
            ->get();
    }

    public function getStudentsForIdCardByClassroomId(int $classroomId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomId) {
                $sSubQuery->where(function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                });
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->where('classroom_id', $classroomId);
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'blood_group_name',
                'student_house.house',
                'studentImage'
            ])
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date_at',
                'blood_group',
                'boarding_type',
                'aadhar_card_no',
                'present_address',
                'permanent_address',
            )
            ->get();
    }

    public function getStudentsByIdsAndClassroomId(array $ids, int $classroomId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->whereHas('classroomPromotedStudents', function ($sSubQuery) use ($classroomId) {
                $sSubQuery->where(function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId())
                        ->where('classroom_students.classroom_id', $classroomId);
                });
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'blood_group_name',
                'student_house.house',
                'studentImage'
            ])
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date_at',
                'blood_group',
                'boarding_type',
                'aadhar_card_no',
                'present_address',
                'permanent_address',
            )
            ->get();
    }


    public function getStudentsByClassroomIdOld2($classroomId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->get();
    }

    public function getStudentsByClassroomIdAndTcStatus($classroomId, $isDraft = false, $isGenerated = false)
    {
        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->whereHas('studentTc', function ($query) use ($classroomId, $isDraft, $isGenerated) {
                $query->where('classroom_id', $classroomId)
                    ->where('is_draft', $isDraft)
                    ->where('is_generated', $isGenerated);
            })
            ->with([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                'country:id,name',
                'classroom:id,title',
                'promotedClassroom',
                'schoolLogo',
                'schoolData',
                'studentTc' => function ($query) use ($classroomId, $isDraft, $isGenerated) {
                    $query->where('classroom_id', $classroomId)
                        ->where('is_draft', $isDraft)
                        ->where('is_generated', $isGenerated)
                        ->select(
                            'id',
                            'student_id',
                            'classroom_id',
                            'certificate_no',
                            'is_draft',
                            'is_generated',
                            'generated_date_at',
                            'issue_date_at',
                            'certificate_type',
                            'tc_reason',
                        );
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'school_id',
                'country_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'birth_date_at',
                'present_address',
            )
            ->get();
    }


    public function getActiveAndInActiveStudentsByClassroomId($classroomId)
    {
        return Student::whereIn('status', [Status::ACTIVE, Status::INACTIVE])
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'status',
            )
            ->get();
    }

    public function getStudentsByClassroomIds(array $classroomIds)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->get();
    }

    public function getStudentsByClassroomIdsAndStatus(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'birth_date_at',
                'admission_date_at',
                'gender',
                'present_address',
                'present_city',
                'religion',
                'boarding_type',
                'document_attached',
                'employment_cat_id',
            )
            ->get();
    }

    public function getStudentsByStatus(string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with([
                'classroom' => function ($query) {
                    $query->select(
                        'id',
                        'class_name_id',
                        'title',
                        'display_order'
                    )->with(['className:id,title']);
                },
                'promotedClassroom' => function ($query) {
                    $query->select(
                        'classrooms.id',
                        'classrooms.class_name_id',
                        'classrooms.title',
                        'classrooms.display_order'
                    )->with(['className:id,title']);
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'student_status',
                'status',
                'gender',
                'religion',
                'employment_cat_id',
                'boarding_type',
                'document_attached',
            )
            ->get();
    }


    public function getStudentInactiveSummaryReport()
    {
        return Student::where('school_id', getUserSchoolId())
            ->where('status', Status::INACTIVE)
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with([
                'classroom' => function ($query) {
                    $query->select(
                        'id',
                        'class_name_id',
                        'title',
                        'display_order'
                    )->with(['className:id,title']);
                },
                'promotedClassroom' => function ($query) {
                    $query->select(
                        'classrooms.id',
                        'classrooms.class_name_id',
                        'classrooms.title',
                        'classrooms.display_order'
                    )->with(['className:id,title']);
                }
            ])
            ->select(
                'id',
                'classroom_id',
                'status',
            )
            ->get();
    }


    public function getStudentHouseWiseReport(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->whereHas('student_house', function ($query) {
                $query->where('student_houses.academic_year_id', getAcademicYearId());
            })
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'student_house' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->with(['house']);
                },
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }


    public function getStudentSiblingReport(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->whereHas('father')
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'father:id,student_id,user_id,guardian_type,first_name,middle_name,last_name,phone,email'
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }


    public function getStudentsWithTransportReport(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->whereHas('allocateTransport')
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }


    public function getStudentsWithoutTransportReport(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->whereDoesntHave('allocateTransport')
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }

    public function getNewStudentReport(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->where('student_status', StudentStatus::NEW)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'createdBy.user',
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_date_at',
            )
            ->get();
    }

    public function getOldStudentReport(array $classroomIds, string $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereIn('student_status', [StudentStatus::OLD, StudentStatus::PROMOTED])
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->with([
                'classroom:id,title,display_order',
                'promotedClassroom:classrooms.id,classrooms.title,classrooms.display_order',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                },
                'classroomStudent.user',
            ])
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'promoted_date_at',
                'promoted_by',
            )
            ->get();
    }


    public function getStudentsByClassroomIdsAndStudentStatus(array $classroomIds, $studentStatus = "", $studentActiveStatus = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                if ($studentStatus == StudentStatus::PROMOTED->value) {
                    $query->whereNot('students.student_status', StudentStatus::NEW);
                } else {
                    $query->where('students.student_status', $studentStatus);
                }
            })
            ->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                $query->where('students.status', $studentActiveStatus);
            })
            ->get();
    }

    public function getStudentsByClassroomIdAndStatus(int $classroomId, $status = "", int $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->when(!empty($status), function ($query) use ($status) {
                $query->where('students.status', $status);
            })
            ->get();
    }

    public function getSummaryStudentsByClassNameIdsAndStatus(array $classNameIds, $studentActiveStatus = "")
    {
        $classroomIds = [];

        $classrooms = $this->getClassroomsByClassNameIds($classNameIds);

        if ($classrooms->count() > 0) {
            $classroomIds = $classrooms->pluck('id')->toArray();
        }

        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                if (strtolower($studentActiveStatus) == 'tc') {
                    $query->whereHas('studentTransferCertificate')
                        ->where('students.status', $studentActiveStatus);
                } else {
                    $query->whereDoesntHave('studentTransferCertificate')
                        ->where('students.status', $studentActiveStatus);
                }
            })
            ->with(['promotedClassroom'])
            ->select(
                'id',
                'class_name_id',
                'classroom_id',
                'student_status'
            )
            ->get();
    }

    public function getSummaryStudentsByClassroomIdsAndStatus(array $classroomIds, $studentActiveStatus = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                if (strtolower($studentActiveStatus) == 'tc') {
                    $query->whereHas('studentTransferCertificate')
                        ->where('students.status', $studentActiveStatus);
                } else {
                    $query->whereDoesntHave('studentTransferCertificate')
                        ->where('students.status', $studentActiveStatus);
                }
            })
            ->with(['promotedClassroom'])
            ->select(
                'id',
                'class_name_id',
                'classroom_id',
                'student_status'
            )
            ->get();
    }

    public function getStudentsByClassroomIdAndStudentStatus($classroomId = null, $studentStatus = "", $studentActiveStatus = "", $employmentCategoryId = null)
    {
        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
                if (!empty($classroomId)) {
                    $query->where('classroom_students.classroom_id', $classroomId);
                }
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
            })
            ->when(!empty($employmentCategoryId), function ($query) use ($employmentCategoryId) {
                $query->where('students.employment_cat_id', $employmentCategoryId);
            })
            ->get();
    }

    public function getStudentsByClassroomIdAndEmploymentCatId(int $classroomId, int $employmentCategoryId = null)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->when(!empty($employmentCategoryId), function ($query) use ($employmentCategoryId) {
                $query->where('employment_cat_id', $employmentCategoryId);
            })
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'class_name_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }

    public function getStudentsByClassroomIdAndActiveStatus($classroomId = null, $studentStatus = "", $studentId = null)
    {
        return Student::where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
                if (!empty($classroomId)) {
                    $query->where('classroom_students.classroom_id', $classroomId);
                }
            })
            ->when(!empty($studentId), function ($query) use ($studentId) {
                $query->where('id', $studentId);
            })
            ->where(function ($query) use ($studentStatus) {
                if (!empty($studentStatus)) {
                    if ($studentStatus == 'Tc') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else {
                        if ($studentStatus == 'Inactive') {
                            $query->whereDoesntHave('studentTransferCertificate');
                        }

                        $query->where('students.status', $studentStatus);
                    }
                }
            })
            ->with(['classroom:id,title', 'father:id,student_id,first_name,middle_name,last_name,phone'])
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
                'status'
            )
            ->get();
    }



    public function getStudentForAttendance($classroomId, $searchValue)
    {
        $query = Student::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with([
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'roll_no'
                        );
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,sms_phone',
                'mother:id,student_id,guardian_type,first_name,middle_name,last_name',
                'student_notes' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->with(['createdBy' => function ($query) {
                            $query->select(
                                'id',
                                'first_name',
                                'middle_name',
                                'last_name',
                            );
                        }])->select(
                            'id',
                            'student_id',
                            'created_by',
                            'context',
                            'notes',
                            'note_status',
                            'created_at',
                        );
                },
            ]);

        if (!empty($searchValue)) {
            $query->where(function ($q) use ($searchValue, $classroomId) {
                $q->where('first_name', 'like', '%' . $searchValue . '%');
                $q->orWhere('middle_name', 'like', '%' . $searchValue . '%');
                $q->orWhere('last_name', 'like', '%' . $searchValue . '%');

                $q->orWhereHas('father', function ($sq) use ($searchValue) {
                    $sq->where('first_name', 'like', '%' . $searchValue . '%');
                    $sq->orWhere('middle_name', 'like', '%' . $searchValue . '%');
                    $sq->orWhere('last_name', 'like', '%' . $searchValue . '%');
                });
                $q->orWhereHas('classroomRoll', function ($cq) use ($searchValue, $classroomId) {
                    $cq->where('classroom_id', $classroomId)
                        ->where('roll_no', 'like', '%' . $searchValue . '%');
                });
            });
        }

        $query->select(
            'id',
            'admission_no',
            'first_name',
            'middle_name',
            'last_name',
        );
        return $query->get();
    }

    public function getStudentsForOnlineAttendance(int $classroomId, int $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with([
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'student_id',
                            'roll_no'
                        );
                }
            ])
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->get();
    }

    public function getListForChangeDuration($classroomId = null, $searchValue = null)
    {
        $query = Student::query()
            ->where('students.school_id', getUserSchoolId())
            // ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->select(
                // student
                'students.id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.present_address',
                'students.start_date_at',
                'students.end_date_at',
                'students.extension_date_at',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_mobile',
            );

        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
            $query->where('classroom_students.academic_year_id', getAcademicYearId());
            if (!empty($classroomId)) {
                $query->where('classroom_students.classroom_id', $classroomId);
            }
        });

        if ($searchValue) {
            $query->where(function ($subQuery) use ($searchValue) {
                $subQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.present_address', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.start_date_at', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.end_date_at', 'like', '%' . $searchValue . '%')
                    ->orWhere('students.extension_date_at', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.first_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.middle_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.last_name', 'like', '%' . $searchValue . '%')
                    ->orWhere('father.phone', 'like', '%' . $searchValue . '%');
            });
        }
        return $query->get();
    }

    public function getStudentsByClassNameId($id)
    {
        return Student::select('students.*')
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->join('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->join('class_names', 'classrooms.class_name_id', '=', 'class_names.id')
            ->where('class_names.id', $id)
            ->where('students.status', Status::ACTIVE)
            ->get();
    }


    public function getStudentIdsByClassNameId($id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', $id)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }


    public function getStudentIdsByClassroomId($id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $id)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }

    public function getClassroomsByClassNameId($classNameId)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get();
    }

    public function getClassroomsByClassNameIds($classNameIds)
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('class_name_id', $classNameIds)
            ->select('id')
            ->get();
    }

    public function getStudentsByClassNameIdAndClassroomId($classNameId, $classroomId = null)
    {
        $classroomIds = [];

        if (!empty($classNameId) && empty($classroomId)) {
            $classrooms = $this->getClassroomsByClassNameId($classNameId);

            if (count($classrooms) > 0) {
                $classroomIds = $classrooms->pluck('id')->toArray();
            }
        }

        if (!empty($classroomId)) {
            array_push($classroomIds, $classroomId);
        }

        $classroomIds = array_unique($classroomIds);

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->with(['father', 'promotedClassroom', 'classroom' => function ($query) {
                $query->select('id', 'title');
            }])
            ->get();
    }

    // createSibling
    public function createSibling(array $arrayData)
    {
        return StudentSibling::create($arrayData);
    }

    public function existStudentFromClassId(int $class_id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $class_id)
            ->count();
    }

    public function getStudentNameIdByClassroomId($id)
    {
        return Student::where('classroom_id', $id)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get();
    }

    public function getStudentInfoForSale($id)
    {
        return Student::where('students.id', $id)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->select(
                'students.id',
                'students.admission_no',
                'students.classroom_id',
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_phone',
            )
            ->first();
    }

    public function todayAdmissions()
    {
        return Student::whereDate('created_at', Carbon::today())
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', '=', Status::ACTIVE)
            ->count();
    }

    public function totalAdmission()
    {
        return Student::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->count();
    }

    //get-StudentCounts
    public function getStudentCounts()
    {
        $activeStudentsCount = Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $oldStudentsCount = Student::where('status', Status::ACTIVE)
            ->whereIn('student_status', ['Promoted', 'Old'])
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $maleStudentsCount = Student::where('status', Status::ACTIVE)
            ->where('gender', 'Male')
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $boardingStudentsCount = Student::where('status', Status::ACTIVE)
            ->where('boarding_type', 'Boarding')
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $inactiveStudentsCount = Student::where('status', Status::INACTIVE)
            // ->where('boarding_type', 'Boarding')
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $newStudentsCount = Student::where('status', Status::ACTIVE)
            ->where('student_status', 'New')
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $femaleStudentsCount = Student::where('status', Status::ACTIVE)
            ->where('gender', 'Female')
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->count();

        $transport = Transport::count();

        return [
            'active_students' => $activeStudentsCount,
            'old_students' => $oldStudentsCount,
            'male_students' => $maleStudentsCount,
            'boarding_students' => $boardingStudentsCount,
            'inactive_students' => $inactiveStudentsCount,
            'new_students' => $newStudentsCount,
            'female_students' => $femaleStudentsCount,
            'students_using_transport' => $transport,
        ];
    }

    public function getClassroomsWithStudentCount()
    {
        // Fetch all classrooms
        $classrooms = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();

        // Fetch all students and group them classroom wise
        $students = Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with(['promotedClassroom:classrooms.id'])
            ->select('id', 'classroom_id')
            ->get()
            ?->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student->promotedClassroom?->id;
                }

                return $student;
            })?->groupBy('classroom_id');

        // Format the data to include title and student count
        $classroomData = $classrooms->map(function ($classroom) use ($students) {
            return [
                'title' => $classroom->title,
                'student_count' => count($students[$classroom->id] ?? []),
            ];
        });

        return $classroomData;
    }

    function getClassroomsWithStudentCount_Old()
    {
        // Fetch all classrooms with student counts
        $classrooms = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->withCount('students')
            ->get();

        // Format the data to include title and student count
        $classroomData = $classrooms->map(function ($classroom) {
            return [
                'title' => $classroom->title,
                'student_count' => $classroom->students_count,
            ];
        });

        return $classroomData;
    }

    function getClassWithStudentCount($type = null)
    {
        // get className with student counts
        $query = ClassName::query();
        $query->withCount([
            'students2' => function ($query) use ($type) {
                if (!empty($type)) {
                    $query->where('status', $type);
                }
                $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId());
            },
            'promotedStudents' => function ($query) use ($type) {
                if (!empty($type)) {
                    $query->where('status', $type);
                }
                $query->where('school_id', getUserSchoolId())
                    ->where('academic_year_id', getAcademicYearId());
            }
        ])
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->distinct();

        // Get the classrooms data with student counts
        $classNameData = $query->get();

        // Format the data to include title and student count
        $formattedData = $classNameData->map(function ($classroom) {
            return [
                'id' => $classroom->id,
                'title' => $classroom?->title,
                'student_count' => $classroom?->students2_count,
                'promoted_student_count' => $classroom?->promoted_students_count,
                'total_count' => $classroom?->students2_count + $classroom?->promoted_students_count,
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ];
        });

        return $formattedData;
    }


    function getClassroomsWithStudent2($classNameId, $type = null)
    {
        // Fetch all classrooms with student counts
        $query = Classroom::query();
        $query->withCount(['students' => function ($query) use ($type) {
            if (!empty($type)) {
                $query->where('status', $type);
            }
            $query->where('school_id', getUserSchoolId())
                ->where('academic_year_id', getAcademicYearId());
        }])
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId());

        if (!empty($classNameId)) {
            $query->where(function ($subQuery) use ($classNameId) {
                $subQuery->where('class_name_id', $classNameId);
            });
        }

        // Get the classrooms data with student counts
        $classroomsData = $query->get();

        // Format the data to include title and student count
        $formattedData = $classroomsData->map(function ($classroom) {
            return [
                'id' => $classroom->id,
                'title' => $classroom->title,
                'student_count' => $classroom->students_count,
            ];
        });

        return $formattedData;
    }


    //School growth analytics - School wise
    public function getTotalStudentPerSession()
    {
        $userSchoolId = getUserSchoolId();

        $academicYears = AcademicYear::where('status', Status::ACTIVE)
            ->where('school_id', $userSchoolId)
            ->select(
                'id',
                'academic_session'
            )
            ->get();

        return $academicYears?->map(function ($academicYear) use ($userSchoolId) {
            $students = Student::where('status', Status::ACTIVE)
                ->where('school_id', $userSchoolId)
                ->whereHas('classroomPromotedStudents', function ($query) use ($academicYear) {
                    $query->where('classroom_students.academic_year_id', $academicYear->id);
                })
                ->select('id')
                ->get();

            return [
                'academic_session' => $academicYear->academic_session,
                'total_student' => count($students),
            ];
        });
    }

    public function getTotalStudentPerSession_Old()
    {
        $userSchoolId = getUserSchoolId();

        return DB::table('students')
            ->join('academic_years', 'students.academic_year_id', '=', 'academic_years.id')
            ->where('students.school_id', $userSchoolId)
            ->where('students.status', Status::ACTIVE)
            ->select(
                'academic_years.academic_session',
                DB::raw('COUNT(*) as total_stutdent')
            )
            ->groupBy('academic_years.academic_session')
            ->get();
    }



    public function getStudentsByClassNameIds(array $classNameIds)
    {
        $classroomIds = [];

        if (!empty($classNameIds)) {
            $classrooms = $this->getClassroomsByClassNameIds($classNameIds);

            if (count($classrooms) > 0) {
                $classroomIds = $classrooms->pluck('id')->toArray();
            }
        }

        if (empty($classroomIds)) {
            return [];
        }

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->select('id', 'class_name_id', 'student_status', 'boarding_type', 'is_economically_weaker')
            ->get();
    }


    public function getStudentsWithoutFeeStructureByClassNameIds(array $classNameIds)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('class_name_id', $classNameIds)
            ->whereDoesntHave('classroom_fee_student_amounts', function ($query) {
                $query->where('academic_year_id', getAcademicYearId())
                    ->where(function ($query) {
                        $query->where('class_fee_structure_id', '!=', null)
                            ->orWhere('class_fee_structure_id', '!=', 'null');
                    });
            })
            ->select('id', 'class_name_id', 'student_status')
            ->get();
    }

    public function getActiveAllByIds(array $ids)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->whereIn('id', $ids)
            ->with(['classroom_fee_student_amounts'])
            ->select('id', 'class_name_id')
            ->get();
    }

    public function getStudentsByBoardingType(string $type)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('boarding_type', $type)
            ->get();
    }

    public function getSubjectMarkReport($classroom_id, $subject_id, $exam_id)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.classroom_id', $classroom_id)
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('classroom_rolls', function ($join2) use ($classroom_id) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classroom_id);
            })
            ->with([
                'mark' => function ($query) use ($classroom_id, $subject_id, $exam_id) {
                    $query->where('exam_id', $exam_id)
                        ->where('subject_id', $subject_id)
                        ->where('classroom_id', $classroom_id)
                        ->with(['grade:academic_grade_items.id,academic_grade_items.title'])
                        ->select(
                            'id',
                            'student_id',
                            'mark',
                            'absence_reason',
                            'academic_grade_item_id',
                            'is_present',
                        );
                },
                'examAttendances' => function ($query) use ($classroom_id, $exam_id) {
                    $query->where('exam_id', $exam_id)
                        ->where('classroom_id', $classroom_id)
                        ->select(
                            'id',
                            'student_id',
                            'present_day',
                        );
                }
            ])
            ->groupBy('students.id', 'classroom_rolls.roll_no')
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                // roll
                'classroom_rolls.roll_no',
            );

        return $query->get();
    }

    public function hasFreezedMark(int $classroomId, int $subjectId, int $examId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('students.status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.classroom_id', $classroomId)
                    ->where('classroom_students.academic_year_id', $academicYearId);
            })
            ->whereHas('mark', function ($query) use ($classroomId, $subjectId, $examId) {
                $query->where('exam_id', $examId)
                    ->where('subject_id', $subjectId)
                    ->where('classroom_id', $classroomId)
                    ->where('status', FreezeMarkStatus::FREEZE);
            })
            ->exists();
    }

    public function getClassWiseStudent($classroom_id, $subject_id, $exam_id, $schoolId = null, $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', $schoolId)
            ->where('classroom_students.academic_year_id', $academicYearId)
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.classroom_id', $classroom_id)
            // ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('classroom_rolls', function ($join2) use ($classroom_id, $academicYearId) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_rolls.academic_year_id', $academicYearId)
                    ->where('classroom_rolls.classroom_id', $classroom_id);
            })
            ->leftJoin('guardians as father', function ($join2) {
                $join2->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value)
                    ->limit(1);
            })
            ->with([
                'mark' => function ($query) use ($classroom_id, $subject_id, $exam_id) {
                    $query->where('exam_id', $exam_id)
                        ->where('subject_id', $subject_id)
                        ->where('classroom_id', $classroom_id);
                },
                'markRaw' => function ($query) use ($classroom_id, $subject_id, $exam_id, $schoolId, $academicYearId) {
                    $query->where('exam_id', $exam_id)
                        ->where('school_id', $schoolId)
                        ->where('academic_year_id', $academicYearId)
                        ->where('subject_id', $subject_id)
                        ->where('classroom_id', $classroom_id)
                        ->with('grade');
                },
                'remark' => function ($query) use ($exam_id, $schoolId, $academicYearId) {
                    $query->where('exam_id', $exam_id)
                        ->where('school_id', $schoolId)
                        ->where('academic_year_id', $academicYearId);
                },
                'father',
                'mother',
                'classroomRollRaw' => function ($q) use ($classroom_id, $academicYearId) {
                    $q->where('classroom_rolls.classroom_id', $classroom_id)
                        ->where('classroom_rolls.academic_year_id', $academicYearId);
                },
                'studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId);
                }
            ])
            ->select(
                // Student
                'students.id',
                // 'students.classroom_id',
                'classroom_students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                // father
                'father.first_name as fatherFirstName',
                'father.middle_name as fatherMiddleName',
                'father.last_name as fatherLastName',
                // roll
                'classroom_rolls.roll_no',
                // 'classroom_rolls.id as classroom_roll_id'
            )->distinct('students.id');

        return $query->get();
    }

    public function getClassWiseStudentOld($classroom_id, $subject_id, $exam_id)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.classroom_id', $classroom_id)
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('classroom_rolls', function ($join) {
                $join->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value)
                    ->limit(1);
            })
            ->with(['mark' => function ($query) use ($classroom_id, $subject_id, $exam_id) {
                $query->where('exam_id', $exam_id);
                $query->where('subject_id', $subject_id);
                $query->where('classroom_id', $classroom_id);
            }])
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                // father
                'father.first_name as fatherFirstName',
                'father.middle_name as fatherMiddleName',
                'father.last_name as fatherLastName',
                // roll
                'classroom_rolls.roll_no',
                'classroom_rolls.id as classroom_roll_id'
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.classroom_id', $classroom_id)
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('guardians as father', function ($join2) {
                $join2->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value)
                    ->limit(1);
            })
            ->with(['mark' => function ($query) use ($classroom_id, $subject_id, $exam_id) {
                $query->where('exam_id', $exam_id);
                $query->where('subject_id', $subject_id);
                $query->where('classroom_id', $classroom_id);
            }])
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                // father
                'father.first_name as fatherFirstName',
                'father.middle_name as fatherMiddleName',
                'father.last_name as fatherLastName',
                // roll
                'classroom_rolls.roll_no',
                'classroom_rolls.id as classroom_roll_id'
            );

        return $query->union($query2)->get();
    }

    public function getExamMarkTemplateStudent($classroomId, $subject_id, $exam_id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with([
                'mark' => function ($query) use ($classroomId, $subject_id, $exam_id) {
                    $query->where('exam_id', $exam_id)
                        ->where('subject_id', $subject_id)
                        ->where('classroom_id', $classroomId)
                        ->with(['grade:academic_grade_items.id,academic_grade_items.title'])
                        ->select(
                            'id',
                            'student_id',
                            'mark',
                            'absence_reason',
                            'academic_grade_item_id',
                            'is_present',
                        );
                },
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_rolls.academic_year_id', getAcademicYearId())
                        ->where('classroom_rolls.classroom_id', $classroomId);
                }
            ])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'admission_no',
            )
            ->get();
    }

    public function remarkStudentList($examID, $classID, $classroomId = null)
    {
        // $classroomIds = Classroom::where('status', Status::ACTIVE)
        //     ->where('school_id', getUserSchoolId())
        //     ->where('academic_year_id', getAcademicYearId())
        //     ->where('class_name_id', $classID)
        //     ->select('id')
        //     ->get()
        //     ->pluck('id')
        //     ->toArray();

        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            // ->whereIn('classroom_students.classroom_id', $classroomIds)
            ->where('classroom_students.classroom_id', $classroomId)
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->leftJoin('classroom_rolls', function ($join) {
                $join->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId());
            })
            ->leftJoin('academic_remarks', function ($join) use ($examID, $classID) {
                $join->on('students.id', '=', 'academic_remarks.student_id')
                    ->where('academic_remarks.exam_id', $examID)
                    ->where('academic_remarks.class_name_id', $classID);
            })
            ->select(
                'academic_remarks.id as remark_id',
                'academic_remarks.exam_id',
                'academic_remarks.student_id',
                'academic_remarks.remarks',
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            )->distinct();

        return $query->get();
    }

    public function remarkStudentListOld($examID, $classID)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.class_name_id', $classID)
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('academic_remarks', function ($join) use ($examID, $classID) {
                $join->on('students.id', '=', 'academic_remarks.student_id')
                    ->where('academic_remarks.exam_id', $examID)
                    ->where('academic_remarks.class_name_id', $classID);
            })
            ->select(
                'academic_remarks.id as remark_id',
                'academic_remarks.exam_id',
                'academic_remarks.student_id',
                'academic_remarks.remarks',
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.class_name_id', $classID)
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('academic_remarks', function ($join) use ($examID, $classID) {
                $join->on('students.id', '=', 'academic_remarks.student_id')
                    ->where('academic_remarks.exam_id', $examID)
                    ->where('academic_remarks.class_name_id', $classID);
            })
            ->select(
                'academic_remarks.id as remark_id',
                'academic_remarks.exam_id',
                'academic_remarks.student_id',
                'academic_remarks.remarks',
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        return $query->union($query2)->get();
    }

    public function getStudentForExamAttendance($exam_id, $classroom_id, $schoolId = null, $academicYearId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        // new code
        $subquery = DB::table('exam_attendances')
            ->select(
                'student_id',
                DB::raw('MIN(id) as id'),
                DB::raw('MIN(exam_id) as exam_id'),
                DB::raw('MIN(present_day) as present_day'),
                DB::raw('MIN(working_day) as working_day')
            )
            ->where('exam_id', $exam_id)
            ->where('classroom_id', $classroom_id)
            ->groupBy('student_id');

        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', $schoolId)
            ->where('classroom_students.academic_year_id', $academicYearId)
            ->where('classroom_students.classroom_id', $classroom_id)
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->leftJoin('classroom_rolls', function ($join) use ($academicYearId) {
                $join->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_rolls.academic_year_id', $academicYearId);
            })
            // old code
            // ->leftJoin('exam_attendances', function ($join) use ($exam_id, $classroom_id) {
            //     $join->on('students.id', '=', 'exam_attendances.student_id')
            //         ->where('exam_attendances.exam_id', $exam_id)
            //         ->where('exam_attendances.classroom_id', $classroom_id);
            // })
            // new code
            ->leftJoinSub($subquery, 'exam_attendances', function ($join) {
                $join->on('students.id', '=', 'exam_attendances.student_id');
            })
            ->with([
                'father:student_id,first_name,middle_name,last_name',
                'mother',
                'studentImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId)
                        ->select('imageable_type', 'imageable_id', 'path');
                }
            ])
            ->select(
                // exam_attendances
                'exam_attendances.id as exam_attendance_id',
                'exam_attendances.exam_id',
                'exam_attendances.present_day',
                'exam_attendances.working_day',
                // student
                'students.id',
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            )->distinct();

        return $query->get();
    }

    public function getStudentForExamAttendanceOld($exam_id, $classroom_id)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.classroom_id', $classroom_id)
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('exam_attendances', function ($join) use ($exam_id, $classroom_id) {
                $join->on('students.id', '=', 'exam_attendances.student_id')
                    ->where('exam_attendances.exam_id', $exam_id)
                    ->where('exam_attendances.classroom_id', $classroom_id);
            })
            ->select(
                // exam_attendances
                'exam_attendances.id as exam_attendance_id',
                'exam_attendances.exam_id',
                'exam_attendances.present_day',
                'exam_attendances.working_day',
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.classroom_id', $classroom_id)
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('exam_attendances', function ($join) use ($exam_id, $classroom_id) {
                $join->on('students.id', '=', 'exam_attendances.student_id')
                    ->where('exam_attendances.exam_id', $exam_id)
                    ->where('exam_attendances.classroom_id', $classroom_id);
            })
            ->select(
                // exam_attendances
                'exam_attendances.id as exam_attendance_id',
                'exam_attendances.exam_id',
                'exam_attendances.present_day',
                'exam_attendances.working_day',
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        return $query->union($query2)->get();
    }

    public function getSubjectWiseDataByClassroomIdAndSubjectId($classId, $subjectId)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.classroom_id', $classId)
            ->leftJoin('classroom_rolls', function ($join2) use ($classId) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classId);
            })
            ->leftJoin('marks', function ($join) use ($subjectId, $classId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.subject_id', $subjectId)
                    ->where('marks.classroom_id', $classId);
            })
            ->leftJoin('classroom_subjects', function ($join) use ($subjectId, $classId) {
                $join->on('classroom_subjects.classroom_id', '=', 'students.classroom_id')
                    ->where('classroom_subjects.subject_id', $subjectId)
                    ->where('classroom_subjects.classroom_id', $classId);
            })
            ->leftJoin('exam_roasters', function ($join) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->on('marks.exam_id', '=', 'exam_roasters.exam_id');
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->select(
                // mark
                'marks.mark',
                //exam roaster
                'exam_roasters.full_mark',
                //exam
                'exams.id as exam_id',
                'exams.title as exam_title',
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.classroom_id', $classId)
            ->leftJoin('classroom_rolls', function ($join2) use ($classId) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_rolls.academic_year_id', getAcademicYearId())
                    ->where('classroom_rolls.classroom_id', $classId);
            })
            ->leftJoin('marks', function ($join) use ($subjectId, $classId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.subject_id', $subjectId)
                    ->where('marks.classroom_id', $classId);
            })
            ->leftJoin('classroom_subjects', function ($join) use ($subjectId, $classId) {
                $join->on('classroom_subjects.classroom_id', '=', 'classroom_students.classroom_id')
                    ->where('classroom_subjects.subject_id', $subjectId)
                    ->where('classroom_subjects.classroom_id', $classId);
            })
            ->leftJoin('exam_roasters', function ($join) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->on('marks.exam_id', '=', 'exam_roasters.exam_id');
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->select(
                // mark
                'marks.mark',
                //exam roaster
                'exam_roasters.full_mark',
                //exam
                'exams.id as exam_id',
                'exams.title as exam_title',
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        return $query->union($query2)->get();
    }


    public function getSubjectWiseDataByClassroomIdAndSubjectIdOld($classId, $subjectId)
    {
        $query = Student::query();
        $query->where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->where('students.classroom_id', $classId)
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('marks', function ($join) use ($subjectId, $classId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.subject_id', $subjectId)
                    ->where('marks.classroom_id', $classId);
            })
            ->select(
                // mark
                'marks.mark',
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        // query 2 for union
        $query2 = Student::query();
        $query2->where('students.status', Status::ACTIVE)
            ->where('classroom_students.school_id', getUserSchoolId())
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->join('classroom_students', 'students.id', '=', 'classroom_students.student_id')
            ->where('classroom_students.classroom_id', $classId)
            ->leftJoin('classroom_rolls', function ($join2) {
                $join2->on('classroom_rolls.student_id', '=', 'students.id')
                    ->on('classroom_rolls.classroom_id', '=', 'students.classroom_id');
            })
            ->leftJoin('marks', function ($join) use ($subjectId, $classId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.subject_id', $subjectId)
                    ->where('marks.classroom_id', $classId);
            })
            ->select(
                // mark
                'marks.mark',
                // student
                'students.id as student_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'classroom_rolls.roll_no'
            );

        return $query->union($query2)->get();
    }

    public function getClassWiseStudentAll()
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->where('students.academic_year_id', getAcademicYearId())
            ->leftJoin('marks', 'students.id', '=', 'marks.student_id')
            ->leftJoin('guardians', 'students.id', '=', 'guardians.student_id')
            ->select(
                'students.*',
                'marks.mark',
                'marks.exam_id',
                'marks.subject_id',
                'marks.is_present',
                'marks.absence_reason',
                'guardians.first_name as father_first_name',
                'guardians.middle_name as father_middle_name',
                'guardians.last_name as father_last_name',
            )
            ->get();
    }


    // classroom student
    public function createClassroomStudent(array $arrayData)
    {
        return ClassroomStudent::create($arrayData);
    }

    // update classroom student
    public function updateClassroomStudent($id, array $arrayData)
    {
        return ClassroomStudent::whereId($id)->update($arrayData);
    }

    // update new classroom student class
    public function updateNewClassroomStudentClass(int $studentId, array $arrayData)
    {
        return ClassroomStudent::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereNull('academic_year_id_from')
            ->whereNull('classroom_id_from')
            ->where('student_id', $studentId)
            ->update($arrayData);
    }

    // update classroom student class
    public function updateClassroomStudentClass(int $studentId, array $arrayData)
    {
        return ClassroomStudent::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->update($arrayData);
    }

    // update classroom student by student id
    public function updateClassroomStudentByStudentId(int $studentId, array $arrayData)
    {
        return ClassroomStudent::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereNull('academic_year_id_from', getAcademicYearId())
            ->whereNull('classroom_id_from')
            ->where('student_id', $studentId)
            ->update($arrayData);
    }

    public function getStudentByAdmissionNo($admissionNo = null)
    {
        if (empty($admissionNo)) {
            return null;
        }

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(!empty($admissionNo), function ($query) use ($admissionNo) {
                $query->where('admission_no', $admissionNo);
            })
            ->select('id', 'first_name', 'middle_name', 'last_name', 'classroom_id', 'admission_no')
            ->first();
    }

    public function getStudentByAdmissionNoAndClassroomId(string $admissionNo, int $classroomId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->where('admission_no', $admissionNo)
            ->select('id', 'admission_no')
            ->first();
    }


    public function getActiveAndInactiveStudentByAdmissionNo($admissionNo = null)
    {
        if (empty($admissionNo)) {
            return null;
        }

        return Student::whereIn('status', [Status::ACTIVE, Status::INACTIVE])
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(!empty($admissionNo), function ($query) use ($admissionNo) {
                $query->where('admission_no', $admissionNo);
            })
            ->select('id', 'first_name', 'middle_name', 'last_name', 'classroom_id', 'admission_no', 'status', 'class_name_id')
            ->first();
    }

    public function getStudentByAdmissionNoAndStudentId($admissionNo = null, $studentId = null, $schoolId = null, $academicYearId = null)
    {
        if (empty($admissionNo) && empty($studentId)) {
            return null;
        }

        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId);
            })
            ->when(!empty($admissionNo), function ($query) use ($admissionNo) {
                $query->where('admission_no', $admissionNo);
            })
            ->when(empty($admissionNo) && !empty($studentId), function ($query) use ($studentId) {
                $query->where('id', $studentId);
            })
            ->first();
    }

    public function getAllTcStudent()
    {
        return Student::where('prev_school_tc_no', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'first_name as title')
            ->get();
    }

    public function getActiveStudentFielter($classID)
    {
        return Student::where('status', 'Active')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('students.classroom_id', $classID)
            ->with(['marks'])
            ->get();
    }

    public function getActiveAllStudent()
    {
        return Student::where('status', 'Active')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['marks'])
            ->get();
    }

    public function getSubjectWiseOverallFielter($classId, $examId, $subjectId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('marks', function ($query) use ($classId, $examId, $subjectId) {
                $query->where('classroom_id', $classId);
                // ->where('exam_id', $examId)
                // ->where('subject_id', $subjectId);
            })
            ->with(['marks'])
            ->get();
    }

    public function getSubjectWiseOverall()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['marks'])
            ->get();
    }


    public function getCurrentSessionStudentsAll()
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->get();
    }

    public function checkNewStudentExists(array $classroomIds = [], int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('student_status', StudentStatus::NEW->value)
            ->whereHas('classroomPromotedStudents', function ($query) use ($academicYearId, $classroomIds) {
                $query->where('classroom_students.academic_year_id', $academicYearId);

                if (!empty($classroomIds)) {
                    $query->whereIn('classroom_students.classroom_id', $classroomIds);
                }
            })
            ->exists();
    }


    public function getStudentHavingNoDueByIdsOld($ids = [], $fromFeeId = "", $toFeeId = "", $examId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('id', $ids)
            ->where(function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereHas('classroom_fee_student_amounts', function ($query) use ($fromFeeId, $toFeeId) {
                    $query->when(!empty($fromFeeId) && !empty($toFeeId), function ($query)  use ($fromFeeId, $toFeeId) {
                        $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                    })->whereHas('payment');
                })->orWhereDoesntHave('classroom_fee_student_amounts');
            })
            ->rightJoin('classroom_exam', function ($join) use ($examId) {
                $join->on('classroom_exam.classroom_id', '=', 'students.classroom_id')
                    ->where('exam_id', $examId);
            })
            ->with(['classroom_fee_student_amounts' => function ($query) use ($fromFeeId, $toFeeId) {
                $query->when(!empty($fromFeeId) && !empty($toFeeId), function ($query)  use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                })->with(['payment', 'nullify_fee']);
            }])
            ->get();
    }

    public function getStudentHavingNoDueByIds(array $ids = [], int $fromFeeId = null, int $toFeeId = null)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereHas('classroom_fee_student_amounts', function ($query) use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId])
                        ->whereHas('payment', function ($query) {
                            $query->where('payment_status', PaymentStatus::PAID->value);
                        });
                })->orWhereDoesntHave('classroom_fee_student_amounts');
            })
            ->with(['classroom_fee_student_amounts' => function ($query) use ($fromFeeId, $toFeeId) {
                $query->when(!empty($fromFeeId) && !empty($toFeeId), function ($query)  use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                })->with(['payment', 'nullify_fee']);
            }])
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'phone',
            )
            ->get();
    }


    public function getStudentHavingNoDueByClassroomIdOld($classroomId, $fromFeeId = "", $toFeeId = "", $examId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('students.classroom_id', $classroomId)
            ->where(function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereHas('classroom_fee_student_amounts', function ($query) use ($fromFeeId, $toFeeId) {
                    $query->when(!empty($fromFeeId) && !empty($toFeeId), function ($query)  use ($fromFeeId, $toFeeId) {
                        $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                    })->whereHas('payment');
                })->orWhereDoesntHave('classroom_fee_student_amounts');
            })
            ->rightJoin('classroom_exam', function ($join) use ($examId) {
                $join->on('classroom_exam.classroom_id', '=', 'students.classroom_id')
                    ->where('exam_id', $examId);
            })
            ->with(['classroom_fee_student_amounts' => function ($query) use ($fromFeeId, $toFeeId) {
                $query->when(!empty($fromFeeId) && !empty($toFeeId), function ($query)  use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                })->with(['payment', 'nullify_fee']);
            }])
            ->get();
    }


    public function getStudentHavingNoDueByClassroomId(int $classroomId, int $fromFeeId = null, int $toFeeId = null)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->when(!empty($fromFeeId) && !empty($toFeeId), function ($query) use ($fromFeeId, $toFeeId) {
                $query->whereHas('classroom_fee_student_amounts', function ($query) use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId])
                        ->whereHas('payment', function ($query) {
                            $query->where('payment_status', PaymentStatus::PAID->value);
                        });
                })->orWhereDoesntHave('classroom_fee_student_amounts');
            })
            ->with(['classroom_fee_student_amounts' => function ($query) use ($fromFeeId, $toFeeId) {
                $query->when(!empty($fromFeeId) && !empty($toFeeId), function ($query)  use ($fromFeeId, $toFeeId) {
                    $query->whereBetween('fee_id', [$fromFeeId, $toFeeId]);
                })->with(['payment', 'nullify_fee']);
            }])
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'phone',
            )
            ->get();
    }


    public function getStudentIdsByClassroomIds(array $classroomIds)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('classroom_id', $classroomIds)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();
    }

    public function getStudentByYearIdClassNameIdClassroomId($yearId, $classNameId, $classroomId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $yearId)
            ->where('class_name_id', $classNameId)
            ->where('classroom_id', $classroomId)
            ->select('id', 'class_name_id', 'classroom_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'academic_year_id')
            ->get();
    }

    public function filterStudents($admissionNo, $studentName, $fatherName, $fatherPhone, $motherName, $motherPhone)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(!empty($admissionNo), function ($query) use ($admissionNo) {
                $query->where('admission_no', 'LIKE', $admissionNo . '%');
            })
            ->when(!empty($studentName), function ($query) use ($studentName) {
                $query->where('first_name', 'LIKE', $studentName . '%')
                    ->orWhere('middle_name', 'LIKE', $studentName . '%')
                    ->orWhere('last_name', 'LIKE', $studentName . '%');
            })
            ->when(!empty($fatherName), function ($query) use ($fatherName) {
                $query->whereHas('father', function ($query) use ($fatherName) {
                    $query->where('first_name', 'LIKE', $fatherName . '%')
                        ->orWhere('middle_name', 'LIKE', $fatherName . '%')
                        ->orWhere('last_name', 'LIKE', $fatherName . '%');
                });
            })
            ->when(!empty($fatherPhone), function ($query) use ($fatherPhone) {
                $query->whereHas('father', function ($query) use ($fatherPhone) {
                    $query->where('phone', 'LIKE', $fatherPhone . '%');
                });
            })
            ->when(!empty($motherName), function ($query) use ($motherName) {
                $query->whereHas('mother', function ($query) use ($motherName) {
                    $query->where('first_name', 'LIKE', $motherName . '%')
                        ->orWhere('middle_name', 'LIKE', $motherName . '%')
                        ->orWhere('last_name', 'LIKE', $motherName . '%');
                });
            })
            ->when(!empty($motherPhone), function ($query) use ($motherPhone) {
                $query->whereHas('mother', function ($query) use ($motherPhone) {
                    $query->where('phone', 'LIKE', $motherPhone . '%');
                });
            })
            ->with(['father', 'mother', 'classroom', 'classroomRoll'])
            ->select(
                'id',
                'admission_no',
                'srn_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
            )
            ->get();
    }

    public function filterStudentsForSaleDuePayment(string $admissionNo = "", string $studentName = "", string $fatherName = "")
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(!empty($admissionNo), function ($query) use ($admissionNo) {
                $query->where('admission_no', 'LIKE', $admissionNo . '%');
            })
            ->when(!empty($studentName), function ($query) use ($studentName) {
                $query->where(function ($query) use ($studentName) {
                    $query->where('first_name', 'LIKE', $studentName . '%')
                        ->orWhere('middle_name', 'LIKE', $studentName . '%')
                        ->orWhere('last_name', 'LIKE', $studentName . '%');
                });
            })
            ->when(!empty($fatherName), function ($query) use ($fatherName) {
                $query->where(function ($query) use ($fatherName) {
                    $query->whereHas('father', function ($query) use ($fatherName) {
                        $query->where('first_name', 'LIKE', $fatherName . '%')
                            ->orWhere('middle_name', 'LIKE', $fatherName . '%')
                            ->orWhere('last_name', 'LIKE', $fatherName . '%');
                    });
                });
            })
            ->with([
                'father:id,student_id,first_name,middle_name,last_name,guardian_type,phone',
                'classroom',
                'promotedClassroom',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                }
            ])
            ->select(
                'id',
                'admission_no',
                'srn_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
            )
            ->get();
    }

    public function filterSiblingStudents($admissionNo, $studentFirstName, $fatherFirstName, $fatherPhone)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->when(!empty($admissionNo), function ($query) use ($admissionNo) {
                $query->where('admission_no', 'LIKE', $admissionNo . '%');
            })
            ->when(!empty($studentFirstName), function ($query) use ($studentFirstName) {
                $query->where('first_name', 'LIKE', $studentFirstName . '%');
            })
            ->whereHas('father', function ($query) use ($fatherFirstName, $fatherPhone) {
                $query->when(!empty($fatherFirstName), function ($query) use ($fatherFirstName) {
                    $query->where('first_name', 'LIKE', $fatherFirstName . '%');
                })->when(!empty($fatherPhone), function ($query) use ($fatherPhone) {
                    $query->where('phone', 'LIKE', $fatherPhone . '%');
                });
            })
            ->with(['father', 'classroom', 'promotedClassroom', 'classroomRoll' => function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            }])
            ->select(
                'id',
                'admission_no',
                'srn_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
            )
            ->get();
    }

    public function getAllByClassroomAndStatus(int $classroomId, $studentStatus, int $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return Student::where('school_id', getUserSchoolId())
            ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                $query->where('status', $studentStatus);
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->select('id', 'classroom_id', 'employment_cat_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'present_address', 'present_city')
            ->with([
                'father:id,student_id,first_name,middle_name,last_name,phone',
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId)
                        ->select(
                            'id',
                            'classroom_id',
                            'student_id',
                            'roll_no'
                        );
                },
                'classroom:id,title',
                'promotedClassroom',
                'employment_category:id,title'
            ])
            ->get();
    }


    public function getByIdAndStatus(int $studentId, $studentStatus)
    {
        return Student::where('school_id', getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->where('id', $studentId)
            ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                $query->where('status', $studentStatus);
            })
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->select('id', 'classroom_id', 'employment_cat_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'present_address', 'present_city')
            ->with([
                'father:id,student_id,first_name,middle_name,last_name,phone',
                'classroomRoll:id,student_id,roll_no',
                'classroom:id,title',
                'employment_category:id,title'
            ])
            ->first();
    }

    public function getStudentByIdAndStatus(int $studentId, string $studentStatus = "")
    {
        return Student::where('school_id', getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->where('id', $studentId)
            ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                if ($studentStatus == "Tc") {
                    $query->whereHas('studentTransferCertificate')
                        ->where('students.status', Status::INACTIVE);
                } else {
                    $query->whereDoesntHave('studentTransferCertificate')
                        ->where('students.status', $studentStatus);
                }
                // $query->where('status', $studentStatus);
            })
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->select('id', 'classroom_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'present_address', 'present_city', 'student_status')
            ->with([
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,email',
                'classroom:id,title',
            ])
            ->first();
    }

    public function getByStudentId(int $studentId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $studentId)
            ->first();
    }


    public function getEwsReportData($classroomId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_economically_weaker', true)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());

                if (!empty($classroomId) && $classroomId != 'all_class') {
                    $query->where('classroom_students.classroom_id', $classroomId);
                }
            })
            ->select(
                'id',
                'classroom_id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'birth_date_at',
            )
            ->with([
                'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_rolls.academic_year_id', getAcademicYearId());

                    if (!empty($classroomId) && $classroomId != 'all_class') {
                        $query->where('classroom_rolls.classroom_id', $classroomId);
                    }
                },
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
            ])
            ->get();
    }


    public function getByClassroomIds(array $ids)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($ids) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->whereIn('classroom_students.classroom_id', $ids);
            })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->leftJoin('guardians as mother', function ($join) {
                $join->on('students.id', '=', 'mother.student_id')
                    ->where('mother.guardian_type', GuardianType::MOTHER);
            })
            ->leftJoin('guardians as guardian', function ($join) {
                $join->on('students.id', '=', 'guardian.student_id')
                    ->where('guardian.guardian_type', GuardianType::GUARDIAN);
            })
            ->leftJoin('student_categories', 'students.id', '=', 'student_categories.student_id')
            ->leftJoin('categories', 'categories.id', '=', 'student_categories.category_id')
            ->leftJoin('student_houses', 'students.id', '=', 'student_houses.student_id')
            ->leftJoin('houses', 'houses.id', '=', 'student_houses.house_id')
            ->leftJoin('bank_accounts', 'bank_accounts.student_id', '=', 'students.id')
            ->leftJoin('banks', 'banks.id', '=', 'bank_accounts.bank_id')
            ->groupBy(
                'students.id',
                'students.classroom_id',
                // 'class_names.title',
                // 'classrooms.section_title',
                // 'classroom_rolls.roll_no',
                'father.first_name',
                'father.middle_name',
                'father.user_id',
                'father.last_name',
                'father.phone',
                'father.sms_phone',
                'father.email',
                'father.highest_qualification',
                'father.occupation',
                'father.company_name',
                'father.designation',
                'father.aadhar_card_no',
                'mother.first_name',
                'mother.middle_name',
                'mother.last_name',
                'mother.aadhar_card_no',
                'guardian.first_name',
                'guardian.middle_name',
                'guardian.last_name',
                'guardian_name',
                'guardian.relation',
                'guardian.highest_qualification',
                'guardian.occupation',
                'guardian.designation',
                'guardian.department',
                'guardian.office_address',
                'guardian.phone',
                'categories.title',
                'houses.name',
                // 'student_houses.house_id',
                'banks.name',
                // 'bank_accounts.bank_id',
                'bank_accounts.account_no',
                'bank_accounts.ifsc_code',
                'bank_accounts.micr_no',
                'bank_accounts.branch_name'
            )
            ->select(
                'students.id',
                'students.id as student_id',
                'students.classroom_id',
                // 'students.class_name_id as class',
                // 'students.classroom_id as section',
                'students.employment_cat_id as employment_category',
                'students.admission_no',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'students.present_address as address',
                'students.gender',
                'students.aadhar_card_no',
                'students.blood_group',
                'students.religion',
                'students.child_id',
                'students.samagra_id',
                'students.caste',
                'students.admission_class',
                'students.mother_tongue',
                'students.admission_date_at as doa',
                'students.birth_date_at as dob',
                'students.height as student_height',
                'students.weight as student_weight',
                'students.created_at',
                // 'class_names.title as class',
                // 'classrooms.section_title as section',
                // 'classroom_rolls.roll_no as roll_number',
                'father.first_name as father_first_name',
                'father.user_id as father_user_id',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_phone',
                'father.sms_phone as sms_no',
                'father.email as father_email',
                'father.highest_qualification as father_qualification',
                'father.occupation as father_occupation',
                'father.company_name as father_company',
                'father.designation as father_designation',
                'father.aadhar_card_no as father_aadhar',
                'mother.first_name as mother_first_name',
                'mother.middle_name as mother_middle_name',
                'mother.last_name as mother_last_name',
                'mother.aadhar_card_no as mother_aadhar',
                DB::raw("CONCAT(guardian.first_name, ' ', guardian.middle_name, ' ', guardian.last_name) as guardian_name"),
                'guardian.relation as guardian_relation',
                'guardian.highest_qualification as guardian_qualification',
                'guardian.occupation as guardian_occupation',
                'guardian.designation as guardian_designation',
                'guardian.department as guardian_department',
                'guardian.office_address as guardian_office_address',
                'guardian.phone as guardian_contact_no',
                'categories.title as category',
                'houses.name as house',
                // 'student_houses.house_id as house_id',
                'banks.name as bank',
                // 'bank_accounts.bank_id as bank_id',
                'bank_accounts.account_no as account_number',
                'bank_accounts.ifsc_code as ifsc',
                'bank_accounts.micr_no as micr',
                'bank_accounts.branch_name as branch_name'
            )
            ->get();
    }

    public function getByClassroomIdsAndAcademicYearIdAndStatus(array $classroomIds, int $academicYearId, string $status = '')
    {
        return Student::where('students.school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->leftJoin('guardians as mother', function ($join) {
                $join->on('students.id', '=', 'mother.student_id')
                    ->where('mother.guardian_type', GuardianType::MOTHER);
            })
            ->leftJoin('student_categories', 'students.id', '=', 'student_categories.student_id')
            ->leftJoin('categories', 'categories.id', '=', 'student_categories.category_id')
            ->leftJoin('student_houses', 'students.id', '=', 'student_houses.student_id')
            ->leftJoin('houses', 'houses.id', '=', 'student_houses.house_id')
            ->leftJoin('bank_accounts', 'bank_accounts.student_id', '=', 'students.id')
            ->leftJoin('banks', 'banks.id', '=', 'bank_accounts.bank_id')
            ->groupBy(
                'students.id',
                'students.classroom_id',
                'father.first_name',
                'father.middle_name',
                'father.last_name',
                'father.phone',
                'father.sms_phone',
                'father.email',
                'father.highest_qualification',
                'father.occupation',
                'father.company_name',
                'father.income_per_year',
                'father.designation',
                'father.pan_card_no',
                'father.aadhar_card_no',
                'father.office_address',
                'mother.first_name',
                'mother.middle_name',
                'mother.last_name',
                'mother.phone',
                'mother.email',
                'mother.highest_qualification',
                'mother.occupation',
                'mother.company_name',
                'mother.income_per_year',
                'mother.designation',
                'mother.pan_card_no',
                'mother.office_address',
                'mother.aadhar_card_no',
                'categories.title',
                'houses.name',
                'banks.name',
                'bank_accounts.account_no',
                'bank_accounts.ifsc_code',
            )
            ->select(
                'students.id',
                'students.id as student_id',
                'students.classroom_id',
                'students.employment_cat_id',
                'students.admission_no as admission_number',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                DB::raw("CONCAT(students.first_name, ' ', students.middle_name, ' ', students.last_name) as student_name"),
                'students.admission_date_at as admission_date',
                'students.status',
                'students.gender',
                'students.birth_date_at as date_of_birth',
                'students.present_address as address',
                'students.present_city as city',
                'students.present_state as state',
                'students.permanent_address as permanent_address',
                'students.permanent_city as permanent_city',
                'students.permanent_state as permanent_state',
                'students.present_pin_code as pin',
                'students.permanent_pin_code as permanent_pin',
                'students.email',
                'students.srn_no',
                'students.boarding_type as student_type',
                'students.aadhar_card_no as student_aadhar_card_no',
                'students.blood_group',
                'students.religion',
                'students.child_id',
                'students.caste',
                'students.admission_class',
                'students.student_status',
                'students.samagra_id',
                'students.mother_tongue',
                'students.height as student_height',
                'students.weight as student_weight',
                'students.prev_school_tc_no as previous_tc_no',
                'students.prev_school_name as previous_school_name',
                'students.prev_school_class as previous_school_class',
                'students.prev_school_year as previous_school_year',
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                DB::raw("CONCAT(father.first_name, ' ', father.middle_name, ' ', father.last_name) as father_name"),
                'father.phone as father_phone',
                'father.sms_phone as sms_no',
                'father.email as father_email',
                'father.highest_qualification as father_qualification',
                'father.occupation as father_occupation',
                'father.company_name as father_company',
                'father.income_per_year as father_income_per_year',
                'father.designation as father_designation',
                'father.pan_card_no as father_pan_card',
                'father.aadhar_card_no as father_aadhar_card',
                'father.office_address as father_office_address',
                'mother.first_name as mother_first_name',
                'mother.middle_name as mother_middle_name',
                'mother.last_name as mother_last_name',
                DB::raw("CONCAT(mother.first_name, ' ', mother.middle_name, ' ', mother.last_name) as mother_name"),
                'mother.phone as mother_phone',
                'mother.email as mother_email',
                'mother.highest_qualification as mother_qualification',
                'mother.occupation as mother_occupation',
                'mother.company_name as mother_company',
                'mother.income_per_year as mother_income_per_year',
                'mother.designation as mother_designation',
                'mother.pan_card_no as mother_pan_card',
                'mother.aadhar_card_no as mother_aadhar_card',
                'mother.office_address as mother_office_address',
                'categories.title as category',
                'houses.name as house_name',
                'banks.name as bank_name',
                'bank_accounts.account_no as account_number',
                'bank_accounts.ifsc_code as ifsc',
            )
            ->get();
    }

    public function getSiblingByFatherInfo($studentId, $fatherName, $fatherEmail, $fatherPhone)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', '!=', $studentId)
            ->whereHas('father', function ($query) use ($fatherName, $fatherEmail, $fatherPhone) {
                $query->where('first_name', $fatherName)
                    ->where('email', $fatherEmail)
                    ->where('phone', $fatherPhone);
            })
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id'
            )
            ->with(['classroom:id,title', 'classroomRoll:id,student_id,roll_no'])
            ->get();
    }

    public function checkSiblingByFatherInfo($studentId, $fatherName, $fatherEmail, $fatherPhone, $status = "")
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    if ($status == Status::INACTIVE->value) {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == 'TC') {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else if ($status == Status::ACTIVE->value) {
                        $query->where('students.status', Status::ACTIVE);
                    }
                }
            })
            ->where('id', '!=', $studentId)
            ->whereHas('father', function ($query) use ($fatherName, $fatherEmail, $fatherPhone) {
                $query->where('first_name', $fatherName)
                    ->where('email', $fatherEmail)
                    ->where('phone', $fatherPhone);
            })
            ->exists();
    }


    public function getSiblingByStatusAndFatherInfo($studentId, $fatherName, $fatherEmail, $fatherPhone, $status)
    {
        return Student::where('school_id', getUserSchoolId())
            ->where('id', '!=', $studentId)
            ->where(function ($query) use ($status) {
                if (!empty($status)) {
                    $query->where('status', $status);
                }
            })
            ->whereHas('father', function ($query) use ($fatherName, $fatherEmail, $fatherPhone) {
                $query->where('first_name', $fatherName)
                    ->where('email', $fatherEmail)
                    ->where('phone', $fatherPhone);
            })
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id'
            )
            ->with(['classroom:id,title', 'classroomRoll:id,student_id,roll_no'])
            ->get();
    }


    public function getStudentById(int $id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('id', $id)
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'student_status',
                'birth_date_at',
            )
            ->with(['classroom:id,title', 'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone'])
            ->first();
    }

    public function getStudentByIds(array $ids)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereIn('id', $ids)
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->with(['father:user_id,student_id,guardian_type,first_name,middle_name,last_name,phone,email,sms_phone'])
            ->get();
    }

    public function getStudentByIdForChangeClass(int $id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('id', $id)
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
            )
            ->with(['promotedClassroom'])
            ->first();
    }

    public function getActiveAndInActiveStudentById(int $id)
    {
        return Student::whereIn('status', [Status::ACTIVE, Status::INACTIVE])
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('id', $id)
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'class_name_id',
                'first_name',
                'middle_name',
                'last_name',
                'student_status',
                'status',
            )
            ->with(['classroom:id,title', 'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone'])
            ->first();
    }

    public function getStudentByIdForPrint(int $id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('id', $id)
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date_at',
                'aadhar_card_no',
                'religion',
                'blood_group',
                'admission_date_at',
                'srn_no',
                'present_address',
                'present_state',
                'present_city',
                'present_pin_code',
                'prev_school_name',
                'prev_school_class',
                'prev_school_year',
                'prev_school_tc_no',
            )
            ->with(
                [
                    'studentImage',
                    'promotedClassroom',
                    'classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'classroomRoll' => function ($query) {
                        $query->where('academic_year_id', getAcademicYearId())
                            ->select('id', 'roll_no', 'student_id', 'classroom_id');
                    },
                    'student_category.category' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'religion_name' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'blood_group_name' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'father' => function ($query) {
                        $query->select('id', 'student_id', 'first_name', 'middle_name', 'last_name', 'email', 'phone', 'highest_qualification', 'occupation', 'income_per_year', 'designation', 'aadhar_card_no', 'pan_card_no', 'department', 'office_address');
                    },
                    'mother' => function ($query) {
                        $query->select('id', 'student_id', 'first_name', 'middle_name', 'last_name', 'email', 'phone', 'highest_qualification', 'occupation', 'income_per_year', 'designation', 'aadhar_card_no', 'pan_card_no', 'department', 'office_address');
                    },
                ]
            )
            ->first();
    }

    public function getInactiveStudentByIdForPrint(int $id)
    {
        return Student::where('status', Status::INACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('id', $id)
            ->whereDoesntHave('studentTransferCertificate')
            ->select(
                'id',
                'admission_no',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date_at',
                'aadhar_card_no',
                'religion',
                'blood_group',
                'admission_date_at',
                'srn_no',
                'present_address',
                'present_state',
                'present_city',
                'present_pin_code',
                'prev_school_name',
                'prev_school_class',
                'prev_school_year',
                'prev_school_tc_no',
            )
            ->with(
                [
                    'studentImage',
                    'classroom' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'promotedClassroom',
                    'classroomRoll' => function ($query) {
                        $query->where('academic_year_id', getAcademicYearId())
                            ->select('id', 'roll_no', 'student_id', 'classroom_id');
                    },
                    'student_category.category' => function ($query) {
                        $query->select('id', 'title');
                    },
                    'religion_name' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'blood_group_name' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'father' => function ($query) {
                        $query->select('id', 'student_id', 'first_name', 'middle_name', 'last_name', 'email', 'phone', 'highest_qualification', 'occupation', 'income_per_year', 'designation', 'aadhar_card_no', 'pan_card_no', 'department', 'office_address');
                    },
                    'mother' => function ($query) {
                        $query->select('id', 'student_id', 'first_name', 'middle_name', 'last_name', 'email', 'phone', 'highest_qualification', 'occupation', 'income_per_year', 'designation', 'aadhar_card_no', 'pan_card_no', 'department', 'office_address');
                    },
                ]
            )
            ->first();
    }

    public function getStudentDataById(int $id)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
            })
            ->where('id', $id)
            ->select(
                'id',
                'admission_no',
            )
            ->first();
    }


    public function getGuardianWiseReportStudents(
        $transportFeeStructureSetting,
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($studentStatus, $transportRouteId, $classroomId, $transportFeeStructureSetting) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                    if (!empty($classroomId)) {
                        $query->where('classroom_students.classroom_id', $classroomId);
                    }
                });

                if (!empty($studentStatus)) {
                    $query->where('status', $studentStatus)
                        ->whereDoesntHave('studentTransferCertificate');
                }

                if (!empty($transportRouteId)) {
                    $allocation_type = $transportFeeStructureSetting?->value ?? 'fee';

                    if ($allocation_type == 'fee') {
                        $query->whereHas('fee_allocate_transport', function ($query) use ($transportRouteId) {
                            $query->where('transport_route_id', $transportRouteId);
                        });
                    }

                    if ($allocation_type == 'voucher') {
                        $query->whereHas('voucher_allocate_transport', function ($query) use ($transportRouteId) {
                            $query->where('transport_route_id', $transportRouteId);
                        });
                    }
                }
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom'
            ])
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'classroom_id',
            )
            ->get();
    }

    public function getPreviousSessionStudentsByClassroomIdsAndAcademicYearId(array $classroomIds, int $previousAcademicYearId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds, $previousAcademicYearId) {
                $query->where('classroom_students.academic_year_id', $previousAcademicYearId)
                    ->whereIn('classroom_students.classroom_id', $classroomIds);
            })
            ->select(
                'id',
                'classroom_id',
                'class_name_id',
                'academic_year_id',
                'admission_no'
            )
            ->get();
    }

    public function checkStudentExists($admissionNo, $studentFirstName, $fatherFirstName, $fatherPhone)
    {
        return Student::where('school_id', getUserSchoolId())
            ->where(function ($query) use ($admissionNo, $studentFirstName, $fatherFirstName, $fatherPhone) {
                $query->where('admission_no', $admissionNo)
                    ->orWhere(function ($query) use ($admissionNo, $studentFirstName) {
                        $query->where('admission_no', $admissionNo)
                            ->where('first_name', $studentFirstName);
                    })
                    ->orWhere(function ($query) use ($admissionNo, $fatherFirstName, $fatherPhone) {
                        $query->where('admission_no', $admissionNo)
                            ->whereHas('father', function ($query) use ($fatherFirstName, $fatherPhone) {
                                $query->where('guardians.guardian_type', GuardianType::FATHER)
                                    ->where('guardians.first_name', $fatherFirstName)
                                    ->where('guardians.phone', $fatherPhone);
                            });
                    })
                    ->orWhere(function ($query) use ($admissionNo, $studentFirstName, $fatherFirstName, $fatherPhone) {
                        $query->where('admission_no', $admissionNo)
                            ->where('first_name', $studentFirstName)
                            ->whereHas('father', function ($query) use ($fatherFirstName, $fatherPhone) {
                                $query->where('guardians.guardian_type', GuardianType::FATHER)
                                    ->where('guardians.first_name', $fatherFirstName)
                                    ->where('guardians.phone', $fatherPhone);
                            });
                    });
            })
            ->exists();
    }

    public function getStudentsByParentUserId(int $userId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('father', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with([
                'student_category' => function ($query) {
                    $query->select(
                        'id',
                        'student_id',
                        'category_id',
                    )->with(['category:categories.id,categories.title']);
                },
                'student_house' => function ($query) {
                    $query->select(
                        'id',
                        'student_id',
                        'house_id',
                    )->with(['house:houses.id,houses.name']);
                },
                // 'classroomRoll' => function ($query) {
                //     $query->where('academic_year_id', getAcademicYearId())
                //         ->select(
                //             'id',
                //             'student_id',
                //             'roll_no',
                //         );
                // },
                'religion_name',
                'studentImage',
                'student_father_profile_image',
                'student_mother_profile_image',
                'student_guardian_profile_image',
                'classroom:id,title',
                'latestClassroomStudent.classroom:classrooms.id,classrooms.title',
            ])
            ->get();
    }

    // Exam Mark
    public function updateExamMarkClassroomData(int $studentId, $dataArray, $schoolId = null, $academicYearId = null)
    {
        return Mark::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->update($dataArray);
    }

    public function getBirthDateWiseStudents(string $birthDate = "", string $birthMonth = "")
    {
        $monthMap = [
            'jan' => 1,
            'feb' => 2,
            'mar' => 3,
            'apr' => 4,
            'may' => 5,
            'jun' => 6,
            'jul' => 7,
            'aug' => 8,
            'sep' => 9,
            'oct' => 10,
            'nov' => 11,
            'dec' => 12
        ];

        $month = $monthMap[strtolower($birthMonth)] ?? "";

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where(function ($query) use ($birthDate, $month) {
                if (empty($month)) {
                    $query->whereDate('birth_date_at', $birthDate);
                }

                if (empty($birthDate) || (!empty($birthDate) && !empty($month))) {
                    $query->whereMonth('birth_date_at', $month);
                }
            })
            ->with([
                'classroom:id,title',
                'promotedClassroom:classrooms.id,classrooms.title',
                'father:id,student_id,first_name,middle_name,last_name,phone,guardian_type'
            ])
            ->select(
                'id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'birth_date_at',
            )
            ->get();
    }

    public function getClassWiseOverallReport(int $classroomId)
    {
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', getUserSchoolId())
            ->join('classroom_students', function ($join) use ($classroomId) {
                $join->on('students.id', '=', 'classroom_students.student_id')
                    ->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->join('classroom_subjects', function ($join) use ($classroomId) {
                $join->on('classroom_students.classroom_id', '=', 'classroom_subjects.classroom_id')
                    ->where('classroom_subjects.academic_year_id', getAcademicYearId())
                    ->where('classroom_subjects.classroom_id', $classroomId);
            })
            ->join('marks', function ($join) use ($classroomId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.academic_year_id', getAcademicYearId())
                    ->where('marks.classroom_id', $classroomId);
            })
            ->leftJoin('exam_roasters', function ($join) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->on('marks.exam_id', '=', 'exam_roasters.exam_id')
                    ->where('exam_roasters.academic_year_id', getAcademicYearId());
            })
            ->select(
                'students.id as student_id',
                'marks.mark',
                'marks.exam_id',
                'marks.subject_id',
                'exam_roasters.full_mark',
            )
            ->get();
    }

    public function getSubjectWiseOverallReport(int $classroomId, int $subjectId, int $examId = null)
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
                    ->where('classroom_subjects.classroom_id', $classroomId)
                    ->where('classroom_subjects.subject_id', $subjectId);
            })
            ->join('marks', function ($join) use ($classroomId, $subjectId) {
                $join->on('students.id', '=', 'marks.student_id')
                    ->where('marks.academic_year_id', getAcademicYearId())
                    ->where('marks.classroom_id', $classroomId)
                    ->where('marks.subject_id', $subjectId);
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
                'marks.mark',
                'marks.exam_id',
                'marks.subject_id',
                'exam_roasters.full_mark',
            )
            ->get();
    }

    public function getStudentDocumentReports(int $classroomId, int $documentCategoryId)
    {
        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId())
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->with([
                'father' => function ($query) {
                    $query->select(
                        'id',
                        'student_id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'phone'
                    );
                },
                'studentDocuments' => function ($query) use ($documentCategoryId) {
                    $query->where('document_category_id', $documentCategoryId)
                        ->with(['file'])
                        ->select(
                            'id',
                            'student_id',
                            'document_name'
                        );
                }
            ])
            ->select(
                'id',
                'admission_no',
                'first_name',
                'middle_name',
                'last_name',
                'student_status'
            )
            ->get();
    }

    public function getStudentsByAssessmentClassroomIds($classroomIds, $assessmentId,  $schoolId = null, $academicYearId = null)
    {
        $academicYearId = ($academicYearId != null) ? $academicYearId : getAcademicYearId();
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();
        return Student::where('students.status', Status::ACTIVE)
            ->where('students.school_id', $schoolId)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->when($classroomIds, function ($q) use ($classroomIds) {
                        $q->whereIn('classroom_students.classroom_id', $classroomIds);
                    });
            })
            ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER->value)
                    ->limit(1);
            })
            ->leftJoin('guardians as mother', function ($join) {
                $join->on('students.id', '=', 'mother.student_id')
                    ->where('mother.guardian_type', GuardianType::MOTHER->value)
                    ->limit(1);
            })
            ->with(['studentImage', 'promotedClassroom' => function ($q) {
                $q->select('classrooms.title', 'classrooms.id');
            }])
            ->with(['classroomRoll' => function ($query) use ($classroomIds, $academicYearId) {
                $query->where('academic_year_id', $academicYearId);

                if (!empty($classroomId)) {
                    $query->where('classroom_id', $classroomIds);
                }
            }])
            ->with(['studentAssessment' => function ($query) use ($assessmentId, $schoolId, $academicYearId) {
                $query->where('assessment_id', $assessmentId)
                    ->where('academic_year_id', $academicYearId)
                    ->where('school_id', $schoolId)
                    ->select(
                        'student_id',
                        'assessment_id',
                        'mark'
                    );
            }])
            ->with(['studentAssessmentComment' => function ($query) use ($assessmentId, $schoolId, $academicYearId) {
                $query->where('assessment_id', $assessmentId)
                    ->where('academic_year_id', $academicYearId)
                    ->where('school_id', $schoolId);
            }])
            ->with(['homeworkStudentAssessmentComment' => function ($query) use ($assessmentId, $schoolId, $academicYearId) {
                $query->where('homework_id', $assessmentId)
                    ->where('academic_year_id', $academicYearId)
                    ->where('school_id', $schoolId);
            }])
            ->with(['classworkStudentAssessmentComment' => function ($query) use ($assessmentId, $schoolId, $academicYearId) {
                $query->where('classwork_id', $assessmentId)
                    ->where('academic_year_id', $academicYearId)
                    ->where('school_id', $schoolId);
            }])
            ->select(
                // Student
                'students.id',
                'students.classroom_id',
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.birth_date_at',
                'students.context',
                'students.notes',
                'students.student_status',
                // classroom
                'classrooms.title as classTitle',
                // father
                'father.first_name as fatherFirstName',
                'father.middle_name as fatherMiddleName',
                'father.last_name as fatherLastName',
                'father.sms_phone as smsPhone',
                'father.phone as fatherPhone',
                // mother
                'mother.first_name as motherFirstName',
                'mother.middle_name as motherMiddleName',
                'mother.last_name as motherLastName',
                // 'classroom_rolls.roll_no',
                // 'classroom_rolls.id as classroom_roll_id'
                //student_assessments
                // 'student_assessments.mark as assessment_mark',
            )
            ->get();
    }

    public function getStudentByAdmissionNoAndFatherPhone(string $admissionNo, string $fatherPhone, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('admission_no', $admissionNo)
            ->whereHas('father', function ($query) use ($fatherPhone) {
                $query->where('phone', $fatherPhone);
            })
            ->with([
                'classroom:id,title',
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,email'
            ])
            ->select(
                'id',
                'academic_year_id',
                'admission_no',
                'class_name_id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->first();
    }

    public function getStudentByUserId(int $userId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('user_id', $userId)
            ->with([
                'classroom:id,title',
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,email'
            ])
            ->select(
                'id',
                'academic_year_id',
                'admission_no',
                'class_name_id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->first();
    }

    // student wallet transaction
    public function createStudentWalletTransaction(array $arrayData)
    {
        return StudentWalletTransaction::create($arrayData);
    }

    // getStudentByNameAndFatherPhone
    public function getStudentByNameAndFatherPhone(string $studentName = null, string $fatherPhone = null, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where(DB::raw("TRIM(CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', COALESCE(last_name, '')))"), '=', $studentName)
            ->whereHas('father', function ($query) use ($fatherPhone) {
                $query->where('phone', $fatherPhone);
            })
            ->with([
                'classroom:id,title',
                'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone,email'
            ])
            ->select(
                'id',
                'academic_year_id',
                'admission_no',
                'class_name_id',
                'classroom_id',
                'first_name',
                'middle_name',
                'last_name',
                'birth_date_at',

            )
            ->first();
    }
}
