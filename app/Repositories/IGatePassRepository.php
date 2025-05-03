<?php

namespace App\Repositories;

interface IGatePassRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $conditionData, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getLastId();
    public function getGatePassByClassroomId($classroomId);
    public function getActiveAllWithSearch($search = null);
}
