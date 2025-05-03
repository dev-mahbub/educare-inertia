<?php

namespace App\Enums;

enum BookTypeStatus: string
{
    case DAMAGE = 'Damage';
    case LOST = 'Lost';
    case OTHER = 'Other';
}
