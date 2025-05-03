<?php

namespace App\Repositories;

interface IDocumentRepository
{
    // public function getRegisterAll();

    // student document
    public function createStudentDocument(array $arrayData);
    public function getStudentDocumentSummaryReport(int $schoolId = null);

    // staff document
    public function createStaffDocument(array $arrayData);
    public function getTeacherDocuments(int $staffId = null, int $documentCategoryId = null, int $schoolId = null);
    public function getTeacherDocumentSummaryReport(int $schoolId = null);

    // dcoument category
    public function createDocumentCategory(array $arrayData);
    public function updateDocumentCategory(int $id, array $arrayData);
    public function deleteDocumentCategory(int $id);
    public function getDocumentCategoryById(int $id, int $schoolId = null);
    public function getActiveDocumentCategoryAll(int $schoolId = null);
    public function getDocumentCategoriesByType(string $type, int $schoolId = null);

    // school document
    public function createSchoolDocument(array $arrayData);
    public function deleteSchoolDocument(int $id);
    public function getFilteredSchoolDocuments(int $documentCategoryId = null, $isWithDocument = null, int $schoolId = null);
    public function getSchoolDocumentSummaryReport(int $schoolId = null);
    public function getSchoolDocumentById(int $id, int $schoolId = null);

    // driver document
    public function createDriverDocument(array $arrayData);
    public function getFilteredDriverDocuments(int $driverId = null, int $documentCategoryId = null, $isWithDocument = null, int $schoolId = null);
    public function getDriverDocumentSummaryReport(int $schoolId = null);
}
