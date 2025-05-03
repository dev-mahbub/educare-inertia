<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class StudentInactiveReportExport implements FromCollection
{
    protected $studentInactiveReport = [];

    protected $headings  = [
        'sr_no',
        'roll_no',
        'student_name',
        'admission_no',
        'class_name',
        'father_name',
        'mobile',
        'inactive_date',
        'inactive_reason'
    ];

    public function __construct(array $studentInactiveReport)
    {
        $this->studentInactiveReport = $studentInactiveReport;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srnNo = 0;

        if (!empty($this->studentInactiveReport)) {
            foreach ($this->studentInactiveReport as $report) {
                $srnNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $srnNo;
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }
        }

        // Create an empty collection with headings
        return collect([$this->headings, $rows]);
    }
}
