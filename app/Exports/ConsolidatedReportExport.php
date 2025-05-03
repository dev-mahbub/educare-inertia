<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class ConsolidatedReportExport implements FromCollection, WithEvents
{
    protected $consolidatedReport = [];
    protected $academicYear;
    protected $classroomTitle;
    protected $teacherName;
    protected $headings = [
        'admission_no',
        'roll_no',
        'student_name',
        'exam_name',
        'total'
    ];


    public function __construct(array $consolidatedReport, string $academicYear, string $classroomTitle, string $teacherName)
    {
        $this->consolidatedReport = $consolidatedReport;
        $this->academicYear = $academicYear;
        $this->classroomTitle = $classroomTitle;
        $this->teacherName = $teacherName;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->consolidatedReport['reports'])) {
            $examSubjects = array_values($this->consolidatedReport['exam_subjects'] ?? []);

            foreach ($this->consolidatedReport['reports'] as $report) {
                if (!empty($report['exams'])) {
                    $index = 0;
                    foreach ($report['exams'] as $exam) {
                        foreach ($this->headings as $heading) {
                            if ($heading == 'exam_name') {
                                $rows[$count][] = $exam['exam_title'] ?? "";
                            } else if (in_array($heading, $examSubjects)) {
                                if (!empty($exam['subjects'])) {
                                    $subjects = array_filter($exam['subjects'], function ($subject) use ($heading) {
                                        return $subject['subject_title'] == $heading;
                                    });

                                    $subjects = !empty($subjects) ? array_values($subjects) : [];

                                    $rows[$count][] = !empty($subjects[0]['mark']) ? $subjects[0]['mark'] : "";
                                } else {
                                    $rows[$count][] = "";
                                }
                            } else if ($heading == 'total') {
                                $rows[$count][] = $exam['total_mark'] ?? "";
                            } else if ($index == 0 && in_array($heading, ['admission_no', 'roll_no', 'student_name'])) {
                                $rows[$count][] = $report['student'][$heading] ?? "";
                            } else {
                                $rows[$count][] = $report[$heading] ?? "";
                            }
                        }

                        $count++;
                        $index++;
                    }
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
                $event->sheet->setCellValue('A1', "Consolidated Report For Class - " . $this->classroomTitle . "(" . $this->academicYear . ")");

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
                $event->sheet->setCellValue('A2', "Teacher Name - " . $this->teacherName);

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


    /*
    * helper method to update headings
    */
    protected function updateHeadings()
    {
        if (!empty($this->consolidatedReport['exam_subjects'])) {
            $examSubjects = array_values($this->consolidatedReport['exam_subjects']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 4),
                $examSubjects,
                array_slice($this->headings, 4)
            );
        }
    }
}
