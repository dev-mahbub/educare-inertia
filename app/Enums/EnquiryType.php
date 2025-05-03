<?php

namespace App\Enums;

enum EnquiryType: string
{
    case ADMISSION = 'Admission';
    case ENQUIRY = 'Enquiry';
    case REGISTRATION = 'Registration';
}
