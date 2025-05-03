<?php

namespace App\Repositories;

interface ISaleGroupRepository
{
    public function getRegisterAll();
    public function create(array $arrayData);
    public function getActiveAll();
    public function update($id, array $arrayData);
    public function delete($id);
    public function getById($id);
    public function getSaleGroupProductIds($id);
    public function deleteSaleGroupProduct($id);
}
