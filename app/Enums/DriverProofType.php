<?php

namespace App\Enums;

enum DriverProofType: string
{
    case AADHAR_CARD = 'Aadhar Card';
    case VOTER_ID = 'Voter Id';
    case BANK_PASSBOOK = 'Bank passbook';
    case PAN_CARD = 'PAN card';
}
