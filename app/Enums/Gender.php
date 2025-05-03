<?php

namespace App\Enums;

enum Gender: string
{
    case BOY = 'Boy';
    case GIRL = 'Girl';
    case MALE = 'Male';
    case FEMALE = 'Female';
    case COMMON = 'Common';
}