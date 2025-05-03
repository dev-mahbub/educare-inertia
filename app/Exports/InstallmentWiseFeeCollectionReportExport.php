<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class InstallmentWiseFeeCollectionReportExport implements FromCollection, WithEvents
{
    protected $installmentWiseFeeCollectionReport = [];
    protected $academicYear;
    protected $schoolTitle;
    protected $reportTitle;

    protected $headings = [
        'installment',
        'total_amount'
    ];


    public function __construct(array $installmentWiseFeeCollectionReport, string $academicYear, string $schoolTitle, string $reportTitle)
    {
        $this->installmentWiseFeeCollectionReport = $installmentWiseFeeCollectionReport;
        $this->academicYear = $academicYear;
        $this->schoolTitle = $schoolTitle;
        $this->reportTitle = $reportTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->installmentWiseFeeCollectionReport['reports'])) {
            foreach ($this->installmentWiseFeeCollectionReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'total_amount') {
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
            if ($heading == 'installment') {
                $rows[$rows_count][] = "Total";
            } else if ($heading == 'total_amount') {
                $rows[$rows_count][] = ($this->installmentWiseFeeCollectionReport[$heading] ?? 0) > 0 ? $this->installmentWiseFeeCollectionReport[$heading] : "0";
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
                $event->sheet->setCellValue('A2', "ACADEMIC SESSION : {$this->academicYear}");

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
                $event->sheet->setCellValue('A3', $this->reportTitle);

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
