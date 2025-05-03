<?php

namespace App\Enums;

enum VisitorEnquiryDetailEnum: string
{
    case NEW = 'New';
    case ADMITTED = 'Admitted';
    case REJECTED = 'Rejected';
    case REGISTRATION_TAKEN = 'Registration Taken';
    case PENDING = 'Pending';
}
