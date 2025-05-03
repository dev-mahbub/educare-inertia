<?php

namespace App\Enums;

enum CustomFieldDataType: string
{
    case NUMERIC = 'Numeric';
    case ALPHANUMERIC = 'Alphanumeric';
    case DATE = 'Date';
    case LIST = 'List';
}
