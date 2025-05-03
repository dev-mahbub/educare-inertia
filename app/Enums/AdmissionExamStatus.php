<?php

namespace App\Enums;

enum AdmissionExamStatus: string
{
    case PENDING = 'Pending';
    case SELECTED = 'Selected';
    case NOT_SELECTED = 'Not Selected';
}
