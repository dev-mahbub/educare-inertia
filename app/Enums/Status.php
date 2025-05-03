<?php

namespace App\Enums;

enum Status: string
{
    case DELETED = 'Deleted';
    case PENDING = 'Pending';
    case ACTIVE = 'Active';
    case INACTIVE = 'Inactive';
}
