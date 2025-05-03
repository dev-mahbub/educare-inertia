<?php

namespace App\Repositories;

interface IHostelRoomRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function updateOrCreate(array $conditionData, array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
}
