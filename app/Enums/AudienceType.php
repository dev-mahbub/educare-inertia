<?php

namespace App\Enums;

enum AudienceType: string
{
    case STUDENT = 'Student';
    case TEACHER = 'Teacher';
    case PARENT = 'Parent';
    case SCHOOL = 'School';
    case ALUMNI = 'Alumni';
    case TEAM = 'Team';
}
