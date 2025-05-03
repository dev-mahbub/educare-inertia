<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class ManageChequeReportExport implements FromCollection
{
    protected $reports = [];


    public function __construct(array $reports)
    {
        $this->reports = $reports;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $headings = [
            'cheque_no',
            'cheque_date',
            'amount',
            'bank_name',
            'student_name',
            'class_name',
            'admission_no',
            'parent_name',
            'payment_date',
            'receipt_title',
            'receipt_no',
            'payment_note',
            'status',
        ];

        $rows = [];

        if (count($this->reports) > 0) {
            foreach ($this->reports as $index => $report) {
                foreach ($headings as $heading) {
                    $rows[$index][] = $report[$heading] ?? "";
                }
            }
        }

        // Create an empty collection with headings
        return collect([$headings, $rows]);
    }
}
