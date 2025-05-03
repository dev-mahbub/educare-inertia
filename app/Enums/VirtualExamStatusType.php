<?php

namespace App\Enums;

enum VirtualExamStatusType: string
{
    case TODAYS_EXAM = 'Todays Exam';
    case ATTEMPTED_EXAM = 'Attempted Exam';
    case UNATTEMPTED_EXAM = 'Unattempted Exam';
}