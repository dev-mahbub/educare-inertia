<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;

class StaffSalaryImportTemplateExport implements FromArray, WithEvents
{
    private $staffData;

    public function __construct(array $staffData)
    {
        $this->staffData = $staffData;
    }

    public function array(): array
    {
        $rows = [];

        // earning types
        $earningsKeys = $this->getDynamicKeys('earnings');

        // deduction types
        $deductionsKeys = $this->getDynamicKeys('deductions');

        // Data Rows
        foreach ($this->staffData as $staff) {
            $row = [
                $staff['sr_no'],
                $staff['unique_id'],
                $staff['staff_name'],
                $staff['scale_name'],
                $staff['employee_id'],
            ];

            // Add dynamic earnings columns
            foreach ($earningsKeys as $earning) {
                $row[] = $staff['earnings'][$earning]['expression'] ?? '';
                $row[] = $staff['earnings'][$earning]['amount'] ?? '';
            }

            // Add dynamic deductions columns
            foreach ($deductionsKeys as $deduction) {
                $row[] = $staff['deductions'][$deduction]['expression'] ?? '';
                $row[] = $staff['deductions'][$deduction]['amount'] ?? '';
            }

            $rows[] = $row;
        }

        return $rows;
    }

    public function getDynamicKeys($type): array
    {
        $keys = [];

        foreach ($this->staffData as $staff) {
            $keys = array_merge($keys, array_keys($staff[$type] ?? []));
        }

        return array_unique($keys);
    }

    public function registerEvents(): array
    {
        return [
            BeforeSheet::class => function (BeforeSheet $event) {
                $sheet = $event->sheet;

                $earningsKeys = $this->getDynamicKeys('earnings');
                $deductionsKeys = $this->getDynamicKeys('deductions');

                // Merge headers for counts
                $earningsCount = count($earningsKeys);
                $deductionsCount = count($deductionsKeys);

                // first row heading
                $startEarningsColumn = 6;
                $endEarningsColumn = $startEarningsColumn + ($earningsCount * 2) - 1;

                $startDeductionsColumn = $endEarningsColumn + 1;
                $endDeductionsColumn = $startDeductionsColumn + ($deductionsCount * 2) - 1;

                // second row heading
                $startCol = 6;
                $endCol = 7;

                if ($earningsCount > 0) {
                    $sheet->mergeCells("F1:" . $this->getColumnName($endEarningsColumn) . "1");
                    $sheet->setCellValue("F1", "Earnings - $earningsCount");

                    foreach ($earningsKeys as $earning) {
                        $sheet->mergeCells($this->getColumnName($startCol) . "2:" . $this->getColumnName($endCol) . "2");
                        $sheet->setCellValue($this->getColumnName($startCol) . "2", $earning);
                        $startCol += 2;
                        $endCol += 2;
                    }
                }

                if ($deductionsCount > 0) {
                    $sheet->mergeCells($this->getColumnName($startDeductionsColumn) . "1:" . $this->getColumnName($endDeductionsColumn) . "1");
                    $sheet->setCellValue($this->getColumnName($startDeductionsColumn) . "1", "Deductions - $deductionsCount");

                    foreach ($deductionsKeys as $deduction) {
                        $sheet->mergeCells($this->getColumnName($startCol) . "2:" . $this->getColumnName($endCol) . "2");
                        $sheet->setCellValue($this->getColumnName($startCol) . "2", $deduction);
                        $startCol += 2;
                        $endCol += 2;
                    }
                }

                // third row heading
                $headings = array_merge(
                    ['Sr No.', 'Unique Id', 'Staff Name', 'Scale Name', 'Employee Id'],
                    array_reduce($earningsKeys, fn($carry) => array_merge($carry, ['Expression', 'Amount']), []),
                    array_reduce($deductionsKeys, fn($carry) => array_merge($carry, ['Expression', 'Amount']), [])
                );

                $count = 1;

                foreach ($headings as $heading) {
                    $sheet->setCellValueByColumnAndRow($count, 3, $heading);
                    $count++;
                }

                // Style headers
                $sheet->getStyle('A1:Z3')->applyFromArray([
                    'font' => ['bold' => false],
                    'alignment' => ['horizontal' => 'center', 'vertical' => 'center'],
                ]);
            },
        ];
    }

    private function getColumnName($columnIndex): string
    {
        $letters = '';

        while ($columnIndex > 0) {
            $remainder = ($columnIndex - 1) % 26;
            $letters = chr(65 + $remainder) . $letters;
            $columnIndex = (int)(($columnIndex - $remainder) / 26);
        }

        return $letters;
    }
}
