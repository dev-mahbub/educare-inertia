<?php

namespace App\Enums;

enum ShareAudienceType: string
{
    case PRIVATE = 'Private';
    case ANYONE_ON_INTERNET = 'Anyone on Internet';
    case SHARED_WITH_SCHOOL = 'Shared with school';
}
