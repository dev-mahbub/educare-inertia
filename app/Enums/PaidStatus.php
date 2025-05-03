<?php

namespace App\Enums;

enum PaidStatus: string
{
    case PAID = 'Paid';
    case PROCESSING = 'Processing';
}