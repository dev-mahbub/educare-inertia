<?php

namespace App\Enums;

enum RegistrationStatus: string
{
    case NEW = 'New';
    case REGISTRATION_TAKEN = 'Registration Taken';
    case ADMISSION_TAKEN = 'Admission Taken';
    case REGISTRATION_REJECTED = 'Registration Rejected';
    case ON_HOLD = 'On Hold';
    case CANCELLED = 'Cancelled';
}
