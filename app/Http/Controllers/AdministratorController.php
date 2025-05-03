<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolRequest;
use App\Repositories\CountryRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\StateRepository;
use App\Repositories\IStateRepository;
use App\Repositories\TimezoneRepository;
use App\Repositories\ITimezoneRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdministratorController extends Controller
{
    
    public function __construct( 
        private ISchoolRepository $schoolRepository,
        private IStateRepository $stateRepository,
        private ICountryRepository $countryRepository,
        private ITimezoneRepository $timezoneRepository
    ) 
    {
        // do something
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $schools = $this->schoolRepository->getActiveAll();
        $countries = $this->countryRepository->getActiveAll();
        $states = $this->stateRepository->getActiveAll();

        return Inertia::render('Administrator/Show', [
            'schools' => $schools,
            'countries' => $countries,
            'states' => $states,
        ]);
    }

}
