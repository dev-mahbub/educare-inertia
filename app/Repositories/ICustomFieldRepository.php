<?php

namespace App\Repositories;

interface ICustomFieldRepository
{
    public function getCustomFieldsByType(string $type);

    // student custom field
    public function createStudentCustomField(array $arrayData);
    public function insertStudentCustomField(array $arrayData);
    public function updateOrCreateStudentCustomField(array $attributesToCheck, array $valuesToUpdate);

    // staff custom field
    public function createStaffCustomField(array $arrayData);
    public function insertStaffCustomField(array $arrayData);
    public function updateOrCreateStaffCustomField(array $attributesToCheck, array $valuesToUpdate);

    // enquiry custom field
    public function createEnquiryCustomField(array $arrayData);
    public function insertEnquiryCustomField(array $arrayData);
    public function updateOrCreateEnquiryCustomField(array $attributesToCheck, array $valuesToUpdate);
}
