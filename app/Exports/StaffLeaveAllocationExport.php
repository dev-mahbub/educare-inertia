<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StaffLeaveAllocationExport implements FromCollection, WithEvents
{
    protected $staffLeaveAllocations = [];
    protected $staffType = "";
    protected $gender = "";

    protected $headings  = [
        'sr_no',
        'employee_id',
        'staff',
        'designation'
    ];

    public function __construct(array $staffLeaveAllocations = [], string $staffType = '', string $gender = '')
    {
        $this->staffLeaveAllocations = $staffLeaveAllocations;
        $this->staffType = !empty($staffType) ? $staffType : 'All';
        $this->gender = !empty($gender) ? $gender : 'All';

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        $srNo = 0;

        if (!empty($this->staffLeaveAllocations['reports'])) {
            foreach ($this->staffLeaveAllocations['reports'] as $report) {
                $srNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $srNo;
                    } else if ($heading == 'employee_id') {
                        $rows[$count][] = isset($report[$heading]) && $report[$heading] == 0 ? '0' :  $report[$heading] ?? '';
                    } else if (!in_array($heading, ['sr_no', 'employee_id', 'staff', 'designation'])) {
                        if (!empty($report['leave_allocations'])) {
                            foreach ($report['leave_allocations'] as $allocations) {
                                if ($allocations['leave_type'] == $heading) {
                                    $rows[$count][] = $allocations['days'] ?? "";
                                }
                            }
                        }
                    } else {
                        $rows[$count][] = $report[$heading] ?? "";
                    }
                }

                $count++;
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
                $event->sheet->setCellValue('A1', "Staff Leave Allocation");

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
                $event->sheet->setCellValue('A2', 'Type: ' . $this->staffType . ' Gender: ' . $this->gender);

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
                $event->sheet->getStyle('A3:H3')->applyFromArray([
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
        if (!empty($this->staffLeaveAllocations['leave_types'])) {
            $leaveTypes = collect($this->staffLeaveAllocations['leave_types'])->pluck('title')->toArray();

            $this->headings = array_merge(
                array_slice($this->headings, 0, 4),
                $leaveTypes,
                array_slice($this->headings, 4)
            );
        }
    }
}
