<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\CustomField;
use App\Models\StaffCustomField;
use App\Models\EnquiryCustomField;
use App\Models\StudentCustomField;

class CustomFieldRepository implements IRepository, ICustomFieldRepository
{
    public function getAll()
    {
        return CustomField::all()->latest()->get();
    }

    public function getById($id)
    {
        return CustomField::findOrFail($id);
    }

    public function delete($id)
    {
        CustomField::destroy($id);
    }

    public function create(array $arrayData)
    {
        return CustomField::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return CustomField::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return CustomField::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return CustomField::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getCustomFieldsByType(string $type)
    {
        return CustomField::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('custom_field_type', $type)
            ->select(
                'id',
                'name',
                'form_section',
                'data_type',
                'input_length',
                'is_required',
                'display_order',
                'list_value'
            )
            ->orderBy('display_order', 'asc')
            ->get();
    }

    // student custom field
    public function createStudentCustomField(array $arrayData)
    {
        return StudentCustomField::create($arrayData);
    }

    public function insertStudentCustomField(array $arrayData)
    {
        return StudentCustomField::insert($arrayData);
    }

    public function updateOrCreateStudentCustomField(array $attributesToCheck, array $valuesToUpdate)
    {
        return StudentCustomField::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    // staff custom field
    public function createStaffCustomField(array $arrayData)
    {
        return StaffCustomField::create($arrayData);
    }

    public function insertStaffCustomField(array $arrayData)
    {
        return StaffCustomField::insert($arrayData);
    }

    public function updateOrCreateStaffCustomField(array $attributesToCheck, array $valuesToUpdate)
    {
        return StaffCustomField::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    // enquiry custom field
    public function createEnquiryCustomField(array $arrayData)
    {
        return EnquiryCustomField::create($arrayData);
    }

    public function insertEnquiryCustomField(array $arrayData)
    {
        return EnquiryCustomField::insert($arrayData);
    }

    public function updateOrCreateEnquiryCustomField(array $attributesToCheck, array $valuesToUpdate)
    {
        return EnquiryCustomField::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }
}
