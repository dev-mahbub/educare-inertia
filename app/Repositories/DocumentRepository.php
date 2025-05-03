<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Document;
use App\Models\StaffDocument;
use App\Models\DriverDocument;
use App\Models\SchoolDocument;
use App\Models\StudentDocument;
use App\Models\DocumentCategory;
use App\Enums\DocumentAudienceType;

class DocumentRepository implements IRepository, IDocumentRepository
{
    public function getAll()
    {
        return Document::all();
    }

    public function getById($id)
    {
        return Document::findOrFail($id);
    }

    public function delete($id)
    {
        return Document::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Document::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Document::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Document::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return Document::where('status', Status::ACTIVE);
    }

    // student document
    public function createStudentDocument(array $arrayData)
    {
        return StudentDocument::create($arrayData);
    }

    public function getStudentDocumentSummaryReport(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StudentDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->with([
                'student' => function ($query) {
                    $query->with([
                        'classroom:id,title',
                        'promotedClassroom:classrooms.id,classrooms.title'
                    ])->select(
                        'id',
                        'classroom_id'
                    );
                }
            ])
            ->select(
                'id',
                'student_id',
                'document_category_id'
            )
            ->get();
    }

    // staff document
    public function createStaffDocument(array $arrayData)
    {
        return StaffDocument::create($arrayData);
    }

    public function getTeacherDocuments(int $staffId = null, int $documentCategoryId = null, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('audience_type', DocumentAudienceType::TEACHER)
            ->where(function ($query) use ($staffId, $documentCategoryId) {
                if (!empty($staffId)) {
                    $query->where('staff_id', $staffId);
                }

                if (!empty($documentCategoryId)) {
                    $query->where('document_category_id', $documentCategoryId);
                }
            })
            ->with([
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                    );
                },
                'issuedBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                    );
                },
                'documentCategory' => function ($query) {
                    $query->select(
                        'id',
                        'title'
                    );
                },
                'file'
            ])
            ->select(
                'id',
                'staff_id',
                'issued_by',
                'document_category_id',
                'document_name',
                'document_no',
                'generated_for',
                'notes',
                'issued_date',
                'created_at'
            )
            ->get();
    }

    public function getTeacherDocumentSummaryReport(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('audience_type', DocumentAudienceType::TEACHER)
            ->select(
                'id',
                'document_category_id'
            )
            ->get();
    }

    // document category
    public function createDocumentCategory(array $arrayData)
    {
        return DocumentCategory::create($arrayData);
    }

    public function updateDocumentCategory(int $id, array $arrayData)
    {
        return DocumentCategory::whereId($id)->update($arrayData);
    }

    public function deleteDocumentCategory(int $id)
    {
        return DocumentCategory::destroy($id);
    }

    public function getDocumentCategoryById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DocumentCategory::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'type',
                'description',
                'is_published',
                'status'
            )
            ->first();
    }

    public function getActiveDocumentCategoryAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DocumentCategory::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->select(
                'id',
                'title',
                'type',
                'description',
                'is_published',
                'status'
            )
            ->get();
    }

    public function getDocumentCategoriesByType(string $type, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DocumentCategory::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('type', $type)
            ->select(
                'id',
                'title',
                'type',
                'description',
                'is_published',
                'status'
            )
            ->get();
    }

    // school document
    public function createSchoolDocument(array $arrayData)
    {
        return SchoolDocument::create($arrayData);
    }

    public function deleteSchoolDocument(int $id)
    {
        return SchoolDocument::destroy($id);
    }

    public function getFilteredSchoolDocuments(int $documentCategoryId = null, $isWithDocument = null, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SchoolDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where(function ($query) use ($documentCategoryId, $isWithDocument) {
                if (!empty($documentCategoryId)) {
                    $query->where('document_category_id', $documentCategoryId);
                }

                if (is_bool($isWithDocument)) {
                    $query->where('is_with_document', $isWithDocument);
                }
            })
            ->with([
                'issuedBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                    );
                },
                'createdBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                    );
                },
                'file'
            ])
            ->select(
                'id',
                'issued_by',
                'created_by',
                'document_category_id',
                'document_name',
                'document_no',
                'generated_for',
                'notes',
                'issued_date',
                'created_at',
                'is_with_document'
            )
            ->get();
    }

    public function getSchoolDocumentSummaryReport(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SchoolDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('is_with_document', false)
            ->select(
                'id',
                'document_category_id'
            )
            ->get();
    }

    public function getSchoolDocumentById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SchoolDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'issued_by',
                'created_by',
                'document_category_id',
                'document_name',
                'document_no',
                'generated_for',
                'notes',
                'issued_date',
                'created_at',
                'is_with_document'
            )
            ->with(['file'])
            ->first();
    }

    // driver document
    public function createDriverDocument(array $arrayData)
    {
        return DriverDocument::create($arrayData);
    }

    public function getFilteredDriverDocuments(int $driverId = null, int $documentCategoryId = null, $isWithDocument = null, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DriverDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where(function ($query) use ($driverId, $documentCategoryId, $isWithDocument) {
                if (!empty($$driverId)) {
                    $query->where('driver_id', $$driverId);
                }

                if (!empty($documentCategoryId)) {
                    $query->where('document_category_id', $documentCategoryId);
                }

                if (is_bool($isWithDocument)) {
                    $query->where('is_with_document', $isWithDocument);
                }
            })
            ->with([
                'issuedBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                    );
                },
                'createdBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                    );
                },
                'driver' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'last_name',
                    );
                },
                'documentCategory' => function ($query) {
                    $query->select(
                        'id',
                        'title'
                    );
                },
                'file'
            ])
            ->select(
                'id',
                'driver_id',
                'issued_by',
                'created_by',
                'document_category_id',
                'document_name',
                'document_no',
                'generated_for',
                'notes',
                'issued_date',
                'created_at',
                'is_with_document'
            )
            ->get();
    }

    public function getDriverDocumentSummaryReport(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return DriverDocument::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('is_with_document', false)
            ->select(
                'id',
                'document_category_id'
            )
            ->get();
    }
}
