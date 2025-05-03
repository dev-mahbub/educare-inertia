<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use App\Models\House;
use Inertia\Response;
use App\Enums\UserRole;
use App\Models\Student;
use App\Enums\CasteType;
use App\Models\Religion;
use App\Enums\AccountType;
use App\Enums\GuardianType;
use App\Enums\SubCasteType;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Enums\StaffRoleType;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Repositories\BankRepository;
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
use App\Repositories\ISchoolRepository;
use App\Repositories\StudentRepository;
use Illuminate\Support\Facades\Session;
use App\Repositories\CategoryRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ReligionRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\AdmissionRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\BloodGroupRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\ParentProfileRequest;
use App\Repositories\BankAccountRepository;
use App\Repositories\IBloodGroupRepository;
use App\Http\Requests\StudentSiblingRequest;
use App\Repositories\IBankAccountRepository;
use App\Repositories\StudentHouseRepository;
use App\Repositories\IAcademicYearRepository;
use App\Repositories\IStudentHouseRepository;
use App\Http\Requests\ClassroomStudentRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\StudentAdmissionRepository;
use App\Repositories\IStudentAdmissionRepository;

class ParentProfileController extends Controller
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
    ) {
        $this->_upload = new UploadFileController();
    }

    /**
     * Display parent's profile form.
     */
    public function edit(): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $parentData = null;

        if (in_array('Parent', $userRoles)) {
            $parentData = $this->guardianRepository->getFatherByUserId(auth()->user()->id);

            $parentData->loadMissing(['spouse' => function ($query) {
                $query->select(
                    'id',
                    'user_id',
                    'student_id',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'guardian_type',
                    'phone',
                    'email',
                    'highest_qualification',
                    'occupation',
                    'company_name',
                    'department',
                    'aadhar_card_no',
                    'pan_card_no',
                );
            }]);
        }

        $states = $this->stateRepository->getActiveNameAndId()
            ->map(fn ($state) => ['id' => $state->id, 'title' => $state->name])->all();

        return Inertia::render('ParentProfile/Edit', [
            'parentData' => $parentData,
            'states' => $states,
        ]);
    }

    /**
     * Update parent info
     */

    public function update(ParentProfileRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // father
            if (!empty($input['parent_id'])) {
                $fatherData = array(
                    'phone' => $input['phone'] ?? '',
                    'email' => $input['email'] ?? '',
                    'highest_qualification' => $input['highest_qualification'] ?? '',
                    'occupation' => $input['occupation'] ?? '',
                    'department' => $input['department'] ?? '',
                    'company_name' => $input['company_name'] ?? '',
                );
                $this->guardianRepository->update($input['parent_id'], $fatherData);
            }

            // mother
            if ($input['spouse_id']) {
                $motherData = array(
                    'phone' => $input['sp_phone'] ?? '',
                    'email' => $input['sp_email'] ?? '',
                    'highest_qualification' => $input['sp_highest_qualification'] ?? '',
                    'occupation' => $input['sp_occupation'] ?? '',
                    'department' => $input['sp_department'] ?? '',
                    'company_name' => $input['sp_company_name'] ?? '',
                );
                $this->guardianRepository->update($input['spouse_id'], $motherData);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }

    /*
    *  update session student id
    */
    public function updateSessionStudentId(Request $request)
    {
        $studentId = $request->student_id ?? null;

        setStudentId($studentId);
    }
}
