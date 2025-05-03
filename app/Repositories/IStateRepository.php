<?php 

namespace App\Repositories;

interface IStateRepository
{
    public function getRegisterAll();
    public function getStatesByCountry($cId = null);
    public function countStatesByCountry($cId = null);
}