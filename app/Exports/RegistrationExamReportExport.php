<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class RegistrationExamReportExport implements FromCollection, WithEvents
{
    protected $registrationExamReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";

    protected $headings = [
        'sr_no',
        'status',
        'student_name',
        'test_date',
        'registration_number',
        'parent_name',
        'contact_no',
        'percentage',
    ];


    public function __construct(array $registrationExamReport, string $schoolTitle, string $academicYear)
    {
        $this->registrationExamReport = $registrationExamReport;
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
        $srNo = 0;

        if (!empty($this->registrationExamReport)) {
            foreach ($this->registrationExamReport as $index => $report) {
                $srNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $srNo;
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;

                foreach ($this->headings as $index => $heading) {
                    if ($heading == 'status') {
                        $rows[$count][] = 'subject_name';
                    } else if ($heading == 'student_name') {
                        $rows[$count][] = 'full_marks';
                    } else if ($heading == 'test_date') {
                        $rows[$count][] = 'pass_marks';
                    } else if ($heading == 'registration_number') {
                        $rows[$count][] = 'obtained_marks';
                    } else if ($heading == 'parent_name') {
                        $rows[$count][] = 'result';
                    } else {
                        $rows[$count][] = "";
                    }
                }

                $count = count($rows) + 1;

                if (!empty($report['marks'])) {
                    foreach ($report['marks'] as $markItem) {
                        foreach ($this->headings as $index => $heading) {
                            if ($heading == 'status') {
                                $rows[$count][] = $markItem['subject_name'] ?? "";
                            } else if ($heading == 'student_name') {
                                $rows[$count][] = $markItem['full_marks'] ?? "";
                            } else if ($heading == 'test_date') {
                                $rows[$count][] = $markItem['pass_marks'] ?? "";
                            } else if ($heading == 'registration_number') {
                                $rows[$count][] = $markItem['obtained_marks'] ?? "";
                            } else if ($heading == 'parent_name') {
                                $rows[$count][] = $markItem['result'] ?? "";
                            } else {
                                $rows[$count][] = "";
                            }
                        }

                        $count++;
                    }
                }
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
                $event->sheet->mergeCells('A1:J1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', $this->schoolTitle . '(' . $this->academicYear . ')');

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'size' => 16,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);

                // second heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A2:J2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', 'Registration Exam Report');

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A2')->applyFromArray([
                    'font' => [
                        'size' => 16,
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
