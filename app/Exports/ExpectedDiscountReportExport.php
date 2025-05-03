<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;
use PhpOffice\PhpSpreadsheet\Calculation\TextData\Text;

class ExpectedDiscountReportExport implements FromCollection, WithEvents
{
    protected $expectedDiscountReports = [];
    protected $fromFeeTitle = "";
    protected $toFeeTitle = "";
    protected $headings = [
        'student_name',
        'admission_number',
        'roll_number',
        'class_name',
        'father_name',
        'mother_name',
        'title',
        'discount_amount'
    ];


    public function __construct(array $expectedDiscountReports, string $fromFeeTitle, string $toFeeTitle)
    {
        $this->expectedDiscountReports = $expectedDiscountReports;
        $this->fromFeeTitle = $fromFeeTitle;
        $this->toFeeTitle = $toFeeTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // $headings = [
        //     'student_name',
        //     'admission_number',
        //     'roll_number',
        //     'class_name',
        //     'father_name',
        //     'mother_name',
        //     'title',
        //     'discount_amount'
        // ];

        $rows = [];

        if (!empty($this->expectedDiscountReports['reports'])) {
            foreach ($this->expectedDiscountReports['reports'] as $index => $report) {
                foreach ($this->headings as $heading) {
                    $rows[$index][] = $report[$heading] ?? "";
                }
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($index == 0) {
                    $rows[$rows_count][] = 'Total =';
                } else if ($heading == 'discount_amount') {
                    $rows[$rows_count][] = $this->expectedDiscountReports['total_discount'] ?? 0;
                } else {
                    $rows[$rows_count][] = "";
                }
            }
        }

        // Create an empty collection with headings
        // return collect([$headings, $rows]);
        return collect([$rows]);
    }


    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:J1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', 'Avail Concession list ' . $this->fromFeeTitle . ' to ' . $this->toFeeTitle);

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
