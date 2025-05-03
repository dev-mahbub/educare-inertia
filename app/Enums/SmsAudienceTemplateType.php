<?php

namespace App\Enums;

enum SmsAudienceTemplateType: string
{
    case TEACHERS = 'Teachers';
    case PARENTS = 'Parents';
    case ALUMNIES = 'Alumnies';
    case VEHICLE_STAFFS = 'Vehicle Staffs';
}
