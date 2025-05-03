<?php

namespace App\Enums;

enum LeaveType: string
{
    case SICK_LEAVE = 'Sick Leave';
    case PAID_LEAVE = 'Paid Leave';
    case CASUAL_LEAVE = 'Casual Leave';
}
