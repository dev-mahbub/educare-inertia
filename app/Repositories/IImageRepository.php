<?php

namespace App\Repositories;

interface IImageRepository
{
    public function create(array $arrayData);
    public function delete($id);
    public function morphSchoolCreate(array $arrayData, $id);
    public function morphCreate(array $arrayData, $id);
    public function update($id, array $arrayData);
    public function updateTwo(int $id, string $name, string $model, array $arrayData);
    public function updateOrCreate(array $arrayMatch, array $arrayData);
    public function morphImageCreate(array $arrayData);
    public function morphImageUpdate(array $arrayData, $id, $modelObj = null);
    public function morphStudentImageUpdate(array $arrayData, $id, $name = null, $modelObj = null);
    public function morphImageAll($schoolId = null, $modelObj = null);
    public function morphStudentImageAll($schoolId = null, $name = null, $modelObj = null);
}
