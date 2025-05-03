<?php

namespace App\Repositories;

interface ISubjectRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $checkedArray, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getActiveNameAndId();
    public function getActiveAllArray();
    public function getRegisterAll();
    public function getSubjectById(int $id, $schoolId = null);
    public function getSubjectsByClassroomId(int $classroomId, $schoolId = null);
    public function getTeacherSubjectsByTeacherIdAndClassroomId(int $teacherId, int $classroomId, $schoolId = null);
    public function getSubjectsByClassNameId(int $classNameId, $schoolId = null, $academicYearId = null);
    public function getTeacherSubjectsByTeacherIdAndClassNameId(int $teacherId, int $classNameId, $schoolId = null, $academicYearId = null);
    
    // e-learning subject
    public function getAllELearningSubject();
    public function getByIdELearningSubject($id);
    public function deleteELearningSubject($id);
    public function createELearningSubject(array $arrayData);
    public function updateOrCreateELearningSubject(array $checkedArray, array $arrayData);
    public function updateELearningSubject($id, array $arrayData);
    public function getActiveAllELearningSubject();
    public function getActiveELearningSubjectNameAndId();

    // subject group
    public function getAllSubjectGroup();
    public function getSubjectGroupById($id);
    public function deleteSubjectGroup($id);
    public function createSubjectGroup(array $arrayData);
    public function updateOrCreateSubjectGroup(array $checkedArray, array $arrayData);
    public function updateSubjectGroup($id, array $arrayData);
    public function getActiveAllSubjectGroup();
    public function getActiveSubjectGroupNameAndId();
}
