<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class ClassDueReportExport implements FromCollection, WithEvents
{
    protected $classDueReport = [];
    protected $fromFeeTitle = "";
    protected $toFeeTitle = "";
    protected $schoolTitle;
    protected $academicYear;

    protected $headings = [
        'class',
        'amount',
    ];

    protected $paymentModeHeadings = ['payment_mode', 'amount'];


    public function __construct(
        array $classDueReport,
        string $schoolTitle,
        string $academicYear,
        string $fromFeeTitle,
        string $toFeeTitle,
    ) {
        $this->classDueReport = $classDueReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
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

        if (!empty($this->classDueReport)) {
            foreach ($this->classDueReport as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'amount') {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
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
                $event->sheet->mergeCells('A1:H1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', "{$this->schoolTitle} ({$this->academicYear})");

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
                $event->sheet->mergeCells('A2:H2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', "Oustanding due Report");

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
                $event->sheet->mergeCells('A3:H3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', "From: {$this->fromFeeTitle} To: {$this->toFeeTitle}");

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
                $event->sheet->insertNewRowBefore(2);

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
