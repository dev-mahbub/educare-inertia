<?php

namespace App\Enums;

enum VoucherType: string
{
    case CREDIT_NOTE = 'CreditNote';
    case DEBIT_NOTE = 'DebitNote';
    case SALE = 'Sale';
    case PURCHASE = 'Purchase';
}
