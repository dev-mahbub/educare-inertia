<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentStoppageReportExport implements FromCollection, WithEvents
{
    protected $studentStoppageReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $stoppageName = "";

    protected $headings = [
        'Sr.No',
        'Student Name',
        'Admission Number',
        'Class Name',
        'Roll No',
        'Route Name',
        'Stoppage Name',
        'Parent Name',
        'Parent Phone',
        'Vehicle No'
    ];


    public function __construct(array $studentStoppageReport, string $schoolTitle, string $academicYear, string $stoppageName = '')
    {
        $this->studentStoppageReport = $studentStoppageReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->stoppageName = $stoppageName;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srNo = 1;

        // student route report
        if (!empty($this->studentStoppageReport)) {
            foreach ($this->studentStoppageReport as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'Sr.No') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'Student Name') {
                        $rows[$count][] = $report['student_name'] ?? '';
                    } else if ($heading == 'Admission Number') {
                        $rows[$count][] = $report['admission_no'] ?? '';
                    } else if ($heading == 'Class Name') {
                        $rows[$count][] = $report['classroom_title'] ?? '';
                    } else if ($heading == 'Roll No') {
                        $rows[$count][] = $report['roll_no'] ?? '';
                    } else if ($heading == 'Route Name') {
                        $rows[$count][] = $report['route_name'] ?? '';
                    } else if ($heading == 'Stoppage Name') {
                        $rows[$count][] = $report['stoppage_name'] ?? '';
                    } else if ($heading == 'Parent Name') {
                        $rows[$count][] = $report['father_name'];
                    } else if ($heading == 'Parent Phone') {
                        $rows[$count][] = $report['father_phone'] ?? '';
                    } else if ($heading == 'Vehicle No') {
                        $rows[$count][] = $report['vehicle_number'] ?? '';
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
                $srNo++;
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
                $event->sheet->setCellValue('A2', "Stoppage Wise Student Transport List - $this->academicYear");

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

                // third heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A3:Z3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', "Stoppage - $this->stoppageName");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
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
                $event->sheet->insertNewRowBefore(4);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 4, $heading);
                }

                // Optionally, you can format the heading row
                $event->sheet->getStyle('A4:H4')->applyFromArray([
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
