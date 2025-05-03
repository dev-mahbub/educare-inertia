<?php

namespace App\Repositories;

interface IClassroomRollRepository
{
    // public function getRegisterAll();
    public function updateOrCreate(array $arrayData, array $checkArray);
}
