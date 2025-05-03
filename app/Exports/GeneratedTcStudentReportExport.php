<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class GeneratedTcStudentReportExport implements FromCollection
{
    protected $generatedTcReport = [];

    protected $headings = [
        'sr_no',
        'student_name',
        'roll_number',
        'admission_no',
        'class_name',
        'father_name',
        'mobile',
        'tc_no',
        'tc_date',
        'tc_reason'
    ];

    public function __construct(
        array $generatedTcReport
    ) {
        $this->generatedTcReport = $generatedTcReport;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srNo = 0;

        if (!empty($this->generatedTcReport)) {
            foreach ($this->generatedTcReport as $report) {
                $srNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $srNo;;
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }
        }

        return collect([$this->headings, $rows]);
    }
}
