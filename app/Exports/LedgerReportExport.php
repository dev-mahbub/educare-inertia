<?php

namespace App\Exports;

use App\Enums\LedgerAmountType;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class LedgerReportExport implements FromCollection, WithEvents
{
    protected $ledgerReport = [];
    protected $ledgerTitle = "";
    protected $currentBalance = "";
    protected $closingBalance = 0;
    protected $totalDebit = 0;
    protected $totalCredit = 0;
    protected $openingBalance = 0;
    protected $amountType = "";
    protected $reportDateTitle = "";

    protected $headings = [
        'date',
        'particulars',
        'voucher_type',
        'voucher_no',
        'narration',
        'debit',
        'credit'
    ];

    public function __construct(
        array $ledgerReport,
        string $ledgerTitle,
        string $currentBalance,
        int $closingBalance,
        int $totalDebit,
        int $totalCredit,
        int $openingBalance,
        string $amountType,
        string $reportDateTitle
    ) {
        $this->ledgerReport = $ledgerReport;
        $this->ledgerTitle = $ledgerTitle;
        $this->currentBalance = $currentBalance;
        $this->closingBalance = $closingBalance;
        $this->totalDebit = $totalDebit;
        $this->totalCredit = $totalCredit;
        $this->openingBalance = $openingBalance;
        $this->amountType = $amountType;
        $this->reportDateTitle = $reportDateTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->ledgerReport)) {
            foreach ($this->ledgerReport as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'particulars') {
                        $rows[$count][] = $report['ledger_title'] ?? '';
                    } else if ($heading == 'voucher_no') {
                        $rows[$count][] = $report['receipt_no'] ?? "";
                    } else if ($heading == 'debit' || $heading == 'credit') {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'narration') {
                    $rows[$rows_count][] = 'Opening Balance';
                    $rows[$rows_count + 1][] = 'Current Total';
                    $rows[$rows_count + 2][] = 'Closing Balance';
                } else if ($heading == 'debit') {
                    $rows[$rows_count][] = $this->amountType == LedgerAmountType::DEBIT->value ? $this->openingBalance : '';
                    $rows[$rows_count + 1][] = $this->totalDebit  > 0 ? $this->totalDebit : '0';
                    $rows[$rows_count + 2][] = ($this->amountType == LedgerAmountType::DEBIT->value ? ($this->openingBalance + $this->totalDebit) : ($this->totalDebit - $this->totalCredit)) > 0 ? $this->closingBalance : '';
                } else if ($heading == 'credit') {
                    $rows[$rows_count][] = $this->amountType == LedgerAmountType::CREDIT->value ? $this->openingBalance : '';
                    $rows[$rows_count + 1][] = $this->totalCredit  > 0 ? $this->totalCredit : '0';
                    $rows[$rows_count + 2][] = ($this->amountType == LedgerAmountType::CREDIT->value ? ($this->openingBalance + $this->totalCredit) : ($this->totalCredit - $this->totalDebit)) > 0 ? $this->closingBalance : '';
                } else {
                    $rows[$rows_count][] = "";
                    $rows[$rows_count + 1][] = "";
                    $rows[$rows_count + 2][] = "";
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
                $event->sheet->setCellValue('A1', "Ledger Name - $this->ledgerTitle, Current Balance = $this->currentBalance, $this->reportDateTitle");

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
