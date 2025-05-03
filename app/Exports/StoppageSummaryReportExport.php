<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StoppageSummaryReportExport implements FromCollection, WithEvents
{
    protected $stoppageSummaryReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";

    protected $headings = [
        'Sr.No',
        'Stoppage',
        'No. of Students'
    ];

    public function __construct(array $stoppageSummaryReport, string $schoolTitle, string $academicYear)
    {
        $this->stoppageSummaryReport = $stoppageSummaryReport;
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
        $srNo = 1;

        // route summary report
        if (!empty($this->stoppageSummaryReport['reports'])) {

            foreach ($this->stoppageSummaryReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'Sr.No') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'Stoppage') {
                        $rows[$count][] = $report['stoppage_name'] ?? '';
                    } else if ($heading == 'No. of Students') {
                        $studentCount = $report['student_count'] ?? 0;

                        $rows[$count][] = $studentCount > 0 ? $studentCount : '0';
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
                $srNo++;
            }

            // total row
            foreach ($this->headings as $heading) {
                if ($heading == 'Stoppage') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'No. of Students') {
                    $rows[$count][] = $this->stoppageSummaryReport['total_student_count'] ?? '0';
                } else {
                    $rows[$count][] = $report[$heading] ?? "";
                }
            }
        }

        // Create an empty collection with headings
        return collect([$rows]);
    }


    public function registerEvents(): array
    {
        return [
            BeforeSheet::class => function (BeforeSheet $event) {
                // first heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:Z1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', "$this->schoolTitle");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'size' => 16,
                        'bold' => true
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
                $event->sheet->setCellValue('A2', "Stoppage Wise Consolidated Transport List - $this->academicYear");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A2')->applyFromArray([
                    'font' => [
                        'size' => 14,
                        'bold' => true
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);

                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(3);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 3, $heading);
                }

                // Optionally, you can format the heading row
                $event->sheet->getStyle('A3:H3')->applyFromArray([
                    'font' => [
                        'size' => 12,
                        'bold' => false
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
