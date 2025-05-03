<?php

namespace App\Enums;

enum PageType: string
{
    case ABOUT_US = 'About Us';
    case CONTACT_US = 'Contact Us';
    case PRIVACY_POLICY = 'Privacy Policy';
    case TERM_CONDITION = 'Terms & Conditions';
    case CANCELLATION = 'Cancellation/Refund Policy';
}