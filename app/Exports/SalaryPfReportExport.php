<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class SalaryPfReportExport implements FromCollection, WithEvents
{
    protected $salaryPfReport = [];
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $paymentMonthTitle = "";
    protected $employeeEpf;
    protected $employerEps;
    protected $headings = [
        'sr_no' => 'Sl.No',
        'employee_id' => 'Employee Id',
        'staff_name' => 'Staff Name',
        'uan' => 'UAN',
        'gross_salary' => 'Gross Salary - without pay',
        'epf_wage' => 'EPF Wages - without pay',
        'eps_wage' => 'EPS Wages',
        'ee' => 'EE',
        'eps' => 'EPS',
        'er' => 'ER',
        'leave_deduction_days' => 'Leave Deduction days',
    ];

    public function __construct(
        array $salaryPfReport = [],
        string $schoolTitle = "",
        string $academicYear = "",
        string $paymentMonthTitle = "",
        $employeeEpf,
        $employerEps
    ) {
        $this->salaryPfReport = $salaryPfReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->paymentMonthTitle = $paymentMonthTitle;
        $this->employeeEpf = $employeeEpf;
        $this->employerEps = $employerEps;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->salaryPfReport)) {
            foreach ($this->salaryPfReport as $index => $data) {
                foreach ($this->headings as $key => $heading) {
                    if ($key == 'sr_no') {
                        $rows[$count][] = $index + 1;
                    } else if (in_array($key, ['gross_salary', 'epf_wage', 'eps_wage', 'ee', 'eps', 'er', 'leave_deduction_days'])) {
                        $value  = $data[$key] ?? 0;

                        $rows[$count][] = $value > 0 ? $value : "0";
                    } else {
                        $rows[$count][] = $data[$key] ?? "";
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
                $event->sheet->setCellValue('A2', "Provident Fund - $this->paymentMonthTitle ($this->academicYear)");

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
                // Set heading for cells
                $event->sheet->setCellValue('H3', "$this->employeeEpf% of EPF");
                $event->sheet->setCellValue('I3', "$this->employerEps% of EPS");
                $event->sheet->setCellValue('J3', "$this->employeeEpf% - $this->employerEps%");

                // fourth heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('E4:G4');
                $event->sheet->mergeCells('H4:J4');

                // Set heading for merged cells
                $event->sheet->setCellValue('E4', "Wages");
                $event->sheet->setCellValue('H4', "Contribution Remitted");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('E4')->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);

                $event->sheet->getStyle('H4')->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(5);

                foreach (array_values($this->headings) as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 5, $heading);
                }

                // Optionally, you can format the heading row
                $event->sheet->getStyle('A5:H5')->applyFromArray([
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
