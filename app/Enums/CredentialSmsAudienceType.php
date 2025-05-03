<?php

namespace App\Enums;

enum CredentialSmsAudienceType: string
{
    case TEACHERS = 'Teachers';
    case PARENTS = 'Parents';
    case ALUMNIES = 'Alumnies';
    case VEHICLE_STAFFS = 'Vehicle Staffs';
}
