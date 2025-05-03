<?php

namespace App\Enums;

enum FeeRefundPaymentMode: string
{
    case CASH = 'Cash';
    case CHEQUE = 'Cheque';
}
