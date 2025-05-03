<?php

namespace App\Enums;

enum AccountType: string
{
    case CA = 'Current Acccount';
    case SA = 'Saving Account';
    case FA = 'Fixed Account';
}
