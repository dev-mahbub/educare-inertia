<?php

namespace App\Enums;

enum VoucherStatus: string
{
    case PAID = 'Paid';
    case PARTIAL = 'Partial';
    case DUE = 'Due';
}
