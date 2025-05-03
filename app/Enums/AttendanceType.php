<?php

namespace App\Enums;

enum AttendanceType: string
{
    case ABSENT = 'Absent';
    case PRESENT = 'Present';
    case HALF_DAY = 'HalfDay';
    case ON_LEAVE = 'OnLeave';
    case WEEKLY_OFF = 'WeeklyOff';
    case NOT_MARKED = 'NotMarked';
}
