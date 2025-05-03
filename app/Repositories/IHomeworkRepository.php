<?php

namespace App\Repositories;

interface IHomeworkRepository
{
    public function getRegisterAll();
    public function getActiveAllBySearch($schoolId = null, $academicYearId = null, $classNameId = null, $classSubjectId = null, $isAssigned = 1);
    public function getHomeworkStudentCounts($homeworkId);
    public function getHomeworkStudentActiveAll($homeworkId);
    public function getHomeworkFromStudentId($homeworkId, $studentId);
    public function createAssessmentActivityComment(array $arrayData);
    public function getHomeworkStudentAssessmentComments($schoolId = null, $academicYearId = null, $assessmentId, $studentId);
    public function getActivityCommentById($id);
    public function createClassworkClassroom(array $arrayData);
    public function geClassroomFromClassNameId($schoolId = null, $academicYearId = null, $homeworkId);
    public function deleteClassworkClassroom($id);
    public function getHomeworksByClassroomId($classroomId);
    public function getHomeworksByClassroomIdWithFilters($classroomId, $classNameId = null, $classSubjectId = null);
    public function getHomeworkActivityCommentFromStudentId($homeworkId, $studentId);
    public function createHomeworkStudentActivityComment(array $arrayData);
    public function updateHomeworkStudentActivityComment($id, array $arrayData);
}
