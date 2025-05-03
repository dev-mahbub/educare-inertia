<?php

namespace App\Enums;

enum OrderPaymentStatus: string
{
    case PAID = 'Paid';
    case DUE = 'Due';
    case OVERDUE = 'Overdue';
    case SUCCESS = 'Success';
    case CANCELLED = 'Cancelled';
    case PENDING = 'Pending';
    case FAILED = 'Failed';
}
