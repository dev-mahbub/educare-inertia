<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentRouteReportExport implements FromCollection, WithEvents
{
    protected $studentRouteReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $routeName = "";

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
        'Vehicle No',
        'PickUp Time',
        'Drop Time',
        'Transport Fee'
    ];


    public function __construct(array $studentRouteReport, string $schoolTitle, string $academicYear, string $routeName = '')
    {
        $this->studentRouteReport = $studentRouteReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->routeName = $routeName;
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
        if (!empty($this->studentRouteReport['reports'])) {
            foreach ($this->studentRouteReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'Sr.No') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'Student Name') {
                        $rows[$count][] = ($report['student']['first_name'] ?? '') . ' ' . ($report['student']['middle_name'] ?? '') . ' ' . ($report['student']['last_name'] ?? '');
                    } else if ($heading == 'Admission Number') {
                        $rows[$count][] = $report['student']['admission_no'] ?? '';
                    } else if ($heading == 'Class Name') {
                        $rows[$count][] = $report['student']['classroom']['title'] ?? '';
                    } else if ($heading == 'Roll No') {
                        $rows[$count][] = $report['student']['classroom_roll']['roll_no'] ?? '';
                    } else if ($heading == 'Route Name') {
                        $rows[$count][] = $report['transport_route']['name'] ?? '';
                    } else if ($heading == 'Stoppage Name') {
                        $rows[$count][] = $report['transport_stoppage']['stoppage'] ?? '';
                    } else if ($heading == 'Parent Name') {
                        $rows[$count][] = ($report['student']['father']['first_name'] ?? '') . ' ' . ($report['student']['father']['middle_name'] ?? '') . ' ' . ($report['student']['father']['last_name'] ?? '');
                    } else if ($heading == 'Parent Phone') {
                        $rows[$count][] = $report['student']['father']['phone'] ?? '';
                    } else if ($heading == 'Vehicle No') {
                        $rows[$count][] = $report['transport_route']['vehicle']['vehicle_number'] ?? '';
                    } else if ($heading == 'PickUp Time') {
                        $rows[$count][] = $report['transport_stoppage']['pickup_time'] ?? '';
                    } else if ($heading == 'Drop Time') {
                        $rows[$count][] = $report['transport_stoppage']['drop_time'] ?? '';
                    } else if ($heading == 'Transport Fee') {
                        $amount = $report['amount'] ?? 0;

                        $rows[$count][] = $amount > 0 ? $amount : '0';
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
                $srNo++;
            }

            // total row
            foreach ($this->headings as $heading) {
                if ($heading == 'Drop Time') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'Transport Fee') {
                    $rows[$count][] = $this->studentRouteReport['total_amount'] ?? '0';
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
                $event->sheet->setCellValue('A2', "Route Wise Student Transport List - $this->academicYear");

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
                $event->sheet->setCellValue('A3', "Route - $this->routeName");

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
