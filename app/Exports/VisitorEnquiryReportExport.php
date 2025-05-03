<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class VisitorEnquiryReportExport implements FromCollection, WithEvents
{
    protected $visitorsEnquiry = [];
    protected $schoolTitle;
    protected $academicYear;
    protected $headings = [
        'Sr',
        'EnquiryNumber',
        'ContactName',
        'EnquiryDate',
        'Phone',
        'Email',
        'EnquiryType',
    ];

    public function __construct($visitorsEnquiry, array $visitorEnquiryDetailType, string $schoolTitle, string $academicYear)
    {
        $this->visitorsEnquiry = $visitorsEnquiry;
        $this->schoolTitle = $schoolTitle;
        $this->academicYear = $academicYear;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;
        if (!empty($this->visitorsEnquiry)) {
            foreach ($this->visitorsEnquiry as $index => $enquiry) {
                $count++;
                $row = [];
                
                foreach ($this->headings as $heading) {
                    switch ($heading) {
                        case 'Sr':
                            $row[] = $count;
                            break;
                        case 'EnquiryNumber':
                            $row[] = $enquiry?->id;
                            break;
                        case 'ContactName':
                            $row[] = $enquiry?->name;
                            break;
                        case 'EnquiryDate':
                            $row[] = $enquiry?->enquiry_date;
                            break;
                        case 'Phone':
                            $row[] = $enquiry?->phone;
                            break;
                        case 'Email':
                            $row[] = $enquiry?->email;
                            break;
                        case 'EnquiryType':
                            $row[] = $enquiry?->enquiryType?->title;
                            break;
                        default:
                            $row[] = '';
                    }
                }
                $rows[] = $row;
            }
        }
        return collect($rows);
    }

    public function registerEvents(): array
    {
        // Rest of the code remains the same...
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // first heading row
                $event->sheet->mergeCells('A1:Z1');
                $event->sheet->setCellValue('A1', $this->schoolTitle);
                $event->sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'size' => 14,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // second heading row
                $event->sheet->mergeCells('A2:Z2');
                $event->sheet->setCellValue('A2', "Visitor Enquiry Report ($this->academicYear)");
                $event->sheet->getStyle('A2')->applyFromArray([
                    'font' => [
                        'size' => 13,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // third heading row
                $event->sheet->mergeCells('A3:Z3');
                $event->sheet->getStyle('A3')->applyFromArray([
                    'font' => [
                        'size' => 13,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                $event->sheet->insertNewRowBefore(4);
                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 4, $heading);
                }
                $event->sheet->getStyle('A2:H2')->applyFromArray([
                    'font' => [
                        'size' => 12,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);
            },
        ];
    }
}