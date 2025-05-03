<?php 

namespace App\Repositories;

interface IClassworkRepository
{
    // public function getRegisterAll();
    public function geClassroomFromClassNameId($schoolId = null, $academicYearId = null, $classworkId);

    public function getActiveAllBySearch($schoolId = null, $academicYearId = null, $classNameId = null, $classSubjectId = null, $isAssigned = 1);
    public function getClassworkStudentActiveAll($classworkId);
    public function getClassworkStudentCounts($classworkId);
    public function getClassworkFromStudentId($classworkId, $studentId);
    public function updateClassworkStudent($id, array $arrayData);
    public function createClassworkStudent(array $arrayData);
    public function getClassworkStudentAssessmentComments($schoolId = null, $academicYearId = null, $homeworkId, $studentId);
    public function createClassworkActivityComment(array $arrayData);
    public function getFilteredActiveAll(int $class_name_id = null, int $subject_id = null, string $startDate = '', string $endDate = '', int $schoolId = null);
    public function getClassworksByClassroomIdWithFilters($classroomId, $classNameId = null, $classSubjectId = null);
    public function createClassworkStudentActivityComment(array $arrayData);
}