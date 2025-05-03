<?php

namespace App\Enums;

enum VirtualExamMode: string
{
    case PRACTICEEXAM = 'Practice Exam';
    case TESTEXAM = 'Test Exam';
    case REVISIONEXAM = 'Revision Exam';
}