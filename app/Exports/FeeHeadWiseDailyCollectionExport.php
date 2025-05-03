<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class FeeHeadWiseDailyCollectionExport implements FromCollection, WithEvents
{
    protected $headWiseDailyCollectionReport = [];
    protected $startDate;
    protected $endDate;
    protected $schoolTitle;
    protected $academicYear;
    protected $classNameTitle;
    protected $totalRows = 0;

    protected $headings = [
        'admission_no',
        'name',
        'class',
        'father_name',
        'receipt_no',
        'school_receipt_no',
        'receipt_date',
        'receipt_note',
        'transaction_id',
        'mode',
        'taken_by',
        'payment_note',
        'student_type',
        'gender',
        'employment_category',
        'amount',
        'discount',
        'payable',
        'paid',
        'due'
    ];

    protected $paymentModeHeadings = ['payment_mode', 'amount'];


    public function __construct(
        array $headWiseDailyCollectionReport,
        string $startDate,
        string $endDate,
        string $schoolTitle,
        string $academicYear,
        string $classNameTitle
    ) {
        $this->headWiseDailyCollectionReport = $headWiseDailyCollectionReport;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->classNameTitle = $classNameTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->headWiseDailyCollectionReport['reports'])) {
            $feeTypeKeys = array_keys($this->headWiseDailyCollectionReport['fee_type_paid_amount_array'] ?? []);

            foreach ($this->headWiseDailyCollectionReport['reports'] as $dateWiseReports) {
                if (!empty($dateWiseReports)) {
                    foreach ($dateWiseReports['reports'] as $report) {
                        foreach ($this->headings as $heading) {
                            if (in_array($heading, ['amount', 'discount', 'payable', 'paid', 'due', ...$feeTypeKeys])) {
                                $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                            } else {
                                $rows[$count][] = $report[$heading] ?? "";
                            }
                        }

                        $count++;
                    }

                    foreach ($this->headings as $index => $heading) {
                        if ($heading == 'mode') {
                            $rows[$count][] = 'Total';
                        } else if ($heading == 'amount') {
                            $rows[$count][] = ($dateWiseReports['amount'] ?? 0) > 0 ? $dateWiseReports['amount'] : "0";
                        } else if ($heading == 'discount') {
                            $rows[$count][] = ($dateWiseReports['discount'] ?? 0) > 0 ? $dateWiseReports['discount'] : "0";
                        } else if ($heading == 'payable') {
                            $rows[$count][] = ($dateWiseReports['payable'] ?? 0) > 0 ? $dateWiseReports['payable'] : "0";
                        } else if ($heading == 'paid') {
                            $rows[$count][] = ($dateWiseReports['paid'] ?? 0) > 0 ? $dateWiseReports['paid'] : "0";
                        } else if ($heading == 'due') {
                            $rows[$count][] = ($dateWiseReports['due'] ?? 0) > 0 ? $dateWiseReports['due'] : "0";
                        } else if (isset($dateWiseReports['fee_type_paid_amount_array'][$heading])) {
                            $amount = $dateWiseReports['fee_type_paid_amount_array'][$heading] ?? 0;
                            $rows[$count][] = $amount > 0 ? $amount : "0";
                        } else {
                            $rows[$count][] = "";
                        }
                    }

                    $count++;
                }
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'mode') {
                    $rows[$rows_count][] = 'Grand Total';
                } else if ($heading == 'amount') {
                    $rows[$rows_count][] = ($this->headWiseDailyCollectionReport['amount'] ?? 0) > 0 ? $this->headWiseDailyCollectionReport['amount'] : "0";
                } else if ($heading == 'discount') {
                    $rows[$rows_count][] = ($this->headWiseDailyCollectionReport['discount'] ?? 0) > 0 ? $this->headWiseDailyCollectionReport['discount'] : "0";
                } else if ($heading == 'payable') {
                    $rows[$rows_count][] = ($this->headWiseDailyCollectionReport['payable'] ?? 0) > 0 ? $this->headWiseDailyCollectionReport['payable'] : "0";
                } else if ($heading == 'paid') {
                    $rows[$rows_count][] = ($this->headWiseDailyCollectionReport['paid'] ?? 0) > 0 ? $this->headWiseDailyCollectionReport['paid'] : "0";
                } else if ($heading == 'due') {
                    $rows[$rows_count][] = ($this->headWiseDailyCollectionReport['due'] ?? 0) > 0 ? $this->headWiseDailyCollectionReport['due'] : "0";
                } else if (isset($this->headWiseDailyCollectionReport['fee_type_paid_amount_array'][$heading])) {
                    $amount = $this->headWiseDailyCollectionReport['fee_type_paid_amount_array'][$heading] ?? 0;
                    $rows[$rows_count][] = $amount > 0 ? $amount : "0";
                } else {
                    $rows[$rows_count][] = "";
                }
            }
        }

        // need to work on this

        // $this->totalRows = count($rows) + 6;

        // $paymentModeCount = count($rows) + 3;

        // if (!empty($this->headWiseDailyCollectionReport['total_paid_by_payment_mode'])) {
        //     foreach (array_keys($this->headWiseDailyCollectionReport['total_paid_by_payment_mode']) as $paymentMode) {
        //         foreach ($this->paymentModeHeadings as $heading) {
        //             if ($heading == 'amount') {
        //                 $rows[$paymentModeCount][] = ($this->headWiseDailyCollectionReport['total_paid_by_payment_mode'][$paymentMode] ?? 0) > 0 ? $this->headWiseDailyCollectionReport['total_paid_by_payment_mode'][$paymentMode] : "0";
        //             } else {
        //                 $rows[$paymentModeCount][] = $paymentMode;
        //             }
        //         }

        //         $paymentModeCount++;
        //     }
        // }

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
                $event->sheet->setCellValue('A2', "HEAD WISE FEE COLLECTION {$this->startDate} to {$this->endDate}");

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
                $event->sheet->setCellValue('A3', "DAILY COLLECTION FOR {$this->classNameTitle}");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
                    'font' => [
                        'size' => 14,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    // Add any other formatting you desire
                ]);

                // need to work on this

                // // heading row  for payment mode wise summary
                // // Merge cells for the heading
                // $event->sheet->mergeCells("A{$this->totalRows}:C{$this->totalRows}");

                // // Set heading for merged cells
                // $event->sheet->setCellValue("A{$this->totalRows}", "Payment Mode Wise Summary {$this->classNameTitle}");

                // // Optionally, you can format the heading cell
                // $event->sheet->getStyle("A{$this->totalRows}")->applyFromArray([
                //     'font' => [
                //         'size' => 14,
                //     ],
                //     'alignment' => [
                //         'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                //         'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                //     ],
                //     // Add any other formatting you desire
                // ]);


                // // second heading row for payment mode wise summary
                // foreach ($this->paymentModeHeadings as $index => $heading) {
                //     $event->sheet->setCellValueByColumnAndRow($index + 1, $this->totalRows + 1, $heading);
                // }

                // // Optionally, you can format the heading cell
                // $event->sheet->getStyle("A{$this->totalRows}:B{$this->totalRows}")->applyFromArray([
                //     'font' => [
                //         'size' => 12,
                //     ],
                //     'alignment' => [
                //         'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                //         'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                //     ],
                //     // Add any other formatting you desire
                // ]);
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


    /*
    * helper method to update headings
    */
    protected function updateHeadings()
    {
        if (!empty($this->headWiseDailyCollectionReport['fee_type_paid_amount_array'])) {
            $feeTypeAmountsKeys = array_keys($this->headWiseDailyCollectionReport['fee_type_paid_amount_array']);
            $this->headings = array_merge(
                array_slice($this->headings, 0, 15),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 15)
            );
        }
    }
}
