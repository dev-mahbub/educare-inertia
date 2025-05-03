<?php

namespace App\Enums;

enum WebmessageAudienceType: string
{
    case PARENTS = 'Parents';
    case TEACHERS = 'Teachers';
    case ALUMNI = 'Alumni';
    case TEAM = 'Team';
}