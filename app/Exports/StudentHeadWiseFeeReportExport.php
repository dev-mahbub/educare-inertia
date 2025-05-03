<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentHeadWiseFeeReportExport implements FromCollection, WithEvents
{
    protected $studentHeadWiseFeeReport = [];
    protected $classroomTitle = "";
    protected $fromFeeTitle = "";
    protected $toFeeTitle = "";
    protected $schoolTitle = "";
    protected $academicYear = "";

    protected $headings = [
        'S.N.',
        'admission_no',
        'name',
        'roll_no',
        'class',
        'father_name',
        'total_fee',
        'concession',
        'total_payable',
        'total_paid',
        'total_due',
        'status'
    ];


    public function __construct(array $studentHeadWiseFeeReport, string $classroomTitle, string $fromFeeTitle, string $toFeeTitle, string $schoolTitle, string $academicYear)
    {
        $this->studentHeadWiseFeeReport = $studentHeadWiseFeeReport;
        $this->classroomTitle = $classroomTitle;
        $this->fromFeeTitle = $fromFeeTitle;
        $this->toFeeTitle = $toFeeTitle;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->studentHeadWiseFeeReport['reports'])) {
            foreach ($this->studentHeadWiseFeeReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['S.N.', 'admission_no', 'name', 'roll_no', 'class', 'father_name', 'status'])) {
                        if ($heading == 'S.N.') {
                            $rows[$count][] = $count + 1;
                        } else {
                            $rows[$count][] = $report[$heading] ?? "";
                        }
                    } else {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    }
                }

                $count++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($index == 5) {
                    $rows[$rows_count][] = 'Totals';
                } else if ($heading == 'total_fee') {
                    $rows[$rows_count][] = ($this->studentHeadWiseFeeReport['total_fee'] ?? 0) > 0 ? $this->studentHeadWiseFeeReport['total_fee'] : "0";
                } else if ($heading == 'concession') {
                    $rows[$rows_count][] = ($this->studentHeadWiseFeeReport['concession'] ?? 0) > 0 ? $this->studentHeadWiseFeeReport['concession'] : "0";
                } else if (isset($this->studentHeadWiseFeeReport['fee_type_amounts'][$heading])) {
                    $feeAmount = $this->studentHeadWiseFeeReport['fee_type_amounts'][$heading] ?? 0;
                    $rows[$rows_count][$heading] = $feeAmount > 0 ? $feeAmount : "0";
                } else if ($heading == 'total_payable') {
                    $rows[$rows_count][] = ($this->studentHeadWiseFeeReport['total_payable'] ?? 0) > 0 ? $this->studentHeadWiseFeeReport['total_payable'] : "0";
                } else if ($heading == 'total_paid') {
                    $rows[$rows_count][] = ($this->studentHeadWiseFeeReport['total_paid'] ?? 0) > 0 ? $this->studentHeadWiseFeeReport['total_paid'] : "0";
                } else if ($heading == 'total_due') {
                    $rows[$rows_count][] = ($this->studentHeadWiseFeeReport['total_due'] ?? 0) > 0 ? $this->studentHeadWiseFeeReport['total_due'] : "0";
                } else {
                    if (in_array($heading, ['S.N.', 'admission_no', 'name', 'roll_no', 'class', 'father_name', 'status'])) {
                        $rows[$rows_count][] = "";
                    } else {
                        $rows[$rows_count][] = "0";
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
                $event->sheet->setCellValue('A1', strtoupper($this->schoolTitle));

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
                $event->sheet->setCellValue('A2', "ACADEMIC SESSION : {$this->academicYear}");

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

                // third heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A3:Z3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', "STUDENT HEAD WISE SUMMARY_REPORT ({$this->classroomTitle})");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
                    'font' => [
                        'size' => 16,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);


                // fourth heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A4:Z4');

                // Set heading for merged cells
                $event->sheet->setCellValue('A4', "Installments from {$this->fromFeeTitle} To {$this->toFeeTitle}");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A4')->applyFromArray([
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
                $event->sheet->insertNewRowBefore(2);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 5, $heading);
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


    /*
    * helper method to update headings
    */
    protected function updateHeadings()
    {
        if (!empty($this->studentHeadWiseFeeReport['fee_type_amounts'])) {
            $feeTypeAmountsKeys = array_keys($this->studentHeadWiseFeeReport['fee_type_amounts']);
            $this->headings = array_merge(
                array_slice($this->headings, 0, 9),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 9)
            );
        }
    }
}
