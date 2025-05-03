<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class BasicSalaryReportExport implements FromCollection, WithEvents
{
    protected $basicSalaryReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";

    protected $headings = [
        'Sr No.',
        'Teacher Name',
        'Employee Id',
        'Earnings',
        'Deductions',
        'Current Basic Pay',
        'Pf Account No',
        'UAN',
        'Bank Account No',
        'Bank Name',
        'Last Updated On'
    ];


    public function __construct(array $basicSalaryReport, string $schoolTitle, string $academicYear)
    {
        $this->basicSalaryReport = $basicSalaryReport;
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
        $srNo = 1;

        // receipt report
        if (!empty($this->basicSalaryReport)) {
            foreach ($this->basicSalaryReport as $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'Sr No.') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'Teacher Name') {
                        $rows[$count][] = ($report['staff']['first_name'] ?? '') . ' ' . ($report['staff']['middle_name'] ?? '') . ' ' . ($report['staff']['last_name'] ?? '');
                    } else if ($heading == 'Employee Id') {
                        $rows[$count][] = $report['staff']['employee_id'] ?? '';
                    } else if ($heading == 'Earnings') {
                        $rows[$count][] = count($report['earnings'] ?? []);
                    } else if ($heading == 'Deductions') {
                        $rows[$count][] = count($report['deductions'] ?? []);
                    } else if ($heading == 'Current Basic Pay') {
                        $rows[$count][] = ($report['basic_pay'] ?? 0) > 0 ? $report['basic_pay'] : "0";
                    } else if ($heading == 'Pf Account No') {
                        $rows[$count][] = $report['staff']['pf_account_number'] ?? '';
                    } else if ($heading == 'UAN') {
                        $rows[$count][] = $report['staff']['uan'] ?? '';
                    } else if ($heading == 'Bank Account No') {
                        $rows[$count][] = $report['staff']['bank_account_no'] ?? '';
                    } else if ($heading == 'Bank Name') {
                        $rows[$count][] = $report['staff']['bank_name'] ?? '';
                    } else if ($heading == 'Last Updated On') {
                        $rows[$count][] = $report['updated_on'] ?? '';
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                // earnings
                if (!empty($report['earnings'])) {
                    foreach ($report['earnings'] as $earning) {
                        $count++;

                        foreach ($this->headings as $heading) {
                            if ($heading == 'Earnings') {
                                $rows[$count][] = $earning['title'] ?? '';
                            } else if ($heading == 'Current Basic Pay') {
                                $rows[$count][] = ($earning['amount'] ?? 0) > 0 ? $earning['amount'] : "0";
                            } else {
                                $rows[$count][] = $report[$heading] ?? "";
                            }
                        }
                    }

                    $count += 1;

                    foreach ($this->headings as $heading) {
                        if ($heading == 'Earnings') {
                            $rows[$count][] = 'Total Earning';
                        } else if ($heading == 'Current Basic Pay') {
                            $rows[$count][] = ($report['earning_amount'] ?? 0) > 0 ? $report['earning_amount'] : "0";
                        } else {
                            $rows[$count][] = $report[$heading] ?? "";
                        }
                    }
                }

                // deductions
                if (!empty($report['deductions'])) {
                    foreach ($report['deductions'] as $deduction) {
                        $count++;

                        foreach ($this->headings as $heading) {
                            if ($heading == 'Deductions') {
                                $rows[$count][] = $deduction['title'] ?? '';
                            } else if ($heading == 'Current Basic Pay') {
                                $rows[$count][] = ($deduction['amount'] ?? 0) > 0 ? $deduction['amount'] : "0";
                            } else {
                                $rows[$count][] = $report[$heading] ?? "";
                            }
                        }
                    }

                    $count += 1;

                    foreach ($this->headings as $heading) {
                        if ($heading == 'Deductions') {
                            $rows[$count][] = 'Total Deduction';
                        } else if ($heading == 'Current Basic Pay') {
                            $rows[$count][] = ($report['deduction_amount'] ?? 0) > 0 ? $report['deduction_amount'] : "0";
                        } else {
                            $rows[$count][] = $report[$heading] ?? "";
                        }
                    }
                }

                $count++;
                $srNo++;
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
                $event->sheet->setCellValue('A2', "Basic Salary Report");

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
