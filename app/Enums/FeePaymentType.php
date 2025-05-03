<?php

namespace App\Enums;

enum FeePaymentType: string
{
    case FEEINSTALLMENT = 'fee_installment';
    case TRANSPORTVOUCHER = 'transport_voucher';
    case GENERALVOUCHER = 'general_voucher';
}
