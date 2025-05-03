<?php

namespace App\Repositories;

interface IExamDateRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function updateOrCreate($attributesToCheck, $valuesToUpdate);
    public function getExamDateDataByExamIdAndClassroomIds(array $classroomIds);
}
