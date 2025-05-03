<?php

namespace App\Enums;

enum SchoolShiftType: string
{
    case MORNING = 'Morning';
    case EVENING = 'Evening';
    case NIGHT = 'Night';
}
