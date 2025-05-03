<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class ClassWiseStudentListReportExport implements FromCollection, WithEvents
{
    protected $classWiseStudentListReport = [];
    protected $schoolTitle;
    protected $academicYear;

    protected $headings = [
        'name',
        'class',
        'admission_no',
        'roll_no',
        'father_name',
        'father_mobile_no'
    ];


    public function __construct(
        array $classWiseStudentListReport,
        string $schoolTitle,
        string $academicYear
    ) {
        $this->classWiseStudentListReport = $classWiseStudentListReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->classWiseStudentListReport['reports'])) {
            foreach ($this->classWiseStudentListReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'class') {
                        $rows[$count][] = $report['classroom_title'] ?? "";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
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
                $event->sheet->setCellValue('A1', $this->schoolTitle);

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

                // second heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A2:Z2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', "Class Wise Students: {$this->academicYear}");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A2')->applyFromArray([
                    'font' => [
                        'size' => 13,
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
                $event->sheet->insertNewRowBefore(3);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 3, $heading);
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
