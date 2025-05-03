<?php

namespace App\Enums;

enum RelationType: string
{
    case MY_SELF = 'Myself';
    case FATHER = 'Father';
    case MOTHER = 'Mother';
    case GUARDIAN = 'Guardian';
    case OUTHERS = 'Others';
}
