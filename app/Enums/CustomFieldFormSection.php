<?php

namespace App\Enums;

enum CustomFieldFormSection: string
{
    case STUDENT_ACADEMIC_DETAILS = 'Student Academic Details';
    case STUDENT_PERSONAL_DETAILS = 'Student Personal Details';
    case STUDENT_BANK_DETAILS = "Student Bank Details";
    case PREVIOUS_SCHOOL_DETAILS = "Previous School Details";
    case FATHERS_DETAILS = "Father's Details";
    case MOTHERS_DETAILS = "Mother's Details";
    case GUARDIAN_DETAILS = "Guardian Details";
    case PRESENT_ADDRESS = "Present Address";
    case PERMANENT_ADDRESS = "Permanent Address";
    case STUDENT_DETAILS_FOR_REGISTRATION = "Student Details For Registration";
    case FATHER_DETAILS_FOR_REGISTRATION = "Father Details For Registration";
    case MOTHER_DETAILS_FOR_REGISTRATION = "Mother Details For Registration";
    case PRESENT_ADDRESS_FOR_REGISTRATION = "Present Address For Registration";
    case PERMANENT_ADDRESS_FOR_REGISTRATION = "Permanent Address For Registration";
}
