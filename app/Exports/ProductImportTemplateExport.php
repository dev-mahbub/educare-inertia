<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class ProductImportTemplateExport implements FromCollection
{
    protected $headings = [
        'group',
        'product_name',
        'quantity',
        'price',
        'tax_percentage',
        'product_code',
        'product_size',
        'type'
    ];

    public function __construct() {}

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        return collect([$this->headings, $rows]);
    }
}
