<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentsExportWithFilter implements FromCollection, WithEvents
{
    protected $students = [];
    protected $customFields = [];
    protected $headings = [
        'sl_no',
        'first_name',
        'middle_name',
        'last_name',
        'admission_no',
        'roll_no',
        'classTitle',
        'birth_date_at',
        'fatherFirstName',
        'fatherMiddleName',
        'fatherLastName',
        'fatherPhone',
        'smsPhone'
    ];

    public function __construct(array|object $students, array $customFields)
    {
        $this->students = $students;
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

        if (!empty($this->students)) {
            foreach ($this->students as $index => $std) {
                $count++;
                foreach ($this->headings as $heading) {
                    if ($heading == 'sl_no') {
                        $rows[$index][] = $count;
                    } else if ($heading == 'roll_no') {
                        $rows[$index][] = $std?->classroomRoll?->roll_no;
                    } else {
                        if (!empty($this->customFields) && count($std->studentCustomFields) > 0) {
                            $found = false;

                            foreach ($this->customFields as $customField) {
                                foreach ($std->studentCustomFields as $studentCustomField) {
                                    if ($studentCustomField?->custom_field_id == $customField['id'] && $heading == $customField['name']) {
                                        $rows[$index][] = $studentCustomField->value ?? '';
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

                        $rows[$index][] = $std[$heading] ?? "";
                    }
                }
            }
        }

        // Create an empty collection with headings
        // return collect([$headings, $rows]);
        return collect([$rows]);
    }


    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:J1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', 'Students List');

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

    protected function updateHeadings()
    {
        if (!empty($this->customFields)) {
            $this->headings = array_merge($this->headings, collect($this->customFields)->pluck('name')->toArray());
        }
    }
}
