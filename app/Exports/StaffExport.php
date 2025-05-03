<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class StaffExport implements FromCollection, WithHeadings
{
    protected $staffs = [];
    protected $customFields = [];

    protected $headings = [
        'sr_no',
        'exam_id',
        'staff_name',
        'staff_type',
        'department',
        'designation',
        'role',
        'father_name',
        'spouse_name',
        'address',
        'city',
        'phone',
        'email',
        'house',
        'job_type',
        'join_date_at',
        'leave_date_at',
        'birth_date_at',
        'blood_group',
        'religion',
        'pan_number',
        'qualification',
    ];

    public function headings(): array
    {
        return $this->headings;
    }

    public function __construct(array|object $staffs, array $customFields)
    {
        $this->staffs = $staffs;
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

        if (!empty($this->staffs)) {
            foreach ($this->staffs as $index => $staff) {
                $count++;
                foreach ($this->headings as $heading) {
                    if ($heading == 'sr_no') {
                        $rows[$index][] = $count;
                    } else if ($heading == 'exam_id') {
                        $rows[$index][] = $staff?->employee_id;
                    } else if ($heading == 'staff_name') {
                        $rows[$index][] = $staff?->first_name . ' ' . $staff?->middle_name . ' ' . $staff?->last_name;
                    } else if ($heading == 'staff_type') {
                        $rows[$index][] = $staff?->staff_type;
                    } else if ($heading == 'department') {
                        $rows[$index][] = $staff?->department?->name;
                    } else if ($heading == 'designation') {
                        $rows[$index][] = $staff?->designation?->name;
                    } else if ($heading == 'role') {
                        $rows[$index][] = $staff?->user_roll_type;
                    } else if ($heading == 'phone') {
                        $rows[$index][] = $staff?->phone;
                    } else if ($heading == 'blood_group') {
                        $rows[$index][] = $staff?->bloodGroup?->name;
                    } else if ($heading == 'religion') {
                        $rows[$index][] = $staff?->religion?->name;
                    } else if ($heading == 'house') {
                        $rows[$index][] = $staff?->house?->name;
                    } else {
                        if (!empty($this->customFields) && count($staff->staffCustomFields) > 0) {
                            $found = false;

                            foreach ($this->customFields as $customField) {
                                foreach ($staff->staffCustomFields as $staffCustomField) {
                                    if ($staffCustomField?->custom_field_id == $customField['id'] && $heading == $customField['name']) {
                                        $rows[$index][] = $staffCustomField->value ?? '';
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

                        $rows[$index][] = $staff[$heading] ?? "";
                    }
                }
            }
        }

        return collect([$rows]);
    }

    protected function updateHeadings()
    {
        if (!empty($this->customFields)) {
            $this->headings = array_merge($this->headings, collect($this->customFields)->pluck('name')->toArray());
        }
    }
}
