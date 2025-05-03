<?php

namespace App\Enums;

enum HolidayPolicyDayRule: string
{
    case EVERY = 'Every';
    case FIRST = 'First';
    case SECOND = 'Second';
    case THIRD = 'Third';
    case FOURTH = 'Fourth';
    case FIFTH = 'Fifth';
}