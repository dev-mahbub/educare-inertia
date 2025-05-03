<?php

namespace App\Enums;

enum StudentStatus: string
{
    case NEW = 'New';
    case OLD = 'Old';
    case PROMOTED = 'Promoted';
}
