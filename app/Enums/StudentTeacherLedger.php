<?php

namespace App\Enums;

enum StudentTeacherLedger: string
{
    case STUDENT = 'Student';
    case TEACHER = 'Teacher';
    case STAFF = 'Staffs';
    case REGISTER_STUDENT = 'RegistrationForStudents';
}
