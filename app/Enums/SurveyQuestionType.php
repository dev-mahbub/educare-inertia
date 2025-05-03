<?php

namespace App\Enums;

enum SurveyQuestionType: string
{
    case TEXT = 'Text';
    case PARAGRAPH = 'Paragraph';
    case DATE = 'Date';
    case RANGE = 'Range';
    case MULTIPLE_CHOICE = 'Multiple Choice';
    case CHECKBOX = 'Checkbox';
}
