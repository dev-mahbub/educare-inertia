<?php

namespace App\Enums;

enum StudentStaffFieldType: string
{
    case STUDENT = 'Student';
    case TEACHER = 'Teacher';
    case REGISTERFORSTUDENT = 'Register for students';
}