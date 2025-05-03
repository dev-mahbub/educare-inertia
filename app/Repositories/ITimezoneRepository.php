<?php 

namespace App\Repositories;

interface ITimezoneRepository
{
    public function getRegisterAll();
    public function getStandardTimezoneAll();
    public function getStandardTimezoneFromId($id);
}