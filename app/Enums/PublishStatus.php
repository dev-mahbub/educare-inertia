<?php

namespace App\Enums;

enum PublishStatus: string
{
    case PUBLISHED = 'Published';
    case NOT_PUBLISHED = 'Not Published';
}
