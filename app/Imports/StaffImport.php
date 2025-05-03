<?php

namespace App\Imports;

use App\Models\User;
use App\Enums\Gender;
use App\Enums\Status;
use App\Models\Staff;
use App\Enums\UserRole;
use App\Enums\StaffRoleType;
use App\Rules\DateFormatRule;
use Illuminate\Validation\Rule;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StaffImport implements ToCollection, WithHeadingRow
{
    protected $validationErrors = [];


    /**
     * @param array $rows|object
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        // filter empty rows
        $rows = $rows->filter(function ($row) {
            return !empty(array_filter($row->toArray()));
        });

        if ($rows->count() > 0) {
            if ($rows->count() <= 500) {
                $failedEmails = [];

                foreach ($rows as $row) {
                    // Validate the row
                    $validator = Validator::make($row->toArray(), [
                        'email' => ['nullable', Rule::unique('staff', 'email')->where(function ($query) {
                            return $query->where('school_id', getUserSchoolId())
                                ->where('academic_year_id', getAcademicYearId());
                        }), 'email'],
                        'first_name' => 'required|string',
                        'gender' => 'required|in:1,2,3',
                        'role' => 'required|in:admin,teacher,staff',
                    ]);

                    // Check if validation fails for the current row
                    if ($validator->fails()) {
                        $emailErrorMessage = $validator->errors()->first('email');

                        if ($validator->errors()->has('email') && strpos($emailErrorMessage, 'taken') !== false) {
                            $failedEmails[] = $row['email'];

                            // Store validation errors
                            $this->validationErrors['staff_import_file'] = "These emails (" . implode(', ', $failedEmails) . ") have already been taken.";

                            // // Store validation errors
                            // $this->validationErrors['staff_import_file'] = "Some emails have already been taken.";
                        } else {
                            // Store validation errors
                            $this->validationErrors['staff_import_file'] = "File mandatory fields cannot not be empty and data should be in valid format.";
                        }

                        continue; // Skip processing this row and move to the next one
                    }

                    // if (!empty($row['dob'])) {
                    //     $row['dob'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['dob']));
                    // }

                    if (!empty($row['dob'])) {
                        if (!is_string($row['dob'])) {
                            $row['dob'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['dob']));
                        } else if (is_string($row['dob'])) {
                            // normalize the separators to '/' for consistent parsing
                            $normalizedDob = preg_replace('/[-.]/', '/', $row['dob']);

                            $row['dob'] =  \Carbon\Carbon::createFromFormat('d/m/Y', $normalizedDob);
                        }
                    }

                    // if (!empty($row['doj'])) {
                    //     $row['doj'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['doj']));
                    // }

                    if (!empty($row['doj'])) {
                        if (!is_string($row['doj'])) {
                            $row['doj'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['doj']));
                        } else if (is_string($row['doj'])) {
                            // normalize the separators to '/' for consistent parsing
                            $normalizedDoj = preg_replace('/[-.]/', '/', $row['doj']);

                            $row['doj'] =  \Carbon\Carbon::createFromFormat('d/m/Y', $normalizedDoj);
                        }
                    }

                    $staffRoleType = StaffRoleType::TEACHER;
                    $user = null;

                    // create staff user
                    // if (!empty($row['first_name']) && !empty($row['email'])) {
                    if (!empty($row['first_name'])) {
                        if (!empty($input['email'])) {
                            $inputEmail = $row['email'];
                        } else {
                            $inputEmail = strtolower($row['first_name'])  . rand(1000, 9999) . '@educarestudy.in';
                        }

                        // $user = User::where('email', $row['email'])->first();
                        $user = User::where('email', $inputEmail)->first();

                        if ($user == null) {
                            $randomUsername = strtolower(substr($row['first_name'], 0, 3) . rand(100, 999));
                            // $emailParts = explode('@', $row['email']);
                            $emailParts = explode('@', $inputEmail);
                            $emailUsername = strtolower($emailParts[0]);
                            $username = $randomUsername . '_' . $emailUsername;

                            $userRoleType = UserRole::SITE_TEACHER;
                            $roleId = 13;

                            if (!empty($row['role']) && $row['role'] == 'admin') {
                                $staffRoleType = StaffRoleType::ADMIN;
                                $userRoleType = UserRole::ADMIN;
                                $roleId = 2;
                                $permissions = array(
                                    0 => "view permissions",
                                    1 => "view school import",
                                    2 => "add permissions",
                                    3 => "add school import",
                                    4 => "edit permissions",
                                    5 => "edit school import",
                                    6 => "delete permissions",
                                    7 => "delete school import",
                                    8 => "view staffs",
                                    9 => "add staffs",
                                    10 => "edit staffs",
                                    11 => "delete staffs",
                                    12 => "view student",
                                    13 => "add student",
                                    14 => "edit student",
                                    15 => "delete student",
                                    16 => "view schools",
                                    17 => "add schools",
                                    18 => "edit schools",
                                    19 => "delete schools",
                                    20 => "view classes",
                                    21 => "add classes",
                                    22 => "edit classes",
                                    23 => "delete classes",
                                );
                            } else if (!empty($row['role']) && $row['role'] == 'teacher') {
                                $staffRoleType = StaffRoleType::TEACHER;
                                $userRoleType = UserRole::SITE_TEACHER;
                                $roleId = 13;
                                $permissions = array();
                            } else if (!empty($row['role']) && $row['role'] == 'staff') {
                                $staffRoleType = StaffRoleType::SITE_STAFF;
                                $userRoleType = UserRole::SITE_STAFF;
                                $roleId = 11;
                                $permissions = array();
                            }

                            $userArray = [
                                'school_id' => getUserSchoolId(),
                                'username' => $username,
                                'first_name' => $row['first_name'] ?? null,
                                'middle_name' => $row['middle_name'] ?? null,
                                'last_name' => $row['last_name'] ?? null,
                                'phone' => $row['phone'] ?? null,
                                // 'email' => $row['email'] ?? null,
                                'email' => $inputEmail,
                                'role' =>   $userRoleType,
                                'password' => Hash::make($row['mobile']),
                                'status' => Status::ACTIVE
                            ];

                            $user = $this->createUser($userArray);

                            $role = Role::find($roleId);

                            if (!empty($role)) {
                                $role->syncPermissions($permissions);

                                // assign teacher role, here teacher role id: 13
                                $user->assignRole($role->id);
                            }
                        }
                    }

                    // create staff
                    if ($user != null) {
                        if (!empty($row['gender'])) {
                            switch ($row['gender']) {
                                case 1:
                                    $gender = Gender::MALE;
                                    break;
                                case 2:
                                    $gender = Gender::FEMALE;
                                    break;
                                case 3:
                                    $gender = Gender::COMMON;
                                    break;
                                default:
                                    $gender = "";
                                    break;
                            }
                        } else {
                            $gender = "";
                        }

                        $dataArray = array(
                            'school_id' => getUserSchoolId(),
                            'user_id' => $user->id,
                            'academic_year_id' => getAcademicYearId() ?? null,
                            'department_id' => intval($row['department']) ?? null,
                            'designation_id' => intval($row['designation']) ?? null,
                            'user_roll_type' =>  $staffRoleType,
                            'first_name' => $row['first_name'] ?? "",
                            'middle_name' => $row['middle_name'] ?? "",
                            'last_name' => $row['last_name'] ?? "",
                            'phone' => $row['mobile'] ?? "",
                            'email' => $row['email'] ?? "",
                            'gender' => $gender,
                            'join_date_at' => !empty($row['doj']) ? \Carbon\Carbon::parse($row['doj'])->format('Y-m-d') : date('Y-m-d'),
                            'birth_date_at' => !empty($row['dob']) ? \Carbon\Carbon::parse($row['dob'])->format('Y-m-d') : null,
                            'pan_number' => $row['pan_card'] ?? "",
                            'qualification' => $row['qualification'] ?? "",
                            'aadhar_card_no' => $row['aadhar_card'] ?? "",
                            'address' => $row['address'] ?? "",
                            'status' => Status::ACTIVE,
                        );
                    }

                    $this->createStaff($dataArray);
                }
            } else {
                $this->validationErrors['staff_import_file'] = "Only 500 records are accepted in the list at a time.";
            }
        } else {
            $this->validationErrors['staff_import_file'] = "File cannot be empty.";
        }

        if (!empty($this->validationErrors)) {
            return $this->validationErrors;
        }
    }


    /**
     * Get the validation errors encountered during import.
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }


    /*
    *   create user
    */
    private function createUser(array $data)
    {
        return User::create($data);
    }

    /*
    *   create student
    */
    private function createStaff(array $data)
    {
        return Staff::create($data);
    }
}
