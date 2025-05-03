<?php

namespace App\Enums;

enum WalletTransactionType: string
{
    case CREDIT = 'Credit';
    case DEBIT = 'Debit';
}
