<?php

namespace App\Enums;

enum FileType: string
{
    case EXPENSES = 'Expenses';
    case GENERAL = 'General';
    case ATTACHMENTS = 'Attachments';
    case GALLERY = 'Gallery';
}
