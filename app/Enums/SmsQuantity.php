<?php

namespace App\Enums;

enum SmsQuantity: int
{
    case FIVE_HUNDRED = 500;
    case ONE_THOUSAND = 1000;
    case TWO_THOUSAND_FIVE_HUNDRED = 2500;
    case FIVE_THOUSAND = 5000;
    case TEN_THOUSAND = 10000;
    case TWENTY_FIVE_THOUSAND = 25000;
    case FIFTY_THOUSAND = 50000;
    case ONE_HUNDRED_THOUSAND = 100000;
}
