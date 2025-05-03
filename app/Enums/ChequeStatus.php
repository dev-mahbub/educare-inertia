<?php

namespace App\Enums;

enum ChequeStatus: string
{
    case BOUNCED = 'Bounced';
    case CLEARED = 'Cleared';
}
