<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class VacantTeacherReportExport implements FromCollection, WithEvents
{
    protected $vacantTeachers = [];
    protected $schoolTitle = "";
    protected $schoolShift = "";
    protected $schoolPeriod = "";
    protected $headings = [
        'Sr.No',
        'Teacher Name',
        'Gender',
        'Employee Id',
        'Phone',
        'Teacher Subject Class'
    ];

    public function __construct(array $vacantTeachers = [], string $schoolTitle = "", string $schoolShift = "", string $schoolPeriod = "")
    {
        $this->vacantTeachers = $vacantTeachers;
        $this->schoolTitle = $schoolTitle;
        $this->schoolShift = $schoolShift;
        $this->schoolPeriod = $schoolPeriod;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->vacantTeachers)) {
            foreach ($this->vacantTeachers as $index => $teacher) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'Sr.No') {
                        $rows[$count][] = $index + 1;
                    } else if ($heading == 'Teacher Name') {
                        $rows[$count][] = trim(implode(' ', [$teacher?->first_name, $teacher?->middle_name, $teacher?->last_name]));
                    } else if ($heading == 'Gender') {
                        $rows[$count][] = $teacher->gender ?? '';
                    } else if ($heading == 'Employee Id') {
                        $rows[$count][] = $teacher->employee_id ?? '';
                    } else if ($heading == 'Phone') {
                        $rows[$count][] = $teacher->phone ?? '';
                    } else if ($heading == 'Teacher Subject Class') {
                        $classroomSubjectTitle = "";

                        if (!empty($teacher['classroom_subjects'])) {
                            foreach ($teacher['classroom_subjects'] as $classroomSubject) {
                                $classroomSubjectTitle .= ($classroomSubject['subject_title'] ?? '') . ' - ' . ($classroomSubject['classroom_title'] ?? '') . PHP_EOL;
                            }
                        }

                        $rows[$count][] = $classroomSubjectTitle;
                    } else {
                        $rows[$count][] = $teacher[$heading] ?? "";
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
                $event->sheet->setCellValue('A2', "TimeTable Vacant Teachers, Shift- $this->schoolShift, Period- $this->schoolPeriod");

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
