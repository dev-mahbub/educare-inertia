<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CalendarListExport implements FromCollection, WithHeadings
{
    protected $calendarList = [];
    protected $headings = [
        'sr_no',
        'title',
        'start_date',
        'end_date',
        'calendar_type',
    ];

    public function __construct(array $calendarList = [])
    {
        $this->calendarList = $calendarList;
    }

    public function headings(): array
    {
        return $this->headings;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->calendarList)) {
            foreach ($this->calendarList as $index => $data) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$count][] = $index + 1;
                    } else {
                        $rows[$count][] = $data[$heading] ?? "";
                    }
                }

                $count++;
            }
        }

        return collect([$rows]);
    }
}
