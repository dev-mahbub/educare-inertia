<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class ExamMarkImportTemplateExport implements FromCollection
{
    protected $examMarks = [];

    protected $headings = [
        'roll_no',
        'admission_no',
        'student_name',
        'is_present',
        'marks',
    ];

    protected $paymentModeHeadings = ['payment_mode', 'amount'];


    public function __construct(array $examMarks) 
    {
        $this->examMarks = $examMarks;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->examMarks)) {
            foreach ($this->examMarks as $examMark) {
                foreach ($this->headings as $heading) {
                    $rows[$count][] = $examMark[$heading] ?? "";
                }

                $count++;
            }
        }

        return collect([$this->headings, $rows]);
    }
}
