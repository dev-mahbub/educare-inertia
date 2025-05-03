<?php

namespace App\Enums;

enum EventStatus: string
{
    case PUBLISHED = 'Published';
    case UNPUBLISHED = 'Unpublished';
}
