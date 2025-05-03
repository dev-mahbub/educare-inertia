<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class InstallmentWiseFeeCollectionSummaryExport implements FromCollection
{
    protected $installmentWiseFeeCollectionSummary = [];
    protected $headings = [
        'title',
        'amount'
    ];


    public function __construct(array $installmentWiseFeeCollectionSummary)
    {
        $this->installmentWiseFeeCollectionSummary = $installmentWiseFeeCollectionSummary;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        if (!empty($this->installmentWiseFeeCollectionSummary['reports'])) {
            foreach ($this->installmentWiseFeeCollectionSummary['reports'] as $index => $report) {
                foreach ($this->headings as $heading) {
                    if ($heading == 'amount') {
                        $rows[$index][] = ($report[$heading] ?? 0) > 0 ? ($report[$heading] ?? 0) : "0";
                    } else {
                        $rows[$index][] = ($report[$heading] ?? 0) > 0 ? ($report[$heading] ?? 0) : "";
                    }
                }
            }

            $rows_count = count($rows);

            foreach ($this->headings as $index => $heading) {
                if ($heading == 'title') {
                    $rows[$rows_count][] = 'Total';
                } else if ($heading == 'amount') {
                    $rows[$rows_count][] = ($this->installmentWiseFeeCollectionSummary['amount'] ?? 0) > 0 ? ($this->installmentWiseFeeCollectionSummary['amount'] ?? 0) : "0";
                } else {
                    $rows[$rows_count][] = "";
                }
            }
        }

        // Create an empty collection with headings
        return collect([$this->headings, $rows]);
    }
}
