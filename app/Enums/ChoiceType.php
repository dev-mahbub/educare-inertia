<?php

namespace App\Enums;

enum ChoiceType: string
{
    case MULTIPLE_CHOICE = 'Multiple Choice';
    case MULTIPLE_SELECTION = 'Multiple Selection';
    case TRUE_FALSE = 'True/False';
}