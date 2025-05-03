<?php

namespace App\Exports;

use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class SurveyResponseReportExport implements FromCollection, WithEvents
{
    protected $surveyResponseReport = [];
    protected $surveyTitle = "";
    protected $headings = [
        'sr_no' => 'sr_no',
        'participant' => 'participant',
        'response_date' => 'response_date'
    ];


    public function __construct(array $surveyResponseReport, string $surveyTitle)
    {
        $this->surveyResponseReport = $surveyResponseReport;
        $this->surveyTitle = $surveyTitle;

        $this->updateHeadings();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $srNo = 0;

        if (!empty($this->surveyResponseReport['responses'])) {
            foreach ($this->surveyResponseReport['responses'] as $index => $response) {
                $srNo++;

                foreach (array_keys($this->headings) as $headingKey) {
                    if ($headingKey == 'sr_no') {
                        $rows[$index][] = $srNo;
                    } else if ($headingKey == 'participant' || $headingKey == 'response_date') {
                        $rows[$index][] = $response[$headingKey] ?? "";
                    } else {
                        $rows[$index][] = $response['answer'][$headingKey] ?? "";
                    }
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
                $event->sheet->mergeCells('A1:K1');

                // Set heading for merged cells
                $event->sheet->setCellValue('A1', "Survey Title - {$this->surveyTitle}");

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
                $event->sheet->mergeCells('A2:K2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', "Survey Response");

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
            },
            BeforeSheet::class => function (BeforeSheet $event) {
                // Insert a new row at the second position
                $event->sheet->insertNewRowBefore(3);

                foreach (array_values($this->headings) as $index => $heading) {
                    $event->sheet->setCellValueByColumnAndRow($index + 1, 3, $heading);
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
        if (!empty($this->surveyResponseReport['questions'])) {
            $questionTitles = $this->surveyResponseReport['questions'];

            $this->headings = array_slice($this->headings, 0, 2) +
                $questionTitles +
                array_slice($this->headings, 2);
        }
    }
}
