<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class SubjectWiseReportExport implements FromCollection, WithEvents
{
    protected $subjectWiseReport = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $classroomTitle;
    protected $subjectTitle;
    protected $headings = [
        'roll_no',
        'admission_no',
        'student_name',
        'percentage'
    ];

    public function __construct(array $subjectWiseReport, string $schoolTitle, string $academicYear, string $classroomTitle, string $subjectTitle)
    {
        $this->subjectWiseReport = $subjectWiseReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->classroomTitle = $classroomTitle;
        $this->subjectTitle = $subjectTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->subjectWiseReport['reports'])) {
            $subjectExams = $this->subjectWiseReport['subject_exams'] ?? [];

            $examTitles = array_map(function ($exam) {
                return $exam['exam_title'] . ' (' . ($exam['full_mark'] ?? 0) . ')';
            }, $subjectExams);

            foreach ($this->subjectWiseReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'percentage') {
                        $rows[$count][] = (!empty($report['total_percentage']) && $report['total_percentage'] > 0 ? $report['total_percentage'] : "0") . '%';
                    } else if (in_array($heading, $examTitles)) {
                        if (!empty($report['exams'])) {
                            $exams = array_filter($report['exams'], function ($exam) use ($heading) {
                                $examTitle = $exam['exam_title'] . ' (' . ($exam['full_mark'] ?? 0) . ')';
                                return $examTitle == $heading;
                            });

                            $exams = !empty($exams) ? array_values($exams) : [];

                            $rows[$count][] = !empty($exams[0]['mark']) ? $exams[0]['mark'] : "";
                        } else {
                            $rows[$count][] = "";
                        }
                    } else if (in_array($heading, ['admission_no', 'roll_no', 'student_name'])) {
                        $rows[$count][] = $report['student'][$heading] ?? "";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
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
                $event->sheet->setCellValue('A2', "Subject: $this->subjectTitle, Class: $this->classroomTitle ($this->academicYear)");

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
        if (!empty($this->subjectWiseReport['subject_exams'])) {
            $examTitles = array_map(function ($exam) {
                return $exam['exam_title'] . ' (' . ($exam['full_mark'] ?? 0) . ')';
            }, $this->subjectWiseReport['subject_exams']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 3),
                $examTitles,
                array_slice($this->headings, 3)
            );
        }
    }
}
