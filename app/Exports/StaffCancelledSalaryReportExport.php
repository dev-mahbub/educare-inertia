<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StaffCancelledSalaryReportExport implements FromCollection, WithEvents
{
    protected $staffCancelledSalaryReport = [];
    protected $schoolTitle = "";
    protected $headings = [
        'sr_no',
        'employee_id',
        'name',
        'uan',
        'month',
        'total_earning',
        'total_deduction',
        'paid_amount',
        'due_amount',
        'payment_date',
        'cancel_reason'
    ];


    public function __construct(
        array $staffCancelledSalaryReport,
        string $schoolTitle
    ) {
        $this->staffCancelledSalaryReport = $staffCancelledSalaryReport;
        $this->schoolTitle = $schoolTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->staffCancelledSalaryReport)) {
            foreach ($this->staffCancelledSalaryReport as $index => $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $index + 1;
                    } else if ($heading == 'name') {
                        $rows[$count][] = $report['staff_name'] ?? "";
                    } else if ($heading == 'total_earning') {
                        $rows[$count][] = $report['total_earning_amount'] > 0 ? $report['total_earning_amount'] : "0";
                    } else if ($heading == 'total_deduction') {
                        $rows[$count][] = $report['total_deduction_amount'] > 0 ? $report['total_deduction_amount'] : "0";
                    } else if ($heading == 'paid_amount') {
                        $rows[$count][] = $report['paid_amount'] > 0 ? $report['paid_amount'] : "0";
                    } else if ($heading == 'due_amount') {
                        $rows[$count][] = $report['due_amount'] > 0 ? $report['due_amount'] : "0";
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
                $event->sheet->mergeCells('A1:Z1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', $this->schoolTitle . ' - (Cancelled Salary Report)');

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
