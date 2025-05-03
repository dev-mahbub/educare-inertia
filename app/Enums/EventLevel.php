<?php

namespace App\Enums;

enum EventLevel: string
{
    case SCHOOL = 'School';
    case INTER_SCHOOL = 'Inter School';
    case DISTRICT = 'District';
    case STATE = 'State';
    case NATIONAL = 'Natioanl';
}
