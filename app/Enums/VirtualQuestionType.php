<?php

namespace App\Enums;

enum VirtualQuestionType: string
{
    case MULTIPLE_CHOICE = 'Multiple Choice';
    case MULTIPLE_SELECTION = 'Multiple Selection';
    case FILL_IN_THE_BLANKS = 'Fill in the blanks';
    case YES_OR_NO = 'Yes/No';
    case DESCRIPTIVE = 'Descriptive';
    case SHORT_ANSWER = 'Short Answer';
}
