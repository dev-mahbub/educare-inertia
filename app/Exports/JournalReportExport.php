<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class JournalReportExport implements FromCollection, WithEvents
{
    protected $journalReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $reportDateTitle = "";

    protected $headings = [
        'Sr No.',
        'Particulars',
        'Transaction Date',
        'Voucher Type',
        'Voucher No.',
        'Total'
    ];


    public function __construct(array $journalReport, string $schoolTitle, string $academicYear, string $reportDateTitle)
    {
        $this->journalReport = $journalReport;
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

        // receipt report
        if (!empty($this->journalReport['reports'])) {
            foreach ($this->journalReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'Sr No.') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'Particulars') {
                        $rows[$count][] = $report['ledger_titles'] ?? '';
                    } else if ($heading == 'Transaction Date') {
                        $rows[$count][] = $report['journal_date'] ?? '';
                    } else if ($heading == 'Voucher Type') {
                        $rows[$count][] = $report['type'] ?? '';
                    } else if ($heading == 'Voucher No.') {
                        $rows[$count][] = $report['voucher_no'] ?? '';
                    } else if ($heading == 'Total') {
                        $rows[$count][] = ($report['total_amount'] ?? 0) > 0 ? $report['total_amount'] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }

                    if ($heading == 'Voucher Type') {
                        $rows[$count + 1][] = 'Particulars';
                    } else if ($heading == 'Voucher No.') {
                        $rows[$count + 1][] = 'Debit';
                    } else if ($heading == 'Total') {
                        $rows[$count + 1][] = 'Credit';
                    } else {
                        $rows[$count + 1][] = $report[$heading] ?? "";
                    }
                }

                if (!empty($report['journal_ledgers'])) {
                    $count += 1;

                    foreach ($report['journal_ledgers'] as $journalLedger) {
                        $count++;

                        foreach ($this->headings as $heading) {
                            if ($heading == 'Voucher Type') {
                                $rows[$count][] = $journalLedger['ledger_title'] ?? "";
                            } else if ($heading == 'Voucher No.') {
                                $rows[$count][] = ($journalLedger['debit_amount'] ?? 0) > 0 ? $journalLedger['debit_amount'] : "0";
                            } else if ($heading == 'Total') {
                                $rows[$count][] = ($journalLedger['credit_amount'] ?? 0) > 0 ? $journalLedger['credit_amount'] : "0";
                            } else {
                                $rows[$count][] = "";
                            }
                        }
                    }
                }

                $count++;
                $srNo++;
            }

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'Voucher No.') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'Total') {
                    $rows[$count][] = ($this->journalReport['total_amount'] ?? 0) > 0 ? $this->journalReport['total_amount'] : "0";
                } else {
                    $rows[$count][] = "";
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
                $event->sheet->setCellValue('A2', "Journal Register");

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
