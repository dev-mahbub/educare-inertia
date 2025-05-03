<?php 

namespace App\Repositories;

interface IAssessmentRepository
{
    public function geClassroomFromClassNameId($schoolId = null, $academicYearId = null, $assessmentId);
    public function deleteAssessmentClassroom($id);
    public function createAssessmentClassroom(array $arrayData);
    public function getActiveClassroomsFromAssessmentId($assessmentId);
    public function createAssessmentActivityMark(array $attributesToCheck, array $valuesToUpdate);
    public function createAssessmentActivityComment(array $arrayData);
    public function getStudentAssessmentComments($assessmentId, $studentId);
    public function getFilteredActiveAll(int $class_name_id = null, int $subject_id = null, string $startDate = '', string $endDate = '', int $schoolId = null);
    public function getCommentById($id);
}