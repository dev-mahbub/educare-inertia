<?php

namespace App\Repositories;

interface ISiteSettingRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getRegisterAll();
    public function getSiteSettingByTypeAndKey($type, $key);
    public function getSiteSettingByTypeAndKeyAndValue($type, $key, $value);
}
