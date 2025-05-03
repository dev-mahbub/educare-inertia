<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class SalaryPaymentReportExport implements FromCollection, WithEvents
{
    protected $salaryPaymentReport = [];
    protected $earningTitles = [];
    protected $deductionTitles = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $reportTitle;
    protected $headings = [
        'sr_no' => 'Sr No.',
        'employee_id' => 'Employee Id',
        'staff_name' => 'Staff Name',
        'uan' => 'UAN',
        'salary_structure' => 'Salary Structure',
        'gross_payment' => 'Gross Payment',
        'gross_payment_after_leave' => 'Gross payment after adjustment of leave',
        'leave_deduction_days' => 'Leave Deduction days',
        'total_deduction' => 'Total Deduction',
        'net_pay' => 'Net Pay',
    ];

    public function __construct(array $salaryPaymentReport, array $earningTitles, array $deductionTitles, string $schoolTitle, string $academicYear, string $reportTitle = '')
    {
        $this->salaryPaymentReport = $salaryPaymentReport;
        $this->earningTitles = $earningTitles;
        $this->deductionTitles = $deductionTitles;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->reportTitle = $reportTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srNo = 1;

        if (!empty($this->salaryPaymentReport['reports'])) {
            foreach ($this->salaryPaymentReport['reports'] as $report) {
                foreach ($this->headings as $key => $heading) {
                    if ($key == "sr_no") {
                        $rows[$count][] = $srNo;
                    } else if (!in_array($key, ['sr_no', 'employee_id', 'staff_name', 'uan', 'salary_structure'])) {
                        $amount = 0;

                        if ($key == 'gross_payment') {
                            $amount = $report['earning_amount'] ?? 0;
                        } else if ($key == 'total_deduction') {
                            $amount = $report['deduction_amount'] ?? 0;
                        } else if ($key == 'net_pay') {
                            $amount = $report['paid_amount'] ?? 0;
                        } else if (in_array($key, array_keys($this->earningTitles))) {
                            $amount = $report['earnings'][$key] ?? 0;
                        } else if (in_array($key, array_keys($this->deductionTitles))) {
                            $amount = $report['deductions'][$key] ?? 0;
                        } else {
                            $amount = $report[$key] ?? 0;
                        }

                        $rows[$count][] = $amount > 0 ? $amount : '0';
                    } else {
                        $rows[$count][] = $report[$key] ?? '';
                    }
                }

                $count++;
                $srNo++;
            }
        }

        // total row
        if (!empty($this->salaryPaymentReport['total_summary'])) {
            foreach ($this->headings as $key => $heading) {
                if ($key == "salary_structure") {
                    $rows[$count][] = 'Total';
                } else if (!in_array($key, ['sr_no', 'employee_id', 'staff_name', 'uan', 'salary_structure'])) {
                    $amount = 0;

                    if ($key == 'gross_payment') {
                        $amount = $this->salaryPaymentReport['total_summary']['earning_amount'] ?? 0;
                    } else if ($key == 'total_deduction') {
                        $amount = $this->salaryPaymentReport['total_summary']['deduction_amount'] ?? 0;
                    } else if ($key == 'net_pay') {
                        $amount = $this->salaryPaymentReport['total_summary']['paid_amount'] ?? 0;
                    } else {
                        $amount = $this->salaryPaymentReport['total_summary'][$key] ?? 0;
                    }

                    $rows[$count][] = $amount > 0 ? $amount : '0';
                } else {
                    $rows[$count][] = $this->salaryPaymentReport['total_summary'][$key] ?? '';
                }
            }
        }

        return collect([$rows]);
    }

    public function registerEvents(): array
    {
        return [
            BeforeSheet::class => function (BeforeSheet $event) {
                // first heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:Z1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', $this->schoolTitle);

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
                $event->sheet->setCellValue('A2', $this->reportTitle);

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
                $event->sheet->setCellValue('A3', "Notes: Leave deduction amount in single process payment will be in Absent Deduction(Deduction head)");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
                    'font' => [
                        'size' => 12,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);

                // fourth heading row
                $earningCount = count($this->earningTitles);
                $deductionCount = count($this->deductionTitles);

                $cellNames = range('A', 'Z');
                $earningStartCell = $cellNames[5];
                $earningEndCell = $cellNames[($earningCount - 1) + 5];
                $deductionStartCell = $cellNames[$earningCount + 8];
                $deductionEndCell = $cellNames[($deductionCount - 1) + $earningCount + 8];

                $event->sheet->mergeCells("{$earningStartCell}4:{$earningEndCell}4");
                $event->sheet->setCellValue("{$earningStartCell}4", "Earning - $earningCount");
                $event->sheet->getStyle("{$earningStartCell}4")->applyFromArray([
                    'font' => ['size' => 14],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);

                $event->sheet->mergeCells("{$deductionStartCell}4:{$deductionEndCell}4");
                $event->sheet->setCellValue("{$deductionStartCell}4", "Deduction - $deductionCount");
                $event->sheet->getStyle("{$deductionStartCell}4")->applyFromArray([
                    'font' => ['size' => 14],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // fifth heading row
                $count = 1;

                foreach ($this->headings as $heading) {
                    $event->sheet->setCellValueByColumnAndRow($count, 5, $heading);
                    $count++;
                }
            }
        ];
    }

    /*
    * helper method to update headings
    */
    protected function updateHeadings()
    {
        $this->headings = array_merge(
            array_slice($this->headings, 0, 5),
            $this->earningTitles,
            array_slice($this->headings, 5, 3),
            $this->deductionTitles,
            array_slice($this->headings, 6)
        );
    }
}
