<?php

namespace App\Enums;

enum SurveyAudienceType: string
{
    case TEACHER = 'Teacher';
    case STUDENT = 'Student';
    case PARENT = 'Parent';
}
