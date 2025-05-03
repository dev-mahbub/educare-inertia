<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Student;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Models\StudentFeeVoucher;
use App\Repositories\IStudentFeeVoucherRepository;

class StudentFeeVoucherRepository implements IRepository, IStudentFeeVoucherRepository
{
    public function getAll()
    {
        return StudentFeeVoucher::all();
    }

    public function getById($id)
    {
        return StudentFeeVoucher::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return StudentFeeVoucher::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        StudentFeeVoucher::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentFeeVoucher::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentFeeVoucher::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getRegisterAll()
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE);
    }


    public function getActiveAllByStudentId($studentId)
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->get();
    }


    public function getFilteredData($classroomId = null, $studentId = null, $startDate = "", $endDate = "")
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('start_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('end_date', '<=', $endDate);
            })
            ->when(!empty($studentId), function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            })
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->whereHas('student', function ($query) use ($classroomId) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                });
            })
            ->get();
    }


    public function getFeeVouchersByStudentId(int $studentId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->orderBy('id', 'ASC')
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment', 'fee_payments']);
            }])
            ->get();
    }


    public function getHeadWiseDueFeeVouchers()
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }])
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function getStudentLedgerReportVouchers($classroomId, $studentId = null, $studentStatus = "")
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('student', function ($query) use ($classroomId, $studentId, $studentStatus) {
                $query->where(function ($query) use ($classroomId, $studentId) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $studentId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                        if (!empty($studentId)) {
                            $query->where('classroom_students.student_id', $studentId);
                        }
                    });
                });

                if (!empty($studentStatus)) {
                    if ($studentStatus == "Tc") {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', $studentStatus);
                    }
                }
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment', 'fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                }]);
            }, 'student' => function ($query) use ($classroomId) {
                $query->select(
                    'id',
                    'classroom_id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name'
                )->with([
                    'father:id,student_id,first_name,middle_name,last_name',
                    'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId)
                            ->select(
                                'id',
                                'student_id',
                                'roll_no',
                                'classroom_id',
                            );
                    },
                    'classroom:id,title',
                    'promotedClassroom',
                ]);
            }])
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function getClassroomInstallmentWiseDueFeeVouchers($classroomId, $studentStatus = "", $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus, $academicYearId) {
                $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->where('classroom_students.classroom_id', $classroomId);
                });

                $query->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                    $query->where('status', $studentStatus);
                });
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }, 'student' => function ($query) use ($classroomId) {
                $query->select(
                    'id',
                    'classroom_id',
                    'employment_cat_id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'present_address',
                    'present_city'
                )->with([
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
                ]);
            }])
            ->orderBy('id', 'ASC')
            ->get();
    }

    public function getActiveAllFeeVouchers(string $studentActiveStatus = "", int $classroomId = null)
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($studentActiveStatus) || !empty($classroomId), function ($query) use ($studentActiveStatus, $classroomId) {
                $query->whereHas('student', function ($query) use ($studentActiveStatus, $classroomId) {
                    if (!empty($classroomId)) {
                        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                            $query->where('classroom_students.academic_year_id', getAcademicYearId())
                                ->where('classroom_students.classroom_id', $classroomId);
                        });
                    }

                    if (!empty($studentActiveStatus)) {
                        $query->where('status', $studentActiveStatus);
                    }
                });
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment', 'fee_payments']);
            }, 'student' => function ($query) {
                $query->select('id', 'classroom_id')
                    ->with(['classroom:id,title', 'promotedClassroom']);
            }])
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function getFeeVouchersByClassroomIdAndFeeCategoryId(int $feeCategoryId = null, int $classroomId = null)
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) use ($feeCategoryId, $classroomId) {
                if (!empty($feeCategoryId)) {
                    $query->wherehas('feeTypeAmounts.feeType', function ($query) use ($feeCategoryId) {
                        $query->where('category_id', $feeCategoryId);
                    });
                }

                if (!empty($classroomId)) {
                    $query->wherehas('student', function ($query) use ($classroomId) {
                        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                            $query->where('classroom_students.academic_year_id', getAcademicYearId())
                                ->where('classroom_students.classroom_id', $classroomId);
                        });
                    });
                }
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['payment', 'fee_payments']);
            }])
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function getGuardianWiseFeeVouchers(
        $transportFeeStructureSetting,
        string $paymentStatus = "",
        string $studentStatus = "",
        int $transportRouteId = null,
        int $classroomId = null
    ) {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($paymentStatus), function ($query) use ($paymentStatus) {
                $query;
            })
            ->wherehas('feeTypeAmounts', function ($query) use ($paymentStatus) {
                if ($paymentStatus == PaymentStatus::PAID->value) {
                    $query->whereHas('fee_payments', function ($query) {
                        $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                    });
                }

                if ($paymentStatus == PaymentStatus::DUE->value) {
                    $query->whereDoesntHave('payment');
                }
            })
            ->whereHas('student', function ($query) use ($studentStatus, $transportRouteId, $classroomId, $transportFeeStructureSetting) {
                if (!empty($studentStatus)) {
                    $query->where('status', $studentStatus)
                        ->whereDoesntHave('studentTransferCertificate');
                }

                if (!empty($classroomId)) {
                    $query->where(function ($query) use ($classroomId) {
                        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                            $query->where('classroom_students.academic_year_id', getAcademicYearId())
                                ->where('classroom_students.classroom_id', $classroomId);
                        });
                    });
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
            ->select(
                'id',
                'student_id',
                'title'
            )
            ->with([
                'student' => function ($query) {
                    $query->select(
                        'students.id',
                        'students.admission_no',
                        'students.classroom_id',
                        'students.first_name',
                        'students.middle_name',
                        'students.last_name',
                        'students.present_address'
                    )->with([
                        'classroom:id,title',
                        'promotedClassroom'
                        // 'classroomRoll:id,student_id,roll_no',
                        // 'due_follow_ups:id,student_id,created_by,due_amount,note,call_picked,commitment_date,created_at'
                    ]);
                },
                'feeTypeAmounts' => function ($query) {
                    $query->with(['payment', 'fee_payments' => function ($query) {
                        $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value);
                    }]);
                },
            ])
            ->get();
    }


    public function getStudentInstallmentWiseDueFeeVouchers($studentId, $studentStatus = "")
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->whereHas('student', function ($query) use ($studentId, $studentStatus) {
                $query->where('id', $studentId)
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        $query->where('status', $studentStatus);
                    });
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }, 'student' => function ($query) {
                $query->select('id', 'classroom_id', 'employment_cat_id', 'admission_no', 'first_name', 'middle_name', 'last_name', 'present_address', 'present_city')
                    ->with([
                        'father:id,student_id,first_name,middle_name,last_name,phone',
                        'classroomRoll:id,student_id,roll_no',
                        'classroom:id,title',
                        'employment_category:id,title'
                    ]);
            }])
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function getAllDueVouchers($classroomId = null, $studentStatus = "", $studentActiveStatus = "", $employmentCategoryId = null)
    {
        return StudentFeeVoucher::where('student_fee_vouchers.status', Status::ACTIVE)
            ->where('student_fee_vouchers.school_id', getUserSchoolId())
            ->where('student_fee_vouchers.academic_year_id', getAcademicYearId())
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus, $studentActiveStatus, $employmentCategoryId) {
                $query->where(function ($query) use ($classroomId) {
                    $query->where(function ($query) use ($classroomId) {
                        $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                            $query->where('classroom_students.academic_year_id', getAcademicYearId())
                                ->where('classroom_students.classroom_id', $classroomId);
                        });
                    });
                })->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                    if ($studentStatus == StudentStatus::PROMOTED) {
                        $query->whereNot('students.student_status', StudentStatus::NEW);
                    } else {
                        $query->where('students.student_status', $studentStatus);
                    }
                })->when(!empty($studentActiveStatus), function ($query) use ($studentActiveStatus) {
                    $query->where('students.status', $studentActiveStatus);
                })->when(!empty($employmentCategoryId), function ($query) use ($employmentCategoryId) {
                    $query->where('students.employment_cat_id', $employmentCategoryId);
                });
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }, 'father', 'mother',  'classroom', 'student' => function ($query) {
                $query->with(['due_follow_ups', 'promotedClassroom', 'employment_category'])
                    ->select(
                        'id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'present_address',
                        'classroom_id',
                        'employment_cat_id'
                    );
            }])
            ->get();
    }


    public function getStudentHeadWiseAllVouchers($classroomId = null, $studentStatus = "")
    {
        return StudentFeeVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereHas('feeTypeAmounts')
            ->whereHas('student', function ($query) use ($classroomId, $studentStatus) {
                // $query->when(!empty($classroomId), function ($query) use ($classroomId) {
                //     $query->where('classroom_id', $classroomId);
                // })->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                //         $query->where('status', $studentStatus);
                //     });
                if (!empty($classroomId)) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                }

                if (!empty($studentStatus)) {
                    if ($studentStatus == "Tc") {
                        $query->whereHas('studentTransferCertificate')
                            ->where('students.status', Status::INACTIVE);
                    } else {
                        $query->whereDoesntHave('studentTransferCertificate')
                            ->where('students.status', $studentStatus);
                    }
                }
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment', 'fee_payments' => function ($query) {
                    $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                }]);
            }, 'student' => function ($query) use ($classroomId) {
                $query->select(
                    'students.id',
                    'students.admission_no',
                    'students.first_name',
                    'students.middle_name',
                    'students.last_name',
                    'students.classroom_id',
                    'students.status'
                )->with([
                    'classroom:id,title',
                    'promotedClassroom',
                    'studentTransferCertificate:id,student_id,is_draft,is_generated',
                    'father:id,student_id,first_name,middle_name,last_name,phone',
                    'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('academic_year_id', getAcademicYearId());

                        if (!empty($classroomId)) {
                            $query->where('classroom_id', $classroomId);
                        }
                    }
                ]);
            }])
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

    public function getStudentsByClassroomId(int $classroomId, int $academicYearId = null)
    {
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Student::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId, $academicYearId) {
                $query->where('classroom_students.academic_year_id', $academicYearId)
                    ->where('classroom_students.classroom_id', $classroomId);
            })
            ->get();
    }


    public function getAllDueVouchersByClassroomIds($classroomIds = [], $studentStatus = "", $studentActiveStatus = "", $schoolId = null, $academicYearId = null)
    {
        $students = $this->getStudentsByClassroomIds($classroomIds);

        if ($students->count() > 0) {
            $studentIds = $students->pluck('id')->toArray();
        }

        return StudentFeeVoucher::where('student_fee_vouchers.status', Status::ACTIVE)
            ->where('student_fee_vouchers.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('student_fee_vouchers.academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->rightJoin('students', function ($join) use ($classroomIds, $studentStatus, $studentActiveStatus, $studentIds) {
                $join->on('students.id', '=', 'student_fee_vouchers.student_id')
                    ->when(count($classroomIds) > 0, function ($query) use ($classroomIds, $studentIds) {
                        // $query->whereIn('students.classroom_id', $classroomIds);
                        $query->whereIn('students.id', $studentIds);
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
            ->select('student_fee_vouchers.*')
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }, 'student', 'father', 'classroom', 'student.due_follow_ups', 'student.promotedClassroom'])
            ->get();
    }


    public function getStudentDueReportVouchers(int $classroomId, $studentStatus = "", $academicYearId = null)
    {
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $students = $this->getStudentsByClassroomId($classroomId, $academicYearId);

        $studentIds = [];

        if ($students->count() > 0) {
            $studentIds = $students->pluck('id')->toArray();
        }

        return StudentFeeVoucher::where('student_fee_vouchers.status', Status::ACTIVE)
            ->where('student_fee_vouchers.school_id',  getUserSchoolId())
            ->where('student_fee_vouchers.academic_year_id', $academicYearId)
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->rightJoin('students', function ($join) use ($studentStatus, $studentIds) {
                $join->on('students.id', '=', 'student_fee_vouchers.student_id')
                    ->when(!empty($studentIds), function ($query) use ($studentIds) {
                        $query->whereIn('students.id', $studentIds);
                    })
                    ->when(!empty($studentStatus), function ($query) use ($studentStatus) {
                        $query->where('students.status', $studentStatus);
                    });
            })
            ->select('student_fee_vouchers.*')
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }, 'student', 'father', 'classroom', 'student.promotedClassroom'])
            ->get();
    }


    public function getAllDueVouchersByStudentId($studentId)
    {
        return StudentFeeVoucher::where('student_fee_vouchers.status', Status::ACTIVE)
            ->where('student_fee_vouchers.school_id', getUserSchoolId())
            ->where('student_fee_vouchers.academic_year_id', getAcademicYearId())
            ->whereHas('feeTypeAmounts', function ($query) {
                $query->whereDoesntHave('payment', function ($query) {
                    $query->where('payment_status', PaymentStatus::PAID->value);
                });
            })
            ->rightJoin('students', function ($join) use ($studentId) {
                $join->on('students.id', '=', 'student_fee_vouchers.student_id')
                    ->where('students.id', $studentId);
            })
            ->with(['feeTypeAmounts' => function ($query) {
                $query->with(['feeType', 'payment']);
            }])
            ->get();
    }
}
