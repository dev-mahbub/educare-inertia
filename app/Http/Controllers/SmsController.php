<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\ScholarBoardingType;
use App\Enums\CircularAudienceType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\IDriverRepository;
use App\Enums\CredentialSmsAudienceType;
use App\Http\Requests\SmsSettingRequest;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\SmsCircularRequest;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISmsSettingRepository;
use App\Repositories\ISmsCircularRepository;
use App\Repositories\IServiceOrderRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class SmsController extends Controller
{

    public function __construct(
        private ISmsSettingRepository $smsSettingRepository,
        private ISmsCircularRepository $smsCircularRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private IDriverRepository $driverRepository,
        private IServiceOrderRepository $serviceOrderRepository,
    ) {
        $this->middleware('permission:view sms settings', ['only' => ['index', 'smsSendList', 'smsCircular']]);
        $this->middleware('permission:add sms settings', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit sms settings', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete sms settings', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $smsSettings = $this->smsSettingRepository->getActiveAll();

        return Inertia::render('Sms/Show', [
            'smsSettings' => $smsSettings,
        ]);
    }

    /**
     * Display the schools.
     */
    public function smsSendList(Request $request): Response
    {
        $smsSettings = $this->smsSettingRepository->getActiveAll();

        return Inertia::render('Sms/SentList', [
            'smsSettings' => $smsSettings,
        ]);
    }

    /**
     *  Sms Circular
     */
    public function smsCircular(): Response
    {
        // template categories
        $templateCategories = [];

        // templates
        $templates = [];

        // audience types
        $audienceTypes = buildEnumOptionsArray(CircularAudienceType::cases());

        // audience attributes
        $audienceAttributes = $this->getAudienceAttributes();

        // sms circulars
        $smsCirculars = $this->smsCircularRepository->getActiveAll();

        return Inertia::render('Sms/SmsCircular', [
            'templateCategories' => $templateCategories,
            'templates' => $templates,
            'audienceTypes' => $audienceTypes,
            'audienceAttributes' => $audienceAttributes,
            'smsCirculars' => $smsCirculars,
        ]);
    }

    /**
     *  Save Sms Circular
     */
    public function saveSmsCircular(SmsCircularRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'template_category_id' => $input['template_category_id'] ?? null,
            'template_id' => $input['template_id'] ?? null,
            'title' => $input['title'] ?? '',
            'audience_type' => $input['audience_type'] ?? '',
            'content' => $input['content'] ?? '',
            'status' => Status::ACTIVE
        ];

        $smsCircular = $this->smsCircularRepository->create($dataArray);

        if (!$smsCircular) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Circular created successfully');
    }

    /**
     *  Update Sms Circular
     */
    public function updateSmsCircular(int $id, SmsCircularRequest $request): RedirectResponse
    {
        $smsCircular = $this->smsCircularRepository->getSmsCircularById($id);

        abort_if($smsCircular == null, 404);

        $input = $request->validated();

        $dataArray = [
            'template_category_id' => $input['template_category_id'] ?? null,
            'template_id' => $input['template_id'] ?? null,
            'title' => $input['title'] ?? '',
            'audience_type' => $input['audience_type'] ?? '',
            'content' => $input['content'] ?? '',
        ];

        $updateSmsCircular = $this->smsCircularRepository->update($id, $dataArray);

        if (!$updateSmsCircular) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Circular updated successfully');
    }

    /**
     *  Delete Sms Circular
     */
    public function deleteSmsCircular(int $id): RedirectResponse
    {
        $smsCircular = $this->smsCircularRepository->getSmsCircularById($id);

        abort_if($smsCircular == null, 404);

        $deleteSmsCircular = $this->smsCircularRepository->delete($id);

        if ($deleteSmsCircular) {
            return redirect()->back()->with('message', 'Circular deleted successfully');
        }

        return redirect()->back()->with('error', 'Something goes wrong');
    }

    /*
    * Helper method to get audience attributes
    */
    private function getAudienceAttributes()
    {
        return getAudienceAttributes();
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Sms/New', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(SmsSettingRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : 0,
            'board_id' => !empty($input['board_id']) ? intval($input['board_id']) : 0,
            'country_id' => !empty($input['country_id']) ? intval($input['country_id']) : 0,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : 0,
            'timezone_id' => !empty($input['timezone_id']) ? intval($input['timezone_id']) : 0,
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'status' => Status::ACTIVE,
        );

        $school = $this->smsSettingRepository->create();

        return Redirect::route('sms_setting.list');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Sms/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(SmsSettingRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // return Redirect::route('sms_setting.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /*
    * Sms Credit
    */
    public function smsCredits(Request $request): Response
    {
        // sms service orders
        $serviceOrders = $this->serviceOrderRepository->getActiveServiceOrdersByType('sms');

        if (count($serviceOrders) > 0) {
            $serviceOrders = $serviceOrders->map(function ($serviceOrder) {
                $serviceOrder['credited_on'] = !empty($serviceOrder->created_at) ? Carbon::parse($serviceOrder->created_at)->format('d-M-Y') : '';

                return $serviceOrder;
            });
        }

        return Inertia::render('Sms/SmsCredit', [
            'serviceOrders' => $serviceOrders
        ]);
    }

    /*
    * Sms Erp Credential
    */
    public function smsErpCredential(Request $request): Response
    {
        // audience types
        $audienceTypes = buildEnumOptionsArray(CredentialSmsAudienceType::cases());

        // boarding types
        $boardingTypes = buildEnumOptionsArray(ScholarBoardingType::cases());

        $classrooms = [];
        $teachers = [];
        $alumnies = [];
        $vehicleStaffs = [];
        $students = [];

        if ($request->isMethod('POST')) {
            $audienceType = $request->audience_type ?? "";

            if ($audienceType == CredentialSmsAudienceType::PARENTS->value) {
                $classroomId = $request->classroom_id ?? null;

                // classrooms
                $classrooms = $this->classroomRepository->getActiveAll();

                // students
                $students = $this->studentRepository->getStudentsForSmsCredentials($classroomId);

                if (count($students) > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student->promotedClassroom?->id;
                            $student->setRelation('classroom', $student->promotedClassroom);
                        }

                        $student['title'] = "Adm No: {$student->admission_no}, Name: {$student->first_name} {$student->middle_name} {$student->last_name}, Phone: {$student?->father?->phone}, Class: {$student?->classroom?->title}";

                        return $student;
                    });
                }
            } else if ($audienceType == CredentialSmsAudienceType::TEACHERS->value) {
                // teachers
                $teachers = $this->staffRepository->getActiveTeacherData();

                if (count($teachers) > 0) {
                    $teachers = $teachers->map(function ($teacher) {
                        $teacher['title'] = "{$teacher->first_name} {$teacher->middle_name} {$teacher->last_name} - {$teacher?->phone}";

                        return $teacher;
                    });
                }
            } else if ($audienceType == CredentialSmsAudienceType::ALUMNIES->value) {
                // alumnies
                $alumnies = $this->staffRepository->getActiveAlumniData();

                if (count($alumnies) > 0) {
                    $alumnies = $alumnies->map(function ($alumni) {
                        $alumni['title'] = "{$alumni->first_name} {$alumni->middle_name} {$alumni->last_name} - {$alumni?->phone}";

                        return $alumni;
                    });
                }
            } else if ($audienceType == CredentialSmsAudienceType::VEHICLE_STAFFS->value) {
                // vehicle staffs
                $vehicleStaffs = $this->driverRepository->getActiveAll();

                if (count($vehicleStaffs) > 0) {
                    $vehicleStaffs = $vehicleStaffs->map(function ($vehicleStaff) {
                        $vehicleStaff['title'] = "{$vehicleStaff->first_name} {$vehicleStaff->last_name} - {$vehicleStaff?->contact}";

                        return $vehicleStaff;
                    });
                }
            }
        }

        return Inertia::render('Sms/SmsErpCredential', [
            'audienceTypes' => $audienceTypes,
            'classrooms' => $classrooms,
            'students' => $students,
            'teachers' => $teachers,
            'boardingTypes' => $boardingTypes,
            'alumnies' => $alumnies,
            'vehicleStaffs' => $vehicleStaffs,
        ]);
    }

    /*
    * Sms App Credential
    */
    public function smsAppCredential(Request $request): Response
    {
        return Inertia::render('Sms/SmsAppCredential', []);
    }

    /*
    * Sms delivery summary
    */
    public function smsDeliverySummary(Request $request): Response
    {
        return Inertia::render('Sms/SmsDeliverySummary', []);
    }

    /*
    * Sms Circular generate
    */
    public function smsCircularGenerate(Request $request): Response
    {
        // sms circulars
        $smsCirculars = $this->smsCircularRepository->getActiveAll();

        // classrooms
        $classrooms = $this->classroomRepository->getActiveAll();

        // staff
        $staffs = $this->staffRepository->getActiveStaffData();

        $students = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                // students
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);

                if (count($students) > 0) {
                    $students->loadMissing(['father:id,student_id,guardian_type,first_name,middle_name,last_name']);
                }
            }
        }

        return Inertia::render('Sms/SmsCircularGenerate', [
            'smsCirculars' => $smsCirculars,
            'students' => $students,
            'staffs' => $staffs,
            'classrooms' => $classrooms
        ]);
    }
}
