<?php 

namespace App\Repositories;

interface ISchoolRepository
{
    public function getRegisterAll();
    public function getDomainAll();
    public function getBySchoolCode($code);
    public function getSchoolAndSettingFromSchoolId();
    public function getSchoolsByCityAndState($city = null, $state = null);
    public function countSchoolsByCityAndState($city = null, $state = null);
    public function getCitiesByStateId($stateId = null);
    public function countCitiesByStateId($stateId = null);
    public function getSchoolCounts();
}