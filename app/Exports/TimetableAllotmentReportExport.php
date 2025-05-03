<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class TimetableAllotmentReportExport implements FromCollection, WithEvents
{
    protected $timetables = [];
    protected $schoolPeriods = [];
    protected $currentDate = "";
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $schoolShift = "";
    protected $headings = [
        'class' => 'Class'
    ];

    public function __construct(
        array $timetables = [],
        array $schoolPeriods = [],
        string $currentDate,
        string $schoolTitle = "",
        string $academicYear,
        string $schoolShift = ""
    ) {
        $this->timetables = $timetables;
        $this->schoolPeriods = $schoolPeriods;
        $this->currentDate = $currentDate;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->schoolShift = $schoolShift;

        $this->updateHeadings();
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->timetables)) {
            foreach ($this->timetables as $timetable) {
                foreach (array_keys($this->headings) as $key) {
                    if ($key == 'class') {
                        $rows[$count][] = $timetable['classroom_title'] ?? '';
                    } else {
                        if (!empty($timetable['period_data'][$key])) {
                            $teacherSubjectTitle = "";

                            foreach ($timetable['period_data'][$key] as $period) {
                                $teacherSubjectTitle .= ($period['teacher_name'] ?? '') . ' - ' . ($period['subject_title'] ?? '') . PHP_EOL;
                            }

                            $rows[$count][] = $teacherSubjectTitle;
                        } else {
                            $rows[$count][] = "N/A";
                        }
                    }
                }

                $count++;
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
                $event->sheet->setCellValue('A1', "$this->schoolTitle ($this->academicYear) - (Today Allotment Report)");

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
                $event->sheet->setCellValue('A2', "Date - $this->currentDate, Shift- $this->schoolShift");

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

                foreach (array_values($this->headings) as $index => $heading) {
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

    protected function updateHeadings()
    {
        if (!empty($this->schoolPeriods)) {
            $count = 1;

            foreach ($this->schoolPeriods as $schoolPeriod) {
                $startTime = $schoolPeriod['start_time'];
                $endTime = $schoolPeriod['end_time'];

                $this->headings[$schoolPeriod['id']] = "Period-{$count}" . PHP_EOL . "{$startTime} - {$endTime}";

                $count++;
            }
        }
    }
}
