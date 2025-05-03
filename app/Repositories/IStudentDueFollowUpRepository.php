<?php

namespace App\Repositories;

interface IStudentDueFollowUpRepository
{
    public function getAll();
    public function getById($id);
    public function getBySchoolId($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
}
