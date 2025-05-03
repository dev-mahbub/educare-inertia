<?php

namespace App\Enums;

enum IdCardAudienceType: string
{
    case STUDENT = 'Student';
    case TEACHER = 'Teacher';
    case GUARDIAN = 'Guardian';
}
