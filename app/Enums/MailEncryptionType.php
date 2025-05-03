<?php

namespace App\Enums;

enum MailEncryptionType: string
{
    case SSL = 'ssl';
    case TLS = 'tls';
}
