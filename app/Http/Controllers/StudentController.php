<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use Carbon\Carbon;
use PSpell\Config;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use App\Models\House;
use Inertia\Response;
use App\Models\School;
use App\Enums\UserRole;
use App\Models\Student;
use App\Enums\CasteType;
use App\Models\Religion;
use App\Enums\AccountType;
use App\Enums\GuardianType;
use App\Enums\LateFineType;
use App\Enums\SubCasteType;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Enums\ContextStatus;
use App\Enums\PaymentStatus;
use App\Enums\StaffRoleType;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\FeePaymentType;
use App\Enums\LedgerAmountType;
use App\Models\ClassroomStudent;
use App\Enums\FeeInstallmentType;
use App\Enums\CustomFieldDataType;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Jobs\StudentBirthdaySmsJob;
use App\Enums\StudentStaffFieldType;
use App\Enums\WalletTransactionType;
use App\Repositories\BankRepository;
use App\Repositories\IFeeRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StudentRequest;
use App\Repositories\HouseRepository;
use App\Repositories\IBankRepository;
use App\Repositories\ImageRepository;
use App\Repositories\IUserRepository;
use App\Repositories\StateRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStateRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\CountryRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\StudentRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\CategoryRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IFeeTypeRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ReligionRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StudentNoteRequest;
use App\Repositories\AdmissionRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IExamMarkRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\BloodGroupRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\BankAccountRepository;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\INullifyFeeRepository;
use App\Repositories\IOccupationRepository;
use App\Http\Requests\StudentSiblingRequest;
use App\Jobs\studentBirthdayNotificationJob;
use App\Repositories\IBankAccountRepository;
use App\Repositories\ICustomFieldRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IStudentNoteRepository;
use App\Repositories\StudentHouseRepository;
use App\Repositories\IAcademicYearRepository;
use App\Repositories\IAccountGroupRepository;
use App\Repositories\IFeeStructureRepository;
use App\Repositories\IStudentHouseRepository;
use App\Http\Requests\ClassroomStudentRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\NullifyStudentFeeRequest;
use App\Repositories\IStudentSubjectRepository;
use App\Repositories\StudentAdmissionRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IFeePaymentRefundRepository;
use App\Repositories\IStudentAdmissionRepository;
use App\Repositories\IStudentFeeDiscountRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Http\Requests\StudentBirthdayNotificationRequest;
use App\Http\Requests\BulkStudentWalletTransactionRequest;

class StudentController extends Controller
{
    private $_upload;
    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IHouseRepository $houseRepository,
        private IAdmissionRepository $admissionRepository,
        private ICategoryRepository $categoryRepository,
        private IBloodGroupRepository $bloodGroupRepository,
        private ICountryRepository $countryRepository,
        private IReligionRepository $religionRepository,
        private IBankRepository $bankRepository,
        private IStateRepository $stateRepository,
        private IBankAccountRepository $bankAccountRepository,
        private IStudentHouseRepository $studentHouseRepository,
        private IGuardianRepository $guardianRepository,
        private IImageRepository $imageRepository,
        private IStudentAdmissionRepository $studentAdmissionRepository,
        private IUserRepository $userRepository,
        private IAcademicRepository $academicRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private IStudentFeeDiscountRepository $studentFeeDiscountRepository,
        private IFeePaymentRefundRepository $feePaymentRefundRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private ITransportRepository $transportRepository,
        private IFeeRepository $feeRepository,
        private IFeeTypeRepository $feeTypeRepository,
        private INullifyFeeRepository $nullifyFeeRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
        private ICustomFieldRepository $customFieldRepository,
        private IStudentNoteRepository $studentNoteRepository,
        private IOccupationRepository $occupationRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IStudentSubjectRepository $studentSubjectRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view student', ['only' => [
            'index',
            'misReport',
            'inactive',
            'makeActive',
            'search',
            'summary',
            'assignFeeToNewStudent',
            'details',
            'birthdayList',
            'changeSection',
            'changeDuration',
            'getStudentNameIdByClassroomId',
            'getStudentInfoForSale',
            'nullifyStudentFee',
            'getStudentsByClassroomId',
            'bulkWallet',
            'getStudentByClassroomId',
            'studentPdfPrint'
        ]]);
        $this->middleware('permission:add student', ['only' => [
            'create',
            'save',
            'create',
            'save',
            'checkSibling',
            'checkSaveData',
            'saveUserPassword',
            'changeStatus',
            'updateChangeStatus',
            'upgrade',
            'upgradeSave',
            'changeClass',
            'updateChangeClass',
            'updateSelectedStudent',
            'updateChangeSection',
            'changeDurationUpdate',
            'makeInactive',
            'saveBulkWallet'
        ]]);
        $this->middleware('permission:edit student', ['only' => [
            'edit',
            'update',
            'updatePost',
            'updateAdmNo',
            'updateBiometric',
            'updateBiometricSave',
            'updateNotes',
            'parentLoginUpdate',
            'bulkUploadImage',
            'updateUserPassword',
            'updateDetails',
            'updateDetailsSave',
            'updateSelectedStudentSection'
        ]]);
        $this->middleware('permission:delete student', ['only' => ['destroy']]);
    }

    /**
     * Display the student list.
     */
    public function index(Request $request): Response
    {
        $classroom_id = null;
        $boarding_type = null;
        if ($request->isMethod('post')) {
            $classroom_id = $request->input('classroom_id');
            $boarding_type = $request->input('boarding_type');
            $student_search = $request->input('student_search');
            $students = $this->studentRepository->getActiveAll($classroom_id, $boarding_type, $student_search);
            $students->loadMissing([
                'student_notes' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId())
                        ->with(['createdBy' => function ($query) {
                            $query->select(
                                'id',
                                'first_name',
                                'middle_name',
                                'last_name',
                            );
                        }])->select(
                            'id',
                            'student_id',
                            'created_by',
                            'context',
                            'notes',
                            'note_status',
                            'created_at',
                        );
                }
            ]);

            if (count($students) > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classTitle'] = $student?->promotedClassroom?->title;
                    }

                    return $student;
                });
            }
        } else {
            $students = [];
        }

        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // types
        $boardingType = array();
        foreach (ScholarBoardingType::cases() as $boarding) {
            array_push($boardingType, ['id' => $boarding->value, 'title' => $boarding->value]);
        }

        $contextStatusType = ContextStatus::cases();
        $contextStatus = array_map(function ($rollType) {
            return ['id' => $rollType->value, 'title' => $rollType->value];
        }, $contextStatusType);

        return Inertia::render('Student/Show', [
            'students' => $students,
            'classrooms' => $classrooms,
            'boardingType' => $boardingType,
            'contextStatus' => $contextStatus,
        ]);
    }

    /**
     * Display the mis report.
     */
    public function misReport(Request $request): Response
    {
        $students = $this->studentRepository->getActiveAll();
        $getStudentCounts = $this->studentRepository->getStudentCounts();
        $transportCounts = $this->transportRepository->getMisReportCounts();
        $getClassroomsWithStudentCount = $this->studentRepository->getClassroomsWithStudentCount();
        $getHouseWiseStudent = $this->houseRepository->getHouseWiseStudent();
        $getReligionWiseStudent = $this->religionRepository->getReligionWiseStudent();
        $getTotalStudentPerSession = $this->studentRepository->getTotalStudentPerSession();

        return Inertia::render('Student/MisReport', [
            'students' => $students,
            'getStudentCounts' => $getStudentCounts,
            'transportCounts' => $transportCounts,
            'getClassroomsWithStudentCount' => $getClassroomsWithStudentCount,
            'getHouseWiseStudent' => $getHouseWiseStudent,
            'getReligionWiseStudent' => $getReligionWiseStudent,
            'getTotalStudentPerSession' => $getTotalStudentPerSession,
        ]);
    }

    /**
     * inactive
     */
    public function inactive(Request $request): Response
    {
        $classroomId = '';
        $searchValue =  '';

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? '';
            $searchValue = $request->input('search_value') ?? '';
        }

        $students = $this->studentRepository->getInactiveList($classroomId, $searchValue);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $studentName = ($student?->first_name ?? "") . " " . ($student?->middle_name ?? "") . " " . ($student?->last_name ?? "");
                $fatherName = ($student?->father?->first_name ?? "") . " " . ($student?->father?->middle_name ?? "") . " " . ($student?->father?->last_name ?? "");

                return [
                    'id' => $student?->id,
                    'student_name' => $studentName,
                    'admission_no' => $student?->admission_no,
                    'roll_no' => $student?->classroomRoll?->roll_no,
                    'classroom_title' => $student?->classroom?->title,
                    'father_name' => $fatherName,
                    'father_phone' => $student?->father?->phone,
                    'inactive_date' => $student?->status_date_at,
                    'inactive_reason' => $student?->reason,
                ];
            });
        }

        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('Student/InactiveStudents', [
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * maekActive
     */
    public function makeActive(int $id)
    {
        if (!empty($id)) {
            $student = $this->studentRepository->getById($id);

            if (!empty($student)) {
                DB::beginTransaction();

                try {
                    $this->studentRepository->update($id, ['status' => Status::ACTIVE->value]);

                    $nullifiedFees = $this->nullifyFeeRepository->getNullifiedFeesByStudentId($id);

                    if ($nullifiedFees->count() > 0) {
                        $student->loadMissing(['promotedClassroom']);

                        if ($student?->promotedClassroom != null) {
                            $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                        }

                        // assign nullified fee to student
                        $this->assignNullifiedFeeToStudent($student, $nullifiedFees);

                        // delete nullified fees
                        $nullifiedFees->each(function ($nullifiedFee) {
                            $nullifiedFee->nullify_fee_amounts()->delete();

                            $nullifiedFee->delete();
                        });
                    }

                    DB::commit();

                    return redirect()->route('student.inactive_list')->with('message', 'Successfully active');
                } catch (\Throwable $th) {
                    DB::rollBack();

                    throw $th;

                    return redirect()->route('student.inactive_list')->with('error', 'Something goes wrong.');
                }
            }
        }
    }


    /*
    *  helper method to assign nullified fees to student
    */
    private function assignNullifiedFeeToStudent(object $student, object $nullifiedFees)
    {
        foreach ($nullifiedFees as $nullifiedFee) {
            if ($nullifiedFee?->nullify_fee_amounts->isNotEmpty()) {
                $nullifiedItem = $nullifiedFee?->nullify_fee_amounts?->whereNotNull('class_fee_student_amount_id')?->first();

                $classFeeStructure = null;

                if ($nullifiedItem != null && $nullifiedItem?->class_fee_student_amount_id != null) {
                    $classFeeStudentAmount = $this->classFeeStudentAmountRepository
                        ->getStudentFeeAmountById($nullifiedItem->class_fee_student_amount_id);

                    if ($classFeeStudentAmount?->classFeeStructure != null) {
                        $classFeeStructure = $classFeeStudentAmount?->classFeeStructure;
                    }
                }

                if ($classFeeStructure == null) {
                    $classFeeStructure = $this->feeStructureRepository->getFeeStructureByClassNameId($student->class_name_id);
                }

                foreach ($nullifiedFee->nullify_fee_amounts as $feeAmountData) {
                    $attributesToCheck = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'student_id' => $student->id,
                        'class_name_id' => $student->class_name_id,
                        'fee_id' => $feeAmountData['fee_id'],
                        'fee_type_id' => $feeAmountData['fee_type_id'],
                    );

                    $valuesToUpdate = array(
                        'class_fee_structure_id' => $classFeeStructure?->id,
                        'amount' => $feeAmountData['fee_amount'] ?? 0,
                        'semester' => null,
                        'is_admission_installment' => !empty($feeAmountData['fee']['is_admission_install']) ? $feeAmountData['fee']['is_admission_install'] : false,
                        'is_fee_special' => !empty($feeAmountData['feeType']['is_fee_special']) ? $feeAmountData['feeType']['is_fee_special'] : false,
                        'status' => Status::ACTIVE,
                    );

                    $this->feeStructureRepository->updateOrCreateFeeStructureStudentAmount($attributesToCheck, $valuesToUpdate);
                }
            }
        }
    }

    /**
     * Display Student Search.
     */
    public function search(Request $request): Response
    {
        $session = "";
        $admissionNumber = "";
        $studentName = "";
        $fatherName = "";
        $fatherNumber = "";
        $motherName = "";
        $students = [];

        if ($request->isMethod('post')) {
            $session = $request->input('search_all_session') ?? '';
            $admissionNumber = $request->input('admission_number') ?? '';
            $studentName = $request->input('student_name') ?? '';
            $fatherName = $request->input('father_name') ?? '';
            $fatherNumber = $request->input('father_number') ?? '';
            $motherName = $request->input('mother_name') ?? '';
            $students =  $this->studentRepository->getListForSearch($session, $admissionNumber, $studentName, $fatherName, $fatherNumber, $motherName);
        }

        return Inertia::render('Student/SearchList', [
            'students' => $students,
        ]);
    }

    /**
     * Display Student Summary.
     */
    public function summary(Request $request): Response
    {
        $classNameId = '';
        $classroomId = '';
        $searchValue = '';
        $type = '';
        $filteredStudents = [];
        $classrooms = [];
        $allStudents = [];
        $maleStudents = [];
        $femaleStudents = [];
        $otherStudents = [];
        $newStudents = [];
        $promotedStudents = [];
        $classTotalStudent = 0;
        $classroomTotalStudent = 0;

        if ($request->isMethod('post')) {
            $classNameId = $request->input('class_name_id') ?? '';
            $classroomId = $request->input('classroom_id') ?? '';
            $searchValue = $request->input('search_value') ?? '';
            $type = $request->input('type') ?? '';

            if ($request?->filter_type != 'class_summary') {
                $allStudents = $this->studentRepository->getListForSummery($classNameId, $classroomId, $searchValue, $type);
                $filteredStudents = $allStudents['students'];
                $maleStudents = $allStudents['male_students'];
                $femaleStudents = $allStudents['female_students'];
                $otherStudents = $allStudents['other_students'];
                $newStudents = $allStudents['new_students'];
                $promotedStudents = $allStudents['promoted_students'];
            }
        }

        $classNames = $this->classroomRepository->getActiveClassNameAll()->sortBy('id');

        $classrooms = $this->classroomRepository->getActiveAll();

        if ($classNames->count() > 0) {
            $classNameIds = $classNames->pluck('id')->toArray();

            $students = $this->studentRepository->getSummaryStudentsByClassNameIdsAndStatus($classNameIds, $type);

            if ($students->count() > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['class_name_id'] = $student?->promotedClassroom?->class_name_id;
                    }

                    return $student;
                });
            }
        }

        $classNames = $classNames->map(function ($className) use ($students, &$classTotalStudent) {
            if (count($students) > 0) {
                $students = $students->groupBy('class_name_id');
            }

            $studentCount = count(($students[$className->id] ?? []));
            $classTotalStudent += $studentCount;

            return [
                'id' => $className?->id,
                'title' => $className?->title,
                'student_count' => $studentCount,
            ];
        });

        $classrooms = $classrooms->map(function ($classroom) use ($students, &$classroomTotalStudent) {
            if (count($students) > 0) {
                $students = $students->groupBy('classroom_id');
            }

            $studentCount = count(($students[$classroom->id] ?? []));

            $classroomTotalStudent += $studentCount;

            return [
                'id' => $classroom?->id,
                'title' => $classroom?->title,
                'student_count' => $studentCount,
            ];
        });

        return Inertia::render('Student/Summary', [
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'students' => $filteredStudents,
            'maleStudents' => $maleStudents,
            'femaleStudents' => $femaleStudents,
            'otherStudents' => $otherStudents,
            'newStudents' => $newStudents,
            'promotedStudents' => $promotedStudents,
            'classTotalStudent' => $classTotalStudent,
            'classroomTotalStudent' => $classroomTotalStudent,
        ]);
    }

    /**
     * Display Update Biometric.
     */
    public function updateBiometric(Request $request): Response
    {
        $classroomId = '';
        $searchValue = '';
        $studentsBio = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? '';
            $searchValue = $request->input('search_value') ?? '';

            $studentsBio = $this->studentRepository->getActiveListForBiometric($classroomId, $searchValue);
        }

        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('Student/UpdateBiometric', [
            'studentsBio' => $studentsBio,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * updateBiometricSave
     */
    public function updateBiometricSave(Request $request)
    {
        $dataArray = [
            'biometric_code' => $request?->biometric_code ?? null
        ];

        $studentBio = $this->studentRepository->update($request->id, $dataArray);

        if ($studentBio) {
            return redirect()->route('student.update_biometric')->with('message', 'Biometric updated successfully.');
        }
    }


    /**
     * updateBiometricSave
     */
    public function updateBiometricSaveOld(Request $request)
    {
        $jsonData = json_decode($request->getContent(), true);
        foreach ($jsonData as $data) {
            $dataArray = [
                'biometric_code' => $data['biometric_code'] ?? null
            ];
            $studentBio = $this->studentRepository->update($data['id'], $dataArray);
        }
        if ($studentBio) {
            return redirect()->route('student.update_biometric')->with('message', 'Biometric updated successfully.');
        }
    }


    /**
     * student create form
     */
    public function create(Request $request): Response
    {
        $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";
        $feeStructures = [];

        if ($isFeeStructureWithTemplate === "Yes") {
            $feeStructures = $this->feeStructureRepository->getActiveAll();
            $feeStructures->load(['classNames']);

            $feeStructures = $feeStructures->map(function ($feeStructure) {
                $classNameIds = $feeStructure->classNames->pluck('id')->toArray();
                $classrooms = $this->classroomRepository->getActiveNameAndIdByClassNameIds($classNameIds);
                $classroomIds = $classrooms->pluck('id')->toArray();

                return [
                    'id' => $feeStructure->id,
                    'title' => $feeStructure->title,
                    'class_name_ids' => $classNameIds,
                    'classroom_ids' => $classroomIds,
                ];
            });
        }

        $classNamesData = $this->classroomRepository->getActiveNameAndId();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameAndIdOfEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $admissionNo = $this->studentRepository->getNextAdmissionNo();
        $occupationsData = $this->occupationRepository->getActiveAll();

        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $occupations = $occupationsData->map(fn($occupation) => ['id' => $occupation->id, 'title' => $occupation->name])->all();

        $optionalSubjects = [];
        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $optionalSubjectsData = $this->classroomSubjectRepository->getOptionalSubjectsByClassroomId($classroomId);
            $optionalSubjects = $optionalSubjectsData->map(fn($subject) => ['id' => $subject->subject_id, 'title' => $subject->title])->all();
        }


        // types
        $statusType = StudentStatus::cases();
        $status = array();
        foreach ($statusType as $sType) {
            array_push($status, ['id' => $sType->value, 'title' => $sType->value]);
        }

        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
        }

        $casteType = CasteType::cases();
        $casteArr = array();
        foreach ($casteType as $cType) {
            array_push($casteArr, ['id' => $cType->value, 'title' => $cType->value]);
        }

        $subCasteType = SubCasteType::cases();
        $subCasteArr = array();
        foreach ($subCasteType as $scType) {
            array_push($subCasteArr, ['id' => $scType->value, 'title' => $scType->value]);
        }

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $accountType = AccountType::cases();
        $accountArr = array();
        foreach ($accountType as $aType) {
            array_push($accountArr, ['id' => $aType->value, 'title' => $aType->value]);
        }

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::STUDENT->value);

        if (count($customFields) > 0) {
            $customFields = $customFields->map(function ($customField) {
                $listValues = [];

                if ($customField->data_type == CustomFieldDataType::LIST->value && !empty($customField)) {
                    $lists = explode(',', $customField->list_value);

                    foreach ($lists as $list) {
                        $listValues[] = ['id' => $list, 'title' => $list];
                    }
                }

                $customField['list_values'] = $listValues;

                return $customField;
            });
        }

        return Inertia::render('Student/Create', [
            'classNames' => $classNames,
            'houses' => $houses,
            'status' => $status,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'casteArr' => $casteArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'subCasteArr' => $subCasteArr,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'admissionNo' => $admissionNo,
            'states' => $states,
            'feeStructures' => $feeStructures,
            'isFeeStructureWithTemplate' => $isFeeStructureWithTemplate,
            'customFields' => $customFields,
            'occupations' => $occupations,
            'optionalSubjects' => $optionalSubjects,
        ]);
    }

    /**
     * checked siblings
     */
    public function checkSibling(Request $request)
    {
        $fatherName = $request->input('fatherName');
        $fatherEmail = $request->input('fatherEmail');
        $fatherMobile = $request->input('fatherMobile');

        if (!empty($fatherName) && !empty($fatherEmail) && !empty($fatherMobile)) {
            $getSiblings = $this->guardianRepository->getSiblingByFatherInfo($fatherName, $fatherEmail, $fatherMobile);
            return redirect()->back()->with([
                'customData' => $getSiblings
            ]);
        }
    }

    /**
     * save student info
     */
    public function checkSaveData(Request $request)
    {
        $admission_no = $request->input('admission_no');
        if (!empty($admission_no)) {
            $existAdmNo = $this->studentRepository->checkAdmNo($admission_no);

            if ($existAdmNo == null) {
                $setting = getSchoolSetting();
                $existAdmNo = $this->studentRepository->checkAdmNo(trim($setting->admission_prefix) . $admission_no);
            }

            if (!empty($existAdmNo)) {
                return redirect()->back()->with('error', 'Already used this admission no: ' . $admission_no);
            } else {
                return redirect()->back()->with(['message' => 'Available this admission no: ' . $admission_no]);
            }
        } else {
            return redirect()->route('student.create')->with('error', 'Please enter admission number.');
        }
    }

    /**
     * save student info StudentRequest
     */
    public function save(StudentRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $classNameId = $this->classroomRepository->getClassNameIdFromClassId($input['classroom_id']);
        $academicYearId = $this->classroomRepository->getSessionIdFromClassId($input['classroom_id']);

        if (!empty($input['first_name'])) {

            if (!empty($input['email'])) {
                $inputEmail = $input['email'];
                $username = strtolower($input['first_name'])  . rand(1000, 9999);
            } else {
                $username = strtolower($input['first_name'])  . rand(1000, 9999);
                $inputEmail = $username . '@educarestudy.in';
            }

            $userArray = [
                'school_id' => getUserSchoolId(),
                'username' => $username,
                'first_name' => $input['first_name'] ?? null,
                'middle_name' =>  $input['middle_name'] ?? null,
                'last_name' => $input['last_name'] ?? null,
                'phone' => $input['phone'] ?? null,
                'email' => $inputEmail,
                'role' => UserRole::SITE_STUDENT,
                'password' => Hash::make($input['first_name']),
                'status' => Status::ACTIVE
            ];
            $studentUser = $this->userRepository->create($userArray);
            // assign student role, here student role id: 15
            $studentUser->assignRole(15);
        }

        $studentData = array(
            'user_id' => $studentUser->id ?? null,
            'school_id' => getUserSchoolId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'academic_year_id' => $academicYearId ?? null,
            'class_name_id' => $classNameId,
            'father_occupation_id' => !empty($input['father_occupation_id']) ? $input['father_occupation_id'] : null,
            'mother_occupation_id' => !empty($input['mother_occupation_id']) ? $input['mother_occupation_id'] : null,
            'employment_cat_id' => !empty($input['employment_cat_id']) ? $input['employment_cat_id'] : null,
            'country_id' => !empty($input['country_id']) ? $input['country_id'] : null,
            'is_have_sibling' => $input['is_have_sibling'] ?? false,
            'sibling_student_id' => !empty($input['sibling_student_id']) ? $input['sibling_student_id'] : null,
            'admission_no' => $input['admission_no'],
            'admission_date_at' => !empty($input['admission_date_at']) ? \Carbon\Carbon::parse($input['admission_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'first_name' => $input['first_name'] ?? '',
            'middle_name' => $input['middle_name'] ?? '',
            'last_name' => $input['last_name'] ?? '',
            'phone' => $input['phone'] ?? '',
            // 'email' => $inputEmail,
            'email' => $input['email'] ?? '',
            // 'roll_no' => $input['roll_no'] ?? '',
            'boarding_type' => $input['boarding_type'] ?? '',
            'caste_type' => $input['caste_type'] ?? '',
            'is_computer_option' => $input['is_computer_option'] ?? 0,
            'is_social_studies_option' => $input['is_social_studies_option'] ?? 0,
            'gender' => $input['gender'] ?? '',
            'aadhar_card_no' => $input['aadhar_card_no'] ?? '',
            'blood_group' => $input['blood_group'] ?? '',
            'religion' => $input['religion'] ?? '',
            'srn_no' => $input['srn_no'] ?? '',
            'child_id' => $input['child_id'] ?? '',
            'samagra_id' => $input['samagra_id'] ?? '',
            'birth_place' => $input['birth_place'] ?? '',
            'caste' => $input['caste'] ?? '',
            'sub_caste' => $input['sub_caste'] ?? '',
            'admission_class' => $input['admission_class'] ?? '',
            'mother_tongue' => $input['mother_tongue'] ?? '',
            'medical_condition' => $input['medical_condition'] ?? '',
            'notes' => $input['notes'] ?? '',
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'height' => $input['height'] ?? '0.00',
            'weight' => $input['weight'] ?? '0.00',
            'present_address' => $input['present_address'] ?? '',
            'present_state' => $input['present_state'] ?? '',
            'present_city' => $input['present_city'] ?? '',
            'present_taluka' => $input['present_taluka'] ?? '',
            'present_district' => $input['present_district'] ?? '',
            'present_pin_code' => $input['present_pin_code'] ?? '',
            'permanent_address' => $input['permanent_address'] ?? '',
            'permanent_state' => $input['permanent_state'] ?? '',
            'permanent_city' => $input['permanent_city'] ?? '',
            'permanent_taluka' => $input['permanent_taluka'] ?? '',
            'permanent_district' => $input['permanent_district'] ?? '',
            'permanent_pin_code' => $input['permanent_pin_code'] ?? '',
            'is_physical_disabled' => $input['is_physical_disabled'] ?? 0,
            'is_economically_weaker' => $input['is_economically_weaker'] ?? 0,
            'is_spacial_child' => $input['is_spacial_child'] ?? 0,
            'prev_school_name' => $input['prev_school_name'] ?? '',
            'prev_school_class' => $input['prev_school_class'] ?? '',
            'prev_school_year' => $input['prev_school_year'] ?? '',
            'prev_school_note' => $input['prev_school_note'] ?? '',
            'prev_school_tc_no' => $input['prev_school_tc_no'] ?? 'Active',
            'student_status' => $input['status'] ?? 'New',
            'document_attached' => !empty($input['document_attached']) ? json_encode($input['document_attached']) : null
        );

        $student = $this->studentRepository->create($studentData);

        if (!empty($student['id'])) {

            // student classroom
            if (!empty($input['classroom_id'])) {
                $studentClassroomData = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => $academicYearId ?? null,
                    'class_name_id' => $classNameId,
                    'classroom_id' => $input['classroom_id'],
                    'student_id' => $student['id'],
                    'academic_year_id_from' => null,
                    'classroom_id_from' => null,
                    'promoted_date_at' => null,
                    'user_id' => Auth::user()->id,
                    'status' => Status::ACTIVE->value,
                );

                $this->studentRepository->createClassroomStudent($studentClassroomData);
            }

            // user activity
            $userActivityArr = [
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id,
                'activitiesable_id' => $student['id'],
                'activitiesable_type' => \App\Models\Student::class,
                'status' => Status::ACTIVE->value,
            ];
            $this->userRepository->createUserActivity($userActivityArr, $student['id']);

            if (!empty($input['selectedSibling'])) {
                foreach ($input['selectedSibling'] as $sibling) {
                    $studentSibling = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'] ?? null,
                        'sibling_id' => $sibling['id'] ?? null,
                    );
                    $this->studentRepository->createSibling($studentSibling);
                }
            }

            // studentAdmission
            // $studentAdmission = array(
            //     'school_id'  => getUserSchoolId(),
            //     'student_id' => $student['id'] ?? null,
            //     'classroom_id' => $input['classroom_id'] ?? null ,
            //     'admission_id' => 0,
            //     'status' => Status::ACTIVE
            // );
            // $this->studentAdmissionRepository->create($studentAdmission);

            // student category
            if (!empty($input['category_id'])) {
                $studentCategory = array(
                    'school_id'  => getUserSchoolId(),
                    'student_id' => $student['id'] ?? null,
                    'category_id' => $input['category_id']
                );
                $this->categoryRepository->createStudentCategory($studentCategory);
            }


            // student house
            if (!empty($input['house_id'])) {
                $houseData = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'student_id' => $student['id'] ?? null,
                    'house_id' => $input['house_id'] ?? null,
                    'status' => Status::ACTIVE
                );
                $this->studentHouseRepository->create($houseData);
            }

            // optional subjects
            if (!empty($input['optional_subjects'])) {
                foreach ($input['optional_subjects'] as $subject) {
                    $optionalSubjectData = array(
                        'school_id' => getUserSchoolId(),
                        'student_id' => $student['id'] ?? null,
                        'subject_id' => $subject ?? null,
                        'classroom_id' => $input['classroom_id'] ?? null,
                        'status' => Status::ACTIVE,
                        'academic_year_id' => getAcademicYearId()
                    );

                    $this->studentSubjectRepository->create($optionalSubjectData);
                }
            }


            // student bank
            $bankAccountData = array(
                'school_id'  => getUserSchoolId(),
                'student_id' => $student['id'] ?? '',
                'bank_id' => $input['bank_id'] ?? null,
                'account_name' => $input['account_name'] ?? '',
                'account_no' => $input['account_no'] ?? '',
                'account_type' => $input['account_type'] ?? '',
                'ifsc_code' => $input['ifsc_code'] ?? '',
                'micr_no' => $input['micr_no'] ?? '',
                'branch_name' => $input['branch_name'] ?? '',
                'status' => Status::ACTIVE
            );
            $this->bankAccountRepository->create($bankAccountData);

            // create user for father
            if (!empty($input['f_first_name'])) {

                if (!empty($input['f_email'])) {
                    $inputEmailF = $input['f_email'];
                    $username = strtolower($input['f_first_name'])  . rand(1000, 9999);
                } else {
                    $username = strtolower($input['f_first_name'])  . rand(1000, 9999);
                    $inputEmailF = $username . '@educarestudy.in';
                }

                $haveFather = $this->userRepository->getFatherByEmail($input['f_email']);

                $userArray = [
                    'school_id' => getUserSchoolId(),
                    'username' => $username,
                    'first_name' => $input['f_first_name'] ?? null,
                    'middle_name' =>  $input['f_middle_name'] ?? null,
                    'last_name' => $input['f_last_name'] ?? null,
                    'phone' => $input['f_phone'] ?? null,
                    'email' => $inputEmailF,
                    'role' => UserRole::SITE_PARENT,
                    'password' => Hash::make(Str::random(10)),
                    'status' => Status::ACTIVE
                ];
                if (!empty($haveFather)) {
                    $user = $this->userRepository->updateOrCreate(['id' => $haveFather->id], $userArray);
                } else {
                    $user = $this->userRepository->create($userArray);
                }

                // father
                if (!empty($user->id) && !empty($input['father_type']) && $input['father_type'] == 'Father') {
                    $fatherData = array(
                        'school_id'  => getUserSchoolId(),
                        'user_id' => $user->id ?? null,
                        'student_id' => $student['id'] ?? '',
                        'guardian_type' => 'Father',
                        'first_name' => $input['f_first_name'] ?? '',
                        'middle_name' => $input['f_middle_name'] ?? '',
                        'last_name' => $input['f_last_name'] ?? '',
                        'religion' => $input['f_religion'] ?? '',
                        'relation' => null,
                        'phone' => $input['f_phone'] ?? '',
                        // 'email' => $inputEmailF,
                        'email' => $input['f_email'] ?? '',
                        'sms_phone' => $input['f_sms_phone'] ?? '',
                        'highest_qualification' => $input['f_highest_qualification'] ?? '',
                        'occupation' => $input['f_occupation'] ?? '',
                        'income_per_year' => $input['f_income_per_year'] ?? '',
                        'department' => $input['f_department'] ?? '',
                        'designation' => $input['f_designation'] ?? '',
                        'aadhar_card_no' => $input['f_aadhar_card_no'] ?? '',
                        'pan_card_no' => $input['f_pan_card_no'] ?? '',
                        'company_name' => $input['f_company_name'] ?? '',
                        'city' => $input['f_city'] ?? '',
                        'address' => $input['f_address'] ?? '',
                        'office_address' => $input['f_office_address'] ?? '',
                        'is_inactive' => 0,
                        'status' => Status::ACTIVE
                    );
                    $this->guardianRepository->create($fatherData);
                }
            }


            // mother
            if (!empty($input['m_first_name']) && $input['mother_type'] == 'Mother') {
                $motherData = array(
                    'school_id'  => getUserSchoolId(),
                    'student_id' => $student['id'] ?? '',
                    'guardian_type' => 'Mother',
                    'first_name' => $input['m_first_name'] ?? '',
                    'middle_name' => $input['m_middle_name'] ?? '',
                    'last_name' => $input['m_last_name'] ?? '',
                    'religion' => $input['m_religion'] ?? '',
                    'relation' => null,
                    'phone' => $input['m_phone'] ?? '',
                    'email' => $input['m_email'] ?? '',
                    'sms_phone' => $input['m_sms_phone'] ?? '',
                    'highest_qualification' => $input['m_highest_qualification'] ?? '',
                    'occupation' => $input['m_occupation'] ?? '',
                    'income_per_year' => $input['m_income_per_year'] ?? '',
                    'department' => $input['m_department'] ?? '',
                    'designation' => $input['m_designation'] ?? '',
                    'aadhar_card_no' => $input['m_aadhar_card_no'] ?? '',
                    'pan_card_no' => $input['m_pan_card_no'] ?? '',
                    'company_name' => $input['m_company_name'] ?? '',
                    'city' => $input['m_city'] ?? '',
                    'address' => $input['m_address'] ?? '',
                    'office_address' => $input['m_office_address'] ?? '',
                    'is_inactive' => 0,
                    'status' => Status::ACTIVE
                );
                $this->guardianRepository->create($motherData);
            }

            // guardian
            if (!empty($input['g_first_name']) && $input['guardian_type'] == 'Guardian') {
                $guardianData = array(
                    'school_id'  => getUserSchoolId(),
                    'student_id' => $student['id'] ?? '',
                    'guardian_type' => 'Guardian',
                    'first_name' => $input['g_first_name'] ?? '',
                    'middle_name' => $input['g_middle_name'] ?? '',
                    'last_name' => $input['g_last_name'] ?? '',
                    'religion' => $input['g_religion'] ?? '',
                    'relation' => $input['g_relation'] ?? '',
                    'phone' => $input['g_phone'] ?? '',
                    'email' => $input['g_email'] ?? '',
                    'sms_phone' => $input['g_sms_phone'] ?? '',
                    'highest_qualification' => $input['g_highest_qualification'] ?? '',
                    'occupation' => $input['g_occupation'] ?? '',
                    'income_per_year' => $input['g_income_per_year'] ?? '',
                    'department' => $input['g_department'] ?? '',
                    'designation' => $input['g_designation'] ?? '',
                    'aadhar_card_no' => $input['g_aadhar_card_no'] ?? '',
                    'pan_card_no' => $input['g_pan_card_no'] ?? '',
                    'company_name' => $input['g_company_name'] ?? '',
                    'city' => $input['g_city'] ?? '',
                    'address' => $input['g_address'] ?? '',
                    'office_address' => $input['g_office_address'] ?? '',
                    'is_inactive' => 0,
                    'status' => Status::ACTIVE
                );
                $this->guardianRepository->create($guardianData);
            }

            // profile image
            if (!empty($request->file('student_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_profile_image', 'student_profile_image');
                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $student['id'],
                    'name' => 'student_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                );
                $this->imageRepository->morphCreate($dataImage, $student['id']);
            }

            // Father Profile image
            if (!empty($request->file('student_father_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_father_profile_image', 'student_father_profile_image');
                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $student['id'],
                    'name' => 'student_father_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                );
                $this->imageRepository->morphCreate($dataImage, $student['id']);
            }

            // Mother Profile
            if (!empty($request->file('student_mother_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_mother_profile_image', 'student_mother_profile_image');
                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $student['id'],
                    'name' => 'student_mother_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                );
                $this->imageRepository->morphCreate($dataImage, $student['id']);
            }

            // Guardian profile
            if (!empty($request->file('student_guardian_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_guardian_profile_image', 'student_guardian_profile_image');
                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $student['id'],
                    'name' => 'student_guardian_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                );
                $this->imageRepository->morphCreate($dataImage, $student['id']);
            }

            // assign fee to student
            if (!empty($classNameId)) {
                $feeStructureId = !empty($input['fee_structure_id']) ? $input['fee_structure_id'] : null;

                $this->assignFeeToNewStudent($student['id'], $classNameId, $feeStructureId);
            }

            // sync student to ledger
            $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
            $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

            if ($isFeeIntegratedWithAccount) {
                $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Debtors');

                $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'account_group_id' => $accountGroup->id ?? null,
                    'student_id' => $student?->id,
                    'title' => $title,
                    'amount_type' => LedgerAmountType::DEBIT,
                    'is_system_default' => true,
                    'status' => Status::ACTIVE,
                ];

                $this->ledgerRepository->create($dataArray);
            }

            // student custom field
            if (!empty($input['custom_fields'])) {
                $this->createBulkStudentCustomField($student->id, $input['custom_fields']);
            }
        }

        if (!$student) {
            return redirect()->route('student.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('student.list')->with('message', 'Student created successfully.');
    }

    /*
    * create bulk student custom field
    */
    protected function createBulkStudentCustomField(int $studentId, array $customFields)
    {
        $schoolId = getUserSchoolId();
        $dataArray = [];

        foreach ($customFields as $customField) {
            $dataArray[] = [
                'school_id' => $schoolId,
                'student_id' => $studentId,
                'custom_field_id' => $customField['id'] ?? null,
                'value' => $customField['value'] ?? null,
                'status' => Status::ACTIVE,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        $this->customFieldRepository->insertStudentCustomField($dataArray);
    }


    /*
    *  assign fee to new student
    */
    protected function assignFeeToNewStudent($studentId, $classNameId, $feeStructureId = null)
    {
        $student = $this->studentRepository->getByStudentId($studentId);
        // $student = $this->studentRepository->getById($studentId);

        if ($student != null) {
            $disallowStructureToEwsStudent = getSiteSettingData('fee_is_disallow_structure_to_ews_student')?->value ?? "No";

            if ($disallowStructureToEwsStudent == "No" || ($disallowStructureToEwsStudent == "Yes" && $student?->is_economically_weaker != true)) {
                $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

                $feeStructure = null;

                if ($isFeeStructureWithTemplate === "Yes" && !empty($feeStructureId) && !empty($classNameId)) {
                    $feeStructure = $this->feeStructureRepository->getByIdAndClassNameId($feeStructureId, $classNameId);
                }

                if ($isFeeStructureWithTemplate === "No" && !empty($classNameId)) {
                    $feeStructure = $this->feeStructureRepository->getByClassNameId($classNameId);
                }

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

    /**
     * edit student form
     */
    public function edit(Request $request, int $id): Response
    {
        $student = $this->studentRepository->getRelationalObjById($id);

        if (!empty($student->classroomStudent->academic_year_id)) {
            $promotedAcademicYearId = $student->classroomStudent->academic_year_id;
        } else {
            $promotedAcademicYearId = $student->academic_year_id;
        }

        // $classroomData = $this->classroomRepository->getActiveNameAndId();
        $fatherUserId = $this->guardianRepository->getParentByStudentId($id);
        $fatherUserData = $this->userRepository->getById($fatherUserId->user_id);

        $stuSiblingData = $this->studentRepository->getActiveNameAndIdWithoutSame($id);
        $classNamesData = $this->classroomRepository->getActiveNameAndId($promotedAcademicYearId);
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameAndIdOfEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $occupationsData = $this->occupationRepository->getActiveAll();
        // $this->studentSubjectRepository->create($optionalSubjectData);
        $getOptionsSubjectsData = $this->studentSubjectRepository->getByClassroomIdAndStudentId($student->classroomStudent->classroom_id, $id);

        $stuSibling = $stuSiblingData->map(fn($sibling) => ['id' => $sibling->id, 'title' => getCocatenationTitle($sibling->first_name, $sibling->middle_name, $sibling->last_name)])->all();
        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $occupations = $occupationsData->map(fn($occupation) => ['id' => $occupation->id, 'title' => $occupation->name])->all();
        $optionalActiveSubjects = $getOptionsSubjectsData->pluck('subject_id')->all();

        $optionalSubjectsData = $this->classroomSubjectRepository->getOptionalSubjectsByClassroomId($student->classroomStudent->classroom_id);
        $optionalSubjects = $optionalSubjectsData->map(fn($subject) => ['id' => $subject->subject_id, 'title' => $subject->title])->all();

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $optionalSubjectsData = $this->classroomSubjectRepository->getOptionalSubjectsByClassroomId($classroomId);
            $optionalSubjects = $optionalSubjectsData->map(fn($subject) => ['id' => $subject->subject_id, 'title' => $subject->title])->all();
        }

        //guardians
        $fatherData = array();
        $motherData = array();
        $guardianData = array();

        if (!empty($student->guardians)) {
            foreach ($student->guardians as $guardian) {

                if ($guardian['guardian_type'] === 'Father') {
                    $fatherData = $guardian;
                } elseif ($guardian['guardian_type'] === 'Mother') {
                    $motherData = $guardian;
                } else {
                    $guardianData = $guardian;
                }
            }
        }

        // types
        $statusType = StudentStatus::cases();
        $status = array();
        foreach ($statusType as $sType) {
            array_push($status, ['id' => $sType->value, 'title' => $sType->value]);
        }

        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
        }

        $casteType = CasteType::cases();
        $casteArr = array();
        foreach ($casteType as $cType) {
            array_push($casteArr, ['id' => $cType->value, 'title' => $cType->value]);
        }

        $subCasteType = SubCasteType::cases();
        $subCasteArr = array();
        foreach ($subCasteType as $scType) {
            array_push($subCasteArr, ['id' => $scType->value, 'title' => $scType->value]);
        }

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $accountType = AccountType::cases();
        $accountArr = array();
        foreach ($accountType as $aType) {
            array_push($accountArr, ['id' => $aType->value, 'title' => $aType->value]);
        }

        // student custom fields
        $student?->loadMissing(['studentCustomFields']);

        $studentCustomFields = $student->studentCustomFields;

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::STUDENT->value);

        if (count($customFields) > 0) {
            $customFields = $customFields->map(function ($customField) use ($studentCustomFields) {
                $value = '';

                foreach ($studentCustomFields as $studentCustomField) {
                    if ($studentCustomField?->custom_field_id == $customField?->id) {
                        $value = $studentCustomField->value ?? '';
                    }
                }

                $customField['value'] = $value;

                $listValues = [];

                if ($customField->data_type == CustomFieldDataType::LIST->value && !empty($customField)) {
                    $lists = explode(',', $customField->list_value);

                    foreach ($lists as $list) {
                        $listValues[] = ['id' => $list, 'title' => $list];
                    }
                }

                $customField['list_values'] = $listValues;

                return $customField;
            });
        }

        return Inertia::render('Student/Edit', [
            'student' => $student,
            'fatherData' => $fatherData,
            'motherData' => $motherData,
            'guardianData' => $guardianData,
            'classNames' => $classNames,
            'houses' => $houses,
            'status' => $status,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'casteArr' => $casteArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'subCasteArr' => $subCasteArr,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'states' => $states,
            'fatherUserData' => $fatherUserData,
            'stuSibling' => [],
            'customFields' => $customFields,
            'occupations' => $occupations,
            'optionalSubjects' => $optionalSubjects,
            'optionalActiveSubjects' => $optionalActiveSubjects
        ]);
    }

    /**
     * Update student update post
     */

    public function updatePost(StudentRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $id = $input['id'];

        $proStudent = $this->studentRepository->getRelationalObjById($id);
        if (!empty($proStudent->classroomStudent->academic_year_id)) {
            // promoted classroom student
            $promotedClassroomStudentId = $proStudent->classroomStudent->id;

            $promotedClassNameId = $this->classroomRepository->getClassNameIdFromClassId($input['classroom_id']);
            $promotedAcademicYearId = $this->classroomRepository->getSessionIdFromClassId($input['classroom_id']);

            $dataArrUpdate = array(
                'academic_year_id' => $promotedAcademicYearId,
                'class_name_id' => $promotedClassNameId,
                'classroom_id' => $input['classroom_id'],
            );

            $this->studentRepository->updateClassroomStudent($promotedClassroomStudentId, $dataArrUpdate);

            //update student mark classroom
            $examMarkUpdateData = [
                'classroom_id' => $input['classroom_id']
            ];

            $this->studentRepository->updateExamMarkClassroomData($id, $examMarkUpdateData);

            // no change
            $classNameId = $proStudent->class_name_id;
            $academicYearId = $proStudent->academic_year_id;
            $_classroom_id = $proStudent->classroom_id;
        } else {
            $classNameId = $this->classroomRepository->getClassNameIdFromClassId($input['classroom_id']);
            $academicYearId = $this->classroomRepository->getSessionIdFromClassId($input['classroom_id']);
            $_classroom_id = $input['classroom_id'];
        }

        $studentData = array(
            'school_id' => getUserSchoolId(),
            'classroom_id' => $_classroom_id,
            'academic_year_id' => $academicYearId,
            'class_name_id' => $classNameId,
            'father_occupation_id' => !empty($input['father_occupation_id']) ? $input['father_occupation_id'] : null,
            'mother_occupation_id' => !empty($input['mother_occupation_id']) ? $input['mother_occupation_id'] : null,
            'employment_cat_id' => !empty($input['employment_cat_id']) ? $input['employment_cat_id'] : null,
            'country_id' => !empty($input['country_id']) ? $input['country_id']  : null,
            'is_have_sibling' => $input['is_have_sibling'] ?? false,
            'sibling_student_id' => ($input['is_have_sibling'] && $input['sibling_student_id']) ? $input['sibling_student_id'] : null,
            // 'admission_no' => $input['admission_no'],
            'admission_date_at' => !empty($input['admission_date_at']) ? \Carbon\Carbon::parse($input['admission_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'first_name' => $input['first_name'] ?? '',
            'middle_name' => $input['middle_name'] ?? '',
            'last_name' => $input['last_name'] ?? '',
            'phone' => $input['phone'] ?? '',
            'email' => $input['email'] ?? '',
            // 'roll_no' => $input['roll_no'] ?? '',
            'boarding_type' => $input['boarding_type'] ?? '',
            'caste_type' => $input['caste_type'] ?? '',
            'is_computer_option' => $input['is_computer_option'] ?? 0,
            'is_social_studies_option' => $input['is_social_studies_option'] ?? 0,
            'gender' => $input['gender'] ?? '',
            'aadhar_card_no' => $input['aadhar_card_no'] ?? '',
            'blood_group' => $input['blood_group'] ?? '',
            'religion' => $input['religion'] ?? '',
            'srn_no' => $input['srn_no'] ?? '',
            'child_id' => $input['child_id'] ?? '',
            'samagra_id' => $input['samagra_id'] ?? '',
            'birth_place' => $input['birth_place'] ?? '',
            'caste' => $input['caste'] ?? '',
            'sub_caste' => $input['sub_caste'] ?? '',
            'admission_class' => $input['admission_class'] ?? '',
            'mother_tongue' => $input['mother_tongue'] ?? '',
            'medical_condition' => $input['medical_condition'] ?? '',
            'notes' => $input['notes'] ?? '',
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'height' => $input['height'] ?? '0.00',
            'weight' => $input['weight'] ?? '0.00',
            'present_address' => $input['present_address'] ?? '',
            'present_state' => $input['present_state'] ?? '',
            'present_city' => $input['present_city'] ?? '',
            'present_taluka' => $input['present_taluka'] ?? '',
            'present_district' => $input['present_district'] ?? '',
            'present_pin_code' => $input['present_pin_code'] ?? '',
            'permanent_address' => $input['permanent_address'] ?? '',
            'permanent_state' => $input['permanent_state'] ?? '',
            'permanent_city' => $input['permanent_city'] ?? '',
            'permanent_taluka' => $input['permanent_taluka'] ?? '',
            'permanent_district' => $input['permanent_district'] ?? '',
            'permanent_pin_code' => $input['permanent_pin_code'] ?? '',
            'is_physical_disabled' => $input['is_physical_disabled'] ?? 0,
            'is_economically_weaker' => $input['is_economically_weaker'] ?? 0,
            'is_spacial_child' => $input['is_spacial_child'] ?? 0,
            'prev_school_name' => $input['prev_school_name'] ?? '',
            'prev_school_class' => $input['prev_school_class'] ?? '',
            'prev_school_year' => $input['prev_school_year'] ?? '',
            'prev_school_note' => $input['prev_school_note'] ?? '',
            'prev_school_tc_no' => $input['prev_school_tc_no'] ?? 'Active',
            'student_status' => $input['status'] ?? 'New',
            'document_attached' => !empty($input['document_attached']) ? json_encode($input['document_attached']) : null
        );

        $student = $this->studentRepository->update($input['id'], $studentData);

        // // student classroom
        // $studentClassroomData = array(
        //     'academic_year_id' => $academicYearId,
        //     'class_name_id' => $classNameId,
        //     'classroom_id' => $_classroom_id,
        // );

        // $this->studentRepository->updateClassroomStudentByStudentId($input['id'], $studentClassroomData);

        // user activity
        $userActivityArr = [
            'school_id' => getUserSchoolId(),
            'user_id' => auth()->user()->id,
            'activitiesable_id' => $input['id'],
            'activitiesable_type' => \App\Models\Student::class,
            'status' => Status::ACTIVE->value,
        ];
        $this->userRepository->createUserActivity($userActivityArr, $input['id']);

        if (!empty($input['student_category_id'])) {
            if (!empty($input['category_id'])) {
                $studentCategory = array(
                    'category_id' => intval($input['category_id']) ?? null
                );
                $this->categoryRepository->updateStudent($input['student_category_id'], $studentCategory);
            } else {
                $this->categoryRepository->deleteStudent($input['student_category_id']);
            }
        } else if (!empty($input['category_id'])) {
            // student category
            $studentCategory = array(
                'school_id'  => getUserSchoolId(),
                'student_id' => $input['id'] ?? null,
                'category_id' => $input['category_id'] ?? null
            );
            $this->categoryRepository->createStudentCategory($studentCategory);
        }

        if (!empty($input['student_house_id'])) {
            if (!empty($input['house_id'])) {
                $houseData = array(
                    'house_id' => !empty($input['house_id']) ? $input['house_id'] : ''
                );
                $this->studentHouseRepository->update($input['student_house_id'], $houseData);
            } else {
                $this->studentHouseRepository->delete($input['student_house_id']);
            }
        } else if (!empty($input['house_id'])) {
            $houseData = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'student_id' => $input['id'] ?? null,
                'house_id' => $input['house_id'] ?? null,
                'status' => Status::ACTIVE
            );
            $this->studentHouseRepository->create($houseData);
        }

        if (!empty($input['student_bank_account_id'])) {
            // student bank
            $bankAccountData = array(
                'bank_id' => $input['bank_id'] ?? null,
                'account_name' => $input['account_name'] ?? '',
                'account_no' => $input['account_no'] ?? '',
                'account_type' => $input['account_type'] ?? '',
                'ifsc_code' => $input['ifsc_code'] ?? '',
                'micr_no' => $input['micr_no'] ?? '',
                'branch_name' => $input['branch_name'] ?? '',
                'status' => Status::ACTIVE
            );
            $this->bankAccountRepository->update($input['student_bank_account_id'], $bankAccountData);
        }
        if (!empty($input['optional_subjects'])) {
            $this->studentSubjectRepository->deleteByStudentId($input['id']);
            foreach ($input['optional_subjects'] as $subject) {
                $optionalSubjectData = [
                    'school_id' => getUserSchoolId(),
                    'student_id' => $input['id'] ?? null,
                    'subject_id' => $subject ?? null,
                    'classroom_id' => $input['classroom_id'] ?? null,
                    'status' => Status::ACTIVE,
                    'academic_year_id' => getAcademicYearId()
                ];

                $this->studentSubjectRepository->create($optionalSubjectData);
            }
        }

        // father
        if (!empty($input['f_first_name']) && $input['father_type'] == 'Father') {

            $fatherData = array(
                'school_id'  => getUserSchoolId(),
                'student_id' => $id,
                'guardian_type' => 'Father',
                'first_name' => $input['f_first_name'] ?? '',
                'middle_name' => $input['f_middle_name'] ?? '',
                'last_name' => $input['f_last_name'] ?? '',
                'religion' => $input['f_religion'] ?? '',
                'relation' => null,
                'phone' => $input['f_phone'] ?? '',
                'email' => $input['f_email'] ?? '',
                'sms_phone' => $input['f_sms_phone'] ?? '',
                'highest_qualification' => $input['f_highest_qualification'] ?? '',
                'occupation' => $input['f_occupation'] ?? '',
                'income_per_year' => $input['f_income_per_year'] ?? '',
                'department' => $input['f_department'] ?? '',
                'designation' => $input['f_designation'] ?? '',
                'aadhar_card_no' => $input['f_aadhar_card_no'] ?? '',
                'pan_card_no' => $input['f_pan_card_no'] ?? '',
                'company_name' => $input['f_company_name'] ?? '',
                'city' => $input['f_city'] ?? '',
                'address' => $input['f_address'] ?? '',
                'office_address' => $input['f_office_address'] ?? '',
                'is_inactive' => 0,
                'status' => Status::ACTIVE
            );

            $updateUserFather = [
                'first_name' => $input['f_first_name'] ?? null,
                'middle_name' =>  $input['f_middle_name'] ?? null,
                'last_name' => $input['f_last_name'] ?? null,
                'phone' => $input['f_phone'] ?? null,
                'email' => $input['f_email'] ?? ''
            ];

            if (!empty($input['father_id'])) {
                $this->guardianRepository->update($input['father_id'], $fatherData);
                $fObj = $this->guardianRepository->getById($input['father_id']);
                if (!empty($fObj->user_id)) {
                    $this->userRepository->update($fObj->user_id, $updateUserFather);
                }
            } else {
                if (!empty($input['f_email'])) {
                    $inputEmailF = $input['f_email'];
                    $username = strtolower($input['f_first_name'])  . rand(1000, 9999);
                } else {
                    $username = strtolower($input['f_first_name'])  . rand(1000, 9999);
                    $inputEmailF = $username . '@educarestudy.in';
                }

                $haveFather = $this->userRepository->getFatherByEmail($input['f_email']);

                $userArrayF = [
                    'school_id' => getUserSchoolId(),
                    'username' => $username,
                    'first_name' => $input['f_first_name'] ?? null,
                    'middle_name' =>  $input['f_middle_name'] ?? null,
                    'last_name' => $input['f_last_name'] ?? null,
                    'phone' => $input['f_phone'] ?? null,
                    'email' => $inputEmailF,
                    'role' => UserRole::SITE_PARENT,
                    'password' => Hash::make(Str::random(10)),
                    'status' => Status::ACTIVE
                ];
                if (!empty($haveFather)) {
                    $user = $this->userRepository->updateOrCreate(['id' => $haveFather->id], $userArrayF);
                } else {
                    $user = $this->userRepository->create($userArrayF);
                    $fatherData['user_id'] = $user->id ?? null;
                }
                $this->guardianRepository->create($fatherData);
            }
        }


        // mother
        if (!empty($input['m_first_name']) && $input['mother_type'] == 'Mother') {

            $motherData = array(
                'school_id'  => getUserSchoolId(),
                'student_id' => $id,
                'guardian_type' => 'Mother',
                'first_name' => $input['m_first_name'] ?? '',
                'middle_name' => $input['m_middle_name'] ?? '',
                'last_name' => $input['m_last_name'] ?? '',
                'religion' => $input['m_religion'] ?? '',
                'relation' => null,
                'phone' => $input['m_phone'] ?? '',
                'email' => $input['m_email'] ?? '',
                'sms_phone' => $input['m_sms_phone'] ?? '',
                'highest_qualification' => $input['m_highest_qualification'] ?? '',
                'occupation' => $input['m_occupation'] ?? '',
                'income_per_year' => $input['m_income_per_year'] ?? '',
                'department' => $input['m_department'] ?? '',
                'designation' => $input['m_designation'] ?? '',
                'aadhar_card_no' => $input['m_aadhar_card_no'] ?? '',
                'pan_card_no' => $input['m_pan_card_no'] ?? '',
                'company_name' => $input['m_company_name'] ?? '',
                'city' => $input['m_city'] ?? '',
                'address' => $input['m_address'] ?? '',
                'office_address' => $input['m_office_address'] ?? '',
                'is_inactive' => 0,
                'status' => Status::ACTIVE
            );

            if (!empty($input['mother_id'])) {
                $this->guardianRepository->update($input['mother_id'], $motherData);
            } else {
                $this->guardianRepository->create($motherData);
            }
        }

        // guardian
        if (!empty($input['g_first_name']) && $input['guardian_type'] == 'Guardian') {

            $guardianData = array(
                'school_id'  => getUserSchoolId(),
                'student_id' => $id,
                'guardian_type' => 'Guardian',
                'first_name' => $input['g_first_name'] ?? '',
                'middle_name' => $input['g_middle_name'] ?? '',
                'last_name' => $input['g_last_name'] ?? '',
                'religion' => $input['g_religion'] ?? '',
                'relation' => $input['g_relation'] ?? '',
                'phone' => $input['g_phone'] ?? '',
                'email' => $input['g_email'] ?? '',
                'sms_phone' => $input['g_sms_phone'] ?? '',
                'highest_qualification' => $input['g_highest_qualification'] ?? '',
                'occupation' => $input['g_occupation'] ?? '',
                'income_per_year' => $input['g_income_per_year'] ?? '',
                'department' => $input['g_department'] ?? '',
                'designation' => $input['g_designation'] ?? '',
                'aadhar_card_no' => $input['g_aadhar_card_no'] ?? '',
                'pan_card_no' => $input['g_pan_card_no'] ?? '',
                'company_name' => $input['g_company_name'] ?? '',
                'city' => $input['g_city'] ?? '',
                'address' => $input['g_address'] ?? '',
                'office_address' => $input['g_office_address'] ?? '',
                'is_inactive' => 0,
                'status' => Status::ACTIVE
            );
            if (!empty($input['guardian_id'])) {
                $this->guardianRepository->update($input['guardian_id'], $guardianData);
            } else {
                $this->guardianRepository->create($guardianData);
            }
        }


        // profile image
        if (!empty($request->file('student_profile_image'))) {
            $image_url = $this->_upload->uploadImage($request, 'student_profile_image', 'student_profile_image');
            $arrayMatch = [
                'imageable_id' => $input['id'],
                'name' => 'student_profile_image',
                'imageable_type' => \App\Models\Student::class,
            ];

            $arrayData = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $input['id'],
                'name' => 'student_profile_image',
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            ];

            $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
        }

        // Father Profile image
        if (!empty($request->file('student_father_profile_image'))) {
            $image_url = $this->_upload->uploadImage($request, 'student_father_profile_image', 'student_father_profile_image');
            $arrayMatch = [
                'imageable_id' => $input['id'],
                'name' => 'student_father_profile_image',
                'imageable_type' => \App\Models\Student::class,
            ];

            $arrayData = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $input['id'],
                'name' => 'student_father_profile_image',
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            ];
            $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
        }

        // Mother Profile
        if (!empty($request->file('student_mother_profile_image'))) {
            $image_url = $this->_upload->uploadImage($request, 'student_mother_profile_image', 'student_mother_profile_image');
            $arrayMatch = [
                'imageable_id' => $input['id'],
                'name' => 'student_mother_profile_image',
                'imageable_type' => \App\Models\Student::class,
            ];

            $arrayData = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $input['id'],
                'name' => 'student_mother_profile_image',
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            ];
            $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
        }

        // Guardian profile
        if (!empty($request->file('student_guardian_profile_image'))) {
            $image_url = $this->_upload->uploadImage($request, 'student_guardian_profile_image', 'student_guardian_profile_image');
            $arrayMatch = [
                'imageable_id' => $input['id'],
                'name' => 'student_guardian_profile_image',
                'imageable_type' => \App\Models\Student::class,
            ];

            $arrayData = [
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $input['id'],
                'name' => 'student_guardian_profile_image',
                'path' => !empty($image_url) ? $image_url : 'no image',
                'status' => Status::ACTIVE,
            ];
            $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
        }

        // student custom field
        if (!empty($input['custom_fields'])) {
            $this->updateOrCreateBulkStudentCustomField($id, $input['custom_fields']);
        }

        if (!$student) {
            return redirect()->route('student.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('student.list')->with('message', 'Student updated successfully.');
    }

    /*
    * update or create bulk student custom field
    */
    protected function updateOrCreateBulkStudentCustomField(int $studentId, array $customFields)
    {
        $schoolId = getUserSchoolId();

        foreach ($customFields as $customField) {
            $atributesToCheck = [
                'school_id' => $schoolId,
                'student_id' => $studentId,
                'custom_field_id' => $customField['id'] ?? null
            ];

            $valuesToUpdate = [
                'value' => $customField['value'] ?? null,
                'status' => Status::ACTIVE,
                'created_at' => now(),
                'updated_at' => now()
            ];

            $this->customFieldRepository->updateOrCreateStudentCustomField($atributesToCheck, $valuesToUpdate);
        }
    }

    /**
     * update student admission number
     */
    public function updateAdmNo(Request $request, int $id)
    {
        if (!empty($request->input('new_admission_no'))) {
            $admNo = [
                'admission_no' => $request->input('new_admission_no')
            ];
            $this->studentRepository->update($id, $admNo);
            return redirect()->back()->with('message', 'Admission no updated successfully.');
        }
    }


    /**
     * Save student notes
     */
    public function saveNotes(StudentNoteRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'],
                'context' => $input['context'],
                'notes' => $input['notes'],
                'note_status' => ContextStatus::OPEN,
                'status' => Status::ACTIVE,
            );

            $studentNote = $this->studentNoteRepository->create($dataArray);
            DB::commit();

            return redirect()->back()->with('message', 'Student notes Added successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * update student notes Status
     */
    public function updateNotesStatus(Request $request, int $id)
    {
        if (!empty($request->input('note_status'))) {
            $noteStatus = [
                'note_status' => $request->input('note_status')
            ];
            $this->studentNoteRepository->update($id, $noteStatus);
            return redirect()->back()->with('message', 'Student notes status updated successfully.');
        }
    }

    // public function updateNotesOld(Request $request, int $id)
    // {
    //     if (!empty($request->input('context') && $request->input('notes'))) {
    //         $studentNotes = [
    //             'context' => $request->input('context'),
    //             'notes' => $request->input('notes'),
    //         ];
    //         $this->studentRepository->update($id, $studentNotes);
    //         return redirect()->route('student.list')->with('message', 'Student notes updated successfully.');
    //     }
    // }

    /**
     * parentLoginUpdate
     */
    public function parentLoginUpdate(Request $request, int $id)
    {
        if (!empty($request->input('username') && $request->input('password'))) {
            $parentLoginArray = [
                'username' => $request->input('username'),
                'password' => Hash::make($request->input('password')),
                'parent_pass' => $request->input('password'),
            ];
            $this->userRepository->update($id, $parentLoginArray);
            return redirect()->route('student.list')->with('message', 'Parent login updated successfully.');
        }
    }

    /**
     * bulkUploadImage
     */
    public function bulkUploadImage()
    {
        return Inertia::render('Student/BulkUploadImage');
    }


    /**
     * update user password
     */
    public function updateUserPassword()
    {
        $getExitUser = $this->userRepository->getLoginCredential();
        $credentStudents = $this->studentRepository->getCredentialList();
        // echo "<pre>";
        // print_r($credentStudents);
        // $credentStudents->each->makeVisible('password');

        if (count($credentStudents) > 0) {
            $credentStudents = $credentStudents->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    $student['class_name'] = $student?->promotedClassroom?->title;
                }

                return $student;
            });
        }

        return Inertia::render('Student/UpdateUserPassword', [
            'exitUser' => $getExitUser,
            'credentStudents' => $credentStudents,
        ]);
    }

    /**
     * update user password
     */
    public function saveUserPassword(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        if (!empty($username) && !empty($password)) {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'username' => $request->input('username') ?? null,
                'password' => $request->input('password') ?? null,
                'status' => Status::ACTIVE,
            ];

            //dd($request);

            // Update the login credentials
            $loginCredential = $this->userRepository->createOrUpdateCredential(['id' => $request->input('id')], $dataArray);

            // Check if login credentials are updated successfully
            if ($loginCredential) {
                $studentFatherData = $this->guardianRepository->getStudentFatherInfo();
                // set admission_no as a username
                if ($username === 'admission_no') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $fa) {
                            $this->userRepository->update($fa->user_id, ['username' => $fa->admission_no, 'parent_pass' => null]);
                        }
                    }
                }
                // set father_mobile as a username
                else if ($username === 'father_mobile') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $fa) {
                            $this->userRepository->update($fa->user_id, ['username' => $fa->phone, 'parent_pass' => null]);
                        }
                    }
                }

                // set student_name as a password
                if ($password === 'student_name') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $stuPass) {
                            $middleName = !empty($stuPass->middle_name) ? ' ' . trim($stuPass->middle_name) : '';
                            $lastName = !empty($stuPass->last_name) ? ' ' . trim($stuPass->last_name) : '';
                            $passArray = [
                                'password' => Hash::make($stuPass->first_name . $middleName . $lastName),
                                'role' => 'Parent',
                                'parent_pass' => null
                            ];
                            $this->userRepository->update($stuPass->user_id, $passArray);
                        }
                    }
                }
                // set parent_name as a password
                else if ($password === 'parent_name') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $faPass) {
                            $middleName = !empty($faPass->middle_name) ? ' ' . trim($faPass->middle_name) : '';
                            $lastName = !empty($faPass->last_name) ? ' ' . trim($faPass->last_name) : '';
                            $passArray = [
                                'password' => Hash::make($faPass->first_name . $middleName . $lastName),
                                'role' => 'Parent',
                                'parent_pass' => null
                            ];
                            $this->userRepository->update($faPass->user_id, $passArray);
                        }
                    }
                }
                // set admission_no as a password
                else if ($password === 'admission_no') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $admPass) {
                            $passArray = [
                                'password' => Hash::make($admPass->admission_no),
                                'role' => 'Parent',
                                'parent_pass' => null
                            ];
                            $this->userRepository->update($admPass->user_id, $passArray);
                        }
                    }
                }
                // set birth_date_at as a password
                else if ($password === 'birth_date') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $bPass) {
                            $passArray = [
                                'password' => Hash::make($bPass->birth_date_at),
                                'role' => 'Parent',
                                'parent_pass' => null
                            ];
                            $this->userRepository->update($bPass->user_id, $passArray);
                        }
                    }
                }
                // set father_mobile as a username
                else if ($password === 'father_mobile') {
                    if (!empty($studentFatherData)) {
                        foreach ($studentFatherData as $faMPass) {
                            $passArray = [
                                'password' => Hash::make($faMPass->phone),
                                'role' => 'Parent',
                                'parent_pass' => null
                            ];
                            $this->userRepository->update($faMPass->user_id, $passArray);
                        }
                    }
                }

                return redirect()->route('student.update_user_password')->with('message', 'Username and password changed successfully.');
            }
        }

        // Handle the case where username or password is empty
        return redirect()->route('student.update_user_password')->with('error', 'Select username and password to update.');
    }


    /**
     * Display changeStatus
     */
    public function changeStatus(Request $request): Response
    {
        // $classroomId = !empty($_GET['class_room_id']) ? $_GET['class_room_id'] : null;
        $classroomId = null;

        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        $students = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStatusList($classroomId);
            }
        }

        return Inertia::render('Student/ChangeStatus', [
            'classrooms' => $classrooms,
            'students' => $students,
            'classroom_id' => $classroomId,
        ]);
    }

    /**
     * update user password
     */
    public function updateChangeStatus(Request $request)
    {

        if (!empty($request->input('id'))) {
            $studentStatus = [
                'student_status' => $request->input('status') ? StudentStatus::PROMOTED->value : StudentStatus::NEW->value,
                'promoted_date_at' => now(),
                'promoted_by' => $request->user()->username ?? '',
            ];

            $changeStatus = $this->studentRepository->update($request->input('id'), $studentStatus);
            if ($changeStatus) {
                return redirect()->route('student.change_status')->with('message', 'Status changed successfully.');
            }
            return redirect()->route('student.change_status')->with('error', 'Failed to update.');
        }
    }

    /**
     * Display the student's details.
     */
    public function details(int $id): Response
    {
        $student = $this->studentRepository->getStudentDetailsData($id);

        $student->loadMissing(['classroomStudent.classroom', 'guardians']);

        if (!empty($student->classroomStudent->academic_year_id)) {
            $promotedAcademicYearId = $student->classroomStudent->academic_year_id;
        } else {
            $promotedAcademicYearId = $student->academic_year_id;
        }

        // $classroomData = $this->classroomRepository->getActiveNameAndId();
        $fatherUserId = $this->guardianRepository->getParentByStudentId($id);
        $fatherUserData = $this->userRepository->getById($fatherUserId->user_id);

        $stuSiblingData = $this->studentRepository->getActiveNameAndIdWithoutSame($id);
        $classNamesData = $this->classroomRepository->getActiveNameAndId($promotedAcademicYearId);
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameAndIdOfEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();

        $stuSibling = $stuSiblingData->map(fn($sibling) => ['id' => $sibling->id, 'title' => getCocatenationTitle($sibling->first_name, $sibling->middle_name, $sibling->last_name)])->all();
        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();

        //guardians
        $fatherData = array();
        $motherData = array();
        $guardianData = array();

        if (!empty($student->guardians)) {
            foreach ($student->guardians as $guardian) {

                if ($guardian['guardian_type'] === 'Father') {
                    $fatherData = $guardian;
                } elseif ($guardian['guardian_type'] === 'Mother') {
                    $motherData = $guardian;
                } else {
                    $guardianData = $guardian;
                }
            }
        }

        // types
        $statusType = StudentStatus::cases();
        $status = array();
        foreach ($statusType as $sType) {
            array_push($status, ['id' => $sType->value, 'title' => $sType->value]);
        }

        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
        }

        $casteType = CasteType::cases();
        $casteArr = array();
        foreach ($casteType as $cType) {
            array_push($casteArr, ['id' => $cType->value, 'title' => $cType->value]);
        }

        $subCasteType = SubCasteType::cases();
        $subCasteArr = array();
        foreach ($subCasteType as $scType) {
            array_push($subCasteArr, ['id' => $scType->value, 'title' => $scType->value]);
        }

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $accountType = AccountType::cases();
        $accountArr = array();
        foreach ($accountType as $aType) {
            array_push($accountArr, ['id' => $aType->value, 'title' => $aType->value]);
        }

        return Inertia::render('Student/Details', [
            // 'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            // 'status' => session('status'),
            'student' => $student,
            'fatherData' => $fatherData,
            'motherData' => $motherData,
            'guardianData' => $guardianData,
            'classNames' => $classNames,
            'houses' => $houses,
            'status' => $status,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'casteArr' => $casteArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'subCasteArr' => $subCasteArr,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'states' => $states,
            'fatherUserData' => $fatherUserData,
            'stuSibling' => [],
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(string $id): RedirectResponse
    {
        $student = $this->studentRepository->getById($id);
        $bankAccount = $this->bankAccountRepository->getByStudentId($id);
        $house = $this->studentHouseRepository->getByStudentId($id);
        $guardian = $this->guardianRepository->getByStudentId($id);
        $category = $this->categoryRepository->getByStudentId($id);

        if (!$student) {
            return redirect()->route('student.list')->with('errors', 'Something goes wrong.');
        }

        if (!empty($bankAccount->id)) {
            $this->bankAccountRepository->delete($bankAccount->id);
        }

        if (!empty($house->id)) {
            $this->studentHouseRepository->delete($house->id);
        }
        if (!empty($guardian->id)) {
            $this->guardianRepository->delete($guardian->id);
        }
        if (!empty($category->id)) {
            $this->categoryRepository->delete($category->id);
        }

        $this->studentRepository->delete($id);
        return redirect()->route('student.list')->with('message', 'Student deleted successfully.');
    }

    /**
     * Display the schools.
     */
    public function birthdayList(Request $request): Response
    {
        $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        $months = array_map(function ($month) {
            return [
                'id' => $month,
                'title' => $month,
            ];
        }, $monthNames);

        $students = [];

        if ($request->isMethod('POST')) {
            $birthDate =  !empty($request->birth_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('birth_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
            $birthMonth = $request->birth_month ?? "";

            $students = $this->studentRepository->getBirthDateWiseStudents($birthDate, $birthMonth);

            if (count($students) > 0) {
                $students =  $students->map(function ($student) {
                    $studentName = $student?->first_name . " " . $student?->middle_name . " " . $student?->last_name;
                    $fatherName = $student?->father?->first_name . " " . $student?->father?->middle_name . " " . $student?->father?->last_name;
                    $birthDate = !empty($student->birth_date_at) ? Carbon::parse($student->birth_date_at)->format('d-M') : "";

                    return [
                        'id' => $student->id,
                        'name' => $studentName,
                        'class_title' => $student?->classroom?->title,
                        'birth_date' => $birthDate,
                        'father_name' => $fatherName,
                        'father_phone' => $student?->father?->phone,
                    ];
                });
            }
        }

        return Inertia::render('Student/BirthdayList', [
            'students' => $students,
            'months' => $months,
        ]);
    }


    /**
     * Display updateDetails form
     */
    public function updateDetails(Request $request): Response
    {
        $students = [];
        // $students = $this->studentRepository->getListForUpdated();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();

        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();

        $genderType = Gender::cases();
        $genderArr = array();

        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $classNames = $this->classroomRepository->getActiveClassNameAll();
        $classrooms = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $classroomId = $request->classroom_id ?? null;
            $searchValue = $request->search_query ?? "";

            if (!empty($classNameId)) {
                $classrooms = $this->classroomRepository->getActiveNameAndIdByClassNameId($classNameId);
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getListForUpdatedByClassroomId($classroomId, $searchValue);
            }
        }

        return Inertia::render('Student/UpdateDetails', [
            'students' => $students,
            'genders' => $genderArr,
            'houses' => $houses,
            'categories' => $categories,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
        ]);
    }


    /**
     * updateDetailsSave
     */
    public function updateDetailsSave(Request $request)
    {
        $data = $request->all();
        $filteredData = array_filter($data, function ($entry) {
            return $entry['is_checked'] === true;
        });
        // dd($filteredData);
        if (empty($filteredData)) {
            return redirect()->route('student.update_details')->with('error', 'Select at least one row to update.');
        }
        if (!empty($filteredData)) {
            foreach ($filteredData as $fData) {
                //student data
                if (!empty($fData['id'])) {
                    $studentDataArray = [
                        'gender' => $fData['gender'],
                        'aadhar_card_no' => $fData['aadhar_card_no'],
                        'birth_date_at' => !empty($fData['birth_date_at']) ? \Carbon\Carbon::parse($fData['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
                        'admission_date_at' => !empty($fData['admission_date_at']) ? \Carbon\Carbon::parse($fData['admission_date_at'])->format('Y-m-d') : date('Y-m-d'),
                        'remark' => $fData['remark'] ?? null,
                    ];
                    $this->studentRepository->update($fData['id'], $studentDataArray);
                }

                // category data
                if (!empty($fData['student_category_id']) && is_numeric($fData['category_id'])) {
                    $catDataArray = [
                        'category_id' => $fData['category_id'],
                    ];
                    $this->categoryRepository->updateStudent($fData['student_category_id'], $catDataArray);
                }

                // house data
                if (!empty($fData['student_house_id']) && is_numeric($fData['house_id'])) {
                    $houseDataArray = [
                        'house_id' => $fData['house_id'],
                    ];
                    $this->studentHouseRepository->update($fData['student_house_id'], $houseDataArray);
                }

                // house data
                if (!empty($fData['student_father_id'])) {
                    $fatherDataArray = [
                        'phone' => $fData['father_phone'],
                        'sms_phone' => $fData['father_sms_phone'],
                    ];
                    $this->guardianRepository->update($fData['student_father_id'], $fatherDataArray);
                }
            }
            return redirect()->route('student.update_details')->with('message', 'Student updated successfully.');
        }
    }


    /**
     * Display upgrade form
     * */

    public function upgrade(Request $request)
    {

        $students = [];
        $classroomStudents = [];
        $academicYearId = '';
        $classroomId = '';
        $targetAcademicYearId = '';
        $targetClassroomId = '';
        $classroomUpgradeStudents = [];

        if ($request->isMethod('post')) {
            // source
            $academicYearId = $request->input('academic_year_id') ?? '';
            $classroomId = $request->input('classroom_id') ?? '';

            // target
            $targetAcademicYearId = $request->input('target_academic_year_id') ?? '';
            $targetClassroomId = $request->input('target_classroom_id') ?? '';

            $classroomStudents = $this->studentRepository->getUpgradeStudents($academicYearId, $classroomId);

            // student allocated transport details
            $classroomStudents?->transform(function ($classroomStudent) use ($academicYearId) {
                $classroomStudent?->student?->loadMissing(['currentAllocateTransport' => function ($query) use ($academicYearId) {
                    $query->where('academic_year_id', $academicYearId);
                }]);

                $allocateTransport = $classroomStudent?->student?->currentAllocateTransport;
                $transportDetailsData = null;
                $isTransportAllocated = false;

                if ($allocateTransport != null) {
                    $transportDetailsData = $this->getStudentTransportData($allocateTransport);

                    $isTransportAllocated = true;
                }

                unset($classroomStudent['student']['currentAllocateTransport']);

                $classroomStudent['student']['allocate_transport'] = $transportDetailsData;
                $classroomStudent['student']['is_transport_allocated'] = $isTransportAllocated;

                return $classroomStudent;
            });

            $upgradeStudents = $classroomStudents->map(fn($std) => $std->student_id)->all();

            $students = $this->studentRepository->getListForUpgrade($academicYearId, $classroomId, $upgradeStudents);

            // student allocated transport details
            $students?->loadMissing(['currentAllocateTransport' => function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId);
            }]);

            $students?->transform(function ($student) {
                $allocateTransport = $student?->currentAllocateTransport;
                $transportDetailsData = null;
                $isTransportAllocated = false;

                if ($allocateTransport != null) {
                    $transportDetailsData = $this->getStudentTransportData($allocateTransport);

                    $isTransportAllocated = true;
                }

                unset($student['currentAllocateTransport']);

                $student['allocate_transport'] = $transportDetailsData;
                $student['is_transport_allocated'] = $isTransportAllocated;

                return $student;
            });

            $classroomUpgradeStudents = $this->studentRepository->getListForClassroomStudent($targetAcademicYearId, $targetClassroomId);
        }

        $academicSessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $academicSessionData->map(fn($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        $classroomsData = $this->classroomRepository->getActiveNameAndIdNotAcy();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'academic_year_id' => $classroom->academic_year_id])->all();

        return Inertia::render('Student/UpgradeShow', [
            'academicYearId' => $academicYearId,
            'academicSession' => $academicSession,
            'classrooms' => $classrooms,
            'classroomStudents' => $classroomStudents,
            'students' => $students,
            'classroomUpgradeStudents' => $classroomUpgradeStudents,
        ]);
    }

    /*
    *   get student transport details data
    */
    protected function getStudentTransportData(object $allocateTransport)
    {
        return [
            'route_name' => $allocateTransport?->transportRoute?->name,
            'transport_type' => $allocateTransport?->transport_type,
            'vehicle_type' => $allocateTransport?->transportRoute?->vehicle?->type,
            'driver_name' => $allocateTransport?->transportRoute?->vehicle?->driver?->first_name . ' ' . $allocateTransport?->transportRoute?->vehicle?->driver?->last_name,
            'driver_mobile' => $allocateTransport?->transportRoute?->vehicle?->driver?->contact,
            'applied_on_date_at' => $allocateTransport?->applied_on_date_at,
            'start_from_date' => $allocateTransport?->start_from_date,
            'vehicle_number' => $allocateTransport?->transportRoute?->vehicle?->vehicle_number,
            'conductor_name' => $allocateTransport?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $allocateTransport?->transportRoute?->vehicle?->conductor?->last_name,
            'conductor_mobile' => $allocateTransport?->transportRoute?->vehicle?->conductor?->contact,
            'transport_fee' => $allocateTransport?->amount,
            'timing' => $allocateTransport?->transportStoppage?->pickup_time_at,
        ];
    }

    /**
     * upgradeSave
     * */

    public function upgradeSave(ClassroomStudentRequest $request)
    {
        $input = $request->validated();

        $students = $input['selected_student'];
        $academicYearId = $input['target_academic_year_id'] ?? '';
        $classroomId = $input['target_classroom_id'] ?? '';
        $classNameId = $this->classroomRepository->getClassNameIdFromClassId($classroomId);

        if (!empty($students)) {
            DB::beginTransaction();

            try {
                foreach ($students as $student) {
                    $dataArr = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYearId,
                        'class_name_id' => $classNameId,
                        'classroom_id' => $classroomId,
                        'student_id' => $student['student_id'],
                        'academic_year_id_from' => $input['academic_year_id'],
                        'classroom_id_from' => $input['classroom_id'],
                        'promoted_date_at' => now(),
                        'user_id' => Auth::user()->id,
                        'status' => Status::ACTIVE->value,
                    );

                    $classroomStudents = $this->studentRepository->createClassroomStudent($dataArr);

                    // update student
                    $this->studentRepository->update(
                        $student['student_id'],
                        ['student_status' => StudentStatus::PROMOTED->value]
                    );

                    // fee setting
                    $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

                    // assign fee to student
                    if ($isFeeStructureWithTemplate == "No") {
                        $classroom = $this->classroomRepository->getClassroomByIdAndAcademicYearId($classroomId, $academicYearId);

                        if ($classroom != null && $classroom?->class_name_id != null) {
                            $classNameId = $classroom?->class_name_id;
                            $feeStructure = $this->feeStructureRepository->getByClassNameIdAndAcademicYearId($classNameId, $academicYearId);
                            if ($feeStructure != null) {
                                $this->assignFeeToUpgradedStudent($student['student_id'], $classNameId, $academicYearId, $feeStructure?->id);
                            }
                        }
                    }

                    // transport fee setting
                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                    // assign transport fee to student
                    if ($transportFeeStructureSetting != null) {
                        // assign current transport fee to upgraded session
                        $this->assignStudentTransportFeeToUpgradedSession($student['student_id'], $input['academic_year_id'], $academicYearId, $classroomId);
                    }
                }

                DB::commit();

                if (!empty($classroomStudents)) {
                    return redirect()->route('student.upgrade')->with('message', 'Student upgrade successfully');
                }
            } catch (\Throwable $th) {
                DB::rollBack();

                return redirect()->back()->with('error', 'Something goes wrong.');
            }
        }
    }

    /*
    *  assign fee to new student
    */
    protected function assignFeeToUpgradedStudent($studentId, $classNameId, $academicYearId, $feeStructureId = null)
    {
        // $student = $this->studentRepository->getByStudentId($studentId);
        $student = $this->studentRepository->getById($studentId);

        if ($student != null) {

            $disallowStructureToEwsStudent = getSiteSettingData('fee_is_disallow_structure_to_ews_student')?->value ?? "No";

            if ($disallowStructureToEwsStudent == "No" || ($disallowStructureToEwsStudent == "Yes" && $student?->is_economically_weaker != true)) {
                $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

                $feeStructure = null;

                if ($isFeeStructureWithTemplate === "Yes" && !empty($feeStructureId) && !empty($classNameId)) {
                    $feeStructure = $this->feeStructureRepository->getByIdAndClassNameIdAndAcademicYearId($feeStructureId, $classNameId);
                }

                if ($isFeeStructureWithTemplate === "No" && !empty($classNameId)) {
                    $feeStructure = $this->feeStructureRepository->getByClassNameIdAndAcademicYearId($classNameId, $academicYearId);
                }

                DB::transaction(function () use ($feeStructure, $student, $academicYearId) {
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
                                        'academic_year_id' => $academicYearId,
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

    /*
    *  assign current transport fee to upgraded session
    */
    protected function assignStudentTransportFeeToUpgradedSession($studentId, $previousAcademicYearId, $academicYearId, $classroomId)
    {
        // previous session transport allocation
        $allocateStudent = $this->transportRepository->getCurrentAllocateTransportByStudentId($studentId, null, $previousAcademicYearId);

        if ($allocateStudent != null) {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'student_id' => $studentId,
                'classroom_id' => $classroomId,
                'transport_stoppage_id' => $allocateStudent->transport_stoppage_id ?? null,
                'academic_year_id' => $academicYearId,
                'staff_id' => $allocateStudent->staff_id ?? null,
                'voucher_id' => $allocateStudent->voucher_id ?? null,
                'fee_id' => $allocateStudent->fee_id ?? null,
                'allocation_type' => $allocateStudent?->allocation_type,
                'transport_route_id' => $allocateStudent->transport_route_id ?? null,
                'allocate_type_for' => $allocateStudent->allocate_type_for ?? null,
                'applied_on_date_at' => date('Y-m-d'),
                'is_current' => true,
                'transport_type' => $allocateStudent->transport_type ?? null,
                'amount' => $allocateStudent->amount ?? null,
                'status' => Status::ACTIVE->value ?? null,
            ];

            // create student transport allocation
            $this->transportRepository->createAllocateTransport($dataArray);
        }
    }
    /**
     * Display changeClass form
     * */
    public function changeClass()
    {
        $classRoomId = !empty($_GET['class_room_id']) ? $_GET['class_room_id'] : '';
        $searchValue = !empty($_GET['search_query']) ? $_GET['search_query'] : '';

        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        $changeStudents = $this->studentRepository->getListForChangeClass($classRoomId, $searchValue);
        $selectedStudent = $this->studentRepository->getListForChangeClassSelected();

        return Inertia::render('Student/ChangeClass', [
            'classrooms' => $classrooms,
            'changeStudents' => $changeStudents,
            'classroom_id' => $classRoomId,
            'session_year' => getAcademicYear(),
            'selectedStudent' => $selectedStudent,
            'searchValue' => $searchValue,
        ]);
    }

    /**
     * updateChangeClass
     * */

    public function updateChangeClass(Request $request)
    {
        $data = $request->all();
        $filteredData = array_filter($data, function ($entry) {
            return $entry['is_checked'] === true;
        });

        if (empty($filteredData)) {
            return redirect()->route('student.change_class')->with('error', 'Select at least one student.');
        }
        if (!empty($filteredData)) {
            foreach ($filteredData as $fData) {
                //student data
                if (!empty($fData['id'])) {
                    $studentDataArray = [
                        'is_class_change' => true,
                    ];
                    $this->studentRepository->update($fData['id'], $studentDataArray);
                }
            }
            return redirect()->route('student.change_class');
        }
    }


    /**
     * updateChangeClass
     * */

    public function updateSelectedStudent(Request $request)
    {
        $data = $request->all();

        $filteredData = array_filter($data, function ($item) {
            return $item !== null && $item['classroom_id'] != null;
        });

        if (empty($filteredData)) {
            return redirect()->route('student.change_class_update')->with('error', 'Select at least one student.');
        }
        DB::beginTransaction();

        try {
            if (!empty($filteredData)) {
                foreach ($filteredData as $sData) {
                    // new code
                    $student = $this->studentRepository->getStudentByIdForChangeClass($sData['id']);
                    $className = $this->classroomRepository->getClassNameByClassroomId($sData['classroom_id']);
                    $student->loadMissing(['classroomPromotedStudents' => function ($query) {
                        $query->whereNotNull('academic_year_id_from')
                            ->whereNotNull('classroom_id_from')
                            ->where('academic_year_id', getAcademicYearId());
                    }]);

                    if ($student != null && $className != null) {
                        if (
                            $student?->promotedClassroom == null ||
                            ($student?->promotedClassroom != null && $student?->classroomPromotedStudents?->count() == 0)
                        ) {
                            $student->update([
                                'is_class_change' => false,
                                'classroom_id' => $sData['classroom_id'],
                                'class_name_id' => $className?->id,
                            ]);

                            $dataArray = [
                                'classroom_id' => $sData['classroom_id'],
                                'class_name_id' => $className?->id,
                            ];

                            $this->studentRepository->updateNewClassroomStudentClass($sData['id'], $dataArray);
                        } else {
                            $dataArray = [
                                'classroom_id' => $sData['classroom_id'],
                                'class_name_id' => $className?->id,
                            ];

                            $this->studentRepository->updateClassroomStudentClass($sData['id'], $dataArray);

                            $sDataArray = [
                                'is_class_change' => false,
                            ];

                            $this->studentRepository->update($sData['id'], $sDataArray);
                        }
                    }

                    // old code
                    //student data
                    // if (!empty($sData['id'])) {
                    //     $sDataArray = [
                    //         'is_class_change' => false,
                    //         'classroom_id' => $sData['classroom_id'],
                    //     ];
                    //     $this->studentRepository->update($sData['id'], $sDataArray);
                    // }
                }
            }

            DB::commit();

            return redirect()->route('student.change_class_update')->with('message', 'Student class change successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            throw $th;

            return redirect()->route('student.change_class_update')->with('error', 'Something goes wrong.');
        }
    }


    // change section
    public function changeSection()
    {
        $classRoomId = !empty($_GET['class_room_id']) ? $_GET['class_room_id'] : null;
        $searchValue = !empty($_GET['search_query']) ? $_GET['search_query'] : null;
        $sections = array();

        if (!empty($classRoomId)) {
            $classNameData = $this->classroomRepository->getById($classRoomId);
            if (!empty($classNameData->class_name_id)) {
                $sections = $this->classroomRepository->getClassroomFromClassNameId($classNameData->class_name_id, $classRoomId);
            }
        }

        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();
        $changeStudents = $this->studentRepository->getListForChangeClass($classRoomId, $searchValue);
        $selectedStudent = $this->studentRepository->getListForChangeClassSelected();

        return Inertia::render('Student/ChangeSection', [
            'classrooms' => $classrooms,
            'changeStudents' => $changeStudents,
            'classroom_id' => $classRoomId,
            'session_year' => getAcademicYear(),
            'selectedStudent' => $selectedStudent,
            'searchValue' => $searchValue,
            'sections' => $sections,
        ]);
    }

    /**
     * updateChangeClass
     * */

    public function updateChangeSection(Request $request)
    {
        $sectionId = !empty($_GET['sectionId']) ? $_GET['sectionId'] : null;

        if (empty($sectionId)) {
            return redirect()->back()->with('error', 'Select section.');
        }

        $data = $request->all();

        $filteredData = array_filter($data, function ($item) {
            return isset($item['is_checked']) && $item['is_checked'] === true;
        });


        if (empty($filteredData)) {
            return redirect()->back()->with('error', 'Select at least one student.');
        }

        DB::beginTransaction();

        try {
            if (!empty($filteredData)) {
                foreach ($filteredData as $sData) {
                    //student data
                    if (!empty($sData['id'])) {
                        // new code
                        $student = $this->studentRepository->getStudentByIdForChangeClass($sData['id']);

                        if ($student != null) {
                            $student->loadMissing(['classroomPromotedStudents' => function ($query) {
                                $query->whereNotNull('academic_year_id_from')
                                    ->whereNotNull('classroom_id_from')
                                    ->where('academic_year_id', getAcademicYearId());
                            }]);

                            if (
                                $student?->promotedClassroom == null ||
                                ($student?->promotedClassroom != null && $student?->classroomPromotedStudents?->count() == 0)
                            ) {
                                $student->update([
                                    'classroom_id' => $sectionId,
                                ]);

                                $dataArray = [
                                    'classroom_id' => $sectionId,
                                ];

                                $this->studentRepository->updateNewClassroomStudentClass($sData['id'], $dataArray);
                            } else {
                                $dataArray = [
                                    'classroom_id' => $sectionId,
                                ];

                                $this->studentRepository->updateClassroomStudentClass($sData['id'], $dataArray);
                            }
                        }

                        // old code
                        // $sDataArray = [
                        //     'classroom_id' => $sectionId,
                        // ];

                        // $this->studentRepository->update($sData['id'], $sDataArray);
                    }
                }
            }
            DB::commit();

            return redirect()->back()->with('message', 'Student class change successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * updateChangeClass
     * */

    public function updateSelectedStudentSection(Request $request)
    {
        $data = $request->all();
        $filteredData = array_filter($data, function ($item) {
            return $item !== null;
        });

        if (empty($filteredData)) {
            return redirect()->route('student.change_section_update')->with('error', 'Select at least one student.');
        }
        if (!empty($filteredData)) {
            foreach ($filteredData as $sData) {
                //student data
                if (!empty($sData['id'])) {
                    $sDataArray = [
                        'is_class_change' => false,
                        'classroom_id' => $sData['classroom_id'],
                    ];
                    $this->studentRepository->update($sData['id'], $sDataArray);
                }
            }
            return redirect()->route('student.change_section_update')->with('message', 'Student class change successfully.');
        }
    }

    /**
     * change duration student list
     * */

    public function changeDuration(Request $request)
    {
        $classRoomId = !empty($_GET['class_room_id']) ? $_GET['class_room_id'] : null;
        $searchValue = !empty($_GET['search_query']) ? $_GET['search_query'] : null;

        $students = $this->studentRepository->getListForChangeDuration($classRoomId, $searchValue);
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('Student/ChangeDuration', [
            'students' => $students,
            'classrooms' => $classrooms,
            'searchValue' => $searchValue,
            'classroom_id' => $classRoomId,
        ]);
    }

    /**
     * change duration student list
     **/
    public function changeDurationUpdate(Request $request)
    {
        $input = $request->all();
        $dataArray = [
            'start_date_at' => isset($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : null,
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : null,
            'extension_date_at' => !empty($input['extension_date_at']) ? \Carbon\Carbon::parse($input['extension_date_at'])->format('Y-m-d') : null,
        ];
        $this->studentRepository->update($input['id'], $dataArray);
    }

    /**
     * get student by class room id
     * */
    public function getStudentNameIdByClassroomId(Request $request)
    {
        $classroomId = $request->input('id');
        if (!empty($classroomId) && is_numeric($classroomId)) {
            $studentData = $this->studentRepository->getStudentNameIdByClassroomId($classroomId);
            $studentNames = $studentData->map(fn($student) => ['id' => $student->id, 'title' => $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name])->all();
            return redirect()->back()->with([
                'customData' => $studentNames
            ]);
        }
    }

    /**
     * get student by class room id
     * */
    public function getStudentInfoForSale(Request $request)
    {
        $studentId = $request->input('id');
        if (!empty($studentId) && is_numeric($studentId)) {
            $studentData = $this->studentRepository->getStudentInfoForSale($studentId);
            return redirect()->back()->with([
                'customData2' => $studentData
            ]);
        }
    }

    /**
     * Display upgrade form
     */
    public function makeInactive(Request $request)
    {
        $students = [];
        $student = null;
        $feeInstallments = [];
        $classroomId = null;
        // $timezone = config('app.timezone');

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? null;
            $studentId = $request->input('student_id') ?? null;
            $admissionNo = $request->input('admission_no') ?? "";
            $reason = $request->input('reason') ?? '';
            $statusDate = !empty($request->input('custom_date_at')) ? $request->input('custom_date_at') : '';
            // //$teststatusDate = !empty($request->input('status_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('status_date_at'))->toDateString() : '';
            // //$teststatusDate2 = !empty($request->input('status_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('status_date_at'))->timezone($timezone)->toDateString() : '';

            if (!empty($admissionNo) && empty($studentId)) {
                $student = $this->studentRepository->getStudentByAdmissionNo($admissionNo);
            }

            if (!empty($studentId)) {
                $student = $this->studentRepository->getStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing([
                    'classroom:id,title',
                    'father:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                    'mother:id,student_id,guardian_type,first_name,middle_name,last_name,phone',
                    'promotedClassroom'
                ]);

                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                $classroomId = $student?->classroom_id;
                $studentId = $student?->id;

                $student->loadMissing([
                    'classroomRoll' => function ($query) use ($classroomId) {
                        $query->where('classroom_id', $classroomId);
                    },
                ]);
            }

            if (!empty($studentId)) {
                if ($request?->type == 'filter_student') {
                    //get student fee installments
                    $feeInstallments = $this->getFeeInstallmentsByStudentId($studentId);
                }

                if ($request?->type != 'filter_student' && !empty($reason) && !empty($statusDate)) {
                    $changeStatus = $this->studentRepository->update(
                        $studentId,
                        [
                            'status_date_at' => $statusDate,
                            'reason' => $reason,
                            'status' => Status::INACTIVE->value,
                        ]
                    );


                    if (!empty($changeStatus)) {
                        $student = null;

                        // return redirect()->route('student.make_inactive')->with('message', 'Status change successfully');
                    }
                }
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query)  use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }
        }

        // get classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('Student/MakeInactive', [
            'classrooms' => $classrooms,
            'students' => $students,
            'classroomId' => $classroomId,
            'student' => $student,
            'feeInstallments' => $feeInstallments
        ]);
    }

    /*
    * save student fee nullify
    */
    public function nullifyStudentFee(NullifyStudentFeeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $studentFeeInstallments = $this->classFeeStudentAmountRepository->getFeeStructureByStudentIdAndFeeIds($input['student_id'], $input['fee_ids']);

            if ($studentFeeInstallments->count() > 0) {
                $dataArray = [
                    'school_id' =>  getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'created_by' => auth()->user()->id,
                    'student_id' => $input['student_id'],
                    // 'nullify_date' => Carbon::parse($input['status_date_at'])->format('Y-m-d'),
                    'nullify_date' => !empty($request->input('status_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('status_date_at'))->timezone(getSchoolTimeZone())->toDateString() : '',
                    'nullify_reason' => $input['reason'],
                    'status' => Status::ACTIVE,
                ];

                $nullifyFee = $this->nullifyFeeRepository->create($dataArray);

                foreach ($studentFeeInstallments as $feeInstallment) {
                    if (
                        (
                            $feeInstallment->payment == null ||
                            ($feeInstallment->payment != null && $feeInstallment->payment->payment_status != PaymentStatus::PAID->value)
                        ) && $feeInstallment->nullify_fee == null
                    ) {
                        $fee_amount = $feeInstallment->semester != null ? (float) $feeInstallment->amount * $feeInstallment->semester : (float) $feeInstallment->amount;

                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;

                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;

                        if ($feeInstallment->payment == null) {
                            $payable_amount = $fee_amount;
                        } else {
                            $payable_amount = $fee_amount - $discount_amount;
                        }

                        $nullified_amount = $payable_amount - $paid_amount;

                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'created_by' => auth()->user()->id,
                            'class_fee_student_amount_id' => $feeInstallment->id,
                            'nullify_fee_id' => $nullifyFee->id,
                            'student_id' => $input['student_id'],
                            'fee_id' => $feeInstallment->fee_id,
                            'fee_type_id' => $feeInstallment->fee_type_id,
                            'fee_amount' => $fee_amount,
                            'payable_amount' => $payable_amount,
                            'paid_amount' =>  $paid_amount,
                            'nullified_amount' => $nullified_amount,
                            'status' => Status::ACTIVE,
                        ];

                        $this->nullifyFeeRepository->createNullifyFeeAmount($dataArray);

                        if ($feeInstallment->payment != null) {
                            $feeInstallment->update([
                                'amount' => $paid_amount + $discount_amount,
                                'semester' => null,
                            ]);
                        } else {
                            $feeInstallment->delete();
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with(['message' => 'Fee nullified successfully.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with(['error' => 'Something goes wrong!']);
        }
    }

    /*
    *   get student fee installments
    */
    private function getFeeInstallmentsByStudentId(int $studentId)
    {
        $feeInstallmentsData = [];
        $studentFeeDiscounts = $this->studentFeeDiscountRepository->getStudentFeeDiscountsByStudentId($studentId);
        $feeInstallments = $this->classFeeStudentAmountRepository->getFeeInstallmentsByStudentId($studentId);

        if (count($feeInstallments) > 0) {
            foreach ($feeInstallments->groupBy('fee_id') as $feeInstallmentId => $groupedFeeInstallments) {
                $total_fee_amount = 0;
                $total_paid_amount = 0;
                $total_due_amount = 0;
                $total_discount_amount = 0;

                $paid_status_count = 0;
                $partial_status_count = 0;
                $due_status_count = 0;

                $feeTypeAmountDataArray = [];

                $hasPayment = $this->classFeeStudentAmountRepository->checkFeePayment($studentId, $feeInstallmentId);

                if (!$hasPayment) {
                    $fee = $groupedFeeInstallments->first()->fee;

                    $transportFeeStructureSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

                    // add transport fee in structure if transport fee setting set to fee
                    if ($transportFeeStructureSetting != null && $transportFeeStructureSetting?->value == 'fee') {
                        $currentAllocateTransport = $this->transportRepository->getStudentCurrentAllocateTransport($studentId, 'fee');
                        $previousAllocateTransport = $this->transportRepository->getStudentPreviousAllocateTransport($studentId, 'fee');
                        $deallocateTransport = $this->transportRepository->getStudentDeallocateTransport($studentId, 'fee');

                        if ($currentAllocateTransport != null || $previousAllocateTransport != null) {
                            if ($currentAllocateTransport != null) {
                                $currentAllocateFeeId = $currentAllocateTransport->fee_id;
                                $transportFeeAmount = (float) $currentAllocateTransport?->amount;
                            } else {
                                $currentAllocateFeeId = $previousAllocateTransport?->fee_id ?? "";
                                $transportFeeAmount = (float) $previousAllocateTransport?->amount ?? 0;
                            }

                            $allocateTransportFees = $this->feeRepository->getAllBetweenCurrentAllocateAndDeallocate(
                                $studentId,
                                $currentAllocateFeeId,
                                $deallocateTransport?->fee_id
                            );

                            if (count($allocateTransportFees) > 0) {
                                $transportFee = $this->feeTypeRepository->getTransportFeeType();

                                foreach ($allocateTransportFees as $allocateTransportFee) {
                                    if ($allocateTransportFee->id == $feeInstallmentId) {
                                        if ($transportFee != null) {
                                            $existedTransportFee = $groupedFeeInstallments->where('fee_type_id', $transportFee->id)->first();

                                            if ($existedTransportFee == null) {
                                                $newTransportFee = collect([
                                                    'id' => null,
                                                    'student_id' => $studentId,
                                                    'fee_id' => $feeInstallmentId,
                                                    'fee_type_id' =>  $transportFee->id,
                                                    'amount' =>  $transportFeeAmount,
                                                    'semester' => null,
                                                    'is_fee_special' => $transportFee->is_fee_special,
                                                    'is_extra_charge' => true,
                                                    'feeType' => $transportFee,
                                                    'fee' => $fee,
                                                    'payment' => null,
                                                    'nullify_fee' => null,
                                                ]);

                                                $groupedFeeInstallments->push($newTransportFee);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // add late fee in structure if late fine is available
                    $lateFee = $this->feeTypeRepository->getLateFeeType();

                    if ($lateFee != null) {
                        $existedLateFee = $groupedFeeInstallments->where('fee_type_id', $lateFee->id)->first();

                        if ($existedLateFee == null && ($fee->last_pay_date_at != null && Carbon::now()->format('Y-m-d') > $fee->last_pay_date_at)) {
                            $late_fee_amount = 0;

                            $lateFineType = getSiteSettingData("fee_late_fine_type")?->value;
                            // $lateFineStartDate = getSiteSettingData("fee_late_fine_start_date")?->value;
                            $lateFineStartDate = $fee->last_pay_date_at;
                            $lateFineAmount = getSiteSettingData("fee_late_fine_amount")?->value;

                            if ($lateFineType != null && ($lateFineAmount != null && $lateFineAmount > 0)) {
                                $currentDate = date("Y-m-d");
                                $daysDifference = floor((strtotime($currentDate) - strtotime($lateFineStartDate)) / (60 * 60 * 24));

                                if ($lateFineType == LateFineType::DAILY->value) {
                                    $late_fee_amount = (float) $lateFineAmount * $daysDifference;
                                } else if ($lateFineType == LateFineType::WEEKLY->value) {
                                    $weeksDifference = floor($daysDifference / 7);
                                    $late_fee_amount = (float) $lateFineAmount * ($weeksDifference <= 0 ? 1 : $weeksDifference);
                                } else if ($lateFineType == LateFineType::MONTHLY->value) {
                                    // Extract year and month from the start date
                                    list($startYear, $startMonth, $startDay) = explode("-", $lateFineStartDate);

                                    // Extract year and month from the current date
                                    list($currentYear, $currentMonth, $currentDay) = explode("-", $currentDate);

                                    // Calculate the difference in months
                                    $startMonths = ($startYear * 12) + $startMonth;
                                    $currentMonths = ($currentYear * 12) + $currentMonth;
                                    $monthsDifference = $currentMonths - $startMonths;

                                    $late_fee_amount = (float) $lateFineAmount * ($monthsDifference <= 0 ? 1 : $monthsDifference);
                                }
                            }

                            $newLateFee = collect([
                                'id' => null,
                                'student_id' => $studentId,
                                'fee_id' => $feeInstallmentId,
                                'fee_type_id' =>  $lateFee->id,
                                'amount' => $late_fee_amount,
                                'semester' => null,
                                'is_fee_special' => $lateFee->is_fee_special,
                                'is_extra_charge' => true,
                                'feeType' => $lateFee,
                                'fee' => $fee,
                                'payment' => null,
                                'nullify_fee' => null,
                            ]);

                            $groupedFeeInstallments->push($newLateFee);
                        }
                    }
                }

                // format fee installmnets data
                foreach ($groupedFeeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $total_fee_amount += $fee_amount;
                    $paid_amount = 0;
                    $status = PaymentStatus::DUE->value;

                    if (!empty($feeInstallment['payment'])) {
                        $status = $feeInstallment?->payment?->payment_status;
                    }

                    if (!empty($feeInstallment['fee_payments'])) {
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                    }

                    $discount_amount = 0;
                    $payable_amount = $fee_amount;
                    $due_amount = $fee_amount;
                    $discount_id = null;

                    if (!empty($feeInstallment['nullify_fee'])) {
                        $due_amount = 0;
                        $paid_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('paid_amount') ?? 0;
                        $payable_amount = $paid_amount;
                        $status = PaymentStatus::PAID->value;
                    } elseif (!empty($feeInstallment['payment'])) {
                        $discount_amount = (float) $feeInstallment?->fee_payments?->where('payment_status', '!=', PaymentStatus::CANCELLED->value)?->sum('discount_amount') ?? 0;
                        $due_amount = $fee_amount - $discount_amount - $paid_amount;
                        $payable_amount = $due_amount;
                    } elseif (count($studentFeeDiscounts) > 0) {
                        foreach ($studentFeeDiscounts as $discount) {
                            if ($discount->fee_id === $feeInstallment['fee_id'] && $discount->fee_type_id === $feeInstallment['fee_type_id']) {
                                if ($discount->is_discount_percentage) {
                                    $discount_amount = (float) ($discount->amount / 100) * ($feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount']);
                                } else {
                                    $discount_amount = (float) $discount->amount;
                                }

                                $due_amount = $fee_amount - $discount_amount - $paid_amount;
                                $discount_id = $discount?->discount_id;
                                $payable_amount = $fee_amount;
                            }
                        }
                    }

                    $due_amount = $fee_amount - $discount_amount - $paid_amount;

                    $total_paid_amount += $paid_amount;
                    $total_due_amount += $due_amount;
                    $total_discount_amount += $discount_amount;

                    $is_extra_charge = $feeInstallment['feeType']['installment_type'] == FeeInstallmentType::EXTRACHARGE->value;

                    if ($status == PaymentStatus::CANCELLED->value) {
                        $status = PaymentStatus::DUE->value;
                    }

                    if ($due_amount <= 0 && empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::DUE->value;
                    } else if ($due_amount <= 0) {
                        $status = PaymentStatus::PAID->value;
                    } else if ($due_amount > 0 && !empty($feeInstallment['payment'])) {
                        $status = PaymentStatus::PARTIAL->value;
                    }

                    $feeTypeAmountDataArray[] = [
                        'id' => $feeInstallment['id'],
                        'discount_id' => $discount_id,
                        'fee_id' => $feeInstallment['fee_id'],
                        'fee_type_id' => $feeInstallment['fee_type_id'],
                        'fee_type_title' => $feeInstallment['feeType']['fee_type'],
                        'amount' => $fee_amount,
                        'payable_amount' => $payable_amount,
                        'paid_amount' => $paid_amount,
                        'due_amount' => $due_amount,
                        'discount_amount' => $discount_amount,
                        'semester' => (int) $feeInstallment['semester'],
                        'is_fee_special' => $feeInstallment['is_fee_special'],
                        'is_extra_charge' =>  $is_extra_charge,
                        'payment_status' => $status,
                    ];

                    if (!isset($feeInstallmentsData[$feeInstallmentId]['fee'])) {
                        $feeInstallmentsData[$feeInstallmentId]['fee'] = [
                            'id' => $feeInstallment['fee_id'],
                            'title' => $feeInstallment['fee']['title'],
                        ];
                    }

                    // count payment status for each fee type
                    if ($status === PaymentStatus::PAID->value) {
                        $paid_status_count++;
                    } else if ($status === PaymentStatus::PARTIAL->value) {
                        $partial_status_count++;
                    } else {
                        $due_status_count++;
                    }
                }

                $total_payable_amount = $total_fee_amount - $total_discount_amount;

                // set payment status for fee installment
                if ($due_status_count == 0 && $partial_status_count == 0 && $paid_status_count > 0) {
                    $payment_status =  PaymentStatus::PAID->value;
                } else if ($partial_status_count > 0 || ($partial_status_count >= 0 && $paid_status_count > 0)) {
                    $payment_status = PaymentStatus::PARTIAL->value;
                } else {
                    $payment_status = PaymentStatus::DUE->value;
                }

                $feeInstallmentsData[$feeInstallmentId]['total_fee_amount'] = $total_fee_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_payable_amount'] = $total_payable_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_paid_amount'] = $total_paid_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_due_amount'] = $total_due_amount;
                $feeInstallmentsData[$feeInstallmentId]['total_discount_amount'] = $total_discount_amount;
                $feeInstallmentsData[$feeInstallmentId]['fee_type_amounts'] = $feeTypeAmountDataArray;
                $feeInstallmentsData[$feeInstallmentId]['payment_status'] = $payment_status;
            }
        }

        return $feeInstallmentsData;
    }

    //need to review and remove this code start
    public function getStudentsByClassroomId(Request $request)
    {
        $students = [];

        if ($request->classroom_id && !is_null($request->classroom_id)) {
            $students = $this->studentRepository->getStudentsByClassroomId($request->classroom_id);
        }

        return redirect()->back()->with([
            'studentsByClassroom' => $students
        ]);
    }
    //need to review and remove this code end

    /**
     * bulkWallet
     */
    public function bulkWallet(Request $request): Response
    {
        $boardingStudents = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->input('classroom_id') ?? null;

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getActiveBoardingStudents($classroomId);

                if (count($students) > 0) {
                    foreach ($students as $student) {
                        $creditAmount = $student?->studentWalletTransactions?->where('transaction_type', WalletTransactionType::CREDIT->value)?->sum('amount') ?? 0;
                        $debitAmount = $student?->studentWalletTransactions?->where('transaction_type', WalletTransactionType::DEBIT->value)?->sum('amount') ?? 0;
                        $walletAmount = $creditAmount - $debitAmount;

                        $boardingStudents[] = [
                            'id' => $student->id,
                            'admission_no' => $student->admission_no,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'first_name' => $student->first_name,
                            'middle_name' => $student->middle_name,
                            'last_name' => $student->last_name,
                            'father_first_name' => $student?->father?->first_name,
                            'father_middle_name' => $student?->father?->middle_name,
                            'father_last_name' => $student?->father?->last_name,
                            'wallet_amount' => $walletAmount <= 0 ? 0 : $walletAmount
                        ];
                    }
                }
            }
        }

        if (count($boardingStudents) > 0) {
            $boardingStudents = collect($boardingStudents)->sortBy('roll_no')->values()->toArray();
        }

        // classrooms
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('Inventory/BulkWallet', [
            'boardingStudents' => $boardingStudents,
            'classrooms' => $classrooms,
        ]);
    }

    /*
    * save bulk wallet
    */
    public function saveBulkWallet(BulkStudentWalletTransactionRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $transactionDate = !empty($input['transaction_date']) ?  Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['transaction_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

            foreach ($input['student_data'] as $studentData) {
                $student = $this->studentRepository->getBoardingStudentById($studentData['student_id']);

                $creditAmount = $student?->studentWalletTransactions?->where('transaction_type', WalletTransactionType::CREDIT->value)?->sum('amount') ?? 0;
                $debitAmount = $student?->studentWalletTransactions?->where('transaction_type', WalletTransactionType::DEBIT->value)?->sum('amount') ?? 0;
                $walletAmount = $creditAmount - $debitAmount;

                $deductionAmount  = $studentData['deduction_amount'] ?? 0;

                if ($deductionAmount > $walletAmount) {
                    return redirect()->back()->with('error', 'Deducted amount exceeds wallet amount');
                }

                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'student_id' => $studentData['student_id'],
                    'created_by' => auth()->user()->id,
                    'transaction_type' => WalletTransactionType::DEBIT,
                    'transaction_date' => $transactionDate,
                    'transaction_mode' => '',
                    'amount' => $deductionAmount,
                    'description' => $studentData['description'] ?? null,
                    'status' => Status::ACTIVE,
                ];

                $this->studentRepository->createStudentWalletTransaction($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Wallet amount deducted successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    public function getStudentByClassroomId(Request $request)
    {
        $classroom_id = $request->input('classroom_id');
        if ($classroom_id) {
            $students = $this->studentRepository->getStudentsByClassroomId($classroom_id)->map(function ($student) {
                return [
                    'id' => $student->id,
                    'title' => getCocatenationTitle($student?->first_name, $student?->middle_name, $student?->last_name,)
                ];
            });
        }
    }

    public function studentPdfPrint(int $id)
    {
        $student = null;
        $schoolData = [];

        if (!empty($id)) {
            $student = $this->studentRepository->getStudentByIdForPrint($id);
        }

        if ($student != null) {
            if (!empty($student['classroom'])) {
                unset($student['classroom']);
            }

            $student['classroom_id'] = $student?->promotedClassroom?->id;
            $student['classroom'] = $student?->promotedClassroom;

            $schoolData = !empty(getSiteSchoolData()) ? getSiteSchoolData() : null;

            if ($schoolData != null) {
                $schoolData = [
                    'academic_year' => getAcademicYear(),
                    'logo' => $schoolData->logo,
                    'title' => $schoolData->title,
                    'affiliation_no' => $schoolData->affiliation_no,
                    'phone' => $schoolData->phone,
                    'phone_2' => $schoolData->phone_2,
                    'mail' => $schoolData->mail,
                    'street_address' => $schoolData->street_address,
                ];
            }
        }

        $storage = Storage::disk('local');
        $storage->makeDirectory('tmp');

        $title =  Str::slug(__('Student Info'));
        $header =  view('pdf.empty_header')->render();
        $footer =  view('pdf.empty_footer')->render();

        $pdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font_size' => 16,
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
            'margin_bottom' => 5,
            'orientation' => 'P',
            'tempDir' => $storage->path('tmp'),
        ]);

        $pdf->PDFA = false;
        $pdf->use_kwt = true;
        $pdf->setAutoTopMargin = 'pad';
        $pdf->setAutoBottomMargin = 'pad';

        $pdf->SetTitle($title);
        $pdf->SetAuthor(config('app.name'));

        // if ($header) {
        //     $pdf->SetHTMLHeader($header);
        // }
        // if ($footer) {
        //     $pdf->SetHTMLFooter($footer);
        // }

        $pdf->writeHTML(view('pdf.student.student_print', ['schoolData' => $schoolData, 'student' => $student])->render());

        $pdfContent = $pdf->output();

        return response($pdfContent)->header('Content-Type', 'application/pdf');
    }
    

    //student Birthday Notification
    public function studentBirthdayNotification(StudentBirthdayNotificationRequest $request)
    {
        $input = $request->validated();
        $message = $input['message'];
        $students = $input['studentIds'] ?? [];
        $parrntsMails = [];

        if(!empty($students)) {
            $studentsUserEmails = $this->studentRepository->getStudentByIds($students)->map(function($student) {
                return $student?->father?->email;
            });
            
            $parrntsMails = array_unique(array_merge($parrntsMails, $studentsUserEmails->toArray()));
            
            dispatch(new studentBirthdayNotificationJob($parrntsMails, $message));
        }

        return redirect()->back()->with('message', 'Birthday Notification Send Successfully');
    }

    //student Birthday Sms
    public function studentBirthdaySms(StudentBirthdayNotificationRequest $request)
    {
        $input = $request->validated();
        $message = $input['message'];
        $students = $input['studentIds'];
        $parrentsSmsPhones = [];

        if(!empty($students)) {
            $studentsUserPhones = $this->studentRepository->getStudentByIds($students)->map(function($student) {
                return $student?->father?->sms_phone;
            });
            
            $parrentsSmsPhones = array_unique(array_merge($parrentsSmsPhones, $studentsUserPhones->toArray()));
            
            dispatch(new StudentBirthdaySmsJob($parrentsSmsPhones, $message));
        }

        return redirect()->back()->with('message', 'Birthday SMS Send Successfully');
    }


    /*
    * should be deleted
    *  create classroom student
    */
    // public function createClassroomStudent()
    // {
    //     DB::beginTransaction();

    //     try {
    //         $students = Student::select(
    //             'id',
    //             'school_id',
    //             'academic_year_id',
    //             'class_name_id',
    //             'classroom_id',
    //         )->get();


    //         if (count($students) > 0) {
    //             foreach ($students as $student) {
    //                 $attributesToCheck = [
    //                     'school_id' => $student->school_id,
    //                     'academic_year_id' => $student->academic_year_id,
    //                     'student_id' => $student->id,
    //                     'class_name_id' => $student->class_name_id,
    //                     'classroom_id' => $student->classroom_id,
    //                     'academic_year_id_from' => null,
    //                     'classroom_id_from' => null,
    //                     'promoted_date_at' => null,
    //                 ];

    //                 $valuesToUpdate = [
    //                     'user_id' => Auth::user()->id,
    //                     'status' => Status::ACTIVE
    //                 ];

    //                 ClassroomStudent::updateOrCreate($attributesToCheck, $valuesToUpdate);
    //             }
    //         }

    //         DB::commit();

    //         return redirect()->back()->with('message', 'Classroom student created successfully.');
    //     } catch (\Throwable $th) {
    //         DB::rollBack();

    //         throw $th;

    //         return redirect()->back()->with('error', 'Something goes wrong.');
    //     }
    // }
}
