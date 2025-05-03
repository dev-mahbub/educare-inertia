<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SiteSetting;

class SiteSettingRepository implements IRepository, ISiteSettingRepository
{
    public function getAll()
    {
        return SiteSetting::all();
    }

    public function getById($id)
    {
        return SiteSetting::findOrFail($id);
    }

    public function delete($id)
    {
        SiteSetting::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SiteSetting::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SiteSetting::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return SiteSetting::where('status', Status::ACTIVE);
    }

    public function getSiteSettingByTypeAndKey($type, $key, $schoolId = null, $academicYearId = null)
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('type', $type)
            ->where('key_name', $key)
            ->first();
    }

    public function getSiteSettingByTypeAndKeyAndValue($type, $key, $value)
    {
        return SiteSetting::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('type', $type)
            ->where('key_name', $key)
            ->where('value', $value)
            ->first();
    }
}
