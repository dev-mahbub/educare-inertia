<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;

class HeadWiseOutstandingDueReportExport implements FromCollection, WithEvents
{
    protected $headWiseDueReport = [];
    protected $classroomTitle;

    protected $headings = [
        'class',
        'roll',
        'admission_no',
        'name',
        'parent',
        'phone',
        'employment_category',
        'total',
        'installments',
        'no_of_due_installments',
    ];


    public function __construct(array $headWiseDueReport, string $classroomTitle)
    {
        $this->headWiseDueReport = $headWiseDueReport;
        $this->classroomTitle = $classroomTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->headWiseDueReport['reports'])) {
            $feeTypeKeys = array_keys($this->headWiseDueReport['head_wise_amounts'] ?? []);

            foreach ($this->headWiseDueReport['reports'] as $report) {

                foreach ($this->headings as $heading) {
                    if (in_array($heading, $feeTypeKeys)) {
                        $rows[$count][] = ($report['head_wise_amounts'][$heading] ?? 0) > 0 ? $report['head_wise_amounts'][$heading] : "0";
                    } else if ($heading == 'total') {
                        $rows[$count][] = ($report[$heading] ?? 0) > 0 ? $report[$heading] : "0";
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'phone') {
                    $rows[$rows_count][] = 'Total';
                } else if (isset($this->headWiseDueReport['head_wise_amounts'][$heading])) {
                    $amount = $this->headWiseDueReport['head_wise_amounts'][$heading] ?? 0;
                    $rows[$rows_count][] = $amount > 0 ? $amount : "0";
                } else if ($heading == 'total') {
                    $rows[$rows_count][] = ($this->headWiseDueReport['total'] ?? 0) > 0 ? $this->headWiseDueReport['total'] : "0";
                } else {
                    $rows[$rows_count][] = "";
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
                $event->sheet->setCellValue('A1', "DUE REPORT FOR THE CLASS - {$this->classroomTitle}");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A1')->applyFromArray([
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
                $event->sheet->insertNewRowBefore(2);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 2, $heading);
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
        if (!empty($this->headWiseDueReport['head_wise_amounts'])) {
            $feeTypeAmountsKeys = array_keys($this->headWiseDueReport['head_wise_amounts']);

            $this->headings = array_merge(
                array_slice($this->headings, 0, 7),
                $feeTypeAmountsKeys,
                array_slice($this->headings, 7)
            );
        }
    }
}
