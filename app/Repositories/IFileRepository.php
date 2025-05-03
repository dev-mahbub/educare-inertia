<?php

namespace App\Repositories;

interface IFileRepository
{
    public function create(array $arrayData);
    public function delete($id);
    public function morphCreate(array $arrayData);
    public function update($id, array $arrayData);
    public function updateTwo(int $id, string $name, string $model, array $arrayData);
    public function updateOrCreate(array $arrayMatch, array $arrayData);
}
