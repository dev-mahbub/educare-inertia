<?php

namespace App\Enums;

enum ResourceType: string
{
    case LINK = 'Link';
    case YOUTUBE = 'Youtube';
    case WORKSHEET = 'WorkSheet';
    case PICTURE = 'Picture';
    case DOCUMENT = 'Document';
    case AUDIO = 'Audio';
    case TEXT = 'Text';
}
