<?php

namespace App\Repositories;

interface IProductQuantityRepository
{
    public function getById($id);
    public function getRegisterAll();
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function delete($id);
    public function getActiveListForProduction();
    public function getActiveListForConsumption();
}
