<?php

namespace App\Enums;

enum NewsStatus: string
{
    case PUBLISHED = 'Published';
    case UNPUBLISHED = 'Unpublished';
}
