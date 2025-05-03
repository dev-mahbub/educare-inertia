<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class RefundCancelReportExport implements FromCollection, WithEvents
{
    protected $refundCancelReport = [];
    protected $report_created_on = "";
    protected $academicYear = "";
    protected $schoolTitle = "";
    protected $headings = [
        'admission_no',
        'student_name',
        'class',
        'academic_year',
        'refund_amount',
        'refund_date',
        'refund_cancel_date',
        'cancelled_by',
        'cancellation_note'
    ];


    public function __construct(array $refundCancelReport, string $report_created_on, string $academicYear, string $schoolTitle)
    {
        $this->refundCancelReport = $refundCancelReport;
        $this->report_created_on = $report_created_on;
        $this->academicYear = $academicYear;
        $this->schoolTitle = $schoolTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        if (count($this->refundCancelReport) > 0) {
            foreach ($this->refundCancelReport as $index => $report) {
                foreach ($this->headings as $heading) {
                    $rows[$index][] = $report[$heading] ?? "";
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
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:J1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', "{$this->schoolTitle} - ({$this->academicYear})");

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


                // Merge cells for the heading
                $event->sheet->mergeCells('A2:J2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', "REFUND FEE CANCELLATION REPORT - (Report Created On: {$this->report_created_on})");

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
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(3);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 3, $heading);
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
