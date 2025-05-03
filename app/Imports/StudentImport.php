<?php

namespace App\Imports;

use App\Models\User;
use App\Enums\Gender;
use App\Enums\Status;
use App\Enums\UserRole;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\Classroom;
use App\Enums\CategoryType;
use App\Enums\GuardianType;
use App\Models\BankAccount;
use Illuminate\Support\Str;
use App\Enums\StudentStatus;
use App\Models\StudentHouse;
use App\Models\ClassroomRoll;
use App\Rules\DateFormatRule;
use App\Models\StudentCategory;
use Illuminate\Validation\Rule;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Repositories\BankRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Repositories\HouseRepository;
use App\Repositories\StudentRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ClassroomRepository;
use Illuminate\Support\Facades\Validator;
use App\Repositories\BankAccountRepository;
use App\Repositories\FeeStructureRepository;
use App\Repositories\StudentHouseRepository;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Repositories\ClassroomRollRepository;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use App\Repositories\ClassFeeStudentAmountRepository;

class StudentImport implements ToCollection, WithHeadingRow
{
    protected $validationErrors = [];
    private $studentRepository;
    private $feeStructureRepository;
    private $classFeeStudentAmountRepository;
    private $userRepository;
    private $categoryRepository;
    private $classroomRollRepository;
    private $studentHouseRepository;
    private $bankAccountRepository;
    private $bankRepository;
    private $guardianRepository;
    private $classroomRepository;
    private $houseRepository;


    public function __construct()
    {
        $this->studentRepository = new StudentRepository;
        $this->feeStructureRepository = new FeeStructureRepository;
        $this->classFeeStudentAmountRepository = new ClassFeeStudentAmountRepository;
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
            if ($rows->count() <= 500) {
                $failedEmails = [];
                $failedAdmissionNo = [];
                $failedStudents = [];

                foreach ($rows as $row) {
                    // Validate the row
                    $validator = Validator::make($row->toArray(), [
                        'admission_no' => ['nullable', Rule::unique('students', 'admission_no')->where(function ($query) {
                            return $query->where('school_id', getUserSchoolId());
                            // ->where('academic_year_id', getAcademicYearId());
                        })],
                        // 'email' => ['required', Rule::unique('students', 'email')->where(function ($query) {
                        //     return $query->where('school_id', getUserSchoolId());
                        //     // ->where('academic_year_id', getAcademicYearId());
                        // }), 'email'],
                        'class' => 'required',
                        'section' => 'required',
                        'student_first_name' => 'required',
                        'father_first_name' => 'required',
                        'father_phone' => 'required',
                        'status' => 'nullable|in:0,1',
                        'gender' => 'nullable|in:1,2,3',
                        'student_type' => 'nullable|in:1,2',
                    ]);

                    // Check if validation fails for the current row
                    if ($validator->fails()) {
                        $emailErrorMessage = $validator->errors()->first('email');
                        $admissionNoErrorMessage = $validator->errors()->first('admission_no');

                        if ($validator->errors()->has('email') && strpos($emailErrorMessage, 'taken') !== false) {
                            $failedEmails[] = $row['email'];

                            // Store validation errors
                            $this->validationErrors['student_import_file'] = "These emails (" . implode(', ', $failedEmails) . ") have already been taken.";
                        } else if ($validator->errors()->has('admission_no') && strpos($admissionNoErrorMessage, 'taken') !== false) {
                            // Store validation errors
                            $failedAdmissionNo[] = $row['admission_no'];

                            // Store validation errors
                            $this->validationErrors['student_import_file'] = "These admission no (" . implode(', ', $failedAdmissionNo) . ") have already been taken.";

                            // $this->validationErrors['student_import_file'] = "Some admission no have already been taken.";
                        } else {
                            // Store validation errors
                            $this->validationErrors['student_import_file'] = "File mandatory fields cannot not be empty and data should be in valid format.";
                        }

                        continue; // Skip processing this row and move to the next one
                    }

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

                    $classNameTitle = $row['class'] ?? "";
                    $sectionTitle = $row['section'] ?? "";
                    $classroomTitle = "{$classNameTitle} {$sectionTitle}";

                    $classroom = $this->classroomRepository->getClassroomByTitle($classroomTitle);

                    // $classNameId = $this->classroomRepository->getClassNameIdFromClassId($row['section']);
                    // $academicYearId = $this->classroomRepository->getSessionIdFromClassId($row['section']);

                    $classNameId = $classroom?->class_name_id ?? null;
                    $academicYearId = !empty($classroom) ? $classroom->academic_year_id : getAcademicYearId();
                    $studentEmail = !empty($row['email']) ? trim($row['email']) : '';

                    if (!empty($row['student_first_name'])) {
                        $username = strtolower($row['student_first_name']) . rand(1000, 9999);

                        if (empty($row['email'])) {
                            $username = strtolower($row['student_first_name']) . rand(1000, 9999);
                            $row['email'] = $username . '@educarestudy.in';
                        }

                        $studentUser = $this->userRepository->getUserByEmail($row['email']);

                        if ($studentUser == null) {
                            // $randomUsername = strtolower(substr(trim($row['student_first_name']), 0, 3) . rand(100, 999));
                            // $emailParts = explode('@', $row['email']);
                            // $emailUsername = strtolower($emailParts[0]);
                            // $username = $randomUsername . '_' . $emailUsername;

                            $userArray = [
                                'school_id' => getUserSchoolId(),
                                'username' => $username,
                                'first_name' => trim($row['student_first_name']) ?? null,
                                'middle_name' =>  trim($row['student_middle_name']) ?? null,
                                'last_name' => trim($row['student_last_name']) ?? null,
                                'email' => trim($row['email']) ?? null,
                                'role' => UserRole::SITE_STUDENT,
                                'password' => Hash::make(trim($row['student_first_name'])),
                                'status' => Status::ACTIVE
                            ];

                            $studentUser = $this->userRepository->create($userArray);
                            // assign student role, here student role id: 15
                            $studentUser->assignRole(15);
                        }
                    }

                    if (!empty($row['status'])) {
                        $studentStatus = $row['status'] == 0 ? StudentStatus::NEW : StudentStatus::PROMOTED;
                    } else {
                        $studentStatus = "New";
                    }

                    if (!empty($row['student_type'])) {
                        $boardingType = $row['student_type'] == 1 ? ScholarBoardingType::SCHOLAR : ScholarBoardingType::BOARDING;
                    } else {
                        $boardingType = ScholarBoardingType::SCHOLAR;
                    }

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

                    if (!empty($row['admission_no'])) {
                        $setting = getSchoolSetting();
                        $admission_no =  $setting?->admission_prefix . trim($row['admission_no']);
                    } else {
                        $admission_no = $this->studentRepository->getNextAdmissionNo();
                    }

                    $studentExists = $this->studentRepository->checkStudentExists($admission_no, trim($row['student_first_name']), trim($row['father_first_name']), $row['father_phone']);

                    if ($studentExists) {
                        $failedStudents[] = trim($row['student_first_name']) . "({$admission_no})";

                        $this->validationErrors['student_import_file'] = "These below students already exists: " . implode(', ', $failedStudents);

                        continue;
                    }

                    $studentData = array(
                        'user_id' => $studentUser->id ?? null,
                        'school_id' => getUserSchoolId(),
                        'classroom_id' => !empty($classroom) ? $classroom->id : null,
                        'academic_year_id' => $academicYearId ?? null,
                        'class_name_id' => $classNameId,
                        'employment_cat_id' => !empty($row['employment_category']) ? intval($row['employment_category']) : null,
                        'admission_no' => $admission_no,
                        'first_name' => trim($row['student_first_name']) ?? '',
                        'middle_name' => trim($row['student_middle_name']) ?? '',
                        'last_name' => trim($row['student_last_name']) ?? '',
                        // 'email' => trim($row['email']) ?? '',
                        'email' => $studentEmail,
                        'boarding_type' => $boardingType,
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
                        'student_status' => $studentStatus,
                    );

                    $student = $this->studentRepository->create($studentData);

                    if (!empty($student['id'])) {
                        if (!empty($classroom)) {
                            $studentClassroomData = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => $academicYearId ?? null,
                                'class_name_id' => $classNameId,
                                'classroom_id' => $classroom?->id,
                                'student_id' => $student['id'],
                                'academic_year_id_from' => null,
                                'classroom_id_from' => null,
                                'promoted_date_at' => null,
                                'user_id' => Auth::user()->id,
                                'status' => Status::ACTIVE->value,
                            );

                            $this->studentRepository->createClassroomStudent($studentClassroomData);
                        }

                        // studen roll
                        if (!empty($row['roll_number']) && !empty($classroom)) {
                            $checkArray = array(
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => $academicYearId ?? null,
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
                                $studentCategory = array(
                                    'school_id'  => getUserSchoolId(),
                                    'student_id' => $student['id'] ?? null,
                                    'category_id' => $category?->id
                                );

                                $this->categoryRepository->createStudentCategory($studentCategory);
                            }
                        }

                        // student house
                        if (!empty($row['house'])) {
                            $house = $this->houseRepository->getByName($row['house']);

                            if (!empty($house)) {
                                $houseData = array(
                                    'school_id' => getUserSchoolId(),
                                    'academic_year_id' => getAcademicYearId(),
                                    'student_id' => $student['id'] ?? null,
                                    'house_id' =>  $house->id,
                                    'status' => Status::ACTIVE
                                );

                                $this->studentHouseRepository->create($houseData);
                            }
                        }

                        // student bank
                        $bankId = null;

                        if (!empty($row['bank'])) {
                            $bank = $this->bankRepository->getBankByName($row['bank']);
                            $bankId = !empty($bank) ? $bank->id : null;
                        }

                        $bankAccountData = array(
                            'school_id'  => getUserSchoolId(),
                            'student_id' => $student['id'] ?? '',
                            'bank_id' =>  $bankId,
                            'account_no' => $row['account_number'] ?? '',
                            'ifsc_code' => $row['ifsc'] ?? '',
                            'micr_no' => $row['micr'] ?? '',
                            'branch_name' => $row['branch_name'] ?? '',
                            'status' => Status::ACTIVE
                        );

                        $this->bankAccountRepository->create($bankAccountData);

                        // create user for father
                        $user = null;

                        $fatherEmail = !empty($row['father_email']) ? trim($row['father_email']) : '';

                        // if (!empty($row['father_first_name']) && !empty($row['father_email'])) {
                        if (!empty($row['father_first_name'])) {
                            if (empty($row['father_email'])) {
                                $row['father_email'] = $row['father_first_name'] . '_' . Str::random(10) . rand(100, 999) . '@educarestudy.com';
                            }

                            $father = $this->userRepository->getFatherByEmail($row['father_email']);

                            $randomUsername = strtolower(substr($row['father_first_name'], 0, 3) . rand(100, 999));
                            $emailParts = explode('@', $row['father_email']);
                            $emailUsername = strtolower($emailParts[0]);
                            $username = $randomUsername . '_' . $emailUsername;
                            $userArray = [
                                'school_id' => getUserSchoolId(),
                                'username' => $username,
                                'first_name' => trim($row['father_first_name']) ?? null,
                                'middle_name' =>  trim($row['father_middle_name']) ?? null,
                                'last_name' => trim($row['father_last_name']) ?? null,
                                'phone' => $row['father_phone'] ?? null,
                                'email' => trim($row['father_email']) ?? null,
                                'role' => UserRole::SITE_PARENT,
                                'password' => Hash::make(Str::random(10)),
                                'status' => Status::ACTIVE
                            ];

                            if (!empty($father)) {
                                $user = $this->userRepository->updateOrCreate(['id' => $father->id], $userArray);
                            } else {
                                $user = $this->userRepository->create($userArray);
                            }
                        }

                        // father
                        if (!empty($user) && !empty($row['father_first_name'])) {
                            $fatherData = array(
                                'school_id'  => getUserSchoolId(),
                                'user_id' => $user->id ?? null,
                                'student_id' => $student['id'] ?? '',
                                'guardian_type' => 'Father',
                                'first_name' => trim($row['father_first_name']) ?? '',
                                'middle_name' => trim($row['father_middle_name']) ?? '',
                                'last_name' => trim($row['father_last_name']) ?? '',
                                'relation' => null,
                                'phone' => $row['father_phone'] ?? '',
                                // 'email' => trim($row['father_email']) ?? '',
                                'email' => $fatherEmail,
                                'sms_phone' => $row['sms_no'] ?? '',
                                'highest_qualification' => $row['primary_qualification'] ?? '',
                                'occupation' => $row['father_occupation'] ?? '',
                                'designation' => $row['father_designation'] ?? '',
                                'aadhar_card_no' => $row['father_aadhar'] ?? '',
                                'company_name' => $row['father_company'] ?? '',
                                'is_inactive' => 0,
                                'status' => Status::ACTIVE
                            );

                            $this->guardianRepository->create($fatherData);
                        }

                        // mother
                        if (!empty($row['mother_first_name'])) {
                            $motherData = array(
                                'school_id'  => getUserSchoolId(),
                                'student_id' => $student['id'] ?? '',
                                'guardian_type' => 'Mother',
                                'first_name' => trim($row['mother_first_name']) ?? '',
                                'middle_name' => trim($row['mother_middle_name']) ?? '',
                                'last_name' => trim($row['mother_last_name']) ?? '',
                                'relation' => null,
                                'aadhar_card_no' => $row['mother_aadhar'] ?? '',
                                'is_inactive' => 0,
                                'status' => Status::ACTIVE
                            );

                            $this->guardianRepository->create($motherData);
                        }

                        // guardian
                        if (!empty($row['guardian_name'])) {
                            $guardianData = array(
                                'school_id'  => getUserSchoolId(),
                                'student_id' => $student['id'] ?? '',
                                'guardian_type' => 'Guardian',
                                'first_name' => trim($row['guardian_name']) ?? '',
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

                            $this->guardianRepository->create($guardianData);
                        }

                        $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

                        if ($isFeeStructureWithTemplate === "No" && !empty($classNameId)) {
                            $this->assignFeeToNewStudent($student['id'], $classNameId);
                        }
                    }
                }
            } else {
                $this->validationErrors['student_import_file'] = "Only 500 records are accepted in the list at a time.";
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

    /*
    *  assign fee to new student
    */
    protected function assignFeeToNewStudent($studentId, $classNameId)
    {
        $student = $this->studentRepository->getByStudentId($studentId);

        if ($student != null) {
            $feeStructure = $this->feeStructureRepository->getByClassNameId($classNameId);

            DB::transaction(function () use ($feeStructure, $student) {
                if ($feeStructure != null && $feeStructure->class_fee_structure_amounts->count() > 0) {
                    if ($feeStructure->structure_type == $student->boarding_type) {
                        foreach ($feeStructure->class_fee_structure_amounts as $structureData) {
                            if (
                                ($student->student_status == $structureData->student_status ||
                                    in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) &&
                                    in_array($structureData->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])
                                ) &&
                                (
                                    $student->student_status == StudentStatus::NEW->value ||
                                    in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $structureData['is_admission_installment'] == false
                                )
                            ) {
                                $dataArray = array(
                                    'school_id' => getUserSchoolId(),
                                    'academic_year_id' => getAcademicYearId(),
                                    'student_id' => $student->id,
                                    'class_name_id' => $student->class_name_id,
                                    'class_fee_structure_id' => $feeStructure->id,
                                    'fee_id' => $structureData['fee_id'],
                                    'fee_type_id' => $structureData['fee_type_id'],
                                    'amount' => !empty($structureData['amount']) ? $structureData['amount'] : 0,
                                    'semester' => !empty($structureData['semester']) ? $structureData['semester'] : null,
                                    'is_admission_installment' => !empty($structureData['is_admission_installment']) ? $structureData['is_admission_installment'] : 0,
                                    'is_fee_special' => !empty($structureData['is_special']) ? $structureData['is_special'] : 0,
                                    'status' => Status::ACTIVE,
                                );

                                $this->classFeeStudentAmountRepository->create($dataArray);
                            }
                        }
                    }
                }
            });
        }
    }
}
