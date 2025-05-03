<?php

namespace App\Enums;

enum WebmessageStudentAudienceType: string
{
    case ADMIN = 'Admin';
    case CLASS_TEACHERS = 'Class Teachers';
    case SUBJECT_TEACHERS = 'Subject Teachers';
}