<?php

namespace App\Repositories;

interface IBankRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll(int $schoolId = null);
    public function getRegisterAll(int $schoolId = null);
    public function getActiveNameAndId();
    public function getBankByName($name, int $schoolId = null);
}
