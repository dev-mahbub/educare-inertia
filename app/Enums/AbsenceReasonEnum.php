<?php

namespace App\Enums;

enum AbsenceReasonEnum: string
{
    case SICKNESS = 'sickness';
    case FAMILY_EMERGENCY = 'family_emergency';
    case APPOINTMENT = 'appointment';
    case OTHER = 'other';
}
