<?php

namespace App\Repositories;

interface ICompanyRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function deleteSubCat($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getActiveList($search = '');
    public function getRegisterAll();
}
