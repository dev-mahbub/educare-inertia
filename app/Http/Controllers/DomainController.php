<?php

namespace App\Http\Controllers;

use App\Models\School;
use App\Enums\Status;
use App\Http\Requests\SchoolRequest;
use App\Repositories\CountryRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\SchoolSettingRepository;
use App\Repositories\ISchoolSettingRepository;
use App\Repositories\StateRepository;
use App\Repositories\IStateRepository;
use App\Repositories\TimezoneRepository;
use App\Repositories\ITimezoneRepository;
use App\Repositories\ImageRepository;
use App\Repositories\IImageRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Artisan;
use App\Providers\RouteServiceProvider;
use Inertia\Inertia;
use Inertia\Response;

class DomainController extends Controller
{
    private $_upload;

    public function __construct(
        private ISchoolRepository $schoolRepository,
        private ISchoolSettingRepository $schoolSettingRepository,
        private IImageRepository $imageRepository,
        private IStateRepository $stateRepository,
        private ICountryRepository $countryRepository,
        private ITimezoneRepository $timezoneRepository
    )
    {
        $this->_upload = new UploadFileController();
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $schools = $this->schoolRepository->getDomainAll();
        $countries = $this->countryRepository->getActiveAll();
        $states = $this->stateRepository->getActiveAll();
        $domain_name = env('DOMAIN_NAME', 'localhost');

        return Inertia::render('Domain/Show', [
            'schools' => $schools,
            'countries' => $countries,
            'states' => $states,
            'domain_name' => $domain_name,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $schools = $this->schoolRepository->getActiveAll();
        $countries = $this->countryRepository->getActiveAll();
        $states = $this->stateRepository->getActiveAll();
        $timezones = $this->timezoneRepository->getActiveAll();

        return Inertia::render('Domain/Create', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'timezones' => $timezones,
            'countries' => $countries,
            'states' => $states,
            'status' => session('status'),
        ]);
    }

    /**
     * Create domain
     */
    public function createDomain(): void
    {
        $domain = isset($_GET['domain']) ? $_GET['domain'] : '';
        $schoolId = isset($_GET['sid']) ? $_GET['sid'] : '';



        if( intval($schoolId) && !empty($domain) ) {
            try{
                Artisan::call("domain:add ". $domain .".educare-inertia.test");
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
}
