<?php

namespace App\Enums;

enum MailEngineType: string
{
    case SEND_MAIL = 'send mail';
    case SMTP = 'smtp';
    case AWS_SES = 'aws ses';
}
