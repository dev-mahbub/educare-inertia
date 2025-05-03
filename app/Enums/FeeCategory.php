<?php

namespace App\Enums;

enum FeeCategory: string
{
    case MONTHLYFEE = 'Monthly fee';
    case EXAMFEE = 'Exam fee';
    case IDCARDFEE = 'id card fee';
    case DEVELOPMENTFEE = 'Development fee';
    case TRANSPORTATIONFEE = 'Transportation Fee';
    case TUITIONFEE = 'Tution fee';
    case LAB = 'lab';
    case ANNUALFEE = 'Annual fee';
    case TRANSPORT = 'Transport';
    case BACKDUE = 'Back due';
    case IDCARD = 'id card';
    case RTE = 'rte';
    case LABORATORYFEE = 'laboratory fee';
    case MSOFFICE = 'msoffice';
    case SUMMERCAMPCHARGES = 'Summer camp charges';
    case REGISTRATIONFEE = 'Registration Fee';
    case STUDENTDOCFEE = 'Student doc Fee';
    case SCHOOLGAMESFEE = 'School Games Fee';
    case ABC = 'abc';
    case XYZABC = 'xyzabc';
    case ADMISSIONFEES = 'Admission fees';
    case LATEFEE = 'Late Fee';
    case COMPOSITIONFEE = 'composition fee';
    case SPORTSFEE = 'sports fee';
    case ANNUALDAYFEE = 'annual day fee';
}
