<?php

namespace App\Enums;

enum SmsAudienceContextType: string
{
    case STUDENTABS = 'StudentAbsent';
    case GENERAL = 'General';
    case REGISTRATION = 'Registration';
    case ADMISSION = 'Admission';
    case ENQUIRYVIS = 'EnquiryVisitor';
    case EXAMMARKS = 'ExamMarks';
    case STUDENTLEA = 'StudentOnLeave';
    case ADMISSIONENQ = 'AdmissionEnquiry';
    case WEBLOGIN = 'WebLogin';
    case PHONEAPPLOGIN = 'PhoneAppLogin';
}
