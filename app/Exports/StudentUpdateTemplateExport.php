<?php

namespace App\Exports;

use App\Enums\Gender;
use App\Models\Student;
use App\Repositories\IStudentRepository;
use Maatwebsite\Excel\Concerns\FromCollection;

class StudentUpdateTemplateExport implements FromCollection
{
    protected $classroomIds = [];
    protected $columns = [];


    public function __construct(array $classroomIds, array $columns, private IStudentRepository $studentRepository)
    {
        $this->classroomIds = $classroomIds;
        $this->columns = $columns;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $headings = array_unique(['student_id', 'class', 'section', ...array_keys($this->columns)]);
        $rows = [];

        if (count($this->classroomIds) > 0) {
            $students = $this->studentRepository->getByClassroomIds($this->classroomIds)->unique('student_id');

            $students->loadMissing(['classroom.className', 'promotedClassroom.className']);

            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student['classroom_id'];

                $student->loadMissing(['classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                return $student;
            });

            foreach ($students as $index => $student) {
                foreach ($headings as $heading) {
                    if ($heading == 'gender') {
                        if (!empty($student['gender'])) {
                            switch ($student['gender']) {
                                case Gender::MALE->value:
                                    $gender = 1;
                                    break;
                                case Gender::FEMALE->value:
                                    $gender = 2;
                                    break;
                                case Gender::COMMON->value:
                                    $gender = 3;
                                    break;
                                default:
                                    $gender = "";
                                    break;
                            }
                        } else {
                            $gender = "";
                        }

                        $rows[$index][] = $gender;
                    } else if ($heading == 'class') {
                        $rows[$index][] = $student?->classroom?->className?->title;
                    } else if ($heading == 'section') {
                        $rows[$index][] = $student?->classroom?->section_title;
                    } else if ($heading == 'roll_number') {
                        $rows[$index][] = $student?->classroomRoll?->roll_no;
                    } else {
                        $rows[$index][] = $student[$heading];
                    }
                }
            }
        }

        // Create an empty collection with headings
        return collect([$headings, $rows]);
    }
}
