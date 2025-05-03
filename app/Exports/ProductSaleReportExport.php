<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductSaleReportExport implements FromCollection, WithEvents
{
    protected $productSaleReport = [];
    protected $product;
    protected $schoolTitle = "";
    protected $academicYear = "";
    protected $reportDateTitle = "";
    protected $headings = [
        'date',
        'name',
        'quantity',
        'rate',
        'tax',
        'discount',
        'amount'
    ];


    public function __construct(array $productSaleReport, object $product, string $schoolTitle, string  $academicYear, string $reportDateTitle)
    {
        $this->productSaleReport = $productSaleReport;
        $this->product = $product;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
        $this->reportDateTitle = $reportDateTitle;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->productSaleReport['reports'])) {
            foreach ($this->productSaleReport['reports'] as $index => $report) {
                foreach ($this->headings as $heading) {
                    if (in_array($heading, ['quantity', 'rate', 'tax', 'discount', 'amount'])) {
                        $rows[$count][] = $report[$heading] ?? "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }

            foreach ($this->headings as $heading) {
                if ($heading == 'date') {
                    $rows[$count][] = 'Total';
                } else if ($heading == 'quantity') {
                    $rows[$count][] = $this->productSaleReport['total_quantity'] ?? "0";
                } else if ($heading == 'tax') {
                    $rows[$count][] = $this->productSaleReport['total_tax'] ?? "0";
                } else if ($heading == 'discount') {
                    $rows[$count][] = $this->productSaleReport['total_discount'] ?? "0";
                } else if ($heading == 'amount') {
                    $rows[$count][] = $this->productSaleReport['total_amount'] ?? "0";
                } else {
                    $rows[$count][] = $this->productSaleReport[$heading] ?? "";
                }
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
                $event->sheet->setCellValue('A1', $this->schoolTitle . '(' . $this->academicYear . ')');

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
                $event->sheet->setCellValue('A2', 'Product Name :' . $this->product?->title . ' ( Opening Stock : ' . $this->product?->opening_stock . ' | Current Stock : ' . $this->product?->available_stock . ')');

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
                $event->sheet->setCellValue('A3', 'Sales Report (' . $this->reportDateTitle . ')');

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
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(4);

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
}
