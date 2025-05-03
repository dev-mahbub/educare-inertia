<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class DayBookReportExport implements FromCollection, WithEvents
{
    protected $dayBookReport = [];
    protected $schoolTitle;
    protected $academicYear;

    protected $headings = [
        'date',
        'particulars',
        'voucher_type',
        'voucher_no',
        'narration',
        'debit',
        'credit'
    ];


    public function __construct(array $dayBookReport, string $schoolTitle, string $academicYear)
    {
        $this->dayBookReport = $dayBookReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $totalDebit = 0;
        $totalCredit = 0;

        if (!empty($this->dayBookReport)) {
            foreach ($this->dayBookReport as $report) {
                $totalDebit += $report['debit'] ?? 0;
                $totalCredit += $report['credit'] ?? 0;

                foreach ($this->headings as $heading) {
                    if ($heading == 'debit') {
                        $rows[$count][] = $report[$heading] ?? "";
                    } else if ($heading == 'credit') {
                        $rows[$count][] = $report[$heading] ?? "";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }
        }

        $rows_count = count($rows);

        foreach ($this->headings as $index => $heading) {
            if ($heading == 'narration') {
                $rows[$rows_count][] = 'Total';
            } else if ($heading == 'debit') {
                $rows[$rows_count][] = $totalDebit > 0 ? $totalDebit : "";
            } else if ($heading == 'credit') {
                $rows[$rows_count][] = $totalCredit > 0 ? $totalCredit : "";
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
                $event->sheet->setCellValue('A1', "$this->schoolTitle ($this->academicYear)");

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
