<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class GuardianWiseDueReportExport implements FromCollection, WithEvents
{
    protected $guardianWiseDueReport = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $reportTitle;
    protected $guardianType;

    protected $headings = [
        'sr_no',
        'phone',
        'student',
        'admission_no',
        'roll_no',
        'class',
        'village/city',
        'total_amount',
        'total_discount',
        'total_payable',
        'total_paid',
        'total_due'
    ];

    protected $paymentModeHeadings = ['payment_mode', 'amount'];


    public function __construct(
        array $guardianWiseDueReport,
        string $schoolTitle,
        string $academicYear,
        string $reportTitle,
        string $guardianType
    ) {
        $this->guardianWiseDueReport = $guardianWiseDueReport;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->reportTitle = $reportTitle;
        $this->guardianType = $guardianType;


        if ($guardianType == 'guardian') {
            $newHeadings = ['guardian_name'];
        } else {
            $newHeadings = ['father_name'];
        }

        $this->headings = array_merge(
            array_slice($this->headings, 0, 1),
            $newHeadings,
            array_slice($this->headings, 1)
        );
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srNo = 0;

        if (!empty($this->guardianWiseDueReport['reports'])) {
            foreach ($this->guardianWiseDueReport['reports'] as $report) {
                $srNo++;

                $studentRowCount = 0;
                if (!empty($report['student_data'])) {
                    foreach ($report['student_data'] as $student) {
                        $studentRowCount++;

                        foreach ($this->headings as $heading) {
                            if (in_array($heading, ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_due'])) {
                                $rows[$count][] = ($student[$heading] ?? 0) > 0 ? $student[$heading] : "0";
                            } else if ($heading == 'student') {
                                $rows[$count][] = $student['name'] ?? "";
                            } else if ($heading == 'village/city') {
                                $rows[$count][] = $student['address'] ?? "";
                            } else if ($heading == 'class') {
                                $rows[$count][] = $student['classroom_title'] ?? "";
                            } else if ($studentRowCount == 1 && $heading == 'guardian_name') {
                                $rows[$count][] = $report['guardian_name'] ?? "";
                            } else if ($studentRowCount == 1 && $heading == 'phone') {
                                $rows[$count][] = $report['guardian_phone'] ?? "";
                            } else if ($studentRowCount == 1 && $heading == 'sr_no') {
                                $rows[$count][] = $srNo;
                            } else {
                                $rows[$count][] = $student[$heading] ?? "";
                            }
                        }

                        $count++;
                    }

                    foreach ($this->headings as $index => $heading) {
                        if ($heading == 'student') {
                            $rows[$count][] = 'Total';
                        } else if (in_array($heading, ['total_amount', 'total_discount', 'total_payable', 'total_paid', 'total_due'])) {
                            $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                        } else {
                            $rows[$count][] = "";
                        }
                    }

                    $count++;
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
                $event->sheet->setCellValue('A1', "{$this->schoolTitle} ({$this->academicYear})");

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
                $event->sheet->setCellValue('A2', $this->reportTitle);

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
