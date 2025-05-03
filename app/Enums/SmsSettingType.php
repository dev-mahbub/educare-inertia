<?php

namespace App\Enums;

enum SmsSettingType: string
{
    case TEA_BIR = 'Teacher Birthday';
    case STU_ABS = 'Student Absent';
    case ADM_ENQ = 'Admission Enquiry';
    case ADMISSION = 'Admission';
    case REGISTRATION = 'Registration';
    case PHO_APP_LOG = 'Phone App Login';
}
