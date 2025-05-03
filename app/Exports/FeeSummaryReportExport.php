<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;

class FeeSummaryReportExport implements FromCollection, WithEvents
{
    protected $feeSummaryReport;
    protected $schoolTitle;
    protected $academicYear;
    protected $classroomTitle;
    protected $reportDate;
    protected $fromFeeTitle;
    protected $toFeeTitle;

    protected $headings = [
        'title',
        'total_amount',
        'total_discount',
        'total_payable',
        'total_paid',
        'total_refunded',
        'total_nullify',
        'total_adjust',
        'net_receipt',
        'total_due',
    ];

    public function __construct(
        array $feeSummaryReport,
        string $schoolTitle,
        string $academicYear,
        string $classroomTitle,
        string $reportDate,
        string $fromFeeTitle,
        string $toFeeTitle
    ) {
        $this->feeSummaryReport = $feeSummaryReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->classroomTitle = $classroomTitle;
        $this->reportDate = $reportDate;
        $this->fromFeeTitle = $fromFeeTitle;
        $this->toFeeTitle = $toFeeTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->feeSummaryReport['reports'])) {
            foreach ($this->feeSummaryReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (
                        in_array($heading, ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_refunded', 'total_nullify', 'total_adjust', 'net_receipt', 'total_due',])
                    ) {
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
            if ($heading == 'title') {
                $rows[$rows_count][] = "Total";
            } else if (
                in_array($heading, ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_refunded', 'total_nullify', 'total_adjust', 'net_receipt', 'total_due',])
            ) {
                $rows[$rows_count][] = ($this->feeSummaryReport[$heading] ?? 0) > 0 ? $this->feeSummaryReport[$heading] : "0";
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
                $event->sheet->setCellValue('A3', "Fee Summary Report For Class ({$this->classroomTitle})  {$this->reportDate} ( {$this->fromFeeTitle} to {$this->toFeeTitle} )");

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
