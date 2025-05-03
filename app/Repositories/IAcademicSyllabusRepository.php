<?php

namespace App\Repositories;

interface IAcademicSyllabusRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getSyllabusBySearch($classId = null, $subjectId = null, $schoolId = null, $academicYearId = null);
}
