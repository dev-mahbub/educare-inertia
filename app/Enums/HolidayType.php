<?php

namespace App\Enums;

enum HolidayType: string
{
    case STUDENT_ONLY = 'Student Only';
    case TEACHER_ONLY = 'Teacher Only';
    case STUDENT_TEACHER = 'Student and Teacher';
}