<?php

namespace App\Enums;

enum HomeworkStatus: string
{
    case NEW = 'New';
    case SUBMITTED = 'Submitted';
    case INPROGRESS = 'In-Progress';
    case REWORK = 'Re-Work';
    case COMPLETED = 'Completed';
}