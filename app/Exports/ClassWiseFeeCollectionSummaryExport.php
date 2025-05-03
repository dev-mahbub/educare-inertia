<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class ClassWiseFeeCollectionSummaryExport implements FromCollection
{
    protected $classWiseFeeCollectionSummary = [];
    protected $headings = [
        'class_name',
        'total_amount'
    ];


    public function __construct(array $classWiseFeeCollectionSummary)
    {
        $this->classWiseFeeCollectionSummary = $classWiseFeeCollectionSummary;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        if (!empty($this->classWiseFeeCollectionSummary['reports'])) {
            foreach ($this->classWiseFeeCollectionSummary['reports'] as $index => $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'total_amount') {
                        $rows[$index][] = ($report[$heading] ?? 0) > 0 ? ($report[$heading] ?? 0) : "0";
                    } else {
                        $rows[$index][] = ($report[$heading] ?? 0) > 0 ? ($report[$heading] ?? 0) : "";
                    }
                }
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'class_name') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'total_amount') {
                    $rows[$rows_count][] = ($this->classWiseFeeCollectionSummary['total_amount'] ?? 0) > 0 ? ($this->classWiseFeeCollectionSummary['total_amount'] ?? 0) : "0";
                } else {
                    $rows[$rows_count][] = "";
                }
            }
        }

        // Create an empty collection with headings
        return collect([$this->headings, $rows]);
    }
}
