<?php

namespace App\Enums;

enum OrderByType: string
{
    case CREATED_DATE = 'Created Date';
    case PUBLISHED_DATE = 'Published Date';
}
