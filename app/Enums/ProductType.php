<?php

namespace App\Enums;

enum ProductType: string
{
    case CAPITAL = 'Capital';
    case CONSUMABLE = 'Consumable';
    case PRODUCTION = 'Production';
    case CONSUMPTION = 'Consumption';
}
