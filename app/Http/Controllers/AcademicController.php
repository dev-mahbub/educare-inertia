<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\AcademicRequest;
use App\Repositories\AcademicRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AcademicController extends Controller
{

    private $_upload;
    public function __construct(
        private IAcademicRepository $academicRepository,
        private IClassroomRepository $classroomRepository,
        private ISiteSettingRepository $siteSettingRepository,
    ) {
        $this->_upload = new UploadFileController();

        $this->middleware('permission:view academic', ['only' => ['index','show']]);
        $this->middleware('permission:add academic', ['only' => ['create','store', 'settings']]);
        $this->middleware('permission:edit academic', ['only' => ['edit','update']]);
        $this->middleware('permission:delete academic', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $academics = $this->academicRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('Academic/Show', [
            'academics' => $academics,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('Academic/Create', [
            'classrooms' => $classrooms,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(academicRequest $request): RedirectResponse
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

        $school = $this->schoolRepository->create();

        return Redirect::route('academic.list');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Academic/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(academicRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        //return Redirect::route('academic.edit');
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

    /**
     * Display the academic setting.
     */
    public function settings(Request $request): Response
    {
        $siteSettingsReportCard = getSiteSettingDataByType('Team Wise Report Card');

        return Inertia::render('Academic/Settings', [
            'siteSettingsReportCard' => !empty($siteSettingsReportCard['Team Wise Report Card']) ? $siteSettingsReportCard['Team Wise Report Card'] : [],
        ]);
    }

    public function settingsSave(Request $request)
    {
        $inputArray = $request->all();

        try {
            foreach ($inputArray['key_value_array'] as $input) {
                setSiteSettingData($input['type'], $input['key'], $input['value']);
            }
            return redirect()->route('academic.settings')->with('message', 'Setting successfully.');
        } catch (\Throwable $th) {

            throw $th;

            return redirect()->route('academic.settings')->with('error', 'Something goes wrong.');
        }
    }

    public function settingsSaveImage(Request $request)
    {
        $type = $request->input('type');
        $key = $request->input('key');

        try {
            if (!empty($request->file('image'))) {
                $image_url = $this->_upload->uploadImage($request, 'image', 'academic_setting');
            }
            
            setSiteSettingData($type, $key, $image_url);
            return redirect()->route('academic.settings')->with('message', 'Save successfully.');
        } catch (\Throwable $th) {
            throw $th;
            return redirect()->route('academic.settings')->with('error', 'Something goes wrong.');
        }
    }
}
