<?php

namespace App\Enums;

enum DocumentAudienceType: string
{
    case STUDENT = 'Student';
    case TEACHER = 'Teacher';
    case SCHOOL = 'School';
    case DRIVER = 'Driver';
}
