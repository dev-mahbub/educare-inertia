<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExamWiseReportExport implements FromCollection, WithEvents
{
    protected $examWiseReport = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $classroomTitle;
    protected $examTitle;

    protected $headings = [
        'admission_no',
        'roll_no',
        'student_name',
        'exam_name',
        'father_name',
        'total'
    ];


    public function __construct(array $examWiseReport, string $schoolTitle, string $academicYear, string $classroomTitle, string $examTitle)
    {
        $this->examWiseReport = $examWiseReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->classroomTitle = $classroomTitle;
        $this->examTitle = $examTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->examWiseReport['reports'])) {
            $subjectNames = array_values($this->examWiseReport['exam_subjects'] ?? []);

            foreach ($this->examWiseReport['reports'] as $report) {
                $exams = array_values($report['exams']);

                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['admission_no', 'roll_no', 'student_name', 'father_name'])) {
                        $rows[$count][] = $report['student'][$heading] ?? "";
                    } else if ($heading == 'exam_name') {
                        $rows[$count][] = $exams[0]['exam_title'] ?? "";
                    } else if (in_array($heading, $subjectNames)) {
                        if (!empty($exams[0]['subjects'])) {
                            foreach ($exams[0]['subjects'] as $subject) {
                                if ($subject['subject_title'] == $heading) {
                                    $rows[$count][] = $subject['mark'] ?? '';
                                }
                            }
                        }
                    } else if ($heading == 'total') {
                        $rows[$count][] = ($exams[0]['total_mark'] ?? 0) > 0 ? $exams[0]['total_mark'] : "0";
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
                $event->sheet->setCellValue('A2', $this->academicYear);

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
                $event->sheet->setCellValue('A3', "Class : " . $this->classroomTitle . ", Exam : " . $this->examTitle);

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


    /*
    * helper method to update headings
    */
    protected function updateHeadings()
    {
        if (!empty($this->examWiseReport['exam_subjects'])) {
            $subjectNames = array_values($this->examWiseReport['exam_subjects']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 5),
                $subjectNames,
                array_slice($this->headings, 5)
            );
        }
    }
}
