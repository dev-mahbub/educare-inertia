<?php

namespace App\Repositories;

interface IAcademicRepository
{
    public function getAll();
    public function getById($id);
    public function getBySchoolId($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getActiveSessionAndId();

    //academic grade
    public function getAllGrade();
    public function getGradeById($id);
    public function deleteGrade($id);
    public function createGrade(array $arrayData);
    public function updateGrade($id, array $arrayData);
    public function getActiveAllGrade();
    public function getActiveAllGradeNameId();
    public function getRegisterAllGrade();
    public function getOpeningGradeById($id);

    //academic grade item
    public function getAllGradeItem();
    public function getGradeItemById($id);
    public function deleteGradeItem($id);
    public function createGradeItem(array $arrayData);
    public function updateOrCreateGradeItem(array $checkedArray, array $arrayData);
    public function updateGradeItem($id, array $arrayData);
    public function getActiveAllGradeItem();
    public function getRegisterAllGradeItem();
    public function getGradeOne($subjectId = null, $classroomId = null, $schoolId = null, $academicYearId = null);
}
