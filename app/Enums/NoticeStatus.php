<?php

namespace App\Enums;

enum NoticeStatus: string
{
    case PUBLISHED = 'Published';
    case UNPUBLISHED = 'Unpublished';
}
