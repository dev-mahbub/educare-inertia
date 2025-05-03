<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;

class AdjustFeeReportExport implements FromCollection, WithEvents
{
    protected $adjustFeePaymentReport = [];
    protected $headings = [
        'admission_number',
        'student_name',
        'class_name',
        'adjust_date',
        'by_installment',
        'note',
        'adjust_amount'
    ];


    public function __construct(array $adjustFeePaymentReport)
    {
        $this->adjustFeePaymentReport = $adjustFeePaymentReport;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        if (!empty($this->adjustFeePaymentReport['reports'])) {
            foreach ($this->adjustFeePaymentReport['reports'] as $index => $report) {
                foreach ($this->headings as $heading) {
                    $rows[$index][] = $report[$heading] ?? "";
                }
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($index == 0) {
                    $rows[$rows_count][] = 'Total =';
                } else if ($heading == 'adjust_amount') {
                    $rows[$rows_count][] = $this->adjustFeePaymentReport['total_amount'] ?? 0;
                } else {
                    $rows[$rows_count][] = "";
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
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:J1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', 'Adjust Fee Report');

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
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(2);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 2, $heading);
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
