<?php

namespace App\Enums;

enum SmsAudienceContextTagType: string
{
    case STUDENTNAME = 'StudentName';
    case FATHERNAME = 'FatherName';
    case MOTHERNAME = 'MotherName';
    case CLASSNAME = 'ClassName';
    case DATE = 'Date';
    case AMOUNT = 'Amount';
    case REGISTERNO = 'RegistrationNo';
    case USERNAME = 'UserName';
    case PASSWORD = 'Password';
    case SCHOOLKEY = 'SchoolKey';
    case DOWNLOADURL = 'DownloadedUrl';
    case SUBDOMAIN = 'Subdomain';
    case SCHUDULNAME = 'ScheduledTestName';
    case MARKDETAIL = 'MarksDetail';
}
















