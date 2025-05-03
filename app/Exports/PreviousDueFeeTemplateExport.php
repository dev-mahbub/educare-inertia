<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class PreviousDueFeeTemplateExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $headings = [
            'admission_no',
            'amount',
        ];

        // Create an empty collection with headings
        return collect([$headings]);
    }
}
