<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\HostelFee;
use App\Models\HostelFeeType;
use App\Models\HostelVoucher;
use App\Models\HostelVoucherStudent;

class HostelFeeRepository implements IRepository, IHostelFeeRepository
{
    public function getAll()
    {
        return HostelFee::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getById($id)
    {
        return HostelFee::findOrFail($id);
    }

    public function delete($id)
    {
        return HostelFee::destroy($id);
    }

    public function create(array $arrayData)
    {
        return HostelFee::create($arrayData);
    }

    public function updateOrCreate(array $conditionData, array $arrayData)
    {
        return HostelFee::updateOrCreate($conditionData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return HostelFee::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return HostelFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllNameId()
    {
        return HostelFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'title')
            ->get();
    }

    // hostel fee type
    public function getAllHostelFeeType()
    {
        return HostelFeeType::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getByHostelFeeTypeId($id)
    {
        return HostelFeeType::findOrFail($id);
    }

    public function deleteHostelFeeType($id)
    {
        return HostelFeeType::destroy($id);
    }

    public function createHostelFeeType(array $arrayData)
    {
        return HostelFeeType::create($arrayData);
    }

    public function updateOrCreateHostelFeeType(array $conditionData, array $arrayData)
    {
        return HostelFeeType::updateOrCreate($conditionData, $arrayData);
    }

    public function updateHostelFeeType($id, array $arrayData)
    {
        return HostelFeeType::whereId($id)->update($arrayData);
    }

    public function getActiveAllHostelFeeType()
    {
        return HostelFeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }


    // HostelVoucher
    public function getAllHostelVoucher()
    {
        return HostelVoucher::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllHostelVoucher()
    {
        return HostelVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllHostelVoucherNameId()
    {
        return HostelVoucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'title')
            ->get();
    }

    public function getByHostelVoucherId($id)
    {
        return HostelVoucher::findOrFail($id);
    }

    public function deleteHostelVoucher($id)
    {
        return HostelVoucher::destroy($id);
    }

    public function createHostelVoucher(array $arrayData)
    {
        return HostelVoucher::create($arrayData);
    }

    public function updateOrCreateHostelVoucher(array $conditionData, array $arrayData)
    {
        return HostelVoucher::updateOrCreate($conditionData, $arrayData);
    }

    public function updateHostelVoucher($id, array $arrayData)
    {
        return HostelVoucher::whereId($id)->update($arrayData);
    }

    public function getHostelVoucherLastId()
    {
        $lastId = HostelVoucher::latest()->first('id');
        if (!empty($lastId)) {
            return $lastId?->id;
        } else {
            return 0;
        }
    }


    // hostel voucher student
    public function getAllHostelVoucherStudent()
    {
        return HostelVoucherStudent::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllHostelVoucherStudent()
    {
        return HostelVoucherStudent::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveAllHostelVoucherStudentNameId()
    {
        return HostelVoucherStudent::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'title')
            ->get();
    }

    public function getByHostelVoucherStudentId($id)
    {
        return HostelVoucherStudent::findOrFail($id);
    }

    public function deleteHostelVoucherStudent($id)
    {
        return HostelVoucherStudent::destroy($id);
    }

    public function createHostelVoucherStudent(array $arrayData)
    {
        return HostelVoucherStudent::create($arrayData);
    }

    public function updateOrCreateHostelVoucherStudent(array $conditionData, array $arrayData)
    {
        return HostelVoucherStudent::updateOrCreate($conditionData, $arrayData);
    }

    public function updateHostelVoucherStudent($id, array $arrayData)
    {
        return HostelVoucherStudent::whereId($id)->update($arrayData);
    }
}
