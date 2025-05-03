<?php

namespace App\Enums;

enum TransportType: string
{
    case PICKUP = 'Pickup';
    case DROP = 'Drop';
    case PICKUP_DROP = 'Pick & Drop';
    
}
