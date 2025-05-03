<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class HeadWiseDailySummaryReportExport implements FromCollection, WithEvents
{
    protected $headWiseDailySummaryReport = [];
    protected $paymentMode;

    protected $headings = [
        'date',
        'total',
        'concession',
    ];


    public function __construct(array $headWiseDailySummaryReport, string $paymentMode)
    {
        $this->headWiseDailySummaryReport = $headWiseDailySummaryReport;
        $this->paymentMode = $paymentMode;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->headWiseDailySummaryReport['reports'])) {
            $feeTypeKeys = array_keys($this->headWiseDailySummaryReport['head_wise_amounts'] ?? []);

            foreach ($this->headWiseDailySummaryReport['reports'] as $report) {

                foreach ($this->headings as $heading) {
                    if (in_array($heading, $feeTypeKeys)) {
                        $rows[$count][] = ($report['head_wise_amounts'][$heading] ?? 0) > 0 ? $report['head_wise_amounts'][$heading] : "0";
                    } else if ($heading == 'total' || $heading == 'concession') {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }
        }

        // for total row
        $rows_count = count($rows);

        foreach ($this->headings as $index => $heading) {
            if (isset($this->headWiseDailySummaryReport['head_wise_amounts'][$heading])) {
                $amount = $this->headWiseDailySummaryReport['head_wise_amounts'][$heading] ?? 0;
                $rows[$rows_count][] = $amount > 0 ? $amount : "0";
            } else if ($heading == 'total' || $heading == 'concession') {
                $rows[$rows_count][] = ($this->headWiseDailySummaryReport[$heading] ?? 0) > 0 ? $this->headWiseDailySummaryReport[$heading] : "0";
            } else if ($heading == 'date') {
                $rows[$rows_count][] = "Total";
            } else {
                $rows[$rows_count][] = "";
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
                $event->sheet->setCellValue('A1', "Head Wise Fee summary");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'size' => 13,
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
                $event->sheet->setCellValue('A2', "Payment mode - {$this->paymentMode}");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A2')->applyFromArray([
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
        if (!empty($this->headWiseDailySummaryReport['head_wise_amounts'])) {
            $feeTypeAmountsKeys = array_keys($this->headWiseDailySummaryReport['head_wise_amounts']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 1),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 1)
            );
        }
    }
}
