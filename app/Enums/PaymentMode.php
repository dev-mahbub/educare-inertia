<?php

namespace App\Enums;

enum PaymentMode: string
{
    case CASH = 'Cash';
    case CHEQUE = 'Cheque';
    case BANKPROCESS = 'Bank Process';
    case DEMANDDRAFT = 'Demand Draft';
    case PAYTM = 'Paytm';
    case NEFT = 'Neft';
    case ONLINE = 'Online';
    case OTHER = 'Other';
    case CARDSWAP = 'Card Swap';
    case SBI = 'SBI';
    case HDFC = 'HDFC';
    case ONLINEBACKOFFICE = 'Online Back Office';
    case UPI = 'UPI';
    case EMPLOYEEWARD = 'Employee Ward';
    case RTGS = 'RTGS';
}
