<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StaffAttendanceReportExport implements FromCollection, WithEvents
{
    protected $staffAttendanceReport = [];
    protected $schoolTitle = "";
    protected $attendanceDateTitle = "";

    protected $headings = [
        'employee_id',
        'name',
        'attendance',
        'leave_day',
    ];


    public function __construct(array $staffAttendanceReport, string $schoolTitle, string $attendanceDateTitle)
    {
        $this->staffAttendanceReport = $staffAttendanceReport;
        $this->schoolTitle = $schoolTitle;
        $this->attendanceDateTitle = $attendanceDateTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        $attendanceType = [
            'present' => 'PRESENT',
            'absent' => 'ABSENT',
            'halfday' => 'HALF DAY',
            'onleave' => 'ON LEAVE',
            'onweek' => 'WEEKLY OFF',
        ];

        if (!empty($this->staffAttendanceReport)) {
            foreach ($this->staffAttendanceReport as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'employee_id') {
                        $rows[$count][] = ($report[$heading] ?? "") == 0 ? "0" : ($report[$heading] ?? "");
                    } else if ($heading == 'attendance') {
                        $rows[$count][] = !empty($report[$heading]) ? ($attendanceType[$report[$heading]] ?? "") : "";
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
                $event->sheet->setCellValue('A2', "Date:" . $this->attendanceDateTitle);

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A2')->applyFromArray([
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
                $event->sheet->insertNewRowBefore(3);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 3, $heading);
                }

                // Optionally, you can format the heading row
                $event->sheet->getStyle('A3:H3')->applyFromArray([
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
