<?php

namespace App\Exports;

use App\Repositories\IUserRepository;
use App\Repositories\IStudentRepository;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use App\Repositories\ITransportRepository;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentDetailsExport implements FromCollection, WithEvents
{
    protected $academicYearId;
    protected $status;
    protected $orderBy;
    protected $schoolTitle;
    protected $academicYearTitle;
    protected $classroomTitles;
    protected $totalStudent = 0;
    protected $classroomIds = [];
    protected $attributes = [];
    protected $students = [];

    protected $headings = [
        'sr_no'
    ];


    public function __construct(
        private IStudentRepository $studentRepository,
        private IUserRepository $userRepository,
        private ITransportRepository $transportRepository,
        int $academicYearId,
        array $classroomIds,
        array $attributes,
        string $status = "",
        string $orderBy = "",
        string $classroomTitles = "",
        string $schoolTitle = "",
        string $academicYearTitle = ""
    ) {
        $this->classroomIds = $classroomIds;
        $this->attributes = $attributes;
        $this->academicYearId = $academicYearId;
        $this->status = $status;
        $this->orderBy = $orderBy;
        $this->classroomTitles = $classroomTitles;
        $this->schoolTitle = $schoolTitle;
        $this->academicYearTitle = $academicYearTitle;

        $this->updateHeadings();

        $this->getStudents();
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];
        $srNo = 0;

        if (!empty($this->students)) {
            foreach ($this->students as $index => $student) {
                $srNo++;

                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$index][] = $srNo;
                    } else if ($heading == 'status') {
                        $rows[$index][] = !empty($student[$heading]) ? $student[$heading]?->value : "";
                    } else {
                        $rows[$index][] = $student[$heading] ?? "";
                    }
                }
            }
        }

        // Create collection with headings
        return collect([$rows]);
    }


    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // first heading row
                // Merge cells for the heading
                $event->sheet->mergeCells('A1:J1');

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
                $event->sheet->mergeCells('A2:J2');

                // Set heading for merged cells
                $event->sheet->setCellValue('A2', "Student Report ($this->academicYearTitle)");

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
                $event->sheet->mergeCells('A3:J3');

                // Set heading for merged cells
                $event->sheet->setCellValue('A3', "Class-$this->classroomTitles" . ", Total Student-$this->totalStudent");

                // Optionally, you can format the heading cell
                $event->sheet->getStyle('A3')->applyFromArray([
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


    /*
    * helper method to update headings
    */
    protected function updateHeadings()
    {
        array_push($this->headings, ...array_unique([...$this->attributes]));
    }


    /*
    * helper method to get students
    */
    protected function getStudents()
    {
        $students = [];

        if (count($this->classroomIds) > 0 && !empty($this->academicYearId)) {
            $students = $this->studentRepository->getByClassroomIdsAndAcademicYearIdAndStatus($this->classroomIds, $this->academicYearId, $this->status)->unique('student_id');

            if (count($students) > 0) {
                $loginCredential = $this->userRepository->getLoginCredential();

                $students->loadMissing([
                    'classroom.className',
                    'promotedClassroom.className',
                    'employment_category',
                    'studentTransferCertificate',
                    'classroomRoll' => function ($query) {
                        $query->where('academic_year_id', $this->academicYearId);
                    }
                ]);

                $students = $students->map(function ($student) use ($loginCredential) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    // transport
                    $transportDetails = $this->transportRepository->getCurrentAllocateTransportByStudentIdAndClassroomId($student->id, $student->classroom_id);

                    if (!empty($transportDetails)) {
                        $transportDetails->load(['transportRoute']);

                        $student['route'] = $transportDetails?->transportRoute?->name;
                    }

                    $student['class'] = $student?->classroom?->className?->title;
                    $student['section'] = $student?->classroom?->section_title;
                    $student['roll_number'] = $student?->classroomRoll?->roll_no;
                    $student['employment_category'] = $student?->employment_category?->title;
                    $student['tc_number'] = $student?->studentTransferCertificate?->certificate_no;

                    $password = "";

                    if ($loginCredential != null) {
                        switch ($loginCredential->password) {
                            case "admission_no":
                                $password = $student->admission_no;
                                break;
                            case "birth_date":
                                $password = $student->date_of_birth;
                                break;
                            case "student_name":
                                $password = $student->student_name;
                                break;
                            case "parent_name":
                                $password = $student->father_name;
                                break;
                            case "father_mobile":
                                $password = $student->father_phone;
                                break;
                            default:
                                $password = "";
                                break;
                        }
                    }

                    $student['password'] = $password;

                    return $student;
                });

                if (!empty($this->orderBy)) {
                    $students = $students->sortBy($this->orderBy);
                }
            }
        }

        $this->totalStudent = count($students);
        $this->students = $students;
    }
}
