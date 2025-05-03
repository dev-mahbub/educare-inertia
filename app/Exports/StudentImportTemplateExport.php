<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class StudentImportTemplateExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $headings = [
            'admission_no',
            'email',
            'class',
            'section',
            'roll_number',
            'status',
            'student_first_name',
            'student_middle_name',
            'student_last_name',
            'gender',
            'address',
            'category',
            'dob',
            'doa',
            'blood_group',
            'aadhar_card_no',
            'religion',
            'father_first_name',
            'father_middle_name',
            'father_last_name',
            'father_phone',
            'sms_no',
            'father_email',
            'primary_qualification',
            'father_occupation',
            'father_company',
            'father_designation',
            'mother_first_name',
            'mother_middle_name',
            'mother_last_name',
            // 'secondary_phone',
            // 'secondary_email',
            // 'secondary_qualification',
            // 'secondary_occupation',
            // 'secondary_company',
            // 'secondary_designation',
            'guardian_name',
            'guardian_relation',
            'guardian_qualification',
            'guardian_occupation',
            'guardian_designation',
            'guardian_department',
            'guardian_office_address',
            'guardian_conact_no',
            'bank',
            'bank_code_no',
            'branch_name',
            'ifsc',
            'account_number',
            'micr',
            'student_type',
            'house',
            'mother_tongue',
            'caste',
            'father_aadhar',
            'mother_aadhar',
            'admission_class',
            'student_height',
            'student_weight',
            'samagra_id',
            'child_id',
        ];

        // Create an empty collection with headings
        return collect([$headings]);
    }
}
