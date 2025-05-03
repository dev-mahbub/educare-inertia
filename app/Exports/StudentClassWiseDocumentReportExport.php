<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentClassWiseDocumentReportExport implements FromCollection, WithEvents
{
    protected $studentDocumentReports = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $classroomTitle;
    protected $documentCategory;
    protected $headings = [
        'sr_no',
        'full_name',
        'admission_number',
        'father_name',
        'father_mobile'
    ];

    public function __construct(array $studentDocumentReports, string $schoolTitle, string $academicYear, string $classroomTitle, string $documentCategory)
    {
        $this->studentDocumentReports = $studentDocumentReports;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->classroomTitle = $classroomTitle;
        $this->documentCategory = $documentCategory;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        // document submitted report
        $count = 0;

        for ($i = 0; $i < 5; $i++) {
            $rows[$count][] = "";

            $count++;
        }

        if (!empty($this->studentDocumentReports['document_submitted'])) {
            foreach ($this->studentDocumentReports['document_submitted'] as $report) {
                foreach ($this->headings as $heading) {
                    $rows[$count][] = $report[$heading] ?? "";
                }

                $count++;
            }
        }

        for ($i = 0; $i < 3; $i++) {
            $rows[$count][] = "";

            $count++;
        }

        // document not submitted report
        $count += 4;

        if (!empty($this->studentDocumentReports['document_not_submitted'])) {
            foreach ($this->studentDocumentReports['document_not_submitted'] as $report) {
                foreach ($this->headings as $heading) {
                    $rows[$count][] = $report[$heading] ?? "";
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
                $event->sheet->mergeCells('A2:Z2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', "Academic Session: $this->academicYear, Class: $this->classroomTitle, Type: $this->documentCategory");

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

                // third heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A4:Z4');

                // Set heading for merged cells
                $event->sheet->setCellValue('A4', "$this->documentCategory Submitted");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A4')->applyFromArray([
                    'font' => [
                        'size' => 14,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);

                // Insert Headings Row for Submitted Documents
                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 5, $heading);
                }

                // TC Not Submitted Heading
                $rowIndex = count($this->studentDocumentReports['document_submitted'] ?? []) + 7; // Adjusted to move below the last submitted document
                $event->sheet->mergeCells("A$rowIndex:Z$rowIndex");
                $event->sheet->setCellValue("A$rowIndex", "$this->documentCategory Not Submitted");
                $event->sheet->getStyle("A$rowIndex")->applyFromArray([
                    'font' => ['size' => 14],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // Insert Headings Row for Not Submitted Documents
                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, $rowIndex + 1, $heading);
                }
            }
        ];
    }
}
