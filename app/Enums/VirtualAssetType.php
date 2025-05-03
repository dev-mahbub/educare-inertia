<?php

namespace App\Enums;

enum VirtualAssetType: string
{
    case PASSAGE = 'Passage';
    case IMAGE = 'Image';
    case AUDIO = 'Audio';
    case VIDEO = 'Video';
}