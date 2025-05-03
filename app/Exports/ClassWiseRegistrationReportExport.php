<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class ClassWiseRegistrationReportExport implements FromCollection, WithEvents
{
    protected $classWiseReport = [];
    protected $schoolTitle = "";

    protected $headings = [
        'class_name',
        'total_registration',
        'total_admission',
        'total_fee'
    ];


    public function __construct(array $classWiseReport, string $schoolTitle)
    {
        $this->classWiseReport = $classWiseReport;
        $this->schoolTitle = $schoolTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->classWiseReport['reports'])) {
            foreach ($this->classWiseReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['total_registration', 'total_admission', 'total_fee'])) {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'class_name') {
                    $rows[$rows_count][] = 'Total';
                } else {
                    $rows[$rows_count][] = ($this->classWiseReport[$heading] ?? 0) > 0 ? $this->classWiseReport[$heading] : "0";
                }
            }
        }

        // Create an empty collection with headings
        return collect([$rows]);
    }


    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // first heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:Z1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', strtoupper($this->schoolTitle) . " - (Admission Class Wise Collection Report)");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'size' => 14,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(2);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 2, $heading);
                }

                // Optionally, you can format the heading row
                $event->sheet->getStyle('A2:H2')->applyFromArray([
                    'font' => [
                        'size' => 12,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);
            },
        ];
    }
}
