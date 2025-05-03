<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Repositories\ConfigurationRepository;
use App\Repositories\IConfigurationRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ConfigurationController extends Controller
{
    
    public function __construct( 
        private IConfigurationRepository $configurationRepository
    ) 
    {
        // do something - no need permissions module list here
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Configuration/Show');
    }

}
