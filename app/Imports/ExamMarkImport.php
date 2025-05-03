<?php

namespace App\Imports;

use App\Enums\Status;
use Illuminate\Support\Collection;
use App\Repositories\ExamRepository;
use App\Repositories\StudentRepository;
use App\Repositories\AcademicRepository;
use Illuminate\Support\Facades\Validator;
use App\Repositories\ExamRoasterRepository;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExamMarkImport implements ToCollection, WithHeadingRow
{
    protected $validationErrors = [];
    protected $classroomId;
    protected $subjectId;
    protected $examId;
    protected $studentRepository;
    protected $examRepository;
    protected $examRoasterRepository;
    protected $academicRepository;

    public function __construct(int $classroomId, int $subjectId, int $examId)
    {
        $this->classroomId = $classroomId;
        $this->subjectId = $subjectId;
        $this->examId = $examId;

        $this->studentRepository = new StudentRepository;
        $this->examRepository = new ExamRepository;
        $this->examRoasterRepository = new ExamRoasterRepository;
        $this->academicRepository = new AcademicRepository;
    }

    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        // filter empty rows
        $rows = $rows->filter(function ($row) {
            return !empty(array_filter($row->toArray()));
        });

        if ($rows->count() > 0 && $rows->count() <= 80) {
            $examRoaster = $this->examRoasterRepository->getFullMinMarkBySubjectId($this->subjectId, $this->classroomId, $this->examId);

            $gradeMap = [];
            $is_co_scholastic = false;

            if ($examRoaster != null && $examRoaster?->classroom_subject?->subject?->is_co_scholastic === 'Yes') {
                $is_co_scholastic = true;

                $academicGradeScale = $this->academicRepository->getGradeOne($this->subjectId, $this->classroomId);
                $academicGradeScale->loadMissing(['academicGradeItems']);

                if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems?->count() > 0) {
                    foreach ($academicGradeScale?->academicGradeItems as $gradeScaleItem) {
                        $gradeMap[$gradeScaleItem?->title] = $gradeScaleItem?->id;
                    }
                }
            }

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $this->classroomId,
                'subject_id' => $this->subjectId,
                'exam_id' => $this->examId,
            ];

            foreach ($rows as $row) {
                // Validate the row
                $validator = Validator::make($row->toArray(), [
                    'admission_no' => 'required',
                ]);

                // Check if validation fails for the current row
                if ($validator->fails()) {
                    // Store validation errors
                    $this->validationErrors['exam_mark_import_file'] = "File mandatory fields cannot not be empty and data should be in valid format.";
                    continue; // Skip processing this row and move to the next one
                }

                $student = $this->studentRepository->getStudentByAdmissionNoAndClassroomId($row['admission_no'], $this->classroomId);

                if ($student == null) {
                    // Store validation errors
                    $failedAdmissionNo[] = $row['admission_no'];

                    // Store validation errors
                    $this->validationErrors['exam_mark_import_file'] = "These admission no (" . implode(', ', $failedAdmissionNo) . ") do not exists.";

                    continue; // Skip processing this row and move to the next one
                }

                if ($student != null) {
                    $attributesToCheck['student_id'] = $student['id'];

                    $is_present = intval($row['is_present']) ?? 0;
                    $academicGradeItemId = null;
                    $absenceReason = null;
                    $mark = 0;

                    if ($is_co_scholastic && $is_present) {
                        $gradeKey = $row['marks'] ?? "";

                        $academicGradeItemId = $gradeMap[$gradeKey] ?? null;
                    } else if (!$is_co_scholastic && $is_present) {
                        $mark = $row['marks'] ?? 0;
                        $fullMark = $examRoaster?->full_mark ?? 0;

                        if ($mark > $fullMark) {
                            $mark = $fullMark;
                        }
                    } else {
                        $absenceReason = $row['marks'] ?? null;
                    }

                    $valuesToUpdate = [
                        'academic_grade_item_id' => $academicGradeItemId,
                        'mark' => $mark,
                        'is_present' => $is_present,
                        'absence_reason' => $absenceReason,
                        'status' => Status::ACTIVE->value,
                    ];

                    $this->examRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }
        } else if ($rows->count() > 80) {
            $this->validationErrors['exam_mark_import_file'] = "Only 80 records are accepted in the list at a time";
        } else {
            $this->validationErrors['exam_mark_import_file'] = "File cannot be empty.";
        }

        if (!empty($this->validationErrors)) {
            return $this->validationErrors;
        }
    }

    /**
     * Get the validation errors encountered during import.
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }
}
