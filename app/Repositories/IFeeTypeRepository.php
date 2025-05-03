<?php

namespace App\Repositories;

interface IFeeTypeRepository
{
    public function getRegisterAll();
    public function getActiveFeeTypesAll();
    public function getActiveFeeSpecialTypesAll();
    public function getActiveIdName();
}
