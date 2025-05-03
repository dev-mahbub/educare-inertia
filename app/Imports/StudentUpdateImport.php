<?php

namespace App\Imports;

use App\Enums\Gender;
use App\Enums\Status;
use App\Enums\UserRole;
use App\Enums\CategoryType;
use Illuminate\Support\Str;
use App\Enums\StudentStatus;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Collection;
use App\Repositories\BankRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use App\Repositories\HouseRepository;
use App\Repositories\StudentRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ClassroomRepository;
use Illuminate\Support\Facades\Validator;
use App\Repositories\BankAccountRepository;
use App\Repositories\StudentHouseRepository;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Repositories\ClassroomRollRepository;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentUpdateImport implements ToCollection, WithHeadingRow
{
    protected $validationErrors = [];
    private $studentRepository;
    private $userRepository;
    private $categoryRepository;
    private $classroomRollRepository;
    private $studentHouseRepository;
    private $bankAccountRepository;
    private $bankRepository;
    private $guardianRepository;
    private $houseRepository;
    private $classroomRepository;


    public function __construct()
    {
        $this->studentRepository = new StudentRepository;
        $this->userRepository = new UserRepository;
        $this->categoryRepository = new CategoryRepository;
        $this->classroomRollRepository = new ClassroomRollRepository;
        $this->studentHouseRepository = new StudentHouseRepository;
        $this->bankAccountRepository = new BankAccountRepository;
        $this->bankRepository = new BankRepository;
        $this->guardianRepository = new GuardianRepository;
        $this->classroomRepository = new ClassroomRepository;
        $this->houseRepository = new HouseRepository;
    }


    /**
     * @param array|object $rows
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
            foreach ($rows as $row) {
                // Validate the row
                $validator = Validator::make($row->toArray(), [
                    'student_id' => 'required|integer',
                    'class' => 'required',
                    'section' => 'required',
                    'status' => 'nullable|in:0,1',
                    'gender' => 'nullable|in:1,2,3',
                    'student_type' => 'nullable|in:1,2',
                ]);

                // Check if validation fails for the current row
                if ($validator->fails()) {
                    // Store validation errors
                    $this->validationErrors['student_import_file'] = "File mandatory fields cannot not be empty and data should be in valid format.";
                    continue; // Skip processing this row and move to the next one
                }

                $student = null;

                if (!empty($row['student_id'])) {
                    $student = $this->studentRepository->getStudentById($row['student_id']);
                }

                if ($student != null) {
                    // if (!empty($row['dob']) && !is_string($row['dob'])) {
                    //     $row['dob'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['dob']));
                    // }
                    // if (!empty($row['dob']) && !is_string($row['doa'])) {
                    //     $row['doa'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['doa']));
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

                    if (!empty($row['doa']) && !is_string($row['doa'])) {
                        if (!is_string($row['doa'])) {
                            $row['doa'] = \Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['doa']));
                        } else if (is_string($row['doa'])) {
                            // normalize the separators to '/' for consistent parsing
                            $normalizedDoa = preg_replace('/[-.]/', '/', $row['doa']);

                            $row['doa'] =  \Carbon\Carbon::createFromFormat('d/m/Y', $normalizedDoa);
                        }
                    }

                    // $academicYearId = $this->classroomRepository->getSessionIdFromClassId($row['section']);

                    // if (!empty($row['status'])) {
                    //     $studentStatus = $row['status'] == 0 ? StudentStatus::NEW : StudentStatus::PROMOTED;
                    // } else {
                    //     $studentStatus = "New";
                    // }

                    // if (!empty($row['student_type'])) {
                    //     $boardingType = $row['student_type'] == 1 ? ScholarBoardingType::SCHOLAR : ScholarBoardingType::BOARDING;
                    // } else {
                    //     $boardingType = ScholarBoardingType::SCHOLAR;
                    // }

                    $classNameTitle = $row['class'] ?? "";
                    $sectionTitle = $row['section'] ?? "";
                    $classroomTitle = "{$classNameTitle} {$sectionTitle}";

                    $classroom = $this->classroomRepository->getClassroomByTitle($classroomTitle);

                    $academicYearId = !empty($classroom?->academic_year_id) ? $classroom?->academic_year_id : getAcademicYearId();

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

                    $studentData = array(
                        // 'classroom_id' => !empty($classroom) ? $classroom->id : null,
                        // 'class_name_id' => !empty($classroom) ? $classroom->class_name_id : null;,
                        'employment_cat_id' => !empty($row['employment_category']) ? intval($row['employment_category']) : null,
                        'admission_no' => $row['admission_no'] ?? null,
                        'first_name' => $row['student_first_name'] ?? '',
                        'middle_name' => $row['student_middle_name'] ?? '',
                        'last_name' => $row['student_last_name'] ?? '',
                        // 'boarding_type' => $boardingType,
                        'gender' => $gender,
                        'aadhar_card_no' => $row['aadhar_card_no'] ?? '',
                        'blood_group' => $row['blood_group'] ?? '',
                        'religion' => $row['religion'] ?? '',
                        'child_id' => $row['child_id'] ?? '',
                        'samagra_id' => $row['samagra_id'] ?? '',
                        'caste' => $row['caste'] ?? '',
                        'admission_class' => $row['admission_class'] ?? '',
                        'mother_tongue' => $row['mother_tongue'] ?? '',
                        'birth_date_at' => !empty($row['dob']) ? \Carbon\Carbon::parse($row['dob'])->format('Y-m-d') : null,
                        'admission_date_at' => !empty($row['doa']) ? \Carbon\Carbon::parse($row['doa'])->format('Y-m-d') : date('Y-m-d'),
                        'height' => $row['student_height'] ?? '0.00',
                        'weight' => $row['student_weight'] ?? '0.00',
                        'present_address' => $row['address'] ?? '',
                        // 'student_status' => $studentStatus,
                    );

                    $this->studentRepository->update($student->id, $studentData);

                    // student roll
                    if (!empty($row['roll_number']) && !empty($classroom)) {
                        $checkArray = array(
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => $academicYearId,
                            'classroom_id' => $classroom->id,
                            'student_id' => $student['id'],
                        );

                        $dataArray = array(
                            'roll_no' => $row['roll_number'],
                            'status' => Status::ACTIVE,
                        );

                        $this->classroomRollRepository->updateOrCreate($dataArray, $checkArray);
                    }

                    // student category
                    if (!empty($row['category'])) {
                        $category = $this->categoryRepository->getByTypeAndTitle(CategoryType::CASTE->value, $row['category']);

                        if ($category != null) {
                            $checkArray = array(
                                'school_id'  => getUserSchoolId(),
                                'student_id' => $student['id'],
                            );

                            $dataArray = array(
                                'category_id' => $category?->id
                            );

                            $this->categoryRepository->updateOrCreateStudentCategory($checkArray, $dataArray);
                        }
                    }

                    // student house
                    if (!empty($row['house'])) {
                        $house = $this->houseRepository->getByName($row['house']);

                        if (!empty($house)) {
                            $checkArray = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => $academicYearId,
                                'student_id' => $student['id'],
                            );

                            $dataArray = array(
                                'house_id' => $house->id,
                                'status' => Status::ACTIVE
                            );

                            $this->studentHouseRepository->updateOrCreate($checkArray, $dataArray);
                        }
                    }

                    // student bank
                    $bankId = null;

                    if (!empty($row['bank'])) {
                        $bank = $this->bankRepository->getBankByName($row['bank']);
                        $bankId = !empty($bank) ? $bank->id : null;
                    }

                    $checkArray = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'],
                    );

                    $dataArray = array(
                        'bank_id' => $bankId,
                        'account_no' => $row['account_number'] ?? '',
                        'ifsc_code' => $row['ifsc'] ?? '',
                        'micr_no' => $row['micr'] ?? '',
                        'branch_name' => $row['branch_name'] ?? '',
                        'status' => Status::ACTIVE
                    );

                    $this->bankAccountRepository->updateOrCreate($checkArray, $dataArray);

                    // create user for father
                    $fatherUser = null;

                    if (!empty($row['father_first_name']) && !empty($row['father_email'])) {
                        $father = $this->guardianRepository->getFatherByStudentId($student['id']);

                        if ($father != null) {
                            $fatherUser = $this->userRepository->getFatherUserById($father->user_id);
                        }

                        $randomUsername = strtolower(substr($row['father_first_name'], 0, 3) . rand(100, 999));
                        $emailParts = explode('@', $row['father_email']);
                        $emailUsername = strtolower($emailParts[0]);
                        $username = $randomUsername . '_' . $emailUsername;

                        if (!empty($fatherUser)) {
                            $userArray = [
                                'username' => $username,
                                'first_name' => $row['father_first_name'] ?? null,
                                'middle_name' =>  $row['father_middle_name'] ?? null,
                                'last_name' => $row['father_last_name'] ?? null,
                                'phone' => $row['father_phone'] ?? null,
                                'email' => $row['father_email'] ?? null,
                            ];

                            // $user = $this->userRepository->updateOrCreate(['id' => $fatherUser->id], $userArray);
                            $this->userRepository->update($fatherUser->id, $userArray);
                        } else {
                            $userArray = [
                                'school_id' => getUserSchoolId(),
                                'username' => $username,
                                'first_name' => $row['father_first_name'] ?? null,
                                'middle_name' =>  $row['father_middle_name'] ?? null,
                                'last_name' => $row['father_last_name'] ?? null,
                                'phone' => $row['father_phone'] ?? null,
                                'email' => $row['father_email'] ?? null,
                                'role' => UserRole::SITE_PARENT,
                                'password' => Hash::make(Str::random(10)),
                                'status' => Status::ACTIVE
                            ];

                            $fatherUser = $this->userRepository->create($userArray);
                        }
                    }

                    // father
                    if (!empty($fatherUser)) {
                        $checkArray = array(
                            'school_id'  => getUserSchoolId(),
                            'user_id' => $fatherUser->id ?? null,
                            'student_id' => $student['id'] ?? '',
                        );

                        $dataArray = array(
                            'guardian_type' => 'Father',
                            'first_name' => $row['father_first_name'] ?? '',
                            'middle_name' => $row['father_middle_name'] ?? '',
                            'last_name' => $row['father_last_name'] ?? '',
                            'relation' => null,
                            'phone' => $row['father_phone'] ?? '',
                            'email' => $row['father_email'] ?? '',
                            'sms_phone' => $row['sms_no'] ?? '',
                            'highest_qualification' => $row['primary_qualification'] ?? '',
                            'occupation' => $row['father_occupation'] ?? '',
                            'designation' => $row['father_designation'] ?? '',
                            'aadhar_card_no' => $row['father_aadhar'] ?? '',
                            'company_name' => $row['father_company'] ?? '',
                            'is_inactive' => 0,
                            'status' => Status::ACTIVE
                        );

                        $this->guardianRepository->updateOrCreate($checkArray, $dataArray);
                    }

                    // mother
                    $checkArray = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'],
                    );

                    $dataArray = array(
                        'guardian_type' => 'Mother',
                        'first_name' => $row['mother_first_name'] ?? '',
                        'middle_name' => $row['mother_middle_name'] ?? '',
                        'last_name' => $row['mother_last_name'] ?? '',
                        'relation' => null,
                        'aadhar_card_no' => $row['mother_aadhar'] ?? '',
                        'is_inactive' => 0,
                        'status' => Status::ACTIVE
                    );

                    $this->guardianRepository->updateOrCreate($checkArray, $dataArray);

                    // guardian
                    $checkArray = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'],
                    );

                    $dataArray = array(
                        'guardian_type' => 'Guardian',
                        'first_name' => $row['guardian_name'] ?? '',
                        'relation' => $row['guardian_relation'],
                        'phone' => $row['guardian_contact_no'] ?? '',
                        'highest_qualification' => $row['guardian_qualification'] ?? '',
                        'occupation' => $row['guardian_occupation'] ?? '',
                        'department' => $row['guardian_department'] ?? '',
                        'designation' => $row['guardian_designation'] ?? '',
                        'office_address' => $row['guardian_office_address'] ?? '',
                        'is_inactive' => 0,
                        'status' => Status::ACTIVE
                    );

                    $this->guardianRepository->updateOrCreate($checkArray, $dataArray);
                }
            }
        } else {
            $this->validationErrors['student_import_file'] = "File cannot be empty.";
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
}
