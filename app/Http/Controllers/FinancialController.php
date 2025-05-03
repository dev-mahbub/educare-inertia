<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinancialRequest;
use App\Repositories\FinancialRepository;
use App\Repositories\IFinancialRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class FinancialController extends Controller
{
    
    public function __construct( 
        private IFinancialRepository $financialRepository
    ) 
    {
        // do something - no need permissions - landing list
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Financial/Show');
    }

}
