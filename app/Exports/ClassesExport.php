<?php

namespace App\Exports;

use App\Repositories\classroomRepository;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ClassesExport implements FromCollection, WithHeadings
{
    private $classes;
    public function __construct(classroomRepository $classes)
    {
        $this->classes = $classes;
    }

    public function collection()
    {
        return $this->classes->exportExcelClasses();
    }

    public function headings(): array
    {
        return [
            "Academic Year",
            "Class Name",
            "Class Teacher",
            "Class Monitor",
            "Total Students"
        ];
    }
}
