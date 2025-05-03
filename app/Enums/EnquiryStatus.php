<?php

namespace App\Enums;

enum EnquiryStatus: string
{
    case NEW = 'New';
    case REGISTRATION_TAKEN = 'Registration Taken';
    case ADMITTED = 'Admitted';
    case REJECTED = 'Rejected';
    case ON_HOLD = 'On Hold';
    case CANCELLED = 'Cancelled';
}
