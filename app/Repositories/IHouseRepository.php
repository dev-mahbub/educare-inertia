<?php

namespace App\Repositories;

interface IHouseRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getActiveNameAndId();
    public function getActiveNameAndId_wait();
    public function getHouseWiseStudent();
    public function getByName($name);
}
