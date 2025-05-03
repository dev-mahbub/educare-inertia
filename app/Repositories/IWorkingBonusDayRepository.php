<?php

namespace App\Repositories;

interface IWorkingBonusDayRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getByMonthYear($monthId, $yearId);
    public function getDataByClassNameYearMonth($academicYearId, $monthId, $classNameId);

    // WorkingBonusDayClassroom
    public function getAllWorkingBonusDayClassroomByClassId($workingClassId);
    public function getAllWorkingBonusDayClassroom();
    public function createWorkingBonusDayClassroom(array $arrayData);
    public function updateWorkingBonusDayClassroom($id, array $arrayData);
    public function getActiveAllWorkingBonusDayClassroom();
}
