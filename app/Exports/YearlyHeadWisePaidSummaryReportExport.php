<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class YearlyHeadWisePaidSummaryReportExport implements FromCollection, WithEvents
{
    protected $yearlyHeadWisePaidSummaryReport = [];
    protected $paymentMode;
    protected $schoolTitle;

    protected $headings = [
        'fee_type',
        'total',
        'refund',
        'net_receipt',
    ];


    public function __construct(array $yearlyHeadWisePaidSummaryReport, string $paymentMode, string $schoolTitle)
    {
        $this->yearlyHeadWisePaidSummaryReport = $yearlyHeadWisePaidSummaryReport;
        $this->paymentMode = $paymentMode;
        $this->schoolTitle = $schoolTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->yearlyHeadWisePaidSummaryReport['reports'])) {
            $feeTypeKeys = array_keys($this->yearlyHeadWisePaidSummaryReport['month_wise_amounts'] ?? []);

            foreach ($this->yearlyHeadWisePaidSummaryReport['reports'] as $report) {

                foreach ($this->headings as $heading) {
                    if (in_array($heading, $feeTypeKeys)) {
                        $rows[$count][] = ($report['month_wise_amounts'][$heading] ?? 0) > 0 ? $report['month_wise_amounts'][$heading] : "0";
                    } else if (in_array($heading, ['total', 'refund', 'net_receipt'])) {
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
            if (isset($this->yearlyHeadWisePaidSummaryReport['month_wise_amounts'][$heading])) {
                $amount = $this->yearlyHeadWisePaidSummaryReport['month_wise_amounts'][$heading] ?? 0;
                $rows[$rows_count][] = $amount > 0 ? $amount : "0";
            } else if (in_array($heading, ['total', 'refund', 'net_receipt'])) {
                $rows[$rows_count][] = ($this->yearlyHeadWisePaidSummaryReport[$heading] ?? 0) > 0 ? $this->yearlyHeadWisePaidSummaryReport[$heading] : "0";
            } else if ($heading == 'fee_type') {
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
                $event->sheet->setCellValue('A2', "Yearly Head Wise Paid Summary");

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
                $event->sheet->setCellValue('A3', "Payment mode - {$this->paymentMode}");

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
        if (!empty($this->yearlyHeadWisePaidSummaryReport['month_wise_amounts'])) {
            $feeTypeAmountsKeys = array_keys($this->yearlyHeadWisePaidSummaryReport['month_wise_amounts']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 1),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 1)
            );
        }
    }
}
