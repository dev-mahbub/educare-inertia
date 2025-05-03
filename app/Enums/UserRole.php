<?php

namespace App\Enums;

enum UserRole: string
{
    case SUPER_ADMIN = 'Super Admin';
    case ADMIN = 'Admin';
    case ADMIN_EDITOR = 'Admin Editor';
    case SITE_ADMIN = 'School Admin';
    case SITE_EDITOR = 'School Editor';
    case SITE_BRANCH_ADMIN = 'School Branch Admin';
    case SITE_BRANCH_EDITOR = 'School Branch Editor';
    case SITE_MODERATOR = 'School Moderator';
    case SITE_ACCOUNTANT = 'School Accountant';
    case SITE_OFFICE = 'School Office';
    case SITE_STAFF = 'Staff';
    case SITE_INSTRUCTOR = 'Instructor';
    case SITE_TEACHER = 'Teacher';
    case SITE_GUARDIAN = 'Guardian';
    case SITE_PARENT = 'Parent';
    case SITE_STUDENT = 'Student';
    case SITE_EXAMINER = 'Examiner';
    case SITE_SUBSCRIBER = 'Subscriber';
}