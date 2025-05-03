<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class RegistrationReportExport implements FromCollection, WithEvents
{
    protected $registrationReport = [];
    protected $schoolTitle = "";
    protected $dateTitle = "";
    protected $customFields = [];

    protected $headings = [
        'registration_no',
        'form_no',
        'class',
        'student_name',
        'dob',
        'father_name',
        'mobile',
        'fee',
        'admission_no',
        'registration_date',
        'taken_by'
    ];


    public function __construct(array $registrationReport, string $schoolTitle, string $dateTitle, array $customFields)
    {
        $this->registrationReport = $registrationReport;
        $this->schoolTitle = $schoolTitle;
        $this->dateTitle = $dateTitle;
        $this->customFields = $customFields;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $count = 0;

        if (!empty($this->registrationReport)) {
            foreach ($this->registrationReport as $report) {
                foreach ($this->headings as $heading) {
                    if (!empty($this->customFields) && !empty($report['enquiry_custom_fields'])) {
                        $found = false;

                        foreach ($this->customFields as $customField) {
                            foreach ($report['enquiry_custom_fields'] as $enquiryCustomField) {
                                if ($enquiryCustomField?->custom_field_id == $customField['id'] && $heading == $customField['name']) {
                                    $rows[$count][] = $enquiryCustomField->value ?? '';
                                    $found = true;

                                    break;
                                }
                            }

                            if ($found) {
                                break;
                            }
                        }

                        if ($found) {
                            continue;
                        }
                    }

                    $rows[$count][] = $report[$heading] ?? "";
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
                $event->sheet->setCellValue('A1', $this->schoolTitle);

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
                $event->sheet->setCellValue('A2', $this->dateTitle);

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
                $event->sheet->setCellValue('A3', "Registration Report");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
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
                $event->sheet->insertNewRowBefore(4);

                foreach ($this->headings as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 4, $heading);
                }

                // Optionally, you can format the heading row
                $event->sheet->getStyle('A4:H4')->applyFromArray([
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

    protected function updateHeadings()
    {
        if (!empty($this->customFields)) {
            $this->headings = array_merge($this->headings, collect($this->customFields)->pluck('name')->toArray());
        }
    }
}
