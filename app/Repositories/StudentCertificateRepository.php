<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Image;
use App\Models\Classroom;
use App\Enums\GuardianType;
use App\Enums\CertificateType;
use App\Enums\IdCardAudienceType;
use App\Models\IdCardCertificate;
use App\Models\StudentCertificate;

class StudentCertificateRepository implements IRepository, IStudentCertificateRepository
{
    public function getAll()
    {
        return StudentCertificate::latest()->get();
    }

    public function getActiveAll()
    {
        return StudentCertificate::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getActiveAllBonafideCharacter()
    {
        return StudentCertificate::where('status', Status::ACTIVE)
            ->where('certificate_type', '=', CertificateType::BONAFIDE_CERTIFICATE->value)
            ->orWhere('certificate_type', '=', CertificateType::CHARACTER_CERTIFICATE->value)
            ->latest()
            ->get();
    }

    public function getActiveAllBonafideCharacterSearch($searchValue)
    {
        $query = StudentCertificate::query();
        $query->where('status', Status::ACTIVE)
            ->with(['studentData', 'classroomData'])
            ->where('certificate_type', '=', CertificateType::BONAFIDE_CERTIFICATE->value)
            ->orWhere('certificate_type', '=', CertificateType::CHARACTER_CERTIFICATE->value);
        if (!empty($searchValue)) {
            $query->where(function ($q) use ($searchValue) {
                $q->whereHas('studentData', function ($sq) use ($searchValue) {
                    $sq->where('first_name', 'like', '%' . $searchValue . '%');
                    $sq->orWhere('middle_name', 'like', '%' . $searchValue . '%');
                    $sq->orWhere('last_name', 'like', '%' . $searchValue . '%');
                    $sq->orWhere('admission_no', 'like', '%' . $searchValue . '%');
                });
                $q->orWhereHas('classroomData', function ($cq) use ($searchValue) {
                    $cq->where('title', 'like', '%' . $searchValue . '%');
                });
            });
        }

        return $query->latest()->get();
    }

    public function getById($id)
    {
        return StudentCertificate::findOrFail($id);
    }

    public function getClassroomWithStudentCertificate()
    {
        $classroom = Classroom::withCount('studentCertificates')
            ->where('academic_year_id', getAcademicYearId())
            ->having('student_certificates_count', '>', 0)
            ->distinct()
            ->get();

        $classroomData = $classroom->map(function ($className) {
            return [
                'id' => $className->id,
                'title' => $className->title,
                'certificate_count' => $className->student_certificates_count,
            ];
        });

        return $classroomData->values();
    }


    public function getByStudentIdClassroomId($studentId,  $classroomId)
    {
        return StudentCertificate::where('student_id', $studentId)
            ->where('classroom_id', $classroomId)
            ->first();
    }

    public function getByStudentIdsClassroomId($studentIds, $classroomId)
    {
        return StudentCertificate::whereIn('student_id', $studentIds)
            ->where('classroom_id', $classroomId)
            ->get();
    }

    public function checkDraft($studentId,  $classroomId)
    {
        return StudentCertificate::where('student_id', $studentId)
            ->where('classroom_id', $classroomId)
            ->where(function ($query) {
                $query->where('is_draft', 1)
                    ->orWhere('is_generated', 1);
            })
            ->first();
    }

    public function checkBulkDraft($studentIds,  $classroomId)
    {
        return StudentCertificate::whereIn('student_id', $studentIds)
            ->where('classroom_id', $classroomId)
            ->where(function ($query) {
                $query->where('is_draft', 1)
                    ->orWhere('is_generated', 1);
            })
            ->get();
    }

    public function delete($id)
    {
        StudentCertificate::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentCertificate::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentCertificate::whereId($id)->update($arrayData);
    }

    // get generated tc list
    public function getGeneratedTc($searchValue, $academicYearId, $status, $classroomId)
    {
        $query = StudentCertificate::query();
        $query->where('student_certificates.school_id', getUserSchoolId())
            // old code
            // ->where('classrooms.academic_year_id', '=', getAcademicYearId())
            ->where('student_certificates.is_generated', '=', 1)
            ->where('student_certificates.certificate_type', '=', CertificateType::TRANSFER_CERTIFICATE)
            ->leftJoin('classrooms', 'classrooms.id', '=', 'student_certificates.classroom_id')
            ->leftJoin('students', 'students.id', '=', 'student_certificates.student_id')
            ->leftJoin('classroom_rolls', function ($join) {
                $join->on('students.id', '=', 'classroom_rolls.student_id')
                    // new code
                    ->on('classroom_rolls.academic_year_id', 'student_certificates.academic_year_id');
            })
            ->leftJoin('guardians as father', function ($join) {
                $join->on('students.id', '=', 'father.student_id')
                    ->where('father.guardian_type', GuardianType::FATHER);
            })
            ->select(
                'student_certificates.*',
                // student
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.status_date_at',
                'students.reason',
                // father
                'father.first_name as father_first_name',
                'father.middle_name as father_middle_name',
                'father.last_name as father_last_name',
                'father.phone as father_phone',
                // classroom
                'classroom_rolls.roll_no',
                'classrooms.title as classroom_title',
            );

        $query->where(function ($subQuery) use ($searchValue, $academicYearId, $status, $classroomId) {
            if (!empty($searchValue)) {
                $subQuery->where(function ($innerSubQuery) use ($searchValue) {
                    $innerSubQuery->where('students.first_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('students.middle_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('students.last_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('students.admission_no', 'like', '%' . $searchValue . '%')
                        ->orWhere('father.first_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('father.middle_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('father.last_name', 'like', '%' . $searchValue . '%')
                        ->orWhere('classroom_rolls.roll_no', 'like', '%' . $searchValue . '%')
                        ->orWhere('classrooms.title', 'like', '%' . $searchValue . '%');
                });
            }
            if (!empty($academicYearId)) {
                // old code
                // $subQuery->where('classrooms.academic_year_id', '=', $academicYearId);
                // new code
                $subQuery->where('student_certificates.academic_year_id', '=', $academicYearId);
            }
            if (!empty($status)) {
                $subQuery->where('student_certificates.status', '=', $status);
            }
            if (!empty($classroomId)) {
                $subQuery->where('student_certificates.classroom_id', '=', $classroomId);
            }
        });

        return $query->get();
    }

    public function getTcSummary()
    {
        return Classroom::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->withCount(['students2 as students_count', 'studentGenerateTc', 'studentDraftTc'])
            ->get()
            ->toArray();
    }

    public function getTcSummaryOld()
    {
        return Classroom::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->withCount(['students' => function ($query) {
                $query->where(function ($query) {
                    $query->whereHas('classroomPromotedStudents', function ($query) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId());
                    })
                        ->where('students.status', Status::ACTIVE);
                });
            }, 'studentGenerateTc', 'studentDraftTc'])
            ->get()
            ->toArray();
    }

    public function getTcByClassroomId($classroomId, $isDraft = false, $isGenerated = false)
    {
        $query = StudentCertificate::query();
        $query->where('student_certificates.school_id', getUserSchoolId())
            ->where('student_certificates.is_draft', $isDraft)
            ->where('student_certificates.is_generated', $isGenerated)
            ->where('classrooms.academic_year_id', '=', getAcademicYearId())
            ->where('student_certificates.classroom_id', '=', $classroomId)
            ->where('student_certificates.certificate_type', '=', CertificateType::TRANSFER_CERTIFICATE)
            ->leftJoin('classrooms', 'classrooms.id', '=', 'student_certificates.classroom_id')
            ->leftJoin('students', 'students.id', '=', 'student_certificates.student_id')
            // ->leftJoin('guardians as father', function ($join) {
            //     $join->on('students.id', '=', 'father.student_id')
            //         ->where('father.guardian_type', GuardianType::FATHER);
            // })
            ->select(
                'student_certificates.*',
                // student
                'students.first_name',
                'students.middle_name',
                'students.last_name',
                'students.admission_no',
                'students.id as student_id',
                // father
                // 'father.first_name as father_first_name',
                // 'father.middle_name as father_middle_name',
                // 'father.last_name as father_last_name',
                // 'father.phone as father_phone',
                // classroom
                'classrooms.title as classroom_title'
            );

        return $query->get()->toArray();
    }

    public function getDaftTcByStudentIdClassroomId($studentId, $classroomId)
    {
        return StudentCertificate::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) {
                $query->where('is_draft', 1)
                    ->orWhere('is_generated', 1);
            })
            ->where('student_id', $studentId)
            ->where('classroom_id', $classroomId)
            ->where('certificate_type', CertificateType::TRANSFER_CERTIFICATE)
            ->first();
    }

    public function getBulkDraftTcByStudentIdsClassroomId($studentIds, $classroomId)
    {
        return StudentCertificate::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where(function ($query) {
                $query->where('is_draft', 1)
                    ->orWhere('is_generated', 1);
            })
            ->whereIn('student_id', $studentIds)
            ->where('classroom_id', $classroomId)
            ->where('certificate_type', CertificateType::TRANSFER_CERTIFICATE)
            ->get();
    }


    public function getCertificateByClassroomId($classroomId)
    {
        $query = StudentCertificate::query();
        $query->where('student_certificates.school_id', getUserSchoolId())
            ->where('student_certificates.classroom_id', '=', $classroomId)
            ->where('student_certificates.certificate_type', '=', CertificateType::CHARACTER_CERTIFICATE->value)
            ->orWhere('student_certificates.certificate_type', '=', CertificateType::BONAFIDE_CERTIFICATE->value)
            ->with(['studentData' => function ($query) use ($classroomId) {
                $query->with(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);
            }]);
        return $query->get()->toArray();
    }


    // Id card certificate

    public function getIdCardCertificateById(int $id)
    {
        return IdCardCertificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select(
                'id',
                'template_name',
                'audience_type',
                'orientation',
                'is_with_backpage',
                'background_image',
                'background_color',
                'columns',
                'header',
                'body',
                'footer',
                'back_page',
            )
            ->orderBy('id', 'asc')
            ->first();
    }

    public function createIdCardCertificate(array $dataArray)
    {
        return IdCardCertificate::create($dataArray);
    }

    public function updateIdCardCertificate(int $id, array $dataArray)
    {
        return IdCardCertificate::where('id', $id)->update($dataArray);
    }

    public function getActiveAllIdCardCertificates()
    {
        return IdCardCertificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select(
                'id',
                'template_name',
                'audience_type',
                'orientation',
                'is_with_backpage',
                'background_image',
                'background_color',
                'columns',
                'header',
                'body',
                'footer',
                'back_page',
            )
            ->with([
                'backgroundImage',
                'headerBackgroundImage',
                'bodyBackgroundImage',
                'footerBackgroundImage',
                'backpageBackgroundImage',
                'footerSignatureImage'
            ])
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getStudentIdCardCertificates()
    {
        return IdCardCertificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('audience_type', IdCardAudienceType::STUDENT)
            ->select(
                'id',
                'template_name',
                'audience_type',
            )
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getTeacherIdCardCertificates()
    {
        return IdCardCertificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('audience_type', IdCardAudienceType::TEACHER)
            ->select(
                'id',
                'template_name',
                'audience_type',
            )
            ->orderBy('id', 'asc')
            ->get();
    }

    public function deleteIdCardCertificateImageByCertificateIdAndImageName(int $certificateId, string $name)
    {
        return Image::where('school_id', getUserSchoolId())
            ->where('imageable_id', $certificateId)
            ->where('name', $name)
            ->delete();
    }
}
