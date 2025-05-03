<?php

namespace App\Enums;

enum CertificateType: string
{
    case TRANSFER_CERTIFICATE = 'Transfer certificate';
    case FEE_CERTIFICATE = 'Fee Certificate';
    case BONAFIDE_CERTIFICATE = 'Bonafide certificate';
    case CHARACTER_CERTIFICATE = 'Character Certificate';
    case ADMIT_CARD = 'Admit Card';
}
