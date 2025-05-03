<?php

namespace App\Repositories;

interface IClassroomSubjectRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function updateOrCreateClassroomSubject(array $dataArray, array $checkArray);
    public function getSubjectsFromClassId($classId, $schoolId = null);
    public function getClassroomSubjectsByClassroomId($classroomId, $schoolId = null, $academicYearId = null);
    public function getSearchSubjectsFromId($classId = null, $subjectId = null);
    public function getAssignSubjects();
    public function getClassroomSubjectIdTitle();
    public function getClassroomOptionalSubjectIdTitle();
    public function getStudentSubjectByClassroomIdStudentId($classroom_id, $student_id);
    public function getStudentSubjectByClassroomId($classroom_id, $schoolId = null, $academicYearId = null);
    public function getClassroomSubjectsByTeacherId(int $teacherId, int $schoolId = null, int $academicYearId = null);

    // class name subject
    public function getAllClassSubject();
    public function getClassSubjectById($id);
    public function deleteClassSubject($id);
    public function createClassSubject(array $arrayData);
    public function updateClassSubject($id, array $arrayData);
    public function getActiveAllClassSubject();
    public function getActiveAllClassSubjectByClassId($classNameId);
    public function updateOrCreateClassSubject(array $checkArray, array $dataArray);
}
