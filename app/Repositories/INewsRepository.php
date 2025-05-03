<?php

namespace App\Repositories;

interface INewsRepository
{
    public function getAll();

    public function getById($id);

    public function delete($id);

    public function create(array $arrayData);

    public function update($id, array $arrayData);

    public function getActiveAll();

    public function getRegisterAll();

    public function getFilteredNewsLists(string $newsStatus = "", string $orderByDate = "", string $audienceType = "");
    public function getStudentFilteredNewsLists(string $newsStatus = "", string $orderByDate = "", string $audienceType = "", $schoolId = null, int $classroomId,$academicYearId, string $newsType);
}
