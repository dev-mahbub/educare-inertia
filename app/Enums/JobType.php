<?php

namespace App\Enums;

enum JobType: string
{
    case TEMPORARY = 'Temporary';
    case CONTRACT = 'Contract';
    case PROBATION = 'Probation';
    case CONFIRMED = 'Confirmed';
}
