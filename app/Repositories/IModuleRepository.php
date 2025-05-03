<?php 

namespace App\Repositories;

interface IModuleRepository
{
    // public function getRegisterAll();
    public function getModuleById($schoolId);
    public function getBySchoolSession();
    public function createOrUpdate($schoolId, array $arrayData);

    
}