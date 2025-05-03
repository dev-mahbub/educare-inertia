<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class FeeDailyCollectionExport implements FromCollection, WithEvents
{
    protected $dailyCollectionReport = [];
    protected $schoolTitle = "";
    protected $startDate;
    protected $endDate;
    protected $paymentMode;
    protected $feeMode;
    protected $totalCollection;

    protected $headings = [
        'Sr no.',
        'status',
        'student_type',
        'student_name',
        'admission_number',
        'class_name',
        'parent_name',
        'fee_source',
        'receipt_no',
        'receipt_note',
        'roll_no',
        'total_amount',
        'discount',
        'payable_amount',
        'total_paid',
        'total_due',
        'payment_mode',
        'transaction_id',
        'payment_date',
        'payment_note',
        'address',
        'school_receipt_no',
        'employment_category',
        'student_mobile',
        'father_mobile',
        'academic_year',
    ];


    public function __construct(array $dailyCollectionReport, string $schoolTitle, string $startDate, string $endDate, string $paymentMode, string $feeMode)
    {
        $this->dailyCollectionReport = $dailyCollectionReport;
        $this->schoolTitle = $schoolTitle;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->paymentMode = $paymentMode;
        $this->feeMode = $feeMode;
        $this->totalCollection = $dailyCollectionReport['total_paid'] ?? 0;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->dailyCollectionReport['reports'])) {
            foreach ($this->dailyCollectionReport['reports'] as $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['total_amount', 'discount', 'payable_amount', 'total_paid', 'total_due'])) {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        if ($heading == 'Sr no.') {
                            $rows[$count][] = $count + 1;
                        } else {
                            $rows[$count][] = $report[$heading] ?? "";
                        }
                    }
                }

                $count++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'roll_no') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'total_amount') {
                    $rows[$rows_count][] = ($this->dailyCollectionReport['total_amount'] ?? 0) > 0 ? $this->dailyCollectionReport['total_amount'] : "0";
                } else if ($heading == 'discount') {
                    $rows[$rows_count][] = ($this->dailyCollectionReport['discount'] ?? 0) > 0 ? $this->dailyCollectionReport['discount'] : "0";
                } else if ($heading == 'payable_amount') {
                    $rows[$rows_count][] = ($this->dailyCollectionReport['payable_amount'] ?? 0) > 0 ? $this->dailyCollectionReport['payable_amount'] : "0";
                } else if ($heading == 'total_paid') {
                    $rows[$rows_count][] = ($this->dailyCollectionReport['total_paid'] ?? 0) > 0 ? $this->dailyCollectionReport['total_paid'] : "0";
                } else if ($heading == 'total_due') {
                    $rows[$rows_count][] = ($this->dailyCollectionReport['total_due'] ?? 0) > 0 ? $this->dailyCollectionReport['total_due'] : "0";
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
                $event->sheet->setCellValue('A2', "FEE COLLECTION {$this->startDate} to {$this->endDate}");

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
                $event->sheet->setCellValue('A3', "TOTAL COLLECTION = {$this->totalCollection}");

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


                // fourth heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A4:Z4');

                // Set heading for merged cells
                $event->sheet->setCellValue('A4', "PAYMENT MODE - {$this->paymentMode}, FEE MODE - {$this->feeMode}");

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
}
