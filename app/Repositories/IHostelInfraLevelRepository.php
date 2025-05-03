<?php

namespace App\Repositories;

interface IHostelInfraLevelRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getCountBedsById($id);
}
