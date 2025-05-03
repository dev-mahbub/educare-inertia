<?php

namespace App\Repositories;

interface IDeductionTypeRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null);
    public function getRegisterAll();
    public function getDeductionTypeById(int $id, int $schoolId = null);
    public function getDeductionTypesByIds(array $ids, int $schoolId = null);
    public function getFilteredDeductionTypes(array $typesToExclude = [], int $schoolId = null);
    public function getDeductionTypeByTitle(string $title, int $schoolId = null);
}
