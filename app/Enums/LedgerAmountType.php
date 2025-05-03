<?php

namespace App\Enums;

enum LedgerAmountType: string
{
    case DEBIT = 'Debit(Dr)';
    case CREDIT = 'Credit(Cr)';
}
