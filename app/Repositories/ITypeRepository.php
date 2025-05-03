<?php

namespace App\Repositories;

interface ITypeRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $checkArr, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getActiveAllBookType();
    public function getActiveNameAndId();
    public function getActiveAllBookTypeNameId();
    public function getActiveAllVoucherType();
    public function getTypeByTitle(string $title, int $schoolId = null);
}
