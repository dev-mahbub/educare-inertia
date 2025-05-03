<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class LedgerPaymentReportExport implements FromCollection, WithEvents
{
    protected $paymentReport = [];
    protected $paymentSummary = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $reportDateTitle = "";

    protected $headings = [
        'sr no.',
        'receipt_no',
        'ledger',
        'payment_date',
        'narration',
        'amount'
    ];


    public function __construct(array $paymentReport, array $paymentSummary, string $schoolTitle, string $academicYear, string $reportDateTitle)
    {
        $this->paymentReport = $paymentReport;
        $this->paymentSummary = $paymentSummary;
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
        $srNo = 1;

        // payment report
        if (!empty($this->paymentReport['reports'])) {
            foreach ($this->paymentReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'amount') {
                        $rows[$count][] = ($report['total_amount'] ?? 0) > 0 ? $report['total_amount'] : "0";
                    } else if ($heading == 'sr no.') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'ledger') {
                        $rows[$count][] = $report['ledger_title'] ?? "";
                    } else if ($heading == 'narration') {
                        $rows[$count][] = $report['description'] ?? "";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                if (!empty($report['payment_items'])) {
                    foreach ($report['payment_items'] as $paymentItem) {
                        $count++;

                        foreach ($this->headings as $heading) {
                            if ($heading == 'narration') {
                                $rows[$count][] = $paymentItem['ledger_title'] ?? "";
                            } else if ($heading == 'amount') {
                                $rows[$count][] = ($paymentItem['amount'] ?? 0) > 0 ? $paymentItem['amount'] : "0";
                            } else {
                                $rows[$count][] = "";
                            }
                        }
                    }
                }

                $count++;
                $srNo++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'narration') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'amount') {
                    $rows[$rows_count][] = ($this->paymentReport['total_amount'] ?? 0) > 0 ? $this->paymentReport['total_amount'] : "0";
                } else {
                    $rows[$rows_count][] = "";
                }
            }
        }

        // payment summary
        $rows_count = count($rows);

        foreach ($this->headings as $index => $heading) {
            $rows[$rows_count + 1][] = "";

            // payment summary title
            if ($heading == 'payment_date') {
                $rows[$rows_count + 2][] = 'Payment Summary';
            } else {
                $rows[$rows_count + 2][] = "";
            }

            // payment summary heading
            if ($heading == 'sr no.') {
                $rows[$rows_count + 3][] = $heading;
            } else if ($heading == 'ledger') {
                $rows[$rows_count + 3][] = $heading;
            } else if ($heading == 'amount') {
                $rows[$rows_count + 3][] = $heading;
            } else {
                $rows[$rows_count + 3][] = "";
            }
        }

        // payment summary data
        if (!empty($this->paymentSummary['reports'])) {
            $count = 0;
            $rows_count = count($rows) + 1;

            foreach ($this->paymentSummary['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'amount') {
                        $rows[$rows_count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else if ($heading == 'sr no.') {
                        $rows[$rows_count][] = $count + 1;
                    } else if ($heading == 'ledger') {
                        $rows[$rows_count][] = $report['ledger_title'] ?? "";
                    } else {
                        $rows[$rows_count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
                $rows_count++;
            }

            $rows_count = count($rows) + 1;

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'narration') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'amount') {
                    $rows[$rows_count][] = ($this->paymentSummary['total_amount'] ?? 0) > 0 ? $this->paymentSummary['total_amount'] : "0";
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
                // first heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:Z1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', "$this->schoolTitle ($this->academicYear)");

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
                $event->sheet->setCellValue('A2', "Inventory Payment Report");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A2')->applyFromArray([
                    'font' => [
                        'size' => 14,
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
                        'size' => 14,
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
