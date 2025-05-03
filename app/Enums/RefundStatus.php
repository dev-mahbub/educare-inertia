<?php

namespace App\Enums;

enum RefundStatus: string
{
    case APPROVED = 'Approved';
    case CANCELED = 'Canceled';
}
