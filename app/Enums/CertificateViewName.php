<?php

namespace App\Enums;

enum CertificateViewName: string
{
    case TRANSFER_CERTIFICATE = 'TransferCertificate';
    case FEE_CERTIFICATE = 'FeeCertificate';
    case BONAFIDE_CERTIFICATE = 'BonafideCertificate';
    case CHARACTER_CERTIFICATE = 'CharacterCertificate';
        // admit card
        // case ADMIT_CARD = 'AdmitCard';
    case ADMIT_CARD_1 = 'AdmitCard_1';
    case ADMIT_CARD_2 = 'AdmitCard_2';
    case ADMIT_CARD_3 = 'AdmitCard_3';
    case ADMIT_CARD_4 = 'AdmitCard_4';
    case ADMIT_CARD_5 = 'AdmitCard_5';
    case ADMIT_CARD_6 = 'AdmitCard_6';
    case ADMIT_CARD_7 = 'AdmitCard_7';
    case ADMIT_CARD_8 = 'AdmitCard_8';
    case ADMIT_CARD_9 = 'AdmitCard_9';

    case STUDENT_ID_CARD = 'StudentIDCard';
    case TEACHER_ID_CARD = 'TeacherIDCard';
    case EXPERIENCE_CERTIFICATE = 'ExperienceCertificate';
}
