<?php

namespace App\Repositories;

interface IEarningTypeRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null);
    public function getRegisterAll();
    public function getEarningTypeById(int $id, int $schoolId = null);
    public function getEarningTypesByIds(array $ids, int $schoolId = null);
    public function getFilteredEarningTypes(array $typesToExclude = [], int $schoolId = null);
    public function getEarningTypeByTitle(string $title, int $schoolId = null);
    public function getDefaultEarningTypeByTitle(string $title, int $schoolId = null);
}
