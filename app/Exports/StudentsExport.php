<?php

namespace App\Exports;

use App\Repositories\StudentRepository;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentsExport implements FromCollection
{
    private $students;
    public function __construct(StudentRepository $students)
    {
        $this->students = $students;
    }

    public function collection()
    {
        return $this->students->getActiveAll();
    }
}