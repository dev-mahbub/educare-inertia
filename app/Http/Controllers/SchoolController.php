<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\School;
use App\Enums\DurationType;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use App\Http\Requests\SchoolRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\BoardRepository;
use App\Repositories\ImageRepository;
use App\Repositories\StateRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IBoardRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStateRepository;
use App\Repositories\SchoolRepository;
use App\Providers\RouteServiceProvider;
use App\Repositories\CountryRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\ISchoolRepository;
use Illuminate\Support\Facades\Artisan;
use App\Repositories\ICountryRepository;
use App\Repositories\TimezoneRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ITimezoneRepository;
use App\Http\Requests\SchoolUpdateRequest;
use App\Repositories\AcademicYearRepository;
use App\Repositories\IAcademicYearRepository;
use App\Repositories\IAccountGroupRepository;
use App\Repositories\SchoolSettingRepository;
use App\Repositories\ISchoolSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class SchoolController extends Controller
{
    private $_upload;

    public function __construct(
        private ISchoolRepository $schoolRepository,
        private ISchoolSettingRepository $schoolSettingRepository,
        private IImageRepository $imageRepository,
        private IStateRepository $stateRepository,
        private ICountryRepository $countryRepository,
        private ITimezoneRepository $timezoneRepository,
        private IBoardRepository $boardRepository,
        private IAcademicYearRepository $academicYearRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:add school settings', ['only' => ['setting', 'updateSetting']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request)
    {
        if (getIsSuperAdmin()) {
            $schools = $this->schoolRepository->getActiveAll();
            $schoolCounts = $this->schoolRepository->getSchoolCounts();
            $countries = $this->countryRepository->getActiveAll();
            $states = $this->stateRepository->getActiveAll();
            $states = $this->stateRepository->getActiveAll();
            $domain_name = env('DOMAIN_NAME', 'educarestudy.in');

            return Inertia::render('School/Show', [
                'schools' => $schools,
                'countries' => $countries,
                'states' => $states,
                'domain_name' => $domain_name,
                'schoolCounts' => $schoolCounts,
            ]);
            
        } else {
            return redirect()->route('configuration.list');
        }
    }

    /**
     * Display the Setup school.
     */
    public function setupSchool(Request $request): Response
    {
        return Inertia::render('SetupYourSchool/Show');
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request)
    {
        if (getIsSuperAdmin()) {
            $countryData = $this->countryRepository->getActiveNameAndId();
            $stateData = $this->stateRepository->getActiveNameAndId();
            $timezoneData = $this->timezoneRepository->getActiveNameAndId();
            $boardData = $this->boardRepository->getActiveNameAndId();
            $academicYearData = $this->academicYearRepository->getActiveAcademicYearAndId();

            $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
            $states = $stateData->map(fn($state) => [
                'id' => $state->id,
                'title' => $state->name,
                'country_id' => $state->country_id,
            ])->all();
            $timezones = $timezoneData->map(fn($timezone) => ['id' => $timezone->id, 'title' => $timezone->name])->all();
            $boards = $boardData->map(fn($board) => [
                'id' => $board->id,
                'title' => $board->title,
                'full_name' => $board->full_name,
            ])->all();
            $academicYears = $academicYearData->map(fn($year) => ['id' => $year->id, 'title' => $year->academic_session])->all();

            // duration type
            $durationType = DurationType::cases();
            $durations = array();
            foreach ($durationType as $duration) {
                array_push($durations, ['id' => $duration->value, 'title' => $duration->value]);
            }


            return Inertia::render('School/Create', [
                'timezones' => $timezones,
                'countries' => $countries,
                'states' => $states,
                'boards' => $boards,
                'durations' => $durations,
                'academicYears' => $academicYears
            ]);
        } else {
            return redirect()->route('configuration.list');
        }
    }

    /**
     * Update the user's profile information.
     */
    public function save(SchoolRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataSchool = array(
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : NULL,
            'title' => $input['school_name'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'school_key' => !empty($input['school_key']) ? $input['school_key'] : "",
            'teaser' => !empty($input['teaser']) ? $input['teaser'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'client_name' => !empty($input['client_name']) ? $input['client_name'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'fb_url' => !empty($input['fb_url']) ? $input['fb_url'] : "",
            'instagram_url' => !empty($input['instagram_url']) ? $input['instagram_url'] : "",
            'twitter_url' => !empty($input['twitter_url']) ? $input['twitter_url'] : "",
            'linkedin_url' => !empty($input['linkedin_url']) ? $input['linkedin_url'] : "",
            'youtube_url' => !empty($input['youtube_url']) ? $input['youtube_url'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'apple_app_url' => !empty($input['apple_app_url']) ? $input['apple_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'is_inactive' => !empty($input['is_inactive']) ? $input['is_inactive'] : FALSE,
            'status' => Status::ACTIVE,
        );
        $school = $this->schoolRepository->create($dataSchool);

        // school country
        if (!empty($school['id'])) {
            $countryArray = array(
                'school_id' => $school['id'],
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : NULL,
            );
            $this->schoolRepository->createCountry($countryArray);
        }

        // school state
        if (!empty($school['id'])) {
            $stateArray = array(
                'school_id' => $school['id'],
                'state_id' => !empty($input['state_id']) ? $input['state_id'] : NULL,
            );
            $this->schoolRepository->createState($stateArray);
        }

        // school time zone
        if (!empty($school['id'])) {
            $timeZoneArray = array(
                'school_id' => $school['id'],
                'timezone_id' => !empty($input['timezone_id']) ? $input['timezone_id'] : NULL,
            );
            $this->schoolRepository->createTimezone($timeZoneArray);

            setSchoolTimeZone();
        }

        // school board
        if (!empty($school['id'])) {
            $boardArray = array(
                'school_id' => $school['id'],
                'board_id' => !empty($input['board_id']) ? $input['board_id'] : NULL,
            );
            $this->schoolRepository->createBoard($boardArray);
        }

        if (!empty($school['id'])) {
            $dataSetting = array(
                'school_id' => $school['id'],
                'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : NULL,
                'admission_seed' => !empty($input['admission_seed']) ? $input['admission_seed'] : NULL,
                'admission_prefix' => !empty($input['admission_prefix']) ? $input['admission_prefix'] : NULL,
                'admission_postfix' => !empty($input['admission_postfix']) ? $input['admission_postfix'] : NULL,
                'ticket_url' => !empty($input['ticket_url']) ? $input['ticket_url'] : NULL,
                'ticket_userid' => !empty($input['ticket_userid']) ? $input['ticket_userid'] : NULL,
                'ticket_password' => !empty($input['ticket_password']) ? $input['ticket_password'] : NULL,
                'admin_number' => !empty($input['admin_number']) ? $input['admin_number'] : NULL,
                'training_url' => !empty($input['training_url']) ? $input['training_url'] : NULL,
                'email_notification' => !empty($input['email_notification']) ? $input['email_notification'] : NULL,
                'sms_notification' => !empty($input['sms_notification']) ? $input['sms_notification'] : NULL,
                'is_email_notify' => !empty($input['is_email_notify']) ? $input['is_email_notify'] : FALSE,
                'is_sms_notify' => isset($input['is_sms_notify']) && $input['is_sms_notify'] == 'On' ? 1 : 0,
                'is_teacher_reply' => !empty($input['is_teacher_reply']) ? $input['is_teacher_reply'] : FALSE,
                'is_teacher_compose' => !empty($input['is_teacher_compose']) ? $input['is_teacher_compose'] : FALSE,
                'is_parent_reply' => !empty($input['is_parent_reply']) ? $input['is_parent_reply'] : FALSE,
                'is_parent_compose' => !empty($input['is_parent_compose']) ? $input['is_parent_compose'] : FALSE,
                'is_enable_email' => isset($input['is_enable_email']) && $input['is_enable_email'] == 'On' ? 1 : 0,
                'is_attendance_backdate' => !empty($input['is_attendance_backdate']) ? $input['is_attendance_backdate'] : FALSE,
                'is_parent_newsletter' => !empty($input['is_parent_newsletter']) ? $input['is_parent_newsletter'] : FALSE,
                'is_teacher_newsletter' => !empty($input['is_teacher_newsletter']) ? $input['is_teacher_newsletter'] : FALSE,
                'is_student_roll_softable' => !empty($input['is_student_roll_softable']) ? $input['is_student_roll_softable'] : FALSE,
                'is_class_wise_report' => !empty($input['is_class_wise_report']) ? $input['is_class_wise_report'] : FALSE,
                'is_teacher_self_attendance' => !empty($input['is_teacher_self_attendance']) ? $input['is_teacher_self_attendance'] : FALSE,
                'is_password_visible' => !empty($input['is_password_visible']) ? $input['is_password_visible'] : FALSE,
                'is_biometric_integration' => !empty($input['is_biometric_integration']) ? $input['is_biometric_integration'] : FALSE,
                'is_student_biometric_attendance' => !empty($input['is_student_biometric_attendance']) ? $input['is_student_biometric_attendance'] : FALSE,
                'is_view_parent_contact' => !empty($input['is_view_parent_contact']) ? $input['is_view_parent_contact'] : FALSE,
                'is_view_tc_copy' => !empty($input['is_view_tc_copy']) ? $input['is_view_tc_copy'] : FALSE,
                'is_pay_online_fee_voucher' => !empty($input['is_pay_online_fee_voucher']) ? $input['is_pay_online_fee_voucher'] : FALSE,
                'is_uploaded_photo_app' => !empty($input['is_uploaded_photo_app']) ? $input['is_uploaded_photo_app'] : FALSE,
                'is_transport_boarding_student' => !empty($input['is_transport_boarding_student']) ? $input['is_transport_boarding_student'] : FALSE,
                'is_event_module_teacher_login' => !empty($input['is_event_module_teacher_login']) ? $input['is_event_module_teacher_login'] : FALSE,
                'is_allow_upload_document' => !empty($input['is_allow_upload_document']) ? $input['is_allow_upload_document'] : FALSE,
                'is_weekly_status_send_to_parent' => !empty($input['is_weekly_status_send_to_parent']) ? $input['is_weekly_status_send_to_parent'] : FALSE,
                'duration' => !empty($input['duration']) ? $input['duration'] : '1 weak',
                'training_url' => $input['training_url'] ?? null,
                'status' => Status::ACTIVE,
            );

            $this->schoolSettingRepository->create($dataSetting);
        }

        if (!empty($school['id'])) {

            if (!empty($request->file('image'))) {
                $image_url = $this->_upload->uploadImage($request, 'image', 'school_image');
            } else {
                $image_url = 'no image';
            }

            $dataImage = array(
                'school_id' => $school['id'],
                'imageable_type' => \App\Models\School::class,
                'imageable_id' => $school['id'],
                'name' => 'image',
                'path' => $image_url,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphSchoolCreate($dataImage, $school['id']);
        }

        // $redirect_path = '/school/create-domain?sid='. $school['id'] .'&domain='. $school['affiliation_no'];
        $domain = $school['school_key'];

        // Artisan::call("domain:add ". $domain .".educare-inertia.test");
        try {
            //Artisan::call("domain:add nasir.educare-inertia.test");
            //Artisan::call("cache:clear");
        } catch (Exception $e) {
            //
        }

        // update or create defeault ledger
        $this->updateOrCreateSystemDefaultLedger($school['id']);

        return redirect()->route('school.list')->with('message', 'School created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request)
    {
        if (getIsSuperAdmin()) {
            $id = $request->input('id');
            if (!empty($id)) {
                $school = $this->schoolRepository->getRelationalObjById($id);
                $countryData = $this->countryRepository->getActiveNameAndId();
                $stateData = $this->stateRepository->getActiveNameAndId();
                $timezoneData = $this->timezoneRepository->getActiveNameAndId();
                $boardData = $this->boardRepository->getActiveNameAndId();
                $academicYearData = $this->academicYearRepository->getActiveAcademicYearAndId();
                $image = $this->imageRepository->getMorphSchool($id);

                $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
                $timezones = $timezoneData->map(fn($timezone) => ['id' => $timezone->id, 'title' => $timezone->name])->all();
                $academicYears = $academicYearData->map(fn($year) => ['id' => $year->id, 'title' => $year->academic_session])->all();

                $states = $stateData->map(fn($state) => [
                    'id' => $state->id,
                    'title' => $state->name,
                    'country_id' => $state->country_id,
                ])->all();

                $boards = $boardData->map(fn($board) => [
                    'id' => $board->id,
                    'title' => $board->title,
                    'full_name' => $board->full_name,
                ])->all();

                // duration type
                $durationType = DurationType::cases();
                $durations = array();
                foreach ($durationType as $duration) {
                    array_push($durations, ['id' => $duration->value, 'title' => $duration->value]);
                }

                return Inertia::render('School/Edit', [
                    'school' => $school,
                    'status' => session('status'),
                    'timezones' => $timezones,
                    'countries' => $countries,
                    'states' => $states,
                    'boards' => $boards,
                    'durations' => $durations,
                    'academicYears' => $academicYears,
                    'image' => $image,
                ]);
            } else {
                return redirect()->route('school.list');
            }
        } else {
            return redirect()->route('configuration.list');
        }
    }



    /**
     * Update the user's profile information.
     */
    public function update(SchoolUpdateRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();
    }

    /**
     * Update the user's profile information.
     */
    public function updatePost(SchoolUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $id = !empty($input['school_id']) ? intval($input['school_id']) : 1;

        $dataSchool = array(
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : NULL,
            'title' => $input['school_name'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'teaser' => !empty($input['teaser']) ? $input['teaser'] : "",
            'school_key' => !empty($input['school_key']) ? $input['school_key'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'client_name' => !empty($input['client_name']) ? $input['client_name'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'fb_url' => !empty($input['fb_url']) ? $input['fb_url'] : "",
            'instagram_url' => !empty($input['instagram_url']) ? $input['instagram_url'] : "",
            'twitter_url' => !empty($input['twitter_url']) ? $input['twitter_url'] : "",
            'linkedin_url' => !empty($input['linkedin_url']) ? $input['linkedin_url'] : "",
            'youtube_url' => !empty($input['youtube_url']) ? $input['youtube_url'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'apple_app_url' => !empty($input['apple_app_url']) ? $input['apple_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'is_inactive' => !empty($input['is_inactive']) ? $input['is_inactive'] : FALSE,
            'status' => Status::ACTIVE,
        );
        $school = $this->schoolRepository->update($id, $dataSchool);

        // school country
        if (!empty($input['country_id'] && is_numeric($input['country_id']))) {
            $countryArray = array(
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : NULL,
            );
            $this->schoolRepository->updateCountry($input['school_country_id'], $countryArray);
        }

        // school state
        if (!empty($input['state_id'] && is_numeric($input['state_id']))) {
            $stateArray = array(
                'state_id' => !empty($input['state_id']) ? $input['state_id'] : NULL,
            );
            $this->schoolRepository->updateState($input['school_state_id'], $stateArray);
        }

        // school time zone
        if (!empty($input['timezone_id'] && is_numeric($input['timezone_id']))) {
            $timeZoneArray = array(
                'timezone_id' => !empty($input['timezone_id']) ? $input['timezone_id'] : NULL,
            );
            $this->schoolRepository->updateTimezone($input['school_timezone_id'], $timeZoneArray);

            setSchoolTimeZone();
        }

        // school board
        if (!empty($input['board_id'] && is_numeric($input['board_id']))) {
            $boardArray = array(
                'board_id' => !empty($input['board_id']) ? $input['board_id'] : NULL,
            );
            $this->schoolRepository->updateBoard($input['school_board_id'], $boardArray);
        }

        if (!empty($input['school_setting_id'] && is_numeric($input['school_setting_id']))) {
            $dataSetting = array(
                'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : NULL,
                'admission_seed' => !empty($input['admission_seed']) ? $input['admission_seed'] : NULL,
                'admission_prefix' => !empty($input['admission_prefix']) ? $input['admission_prefix'] : NULL,
                'admission_postfix' => !empty($input['admission_postfix']) ? $input['admission_postfix'] : NULL,
                'ticket_url' => !empty($input['ticket_url']) ? $input['ticket_url'] : NULL,
                'ticket_userid' => !empty($input['ticket_userid']) ? $input['ticket_userid'] : NULL,
                'ticket_password' => !empty($input['ticket_password']) ? $input['ticket_password'] : NULL,
                'admin_number' => !empty($input['admin_number']) ? $input['admin_number'] : NULL,
                'training_url' => !empty($input['training_url']) ? $input['training_url'] : NULL,
                'email_notification' => !empty($input['email_notification']) ? $input['email_notification'] : NULL,
                'sms_notification' => !empty($input['sms_notification']) ? $input['sms_notification'] : NULL,
                'is_email_notify' => !empty($input['is_email_notify']) ? $input['is_email_notify'] : FALSE,
                'is_sms_notify' => isset($input['is_sms_notify']) && $input['is_sms_notify'] == 'On' ? 1 : 0,
                'is_teacher_reply' => !empty($input['is_teacher_reply']) ? $input['is_teacher_reply'] : FALSE,
                'is_teacher_compose' => !empty($input['is_teacher_compose']) ? $input['is_teacher_compose'] : FALSE,
                'is_parent_reply' => !empty($input['is_parent_reply']) ? $input['is_parent_reply'] : FALSE,
                'is_parent_compose' => !empty($input['is_parent_compose']) ? $input['is_parent_compose'] : FALSE,
                'is_enable_email' => isset($input['is_enable_email']) && $input['is_enable_email'] == 'On' ? 1 : 0,
                'is_attendance_backdate' => !empty($input['is_attendance_backdate']) ? $input['is_attendance_backdate'] : FALSE,
                'is_parent_newsletter' => !empty($input['is_parent_newsletter']) ? $input['is_parent_newsletter'] : FALSE,
                'is_teacher_newsletter' => !empty($input['is_teacher_newsletter']) ? $input['is_teacher_newsletter'] : FALSE,
                'is_student_roll_softable' => !empty($input['is_student_roll_softable']) ? $input['is_student_roll_softable'] : FALSE,
                'is_class_wise_report' => !empty($input['is_class_wise_report']) ? $input['is_class_wise_report'] : FALSE,
                'is_teacher_self_attendance' => !empty($input['is_teacher_self_attendance']) ? $input['is_teacher_self_attendance'] : FALSE,
                'is_password_visible' => !empty($input['is_password_visible']) ? $input['is_password_visible'] : FALSE,
                'is_biometric_integration' => !empty($input['is_biometric_integration']) ? $input['is_biometric_integration'] : FALSE,
                'is_student_biometric_attendance' => !empty($input['is_student_biometric_attendance']) ? $input['is_student_biometric_attendance'] : FALSE,
                'is_view_parent_contact' => !empty($input['is_view_parent_contact']) ? $input['is_view_parent_contact'] : FALSE,
                'is_view_tc_copy' => !empty($input['is_view_tc_copy']) ? $input['is_view_tc_copy'] : FALSE,
                'is_pay_online_fee_voucher' => !empty($input['is_pay_online_fee_voucher']) ? $input['is_pay_online_fee_voucher'] : FALSE,
                'is_uploaded_photo_app' => !empty($input['is_uploaded_photo_app']) ? $input['is_uploaded_photo_app'] : FALSE,
                'is_transport_boarding_student' => !empty($input['is_transport_boarding_student']) ? $input['is_transport_boarding_student'] : FALSE,
                'is_event_module_teacher_login' => !empty($input['is_event_module_teacher_login']) ? $input['is_event_module_teacher_login'] : FALSE,
                'is_allow_upload_document' => !empty($input['is_allow_upload_document']) ? $input['is_allow_upload_document'] : FALSE,
                'is_weekly_status_send_to_parent' => !empty($input['is_weekly_status_send_to_parent']) ? $input['is_weekly_status_send_to_parent'] : FALSE,
                'duration' => !empty($input['duration']) ? $input['duration'] : '1 weak',
                'training_url' => $input['training_url'] ?? null,
                'status' => Status::ACTIVE,
            );

            $this->schoolSettingRepository->update($input['school_setting_id'], $dataSetting);
        }

        if (!empty($request->file('image'))) {
            $image_url = $this->_upload->uploadImage($request, 'image', 'school_image');
            $dataImage = array(
                'name' => 'image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );
            $image = $this->imageRepository->morphSchoolUpdate($dataImage, $id);
        }

        // update or create defeault ledger
        $this->updateOrCreateSystemDefaultLedger($id);

        return redirect()->route('school.list')->with('message', 'School updated successfully.');
    }

    /**
     * mark As Inactive
    */

    public function markAsInactive(Request $request): RedirectResponse
    {
        $id = $request->input('id');
        $dataSchool = array(
            'is_inactive' => TRUE,
        );
        $this->schoolRepository->update($id, $dataSchool);

        return redirect()->back()->with('message', 'School marked as inactive successfully.');
    }

    /**
     * setting
     */
    public function setting(Request $request): Response
    {
        $school = $this->schoolRepository->getRelationalObjById(getUserSchoolId());
        $countryData = $this->countryRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $timezoneData = $this->timezoneRepository->getActiveNameAndId();
        $boardData = $this->boardRepository->getActiveNameAndId();
        $academicYearData = $this->academicYearRepository->getActiveAcademicYearAndId();

        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $timezones = $timezoneData->map(fn($timezone) => ['id' => $timezone->id, 'title' => $timezone->name])->all();
        $academicYears = $academicYearData->map(fn($year) => ['id' => $year->id, 'title' => $year->academic_session])->all();

        $states = $stateData->map(fn($state) => [
            'id' => $state->id,
            'title' => $state->name,
            'country_id' => $state->country_id,
        ])->all();

        $boards = $boardData->map(fn($board) => [
            'id' => $board->id,
            'title' => $board->title,
            'full_name' => $board->full_name,
        ])->all();

        $image = $this->imageRepository->getMorphSchool(getUserSchoolId());

        // duration type
        $durationType = DurationType::cases();
        $durations = array();
        foreach ($durationType as $duration) {
            array_push($durations, ['id' => $duration->value, 'title' => $duration->value]);
        }

        return Inertia::render('School/Setting', [
            'school' => $school,
            'status' => session('status'),
            'timezones' => $timezones,
            'countries' => $countries,
            'states' => $states,
            'boards' => $boards,
            'durations' => $durations,
            'academicYears' => $academicYears,
            'image' => $image,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function updateSetting(SchoolRequest $request): RedirectResponse
    {
        $schoolId = getUserSchoolId();
        $input = $request->validated();
        $dataSchool = array(
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : NULL,
            'title' => $input['school_name'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'teaser' => !empty($input['teaser']) ? $input['teaser'] : "",
            'school_key' => !empty($input['school_key']) ? $input['school_key'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'fb_url' => !empty($input['fb_url']) ? $input['fb_url'] : "",
            'instagram_url' => !empty($input['instagram_url']) ? $input['instagram_url'] : "",
            'twitter_url' => !empty($input['twitter_url']) ? $input['twitter_url'] : "",
            'linkedin_url' => !empty($input['linkedin_url']) ? $input['linkedin_url'] : "",
            'youtube_url' => !empty($input['youtube_url']) ? $input['youtube_url'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'apple_app_url' => !empty($input['apple_app_url']) ? $input['apple_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'is_inactive' => !empty($input['is_inactive']) ? $input['is_inactive'] : FALSE,
            'status' => Status::ACTIVE,
        );
        $this->schoolRepository->update($schoolId, $dataSchool);

        // school country
        if (!empty($input['country_id'] && is_numeric($input['country_id']))) {
            $countryArray = array(
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : NULL,
            );
            $this->schoolRepository->updateCountry($input['school_country_id'], $countryArray);
        }

        // school state
        if (!empty($input['state_id'] && is_numeric($input['state_id']))) {
            $stateArray = array(
                'state_id' => !empty($input['state_id']) ? $input['state_id'] : NULL,
            );
            $this->schoolRepository->updateState($input['school_state_id'], $stateArray);
        }

        // school time zone
        if (!empty($input['timezone_id'] && is_numeric($input['timezone_id']))) {
            $timeZoneArray = array(
                'timezone_id' => !empty($input['timezone_id']) ? $input['timezone_id'] : NULL,
            );
            $this->schoolRepository->updateTimezone($input['school_timezone_id'], $timeZoneArray);

            setSchoolTimeZone();
        }

        // school board
        if (!empty($input['board_id'] && is_numeric($input['board_id']))) {
            $boardArray = array(
                'board_id' => !empty($input['board_id']) ? $input['board_id'] : NULL,
            );
            $this->schoolRepository->updateBoard($input['school_board_id'], $boardArray);
        }

        if (!empty($input['school_setting_id'] && is_numeric($input['school_setting_id']))) {
            $dataSetting = array(
                'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : NULL,
                'admission_seed' => !empty($input['admission_seed']) ? $input['admission_seed'] : NULL,
                'admission_prefix' => !empty($input['admission_prefix']) ? $input['admission_prefix'] : NULL,
                'admission_postfix' => !empty($input['admission_postfix']) ? $input['admission_postfix'] : NULL,
                'ticket_url' => !empty($input['ticket_url']) ? $input['ticket_url'] : NULL,
                'ticket_userid' => !empty($input['ticket_userid']) ? $input['ticket_userid'] : NULL,
                'ticket_password' => !empty($input['ticket_password']) ? $input['ticket_password'] : NULL,
                'admin_number' => !empty($input['admin_number']) ? $input['admin_number'] : NULL,
                'training_url' => !empty($input['training_url']) ? $input['training_url'] : NULL,
                'email_notification' => !empty($input['email_notification']) ? $input['email_notification'] : NULL,
                'sms_notification' => !empty($input['sms_notification']) ? $input['sms_notification'] : NULL,
                'is_email_notify' => !empty($input['is_email_notify']) ? $input['is_email_notify'] : FALSE,
                'is_sms_notify' => isset($input['is_sms_notify']) && $input['is_sms_notify'] == 'On' ? 1 : 0,
                'is_teacher_reply' => !empty($input['is_teacher_reply']) ? $input['is_teacher_reply'] : FALSE,
                'is_teacher_compose' => !empty($input['is_teacher_compose']) ? $input['is_teacher_compose'] : FALSE,
                'is_parent_reply' => !empty($input['is_parent_reply']) ? $input['is_parent_reply'] : FALSE,
                'is_parent_compose' => !empty($input['is_parent_compose']) ? $input['is_parent_compose'] : FALSE,
                'is_enable_email' => isset($input['is_enable_email']) && $input['is_enable_email'] == 'On' ? 1 : 0,
                'is_attendance_backdate' => !empty($input['is_attendance_backdate']) ? $input['is_attendance_backdate'] : FALSE,
                'is_parent_newsletter' => !empty($input['is_parent_newsletter']) ? $input['is_parent_newsletter'] : FALSE,
                'is_teacher_newsletter' => !empty($input['is_teacher_newsletter']) ? $input['is_teacher_newsletter'] : FALSE,
                'is_student_roll_softable' => !empty($input['is_student_roll_softable']) ? $input['is_student_roll_softable'] : FALSE,
                'is_class_wise_report' => !empty($input['is_class_wise_report']) ? $input['is_class_wise_report'] : FALSE,
                'is_teacher_self_attendance' => !empty($input['is_teacher_self_attendance']) ? $input['is_teacher_self_attendance'] : FALSE,
                'is_password_visible' => !empty($input['is_password_visible']) ? $input['is_password_visible'] : FALSE,
                'is_biometric_integration' => !empty($input['is_biometric_integration']) ? $input['is_biometric_integration'] : FALSE,
                'is_student_biometric_attendance' => !empty($input['is_student_biometric_attendance']) ? $input['is_student_biometric_attendance'] : FALSE,
                'is_view_parent_contact' => !empty($input['is_view_parent_contact']) ? $input['is_view_parent_contact'] : FALSE,
                'is_view_tc_copy' => !empty($input['is_view_tc_copy']) ? $input['is_view_tc_copy'] : FALSE,
                'is_pay_online_fee_voucher' => !empty($input['is_pay_online_fee_voucher']) ? $input['is_pay_online_fee_voucher'] : FALSE,
                'is_uploaded_photo_app' => !empty($input['is_uploaded_photo_app']) ? $input['is_uploaded_photo_app'] : FALSE,
                'is_transport_boarding_student' => !empty($input['is_transport_boarding_student']) ? $input['is_transport_boarding_student'] : FALSE,
                'is_event_module_teacher_login' => !empty($input['is_event_module_teacher_login']) ? $input['is_event_module_teacher_login'] : FALSE,
                'is_allow_upload_document' => !empty($input['is_allow_upload_document']) ? $input['is_allow_upload_document'] : FALSE,
                'is_weekly_status_send_to_parent' => !empty($input['is_weekly_status_send_to_parent']) ? $input['is_weekly_status_send_to_parent'] : FALSE,
                'duration' => !empty($input['duration']) ? $input['duration'] : '1 weak',
                'training_url' => $input['training_url'] ?? null,
                'status' => Status::ACTIVE,
            );

            $this->schoolSettingRepository->update($input['school_setting_id'], $dataSetting);
        }

        if (!empty($request->file('image'))) {

            $image_url = $this->_upload->uploadImage($request, 'image', 'school_image');

            $dataImage = array(
                'name' => 'image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphSchoolUpdate($dataImage, $schoolId);
        }

        return redirect()->route('configuration.list')->with('message', 'School updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id)
    {

        $schoolSetting = $this->schoolSettingRepository->getBySchoolId($id);
        if (!empty($schoolSetting)) {
            $this->schoolRepository->delete($schoolSetting->id);
        }

        // country
        $country = $this->schoolRepository->getCountryBySchoolId($id);
        if (!empty($country)) {
            $this->schoolRepository->countryDestroy($country->id);
        }

        // state
        $state = $this->schoolRepository->getStateBySchoolId($id);
        if (!empty($state)) {
            $this->schoolRepository->stateDestroy($state->id);
        }

        // timezone
        $timezone = $this->schoolRepository->getTimezoneBySchoolId($id);
        if (!empty($timezone)) {
            $this->schoolRepository->timezoneDestroy($timezone->id);
        }

        // board
        $board = $this->schoolRepository->getBoardBySchoolId($id);
        if (!empty($board)) {
            $this->schoolRepository->boardDestroy($board->id);
        }

        $school = $this->schoolRepository->getById($id);
        if (empty($school)) {
            return redirect()->route('school.list')->with('error', 'School not found.');
        } else {
            $this->schoolRepository->delete($id);
            return redirect()->route('school.list')->with('message', 'School deleted successfully.');
        }
    }

    /**
     * Create domain
     */
    public function createDomain(): void
    {
        $domain = isset($_GET['domain']) ? $_GET['domain'] : '';
        $schoolId = isset($_GET['sid']) ? $_GET['sid'] : '';

        if (intval($schoolId) && !empty($domain)) {
            try {
                Artisan::call("domain:add " . $domain . ".educare-inertia.test");
                Artisan::call("cache:clear");

                header("Location: https://educare-inertia.test/schools");
                exit;
                // $artisanOutput = Artisan::output();
                // return Redirect::route('school.list');

            } catch (Exception | Error $e) {
                //
            }
        }
    }

    /*
    * Helper method to update or create system default ledegrs
    */
    private function updateOrCreateSystemDefaultLedger($schoolId = null)
    {
        // system default account groups
        $accountGroupTitles = [
            'Bank Account' => [
                'Bank Process',
                'Cheque',
                'DemandDraft',
                'Neft',
                'Online, Paytm',
                'UPI',
                'Online',
                'Other',
                'Card Swap',
                'RTGS',
                'SBI',
                'HDFC',
                'Online Back Office',
                'Employee Ward'
            ],
            'Branch/Divisions' => [],
            'Cash-in-Hand' => [
                'Cash'
            ],
            'Direct Expenses' => [
                'Bank Process'
            ],
            'Direct Incomes' => [
                'Leave Deduction',
                'Wallet Amount'
            ],
            'Indirect Expenses' => [
                'Discount'
            ],
            'Indirect Incomes' => [
                'Tax Amount'
            ],
            'Purchase Accounts' => [],
            'Party A/c' => [],
            'Reserves & Surplus' => [],
            'Sales Account' => [],
            'Student' => [],
            'Staff' => [],
            'Sundry Creditors' => [],
            'Sundry Debtors' => []
        ];

        foreach (array_keys($accountGroupTitles) as $accountGroupTitle) {
            // get default account group
            $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle($accountGroupTitle);

            // update or create default ledger
            if ($accountGroup != null && !empty($accountGroupTitles[$accountGroupTitle])) {
                foreach ($accountGroupTitles[$accountGroupTitle] as $ledgerTitle) {
                    $attributesToCheck = [
                        'school_id' => ($schoolId != null) ? $schoolId : getUserSchoolId(),
                        'account_group_id' => $accountGroup->id,
                        'title' => $ledgerTitle,
                        'is_system_default' => 0
                    ];

                    $valuesToUpdate = [
                        'opening_balance' => 0,
                        'amount_type' => LedgerAmountType::DEBIT,
                        'status' => Status::ACTIVE
                    ];

                    $this->ledgerRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }
        }
    }
}
