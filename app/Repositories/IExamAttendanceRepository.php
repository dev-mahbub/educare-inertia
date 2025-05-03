<?php

namespace App\Repositories;

interface IExamAttendanceRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate($attributesToCheck, $valuesToUpdate);
    public function update($id, array $arrayData);
    public function getActiveAll();
}
