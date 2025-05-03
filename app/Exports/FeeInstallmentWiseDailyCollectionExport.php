<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class FeeInstallmentWiseDailyCollectionExport implements FromCollection, WithEvents
{
    protected $installmentWiseDailyCollectionReport = [];
    protected $startDate;
    protected $endDate;
    protected $paymentMode;
    protected $feeMode;
    protected $totalCollection;


    protected $headings = [
        'admission_no',
        'roll_no',
        'student_type',
        'name',
        'class',
        'father_name',
        'fee_source',
        'receipt_no',
        'receipt_date',
        'receipt_note',
        'mode',
        'amount',
        'discount',
        'payable',
        'paid',
        'due',
        'school_receipt_no',
        'academic_year',
    ];


    public function __construct(array $installmentWiseDailyCollectionReport, string $startDate, string $endDate, string $paymentMode, string $feeMode)
    {
        $this->installmentWiseDailyCollectionReport = $installmentWiseDailyCollectionReport;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->paymentMode = $paymentMode;
        $this->feeMode = $feeMode;
        $this->totalCollection = $installmentWiseDailyCollectionReport['paid'] ?? 0;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->installmentWiseDailyCollectionReport['reports'])) {
            $feeTypeKeys = array_keys($this->installmentWiseDailyCollectionReport['fee_type_paid_amount'] ?? []);

            foreach ($this->installmentWiseDailyCollectionReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['amount', 'discount', 'payable', 'paid', 'due', ...$feeTypeKeys])) {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'mode') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'amount') {
                    $rows[$rows_count][] = $this->installmentWiseDailyCollectionReport['amount'] ?? "";
                } else if ($heading == 'discount') {
                    $rows[$rows_count][] = $this->installmentWiseDailyCollectionReport['discount'] ?? "";
                } else if ($heading == 'payable') {
                    $rows[$rows_count][] = $this->installmentWiseDailyCollectionReport['payable'] ?? "";
                } else if ($heading == 'paid') {
                    $rows[$rows_count][] = $this->installmentWiseDailyCollectionReport['paid'] ?? "";
                } else if ($heading == 'due') {
                    $rows[$rows_count][] = $this->installmentWiseDailyCollectionReport['due'] ?? "";
                } else if (!empty($this->installmentWiseDailyCollectionReport['fee_type_paid_amount'][$heading])) {
                    $amount = $this->installmentWiseDailyCollectionReport['fee_type_paid_amount'][$heading];
                    $rows[$rows_count][] = $amount > 0 ? $amount : "0";
                } else {
                    $rows[$rows_count][] = "";
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
                $event->sheet->setCellValue('A1', "FEE COLLECTION {$this->startDate} to {$this->endDate}");

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
                $event->sheet->setCellValue('A2', "TOTAL COLLECTION = {$this->totalCollection}");

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


                // fourth heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A3:Z3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', "PAYMENT MODE - {$this->paymentMode}, FEE MODE - {$this->feeMode}");

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
        if (!empty($this->installmentWiseDailyCollectionReport['fee_type_paid_amount'])) {
            $feeTypeAmountsKeys = array_keys($this->installmentWiseDailyCollectionReport['fee_type_paid_amount']);
            $this->headings = array_merge(
                array_slice($this->headings, 0, 13),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 13)
            );
        }
    }
}
