<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentPaymentReportExport implements FromCollection, WithEvents
{
    protected $studentPaymentReport = [];

    protected $headings = [
        'admission_no',
        'student_name',
        'roll_no',
        'class',
        'title',
        'total_amount',
        'total_discount',
        'total_payable',
        'total_paid',
        'due',
        'payment_mode',
        'date',
        'status'
    ];

    public function __construct(array $studentPaymentReport)
    {
        $this->studentPaymentReport = $studentPaymentReport;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->studentPaymentReport)) {
            foreach ($this->studentPaymentReport as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'due'])) {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;

                if (!empty($report['fee_type_amounts'])) {
                    foreach ($report['fee_type_amounts'] as $feeTypeReport) {
                        foreach ($this->headings as $index => $heading) {
                            if ($heading == 'title') {
                                $rows[$count][] = $feeTypeReport[$heading] ?? "";
                            } else if (
                                in_array($heading, ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'due']) &&
                                isset($feeTypeReport[$heading])
                            ) {
                                $amount = $feeTypeReport[$heading] ?? 0;
                                $rows[$count][] = $amount > 0 ? $amount : "0";
                            } else {
                                $rows[$count][] = "";
                            }
                        }

                        $count++;
                    }
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
                $event->sheet->setCellValue('A1', "Student Payment List");

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
