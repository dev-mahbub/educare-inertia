<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class MasterClassWiseDailyAttendanceReportExport implements FromCollection, WithEvents
{
    protected $attendanceReport = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $attendanceReportDate;
    protected $headings = [
        'class_name',
        'total_student',
        'present',
        'absent',
        'leave'
    ];

    public function __construct(array $attendanceReport, string $schoolTitle, string $academicYear, string $attendanceReportDate)
    {
        $this->attendanceReport = $attendanceReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->attendanceReportDate = $attendanceReportDate;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        // classroom wise report
        if (!empty($this->attendanceReport['classroom_wise']['reports'])) {
            foreach ($this->attendanceReport['classroom_wise']['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['present', 'absent', 'leave', 'total_student'])) {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }

            foreach ($this->headings as $heading) {
                if ($heading == 'class_name') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'total_student') {
                    $rows[$count][] = ($this->attendanceReport['classroom_wise']['total_student'] ?? 0) > 0 ? $this->attendanceReport['classroom_wise']['total_student'] : "0";
                } else if ($heading == 'present') {
                    $rows[$count][] = ($this->attendanceReport['classroom_wise']['total_present'] ?? 0) > 0 ? $this->attendanceReport['classroom_wise']['total_present'] : "0";
                } else  if ($heading == 'absent') {
                    $rows[$count][] = ($this->attendanceReport['classroom_wise']['total_absent'] ?? 0) > 0 ? $this->attendanceReport['classroom_wise']['total_absent'] : "0";
                } else if ($heading == 'leave') {
                    $rows[$count][] = ($this->attendanceReport['classroom_wise']['total_leave'] ?? 0) > 0 ? $this->attendanceReport['classroom_wise']['total_leave'] : "0";
                } else {
                    $rows[$count][] = "";
                }
            }
        }

        // class wise report
        if (!empty($this->attendanceReport['class_wise']['reports'])) {
            $rowsCount = count($rows);

            for ($i = 0; $i < 2; $i++) {
                $rows[$rowsCount][] = "";

                $rowsCount++;
            }

            foreach ($this->headings as $heading) {
                if ($heading == 'class_name') {
                    $rows[$rowsCount][] = 'class_name';
                } else if ($heading == 'total_student') {
                    $rows[$rowsCount][] = 'total_student';
                } else if ($heading == 'present') {
                    $rows[$rowsCount][] = 'present';
                } else  if ($heading == 'absent') {
                    $rows[$rowsCount][] = 'percentage';
                } else {
                    $rows[$rowsCount][] = "";
                }
            }

            $rowsCount++;

            foreach ($this->attendanceReport['class_wise']['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['present', 'total_student'])) {
                        $rows[$rowsCount][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else if ($heading == 'absent') {
                        $rows[$rowsCount][] = ($report['percentage'] ?? 0) > 0 ? $report['percentage'] : "0";
                    } else {
                        $rows[$rowsCount][] = $report[$heading] ?? "";
                    }
                }

                $rowsCount++;
            }

            foreach ($this->headings as $heading) {
                if ($heading == 'class_name') {
                    $rows[$rowsCount][] = 'Total';
                } else if ($heading == 'total_student') {
                    $rows[$rowsCount][] = ($this->attendanceReport['class_wise']['total_student'] ?? 0) > 0 ? $this->attendanceReport['class_wise']['total_student'] : "0";
                } else if ($heading == 'present') {
                    $rows[$rowsCount][] = ($this->attendanceReport['class_wise']['total_present'] ?? 0) > 0 ? $this->attendanceReport['class_wise']['total_present'] : "0";
                } else  if ($heading == 'absent') {
                    $rows[$rowsCount][] = ($this->attendanceReport['class_wise']['total_percentage'] ?? 0) > 0 ? $this->attendanceReport['class_wise']['total_percentage'] : "0";
                } else {
                    $rows[$rowsCount][] = "";
                }
            }
        }

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
                $event->sheet->setCellValue('A2', "Masterclass wise daily attendance report ($this->academicYear)");

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

                // third heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A3:Z3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', "Date - $this->attendanceReportDate");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
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
                $event->sheet->insertNewRowBefore(4);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 4, $heading);
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
