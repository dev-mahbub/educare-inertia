<?php

namespace App\Enums;

enum LeaveStatus: string
{
    case APPROVED = 'Approved';
    case REJECTED = 'Rejected';
    case PENDING = 'Pending';
    case CANCELED = 'Canceled';
}
