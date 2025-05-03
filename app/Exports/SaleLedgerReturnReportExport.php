<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class SaleLedgerReturnReportExport implements FromCollection, WithEvents
{
    protected $saleReturnReport = [];
    protected $academicYear;
    protected $schoolTitle;
    protected $reportDateTitle;
    protected $headings = [
        'sr_no',
        'receipt_no',
        'party_account',
        'sale_invoice_no',
        'mobile_no',
        'ledger',
        'sale_date',
        'sub_total',
        'discount',
        'tax',
        'total'
    ];


    public function __construct(array $saleReturnReport, string $academicYear, string $schoolTitle, string $reportDateTitle)
    {
        $this->saleReturnReport = $saleReturnReport;
        $this->academicYear = $academicYear;
        $this->schoolTitle = $schoolTitle;
        $this->reportDateTitle = $reportDateTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->saleReturnReport['reports'])) {
            foreach ($this->saleReturnReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    $rows[$count][] = $report[$heading] ?? "";

                    if ($heading == 'mobile_no') {
                        $rows[$count + 1][] = 'item';
                    } else if ($heading == 'ledger') {
                        $rows[$count + 1][] = 'quantity';
                    } else if ($heading == 'sale_date') {
                        $rows[$count + 1][] = 'rate';
                    } else if ($heading == 'sub_total') {
                        $rows[$count + 1][] = 'amount';
                    } else {
                        $rows[$count + 1][] = $product[$heading] ?? "";
                    }
                }

                $count++;

                // sale return products
                $count = count($rows);

                if (!empty($report['products'])) {
                    foreach ($report['products'] as $product) {
                        foreach ($this->headings as $heading) {
                            if ($heading == 'mobile_no') {
                                $rows[$count][] = $product['product_title'] ?? "";
                            } else if ($heading == 'ledger') {
                                $rows[$count][] = $product['quantity'] ?? "";
                            } else if ($heading == 'sale_date') {
                                $rows[$count][] = $product['rate'] ?? "";
                            } else if ($heading == 'sub_total') {
                                $rows[$count][] = $product['total_amount'] ?? "";
                            } else {
                                $rows[$count][] = $product[$heading] ?? "";
                            }
                        }

                        $count++;
                    }
                }
            }

            // grand total amount
            foreach ($this->headings as $heading) {
                if ($heading == 'sale_date') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'sub_total') {
                    $rows[$count][] = $this->saleReturnReport['total_sub_total_amount'] ?? "";
                } else if ($heading == 'discount') {
                    $rows[$count][] = $this->saleReturnReport['total_discount_amount'] ?? "";
                } else if ($heading == 'tax') {
                    $rows[$count][] = $this->saleReturnReport['total_tax_amount'] ?? "";
                } else if ($heading == 'total') {
                    $rows[$count][] = $this->saleReturnReport['total_amount'] ?? "";
                } else {
                    $rows[$count][] = $product[$heading] ?? "";
                }
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
                $event->sheet->setCellValue('A1', $this->schoolTitle . ' ' . '(' . $this->academicYear . ')');

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
                $event->sheet->setCellValue('A2', "Inventory Sale Return");

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
                $event->sheet->setCellValue('A3', $this->reportDateTitle);

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
}
