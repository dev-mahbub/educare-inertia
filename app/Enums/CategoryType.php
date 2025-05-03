<?php

namespace App\Enums;

enum CategoryType: string
{
    case COURSE = 'Course';
    case EVENT = 'Event';
    case ADMISSION = 'Admission';
    case PRODUCT = 'Product';
    case BOOK = 'Book';
    case CASTE = 'Caste';
}
