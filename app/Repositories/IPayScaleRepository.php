<?php

namespace App\Repositories;

interface IPayScaleRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null);
    public function getRegisterAll();
    public function getPayScaleById(int $id, int $schoolId = null);
}
