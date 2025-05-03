<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Certificate;
use App\Models\CertificateType;

class CertificateRepository implements IRepository, ICertificateRepository
{
    public function getAll()
    {
        return Certificate::all();
    }

    public function getById($id)
    {
        return Certificate::findOrFail($id);
    }

    public function delete($id)
    {
        return Certificate::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Certificate::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Certificate::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Certificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return Certificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getCertTypesAll()
    {
        return CertificateType::where('status', Status::ACTIVE)
            // ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getCertificatesWithypesAll()
    {
        return Certificate::where('certificates.status', Status::ACTIVE)
            ->where('certificates.school_id', getUserSchoolId())
            ->join('certificate_types', 'certificate_types.id', '=', 'certificates.certificate_type_id')
            ->select(
                'certificates.*',
                'certificate_types.title as certificate_type'
            )
            ->get();
    }

    public function getStudentCertificatesWithypesAll()
    {
        return Certificate::where('certificates.status', Status::ACTIVE)
            ->where('certificates.school_id', getUserSchoolId())
            ->join('certificate_types', 'certificate_types.id', '=', 'certificates.certificate_type_id')
            ->where('certificates.audience_type', 'Student')
            ->select(
                'certificates.*',
                'certificate_types.title as certificate_type'
            )
            ->get();
    }

    public function getTeacherCertificatesWithypesAll()
    {
        return Certificate::where('certificates.status', Status::ACTIVE)
            ->join('certificate_types', 'certificate_types.id', '=', 'certificates.certificate_type_id')
            ->where('certificates.audience_type', 'Teacher')
            ->select(
                'certificates.*',
                'certificate_types.title as certificate_type'
            )
            ->get();
    }


    public function getCertificateByIdAndAudienceType(int $id, string $audienceType = "")
    {
        return Certificate::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->when(!empty($audienceType), function ($query) use ($audienceType) {
                $query->where('audience_type', $audienceType);
            })
            ->select(
                'id',
                'certificate_type_id',
                'title',
                'view_name',
                'factory_name',
                'audience_type',
            )
            ->first();
    }
}
