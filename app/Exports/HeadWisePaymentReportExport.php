<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class HeadWisePaymentReportExport implements FromCollection, WithEvents
{
    protected $headWisePaymentReport = [];
    protected $headWiseSummary = [];
    protected $ledgerTitles = [];
    protected $paymentMode;

    protected $headings = [
        'date' => 'date',
        'total' => 'total',
    ];


    public function __construct(array $headWisePaymentReport, array $headWiseSummary, array $ledgerTitles, string $paymentMode)
    {
        $this->headWisePaymentReport = $headWisePaymentReport;
        $this->headWiseSummary = $headWiseSummary;
        $this->ledgerTitles = $ledgerTitles;
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

        if (!empty($this->headWisePaymentReport)) {
            foreach ($this->headWisePaymentReport as $report) {
                foreach ($this->headings as $key => $heading) {
                    if (in_array($key, array_keys($this->ledgerTitles))) {
                        $rows[$count][] = ($report['head_wise_data'][$key] ?? 0) > 0 ? (float) $report['head_wise_data'][$key] : "0";
                    } else if ($key == 'total') {
                        $rows[$count][] = ($report[$key] ?? 0) > 0 ? (float) $report[$key] : "0";
                    } else if ($key == 'date') {
                        $rows[$count][] = $report['payment_date'] ?? "";
                    } else {
                        $rows[$count][] = $report[$key] ?? "";
                    }
                }

                $count++;
            }
        }

        // total row
        $rows_count = count($rows);

        foreach ($this->headings as $key => $heading) {
            if (in_array($key, array_keys($this->ledgerTitles))) {
                $amount = $this->headWiseSummary[$key] ?? 0;
                $rows[$rows_count][] = $amount > 0 ? (float) $amount : "0";
            } else if ($key == 'total') {
                $rows[$rows_count][] = ($this->headWiseSummary[$key] ?? 0) > 0 ? (float) $this->headWiseSummary[$key] : "0";
            } else if ($key == 'date') {
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
                $event->sheet->setCellValue('A1', "Head Wise Payment Report");

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
                $event->sheet->setCellValue('A2', "Payment Mode - {$this->paymentMode}");

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

                foreach (array_values($this->headings) as $index => $heading) {
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
        if (!empty($this->ledgerTitles)) {
            $this->headings = array_merge(
                array_slice($this->headings, 0, 1),
                $this->ledgerTitles,
                array_slice($this->headings, 1)
            );
        }
    }
}
