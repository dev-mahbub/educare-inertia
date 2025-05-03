<?php

namespace App\Enums;

enum ExamStatus: string
{
    case PUBLISHED = 'Published';
    case UNPUBLISHED = 'Unpublished';
}
