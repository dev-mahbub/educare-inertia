<?php

namespace App\Enums;

enum EventType: string
{
    case CULTURAL = 'Cultural';
    case SPORTS = 'Sports';
    case ACADEMIC = 'Academic';
    case MEDICAL_CAMP = 'Medical Camp';
    case PTM = 'PTM';
    case ALUMNI = 'Alumni';
    case SPECIAL_ASSEMBLY = 'Special Assembly';
    case TRIP_AND_EXCURSION = 'Trip And Excursion';
    case CAMP = 'Camp';
    case REGISTRATION = 'Registration';
    case TEACHER_MEETING = 'Teacher Meeting';
    case OTHERS = 'Others';
}
