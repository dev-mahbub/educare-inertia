<?php

namespace App\Enums;

enum SmsAudienceTeacherContextType: string
{
    case WEBLOGIN = 'WebLogin';
    case PHONEAPPLOGIN = 'PhoneAppLogin';
}
