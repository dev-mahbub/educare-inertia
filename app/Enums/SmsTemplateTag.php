<?php

namespace App\Enums;

enum SmsTemplateTag: string
{
    case STUDENTNAME = 'Student Name';
    case CLASSNAME = 'Class Name';
    case ROLLNO = 'Roll No';
    case PAYABLEAMOUNT = 'Payable Amount';
    case PAIDAMOUNT = 'Paid Amount';
}
