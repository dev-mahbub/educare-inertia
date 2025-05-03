<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case PAID = 'Paid';
    case PARTIAL = 'Partial';
    case DUE = 'Due';
    case CANCELLED = 'Cancelled';
}
