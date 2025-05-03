<?php

namespace App\Enums;

enum ContactReasonType: string
{
    case CONTACT_US = 'Contact Us';
    case ONLINE_FEE_ISSUE = 'Online Fee Issue';
    case TRANSPORT_REQUEST = 'Transport Request';
    case ONLINE_EXAM_ISSUE = 'Online Exam Issue';
    case REQUEST_ADD_SIBLING = 'Request to add a sibling';
    case FORGOT_ADMISSION_NUMBER = 'Forgot Admission number';
    case LOGIN_REQUEST = 'Login Request';
    case FEEDBACK = 'Feedback';
    case OTHERS = 'Others';
}