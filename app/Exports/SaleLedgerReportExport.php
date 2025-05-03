<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class SaleLedgerReportExport implements FromCollection, WithEvents
{
    protected $saleReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $reportDateTitle = "";
    protected $headings = [
        'sr_no',
        'party_account',
        'mobile_no',
        'ledger',
        'sale_date',
        'sub_total',
        'discount',
        'tax',
        'total',
        'due',
        'paid',
        'payment_mode',
        'transaction_no',
        'invoice_no',
        'taken_by'
    ];


    public function __construct(array $saleReport, string $schoolTitle, string  $academicYear, string $reportDateTitle)
    {
        $this->saleReport = $saleReport;
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

        if (!empty($this->saleReport['reports'])) {
            foreach ($this->saleReport['reports'] as $index => $report) {
                $srNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'mobile_no') {
                        $rows[$count][] = $report?->student?->father?->phone;
                    } else if ($heading == 'ledger') {
                        $rows[$count][] = $report?->ledger?->title;
                    } else if ($heading == 'discount') {
                        $rows[$count][] = $report?->total_discount;
                    } else if ($heading == 'tax') {
                        $rows[$count][] = $report?->total_tax;
                    } else if ($heading == 'payment_mode') {
                        $rows[$count][] = $report?->bankLedger?->title;
                    } else if ($heading == 'taken_by') {
                        $rows[$count][] = "{$report?->createdBy?->first_name} {$report?->createdBy?->middle_name} {$report?->createdBy?->last_name}";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;

                if ($report?->saleLedgerProducts?->count() > 0) {
                    foreach ($this->headings as $heading) {
                        if ($heading == 'sale_date') {
                            $rows[$count][] = 'item';
                        } else if ($heading == 'sub_total') {
                            $rows[$count][] = 'quantity';
                        } else if ($heading == 'discount') {
                            $rows[$count][] = 'rate';
                        } else if ($heading == 'tax') {
                            $rows[$count][] = 'tax';
                        } else if ($heading == 'total') {
                            $rows[$count][] = 'discount';
                        } else if ($heading == 'due') {
                            $rows[$count][] = 'amount';
                        } else {
                            $rows[$count][] = "";
                        }
                    }

                    foreach ($report->saleLedgerProducts as $saleLedgerProduct) {
                        $count = count($rows);

                        foreach ($this->headings as $heading) {
                            if ($heading == 'sale_date') {
                                $rows[$count][] = $saleLedgerProduct?->product?->title;
                            } else if ($heading == 'sub_total') {
                                $rows[$count][] = $saleLedgerProduct->quantity ?? 1;
                            } else if ($heading == 'discount') {
                                $rows[$count][] = $saleLedgerProduct->rate ?? 0;
                            } else if ($heading == 'tax') {
                                $rows[$count][] = $saleLedgerProduct->tax_amount ?? 0;
                            } else if ($heading == 'total') {
                                $rows[$count][] = $saleLedgerProduct->discount_amount ?? 0;
                            } else if ($heading == 'due') {
                                $rows[$count][] = $saleLedgerProduct->total_amount ?? 0;
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
                if ($heading == 'discount') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'total') {
                    $rows[$rows_count][] = $this->saleReport['total'] ?? 0;
                } else if ($heading == 'due') {
                    $rows[$rows_count][] = $this->saleReport['total_due'] ?? 0;
                } else if ($heading == 'paid') {
                    $rows[$rows_count][] = $this->saleReport['total_paid'] ?? 0;
                } else {
                    $rows[$rows_count][] = "";
                }
            }
        }

        $rows[$count] =  array_fill(0, count($this->headings), '');

        // payment mode summary
        $rows_count = count($rows) + 1;

        if (!empty($this->saleReport['payment_mode_summary'])) {
            foreach ($this->headings as $heading) {
                if ($heading == 'sr_no') {
                    $rows[$rows_count][] = 'Payment Mode';
                } else if ($heading == 'party_account') {
                    $rows[$rows_count][] = 'Amount';
                } else {
                    $rows[$rows_count][] = "";
                }
            }

            $count = count($rows) + 1;

            foreach ($this->saleReport['payment_mode_summary'] as $data) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $data['payment_mode'] ?? '';
                    } else if ($heading == 'party_account') {
                        $rows[$count][] = $data['amount'] ?? 0;
                    } else {
                        $rows[$count][] = "";
                    }
                }

                $count++;
            }

            foreach ($this->headings as $heading) {
                if ($heading == 'sr_no') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'party_account') {
                    $rows[$count][] = ($this->saleReport['total_payment_mode_amount'] ?? 0) > 0 ? $this->saleReport['total_payment_mode_amount'] : '0';
                } else {
                    $rows[$count][] = "";
                }
            }

            $rows[$count + 1] =  array_fill(0, count($this->headings), '');
        }


        // taken by summary
        $rows_count = count($rows) + 1;

        if (!empty($this->saleReport['taken_by_summary'])) {
            foreach ($this->headings as $heading) {
                if ($heading == 'sr_no') {
                    $rows[$rows_count][] = 'Taken By';
                } else if ($heading == 'party_account') {
                    $rows[$rows_count][] = 'Amount';
                } else {
                    $rows[$rows_count][] = "";
                }
            }

            $count = count($rows) + 1;

            foreach ($this->saleReport['taken_by_summary'] as $data) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $data['taken_by'] ?? '';
                    } else if ($heading == 'party_account') {
                        $rows[$count][] = $data['amount'] ?? 0;
                    } else {
                        $rows[$count][] = "";
                    }
                }

                $count++;
            }

            foreach ($this->headings as $heading) {
                if ($heading == 'sr_no') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'party_account') {
                    $rows[$count][] = ($this->saleReport['total_taken_by_amount'] ?? 0) > 0 ? $this->saleReport['total_taken_by_amount'] : '0';
                } else {
                    $rows[$count][] = "";
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
                $event->sheet->setCellValue('A2', 'Inventory Sale Register');

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
