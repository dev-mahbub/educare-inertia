<?php

namespace App\Enums;

enum StaffRoleType: string
{
    case ADMIN = 'Admin';
    case TEACHER = 'Teacher';
    case SITE_STAFF = 'Staff';
    case SITE_ALUMNI = 'Alumni';
}
