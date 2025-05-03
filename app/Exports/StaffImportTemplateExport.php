<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class StaffImportTemplateExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $headings = [
            'first_name',
            // 'middle_name',
            'last_name',
            'role',
            'gender',
            'mobile',
            'email',
            'pan_card',
            'aadhar_card',
            'qualification',
            'dob',
            'doj',
            'department',
            'designation',
            'address',
        ];

        // Create an empty collection with headings
        return collect([$headings]);
    }
}
