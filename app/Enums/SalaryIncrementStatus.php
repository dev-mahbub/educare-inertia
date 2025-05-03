<?php

namespace App\Enums;

enum SalaryIncrementStatus: string
{
    case CANCELED = 'Canceled';
    case PENDING = 'Pending';
    case APPROVED = 'Approved';
}
