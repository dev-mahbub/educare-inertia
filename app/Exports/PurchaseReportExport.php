<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class PurchaseReportExport implements FromCollection, WithEvents
{
    protected $purchaseReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $reportDateTitle = "";
    protected $headings = [
        'sr_no',
        'party_account',
        'ledger',
        'purchase_date',
        'invoice_no',
        'sub_total',
        'discount',
        'tax',
        'total'
    ];


    public function __construct(array $purchaseReport, string $schoolTitle, string  $academicYear, string $reportDateTitle)
    {
        $this->purchaseReport = $purchaseReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->reportDateTitle = $reportDateTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srNo = 0;

        if (!empty($this->purchaseReport['reports'])) {
            foreach ($this->purchaseReport['reports'] as $index => $report) {
                $srNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'party_account') {
                        $rows[$count][] = $report?->partyLedger?->title;
                    } else if ($heading == 'ledger') {
                        $rows[$count][] = $report?->ledger?->title;
                    } else if ($heading == 'invoice_no') {
                        $rows[$count][] = $report?->supplier_invoice_no;
                    } else if ($heading == 'discount') {
                        $rows[$count][] = $report?->discount_amount;
                    } else if ($heading == 'tax') {
                        $rows[$count][] = $report?->tax_amount;
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;

                if ($report?->purchaseProducts?->count() > 0) {
                    foreach ($this->headings as $heading) {
                        if ($heading == 'sub_total') {
                            $rows[$count][] = 'item';
                        } else if ($heading == 'discount') {
                            $rows[$count][] = 'quantity';
                        } else if ($heading == 'tax') {
                            $rows[$count][] = 'rate';
                        } else if ($heading == 'total') {
                            $rows[$count][] = 'amount';
                        } else {
                            $rows[$count][] = "";
                        }
                    }

                    foreach ($report->purchaseProducts as $purchaseProduct) {
                        $count = count($rows);

                        foreach ($this->headings as $heading) {
                            if ($heading == 'sub_total') {
                                $rows[$count][] = $purchaseProduct?->product?->title;
                            } else if ($heading == 'discount') {
                                $rows[$count][] = $purchaseProduct->quantity ?? 1;
                            } else if ($heading == 'tax') {
                                $rows[$count][] = $purchaseProduct->rate ?? 0;
                            } else if ($heading == 'total') {
                                $rows[$count][] = $purchaseProduct->amount ?? 0;
                            } else {
                                $rows[$count][] = "";
                            }
                        }

                        $count++;
                    }
                }
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'tax') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'total') {
                    $rows[$rows_count][] = $this->purchaseReport['total'] ?? 0;
                } else {
                    $rows[$rows_count][] = "";
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
                $event->sheet->mergeCells('A2:Z2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', 'Inventory Purchase Register');

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
                $event->sheet->mergeCells('A3:Z3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', $this->reportDateTitle);

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
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
