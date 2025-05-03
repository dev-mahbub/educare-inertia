<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class CompleteFeePaidReportExport implements FromCollection, WithEvents
{
    protected $completeFeePaidReport = [];
    protected $classroomTitle;
    protected $reportTitle;

    protected $headings = [
        'roll',
        'admission_no',
        'student_type',
        'name',
        'parent',
        'class',
        'mobile_no',
        'address',
        'total_paid_amount'
    ];


    public function __construct(array $completeFeePaidReport, string $classroomTitle, string $reportTitle)
    {
        $this->completeFeePaidReport = $completeFeePaidReport;
        $this->classroomTitle = $classroomTitle;
        $this->reportTitle = $reportTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->completeFeePaidReport['reports'])) {
            $feeTypeKeys = array_keys($this->completeFeePaidReport['installment_wise_amounts'] ?? []);

            foreach ($this->completeFeePaidReport['reports'] as $report) {

                foreach ($this->headings as $heading) {
                    if (in_array($heading, $feeTypeKeys)) {
                        $rows[$count][] = ($report['installment_wise_amounts'][$heading] ?? 0) > 0 ? $report['installment_wise_amounts'][$heading] : "0";
                    } else if ($heading == 'total_paid_amount') {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
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
                $event->sheet->setCellValue('A1', "Paid Report");

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
                $event->sheet->setCellValue('A2', $this->reportTitle);

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
                $event->sheet->setCellValue('A3', "Class : " . $this->classroomTitle . "--Total Paid : " . ($this->completeFeePaidReport['total_paid_amount'] ?? 0));

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
        if (!empty($this->completeFeePaidReport['installment_wise_amounts'])) {
            $feeTypeAmountsKeys = array_keys($this->completeFeePaidReport['installment_wise_amounts']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 8),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 8)
            );
        }
    }
}
